# Nauhomes — Projects + Timeline Module (Reference Code)

Snapshot of the **projects feature** from [nauhomes.com](https://nauhomes.com)
for porting to **zuildup.com**.

This bundle contains everything needed to reproduce:

- A Postgres-backed `projects` table (slug + title + gallery + specs + **timeline** + floor plans + virtual tour videos)
- Public REST API (`GET /api/projects`, `GET /api/projects/:slug`, `POST/PUT/DELETE` admin-only)
- An admin dashboard (Next.js client component) that lets non-technical users add/edit projects, drag-drop images, and edit per-phase **construction timeline** entries with photos
- Public-facing pages: project listing, project detail with timeline UI

## Stack
- **Next.js 15 (App Router)** + TypeScript
- **Vercel Postgres** (`@vercel/postgres` — tagged-template SQL, serverless-friendly)
- **Vercel Blob** (`@vercel/blob`) for image upload (small files via `/api/upload`, large files via direct client-uploads `/api/blob-upload`)
- **Tailwind** + **Framer Motion** for UI
- HTTP-only cookie auth for `/admin` (see `middleware.ts` + `api/admin/login`)

## Deployment target
Designed for **Vercel** (uses `@vercel/postgres` tagged-template SQL + `@vercel/blob`). For ZuildUp:
- If staying on Vercel → drop in as-is, set env vars below.
- If on a different host → swap `@vercel/postgres` for `pg` / `postgres.js`, and `@vercel/blob` for S3/R2/Supabase Storage. The DB schema and API contract are platform-neutral.

## Environment variables required
```
POSTGRES_URL=postgres://...                    # Vercel Postgres (or any Postgres)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_...       # Vercel Blob
ADMIN_PASSWORD=...                             # for /admin login
ADMIN_SESSION_SECRET=...                       # signs the admin cookie
```

---

## Folder map

```
lib/projects-db.ts              ← schema bootstrap + CRUD (single source of truth)
types.ts                         ← Project + TimelineEntry interfaces

api/projects/route.ts            ← GET (public list) / POST (admin create)
api/projects-slug/route.ts       ← GET (public) / PUT / DELETE (admin)
api/admin/login/route.ts         ← password → HTTP-only cookie
api/admin/logout/route.ts
api/upload/route.ts              ← small image upload (<4 MB) → Vercel Blob
api/upload-large/route.ts        ← server-issued client-upload token
api/blob-upload/route.ts         ← Vercel Blob direct client-upload handler
api/media/route.ts               ← list/manage uploaded blobs
api/media/[id]/route.ts          ← delete a blob

middleware.ts                    ← guards /admin/* and admin API routes via cookie

admin/page.tsx                   ← thin server wrapper
admin/AdminDashboard.tsx         ← THE admin UI (~1.7k LOC). Tabs: Projects, Settings, Leads, Media, Testimonials. The Projects tab has the timeline editor.

page-projects/page.tsx           ← /projects list page (server component)
page-project-slug/page.tsx       ← /projects/[slug] detail page (server component)
components/ProjectsPageClient.tsx     ← interactive grid + filters
components/ProjectDetailClient.tsx    ← gallery + timeline + specs UI
components/FeaturedProjects.tsx       ← homepage carousel
components/ProcessTimeline.tsx        ← homepage "our 6-step process" timeline (separate from per-project timeline)
```

---

## Database schema

Auto-bootstraps on first DB call (`ensureSchema()` in `lib/projects-db.ts`). One migration (virtual_tour_videos) is applied idempotently:

```sql
CREATE TABLE IF NOT EXISTS projects (
  slug              TEXT PRIMARY KEY,
  title             TEXT NOT NULL,
  subtitle          TEXT DEFAULT '',
  location          TEXT NOT NULL,           -- 'delhi' | 'bali' (enum-ish)
  location_label    TEXT DEFAULT '',         -- e.g. "Greater Kailash, New Delhi"
  status            TEXT DEFAULT 'ongoing',  -- 'ongoing' | 'completed'
  type              TEXT DEFAULT '',         -- "Independent Villa", etc.
  area              TEXT DEFAULT '',         -- "8,500 sq ft"
  year              TEXT DEFAULT '',         -- "2024"
  thumbnail         TEXT DEFAULT '',         -- main card image URL
  gallery           JSONB DEFAULT '[]',      -- [{src, alt}, ...]
  floor_plans       JSONB DEFAULT '[]',      -- [{src, alt}, ...]
  tour_embed_url    TEXT,                    -- Matterport / 3D tour
  description       TEXT DEFAULT '',
  highlights        JSONB DEFAULT '[]',      -- string[]
  amenities         JSONB DEFAULT '[]',      -- string[]
  specs             JSONB DEFAULT '{}',      -- {bedrooms: "5", builtUp: "8500 sqft", ...}
  timeline          JSONB DEFAULT '[]',      -- TimelineEntry[]  ← KEY FEATURE
  virtual_tour_videos JSONB DEFAULT '[]',    -- [{src, alt}, ...]  added later
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX projects_location_idx ON projects(location);
CREATE INDEX projects_status_idx   ON projects(status);
```

### `TimelineEntry` shape (stored in `projects.timeline` as JSONB)

```ts
interface TimelineEntry {
  date: string;          // free-form: "Mar 2024", "Phase 3 — Apr 2024"
  title: string;         // "Foundation laid", "Roof slab cast"
  description: string;
  images: ProjectImage[]; // [{src: blobUrl, alt: ...}]
  videos?: ProjectImage[];
}
```

Storing the whole timeline array in JSONB keeps the schema simple and the
admin UI dead easy — entire timeline is replaced on save. If a project
ever needs to fan out to thousands of phase entries, split into a
`project_timeline` child table. We never hit that limit.

---

## Admin UI flow (the part you'll demo to your dev team)

1. Admin logs in at `/admin/login` (`api/admin/login` → sets HTTP-only cookie). `middleware.ts` rejects non-cookie requests to `/admin/*` and admin API routes.
2. `/admin` renders `AdminDashboard.tsx`. It has a Projects tab with:
   - List of all projects (DELETE inline)
   - "Add Project" / "Edit" form with sections:
     - Basic info (title, slug, location, type, area, year, status)
     - Description, highlights, amenities, specs (key-value pairs)
     - Thumbnail picker + gallery (multi-image drag-drop)
     - Floor plans (multi-image)
     - Virtual tour videos / Matterport URL
     - **Timeline editor** — add row → date / title / description / drag-drop photos per phase
3. Save → `PUT /api/projects/:slug` (or `POST /api/projects` for new) with the full Project JSON. `lib/projects-db.ts` does `INSERT...` or `UPDATE...` and merges JSONB arrays.
4. Public pages (`/projects`, `/projects/[slug]`) are **server components** that call `getProjects()` / `getProjectBySlug()` directly. Next.js handles caching; revalidate on edit if you need it instant.

### Image upload paths
- **Under 4 MB** → `POST /api/upload` (multipart, server forwards to `@vercel/blob.put()`).
- **Over 4 MB** → client requests a signed token from `POST /api/upload-large`, then uploads direct to Vercel Blob (`@vercel/blob/client.upload()`), bypassing the 4.5 MB Vercel function body cap. **Critical** — the IRAAJ Three Rules taught us this the hard way (see `MEMORY.md` from Apr 25). For ZuildUp, replicate this pattern or use S3 pre-signed URLs.

---

## Porting to ZuildUp — recommended path

1. **DB**: Spin up Vercel Postgres (or reuse the existing ZuildUp Supabase if Postgres is already there). Run the schema above (it auto-bootstraps via `ensureSchema()` — first request creates the table).
2. **Adapter swap**: ZuildUp Sales OS uses Supabase. To match, replace `import { sql } from "@vercel/postgres"` with `pg` or `postgres.js` against the Supabase pooler. The CRUD functions stay identical.
3. **Auth**: ZuildUp already has user auth (Supabase). Replace `middleware.ts` cookie check with a Supabase `getUser()` + role check (`role IN ('admin','superadmin')`).
4. **UI**: `AdminDashboard.tsx` is monolithic but self-contained. Drop it into the ZuildUp admin shell, swap the API base URL, and you're done. Tailwind classes will work as long as ZuildUp also uses Tailwind.
5. **Storage**: If ZuildUp isn't on Vercel Blob, swap to S3/R2/Supabase Storage in `api/upload/*`. Keep the two-tier (small server-side / large client-direct) split or every video upload >4 MB will 413.

---

## Known gotchas (battle-tested)

- **Vercel function body cap is 4.5 MB.** Any image >4 MB MUST go through `/api/upload-large` → `@vercel/blob/client`. Don't pipe through your own API route.
- **Admin commits must be authored as the Vercel-trusted email.** Vercel "Blocked" deploys silently if commit author isn't on the project's trusted-author list.
- **Settings/leads/projects all use the same in-memory-vs-Postgres pattern** — when porting, make sure `POSTGRES_URL` is set in production. The fallback path serves stale defaults silently.
- **`force-dynamic` on routes that read DB.** `/contact`, `/api/settings`, `/api/leads` all set `export const dynamic = "force-dynamic"` to avoid Next.js caching stale results. Apply same to your `/projects/[slug]` if you want edits to appear instantly.
- **JSONB merging on UPDATE.** `updateProject()` does `merged = { ...existing, ...partial }` in JS, then writes the full record. This prevents partial updates from clobbering nested arrays.

---

## Files in this snapshot
Generated 2026-05-04 from `nauhomes` repo at commit `725ee70`.

Original repo (private): https://github.com/varunmahna-creator/nauhomes

For questions, ping Varun or check `MEMORY.md` for related context.
