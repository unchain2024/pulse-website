import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-sales/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-sales/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-sales/V6End";

export function SolutionsSalesPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-sales" data-nav="" data-title={t("solutions_sales")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
