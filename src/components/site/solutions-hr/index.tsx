import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-hr/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-hr/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-hr/V6End";

export function SolutionsHrPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-hr" data-nav="" data-title={t("solutions_hr")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
