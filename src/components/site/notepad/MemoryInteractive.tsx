import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function MemoryInteractive() {
  const t = useTranslations("site.notepad.memoryInteractive");
  const locale = useLocale();

  return (
    <section className="memory-interactive">
      <div className="wrap">
        <div className="memory-copy">
          <span className="eyebrow">
            {t("askKnowledge")}
          </span>
          <h2 className="memory-type">
            {t.rich("askAcrossConversationsDocuments", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("askAboutAccountHistory")}
          </p>
        </div>
        <div className="ui-demo" data-view="chat" data-locale={locale === "en" ? "en" : "ja"} />
      </div>
    </section>
  );
}
