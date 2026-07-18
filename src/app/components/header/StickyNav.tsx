"use client";

import Image from "next/image";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import logo from "../../../../public/logo.svg";
import { Sheet } from "@/components/ui";
import { usePortfolioMessages } from "@/i18n/messages";
import { Link, usePathname } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";

const NAV = [
  { href: "#services", label: { hu: "Szolgáltatások", en: "Services" } },
  { href: "#works", label: { hu: "Munkáink", en: "Work" } },
  { href: "#pricing", label: { hu: "Árak", en: "Pricing" } },
  { href: "#process", label: { hu: "Folyamat", en: "Process" } },
] as const;

const DICT = {
  closeMenu: { hu: "Navigáció bezárása", en: "Close navigation" },
  menuTitle: { hu: "Navigáció", en: "Navigation" },
  openMenu: { hu: "Navigáció megnyitása", en: "Open navigation" },
  primaryNavigation: { hu: "Fő navigáció", en: "Primary navigation" },
} as const;

const grad =
  "bg-[linear-gradient(90deg,_#6E46E5_0%,_#4666E5_50%,_#04E4FF_100%)]";
const mobileNavigationId = "mobile-navigation";

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const requestedLocale = useLocale();
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const nextLocale = locale === "hu" ? "en" : "hu";
  const messages = usePortfolioMessages();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleJump = () => setOpen(false);

  return (
    <header
      aria-label={DICT.primaryNavigation[locale]}
      className={[
        "fixed inset-x-0 top-0 z-50 transition-shadow",
        "bg-white/95 supports-[backdrop-filter]:bg-white/60 supports-[backdrop-filter]:backdrop-blur-md",
        scrolled ? "shadow-md" : "",
      ].join(" ")}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between md:h-20">
          <a
            className="flex min-h-[var(--target-min)] items-center gap-3 rounded-[var(--radius-control)] font-semibold"
            href="#hero"
            onClick={handleJump}
          >
            <Image
              alt="Digital Activision"
              className="h-10 w-auto md:h-12"
              priority
              src={logo}
            />
            <span className="hidden sm:inline">Digital Activision</span>
          </a>

          <nav className="hidden items-center gap-6 md:flex" aria-label={DICT.primaryNavigation[locale]}>
            {NAV.map((item) => (
              <a
                className="rounded-[var(--radius-control)] text-sm hover:opacity-80"
                href={item.href}
                key={item.href}
                onClick={handleJump}
              >
                {item.label[locale]}
              </a>
            ))}
            <a
              className={[
                "ml-2 inline-flex min-h-[var(--target-min)] items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:opacity-90",
                grad,
              ].join(" ")}
              href="#contact"
              onClick={handleJump}
            >
              {messages.nav.contact}
            </a>
            <div aria-hidden="true" className="ml-4 h-5 w-px bg-neutral-300" />
            <Link
              className="rounded-[var(--radius-control)] text-sm font-medium"
              href={pathname}
              locale={nextLocale}
              prefetch={false}
            >
              {nextLocale.toUpperCase()}
            </Link>
          </nav>

          <button
            aria-controls={mobileNavigationId}
            aria-expanded={open}
            aria-label={DICT.openMenu[locale]}
            className="inline-flex min-h-[var(--target-min)] min-w-[var(--target-min)] items-center justify-center rounded-[var(--radius-control)] transition-colors hover:bg-black/5 md:hidden"
            onClick={() => setOpen(true)}
            type="button"
          >
            <Menu aria-hidden="true" size={22} />
          </button>
        </div>
      </div>

      <Sheet
        closeLabel={DICT.closeMenu[locale]}
        id={mobileNavigationId}
        onOpenChange={setOpen}
        open={open}
        title={DICT.menuTitle[locale]}
      >
        <nav aria-label={DICT.primaryNavigation[locale]}>
          <ul className="flex flex-col gap-2">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  className="flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] px-3 py-2 text-base transition-colors hover:bg-[var(--color-surface-subtle)]"
                  href={item.href}
                  onClick={handleJump}
                >
                  {item.label[locale]}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                className={[
                  "flex min-h-[var(--target-min)] items-center justify-center rounded-full px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:opacity-90",
                  grad,
                ].join(" ")}
                href="#contact"
                onClick={handleJump}
              >
                {messages.nav.contact}
              </a>
            </li>
            <li className="pt-2">
              <div aria-hidden="true" className="mb-2 h-px bg-[var(--color-border-subtle)]" />
              <Link
                className="flex min-h-[var(--target-min)] items-center rounded-[var(--radius-control)] px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--color-surface-subtle)]"
                href={pathname}
                locale={nextLocale}
                onClick={handleJump}
                prefetch={false}
              >
                {nextLocale.toUpperCase()}
              </Link>
            </li>
          </ul>
        </nav>
      </Sheet>
    </header>
  );
}
