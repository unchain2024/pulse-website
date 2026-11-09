import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The same basic set the app sends (pulse repo, docs/infra.md "Security headers"). No page is ever framed,
  // and the site needs no camera, microphone, screen capture or location. HSTS comes from Vercel.
  async headers() {
    return [{
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=(), display-capture=()" },
      ],
    }];
  },
  // The installers used to be committed to /public/downloads (frozen on an old Pulse Stage build until 2026-11-09).
  // Links to those paths that were already handed out now go to the portal's latest production build (src/lib/download.ts).
  async redirects() {
    const portal = "https://download.pulse.co.jp/distributions/app/installers/latest?channel=stable&utm_mark=website";
    return [
      { source: "/downloads/Pulse-Setup.exe", destination: `${portal}&platform=win`, permanent: false },
      { source: "/downloads/Pulse.dmg", destination: `${portal}&platform=osx`, permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
