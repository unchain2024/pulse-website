import { useTranslations } from "next-intl";
import styles from "./Integrations.module.css";

const connectors = [
  { name: "salesforce", icon: "/assets/salesforce.webp" },
  { name: "hubspot", icon: "/assets/hubspot.webp" },
  { name: "sansan", icon: "/assets/sansan.webp" },
  { name: "kintone", icon: "/assets/kintone.webp" },
  { name: "gmail", icon: "/assets/gmail.webp" },
  { name: "outlook", icon: "/assets/outlook.webp" },
  { name: "slack", icon: "/assets/slack.webp" },
  { name: "microsoftTeams", icon: "/assets/microsoft-teams.webp" },
  { name: "chatwork", icon: "/assets/chatwork.webp" },
  { name: "lineWorks", icon: "/assets/line-works.webp" },
  { name: "notion", icon: "/assets/notion.webp" },
  { name: "googleDrive", icon: "/assets/google-drive.webp" },
  { name: "googleCalendar", icon: "/assets/google-calendar.webp" },
  { name: "garoon", icon: "/assets/garoon.webp" },
  { name: "backlog", icon: "/assets/backlog.webp" },
  { name: "linear", icon: "/assets/linear.svg" },
  { name: "asana", icon: "/assets/asana.svg" },
  { name: "claude", icon: "/assets/claude.svg" },
  { name: "chatgpt", icon: "/assets/chatgpt.svg" },
  { name: "cursor", icon: "/assets/cursor.svg" },
] as const;

export function V6Catalog() {
  const t = useTranslations("site.integrations.v6Catalog");
  return (
    <section className={styles.catalog} aria-labelledby="connector-heading">
      <div className="wrap">
        <h2 id="connector-heading" className={styles.catalogHeading}>{t("selectionConnectors")}</h2>
        <ul className={styles.connectors}>
          {connectors.map(({ name, icon }) => (
            <li key={name}>
              <img src={icon} alt="" width="32" height="32" />
              <span>{t(name)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
