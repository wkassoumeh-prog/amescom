import { describe, expect, it } from "vitest";
import { createDisabledAdapter, createMockAdapter } from "./adapter";
import { submitEnquiry } from "./submit";
import type { EnquiryInput } from "./types";

const sample: EnquiryInput = {
  kind: "contact",
  name: "مجرب اختباري",
  company: "شركة أمثلة",
  email: "tester@example.com",
  message: "استفسار اصطناعي عن الأرشفة الإلكترونية لمختبر تجريبي.",
  product: "archive",
};

function freshStores() {
  return { rateStore: new Map<string, number[]>(), duplicateStore: new Map<string, number[]>() };
}

describe("submitEnquiry", () => {
  it("accepts a valid synthetic contact in mock mode", async () => {
    const result = await submitEnquiry(sample, "10.0.0.1", {
      mode: "mock",
      adapter: createMockAdapter({ persist: false }),
      ...freshStores(),
    });
    expect(result.status).toBe("accepted");
    if (result.status === "accepted") {
      expect(result.mode).toBe("mock");
      expect(result.id).toBeTruthy();
    }
  });

  it("keeps help type and product on a valid support request", async () => {
    const result = await submitEnquiry(
      {
        ...sample,
        kind: "support",
        product: "workflow",
        version: "1.2-test",
      },
      "10.0.0.2",
      { mode: "mock", adapter: createMockAdapter({ persist: false }), ...freshStores() },
    );
    expect(result.status).toBe("accepted");
  });

  it("rejects missing required fields", async () => {
    const result = await submitEnquiry(
      { kind: "contact", name: "", company: "", email: "", message: "" },
      "10.0.0.3",
      { mode: "mock", adapter: createMockAdapter({ persist: false }), ...freshStores() },
    );
    expect(result.status).toBe("validation");
    if (result.status === "validation") {
      expect(result.fields.name).toBe("required");
      expect(result.fields.email).toBe("required");
      expect(result.fields.message).toBe("required");
    }
  });

  it("rejects invalid email and oversized message", async () => {
    const result = await submitEnquiry(
      { ...sample, email: "not-an-email", message: "م".repeat(4001) },
      "10.0.0.4",
      { mode: "mock", adapter: createMockAdapter({ persist: false }), ...freshStores() },
    );
    expect(result.status).toBe("validation");
    if (result.status === "validation") {
      expect(result.fields.email).toBe("invalid-email");
      expect(result.fields.message).toBe("too-long");
    }
  });

  it("rejects honeypot spam", async () => {
    const result = await submitEnquiry(
      { ...sample, website: "https://spam.example" },
      "10.0.0.5",
      { mode: "mock", adapter: createMockAdapter({ persist: false }), ...freshStores() },
    );
    expect(result.status).toBe("spam");
  });

  it("rejects rate-limited repeats from the same IP", async () => {
    const stores = freshStores();
    const deps = {
      mode: "mock" as const,
      adapter: createMockAdapter({ persist: false }),
      ...stores,
      rateMax: 2,
      rateWindowMs: 60_000,
    };
    await submitEnquiry({ ...sample, message: "one" }, "10.0.0.6", deps);
    await submitEnquiry({ ...sample, message: "two" }, "10.0.0.6", deps);
    const limited = await submitEnquiry({ ...sample, message: "three" }, "10.0.0.6", deps);
    expect(limited.status).toBe("rate-limited");
  });

  it("rejects a duplicate of the same enquiry", async () => {
    const stores = freshStores();
    const deps = {
      mode: "mock" as const,
      adapter: createMockAdapter({ persist: false }),
      ...stores,
    };
    const first = await submitEnquiry(sample, "10.0.0.7", deps);
    const second = await submitEnquiry(sample, "10.0.0.7", deps);
    expect(first.status).toBe("accepted");
    expect(second.status).toBe("duplicate");
  });

  it("returns failed when the adapter cannot accept", async () => {
    const result = await submitEnquiry(sample, "10.0.0.8", {
      mode: "mock",
      adapter: createMockAdapter({ fail: true, persist: false }),
      ...freshStores(),
    });
    expect(result.status).toBe("failed");
  });

  it("does not send when production mode is disabled", async () => {
    const result = await submitEnquiry(sample, "10.0.0.9", {
      mode: "disabled",
      adapter: createDisabledAdapter(),
      ...freshStores(),
    });
    expect(result.status).toBe("disabled");
  });

  it("rejects attachments while FR-07 is unconfigured", async () => {
    const result = await submitEnquiry(
      { ...sample, attachments: [{ name: "cv.pdf" }] },
      "10.0.0.10",
      { mode: "mock", adapter: createMockAdapter({ persist: false }), ...freshStores() },
    );
    expect(result.status).toBe("attachments-disabled");
  });
});
