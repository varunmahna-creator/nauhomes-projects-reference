import { sql } from "@vercel/postgres";
import type { Lead, LeadStatus } from "@/types";

// In-memory fallback (used only when POSTGRES_URL is not set, e.g. local dev).
let leadsStorage: Lead[] = [];

function hasDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS leads (
        id          TEXT PRIMARY KEY,
        name        TEXT NOT NULL DEFAULT '',
        phone       TEXT NOT NULL DEFAULT '',
        email       TEXT NOT NULL DEFAULT '',
        location    TEXT NOT NULL DEFAULT '',
        interest    TEXT NOT NULL DEFAULT '',
        message     TEXT NOT NULL DEFAULT '',
        status      TEXT NOT NULL DEFAULT 'new',
        source      TEXT NOT NULL DEFAULT 'unknown',
        notes       TEXT NOT NULL DEFAULT '',
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `;
    await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);`;
    await sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);`;
  })();
  return schemaReady;
}

function rowToLead(row: Record<string, unknown>): Lead {
  return {
    id: row.id as string,
    name: (row.name as string) ?? "",
    phone: (row.phone as string) ?? "",
    email: (row.email as string) ?? "",
    location: (row.location as string) ?? "",
    interest: (row.interest as string) ?? "",
    message: (row.message as string) ?? "",
    status: ((row.status as string) ?? "new") as LeadStatus,
    source: (row.source as string) ?? "unknown",
    notes: (row.notes as string) ?? "",
    createdAt: row.created_at instanceof Date
      ? (row.created_at as Date).toISOString()
      : String(row.created_at),
  };
}

// --- Public API ---

export async function getLeads(): Promise<Lead[]> {
  if (!hasDatabase()) return [...leadsStorage];
  try {
    await ensureSchema();
    const { rows } = await sql`SELECT * FROM leads ORDER BY created_at DESC`;
    return rows.map((r) => rowToLead(r as Record<string, unknown>));
  } catch (err) {
    console.error("[leads] getLeads failed:", err);
    return [];
  }
}

export async function getLeadById(id: string): Promise<Lead | null> {
  if (!hasDatabase()) {
    return leadsStorage.find((l) => l.id === id) ?? null;
  }
  await ensureSchema();
  const { rows } = await sql`SELECT * FROM leads WHERE id = ${id} LIMIT 1`;
  return rows.length === 0 ? null : rowToLead(rows[0] as Record<string, unknown>);
}

export async function createLead(lead: Lead): Promise<Lead> {
  if (!hasDatabase()) {
    leadsStorage.unshift(lead);
    return lead;
  }
  await ensureSchema();
  await sql`
    INSERT INTO leads (id, name, phone, email, location, interest, message, status, source, notes, created_at)
    VALUES (
      ${lead.id},
      ${lead.name},
      ${lead.phone},
      ${lead.email},
      ${lead.location},
      ${lead.interest},
      ${lead.message},
      ${lead.status},
      ${lead.source},
      ${lead.notes},
      ${lead.createdAt}
    )
  `;
  return lead;
}

export async function updateLead(id: string, updates: Partial<Lead>): Promise<Lead | null> {
  if (!hasDatabase()) {
    const i = leadsStorage.findIndex((l) => l.id === id);
    if (i === -1) return null;
    leadsStorage[i] = { ...leadsStorage[i], ...updates, id, createdAt: leadsStorage[i].createdAt };
    return leadsStorage[i];
  }
  await ensureSchema();
  const existing = await getLeadById(id);
  if (!existing) return null;
  const merged: Lead = { ...existing, ...updates, id, createdAt: existing.createdAt };
  await sql`
    UPDATE leads SET
      name      = ${merged.name},
      phone     = ${merged.phone},
      email     = ${merged.email},
      location  = ${merged.location},
      interest  = ${merged.interest},
      message   = ${merged.message},
      status    = ${merged.status},
      source    = ${merged.source},
      notes     = ${merged.notes}
    WHERE id = ${id}
  `;
  return merged;
}

export async function deleteLead(id: string): Promise<boolean> {
  if (!hasDatabase()) {
    const i = leadsStorage.findIndex((l) => l.id === id);
    if (i === -1) return false;
    leadsStorage.splice(i, 1);
    return true;
  }
  await ensureSchema();
  const { rowCount } = await sql`DELETE FROM leads WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}
