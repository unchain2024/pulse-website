import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block4() {
  const t = useTranslations("site.security.block4");
  const locale = useLocale();
  const subprocessors = {
    a: (chunks: ReactNode) => <Link className="link" href={`/${locale}/subprocessors`}>{chunks}</Link>,
  };

  return (
    <section className="tight">
      <div className="wrap">
        <h2 className="tc" style={{ marginBottom: "48px" }}>
          {t("dataStorageProcessing")}
        </h2>
        <div className="faq">
          <details>
            <summary>
              {t("whereMyDataStored")}
            </summary>
            <div className="a">
              {t.rich("regionCloudInfrastructure", subprocessors)}
            </div>
          </details>
          <details>
            <summary>
              {t("whichSubprocessorsDoUse")}
            </summary>
            <div className="a">
              {t.rich("publishListTranscriptionAi", subprocessors)}
            </div>
          </details>
          <details>
            <summary>
              {t("howLongDataRetained")}
            </summary>
            <div className="a">
              {t("orgRetentionPeriod")}
            </div>
          </details>
          <details>
            <summary>
              {t("canIExportMy")}
            </summary>
            <div className="a">
              {t("exportOwnAndOrgData")}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
