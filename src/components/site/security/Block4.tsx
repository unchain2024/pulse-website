import { useTranslations } from "next-intl";

export function Block4() {
  const t = useTranslations("site.security.block4");

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
              {t("regionCloudInfrastructure")}
            </div>
          </details>
          <details>
            <summary>
              {t("whichSubprocessorsDoUse")}
            </summary>
            <div className="a">
              {t("publishListTranscriptionAi")}
            </div>
          </details>
          <details>
            <summary>
              {t("howLongDataRetained")}
            </summary>
            <div className="a">
              {t("untilDeleteEnterpriseCan")}
            </div>
          </details>
          <details>
            <summary>
              {t("canIExportMy")}
            </summary>
            <div className="a">
              {t("exportNotesTranscriptsMarkdown")}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
