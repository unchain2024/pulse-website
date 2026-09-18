import { useTranslations } from "next-intl";

import { GOpening } from "@/components/site/home/GOpening";
import { GMeetings } from "@/components/site/home/GMeetings";
import { MemoryInteractive } from "@/components/site/home/MemoryInteractive";
import { V7Capabilities } from "@/components/site/home/V7Capabilities";
import { PulseVocabulary } from "@/components/site/home/PulseVocabulary";
import { PulseAiHandoff } from "@/components/site/home/PulseAiHandoff";
import { PHelpTeaser } from "@/components/site/home/PHelpTeaser";
import { V6End } from "@/components/site/home/V6End";

export function HomePage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page granola-home pulse-home v7-home on" data-page="home" data-nav="" data-title={t("home")}>
      <GOpening />
      <GMeetings />
      <MemoryInteractive />
      <V7Capabilities />
      <PulseVocabulary />
      <PulseAiHandoff />
      <PHelpTeaser />
      <V6End />
    </div>
  );
}
