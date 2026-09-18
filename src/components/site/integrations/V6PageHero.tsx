import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6PageHero() {
  const t = useTranslations("site.integrations.v6PageHero");
  const locale = useLocale();

  return (
    <section className="v6-page-hero v6-integrations-hero">
      <div className="wrap">
        <span className="eyebrow">
          {t("pulseConnectors")}
        </span>
        <h1>
          {t.rich("over100ConnectorsConfigured", {
            br: () => <br />,
          })}
        </h1>
        <p>
          {t.rich("moreThan100Connectors", {
            br: () => <br />,
          })}
        </p>
        <div className="btns">
          {t.rich("discussIntegrationsExploreTechnology", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/demo`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link className="btn btn-line" href={`/${locale}/integrations#technology`}>{chunks}</Link>,
          })}
        </div>
      </div>
    </section>
  );
}
