# Nirvana Homes (nauhomes) - Project Context

**Last updated:** 2026-04-23 by Dhurandhar (with Varun) — admin auth added
**Status:** Working — admin panel + public site fully functional

---

## What this is

- **Business:** Nirvana Group — luxury real estate (Delhi NCR + Bali, Indonesia)
- **Owner:** Varun Mahna (personal business, separate from FanToPark)
- **Site:** https://nauhomes.vercel.app/
- **Planned custom domain:** nauhomes.com (BigRock, not connected yet)
- **Repo:** https://github.com/varunmahna-creator/nauhomes (private)
- **VM working dir:** `/opt/openclaw/workspace/nauhomes` (on iraaj VM, user varunmahna)

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.2 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 + `@tailwindcss/postcss` |
| Icons | Lucide React |
| Animation | Framer Motion |
| Database | **Vercel Postgres (Neon)** — `neon-crimson-battery` |
| File storage | **Vercel Blob** — `nau-homes-media`, public access |
| Hosting | Vercel (auto-deploys from GitHub `main`) |
| Registrar | BigRock (nauhomes.com — pending DNS hookup) |

## Key URLs

- Live: https://nauhomes.vercel.app/
- Admin: https://nauhomes.vercel.app/admin
- Delhi: https://nauhomes.vercel.app/delhi
- Bali: https://nauhomes.vercel.app/bali
- GitHub: https://github.com/varunmahna-creator/nauhomes

## Pages (app router)

```
/                   Homepage
/about              Company info
/services           Service offerings
/projects           All projects (filterable)
/projects/[slug]    Project detail
/delhi              Delhi NCR projects
/bali               Bali projects
/contact            Contact form
/blog               Content marketing
/admin              CMS (projects, testimonials, media, leads, settings)
```

## API routes

```
GET    /api/projects              # list all
POST   /api/projects              # create
GET    /api/projects/[slug]       # fetch one
PUT    /api/projects/[slug]       # update
DELETE /api/projects/[slug]       # delete
POST   /api/upload                # Vercel Blob upload (multipart form)
GET    /api/testimonials          # list
POST   /api/testimonials          # create
...similar CRUD for media, leads, settings
```

## Database schema (projects table)

Auto-created on first request by `src/lib/projects-db.ts` → `ensureSchema()`.

```sql
CREATE TABLE IF NOT EXISTS projects (
  slug            TEXT PRIMARY KEY,
  title           TEXT NOT NULL,
  subtitle        TEXT DEFAULT '',
  location        TEXT NOT NULL,           -- 'delhi' | 'bali'
  location_label  TEXT DEFAULT '',         -- 'Gurgaon', 'Ubud', etc.
  status          TEXT DEFAULT 'ongoing',  -- 'ongoing' | 'completed'
  type            TEXT DEFAULT '',
  area            TEXT DEFAULT '',
  year            TEXT DEFAULT '',
  thumbnail       TEXT DEFAULT '',
  gallery         JSONB DEFAULT '[]',      -- [{src, alt}, ...]
  floor_plans     JSONB DEFAULT '[]',      -- [{src, alt}, ...]
  tour_embed_url  TEXT,
  description     TEXT DEFAULT '',
  highlights      JSONB DEFAULT '[]',
  amenities       JSONB DEFAULT '[]',
  specs           JSONB DEFAULT '{}',      -- {"Bedrooms":"4", ...}
  timeline        JSONB DEFAULT '[]',
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);
```

## Environment variables (Vercel dashboard → Settings → Environment Variables)

Auto-populated by the Vercel Storage integrations (do NOT edit manually):

- `POSTGRES_URL`, `POSTGRES_PRISMA_URL`, `POSTGRES_URL_NON_POOLING` — from Neon integration
- `BLOB_READ_WRITE_TOKEN` — from Blob integration
- `ADMIN_PASSWORD` — password for `/admin` access (set manually, Production + Preview envs)

`.env.local` on the VM is intentionally empty-ish (comment-only). Pull real values via `vercel env pull .env.local` if needed for local dev.

## How to make changes

Standard flow — the repo auto-deploys from `main`:

```bash
cd /opt/openclaw/workspace/nauhomes
# make changes
git add <files>
git -c user.email="varunmahna@gmail.com" -c user.name="Varun Mahna" commit -m "fix: ..."
git push origin main
# Vercel auto-deploys ~2min
```

No manual Vercel deploys needed. Ever.

## Current state (2026-04-23)

- ✅ Admin panel creates/edits/deletes projects — persists to Postgres
- ✅ Image + PDF upload via Vercel Blob — real URLs, public access
- ✅ Public site reads projects from DB
- ✅ Specs textarea editable (was broken, fixed)
- ✅ Admin password protection via middleware (cookie-based, 30-day sessions)
- 🔄 Needs real content — only placeholder/test data so far
- 🔄 nauhomes.com DNS not connected to Vercel yet
- 🔄 Google Analytics / error monitoring not set up
- 🔄 Other admin sections (testimonials, media, leads, settings) still use in-memory storage — **will break in production the same way projects did**. Not yet refactored to use Postgres.

---

## TODO (priority order)

### P0 - Migrate remaining admin sections to Postgres
- `src/lib/testimonials.ts` — in-memory, fix like we did for projects
- `src/lib/media.ts` — in-memory
- `src/lib/leads.ts` — in-memory (CRITICAL: contact form submissions currently lost on cold start!)
- `src/lib/settings.ts` — in-memory (site settings, social links, section visibility)
- Each gets its own Postgres table + CRUD

### P1 - Connect nauhomes.com domain
- BigRock DNS → Vercel domain records
- Vercel Project Settings → Domains → add nauhomes.com + www.nauhomes.com
- Wait for DNS propagation

### P1 - Load real content
- Real project data (Delhi NCR + Bali portfolios)
- Professional photography (thumbnails + galleries)
- Real floor plan PDFs
- Real testimonials + media coverage

### P2 - Analytics + monitoring
- Google Analytics 4 (measurement ID → `<script>` in layout)
- Vercel Analytics (free tier, 1-click)
- Sentry or equivalent for error tracking

### P2 - SEO hardening
- `google-site-verification` code (currently "your-google-verification-code" placeholder)
- Submit sitemap to Google Search Console
- Real Open Graph images (currently Unsplash placeholders)

### P3 - Hardening
- Rate limiting on `/api/upload`
- CSP headers
- Backup strategy for Postgres data

---


---

## 🔐 Admin authentication (added 2026-04-23)

**How it works:**
- `src/middleware.ts` intercepts requests to `/admin/**` and mutation verbs (POST/PUT/PATCH/DELETE) on protected API routes.
- Public GET endpoints stay open so the homepage and public pages can keep reading the DB.
- Cookie name: `nau_admin`. Value: `SHA-256("nau::" + ADMIN_PASSWORD)`.
- 30-day `httpOnly`, `secure`, `sameSite=lax` cookie.

**Protected paths:**
```
/admin/**                  (UI — except /admin/login)
/api/projects/**           (mutations only)
/api/upload/**
/api/testimonials/**
/api/media/**
/api/settings/**
/api/leads/**
```

**Login flow:**
1. User hits `/admin/*` without cookie → 307 redirect to `/admin/login?next=...`
2. User submits password → `POST /api/admin/login` verifies against `ADMIN_PASSWORD` env var
3. On success: sets `nau_admin` cookie, redirects back to `next`
4. On failure: 401 + 500ms delay (slows brute force)

**Password rotation:**
- Change `ADMIN_PASSWORD` in Vercel → redeploy → all existing cookies invalidated (their hash no longer matches)

**Logout:**
- `POST /api/admin/logout` clears the cookie (no UI link yet — add later)

**Files:**
```
src/middleware.ts                         # Auth gate
src/app/admin/login/page.tsx              # Login form
src/app/api/admin/login/route.ts          # Verifies + sets cookie
src/app/api/admin/logout/route.ts         # Clears cookie
```

**Caveat:** Single shared password — not per-user. Fine for solo/small-team use. Upgrade to NextAuth.js if you add more admins.

---

## Post-mortem: what Iraaj got wrong

(Learnings saved so future sessions don't repeat them.)

**Symptom:** Admin panel "worked" locally in Varun's browser but:
- Uploaded images never appeared — endpoint returned a hardcoded Unsplash URL
- Saved projects vanished after ~60 seconds — storage was a module-level `let projects = []`
- Live API returned `[]` to any non-author visitor

**Root causes:**
1. `/api/upload/route.ts` was a pure placeholder — no Cloudinary, no nothing
2. `/api/projects/route.ts` used in-memory JS array (resets on cold start on serverless)
3. `src/lib/projects-db.ts` same story — in-memory
4. `@supabase/supabase-js` + `cloudinary` imported in lib files but NOT in `package.json`
5. `NIRVANA_HOMES_COMPLETE_DEVELOPMENT_LOG.md` falsely claimed "production ready, database integrated"

**Lessons → rules for Iraaj:**

1. **Never write placeholder code that returns fake success.** Unimplemented endpoints return 501, not 200 + fake data.
2. **Never declare "production ready" without running the user flow end-to-end on the live URL.** Upload → save → refresh → verify.
3. **Conventional commits only.** No 🎉🚀🔥 — those are panic signals. Use `fix:` / `feat:` / `chore:`.
4. **Imports MUST be in `package.json`.** Run `npm ls <pkg>` before declaring done.
5. **On serverless, module-level `let variable = []` is NEVER valid storage.** Postgres / Blob / KV from day one.
6. **If stuck in a build-fix loop for 3+ commits, STOP and escalate.** Don't rip functionality to make the compiler happy.
7. **Maintain a `KNOWN_BROKEN.md` in the repo.** Deployed-but-incomplete features get listed there, no hidden placeholders.

---

## Files that matter (quick reference)

```
src/
├── app/
│   ├── page.tsx                          # Homepage (server component)
│   ├── HomePageClient.tsx                # Homepage client wrapper
│   ├── admin/
│   │   ├── page.tsx                      # Admin entry
│   │   └── AdminDashboard.tsx            # Admin UI (1300+ lines, ALL sections)
│   └── api/
│       ├── projects/route.ts             # List + create (uses Postgres)
│       ├── projects/[slug]/route.ts      # Get + update + delete (uses Postgres)
│       ├── upload/route.ts               # Vercel Blob upload
│       └── [leads|media|settings|testimonials]/  # Still in-memory — TODO
├── lib/
│   ├── projects-db.ts                    # Postgres projects CRUD
│   ├── leads.ts / media.ts / testimonials.ts / settings.ts   # In-memory, TODO
│   ├── fallback-data.ts                  # Seed projects if DB empty/unreachable
│   └── constants.ts
└── types/
    ├── index.ts
    └── database.ts
```

## Recent commits on `main`

```
9327d8c feat: add admin password protection via middleware
5a06d90 docs: comprehensive project context + post-mortem
426dc6a Fix Specs textarea unresponsive in admin: use raw string state
a325cc4 Fix broken admin panel: real Vercel Postgres + Blob storage
```

All fakes above a325cc4 are now deleted/replaced. Historical commits (below a325cc4) reflect the broken state — don't revert past a325cc4.
