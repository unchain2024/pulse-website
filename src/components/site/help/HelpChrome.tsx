"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const DARK_KEY = "pulse-help-dark";

/**
 * The bar above the help centre: dark mode (remembered per browser), print, and
 * the sidebar toggle used on narrow screens.
 */
export function HelpChrome({ children }: { children: React.ReactNode }) {
  const t = useTranslations("site.help");
  const locale = useLocale();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DARK_KEY) === "true") setDark(true);
    } catch {
      /* private mode or blocked storage — stay light */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DARK_KEY, String(dark));
    } catch {
      /* not fatal */
    }
  }, [dark]);

  // The stylesheets key the help centre's layout off a class on <body>.
  useEffect(() => {
    document.body.classList.add("help-mode");
    return () => document.body.classList.remove("help-mode");
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".help-sidebar");
    sidebar?.classList.toggle("is-open");
  };

  return (
    <div id="help-app" data-dark={dark ? "true" : undefined}>
      <div className="help-bar">
        <div className="wrap">
          <Link href={`/${locale}/help`}>
            Pulse / <span>{t("breadcrumbHelp")}</span>
          </Link>
          <div className="help-tools">
            <button className="help-sidebar-toggle" type="button" onClick={toggleSidebar}>
              {t("articleList")}
            </button>
            <button
              className="help-theme"
              type="button"
              aria-pressed={dark}
              onClick={() => setDark((d) => !d)}
            >
              {dark ? t("lightMode") : t("darkMode")}
            </button>
            <button className="print-help" type="button" onClick={() => window.print()}>
              {t("print")}
            </button>
            <Link href={`/${locale}/contact`}>{t("contact")}</Link>
          </div>
        </div>
      </div>
      <div id="help-view">{children}</div>
    </div>
  );
}
