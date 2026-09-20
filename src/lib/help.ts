import helpData from "@/data/help.json";

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

const data = helpData as unknown as HelpData;

/** Short blurbs shown on the help home category cards. */
const CATEGORY_DESCRIPTIONS: Record<string, string> = {
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
};

export const POPULAR_SLUGS = [
  "getting-started/first-time-setup",
  "taking-notes/transcription",
  "sharing/sharing-notes",
];

/** Replaces the {{PRODUCT}}-style placeholders the articles are authored with. */
export function substitute(value: string): string {
  return String(value ?? "").replace(/\{\{([A-Z_0-9]+)\}\}/g, (match, key) => data.tokens[key] ?? match);
}

export function normalise(value: string): string {
  return String(value).normalize("NFKC").toLowerCase().replace(/\s+/g, " ").trim();
}

export const helpUpdated = data.updated;
export const categories = data.cats;
export const groups = data.groups;
export const articleOrder = data.order;

export function categoryDescription(key: string): string {
  return CATEGORY_DESCRIPTIONS[key] ?? "";
}

export function getArticle(slug: string): HelpArticle | undefined {
  return data.articles[slug];
}

export function allSlugs(): string[] {
  return Object.keys(data.articles).filter((slug) => slug !== "index");
}

export function articlesInCategory(key: string): HelpArticle[] {
  return Object.entries(data.articles)
    .filter(([slug, article]) => article.category === key && slug !== "index")
    .map(([, article]) => article);
}

export function categoriesWithArticles(): Array<[string, string]> {
  return Object.entries(data.cats).filter(([key]) => articlesInCategory(key).length > 0);
}

export function neighbours(slug: string): { prev?: HelpArticle; next?: HelpArticle } {
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
  return substitute(html).replace(/href="#\/([^"\s]*)"/g, (_m, target) => `href="/${locale}/help/${target}"`);
}

export type SearchHit = { slug: string; title: string; description: string };

/** Full-text search, matching the prototype: every term must appear somewhere. */
export function searchArticles(query: string): SearchHit[] {
  const q = normalise(query);
  const terms = q.split(" ").filter(Boolean);
  if (!terms.length) return [];

  const strip = (html: string) => html.replace(/<[^>]*>/g, " ");

  return Object.entries(data.articles)
    .filter(([slug]) => slug !== "index")
    .map(([slug, article]) => {
      const title = substitute(article.title);
      const description = substitute(article.description);
      const haystack = normalise(`${title} ${description} ${strip(substitute(article.html))}`);
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
