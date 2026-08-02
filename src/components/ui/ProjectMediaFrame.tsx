import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

const frameRadii = {
  none: "rounded-none",
  soft: "rounded-[var(--radius-card)]",
  surface: "rounded-[var(--radius-surface)]",
} as const;

export type ProjectMediaFrameProps = ComponentPropsWithoutRef<"figure"> & {
  caption?: ReactNode;
  radius?: keyof typeof frameRadii;
};

export function ProjectMediaFrame({
  caption,
  children,
  className,
  radius = "soft",
  ...props
}: ProjectMediaFrameProps) {
  return (
    <figure className={cn("min-w-0", className)} {...props}>
      <div
        className={cn(
          "relative overflow-hidden border border-[var(--color-border-subtle)] bg-[var(--color-surface)]",
          frameRadii[radius],
        )}
      >
        {children}
      </div>
      {caption ? (
        <figcaption className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-text-secondary)]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
