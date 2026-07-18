import type { ContactEnvironment } from "./config";

export type ContactLogReason =
  | "bot-verification-failed"
  | "bot-verification-unavailable"
  | "configuration-invalid"
  | "delivery-failed"
  | "form-disabled"
  | "honeypot-filled"
  | "invalid-content-type"
  | "invalid-json"
  | "invalid-origin"
  | "invalid-payload"
  | "payload-too-large"
  | "preview-disabled"
  | "rate-limit-unavailable"
  | "rate-limited"
  | "stale-or-future-form"
  | "submitted-too-fast"
  | "turnstile-token-missing"
  | "unreadable-body";

export type ContactLogRecord = {
  event: "contact.accepted" | "contact.rejected" | "contact.unavailable";
  requestId: string;
  environment: ContactEnvironment;
  durationMs: number;
  reason?: ContactLogReason;
};

export interface ContactLogger {
  info(record: ContactLogRecord): void;
  warn(record: ContactLogRecord): void;
  error(record: ContactLogRecord): void;
}

const write = (
  method: "error" | "info" | "warn",
  record: ContactLogRecord,
) => console[method](JSON.stringify(record));

export const consoleContactLogger: ContactLogger = {
  info: (record) => write("info", record),
  warn: (record) => write("warn", record),
  error: (record) => write("error", record),
};
