import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/careers/Block1";
import { Block2 } from "@/components/site/careers/Block2";
import { Block3 } from "@/components/site/careers/Block3";
import { Block4 } from "@/components/site/careers/Block4";
import { Block5 } from "@/components/site/careers/Block5";
import { Block6 } from "@/components/site/careers/Block6";

export function CareersPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="careers" data-nav="" data-title={t("careers")}>
      <Block1 />
      <Block2 />
      <Block3 />
      <Block4 />
      <Block5 />
      <Block6 />
    </div>
  );
}
