# Nauhomes.com SEO Phase 1 Technical Audit

**Date:** 2026-04-27
**Auditor:** Claude (automated, subagent run)
**Scope:** Live site at https://www.nauhomes.com (production, Next.js 16 on Vercel)

---

## Executive Summary

**Overall grade: B–**
The technical foundation is solid (HTTPS, HSTS, brotli, HTTP/2, valid sitemap & robots, server-rendered HTML, organisation/local-business schema, Next/Image pipeline available), but several quick-win SEO bugs are leaking link equity and mis-indexing pages. The most damaging issues — duplicate canonicals pointing every inner page back at the homepage, a placeholder Google Analytics ID shipped in production, and the homepage canonical pointing at the apex (which 308-redirects to www) — are exactly the kind of own-goals that strangle rankings before content/links can move the needle.

### Top 3 wins (already strong)
1. **Server-rendered HTML.** Every route returns full HTML with metadata in the initial response (200, 60–210 KB, 0.1–3 s TTFB). Crawlers don't need JS execution.
2. **Strong technical hygiene.** HTTPS everywhere, HSTS (2 yrs), brotli compression, HTTP/2, apex 308→www, valid robots.txt, valid XML sitemap (all 8 static URLs return 200), Next.js Image with WebP responses (138 KB for a 3840w hero).
3. **Schema breadth.** Organization, LocalBusiness (Delhi w/ geo), WebPageElement, FAQPage and (on inner pages) BreadcrumbList — better than most competitors at this stage.

### Top 5 critical fixes needed
1. **Canonical URLs are wrong on every inner page** (`/about`, `/contact`, `/delhi`, `/bali`, `/projects`, `/services`, `/blog`) — they all canonicalise to `https://www.nauhomes.com`. Google will treat them as duplicates of the homepage and drop them. **FIXED — see Quick Wins.**
2. **Homepage canonical points to the apex** (`https://nauhomes.com`) which 308-redirects to `https://www.nauhomes.com`. Self-referencing canonicals must match the indexed URL. **FIXED.**
3. **Placeholder Google Analytics ID** (`GA_TRACKING_ID`) shipped in production HTML — pollutes console, fires bad requests to Google's gtag endpoint, and signals "unfinished site". **FIXED — gated behind `NEXT_PUBLIC_GA_MEASUREMENT_ID`.**
4. **Placeholder Google Search Console verification meta** (`your-google-verification-code`). Until this is replaced with a real token, GSC is useless for indexing/coverage reports. **FIXED — gated behind env var; Varun TODO to provide the token.**
5. **`maximum-scale=1` in viewport** — accessibility regression that can also affect Core Web Vitals' INP signal on mobile. **FIXED.**

### Estimated effort to address all remaining issues
- **Auto-applied (this PR):** ~2 hours of work, zero account access required.
- **Manual TODOs (need Varun):** ~1.5 hours (verify GSC, set up GA4, replace placeholder phone/social handles, swap Unsplash hero for real photography, add real `/og-image.jpg`).
- **Phase 2 (content/keyword):** out of scope here.

---

## Detailed Findings

### 1. Crawl & route inventory — PASS

| Path | Status | Type | Time | Size |
|---|---|---|---|---|
| `/` | 200 | text/html | 3.04 s* | 212 KB |
| `/about` | 200 | text/html | 0.61 s | 70 KB |
| `/contact` | 200 | text/html | 0.58 s | 62 KB |
| `/delhi` | 200 | text/html | 1.35 s | 100 KB |
| `/bali` | 200 | text/html | 0.95 s | 77 KB |
| `/projects` | 200 | text/html | 0.75 s | 132 KB |
| `/services` | 200 | text/html | 0.77 s | 117 KB |
| `/blog` | 200 | text/html | 0.59 s | 56 KB |
| `/sitemap.xml` | 200 | application/xml | 0.12 s | 1.4 KB |
| `/robots.txt` | 200 | text/plain | 0.06 s | 0.3 KB |
| `/manifest.webmanifest` | 200 | application/manifest+json | 0.31 s | 0.6 KB |

\*Homepage TTFB of 3 s is a one-shot cold-start (Vercel `x-vercel-cache: MISS`). Subsequent fetches of the same routes are sub-second. **WARN:** confirm warmth/cache-hit ratio in production.

No 4xx/5xx encountered on any in-app route. All sitemap URLs return 200.

### 2. Meta tags & on-page SEO

| Page | `<title>` (len) | meta desc (len) | canonical | og:* | twitter | h1 cnt | h2 cnt | h3 cnt | imgs / missing-alt |
|---|---|---|---|---|---|---|---|---|---|
| `/` | 64 ✅ | 282 ⚠️long | **`nauhomes.com` (apex) — WRONG** | full | full | 1 ✅ | 10 ✅ | 36 | 14 / 0 |
| `/about` | 30 ✅ | 91 ⚠️short | **points to homepage — WRONG** | inherited | inherited | 1 ✅ | 4 ✅ | 7 | 2 / 0 |
| `/contact` | 32 ✅ | 113 ✅ | **points to homepage — WRONG** | inherited | inherited | 1 ✅ | 2 | 4 | 0 / — |
| `/delhi` | 76 ⚠️long | 159 ✅ | **points to homepage — WRONG** | partial | inherited | 1 ✅ | **0 ❌** | 9 | 5 / 0 |
| `/bali` | 67 ⚠️long | 144 ✅ | **points to homepage — WRONG** | partial | inherited | 1 ✅ | **0 ❌** | 7 | 3 / 0 |
| `/projects` | 23 ✅ | 88 ⚠️short | **points to homepage — WRONG** | inherited | inherited | 1 ✅ | 0 ⚠️ | 9 | 8 / 0 |
| `/services` | 22 ✅ | 122 ✅ | **points to homepage — WRONG** | inherited | inherited | 1 ✅ | 4 ✅ | 21 | 0 / — |
| `/blog` | 22 ✅ | 109 ✅ | **points to homepage — WRONG** | inherited | inherited | 1 ✅ | 3 ✅ | 2 | 0 / — |

**FAIL — canonical:** Every inner page declares the homepage as canonical. Fixed in the layout.tsx + per-page Metadata patches.

**FAIL — heading hierarchy on /delhi & /bali:** The "market info" sections used H3 with no parent H2, leaving an `H1 → H3` jump. Crawlers and screen readers expect contiguous depth. Fixed by promoting the three feature cards to H2 and adding a screen-reader-only section heading.

**WARN — Delhi/Bali OG URLs use the apex** (`https://nauhomes.com/delhi`) which 308-redirects to www. Fixed.

**WARN — homepage meta description is 282 chars.** Most SERP descriptions get truncated at ~155–160 chars on mobile. Trim recommended; not auto-applied to avoid changing copy without sign-off. **TODO.**

**WARN — Delhi page typo:** `text-2xl font-semibent` (should be `font-semibold`). Cosmetic but visible. Fixed (also fixed identical typo on Bali page line 56).

**WARN — image alts** are present everywhere we sampled (homepage 14/14, Delhi 5/5, Bali 3/3). One empty `alt=""` on the homepage is acceptable for decorative testimonial avatars.

### 3. Sitemap & robots — PASS, with gaps

**`robots.txt`** points to the right sitemap and host. Two cleanups applied:
- Removed `Disallow: /_next/` (Googlebot needs `_next/static/*` and `_next/image/*` for rendering & image discovery).
- Removed `Disallow: /.well-known/` (used for verification, security.txt, ACME challenges; should be crawlable).
- Kept `/api/`, `/admin/`, `/private/` blocked.

**`sitemap.xml`** lists all 8 static URLs, each returning 200. **MISSING:** the 6 live project pages (`/projects/p-block-south-ex-part-2`, `/projects/m-block-240-sq-yds-saket`, `/projects/m-block-saket-builder-floor`, `/projects/sushant-lok-phase-1` (linked from /delhi), `/projects/safdarjung-enclave-luxury-builder-floor`, `/projects/berawa-luxury-villa`, `/projects/berawa-luxury-villa-c2`, `/projects/nirvana-villas-c3`) — these are linked from the homepage and Delhi page but absent from the sitemap. Fixed: sitemap.ts now pulls from `getProjects()` and emits all project URLs with proper lastmod/priority. The function is wrapped in try/catch so a DB outage degrades gracefully to the static set.

### 4. Structured data — PASS, with additions

Currently emitted on every page:
1. `Organization` (Nirvana Group, with logo, contactPoint, sameAs, dual addresses)
2. `LocalBusiness` (Delhi, with geo coordinates 28.6139,77.2090)
3. `WebPageElement` / `Hero` (homepage only)
4. `FAQPage` (homepage only)
5. `BreadcrumbList` (inner pages)
6. `Service` schema (services page)

**Issue:** No Bali `LocalBusiness` (only Delhi). Two-country claim isn't reflected in schema.
**Issue:** `WebSite` schema absent — preferred for sitelinks search box and brand SERP carousel.
**Issue:** `RealEstateAgent` is a more specific subtype of LocalBusiness for property businesses; Google handles it better than generic LocalBusiness.

Added:
- `WebSite` schema in root layout.
- `RealEstateAgent` schema (areaServed = Delhi NCR + Bali, knowsAbout = builder floors, kothis, etc.).

**TODO (manual):** Validate via https://search.google.com/test/rich-results?url=https://www.nauhomes.com after the deploy lands.

### 5. Performance — UNKNOWN (PSI quota exhausted)

Google PageSpeed Insights API returned `429 RESOURCE_EXHAUSTED` for the unauthenticated default quota (0/day for project_number 583797351490). Full Core Web Vitals couldn't be sampled this run.

**Static signals look good** based on the HTML inspection:
- Brotli compression on (`content-encoding: br`).
- HTTP/2 multiplexed.
- Preconnect/dns-prefetch for fonts and Unsplash.
- Critical CSS preloaded (`rel=preload as=style`).
- Fonts: Playfair Display + Inter, both with `display: swap` ✅.
- Hero image served via `/_next/image` returning WebP (138 KB at 3840w).

**Concerns from manual inspection:**
- Homepage HTML weighs **212 KB** — large for an above-the-fold response. JSON-LD blocks, inline SVG blur placeholders for every `next/image`, and pre-rendered carousel data inflate it.
- Six Unsplash hot-linked images on the homepage (Delhi/Bali toggles, testimonial avatars) bypass `next/image` and ship straight as JPEG without sizing or WebP conversion.

**TODO (manual):** Run PSI from a workstation with a real API key and re-evaluate; target LCP < 2.5 s, CLS < 0.1, INP < 200 ms on mobile.

### 6. Mobile-friendliness — PASS

- Viewport meta present and correct (after fix).
- Tailwind responsive classes used throughout.
- Tap targets visually checked at `/contact` and `/projects`; CTA buttons are >= 44 px tall.

### 7. Image optimization — WARN

- Hero photo on homepage uses `next/image` ✅ (WebP at q=75, full srcset 640w–3840w).
- **All other homepage images are raw `<img src="https://images.unsplash.com/...">`** — this hot-links Unsplash CDN, ships JPEG (not WebP), and has no `srcset`/sizes. Affects: Delhi promo, Bali promo, testimonial avatars (×4), media-coverage logos.
- Project thumbnails come from Vercel Blob (`x3dbixzadi6qrd08.public.blob.vercel-storage.com/...`) and are served as raw `<img>` with `loading="lazy"` — no `next/image` wrapper. Vercel Blob doesn't auto-WebP.

**TODO (manual):** Wrap project thumbnails and homepage promo images in `next/image` (or the existing `OptimizedImage` component). The thumbnails are user-uploaded so changing the wrapper is safe but requires testing the lightbox/gallery flow.

### 8. Core technical — PASS

- ✅ HTTPS everywhere; no http:// links found in HTML.
- ✅ HSTS: `strict-transport-security: max-age=63072000` (2 years).
- ✅ Compression: `content-encoding: br` (brotli).
- ✅ HTTP/2 (`HTTP/2 200`).
- ✅ Apex `nauhomes.com` 308-redirects to `www.nauhomes.com`.
- ⚠️ HTTP/3 not advertised (not critical).

### 9. Internal linking — PASS

- Header nav exposes `/`, `/projects`, `/delhi`, `/bali`, `/services`, `/about`, `/contact`, `/blog` (Projects has dropdown to Delhi/Bali).
- Footer mirrors header + lists individual services.
- Homepage internal links: 22 unique (incl. project detail pages, blog posts).
- ⚠️ Footer has placeholder `href="#"` for Privacy Policy and Terms of Service. These should either link to real pages or be removed until those pages exist. **TODO.**
- ⚠️ Blog posts are linked from the homepage (e.g. `/blog/luxury-villa-trends-2025`) but the blog index has only "coming soon" copy and no live post pages — **risk of soft-404s** if those URLs aren't actually rendering. **TODO: verify.**

### 10. External validation — FAIL → addressed

- ❌ `<meta name="google-site-verification" content="your-google-verification-code">` — placeholder, GSC will reject. **FIXED:** removed; layout now reads `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` from env. **TODO Varun: create GSC property, copy the token, set the env var on Vercel.**
- ❌ No Bing webmaster verification. **FIXED:** layout now also reads `NEXT_PUBLIC_BING_VERIFICATION` from env. **TODO Varun: claim site at https://www.bing.com/webmasters and set env var.**
- ⚠️ Social profile links in code: `https://facebook.com/nirvanahomes`, `https://instagram.com/nirvanahomes`, `https://linkedin.com/company/nirvanahomes`, `https://twitter.com/nirvanahomes`, `https://youtube.com/@nirvanahomes`. These appear to be placeholders (handle is too clean to be coincidental, and the `sameAs` schema mirrors them). **TODO Varun: confirm these accounts exist and are owned by the business; otherwise remove or replace.**
- ⚠️ `https://wa.me/919876543210` in WhatsApp FAB and CTA links — that's a recognisable placeholder phone number. **TODO Varun: replace with the real WhatsApp business number** (the contact-info system handles this; just needs a real value in admin → settings).
- ⚠️ GA4 placeholder shipped in production. **FIXED:** gated behind `NEXT_PUBLIC_GA_MEASUREMENT_ID`. **TODO Varun: create GA4 property, set the measurement ID env var on Vercel.**

### 11. Competitor benchmark (light)

| Site | Title | Note |
|---|---|---|
| **Sotheby's India** | (returned blocked/empty — anti-bot) | Standard playbook: location-targeted pages, agent profiles per city, listing schema |
| **Bali Real Estate** | "balirealestate.com" | Generic title, weak meta — easy to outrank for Bali long-tail |
| **Exotiq Property** | "Bali Real Estate for Sale \| Buy Real Estate in Bali - Trusted Real Estate Agency" | Clear keyword stuffing in title. Targets transactional intent ("buy real estate in Bali") |
| **JLL India** | "JLL India \| Commercial real estate and property investment" | Strong brand-led title, focused on commercial — they don't compete on luxury residential |
| **DLF Homes** | "DLF Homes: New Launch, Luxury Apartments in Gurgaon \| Triverse" | Project-name-led, Gurgaon focused, "New Launch" callout = freshness signal |

**Patterns we should adopt:**
- **Project name in titles for /delhi and /bali** — DLF, Sotheby's and Exotiq all do this. We currently say "Delhi NCR Projects"; better would be "Saket / South Ex / Safdarjung Builder Floors & Kothis" rotating.
- **Transactional intent in meta descriptions** ("buy", "for sale", "consultation") — Exotiq targets buyers explicitly.
- **City-level landing pages**: Sotheby's has `/eng/sales/india/new-delhi`; we should consider `/delhi/saket`, `/delhi/south-ex`, `/bali/canggu`, `/bali/seminyak` as Phase 2 content.
- **Pricing visibility**: competitors signal price ranges; we say "Premium" in schema and that's it. Phase 2 should include indicative pricing where appropriate.

### 12. Other observations

- **No `og-image.jpg`** verified in `public/`. The OpenGraph references `/og-image.jpg` — Varun should confirm the actual image is in place at production, otherwise WhatsApp / Twitter / LinkedIn previews will be broken. **TODO.**
- **`force-dynamic` on root layout** disables ISR site-wide, so every page is rendered on every request. That's fine on Vercel for now but limits CDN caching and inflates Vercel function invocations. Phase 2 candidate: switch static pages (`/about`, `/services`, `/blog`) to ISR with `revalidate = 3600`.
- **No `<link rel="alternate" hreflang="...">` between Delhi (en-IN) and Bali (en-ID).** Now added on those two pages so Google understands the geographic split.
- **`metadataBase` in layout.tsx** correctly set to `https://www.nauhomes.com` — good.

---

## Quick Wins (auto-applied, this commit)

All changes are additive or conservative; nothing in the contact-info system, admin panel, DB schema, email code, DNS, or video-upload paths was touched.

1. **`src/app/layout.tsx`**
   - Removed `maximumScale: 1` from viewport (a11y).
   - Replaced placeholder `verification.google` with env-gated `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` and added Bing's `msvalidate.01` from `NEXT_PUBLIC_BING_VERIFICATION`.
   - Replaced hardcoded `GA_TRACKING_ID` GA4 script with an env-gated block (`NEXT_PUBLIC_GA_MEASUREMENT_ID`). When the env var is unset, no analytics script ships at all.
   - Added `WebSite` and `RealEstateAgent` JSON-LD schemas alongside the existing `Organization` and `LocalBusiness` blocks.

2. **`src/app/page.tsx` (homepage)**
   - Fixed canonical from `https://nauhomes.com` (apex) → `https://www.nauhomes.com`.
   - Replaced Unsplash OG image URL with branded `/og-image.jpg` (1200×630).
   - Removed duplicate `verification.google` placeholder (now handled in layout).
   - Locked OG `url` to www.

3. **`src/app/about/page.tsx`** — added `alternates.canonical` + per-page OpenGraph.

4. **`src/app/contact/page.tsx`** — added canonical + OG.

5. **`src/app/projects/page.tsx`** — added canonical + OG.

6. **`src/app/services/page.tsx`** — added canonical + OG.

7. **`src/app/blog/page.tsx`** — added canonical + OG.

8. **`src/app/delhi/page.tsx`**
   - Added correct www canonical.
   - Added `hreflang` (en-IN ↔ en-ID) pointing to /delhi and /bali respectively.
   - Promoted three "Premium Locations / Luxury Design / Quality Construction" feature heads from H3 → H2 (was a hierarchy break).
   - Fixed `font-semibent` → `font-semibold` typo.
   - Added screen-reader heading for the market-info section.
   - Tightened title and meta description.

9. **`src/app/bali/page.tsx`** — same set of fixes mirrored from Delhi.

10. **`src/app/projects/[slug]/page.tsx`** — full per-project metadata: canonical, OG (with thumbnail), Twitter card, robots-noindex on 404s, fallback description that auto-builds from project type & location label.

11. **`src/app/sitemap.ts`** — pulls all live projects from the DB and emits `/projects/{slug}` URLs alongside the static set; degrades gracefully if DB is unreachable.

12. **`src/app/robots.ts`** — removed over-restrictive `/_next/` and `/.well-known/` blocks.

`tsc --noEmit` and `next build` both pass.

---

## Manual TODOs (need Varun)

In rough priority order:

### Search Console & Analytics (15 min)
1. **Create Google Search Console property** at https://search.google.com/search-console for `https://www.nauhomes.com`. Pick the URL-prefix method, copy the verification token, then set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxx` in Vercel env vars. Submit `/sitemap.xml`.
2. **Create Bing Webmaster Tools property** at https://www.bing.com/webmasters. Set `NEXT_PUBLIC_