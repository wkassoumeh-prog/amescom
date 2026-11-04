# Prompt 8 — Final verification and deployment handoff
Continue from STATUS. Complete a release review against the requirement IDs and acceptance criteria. Do not add features or deploy automatically.

Run the production build and relevant tests. Verify homepage → Contact us, homepage → product → Contact us, sector → product → Contact us, every enabled help type, and careers if included. Exercise success, failure and validation states using synthetic data. Confirm Arabic/RTL behavior and any enabled English equivalents. Inspect final mobile/desktop screenshots and fix release-blocking defects.

Search for draft markers, source placeholders, unapproved FRONA references, unsupported numeric/security claims, fabricated social proof, unsafe uploads, exposed secrets, test endpoints and mock-success paths. Verify that published downloads and media are approved and usable.

Create `docs/amescom/RELEASE-CHECKLIST.md` mapping requirements to evidence/results, `HANDOFF.md` with local setup, build/deployment steps, environment variable names, content editing, form destinations, upload handling, privacy/retention ownership, known limitations and rollback instructions. Record the approved production domain and host when available. Include redirects and analytics configuration only if selected.

Mark each item passed, failed, not applicable or blocked. A preview with missing service credentials is not a fully operational production site. Do not mark work complete while a required gate is unresolved.

Present the final preview, test summary, changed files and a concise list of remaining launch decisions. Prepare deployment so it is reviewable; request a production deployment decision only if the owner has not already authorized it. Stop here.
