import { PulseMark } from "./PulseMark";
import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Navbar() {
  const t = useTranslations("site.navbar");
  const locale = useLocale();

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="logo" href={`/${locale}`} aria-label={t("pulseUnchain")}>
          <PulseMark/>
          {t("pulse")}
        </Link>
        <nav className="pill-nav" aria-label={t("mainNavigation")}>
          <details>
            <summary>
              {t("solutions")}
            </summary>
            <div className="nav-pop">
              {t.rich("salesCustomerSuccessProduct", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/solutions-sales`}>{chunks}</Link>,
                a2: (chunks: ReactNode) => <Link href={`/${locale}/solutions-customer-success`}>{chunks}</Link>,
                a3: (chunks: ReactNode) => <Link href={`/${locale}/solutions-product`}>{chunks}</Link>,
                a4: (chunks: ReactNode) => <Link href={`/${locale}/solutions-marketing`}>{chunks}</Link>,
                a5: (chunks: ReactNode) => <Link href={`/${locale}/solutions-operations`}>{chunks}</Link>,
                a6: (chunks: ReactNode) => <Link href={`/${locale}/solutions-hr`}>{chunks}</Link>,
              })}
            </div>
          </details>
          <Link href={`/${locale}/integrations`}>
            {t("integrations")}
          </Link>
          <Link href={`/${locale}/pricing`}>
            {t("pricing")}
          </Link>
          <Link href={`/${locale}/help`}>
            {t("help")}
          </Link>
        </nav>
        <div className="nav-right">

          <Link className="fbtn line xs" href={`/${locale}/contact`}>
            {t("getStarted")}
          </Link>
          <span className="lang-sw" role="group" aria-label={t("language")}>
            <button data-lang="ja">
              {t("ja")}
            </button>
            <button data-lang="en">
              {t("en")}
            </button>
          </span>
          <button className="burger" aria-label={t("menu")} aria-expanded="false">
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
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
