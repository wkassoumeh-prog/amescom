# Amescom website — deployment and maintenance handoff

Stage 8, 3 November 2026. This document is for local preview, reviewable production preparation, and later launch. **It does not authorize a public deploy.**

Preview: `http://localhost:3000` (redirects `/` → `/ar`).

Documented company website in content: `https://www.amescom.com`. **Production domain and host are not owner-approved** (Q08). Record them here when confirmed:

| Item | Status |
| --- | --- |
| Production domain | **Not confirmed.** Canonical URLs currently use `https://www.amescom.com` unless `AMESCOM_SITE_URL` is set. |
| Production host | **Not selected** (Q08). Stack assumes a Node.js host that can run `next start` (or a managed Next.js platform). |
| Redirects | **None.** Q34 supplied no legacy URL list. |
| Analytics | **None.** Q32 unanswered; P-09: no trackers. |

## Stack

- Next.js 16.4.5 App Router, React 19.3.1, TypeScript 5.9.3
- Node.js ≥20.9 (verified locally: v24.12.0)
- Plain CSS modules and tokens; Noto Sans Arabic + Inter via `next/font/google`
- Vitest 4.1.12
- Locale: Arabic `/ar` only

Live content is `content/amescom/` (imported as `@content/*`). A leftover `content/` tree at the repo root is **not** used by the app; do not edit it for the website.

## Local setup

1. Install Node.js 20.9 or later.
2. From the repository root:

```bash
npm install
npm run dev
```

3. Open `http://localhost:3000`. Development defaults: content mode **preview**, form mode **mock**.

Useful commands:

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local preview |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |
| `npm test` | `vitest run` |

Copy `.env.example` to `.env.local` only if you need overrides. Do not commit secrets.

## Environment variables

Names only. Real credentials must never be placed in `.env.example` or client code.

| Name | Values | Default | Notes |
| --- | --- | --- | --- |
| `AMESCOM_SITE_URL` | Absolute origin, no trailing slash | `https://www.amescom.com` | Canonical URLs and JSON-LD. |
| `AMESCOM_CONTENT_MODE` | `preview` \| `production` | `preview` | `production` emits only `publication.status === "public"`. |
| `AMESCOM_INDEXING` | `public` or unset | unset (off) | Also requires production content mode **and** a public privacy page. |
| `AMESCOM_FORM_MODE` | `mock` \| `disabled` | mock in development; **disabled in production** | No live provider is implemented. |
| `AMESCOM_FORM_PROVIDER` | reserved | empty | Do not invent an endpoint. |
| `AMESCOM_FORM_API_KEY` | reserved | empty | Server-side only, if a provider is later chosen (Q09). |
| `AMESCOM_FORM_FROM` / `AMESCOM_FORM_TO` | reserved | empty | |
| `AMESCOM_FORM_RATE_LIMIT_WINDOW_MS` | number | 60000 | Local testing override. |
| `AMESCOM_FORM_RATE_LIMIT_MAX` | number | 5 | |

There is **no** live SMTP, CRM or helpdesk adapter. Setting a provider name without implementing an adapter will not send mail.

## Build and deployment (when authorized)

1. Resolve launch blockers in `RELEASE-CHECKLIST.md`.
2. Mark approved pages/products `public` in `content/amescom/`.
3. Set host env: `AMESCOM_CONTENT_MODE=production`. Leave `AMESCOM_INDEXING` unset until privacy is public.
4. `AMESCOM_FORM_MODE=disabled` until Q09 names a real destination **and** an adapter is implemented and tested.
5. `npm run build` then `npm start` (or the host’s Next.js build hook).
6. Confirm HTTPS, security headers, `robots.txt` still disallow `/` until indexing is explicitly enabled.
7. Do not enable `AMESCOM_INDEXING=public` while privacy is held.

Rollback: revert the git revision on the host and redeploy the previous build. There is no first production release yet, so rollback is “do not publish” / take the host offline. Keep `.data/` and `.env*` off the public tree.

Git: a local `main` branch exists with files staged; **there are no commits and no remote**. Create a first commit before any deploy so rollback has a revision.

## Content editing

Edit TypeScript files under `content/amescom/`. Arabic strings live in locale-keyed objects (`{ ar: "…" }`). Do not add empty English strings.

Publication flags:

- `public` — eligible for production content mode, nav and sitemap (when indexing is on).
- `draft` — preview only. **All current marketing pages are draft.**
- `held` — FRONA product and privacy page. Excluded from nav and production output (privacy still has a held route that states it is not a policy).

Claims: skip any claim with `approval: "held-omit"`. Media: skip unless `publication === "public"` (none are). Do not import `privacy-gaps.ts` into visitor copy except the existing held privacy page helper.

Product IDs are stable: `archive`, `workflow`, `clinical-pro`, `frona-oprisk`.

## Form destinations

| Mode | Behaviour |
| --- | --- |
| `mock` | `POST /api/enquiries` validates, rate-limits, then appends to `.data/enquiries.jsonl` (gitignored). HTTP 202. UI says the request was **not** sent to Amescom. |
| `disabled` | Adapter refuses. HTTP 503. Mailto `info@amescom.com` and phone `+963 11 33 44 805` remain the approved contact. |

Honeypot field name: `website`. Rate limit: 5 requests / IP / 60 seconds (in-memory; resets on process restart). Duplicate window: 10 minutes on kind+email+message.

**Ownership of delivery failures:** until Q09, Amescom staff do not receive form posts. Local `.data/enquiries.jsonl` is a test artefact, not an inbox. Do not treat mock IDs as tickets.

## Uploads

Disabled. Multipart bodies are rejected. Careers has no CV field. When Q28/FR-07 is configured, implement type/size allowlists, private storage, randomized names, malware scanning and retention **before** showing a file input.

## Privacy and retention

| Topic | Current fact | Owner |
| --- | --- | --- |
| Public privacy notice | Not approved (Q31). Held page is not a legal notice. | Owner / legal |
| Analytics / cookies | None | Owner (Q32) |
| Form data in mock | Local `.data/enquiries.jsonl` on the developer machine | Developer; delete when finished testing |
| Form data in production | Not collected via the site (submit disabled) | — |
| Uploads | None | — |
| Retention policy | Not defined | Owner (Q30, Q31) |

Do not publish the S1 privacy template.

## Known limitations

- Preview is `noindex`. Search engines must not be invited until LB-privacy is cleared.
- FRONA remains held (Q04, Q18). Name “FRONA” is approved (A-06); availability and “OpRisk” suffix are open.
- Temporary text wordmark (Q06). Brochure screenshots and PDFs are not public.
- Founding year 2004, street address, hours, Facebook link withheld (Q21).
- `/ar/design-preview` is still in the production build as a chrome preview; keep it out of nav and sitemap.
- Help and contact in production without `AMESCOM_FORM_MODE=mock` will show disabled/mailto — do not enable mock on a public host.
- In-memory rate limit/duplicate store does not survive multi-instance hosting.
- Honeypot may still appear as “Leave blank” in some accessibility snapshots.
- No CMS. English `/en` not built.
- Vitest prints a non-blocking Vite CJS config warning.

## Rollback instructions

1. If a public deploy was made in error: disable DNS or pause the host immediately.
2. Ensure `AMESCOM_INDEXING` is not `public`.
3. Redeploy the last known-good git revision, or take the service down if none exists.
4. Rotate any secrets that were introduced (none are in this preview).
5. Delete any mock `.data/enquiries.jsonl` copied onto a server.

## Owner decision requested

**Do you authorize a production deployment?** Recommended answer: **No**, until LB-privacy, LB-send, publication flags, hosting (Q08) and an approved privacy notice are resolved.

If you later say yes, also confirm: production domain, host, whether forms stay disabled, and that indexing stays off.
