# Amescom website — decision log

Implementation-side record. The owner-facing record remains `planning/amescom/06-Decisions.md`; copy accepted answers there and here. Question IDs (Qxx) refer to `planning/amescom/02-Questions.md`.

Status values: **approved** (explicit owner decision), **provisional** (default used until the owner answers), **proposed** (recommendation awaiting acceptance), **held** (deliberately not published), **open**.

## Confirmed owner decisions

| ID | Decision | Source | Questions |
| --- | --- | --- | --- |
| A-01 | **Amescom is the only company identity permitted anywhere on the website.** No other company names or branding from source documents in copy, metadata, structured data, media, alt text, filenames or downloads. | Owner (02-Questions Q02; Prompt 0) | Q02 |
| A-02 | **"Contact us" (اتصل بنا) is the primary action and links to `/ar/contact`.** It uses the contact form defined in FR-04; product/sector context may be carried as optional fields. | Owner (Q01, Q05; D01, D03; Prompt 0) | Q01, Q05 |
| A-03 | The website is a public marketing website with Contact us as its primary conversion journey. | Owner (D01) | Q01 |
| A-05 | **Third-party vendor, product and platform names may appear** (e.g. ESET, Facebook, integration systems) as references within Amescom's content. Amescom remains the sole company identity (A-01): no other company is presented as the site owner or content source, and S5's source branding stays excluded. Partner/reseller status, logos and badges still require confirmation (C10). | Owner, 3 Nov 2026 (resolves K-01) | Q21, Q22 |
| A-04 | FRONA public content is **held** pending availability (name resolved by A-06). Private draft route `/ar/products/frona-oprisk` may exist; it must not appear in navigation, sitemap, metadata or production output. | Owner (D04 partial; Prompt 0; updated Stage 1) | Q04, Q18 |
| A-06 | **"FRONA" is the application's name and may be mentioned on the website**, presented as an Amescom product. Name part of A-04 resolved. Still open: whether the public name includes the "OpRisk" suffix (S1) and whether the product is currently available — publication stays held until availability is confirmed. | Owner, 3 Nov 2026 | Q04, Q18 |

## Provisional defaults (apply only until the owner answers)

| ID | Default | Questions | Revisit when |
| --- | --- | --- | --- |
| P-01 | Arabic-first site: `/ar`, `lang="ar"`, `dir="rtl"`. | Q03 | Language decision |
| P-02 | English-ready content structure (locale-keyed content, locale segment in routes). No `/en` routes or language switch until approved English content exists. | Q03, Q24 | English approved |
| P-03 | No patient portal, product backend, payments or customer login. | Q09, Q27 | Never by default; separate project |
| P-04 | Root `/` redirects to `/ar`. | Q03, Q34 | Language / legacy URL decision |
| P-05 | Structured, version-controlled local content; no CMS at launch. (06-Decisions D06) | Q33 | Editor needs known |
| P-06 | Visual direction: spacious light design, dark type, restrained blue `#145DA0`, temporary text wordmark until the logo kit arrives. (D05, `04-DESIGN.md`) | Q06 | Brand kit supplied |
| P-07 | **Stack: Next.js (App Router) + TypeScript** — see rationale below. (D07) | Q08 | Hosting confirmed |
| P-08 | Omit unsupported quantitative/absolute claims and unverified certification language (C06–C09 held). (D09) | Q07, Q13, Q15 | Evidence supplied |
| P-09 | No analytics, advertising tags, newsletter or third-party embeds. (D10) | Q32 | Tracking decision |
| P-10 | Careers form minimal; no date of birth. (D11) | Q29 | Recruitment decision |
| P-11 | Contact required fields: name, company, email, message; phone optional. (FR-04) | Q26 | Sales confirms |
| P-12 | Forms: local mock mode in development; production submission disabled with the approved alternative contact until a destination is configured. Uploads unavailable until FR-07 controls exist. (D08) | Q09, Q27, Q28, Q30 | Destinations chosen |
| P-13 | Formal Modern Standard Arabic copy. | Q24 | Copy reviewer named |

## P-07 Stack choice and rationale

**Inspection result:** no existing code, package manifest, framework or git repository in the workspace; no repository instructions. Hosting is unknown (Q08). Local tooling is Node.js v24.12.0 and npm 11.7.0. There is therefore no existing stack to reuse.

**Proposal:** Next.js with the App Router and TypeScript, plain CSS with custom-property design tokens (CSS Modules or a single global token layer), typed local content files, no UI framework.

Rationale:

- **SEO-capable by default.** Pages are statically generated HTML with per-route metadata, `sitemap` and `robots` generation, canonical URLs — directly serves NFR-04.
- **Server code where forms need it.** Route handlers or server actions keep recipients and secrets server-side (FR-04, NFR-05) without a separate backend.
- **Locale routing.** A `[locale]` segment supports `/ar` now and `/en` later with no restructuring (FR-08, P-02).
- **Build-time publication gating.** Approval flags in typed content can exclude draft/held entries (FRONA) from pages, metadata and sitemaps at build time (FR-09, A-04).
- **Low dependency footprint.** Plain CSS with logical properties suits RTL and avoids a styling framework; TypeScript types enforce the content model.
- **Hosting flexibility.** Runs on any Node.js host or a managed Next.js platform. If the confirmed host can only serve static files, the site can use static export with forms posting to an approved external form endpoint — an acceptable fallback that keeps the same code base.

**Pinned in Stage 2** (3 Nov 2026, from npm and nextjs.org): Next.js 16.4.5, React 19.3.1, TypeScript 5.9.3. Node.js ≥20.9 (local is 24.12.0). Plain CSS custom properties; Noto Sans Arabic + Inter self-hosted via `next/font/google` (OFL / SIL, no runtime Google request). No Tailwind or UI kit.

Constraints recorded:

- Versions were verified against current official Next.js docs and npm on 3 Nov 2026.
- No hosting, email, form, storage or scanning service is purchased or account created. Deployment target is chosen after Q08.
- Recommend initializing a local git repository before Stage 2 so changes are reviewable (local only; no remote).

Alternative considered: a static site generator (e.g. Astro) with an external form service — lighter, but form handling, server-side validation and secret isolation then depend entirely on a third-party service that has not been selected. Revisit if hosting is static-only and no server code is permitted.

## Conflicts and inconsistencies found (not silently resolved)

| ID | Conflict | Effect / interim handling | Owner input |
| --- | --- | --- | --- |
| K-01 | **Third-party names vs A-01.** S1 Services names **ESET** (and firewall products); Workflow integrations refer to ERP/CRM/accounting systems; S1 gives a **Facebook** page link. A-01 forbids other company names "anywhere on the website". | Interim: describe services generically (e.g. "حلول الحماية من البرمجيات الخبيثة والجدران النارية") without the ESET name or logo; no vendor names for integrations; Facebook link held (a plain text link to Amescom's own page would not be other-company branding, but icon/name use needs confirmation). | **Resolved by A-05** (3 Nov 2026): vendor names allowed; partner status still unconfirmed. |
| K-02 | **FRONA name and attribution.** S1 says "FRONA OpRisk", S5 says "FRONA"; S5 carries non-Amescom branding. Whether "FRONA" is itself an Amescom-owned name is not established. | Name resolved by A-06 ("FRONA" approved). Draft slug `frona-oprisk` kept as stable ID. S5 source branding still excluded. | "OpRisk" suffix and availability open — Q04, Q18 (not blocking Stage 1). |
| K-03 | **Source files missing.** The register lists files at `C:/Users/wasim/Documents/Amescom/`, but they are not in the workspace. | Stage 1 can draft from the planning-pack summaries, but cannot verify claims or Arabic against the originals. | **Resolved** 3 Nov 2026: S1–S5 placed in `references/amescom/`. |
| K-04 | Homepage blueprint names "four approved product names" while FRONA is held. | Publish three products; FRONA phrase removed from hero (blueprint already supplies the alternative sentence). | None. |
| K-05 | Careers fields: S1 form (incl. date of birth) vs S1 Privacy (portfolio, LinkedIn, skills). | P-10 minimal set. | Q29 (later). |
| K-06 | S1 sector copy repeats ARCHIVE-specific OCR/security claims across all sectors and products. | Claims stay scoped to ARCHIVE (FR-03). | Q20 (later). |
| K-07 | Contact labels in the blueprint appear twice (with and without "product"). | Product is optional context, not a required field (A-02, FR-04). | None. |
| K-08 | `06-Decisions.md` intro says all entries are proposals, but D01/D03 are marked approved. | Explicit "approved by owner" status governs. | None. |
| K-09 | Help "Should" vs "Must if confirmed"; destination unknown. | Built as presentation; submission conditional (P-12). | Q09, Q27 (Stage 5–6). |

## Open questions by stage

Blocking items are in `STATUS.md`. Others, for later stages:

- **Stage 1 (content):** Q21 company details (legal names, address, hours, social links); Q24 copy reviewer; C01 founding year 2004 confirmation.
- **Stage 2 (foundation):** Q06 logo/colour/font kit (temporary wordmark allowed); Q08 hosting (not blocking a local preview).
- **Stage 3–4 (pages):** Q04 product status; Q07, Q23, Q25 approved assets, screenshots, brochures; Q11–Q17 product facts; Q19 commercial model; Q22 services.
- **Stage 5 (sectors/help/careers):** Q20 sector mapping; Q27 support model; Q29 recruitment.
- **Stage 6 (forms):** Q09 destinations; Q26 lead fields; Q28 uploads; Q30 reliability/monitoring.
- **Stage 7 (privacy/SEO):** Q31 privacy ownership/text — **LB-privacy launch blocker**; Q32 tracking (none added); Q34 legacy URLs/redirects (none supplied).
- **Stage 8 (handoff):** Q10 launch constraints/approver; Q35 maintenance and success measures; production domain/host.

## Record template

```
Decision ID:
Related questions / requirements:
Decision:
Owner:
Date:
Evidence or approved wording:
Impact:
Status: proposed / approved / superseded
```
