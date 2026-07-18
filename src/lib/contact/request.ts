import { createHmac, randomBytes } from "node:crypto";
import { isIP } from "node:net";

import type { ContactRequest } from "./contract";

export const CONTACT_BODY_LIMIT_BYTES = 12 * 1_024;

export class ContactBodyError extends Error {
  constructor(
    readonly code: "invalid-json" | "payload-too-large" | "unreadable-body",
  ) {
    super(code);
    this.name = "ContactBodyError";
  }
}

export const isJsonRequest = (request: Request) =>
  request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() ===
  "application/json";

export const readLimitedJson = async (
  request: Request,
  limitBytes = CONTACT_BODY_LIMIT_BYTES,
): Promise<unknown> => {
  const declaredLength = request.headers.get("content-length");
  if (declaredLength) {
    const parsedLength = Number(declaredLength);
    if (Number.isFinite(parsedLength) && parsedLength > limitBytes) {
      throw new ContactBodyError("payload-too-large");
    }
  }

  if (!request.body) throw new ContactBodyError("invalid-json");

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;

      totalBytes += value.byteLength;
      if (totalBytes > limitBytes) {
        await reader.cancel();
        throw new ContactBodyError("payload-too-large");
      }
      chunks.push(value);
    }
  } catch (error) {
    if (error instanceof ContactBodyError) throw error;
    throw new ContactBodyError("unreadable-body");
  }

  const bytes = new Uint8Array(totalBytes);
  let offset = 0;
  chunks.forEach((chunk) => {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  });

  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new ContactBodyError("invalid-json");
  }
};

export const isAllowedOrigin = (
  request: Request,
  allowedOrigins: readonly string[],
) => {
  const rawOrigin = request.headers.get("origin");
  if (!rawOrigin) return false;

  try {
    return allowedOrigins.includes(new URL(rawOrigin).origin);
  } catch {
    return false;
  }
};

const extractAddress = (rawAddress: string | null) => {
  const candidate = rawAddress?.split(",", 1)[0]?.trim() ?? "";
  return isIP(candidate) ? candidate : "unknown";
};

export const getClientAddress = (headers: Headers) =>
  extractAddress(
    headers.get("x-vercel-forwarded-for") ??
      headers.get("x-forwarded-for") ??
      headers.get("x-real-ip"),
  );

const ephemeralKeySecret = randomBytes(32).toString("hex");

export const createRateLimitKey = (
  address: string,
  keySecret?: string,
) => {
  const secret = keySecret ?? ephemeralKeySecret;
  return `contact:${createHmac("sha256", secret).update(address).digest("hex")}`;
};

export type SpamSignal =
  | "honeypot-filled"
  | "submitted-too-fast"
  | "stale-or-future-form";

export const getSpamSignal = (
  input: Pick<ContactRequest, "startedAt" | "website">,
  now: number,
  minimumFillMs: number,
  maximumFormAgeMs: number,
): SpamSignal | null => {
  if (input.website.trim()) return "honeypot-filled";

  const elapsed = now - input.startedAt;
  if (elapsed < minimumFillMs && elapsed >= -5_000) {
    return "submitted-too-fast";
  }
  if (elapsed < -5_000 || elapsed > maximumFormAgeMs) {
    return "stale-or-future-form";
  }

  return null;
};
