import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block2() {
  const t = useTranslations("site.security.block2");
  const locale = useLocale();

  return (
    <section className="tight">
      <div className="wrap">
        <div
          style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "72px", alignItems: "start" }}
          className="sec-grid"
        >
          <div className="legal-doc" style={{ maxWidth: "none", margin: "0" }}>
            <h2 style={{ marginTop: "0" }}>
              {t("basics")}
            </h2>
            <ul>
              <li>
                {t("pulseAppDesktopMacos")}
              </li>
              <li>
                {t("haveManuallyStartPulse")}
              </li>
              <li>
                {t("pulseWorksAnyMeeting")}
              </li>
              <li>
                {t("pulseUsesBestClass")}
              </li>
            </ul>
            <h2>
              {t("modelTraining")}
            </h2>
            <ul>
              <li>
                {t("doNotAllowThird")}
              </li>
              <li>
                {t("pulseDoesNotTrain")}
              </li>
            </ul>
            <h2>
              {t("noStoredRecordings")}
            </h2>
            <ul>
              <li>
                {t("pulseDoesnTStore")}
              </li>
            </ul>
            <h2>
              {t("controlWhoSeesNotes")}
            </h2>
            <ul>
              <li>
                {t("userControlWhoSees")}
              </li>
              <li>
                {t("canDeleteIndividualNotes")}
              </li>
            </ul>
            <h2>
              {t("everythingStoredIndustryStandard")}
            </h2>
            <ul>
              <li>
                {t("notesStoredRegionVirtual")}
              </li>
            </ul>
            <h2>
              {t("reHereIfNeed")}
            </h2>
            <ul>
              <li>
                {t.rich("ifHaveMoreQuestions", {
                  a: (chunks: ReactNode) => <Link className="link" href={`/${locale}/demo`}>{chunks}</Link>,
                })}
              </li>
            </ul>
          </div>
          <div style={{ display: "grid", gap: "16px", position: "sticky", top: "110px" }}>
            <div className="card">
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span className="ic" style={{ borderRadius: "50%" }}>
                  <svg
                    className=""
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3l8 3.5v5.5c0 4.5-3.4 8.2-8 9.5-4.6-1.3-8-5-8-9.5V6.5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </span>
                <div>
                  <b style={{ fontWeight: "500" }}>
                    {t("soc2")}
                  </b>
                  <p>
                    {t("rePreparingIndependentSoc")}
                  </p>
                  <Link className="link small" href={`/${locale}/help`}>
                    {t("seeTrustPage")}
                  </Link>
                </div>
              </div>
            </div>
            <div className="card">
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span className="ic" style={{ borderRadius: "50%" }}>
                  <svg
                    className=""
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18" />
                  </svg>
                </span>
                <div>
                  <b style={{ fontWeight: "500" }}>
                    {t("gdprAppi")}
                  </b>
                  <p>
                    {t("reCommittedGdprAppi")}
                  </p>
                  <Link className="link small" href={`/${locale}/privacy`}>
                    {t("readPrivacyPolicy")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
