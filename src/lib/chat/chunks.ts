import { SITE_PAGES } from "@/data/site-pages";
import { articleEntries, categories, substitute } from "@/lib/help";
import type { Locale } from "@/i18n/routing";

export type Chunk = {
  id: number;
  kind: "help" | "page";
  /** Help article slug, or the page id from SITE_PAGES. */
  slug: string;
  /** Table-of-contents id, so the link lands on the right heading. */
  anchor?: string;
  /** Locale-prefixed and ready to link. */
  url: string;
  title: string;
  heading?: string;
  /** The enclosing h2, when this chunk came from an h3. */
  parentHeading?: string;
  category?: string;
  /** Plain text, tokens already substituted. */
  text: string;
  /** Title, headings, description and keywords — weighted above the body when scoring. */
  boosted: string;
};

/**
 * Tokens the corpus authors have not filled in yet. Their values read like real prose
 * ("Please contact us", "(system requirements)"), so a passage built around one would look
 * like a confident answer while saying nothing. Chunks made mostly of these are dropped.
 */
const PLACEHOLDER_TOKENS = [
  "ADDRESS",
  "REP",
  "PHONE",
  "INVOICE_NO",
  "DATE",
  "EFFECTIVE_DATE",
  "POSTAL_CODE",
  "APPLICATION_PERIOD",
  "REFUND_POLICY_SEATS",
  "SYSTEM_REQUIREMENTS",
  "REFERRAL_BONUS",
];

const ENTITIES: Array<[RegExp, string]> = [
  [/&nbsp;/g, " "],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&quot;/g, '"'],
  [/&#39;/g, "'"],
  [/&amp;/g, "&"],
];

/**
 * HTML to plain text.
 *
 * Deliberately not article.text: that field is byte-identical in help.json and help.en.json
 * and is Japanese in both, so an English reader would silently be served Japanese. Nothing
 * else reads it, which is why the bug has gone unnoticed.
 *
 * Block ends become newlines and list items keep their marker, because a procedure answers a
 * "how do I" question far better as steps than as one run-on sentence.
 */
export function htmlToText(html: string): string {
  let text = html
    .replace(/<a\b[^>]*class="mx-anchor"[^>]*>.*?<\/a>/gi, "")
    .replace(/<li\b[^>]*>/gi, "\n- ")
    .replace(/<\/(?:td|th)>/gi, " | ")
    .replace(/<\/(?:p|h2|h3|h4|tr|ul|ol|li|div|table)>/gi, "\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<[^>]*>/g, " ");
  for (const [pattern, value] of ENTITIES) text = text.replace(pattern, value);
  return text
    .replace(/[ \t　]+/g, " ")
    .replace(/ ?\n ?/g, "\n")
    .replace(/\n{2,}/g, "\n")
    .replace(/\n- (?=\n|$)/g, "")
    .trim();
}

const HEADING_SPLIT = /(?=<h[23] id=")/;
const HEADING_META = /^<h([23]) id="([^"]+)"[^>]*>(.*?)<\/h[23]>/s;

/** Long sections are split again so one chunk never swamps a search result, keeping the anchor. */
const MAX_CHUNK_CHARS = 1500;

function splitLongText(text: string): string[] {
  if (text.length <= MAX_CHUNK_CHARS) return [text];
  const parts: string[] = [];
  let current = "";
  for (const line of text.split("\n")) {
    if (current && current.length + line.length > MAX_CHUNK_CHARS) {
      parts.push(current.trim());
      current = "";
    }
    current += (current ? "\n" : "") + line;
  }
  if (current.trim()) parts.push(current.trim());
  return parts;
}

function isMostlyPlaceholder(text: string, placeholders: string[]): boolean {
  const solid = text.replace(/\s+/g, "").length;
  if (!solid) return true;
  let filled = 0;
  for (const value of placeholders) {
    if (!value) continue;
    let from = 0;
    for (;;) {
      const at = text.indexOf(value, from);
      if (at === -1) break;
      filled += value.replace(/\s+/g, "").length;
      from = at + value.length;
    }
  }
  return filled / solid > 0.3;
}

function buildHelpChunks(locale: Locale, next: () => number): Chunk[] {
  const cats = categories(locale);
  const placeholders = PLACEHOLDER_TOKENS.map((token) => substitute(`{{${token}}}`, locale)).filter(
    (value) => !value.startsWith("{{")
  );
  const chunks: Chunk[] = [];

  for (const [slug, article] of articleEntries(locale)) {
    const title = substitute(article.title, locale);
    const description = substitute(article.description, locale);
    const category = cats[article.category];
    const base = `/${locale}/help/${slug}`;
    let parentHeading: string | undefined;

    for (const section of substitute(article.html, locale).split(HEADING_SPLIT)) {
      const meta = section.match(HEADING_META);
      const level = meta ? Number(meta[1]) : 0;
      const anchor = meta?.[2];
      const heading = meta ? htmlToText(meta[3]) : undefined;
      if (level === 2) parentHeading = heading;

      const body = htmlToText(meta ? section.slice(meta[0].length) : section);
      if (!body) continue;
      if (isMostlyPlaceholder(body, placeholders)) continue;

      const parent = level === 3 ? parentHeading : undefined;
      // The heading outranks the title: the title says which article, the heading says
      // which section, and picking the wrong section of the right article reads worse.
      const boosted = [title, title, heading, heading, heading, parent, description].filter(Boolean).join(" ");

      for (const text of splitLongText(body)) {
        chunks.push({
          id: next(),
          kind: "help",
          slug,
          anchor,
          url: anchor ? `${base}#${anchor}` : base,
          title,
          heading,
          parentHeading: parent,
          category,
          text,
          boosted,
        });
      }
    }
  }

  return chunks;
}

function buildPageChunks(locale: Locale, next: () => number): Chunk[] {
  return SITE_PAGES.map((page) => {
    const blurb = page.blurbs[locale];
    const keywords = (page.keywords?.[locale] ?? []).join(" ");
    return {
      id: next(),
      kind: "page" as const,
      slug: page.id,
      url: `/${locale}${page.path}`,
      title: page.titles[locale],
      text: blurb,
      // Pages have no body to speak of, so their few words all count for more.
      boosted: [page.titles[locale], page.titles[locale], page.titles[locale], keywords, keywords, blurb]
        .filter(Boolean)
        .join(" "),
    };
  });
}

export function buildChunks(locale: Locale): Chunk[] {
  let id = 0;
  const next = () => {
    id += 1;
    return id;
  };
  return [...buildHelpChunks(locale, next), ...buildPageChunks(locale, next)];
}
