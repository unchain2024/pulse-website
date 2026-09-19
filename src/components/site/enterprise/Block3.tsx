import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block3() {
  const t = useTranslations("site.enterprise.block3");
  const locale = useLocale();

  return (
    <section className="tight">
      <div className="wrap">
        <div className="tcol">
          <h2>
            {t.rich("transparencySecurityAdminControls", {
              br: () => <br />,
            })}
          </h2>
          <div className="body">
            <p>
              {t("mostImportantConversationsHappen")}
            </p>
            <div className="cards two" style={{ marginTop: "28px" }}>
              <div className="card">
                <div className="ic">
                  <svg
                    className=""
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3l8 3.5v5.5c0 4.5-3.4 8.2-8 9.5-4.6-1.3-8-5-8-9.5V6.5z" />
                    <path d="M9 12l2 2 4-4" />
                  </svg>
                </div>
                <h4>
                  {t("orgWideControls")}
                </h4>
                <p>
                  {t("controlSharingIntegrationsRetention")}
                </p>
              </div>
              <div className="card">
                <div className="ic">
                  <svg
                    className=""
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="9" cy="8" r="3.5" />
                    <path d="M2.5 20a6.5 6.5 0 0113 0" />
                    <circle cx="17.5" cy="9" r="2.5" />
                    <path d="M15.5 20a5 5 0 016-4.5" />
                  </svg>
                </div>
                <h4>
                  {t("ssoScim")}
                </h4>
                <p>
                  {t("samlSsoDirectorySync")}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="tcol">
          <h2>
            {t.rich("notesWorkBeforeDuring", {
              br: () => <br />,
            })}
          </h2>
          <div className="body">
            <p>
              {t("prepBriefJotLine")}
            </p>
            <Link className="btn btn-line btn-sm" href={`/${locale}`} style={{ marginTop: "16px" }}>
              {t("seeNotepad")}
            </Link>
          </div>
        </div>
        <div className="tcol">
          <h2>
            {t.rich("goodToolsSpreadPerson", {
              br: () => <br />,
            })}
          </h2>
          <div className="body">
            <p>
              {t("pulseSpreadsBottomUp")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
