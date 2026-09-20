import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function Block4() {
  const t = useTranslations("site.careers.block4");

  return (
    <section className="tight">
      <div className="wrap-n">
        <div className="tcol">
          <div>
            <h2>
              {t("team")}
            </h2>
            <p className="sub" style={{ marginTop: "12px" }}>
              {t("reFriendlyBunch")}
            </p>
            <div className="tags" style={{ marginTop: "16px" }}>
              {t.rich("everyoneLeadershipEngineeringSales", {
                span: (chunks: ReactNode) => <span className="tag fill">{chunks}</span>,
                span2: (chunks: ReactNode) => <span className="tag">{chunks}</span>,
              })}
            </div>
          </div>
          <div className="faces">
            {t.rich("text", {
              i: (chunks: ReactNode) => <i>{chunks}</i>,
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
