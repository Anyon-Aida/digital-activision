import { describe, expect, it } from "vitest";
import {
  isLocale,
  isUnsupportedLocaleSegment,
  routing,
} from "./routing";

describe("locale routing", () => {
  it("has a deterministic Hungarian default and exact supported locales", () => {
    expect(routing.defaultLocale).toBe("hu");
    expect(routing.locales).toEqual(["hu", "en"]);
    expect(isLocale("hu")).toBe(true);
    expect(isLocale("en")).toBe(true);
    expect(isLocale("de")).toBe(false);
  });

  it("rejects locale-shaped unsupported URL segments without treating routes as locales", () => {
    expect(isUnsupportedLocaleSegment("de")).toBe(true);
    expect(isUnsupportedLocaleSegment("de-DE")).toBe(true);
    expect(isUnsupportedLocaleSegment("EN")).toBe(true);
    expect(isUnsupportedLocaleSegment("work")).toBe(false);
    expect(isUnsupportedLocaleSegment(undefined)).toBe(false);
  });
});
