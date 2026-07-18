import { describe, expect, it } from "vitest";
import { getGlobalSecurityHeaders } from "./security-headers";

function asRecord(environment: NodeJS.ProcessEnv) {
  return Object.fromEntries(
    getGlobalSecurityHeaders(environment).map(({ key, value }) => [key, value]),
  );
}

describe("global security headers", () => {
  it("applies an allowlist CSP compatible with Next and optional Turnstile", () => {
    const headers = asRecord({ NODE_ENV: "production", VERCEL_ENV: "preview" });
    const policy = headers["Content-Security-Policy"];

    expect(policy).toContain("default-src 'self'");
    expect(policy).toContain(
      "script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com",
    );
    expect(policy).toContain(
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    );
    expect(policy).toContain("font-src 'self' data: https://fonts.gstatic.com");
    expect(policy).toContain(
      "connect-src 'self' https://challenges.cloudflare.com",
    );
    expect(policy).toContain("frame-src https://challenges.cloudflare.com");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("base-uri 'self'");
    expect(policy).toContain("form-action 'self'");
    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).not.toContain("*");
  });

  it("keeps local hot reloading compatible without weakening built output", () => {
    const development = asRecord({ NODE_ENV: "development" });
    const production = asRecord({ NODE_ENV: "production" });

    expect(development["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect(development["Content-Security-Policy"]).toContain(
      "connect-src 'self' ws: https://challenges.cloudflare.com",
    );
    expect(production["Content-Security-Policy"]).not.toContain("'unsafe-eval'");
    expect(production["Content-Security-Policy"]).not.toContain(" ws:");
  });

  it("sets browser capability and framing protections globally", () => {
    const headers = asRecord({ NODE_ENV: "production", VERCEL_ENV: "preview" });

    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Permissions-Policy"]).toBe(
      "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    );
  });

  it("emits HSTS only for an explicitly identified Vercel production build", () => {
    expect(
      asRecord({ NODE_ENV: "production", VERCEL_ENV: "production" })[
        "Strict-Transport-Security"
      ],
    ).toBe("max-age=31536000");
    expect(
      asRecord({ NODE_ENV: "production", VERCEL_ENV: "preview" })[
        "Strict-Transport-Security"
      ],
    ).toBeUndefined();
    expect(
      asRecord({ NODE_ENV: "production" })["Strict-Transport-Security"],
    ).toBeUndefined();
  });
});
