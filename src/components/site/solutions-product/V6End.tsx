import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6End() {
  const t = useTranslations("site.solutions_product.v6End");
  const locale = useLocale();

  return (
    <section className="v6-end">
      <div className="wrap">
        <div>
          <span className="eyebrow">
            {t("pulseUnchain")}
          </span>
          <h2>
            {t("tryPulse")}
          </h2>
        </div>
        <div className="btns">
          {t.rich("startFreeTrialBook", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/contact`}>{chunks}</Link>,
            a2: () => null,
          })}
        </div>
      </div>
    </section>
  );
}
