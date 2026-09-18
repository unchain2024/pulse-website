import { useTranslations } from "next-intl";

export function Block1() {
  const t = useTranslations("site.blog_briefs.block1");

  return (
    <section>
      <div className="article">
        <span className="eyebrow">
          {t("announcementAugust202026")}
        </span>
        <h1 style={{ marginTop: "12px" }}>
          {t("newBriefsPrepareNext")}
        </h1>
        <div className="ph b asset-replacement">
          <div className="ui-demo" data-view="notes" />
        </div>
        <p>
          {t("startingTodayPulsePrepares")}
        </p>
        <h2>
          {t("whatSInside")}
        </h2>
        <p>
          {t("openItemsPulledPast")}
        </p>
        <h2>
          {t("howUse")}
        </h2>
        <p>
          {t("connectCalendarBriefsBusiness")}
        </p>
        <div className="brief">
          <div className="lbl">
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
              <path d="M7 3h7l5 5v13H7z" />
              <path d="M14 3v5h5M10 13h6M10 17h6" />
            </svg>
            {t("brief")}
          </div>
          <p>
            {t("alexParkSVp")}
          </p>
          <ul>
            <li>
              {t("alexEmailMorningNotes")}
            </li>
            <li>
              {t("q3ImplementationHardConstraint")}
            </li>
          </ul>
        </div>
        <p style={{ marginTop: "32px" }}>
          {t("tellUsWhatThink")}
        </p>
      </div>
    </section>
  );
}
