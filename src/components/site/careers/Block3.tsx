import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block3() {
  const t = useTranslations("site.careers.block3");
  const locale = useLocale();

  return (
    <section className="tight">
      <div
        className="wrap-n"
        style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "64px", alignItems: "start" }}
      >
        <div className="legal-doc" style={{ margin: "0", maxWidth: "none" }}>
          <h2 style={{ marginTop: "0" }}>
            {t("makeDentUniverse")}
          </h2>
          <p>
            {t("veAlwaysAdmiredComputing")}
          </p>
          <h2>
            {t("reHumansBuildingHumans")}
          </h2>
          <p>
            {t("buildingGreatProductRare")}
          </p>
          <h2>
            {t("designedTokyoBuiltJapanese")}
          </h2>
          <p>
            {t("japaneseMeetingsJapaneseBusiness")}
          </p>
        </div>
        <div className="jobs">
          <div className="grp">
            {t("design")}
          </div>
          <Link href={`/${locale}/help`}>
            <i>
              {t("pd")}
            </i>
            <div>
              {t.rich("productDesignerTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <div className="grp">
            {t("engineering")}
          </div>
          <Link href={`/${locale}/help`}>
            <i>
              {t("en")}
            </i>
            <div>
              {t.rich("productEngineerTranscriptionTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <Link href={`/${locale}/help`}>
            <i>
              {t("se")}
            </i>
            <div>
              {t.rich("securityEngineerTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <Link href={`/${locale}/help`}>
            <i>
              {t("en2")}
            </i>
            <div>
              {t.rich("productEngineerWindowsTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <Link href={`/${locale}/help`}>
            <i>
              {t("ai")}
            </i>
            <div>
              {t.rich("aiEngineerTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <div className="grp">
            {t("sales")}
          </div>
          <Link href={`/${locale}/help`}>
            <i>
              {t("sd")}
            </i>
            <div>
              {t.rich("salesDevelopmentRepresentativeTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <Link href={`/${locale}/help`}>
            <i>
              {t("ae")}
            </i>
            <div>
              {t.rich("accountExecutiveMidMarket", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <Link href={`/${locale}/help`}>
            <i>
              {t("cs")}
            </i>
            <div>
              {t.rich("customerSuccessManagerTokyo", {
                b: (chunks: ReactNode) => <b>{chunks}</b>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
          </Link>
          <p className="small" style={{ marginTop: "16px", textAlign: "center" }}>
            {t.rich("interestedButDonT", {
              br: () => <br />,
              a: (chunks: ReactNode) => <Link className="link" href={`/${locale}/contact`}>{chunks}</Link>,
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
