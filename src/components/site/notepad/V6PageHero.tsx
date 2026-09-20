import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6PageHero() {
  const t = useTranslations("site.notepad.v6PageHero");
  const locale = useLocale();

  return (
    <section className="v6-page-hero">
      <div className="wrap">
        <span className="eyebrow">
          {t("pulseNotepad")}
        </span>
        <h1>
          {t.rich("recordConversationConnectContext", {
            br: () => <br />,
          })}
        </h1>
        <p>
          {t.rich("prepareCalendarOrganizeConversations", {
            br: () => <br />,
          })}
        </p>
        <div className="btns">
          {t.rich("startFreeTrialIntegrations", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/contact`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link className="btn btn-line" href={`/${locale}/integrations`}>{chunks}</Link>,
          })}
        </div>
        <nav className="v6-product-index" aria-label={t("productFeatures")}>
          {t.rich("prepCaptureNotesFollow", {
            a: (chunks: ReactNode) => <Link href={`/${locale}/notepad#capture`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link href={`/${locale}/notepad#follow-up`}>{chunks}</Link>,
            a3: (chunks: ReactNode) => <Link href={`/${locale}/notepad#terminology`}>{chunks}</Link>,
            a4: (chunks: ReactNode) => <Link href={`/${locale}/notepad#knowledge`}>{chunks}</Link>,
          })}
        </nav>
      </div>
    </section>
  );
}
