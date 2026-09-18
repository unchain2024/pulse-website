import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function V7Capabilities() {
  const t = useTranslations("site.home.v7Capabilities");

  return (
    <section className="v7-capabilities" data-v7-capabilities="">
      <div className="wrap">
        <div className="v7-capability-copy">
          <span className="eyebrow">
            {t("builtAroundWork")}
          </span>
          <h2>
            {t.rich("whereverMeetHoweverWork", {
              br: () => <br />,
            })}
          </h2>
          <div className="v7-feature-steps">
            <button className="v7-feature-step" type="button" data-v7-feature="bot" aria-pressed="true">
              <span className="v7-feature-step-index">
                {t("text")}
              </span>
              <span>
                {t.rich("captureWithoutMeetingBot", {
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </span>
              <span className="v7-feature-step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" />
                </svg>
              </span>
            </button>
            <button className="v7-feature-step" type="button" data-v7-feature="apps" aria-pressed="false">
              <span className="v7-feature-step-index">
                {t("text2")}
              </span>
              <span>
                {t.rich("useUsualMeetingApp", {
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </span>
              <span className="v7-feature-step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="5" width="12" height="14" rx="2" />
                  <path d="m15 9 6-3v12l-6-3" />
                </svg>
              </span>
            </button>
            <button className="v7-feature-step" type="button" data-v7-feature="sharing" aria-pressed="false">
              <span className="v7-feature-step-index">
                {t("text3")}
              </span>
              <span>
                {t.rich("privateFirstShareChoice", {
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </span>
              <span className="v7-feature-step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="5" y="10" width="14" height="11" rx="2" />
                  <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 7v-3" />
                </svg>
              </span>
            </button>
            <button className="v7-feature-step" type="button" data-v7-feature="room" aria-pressed="false">
              <span className="v7-feature-step-index">
                {t("text4")}
              </span>
              <span>
                {t.rich("notesPersonConversationsUse", {
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </span>
              <span className="v7-feature-step-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="8" cy="8" r="3" />
                  <circle cx="17" cy="8" r="3" />
                  <path d="M2 21v-3a6 6 0 0 1 12 0v3m0-8a6 6 0 0 1 9 5v3" />
                </svg>
              </span>
            </button>
            <button className="v7-feature-step" type="button" data-v7-feature="calendar" aria-pressed="false">
              <span className="v7-feature-step-index">
                {t("text5")}
              </span>
              <span>
                {t.rich("connectedCalendarFindUpcoming", {
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </span>
              <span className="v7-feature-step-icon">
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
              </span>
            </button>
          </div>
        </div>
        <div className="v7-feature-preview">
          <div className="v7-feature-progress">
            {t.rich("captureWithoutMeetingBot2", {
              span: (chunks: ReactNode) => <span data-v7-feature-name="">{chunks}</span>,
              b: (chunks: ReactNode) => <b data-v7-feature-counter="">{chunks}</b>,
            })}
          </div>
          <div className="v7-feature-panels">
            <div className="v7-feature-panel v7-bot-panel" data-v7-feature-panel="bot">
              <div className="v7-mini-call">
                <div className="v7-mini-call-label">
                  {t.rich("salesTeamSync2", {
                    span: (chunks: ReactNode) => <span>{chunks}</span>,
                    b: (chunks: ReactNode) => <b>{chunks}</b>,
                  })}
                </div>
                <div className="pulse-call-portraits">
                  <div className="pulse-call-person person-0">
                    <img
                      data-asset="pulse-presentation-faces"
                      alt={t("participantPresentation")}
                      src="/assets/pulse-presentation-faces.png"
                    />
                  </div>
                  <div className="pulse-call-person person-1">
                    <img
                      data-asset="pulse-presentation-faces"
                      alt={t("participantBPresentation")}
                      src="/assets/pulse-presentation-faces.png"
                    />
                  </div>
                </div>
              </div>
              <div className="v7-listening-note">
                <span>
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
                  {t("pulseNotepad")}
                </span>
                <h3>
                  {t("salesTeamSync")}
                </h3>
                <p>
                  {t.rich("reviewPilotConditionsNext", {
                    br: () => <br />,
                  })}
                </p>
                <div>
                  {t.rich("transcribingDeviceAudio", {
                    span: (chunks: ReactNode) => <span className="pulse-wave" aria-hidden="true">{chunks}</span>,
                    i: (chunks: ReactNode) => <i>{chunks}</i>,
                    span2: (chunks: ReactNode) => <span>{chunks}</span>,
                  })}
                </div>
              </div>
            </div>
            <div className="v7-feature-panel v7-apps-panel" data-v7-feature-panel="apps" hidden>
              <div className="v7-app-buttons" role="group" aria-label={t("meetingAppExamples")}>
                <button type="button" data-v7-meeting-app="Zoom" aria-pressed="true">
                  <img data-asset="Zoom" alt="" src="/assets/zoom.webp" />
                  <span>
                    {t("zoom")}
                  </span>
                </button>
                <button type="button" data-v7-meeting-app="Google Meet" aria-pressed="false">
                  <img data-asset="Google Meet" alt="" src="/assets/google-meet.svg" />
                  <span>
                    {t("googleMeet")}
                  </span>
                </button>
                <button type="button" data-v7-meeting-app="Microsoft Teams" aria-pressed="false">
                  <img data-asset="Microsoft Teams" alt="" src="/assets/microsoft-teams.webp" />
                  <span>
                    {t("microsoftTeams")}
                  </span>
                </button>
              </div>
              <div className="v7-app-connection" aria-hidden="true">
                {t.rich("text6", {
                  i: (chunks: ReactNode) => <i>{chunks}</i>,
                })}
              </div>
              <div className="v7-app-pulse">
                {t.rich("pulseZoomConversationsSame", {
                  span: (chunks: ReactNode) => <span className="pulse-wave" aria-hidden="true">{chunks}</span>,
                  i: (chunks: ReactNode) => <i>{chunks}</i>,
                  strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                  span2: (chunks: ReactNode) => <span data-v7-app-label="">{chunks}</span>,
                })}
              </div>
            </div>
            <div className="v7-feature-panel v7-sharing-panel" data-v7-feature-panel="sharing" hidden>
              <div className="v7-share-sheet">
                <div className="v7-share-top">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="5" y="10" width="14" height="11" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 7v-3" />
                  </svg>
                  <span>
                    {t("whoCanAccessNote")}
                  </span>
                  <b>
                    {t("onlyMe")}
                  </b>
                </div>
                <h3>
                  {t("chooseWhatShare")}
                </h3>
                <p>
                  {t("hokuseiTradingDiscovery")}
                </p>
                <div className="v7-share-contents">
                  <label>
                    <input type="checkbox" checked />
                    {t("summaryAgreements")}
                  </label>
                  <label>
                    <input type="checkbox" checked />
                    {t("sharedDocuments")}
                  </label>
                  <label>
                    <input type="checkbox" />
                    {t("myPrivateNotes")}
                  </label>
                </div>
                <div className="v7-share-people">
                  <label>
                    {t.rich("thTaizoHaradaOwner", {
                      span: (chunks: ReactNode) => <span className="v7-avatar">{chunks}</span>,
                      span2: (chunks: ReactNode) => <span>{chunks}</span>,
                      small: (chunks: ReactNode) => <small>{chunks}</small>,
                      b: (chunks: ReactNode) => <b>{chunks}</b>,
                    })}
                  </label>
                  <label>
                    <span className="v7-avatar light">
                      {t("re")}
                    </span>
                    <span>
                      {t.rich("ruiEbinaColleague", {
                        small: (chunks: ReactNode) => <small>{chunks}</small>,
                      })}
                    </span>
                    <input type="checkbox" data-v7-share-person="" aria-label={t("selectRuiShare")} />
                  </label>
                </div>
                <button className="btn btn-dark" type="button" data-v7-share-preview="">
                  {t("previewSharing")}
                </button>
                <p data-v7-share-status="" role="status">
                  {t("selectColleaguePreviewSharing")}
                </p>
              </div>
            </div>
            <div className="v7-feature-panel v7-room-panel" data-v7-feature-panel="room" hidden>
              <div className="v7-room-scene" aria-hidden="true">
                <span className="v7-room-person p1">
                  {t("th")}
                </span>
                <span className="v7-room-person p2">
                  {t("kt")}
                </span>
                <span className="v7-room-person p3">
                  {t("re2")}
                </span>
                <div className="v7-room-table">
                  <div className="v7-room-laptop">
                    {t.rich("pulse", {
                      b: (chunks: ReactNode) => <b>{chunks}</b>,
                      span: (chunks: ReactNode) => <span className="pulse-wave" aria-hidden="true">{chunks}</span>,
                      i: (chunks: ReactNode) => <i>{chunks}</i>,
                    })}
                  </div>
                </div>
              </div>
              <div className="v7-room-status">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" />
                </svg>
                <div>
                  {t.rich("captureComputerMicrophoneMeeting", {
                    strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
                    span: (chunks: ReactNode) => <span>{chunks}</span>,
                  })}
                </div>
              </div>
              <div className="v7-room-note">
                <span>
                  {t("personInterviewNotes")}
                </span>
                <p>
                  {t.rich("reviewImplementationRequirementsDiscuss", {
                    br: () => <br />,
                  })}
                </p>
              </div>
            </div>
            <div
              className="v7-feature-panel v7-calendar-panel"
              data-v7-feature-panel="calendar"
              data-pulse-detection=""
              hidden
            >
              <div className="pulse-detection-demo">
                <div className="pulse-desktop-top">
                  {t.rich("pulseTodaySMeetings", {
                    span: (chunks: ReactNode) => <span>{chunks}</span>,
                  })}
                </div>
                <div className="pulse-agenda">
                  <span className="pulse-agenda-time">
                    {t("text7")}
                  </span>
                  <div>
                    <small>
                      {t("startingSoon")}
                    </small>
                    <h3>
                      {t("hokuseiTradingDiscovery2")}
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
                    {t.rich("text8", {
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
          </div>
          <p className="v7-feature-caption">
            {t("interactiveFeatureSamplesNo")}
          </p>
        </div>
      </div>
    </section>
  );
}
