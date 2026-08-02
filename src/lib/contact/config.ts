import { z } from "zod";

export type ContactEnvironment = "development" | "preview" | "production";

export type ContactRateLimitConfig =
  | {
      kind: "memory";
      keySecret?: string;
      limit: number;
      windowMs: number;
    }
  | {
      kind: "external";
      endpoint: string;
      token: string;
      keySecret: string;
      limit: number;
      windowMs: number;
    };

export type EnabledContactConfig = {
  state: "enabled";
  environment: ContactEnvironment;
  allowedOrigins: readonly string[];
  minFillMs: number;
  maxFormAgeMs: number;
  smtp: {
    host: string;
    port: number;
    secure: boolean;
    user: string;
    pass: string;
    to: string;
    from: string;
  };
  rateLimit: ContactRateLimitConfig;
  turnstileSecret?: string;
};

export type ContactConfigResolution =
  | EnabledContactConfig
  | {
      state: "disabled";
      environment: ContactEnvironment;
      reason: "form-disabled" | "preview-disabled";
    }
  | {
      state: "invalid";
      environment: ContactEnvironment;
      fields: readonly string[];
    };

type EnvironmentSource = Readonly<Record<string, string | undefined>>;

const bareEmailSchema = z.string().trim().email().max(254);
const secretSchema = z.string().min(1).max(4_096);
const hostSchema = z
  .string()
  .trim()
  .min(1)
  .max(253)
  .refine((value) => !value.includes("://"), "SMTP host must not include a protocol.");

const baseConfigSchema = z
  .object({
    allowedOrigins: z.array(z.string()).min(1).max(12),
    smtpHost: hostSchema,
    smtpPort: z.coerce.number().int().min(1).max(65_535),
    smtpUser: z.string().trim().min(1).max(320),
    smtpPass: secretSchema,
    to: bareEmailSchema,
    from: bareEmailSchema,
    minFillMs: z.coerce.number().int().min(1_000).max(30_000),
    maxFormAgeMs: z.coerce
      .number()
      .int()
      .min(60_000)
      .max(86_400_000),
    rateLimit: z.coerce.number().int().min(1).max(100),
    rateLimitWindowMs: z.coerce
      .number()
      .int()
      .min(10_000)
      .max(86_400_000),
  })
  .strict();

const externalProtectionSchema = z
  .object({
    rateLimitEndpoint: z.string().url().refine((value) => value.startsWith("https://")),
    rateLimitToken: secretSchema,
    rateLimitKeySecret: z.string().min(32).max(4_096),
    turnstileSecret: secretSchema,
  })
  .strict();

const getContactEnvironment = (
  environment: EnvironmentSource,
): ContactEnvironment => {
  if (environment.VERCEL_ENV === "production") return "production";
  if (environment.VERCEL_ENV === "preview") return "preview";
  if (environment.NODE_ENV === "production") return "production";
  return "development";
};

const parseAllowedOrigins = (
  rawValue: string | undefined,
  deployment: ContactEnvironment,
) => {
  const rawOrigins = (rawValue ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  const normalized = rawOrigins.map((value) => {
    try {
      const url = new URL(value);
      const isSecure = url.protocol === "https:";
      const isLocalDevelopment =
        deployment === "development" &&
        url.protocol === "http:" &&
        ["127.0.0.1", "localhost"].includes(url.hostname);

      if (
        (!isSecure && !isLocalDevelopment) ||
        url.username ||
        url.password ||
        (url.pathname !== "/" && url.pathname !== "") ||
        url.search ||
        url.hash ||
        value.includes("*")
      ) {
        return null;
      }

      return url.origin;
    } catch {
      return null;
    }
  });

  if (normalized.some((origin) => origin === null)) return null;
  return [...new Set(normalized as string[])];
};

const issueFields = (issues: z.ZodIssue[]) => [
  ...new Set(
    issues.map((issue) =>
      issue.path.length > 0 ? String(issue.path[0]) : "configuration",
    ),
  ),
];

export const resolveContactConfig = (
  environment: EnvironmentSource = process.env,
): ContactConfigResolution => {
  const deployment = getContactEnvironment(environment);

  if (environment.CONTACT_FORM_ENABLED !== "true") {
    return {
      state: "disabled",
      environment: deployment,
      reason: "form-disabled",
    };
  }

  if (
    deployment === "preview" &&
    environment.CONTACT_PREVIEW_ENABLED !== "true"
  ) {
    return {
      state: "disabled",
      environment: deployment,
      reason: "preview-disabled",
    };
  }

  const allowedOrigins = parseAllowedOrigins(
    environment.CONTACT_ALLOWED_ORIGINS,
    deployment,
  );
  const recipient =
    deployment === "preview"
      ? environment.CONTACT_PREVIEW_TO
      : environment.CONTACT_TO;
  const sender =
    deployment === "preview"
      ? environment.CONTACT_PREVIEW_FROM
      : environment.CONTACT_FROM;

  const baseResult = baseConfigSchema.safeParse({
    allowedOrigins: allowedOrigins ?? [],
    smtpHost: environment.SMTP_HOST,
    smtpPort: environment.SMTP_PORT ?? "587",
    smtpUser: environment.SMTP_USER,
    smtpPass: environment.SMTP_PASS,
    to: recipient,
    from: sender,
    minFillMs: environment.CONTACT_MIN_FILL_MS ?? "3000",
    maxFormAgeMs: environment.CONTACT_MAX_FORM_AGE_MS ?? "7200000",
    rateLimit: environment.CONTACT_RATE_LIMIT_MAX ?? "5",
    rateLimitWindowMs:
      environment.CONTACT_RATE_LIMIT_WINDOW_MS ?? "600000",
  });

  if (!baseResult.success) {
    return {
      state: "invalid",
      environment: deployment,
      fields: issueFields(baseResult.error.issues),
    };
  }

  const base = baseResult.data;
  const common = {
    state: "enabled" as const,
    environment: deployment,
    allowedOrigins: base.allowedOrigins,
    minFillMs: base.minFillMs,
    maxFormAgeMs: base.maxFormAgeMs,
    smtp: {
      host: base.smtpHost,
      port: base.smtpPort,
      secure: base.smtpPort === 465,
      user: base.smtpUser,
      pass: base.smtpPass,
      to: base.to,
      from: base.from,
    },
  };

  if (deployment === "development") {
    const keySecret = environment.CONTACT_RATE_LIMIT_KEY_SECRET;
    if (keySecret && keySecret.length < 16) {
      return {
        state: "invalid",
        environment: deployment,
        fields: ["rateLimitKeySecret"],
      };
    }

    return {
      ...common,
      rateLimit: {
        kind: "memory",
        keySecret,
        limit: base.rateLimit,
        windowMs: base.rateLimitWindowMs,
      },
    };
  }

  const protectionResult = externalProtectionSchema.safeParse({
    rateLimitEndpoint: environment.CONTACT_RATE_LIMIT_ENDPOINT,
    rateLimitToken: environment.CONTACT_RATE_LIMIT_TOKEN,
    rateLimitKeySecret: environment.CONTACT_RATE_LIMIT_KEY_SECRET,
    turnstileSecret: environment.CONTACT_TURNSTILE_SECRET_KEY,
  });

  if (!protectionResult.success) {
    return {
      state: "invalid",
      environment: deployment,
      fields: issueFields(protectionResult.error.issues),
    };
  }

  return {
    ...common,
    rateLimit: {
      kind: "external",
      endpoint: protectionResult.data.rateLimitEndpoint,
      token: protectionResult.data.rateLimitToken,
      keySecret: protectionResult.data.rateLimitKeySecret,
      limit: base.rateLimit,
      windowMs: base.rateLimitWindowMs,
    },
    turnstileSecret: protectionResult.data.turnstileSecret,
  };
};
