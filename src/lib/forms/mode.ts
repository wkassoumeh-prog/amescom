import type { FormMode } from "./types";

/**
 * No live provider is configured (Q09). Production stays disabled.
 * Development defaults to local mock acceptance.
 */
export function formMode(env: NodeJS.ProcessEnv = process.env): FormMode {
  if (env.AMESCOM_FORM_MODE === "mock") return "mock";
  if (env.AMESCOM_FORM_MODE === "disabled") return "disabled";
  return env.NODE_ENV === "production" ? "disabled" : "mock";
}
