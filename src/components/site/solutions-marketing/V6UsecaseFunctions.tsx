import { useTranslations, useLocale } from "next-intl";

export function V6UsecaseFunctions() {
  const t = useTranslations("site.solutions_marketing.v6UsecaseFunctions");
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
              {t("interviewNotes")}
            </h2>
            <p>
              {t("transcribeInterviewsKeepNotes")}
            </p>
          </article>
          <article>
            <span className="v6-core-index">
              {t("text2")}
            </span>
            <h2>
              {t("reviewTopic")}
            </h2>
            <p>
              {t("askAcrossInterviewsReview")}
            </p>
          </article>
          <article>
            <span className="v6-core-index">
              {t("text3")}
            </span>
            <h2>
              {t("shareSelectedKnowledge")}
            </h2>
            <p>
              {t("chooseWhichSummariesStatements")}
            </p>
          </article>
        </div>
        <div className="v6-demo-shell">
          <div className="ui-demo" data-view="notes" data-locale={locale === "en" ? "en" : "ja"} />
          <p className="pulse-demo-caption">
            {t("interactiveProductExample")}
          </p>
        </div>
      </div>
    </section>
  );
}
