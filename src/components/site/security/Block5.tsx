import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block5() {
  const t = useTranslations("site.security.block5");
  const locale = useLocale();

  return (
    <section className="tight">
      <div className="wrap">
        <h2 className="tc" style={{ marginBottom: "40px" }}>
          {t("termsPolicies")}
        </h2>
        <div className="cards">
          <Link className="card link" href={`/${locale}/terms`}>
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
                <path d="M7 3h7l5 5v13H7z" />
                <path d="M14 3v5h5M10 13h6M10 17h6" />
              </svg>
            </div>
            <h4>
              {t("terms")}
            </h4>
            <p>
              {t("termsService")}
            </p>
          </Link>
          <Link className="card link" href={`/${locale}/privacy`}>
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
                <rect x="4" y="11" width="16" height="10" rx="2" />
                <path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </div>
            <h4>
              {t("privacy")}
            </h4>
            <p>
              {t("howHandlePersonalData")}
            </p>
          </Link>
          <Link className="card link" href={`/${locale}/help`}>
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
              {t("reports")}
            </h4>
            <p>
              {t("auditReportsQuestionnairesUnder")}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
