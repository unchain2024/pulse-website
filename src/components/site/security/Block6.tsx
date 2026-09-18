import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block6() {
  const t = useTranslations("site.security.block6");
  const locale = useLocale();

  return (
    <section>
      <div className="wrap cta-center">
        <h2 className="mid">
          {t("readyCalmerMoreProductive")}
        </h2>
        <p className="sub c">
          {t("joinWaitlistLlSend")}
        </p>
        <div className="btns">
          {t.rich("downloadFreeBookDemo", {
            a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/waitlist`}>{chunks}</Link>,
            a2: (chunks: ReactNode) => <Link className="btn btn-line" href={`/${locale}/demo`}>{chunks}</Link>,
          })}
        </div>
      </div>
    </section>
  );
}
