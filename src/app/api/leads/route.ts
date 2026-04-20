import { NextResponse } from "next/server";
import { getLeads, saveLeads } from "@/lib/leads";
import type { Lead } from "@/types";

export async function GET() {
  const leads = getLeads();
  return NextResponse.json(leads);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const leads = getLeads();

    const id = "lead-" + Date.now() + "-" + Math.random().toString(36).slice(2, 6);

    const newLead: Lead = {
      id,
      name: body.name || "",
      phone: body.phone || "",
      email: body.email || "",
      location: body.location || "",
      interest: body.interest || "",
      message: body.message || "",
      status: "new",
      source: body.source || "unknown",
      createdAt: new Date().toISOString(),
      notes: "",
    };

    leads.unshift(newLead); // newest first
    saveLeads(leads);

    return NextResponse.json(newLead, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
