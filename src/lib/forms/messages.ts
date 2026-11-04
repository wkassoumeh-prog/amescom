import { formCopy } from "@content/forms";
import type { Locale } from "@content/types";
import type { FieldErrorCode, FormMode, SubmitResult } from "./types";

export function fieldErrorMessage(code: FieldErrorCode, locale: Locale): string {
  if (code === "invalid-email") return formCopy.invalidEmail[locale];
  if (code === "too-long") return formCopy.tooLong[locale];
  if (code === "unknown-value") return formCopy.unknownValue[locale];
  return formCopy.validation[locale];
}

export function noticeForMode(mode: FormMode, locale: Locale): string {
  return mode === "disabled" ? formCopy.disabledNotice[locale] : formCopy.mockNotice[locale];
}

export function resultMessage(result: SubmitResult, locale: Locale): string {
  switch (result.status) {
    case "accepted":
      return formCopy.mockAccepted[locale];
    case "rate-limited":
      return formCopy.rateLimited[locale];
    case "duplicate":
      return formCopy.duplicate[locale];
    case "disabled":
      return formCopy.disabled[locale];
    case "attachments-disabled":
      return formCopy.attachmentDisabled[locale];
    case "validation":
      return formCopy.validation[locale];
    case "spam":
    case "failed":
      return formCopy.failure[locale];
    default:
      return formCopy.failure[locale];
  }
}
