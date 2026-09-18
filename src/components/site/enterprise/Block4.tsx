import { useTranslations } from "next-intl";

export function Block4() {
  const t = useTranslations("site.enterprise.block4");

  return (
    <section className="tight">
      <div className="wrap">
        <h2 className="tc" style={{ marginBottom: "48px" }}>
          {t("questionsAnswers")}
        </h2>
        <div className="faq">
          <details>
            <summary>
              {t("canSupportSecurityReview")}
            </summary>
            <div className="a">
              {t("yesProvideCompletedSecurity")}
            </div>
          </details>
          <details>
            <summary>
              {t("whereDataStored")}
            </summary>
            <div className="a">
              {t("encryptedRegionStorageAdmins")}
            </div>
          </details>
          <details>
            <summary>
              {t("doHelpRollout")}
            </summary>
            <div className="a">
              {t("enterpriseIncludesDedicatedSuccess")}
            </div>
          </details>
          <details>
            <summary>
              {t("thereSeatMinimum")}
            </summary>
            <div className="a">
              {t("enterpriseStarts25Seats")}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
