import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const surfaceVariants = {
  default:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-primary)]",
  subtle:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] text-[var(--color-text-primary)]",
  elevated:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] text-[var(--color-text-primary)] shadow-[var(--shadow-surface)]",
  inverse:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface)] text-[var(--color-text-primary)]",
} as const;

const surfacePadding = {
  none: "p-0",
  small: "p-4 sm:p-5",
  default: "p-5 sm:p-7",
  large: "p-6 sm:p-8 lg:p-10",
} as const;

const surfaceRadii = {
  none: "rounded-none",
  control: "rounded-[var(--radius-control)]",
  surface: "rounded-[var(--radius-surface)]",
  card: "rounded-[var(--radius-card)]",
} as const;

type SurfaceElement = "div" | "article" | "aside" | "section";

export type SurfaceProps = ComponentPropsWithoutRef<"div"> & {
  as?: SurfaceElement;
  padding?: keyof typeof surfacePadding;
  radius?: keyof typeof surfaceRadii;
  variant?: keyof typeof surfaceVariants;
};

export function Surface({
  as = "div",
  className,
  padding = "default",
  radius = "surface",
  variant = "default",
  ...props
}: SurfaceProps) {
  const Component = as as ElementType;

  return (
    <Component
      data-tone={variant === "inverse" ? "dark" : undefined}
      className={cn(
        surfaceVariants[variant],
        surfacePadding[padding],
        surfaceRadii[radius],
        className,
      )}
      {...props}
    />
  );
}
