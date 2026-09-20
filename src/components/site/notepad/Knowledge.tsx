import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function Knowledge() {
  const t = useTranslations("site.notepad.knowledge");
  const locale = useLocale();

  return (
    <section className="v6-sharing" data-section="knowledge">
      <div className="wrap">
        <div className="pulse-section-copy">
          <span className="eyebrow">
            {t("knowledgeSharing")}
          </span>
          <h2>
            {t.rich("privateDefaultSharedChoice", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("everyMeetingStartsPrivate")}
          </p>
        </div>
        <div className="v6-demo-shell">
          <div className="ui-demo" data-view="shared" data-locale={locale === "en" ? "en" : "ja"} />
        </div>
      </div>
    </section>
  );
}
