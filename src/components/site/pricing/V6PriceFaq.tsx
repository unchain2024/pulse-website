import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6PriceFaq() {
  const t = useTranslations("site.pricing.v6PriceFaq");
  const locale = useLocale();

  return (
    <section className="v6-price-faq">
      <div className="wrap">
        <h2>
          {t("questionsAboutPricing")}
        </h2>
        <div className="faq">
          <details>
            <summary>
              {t("whatCanITry")}
            </summary>
            <div className="a">
              {t("exploreBriefingTranscriptionNotes")}
            </div>
          </details>
          <details>
            <summary>
              {t("howBusinessPriced")}
            </summary>
            <div className="a">
              {t("business3000Per")}
            </div>
          </details>
          <details>
            <summary>
              {t("howDoIDiscuss")}
            </summary>
            <div className="a">
              {t.rich("reviewTeamSizeTools", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/demo`}>{chunks}</Link>,
              })}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
