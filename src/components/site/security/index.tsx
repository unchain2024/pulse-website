import { useTranslations } from "next-intl";

import { HeroL } from "@/components/site/security/HeroL";
import { Block2 } from "@/components/site/security/Block2";
import { Block3 } from "@/components/site/security/Block3";
import { Block4 } from "@/components/site/security/Block4";
import { Block5 } from "@/components/site/security/Block5";
import { Block6 } from "@/components/site/security/Block6";

export function SecurityPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="security" data-nav="" data-title={t("security")}>
      <HeroL />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
      <Block6 />
    </div>
  );
}
