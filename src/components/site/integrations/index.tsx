import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/integrations/V6PageHero";
import { V6Catalog } from "@/components/site/integrations/V6Catalog";
import { Technology } from "@/components/site/integrations/Technology";
import { V6Customization } from "@/components/site/integrations/V6Customization";
import { V6End } from "@/components/site/integrations/V6End";

export function IntegrationsPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-integrations on" data-page="integrations" data-nav="" data-title={t("integrations")}>
      <V6PageHero />
      <V6Catalog />
      <Technology />
      <V6Customization />
      <V6End />
    </div>
  );
}
