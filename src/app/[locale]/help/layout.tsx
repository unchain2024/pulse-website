import type { ReactNode } from "react";

import { HelpChrome } from "@/components/site/help/HelpChrome";

export default function HelpLayout({ children }: { children: ReactNode }) {
  return <HelpChrome>{children}</HelpChrome>;
}
