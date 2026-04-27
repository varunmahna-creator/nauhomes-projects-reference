import { sql } from "@vercel/postgres";
import type { SiteSettings, ContactInfo } from "@/types";

// Default settings (used as fallback when DB is unset or key missing)
const defaultSettings: SiteSettings = {
  contactInfo: {
    phone: "+91-9876543210",
    email: "info@nauhomes.com",
    whatsapp: "919876543210",
    offices: [
      {
        city: "New Delhi",
        address: "Plot No. 20, Okhla Phase 3, New Delhi 110020, India",
        mapUrl: "https://maps.google.com/?q=Okhla+Phase+3+New+Delhi",
      },
      {
        city: "Bali",
        address:
          "Floor 3, Block A6, Jl. Teuku Umar No.8, Denpasar, Bali 80113, Indonesia",
        mapUrl: "https://maps.google.com/?q=Denpasar+Bali",
      },
    ],
  },
  socialLinks: {
    facebook: "https://facebook.com/nirvanahomes",
    instagram: "https://instagram.com/nirvanahomes",
    youtube: "https://youtube.com/@nirvanahomes",
    twitter: "https://twitter.com/nirvanahomes",
    linkedin: "https://linkedin.com/company/nirvanahomes",
  },
  sectionVisibility: {
    stats: true,
    about: true,
    services: true,
    projects: true,
    process: true,
    whyUs: true,
    testimonials: true,
    blog: true,
    faq: true,
    cta: true,
    mediaCoverage: true,
  },
  homepageImages: {
    heroAll:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80",
    heroDelhi:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80",
    heroBali:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
    aboutDelhi:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=80",
    aboutBali:
      "https://images.unsplash.com/photo-1573790387438-4da905039392?w=1920&q=80",
    ctaBackground:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c0?w=1920&q=80",
  },
};

// In-memory storage (fallback when no DB is configured, e.g. local dev without Postgres)
let settingsStorage: SiteSettings = { ...defaultSettings };

function hasDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

// --- Schema bootstrap (runs at most once per serverless instance) ---
let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS site_settings (
        key         TEXT PRIMARY KEY,
        value       JSONB NOT NULL,
        updated_at  TIMESTAMPTZ DEFAULT NOW()
      );
    `;
  })();
  return schemaReady;
}

const SETTINGS_KEY = "site";

function mergeWithDefaults(saved: Partial<SiteSettings> | null): SiteSettings {
  if (!saved) return { ...defaultSettings };
  return {
    contactInfo: saved.contactInfo ?? defaultSettings.contactInfo,
    socialLinks: { ...defaultSettings.socialLinks, ...(saved.socialLinks ?? {}) },
    sectionVisibility: {
      ...defaultSettings.sectionVisibility,
      ...(saved.sectionVisibility ?? {}),
    },
    homepageImages: {
      ...defaultSettings.homepageImages,
      ...(saved.homepageImages ?? {}),
    },
  };
}

/**
 * Returns full site settings.
 * - If Postgres is configured, reads from the `site_settings` table.
 * - Otherwise, falls back to in-memory storage (dev only).
 */
export async function getSettings(): Promise<SiteSettings> {
  if (!hasDatabase()) {
    return settingsStorage;
  }
  try {
    await ensureSchema();
    const { rows } = await sql<{ value: Partial<SiteSettings> }>`
      SELECT value FROM site_settings WHERE key = ${SETTINGS_KEY} LIMIT 1
    `;
    if (rows.length === 0) return { ...defaultSettings };
    return mergeWithDefaults(rows[0].value);
  } catch (err) {
    console.error("[settings] getSettings failed, returning defaults:", err);
    return { ...defaultSettings };
  }
}

/**
 * Persist site settings.
 * - If Postgres is configured, upserts into `site_settings`.
 * - Otherwise, writes to in-memory storage.
 */
export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!hasDatabase()) {
    settingsStorage = { ...settings };
    return;
  }
  await ensureSchema();
  await sql`
    INSERT INTO site_settings (key, value, updated_at)
    VALUES (${SETTINGS_KEY}, ${JSON.stringify(settings)}::jsonb, NOW())
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;
}

/**
 * Returns the current contact info, falling back to defaults if not set.
 * Async — server-side helper safe to await in any RSC/route handler.
 */
export async function getContactInfo(): Promise<ContactInfo> {
  const s = await getSettings();
  const ci = s.contactInfo;
  const fallback = defaultSettings.contactInfo as ContactInfo;
  if (!ci) return fallback;
  return {
    phone: ci.phone || fallback.phone,
    email: ci.email || fallback.email,
    whatsapp: ci.whatsapp || fallback.whatsapp,
    offices: ci.offices && ci.offices.length > 0 ? ci.offices : fallback.offices,
  };
}
