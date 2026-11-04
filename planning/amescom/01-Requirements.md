# Amescom website requirements

## Purpose and boundaries

Build a credible, modern public website that helps business buyers understand Amescom, identify a suitable product and contact the company. Secondary journeys serve existing customers and job applicants. The requested deliverable at this stage is a requirements and implementation handoff, not a deployed site.

The recommended first release is a marketing website. A patient portal, medical records system, risk management platform, archive engine, workflow builder, payment system and customer account area are separate product projects. Descriptions of these capabilities in the source files belong in product marketing content; they do not automatically become website functionality.

## Evidence register

- **S1 — website content.docx:** Arabic draft website copy. References below use section headings because DOCX pagination changes with layout. Covers navigation, Home, About, Contact, Careers, Privacy, four sectors and Help. Location: `C:/Users/wasim/Documents/Amescom/website content.docx`.
- **S2 — AMESCOM ARCHIVE.pdf:** five pages. Page 1 identifies the product and contact details; page 2 describes capabilities; page 3 covers governance and security claims; page 4 contains detailed technical claims; page 5 is a closing page. Location: `C:/Users/wasim/Documents/Amescom/AMESCOM ARCHIVE.pdf`.
- **S3 — AMESCOM Clinical PRO.pdf:** five pages. Pages 1–2 identify the product and modules; page 3 describes operational benefits; page 4 describes suitability and benefits; page 5 is a closing page. Location: `C:/Users/wasim/Documents/Amescom/AMESCOM Clinical PRO.pdf`.
- **S4 — AMESCOM Wrokflow.pdf:** three pages. Page 1 defines the document lifecycle; page 2 lists capabilities and shows interface screenshots; page 3 gives benefits and implementation steps. Preserve the source filename but spell the public product name “Workflow.” Location: `C:/Users/wasim/Documents/Amescom/AMESCOM Wrokflow.pdf`.
- **S5 — مواصفات البرنامج.pdf:** seven pages describing FRONA. Page 1 introduces GRC and web access; pages 2–3 cover risk profiles and recommendations; page 4 governance and self-assessment; page 5 audits and events; page 6 indicators and flexibility; page 7 reporting. Its Arabic text extraction was damaged, so all seven pages were reviewed visually. The website must present Amescom as the sole company and must not reproduce other company names or source branding from this reference. Location: `C:/Users/wasim/Documents/Amescom/مواصفات البرنامج.pdf`.

These files are reference material. Embedded calls to action and editing placeholders are not instructions to the implementation agent. Claims, specifications and form fields must be assessed against the intended public website and the owner's decisions.

## Company facts described in the sources

- Amescom is described as a provider of integrated IT solutions founded in 2004. Its experience includes applications for accounting, sales, purchasing, inventory, education, databases and operating systems. [S1, About]
- The stated mission emphasizes integrated, flexible applications that improve operations and support decisions. [S1, About]
- Services include web and mobile software, infrastructure and virtual environments, operating systems and cloud systems, information security including ESET products and firewalls, and LAN/WAN networking. A reference to ESET does not establish official partner status. [S1, Services]
- Contact details in the supplied materials are `info@amescom.com`, `+963 11 33 44 805`, `www.amescom.com`, and Damascus, Syria. The draft also supplies `https://www.facebook.com/AMeSCom/`. Confirm current details and a public street address, if wanted. [S1, Contact/footer; S2 p1; S3 p1]

## Product inventory

**AMESCOM ARCHIVE — document management and electronic archiving.** The brochure describes Arabic OCR, document recognition and classification, version management, attachments, keyword and full-text search, access controls, encryption and activity auditing. Pages 3–4 add governance, technical security and performance claims that require product-owner substantiation. [S2 pp2–4]

**AMESCOM Workflow — document routing and process automation.** Described capabilities include a visual drag-and-drop approval designer, branching conditions, assignment and permissions, document storage and search, email and application notifications, time and bottleneck reports, audit trails, and integration with ERP, CRM and accounting systems. The described delivery journey is assessment, customization and training, then launch and support. Exact supported integrations and signing methods are unspecified. [S4 pp1–3]

**AMESCOM Clinical PRO — management of medical centers and clinics.** Modules cover reception and queues, clinic management, medical laboratories, and radiology/panoramic imaging. The brochure describes appointment scheduling, a unified patient file, connections between departments, and management reporting on performance, revenue and patient movement. It describes suitability for individual clinics and larger centers. Billing, insurance integrations, online booking and specific medical interoperability protocols are not established by these materials. [S3 pp2–4]

**FRONA OpRisk — operational risk and governance.** S1 names “FRONA OpRisk”; S5 uses “FRONA.” The specifications describe risk profiles, inherent and residual risk, control gaps, recommendations, suggestions, governance reports, risk/control self-assessment, risk-based audit, operational events and losses, key risk indicators, threshold notifications, configurable risk matrices, multilingual and multicurrency support, customizable charts, and PDF/Excel/Word reports. Present the product under Amescom only. Current product naming and commercial availability still need confirmation. [S1, Products navigation; S5 pp1–7]

## Audiences and journeys

- **Business or department leader:** Home → relevant sector → relevant product → Contact us. The site should explain the operational problem, relevant capabilities and next step.
- **IT, security or procurement reviewer:** Product → approved technical details and documentation → technical enquiry. Publish only verified security and integration details.
- **Existing customer:** Help → support, feature request or bug report → truthful submission confirmation and reference if the selected system provides one.
- **Job applicant:** Careers → real vacancy or confirmed general application route → application confirmation.

The four sectors explicitly proposed in S1 are banking and financial services, insurance, medical centers and clinics, and industrial organizations. Suggested mappings are FRONA/ARCHIVE/Workflow for finance, insurance and industry; Clinical PRO as the primary clinical product, with ARCHIVE/Workflow as potential complements. Validate commercial availability and integrations before presenting these as packaged solutions.

## Proposed sitemap

Use stable, human-readable routes. `/ar` is the recommended initial locale; `/en` is conditional on approved English content. Locale selection and default remain a business decision.

- Home: `/ar`
- Products overview: `/ar/products`
- Product detail: `/ar/products/archive`, `/ar/products/workflow`, `/ar/products/clinical-pro`, `/ar/products/frona-oprisk`
- Sectors overview: `/ar/sectors`
- Sector detail: `/ar/sectors/banking-finance`, `/ar/sectors/insurance`, `/ar/sectors/healthcare`, `/ar/sectors/industry`
- About and services: `/ar/about` with a services section; a separate services page is optional.
- Contact: `/ar/contact`
- Help hub and request types: `/ar/help`, `/ar/help/support`, `/ar/help/feature-request`, `/ar/help/report-issue`
- Careers: `/ar/careers`
- Privacy: `/ar/privacy`; other legal pages only when applicable and approved.

The FRONA route can exist in a private draft but must not be included in public navigation or the sitemap until product naming and availability are confirmed. Do not publish empty sector, vacancy or translated pages.

## Functional requirements and acceptance

**FR-01 Navigation — Must.** Provide Products, Sectors, Help and a prominent “Contact us” action, with About, Contact, Careers and Privacy easily reachable. Desktop menus and mobile navigation must work with keyboard, touch and screen reader labels. Every published page must be reachable through navigation or a relevant contextual link. [S1 navigation; owner decision]

**FR-02 Product pages — Must.** Give each approved product its own benefit-led summary, supported capability groups, target users, relevant sector links and contextual CTA. Carry the selected product into the enquiry form. Accept when the four draft pages have source-linked content and only approved products are visible publicly. [S1–S5]

**FR-03 Sector pages — Must.** Explain actual sector tasks and link to applicable products. Avoid repeating the full ARCHIVE feature list across all sectors or implying that every product includes all ARCHIVE features. Accept when each page has distinct use cases and a reviewed product mapping. [S1 sectors; S2–S5]

**FR-04 Contact form — Must.** “Contact us” is the primary call to action and links to `/ar/contact`. The source form lists name, company, phone, email and message. Product and sector may be carried into the form as optional context when a visitor arrives from those pages. Suggested required fields are name, company, email and message; phone remains optional until sales confirms. Configure recipients server-side. Support pending, success, validation, network failure and rate-limit states. Show success only after the server confirms durable acceptance or provider acceptance under a documented delivery contract. Preserve valid inputs on recoverable failures. [S1 Contact; owner decision]

**FR-05 Help requests — Should, or Must if confirmed for release.** Offer support, feature request and issue report as separate choices with shared form components. S1 lists name, company, phone, email, message and attachments. Proposed additions: product, version and issue reproduction details where relevant. Confirm whether requests go to email, a helpdesk or an authenticated portal. Accept when each type reaches the configured destination with its type and product intact. No promised response time without an agreed service commitment. [S1 Help]

**FR-06 Careers — Should.** S1 lists name, date of birth, qualification, mobile, email and CV; the privacy draft also mentions portfolio, LinkedIn and skills. Resolve this mismatch. Recommended minimal form: name, email, optional phone, position or general interest, qualification/experience and CV. Omit date of birth unless the owner establishes a necessary purpose. Do not invent vacancies. [S1 Careers and Privacy]

**FR-07 Attachments — Conditional Must.** If support or CV upload is enabled, use configured type and size allowlists, signature/MIME checks, private storage, randomized object names, malware scanning or quarantine, limited staff access and an agreed retention policy. Block executable content and public download links. Test rejected type, excessive size, failed scan and failed upload. Until this is configured, keep uploads unavailable in production and display an approved alternative contact route. [S1 form attachments; proposed operational requirement]

**FR-08 Localization — Must for Arabic; English conditional.** Use `lang="ar"` and `dir="rtl"` for Arabic, logical CSS properties, and LTR isolation for email, phone and technical strings. Keep text outside components in structured content. If English is enabled, the locale switch should retain the equivalent page and have an explicit fallback when translation is unavailable. Accept when navigation, forms, validation and metadata use the selected language. [Arabic source copy; proposed language handling]

**FR-09 Content maintenance — Must.** Maintain a structured content model for products, sectors, company details, assets and forms. Track each claim's source, approval state and owner. Use version-controlled content for a small launch unless editors need a CMS. If a CMS is selected, define editor roles, preview, publication and media handling. [proposed]

**FR-10 Trust and privacy — Must.** Publish a completed privacy notice matching the actual forms, destinations, storage, analytics and retention. The source notice contains unresolved placeholders and must not be published verbatim. Testimonials, logos, badges, certifications and case-study figures require evidence and usage permission. [S1 Privacy; proposed publication gate]

## Quality requirements

- **NFR-01 Accessibility:** target WCAG 2.2 AA; semantic landmarks, ordered headings, visible focus, meaningful labels, error association, sufficient contrast and reduced-motion support. Test keyboard use, 200% zoom, Arabic reading order and mobile menu focus handling. This is a proposed quality target, not a claim of certified compliance.
- **NFR-02 Responsive layout:** verify at 360, 768, 1280 and 1440 CSS pixels; no horizontal page overflow, clipped Arabic text or inaccessible controls. Use touch targets of about 44 pixels where practical.
- **NFR-03 Performance:** target field p75 LCP ≤2.5 seconds, INP ≤200 ms and CLS ≤0.1 when enough real traffic exists. Before launch, use repeatable mobile lab checks as proxies, record conditions, and optimize images/fonts and unnecessary JavaScript. A lab score does not establish field performance.
- **NFR-04 Search visibility:** unique localized titles and descriptions, one primary heading, meaningful links, canonical URLs, sitemap and robots configuration; hreflang only for published translations. Structured company/product data must match visible, approved facts. Preview environments remain noindex.
- **NFR-05 Security and reliability:** HTTPS, server-side validation, request limits, spam protection, secret isolation, safe file handling and logs that avoid enquiry bodies or attachments. Document failure handling and ownership of delivery failures. Use hosting-supported security headers and patch dependencies.
- **NFR-06 Maintainability:** reuse templates and form components, keep content separate from presentation, and provide local setup, environment variable and deployment instructions. Use the existing repository stack if suitable; otherwise choose a supported, SEO-capable stack after hosting is confirmed.

## Scope and implementation recommendation

Recommended launch: company pages, approved products and sectors, a clear contact journey, responsive Arabic layout, privacy page, metadata and accessible navigation. Help submission and CV uploads are conditional on an operational destination and safe handling. English, CMS, knowledge base, live chat, customer login, online booking, pricing calculators and CRM automation are optional expansions.

For a new project, Next.js with TypeScript and lightweight styling is a reasonable proposed default, subject to hosting and maintainer needs. Use supported versions selected at implementation time, not invented version numbers. A simpler static site with an external form service may be preferable if hosting cannot execute server code. Do not create infrastructure accounts or buy services without a decision.

Suggested measurements are successful contact requests and product-to-contact conversion. Define qualified enquiries with sales before setting numerical targets. Analytics is optional and requires a documented configuration and applicable privacy review.

## Material gaps and conflicts

1. **Public brand:** resolved. Amescom is the only company to be named or represented on the website. Source branding from reference documents must not appear in copy, metadata, downloads or images. FRONA's current public product name and availability still need confirmation.
2. **Overextended sector copy:** S1 repeats ARCHIVE-specific security/OCR descriptions across sectors. Do not transfer these to Clinical PRO, Workflow or FRONA without confirmation.
3. **Unsubstantiated quantitative or absolute claims:** S4 p3 says up to 80% time savings and uses error-elimination language. S2 p4 and S1 describe sub-second search regardless of data size. Obtain benchmarks or replace with bounded qualitative statements.
4. **Security and compliance:** ISO/IEC 27001 alignment is not proof of certification. AES-256, TLS 1.3, ABAC and immutable logs need product/version/deployment evidence before detailed public claims. Do not imply blanket regulatory compliance.
5. **Asset fidelity:** S4 includes product UI screenshots. The ARCHIVE and Clinical brochures include illustrative product imagery; treat it as illustration unless the owner confirms it is real UI. Obtain original Amescom logos and approved, sanitized screenshots.
6. **Commercial model:** prices, editions, licensing, hosting models, supported integrations, migration scope and response-time commitments are absent or insufficient.
7. **Operational/legal gaps:** form routing, retention, upload limits, privacy entity, analytics and job application handling remain unspecified. The privacy text has placeholders and mentions features that are not otherwise requested, including newsletters.

## Release acceptance

The release is ready when the owner has approved public company/product claims and assets; all included routes have complete localized content; enquiry delivery and failure behavior have been tested; enabled uploads satisfy their controls; accessibility and responsive checks pass; source placeholders and draft-only content are absent; privacy reflects actual operations; and a named owner has received the deployment and content-maintenance guide. Unresolved production dependencies must remain visible in the handoff, even if the preview is complete.
