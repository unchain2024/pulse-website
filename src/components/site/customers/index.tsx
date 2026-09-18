import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/customers/Block1";

export function CustomersPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="customers" data-title={t("customers")}>
      <Block1 />
    </div>
  );
}
