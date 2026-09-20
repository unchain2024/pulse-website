import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function Block2() {
  const t = useTranslations("site.enterprise.block2");

  return (
    <section className="tight">
      <div className="wrap">
        <div className="tcol">
          <h2>
            {t.rich("securityComplianceLegal", {
              br: () => <br />,
            })}
          </h2>
          <div className="lst">
            <h4>
              {t("setDataRetentionControls")}
            </h4>
            <ul>
              <li>
                {t("transcriptRedactionDeletionAvailable")}
              </li>
              <li>
                {t("conversationDataNeverUsed")}
              </li>
              <li>
                {t("chooseWhereDataGoes")}
              </li>
            </ul>
            <h4>
              {t("notifyOthersWhenPulse")}
            </h4>
            <ul>
              <li>
                {t("automaticNotificationsWhenPulse")}
              </li>
              <li>
                {t("adminsCanTurnNotifications")}
              </li>
            </ul>
            <div className="badge-row">
              {t.rich("soc2TypeIi", {
                span: (chunks: ReactNode) => <span>{chunks}</span>,
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </div>
        </div>
        <div className="tcol">
          <h2>
            {t.rich("reAboutDetails", {
              br: () => <br />,
            })}
          </h2>
          <div className="body">
            <p>
              {t("spendLotTimeHard")}
            </p>
          </div>
        </div>
        <div className="duo">
          <div className="item">
            <div className="ph">
              <div className="win s">
                <div className="dots">
                  {t.rich("text", {
                    i: (chunks: ReactNode) => <i>{chunks}</i>,
                  })}
                </div>
                <div className="t">
                  {t("strategySync")}
                </div>
                <div className="tags">
                  <span className="tag hi">
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
                    {t("summary")}
                  </span>
                </div>
                <ul className="notes">
                  <li className="">
                    {t.rich("decisionQuoteThreeSites", {
                      b: (chunks: ReactNode) => <b>{chunks}</b>,
                    })}
                  </li>
                  <li className="">
                    {t.rich("actionShareFieldGuide", {
                      b: (chunks: ReactNode) => <b>{chunks}</b>,
                    })}
                  </li>
                </ul>
              </div>
            </div>
            <h4>
              {t("understandingNotJustTranscribing")}
            </h4>
            <p>
              {t("donTJustFeed")}
            </p>
          </div>
          <div className="item">
            <div className="ph d">
              <div className="appicons">
                {t.rich("zoomMeetT", {
                  i: (chunks: ReactNode) => <i>{chunks}</i>,
                })}
              </div>
            </div>
            <h4>
              {t("builtWhereverConversationHappens")}
            </h4>
            <p>
              {t("whetherSZoomTeams")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
