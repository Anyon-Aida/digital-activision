const FALLBACK_ORIGIN = "http://localhost:3000";

type SiteEnvironmentKey =
  | "NEXT_PUBLIC_SITE_URL"
  | "NODE_ENV"
  | "VERCEL_ENV"
  | "VERCEL_PROJECT_PRODUCTION_URL";

export type SiteEnvironment = Partial<
  Record<SiteEnvironmentKey, string | undefined>
>;

export type SiteConfiguration = {
  origin: URL;
  indexable: boolean;
  originSource: "configured" | "vercel-production" | "local-fallback";
};

function parseOrigin(value: string | undefined): URL | null {
  if (!value?.trim()) {
    return null;
  }

  try {
    const url = new URL(value.trim());

    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password ||
      url.pathname !== "/" ||
      url.search ||
      url.hash
    ) {
      return null;
    }

    return url;
  } catch {
    return null;
  }
}

function parseVercelProductionOrigin(value: string | undefined): URL | null {
  if (!value?.trim()) {
    return null;
  }

  const normalized = /^https?:\/\//i.test(value.trim())
    ? value.trim()
    : `https://${value.trim()}`;

  return parseOrigin(normalized);
}

function isPublicHttpsOrigin(url: URL): boolean {
  const hostname = url.hostname.toLowerCase();

  return (
    url.protocol === "https:" &&
    hostname !== "localhost" &&
    hostname !== "0.0.0.0" &&
    hostname !== "127.0.0.1" &&
    hostname !== "[::1]" &&
    !hostname.endsWith(".local")
  );
}

/**
 * Resolves the canonical origin and indexing policy without trusting a Preview
 * hostname. Indexing is intentionally fail-closed: a Vercel Production runtime,
 * a production Node runtime and a valid public HTTPS canonical origin are all
 * required. An explicit canonical origin may be a verified custom domain; when
 * it is absent, Vercel's stable production origin is used.
 */
export function getSiteConfiguration(
  environment: SiteEnvironment = process.env,
): SiteConfiguration {
  const configuredOrigin = parseOrigin(environment.NEXT_PUBLIC_SITE_URL);
  const productionOrigin = parseVercelProductionOrigin(
    environment.VERCEL_PROJECT_PRODUCTION_URL,
  );

  const origin =
    configuredOrigin ?? productionOrigin ?? new URL(FALLBACK_ORIGIN);
  const originSource = configuredOrigin
    ? "configured"
    : productionOrigin
      ? "vercel-production"
      : "local-fallback";
  const configuredValueIsInvalid =
    Boolean(environment.NEXT_PUBLIC_SITE_URL?.trim()) && !configuredOrigin;
  const hasVerifiedOrigin = Boolean(configuredOrigin ?? productionOrigin);

  return {
    origin,
    originSource,
    indexable:
      !configuredValueIsInvalid &&
      environment.NODE_ENV === "production" &&
      environment.VERCEL_ENV === "production" &&
      isPublicHttpsOrigin(origin) &&
      hasVerifiedOrigin,
  };
}
