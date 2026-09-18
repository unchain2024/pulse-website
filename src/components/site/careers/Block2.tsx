import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export function Block2() {
  const t = useTranslations("site.careers.block2");

  return (
    <section className="tight">
      <div className="wrap-n">
        <h1 style={{ fontSize: "clamp(2.6rem,5vw,4.5rem)" }}>
          {t.rich("buildToolsHelpHumans", {
            em: (chunks: ReactNode) => <em className="serif" style={{ fontStyle: "italic" }}>{chunks}</em>,
            br: () => <br />,
          })}
        </h1>
        <p className="sub" style={{ marginTop: "20px", maxWidth: "44em" }}>
          {t("reBuildingCategoryDefining")}
        </p>
      </div>
    </section>
  );
}
