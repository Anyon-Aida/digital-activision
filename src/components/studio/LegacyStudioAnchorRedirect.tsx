"use client";

import { useEffect } from "react";
import type { Locale } from "@/i18n/routing";

const legacyStudioAnchors = {
  "#features": "#services",
  "#services": "#services",
  "#works": "#featured-work",
  "#process": "#process",
  "#pricing": "#scope",
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
