import { pageById } from "@/data/site-pages";
import type { Chunk } from "@/lib/chat/chunks";
import { retrieve, type Hit } from "@/lib/chat/retrieval";
import { estimateLength, tokenise } from "@/lib/chat/tokenise";
import { getArticle, normalise, substitute } from "@/lib/help";
import type { Locale } from "@/i18n/routing";

export type ChatSource = {
  kind: "help" | "page";
  /** Locale-prefixed and ready to link. */
  url: string;
  title: string;
  heading?: string;
};

export type ChatReply = {
  answer: string;
  sources: ChatSource[];
  confidence: "high" | "low" | "none";
};

/** Copy the route resolves from the message files, so nothing user-facing is hard-coded here. */
export type AnswerStrings = {
  /** Renders the "From X:" lead-in; next-intl owns the wording. */
  fromSource: (source: string) => string;
  noAnswer: string;
  greeting: string;
  intents: Record<string, string>;
};

type Intent = {
  id: string;
  /** Substrings tested against the normalised question. */
  match: Record<Locale, string[]>;
  pages: string[];
  articles?: string[];
};

/**
 * The handful of questions almost every visitor asks. Answering these from a written
 * sentence rather than an extracted passage is what stops the first impression being a
 * paragraph that technically contains the answer.
 */
const INTENTS: Intent[] = [
  {
    id: "pricing",
    match: {
      en: ["price", "pricing", "cost", "how much", "subscription", "billing", "per user", "per month"],
      ja: ["料金", "価格", "値段", "いくら", "費用", "月額", "課金", "支払"],
    },
    pages: ["pricing"],
    articles: ["managing-your-account/subscriptions-and-billing"],
  },
  {
    id: "meetingBot",
    match: {
      en: ["bot", "join my meeting", "join the meeting", "joins meetings", "another participant"],
      ja: ["ボット", "会議に参加", "参加者として", "自動参加"],
    },
    pages: ["security"],
    articles: ["taking-notes/transcription"],
  },
  {
    id: "integrations",
    // Deliberately no product names here. "Does Pulse work with Salesforce SSO" deserves the
    // article that covers it, not the generic connector blurb, so retrieval handles those.
    match: {
      en: ["integrat", "connect to", "works with", "which tools", "what tools"],
      ja: ["連携", "接続", "対応ツール", "どのツール"],
    },
    pages: ["integrations"],
  },
  {
    id: "gettingStarted",
    match: {
      en: ["get started", "getting started", "sign up", "install", "set up", "setup", "first time", "download"],
      ja: ["始め", "はじめ", "導入", "インストール", "初期設定", "設定方法", "サインイン"],
    },
    pages: [],
    articles: ["getting-started/first-time-setup"],
  },
  {
    id: "contact",
    match: {
      en: ["contact", "talk to someone", "speak to", "get in touch", "book a demo", "sales team"],
      ja: ["問い合わせ", "連絡", "相談したい", "デモ", "担当者"],
    },
    pages: ["contact", "demo"],
  },
];

const GREETINGS: Record<Locale, string[]> = {
  en: ["hi", "hii", "hey", "hello", "yo", "good morning", "good afternoon", "good evening", "thanks", "thank you", "ta", "cheers", "bye"],
  ja: ["こんにちは", "こんばんは", "おはよう", "やあ", "ありがとう", "どうも", "はじめまして", "さようなら"],
};

/** Below this the top passage is more likely to be a coincidence than an answer. */
const CONFIDENCE_FLOOR = 2.5;
/**
 * How much extracted prose to show before it stops being an answer and becomes an article.
 * Per locale, because the same character count is a paragraph in English and most of a
 * section in Japanese.
 */
const PASSAGE_BUDGET: Record<Locale, number> = { en: 340, ja: 170 };
const MAX_SOURCES = 4;
/** Links below this fraction of the best score are noise rather than a suggestion. */
const RELATIVE_SOURCE_FLOOR = 0.45;
/** Stricter for a curated answer, whose own links are already the right destination. */
const INTENT_SOURCE_FLOOR = 0.75;
const MAX_STEPS = 6;
/** Hard ceiling on the rendered answer, whichever path produced it. */
const ANSWER_LIMIT: Record<Locale, number> = { en: 520, ja: 260 };

const PROCEDURAL = {
  en: ["how do", "how to", "how can", "how would", "steps", "step by step", "where do i", "set up", "enable", "turn on", "change"],
  ja: ["どう", "方法", "手順", "やり方", "設定", "変更", "どこで", "できますか"],
} satisfies Record<Locale, string[]>;

const SENTENCE_SPLIT = /(?<=[。！？])|(?<=[.!?])\s+/;

function matchesAny(haystack: string, needles: string[]): boolean {
  return needles.some((needle) => haystack.includes(needle));
}

function sourceFromChunk(chunk: Chunk): ChatSource {
  return { kind: chunk.kind, url: chunk.url, title: chunk.title, heading: chunk.heading };
}

function pageSource(id: string, locale: Locale): ChatSource | undefined {
  const page = pageById(id);
  if (!page) return undefined;
  return { kind: "page", url: `/${locale}${page.path}`, title: page.titles[locale] };
}

function articleSource(slug: string, locale: Locale): ChatSource | undefined {
  const article = getArticle(slug, locale);
  if (!article) return undefined;
  return { kind: "help", url: `/${locale}/help/${slug}`, title: substitute(article.title, locale) };
}

/** One link per destination, help articles and pages mixed in rank order. */
function dedupe(sources: Array<ChatSource | undefined>): ChatSource[] {
  const byPath = new Map<string, ChatSource>();
  for (const source of sources) {
    if (!source) continue;
    const path = source.url.split("#")[0];
    if (!byPath.has(path)) byPath.set(path, source);
    if (byPath.size >= MAX_SOURCES) break;
  }
  return [...byPath.values()];
}

function fallbackSources(locale: Locale): ChatSource[] {
  return dedupe([pageSource("help", locale), pageSource("contact", locale)]);
}

/** How many of the question's distinct terms a piece of text contains. */
function overlap(text: string, wanted: Set<string>): number {
  let found = 0;
  const seen = new Set<string>();
  for (const term of tokenise(text)) {
    if (seen.has(term) || !wanted.has(term)) continue;
    seen.add(term);
    found += 1;
  }
  return found;
}

/** Sentences that share the most distinctive words with the question. */
function bestSentences(text: string, query: string, locale: Locale): { text: string; overlap: number } {
  const wanted = new Set(tokenise(query));
  const sentences = text
    .split("\n")
    .flatMap((line) => line.split(SENTENCE_SPLIT))
    .map((sentence) => sentence.trim())
    .filter(Boolean);
  const budget = PASSAGE_BUDGET[locale];
  if (!sentences.length) return { text: "", overlap: 0 };

  let bestIndex = 0;
  let bestScore = -1;
  sentences.forEach((sentence, index) => {
    const terms = new Set(tokenise(sentence));
    let shared = 0;
    for (const term of terms) if (wanted.has(term)) shared += 1;
    const score = shared / Math.sqrt(Math.max(4, terms.size));
    if (score > bestScore) {
      bestScore = score;
      bestIndex = index;
    }
  });

  // Keep the neighbours too: a sentence lifted out of a paragraph often loses its subject.
  const picked = [sentences[bestIndex]];
  let before = bestIndex - 1;
  let after = bestIndex + 1;
  let length = picked[0].length;
  while (length < budget && (before >= 0 || after < sentences.length)) {
    if (after < sentences.length && sentences[after].length + length <= budget) {
      picked.push(sentences[after]);
      length += sentences[after].length;
      after += 1;
    } else if (before >= 0 && sentences[before].length + length <= budget) {
      picked.unshift(sentences[before]);
      length += sentences[before].length;
      before -= 1;
    } else {
      break;
    }
  }

  // List items keep their own line. Joined with spaces they read as "three things. - read
  // the note - hover over a passage", which looks like broken prose rather than a list.
  const passage = picked
    .reduce((out, sentence) => (!out ? sentence : `${out}${sentence.startsWith("- ") ? "\n" : " "}${sentence}`), "")
    .trim();
  return { text: passage, overlap: overlap(passage, wanted) };
}

function steps(text: string): string[] {
  return text
    .split("\n")
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean)
    .slice(0, MAX_STEPS);
}

/**
 * A last cut so the panel never fills with an entire section. The budget above governs how
 * many sentences are gathered, but one long sentence or list item can still overshoot it,
 * and the link to the full guide is sitting right underneath.
 */
function clamp(body: string, locale: Locale): string {
  const limit = ANSWER_LIMIT[locale];
  if (body.length <= limit) return body;
  const cut = body.slice(0, limit);
  const boundary = Math.max(cut.lastIndexOf("\n"), cut.lastIndexOf("。"), cut.lastIndexOf(". "));
  return `${(boundary > limit * 0.5 ? cut.slice(0, boundary + 1) : cut).trim()}…`;
}

function breadcrumb(chunk: Chunk): string {
  return [chunk.title, chunk.heading].filter(Boolean).join(" → ");
}

/**
 * Word matching cannot bridge vocabulary: someone asks "who can see a note" and the article
 * is headed "Changing an individual note's scope". These pairs add the article's word to the
 * query without replacing the visitor's, so a phrasing that already worked still does.
 */
const SYNONYMS: Record<Locale, Array<[string, string]>> = {
  en: [
    ["who can see", "sharing scope"],
    ["who can view", "sharing scope"],
    ["visible to", "sharing scope"],
    ["cancel", "cancellation subscription"],
    ["refund", "billing subscription"],
    ["delete my account", "account deletion closing"],
    ["export", "download sharing"],
    ["offline", "internet connection"],
    ["meeting bot", "participant recording"],
    ["language", "transcription language settings"],
    ["password", "signing in account"],
    ["free", "trial plan"],
  ],
  ja: [
    ["キャンセル", "解約 退会"],
    ["解約", "キャンセル 退会"],
    ["議事録", "ノート"],
    ["誰が見", "共有範囲 アクセス権"],
    ["見られ", "共有範囲 アクセス権"],
    ["公開範囲", "共有範囲"],
    ["書き出し", "エクスポート ダウンロード"],
    ["オフライン", "インターネット 接続"],
    ["パスワード", "サインイン アカウント"],
    ["無料", "トライアル プラン"],
    ["言語", "文字起こし 設定"],
    ["返金", "請求 契約"],
  ],
};

/**
 * Short follow-ups ("and in Japanese?") carry almost no searchable words of their own, so
 * the previous question is folded in before retrieval.
 */
export function buildQuery(message: string, history: string[], locale: Locale = "en"): string {
  const previous = history[history.length - 1];
  const base = estimateLength(message) >= 8 || !previous ? message : `${previous} ${message}`;
  const asked = normalise(base);
  const extra = SYNONYMS[locale].filter(([trigger]) => asked.includes(trigger)).map(([, expansion]) => expansion);
  return extra.length ? `${base} ${extra.join(" ")}` : base;
}

export function answer(
  message: string,
  locale: Locale,
  strings: AnswerStrings,
  history: string[] = []
): ChatReply {
  const asked = normalise(message);

  // Someone saying hello is not searching for anything.
  if (!asked || (asked.length <= 24 && matchesAny(asked, GREETINGS[locale]))) {
    return { answer: strings.greeting, sources: fallbackSources(locale), confidence: "none" };
  }

  const hits = retrieve(buildQuery(message, history, locale), locale, message);
  // Scores are not comparable between locales — Japanese bigrams produce far more of them —
  // so weak links are dropped relative to the best hit rather than against a fixed number.
  const strong = hits.filter((hit) => hit.score >= (hits[0]?.score ?? 0) * RELATIVE_SOURCE_FLOOR);
  const strongSources = strong.map((hit) => sourceFromChunk(hit.chunk));

  for (const intent of INTENTS) {
    const text = strings.intents[intent.id];
    if (!text || !matchesAny(asked, intent.match[locale])) continue;
    const curated = [
      ...intent.pages.map((id) => pageSource(id, locale)),
      ...(intent.articles ?? []).map((slug) => articleSource(slug, locale)),
    ];
    // One extra at most. The curated links already are the answer, and a weak fourth
    // suggestion only makes the strong first one look less certain.
    const extra = hits.filter((hit) => hit.score >= (hits[0]?.score ?? 0) * INTENT_SOURCE_FLOOR).slice(0, 1);
    return {
      answer: text,
      sources: dedupe([...curated, ...extra.map((hit) => sourceFromChunk(hit.chunk))]),
      confidence: "high",
    };
  }

  const unsure: ChatReply = {
    answer: strings.noAnswer,
    sources: dedupe([...strongSources, ...fallbackSources(locale)]),
    confidence: "low",
  };

  const top: Hit | undefined = hits.find((hit) => hit.chunk.kind === "help") ?? hits[0];
  if (!top || top.score < CONFIDENCE_FLOOR) return unsure;

  const wanted = new Set(tokenise(message));
  const prose = bestSentences(top.chunk.text, message, locale);
  const listed = steps(top.chunk.text);

  // A section can hold a list that has nothing to do with the question — "what the
  // recipient sees" under an article about sharing, say. Showing it as numbered steps
  // makes an unrelated list look like the answer, so the list has to earn it by matching
  // the question at least as well as the best prose does.
  const listText = listed.join(" ");
  const useSteps =
    matchesAny(asked, PROCEDURAL[locale]) && listed.length >= 2 && overlap(listText, wanted) >= Math.max(1, prose.overlap);

  const body = useSteps ? listed.map((step) => `- ${step}`).join("\n") : prose.text;
  if (!body || (!useSteps && prose.overlap === 0)) return unsure;

  const lead = strings.fromSource(`**${breadcrumb(top.chunk)}**`);
  return { answer: `${lead}\n\n${clamp(body, locale)}`, sources: dedupe(strongSources), confidence: "high" };
}
