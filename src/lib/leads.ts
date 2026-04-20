import type { Lead } from "@/types";
import fs from "fs";
import path from "path";

const DATA_PATH = path.join(process.cwd(), "data", "leads.json");

export function getLeads(): Lead[] {
  try {
    const raw = fs.readFileSync(DATA_PATH, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

export function saveLeads(leads: Lead[]): void {
  fs.writeFileSync(DATA_PATH, JSON.stringify(leads, null, 2), "utf-8");
}

export function getLeadById(id: string): Lead | undefined {
  return getLeads().find((l) => l.id === id);
}
