import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type TechnicalAnnotationProps = ComponentPropsWithoutRef<"span">;

export function TechnicalAnnotation({
  className,
  ...props
}: TechnicalAnnotationProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[length:var(--font-size-meta)] font-medium uppercase tracking-[0.14em] text-[var(--color-accent-secondary)]",
        className,
      )}
      {...props}
    />
  );
}
