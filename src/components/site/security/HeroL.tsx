import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function HeroL() {
  const t = useTranslations("site.security.heroL");
  const locale = useLocale();

  return (
    <section className="hero-l" style={{ paddingBottom: "0" }}>
      <div className="wrap" style={{ display: "block" }}>
        <h1 style={{ maxWidth: "16em" }}>
          {t.rich("securityPrivacyHowWorks", {
            br: () => <br />,
          })}
        </h1>
        <p className="sub" style={{ marginTop: "20px" }}>
          {t("securityPrivacyUtmostImportance")}
        </p>
        <div className="freebar" style={{ maxWidth: "640px", fontFamily: "var(--sans)" }}>
          {t.rich("encourageSecurityVulnerabilityReports", {
            a: (chunks: ReactNode) => <Link className="link" href={`/${locale}/help`}>{chunks}</Link>,
          })}
        </div>
      </div>
    </section>
  );
}
