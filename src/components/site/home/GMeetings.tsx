import { WorkflowPreview } from "./WorkflowPreview";
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
            a: (chunks: ReactNode) => <a href={`#v7-home-${locale}-stage-0`} data-g-stage="0" aria-current="true">{chunks}</a>,
            a2: (chunks: ReactNode) => <a href={`#v7-home-${locale}-stage-1`} data-g-stage="1" aria-current="false">{chunks}</a>,
            a3: (chunks: ReactNode) => <a href={`#v7-home-${locale}-stage-2`} data-g-stage="2" aria-current="false">{chunks}</a>,
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
              <WorkflowPreview stage={0} />
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
              <WorkflowPreview stage={1} />
            </div>
          </article>
          <article
            className="g-meeting-stage"
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
            <div className="g-stage-screen">
              <WorkflowPreview stage={2} />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
