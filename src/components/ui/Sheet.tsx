"use client";

import type { ReactNode, RefObject } from "react";
import { Dialog } from "./Dialog";

export type SheetProps = {
  children: ReactNode;
  closeLabel: string;
  description?: ReactNode;
  id?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  title: ReactNode;
};

export function Sheet(props: SheetProps) {
  return <Dialog {...props} variant="sheet" />;
}
