# Nirvana Homes — Project Context Snapshot

**Date:** 2026-04-27
**Author:** Claude (main session)
**Purpose:** Single source of truth for the domain switchover + SEO Phase 1 & 2 work. If a future session needs to pick up this project, READ THIS FIRST.

---

## TL;DR — Current State

- ✅ **Domain switched** from `nauhomes.vercel.app` → `https://www.nauhomes.com` (live, SSL, all pages 200)
- ✅ **SEO Phase 1 (technical audit)** done, 12 critical fixes auto-applied & deployed
- ✅ **SEO Phase 2 (keyword strategy + 90-day content plan)** done, full strategy doc committed
- ⏳ **SEO Phase 3 (off-page: GBP, citations, schema expansion)** queued, not started
- 🔴 **5 manual TODOs blocking Phase 1 from being 100% done** — see "Pending User Actions" section

---

## 1. Site Overview

| Item | Value |
|---|---|
| **Live URL** | https://www.nauhomes.com (apex 308→www) |
| **Backup URL** | https://nauhomes.vercel.app (still works) |
| **Stack** | Next.js 16, TypeScript, Tailwind 4, Framer Motion |
| **Deployment** | Vercel (auto-deploys from `main` branch) |
| **Repo** | https://github.com/varunmahna-creator/nauhomes |
| **Local path** | `/opt/openclaw/workspace/nauhomes/` |
| **Database** | Supabase (Asia Southeast, project ref `eqrgmyrnrdnnqphncsde`) |
| **Image storage** | Cloudinary (cloud name: `nauhomes`) + Vercel Blob (videos) |
| **Email** | Titan (MX records intact, DKIM + SPF set) |
| **Markets** | Delhi NCR (residential luxury) + Bali (villas) |
| **Domain registrar** | BigRock (account: Karan Gandhi, registrant: Varun Puri) |

---

## 2. Domain Switchover — Done 2026-04-27 (~10:00–11:15 UTC)

### What we did
1. Added domain `nauhomes.com` and `www.nauhomes.com` to Vercel project `nauhomes` (Settings → Domains → Add Existing).
2. At BigRock DNS Management:
   - Confirmed nameservers were already `dns1.bigrock.in` / `dns2.bigrock.in`.
   - Added two records:
     - **A** record: `@` → `216.150.1.1` (Vercel)
     - **CNAME** record: `www` → `a0bbb325e83acab2.vercel-dns-017.com.` (Vercel)
3. Did NOT touch:
   - MX records (Titan email — keeps email working)
   - TXT records (DKIM + SPF — keeps email deliverability)
   - SOA record
   - Stale `122148453.dns.nauhomes.com  A  IN  209.99.17.56` (orphan, harmless)
   - Stale `ns1.dns-parking.com` / `ns2.dns-parking.com` NS records inside the zone (harmless, ignored at registry level)

### DNS propagation
- Saved at BigRock: ~10:55 UTC
- Fully propagated + Vercel SSL active: ~11:15 UTC (under 25 min)
- Verified by auto-cron polling Google DNS API every 15 min, then disabled.

### Code state after switchover
- All metadata in `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`, and per-page metadata was already pre-configured for `nauhomes.com` (done earlier on 2026-04-20). Zero code changes needed for the domain switch itself.

---

## 3. SEO Phase 1 — Technical Audit & Quick Wins

**File:** `SEO_AUDIT_PHASE1.md` (committed `a15b6f5`)
**Scope:** Crawl, meta tags, sitemap/robots, structured data, performance, mobile, image optimization, technical hygiene, internal linking, third-party validation, competitor benchmark.
**Grade assigned:** **B−** (expected to climb to A− once manual TODOs are done)

### Critical bugs found & fixed (all in `a15b6f5`, deployed)

1. **Canonical URLs were broken on every inner page.** `/about`, `/contact`, `/delhi`, `/bali`, `/projects`, `/services`, `/blog` all canonicalised to the homepage. Google would have treated them as duplicates and dropped them. **This was the single biggest bug.** Fixed.
2. **Homepage canonical pointed to apex** (`https://nauhomes.com`) which 308-redirects to `https://www.nauhomes.com`. Fixed.
3. **Placeholder Google Analytics ID** (`GA_TRACKING_ID`) shipped in production HTML. Now gated behind `NEXT_PUBLIC_GA_MEASUREMENT_ID` env var.
4. **Placeholder Google Search Console verification token.** Now gated behind `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` env var.
5. **`maximum-scale=1` in viewport** — a11y regression + INP signal. Removed.
6. **Sitemap missing 8 project pages.** Now pulls live projects from DB (graceful fallback to static set if DB unreachable). Sitemap now has 16 URLs (was 8).
7. **`robots.txt` blocking `/_next/`** — Googlebot needs this to render. Unblocked. Also unblocked `/.well-known/`.
8. **H3 without parent H2** on `/delhi` and `/bali` — heading hierarchy break. Promoted feature heads to H2.
9. **`font-semibent` typo** on `/delhi` and `/bali`. Fixed.
10. **Added schemas:** `WebSite` (sitelinks search box) + `RealEstateAgent` (more specific than generic LocalBusiness).
11. **Added per-project metadata** on `/projects/[slug]`: canonical, OG with thumbnail, Twitter card, robots-noindex on 404s.
12. **Added `hreflang`** between `/delhi` (en-IN) and `/bali` (en-ID).

### What's strong (from the audit)
- Server-rendered HTML
- HTTPS, HSTS (2 yr), brotli, HTTP/2, apex 308→www
- WebP image delivery via `next/image`
- Schema breadth above competitor average

### What's still weak (not auto-fixable, see TODOs section)
- Homepage TTFB cold-start ~3s on first hit
- Six Unsplash hot-linked images on homepage bypass `next/image`
- Project thumbnails from Vercel Blob served as raw `<img>`
- `/blog` index is "coming soon" but homepage links to specific blog posts → soft-404 risk
- Footer Privacy / Terms pages are `href="#"` placeholders
- WhatsApp number is placeholder `+919876543210`
- Social handles (`@nirvanahomes` everywhere) appear to be placeholders
- `/og-image.jpg` referenced in metadata — needs actual image at `public/og-image.jpg`
- `force-dynamic` in root layout disables ISR site-wide (optimization candidate)

---

## 4. SEO Phase 2 — Keyword Strategy & 90-Day Content Plan

**File:** `SEO_PHASE2_KEYWORDS.md` (committed `730499c`, 686 lines, 54 KB)

### What's in there
1. **Keyword universe (78 keywords)** across buckets: Delhi locality+type, Bali locality+type, brand + transactional, long-tail informational. Each tagged with intent, difficulty, P0/P1/P2 priority, target page, TOF/MOF/BOF funnel stage.
2. **Per-page keyword mapping** for all 8 static + 8 live project pages, with title/H1/meta rewrites.
3. **18 new pages identified** to create — locality landing pages and pillar guides. **`/buyers-guide-bali` flagged as the single highest-revenue SEO asset on the site** (near-zero competition for Indian-buyer-buying-Bali-villa niche, $300k–$2M ticket sizes).
4. **12-week content calendar** producing 24 pieces (2 blog posts/week + locality pages + monthly pillar).
5. **Local SEO action items:** Full GBP copy drafts for Delhi + Bali, 15-directory citation list, NAP audit (flagged `+91-9876543210` placeholder still in `src/lib/constants.ts`, generic Delhi-centroid geo coords in LocalBusiness schema).
6. **Competitor angle table** — 10 keywords competitors rank for that we should target.
7. **Top-5 quick-wins** for next 14 days.

---

## 5. Pending User Actions (manual TODOs to fully close Phase 1)

In rough priority order, all should take ~30 min total:

| # | Task | Where | Output needed | Time |
|---|---|---|---|---|
| 1 | Create **Google Search Console** property for `https://www.nauhomes.com` | https://search.google.com/search-console | Verification token → I'll set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` on Vercel | 5 min |
| 2 | Create **GA4** property | https://analytics.google.com | Measurement ID (e.g. `G-XXXXXX`) → I'll set `NEXT_PUBLIC_GA_MEASUREMENT_ID` on Vercel | 5 min |
| 3 | Create **Bing Webmaster** property | https://www.bing.com/webmasters | Verification token → I'll set `NEXT_PUBLIC_BING_VERIFICATION` on Vercel | 3 min |
| 4 | Real **WhatsApp business number** | Admin panel → Settings | Just type it in admin (replaces `+919876543210` placeholder everywhere) | instant |
| 5 | Confirm or remove placeholder **social handles** | — | Are `@nirvanahomes` accounts real on FB/Insta/LinkedIn/Twitter/YouTube? If not, give me real handles or I remove the `sameAs` schema entries | 5 min |

### Other manual TODOs (not blocking)
- Replace `/og-image.jpg` placeholder with real branded 1200×630 image
- Trim homepage meta description from 282 chars → ~155 chars
- Verify `/blog/luxury-villa-trends-2025` and other blog post URLs actually render (or remove the homepage links to prevent soft-404s)
- Replace footer `href="#"` placeholders for Privacy Policy / Terms
- Update Bali office geo coords in LocalBusiness schema
- Run real PageSpeed Insights with API key

---

## 6. Phase 3 — Queued (not started)

When Phase 2 is reviewed and approved, Phase 3 will deliver:

- **Schema markup expansion** — individual property listings, enriched RealEstateAgent areaServed, Bali LocalBusiness with real geo coords
- **Internal linking improvements** — links from new locality pages to project pages, hub-and-spoke
- **Bing Webmaster verification + sitemap submission** (auto, no auth needed for ping)
- **GBP listing creation** for Delhi + Bali offices (Varun must claim/verify)
- **Citation building** — submit Nirvana Homes to the 15 directories from Phase 2
- **Open Graph image generation** — branded 1200×630 per page if `/og-image.jpg` doesn't get supplied
- **robots.txt + sitemap final optimization**
- **Monthly SEO health-check cron** — automated report DM'd to Varun
- **Keyword rank tracker** for top 20 target keywords

---

## 7. Files Created / Touched

### New files (this work session)
- `SEO_AUDIT_PHASE1.md` — full technical audit
- `SEO_PHASE2_KEYWORDS.md` — keyword strategy + 90-day content plan
- `PROJECT_CONTEXT_2026-04-27.md` — this file

### Modified files (Phase 1 fixes, all in commit `a15b6f5`)
- `src/app/layout.tsx` — viewport, env-gated verifications, env-gated GA4, WebSite + RealEstateAgent schemas
- `src/app/page.tsx` — homepage canonical fix, OG URL lock to www
- `src/app/about/page.tsx` — canonical + OG
- `src/app/contact/page.tsx` — canonical + OG
- `src/app/projects/page.tsx` — canonical + OG
- `src/app/services/page.tsx` — canonical + OG
- `src/app/blog/page.tsx` — canonical + OG
- `src/app/delhi/page.tsx` — canonical, hreflang, H2 promotion, typo fix
- `src/app/bali/page.tsx` — same as Delhi
- `src/app/projects/[slug]/page.tsx` — full per-project metadata
- `src/app/sitemap.ts` — pulls live projects from DB
- `src/app/robots.ts` — unblocked `/_next/` and `/.well-known/`

### Commits pushed to `origin/main` (this session)
- `a15b6f5` — feat(seo): Phase 1 audit + quick-win fixes
- `730499c` — SEO Phase 2: keyword strategy + content plan

---

## 8. Key URLs & References

- **Live site:** https://www.nauhomes.com
- **Vercel project:** https://vercel.com/varunmahna-creators-projects/nauhomes
- **GitHub repo:** https://github.com/varunmahna-creator/nauhomes
- **BigRock DNS panel:** https://myorders.bigrock.in/orders/manage/nauhomes.com/domain
- **Vercel A record IP (current):** `216.150.1.1`
- **Vercel CNAME target (current):** `a0bbb325e83acab2.vercel-dns-017.com.`
- **Discord channel:** `#nirvana-homes-website` (id: 1495767731469943005)
- **Discord brief:** `/opt/openclaw/workspace/discord-briefs/nirvana-homes-website.md`

---

## 9. How to Resume This Work in a New Session

If you (future Claude) wake up and need to pick this up:

1. Read this file in full.
2. Read `SEO_AUDIT_PHASE1.md` for the full technical audit findings.
3. Read `SEO_PHASE2_KEYWORDS.md` for the strategy + content plan.
4. Check git log: `cd /opt/openclaw/workspace/nauhomes && git log --oneline -20` — anything after `730499c` is new work since this snapshot.
5. Check **Pending User Actions** above — if any of those tokens have been provided, set them on Vercel via the Vercel CLI / API and ship.
6. If user says "start Phase 3" — spawn a focused subagent with the Phase 3 scope from section 6 above. Do NOT try to do it inline.
7. **Do NOT touch:** admin panel, contact-info system, DB schema, email code, MX/TXT/SPF DNS, video upload system. These are all production-critical and recently shipped.

---

*End of context snapshot. This file is durable — it lives in the repo.*
