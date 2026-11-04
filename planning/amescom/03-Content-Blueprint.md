# Amescom website content blueprint

This is proposed website content derived from the evidence register in `01-Requirements.md`. Arabic drafts below are editorial suggestions for review. Their English explanations guide implementation; they are not approved English translations. Keep claim sources and approval states in internal content data, not in the visitor interface.

## Homepage

**Hero headline:** أنظمة برمجية تدعم التحول الرقمي في مؤسستك

**Supporting copy:** من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية وإدارة المخاطر، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.

Use the risk-management phrase only after FRONA's public status is confirmed. If pending, use: من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.

**Primary CTA:** اتصل بنا

**Secondary CTA:** استكشف المنتجات

Recommended section order:

1. Concise hero, two actions and an approved product illustration or real screenshot.
2. Product overview with the four approved product names, each explaining one distinct job. Omit unapproved products from the published version.
3. Sector paths for banking/finance, insurance, medical centers and industry.
4. Reasons to work with Amescom: clear interfaces, configurable solutions, sector experience and continued improvement. Use S1 as the basis; avoid unmeasured savings or blanket compliance claims.
5. Services summary: software, infrastructure, security and networks, after confirming active offerings.
6. A short explanation of how to start: discuss needs, select a suitable solution, agree implementation. Do not imply the Workflow-specific implementation process is contractually identical for all products.
7. Final contact invitation and footer.

“Founded in 2004” can be a simple company fact after confirmation. Do not fabricate customer counts, client logo strips, awards, ratings or testimonials to fill a design section.

## Product overview cards

**AMESCOM ARCHIVE**

أرشفة إلكترونية وتنظيم للوثائق، مع البحث والتعرّف الضوئي على النصوص العربية وإدارة الصلاحيات.

Source: S2 p2. Detail page groups: capture and Arabic OCR; organization/classification/versions; search; access and auditing. Use a neutral document lifecycle diagram if no approved screenshot is available. Security and performance specifics remain controlled by the claim register.

**AMESCOM Workflow**

نظّم مسارات المراجعة والاعتماد، وتابع المهام والمستندات بين أقسام مؤسستك.

Source: S4 pp1–2. Detail page groups: visual routing and branching; task notifications; document organization; reports; access/auditing; confirmed integrations. S4 p2 contains a workflow designer screenshot that should be replaced with an original high-resolution, sanitized export where possible.

**AMESCOM Clinical PRO**

منصة لإدارة الاستقبال والعيادات والمخبر والأشعة، مع ملف موحّد للمريض وتقارير تدعم الإدارة.

Source: S3 pp2–3. Detail page groups: reception/queues/appointments; clinics and patient file; lab; imaging; reports. Do not add online booking, prescriptions, insurance claims or device standards without product confirmation.

**FRONA OpRisk**

أدوات لإدارة المخاطر التشغيلية وتقييم الضوابط ومتابعة المؤشرات والتقارير.

Source: S1 Products and S5 pp1–7. Publication pending name/brand relationship confirmation. Detail page groups: risk profiles; controls and self-assessment; incidents and losses; KRIs and notifications; audit/governance; reporting. The public attribution must match Q02.

## Shared product page template

1. Product name, clear outcome and target audience.
2. Short introduction identifying the problem addressed.
3. Four to six grouped capabilities supported by the product's own source.
4. One useful visual: approved screenshot or explicitly illustrative process diagram.
5. Relevant sector use cases, each phrased as a proposed application rather than a named customer story unless evidence exists.
6. Technical/deployment section only for confirmed facts.
7. Optional approved brochure download with language and file size.
8. Questions and answers based on actual approved answers; omit unanswered commercial questions from public copy.
9. Product-specific “Contact us” CTA carrying product context into the contact page where supported.

## Sector page direction

**Banking and finance:** focus on document retrieval, approval accountability, risk/control visibility and audit preparation. Suggested products: ARCHIVE, Workflow, FRONA where confirmed. Do not claim a regulator's approval or guaranteed compliance.

**Insurance:** focus on organizing policy/claim documents, review and approval handoffs, and operational risk oversight. Clearly distinguish document workflow from a full insurance policy administration or claims processing system.

**Medical centers and clinics:** lead with Clinical PRO's reception, clinics, lab and imaging modules. Explain archival and approval needs only where applicable. Do not make diagnostic effectiveness claims or imply the marketing website accepts patient records.

**Industry:** use supplier contracts, purchase approvals, quality records and maintenance documentation as example document workflows from S1. Do not imply a manufacturing execution, ERP or industrial control system is included.

## About and services

**Proposed opening:** تأسست أميسكوم عام 2004 لتقديم حلول معلوماتية للمؤسسات والشركات، وتطوير تطبيقات مرنة تلبي احتياجات العمل وتدعم كفاءة العمليات.

Source: S1 About. Confirm the founding date and public spelling. Follow with mission, a concise service list and a contact invitation. Omit fabricated founder biographies, staff counts, office locations and partner badges.

## Forms and utility copy

**Contact labels:** الاسم، الشركة، البريد الإلكتروني، رقم الهاتف، الرسالة

**Contact labels:** الاسم، الشركة، البريد الإلكتروني، رقم الهاتف، المنتج، الرسالة

**Help types:** الدعم الفني، طلب إضافة ميزة، الإبلاغ عن مشكلة

**Submit action:** إرسال الطلب

**Pending:** جارٍ إرسال طلبك…

**Validation:** يرجى مراجعة الحقول الموضّحة وإكمال المعلومات المطلوبة.

**Success, only after confirmed acceptance:** تم استلام طلبك بنجاح. سيتواصل معك فريق أميسكوم عبر بيانات التواصل التي أدخلتها.

**Failure:** تعذّر إرسال طلبك الآن. يرجى المحاولة مجدداً أو التواصل معنا عبر البريد الإلكتروني.

**Attachment guidance, if enabled:** يرجى عدم إرفاق كلمات مرور أو بيانات مرضى أو معلومات سرية غير ضرورية لمعالجة الطلب.

Display a ticket reference only if the backend actually returns one. Do not claim a message was delivered to a person when only a local preview action occurred. Mock mode must be visibly identified in the development preview and disabled in production.

## Initial claim register

- **C01 — founded 2004:** S1 About; business owner to confirm; suitable for publication after confirmation.
- **C02 — ARCHIVE Arabic OCR/classification/versioning/search/access/audit:** S2 p2; product owner to confirm current capabilities; no invented accuracy rate.
- **C03 — Workflow visual approvals/notifications/reports/integration capability:** S4 p2; confirm connector names and deployment conditions.
- **C04 — Clinical PRO modules and unified patient data:** S3 pp2–3; keep claims within brochure scope.
- **C05 — FRONA operational risk modules:** S5 pp1–7; hold public publication pending identity, rights and availability.
- **C06 — ISO alignment/certification, AES-256, TLS 1.3, ABAC and immutable logs:** S2 pp3–4 and repeated in S1; hold detailed public statements pending evidence per product and version. Certification must never be inferred from alignment.
- **C07 — sub-second search regardless of data size:** S2 p4/S1; omit absolute wording; benchmarks needed for numerical claims.
- **C08 — up to 80% faster document cycles:** S4 p3; omit unless a publishable measurement supports it.
- **C09 — advanced historical/complex Arabic OCR and fully automatic extraction:** S2 p4/S1; confirm supported inputs, limitations and review steps before detailed claims.
- **C10 — ESET relationship:** S1 Services; selling/supporting ESET does not establish partner status; confirm wording and logo permissions.

## Content data model

Each product should have a stable ID, slug, publication status, localized name/summary, audience, feature groups, source references, approved claims, sector IDs, media metadata, CTA target and optional brochure. Each claim needs its evidence reference, approval status and product/version scope. Each media item needs alt text, usage rights, real-interface-versus-illustration classification and a sensitive-data check. Keep approval fields private and exclude draft content from public output.

Use `06-Decisions.md` to resolve missing facts. The publication switch must default conservatively for disputed items; do not ship visible “coming soon,” “TBD,” empty image frames or guessed answers merely to complete a template.
