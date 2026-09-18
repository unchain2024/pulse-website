import { useTranslations } from "next-intl";

export function Block1() {
  const t = useTranslations("site.terms.block1");

  return (
    <section>
      <div className="legal-doc">
        <h1>
          {t("termsService")}
        </h1>
        <p className="upd">
          {t("lastUpdatedSeptember1")}
        </p>
        <h2>
          {t("text")}
        </h2>
        <p>
          {t("theseTermsGovernUse")}
        </p>
        <h2>
          {t("text2")}
        </h2>
        <p>
          {t("mustRegisterAccurateInformation")}
        </p>
        <h2>
          {t("text3")}
        </h2>
        <p>
          {t("responsibleComplyingApplicableLaw")}
        </p>
        <h2>
          {t("text4")}
        </h2>
        <p>
          {t("ownNotesTranscriptsMetadata")}
        </p>
        <h2>
          {t("text5")}
        </h2>
        <p>
          {t("unlawfulUseInfringingThird")}
        </p>
        <h2>
          {t("text6")}
        </h2>
        <p>
          {t("feesPaymentTermsPaid")}
        </p>
        <h2>
          {t("text7")}
        </h2>
        <p>
          {t("serviceProvidedDoNot")}
        </p>
        <h2>
          {t("text8")}
        </h2>
        <p>
          {t("mayChangeTheseTerms")}
        </p>
        <h2>
          {t("text9")}
        </h2>
        <p>
          {t("theseTermsGovernedJapanese")}
        </p>
      </div>
    </section>
  );
}
