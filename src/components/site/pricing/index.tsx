import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/pricing/V6PageHero";
import { V6PlansSection } from "@/components/site/pricing/V6PlansSection";
import { V6ComparisonSection } from "@/components/site/pricing/V6ComparisonSection";
import { V6PriceFaq } from "@/components/site/pricing/V6PriceFaq";
import { V6End } from "@/components/site/pricing/V6End";

export function PricingPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-pricing on" data-page="pricing" data-nav="" data-title={t("pricing")}>
      <V6PageHero />
      <V6PlansSection />
      <V6ComparisonSection />
      <V6PriceFaq />
      <V6End />
    </div>
  );
}
