"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

type Hit = { slug: string; title: string; description: string };

const SEARCH_ICON = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m16 16 4 4" />
  </svg>
);

/**
 * The help home search. The prototype searched an in-page copy of every article;
 * here the same full-text search runs on the server, debounced the same way.
 */
export function HelpSearch({ total, children }: { total: number; children: React.ReactNode }) {
  const t = useTranslations("site.help");
  const locale = useLocale();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Hit[] | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const q = query.trim();
    if (!q) {
      setResults(null);
      return;
    }
    const controller = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const response = await fetch(
          `/api/help/search?q=${encodeURIComponent(q)}&locale=${encodeURIComponent(locale)}`,
          { signal: controller.signal }
        );
        const body = (await response.json()) as { results: Hit[] };
        setResults(body.results);
      } catch {
        /* aborted or offline — leave the previous results in place */
      }
    }, 120);

    return () => {
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query, locale]);

  // ⌘K / Ctrl+K focuses search, as it did in the prototype.
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // Structure mirrors the prototype: the count closes <header>, results follow it.
  return (
    <>
      <header>
        <span className="eyebrow">{t("eyebrow")}</span>
        <h1>{t("homeTitle")}</h1>
        <p>{t("homeLead")}</p>
        <div className="help-search-wrap">
          {SEARCH_ICON}
          <input
            ref={inputRef}
            className="help-search"
            type="search"
            aria-label={t("searchLabel")}
            placeholder={t("searchPlaceholder")}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>
        <div className="help-count">
          {total} {t("guideCount")}
        </div>
      </header>

      <div id="help-home-results">
        {results === null ? (
          children
        ) : (
          <>
            <p className="help-count" role="status">
              {results.length} {t("resultsFound")}
            </p>
            <div className="help-results">
              {results.length ? (
                results.map((hit) => (
                  <Link className="help-result" key={hit.slug} href={`/${locale}/help/${hit.slug}`}>
                    <h3>{hit.title}</h3>
                    <p>{hit.description}</p>
                  </Link>
                ))
              ) : (
                <div className="help-empty">
                  {t("noResults")}
                  <br />
                  {t("noResultsHint")}
                  <br />
                  <Link className="text-link" href={`/${locale}/contact`}>
                    {t("contact")}
                  </Link>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
