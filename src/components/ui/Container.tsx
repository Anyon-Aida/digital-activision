import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const containerSizes = {
  content:
    "max-w-[calc(var(--layout-content-max)+var(--layout-gutter)+var(--layout-gutter))]",
  wide: "max-w-[var(--layout-wide-max)]",
  readable: "max-w-[var(--layout-readable-max)]",
  full: "max-w-none",
} as const;

export type ContainerSize = keyof typeof containerSizes;

export type ContainerProps = ComponentPropsWithoutRef<"div"> & {
  size?: ContainerSize;
};

export function Container({
  size = "content",
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--layout-gutter)]",
        containerSizes[size],
        className,
      )}
      {...props}
    />
  );
}
