import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/privacy/Block1";

export function PrivacyPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="privacy" data-nav="" data-title={t("privacy")}>
      <Block1 />
    </div>
  );
}
