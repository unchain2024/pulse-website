import type { ReactNode } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ImageDialog } from "@/components/site/ImageDialog";
import { SiteRuntime } from "@/components/site/SiteRuntime";
import { UtmCapture } from "@/components/site/UtmCapture";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t("title"), template: "%s" },
    description: t("description"),
    applicationName: "Pulse",
    openGraph: {
      siteName: "Pulse",
      type: "website",
      title: t("title"),
      description: t("description"),
      images: [{ url: LOGO_PATH, width: 512, height: 512, alt: "Pulse" }],
    },
    twitter: { card: "summary", images: [LOGO_PATH] },
  };
}

// Google's OAuth brand review checks that the consent-screen logo is the one
// this domain presents as its own; the Organization logo makes that explicit.
const SITE_URL = "https://www.pulse.co.jp";
const LOGO_PATH = "/assets/pulse-logo.png";
const ORGANIZATION_LD = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Pulse",
  url: SITE_URL,
  logo: `${SITE_URL}${LOGO_PATH}`,
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "site.shell" });

  // data-lang and the .lang wrapper are what the ported stylesheets key their
  // per-language typography off, so both have to stay.
  return (
    <html lang={locale} data-lang={locale}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: ORGANIZATION_LD }}
        />
        <a className="skip-link" href="#main-content">
          {t("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <div className={`lang lang-${locale}`}>
            <Navbar />
            <main id="main-content" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <ImageDialog />
          <UtmCapture />
          <SiteRuntime />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
