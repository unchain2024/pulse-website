import { NextResponse } from "next/server";

import { searchArticles } from "@/lib/help";

/** Search runs on the server so the 3 MB article corpus never reaches the browser. */
export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  if (!query.trim()) return NextResponse.json({ results: [] });
  return NextResponse.json({ results: searchArticles(query) });
}
