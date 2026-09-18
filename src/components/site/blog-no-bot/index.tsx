import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/blog-no-bot/Block1";
import { V6End } from "@/components/site/blog-no-bot/V6End";

export function BlogNoBotPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="blog-no-bot" data-nav="" data-title={t("blog_no_bot")}>
      <Block1 />
      <V6End />
    </div>
  );
}
