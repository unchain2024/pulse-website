import { normalise } from "@/lib/help";

/**
 * Hiragana, katakana, kana extensions, CJK ideographs (+ extension A), compatibility
 * ideographs and halfwidth katakana. Everything else counts as "Latin" for our purposes.
 */
const CJK_CLASS = "\u3040-\u309f\u30a0-\u30ff\u31f0-\u31ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f";
const CJK_SPAN = new RegExp(`[${CJK_CLASS}]+|[^${CJK_CLASS}]+`, "gu");
const IS_CJK = new RegExp(`^[${CJK_CLASS}]`, "u");
const SEPARATORS = /[^\p{L}\p{N}]+/u;

/** Digit grouping is written both ways in the corpus, so ¥3,000 and ¥3、000 must index as 3000. */
const GROUPED_DIGITS = /(\d)[,、](\d)/g;

/**
 * Turns text into match terms. Indexing and querying both go through this function —
 * that symmetry is the whole trick, because a query only ever matches terms that were
 * produced by the same rules.
 *
 * Japanese is not written with spaces, so word splitting cannot work on it. CJK runs are
 * emitted as overlapping character bigrams instead: 共有範囲 becomes 共有|有範|範囲, and a
 * query for the same phrase reproduces all three. Bigrams do over-match (有範 is not a
 * word), but BM25 weights every term by how rare it is, so the accidental ones carry
 * almost no weight. Unigrams are deliberately not emitted: a common kanji would appear in
 * nearly every article and drown out the terms that actually discriminate.
 */
export function tokenise(value: string): string[] {
  const text = normalise(value).replace(GROUPED_DIGITS, "$1$2");
  const tokens: string[] = [];

  for (const run of text.split(SEPARATORS)) {
    if (!run) continue;
    for (const span of run.match(CJK_SPAN) ?? []) {
      if (IS_CJK.test(span)) {
        if (span.length === 1) {
          tokens.push(span);
          continue;
        }
        for (let i = 0; i < span.length - 1; i += 1) tokens.push(span.slice(i, i + 2));
      } else {
        tokens.push(span);
        // Two cheap stand-ins for a stemmer, which would be a dependency. Plural folding
        // so "notes" meets "note", and a five-character prefix so "change", "changing"
        // and "changed" all meet on "chang" — without which a question phrased in the
        // infinitive never matches a heading written as a gerund. Both are extra tokens
        // rather than replacements, so the full word still carries most of the weight.
        if (span.length > 3 && span.endsWith("es")) tokens.push(span.slice(0, -2));
        else if (span.length > 3 && span.endsWith("s")) tokens.push(span.slice(0, -1));
        if (span.length > 5) tokens.push(span.slice(0, 5));
      }
    }
  }

  return tokens;
}

/**
 * Rough token count used to budget how much text we show. CJK characters carry about one
 * token each while Latin text runs closer to four characters per token.
 */
export function estimateLength(value: string): number {
  let cjk = 0;
  const chars = Array.from(value);
  for (const char of chars) if (IS_CJK.test(char)) cjk += 1;
  return cjk + Math.ceil((chars.length - cjk) / 4);
}

export function hasCjk(value: string): boolean {
  return new RegExp(`[${CJK_CLASS}]`, "u").test(value);
}
