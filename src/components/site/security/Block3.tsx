import { useTranslations } from "next-intl";

export function Block3() {
  const t = useTranslations("site.security.block3");

  return (
    <section className="tight">
      <div className="wrap">
        <h2 className="tc" style={{ marginBottom: "48px" }}>
          {t("dataSecurity")}
        </h2>
        <div className="faq">
          <details>
            <summary>
              {t("howDoesPulseSecure")}
            </summary>
            <div className="a">
              {t("encryptionRestTransitLeast")}
            </div>
          </details>
          <details>
            <summary>
              {t("doesPulseWorkLocally")}
            </summary>
            <div className="a">
              {t("audioCapturedLocallySent")}
            </div>
          </details>
          <details>
            <summary>
              {t("howDoesPulseManage")}
            </summary>
            <div className="a">
              {t("regularDependencyScanningPublic")}
            </div>
          </details>
          <details>
            <summary>
              {t("doesPulseConductPenetration")}
            </summary>
            <div className="a">
              {t("annualThirdPartyPenetration")}
            </div>
          </details>
          <details>
            <summary>
              {t("doesPulseHaveAny")}
            </summary>
            <div className="a">
              {t("soc2TypeIi")}
            </div>
          </details>
          <details>
            <summary>
              {t("howCanIReport")}
            </summary>
            <div className="a">
              {t("emailSecurityLlFollow")}
            </div>
          </details>
          <details>
            <summary>
              {t("doSupportSsoSaml")}
            </summary>
            <div className="a">
              {t("yesEnterprisePlan")}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
