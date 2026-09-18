"use client";

import { useEffect, useRef } from "react";

/**
 * Article bodies are authored HTML. They ship as-is; this only re-binds the
 * in-article tab groups the prototype wired up after rendering.
 */
export function ArticleBody({ html }: { html: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const offs: Array<() => void> = [];

    root.querySelectorAll(".mx-tabs").forEach((group) => {
      const tabs = Array.from(group.querySelectorAll<HTMLElement>(".mx-tab"));
      const panels = Array.from(group.querySelectorAll<HTMLElement>(".mx-tabpanel"));

      tabs.forEach((tab) => {
        const onClick = () => {
          const id = tab.dataset.tab;
          tabs.forEach((other) => {
            other.classList.toggle("on", other === tab);
            other.setAttribute("aria-selected", String(other === tab));
          });
          panels.forEach((panel) => panel.classList.toggle("hide", panel.id !== id));
        };
        tab.addEventListener("click", onClick);
        offs.push(() => tab.removeEventListener("click", onClick));
      });
    });

    return () => offs.forEach((off) => off());
  }, [html]);

  return <div className="help-content" ref={ref} dangerouslySetInnerHTML={{ __html: html }} />;
}
