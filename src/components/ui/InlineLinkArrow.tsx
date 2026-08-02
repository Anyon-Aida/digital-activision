import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type InlineLinkArrowProps = ComponentPropsWithoutRef<"a">;

export function InlineLinkArrow({
  children,
  className,
  rel,
  target,
  ...props
}: InlineLinkArrowProps) {
  const safeRel = target === "_blank" ? rel ?? "noopener noreferrer" : rel;

  return (
    <a
      className={cn(
        "group inline-flex min-h-[var(--target-min)] items-center gap-2 py-2 font-semibold text-[var(--color-text-primary)] underline decoration-[var(--color-border-strong)] underline-offset-4 transition-colors duration-[var(--motion-duration-fast)] hover:text-[var(--color-accent)]",
        className,
      )}
      rel={safeRel}
      target={target}
      {...props}
    >
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="transition-transform duration-[var(--motion-duration-fast)] group-hover:translate-x-1"
      >
        →
      </span>
    </a>
  );
}
