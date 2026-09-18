import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6PageHero() {
  const t = useTranslations("site.solutions_hr.v6PageHero");
  const locale = useLocale();

  return (
    <section className="v6-page-hero">
      <div className="wrap">
        <nav className="v6-usecase-nav" aria-label={t("useCases")}>
          {t.rich("salesCustomerSuccessMarketing", {
            a: (chunks: ReactNode) => <Link href={`/${locale}/solutions-sales`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link href={`/${locale}/solutions-customer-success`}>{chunks}</Link>,
            a3: (chunks: ReactNode) => <Link href={`/${locale}/solutions-marketing`}>{chunks}</Link>,
            a4: (chunks: ReactNode) => <Link href={`/${locale}/solutions-operations`}>{chunks}</Link>,
            a5: (chunks: ReactNode) => <Link href={`/${locale}/solutions-hr`} aria-current="page">{chunks}</Link>,
            a6: (chunks: ReactNode) => <Link href={`/${locale}/solutions-product`}>{chunks}</Link>,
          })}
        </nav>
        <span className="eyebrow">
          {t("pulseHrTalent")}
        </span>
        <h1>
          {t("notesInterviewsOneOnes")}
        </h1>
        <p>
          {t("organizeConversationsNotesThen")}
        </p>
        <div className="btns">
          {t.rich("bookDemoExploreProduct", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/demo`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link className="btn btn-line" href={`/${locale}/notepad`}>{chunks}</Link>,
          })}
        </div>
      </div>
    </section>
  );
}
