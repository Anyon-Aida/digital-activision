import type { CommandGroup } from "./types";

export const commandPaletteCopy = {
  hu: {
    title: "Gyors navigáció",
    description:
      "Keress az oldalak, fejezetek és engineering esettanulmányok között.",
    openLabel: "Gyors navigáció megnyitása (Control vagy Command + K)",
    openText: "Keresés",
    closeLabel: "Gyors navigáció bezárása",
    inputLabel: "Parancs keresése",
    placeholder: "Oldal, fejezet vagy projekt keresése…",
    resultsLabel: "Navigációs találatok",
    empty: "Nincs a keresésnek megfelelő parancs.",
    instructions:
      "A fel és le nyíllal válassz, az Enterrel nyisd meg, az Escape-pel zárd be.",
    group: {
      page: "Oldal",
      section: "Fejezet",
      "case-study": "Esettanulmány",
      action: "Művelet",
    } satisfies Record<CommandGroup, string>,
    resultCount: (count: number) => `${count} találat`,
  },
  en: {
    title: "Quick navigation",
    description: "Search pages, sections, and engineering case studies.",
    openLabel: "Open quick navigation (Control or Command + K)",
    openText: "Search",
    closeLabel: "Close quick navigation",
    inputLabel: "Search commands",
    placeholder: "Search a page, section, or project…",
    resultsLabel: "Navigation results",
    empty: "No command matches this search.",
    instructions:
      "Use the up and down arrows to choose, Enter to open, and Escape to close.",
    group: {
      page: "Page",
      section: "Section",
      "case-study": "Case study",
      action: "Action",
    } satisfies Record<CommandGroup, string>,
    resultCount: (count: number) =>
      `${count} ${count === 1 ? "result" : "results"}`,
  },
} as const;
