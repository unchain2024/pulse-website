import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

/** Page titles come from the prototype's data-title attributes, kept in site.titles. */
export async function pageMetadata(locale: string, key: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "site" });
  return {
    title: t(`titles.${key}`),
  };
}
