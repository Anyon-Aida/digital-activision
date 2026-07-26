import { z } from "zod";

export type BotVerificationInput = {
  token: string;
  requestId: string;
};

export interface ContactBotVerifier {
  verify(input: BotVerificationInput): Promise<boolean>;
}

const turnstileResponseSchema = z
  .object({
    success: z.boolean(),
  })
  .passthrough();

export class TurnstileContactVerifier implements ContactBotVerifier {
  constructor(
    private readonly secret: string,
    private readonly fetchImplementation: typeof fetch = fetch,
    private readonly timeoutMs = 3_000,
  ) {}

  async verify(input: BotVerificationInput): Promise<boolean> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
    const body = new URLSearchParams({
      secret: this.secret,
      response: input.token,
      idempotency_key: input.requestId,
    });

    try {
      const response = await this.fetchImplementation(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: {
            "content-type": "application/x-www-form-urlencoded",
          },
          body,
          cache: "no-store",
          signal: controller.signal,
        },
      );

      if (!response.ok) throw new Error("turnstile-service-rejected");
      return turnstileResponseSchema.parse(await response.json()).success;
    } finally {
      clearTimeout(timeout);
    }
  }
}
