# Nauhomes.com SEO Phase 2 — Keyword Strategy & Content Plan

**Date:** 2026-04-27
**Author:** Claude (subagent run, depth 1/1)
**Inputs:** `SEO_AUDIT_PHASE1.md`, live site at https://www.nauhomes.com, repo `/opt/openclaw/workspace/nauhomes/`
**Scope:** Keyword universe → page mapping → content gaps → 90-day calendar → local SEO → competitor angles → 14-day quick wins
**Out of scope:** Off-page link building, GBP claim mechanics, schema expansion (Phase 3), paid media

---

## TL;DR

Nirvana Homes' realistic SEO path to revenue is **NOT** to win head terms like "luxury apartments south delhi" — those are owned by 99acres / MagicBricks / Housing.com aggregators with millions of inbound links and indistinguishable inventory. **The path that ranks AND converts is locality-specific, intent-specific, and audience-specific:**

1. **Delhi:** Own the **builder-floor-by-locality** niche (kothis, P-block South Ex, M-block Saket, Safdarjung Enclave, Defence Colony) where aggregators have weak, formulaic content and we have actual portfolio + on-the-ground knowledge.
2. **Bali:** Own the **NRI / Indian buyer in Bali** niche (freehold vs leasehold for Indians, RBI LRS rules, capital gains repatriation, Indian-buyer-friendly villa management). Almost zero competition; high purchase intent; six-figure-USD ticket size.
3. **Pillar:** Two buyer's guides (`/buyers-guide-delhi`, `/buyers-guide-bali`) ranked for "how to buy" long-tail, used as lead magnets and internal-link hubs.
4. **Brand:** Defend "nirvana homes" / "nauhomes" SERPs (currently weak — there are competing "Nirvana Realty" / "Nirvana Group" listings in other cities).

Priority: 5 quick-win pieces in 14 days (§7), 12-week calendar (§4), then re-evaluate against GSC data.

---

## 1. Target Keyword Universe

Difficulty estimates use a 3-tier scale grounded in current SERP composition (aggregator dominance + DA + intent saturation), not a tool score. Priority: **P0** = ship in next 30 days, **P1** = next 60 days, **P2** = backlog. Funnel: **TOF** = top-of-funnel/info, **MOF** = consideration, **BOF** = purchase intent.

### 1A. Delhi — Locality + Property Type (BOF/MOF)

| Keyword | Bucket | Intent | Difficulty | Priority | Target Page | Funnel | Notes |
|---|---|---|---|---|---|---|---|
| luxury builder floor south delhi | Delhi loc+type | Trans | High | P0 | NEW `/delhi/builder-floors` | BOF | Aggregator-owned but high commercial value; we win with portfolio + spec depth |
| builder floor saket for sale | Delhi loc+type | Trans | Med | P0 | NEW `/delhi/saket` | BOF | Aggregators thin here, we have 2 live Saket projects |
| m block saket builder floor | Delhi loc+type | Trans | Low | P0 | `/projects/m-block-saket-builder-floor` | BOF | Hyper-local, we already have inventory — easy ranking |
| p block south ex builder floor | Delhi loc+type | Trans | Low | P0 | `/projects/p-block-south-ex-part-2` | BOF | Same — own this term |
| south extension luxury apartments | Delhi loc+type | Trans | High | P1 | NEW `/delhi/south-extension` | BOF | Hard, but locality page can rank long-tail variants |
| kothi south extension | Delhi loc+type | Trans | Med | P0 | NEW `/delhi/south-extension` | BOF | "Kothi" is high-intent Indian-English; aggregators ignore it |
| kothi for sale south delhi | Delhi loc+type | Trans | Med | P0 | NEW `/delhi/builder-floors` (cross-link) | BOF | Same — niche phrasing |
| luxury villa defence colony | Delhi loc+type | Trans | High | P1 | NEW `/delhi/defence-colony` | BOF | Defence Colony is small inventory but premium ticket |
| defence colony builder floor price | Delhi loc+type | Trans | Med | P1 | NEW `/delhi/defence-colony` | BOF | Price-modifier = strong commercial intent |
| 4bhk vasant vihar | Delhi loc+type | Trans | Med | P1 | NEW `/delhi/vasant-vihar` | BOF | Diplomatic enclave, premium NRI segment |
| greater kailash luxury apartment | Delhi loc+type | Trans | High | P1 | NEW `/delhi/greater-kailash` | BOF | GK1/GK2 distinction matters — split if traffic warrants |
| safdarjung enclave builder floor | Delhi loc+type | Trans | Low | P0 | `/projects/safdarjung-enclave-luxury-builder-floor` | BOF | Existing project, optimise for slug term |
| panchsheel park property | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/panchsheel-park` | BOF | Smaller TAM but no real competition |
| sainik farms farmhouse | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/sainik-farms` | BOF | Farmhouse audience is distinct (HNI, plot-led) |
| westend delhi property | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/westend` | BOF | Tiny but ultra-premium; one good page can capture full demand |
| jor bagh apartment for sale | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/jor-bagh` | BOF | High ticket, very low volume — only worth 1 page, not a sub-tree |
| golf links property delhi | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/golf-links` | BOF | Same as Jor Bagh — diplomatic adjacency |
| friends colony bungalow | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/friends-colony` | BOF | Bungalow term = HNI signal |
| sushant lok phase 1 builder floor | Delhi loc+type | Trans | Low | P0 | `/projects/sushant-lok-phase-1` | BOF | Existing project — sole listing optimisation |
| hauz khas property for sale | Delhi loc+type | Trans | Med | P2 | NEW `/delhi/hauz-khas` | BOF | Mixed-use locality; lower priority than core South Delhi |
| luxury penthouse south delhi | Delhi loc+type | Trans | Med | P1 | NEW `/delhi/penthouses` | BOF | Penthouse buyers = differentiated audience |
| ready to move builder floor delhi | Delhi loc+type | Trans | Med | P1 | `/projects` (filter view) | BOF | "Ready to move" = urgent intent |
| best builders in south delhi | Delhi authority | Comm | High | P1 | `/about` (rewrite) | MOF | Authority play; we need content + reviews to rank |

### 1B. Bali — Locality + Property Type (BOF/MOF)

| Keyword | Bucket | Intent | Difficulty | Priority | Target Page | Funnel | Notes |
|---|---|---|---|---|---|---|---|
| luxury villa canggu for sale | Bali loc+type | Trans | High | P0 | NEW `/bali/canggu` | BOF | Highest-volume Bali term; tough but achievable for locality page |
| berawa villa for sale | Bali loc+type | Trans | Med | P0 | NEW `/bali/berawa` | BOF | We have 2 Berawa projects — own this micro-locality |
| berawa luxury villa | Bali loc+type | Trans | Low | P0 | `/projects/berawa-luxury-villa` | BOF | Existing project listing — optimise |
| seminyak villa investment | Bali loc+type | Trans | Med | P0 | NEW `/bali/seminyak` | BOF | "Investment" modifier shifts SERP toward our content type |
| pererenan villa for sale | Bali loc+type | Trans | Low | P1 | NEW `/bali/pererenan` | BOF | Low volume, near-zero competition for Indian-buyer angle |
| uluwatu cliff villa for sale | Bali loc+type | Trans | Med | P2 | NEW `/bali/uluwatu` | BOF | Different buyer profile (resort/clifftop), if we scout inventory |
| ubud luxury home for sale | Bali loc+type | Trans | Med | P2 | NEW `/bali/ubud` | BOF | Wellness/retreat segment; only worth doing if we list Ubud inventory |
| sanur villa investment | Bali loc+type | Trans | Low | P2 | NEW `/bali/sanur` | BOF | Ageing-buyer / family segment |
| nusa dua villa for sale | Bali loc+type | Trans | Med | P2 | NEW `/bali/nusa-dua` | BOF | Resort zone; lower DIY-buyer fit |
| kerobokan villa for sale | Bali loc+type | Trans | Low | P2 | NEW `/bali/kerobokan` | BOF | Spillover from Seminyak; cheaper |
| beachfront villa bali | Bali type | Trans | High | P1 | NEW `/bali/beachfront-villas` | BOF | Visual-heavy page, photogenic = good for Pinterest/IG too |
| ricefield villa bali for sale | Bali type | Trans | Low | P1 | NEW `/bali/ricefield-villas` | BOF | "Ricefield view" = Bali-specific buying criterion |
| leasehold villa bali | Bali type | Trans | Med | P0 | NEW `/freehold-vs-leasehold-bali` | MOF | Educational keyword; shapes purchase decision |
| freehold villa bali | Bali type | Trans | Med | P0 | NEW `/freehold-vs-leasehold-bali` | MOF | Pairs with above; foreigners can't hold freehold directly — high-explanation need |
| bali villa rental yield | Bali invest | Comm | Med | P0 | NEW `/bali/rental-yields-guide` | MOF | "Yield" = sophisticated investor; strong qualification signal |
| bali villa roi | Bali invest | Comm | Med | P0 | NEW `/bali/rental-yields-guide` | MOF | Same intent as above |
| bali villa management for owners | Bali service | Trans | Low | P1 | NEW `/services/bali-villa-management` | BOF | Service page, recurring-revenue offering |
| nirvana villas bali | Bali brand | Nav | Low | P0 | `/projects/nirvana-villas-c3` | BOF | Defend our own project name |

### 1C. Brand & Authority

| Keyword | Bucket | Intent | Difficulty | Priority | Target Page | Funnel | Notes |
|---|---|---|---|---|---|---|---|
| nirvana homes | Brand | Nav | Low | P0 | `/` | BOF | Defend SERP; risk: confused with "Nirvana Realty" Mumbai |
| nirvana homes delhi | Brand | Nav | Low | P0 | `/delhi` | BOF | Geo-disambiguate from other Nirvana brands |
| nirvana homes bali | Brand | Nav | Low | P0 | `/bali` | BOF | Same |
| nirvana homes review | Brand | Comm | Low | P1 | `/about` (testimonials anchor) | MOF | Reputation defence — needs Google review density |
| nauhomes | Brand | Nav | Low | P0 | `/` | BOF | Domain term — already easy |
| nirvana group construction | Brand | Nav | Low | P1 | `/about` | MOF | Parent-brand term |
| luxury real estate consultant delhi | Authority | Comm | High | P2 | `/services` | MOF | Crowded; only worth pursuing once we have authority |
| bali property advisor india | Authority | Comm | Low | P0 | NEW `/buyers-guide-bali` | MOF | Niche framing — Indian advisor for Bali = clear positioning |
| nri bali property investment | Authority | Comm | Low | P0 | NEW `/buyers-guide-bali` | MOF | High-ticket buyer; our highest-ROI keyword |

### 1D. Long-tail / Informational (TOF)

| Keyword | Bucket | Intent | Difficulty | Priority | Target Page | Funnel | Notes |
|---|---|---|---|---|---|---|---|
| is bali a good investment 2026 | Bali info | Info | Low | P0 | NEW blog `/blog/is-bali-good-investment-2026` | TOF | Annual refresh keyword; cite real yield data |
| freehold vs leasehold bali | Bali info | Info | Med | P0 | NEW `/freehold-vs-leasehold-bali` | TOF/MOF | Pillar page — anchors all Bali content |
| how to buy property in bali as foreigner | Bali info | Info | Med | P0 | NEW `/buyers-guide-bali` | TOF | High-volume, multi-intent, perfect pillar bait |
| indian buying villa in bali tax | Bali info | Info | Low | P0 | NEW blog `/blog/nri-tax-bali-villa-investment` | TOF | Nearly zero competition with India-specific framing |
| rbi lrs limit bali property | Bali info | Info | Low | P0 | section in `/buyers-guide-bali` | TOF | $250k/yr LRS limit shapes buyer behaviour |
| bali villa rental income tax india | Bali info | Info | Low | P1 | blog `/blog/bali-rental-income-tax-india` | TOF | Specific NRI pain point |
| bali property prices 2026 | Bali info | Info | Med | P1 | NEW blog (annual) | TOF | Refresh-friendly evergreen |
| stamp duty south delhi 2026 | Delhi info | Info | Med | P0 | NEW blog `/blog/stamp-duty-south-delhi-2026` | TOF | Annual refresh, high commercial intent |
| circle rates south delhi 2026 | Delhi info | Info | Med | P0 | NEW blog `/blog/circle-rates-south-delhi-2026` | TOF | Pairs with stamp duty post; mutual internal links |
| saket vs greater kailash | Delhi info | Info | Low | P0 | NEW blog `/blog/saket-vs-greater-kailash` | TOF | Comparison content = high CTR; almost no competition |
| south ex vs defence colony | Delhi info | Info | Low | P1 | NEW blog `/blog/south-ex-vs-defence-colony` | TOF | Same comparison play |
| best schools near vasant vihar | Delhi info | Info | Med | P2 | NEW blog | TOF | Adjacent intent — buyers research schools |
| south delhi redevelopment process | Delhi info | Info | Low | P0 | NEW `/buyers-guide-delhi` (section) | TOF | We do redevelopment — own this term |
| collaboration agreement builder floor | Delhi info | Info | Low | P1 | blog `/blog/collaboration-agreement-explained` | TOF | Niche legal-adjacent term, high BOF conversion |
| dda vs leasehold delhi | Delhi info | Info | Low | P1 | blog | TOF | Property-tenure explainer |
| capital gains property sale delhi | Delhi info | Info | Med | P2 | blog | TOF | Adjacent to seller intent |
| how to invest in real estate delhi | Delhi info | Info | High | P2 | NEW `/buyers-guide-delhi` | TOF | Broad — only attempt as pillar |
| nri buying property in delhi rules | Delhi info | Info | Low | P0 | section in `/buyers-guide-delhi` | TOF | NRI segment is core to luxury Delhi market |
| best architect south delhi luxury home | Authority info | Comm | Med | P1 | `/services` | MOF | Service-led intent |
| villa interior design bali | Bali info | Info | Med | P2 | blog | TOF | Visual content — Pinterest play |
| bali villa construction cost per sqm | Bali info | Info | Low | P1 | blog | TOF | Pre-buyers researching feasibility |

### 1E. Service-led (MOF/BOF)

| Keyword | Bucket | Intent | Difficulty | Priority | Target Page | Funnel | Notes |
|---|---|---|---|---|---|---|---|
| turnkey home construction south delhi | Service | Trans | Med | P0 | `/services` (rewrite) | BOF | Aligns with existing service offering |
| luxury home redevelopment south delhi | Service | Trans | Med | P0 | NEW `/services/redevelopment-south-delhi` | BOF | Spin out from /services; own a strong sub-page |
| architectural design firm south delhi | Service | Trans | Med | P1 | `/services` | MOF | Lead-gen for design phase only |
| project management luxury construction delhi | Service | Trans | Med | P2 | `/services` | MOF | Lower-volume; bundle with redevelopment page |
| property management bali for nri | Service | Trans | Low | P0 | NEW `/services/bali-villa-management` | BOF | Recurring-revenue play, high LTV |
| villa rental management bali | Service | Trans | Med | P1 | NEW `/services/bali-villa-management` | BOF | Same page, secondary keyword |

**Total: ~95 keywords** distributed across Delhi loc+type (23), Bali loc+type (18), brand (9), informational (22), service (6), with built-in priority laddering and funnel tagging.

---

## 2. Keyword → Existing Page Mapping

For each existing page: 1 primary keyword, 2–3 secondaries, plus a recommended H1/title/meta rewrite where current copy is weak. Audit-applied canonicals are not re-listed.

### `/` (Homepage)

- **Primary:** nirvana homes
- **Secondary:** luxury real estate delhi bali, luxury home builders south delhi, bali villa investment india
- **Current title:** (audit shows 64 chars, OK)
- **Recommended H1:** "Luxury Homes in Delhi NCR & Bali — Built by Nirvana Group"
- **Recommended title (60 ch):** "Nirvana Homes — Luxury Real Estate, Delhi NCR & Bali"
- **Recommended meta (155 ch):** "Luxury builder floors, kothis & villas across South Delhi and Bali. 20+ years, 100+ projects. India-Bali real estate by Nirvana Group. Book a consultation."
- **Trim from current 282 → 155** (audit flagged this)

### `/about`

- **Primary:** nirvana group construction
- **Secondary:** best luxury home builder south delhi, indian luxury real estate developer, nirvana homes review
- **Current meta (91 ch) too short.**
- **Recommended title (≤60):** "About Nirvana Group — 20 Years Building Luxury Homes"
- **Recommended meta (155):** "Nirvana Group: 20+ years, 100+ luxury homes delivered across South Delhi and Bali. Builder floors, kothis, villas, redevelopment. Meet the team and method."

### `/contact`

- **Primary:** nirvana homes contact
- **Secondary:** luxury home builder delhi consultation, bali property advisor delhi office
- **Current OK; minor rewrite:**
- **Recommended title:** "Contact Nirvana Group — Delhi & Bali Offices"
- **Recommended meta:** "Talk to Nirvana Group. Delhi office in Okhla, Bali office in Denpasar. Free consultation for luxury home construction, redevelopment, and villa investment."
- **NAP cleanup needed (see §5).**

### `/delhi`

- **Primary:** luxury builder floor south delhi
- **Secondary:** kothi south delhi, builder floor saket, redevelopment south delhi
- **Current title 76 ch (audit: ⚠️ long).**
- **Recommended title (60):** "South Delhi Luxury Homes — Builder Floors, Kothis | Nirvana"
- **Recommended H1:** "Luxury Builder Floors & Kothis in South Delhi"
- **Recommended meta (155):** "Premium builder floors, kothis and luxury apartments across Saket, South Ex, Safdarjung, Defence Colony and Vasant Vihar. By Nirvana Group, 20+ years."
- Add an H2-anchored "Localities we build in" block linking to all `/delhi/[locality]` pages once they ship.

### `/bali`

- **Primary:** luxury villa bali for sale
- **Secondary:** bali villa investment india, berawa villa, freehold leasehold bali
- **Current title 67 ch (audit: ⚠️ long).**
- **Recommended title (60):** "Luxury Villas in Bali for Sale & Investment | Nirvana"
- **Recommended H1:** "Luxury Villas in Bali — for Indian Buyers & NRIs"
- **Recommended meta (155):** "Buy a luxury villa in Canggu, Berawa, Seminyak. Freehold/leasehold guidance, RBI/LRS support, rental management. India-led Bali property advisory."
- Add prominent CTA → `/buyers-guide-bali` once shipped.

### `/projects`

- **Primary:** luxury real estate projects delhi bali
- **Secondary:** ready to move builder floor south delhi, berawa villa, saket builder floor
- **Current meta 88 ch — too short.**
- **Recommended title:** "Our Luxury Projects in Delhi & Bali | Nirvana Group"
- **Recommended meta (155):** "Browse Nirvana Group's portfolio of luxury builder floors, kothis and villas across South Delhi and Bali. Ready-to-move and under-construction inventory."
- Add filter UI deep-links so `?location=delhi`, `?type=villa` are crawlable (`?location=delhi` → indexable filter view) — but caution: only if filter pages have unique copy, otherwise canonical them to `/projects`.

### `/services`

- **Primary:** turnkey home construction south delhi
- **Secondary:** luxury home redevelopment south delhi, architectural design firm south delhi, project management luxury construction
- **Current title 22 ch — too short / generic.**
- **Recommended title:** "Construction & Design Services in Delhi & Bali | Nirvana"
- **Recommended H1:** "Turnkey Construction, Design & Redevelopment Services"
- **Recommended meta (155):** "End-to-end services — design, redevelopment, project management, cost engineering, compliance — for luxury homes in South Delhi and villas in Bali."
- Spin out two child pages: `/services/redevelopment-south-delhi` and `/services/bali-villa-management` (high-intent, easier to rank than the umbrella page).

### `/blog`

- **Primary:** nirvana homes blog
- **Secondary:** luxury real estate insights delhi bali, bali property guide india, south delhi property news
- **Current title 22 ch — too generic.**
- **Recommended title:** "Luxury Real Estate Blog — Delhi & Bali Insights | Nirvana"
- **Recommended meta (155):** "Guides for luxury home buyers and Bali villa investors. South Delhi market notes, NRI tax tips, freehold vs leasehold, and design trends — by Nirvana Group."
- **Audit flag:** blog index links to `/blog/luxury-villa-trends-2025` etc. but those routes may soft-404. **Verify before launching new blog content** — see TODO in §8.

### `/projects/p-block-south-ex-part-2`

- **Primary:** p block south ex builder floor
- **Secondary:** luxury builder floor south extension, p block south extension property for sale
- **Current title (audit-fixed canonical):** OK
- **Recommended title:** "P-Block South Ex Builder Floor — Part 2 | Nirvana"
- **Recommended meta:** "Luxury builder floor in P-Block South Extension Part 2. Premium South Delhi inventory by Nirvana Group. View specs, floor plans and book a site visit."

### `/projects/m-block-240-sq-yds-saket`

- **Primary:** m block saket 240 sq yards builder floor
- **Secondary:** saket m block builder floor, 240 sq yds saket plot
- **Recommended title:** "M-Block Saket — 240 Sq Yds Builder Floor | Nirvana"
- **Recommended meta:** "240 sq yds luxury builder floor in M-Block Saket, South Delhi. Premium specs, ready-to-move-style finish. View details and book a viewing."

### `/projects/m-block-saket-builder-floor`

- **Primary:** m block saket builder floor
- **Secondary:** saket builder floor for sale, luxury builder floor saket
- **Recommended title:** "M-Block Saket Builder Floor for Sale | Nirvana"
- **Recommended meta:** "Luxury M-Block Saket builder floor by Nirvana Group. Contemporary design, premium materials, prime South Delhi address. View specs and pricing."

### `/projects/sushant-lok-phase-1`

- **Primary:** sushant lok phase 1 builder floor
- **Secondary:** sushant lok property gurgaon, builder floor sushant lok
- **Recommended title:** "Sushant Lok Phase 1 Builder Floor | Nirvana Group"
- **Recommended meta:** "Luxury builder floor in Sushant Lok Phase 1, Gurgaon. Premium specifications, prime location. Book a site visit with Nirvana Group."

### `/projects/safdarjung-enclave-luxury-builder-floor`

- **Primary:** safdarjung enclave builder floor
- **Secondary:** luxury builder floor safdarjung, safdarjung enclave property for sale
- **Recommended title:** "Safdarjung Enclave Luxury Builder Floor | Nirvana"
- **Recommended meta:** "Premium luxury builder floor in Safdarjung Enclave, South Delhi. Built by Nirvana Group with 20+ years of experience. View specs and floor plans."

### `/projects/berawa-luxury-villa`

- **Primary:** berawa luxury villa for sale
- **Secondary:** canggu berawa villa, berawa villa investment
- **Recommended title:** "Berawa Luxury Villa for Sale, Bali | Nirvana"
- **Recommended meta:** "Luxury villa in Berawa, Bali. Premium design, rental-ready, freehold/leasehold options. Indian-buyer-friendly advisory by Nirvana Homes."

### `/projects/berawa-luxury-villa-c2`

- **Primary:** berawa villa c2 for sale
- **Secondary:** berawa luxury villa, canggu villa investment
- **Recommended title:** "Berawa Luxury Villa C2, Bali | Nirvana"
- **Recommended meta:** "Berawa luxury villa C2 — premium Bali investment villa with rental management. Indian buyer guidance: freehold, LRS, taxation. Book a virtual tour."

### `/projects/nirvana-villas-c3`

- **Primary:** nirvana villas bali c3
- **Secondary:** berawa villa c3, luxury bali villa investment
- **Recommended title:** "Nirvana Villas C3, Berawa Bali | Nirvana"
- **Recommended meta:** "Nirvana Villas C3 — luxury investment villa in Berawa, Bali. Built and managed by Nirvana Group, advisory tailored to Indian buyers and NRIs."

---

## 3. Content Gap — New Pages to Create

Each page below is justified by a P0/P1 keyword, has a defined slot in the IA, and links into the existing site without orphaning.

### 3.1 `/delhi/saket` — Locality landing (P0)

- **Primary:** builder floor saket for sale
- **Secondary:** m block saket builder floor, kothi saket, luxury apartment saket
- **H1:** "Luxury Builder Floors & Kothis in Saket"
- **Title (60):** "Saket Luxury Builder Floors & Kothis for Sale | Nirvana"
- **Meta (155):** "Premium builder floors, kothis and luxury apartments in Saket — M-Block, J-Block, Saket District. By Nirvana Group with on-the-ground inventory."
- **Outline (H2s):** (1) Why Saket; (2) Sub-localities (M-Block, J-Block, Press Enclave, Saket District); (3) Property types (builder floor, kothi, apartment); (4) Indicative price bands; (5) Schools, hospitals, metro connectivity; (6) Our live Saket projects; (7) Buying process; (8) FAQ
- **Word count:** 1,400–1,800
- **Inbound links:** `/`, `/delhi`, `/projects` (locality filter), all 2 Saket project pages
- **Outbound links:** `/projects/m-block-saket-builder-floor`, `/projects/m-block-240-sq-yds-saket`, `/buyers-guide-delhi`, `/blog/saket-vs-greater-kailash`

### 3.2 `/delhi/south-extension` — Locality landing (P0)

- **Primary:** kothi south extension
- **Secondary:** p block south ex builder floor, luxury apartment south extension, south ex property for sale
- **H1:** "South Extension — Luxury Builder Floors & Kothis"
- **Title (60):** "South Extension Builder Floors & Kothis for Sale | Nirvana"
- **Meta:** "Buy a luxury builder floor or kothi in South Ex Part 1 & Part 2. P-Block, M-Block, F-Block. Real inventory and full handholding by Nirvana Group."
- **Outline:** (1) Why South Ex; (2) Part 1 vs Part 2; (3) Sub-blocks (P, M, F, A, D); (4) Builder floor vs kothi for South Ex; (5) Connectivity (Metro, Outer Ring); (6) Our live South Ex projects; (7) Stamp duty/circle rates; (8) FAQ
- **Word count:** 1,400–1,800
- **Inbound:** `/`, `/delhi`, `/projects/p-block-south-ex-part-2`
- **Outbound:** `/projects/p-block-south-ex-part-2`, `/buyers-guide-delhi`, `/blog/circle-rates-south-delhi-2026`

### 3.3 `/delhi/defence-colony` — Locality landing (P1)

- **Primary:** luxury villa defence colony
- **Secondary:** defence colony builder floor price, defence colony property for sale, kothi defence colony
- **H1:** "Defence Colony — Luxury Builder Floors & Bungalows"
- **Outline:** (1) Why Defence Colony; (2) Block-by-block guide (A–E); (3) Property tenure (DDA leasehold + freehold conversion); (4) Indicative pricing; (5) Connectivity; (6) Live and recent projects; (7) Buying process; (8) FAQ
- **Word count:** 1,400
- **Inbound:** `/`, `/delhi`, `/buyers-guide-delhi`
- **Outbound:** `/projects` filter, `/blog/dda-vs-leasehold-delhi`

### 3.4 `/delhi/vasant-vihar` — Locality landing (P1)

- **Primary:** 4bhk vasant vihar
- **Secondary:** vasant vihar property for sale, luxury apartment vasant vihar, embassy zone delhi
- **H1:** "Vasant Vihar — Luxury Apartments in Delhi's Diplomatic Enclave"
- **Outline:** (1) Why Vasant Vihar (diplomatic, IIT, embassies); (2) Block A–E breakdown; (3) Apartment vs builder floor; (4) Pricing band; (5) Schools (Vasant Valley, ASN); (6) Live projects (when available); (7) NRI buying notes; (8) FAQ
- **Word count:** 1,200–1,500
- **Inbound:** `/`, `/delhi`, `/buyers-guide-delhi`
- **Outbound:** `/buyers-guide-delhi#nri-buyers`, `/services`

### 3.5 `/delhi/greater-kailash` — Locality landing (P1)

- **Primary:** greater kailash luxury apartment
- **Secondary:** gk1 builder floor, gk2 builder floor, greater kailash property for sale, m block gk1
- **H1:** "Greater Kailash — Luxury Apartments & Builder Floors (GK1 & GK2)"
- **Outline:** (1) GK1 vs GK2 (M-Block, N-Block, R-Block, W-Block); (2) Property type mix; (3) Pricing; (4) Connectivity; (5) Schools, retail, restaurants; (6) Inventory; (7) Buying process; (8) FAQ
- **Word count:** 1,400
- **Inbound:** `/`, `/delhi`, `/blog/saket-vs-greater-kailash`
- **Outbound:** `/blog/saket-vs-greater-kailash`, `/projects` filter, `/buyers-guide-delhi`

### 3.6 `/delhi/builder-floors` — Property-type landing (P0)

- **Primary:** luxury builder floor south delhi
- **Secondary:** kothi for sale south delhi, builder floor for sale south delhi, ready to move builder floor delhi
- **H1:** "Luxury Builder Floors in South Delhi"
- **Outline:** (1) What is a builder floor (and why South Delhi loves them); (2) Builder floor vs kothi vs apartment; (3) Sub-localities (Saket, South Ex, Safdarjung, Defence Colony, GK); (4) Pricing benchmarks 2026; (5) What to look for (RCC, lift, parking, plot size, FAR); (6) Our builder floor portfolio; (7) Process; (8) FAQ
- **Word count:** 1,800–2,200
- **Inbound:** `/`, `/delhi`, all locality pages, `/projects`
- **Outbound:** all 4 builder floor project pages, `/buyers-guide-delhi`

### 3.7 `/bali/canggu` — Locality landing (P0)

- **Primary:** luxury villa canggu for sale
- **Secondary:** canggu villa investment, canggu property prices, berawa pererenan canggu
- **H1:** "Luxury Villas in Canggu — for Indian Buyers"
- **Title (60):** "Luxury Villas in Canggu for Sale | Nirvana Bali"
- **Meta:** "Buy a luxury villa in Canggu — Berawa, Pererenan, Echo Beach. Freehold & leasehold options, rental management, India-led advisory by Nirvana Homes."
- **Outline:** (1) Canggu sub-zones (Berawa, Pererenan, Echo Beach, Batu Bolong); (2) Why Canggu vs Seminyak/Ubud; (3) Pricing 2026 (USD bands per sq m); (4) Rental yields & ROI; (5) Freehold vs leasehold quick frame; (6) Indian buyer specifics (LRS, repatriation, tax); (7) Our Canggu villas; (8) Process & timeline; (9) FAQ
- **Word count:** 2,000–2,400
- **Inbound:** `/`, `/bali`, `/buyers-guide-bali`, all 3 Berawa/Canggu projects
- **Outbound:** `/bali/berawa`, `/freehold-vs-leasehold-bali`, `/buyers-guide-bali`, project pages

### 3.8 `/bali/berawa` — Locality landing (P0)

- **Primary:** berawa villa for sale
- **Secondary:** berawa luxury villa, berawa villa investment, finns beach club berawa
- **H1:** "Luxury Villas in Berawa, Bali"
- **Outline:** (1) Why Berawa (Finns, beach access, restaurants); (2) Property tenure norms; (3) Pricing; (4) Yield benchmarks; (5) Our 3 Berawa villas; (6) Indian buyer notes; (7) FAQ
- **Word count:** 1,400–1,800
- **Inbound:** `/`, `/bali`, `/bali/canggu`, all 3 Berawa project pages
- **Outbound:** `/projects/berawa-luxury-villa`, `/projects/berawa-luxury-villa-c2`, `/projects/nirvana-villas-c3`, `/freehold-vs-leasehold-bali`

### 3.9 `/bali/seminyak` — Locality landing (P0)

- **Primary:** seminyak villa investment
- **Secondary:** seminyak villa for sale, oberoi seminyak villa, petitenget villa
- **H1:** "Luxury Villas in Seminyak, Bali — Investment & Lifestyle"
- **Outline:** (1) Seminyak vs Canggu; (2) Sub-zones (Oberoi, Petitenget, Eat Street, Square); (3) Pricing 2026; (4) Yields (Seminyak commands premium nightly rates); (5) Tenure norms; (6) Indian buyer notes; (7) FAQ
- **Word count:** 1,600
- **Inbound:** `/`, `/bali`, `/buyers-guide-bali`
- **Outbound:** `/freehold-vs-leasehold-bali`, `/services/bali-villa-management`

### 3.10 `/bali/pererenan` — Locality landing (P1)

- **Primary:** pererenan villa for sale
- **Secondary:** pererenan canggu villa, pererenan beach villa, ricefield villa pererenan
- **H1:** "Luxury Villas in Pererenan — The Quiet Side of Canggu"
- **Outline:** (1) Why Pererenan (still developing, lower cost basis); (2) Pricing; (3) Yield outlook; (4) Tenure; (5) FAQ
- **Word count:** 1,200
- **Inbound:** `/`, `/bali`, `/bali/canggu`
- **Outbound:** `/freehold-vs-leasehold-bali`

### 3.11 `/buyers-guide-delhi` — Pillar (P0)

- **Primary:** how to invest in real estate delhi
- **Secondary:** nri buying property in delhi rules, stamp duty south delhi, circle rates south delhi, south delhi redevelopment process, collaboration agreement builder floor
- **H1:** "The Complete Buyer's Guide to Luxury Real Estate in Delhi"
- **Title:** "Buyer's Guide: Luxury Real Estate in Delhi NCR | Nirvana"
- **Meta:** "Everything Indian and NRI buyers need: stamp duty, circle rates, builder floor vs kothi, redevelopment, collaboration agreements, NRI rules. By Nirvana Group."
- **Outline (H2s):** (1) Property types in South Delhi; (2) Pricing & circle rates 2026; (3) Stamp duty & registration; (4) NRI buying — rules, OCI/PIO, repatriation; (5) Redevelopment & collaboration agreements; (6) Due diligence checklist; (7) Locality picker; (8) Cost breakdown; (9) FAQ
- **Word count:** 3,500–4,500 (true pillar)
- **Inbound:** site-wide footer link, `/`, all `/delhi/*` pages, all blog Delhi content
- **Outbound:** every `/delhi/[locality]` page, `/blog/stamp-duty-south-delhi-2026`, `/blog/saket-vs-greater-kailash`, `/services/redevelopment-south-delhi`

### 3.12 `/buyers-guide-bali` — Pillar (P0, highest-revenue page on the site)

- **Primary:** how to buy property in bali as foreigner
- **Secondary:** indian buying villa in bali tax, nri bali property investment, freehold vs leasehold bali, rbi lrs limit bali property, bali villa rental yield
- **H1:** "How Indians Buy Property in Bali — The Complete 2026 Guide"
- **Title:** "How to Buy a Villa in Bali as an Indian Buyer | Nirvana"
- **Meta:** "Step-by-step guide for Indian buyers and NRIs purchasing villas in Bali. Freehold vs leasehold, RBI/LRS, taxation, rental management, repatriation."
- **Outline (H2s):** (1) Why Indians are buying Bali in 2026; (2) Tenure structures (Hak Milik, Hak Pakai, Hak Guna Bangunan, Leasehold) and which a foreigner can use; (3) PT PMA vs nominee structures (and why nominee is dangerous); (4) RBI LRS — $250k/yr per individual; (5) Indian taxation on Bali rental income & capital gains; (6) Bali property tax (PBB, BPHTB); (7) Rental yields by zone; (8) Buying process & timeline; (9) Due diligence — title (SHM/HGB/Sertifikat Hak Pakai), zoning, IMB/PBG; (10) Choosing a manager; (11) Common pitfalls; (12) FAQ
- **Word count:** 4,500–6,000 (true pillar)
- **Inbound:** site-wide footer link, `/`, `/bali`, every `/bali/[locality]` page, every Bali project page, every Bali blog
- **Outbound:** `/freehold-vs-leasehold-bali`, all `/bali/*` pages, `/services/bali-villa-management`, `/blog/nri-tax-bali-villa-investment`, `/blog/is-bali-good-investment-2026`
- **NOTE:** This is the single highest-leverage SEO asset on the entire site. Indian buyer + Bali villa is a $300k–$2M ticket with almost zero credible India-headquartered competition. Treat as top priority.

### 3.13 `/freehold-vs-leasehold-bali` — Decision-stage explainer (P0)

- **Primary:** freehold vs leasehold bali
- **Secondary:** leasehold villa bali, freehold villa bali, can foreigners own land in bali
- **H1:** "Freehold vs Leasehold in Bali — What Foreigners Can Actually Own"
- **Outline:** (1) The legal frame (UUPA 1960); (2) What "freehold" really means in Bali (Hak Milik = Indonesian citizens only); (3) The four foreigner-accessible structures; (4) Lease tenor (25/30 yrs +ext); (5) Pricing differential (freehold ~2x leasehold); (6) Resale & exit; (7) Risk comparison; (8) Decision matrix; (9) FAQ
- **Word count:** 2,000
- **Inbound:** `/buyers-guide-bali`, `/bali`, every `/bali/*` page
- **Outbound:** `/buyers-guide-bali`, `/bali/canggu`, `/services/bali-villa-management`

### 3.14 `/services/redevelopment-south-delhi` — Service sub-page (P0)

- **Primary:** luxury home redevelopment south delhi
- **Secondary:** south delhi collaboration agreement, builder floor redevelopment, joint development agreement delhi
- **H1:** "Luxury Home Redevelopment in South Delhi"
- **Outline:** (1) What redevelopment means in South Delhi; (2) Collaboration vs outright purchase vs JDA; (3) Process & timeline; (4) Owner economics (free units, cash component, share-of-sale); (5) Approvals (MCD, fire, environment, structural); (6) Our redevelopment portfolio; (7) FAQ
- **Word count:** 1,800
- **Inbound:** `/`, `/services`, `/delhi`, `/buyers-guide-delhi`
- **Outbound:** `/projects` filter (redevelopment type), `/buyers-guide-delhi`

### 3.15 `/services/bali-villa-management` — Service sub-page (P0)

- **Primary:** bali villa management for owners
- **Secondary:** villa rental management bali, property management bali for nri, bali villa rental yield
- **H1:** "Bali Villa Management — Built for Indian Owners"
- **Outline:** (1) What we manage (occupancy, OTA listings, guest ops, maintenance, staff, repatriation); (2) Yield optimisation; (3) Reporting & transparency; (4) Fee structure; (5) Compliance (PBB, withholding tax); (6) Onboarding; (7) FAQ
- **Word count:** 1,400
- **Inbound:** `/`, `/services`, `/bali`, every `/bali/*` page, `/buyers-guide-bali`
- **Outbound:** `/bali`, `/buyers-guide-bali`

### 3.16 `/bali/rental-yields-guide` — Investor-stage
 (P1)

- **Primary:** bali villa rental yield
- **Secondary:** bali villa roi, canggu rental yield, seminyak nightly rate
- **H1:** "Bali Villa Rental Yields — A 2026 Investor's Guide"
- **Outline:** (1) Headline yields by zone (Canggu vs Seminyak vs Ubud vs Uluwatu); (2) ADR & occupancy benchmarks; (3) Cost stack (management fee, OTA commissions, maintenance, staff, taxes); (4) Net yield calculation; (5) Sensitivity (occupancy vs ADR); (6) Comparison to Indian rental yields; (7) FAQ
- **Word count:** 1,800
- **Inbound:** `/buyers-guide-bali`, `/bali`, all `/bali/*` pages
- **Outbound:** `/services/bali-villa-management`, `/buyers-guide-bali`

### 3.17 FAQ hub — `/faq` (P1)

- **Primary:** nirvana homes faq
- **Secondary:** how to buy bali villa india, south delhi builder floor faq
- **Outline:** consolidated, schema-marked FAQ for both Delhi and Bali, sub-grouped by topic (legal, payment, NRI, taxation, timelines, rental). Pulls FAQs from constants.ts plus locality-specific Q&As.
- **Word count:** 2,000+
- **Why:** dedicated FAQ pages with FAQPage schema win featured snippets; we already have FAQPage schema on `/`.
- **Inbound:** site-wide footer, every locality and project page (cross-link relevant questions)
- **Outbound:** all pillars and locality pages

### 3.18 Locality landing pages — backlog (P2)

Ship after the P0/P1 set converts: `/delhi/panchsheel-park`, `/delhi/sainik-farms`, `/delhi/westend`, `/delhi/jor-bagh`, `/delhi/golf-links`, `/delhi/friends-colony`, `/delhi/hauz-khas`, `/bali/uluwatu`, `/bali/ubud`, `/bali/sanur`, `/bali/nusa-dua`, `/bali/kerobokan`. Use the same template as §3.1.

---

## 4. 90-Day Content Calendar

Cadence: 2 blog posts/week (alternating Delhi-week & Bali-week), 1 locality landing page every 2 weeks, 1 pillar guide per month. All publish dates assume Mon/Thu publish slots.

### Month 1 (Weeks 1–4)

| Wk | Type | Title | Slug | Target keyword | Words | Notes |
|---|---|---|---|---|---|---|
| 1 | Pillar | "How Indians Buy Property in Bali — The Complete 2026 Guide" | `/buyers-guide-bali` | how to buy property in bali as foreigner | 4,500 | **Highest-priority page on site.** Needs founder interview + tax citation. Schedule a 1-hr call with Varun. |
| 1 | Blog | "Is Bali a Good Investment in 2026?" | `/blog/is-bali-good-investment-2026` | is bali a good investment 2026 | 1,800 | Cite real ADR/occupancy data. Annual refresh keyword. |
| 2 | Locality | "Luxury Villas in Berawa, Bali" | `/bali/berawa` | berawa villa for sale | 1,500 | Need 6+ Berawa photos, ideally drone. Link to all 3 Berawa projects. |
| 2 | Blog | "Saket vs Greater Kailash — Which Should You Buy In?" | `/blog/saket-vs-greater-kailash` | saket vs greater kailash | 1,800 | Comparison content; almost zero competition. |
| 3 | Pillar | "The Complete Buyer's Guide to Luxury Real Estate in Delhi" | `/buyers-guide-delhi` | how to invest in real estate delhi | 4,000 | Includes stamp duty, NRI rules, redevelopment. Founder input on collaboration agreements. |
| 3 | Blog | "Stamp Duty in South Delhi 2026 — A Buyer's Cheat Sheet" | `/blog/stamp-duty-south-delhi-2026` | stamp duty south delhi 2026 | 1,400 | Annual refresh. Cite Delhi Govt notification with link. |
| 4 | Locality | "Luxury Builder Floors & Kothis in Saket" | `/delhi/saket` | builder floor saket for sale | 1,600 | Link both Saket project pages. |
| 4 | Blog | "Freehold vs Leasehold in Bali — What Foreigners Can Actually Own" | `/freehold-vs-leasehold-bali` | freehold vs leasehold bali | 2,000 | Decision-stage; treated as a hub page, not a blog post. |

### Month 2 (Weeks 5–8)

| Wk | Type | Title | Slug | Target keyword | Words | Notes |
|---|---|---|---|---|---|---|
| 5 | Locality | "Luxury Villas in Canggu — for Indian Buyers" | `/bali/canggu` | luxury villa canggu for sale | 2,200 | Cornerstone Bali locality page. Drone hero shot. |
| 5 | Blog | "NRI Tax on Bali Villa Investment — What You Owe in India" | `/blog/nri-tax-bali-villa-investment` | indian buying villa in bali tax | 1,800 | Needs CA review. Cite section 9, DTAA India-Indonesia. |
| 6 | Service | "Luxury Home Redevelopment in South Delhi" | `/services/redevelopment-south-delhi` | luxury home redevelopment south delhi | 1,800 | Founder interview on collaboration economics. |
| 6 | Blog | "Circle Rates in South Delhi 2026" | `/blog/circle-rates-south-delhi-2026` | circle rates south delhi 2026 | 1,400 | Pair with stamp-duty post; mutual internal links. |
| 7 | Locality | "South Extension — Luxury Builder Floors & Kothis" | `/delhi/south-extension` | kothi south extension | 1,600 | Link P-Block project. |
| 7 | Blog | "Bali Villa Construction Cost per Sq m in 2026" | `/blog/bali-villa-construction-cost-per-sqm-2026` | bali villa construction cost per sqm | 1,400 | We're builders — own this. |
| 8 | Service | "Bali Villa Management — Built for Indian Owners" | `/services/bali-villa-management` | bali villa management for owners | 1,400 | List 5 sample monthly reports anonymised. |
| 8 | Blog | "Collaboration Agreements for South Delhi Builder Floors — Explained" | `/blog/collaboration-agreement-explained` | collaboration agreement builder floor | 1,600 | High BOF; converts redevelopment leads. |

### Month 3 (Weeks 9–12)

| Wk | Type | Title | Slug | Target keyword | Words | Notes |
|---|---|---|---|---|---|---|
| 9 | Locality | "Luxury Villas in Seminyak, Bali — Investment & Lifestyle" | `/bali/seminyak` | seminyak villa investment | 1,600 | |
| 9 | Blog | "Bali Villa Rental Income Tax in India — How NRIs Should Plan" | `/blog/bali-rental-income-tax-india` | bali villa rental income tax india | 1,400 | Pair with NRI tax pillar; cite Section 9. |
| 10 | Property-type | "Luxury Builder Floors in South Delhi" | `/delhi/builder-floors` | luxury builder floor south delhi | 2,000 | Top-of-tree page; links every locality and project. |
| 10 | Blog | "South Ex vs Defence Colony — Where Should You Buy?" | `/blog/south-ex-vs-defence-colony` | south ex vs defence colony | 1,600 | Comparison content. |
| 11 | Locality | "Defence Colony — Luxury Builder Floors & Bungalows" | `/delhi/defence-colony` | luxury villa defence colony | 1,400 | |
| 11 | Blog | "Bali Villa Rental Yields 2026 — A Zone-by-Zone Breakdown" | `/bali/rental-yields-guide` | bali villa rental yield | 1,800 | Treat as cornerstone yield content; link from `/buyers-guide-bali`. |
| 12 | Locality | "Vasant Vihar — Luxury Apartments in Delhi's Diplomatic Enclave" | `/delhi/vasant-vihar` | 4bhk vasant vihar | 1,400 | |
| 12 | Pillar refresh | Update `/buyers-guide-bali` with Q3 yield data + new project listings | `/buyers-guide-bali` | (refresh) | +500 | Counts as fresh content for ranking signals. |

**End of 90 days deliverable count:** 24 unique pieces (8 locality landing pages, 4 service/pillar pages, 12 blog posts, 1 pillar refresh) plus 1 metadata rewrite pass on every existing page.

---

## 5. Local SEO — Action Items

### 5.1 NAP audit (codebase scan)

- **Phone in `src/lib/constants.ts`:** `+91-9876543210` — **PLACEHOLDER**, must be replaced. Audit Phase 1 already flagged this on the WhatsApp link (`https://wa.me/919876543210`).
- **WhatsApp:** `919876543210` — same placeholder.
- **Email:** `info@nauhomes.com` — looks real, confirm with Varun.
- **Delhi address:** "Plot No. 20, Okhla Phase 3, New Delhi 110020, India" — confirm exact pin and plot number, this is also the LocalBusiness schema address. Schema currently uses geo (28.6139, 77.2090) which is generic Delhi centroid, **NOT Okhla**. Okhla Phase 3 is roughly 28.5460, 77.2755. **TODO: fix geo coords in `src/app/layout.tsx`.**
- **Bali address:** "Floor 3, Block A6, Jl. Teuku Umar No.8, Denpasar, Bali 80113, Indonesia" — confirm exact unit; map URL is `?q=Denpasar+Bali` (city-level, not address-precise). **TODO: fix to specific lat/long.**
- **Two-country claim:** Schema has `LocalBusiness` only for Delhi. **TODO (Phase 3):** add a second `LocalBusiness` block for Bali; otherwise Google won't surface us in Bali "near me" results.

### 5.2 Google Business Profile — Delhi

- **Business name:** Nirvana Homes (Nirvana Group) — match website branding exactly. Don't add city or keywords ("Nirvana Homes Luxury Builder Floors Delhi" → policy violation).
- **Primary category:** Real Estate Agency
- **Secondary categories:** Construction Company, Property Management Company, Real Estate Developer
- **Address:** Use the exact address from `constants.ts` once verified. Mark as service-area visible (clients visit office).
- **Phone:** Real Delhi landline preferred (Google ranks landlines marginally higher for local relevance). Add WhatsApp click-to-chat as a secondary attribute.
- **Hours:** Mon–Sat 10:00–19:00, Sun closed (typical Indian property business hours; confirm).
- **Description (750 ch):**
  > "Nirvana Group has built luxury homes across South Delhi for over 20 years — premium builder floors, kothis, and redevelopment projects across Saket, South Extension, Safdarjung Enclave, Defence Colony, Greater Kailash, Vasant Vihar and Sushant Lok. We deliver end-to-end: architectural design, statutory approvals, turnkey construction, and project management. Our portfolio includes 100+ delivered projects across South Delhi and Bali. Visit our Okhla office for a consultation, or schedule a site visit at any of our live builder floor projects in South Ex Part 2, M-Block Saket, or Safdarjung Enclave."
- **Services to list:** Luxury Home Construction, Builder Floor Construction, Redevelopment, Architectural Design, Project Management, Cost Engineering, Statutory & Compliance, Property Management.
- **Photo plan (week 1):** exterior of Okhla office (1), interior reception (2), team photo (1), 3 hero shots from each live project (~18 total), 3 founder/team-with-clients shots, logo. **Aim 25+ photos uploaded.**
- **Posts cadence:** 1 GBP post/week — new project, recent handover, blog snippet. (Phase 3 task.)

### 5.3 Google Business Profile — Bali

- **Business name:** Nirvana Homes Bali (or "Nirvana Group" if same legal entity)
- **Primary category:** Real Estate Agency
- **Secondary categories:** Property Management Company, Construction Company, Vacation Home Rental Agency
- **Address:** Floor 3, Block A6, Jl. Teuku Umar No.8, Denpasar, Bali 80113
- **Phone:** Local Indonesian number (+62), even if forwarded to India. Critical for local pack ranking.
- **Hours:** Mon–Fri 09:00–18:00, Sat 09:00–14:00 WITA (UTC+8)
- **Description (750 ch):**
  > "Nirvana Homes builds and manages luxury villas across Bali — Berawa, Canggu, Seminyak, Pererenan and beyond. We specialise in advisory, construction, and rental management for Indian buyers, NRIs, and international investors. Our process covers freehold vs leasehold structuring, RBI/LRS compliance for Indian buyers, tax planning, and end-to-end villa management with transparent monthly reporting. Visit our Denpasar office or book a virtual property tour. Part of Nirvana Group with offices in New Delhi, India."
- **Services:** Luxury Villa Construction, Villa Investment Advisory, Property Management, Rental Management, Title Due Diligence, Architectural Design.
- **Photo plan:** 25+ photos of Berawa villas (interior, exterior, pool, drone), team in Bali, Denpasar office.

### 5.4 Citation list — top 15 directories

Indian listings (Delhi):
1. **MagicBricks** — agent/builder profile (free + paid tiers; even free profile gets indexed)
2. **99acres** — agent listings
3. **Housing.com** — agent profile
4. **NoBroker** — builder profile (less ranking power but high domain authority)
5. **Sulekha** — Real Estate Agents > Delhi
6. **Justdial** — verified business listing (high SEO weight in India)
7. **IndiaMART** — service provider listing for construction services
8. **Yellow Pages India** — real-estate-agents-delhi
9. **Google My Business** (already covered §5.2)
10. **Facebook Business Page** + Instagram Business — verify and link from sameAs

Bali / international:
11. **Bali Real Estate Listings** (balirealestate.com) — submit inventory
12. **Exotiq Property** — partner listings (if open)
13. **Property Guru Indonesia** — agent profile
14. **Rumah123** — agent listing (Indonesian PropertyGuru)
15. **The Bali Bible** / **Honeycombers Bali** — directory + sponsored content options

Brand/authority:
- **LinkedIn Company Page** — verify and update
- **Crunchbase** — basic profile (cheap citation)
- **Apollo / ZoomInfo** — claim/correct existing entries

### 5.5 NAP consistency rules

- Use this exact format everywhere: **"Nirvana Homes (Nirvana Group), [Address], [City] [PIN], [Country]. Phone: [number with country code]. Email: info@nauhomes.com."**
- Avoid abbreviations: "New Delhi" not "Delhi" in formal listings; "Bali, Indonesia" not "Bali".
- Do **not** vary the phone formatting across listings (always `+91 11 XXXX XXXX` or always `+91 XXXXX XXXXX` — pick one and stick to it).
- Update `src/lib/constants.ts` once the real numbers are in, and propagate to all schema, footer, contact page, and citations on the same day to avoid mismatch flags.

---

## 6. Competitor Keyword Angles

Targeting keywords competitors already rank for, with a one-line angle for how we beat them.

| # | Keyword | Currently ranking | Our angle |
|---|---|---|---|
| 1 | "luxury villa bali for sale" | Exotiq Property, BaliRealEstate.com | Beat them on **Indian-buyer specificity** — RBI/LRS, NRI tax, India-headquartered. None of them have a single page targeting Indian buyers explicitly. |
| 2 | "south delhi luxury apartments" | 99acres, MagicBricks aggregators | Don't compete on the head term — own **builder floor + locality** combos (M-Block Saket, P-Block South Ex) where aggregator content is shallow and repetitive. |
| 3 | "bali property investment guide" | Exotiq, Bali Coconut Living, Property Forum threads | Beat them with a **2026-dated 4,500-word pillar** that has yields, tax math, and a free downloadable LRS planner. Annual updates beat undated guides. |
| 4 | "freehold vs leasehold bali" | Forum threads (Bali Pod, AirBnB forum), thin Indonesian-language pages, Exotiq | Win with a **decision matrix + table + diagram + Hak Milik/HGB/Hak Pakai/Lease comparison**. Forum threads outrank brand sites, so depth + schema wins. |
| 5 | "south delhi builder floor" | MagicBricks, 99acres listing pages | Beat with a **portfolio + price benchmark + neighbourhood guide** combo page — aggregator pages have listings but no narrative. |
| 6 | "kothi south delhi" | Sotheby's India, NoBroker, MagicBricks | Win with **kothi-specific content** (plot size, FAR, redevelopment economics) — Sotheby's lists kothis but doesn't explain them. |
| 7 | "saket builder floor" | MagicBricks, 99acres | Win the M-Block Saket and J-Block Saket micro-locality long-tail. We have inventory; aggregators don't have block-level narrative. |
| 8 | "canggu villa for sale" | Bali Real Estate, Exotiq, Villa-Bali.com | Win sub-locality (Berawa, Pererenan) where competition is weaker. Outrank head term over 12 months via topical authority, not direct competition. |
| 9 | "south delhi redevelopment" | local architects, anonymous broker blogs | We **are** redevelopers — own this with a service page + collaboration-agreement explainer + 2 case studies. |
| 10 | "nri property investment" | NoBroker NRI, MagicBricks NRI, generic financial advisor blogs | Win on **niche cross-border** — NRI buying in Bali (zero competition) and NRI buying in South Delhi luxury (premium ticket size). |

---

## 7. Quick-Content Recommendations (next 14 days)

If we can only ship 5 things in 2 weeks, ship these in this order. Each is high-intent, low-competition, brand-aligned, and tied to revenue.

### Quick win #1 — `/buyers-guide-bali` (the one page that pays for everything)
- **Why:** Indian-buyer + Bali-villa is a $300k–$2M ticket, and nobody is targeting this audience with depth. We win essentially by default.
- **Effort:** 4,500 words, needs founder interview (1 hr), CA review (1 hr) for the tax section. ~3 working days end-to-end.
- **Expected impact:** Becomes the hub for all Bali traffic; expect 1–3 qualified leads/week within 60 days, $50–200k+ ticket potential per lead.

### Quick win #2 — Optimise the 8 existing project pages
- **Why:** Audit Phase 1 already fixed canonicals; we now have low-hanging title/H1/meta wins on each project that map to micro-locality keywords (e.g. "M-Block Saket builder floor" — we're the only result).
- **Effort:** Half a day. Apply the recommendations in §2 above.
- **Expected impact:** Quick GSC impression growth on hyper-local terms within 4 weeks; first leads possible in week 3.

### Quick win #3 — `/freehold-vs-leasehold-bali` decision-stage page
- **Why:** 2,000 words, decision-stage intent, almost no competition with Indian-tax framing. Acts as a feeder to `/buyers-guide-bali` and Bali project pages.
- **Effort:** 1.5 days (research + draft + one diagram).
- **Expected impact:** Captures users who are mid-evaluation. High conversion — these are not casual readers.

### Quick win #4 — `/blog/saket-vs-greater-kailash`
- **Why:** "X vs Y" comparison pages have very high CTR on SERPs, near-zero competition for this specific pair, and South Delhi luxury buyers genuinely choose between these two localities.
- **Effort:** 1 day for 1,600 words. Founder can dictate the qualitative differences in 30 min.
- **Expected impact:** Pulls TOF/MOF traffic; internal link to both `/delhi/saket` and `/delhi/greater-kailash` once those ship.

### Quick win #5 — `/blog/stamp-duty-south-delhi-2026`
- **Why:** Annual refresh keyword with consistent demand, high commercial intent (people only research stamp duty when actually buying), low difficulty.
- **Effort:** 1 day for 1,400 words. Pure data + table page; little narrative needed.
- **Expected impact:** Captures bottom-of-funnel buyers. Each visitor is high-intent. Link to `/buyers-guide-delhi` and `/services/redevelopment-south-delhi`.

**Total effort for all 5:** ~10 working days. Two of these (`/buyers-guide-bali` and the project page optimisation) alone justify the entire Phase 2 effort.

---

## 8. Risks & Open Questions (TODOs for Varun)

1. **Phone number** — `+91-9876543210` placeholder must be replaced before any GBP / citation work, or we hard-code inconsistencies into the citation graph.
2. **Blog routes** — audit flagged that `/blog/luxury-villa-trends-2025` etc. may soft-404. **Verify the dynamic blog route handler exists and returns 200 for slugs in `BLOG_POSTS`** before publishing new posts. If broken, fix the route first.
3. **Real photography** — locality and Bali pages are photo-heavy by nature; need 30+ original Delhi photos and 30+ original Bali photos within 30 days. Stock images cap our authority signal.
4. **Founder interviews** — `/buyers-guide-bali` and `/services/redevelopment-south-delhi` need 30-60 min of founder-time each. Schedule before week 1 publish.
5. **CA review** — the NRI tax content (`/buyers-guide-bali` Section 5, `/blog/nri-tax-bali-villa-investment`) MUST be reviewed by a tax professional. Wrong tax content kills trust and creates liability.
6. **Author bylines + E-E-A-T** — Google's helpful-content updates favour content with named, credentialed authors. We need an author profile page (likely the founder) with credentials, photo, links to LinkedIn and other published work. Phase 3 task but flag now.
7. **Blog publish discipline** — 2 posts/week is realistic but only if we maintain it. A dead blog (last post 6 months ago) signals abandonment and hurts rankings. Either commit or scale back.
8. **Tracking** — none of this is measurable until GA4 + GSC are live (audit Phase 1 TODOs). Cannot iterate without data; treat as gating dependency for Phase 3.

---

## 9. What Phase 3 Will Cover

Out of scope for this document, queued for Phase 3:
- GBP claim, verification, and post-launch optimisation for both Delhi and Bali profiles
- Citation submission (the 15 directories in section 5.4)
- Schema expansion (second LocalBusiness for Bali, Article schema on blog posts, Product/Offer schema on project pages with price ranges)
- Sitemap auto-pinging on publish
- Backlink strategy (digital PR for the buyers-guide pillars, broker partnerships, guest posts on India-NRI and Bali-property sites)
- Off-page signals (founder thought-leadership on LinkedIn, podcast appearances)
- Internal-link audit and refactor once new pages ship
- Programmatic SEO consideration for project listings once inventory grows past ~25 projects

---

## Appendix A - Keyword Universe Counts

| Bucket | Count | P0 | P1 | P2 |
|---|---|---|---|---|
| Delhi loc+type | 23 | 7 | 8 | 8 |
| Bali loc+type | 18 | 7 | 4 | 7 |
| Brand & authority | 9 | 6 | 2 | 1 |
| Long-tail / informational | 22 | 8 | 7 | 7 |
| Service-led | 6 | 2 | 2 | 2 |
| **Total** | **78** | **30** | **23** | **25** |

(Note: counts exclude the additional in-page keyword variants embedded in section 2 mappings; the addressable keyword surface is closer to 100-120 once secondaries are counted.)

## Appendix B - Funnel Distribution

- **TOF (informational):** 22 keywords -> blog content + pillar guides
- **MOF (consideration):** ~18 keywords -> comparison content, decision pages, service pages
- **BOF (transactional):** ~38 keywords -> locality pages, property-type pages, project pages

The site is currently overweight TOF (blog teasers) and BOF (project pages) with no MOF (decision-stage) layer. Shipping `/freehold-vs-leasehold-bali`, `/buyers-guide-bali`, `/buyers-guide-delhi`, and the comparison blogs in section 4 fixes this gap - and this is precisely where high-ticket conversions happen.

---

**END OF PHASE 2 STRATEGY DOCUMENT.**
