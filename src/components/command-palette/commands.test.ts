import { describe, expect, it, vi } from "vitest";
import { caseStudySlugs } from "@/content/case-studies";
import { commandPaletteCopy } from "./copy";
import {
  buildLocaleSwitchCommand,
  filterCommandPaletteCommands,
  moveCommandIndex,
  normalizeCommandQuery,
} from "./command-utils";
import { buildServerCommandPaletteCommands } from "./server-commands";

vi.mock("server-only", () => ({}));

const buildCommands = (locale: "hu" | "en", currentPath = "/") => [
  ...buildServerCommandPaletteCommands(locale),
  buildLocaleSwitchCommand(locale, currentPath),
];

describe("command palette registry", () => {
  it.each(["hu", "en"] as const)(
    "uses unique commands and canonical internal %s destinations",
    (locale) => {
      const commands = buildCommands(locale, "/work");
      const ids = commands.map(({ id }) => id);
      const destinations = commands.flatMap(({ href }) =>
        href === null ? [] : [href],
      );
      const cvDestination = `/cv/kovacs-zalan-cv-${locale}.pdf`;
      const localizedDestinations = destinations.filter(
        (href) => href !== cvDestination,
      );

      expect(new Set(ids).size).toBe(ids.length);
      expect(destinations.length).toBeGreaterThan(0);
      expect(destinations).toContain(cvDestination);
      expect(
        localizedDestinations.every(
          (href) =>
            href.startsWith(`/${locale}`) ||
            href.startsWith(`/${locale === "hu" ? "en" : "hu"}`),
        ),
      ).toBe(true);
      expect(destinations.some((href) => href.includes("/works/"))).toBe(false);
      expect(destinations.some((href) => /^https?:/i.test(href))).toBe(false);
    },
  );

  it("includes every typed case study as a searchable project result", () => {
    const commands = buildCommands("en");
    const projectCommands = commands.filter(({ id }) =>
      id.startsWith("case-study-"),
    );

    expect(projectCommands.map(({ id }) => id)).toEqual(
      expect.arrayContaining(
        caseStudySlugs.map((slug) => `case-study-${slug}`),
      ),
    );
    expect(projectCommands).toHaveLength(caseStudySlugs.length);
    expect(
      filterCommandPaletteCommands(commands, "React analytics").map(
        ({ id }) => id,
      ),
    ).toContain("case-study-samsung-smart-gate-analytics");
    expect(
      filterCommandPaletteCommands(commands, "RBAC").map(({ id }) => id),
    ).toContain("case-study-adott-enterprise-project-workflow");
  });

  it.each([
    {
      locale: "hu",
      cvHref: "/cv/kovacs-zalan-cv-hu.pdf",
      cvLabel: "Magyar CV megnyitása",
    },
    {
      locale: "en",
      cvHref: "/cv/kovacs-zalan-cv-en.pdf",
      cvLabel: "Open English CV",
    },
  ] as const)(
    "provides active V3 navigation and the locale-appropriate $locale CV",
    ({ locale, cvHref, cvLabel }) => {
      const commands = buildCommands(locale);
      const commandById = new Map(
        commands.map((command) => [command.id, command]),
      );

      expect(commandById.get("action-cv")).toMatchObject({
        disabled: false,
        href: cvHref,
        label: cvLabel,
      });
      expect(commandById.get("home-featured-work")?.href).toBe(
        `/${locale}#featured-work`,
      );
      expect(commandById.get("home-experience")?.href).toBe(
        `/${locale}#experience`,
      );
      expect(commandById.get("home-lab")?.href).toBe(`/${locale}#lab`);
      expect(commandById.get("home-studio")?.href).toBe(`/${locale}#studio`);
      expect(commandById.get("home-contact")?.href).toBe(
        `/${locale}#contact`,
      );

      for (const removedId of [
        "home-system-map",
        "home-standards",
        "studio-pricing",
      ]) {
        expect(commandById.has(removedId)).toBe(false);
      }

      const staticCopy = commands
        .filter(({ id }) => !id.startsWith("case-study-"))
        .map(({ description, label }) => `${label} ${description}`)
        .join(" ");
      expect(staticCopy).not.toMatch(
        /four featured|négy kiemelt|not yet available|még nem érhető el|owner confirmation|pricing/i,
      );
    },
  );

  it("switches locale while preserving a canonical current route", () => {
    expect(
      buildLocaleSwitchCommand(
        "hu",
        "/work/samsung-smart-gate-analytics",
      ).href,
    ).toBe("/en/work/samsung-smart-gate-analytics");
    expect(buildLocaleSwitchCommand("en", "/studio").href).toBe(
      "/hu/studio",
    );
    expect(
      buildLocaleSwitchCommand(
        "hu",
        "/work?visibility=anonymized#project-list",
      ).href,
    ).toBe("/en/work?visibility=anonymized#project-list");
    expect(buildLocaleSwitchCommand("en", "https://example.com").href).toBe(
      "/hu",
    );
  });
});

describe("command palette search", () => {
  it("normalizes case, whitespace, and Hungarian accents", () => {
    expect(normalizeCommandQuery("  MÉRNÖKI   jogosultság  ")).toBe(
      "mernoki jogosultsag",
    );
  });

  it("matches every query token across labels, descriptions, and keywords", () => {
    const commands = buildCommands("en");
    const results = filterCommandPaletteCommands(commands, "scope studio");

    expect(results.map(({ id }) => id)).toContain("page-studio");
  });

  it("returns all commands for an empty query", () => {
    const commands = buildCommands("en");

    expect(filterCommandPaletteCommands(commands, "   ")).toBe(commands);
  });
});

describe("command palette keyboard index", () => {
  it("wraps in both directions and supports first and last", () => {
    expect(moveCommandIndex(0, "next", 3)).toBe(1);
    expect(moveCommandIndex(2, "next", 3)).toBe(0);
    expect(moveCommandIndex(0, "previous", 3)).toBe(2);
    expect(moveCommandIndex(2, "first", 3)).toBe(0);
    expect(moveCommandIndex(0, "last", 3)).toBe(2);
  });

  it("returns no active option for an empty result set", () => {
    expect(moveCommandIndex(0, "next", 0)).toBe(-1);
  });

  it("keeps result-count copy localized", () => {
    expect(commandPaletteCopy.hu.resultCount(2)).toBe("2 találat");
    expect(commandPaletteCopy.en.resultCount(1)).toBe("1 result");
    expect(commandPaletteCopy.en.resultCount(2)).toBe("2 results");
  });
});
