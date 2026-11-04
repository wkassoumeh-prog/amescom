import { submitEnquiry } from "@/lib/forms/submit";
import type { SubmitResult } from "@/lib/forms/types";

export const runtime = "nodejs";

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "local";
  return "local";
}

function httpStatus(result: SubmitResult): number {
  switch (result.status) {
    case "accepted":
      return 202;
    case "validation":
    case "spam":
    case "attachments-disabled":
      return 400;
    case "rate-limited":
      return 429;
    case "duplicate":
      return 409;
    case "disabled":
      return 503;
    case "failed":
      return 502;
    default:
      return 400;
  }
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("multipart/form-data")) {
    const result: SubmitResult = { status: "attachments-disabled" };
    return Response.json(result, { status: httpStatus(result) });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    const result: SubmitResult = { status: "validation", fields: { form: "required" } };
    return Response.json(result, { status: httpStatus(result) });
  }

  const result = await submitEnquiry(body, clientIp(request));
  if (result.status === "accepted") {
    console.info(
      JSON.stringify({ event: "enquiry.accepted", kind: (body as { kind?: string }).kind, id: result.id, mode: result.mode }),
    );
  }
  return Response.json(result, { status: httpStatus(result) });
}
