import { sql } from "@vercel/postgres";
import { fallbackProjects } from "@/lib/fallback-data";
import type { Project, ProjectStatus, ProjectLocation } from "@/types";

// --- Schema bootstrap (runs at most once per serverless instance) ---
let schemaReady: Promise<void> | null = null;

async function ensureSchema(): Promise<void> {
  if (schemaReady) return schemaReady;
  schemaReady = (async () => {
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        slug            TEXT PRIMARY KEY,
        title           TEXT NOT NULL,
        subtitle        TEXT DEFAULT '',
        location        TEXT NOT NULL,
        location_label  TEXT DEFAULT '',
        status          TEXT DEFAULT 'ongoing',
        type            TEXT DEFAULT '',
        area            TEXT DEFAULT '',
        year            TEXT DEFAULT '',
        thumbnail       TEXT DEFAULT '',
        gallery         JSONB DEFAULT '[]'::jsonb,
        floor_plans     JSONB DEFAULT '[]'::jsonb,
        tour_embed_url  TEXT,
        description     TEXT DEFAULT '',
        highlights      JSONB DEFAULT '[]'::jsonb,
        amenities       JSONB DEFAULT '[]'::jsonb,
        specs           JSONB DEFAULT '{}'::jsonb,
        timeline        JSONB DEFAULT '[]'::jsonb,
        created_at      TIMESTAMPTZ DEFAULT NOW(),
        updated_at      TIMESTAMPTZ DEFAULT NOW()
      );
    `;
    // Migration: add virtual_tour_videos column for projects that pre-date
    // the virtual-tour-video feature. No-op if it already exists.
    await sql`
      ALTER TABLE projects
      ADD COLUMN IF NOT EXISTS virtual_tour_videos JSONB DEFAULT '[]'::jsonb;
    `;
    await sql`CREATE INDEX IF NOT EXISTS projects_location_idx ON projects(location);`;
    await sql`CREATE INDEX IF NOT EXISTS projects_status_idx ON projects(status);`;
  })();
  return schemaReady;
}

function hasDatabase(): boolean {
  return Boolean(process.env.POSTGRES_URL || process.env.POSTGRES_PRISMA_URL);
}

function rowToProject(row: Record<string, unknown>): Project {
  return {
    slug: row.slug as string,
    title: (row.title as string) ?? "",
    subtitle: (row.subtitle as string) ?? "",
    location: (row.location as ProjectLocation) ?? "delhi",
    locationLabel: (row.location_label as string) ?? "",
    status: (row.status as ProjectStatus) ?? "ongoing",
    type: (row.type as string) ?? "",
    area: (row.area as string) ?? "",
    year: (row.year as string) ?? "",
    thumbnail: (row.thumbnail as string) ?? "",
    gallery: (row.gallery as Project["gallery"]) ?? [],
    floorPlans: (row.floor_plans as Project["floorPlans"]) ?? [],
    tourEmbedUrl: (row.tour_embed_url as string | null) ?? null,
    description: (row.description as string) ?? "",
    highlights: (row.highlights as string[]) ?? [],
    amenities: (row.amenities as string[]) ?? [],
    specs: (row.specs as Record<string, string>) ?? {},
    timeline: (row.timeline as Project["timeline"]) ?? [],
    virtualTourVideos:
      (row.virtual_tour_videos as Project["virtualTourVideos"]) ?? [],
  };
}

// --- Public API ---

export async function getProjects(): Promise<Project[]> {
  if (!hasDatabase()) {
    console.warn("[projects-db] POSTGRES_URL not set; serving fallback data.");
    return fallbackProjects;
  }
  try {
    await ensureSchema();
    const { rows } = await sql`
      SELECT * FROM projects ORDER BY created_at DESC;
    `;
    return rows.map(rowToProject);
  } catch (error) {
    console.error("[projects-db] getProjects error:", error);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!hasDatabase()) {
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }
  try {
    await ensureSchema();
    const { rows } = await sql`
      SELECT * FROM projects WHERE slug = ${slug} LIMIT 1;
    `;
    return rows[0] ? rowToProject(rows[0]) : null;
  } catch (error) {
    console.error("[projects-db] getProjectBySlug error:", error);
    return fallbackProjects.find((p) => p.slug === slug) ?? null;
  }
}

export async function createProject(
  project: Project
): Promise<Project | null> {
  if (!hasDatabase()) {
    console.error("[projects-db] createProject: no database configured");
    return null;
  }
  try {
    await ensureSchema();
    const { rows } = await sql`
      INSERT INTO projects (
        slug, title, subtitle, location, location_label, status,
        type, area, year, thumbnail, gallery, floor_plans,
        tour_embed_url, description, highlights, amenities, specs, timeline,
        virtual_tour_videos
      ) VALUES (
        ${project.slug},
        ${project.title},
        ${project.subtitle ?? ""},
        ${project.location},
        ${project.locationLabel ?? ""},
        ${project.status ?? "ongoing"},
        ${project.type ?? ""},
        ${project.area ?? ""},
        ${project.year ?? ""},
        ${project.thumbnail ?? ""},
        ${JSON.stringify(project.gallery ?? [])}::jsonb,
        ${JSON.stringify(project.floorPlans ?? [])}::jsonb,
        ${project.tourEmbedUrl ?? null},
        ${project.description ?? ""},
        ${JSON.stringify(project.highlights ?? [])}::jsonb,
        ${JSON.stringify(project.amenities ?? [])}::jsonb,
        ${JSON.stringify(project.specs ?? {})}::jsonb,
        ${JSON.stringify(project.timeline ?? [])}::jsonb,
        ${JSON.stringify(project.virtualTourVideos ?? [])}::jsonb
      )
      RETURNING *;
    `;
    return rows[0] ? rowToProject(rows[0]) : null;
  } catch (error) {
    console.error("[projects-db] createProject error:", error);
    return null;
  }
}

export async function updateProject(
  slug: string,
  updates: Partial<Project>
): Promise<Project | null> {
  if (!hasDatabase()) return null;
  try {
    await ensureSchema();
    // Fetch + merge + update-all (keeps SQL simple; acceptable at this scale).
    const existing = await getProjectBySlug(slug);
    if (!existing) return null;

    const merged: Project = { ...existing, ...updates, slug: existing.slug };

    const { rows } = await sql`
      UPDATE projects SET
        title = ${merged.title},
        subtitle = ${merged.subtitle ?? ""},
        location = ${merged.location},
        location_label = ${merged.locationLabel ?? ""},
        status = ${merged.status ?? "ongoing"},
        type = ${merged.type ?? ""},
        area = ${merged.area ?? ""},
        year = ${merged.year ?? ""},
        thumbnail = ${merged.thumbnail ?? ""},
        gallery = ${JSON.stringify(merged.gallery ?? [])}::jsonb,
        floor_plans = ${JSON.stringify(merged.floorPlans ?? [])}::jsonb,
        tour_embed_url = ${merged.tourEmbedUrl ?? null},
        description = ${merged.description ?? ""},
        highlights = ${JSON.stringify(merged.highlights ?? [])}::jsonb,
        amenities = ${JSON.stringify(merged.amenities ?? [])}::jsonb,
        specs = ${JSON.stringify(merged.specs ?? {})}::jsonb,
        timeline = ${JSON.stringify(merged.timeline ?? [])}::jsonb,
        virtual_tour_videos = ${JSON.stringify(merged.virtualTourVideos ?? [])}::jsonb,
        updated_at = NOW()
      WHERE slug = ${slug}
      RETURNING *;
    `;
    return rows[0] ? rowToProject(rows[0]) : null;
  } catch (error) {
    console.error("[projects-db] updateProject error:", error);
    return null;
  }
}

export async function deleteProject(slug: string): Promise<boolean> {
  if (!hasDatabase()) return false;
  try {
    await ensureSchema();
    const result = await sql`DELETE FROM projects WHERE slug = ${slug};`;
    return (result.rowCount ?? 0) > 0;
  } catch (error) {
    console.error("[projects-db] deleteProject error:", error);
    return false;
  }
}

export async function filterProjects(
  status: ProjectStatus | "all",
  location: ProjectLocation | "all"
): Promise<Project[]> {
  const projects = await getProjects();
  return projects.filter((p) => {
    const matchStatus = status === "all" || p.status === status;
    const matchLocation = location === "all" || p.location === location;
    return matchStatus && matchLocation;
  });
}

export async function getRelatedProjects(
  currentSlug: string,
  limit: number = 3
): Promise<Project[]> {
  const projects = await getProjects();
  const current = projects.find((p) => p.slug === currentSlug);
  if (!current) return projects.slice(0, limit);

  const sameLocation = projects.filter(
    (p) => p.slug !== currentSlug && p.location === current.location
  );
  const others = projects.filter(
    (p) => p.slug !== currentSlug && p.location !== current.location
  );

  return [...sameLocation, ...others].slice(0, limit);
}
