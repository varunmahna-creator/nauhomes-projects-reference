export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { getLeads, createLead } from "@/lib/leads";
import type { Lead } from "@/types";

export async function GET() {
  const leads = await getLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const id = "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);

    const newLead: Lead = {
      id,
      name: String(body.name || "").slice(0, 200),
      phone: String(body.phone || "").slice(0, 50),
      email: String(body.email || "").slice(0, 200),
      location: String(body.location || "").slice(0, 100),
      interest: String(body.interest || "").slice(0, 100),
      message: String(body.message || "").slice(0, 2000),
      status: "new",
      source: String(body.source || "unknown").slice(0, 100),
      createdAt: new Date().toISOString(),
      notes: "",
    };

    await createLead(newLead);
    return NextResponse.json(newLead, { status: 201 });
  } catch (err) {
    console.error("[api/leads POST] failed:", err);
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
