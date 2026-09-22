"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

/**
 * Wrapper for the help centre: applies the help layout and keeps the sidebar
 * toggle used on narrow screens.
 */
export function HelpChrome({ children }: { children: React.ReactNode }) {
  const t = useTranslations("site.help");

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
    <div id="help-app">
      <div className="help-mobile-bar wrap">
        <button className="help-sidebar-toggle" type="button" onClick={toggleSidebar}>
          {t("articleList")}
        </button>
      </div>
      <div id="help-view">{children}</div>
    </div>
  );
}
