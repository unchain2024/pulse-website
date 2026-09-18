import { useTranslations } from "next-intl";

export function Block5() {
  const t = useTranslations("site.careers.block5");

  return (
    <section className="tight">
      <div className="wrap-n">
        <h2 style={{ marginBottom: "28px" }}>
          {t("benefitsPerks")}
        </h2>
        <div className="cards">
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
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
              </svg>
            </div>
            <h4>
              {t("competitiveSalaryEquity")}
            </h4>
            <p>
              {t("everyoneSharesCompanyS")}
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
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
            </div>
            <h4>
              {t("flexibleWorking")}
            </h4>
            <p>
              {t("tokyoOfficeBaseRemote")}
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
              {t("learningBudget")}
            </h4>
            <p>
              {t("annualBudgetBooksConferences")}
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
                <circle cx="12" cy="12" r="9" />
                <path d="M8 12l3 3 5-6" />
              </svg>
            </div>
            <h4>
              {t("healthTimeOff")}
            </h4>
            <p>
              {t("insuranceAnnualLeaveRecharge")}
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
                <rect x="3" y="4" width="18" height="12" rx="2" />
                <path d="M8 20h8M12 16v4" />
              </svg>
            </div>
            <h4>
              {t("bestEquipment")}
            </h4>
            <p>
              {t("pickGearWant")}
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
                <path d="M4 5h16v10H9l-5 4z" />
              </svg>
            </div>
            <h4>
              {t("teamTime")}
            </h4>
            <p>
              {t("quarterlyOffsitesWeeklyTeam")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
