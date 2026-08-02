import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const badgeTones = {
  neutral:
    "border-[var(--color-border-subtle)] bg-[var(--color-surface-subtle)] text-[var(--color-text-secondary)]",
  accent:
    "border-transparent bg-[var(--color-accent-soft)] text-[var(--color-accent)]",
  success:
    "border-current bg-[color-mix(in_srgb,var(--color-success)_10%,transparent)] text-[var(--color-success)]",
  warning:
    "border-current bg-[color-mix(in_srgb,var(--color-warning)_10%,transparent)] text-[var(--color-warning)]",
  danger:
    "border-current bg-[color-mix(in_srgb,var(--color-danger)_10%,transparent)] text-[var(--color-danger)]",
} as const;

export type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  tone?: keyof typeof badgeTones;
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-[var(--radius-pill)] border px-2.5 py-0.5 text-[length:var(--font-size-small)] font-medium leading-5",
        badgeTones[tone],
        className,
      )}
      {...props}
    />
  );
}
