import type { ComponentPropsWithoutRef, ElementType } from "react";
import { cn } from "@/lib/cn";

const cardVariants = {
  outlined:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
  elevated:
    "border border-[var(--color-border-subtle)] bg-[var(--color-surface-elevated)] shadow-[var(--shadow-surface)]",
  subtle:
    "border border-transparent bg-[var(--color-surface-subtle)]",
} as const;

type CardElement = "article" | "div" | "li";

export type CardProps = ComponentPropsWithoutRef<"article"> & {
  as?: CardElement;
  variant?: keyof typeof cardVariants;
};

export function Card({
  as = "article",
  className,
  variant = "outlined",
  ...props
}: CardProps) {
  const Component = as as ElementType;

  return (
    <Component
      className={cn(
        "rounded-[var(--radius-card)] p-5 text-[var(--color-text-primary)] sm:p-7",
        cardVariants[variant],
        className,
      )}
      {...props}
    />
  );
}
