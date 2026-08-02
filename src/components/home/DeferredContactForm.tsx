"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { Surface } from "@/components/ui";

const LazyContactForm = dynamic(
  () => import("./ContactForm").then(({ ContactForm }) => ContactForm),
  { ssr: false },
);

type DeferredContactFormProps = {
  content: HomeContent["contact"];
  locale: Locale;
};

export function DeferredContactForm({
  content,
  locale,
}: DeferredContactFormProps) {
  const boundaryRef = useRef<HTMLDivElement>(null);
  const [shouldLoadForm, setShouldLoadForm] = useState(false);

  useEffect(() => {
    const boundary = boundaryRef.current;
    if (!boundary) {
      return;
    }

    if (window.location.hash === "#contact") {
      const timeoutId = globalThis.setTimeout(
        () => setShouldLoadForm(true),
        0,
      );
      return () => globalThis.clearTimeout(timeoutId);
    }

    if (!("IntersectionObserver" in window)) {
      const timeoutId = globalThis.setTimeout(
        () => setShouldLoadForm(true),
        0,
      );
      return () => globalThis.clearTimeout(timeoutId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadForm(true);
          observer.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );

    observer.observe(boundary);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="min-h-[939px] sm:min-h-[825px]"
      data-testid="contact-form-boundary"
      ref={boundaryRef}
    >
      {shouldLoadForm ? (
        <LazyContactForm content={content} locale={locale} />
      ) : (
        <Surface
          className="grid min-h-[939px] content-center sm:min-h-[825px]"
          data-testid="contact-form-fallback"
          padding="large"
          variant="elevated"
        >
          <p className="max-w-xl text-[var(--color-text-secondary)]">
            {content.mailtoFallbackIntro}{" "}
            <a
              className="font-semibold text-[var(--color-accent-secondary)] underline underline-offset-4"
              href="mailto:digitalactivision@gmail.com"
            >
              {content.mailtoFallbackLabel}
            </a>
          </p>
          <p className="mt-3 max-w-xl text-xs text-[var(--color-text-secondary)]">
            {content.privacyNote}
          </p>
        </Surface>
      )}
    </div>
  );
}
