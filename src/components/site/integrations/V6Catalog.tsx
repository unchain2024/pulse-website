import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function V6Catalog() {
  const t = useTranslations("site.integrations.v6Catalog");
  const locale = useLocale();

  return (
    <section className="v6-catalog" data-connector-catalog="">
      <div className="wrap">
        <div className="v6-catalog-top">
          <div>
            <h2>
              {t("selectionConnectors")}
            </h2>
            <p>
              {t("bringEmailCustomerData")}
            </p>
          </div>
          <input
            type="search"
            data-connector-search=""
            aria-label={t("searchConnectors")}
            placeholder={t("searchConnectors2")}
          />
        </div>
        <div className="v6-connector-filters" role="group" aria-label={t("connectorCategory")}>
          <button type="button" data-connector-filter="all" aria-pressed="true">
            {t("all")}
          </button>
          <button type="button" data-connector-filter="crm" aria-pressed="false">
            {t("crm")}
          </button>
          <button type="button" data-connector-filter="communication" aria-pressed="false">
            {t("emailChat")}
          </button>
          <button type="button" data-connector-filter="knowledge" aria-pressed="false">
            {t("knowledge")}
          </button>
          <button type="button" data-connector-filter="calendar" aria-pressed="false">
            {t("calendar")}
          </button>
          <button type="button" data-connector-filter="projects" aria-pressed="false">
            {t("projects")}
          </button>
          <button type="button" data-connector-filter="ai" aria-pressed="false">
            {t("ai")}
          </button>
        </div>
        <div className="v6-connector-grid">
          <Link className="v6-connector" data-connector-category="crm" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Salesforce" alt={t("salesforce")} src="/assets/salesforce.webp" />
            </span>
            <h3>
              {t("salesforce2")}
            </h3>
            <p>
              {t("accountsOpportunities")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="crm" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="HubSpot" alt={t("hubspot")} src="/assets/hubspot.webp" />
            </span>
            <h3>
              {t("hubspot2")}
            </h3>
            <p>
              {t("contactsDeals")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup2")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="crm" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Sansan" alt={t("sansan")} src="/assets/sansan.webp" />
            </span>
            <h3>
              {t("sansan2")}
            </h3>
            <p>
              {t("peopleCompanies")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup3")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="crm" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="kintone" alt={t("kintone")} src="/assets/kintone.webp" />
            </span>
            <h3>
              {t("kintone2")}
            </h3>
            <p>
              {t("businessAppRecords")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup4")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Gmail" alt={t("gmail")} src="/assets/gmail.webp" />
            </span>
            <h3>
              {t("gmail2")}
            </h3>
            <p>
              {t("emailConversations")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup5")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Outlook" alt={t("outlook")} src="/assets/outlook.webp" />
            </span>
            <h3>
              {t("outlook2")}
            </h3>
            <p>
              {t("emailEvents")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup6")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Slack" alt={t("slack")} src="/assets/slack.webp" />
            </span>
            <h3>
              {t("slack2")}
            </h3>
            <p>
              {t("channelConversations")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup7")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Microsoft Teams" alt={t("microsoftTeams")} src="/assets/microsoft-teams.webp" />
            </span>
            <h3>
              {t("microsoftTeams2")}
            </h3>
            <p>
              {t("teamConversations")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup8")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Chatwork" alt={t("chatwork")} src="/assets/chatwork.webp" />
            </span>
            <h3>
              {t("chatwork2")}
            </h3>
            <p>
              {t("workConversations")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup9")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="communication" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="LINE WORKS" alt={t("lineWorks")} src="/assets/line-works.webp" />
            </span>
            <h3>
              {t("lineWorks2")}
            </h3>
            <p>
              {t("workConversations2")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup10")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="knowledge" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Notion" alt={t("notion")} src="/assets/notion.webp" />
            </span>
            <h3>
              {t("notion2")}
            </h3>
            <p>
              {t("internalDocuments")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup11")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="knowledge" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Google Drive" alt={t("googleDrive")} src="/assets/google-drive.webp" />
            </span>
            <h3>
              {t("googleDrive2")}
            </h3>
            <p>
              {t("filesSharedMaterials")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup12")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="calendar" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Google Calendar" alt={t("googleCalendar")} src="/assets/google-calendar.webp" />
            </span>
            <h3>
              {t("googleCalendar2")}
            </h3>
            <p>
              {t("eventsAttendees")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup13")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="calendar" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Garoon" alt={t("garoon")} src="/assets/garoon.webp" />
            </span>
            <h3>
              {t("garoon2")}
            </h3>
            <p>
              {t("schedulesWorkInformation")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup14")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="projects" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Backlog" alt={t("backlog")} src="/assets/backlog.webp" />
            </span>
            <h3>
              {t("backlog2")}
            </h3>
            <p>
              {t("issuesProjects")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup15")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="projects" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Linear" alt={t("linear")} src="/assets/linear.svg" />
            </span>
            <h3>
              {t("linear2")}
            </h3>
            <p>
              {t("issuesProjects2")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup16")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="projects" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Asana" alt={t("asana")} src="/assets/asana.svg" />
            </span>
            <h3>
              {t("asana2")}
            </h3>
            <p>
              {t("tasksOwners")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup17")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="ai" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Claude" alt={t("claude")} src="/assets/claude.svg" />
            </span>
            <h3>
              {t("claude2")}
            </h3>
            <p>
              {t("contextThroughMcp")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup18")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="ai" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="ChatGPT" alt={t("chatgpt")} src="/assets/chatgpt.svg" />
            </span>
            <h3>
              {t("chatgpt2")}
            </h3>
            <p>
              {t("contextThroughMcp2")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup19")}
            </span>
          </Link>
          <Link className="v6-connector" data-connector-category="ai" href={`/${locale}/demo`}>
            <span className="v6-connector-logo">
              <img data-asset="Cursor" alt={t("cursor")} src="/assets/cursor.svg" />
            </span>
            <h3>
              {t("cursor2")}
            </h3>
            <p>
              {t("contextThroughMcp3")}
            </p>
            <span className="v6-connector-more">
              {t("discussSetup20")}
            </span>
          </Link>
        </div>
        <p className="v6-search-status" data-connector-status="" role="status" />
      </div>
    </section>
  );
}
