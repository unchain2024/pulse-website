"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import { init as initShell } from "./runtime/shell";
import { init as initChrome } from "./runtime/chrome";
import { init as initInteractive } from "./runtime/interactive";
import { init as initGranola } from "./runtime/granola";
import { init as initBrand } from "./runtime/brand";
import { init as initV6 } from "./runtime/v6";
import { init as initV7 } from "./runtime/v7";

import { routing } from "@/i18n/routing";

type Teardown = () => void;

const RUNTIMES: Array<() => Teardown> = [
  initShell,
  initChrome,
  initInteractive,
  initGranola,
  initBrand,
  initV6,
  initV7,
];

/**
 * The prototype's behaviour was a set of scripts that bound to the DOM once, on
 * load. Next replaces page content on navigation, so they are re-run per route
 * and torn down again on the way out.
 */
export function SiteRuntime() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const teardowns: Teardown[] = [];
    for (const start of RUNTIMES) {
      try {
        teardowns.push(start());
      } catch (error) {
        // One broken section must not take the rest of the page down with it.
        console.error("[pulse] runtime failed to start", error);
      }
    }
    return () => {
      for (const stop of teardowns) {
        try { stop(); } catch { /* teardown is best effort */ }
      }
    };
  }, [pathname]);

  // The prototype swapped languages by toggling a data attribute; here the same
  // control moves between the /ja and /en trees.
  useEffect(() => {
    const buttons = Array.from(
      document.querySelectorAll<HTMLButtonElement>(".lang-sw button[data-lang]")
    );
    const handlers: Array<() => void> = [];

    for (const button of buttons) {
      const target = button.dataset.lang;
      const isActive = target === locale;
      button.classList.toggle("on", isActive);
      button.setAttribute("aria-pressed", String(isActive));

      const onClick = () => {
        if (!target || target === locale) return;
        const rest = pathname.replace(new RegExp(`^/(${routing.locales.join("|")})`), "");
        router.push(`/${target}${rest}`);
      };
      button.addEventListener("click", onClick);
      handlers.push(() => button.removeEventListener("click", onClick));
    }

    return () => handlers.forEach((off) => off());
  }, [pathname, locale, router]);

  return null;
}
