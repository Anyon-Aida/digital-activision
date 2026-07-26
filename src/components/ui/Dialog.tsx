"use client";

import {
  type ReactNode,
  type RefObject,
  useEffect,
  useId,
  useRef,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export type DialogProps = {
  children: ReactNode;
  className?: string;
  closeLabel: string;
  description?: ReactNode;
  id?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: ReactNode;
  variant?: "modal" | "sheet";
};

function getFocusedElement() {
  return document.activeElement instanceof HTMLElement
    ? document.activeElement
    : null;
}

export function Dialog({
  children,
  className,
  closeLabel,
  description,
  id,
  initialFocusRef,
  onOpenChange,
  open,
  title,
  variant = "modal",
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusedElementRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) {
      previousFocusedElementRef.current?.focus();
      return;
    }

    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    previousFocusedElementRef.current = getFocusedElement();
    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    if (!dialog.open) {
      dialog.showModal();
    }

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() => {
      (initialFocusRef?.current ?? closeButtonRef.current)?.focus();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      if (dialog.open) {
        dialog.close();
      }
    };
  }, [initialFocusRef, open]);

  return (
    <dialog
      aria-describedby={description ? descriptionId : undefined}
      aria-labelledby={titleId}
      aria-modal="true"
      className={cn("ui-dialog", `ui-dialog--${variant}`, className)}
      id={id}
      onCancel={(event) => {
        event.preventDefault();
        onOpenChange(false);
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onOpenChange(false);
        }
      }}
      ref={dialogRef}
    >
      <div className="relative min-h-full p-6 sm:p-8">
        <div className="pr-12">
          <h2 className="text-xl font-semibold leading-tight" id={titleId}>
            {title}
          </h2>
          {description ? (
            <p className="mt-2 text-sm text-[var(--color-text-secondary)]" id={descriptionId}>
              {description}
            </p>
          ) : null}
        </div>
        <button
          aria-label={closeLabel}
          className="absolute right-4 top-4 inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] text-[var(--color-text-primary)] transition-colors hover:bg-[var(--color-surface-subtle)]"
          onClick={() => onOpenChange(false)}
          ref={closeButtonRef}
          type="button"
        >
          <X aria-hidden="true" size={20} />
        </button>
        <div className="mt-8">{children}</div>
      </div>
    </dialog>
  );
}
