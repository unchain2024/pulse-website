import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { BlogNoBotPage } from "@/components/site/blog-no-bot";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "blog_no_bot");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <BlogNoBotPage />;
}
