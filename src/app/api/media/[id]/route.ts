import { NextResponse } from "next/server";
import { getMedia, saveMedia } from "@/lib/media";

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const items = getMedia();
    const index = items.findIndex((m) => m.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    items[index] = { ...items[index], ...body, id };
    saveMedia(items);
    return NextResponse.json(items[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const items = getMedia();
    const index = items.findIndex((m) => m.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    items.splice(index, 1);
    saveMedia(items);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
