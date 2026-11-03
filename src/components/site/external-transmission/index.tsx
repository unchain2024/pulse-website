import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/external-transmission/Block1";

export function ExternalTransmissionPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="external-transmission" data-nav="" data-title={t("external_transmission")}>
      <Block1 />
    </div>
  );
}
