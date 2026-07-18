import { describe, expect, it, vi } from "vitest";

import { TurnstileContactVerifier } from "./turnstile";

describe("Turnstile contact verification", () => {
  it("posts the token and idempotency key directly to Turnstile", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response(JSON.stringify({ success: true, hostname: "portfolio.example" })),
      );
    const verifier = new TurnstileContactVerifier(
      "turnstile-secret",
      fetchMock,
    );

    await expect(
      verifier.verify({ token: "client-token", requestId: "request-id" }),
    ).resolves.toBe(true);

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    expect(init).toMatchObject({ method: "POST", cache: "no-store" });
    expect(String(init?.body)).toContain("secret=turnstile-secret");
    expect(String(init?.body)).toContain("response=client-token");
    expect(String(init?.body)).toContain("idempotency_key=request-id");
  });

  it("returns false for a rejected challenge", async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(JSON.stringify({ success: false })));
    const verifier = new TurnstileContactVerifier("secret", fetchMock);

    await expect(
      verifier.verify({ token: "bad-token", requestId: "request-id" }),
    ).resolves.toBe(false);
  });
});
