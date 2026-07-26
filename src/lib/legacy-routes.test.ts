import { describe, expect, it } from "vitest";
import { isLegacyPathname, legacyRedirects } from "./legacy-routes";

describe("legacy route allowlist", () => {
  it("contains only unique, explicit sources", () => {
    const sources = legacyRedirects.map(({ source }) => source);

    expect(new Set(sources).size).toBe(sources.length);
    expect(sources.every((source) => !source.includes(":"))).toBe(true);
  });

  it("recognizes only the legacy top-level namespaces", () => {
    expect(isLegacyPathname("/adatkezeles")).toBe(true);
    expect(isLegacyPathname("/works/unknown")).toBe(true);
    expect(isLegacyPathname("/projects/unknown")).toBe(true);
    expect(isLegacyPathname("/hu/work")).toBe(false);
    expect(isLegacyPathname("/workshop")).toBe(false);
  });
});
