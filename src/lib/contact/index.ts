import "server-only";

export { resolveContactConfig } from "./config";
export type {
  ContactConfigResolution,
  ContactEnvironment,
  EnabledContactConfig,
} from "./config";
export {
  contactRequestSchema,
  contactTopics,
} from "./contract";
export type {
  ContactDelivery,
  ContactDeliveryProvider,
  ContactRequest,
} from "./contract";
export { createContactHandler } from "./handler";
export type {
  ContactLogReason,
  ContactLogRecord,
  ContactLogger,
} from "./logging";
export {
  ExternalContactRateLimiter,
  MemoryContactRateLimiter,
} from "./rate-limit";
export type {
  ContactRateLimiter,
  RateLimitCheck,
  RateLimitResult,
} from "./rate-limit";
