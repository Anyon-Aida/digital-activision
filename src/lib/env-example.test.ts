import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe(".env.example contract", () => {
  it("keeps every assignment empty so example values cannot become configuration", () => {
    const source = readFileSync(resolve(process.cwd(), ".env.example"), "utf8");
    const assignments = [...source.matchAll(/^([A-Z][A-Z0-9_]*)=(.*)$/gm)];

    expect(assignments.length).toBeGreaterThan(0);
    expect(
      assignments
        .filter(([, , value]) => value.length > 0)
        .map(([, key]) => key),
    ).toEqual([]);
  });
});
