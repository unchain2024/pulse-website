import { useTranslations, useLocale } from "next-intl";

export function V6UsecaseFunctions() {
  const t = useTranslations("site.solutions_operations.v6UsecaseFunctions");
  const locale = useLocale();

  return (
    <section className="v6-usecase-functions">
      <div className="wrap">
        <div className="v6-usecase-feature-list">
          <article>
            <span className="v6-core-index">
              {t("text")}
            </span>
            <h2>
              {t("keepDecisionsTheirSources")}
            </h2>
            <p>
              {t("linkEachDecisionDecision")}
            </p>
          </article>
          <article>
            <span className="v6-core-index">
              {t("text2")}
            </span>
            <h2>
              {t("trackOwnersDates")}
            </h2>
            <p>
              {t("turnAgreedFollowUp")}
            </p>
          </article>
          <article>
            <span className="v6-core-index">
              {t("text3")}
            </span>
            <h2>
              {t("prepareNextBrief")}
            </h2>
            <p>
              {t("preparePreviousAgreementsOpen")}
            </p>
          </article>
        </div>
        <div className="v6-demo-shell">
          <div className="ui-demo" data-view="actions" data-locale={locale === "en" ? "en" : "ja"} />
          <p className="pulse-demo-caption">
            {t("interactiveProductExample")}
          </p>
        </div>
      </div>
    </section>
  );
}
