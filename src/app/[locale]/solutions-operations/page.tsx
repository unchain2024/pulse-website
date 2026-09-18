import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { SolutionsOperationsPage } from "@/components/site/solutions-operations";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "solutions_operations");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <SolutionsOperationsPage />;
}
