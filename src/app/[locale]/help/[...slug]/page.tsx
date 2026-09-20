import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { ArticleBody } from "@/components/site/help/ArticleBody";
import { routing } from "@/i18n/routing";
import {
  allSlugs,
  articlesInCategory,
  categories,
  categoryDescription,
  getArticle,
  groups,
  helpUpdated,
  neighbours,
  prepareArticleHtml,
  substitute,
} from "@/lib/help";

type Params = { locale: string; slug: string[] };

export function generateStaticParams() {
  const articles = allSlugs().map((slug) => slug.split("/"));
  const cats = Object.keys(categories).map((key) => ["category", key]);
  return routing.locales.flatMap((locale) =>
    [...articles, ...cats].map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "site.help" });

  if (slug[0] === "category") {
    const name = categories[slug[1]];
    return { title: name ? `${name} — Pulse ${t("breadcrumbHelp")}` : t("title") };
  }

  const article = getArticle(slug.join("/"));
  return {
    title: article ? `${substitute(article.title)} — Pulse ${t("breadcrumbHelp")}` : t("notFound"),
    description: article ? substitute(article.description) : undefined,
  };
}

export default async function HelpArticlePage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "site.help" });

  // #help/category/<key> was its own view in the prototype.
  if (slug[0] === "category") {
    const key = slug[1];
    const name = categories[key];
    if (!name) notFound();
    const items = articlesInCategory(key);

    return (
      <section className="help-home">
        <div className="wrap" style={{ maxWidth: "940px" }}>
          <Link className="help-category-back" href={`/${locale}/help`}>
            {t("backToHelp")}
          </Link>
          <h1>{name}</h1>
          <p className="help-desc">{categoryDescription(key)}</p>
          <div className="help-results">
            {items.map((article) => (
              <Link className="help-result" key={article.slug} href={`/${locale}/help/${article.slug}`}>
                <h3>{substitute(article.title)}</h3>
                <p>{substitute(article.description)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const key = slug.join("/");
  const article = getArticle(key);
  if (!article) notFound();

  const { prev, next } = neighbours(key);
  const html = prepareArticleHtml(article.html, locale);

  return (
    <div className="wrap help-layout">
      <aside className="help-sidebar" aria-label={t("sidebarLabel")}>
        <Link className="side-search-link" href={`/${locale}/help`}>
          {t("searchHomeLink")}
        </Link>
        {groups
          .filter((group) => group.slugs.length)
          .map((group) => (
            <div key={group.id}>
              <h3>{group.name}</h3>
              {group.slugs
                .flatMap((s) => {
                  const a = getArticle(s);
                  return a ? [{ slug: s, article: a }] : [];
                })
                .map(({ slug: s, article: a }) => (
                  <Link
                    key={s}
                    className={s === key ? "active" : ""}
                    aria-current={s === key ? "page" : undefined}
                    href={`/${locale}/help/${s}`}
                  >
                    {substitute(a.title)}
                  </Link>
                ))}
            </div>
          ))}
      </aside>

      <article className="help-article">
        <div className="help-breadcrumb">
          <Link href={`/${locale}/help`}>{t("breadcrumbHelp")}</Link>
          {" / "}
          <Link href={`/${locale}/help/category/${article.category}`}>
            {categories[article.category] ?? ""}
          </Link>
        </div>
        <h1 tabIndex={-1}>{substitute(article.title)}</h1>
        <p className="help-desc">{substitute(article.description)}</p>

        <ArticleBody html={html} />

        <div className="help-article-bottom">
          {prev ? (
            <Link href={`/${locale}/help/${prev.slug}`}>← {substitute(prev.title)}</Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={`/${locale}/help/${next.slug}`}>{substitute(next.title)} →</Link>
          ) : (
            <span />
          )}
        </div>
        <div className="help-article-footer">
          {t("lastUpdated")}
          {helpUpdated}
        </div>
      </article>

      <aside className="help-toc" aria-label={t("tocLabel")}>
        <h2>{t("tocTitle")}</h2>
        {(article.toc ?? []).map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {substitute(item.text)}
          </a>
        ))}
      </aside>
    </div>
  );
}
