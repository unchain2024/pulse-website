import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6Customization() {
  const t = useTranslations("site.integrations.v6Customization");
  const locale = useLocale();

  return (
    <section className="v6-customization">
      <div className="wrap">
        <div>
          <span className="eyebrow">
            {t("customSetup")}
          </span>
          <h2>
            {t.rich("configureConnectionBusinessContext", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("reviewToolsDataFields")}
          </p>
          <Link className="text-link" href={`/${locale}/demo`}>
            {t("discussSetup")}
          </Link>
        </div>
        <ol>
          <li>
            <span>
              {t("text")}
            </span>
            <div>
              <h3>
                {t("reviewToolsDataFields2")}
              </h3>
              <p>
                {t("identifyInformationConnectWhere")}
              </p>
            </div>
          </li>
          <li>
            <span>
              {t("text2")}
            </span>
            <div>
              <h3>
                {t("mapRelationshipsPermissions")}
              </h3>
              <p>
                {t("mapPeopleProjectsConfigure")}
              </p>
            </div>
          </li>
          <li>
            <span>
              {t("text3")}
            </span>
            <div>
              <h3>
                {t("checkWorkingFlow")}
              </h3>
              <p>
                {t("checkConnectedInformationSources")}
              </p>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
