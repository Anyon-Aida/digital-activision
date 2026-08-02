import type { Locale } from "@/i18n/routing";

export type CommandGroup = "page" | "section" | "case-study" | "action";

export type PaletteCommand = {
  description: string;
  disabled: boolean;
  group: CommandGroup;
  href: `/${Locale}${string}` | null;
  id: string;
  keywords: readonly string[];
  label: string;
};
