import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-marketing/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-marketing/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-marketing/V6End";

export function SolutionsMarketingPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-marketing" data-nav="" data-title={t("solutions_marketing")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
