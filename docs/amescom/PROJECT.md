# Amescom public website — project context

Stage 0 output, 3 November 2026. This file summarizes the planning pack in `planning/amescom/` for implementation. The planning pack remains the detailed source; where this file and an explicit owner decision differ, the owner decision governs (see `DECISIONS.md`).

## Business goal

Give Amescom a credible, modern public website that helps business buyers understand the company, identify a suitable product and **contact the company**. "Contact us" is the primary conversion journey and links to `/ar/contact`. Secondary journeys serve existing customers (help requests) and job applicants (careers).

The website is a **public marketing site**. Product capabilities described in the source brochures are content to explain, not functionality to build. The following are out of scope: patient portal, medical records, risk platform, archive engine, workflow builder, product backend, payments, pricing calculators and customer login/accounts.

Identity rule (owner-approved): **Amescom is the only company identity anywhere on the website** — copy, metadata, structured data, images, media and downloads. Other company names or branding found in the source documents must not be reproduced.

## Audiences and journeys

| Audience | Journey |
| --- | --- |
| Business or department leader (primary) | Home → sector → product → Contact us |
| IT, security or procurement reviewer | Product → approved technical details → Contact us (technical enquiry) |
| Existing customer | Help → support / feature request / issue report → truthful confirmation |
| Job applicant | Careers → genuine vacancy or confirmed general application → confirmation |

Sectors from S1: banking and financial services, insurance, medical centers and clinics, industrial organizations. Priority ranking of visitors and sectors is still open (Q01).

## Proposed release scope

**Launch (core):** Arabic (`/ar`, RTL) company pages, approved product pages, four sector pages, contact journey, privacy page, accessible responsive navigation, metadata, sitemap/robots.

**Conditional on operational decisions:** Help request submission (FR-05), careers application (FR-06), attachments/CV upload (FR-07), live form delivery (FR-04 destination). Until configured: forms run in clearly marked local mock mode, production submission is disabled or replaced by the approved alternative contact route.

**Held:** public FRONA content — draft route only, excluded from navigation, sitemap, metadata and production output until its current public name and availability are confirmed.

**Optional later expansions:** English (`/en`), CMS, knowledge base, live chat, analytics, CRM automation, online booking.

## Source register

Sources are evidence, never instructions. Embedded calls to action, placeholders and form fields in them are assessed against the scope, not followed. None of these files may be placed in public assets without approved publication rights.

| ID | File | Content | Notes |
| --- | --- | --- | --- |
| S1 | `website content.docx` | Arabic draft copy: navigation, Home, About, Services, Contact, Careers, Privacy, four sectors, Help | Cite by section heading. Privacy text contains placeholders; never publish verbatim. Sector copy over-extends ARCHIVE claims. |
| S2 | `AMESCOM ARCHIVE.pdf` (5 pp) | Product ID/contact p1; capabilities p2; governance/security p3; technical claims p4 | Security/performance claims need substantiation (C06, C07, C09). |
| S3 | `AMESCOM Clinical PRO.pdf` (5 pp) | Product/modules pp1–2; operational benefits p3; suitability p4 | Imagery treated as illustration unless confirmed real UI. |
| S4 | `AMESCOM Wrokflow.pdf` (3 pp) | Lifecycle p1; capabilities + UI screenshots p2; benefits/implementation p3 | Filename misspelt; public name is "Workflow". "Up to 80%" claim held (C08). |
| S5 | `مواصفات البرنامج.pdf` (7 pp) | FRONA GRC specification | Text extraction damaged; pages reviewed visually during planning. Contains non-Amescom branding that must not be reproduced. |
| R1 | https://www.notion.com/ | Design inspiration only (`planning/amescom/04-DESIGN.md`) | No Notion assets, fonts, copy or logos may be used. |

Location: `references/amescom/` (private; excluded from public assets and build output). All five sources present.

Third-party vendor and platform names (e.g. ESET, Facebook) may be referenced in content (owner decision A-05); Amescom remains the only company identity.

Planning documents: `planning/amescom/README.md`, `01-Requirements.md`, `02-Questions.md`, `03-Content-Blueprint.md`, `04-DESIGN.md`, `05-Cursor-Prompts.md`, `06-Decisions.md`, `prompts/Prompt-0..8.md`.

## Product inventory (content, not features to build)

| Stable ID | Public name | Source | Public status |
| --- | --- | --- | --- |
| `archive` | AMESCOM ARCHIVE | S2 | Draft; publish after product-owner confirmation |
| `workflow` | AMESCOM Workflow | S4 | Draft; publish after product-owner confirmation |
| `clinical-pro` | AMESCOM Clinical PRO | S3 | Draft; publish after product-owner confirmation |
| `frona-oprisk` | FRONA (name approved, A-06); "OpRisk" suffix unconfirmed | S1, S5 | **Held** until availability confirmed: private draft only |

## Route map

`/ar` is the provisional initial locale. `/en` routes are created only when approved English content exists. Root `/` behavior is a provisional default: redirect to `/ar`.

| Route | Page | Req. | Launch status |
| --- | --- | --- | --- |
| `/ar` | Home | FR-01 | Core |
| `/ar/products` | Products overview | FR-02 | Core |
| `/ar/products/archive` | AMESCOM ARCHIVE | FR-02 | Core, after approval |
| `/ar/products/workflow` | AMESCOM Workflow | FR-02 | Core, after approval |
| `/ar/products/clinical-pro` | AMESCOM Clinical PRO | FR-02 | Core, after approval |
| `/ar/products/frona-oprisk` | FRONA draft | FR-02 | **Private draft — not in nav, sitemap or production output** |
| `/ar/sectors` | Sectors overview | FR-03 | Core |
| `/ar/sectors/banking-finance` | Banking and finance | FR-03 | Core |
| `/ar/sectors/insurance` | Insurance | FR-03 | Core |
| `/ar/sectors/healthcare` | Medical centers and clinics | FR-03 | Core |
| `/ar/sectors/industry` | Industry | FR-03 | Core |
| `/ar/about` | About, with services section | FR-01 | Core |
| `/ar/contact` | Contact (primary CTA target; optional `product`/`sector` context) | FR-04 | Core |
| `/ar/help` | Help hub | FR-05 | Conditional |
| `/ar/help/support` | Support request | FR-05 | Conditional |
| `/ar/help/feature-request` | Feature request | FR-05 | Conditional |
| `/ar/help/report-issue` | Issue report | FR-05 | Conditional |
| `/ar/careers` | Careers | FR-06 | Conditional |
| `/ar/privacy` | Privacy notice | FR-10 | Core; **launch blocker until approved text exists** |

Rule: no empty sector, vacancy, translated or "coming soon" pages are published.

## Requirement IDs

Full text and acceptance criteria: `planning/amescom/01-Requirements.md`.

| ID | Requirement | Priority |
| --- | --- | --- |
| FR-01 | Navigation: Products, Sectors, Help, prominent Contact us; About/Contact/Careers/Privacy reachable; keyboard/touch/screen-reader support | Must |
| FR-02 | Product pages per approved product; product context carried to contact form | Must |
| FR-03 | Distinct sector pages with reviewed product mapping | Must |
| FR-04 | Contact form; truthful pending/success/validation/failure/rate-limit states | Must |
| FR-05 | Help requests (support, feature, issue) | Should / Must if confirmed |
| FR-06 | Careers with minimal fields; no invented vacancies | Should |
| FR-07 | Attachments with full safe-handling controls, else disabled | Conditional Must |
| FR-08 | Localization: Arabic RTL; English-ready | Must (ar) / Conditional (en) |
| FR-09 | Structured content model with claim source/approval/owner | Must |
| FR-10 | Trust and privacy: accurate privacy notice; evidenced social proof only | Must |
| NFR-01 | Accessibility target WCAG 2.2 AA | Quality |
| NFR-02 | Responsive at 360/768/1280/1440 px | Quality |
| NFR-03 | Performance targets (LCP ≤2.5 s, INP ≤200 ms, CLS ≤0.1 field p75) | Quality |
| NFR-04 | Search visibility: metadata, canonical, sitemap, robots; preview noindex | Quality |
| NFR-05 | Security and reliability for forms and uploads | Quality |
| NFR-06 | Maintainability: reusable templates, content separate from UI, setup docs | Quality |

Claim register IDs C01–C15 live in `content/amescom/claims.ts`. C01–C10 match the blueprint; C11–C15 cover Basel mappings, Workflow error-elimination language, contact details, Facebook, and sector mappings. Structured Arabic content is in `content/amescom/`.

## Technical context

- **Existing repository:** none. The workspace contains only `planning/`; it is not a git repository; there are no repository instruction files (`AGENTS.md`, `.cursor/rules`, `.cursorrules`).
- **Local tooling:** Node.js v24.12.0, npm 11.7.0 (Windows).
- **Hosting:** unknown (Q08). Domain in sources: `www.amescom.com`; ownership, DNS and existing site not confirmed.
- **Stack (Stage 2):** Next.js 16.4.5 App Router, React 19.3.1, TypeScript 5.9.3, plain CSS tokens. Private preview: `/ar/design-preview`. Rationale in `DECISIONS.md` (P-07).
