import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function GMeetings() {
  const t = useTranslations("site.home.gMeetings");
  const locale = useLocale();

  return (
    <section className="g-meetings v7-workflow" data-g-meetings="">
      <div className="wrap">
        <h2 className="v7-workflow-title">
          {t.rich("beforeDuringAfterEvery", {
            br: () => <br />,
          })}
        </h2>
        <nav className="g-stage-nav" aria-label={t("beforeDuringAfter")}>
          {t.rich("beforeMeetingMeetingAfter", {
            a: (chunks: ReactNode) => <a href="#v7-home-ja-stage-0" data-g-stage="0" aria-current="true">{chunks}</a>,
            a2: (chunks: ReactNode) => <a href="#v7-home-ja-stage-1" data-g-stage="1" aria-current="false">{chunks}</a>,
            a3: (chunks: ReactNode) => <a href="#v7-home-ja-stage-2" data-g-stage="2" aria-current="false">{chunks}</a>,
          })}
        </nav>
        <div className="g-stage-content">
          <article
            className="g-meeting-stage"
            id={locale === "en" ? "v7-home-en-stage-0" : "v7-home-ja-stage-0"}
            data-g-stage-panel="0"
          >
            <span className="g-mobile-label">
              {t("beforeMeeting")}
            </span>
            <h3>
              {t("briefReadyMeeting")}
            </h3>
            <p>
              {t("useCalendarEventsCustomer")}
            </p>
            <div className="g-stage-screen">
              <div className="ui-demo" data-view="brief" />
            </div>
          </article>
          <article
            className="g-meeting-stage"
            id={locale === "en" ? "v7-home-en-stage-1" : "v7-home-ja-stage-1"}
            data-g-stage-panel="1"
          >
            <span className="g-mobile-label">
              {t("meeting")}
            </span>
            <h3>
              {t("conversationNotesTogether")}
            </h3>
            <p>
              {t("transcribeAudioDeviceKeep")}
            </p>
            <div className="g-stage-screen">
              <div className="ui-demo" data-view="live" />
            </div>
          </article>
          <article
            className="g-meeting-stage v7-post-meeting"
            id={locale === "en" ? "v7-home-en-stage-2" : "v7-home-ja-stage-2"}
            data-g-stage-panel="2"
          >
            <span className="g-mobile-label">
              {t("afterMeeting")}
            </span>
            <h3>
              {t("notesNextStepsReady")}
            </h3>
            <p>
              {t("organizeAgreementsOpenQuestions")}
            </p>
            <div className="v7-post-choices" role="group" aria-label={t("afterMeetingFeatures")}>
              <button type="button" data-post-view="actions" aria-pressed="false">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="3" width="14" height="18" rx="2" />
                  <path d="M9 8h6m-6 4h6m-6 4h4" />
                </svg>
                {t("actions")}
              </button>
              <button type="button" data-post-view="email" aria-pressed="false">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M4 12h16m-6-6 6 6-6 6" />
                </svg>
                {t("draftEmail")}
              </button>
              <button type="button" data-post-view="plan" aria-pressed="false">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M8 2v6m8-6V2M3 11h18m-13 5h4" />
                </svg>
                {t("draftProjectPlan")}
              </button>
            </div>
            <div className="g-stage-screen">
              <div
                className="ui-demo"
                data-view="notes"
                data-with-plan="true"
                data-locale={locale === "en" ? "en" : "ja"}
              />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
