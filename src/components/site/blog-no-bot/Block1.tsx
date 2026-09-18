import { useTranslations } from "next-intl";

export function Block1() {
  const t = useTranslations("site.blog_no_bot.block1");

  return (
    <section>
      <div className="article">
        <span className="eyebrow">
          {t("blogSeptember12026")}
        </span>
        <h1 style={{ marginTop: "12px" }}>
          {t("whyPulseDoesnT")}
        </h1>
        <div className="ph c asset-replacement">
          <div className="ui-demo" data-view="notes" />
        </div>
        <p>
          {t("momentRecorderHasJoined")}
        </p>
        <h2>
          {t("onlyPeopleRoom")}
        </h2>
        <p>
          {t("pulseDoesnTJoin")}
        </p>
        <h2>
          {t("decideWhenRecord")}
        </h2>
        <p>
          {t("botToolsAutoJoin")}
        </p>
        <h2>
          {t("consentHumanJob")}
        </h2>
        <p>
          {t("consentObtainedHostNot")}
        </p>
        <p>
          {t("notUsingBotChoice")}
        </p>
      </div>
    </section>
  );
}
