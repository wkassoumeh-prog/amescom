# Prompt 6 — Connect forms and operational services
Continue from STATUS. Read FR-04 through FR-07 and decisions on hosting, destinations, attachments and privacy. Implement only the agreed submission workflows.

Use a server-side adapter for the chosen email/CRM/helpdesk service. Keep secrets outside client code and provide a documented `.env.example` containing names and safe placeholders only. If credentials or provider choices are missing, implement a testable adapter and clearly marked local mock mode; disable production submission or provide the approved alternative contact. Record the dependency rather than inventing an endpoint or reporting a live service as complete.

Implement client/server validation, field length limits, spam/rate controls, pending states, duplicate-submission protection, localized errors and accessible focus/announcements. Preserve form values on recoverable errors. Show success only after confirmed provider or durable-queue acceptance. Do not imply guaranteed email delivery. Document retries/monitoring if a queue is used. Avoid logging personal message bodies.

Only enable attachments after private storage, type/signature checks, size/count limits, scan/quarantine, staff access and retention are configured. Treat uploads as sensitive; never use a public bucket or return public file URLs. Implement disabled-production behavior if these services are unavailable.

Acceptance: meaningful tests cover valid request acceptance, invalid data, spam/rate rejection, delivery failure, repeat clicks and upload failures where enabled. Test with synthetic data and a local/test destination. Do not contact real customers or send test requests to live staff without authorization. Report what is live, simulated or blocked. Update STATUS and stop.
