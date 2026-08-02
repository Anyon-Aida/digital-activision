import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins present class names without leaking falsey values", () => {
    expect(cn("base", false, undefined, "active", null)).toBe(
      "base active",
    );
  });
});
