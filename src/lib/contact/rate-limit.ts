import { z } from "zod";

export type RateLimitCheck = {
  key: string;
  limit: number;
  windowMs: number;
  requestId: string;
};

export type RateLimitResult = {
  allowed: boolean;
  retryAfterSeconds: number;
  remaining?: number;
};

export interface ContactRateLimiter {
  check(input: RateLimitCheck): Promise<RateLimitResult>;
}

type MemoryEntry = {
  count: number;
  resetAt: number;
};

export class MemoryContactRateLimiter implements ContactRateLimiter {
  private readonly entries = new Map<string, MemoryEntry>();

  constructor(
    private readonly now: () => number = Date.now,
    private readonly maximumEntries = 10_000,
  ) {}

  async check(input: RateLimitCheck): Promise<RateLimitResult> {
    const now = this.now();
    this.prune(now);

    const current = this.entries.get(input.key);
    const entry =
      current && current.resetAt > now
        ? current
        : { count: 0, resetAt: now + input.windowMs };

    entry.count += 1;
    this.entries.set(input.key, entry);

    const allowed = entry.count <= input.limit;
    return {
      allowed,
      remaining: Math.max(0, input.limit - entry.count),
      retryAfterSeconds: allowed
        ? 0
        : Math.max(1, Math.ceil((entry.resetAt - now) / 1_000)),
    };
  }

  private prune(now: number) {
    this.entries.forEach((entry, key) => {
      if (entry.resetAt <= now) this.entries.delete(key);
    });

    while (this.entries.size >= this.maximumEntries) {
      const oldestKey = this.entries.keys().next().value;
      if (typeof oldestKey !== "string") break;
      this.entries.delete(oldestKey);
    }
  }
}

const externalResultSchema = z
  .object({
    allowed: z.boolean(),
    retryAfterSeconds: z.number().int().min(0).max(86_400),
    remaining: z.number().int().min(0).optional(),
  })
  .strict();

export class ExternalContactRateLimiter implements ContactRateLimiter {
  constructor(
    private readonly endpoint: string,
    private readonly token: string,
    private readonly fetchImplementation: typeof fetch = fetch,
    private readonly timeoutMs = 3_000,
  ) {}

  async check(input: RateLimitCheck): Promise<RateLimitResult> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await this.fetchImplementation(this.endpoint, {
        method: "POST",
        headers: {
          authorization: `Bearer ${this.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          key: input.key,
          limit: input.limit,
          windowSeconds: Math.ceil(input.windowMs / 1_000),
          requestId: input.requestId,
        }),
        cache: "no-store",
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("rate-limit-service-rejected");
      return externalResultSchema.parse(await response.json());
    } finally {
      clearTimeout(timeout);
    }
  }
}

export const sharedMemoryContactRateLimiter = new MemoryContactRateLimiter();
