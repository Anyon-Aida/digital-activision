import { describe, expect, it } from "vitest";

import { resolveContactConfig } from "./config";

const protectedEnvironment = {
  CONTACT_FORM_ENABLED: "true",
  CONTACT_ALLOWED_ORIGINS: "https://portfolio.example, https://studio.example/",
  SMTP_HOST: "smtp.example",
  SMTP_PORT: "465",
  SMTP_USER: "smtp-user",
  SMTP_PASS: "smtp-password",
  CONTACT_TO: "contact@example.com",
  CONTACT_FROM: "portfolio@example.com",
  CONTACT_RATE_LIMIT_ENDPOINT: "https://rate-limit.example/check",
  CONTACT_RATE_LIMIT_TOKEN: "rate-limit-token",
  CONTACT_RATE_LIMIT_KEY_SECRET: "a".repeat(32),
  CONTACT_TURNSTILE_SECRET_KEY: "turnstile-secret",
} as const;

describe("contact configuration", () => {
  it("is disabled unless the form is explicitly enabled", () => {
    expect(resolveContactConfig({ VERCEL_ENV: "production" })).toEqual({
      state: "disabled",
      environment: "production",
      reason: "form-disabled",
    });
  });

  it("keeps Preview disabled by default even when the general flag is enabled", () => {
    expect(
      resolveContactConfig({
        ...protectedEnvironment,
        VERCEL_ENV: "preview",
      }),
    ).toEqual({
      state: "disabled",
      environment: "preview",
      reason: "preview-disabled",
    });
  });

  it("fails closed when production protection or delivery config is incomplete", () => {
    const result = resolveContactConfig({
      VERCEL_ENV: "production",
      CONTACT_FORM_ENABLED: "true",
      CONTACT_ALLOWED_ORIGINS: "https://portfolio.example",
    });

    expect(result.state).toBe("invalid");
    if (result.state === "invalid") {
      expect(result.fields).toEqual(
        expect.arrayContaining(["smtpHost", "smtpUser", "smtpPass", "to", "from"]),
      );
    }
  });

  it("treats a non-Vercel production runtime as production, not development", () => {
    const result = resolveContactConfig({
      NODE_ENV: "production",
      CONTACT_FORM_ENABLED: "true",
    });

    expect(result).toMatchObject({ state: "invalid", environment: "production" });
  });

  it("enables production only with SMTP, origin, external rate limit, and Turnstile", () => {
    const result = resolveContactConfig({
      ...protectedEnvironment,
      VERCEL_ENV: "production",
    });

    expect(result).toMatchObject({
      state: "enabled",
      environment: "production",
      allowedOrigins: ["https://portfolio.example", "https://studio.example"],
      smtp: {
        port: 465,
        secure: true,
        to: "contact@example.com",
        from: "portfolio@example.com",
      },
      rateLimit: {
        kind: "external",
        endpoint: "https://rate-limit.example/check",
        limit: 5,
        windowMs: 600_000,
      },
      turnstileSecret: "turnstile-secret",
    });
  });

  it("fails closed when a production external protection is missing", () => {
    const withoutRateLimitEndpoint = {
      ...protectedEnvironment,
      CONTACT_RATE_LIMIT_ENDPOINT: undefined,
      VERCEL_ENV: "production",
    };
    const result = resolveContactConfig(withoutRateLimitEndpoint);

    expect(result.state).toBe("invalid");
    if (result.state === "invalid") {
      expect(result.fields).toContain("rateLimitEndpoint");
    }
  });

  it("requires explicitly scoped Preview sender and recipient addresses", () => {
    const missingPreviewAddresses = resolveContactConfig({
      ...protectedEnvironment,
      VERCEL_ENV: "preview",
      CONTACT_PREVIEW_ENABLED: "true",
    });
    expect(missingPreviewAddresses.state).toBe("invalid");

    const enabledPreview = resolveContactConfig({
      ...protectedEnvironment,
      VERCEL_ENV: "preview",
      CONTACT_PREVIEW_ENABLED: "true",
      CONTACT_PREVIEW_TO: "preview-inbox@example.com",
      CONTACT_PREVIEW_FROM: "preview-sender@example.com",
    });
    expect(enabledPreview).toMatchObject({
      state: "enabled",
      environment: "preview",
      smtp: {
        to: "preview-inbox@example.com",
        from: "preview-sender@example.com",
      },
    });
  });

  it("rejects wildcard, credentialed, path-based, or insecure deployed origins", () => {
    for (const origin of [
      "https://*.example.com",
      "https://user:pass@example.com",
      "https://example.com/contact",
      "http://portfolio.example",
    ]) {
      const result = resolveContactConfig({
        ...protectedEnvironment,
        VERCEL_ENV: "production",
        CONTACT_ALLOWED_ORIGINS: origin,
      });
      expect(result.state).toBe("invalid");
    }
  });

  it("uses only a best-effort memory limiter for explicitly enabled development", () => {
    const result = resolveContactConfig({
      CONTACT_FORM_ENABLED: "true",
      CONTACT_ALLOWED_ORIGINS: "http://localhost:3000",
      SMTP_HOST: "localhost",
      SMTP_USER: "user",
      SMTP_PASS: "password",
      CONTACT_TO: "to@example.com",
      CONTACT_FROM: "from@example.com",
    });

    expect(result).toMatchObject({
      state: "enabled",
      environment: "development",
      rateLimit: { kind: "memory" },
    });
  });
});
