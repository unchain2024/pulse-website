import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6PlansSection() {
  const t = useTranslations("site.pricing.v6PlansSection");
  const locale = useLocale();

  return (
    <section className="v6-plans-section">
      <div className="wrap">
        <div className="v6-plans">
          <article className="v6-plan ">
            <div className="v6-plan-head">
              <h2>
                {t("freeTrial")}
              </h2>
              <p>
                {t("explorePulse")}
              </p>
            </div>
            <div className="v6-plan-price">
              {t.rich("free", {
                strong: (chunks: ReactNode) => <strong className="">{chunks}</strong>,
                span: (chunks: ReactNode) => <span>{chunks}</span>,
              })}
            </div>
            <Link className="btn btn-line" href={`/${locale}/contact`}>
              {t("startFreeTrial")}
            </Link>
            <ul>
              <li>
                {t("tryMeetingPrepCapture")}
              </li>
              <li>
                {t("exploreNotesFollowUp")}
              </li>
              <li>
                {t("discussWorkflowsIntegrations")}
              </li>
            </ul>
          </article>
          <article className="v6-plan v6-plan-featured">
            <div className="v6-plan-head">
              <h2>
                {t("business")}
              </h2>
              <p>
                {t("everydayWork")}
              </p>
            </div>
            <div className="v6-plan-price">
              {t.rich("text", {
                strong: (chunks: ReactNode) => <strong className="">{chunks}</strong>,
                span: (chunks: ReactNode) => <span>{chunks}</span>,
              })}
            </div>
            <Link className="btn btn-dark" href={`/${locale}/contact`}>
              {t("getBusiness")}
            </Link>
            <ul>
              <li>
                {t("meetingBriefsTranscriptionNotes")}
              </li>
              <li>
                {t("emailTasksCrmUpdate")}
              </li>
              <li>
                {t("knowledgeSharingCompanyVocabulary")}
              </li>
              <li>
                {t("integrationsQuestionsAcrossContext")}
              </li>
            </ul>
          </article>
          <article className="v6-plan ">
            <div className="v6-plan-head">
              <h2>
                {t("enterprise")}
              </h2>
              <p>
                {t("configuredOrganization")}
              </p>
            </div>
            <div className="v6-plan-price">
              {t.rich("contactUs", {
                strong: (chunks: ReactNode) => <strong className="v6-price-word">{chunks}</strong>,
                span: (chunks: ReactNode) => <span>{chunks}</span>,
              })}
            </div>
            <Link className="btn btn-line" href={`/${locale}/contact`}>
              {t("contactUs2")}
            </Link>
            <ul>
              <li>
                {t("everythingBusiness")}
              </li>
              <li>
                {t("customIntegrationsDataMapping")}
              </li>
              <li>
                {t("organizationSharingAdminConfiguration")}
              </li>
              <li>
                {t("implementationRolloutSupport")}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
