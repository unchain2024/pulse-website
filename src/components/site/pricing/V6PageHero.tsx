import { useTranslations } from "next-intl";

export function V6PageHero() {
  const t = useTranslations("site.pricing.v6PageHero");

  return (
    <section className="v6-page-hero">
      <div className="wrap">
        <span className="eyebrow">
          {t("pricing")}
        </span>
        <h1>
          {t("plansPulse")}
        </h1>
        <p>
          {t("startFreeTrial")}
        </p>
      </div>
    </section>
  );
}
