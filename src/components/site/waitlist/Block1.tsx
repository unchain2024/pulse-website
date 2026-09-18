import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function Block1() {
  const t = useTranslations("site.waitlist.block1");
  const locale = useLocale();

  return (
    <section>
      <div className="wrap form-page">
        <div className="txt">
          <span className="eyebrow">
            {t("betaWaitlist")}
          </span>
          <h1 style={{ fontSize: "clamp(2.2rem,4vw,3.5rem)" }}>
            {t.rich("nextMeetingWithoutWrite", {
              br: () => <br />,
            })}
          </h1>
          <p className="sub">
            {t("llSendBetaDownload")}
          </p>
          <div className="rows-hair">
            <div className="r">
              <i>
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
                  <rect x="4" y="7" width="16" height="12" rx="3" />
                  <path d="M12 3v4M8 12h.01M16 12h.01M9 16h6" />
                  <path d="M3 3l18 18" />
                </svg>
              </i>
              <span>
                {t.rich("noBotJoinsMeeting", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                })}
              </span>
            </div>
            <div className="r">
              <i>
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
              </i>
              <span>
                {t.rich("privateDefaultShareWhen", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                })}
              </span>
            </div>
            <div className="r">
              <i>
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
              </i>
              <span>
                {t.rich("macosWindowsWebViewing", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                })}
              </span>
            </div>
          </div>
        </div>
        <form className="form" noValidate data-lang={locale === "en" ? "en" : "ja"}>
          <div className="fields" style={{ display: "grid", gap: "18px" }}>
            <h3>
              {t("joinWaitlist")}
            </h3>
            <div className="field">
              <label htmlFor={locale === "en" ? "w-name-en" : "w-name-ja"}>
                {t("name")}
              </label>
              <input
                id={locale === "en" ? "w-name-en" : "w-name-ja"}
                name="name"
                required
                placeholder={t("taroYamada")}
                autoComplete="name"
              />
            </div>
            <div className="two">
              <div className="field">
                <label htmlFor={locale === "en" ? "w-work-en" : "w-work-ja"}>
                  {t("workEmail")}
                </label>
                <input
                  id={locale === "en" ? "w-work-en" : "w-work-ja"}
                  name="work_email"
                  type="email"
                  required
                  placeholder={t("companyCoJp")}
                />
              </div>
              <div className="field">
                <label htmlFor={locale === "en" ? "w-personal-en" : "w-personal-ja"}>
                  {t.rich("personalEmailOptionalTry", {
                    small: (chunks: ReactNode) => <small>{chunks}</small>,
                  })}
                </label>
                <input
                  id={locale === "en" ? "w-personal-en" : "w-personal-ja"}
                  name="personal_email"
                  type="email"
                  placeholder={t("exampleCom")}
                />
              </div>
            </div>
            <div className="two">
              <div className="field">
                <label htmlFor={locale === "en" ? "w-team-en" : "w-team-ja"}>
                  {t("teamSize")}
                </label>
                <select id={locale === "en" ? "w-team-en" : "w-team-ja"} name="team_size" required>
                  <option value="">
                    {t("select")}
                  </option>
                  <option>
                    {t("justMe")}
                  </option>
                  <option>
                    {t("text")}
                  </option>
                  <option>
                    {t("text2")}
                  </option>
                  <option>
                    {t("text3")}
                  </option>
                  <option>
                    {t("text4")}
                  </option>
                </select>
              </div>
              <div className="field">
                <label htmlFor={locale === "en" ? "w-meet-en" : "w-meet-ja"}>
                  {t("meetingsPerWeek")}
                </label>
                <select id={locale === "en" ? "w-meet-en" : "w-meet-ja"} name="meetings_per_week" required>
                  <option value="">
                    {t("select2")}
                  </option>
                  <option>
                    {t("under5")}
                  </option>
                  <option>
                    {t("text5")}
                  </option>
                  <option>
                    {t("text6")}
                  </option>
                  <option>
                    {t("text7")}
                  </option>
                </select>
              </div>
            </div>
            <button className="btn btn-dark" type="submit" style={{ width: "100%" }}>
              {t("prepareRequestEmail")}
            </button>
            <p className="legal">
              {t("emailDraftWillOpen")}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
