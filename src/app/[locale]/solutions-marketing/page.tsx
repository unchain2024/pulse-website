import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SolutionsMarketingPage } from "@/components/site/solutions-marketing";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "solutions_marketing");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsMarketingPage />;
}
