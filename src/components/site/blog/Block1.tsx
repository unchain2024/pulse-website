import type { ReactNode } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Block1() {
  const t = useTranslations("site.blog.block1");
  const locale = useLocale();

  return (
    <section>
      <div className="wrap-n">
        <h1 style={{ textAlign: "center", marginBottom: "24px", fontSize: "3rem" }}>
          {t("blog")}
        </h1>
        <div className="filters">
          {t.rich("blogAnnouncementsPress", {
            span: (chunks: ReactNode) => <span className="on">{chunks}</span>,
            span2: (chunks: ReactNode) => <span>{chunks}</span>,
          })}
        </div>
        <div className="blog-list">
          <article className="post big">
            <h3>
              {t.rich("whyPulseDoesnT", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/blog-no-bot`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("christianParkSeptember1", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post big">
            <h3>
              {t.rich("newBriefsPrepareNext", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/blog-briefs`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("mediaAugust20", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("howSalesTeamsUse", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("mediaAugust17", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("gettingProperNounsRight", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("luiEbinaAugust4", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post big">
            <h3>
              {t.rich("pulseMcpConnectMeeting", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("luiEbinaJuly22", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("howTakeGoodMeeting", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("noteJuly10", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post big">
            <h3>
              {t.rich("pulseKnowledgeJustGot", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("mediaJune28", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("consentWorldWithoutMeeting", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("taizoHaradaJune12", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("decisionLogEndsWhen", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("christianParkMay30", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
          <article className="post ">
            <h3>
              {t.rich("unchainOpensBetaPulse", {
                a: (chunks: ReactNode) => <Link href={`/${locale}/help`}>{chunks}</Link>,
              })}
            </h3>
            <div className="meta">
              {t.rich("prTimesMay15", {
                i: (chunks: ReactNode) => <i>{chunks}</i>,
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
