"use client";

import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LocaleSwitchProps = {
  className?: string;
  label: string;
  locale: Locale;
  onNavigate?: () => void;
};

export function LocaleSwitch({
  className,
  label,
  locale,
  onNavigate,
}: LocaleSwitchProps) {
  const pathname = usePathname();
  const nextLocale = locale === "hu" ? "en" : "hu";

  return (
    <Link
      aria-label={label}
      className={className}
      href={pathname}
      locale={nextLocale}
      onClick={onNavigate}
      prefetch={false}
    >
      <span aria-hidden="true">{nextLocale.toUpperCase()}</span>
    </Link>
  );
}
