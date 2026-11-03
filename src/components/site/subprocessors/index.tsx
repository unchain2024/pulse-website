import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/subprocessors/Block1";

export function SubprocessorsPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="subprocessors" data-nav="" data-title={t("subprocessors")}>
      <Block1 />
    </div>
  );
}
