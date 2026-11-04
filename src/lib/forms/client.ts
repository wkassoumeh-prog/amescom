import type { EnquiryInput, SubmitResult } from "./types";

export async function postEnquiry(input: EnquiryInput): Promise<SubmitResult> {
  try {
    const response = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(input),
    });
    const data = (await response.json()) as SubmitResult;
    if (!data?.status) return { status: "failed" };
    return data;
  } catch {
    return { status: "failed" };
  }
}
