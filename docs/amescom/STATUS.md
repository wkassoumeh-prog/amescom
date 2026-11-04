# Amescom website — status

Last updated: 3 November 2026, end of Stage 8.

**Current stage:** Stage 8 complete (verification and handoff). The website is **not** production-complete. **No further prompt in the pack.** Owner production-deploy decision: **requested, not authorized, not performed.**

## Completed in Stage 0

- Read `planning/amescom/README.md`, `01-Requirements.md`, `02-Questions.md`, `06-Decisions.md`, and for stage planning `03-Content-Blueprint.md`, `04-DESIGN.md`, `05-Cursor-Prompts.md`.
- Inspected the workspace: only `planning/` exists; no application code, package manifest, git repository or repository instruction files. Local tooling: Node.js v24.12.0, npm 11.7.0.
- Searched `Documents`, `Downloads` and `Desktop` (3 levels deep) for the five source files: **not found**.
- Created `docs/amescom/PROJECT.md`, `DECISIONS.md`, `BACKLOG.md`, `STATUS.md`. No pages implemented; planning pack left unchanged.
- Recorded approved decisions A-01 to A-04, provisional defaults P-01 to P-13, proposed stack (P-07: Next.js App Router + TypeScript, plain CSS tokens, typed local content), and conflicts K-01 to K-09.

## Updates after Stage 0 (3 Nov 2026)

- All five sources S1–S5 placed in `references/amescom/` (private reference folder); resolves K-03.
- Owner decision A-05: third-party vendor/platform names (ESET, Facebook, integration systems) may appear; resolves K-01.

- Owner decision A-06: "FRONA" is the application's name and may be mentioned.

## Completed in Stage 1

- Read S1 (DOCX text) and visually reviewed S2–S5 page images. S5 Arabic text extraction is damaged; copy was taken from the pages, not the garbled extract. S5 branding (non-Amescom logo and footer) is inventoried as do-not-publish (M12).
- Created typed content under `content/amescom/`: company, home, about, navigation, forms, metadata, products, sectors, claims, media, privacy gaps.
- Locale is `ar` only. No English strings. Production helpers omit anything not `publication.status === "public"`.
- Claims C06–C09, C11–C12 are `held-omit` (certification/AES/TLS/ABAC/immutable logs, sub-second search, 80%, historical OCR, Basel, error-elimination).
- FRONA drafted from S5 as an Amescom product (A-06); `publication.status = held` until availability (and optional "OpRisk" suffix) is confirmed.
- Careers has no invented vacancies; date of birth omitted; uploads disabled. Privacy page held until Q31.

## Content review (short)

- **Coherent drafts:** ARCHIVE, Workflow, Clinical PRO, FRONA each have audience, problem, feature groups scoped to their own source.
- **Sectors:** healthcare leads with Clinical PRO; ARCHIVE OCR/security is not copied onto other products. Use cases marked proposed except Clinical operations.
- **Arabic issues in sources:** S1 splits «أمان»; mixes «الايميل» / «البريد الإلكتروني»; nav uses WORKFLOW / FRONA OpRisk / Clinical PRO. Public copy standardizes Amescom / أميسكوم, AMESCOM Workflow, FRONA, البريد الإلكتروني.
- **Media:** only Workflow p2 looks like real UI (M07, M08) — held pending sanitized originals. Covers are illustrations. No PDFs published.
- **Not blocking Prompt 2:** Q06 logo kit (temporary wordmark allowed). Q21 founding year/contact confirmation needed before About/footer go public, not before the design preview.

## Completed in Stage 2

- Scaffolded Next.js App Router (16.4.5) + React 19.3.1 + TypeScript 5.9.3 with plain CSS tokens. No Tailwind.
- Fonts: Noto Sans Arabic and Inter self-hosted via `next/font/google`. Temporary Amescom/أميسكوم text wordmark (Q06 still open).
- Locale routing: `/` → `/ar` → `/ar/design-preview`. `lang="ar"` `dir="rtl"`. No English switch. Site is `noindex`.
- Shared chrome: skip link, header (Products/Sectors disclosures, Help, Contact us), mobile menu, footer. Keyboard: disclosure click/focus, Escape closes menus. FRONA excluded from navigation.
- Form primitives with persistent labels, optional/required, LTR isolation for email/phone/product names, visible focus, reduced motion.
- `npx tsc --noEmit`, `npx eslint src content/amescom`, and `npx next build` all pass.
- Layout checks: no `documentElement` horizontal overflow at 360, 768, 1280, 1440 CSS pixels. Mobile uses a hamburger at <768px. Screenshots in `docs/amescom/previews/` (browser view crops RTL inline-start; measurements are the overflow evidence).

## Completed in Stage 3

- Replaced the `/ar` design-preview redirect with the marketing homepage. `/ar/design-preview` remains a private chrome preview, not the homepage.
- Homepage sequence: hero, product overview, sector entry points, company strengths, services summary, engagement introduction, closing CTA. Primary action is Contact us (`/ar/contact`); secondary is Explore products (`/ar/products`).
- About (`/ar/about`) with mission, vision, and concise services. Founding year 2004 withheld (C01 unapproved). No invented bios, stats, logos, or addresses.
- Contact (`/ar/contact`) is presentation-only. Submit is blocked in preview with an explicit non-success status. Product/sector query context is preserved (`?product=archive`).
- Hero uses an original explanatory SVG, not unapproved brochure crops. FRONA is omitted from homepage, nav, About, and sector summaries. Unsupported proof claims stay out of public view.
- Draft destinations for products, sectors, help, careers, and privacy so navigation is not a dead end. Product/sector pages remain thin drafts for Prompt 4/5. FRONA is reachable only by direct URL (`/ar/products/frona-oprisk`), not from public lists.
- Page titles use absolute metadata (no doubled “أميسكوم”). `npx next build` produced 24 static pages; contact stays dynamic because of `searchParams`.
- Visual checks: homepage composition at 1280 and 360; About at 360; no `documentElement` overflow at those widths. Contact submit verified: preview-blocked copy, no fake “sent” success, field values kept. Screenshots: `docs/amescom/previews/home-1280.png`, `home-360.png` (browser view crops RTL inline-start; measurements are the overflow evidence).

## Completed in Stage 4

- Products overview at `/ar/products` lists ARCHIVE, Workflow and Clinical PRO with distinct jobs and audiences. FRONA is not listed.
- Shared product-detail template: name, outcome, audience, problem, source-scoped feature groups, original labelled diagram, proposed sector links, product-specific Contact us (`?product=`). Technical and download sections stay empty until confirmed facts/rights exist.
- ARCHIVE: capture/OCR, organization/versions, search, permissions/audit. Workflow: routing/approvals/branching, notifications, reports, generic integrations. Clinical PRO: reception, clinics, lab, imaging, management reports. FRONA draft: risk modules; name FRONA only (no OpRisk suffix); no S5 branding and no Basel wording.
- Approval flags read at build/render. Default content mode is preview. `AMESCOM_CONTENT_MODE=production` emits only `public` product routes. Held/disputed claims (`held-omit`) are not rendered. `/sitemap.xml` currently emits no URLs (no public pages), so FRONA does not appear there.
- Diagrams are original SVGs with captions stating they are not product UI. Brochure PDFs and unapproved screenshots are not published.
- `npx tsc --noEmit`, `npx eslint src content/amescom`, and `npx next build` pass. Preview static routes include the FRONA draft by direct URL only.
- Visual checks: ARCHIVE (shorter) at 1280 and 360; FRONA (longer) at 1280 and 360; Clinical PRO uniqueness spot-check. No `documentElement` overflow. Screenshots: `docs/amescom/previews/product-archive-1280.png`, `product-archive-360.png`, `product-frona-1280.png` (browser view crops RTL inline-start; measurements are the overflow evidence).

## Completed in Stage 5

- Sectors overview at `/ar/sectors` with four distinct pages. FRONA is omitted from sector copy and product mapping until availability is confirmed.
- Banking/finance: documents and approvals; no regulator approval claim. Insurance: policy/claim documents and review handoffs, not a full administration platform. Healthcare leads with Clinical PRO operations, then ARCHIVE/Workflow as proposed examples; no diagnostic claims and no patient records on the site. Industry: supplier contracts and purchase approvals; not MES/ERP.
- Use cases marked as product-sourced or explanatory examples. Sector Contact us carries `?sector=`.
- Help hub distinguishes support, feature request and issue report. Each type has its own route, copy, and preview-only form using shared field primitives, with request type locked from the route. No login, ticket tracking, helpdesk URL or promised response time. Attachments disabled.
- Careers shows no fictitious openings and no application form. Accepted field set is listed for later; date of birth omitted; CV upload unavailable; mailto for general enquiry.
- `npx tsc --noEmit`, `npx eslint src content/amescom`, and `npx next build` pass.
- Checks: healthcare and help at 1280 and 360 (no overflow); sectors disclosure opens and Escape closes it; help issue submit is preview-blocked with no fake success; contextual product/sector links present. Screenshots: `docs/amescom/previews/sector-healthcare-1280.png`, `sector-healthcare-360.png`, `help-360.png`.

## Preview routes

- Public-facing in this preview (still `noindex`): `/ar`, `/ar/about`, `/ar/contact`, `/ar/products` and approved product slugs, `/ar/sectors`, `/ar/sectors/banking-finance`, `/ar/sectors/insurance`, `/ar/sectors/healthcare`, `/ar/sectors/industry`, `/ar/help`, `/ar/help/support`, `/ar/help/feature-request`, `/ar/help/report-issue`, `/ar/careers`
- Held / not in nav, overview or sitemap: `/ar/products/frona-oprisk`; privacy remains held
- Chrome preview: `/ar/design-preview`

## Completed in Stage 6

- Contact and help forms post to a server-side adapter at `POST /api/enquiries`. No live email, CRM or helpdesk was invented (Q09 unanswered).
- Modes: `AMESCOM_FORM_MODE=mock|disabled`. Development defaults to mock; production (`NODE_ENV=production`) defaults to disabled. `.env.example` lists names and empty placeholders only.
- Mock adapter persists to gitignored `.data/enquiries.jsonl` (local test destination). Logs record kind, id and mode only — not names, emails or message bodies.
- Client/server validation, length limits, honeypot (`website`), in-memory rate limit (5/IP/60s) and duplicate hash (kind|email|message, 10 min). Attachments stay rejected until FR-07 controls exist.
- Pending submit disables the button. Values are kept on recoverable errors. Success copy is **local mock acceptance**, not “sent to Amescom”. Live success copy exists in content but is not shown. Mailto and phone remain the approved alternative contact.
- Careers still has no application form (no vacancies; general application unconfirmed).
- `npx tsc --noEmit`, `npx eslint src content/amescom`, `npx vitest run` (10 passed) and `npx next build` (includes `ƒ /api/enquiries`) pass.
- Browser: `/ar/contact` in mock accepted a synthetic enquiry (202) then duplicate (409) with truthful copy. `/ar/help/support` shows mock notice, locked request type, and attachments disabled.

### Live vs simulated vs blocked

| State | What |
| --- | --- |
| **Live (this preview)** | Route, validation, spam/rate/duplicate controls, pending UI, localized errors, alternative mailto/phone. |
| **Simulated** | Mock acceptance only. Requests are stored locally for tests; they are not delivered to Amescom staff. |
| **Blocked** | Production submission (disabled until Q09 names a provider). Attachments/CV upload (FR-07). Careers form. Any real SMTP/CRM/helpdesk. FRONA publication. |

## Completed in Stage 7

- Localized titles and descriptions on included routes; canonical URLs from `AMESCOM_SITE_URL` or `https://www.amescom.com`; Open Graph locale `ar_SY`. No hreflang (English is not published).
- Preview stays **noindex/nofollow** (`robots.txt` disallows `/`, empty sitemap, `X-Robots-Tag`). Indexing requires production content mode, `AMESCOM_INDEXING=public`, **and** a public privacy notice — currently impossible because privacy is held.
- Truthful Organization JSON-LD (name, email, phone, Damascus). No founding year, Facebook, street address or FRONA. Listed products may emit SoftwareApplication JSON-LD; FRONA does not.
- No legacy redirects: Q34 supplied no URL list.
- Privacy route remains a held **non-policy** page: not the S1 template, no analytics/cookies, forms mock/disabled, uploads off. **Launch blocker LB-privacy (Q31).**
- No trackers (Q32 unanswered; P-09). Security headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`.
- Accessibility fixes: skip link, mobile menu focus into panel + Escape restore, route-change menu close, honeypot removed from the accessibility tree, 404 → homepage (not design-preview), heading scroll-margin, SVG dimensions/aspect-ratio, email/tel `spellCheck={false}`.
- `npx tsc --noEmit`, `npx eslint src content/amescom`, `npx vitest run` (19 passed) and `npx next build` pass.

### Accessibility and layout checks

- axe-core 4.10.3 on `/ar`: no page violations (the only region hit was the audit browser overlay). Heading order h1→h2→h3. Landmarks: skip, header, main, footer navs.
- Keyboard: skip link focuses; mobile menu opens with focus on the first item; Escape closes and returns focus to the menu button. No FRONA in the menu.
- Overflow: `documentElement.scrollWidth === clientWidth` at 360, 768, 1280, 1440 CSS px, and a 640 CSS px / DPR 2 proxy for 200% of 1280. `dir="rtl"` `lang="ar"`. Zoom is not restricted (`viewport` width/device-width, initial-scale 1).
- Honeypot is `display: none` (not a tab stop). Contact fields keep visible labels.

### Performance lab (not field)

- Date: 3 November 2026. Local `next dev` (Next.js 16.4.5 Turbopack) on Windows, Cursor Chromium, unthrottled localhost. This is **not** a Lighthouse mobile profile and **not** field p75.
- Privacy page at 360 CSS px: TTFB ~210 ms, FCP ~1.25 s, `load` ~380 ms. LCP was not reported by the Performance API in that run.
- Optimizations: Inter latin `preload: false`; inline SVGs with width/height and aspect-ratio; no analytics JS. Field targets remain LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 when real traffic exists.

## Completed in Stage 8

- Release review against FR-01–FR-10 and NFR-01–NFR-06. Checklist: `docs/amescom/RELEASE-CHECKLIST.md`. Handoff: `docs/amescom/HANDOFF.md`.
- `npx tsc --noEmit`, `npx eslint src content/amescom`, `npx vitest run` (19 passed) and `npx next build` (18 static pages + dynamic contact/help/API) pass.
- Journeys verified on `http://localhost:3000`: home → Contact us; ARCHIVE → Contact us (`?product=archive`); healthcare → Clinical PRO → Contact us (`?product=clinical-pro`). Help types and careers checked. Sector CTA carries `?sector=healthcare`.
- Form API with synthetic data: validation 400, mock accept 202, duplicate 409, honeypot 400, multipart upload 400, help support 202. Pending button copy observed. Mock success is not live send.
- Leak search on public preview HTML: no FRONA, 80%, AES/ISO/Basel, 2004, Facebook URL, source placeholders, file inputs or secrets. FRONA draft route remains preview-only. No published downloads.
- Headers: `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `X-Robots-Tag: noindex, nofollow`. `robots.txt` Disallow `/`. Empty sitemap.
- RTL at 360 CSS px: `dir=rtl`, no `documentElement` overflow. Screenshots: `docs/amescom/previews/release-home-1280.png`, `release-home-360.png`, `release-healthcare-360.png` (browser view crops RTL inline-start).
- Production domain/host **not recorded as approved**. Redirects and analytics omitted (not selected).
- **Not launch-ready.** Launch blockers below remain. Production deployment was **not** performed.

## Launch blockers (still open)

| ID | Item | Effect |
| --- | --- | --- |
| **LB-privacy** | Q31: no approved privacy notice | Site stays private preview; indexing off; do not publish the source template |
| **LB-indexing** | Depends on LB-privacy | `robots.txt` disallow; empty sitemap |
| **LB-legacy** | Q34: no approved URL list | No redirects implemented |
| **LB-send** | Q09: no form destination | Production submit disabled (Stage 6) |
| **LB-uploads** | Q28 / FR-07 | Attachments remain unavailable |
| **LB-publication** | No routes marked `public` | `AMESCOM_CONTENT_MODE=production` would 404 product/sector details |

## Remaining dependencies

- Privacy text and ownership; tracking; legacy URLs (Q31, Q32, Q34) — **launch blockers**.
- Form destinations, upload handling, reliability (Q09, Q26–Q30); hosting (Q08).
- Owner must mark approved pages `public` before production content mode.
- FRONA availability and whether to use the "OpRisk" suffix (Q04, Q18).
- Language decision (Q03) — Arabic-first default applies.
- Company details: legal names, founding year 2004, email, phone, address, hours, social links (Q21).
- Brand kit: logo, colours, fonts (Q06).
- Approved claims, assets, screenshots, brochures (Q07, Q11–Q17, Q23, Q25).
- Launch constraints, approver, maintenance (Q10, Q35).
- Sector mapping confirmation (Q20); support model (Q27); recruitment (Q29).

## Recommendations after Stage 8

- Do **not** deploy publicly until LB-privacy and the other blockers are resolved.
- Confirm the form destination before enabling live send.
- Create a first git commit so a deploy is reviewable and rollback has a revision (files are staged; `main` has no commits and no remote).
- Supply the original Amescom logo to replace the temporary wordmark.
- When launching: keep `AMESCOM_INDEXING` off and `AMESCOM_FORM_MODE=disabled` until those gates are explicit owner decisions.
