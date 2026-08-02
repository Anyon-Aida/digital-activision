import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import {
  Section,
  type SectionSpacing,
  type SectionTone,
} from "./Section";
import type { ContainerSize } from "./Container";

const sectionRules = {
  none: "",
  top: "border-t border-[var(--color-border-subtle)]",
  bottom: "border-b border-[var(--color-border-subtle)]",
  both: "border-y border-[var(--color-border-subtle)]",
} as const;

export type EditorialSectionProps = ComponentPropsWithoutRef<"section"> & {
  container?: ContainerSize | false;
  rule?: keyof typeof sectionRules;
  spacing?: SectionSpacing;
  tone?: SectionTone;
};

export function EditorialSection({
  className,
  rule = "none",
  ...props
}: EditorialSectionProps) {
  return (
    <Section
      className={cn("relative isolate", sectionRules[rule], className)}
      {...props}
    />
  );
}
