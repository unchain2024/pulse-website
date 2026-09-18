import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-product/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-product/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-product/V6End";

export function SolutionsProductPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-product" data-nav="" data-title={t("solutions_product")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
