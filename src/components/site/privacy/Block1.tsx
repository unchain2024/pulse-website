import { useTranslations } from "next-intl";

export function Block1() {
  const t = useTranslations("site.privacy.block1");

  return (
    <section>
      <div className="legal-doc">
        <h1>
          {t("privacyPolicy")}
        </h1>
        <p className="upd">
          {t("lastUpdatedSeptember1")}
        </p>
        <h2>
          {t("text")}
        </h2>
        <p>
          {t("accountDetailsNameEmail")}
        </p>
        <h2>
          {t("text2")}
        </h2>
        <p>
          {t("provideImproveServiceSupport")}
        </p>
        <h2>
          {t("text3")}
        </h2>
        <p>
          {t("useTranscriptionAiCloud")}
        </p>
        <h2>
          {t("text4")}
        </h2>
        <p>
          {t("dataStoredEncryptedRegion")}
        </p>
        <h2>
          {t("text5")}
        </h2>
        <p>
          {t("encryptionRestTransitAccess")}
        </p>
        <h2>
          {t("text6")}
        </h2>
        <p>
          {t("mayRequestAccessCorrection")}
        </p>
        <h2>
          {t("text7")}
        </h2>
        <p>
          {t("websiteUsesCookiesConvenience")}
        </p>
        <h2>
          {t("text8")}
        </h2>
        <p>
          {t("changesPolicyWillPosted")}
        </p>
        <h2>
          {t("text9")}
        </h2>
        <p>
          {t("unchainIncPrivacyPrivacy")}
        </p>
      </div>
    </section>
  );
}
