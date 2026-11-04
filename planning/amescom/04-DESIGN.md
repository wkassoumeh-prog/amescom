# Amescom website design direction

## Reference and evidence

Reference: https://www.notion.com/ — inspected on 3 November 2026 through a live desktop browser, with a screenshot and read-only computed-style inspection. The Firecrawl connector was unavailable, so browser inspection and an official-site web result supplied the evidence. The captured viewport was approximately 1264 × 713 pixels. Mobile layout, hover behavior and complete animation behavior were not inspected.

Observed above the fold: a white canvas, compact horizontal navigation, very large centered dark heading, generous space around the hero, primary blue and pale-blue secondary actions, a product preview below the headline and a customer logo row. A colored rounded word treatment adds emphasis inside the heading. This screenshot included a cookie panel obscuring part of the lower-right hero.

Computed values observed in that desktop state: body background `rgb(255,255,255)`; body/heading text `rgba(0,0,0,0.95)`; font stack beginning `NotionInter, Inter`; hero heading 96px, weight 600, line-height 100px. These are observed reference values, not requirements for Amescom or evidence that the proprietary Notion font is reusable.

The page structure also exposed product capability sections, use-case links, customer proof, a closing CTA and grouped footer navigation. Reference asset examples include `/front-static/nav/allFeaturesNav/capture.png`, `find.png` and `automate.png` on notion.com; these explain Notion's navigation imagery and are not assets to copy into Amescom. No Notion media is included in this handoff.

## Proposed translation for Amescom

Use a clear, spacious enterprise software presentation with an Arabic-first layout. Let product names, concise benefits and readable interface previews carry the page. Retain Amescom's identity. The brochures visibly use blue, gray and white in the logo; exact brand colors and original files remain to be supplied.

Apply these principles: strong type hierarchy, short sections, generous whitespace, simple navigation, one primary conversion action, and specific product demonstrations. Use an original visual language and copy. Do not reuse Notion logos, illustrations, customer logos, proprietary fonts, text or distinctive branded graphic elements.

## Proposed implementation tokens

These are suggested Amescom values, not extracted Notion CSS or confirmed Amescom brand standards.

- Background: `#FFFFFF`; subtle section surface: `#F7F8FA`.
- Main text: `#17191C`; secondary text: `#505862`; divider: `#E3E7EB`.
- Primary accent: `#145DA0`; hover: `#104A80`; light accent surface: `#EDF4FC`. Verify final foreground/background contrast in the implementation.
- Arabic font candidate: Noto Sans Arabic or another approved, licensed Arabic sans-serif. English candidate: Inter or a compatible system sans-serif. Self-host only properly licensed assets and keep downloads small.
- Arabic body: 17–18px with approximately 1.75 line-height; headings approximately 1.25–1.4. Do not apply negative letter spacing to Arabic. English body can use a tighter 1.55–1.65 line-height.
- Hero heading: fluid approximately 34px on small screens to 64px on wide screens; tune line wrapping for real Arabic copy. Notion's observed 96px desktop heading is intentionally not a required Amescom size.
- Content width: about 1180px; reading width: about 68 characters for English prose, with Arabic line lengths reviewed visually.
- Horizontal padding: 20px mobile, 32px tablet, 48px desktop. Section spacing: about 48px mobile and 80–96px desktop.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, 64, 96px. Radii: 8px controls, 12–16px product preview frames. Use subtle borders; avoid decorative shadows on every element.

## Layout and component guidance

**Header:** Amescom identity, Products, Sectors and Help, plus a prominent “Contact us” CTA. Put secondary links in the footer or a compact secondary group. Mirror layout appropriately for RTL. Menus must support keyboard interaction and not depend on hover.

**Hero:** a short Arabic headline, one short paragraph and two clearly differentiated actions. Pair this with one meaningful product or process visual. Avoid giant animated copy that disrupts Arabic reading or shifts the layout.

**Product overview:** use a consistent template but distinct, accurate content. Combine open sections, feature rows and a small product grid; avoid turning every paragraph into an identical card.

**Product detail:** benefit-led introduction, feature groups and one readable preview. Allow screenshots to open larger if needed. Mark explanatory diagrams as illustrations when they might otherwise be mistaken for actual interfaces.

**Forms:** restrained single-column layout on mobile, persistent labels, clear optional/required status, localized inline errors and a privacy link. Place product context near the heading. Do not hide failure states or replace labels with placeholders.

**Footer:** company details, product links, company links, help and privacy. Show only approved contact and social links. Do not invent a login button, pricing page or app download.

**Motion:** optional subtle transitions around 150–250ms; respect reduced motion. Avoid autoplay video, background particle effects, parallax and attention-seeking effects without a user need.

## Assets and unresolved decisions

The source brochures contain an Amescom logo and graphics; S4 p2 includes useful workflow UI evidence. Request original, licensed files before production. Do not crop a blurry PDF cover into a hero or present conceptual medical/archival imagery as verified software UI. Use simple original diagrams for a draft when real screenshots are unavailable.

Unresolved: approved logo/color/font kit; which Notion qualities the owner prioritizes; actual product screenshots; image rights; language order; and whether product-specific accent colors are allowed. The direction above is sufficient for a reviewable prototype while those decisions are collected.

## Design acceptance

The result should feel spacious and deliberate, preserve Amescom identity, show meaningful differences between products, and remain comfortable to read in Arabic. Validate RTL, keyboard use, contrast, reduced motion, 200% zoom and the target widths from NFR-02. Review the homepage and one representative product page before propagating the template.
