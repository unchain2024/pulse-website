import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/terms/Block1";

export function TermsPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="terms" data-nav="" data-title={t("terms")}>
      <Block1 />
    </div>
  );
}
