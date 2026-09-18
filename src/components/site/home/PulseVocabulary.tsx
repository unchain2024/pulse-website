import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function PulseVocabulary() {
  const t = useTranslations("site.home.pulseVocabulary");
  const locale = useLocale();

  return (
    <section className="pulse-vocabulary v7-dictionary">
      <div className="wrap">
        <div className="pulse-section-copy">
          <span className="eyebrow">
            {t("companyIndustryContext")}
          </span>
          <h2>
            {t.rich("learnCompanySLanguage", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("internalShorthandProductNames")}
          </p>
          <p className="pulse-section-note">
            {t("buildCompanyDictionaryMeanings")}
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
