import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/blog-briefs/Block1";
import { V6End } from "@/components/site/blog-briefs/V6End";

export function BlogBriefsPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="blog-briefs" data-nav="" data-title={t("blog_briefs")}>
      <Block1 />
      <V6End />
    </div>
  );
}
