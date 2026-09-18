import { useTranslations } from "next-intl";

import { Block1 } from "@/components/site/waitlist/Block1";

export function WaitlistPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page on" data-page="waitlist" data-nav="" data-title={t("waitlist")}>
      <Block1 />
    </div>
  );
}
