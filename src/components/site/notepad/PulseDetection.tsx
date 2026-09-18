import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function PulseDetection() {
  const t = useTranslations("site.notepad.pulseDetection");

  return (
    <section className="pulse-detection" data-pulse-detection="">
      <div className="wrap">
        <div className="pulse-section-copy">
          <span className="eyebrow">
            {t("startsBeforeHave")}
          </span>
          <h2>
            {t.rich("automaticMeetingDetection", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("detectCalendarEventsMeetings")}
          </p>
          <ul className="pulse-proof-list">
            <li>
              {t("noBotInvitationsOr")}
            </li>
            <li>
              {t("seeRecordingStatusStop")}
            </li>
          </ul>
        </div>
        <div className="pulse-detection-demo">
          <div className="pulse-desktop-top">
            {t.rich("pulseTodaySMeetings", {
              span: (chunks: ReactNode) => <span>{chunks}</span>,
            })}
          </div>
          <div className="pulse-agenda">
            <span className="pulse-agenda-time">
              {t("text")}
            </span>
            <div>
              <small>
                {t("startingSoon")}
              </small>
              <h3>
                {t("hokuseiTradingDiscovery")}
              </h3>
              <p>
                {t.rich("tanakaHokuseiExampleTharada", {
                  br: () => <br />,
                })}
              </p>
              <span className="pulse-brief-ready">
                {t("briefReady")}
              </span>
            </div>
          </div>
          <div className="pulse-detection-notice">
            <span className="pulse-wave" aria-hidden="true">
              {t.rich("text2", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </span>
            <div>
              <strong data-detection-title="">
                {t("meetingDetected")}
              </strong>
              <p data-detection-description="">
                {t("pulseStartedRecordingDevice")}
              </p>
            </div>
          </div>
          <div className="pulse-detection-bottom">
            <span data-detection-state="">
              {t("recording0008")}
            </span>
            <button type="button" data-detection-toggle="" aria-pressed="false">
              {t("stopDemoRecording")}
            </button>
          </div>
          <p className="pulse-demo-caption">
            {t("interactiveSampleNoReal")}
          </p>
        </div>
      </div>
    </section>
  );
}
