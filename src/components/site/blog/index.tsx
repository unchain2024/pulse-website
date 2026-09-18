import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/blog/Block1";

export function BlogPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="blog" data-nav="" data-title={t("blog")}>
      <Block1 />
    </div>
  );
}
