import { NextResponse } from "next/server";
import { getLeads, saveLeads } from "@/lib/leads";

type Props = { params: Promise<{ id: string }> };

export async function PUT(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const body = await request.json();
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    leads[index] = { ...leads[index], ...body, id, createdAt: leads[index].createdAt };
    saveLeads(leads);
    return NextResponse.json(leads[index]);
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = await params;
    const leads = getLeads();
    const index = leads.findIndex((l) => l.id === id);
    if (index === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
    leads.splice(index, 1);
    saveLeads(leads);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
