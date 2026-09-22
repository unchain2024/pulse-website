import helpJa from "@/data/help.json";
import helpEn from "@/data/help.en.json";

export type HelpArticle = {
  title: string;
  slug: string;
  category: string;
  description: string;
  html: string;
  toc?: Array<{ id: string; text: string }>;
};

type HelpData = {
  articles: Record<string, HelpArticle>;
  order: string[];
  groups: Array<{ tab: string; id: string; name: string; slugs: string[] }>;
  cats: Record<string, string>;
  tokens: Record<string, string>;
  updated: string;
};

/**
 * The help corpus exists once per locale. Both files share the same slugs, ids
 * and structure, so only the prose differs — which keeps every link, anchor and
 * table of contents entry valid in either language.
 */
const CORPUS: Record<string, HelpData> = {
  ja: helpJa as unknown as HelpData,
  en: helpEn as unknown as HelpData,
};

const corpus = (locale: string): HelpData => CORPUS[locale] ?? CORPUS.ja;

/** Short blurbs shown on the help home category cards. */
const CATEGORY_DESCRIPTIONS: Record<string, Record<string, string>> = {
  ja: {
    "getting-started": "インストール、サインイン、カレンダーの連携。",
    "taking-notes": "文字起こし、ノート、ブリーフ、フォローメール。",
    "getting-more-from-your-notes": "チャット、レシピ、会議をまたいだ情報の活用。",
    customising: "用語辞書、言語、プロフィールの設定。",
    sharing: "共有範囲、フォルダ、ツールとの連携。",
    "consent-security-privacy": "録音の同意、データの扱い、共有の管理。",
    "managing-your-account": "プラン、支払い、アカウントの変更。",
    troubleshooting: "音声、カレンダー、ノートの問題を解決。",
    policies: "利用規約、プライバシー、サービスのポリシー。",
    general: "ワークスペース、アカウント、その他のご案内。",
  },
  en: {
    "getting-started": "Installing, signing in and connecting your calendar.",
    "taking-notes": "Transcription, notes, briefs and follow-up email.",
    "getting-more-from-your-notes": "Chat, recipes and working across meetings.",
    customising: "Terminology, language and profile settings.",
    sharing: "Who a note reaches, folders and integrations.",
    "consent-security-privacy": "Consent to record, how data is handled, managing sharing.",
    "managing-your-account": "Plans, payment and account changes.",
    troubleshooting: "Fixing audio, calendar and note problems.",
    policies: "Terms, privacy and service policies.",
    general: "Workspaces, accounts and everything else.",
  },
};

export const POPULAR_SLUGS = [
  "getting-started/first-time-setup",
  "taking-notes/transcription",
  "sharing/sharing-notes",
];

/** Replaces the {{PRODUCT}}-style placeholders the articles are authored with. */
export function substitute(value: string, locale: string): string {
  const tokens = corpus(locale).tokens;
  return String(value ?? "").replace(/\{\{([A-Z_0-9]+)\}\}/g, (match, key) => tokens[key] ?? match);
}

export function normalise(value: string): string {
  return String(value).normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

export function helpUpdated(locale: string): string {
  return corpus(locale).updated;
}

export function categories(locale: string): Record<string, string> {
  return corpus(locale).cats;
}

export function groups(locale: string) {
  return corpus(locale).groups;
}

export function categoryDescription(key: string, locale: string): string {
  const table = CATEGORY_DESCRIPTIONS[locale] ?? CATEGORY_DESCRIPTIONS.ja;
  return table[key] ?? "";
}

export function getArticle(slug: string, locale: string): HelpArticle | undefined {
  return corpus(locale).articles[slug];
}

/** Slugs are shared across locales, so routes generate once from the source corpus. */
export function allSlugs(): string[] {
  return Object.keys(CORPUS.ja.articles).filter((slug) => slug !== "index");
}

export function articlesInCategory(key: string, locale: string): HelpArticle[] {
  return Object.entries(corpus(locale).articles)
    .filter(([slug, article]) => article.category === key && slug !== "index")
    .map(([, article]) => article);
}

export function categoriesWithArticles(locale: string): Array<[string, string]> {
  return Object.entries(corpus(locale).cats).filter(
    ([key]) => articlesInCategory(key, locale).length > 0
  );
}

export function neighbours(slug: string, locale: string): { prev?: HelpArticle; next?: HelpArticle } {
  const data = corpus(locale);
  const i = data.order.indexOf(slug);
  if (i < 0) return {};
  return {
    prev: i > 0 ? data.articles[data.order[i - 1]] : undefined,
    next: data.articles[data.order[i + 1]],
  };
}

/**
 * Article bodies link with href="#/slug"; rewrite those to real routes and make
 * in-page anchors resolve against the current article.
 */
export function prepareArticleHtml(html: string, locale: string): string {
  return substitute(html, locale).replace(
    /href="#\/([^"\s]*)"/g,
    (_m, target) => `href="/${locale}/help/${target}"`
  );
}

export type SearchHit = { slug: string; title: string; description: string };

/** Full-text search, matching the prototype: every term must appear somewhere. */
export function searchArticles(query: string, locale: string): SearchHit[] {
  const q = normalise(query);
  const terms = q.split(" ").filter(Boolean);
  if (!terms.length) return [];

  const strip = (html: string) => html.replace(/<[^>]*>/g, " ");

  return Object.entries(corpus(locale).articles)
    .filter(([slug]) => slug !== "index")
    .map(([slug, article]) => {
      const title = substitute(article.title, locale);
      const description = substitute(article.description, locale);
      const haystack = normalise(`${title} ${description} ${strip(substitute(article.html, locale))}`);
      return { slug, title, description, haystack };
    })
    .filter((row) => terms.every((term) => row.haystack.includes(term)))
    .map((row) => ({
      ...row,
      score:
        (normalise(row.title).includes(q) ? 20 : 0) +
        (normalise(row.description).includes(q) ? 5 : 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map(({ slug, title, description }) => ({ slug, title, description }));
}
