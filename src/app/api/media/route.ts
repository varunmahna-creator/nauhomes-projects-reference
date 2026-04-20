import { NextResponse } from "next/server";
import { getMedia, saveMedia } from "@/lib/media";
import type { MediaItem } from "@/types";

export async function GET() {
  return NextResponse.json(getMedia());
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const items = getMedia();
    const id = body.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") + "-" + Date.now();
    const newItem: MediaItem = {
      id,
      name: body.name || "",
      logoUrl: body.logoUrl || "",
      articleUrl: body.articleUrl || undefined,
      date: body.date || undefined,
    };
    items.push(newItem);
    saveMedia(items);
    return NextResponse.json(newItem, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create media item" }, { status: 500 });
  }
}
