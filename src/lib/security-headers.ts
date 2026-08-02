export type SecurityHeader = {
  key: string;
  value: string;
};

const turnstileOrigin = "https://challenges.cloudflare.com";

function createContentSecurityPolicy(isDevelopment: boolean) {
  const scriptSources = [
    "'self'",
    "'unsafe-inline'",
    ...(isDevelopment ? ["'unsafe-eval'"] : []),
    turnstileOrigin,
  ];
  const connectSources = [
    "'self'",
    ...(isDevelopment ? ["ws:"] : []),
    turnstileOrigin,
  ];

  return [
    "default-src 'self'",
    `script-src ${scriptSources.join(" ")}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob:",
    "font-src 'self' data: https://fonts.gstatic.com",
    `connect-src ${connectSources.join(" ")}`,
    `frame-src ${turnstileOrigin}`,
    "worker-src 'self' blob:",
    "manifest-src 'self'",
    "media-src 'self'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
  ].join("; ");
}

export function getGlobalSecurityHeaders(
  environment: NodeJS.ProcessEnv = process.env,
): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    {
      key: "Content-Security-Policy",
      value: createContentSecurityPolicy(
        environment.NODE_ENV === "development",
      ),
    },
    {
      key: "Referrer-Policy",
      value: "strict-origin-when-cross-origin",
    },
    { key: "X-Content-Type-Options", value: "nosniff" },
    {
      key: "Permissions-Policy",
      value:
        "browsing-topics=(), camera=(), geolocation=(), microphone=(), payment=(), usb=()",
    },
    { key: "X-Frame-Options", value: "DENY" },
  ];

  if (environment.VERCEL_ENV === "production") {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=31536000",
    });
  }

  return headers;
}
