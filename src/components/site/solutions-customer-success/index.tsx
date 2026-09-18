import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/solutions-customer-success/V6PageHero";
import { V6UsecaseFunctions } from "@/components/site/solutions-customer-success/V6UsecaseFunctions";
import { V6End } from "@/components/site/solutions-customer-success/V6End";

export function SolutionsCustomerSuccessPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-usecase on" data-page="solutions-customer-success" data-nav="" data-title={t("solutions_customer_success")}>
      <V6PageHero />
      <V6UsecaseFunctions />
      <V6End />
    </div>
  );
}
