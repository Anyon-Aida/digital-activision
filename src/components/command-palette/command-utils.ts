import type { Locale } from "@/i18n/routing";
import type { PaletteCommand } from "./types";

export function buildLocaleSwitchCommand(
  locale: Locale,
  currentPath: string,
): PaletteCommand {
  const nextLocale = locale === "hu" ? "en" : "hu";
  const safePath =
    currentPath.startsWith("/") && !currentPath.startsWith("//")
      ? currentPath
      : "/";
  const localeFreePath =
    safePath.replace(/^\/(?:hu|en)(?=\/|$)/, "") || "/";
  const suffix = localeFreePath === "/" ? "" : localeFreePath;

  return {
    id: "action-switch-language",
    href: `/${nextLocale}${suffix}`,
    group: "action",
    disabled: false,
    label:
      locale === "hu" ? "Váltás angol nyelvre" : "Switch to Hungarian",
    description:
      locale === "hu"
        ? "Az aktuális route megőrzése angol nyelven."
        : "Keep the current route and open its Hungarian locale.",
    keywords:
      locale === "hu"
        ? ["english", "angol", "language", "en"]
        : ["hungarian", "magyar", "language", "hu"],
  };
}

export function normalizeCommandQuery(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

export function filterCommandPaletteCommands(
  commands: readonly PaletteCommand[],
  query: string,
): readonly PaletteCommand[] {
  const normalizedQuery = normalizeCommandQuery(query);

  if (!normalizedQuery) {
    return commands;
  }

  const tokens = normalizedQuery.split(" ");

  return commands.filter((command) => {
    const haystack = normalizeCommandQuery(
      [command.label, command.description, ...command.keywords].join(" "),
    );

    return tokens.every((token) => haystack.includes(token));
  });
}

export type CommandIndexMovement = "first" | "last" | "next" | "previous";

export function moveCommandIndex(
  currentIndex: number,
  movement: CommandIndexMovement,
  itemCount: number,
): number {
  if (itemCount <= 0) {
    return -1;
  }

  if (movement === "first") {
    return 0;
  }

  if (movement === "last") {
    return itemCount - 1;
  }

  if (movement === "next") {
    return currentIndex < 0 ? 0 : (currentIndex + 1) % itemCount;
  }

  return currentIndex <= 0 ? itemCount - 1 : currentIndex - 1;
}
