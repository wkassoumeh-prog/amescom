# Amescom website — backlog

Stages follow `planning/amescom/05-Cursor-Prompts.md` (individual prompts in `planning/amescom/prompts/`). Run one stage per turn and review before continuing. Each stage ends by updating `STATUS.md`.

Legend: `[x]` done, `[ ]` to do, **(dep)** depends on an owner decision or asset.

## Stage 0 — Project context (Prompt 0)

- [x] Read planning pack and inspect workspace, tooling and repository instructions
- [x] `PROJECT.md`: goal, audiences, scope, source register, route map, requirement IDs
- [x] `DECISIONS.md`: confirmed decisions, provisional defaults, stack rationale, conflicts
- [x] `BACKLOG.md`, `STATUS.md`

## Stage 1 — Content and claim model (Prompt 1) — FR-08, FR-09, FR-10

- [x] Content structure for company details, products, sectors, navigation, form labels, metadata
- [x] Stable product IDs: `archive`, `workflow`, `clinical-pro`, `frona-oprisk`
- [x] Arabic text in content files, separate from components; locale-keyed for later English
- [x] Claim register C01–C15 as data: evidence reference, approval state, product/version scope
- [x] Exclude disputed claims (80%, sub-second search, certification, absolute security) from public content
- [x] FRONA kept in held/preview state (name approved; availability open)
- [x] Media inventory: real UI vs illustration, usage rights, alt text, publication status
- [x] Private tracker of missing privacy-policy inputs; source privacy template not published
- [x] Arabic review for extraction damage and naming consistency
- Remaining deps moved to later stages: Q21 company details; Q04/Q18 FRONA availability; Q06 brand kit

## Stage 2 — Foundation and design system (Prompt 2) — NFR-01, NFR-02, NFR-06, FR-08

- [x] Initialize project with verified, pinned supported versions (P-07): Next.js 16.4.5, React 19.3.1, TypeScript 5.9.3
- [x] Design tokens, licensed Arabic font loading, typography, containers, spacing
- [x] Links, buttons, accessible form primitives
- [x] Header (Products, Sectors, Help, Contact us), mobile navigation, footer
- [x] `lang`/`dir`, logical CSS properties, LTR isolation for email/phone/codes
- [x] Skip link, visible focus, keyboard menus, Escape/close, reduced motion
- [x] Private design preview at `/ar/design-preview`; checks at 360/768/1280/1440; `next build` and `tsc` pass
- Remaining: Q06 original logo kit (temporary Amescom text wordmark in use)

## Stage 3 — Homepage and company pages (Prompt 3) — FR-01, FR-04 (presentation)

- [x] Homepage in blueprint order; Contact us primary, Explore products secondary
- [x] About with services section (founding year 2004 withheld)
- [x] Contact page presentation, preview-only submission (no fake success)
- [x] Context carried to `/ar/contact` from product/sector links
- [x] Page metadata; draft destinations so navigation is not a dead end; no source placeholders
- Remaining deps: C01 founding year; Q21 contact details; Q22 active services

## Stage 4 — Product pages (Prompt 4) — FR-02

- [x] Products overview and shared product-detail template
- [x] ARCHIVE, Workflow, Clinical PRO pages; private FRONA draft
- [x] Build-time approval gating for pages, metadata and sitemap
- [x] Responsive original diagrams with alt text; illustrations labelled; no fabricated screenshots
- [x] Downloads omitted until publication rights are confirmed
- Remaining deps: Q04, Q07, Q11–Q19, Q23, Q25

## Stage 5 — Sectors, help and careers (Prompt 5) — FR-03, FR-05, FR-06

- [x] Sectors overview and four distinct sector pages with reviewed product mapping
- [x] Help hub with support, feature request, issue report routes
- [x] Careers: genuine vacancies or confirmed general application only; minimal fields
- Remaining deps: Q20, Q27, Q29

## Stage 6 — Forms and operational services (Prompt 6) — FR-04 to FR-07, NFR-05

- [x] Server-side adapter; `.env.example` with names only; local mock mode
- [x] Validation, length limits, spam/rate controls, pending/duplicate protection, accessible errors
- [x] Success only after confirmed mock acceptance; production disabled if no destination
- [x] Attachments remain disabled (FR-07 controls not configured)
- [x] Tests with synthetic data and local destinations
- **(dep)** Q09, Q26, Q28, Q30; hosting Q08 — still required for live send

## Stage 7 — Accessibility, metadata and privacy (Prompt 7) — NFR-01 to NFR-05, FR-08, FR-10

- [x] Titles/descriptions, canonical, robots, sitemap, truthful structured data; no hreflang (English unpublished)
- [x] Legacy redirects skipped — no approved list (Q34)
- [x] Privacy remains held; launch blocker LB-privacy recorded; source template not published
- [x] Accessibility audit (axe + manual), performance notes, lab conditions recorded
- **(dep)** Q31, Q32, Q34 — still blocking public launch and indexing

## Stage 8 — Release verification and handoff (Prompt 8)

- [x] Production build and tests; critical journeys verified
- [x] Search for draft markers, placeholders, FRONA leaks, unsupported claims, secrets, mock-success paths
- [x] `RELEASE-CHECKLIST.md` and `HANDOFF.md`
- [x] Production deployment decision requested from owner (no automatic deploy)
- **(dep)** Q10, Q35; production domain and host — still open; site is **not** launch-ready

## Later / optional (not scheduled)

English `/en`, CMS, knowledge base, live chat, analytics, CRM automation, online booking, separate services page.
