import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function Capture() {
  const t = useTranslations("site.notepad.capture");
  const locale = useLocale();

  return (
    <section className="g-meetings" data-g-meetings="" data-section="capture">
      <div className="wrap">
        <nav className="g-stage-nav" aria-label={t("beforeDuringAfter")}>
          {t.rich("beforeMeetingMeeting", {
            a: (chunks: ReactNode) => <a href="#g-meeting-ja-0" data-g-stage="0" aria-current="true">{chunks}</a>,
            a2: (chunks: ReactNode) => <a href="#g-meeting-ja-1" data-g-stage="1" aria-current="false">{chunks}</a>,
          })}
        </nav>
        <div className="g-stage-content">
          <h2>
            {t.rich("meetingBriefsConversationCapture", {
              br: () => <br />,
            })}
          </h2>
          <article
            className="g-meeting-stage"
            id={locale === "en" ? "g-meeting-en-0" : "g-meeting-ja-0"}
            data-g-stage-panel="0"
          >
            <span className="g-mobile-label">
              {t("beforeMeeting")}
            </span>
            <h3>
              {t("prepareMeetingBrief")}
            </h3>
            <p>
              {t("useEventSAttendees")}
            </p>
            <div className="g-stage-screen">
              <div className="ui-demo" data-view="brief" />
            </div>
          </article>
          <article
            className="g-meeting-stage"
            id={locale === "en" ? "g-meeting-en-1" : "g-meeting-ja-1"}
            data-g-stage-panel="1"
          >
            <span className="g-mobile-label">
              {t("meeting")}
            </span>
            <h3>
              {t("captureConversationsNotes")}
            </h3>
            <p>
              {t("enableAutomaticCaptureAfter")}
            </p>
            <div className="g-stage-screen">
              <div className="ui-demo" data-view="live" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
