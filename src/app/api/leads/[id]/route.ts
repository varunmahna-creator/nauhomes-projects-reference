export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { updateLead, deleteLead } from "@/lib/leads";

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await updateLead(id, body);
    if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error("[api/leads/[id] PUT] failed:", err);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const ok = await deleteLead(id);
    if (!ok) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[api/leads/[id] DELETE] failed:", err);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
