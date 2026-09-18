import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations("site.footer");
  const locale = useLocale();

  return (
    <footer>
      <div className="wrap">
        <div className="fgrid">
          <div>
            <h4>
              {t("features")}
            </h4>
            <ul>
              <li>
                {t.rich("notepad", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/notepad`}>{chunks}</Link>,
                })}
              </li>
            </ul>
          </div>
          <div>
            <h4>
              {t("product")}
            </h4>
            <ul>
              <li>
                {t.rich("pricing", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/pricing`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("enterprise", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/enterprise`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("integrations", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/integrations`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("sales", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/solutions-sales`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("productManagement", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/solutions-product`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("mcp", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/integrations`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("exploreMore", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/notepad`}>{chunks}</Link>,
                })}
              </li>
            </ul>
          </div>
          <div>
            <h4>
              {t("company")}
            </h4>
            <ul>
              <li>
                {t.rich("useCases", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/customers`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("careers", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/careers`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("press", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/blog`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("events", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/blog`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("unchain", {
                  a: (chunks: ReactNode) => <a href="https://www.the-unchain.com">{chunks}</a>,
                })}
              </li>
            </ul>
          </div>
          <div>
            <h4>
              {t("resources")}
            </h4>
            <ul>
              <li>
                {t.rich("blog", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/blog`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("security", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/security`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("transparency", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/security`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("helpCenter", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("contactUs", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/demo`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("terms", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/terms`}>{chunks}</Link>,
                })}
              </li>
              <li>
                {t.rich("privacy", {
                  a: (chunks: ReactNode) => <Link href={`/${locale}/privacy`}>{chunks}</Link>,
                })}
              </li>
            </ul>
          </div>
        </div>
        <div className="fbot">
          <div className="soc">
            <a href="https://www.the-unchain.com" aria-label={t("unchain2")}>
              <img
                className="unchain-logo"
                data-asset="UNCHAIN"
                alt={t("unchain3")}
                src="/assets/unchain.webp"
              />
            </a>
          </div>
          <span>
            {t("unchainInc2026")}
          </span>
        </div>
        <div className="wordmark" aria-hidden="true">
          <span className="mk">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 12h4l2.5-6 3 12 2.5-6H21" />
            </svg>
          </span>
          {t("pulse")}
        </div>
      </div>
    </footer>
  );
}
