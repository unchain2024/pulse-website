import { useTranslations } from "next-intl";

import { V6PageHero } from "@/components/site/notepad/V6PageHero";
import { Capture } from "@/components/site/notepad/Capture";
import { PulseDetection } from "@/components/site/notepad/PulseDetection";
import { FollowUp } from "@/components/site/notepad/FollowUp";
import { Terminology } from "@/components/site/notepad/Terminology";
import { Knowledge } from "@/components/site/notepad/Knowledge";
import { MemoryInteractive } from "@/components/site/notepad/MemoryInteractive";
import { PulseAiHandoff } from "@/components/site/notepad/PulseAiHandoff";
import { V6End } from "@/components/site/notepad/V6End";

export function NotepadPage() {
  const t = useTranslations("site.titles");

  return (
    <div className="page v6-product on" data-page="notepad" data-nav="" data-title={t("notepad")}>
      <V6PageHero />
      <Capture />
      <PulseDetection />
      <FollowUp />
      <Terminology />
      <Knowledge />
      <MemoryInteractive />
      <PulseAiHandoff />
      <V6End />
    </div>
  );
}
