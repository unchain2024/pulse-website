import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function PHelpTeaser() {
  const t = useTranslations("site.home.pHelpTeaser");
  const locale = useLocale();

  return (
    <section className="p-help-teaser">
      <div className="wrap">
        <div>
          <span className="eyebrow">
            {t("littleHelpGoesLong")}
          </span>
          <h2>
            {t("littleHelpGettingStarted")}
          </h2>
          <p>
            {t.rich("firstSetupEverydayWorkflow", {
              br: () => <br />,
            })}
          </p>
          <Link className="text-link" href={`/${locale}/help`}>
            {t("openHelpCenter")}
          </Link>
        </div>
        <div className="help-quicklinks">
          {t.rich("firstTimeSetupConnect", {
            a: (chunks: ReactNode) => <Link href={`/${locale}/help/getting-started/first-time-setup`}>{chunks}</Link>,
            span: (chunks: ReactNode) => <span>{chunks}</span>,
            a2: (chunks: ReactNode) => <Link href={`/${locale}/help/getting-started/syncing-your-calendars`}>{chunks}</Link>,
            a3: (chunks: ReactNode) => <Link href={`/${locale}/help/consent-security-privacy/getting-consent`}>{chunks}</Link>,
          })}
        </div>
      </div>
    </section>
  );
}
