import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-operations/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-operations/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-operations/V6End";

export function SolutionsOperationsPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-operations" data-nav="" data-title={t("solutions_operations")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
