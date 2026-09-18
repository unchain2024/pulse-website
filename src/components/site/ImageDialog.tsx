"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";

/**
 * The enlarge-a-screenshot dialog from the prototype. It is opened by elements
 * carrying data-screen; the current markup has none, but the dialog ships with
 * the page exactly as it did before.
 */
export function ImageDialog() {
  const t = useTranslations("site.shell");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    const image = dialog.querySelector("img");
    let lastTrigger: HTMLElement | null = null;

    const openers = Array.from(document.querySelectorAll<HTMLElement>("[data-screen]"));
    const offs: Array<() => void> = [];

    for (const opener of openers) {
      const onClick = () => {
        lastTrigger = opener;
        const src = opener.dataset.screen;
        if (image && src) {
          image.src = src;
          image.alt = opener.querySelector("img")?.alt ?? "";
        }
        dialog.showModal();
      };
      opener.addEventListener("click", onClick);
      offs.push(() => opener.removeEventListener("click", onClick));
    }

    const onBackdrop = (e: MouseEvent) => {
      if (e.target === dialog) dialog.close();
    };
    const onClose = () => lastTrigger?.focus();
    dialog.addEventListener("click", onBackdrop);
    dialog.addEventListener("close", onClose);

    return () => {
      offs.forEach((off) => off());
      dialog.removeEventListener("click", onBackdrop);
      dialog.removeEventListener("close", onClose);
    };
  }, []);

  return (
    <dialog className="p-image-dialog" aria-label={t("productScreen")} ref={ref}>
      <button type="button" data-close-image onClick={() => ref.current?.close()}>
        {t("close")}
      </button>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" />
    </dialog>
  );
}
