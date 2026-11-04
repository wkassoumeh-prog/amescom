# Amescom content model

Typed, locale-keyed copy for the public marketing site. Arabic is the only locale (`ar`). Do not add empty English strings.

## Rules for later stages

- Render with `publication.status === "public"` for production pages, navigation, metadata and sitemaps.
- `includeInPreview` allows draft routes. FRONA is included in navigation alongside the other three products at the owner's request.
- Skip any claim whose `approval` is `held-omit`.
- Brochure imagery is authorized by the owner for the ARCHIVE prototype. Preserve source attribution internally and omit third-party company branding.
- Do not import or display `privacy-gaps.ts` or the S1 privacy template.
- Keep Latin product names and `dir: "ltr"` on email, phone and version fields.
- Product IDs are stable: `archive`, `workflow`, `clinical-pro`, `frona-oprisk`.

## Naming used in public copy

| Concept | Public form |
| --- | --- |
| Company | أميسكوم / Amescom |
| Products | AMESCOM ARCHIVE, AMESCOM Workflow, AMESCOM Clinical PRO, FRONA |
| Email label | البريد الإلكتروني |
| Phone | +963 11 33 44 805 |
