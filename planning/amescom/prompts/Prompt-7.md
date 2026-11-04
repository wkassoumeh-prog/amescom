# Prompt 7 — Complete accessibility, metadata and privacy
Continue from STATUS. Review all included pages against NFR-01 through NFR-05 and FR-08/FR-10. Fix concrete issues in this stage without adding new product features.

Complete localized titles/descriptions, canonical URLs, robots and sitemap handling, and truthful structured data. Add hreflang only for real, published translations. Implement redirects from the approved legacy URL list if provided. Keep preview environments noindex and draft products out of search output.

Use an approved privacy notice that matches the actual forms, providers, storage, retention, analytics and recruitment handling. If approval is missing, record a launch blocker and keep the site in private preview. Do not publish the supplied template's placeholders. Implement optional analytics/cookies only if selected and according to the approved requirements; do not add trackers by default.

Audit keyboard navigation, focus, labels/errors, heading order, contrast, alt text, 200% zoom, Arabic reading order, mobile layout and reduced motion. Run an automated accessibility scan where available, then verify critical journeys manually. Optimize fonts, images and JavaScript, and check layout stability. Record performance test conditions and distinguish lab results from field targets.

Acceptance: no known critical accessibility defects, no broken published routes, no horizontal overflow at target widths, no draft/private content in page output, and no confidential data exposed through logs or files. Report unresolved policy or operational blockers explicitly. Update STATUS and stop.
