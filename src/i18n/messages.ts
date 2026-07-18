"use client";

import { useMessages } from "next-intl";
import type huMessages from "@/locales/hu/common.json";

export type PortfolioMessages = typeof huMessages;

export function usePortfolioMessages(): PortfolioMessages {
  return useMessages() as unknown as PortfolioMessages;
}
