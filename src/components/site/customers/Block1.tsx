import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block1() {
  const t = useTranslations("site.customers.block1");
  const locale = useLocale();

  return (
    <section>
      <div className="wrap">
        <span className="eyebrow">
          {t("pulseTeam")}
        </span>
        <h1 style={{ margin: "16px 0 38px" }}>
          {t("everyConversationHasNext")}
        </h1>
        <div className="help-categories">
          <Link className="help-category" href={`/${locale}/solutions-sales`}>
            <h2>
              {t("sales")}
            </h2>
            <p>
              {t("meetingPrepCrmUpdates")}
            </p>
          </Link>
          <Link className="help-category" href={`/${locale}/solutions-customer-success`}>
            <h2>
              {t("customerSuccess")}
            </h2>
            <p>
              {t("turnCustomerRequestsConcerns")}
            </p>
          </Link>
          <Link className="help-category" href={`/${locale}/solutions-product`}>
            <h2>
              {t("productEngineering")}
            </h2>
            <p>
              {t("keepDecisionsReasoningBehind")}
            </p>
          </Link>
          <Link className="help-category" href={`/${locale}/solutions-operations`}>
            <h2>
              {t("operations")}
            </h2>
            <p>
              {t("bringCrossTeamDecisions")}
            </p>
          </Link>
          <Link className="help-category" href={`/${locale}/solutions-hr`}>
            <h2>
              {t("hrTalent")}
            </h2>
            <p>
              {t("keepInterviewsOneOnes")}
            </p>
          </Link>
          <Link className="help-category" href={`/${locale}/solutions-marketing`}>
            <h2>
              {t("marketing")}
            </h2>
            <p>
              {t("buildNextIdeaAround")}
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
