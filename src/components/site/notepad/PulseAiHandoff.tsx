import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function PulseAiHandoff() {
  const t = useTranslations("site.notepad.pulseAiHandoff");
  const locale = useLocale();

  return (
    <section className="pulse-ai-handoff" data-pulse-handoff="">
      <div className="wrap">
        <div className="pulse-section-copy">
          <span className="eyebrow">
            {t("pulseMcp")}
          </span>
          <h2>
            {t.rich("connectContextAiThrough", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("makeConnectedMeetingsDocuments")}
          </p>
          <Link className="text-link" href={`/${locale}/integrations#technology`}>
            {t("exploreIntegrationsTechnology")}
          </Link>
        </div>
        <div className="pulse-handoff-demo">
          <div className="pulse-handoff-top">
            {t.rich("pulseMeetingContext", {
              span: (chunks: ReactNode) => <span>{chunks}</span>,
            })}
          </div>
          <div className="pulse-handoff-question">
            {t("helpPrepareNextProposal")}
          </div>
          <div className="pulse-handoff-document">
            <span className="pulse-panel-label">
              {t("contextCarryForward")}
            </span>
            <h3>
              {t("hokuseiPilotEvaluation")}
            </h3>
            <ul>
              <li>
                {t.rich("backgroundTeamEntersNotes", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </li>
              <li>
                {t.rich("agreedExplorePilotConditions", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </li>
              <li>
                {t.rich("stillOpenSecurityReview", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </li>
              <li>
                {t.rich("sourcesSep18Sep", {
                  b: (chunks: ReactNode) => <b>{chunks}</b>,
                  span: (chunks: ReactNode) => <span>{chunks}</span>,
                })}
              </li>
            </ul>
          </div>
          <div className="pulse-handoff-bottom">
            <span>
              {t("sampleHandoffBackgroundIncluded")}
            </span>
            <button type="button" data-handoff-copy="">
              {t("copyContext")}
            </button>
          </div>
          <p className="pulse-copy-status" role="status" />
        </div>
      </div>
    </section>
  );
}
