# Prompt 2 — Implement the foundation and design system
Continue from STATUS and the accepted decisions. Read `planning/amescom/04-DESIGN.md` and NFR-01, NFR-02, NFR-06 in the requirements. Implement only the shared foundation and a private design preview.

Use the approved stack; if not yet fixed, inspect the repository and choose the simplest compatible option documented in DECISIONS. When adding a framework/library, verify its current official documentation and pin compatible supported versions. Keep dependencies limited.

Implement design tokens, licensed font loading, base typography, containers, spacing, links, buttons, accessible form primitives, header, mobile navigation and footer. Use the approved Amescom identity. If the original logo is missing, use a plain temporary Amescom text wordmark in the preview and record the asset dependency.

Follow the proposed light, spacious design with dark type and restrained blue accents. Use Notion as inspiration for hierarchy, whitespace and product storytelling. Create original layouts and assets. Avoid unnecessary effects and excessive cards.

Implement Arabic `lang` and RTL direction, logical CSS properties, LTR isolation for email/phone/product codes, and a content-driven locale architecture. Do not show an English switch until English routes exist. Include skip link, visible focus, keyboard-operable menus, Escape/close behavior and reduced-motion support.

Acceptance: build/type checks pass; header, footer and controls work at 360, 768, 1280 and 1440 pixels; Arabic has no clipping or horizontal overflow; keyboard navigation is usable. Capture representative desktop/mobile previews. Update STATUS with the result and stop before building the full homepage.
