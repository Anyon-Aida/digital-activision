"use client";

import { useEffect, useRef } from "react";
import type { Locale } from "@/i18n/routing";

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      language: Locale;
      "response-field": false;
      sitekey: string;
      theme: "auto";
    },
  ) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type TurnstileWidgetProps = {
  label: string;
  locale: Locale;
  onTokenChange: (token?: string) => void;
  siteKey: string;
};

let turnstileScriptPromise: Promise<TurnstileApi> | undefined;

function loadTurnstile(): Promise<TurnstileApi> {
  if (window.turnstile) {
    return Promise.resolve(window.turnstile);
  }

  if (turnstileScriptPromise) {
    return turnstileScriptPromise;
  }

  turnstileScriptPromise = new Promise<TurnstileApi>((resolve, reject) => {
    const resolveApi = () => {
      if (window.turnstile) {
        resolve(window.turnstile);
        return;
      }

      reject(new Error("Turnstile API unavailable"));
    };

    const existingScript = document.querySelector<HTMLScriptElement>(
      "script[data-contact-turnstile]",
    );

    if (existingScript) {
      existingScript.addEventListener("load", resolveApi, { once: true });
      existingScript.addEventListener(
        "error",
        () => reject(new Error("Turnstile script unavailable")),
        { once: true },
      );
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.dataset.contactTurnstile = "true";
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.addEventListener("load", resolveApi, { once: true });
    script.addEventListener(
      "error",
      () => reject(new Error("Turnstile script unavailable")),
      { once: true },
    );
    document.head.append(script);
  });

  return turnstileScriptPromise;
}

export function TurnstileWidget({
  label,
  locale,
  onTokenChange,
  siteKey,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    let widgetId: string | undefined;

    void loadTurnstile()
      .then((turnstile) => {
        if (!active || !containerRef.current) {
          return;
        }

        widgetId = turnstile.render(containerRef.current, {
          action: "contact",
          callback: (token) => onTokenChange(token),
          "error-callback": () => onTokenChange(undefined),
          "expired-callback": () => onTokenChange(undefined),
          language: locale,
          "response-field": false,
          sitekey: siteKey,
          theme: "auto",
        });
      })
      .catch(() => {
        if (active) {
          onTokenChange(undefined);
        }
      });

    return () => {
      active = false;
      onTokenChange(undefined);
      if (widgetId && window.turnstile) {
        window.turnstile.remove(widgetId);
      }
    };
  }, [locale, onTokenChange, siteKey]);

  return (
    <div
      aria-label={label}
      className="min-h-[4.1rem] overflow-x-auto"
      ref={containerRef}
      role="group"
    />
  );
}
