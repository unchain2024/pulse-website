import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";

import { answer, buildQuery, type AnswerStrings } from "@/lib/chat/answer";
import { isLocale, pageCoverageGaps, retrieve } from "@/lib/chat/retrieval";
import type { Locale } from "@/i18n/routing";

/** The index holds the whole article corpus, which rules out the edge runtime. */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_MESSAGE = 800;
const MAX_HISTORY = 6;
const MAX_HISTORY_CHARS = 2000;
const INTENT_IDS = ["pricing", "meetingBot", "integrations", "gettingStarted", "contact"];

type Turn = { role: "user" | "assistant"; content: string };

type ParsedRequest = { locale: Locale; message: string; history: string[] };

function parse(body: unknown): ParsedRequest | { error: string } {
  if (!body || typeof body !== "object") return { error: "bad_request" };
  const { locale, message, history } = body as Record<string, unknown>;

  if (!isLocale(locale)) return { error: "bad_request" };
  if (typeof message !== "string" || !message.trim()) return { error: "bad_request" };
  if (message.length > MAX_MESSAGE) return { error: "too_long" };

  // Only the visitor's own turns are useful for retrieval, and only the recent ones.
  const turns = Array.isArray(history) ? (history as Turn[]) : [];
  const questions = turns
    .slice(-MAX_HISTORY)
    .filter((turn) => turn && turn.role === "user" && typeof turn.content === "string")
    .map((turn) => turn.content.slice(0, MAX_HISTORY_CHARS));

  return { locale, message: message.trim(), history: questions };
}

/**
 * A crude per-address bucket. Nothing here costs money, so this exists only to stop a
 * runaway client retry loop from pinning a CPU — it is per-process and resets on deploy.
 */
const BUCKETS = new Map<string, { tokens: number; at: number }>();
const BURST = 20;
const REFILL_MS = 2000;

function allow(key: string): boolean {
  const now = Date.now();
  const bucket = BUCKETS.get(key) ?? { tokens: BURST, at: now };
  bucket.tokens = Math.min(BURST, bucket.tokens + (now - bucket.at) / REFILL_MS);
  bucket.at = now;
  if (BUCKETS.size > 5000) for (const [id, entry] of BUCKETS) if (now - entry.at > 3_600_000) BUCKETS.delete(id);
  if (bucket.tokens < 1) {
    BUCKETS.set(key, bucket);
    return false;
  }
  bucket.tokens -= 1;
  BUCKETS.set(key, bucket);
  return true;
}

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

async function answerStrings(locale: Locale): Promise<AnswerStrings> {
  const t = await getTranslations({ locale, namespace: "site.chat" });
  const intents: Record<string, string> = {};
  for (const id of INTENT_IDS) intents[id] = t(`intents.${id}`);
  return {
    fromSource: (source: string) => t("fromSource", { source }),
    noAnswer: t("noAnswer"),
    greeting: t("greeting"),
    intents,
  };
}

export async function POST(request: Request) {
  if (!allow(clientKey(request))) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429, headers: { "Retry-After": "5" } });
  }

  const parsed = parse(await request.json().catch(() => null));
  if ("error" in parsed) return NextResponse.json({ error: parsed.error }, { status: 400 });

  const strings = await answerStrings(parsed.locale);
  const reply = answer(parsed.message, parsed.locale, strings, parsed.history);

  // Deliberately not the question itself: the shape of what is failing is enough to know
  // which articles are missing, without keeping a log of what visitors typed.
  console.log(
    `[chat] locale=${parsed.locale} length=${parsed.message.length} confidence=${reply.confidence} sources=${reply.sources
      .map((source) => source.url)
      .join(",")}`
  );

  return NextResponse.json(reply, { headers: { "Cache-Control": "no-store" } });
}

/**
 * SITE_PAGES is written by hand, so it can quietly fall behind the routes it describes.
 * Reading the route directory is only safe in development, which is also the only place
 * anyone would notice the warning.
 */
async function coverage(): Promise<{ missing: string[]; extra: string[] } | undefined> {
  try {
    const { readdirSync } = await import("node:fs");
    const routes = readdirSync("src/app/[locale]", { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith("[") && entry.name !== "help")
      .map((entry) => entry.name);
    const gaps = pageCoverageGaps([...routes, "help"]);
    return gaps.missing.length || gaps.extra.length ? gaps : undefined;
  } catch {
    return undefined;
  }
}

/** Development-only view of the raw ranking, for tuning retrieval without the widget. */
export async function GET(request: Request) {
  if (process.env.NODE_ENV === "production") return new NextResponse(null, { status: 404 });

  const params = new URL(request.url).searchParams;
  const query = params.get("q") ?? "";
  const locale = params.get("locale") ?? "ja";
  if (!isLocale(locale) || !query.trim()) {
    return NextResponse.json({ hits: [], pageCoverage: await coverage() });
  }

  const started = Date.now();
  const hits = retrieve(buildQuery(query, [], locale), locale, query);
  return NextResponse.json({
    query,
    locale,
    ms: Date.now() - started,
    pageCoverage: await coverage(),
    hits: hits.map((hit) => ({
      score: Number(hit.score.toFixed(3)),
      kind: hit.chunk.kind,
      slug: hit.chunk.slug,
      anchor: hit.chunk.anchor,
      heading: hit.chunk.heading,
      url: hit.chunk.url,
      preview: hit.chunk.text.slice(0, 120),
    })),
  });
}
