import {
  cloneElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

type FieldControlProps = {
  "aria-describedby"?: string;
  "aria-invalid"?: boolean | "false" | "true";
  className?: string;
  id?: string;
  required?: boolean;
};

export const fieldControlClassName =
  "min-h-[var(--target-min)] w-full rounded-[var(--radius-control)] border border-[var(--color-border-strong)] bg-[var(--color-surface)] px-[var(--space-control-x)] py-[var(--space-control-y)] text-base text-[var(--color-text-primary)] outline-none transition-[border-color,box-shadow] duration-[var(--motion-duration-fast)] placeholder:text-[var(--color-text-secondary)] focus-visible:border-[var(--color-focus-ring)] focus-visible:shadow-[var(--shadow-focus)] disabled:cursor-not-allowed disabled:opacity-60";

export type FieldProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "id"
> & {
  children: ReactElement<FieldControlProps>;
  description?: ReactNode;
  error?: ReactNode;
  id: string;
  label: ReactNode;
  required?: boolean;
};

export function Field({
  children,
  className,
  description,
  error,
  id,
  label,
  required = false,
  ...props
}: FieldProps) {
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [
    children.props["aria-describedby"],
    descriptionId,
    errorId,
  ]
    .filter(Boolean)
    .join(" ");

  const control = cloneElement(children, {
    "aria-describedby": describedBy || undefined,
    "aria-invalid": error ? true : children.props["aria-invalid"],
    className: cn(fieldControlClassName, children.props.className),
    id,
    required: required || children.props.required,
  });

  return (
    <div className={cn("grid gap-2", className)} {...props}>
      <label
        className="text-sm font-semibold text-[var(--color-text-primary)]"
        htmlFor={id}
      >
        {label}
        {required ? (
          <span aria-hidden="true" className="ml-1 text-[var(--color-danger)]">
            *
          </span>
        ) : null}
      </label>
      {description ? (
        <p
          className="text-sm leading-6 text-[var(--color-text-secondary)]"
          id={descriptionId}
        >
          {description}
        </p>
      ) : null}
      {control}
      {error ? (
        <p
          aria-live="polite"
          className="text-sm font-medium text-[var(--color-danger)]"
          id={errorId}
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
