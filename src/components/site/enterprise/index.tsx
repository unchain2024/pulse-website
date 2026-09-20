import { useTranslations } from "next-intl";

import { HeroL } from "@/components/site/enterprise/HeroL";
import { Block2 } from "@/components/site/enterprise/Block2";
import { Block3 } from "@/components/site/enterprise/Block3";
import { Block4 } from "@/components/site/enterprise/Block4";
import { Block5 } from "@/components/site/enterprise/Block5";

export function EnterprisePage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="enterprise" data-nav="" data-title={t("enterprise")}>
      <HeroL />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
    </div>
  );
}
