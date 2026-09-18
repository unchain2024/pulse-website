import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function V6ComparisonSection() {
  const t = useTranslations("site.pricing.v6ComparisonSection");

  return (
    <section className="v6-comparison-section">
      <div className="wrap">
        <details className="v6-comparison">
          <summary>
            {t.rich("comparePlanDetails", {
              span: (chunks: ReactNode) => <span>{chunks}</span>,
              span2: (chunks: ReactNode) => <span aria-hidden="true" className="v6-summary-plus">{chunks}</span>,
            })}
          </summary>
          <div className="v6-table-scroll" role="region" aria-label={t("planComparison")} tabIndex={0}>
            <table>
              <caption className="sr-only">
                {t("pricingPlanComparison")}
              </caption>
              <thead>
                <tr>
                  <th scope="col">
                    {t("details")}
                  </th>
                  <th scope="col">
                    {t("freeTrial")}
                  </th>
                  <th scope="col">
                    {t("business")}
                  </th>
                  <th scope="col">
                    {t("enterprise")}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    {t("price")}
                  </th>
                  <td>
                    {t("free")}
                  </td>
                  <td>
                    {t("text")}
                  </td>
                  <td>
                    {t("contactUs")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("prepCaptureNotes")}
                  </th>
                  <td>
                    {t("tryFeatures")}
                  </td>
                  <td>
                    {t("included")}
                  </td>
                  <td>
                    {t("included2")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("emailTasksCrmDrafts")}
                  </th>
                  <td>
                    {t("exploreFeatures")}
                  </td>
                  <td>
                    {t("included3")}
                  </td>
                  <td>
                    {t("included4")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("knowledgeTerminology")}
                  </th>
                  <td>
                    {t("scopeDiscussedSetup")}
                  </td>
                  <td>
                    {t("included5")}
                  </td>
                  <td>
                    {t("included6")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("connectorsSetup")}
                  </th>
                  <td>
                    {t("discussIntegrations")}
                  </td>
                  <td>
                    {t("configuredWorkflow")}
                  </td>
                  <td>
                    {t("designedRequirements")}
                  </td>
                </tr>
                <tr>
                  <th scope="row">
                    {t("implementationAdministration")}
                  </th>
                  <td>
                    {t("gettingStartedGuidance")}
                  </td>
                  <td>
                    {t("standardSupport")}
                  </td>
                  <td>
                    {t("customImplementationRollout")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </details>
      </div>
    </section>
  );
}
