"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/routing";

const legacyStudioAnchors = {
  "#features": "#benefits",
  "#services": "#services",
  "#works": "#experiments",
  "#process": "#process",
  "#pricing": "#pricing",
} as const;

export function LegacyStudioAnchorRedirect({ locale }: { locale: Locale }) {
  useEffect(() => {
    const studioHash =
      legacyStudioAnchors[window.location.hash as keyof typeof legacyStudioAnchors];

    if (studioHash) {
      window.location.replace(`/${locale}/studio${studioHash}`);
    }
  }, [locale]);

  return null;
}
