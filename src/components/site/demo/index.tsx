import { useTranslations } from "next-intl";


export function DemoPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="demo" data-nav="" data-title={t("demo")}>
    </div>
  );
}
