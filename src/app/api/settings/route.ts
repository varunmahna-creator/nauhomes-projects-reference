export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getSettings, saveSettings } from "@/lib/settings";

export async function GET() {
  const settings = await getSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    await saveSettings(body);
    return NextResponse.json(body);
  } catch (err) {
    console.error("[api/settings PUT] failed:", err);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
