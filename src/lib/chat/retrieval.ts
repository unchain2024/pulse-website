import { buildChunks, type Chunk } from "@/lib/chat/chunks";
import { tokenise } from "@/lib/chat/tokenise";
import { normalise } from "@/lib/help";
import { routing, type Locale } from "@/i18n/routing";

export type Hit = { chunk: Chunk; score: number };

type Posting = { doc: number; tf: number };

type Index = {
  chunks: Chunk[];
  postings: Map<string, Posting[]>;
  lengths: number[];
  averageLength: number;
};

/** Okapi BM25 defaults. k1 damps repeated terms, b controls how much length is penalised. */
const K1 = 1.2;
const B = 0.75;

/** A chunk containing the query verbatim is almost always the right one. */
const PHRASE_BONUS = 2;
/**
 * Rewards a section whose heading is mostly about the question, not merely one that
 * mentions it. "Changing an individual note's scope" is four content words, three of which
 * the question supplies; "What the recipient sees" shares one. Both sit under an article
 * about sharing notes, so without this the generic section wins on the article title alone.
 */
const HEADING_BONUS = 2.5;
/** Nudges marketing pages up, so "where do I find X" surfaces a destination and not only prose. */
const PAGE_PRIOR = 0.4;

const CANDIDATES = 24;
const MAX_PER_SLUG = 2;
const MAX_SLUGS = 6;
const MAX_HITS = 8;

function buildIndex(locale: Locale): Index {
  const chunks = buildChunks(locale);
  const postings = new Map<string, Posting[]>();
  const lengths: number[] = new Array(chunks.length).fill(0);

  chunks.forEach((chunk, doc) => {
    // Repeating the boosted fields is how field weighting is applied: a term in a heading
    // counts three times, in the title twice, and in the body once.
    const terms = tokenise(`${chunk.boosted} ${chunk.text}`);
    lengths[doc] = terms.length;

    const counts = new Map<string, number>();
    for (const term of terms) counts.set(term, (counts.get(term) ?? 0) + 1);
    for (const [term, tf] of counts) {
      const list = postings.get(term);
      if (list) list.push({ doc, tf });
      else postings.set(term, [{ doc, tf }]);
    }
  });

  const total = lengths.reduce((sum, value) => sum + value, 0);
  return { chunks, postings, lengths, averageLength: total / Math.max(1, chunks.length) };
}

const INDEXES = new Map<Locale, Index>();

/**
 * Built on first use rather than at module load. The corpus JSON is already resident via
 * help.ts, so the only cost is tokenising it — around a tenth of a second per locale, which
 * is not worth paying during a build for a feature most visitors never open.
 */
function getIndex(locale: Locale): Index {
  let index = INDEXES.get(locale);
  if (!index) {
    index = buildIndex(locale);
    INDEXES.set(locale, index);
  }
  return index;
}

export function warmIndex(locale: Locale): void {
  getIndex(locale);
}

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (routing.locales as readonly string[]).includes(value);
}

/**
 * Ranks chunks against a query, then thins the result so no single article can fill the
 * answer: at most two passages from any one article, at most six articles, eight chunks total.
 *
 * `phrase` is the visitor's own wording, kept separate because `query` may carry synonym
 * expansions — those would never appear verbatim and would kill the exact-phrase bonus.
 */
export function retrieve(query: string, locale: Locale, phrase = query, limit = MAX_HITS): Hit[] {
  const terms = tokenise(query);
  if (!terms.length) return [];

  const index = getIndex(locale);
  const { chunks, postings, lengths, averageLength } = index;
  const documents = chunks.length;
  const scores = new Map<number, number>();

  const idf = (term: string): number => {
    const list = postings.get(term);
    const df = list ? list.length : 0;
    return Math.log(1 + (documents - df + 0.5) / (df + 0.5));
  };

  const seen = new Set<string>();
  for (const term of terms) {
    if (seen.has(term)) continue;
    seen.add(term);
    const list = postings.get(term);
    if (!list) continue;
    const weight = idf(term);
    for (const { doc, tf } of list) {
      const norm = tf * (K1 + 1) / (tf + K1 * (1 - B + (B * lengths[doc]) / averageLength));
      scores.set(doc, (scores.get(doc) ?? 0) + weight * norm);
    }
  }

  if (!scores.size) return [];

  const exact = normalise(phrase);
  const asked = new Set(terms);
  const ranked: Hit[] = [];
  for (const [doc, score] of scores) {
    const chunk = chunks[doc];
    let final = score;
    if (exact.length > 1 && normalise(`${chunk.title} ${chunk.heading ?? ""} ${chunk.text}`).includes(exact)) {
      final += PHRASE_BONUS;
    }
    if (chunk.heading) {
      // Weighted by rarity, not counted. Matching "what" or "to" in a heading means
      // nothing; matching "microphone" means almost everything. Without this, "what
      // happens to my data" lands on "What happens to the calendar connection".
      let shared = 0;
      let total = 0;
      for (const term of new Set(tokenise(chunk.heading))) {
        const weight = idf(term);
        total += weight;
        if (asked.has(term)) shared += weight;
      }
      if (total > 0) final += HEADING_BONUS * (shared / total);
    }
    if (chunk.kind === "page") final += PAGE_PRIOR;
    ranked.push({ chunk, score: final });
  }

  ranked.sort((a, b) => b.score - a.score);

  const perSlug = new Map<string, number>();
  const slugs = new Set<string>();
  const kept: Hit[] = [];
  for (const hit of ranked.slice(0, CANDIDATES)) {
    const used = perSlug.get(hit.chunk.slug) ?? 0;
    if (used >= MAX_PER_SLUG) continue;
    if (!slugs.has(hit.chunk.slug) && slugs.size >= MAX_SLUGS) continue;
    perSlug.set(hit.chunk.slug, used + 1);
    slugs.add(hit.chunk.slug);
    kept.push(hit);
    if (kept.length >= limit) break;
  }

  return kept;
}

/**
 * Development-only guard: SITE_PAGES is hand-written, so it can silently fall behind the
 * routes it describes. Comparing the two is what stops that going unnoticed.
 */
export function pageCoverageGaps(routeIds: string[]): { missing: string[]; extra: string[] } {
  const described = new Set(buildChunks("en").filter((chunk) => chunk.kind === "page").map((chunk) => chunk.slug));
  const routes = new Set([...routeIds, "home"]);
  return {
    missing: [...routes].filter((id) => !described.has(id)).sort(),
    extra: [...described].filter((id) => !routes.has(id)).sort(),
  };
}
