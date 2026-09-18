import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { NotepadPage } from "@/components/site/notepad";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "notepad");
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <NotepadPage />;
}
