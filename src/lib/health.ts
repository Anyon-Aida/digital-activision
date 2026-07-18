import { randomUUID } from "node:crypto";

type HealthEnvironment = Readonly<Record<string, string | undefined>>;

const getSafeVersion = (environment: HealthEnvironment) => {
  const commit = environment.VERCEL_GIT_COMMIT_SHA;
  return commit && /^[a-f0-9]{7,40}$/i.test(commit)
    ? commit.slice(0, 7).toLowerCase()
    : "unknown";
};

const getSafeBuildTime = (environment: HealthEnvironment) => {
  const value = environment.BUILD_TIME;
  if (!value) return null;

  const timestamp = Date.parse(value);
  if (!Number.isFinite(timestamp)) return null;
  return new Date(timestamp).toISOString();
};

export const getHealthPayload = (
  environment: HealthEnvironment = process.env,
) => ({
  status: "ok" as const,
  version: getSafeVersion(environment),
  buildTime: getSafeBuildTime(environment),
});

export const createHealthHandler = (
  environment: HealthEnvironment = process.env,
  createRequestId: () => string = randomUUID,
) => async (): Promise<Response> => {
  const requestId = createRequestId();
  return new Response(JSON.stringify(getHealthPayload(environment)), {
    status: 200,
    headers: {
      "cache-control": "no-store, max-age=0",
      "content-type": "application/json; charset=utf-8",
      pragma: "no-cache",
      "x-content-type-options": "nosniff",
      "x-request-id": requestId,
    },
  });
};
