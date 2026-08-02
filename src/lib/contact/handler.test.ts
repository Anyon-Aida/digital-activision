import { describe, expect, it, vi } from "vitest";

import type { EnabledContactConfig } from "./config";
import { contactRequestSchema } from "./contract";
import { createContactHandler } from "./handler";
import type { ContactLogRecord, ContactLogger } from "./logging";
import { createContactEmailContent } from "./provider";

const now = 1_000_000;
const requestId = "00000000-0000-4000-8000-000000000001";

const enabledConfig: EnabledContactConfig = {
  state: "enabled",
  environment: "production",
  allowedOrigins: ["https://portfolio.example"],
  minFillMs: 3_000,
  maxFormAgeMs: 60_000,
  smtp: {
    host: "smtp.example",
    port: 465,
    secure: true,
    user: "smtp-user",
    pass: "smtp-password",
    to: "contact@example.com",
    from: "portfolio@example.com",
  },
  rateLimit: {
    kind: "external",
    endpoint: "https://rate-limit.example/check",
    token: "rate-limit-token",
    keySecret: "a".repeat(32),
    limit: 5,
    windowMs: 60_000,
  },
  turnstileSecret: "turnstile-secret",
};

const validPayload = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "I would like to discuss an engineering collaboration.",
  topic: "career-engineering" as const,
  locale: "en" as const,
  privacyAccepted: true as const,
  website: "",
  startedAt: now - 5_000,
  turnstileToken: "verified-token",
};

const makeRequest = (
  body: unknown = validPayload,
  headers: Record<string, string> = {},
) =>
  new Request("https://portfolio.example/api/contact", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "https://portfolio.example",
      "x-forwarded-for": "203.0.113.10",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });

const createHarness = (
  options: {
    config?: EnabledContactConfig;
    rateResult?: { allowed: boolean; retryAfterSeconds: number };
    rateError?: boolean;
    botResult?: boolean;
    botError?: boolean;
    deliveryError?: boolean;
  } = {},
) => {
  const records: ContactLogRecord[] = [];
  const logger: ContactLogger = {
    info: (record) => records.push(record),
    warn: (record) => records.push(record),
    error: (record) => records.push(record),
  };
  const rateCheck = options.rateError
    ? vi.fn().mockRejectedValue(new Error("external service details"))
    : vi.fn().mockResolvedValue(
        options.rateResult ?? { allowed: true, retryAfterSeconds: 0 },
      );
  const verify = options.botError
    ? vi.fn().mockRejectedValue(new Error("provider response details"))
    : vi.fn().mockResolvedValue(options.botResult ?? true);
  const send = options.deliveryError
    ? vi.fn().mockRejectedValue(new Error("SMTP recipient details"))
    : vi.fn().mockResolvedValue(undefined);
  const handler = createContactHandler({
    resolveConfig: () => options.config ?? enabledConfig,
    createRateLimiter: () => ({ check: rateCheck }),
    createBotVerifier: () => ({ verify }),
    createDeliveryProvider: () => ({ send }),
    logger,
    now: () => now,
    createRequestId: () => requestId,
  });

  return { handler, rateCheck, records, send, verify };
};

describe("contact request contract", () => {
  it("accepts only the explicit typed payload", () => {
    expect(contactRequestSchema.safeParse(validPayload).success).toBe(true);
    expect(
      contactRequestSchema.safeParse({ ...validPayload, admin: true }).success,
    ).toBe(false);
    expect(
      contactRequestSchema.safeParse({ ...validPayload, privacyAccepted: false })
        .success,
    ).toBe(false);
  });

  it("escapes user content in the HTML email without putting names in headers", () => {
    const content = createContactEmailContent({
      requestId,
      name: "<script>Ada</script>",
      email: "ada@example.com",
      message: "Hello <img src=x onerror=alert(1)>",
      topic: "career-engineering",
      locale: "en",
    });

    expect(content.subject).toBe("Portfolio contact — Career / engineering");
    expect(content.subject).not.toContain("Ada");
    expect(content.html).not.toContain("<script>Ada</script>");
    expect(content.html).not.toContain("<img src=x");
    expect(content.html).toContain("&lt;script&gt;Ada&lt;/script&gt;");
    expect(content.html).toContain("&lt;img src=x onerror=alert(1)&gt;");
  });
});

describe("contact handler", () => {
  it("delivers a valid JSON request through all protection layers", async () => {
    const { handler, rateCheck, records, send, verify } = createHarness();
    const response = await handler(makeRequest());

    expect(response.status).toBe(202);
    await expect(response.json()).resolves.toEqual({ ok: true, requestId });
    expect(response.headers.get("cache-control")).toBe("no-store, max-age=0");
    expect(response.headers.get("x-request-id")).toBe(requestId);
    expect(response.headers.get("access-control-allow-origin")).toBe(
      "https://portfolio.example",
    );
    expect(rateCheck).toHaveBeenCalledOnce();
    expect(rateCheck.mock.calls[0][0].key).toMatch(/^contact:[a-f0-9]{64}$/);
    expect(rateCheck.mock.calls[0][0].key).not.toContain("203.0.113.10");
    expect(verify).toHaveBeenCalledWith({ token: "verified-token", requestId });
    expect(send).toHaveBeenCalledWith(
      expect.objectContaining({
        requestId,
        name: "Ada Lovelace",
        email: "ada@example.com",
      }),
    );
    expect(records).toEqual([
      expect.objectContaining({ event: "contact.accepted", requestId }),
    ]);
  });

  it("rejects non-JSON, invalid origins, malformed JSON, and unknown fields", async () => {
    const unsupported = createHarness();
    expect(
      (await unsupported.handler(makeRequest(validPayload, { "content-type": "text/plain" })))
        .status,
    ).toBe(415);

    const wrongOrigin = createHarness();
    expect(
      (await wrongOrigin.handler(makeRequest(validPayload, { origin: "https://evil.example" })))
        .status,
    ).toBe(403);

    const malformed = createHarness();
    expect((await malformed.handler(makeRequest("{"))).status).toBe(400);

    const unknownField = createHarness();
    expect(
      (await unknownField.handler(makeRequest({ ...validPayload, role: "admin" })))
        .status,
    ).toBe(400);
    expect(unknownField.send).not.toHaveBeenCalled();
  });

  it("enforces the body limit even without trusting Content-Length", async () => {
    const { handler, send } = createHarness();
    const request = makeRequest(
      JSON.stringify({ ...validPayload, padding: "x".repeat(13 * 1_024) }),
    );
    request.headers.delete("content-length");
    const response = await handler(request);

    expect(response.status).toBe(413);
    await expect(response.json()).resolves.toMatchObject({
      code: "PAYLOAD_TOO_LARGE",
    });
    expect(send).not.toHaveBeenCalled();
  });

  it.each([
    ["honeypot-filled", { ...validPayload, website: "https://spam.example" }],
    ["submitted-too-fast", { ...validPayload, startedAt: now - 500 }],
    ["stale-or-future-form", { ...validPayload, startedAt: now - 120_000 }],
  ])("silently accepts the %s spam signal without delivery", async (reason, payload) => {
    const { handler, rateCheck, records, send, verify } = createHarness();
    const response = await handler(makeRequest(payload));

    expect(response.status).toBe(202);
    expect(rateCheck).not.toHaveBeenCalled();
    expect(verify).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
    expect(records).toEqual([
      expect.objectContaining({ event: "contact.accepted", reason }),
    ]);
  });

  it("returns Retry-After when the rate limit is exhausted", async () => {
    const { handler, send, verify } = createHarness({
      rateResult: { allowed: false, retryAfterSeconds: 37 },
    });
    const response = await handler(makeRequest());

    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("37");
    expect(verify).not.toHaveBeenCalled();
    expect(send).not.toHaveBeenCalled();
  });

  it("fails closed when the external rate-limit service is unavailable", async () => {
    const { handler, records, send } = createHarness({ rateError: true });
    const response = await handler(makeRequest());

    expect(response.status).toBe(503);
    expect(send).not.toHaveBeenCalled();
    expect(records).toEqual([
      expect.objectContaining({ reason: "rate-limit-unavailable" }),
    ]);
  });

  it("requires and verifies Turnstile without disclosing provider errors", async () => {
    const missingToken = createHarness();
    const withoutToken = { ...validPayload };
    delete (withoutToken as Partial<typeof validPayload>).turnstileToken;
    expect((await missingToken.handler(makeRequest(withoutToken))).status).toBe(400);

    const rejected = createHarness({ botResult: false });
    expect((await rejected.handler(makeRequest())).status).toBe(403);
    expect(rejected.send).not.toHaveBeenCalled();

    const unavailable = createHarness({ botError: true });
    const response = await unavailable.handler(makeRequest());
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain("provider response");
  });

  it("returns a generic delivery error and never logs contact PII", async () => {
    const { handler, records } = createHarness({ deliveryError: true });
    const response = await handler(makeRequest());
    const serializedLogs = JSON.stringify(records);

    expect(response.status).toBe(502);
    expect(serializedLogs).not.toContain(validPayload.name);
    expect(serializedLogs).not.toContain(validPayload.email);
    expect(serializedLogs).not.toContain(validPayload.message);
    expect(serializedLogs).not.toContain("203.0.113.10");
    expect(serializedLogs).not.toContain("SMTP recipient details");
    expect(records).toEqual([
      expect.objectContaining({ reason: "delivery-failed", requestId }),
    ]);
  });

  it("does not initialize providers when the deployment is disabled", async () => {
    const createRateLimiter = vi.fn();
    const createBotVerifier = vi.fn();
    const createDeliveryProvider = vi.fn();
    const handler = createContactHandler({
      resolveConfig: () => ({
        state: "disabled",
        environment: "preview",
        reason: "preview-disabled",
      }),
      createRateLimiter,
      createBotVerifier,
      createDeliveryProvider,
      logger: { info: vi.fn(), warn: vi.fn(), error: vi.fn() },
      now: () => now,
      createRequestId: () => requestId,
    });

    const response = await handler(makeRequest());
    expect(response.status).toBe(503);
    expect(createRateLimiter).not.toHaveBeenCalled();
    expect(createBotVerifier).not.toHaveBeenCalled();
    expect(createDeliveryProvider).not.toHaveBeenCalled();
  });
});
