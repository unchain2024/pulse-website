import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function HeroL() {
  const t = useTranslations("site.enterprise.heroL");
  const locale = useLocale();

  return (
    <section className="hero-l">
      <div className="wrap">
        <div className="copy">
          <span className="eyebrow">
            {t("pulseEnterprise")}
          </span>
          <h1>
            {t.rich("turnMeetingNotesInto", {
              br: () => <br />,
            })}
          </h1>
          <p className="sub">
            {t("pulseCapturesWhatMatters")}
          </p>
          <Link className="btn btn-dark" href={`/${locale}/contact`}>
            {t("talkSales")}
          </Link>
        </div>
        <div className="product-hero-screen">
          <div className="ui-demo" data-view="shared" />
        </div>
      </div>
    </section>
  );
}
