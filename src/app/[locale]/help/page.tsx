import type { Metadata } from "next";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { HelpSearch } from "@/components/site/help/HelpSearch";
import {
  articlesInCategory,
  categoriesWithArticles,
  categoryDescription,
  getArticle,
  POPULAR_SLUGS,
  substitute,
} from "@/lib/help";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "site.help" });
  return { title: t("title") };
}

export default async function HelpHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "site.help" });

  const cats = categoriesWithArticles();
  const popular = POPULAR_SLUGS.map((slug) => ({ slug, article: getArticle(slug) })).flatMap(
    ({ slug, article }) => (article ? [{ slug, article }] : [])
  );
  const total = cats.reduce((n, [key]) => n + articlesInCategory(key).length, 0);

  return (
    <section className="help-home">
      <div className="wrap">
        <HelpSearch total={total}>
          <div className="help-categories">
            {cats.map(([key, name], i) => (
              <Link className="help-category" key={key} href={`/${locale}/help/category/${key}`}>
                <div className="cat-icon">{String(i + 1).padStart(2, "0")}</div>
                <h2>{name}</h2>
                <p>{categoryDescription(key)}</p>
                <div className="cat-n">
                  {articlesInCategory(key).length} {t("articleCount")}
                </div>
              </Link>
            ))}
          </div>
          <div className="help-popular">
            <h2>{t("popular")}</h2>
            <div className="help-results">
              {popular.map(({ slug, article }) => (
                <Link className="help-result" key={slug} href={`/${locale}/help/${slug}`}>
                  <h3>{substitute(article.title)}</h3>
                  <p>{substitute(article.description)}</p>
                </Link>
              ))}
            </div>
          </div>
        </HelpSearch>
      </div>
    </section>
  );
}
