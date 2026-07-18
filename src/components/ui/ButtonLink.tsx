import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const buttonLinkVariants = {
  primary:
    "border-transparent bg-[var(--color-accent)] text-[var(--color-on-accent)] hover:bg-[var(--color-accent-hover)]",
  secondary:
    "border-[var(--color-border-strong)] bg-[var(--color-surface)] text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]",
  quiet:
    "border-transparent bg-transparent text-[var(--color-text-primary)] hover:bg-[var(--color-surface-subtle)]",
} as const;

const buttonLinkSizes = {
  small: "px-4 text-sm",
  default: "px-[var(--space-control-x)] text-sm",
  large: "px-6 text-base",
} as const;

export type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  size?: keyof typeof buttonLinkSizes;
  variant?: keyof typeof buttonLinkVariants;
};

export function ButtonLink({
  className,
  rel,
  size = "default",
  target,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

  return (
    <a
      className={cn(
        "inline-flex min-h-[var(--target-min)] items-center justify-center gap-2 rounded-[var(--radius-control)] border py-[var(--space-control-y)] font-semibold leading-none no-underline transition-colors duration-[var(--motion-duration-fast)] ease-[var(--motion-ease-standard)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]",
        buttonLinkVariants[variant],
        buttonLinkSizes[size],
        className,
      )}
      rel={safeRel}
      target={target}
      {...props}
    />
  );
}
