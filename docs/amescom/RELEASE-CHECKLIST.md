# Amescom website — release checklist

Reviewed: 3 November 2026 (Stage 8). Preview only. **Not approved for production launch.**

Environment: Windows, Node.js v24.12.0, Next.js 16.4.5, local `next dev` at `http://localhost:3000`. Production build and tests were run separately (`npx next build`, `npx vitest run`). No production host or DNS is configured (Q08 open). Documented origin in content is `https://www.amescom.com`; that origin is **not** confirmed as the live host.

Status values: **passed**, **failed**, **N/A**, **blocked**.

## Release verdict

| Gate | Result |
| --- | --- |
| Preview journeys and build | **Passed** for a private Arabic preview |
| Production site | **Blocked** — required launch gates are unresolved |
| Automatic deploy | **Not performed** — owner has not authorized production deployment |

A working local preview with mock forms is **not** a fully operational production site.

## Requirements

| ID | Result | Evidence |
| --- | --- | --- |
| **FR-01 Navigation** | **Passed** (preview) | Header: Products, Sectors, Help, prominent Contact us. Footer: About, Contact, Careers, Privacy. Keyboard disclosures and mobile hamburger (`فتح القائمة` at 360 CSS px). Skip link present. No dead published destinations. |
| **FR-02 Product pages** | **Passed** (preview); FRONA **held** | `/ar/products` lists ARCHIVE, Workflow, Clinical PRO only. Detail pages have distinct copy, original diagrams, sector links, Contact us with `?product=`. FRONA draft `/ar/products/frona-oprisk` returns 200 in preview only; absent from nav, homepage, JSON-LD and sitemap. No page is marked `public`, so `AMESCOM_CONTENT_MODE=production` would 404 product slugs until flags change. |
| **FR-03 Sector pages** | **Passed** (preview) | Four distinct sector pages. Healthcare leads with Clinical PRO; ARCHIVE OCR/security is not copied onto Clinical PRO. Use cases labelled as product-sourced or explanatory. Sector Contact us uses `?sector=healthcare`. |
| **FR-04 Contact form** | **Blocked** (LB-send / Q09) | Route, validation, pending UI, mock acceptance and mailto/phone **passed**. Production default is `disabled`. Mock copy is honest (“لم يُرسل إلى أميسكوم”). Live “sent to Amescom” copy exists in content but is not shown. |
| **FR-05 Help requests** | **Passed** (presentation); **blocked** (live destination) | Hub plus `/ar/help/support`, `/feature-request`, `/report-issue`. Request type locked from the route. No SLA, login or helpdesk URL. Same mock/disabled adapter as contact. |
| **FR-06 Careers** | **Passed** | `/ar/careers` shows no vacancies and **no application form**. Date of birth not requested. CV upload unavailable. Mailto for general enquiry. |
| **FR-07 Attachments** | **Blocked** (LB-uploads / Q28) | No file inputs. Multipart POST to `/api/enquiries` returns `attachments-disabled` (400). Alternative: email after coordination. |
| **FR-08 Localization** | **Passed** (ar); **N/A** (en) | `lang="ar"` `dir="rtl"`. Logical CSS. LTR isolation for email/phone/product names. No `/en` routes or hreflang (Q03 unanswered). |
| **FR-09 Content model** | **Passed** | Typed content in `content/amescom/`. Claims, media and publication flags are data. Production helpers omit non-`public` items. |
| **FR-10 Trust and privacy** | **Blocked** (LB-privacy / Q31) | Privacy route is a held non-policy page. Source template is not published. No testimonials, logos, badges or case-study figures. Founding year 2004 withheld. |
| **NFR-01 Accessibility** | **Passed** with residual | Stage 7 axe-core 4.10.3 on `/ar`: no page violations. Skip link, landmarks, visible labels, reduced motion. Residual: honeypot label “Leave blank” still appears in some accessibility snapshots despite `display:none` and `aria-hidden`. Not treated as a launch blocker while LB-privacy remains. |
| **NFR-02 Responsive** | **Passed** (lab) | Overflow check at 360 CSS px: `scrollWidth === clientWidth`. Mobile hamburger. Desktop 1280 preview: `docs/amescom/previews/release-home-1280.png`. Browser view still crops RTL inline-start; measurements are the overflow evidence. |
| **NFR-03 Performance** | **N/A** (no field data) | Stage 7 lab notes only. Not a Lighthouse mobile profile. Field p75 targets remain unverified. |
| **NFR-04 Search visibility** | **Passed** (preview noindex); **blocked** (public index) | Unique titles, canonical `https://www.amescom.com/…`, Open Graph `ar_SY`. `robots.txt` Disallow `/`. Empty sitemap. `X-Robots-Tag: noindex, nofollow`. Indexing requires production content mode **and** `AMESCOM_INDEXING=public` **and** a public privacy notice — currently impossible. |
| **NFR-05 Security / reliability** | **Passed** (preview controls); **blocked** (live send) | Server-side validation, honeypot, rate limit, duplicate hash. Secrets not in client or `.env.example`. Security headers present. No live provider. Logs record kind/id/mode, not message bodies, on accept. |
| **NFR-06 Maintainability** | **Passed** | Templates, CSS modules, content separate from UI. This checklist plus `HANDOFF.md`. |

## Critical journeys (3 November 2026)

| Journey | Result |
| --- | --- |
| Home → Contact us | **Passed** — `/ar` header “اتصل بنا” → `/ar/contact`. Mock notice visible. Product/sector empty. |
| Home → product → Contact us | **Passed** — `/ar/products/archive` CTA → `/ar/contact?product=archive` with ARCHIVE selected. |
| Sector → product → Contact us | **Passed** — `/ar/sectors/healthcare` → `/ar/products/clinical-pro` → `/ar/contact?product=clinical-pro` with Clinical PRO selected. Sector page CTA also carries `?sector=healthcare`. |
| Help: support / feature request / report issue | **Passed** — distinct titles, locked type, mock notice, attachments disabled, no file input. |
| Careers | **Passed** — no form, no invented jobs, no date of birth. |
| Form validation | **Passed** — empty POST → 400 `validation` (name, company, email, message). Invalid email → 400. |
| Form mock success | **Passed** — synthetic contact 202 `{status:"accepted", mode:"mock"}`. Help support 202 with type/product intact. Success copy is local mock, not live send. |
| Duplicate / spam / upload | **Passed** — duplicate 409; honeypot 400 `spam`; multipart 400 `attachments-disabled`. |
| Pending UI | **Passed** — submit button becomes “جارٍ إرسال طلبك…” and disables. |
| Arabic / RTL | **Passed** — `dir=rtl`, `lang=ar`. English equivalents **N/A**. |
| FRONA leak in public HTML | **Passed** — home, about, products, sectors, help, contact, careers, privacy HTML contained no `FRONA`. |
| Unsupported claims in public HTML | **Passed** — no `80%`, AES, ISO 27001, Basel, 2004, or Facebook URL on those routes. |

## Search findings

| Check | Result |
| --- | --- |
| Draft markers in visitor HTML | **Passed** — publication flags stay in content data, not in page copy. |
| Source placeholders (`مثلاً:`, template brackets) | **Passed** on published preview routes. |
| Unapproved FRONA in nav/sitemap/JSON-LD | **Passed**. Preview-only draft route exists by design (A-04). |
| Numeric / security claims | **Passed** — C06–C09, C11–C12 remain `held-omit`. |
| Fabricated social proof | **Passed** — none published. |
| Unsafe uploads | **Passed** — disabled. |
| Exposed secrets | **Passed** — no `.env` file; `.env.example` names only. `.data/` gitignored. |
| Test endpoints | **Passed** — only `POST /api/enquiries`. No extra debug routes. `/ar/design-preview` remains a private chrome preview in the build output. |
| Mock-success vs live-success | **Passed** — accepted results always use `formCopy.mockAccepted`. |
| Downloads / brochure PDFs | **N/A** — none published. Reference files stay in `references/amescom/`. Media inventory items are held. Temporary text wordmark in use (Q06). |

## Launch blockers (unresolved)

| ID | Owner item | Effect |
| --- | --- | --- |
| **LB-privacy** | Q31 approved privacy notice | Site must not be treated as public. Indexing stays off. |
| **LB-indexing** | Depends on LB-privacy plus explicit `AMESCOM_INDEXING=public` | `robots.txt` disallow; empty sitemap. |
| **LB-legacy** | Q34 URL list | No redirects implemented. |
| **LB-send** | Q09 form destination | Production submit disabled. |
| **LB-uploads** | Q28 / FR-07 | Attachments unavailable. |
| **LB-publication** | Owner must mark routes/products `public` | Every marketing page is still `draft`; FRONA and privacy are `held`. Production content mode would hide product/sector details. |

## Checks run this stage

- `npx tsc --noEmit` — pass (no output).
- `npx eslint src content/amescom` — pass (no output).
- `npx vitest run` — 19 passed (2 files).
- `npx next build` — pass; 18 static pages; `ƒ /api/enquiries`, `ƒ /[locale]/contact`, `ƒ /[locale]/help/[type]`.
- Vitest warning about `vitest.config.ts` ESM/CJS is non-blocking.

## Production deployment

**Not authorized.** Do not deploy this preview to a public host until the launch blockers above are resolved and the owner explicitly approves a production deploy.
