import { randomUUID } from "node:crypto";

import {
  resolveContactConfig,
  type ContactConfigResolution,
  type EnabledContactConfig,
} from "./config";
import {
  contactRequestSchema,
  type ContactDeliveryProvider,
} from "./contract";
import {
  consoleContactLogger,
  type ContactLogReason,
  type ContactLogger,
} from "./logging";
import { SmtpContactDeliveryProvider } from "./provider";
import {
  ExternalContactRateLimiter,
  sharedMemoryContactRateLimiter,
  type ContactRateLimiter,
} from "./rate-limit";
import {
  ContactBodyError,
  createRateLimitKey,
  getClientAddress,
  getSpamSignal,
  isAllowedOrigin,
  isJsonRequest,
  readLimitedJson,
} from "./request";
import {
  TurnstileContactVerifier,
  type ContactBotVerifier,
} from "./turnstile";

type ContactHandlerDependencies = {
  resolveConfig: () => ContactConfigResolution;
  createRateLimiter: (config: EnabledContactConfig) => ContactRateLimiter;
  createBotVerifier: (
    config: EnabledContactConfig,
  ) => ContactBotVerifier | null;
  createDeliveryProvider: (
    config: EnabledContactConfig,
  ) => ContactDeliveryProvider;
  logger: ContactLogger;
  now: () => number;
  createRequestId: () => string;
};

const defaultDependencies: ContactHandlerDependencies = {
  resolveConfig: () => resolveContactConfig(),
  createRateLimiter: (config) =>
    config.rateLimit.kind === "external"
      ? new ExternalContactRateLimiter(
          config.rateLimit.endpoint,
          config.rateLimit.token,
        )
      : sharedMemoryContactRateLimiter,
  createBotVerifier: (config) =>
    config.turnstileSecret
      ? new TurnstileContactVerifier(config.turnstileSecret)
      : null,
  createDeliveryProvider: (config) =>
    new SmtpContactDeliveryProvider(config.smtp),
  logger: consoleContactLogger,
  now: Date.now,
  createRequestId: randomUUID,
};

const getAllowedResponseOrigin = (
  request: Request,
  allowedOrigins: readonly string[],
) => {
  const origin = request.headers.get("origin");
  if (!origin) return undefined;

  try {
    const normalized = new URL(origin).origin;
    return allowedOrigins.includes(normalized) ? normalized : undefined;
  } catch {
    return undefined;
  }
};

const jsonResponse = (
  payload: Record<string, unknown>,
  status: number,
  requestId: string,
  allowedOrigin?: string,
  extraHeaders?: HeadersInit,
) => {
  const headers = new Headers(extraHeaders);
  headers.set("cache-control", "no-store, max-age=0");
  headers.set("content-type", "application/json; charset=utf-8");
  headers.set("pragma", "no-cache");
  headers.set("x-content-type-options", "nosniff");
  headers.set("x-request-id", requestId);
  if (allowedOrigin) {
    headers.set("access-control-allow-origin", allowedOrigin);
    headers.set("vary", "Origin");
  }

  return new Response(JSON.stringify(payload), { status, headers });
};

export const createContactHandler = (
  overrides: Partial<ContactHandlerDependencies> = {},
) => {
  const dependencies = { ...defaultDependencies, ...overrides };

  return async (request: Request): Promise<Response> => {
    const startedAt = dependencies.now();
    const requestId = dependencies.createRequestId();
    const configResolution = dependencies.resolveConfig();
    const environment = configResolution.environment;
    const duration = () => Math.max(0, dependencies.now() - startedAt);
    const log = (
      level: keyof ContactLogger,
      event: "contact.accepted" | "contact.rejected" | "contact.unavailable",
      reason?: ContactLogReason,
    ) =>
      dependencies.logger[level]({
        event,
        requestId,
        environment,
        durationMs: duration(),
        ...(reason ? { reason } : {}),
      });

    if (configResolution.state === "disabled") {
      log("warn", "contact.unavailable", configResolution.reason);
      return jsonResponse(
        { ok: false, code: "CONTACT_DISABLED", requestId },
        503,
        requestId,
      );
    }

    if (configResolution.state === "invalid") {
      log("error", "contact.unavailable", "configuration-invalid");
      return jsonResponse(
        { ok: false, code: "CONTACT_UNAVAILABLE", requestId },
        503,
        requestId,
      );
    }

    const config = configResolution;
    const allowedOrigin = getAllowedResponseOrigin(
      request,
      config.allowedOrigins,
    );

    if (!isJsonRequest(request)) {
      log("warn", "contact.rejected", "invalid-content-type");
      return jsonResponse(
        { ok: false, code: "UNSUPPORTED_MEDIA_TYPE", requestId },
        415,
        requestId,
        allowedOrigin,
      );
    }

    if (!isAllowedOrigin(request, config.allowedOrigins)) {
      log("warn", "contact.rejected", "invalid-origin");
      return jsonResponse(
        { ok: false, code: "ORIGIN_NOT_ALLOWED", requestId },
        403,
        requestId,
      );
    }

    let rawInput: unknown;
    try {
      rawInput = await readLimitedJson(request);
    } catch (error) {
      const reason =
        error instanceof ContactBodyError ? error.code : "unreadable-body";
      const status = reason === "payload-too-large" ? 413 : 400;
      log("warn", "contact.rejected", reason);
      return jsonResponse(
        {
          ok: false,
          code:
            reason === "payload-too-large"
              ? "PAYLOAD_TOO_LARGE"
              : "INVALID_JSON",
          requestId,
        },
        status,
        requestId,
        allowedOrigin,
      );
    }

    const parsedInput = contactRequestSchema.safeParse(rawInput);
    if (!parsedInput.success) {
      log("warn", "contact.rejected", "invalid-payload");
      return jsonResponse(
        { ok: false, code: "INVALID_PAYLOAD", requestId },
        400,
        requestId,
        allowedOrigin,
      );
    }

    const input = parsedInput.data;
    const spamSignal = getSpamSignal(
      input,
      dependencies.now(),
      config.minFillMs,
      config.maxFormAgeMs,
    );

    if (spamSignal) {
      log("info", "contact.accepted", spamSignal);
      return jsonResponse(
        { ok: true, requestId },
        202,
        requestId,
        allowedOrigin,
      );
    }

    const clientAddress = getClientAddress(request.headers);
    const rateLimitKey = createRateLimitKey(
      clientAddress,
      config.rateLimit.keySecret,
    );
    let rateLimitResult;
    try {
      rateLimitResult = await dependencies.createRateLimiter(config).check({
        key: rateLimitKey,
        limit: config.rateLimit.limit,
        windowMs: config.rateLimit.windowMs,
        requestId,
      });
    } catch {
      log("error", "contact.unavailable", "rate-limit-unavailable");
      return jsonResponse(
        { ok: false, code: "CONTACT_UNAVAILABLE", requestId },
        503,
        requestId,
        allowedOrigin,
      );
    }

    if (!rateLimitResult.allowed) {
      log("warn", "contact.rejected", "rate-limited");
      return jsonResponse(
        { ok: false, code: "RATE_LIMITED", requestId },
        429,
        requestId,
        allowedOrigin,
        {
          "retry-after": String(Math.max(1, rateLimitResult.retryAfterSeconds)),
        },
      );
    }

    const botVerifier = dependencies.createBotVerifier(config);
    if (botVerifier) {
      if (!input.turnstileToken) {
        log("warn", "contact.rejected", "turnstile-token-missing");
        return jsonResponse(
          { ok: false, code: "BOT_VERIFICATION_REQUIRED", requestId },
          400,
          requestId,
          allowedOrigin,
        );
      }

      let verified: boolean;
      try {
        verified = await botVerifier.verify({
          token: input.turnstileToken,
          requestId,
        });
      } catch {
        log("error", "contact.unavailable", "bot-verification-unavailable");
        return jsonResponse(
          { ok: false, code: "CONTACT_UNAVAILABLE", requestId },
          503,
          requestId,
          allowedOrigin,
        );
      }

      if (!verified) {
        log("warn", "contact.rejected", "bot-verification-failed");
        return jsonResponse(
          { ok: false, code: "BOT_VERIFICATION_FAILED", requestId },
          403,
          requestId,
          allowedOrigin,
        );
      }
    }

    try {
      await dependencies.createDeliveryProvider(config).send({
        requestId,
        name: input.name,
        email: input.email,
        message: input.message,
        topic: input.topic,
        locale: input.locale,
      });
    } catch {
      log("error", "contact.unavailable", "delivery-failed");
      return jsonResponse(
        { ok: false, code: "DELIVERY_UNAVAILABLE", requestId },
        502,
        requestId,
        allowedOrigin,
      );
    }

    log("info", "contact.accepted");
    return jsonResponse(
      { ok: true, requestId },
      202,
      requestId,
      allowedOrigin,
    );
  };
};
