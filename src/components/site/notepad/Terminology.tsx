import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Terminology() {
  const t = useTranslations("site.notepad.terminology");
  const locale = useLocale();

  return (
    <section className="pulse-vocabulary" data-section="terminology">
      <div className="wrap">
        <div className="pulse-section-copy">
          <span className="eyebrow">
            {t("companyIndustryContext")}
          </span>
          <h2>
            {t.rich("companySLanguageIndustry", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("internalShorthandKnownFew")}
          </p>
          <p className="pulse-section-note">
            {t("organizeMeaningsPronunciationsConnected")}
          </p>
          <Link className="text-link" href={`/${locale}/integrations#technology`}>
            {t("howContextLayerWorks")}
          </Link>
        </div>
        <div className="pulse-vocabulary-demo">
          <div className="ui-demo" data-view="dictionary" data-locale={locale === "en" ? "en" : "ja"} />
        </div>
      </div>
    </section>
  );
}
