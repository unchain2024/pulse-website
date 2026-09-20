import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function GOpening() {
  const t = useTranslations("site.home.gOpening");
  const locale = useLocale();

  return (
    <section className="g-opening" data-g-opening="">
      <div className="g-opening-copy">
        <div className="g-hero-copy">
          <Link className="g-chip" href={`/${locale}/contact`}>
            {t.rich("betaPulseTakesNext", {
              span: (chunks: ReactNode) => <span>{chunks}</span>,
              span2: (chunks: ReactNode) => <span aria-hidden="true">{chunks}</span>,
            })}
          </Link>
          <h1>
            {t.rich("meetingPrepNotesFollow", {
              br: () => <br />,
            })}
          </h1>
          <p>
            {t.rich("aiNotepadConnectsConversations", {
              br: () => <br />,
            })}
          </p>
          <div className="g-hero-actions">
            {t.rich("getStartedFreeSee", {
              a: (chunks: ReactNode) => <Link className="btn btn-dark" href={`/${locale}/contact`}>{chunks}</Link>,
              span: (chunks: ReactNode) => <span aria-hidden="true">{chunks}</span>,
              a2: () => null,
            })}
          </div>
          <p className="g-availability">
            {t("availableMacosWindows")}
          </p>
        </div>
        <div className="g-enhance-copy">
          <h2>
            {t.rich("conversationsNotesOrganizedTogether", {
              br: () => <br />,
            })}
          </h2>
          <ul className="g-benefit-list">
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="4" y="8" width="14" height="12" rx="1" />
                <path d="M11 8V3m-2 0h4M8 12v2m6-2v2m5-12 4 4m0-4-4 4" />
              </svg>
              <span>
                {t("usesComputerAudioNo")}
              </span>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="5" y="9" width="14" height="13" rx="2" />
                <path d="M8 9V6a4 4 0 0 1 8 0v3m-4 5v4m-1-3h2" />
              </svg>
              <span>
                {t("privateStartShareWhen")}
              </span>
            </li>
            <li>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="m6 12 4 5L21 3m-7 0h7v7" />
              </svg>
              <span>
                {t("worksZoomGoogleMeet")}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="g-stage-anchor">
        <div className="g-collage pulse-collage" aria-hidden="true">
          <img
            className="pulse-hero-art"
            data-asset="pulse-editorial-landscape"
            alt=""
            src="/assets/pulse-editorial-landscape.png"
          />
        </div>
        <div className="pulse-ready-card">
          <span className="pulse-wave" aria-hidden="true">
            {t.rich("text", {
              i: (chunks: ReactNode) => <i>{chunks}</i>,
            })}
          </span>
          <div>
            {t.rich("nextMeetingBriefReady", {
              strong: (chunks: ReactNode) => <strong>{chunks}</strong>,
              span: (chunks: ReactNode) => <span>{chunks}</span>,
            })}
          </div>
        </div>
        <div className="g-paper-wrap">
          <div className="g-paper" data-g-paper="" data-locale={locale === "en" ? "en" : "ja"}>
            <div className="g-paper-chrome" aria-hidden="true">
              {t.rich("text2", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
            <h3>
              {t("salesTeamSync")}
            </h3>
            <div className="g-paper-meta">
              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="4" y="5" width="16" height="16" rx="2" />
                  <path d="M8 3v4m8-4v4M4 10h16" />
                </svg>
                {t("today")}
              </span>
              <span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="8" r="3" />
                  <path d="M3 20v-3a6 6 0 0 1 12 0v3m2-15a3 3 0 0 1 0 6m1 3a5 5 0 0 1 4 5" />
                </svg>
                {t("textText")}
              </span>
              <span className="g-demo-label">
                {t("demo")}
              </span>
            </div>
            <div className="g-paper-content">
              <textarea className="g-raw-notes" aria-label={t("editMeetingNotes")} spellCheck="false">

              </textarea>
              <div className="g-polished-notes" hidden />
              <div className="g-enhancing" hidden>
                {t.rich("enhancingNotes", {
                  i: (chunks: ReactNode) => <i>{chunks}</i>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </div>
            </div>
            <div className="g-paper-bottom">
              <div className="g-note-status">
                {t.rich("transcribing", {
                  span: (chunks: ReactNode) => <span className="g-audio-wave" aria-hidden="true">{chunks}</span>,
                  i: (chunks: ReactNode) => <i>{chunks}</i>,
                  span2: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </div>
              <button className="g-generate" type="button" hidden>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z" />
                </svg>
                {t("generateNotes")}
              </button>
              <div className="g-note-tabs" role="group" aria-label={t("noteView")} hidden>
                <button data-g-note="raw" type="button" aria-pressed="false">
                  {t("myNotes")}
                </button>
                <button data-g-note="enhanced" type="button" aria-pressed="true">
                  {t("enhanced")}
                </button>
              </div>
            </div>
          </div>
          <div className="g-mini-call" aria-label={t("sampleVideoCall")}>
            <div className="pulse-call-heading">
              {t.rich("stayConversationPulse", {
                span: (chunks: ReactNode) => <span className="pulse-wave" aria-hidden="true">{chunks}</span>,
                i: (chunks: ReactNode) => <i>{chunks}</i>,
                span2: (chunks: ReactNode) => <span>{chunks}</span>,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
            <div className="pulse-call-portraits">
              <div className="pulse-call-person person-0">
                <img
                  data-asset="pulse-editorial-portraits"
                  alt={t("participantPresentation")}
                  src="/assets/pulse-editorial-portraits.png"
                />
              </div>
              <div className="pulse-call-person person-1">
                <img
                  data-asset="pulse-editorial-portraits"
                  alt={t("participantBPresentation")}
                  src="/assets/pulse-editorial-portraits.png"
                />
              </div>
            </div>
            <div className="g-call-controls">
              <button
                type="button"
                data-g-call="mic"
                aria-label={t("toggleDemoMicrophone")}
                aria-pressed="false"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M6 11v2a6 6 0 0 0 12 0v-2m-6 8v3m-4 0h8" />
                </svg>
              </button>
              <button
                type="button"
                data-g-call="camera"
                aria-label={t("toggleDemoCamera")}
                aria-pressed="false"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="6" width="12" height="12" rx="2" />
                  <path d="m15 9 6-3v12l-6-3" />
                </svg>
              </button>
              <button type="button" data-g-call="close" aria-label={t("closeCallPreview")}>
                {t("text3")}
              </button>
            </div>
          </div>
        </div>
        <button type="button" className="g-motion-toggle" aria-pressed="false">
          {t.rich("pauseAnimation", {
            span: (chunks: ReactNode) => <span aria-hidden="true">{chunks}</span>,
            span2: (chunks: ReactNode) => <span data-g-motion-label="">{chunks}</span>,
          })}
        </button>
      </div>
    </section>
  );
}
