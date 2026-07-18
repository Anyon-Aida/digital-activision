"use client";

import { useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { isLocale, routing } from "@/i18n/routing";

type ErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const requestedLocale = useLocale();
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = useTranslations("boundaries.error");

  useEffect(() => {
    console.error("Localized route render failed", error);
  }, [error]);

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-start justify-center px-6 py-24">
      <p className="text-sm font-semibold tracking-[0.2em] text-red-700">
        {t("eyebrow")}
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-950 md:text-6xl">
        {t("title")}
      </h1>
      <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-600">
        {t("description")}
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex rounded-full bg-neutral-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
        >
          {t("retry")}
        </button>
        <Link
          href="/"
          locale={locale}
          className="inline-flex rounded-full border border-neutral-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
        >
          {t("home")}
        </Link>
      </div>
    </section>
  );
}
