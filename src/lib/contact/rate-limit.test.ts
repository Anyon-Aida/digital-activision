import { describe, expect, it, vi } from "vitest";

import {
  ExternalContactRateLimiter,
  MemoryContactRateLimiter,
} from "./rate-limit";

describe("contact rate limiting", () => {
  it("enforces a fixed window in the best-effort memory implementation", async () => {
    let now = 1_000;
    const limiter = new MemoryContactRateLimiter(() => now);
    const input = {
      key: "contact:anonymous",
      limit: 2,
      windowMs: 10_000,
      requestId: "request-id",
    };

    await expect(limiter.check(input)).resolves.toMatchObject({
      allowed: true,
      remaining: 1,
    });
    await expect(limiter.check(input)).resolves.toMatchObject({
      allowed: true,
      remaining: 0,
    });
    await expect(limiter.check(input)).resolves.toMatchObject({
      allowed: false,
      retryAfterSeconds: 10,
    });

    now += 10_001;
    await expect(limiter.check(input)).resolves.toMatchObject({
      allowed: true,
      remaining: 1,
    });
  });

  it("uses a strict, no-store external integration contract", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          allowed: false,
          retryAfterSeconds: 42,
          remaining: 0,
        }),
        { status: 200 },
      ),
    );
    const limiter = new ExternalContactRateLimiter(
      "https://rate-limit.example/check",
      "secret-token",
      fetchMock,
    );

    await expect(
      limiter.check({
        key: "contact:hashed-key",
        limit: 5,
        windowMs: 60_000,
        requestId: "request-id",
      }),
    ).resolves.toEqual({
      allowed: false,
      retryAfterSeconds: 42,
      remaining: 0,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://rate-limit.example/check");
    expect(init).toMatchObject({
      method: "POST",
      cache: "no-store",
    });
    expect(String(new Headers(init?.headers).get("authorization"))).toBe(
      "Bearer secret-token",
    );
    expect(JSON.parse(String(init?.body))).toEqual({
      key: "contact:hashed-key",
      limit: 5,
      windowSeconds: 60,
      requestId: "request-id",
    });
  });
});
