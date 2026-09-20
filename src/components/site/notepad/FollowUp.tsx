import type { ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function FollowUp() {
  const t = useTranslations("site.notepad.followUp");
  const locale = useLocale();

  return (
    <section
      className="feature-story"
      data-feature-story=""
      data-pulse-scroll-story=""
      data-section="follow-up"
    >
      <div className="wrap">
        <div className="feature-story-copy">
          <span className="eyebrow">
            {t("afterMeeting")}
          </span>
          <h2>
            {t.rich("notesEmailNextSteps", {
              br: () => <br />,
            })}
          </h2>
          <div className="feature-stories">
            <button
              type="button"
              className="feature-story-toggle"
              data-story-view="notes"
              aria-expanded="true"
              data-scroll-step="0"
              data-active="true"
            >
              {t.rich("agreementsSources01Separate", {
                span: (chunks: ReactNode) => <span className="story-label">{chunks}</span>,
                small: (chunks: ReactNode) => <small className="pulse-step-number">{chunks}</small>,
                span2: (chunks: ReactNode) => <span className="story-sign">{chunks}</span>,
                span3: (chunks: ReactNode) => <span className="story-description">{chunks}</span>,
              })}
            </button>
            <button
              type="button"
              className="feature-story-toggle"
              data-story-view="email"
              aria-expanded="false"
              data-scroll-step="1"
              data-active="false"
            >
              {t.rich("draftFollowUpEmails", {
                span: (chunks: ReactNode) => <span className="story-label">{chunks}</span>,
                small: (chunks: ReactNode) => <small className="pulse-step-number">{chunks}</small>,
                span2: (chunks: ReactNode) => <span className="story-sign">{chunks}</span>,
                span3: (chunks: ReactNode) => <span className="story-description">{chunks}</span>,
              })}
            </button>
            <button
              type="button"
              className="feature-story-toggle"
              data-story-view="actions"
              aria-expanded="false"
              data-scroll-step="2"
              data-active="false"
            >
              {t.rich("prepareTasksCrmUpdates", {
                span: (chunks: ReactNode) => <span className="story-label">{chunks}</span>,
                small: (chunks: ReactNode) => <small className="pulse-step-number">{chunks}</small>,
                span2: (chunks: ReactNode) => <span className="story-sign">{chunks}</span>,
                span3: (chunks: ReactNode) => <span className="story-description">{chunks}</span>,
              })}
            </button>
          </div>
        </div>
        <div className="feature-story-preview">
          <div className="pulse-story-progress">
            <span>
              {t("workAfterMeeting")}
            </span>
            <div aria-hidden="true">
              {t.rich("text", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
            <b data-story-counter="">
              {t("text2")}
            </b>
          </div>
          <div className="ui-demo" data-view="notes" data-locale={locale === "en" ? "en" : "ja"} />
        </div>
      </div>
    </section>
  );
}
