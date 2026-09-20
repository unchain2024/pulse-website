import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block5() {
  const t = useTranslations("site.enterprise.block5");
  const locale = useLocale();

  return (
    <section>
      <div className="wrap cta-center">
        <h2 className="mid">
          {t("readyMakeEveryConversation")}
        </h2>
        <p className="sub c">
          {t("seeDemoBuiltAround")}
        </p>
        <div className="btns">
          {t.rich("downloadFreeBookDemo", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/contact`}>{chunks}</Link>,
            a2: () => null,
          })}
        </div>
      </div>
    </section>
  );
}
