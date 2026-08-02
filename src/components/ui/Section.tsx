import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";
import { Container, type ContainerSize } from "./Container";

const sectionTones = {
  canvas: "bg-[var(--color-page)] text-[var(--color-text-primary)]",
  subtle: "bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]",
  light: "bg-[var(--color-page)] text-[var(--color-text-primary)]",
  dark: "bg-[var(--color-page)] text-[var(--color-text-primary)]",
} as const;

const sectionSpacing = {
  compact: "py-[var(--section-space-compact)]",
  default: "py-[var(--section-space-default)]",
  spacious: "py-[var(--section-space-spacious)]",
  none: "py-0",
} as const;

export type SectionTone = keyof typeof sectionTones;
export type SectionSpacing = keyof typeof sectionSpacing;

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  container?: ContainerSize | false;
  spacing?: SectionSpacing;
  tone?: SectionTone;
};

export function Section({
  children,
  className,
  container = "content",
  spacing = "default",
  tone = "canvas",
  ...props
}: SectionProps) {
  return (
    <section
      data-tone={tone === "dark" || tone === "light" ? tone : undefined}
      className={cn(sectionTones[tone], sectionSpacing[spacing], className)}
      {...props}
    >
      {container === false ? (
        children
      ) : (
        <Container size={container}>{children}</Container>
      )}
    </section>
  );
}
