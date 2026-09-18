import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function MemoryInteractive() {
  const t = useTranslations("site.home.memoryInteractive");
  const locale = useLocale();

  return (
    <section className="memory-interactive v7-memory">
      <div className="wrap">
        <div className="memory-copy">
          <span className="eyebrow">
            {t("askKnowledge")}
          </span>
          <h2 className="memory-type">
            {t.rich("askAcrossMeetingHistory", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("whatDidCommitWeek")}
          </p>
        </div>
        <div className="ui-demo" data-view="chat" data-locale={locale === "en" ? "en" : "ja"} />
      </div>
    </section>
  );
}
