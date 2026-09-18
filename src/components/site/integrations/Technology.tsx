import type { CSSProperties, ReactNode } from "react";
import { useTranslations, useLocale } from "next-intl";

export function Technology() {
  const t = useTranslations("site.integrations.technology");
  const locale = useLocale();

  return (
    <section className="v6-technology" data-section="technology">
      <div className="wrap">
        <div className="v6-section-head">
          <span className="eyebrow">
            {t("unchainTechnology")}
          </span>
          <h2>
            {t.rich("contextLayerBehindPulse", {
              br: () => <br />,
            })}
          </h2>
          <p>
            {t("connectMeetingsEmailDocuments")}
          </p>
        </div>
        <div
          className="v7-context-graph"
          data-context-graph=""
          data-locale={locale === "en" ? "en" : "ja"}
        >
          <div className="v7-graph-toolbar">
            <div>
              <span className="eyebrow">
                {t("contextGraph")}
              </span>
              <h3>
                {t("followConnections")}
              </h3>
            </div>
            <div className="v7-graph-modes" role="group" aria-label={t("graphView")}>
              <button type="button" data-graph-mode="all" aria-pressed="true">
                {t("all")}
              </button>
              <button type="button" data-graph-mode="project" aria-pressed="false">
                {t("project")}
              </button>
              <button type="button" data-graph-mode="decision" aria-pressed="false">
                {t("decision")}
              </button>
              <button type="button" data-graph-mode="action" aria-pressed="false">
                {t("nextAction")}
              </button>
            </div>
          </div>
          <div className="v7-graph-legend">
            {t.rich("sourceRecordsPeopleProjects", {
              span: (chunks: ReactNode) => <span className="source">{chunks}</span>,
              span2: (chunks: ReactNode) => <span className="entity">{chunks}</span>,
              span3: (chunks: ReactNode) => <span className="knowledge">{chunks}</span>,
              small: (chunks: ReactNode) => <small>{chunks}</small>,
            })}
          </div>
          <div className="v7-graph-canvas">
            <div className="v7-graph-watermark" aria-hidden="true">
              {t.rich("pulseContextLayer", {
                br: () => <br />,
                small: (chunks: ReactNode) => <small>{chunks}</small>,
              })}
            </div>
            <svg
              className="v7-graph-edges desktop"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <g data-graph-edge="meeting:person">
                <path className="v7-edge-base" d="M100 96 Q235 38 370 90" />
                <path className="v7-edge-signal" d="M100 96 Q235 38 370 90" />
                <text x="225" y="55" textAnchor="middle">
                  {t("attended")}
                </text>
              </g>
              <g data-graph-edge="meeting:statement">
                <path className="v7-edge-base" d="M100 96 Q430 -12 760 90" />
                <path className="v7-edge-signal" d="M100 96 Q430 -12 760 90" />
                <text x="560" y="35" textAnchor="middle">
                  {t("recordsStatement")}
                </text>
              </g>
              <g data-graph-edge="email:project">
                <path className="v7-edge-base" d="M100 282 Q270 244 440 288" />
                <path className="v7-edge-signal" d="M100 282 Q270 244 440 288" />
                <text x="270" y="250" textAnchor="middle">
                  {t("matchesProject")}
                </text>
              </g>
              <g data-graph-edge="document:project">
                <path className="v7-edge-base" d="M100 468 Q210 340 440 288" />
                <path className="v7-edge-signal" d="M100 468 Q210 340 440 288" />
                <text x="218" y="375" textAnchor="middle">
                  {t("refersConditions")}
                </text>
              </g>
              <g data-graph-edge="document:term">
                <path className="v7-edge-base" d="M100 468 Q230 515 370 480" />
                <path className="v7-edge-signal" d="M100 468 Q230 515 370 480" />
                <text x="210" y="516" textAnchor="middle">
                  {t("definesMeaning")}
                </text>
              </g>
              <g data-graph-edge="person:project">
                <path className="v7-edge-base" d="M370 90 Q380 185 440 288" />
                <path className="v7-edge-signal" d="M370 90 Q380 185 440 288" />
                <text x="370" y="190" textAnchor="middle">
                  {t("responsible")}
                </text>
              </g>
              <g data-graph-edge="project:statement">
                <path className="v7-edge-base" d="M440 288 Q525 113 760 90" />
                <path className="v7-edge-signal" d="M440 288 Q525 113 760 90" />
                <text x="560" y="163" textAnchor="middle">
                  {t("linksConversation")}
                </text>
              </g>
              <g data-graph-edge="statement:decision">
                <path className="v7-edge-base" d="M760 90 Q840 170 800 288" />
                <path className="v7-edge-signal" d="M760 90 Q840 170 800 288" />
                <text x="850" y="190" textAnchor="middle">
                  {t("basisDecision")}
                </text>
              </g>
              <g data-graph-edge="project:decision">
                <path className="v7-edge-base" d="M440 288 L800 288" />
                <path className="v7-edge-signal" d="M440 288 L800 288" />
                <text x="620" y="274" textAnchor="middle">
                  {t("keepsDecision")}
                </text>
              </g>
              <g data-graph-edge="decision:action">
                <path className="v7-edge-base" d="M800 288 Q840 397 760 480" />
                <path className="v7-edge-signal" d="M800 288 Q840 397 760 480" />
                <text x="850" y="395" textAnchor="middle">
                  {t("nextStep")}
                </text>
              </g>
              <g data-graph-edge="project:action">
                <path className="v7-edge-base" d="M440 288 Q530 470 760 480" />
                <path className="v7-edge-signal" d="M440 288 Q530 470 760 480" />
                <text x="565" y="438" textAnchor="middle">
                  {t("linksNextAction")}
                </text>
              </g>
              <g data-graph-edge="term:project">
                <path className="v7-edge-base" d="M370 480 Q355 388 440 288" />
                <path className="v7-edge-signal" d="M370 480 Q355 388 440 288" />
                <text x="364" y="390" textAnchor="middle">
                  {t("interpretsTerm")}
                </text>
              </g>
            </svg>
            <svg
              className="v7-graph-edges mobile"
              viewBox="0 0 360 825"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >
              <g data-graph-edge="meeting:person">
                <path className="v7-edge-base" d="M58 66 Q20 150 65 223" />
                <path className="v7-edge-signal" d="M58 66 Q20 150 65 223" />
                <text x="36" y="155" textAnchor="middle">
                  {t("attended2")}
                </text>
              </g>
              <g data-graph-edge="meeting:statement">
                <path className="v7-edge-base" d="M58 66 Q170 130 295 223" />
                <path className="v7-edge-signal" d="M58 66 Q170 130 295 223" />
                <text x="205" y="155" textAnchor="middle">
                  {t("recordsStatement2")}
                </text>
              </g>
              <g data-graph-edge="email:project">
                <path className="v7-edge-base" d="M180 66 L180 363" />
                <path className="v7-edge-signal" d="M180 66 L180 363" />
                <text x="177" y="195" textAnchor="middle">
                  {t("matchesProject2")}
                </text>
              </g>
              <g data-graph-edge="document:project">
                <path className="v7-edge-base" d="M302 66 Q380 300 180 363" />
                <path className="v7-edge-signal" d="M302 66 Q380 300 180 363" />
                <text x="306" y="315" textAnchor="middle">
                  {t("refersConditions2")}
                </text>
              </g>
              <g data-graph-edge="document:term">
                <path className="v7-edge-base" d="M302 66 Q20 410 65 536" />
                <path className="v7-edge-signal" d="M302 66 Q20 410 65 536" />
                <text x="33" y="396" textAnchor="middle">
                  {t("definesMeaning2")}
                </text>
              </g>
              <g data-graph-edge="person:project">
                <path className="v7-edge-base" d="M65 223 L180 363" />
                <path className="v7-edge-signal" d="M65 223 L180 363" />
                <text x="95" y="307" textAnchor="middle">
                  {t("responsible2")}
                </text>
              </g>
              <g data-graph-edge="project:statement">
                <path className="v7-edge-base" d="M180 363 L295 223" />
                <path className="v7-edge-signal" d="M180 363 L295 223" />
                <text x="249" y="306" textAnchor="middle">
                  {t("linksConversation2")}
                </text>
              </g>
              <g data-graph-edge="statement:decision">
                <path className="v7-edge-base" d="M295 223 L295 536" />
                <path className="v7-edge-signal" d="M295 223 L295 536" />
                <text x="312" y="406" textAnchor="middle">
                  {t("basisDecision2")}
                </text>
              </g>
              <g data-graph-edge="project:decision">
                <path className="v7-edge-base" d="M180 363 L295 536" />
                <path className="v7-edge-signal" d="M180 363 L295 536" />
                <text x="249" y="452" textAnchor="middle">
                  {t("keepsDecision2")}
                </text>
              </g>
              <g data-graph-edge="decision:action">
                <path className="v7-edge-base" d="M295 536 L180 701" />
                <path className="v7-edge-signal" d="M295 536 L180 701" />
                <text x="270" y="633" textAnchor="middle">
                  {t("nextStep2")}
                </text>
              </g>
              <g data-graph-edge="project:action">
                <path className="v7-edge-base" d="M180 363 L180 701" />
                <path className="v7-edge-signal" d="M180 363 L180 701" />
                <text x="176" y="605" textAnchor="middle">
                  {t("linksNextAction2")}
                </text>
              </g>
              <g data-graph-edge="term:project">
                <path className="v7-edge-base" d="M65 536 L180 363" />
                <path className="v7-edge-signal" d="M65 536 L180 363" />
                <text x="81" y="451" textAnchor="middle">
                  {t("interpretsTerm2")}
                </text>
              </g>
            </svg>
            <button
              type="button"
              className="v7-graph-node source"
              data-graph-node="meeting"
              style={{ "--x": "10%", "--y": "16%", "--mx": "16%", "--my": "8%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
                <img data-asset="Zoom" alt="" src="/assets/zoom.webp" />
                {t("meeting")}
              </span>
              <strong>
                {t("sep25Discovery")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node source"
              data-graph-node="email"
              style={{ "--x": "10%", "--y": "47%", "--mx": "50%", "--my": "8%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
                <img data-asset="Gmail" alt="" src="/assets/gmail.webp" />
                {t("email")}
              </span>
              <strong>
                {t("pilotScope")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node source"
              data-graph-node="document"
              style={{ "--x": "10%", "--y": "78%", "--mx": "84%", "--my": "8%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
                <img data-asset="Google Drive" alt="" src="/assets/google-drive.webp" />
                {t("internalDocument")}
              </span>
              <strong>
                {t("pilotApproval")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node entity"
              data-graph-node="person"
              style={{ "--x": "37%", "--y": "15%", "--mx": "18%", "--my": "27%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
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
                {t("person")}
              </span>
              <strong>
                {t("kenTanaka")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node entity main"
              data-graph-node="project"
              style={{ "--x": "44%", "--y": "48%", "--mx": "50%", "--my": "44%" } as CSSProperties}
              aria-pressed="true"
            >
              <span className="v7-node-category">
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
                {t("project2")}
              </span>
              <strong>
                {t("hokuseiPilotEvaluation")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node entity"
              data-graph-node="term"
              style={{ "--x": "37%", "--y": "80%", "--mx": "18%", "--my": "65%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
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
                {t("companyTerm")}
              </span>
              <strong>
                {t("secondApproval")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node knowledge"
              data-graph-node="statement"
              style={{ "--x": "76%", "--y": "15%", "--mx": "82%", "--my": "27%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
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
                {t("statement")}
              </span>
              <strong>
                {t("needsApproval")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node knowledge"
              data-graph-node="decision"
              style={{ "--x": "80%", "--y": "48%", "--mx": "82%", "--my": "65%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
                </svg>
                {t("decision2")}
              </span>
              <strong>
                {t("pilotAfterApproval")}
              </strong>
            </button>
            <button
              type="button"
              className="v7-graph-node knowledge"
              data-graph-node="action"
              style={{ "--x": "76%", "--y": "80%", "--mx": "50%", "--my": "85%" } as CSSProperties}
              aria-pressed="false"
            >
              <span className="v7-node-category">
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
                {t("nextAction2")}
              </span>
              <strong>
                {t("sendTermsFriday")}
              </strong>
            </button>
          </div>
          <div className="v7-graph-detail" aria-live="polite" aria-atomic="true">
            <div>
              <span className="eyebrow" data-graph-kind="" />
              <h4 data-graph-title="" />
              <p data-graph-description="" />
            </div>
            <div className="v7-graph-evidence">
              <span>
                {t("connectedEvidence")}
              </span>
              <p data-graph-evidence="" />
              <div data-graph-source-links="" />
            </div>
          </div>
          <div className="v7-graph-foot">
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
                <rect x="5" y="10" width="14" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3m-4 7v-3" />
              </svg>
              {t("onlyInformationWithinViewer")}
            </span>
            <small>
              {t("fictionalProjectExampleBased")}
            </small>
          </div>
        </div>
        <div className="v6-tech-definitions">
          <article>
            <span>
              {t("text")}
            </span>
            <h3>
              {t("defineEntitiesRelationships")}
            </h3>
            <p>
              {t("defineWhatPeopleProjects")}
            </p>
          </article>
          <article>
            <span>
              {t("text2")}
            </span>
            <h3>
              {t("linkUpdateRealRecords")}
            </h3>
            <p>
              {t("matchSamePeopleProjects")}
            </p>
          </article>
        </div>
        <div className="v6-tech-principles">
          <article>
            <h3>
              {t("updatedEachConversation")}
            </h3>
            <p>
              {t("connectNewKnowledgeExisting")}
            </p>
          </article>
          <article>
            <h3>
              {t("sourcesUncertaintyStayVisible")}
            </h3>
            <p>
              {t("retainSourcesStatementsDecisions")}
            </p>
          </article>
          <article>
            <h3>
              {t("accessFollowsPermissions")}
            </h3>
            <p>
              {t("personalRecordsStartPrivate")}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
