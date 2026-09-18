import type { ReactNode } from "react";

import "./globals.css";

// The <html> and <body> elements are emitted by src/app/[locale]/layout.tsx,
// which is where the active locale is known.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
