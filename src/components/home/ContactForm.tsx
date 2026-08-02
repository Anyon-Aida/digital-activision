"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { HomeContent } from "@/content/home";
import type { Locale } from "@/i18n/routing";
import { contactRequestSchema, contactTopics } from "@/lib/contact/contract";
import { Field, Surface } from "@/components/ui";
import { TurnstileWidget } from "./TurnstileWidget";

const contactFormSchema = contactRequestSchema.extend({
  privacyAccepted: z.boolean().refine(Boolean),
  topic: z
    .union([z.enum(contactTopics), z.literal("")])
    .refine((value) => value !== ""),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

type SubmissionStatus =
  | { kind: "idle" }
  | { kind: "success" }
  | {
      kind: "generic-error" | "rate-limit" | "disabled";
      requestId?: string;
    };

type ContactFormProps = {
  content: HomeContent["contact"];
  locale: Locale;
};

const turnstileSiteKey =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() || undefined;

const requestIdPattern = /^[A-Za-z0-9-]{1,64}$/u;
const subscribeToHydration = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

function createDefaultValues(locale: Locale): ContactFormValues {
  return {
    email: "",
    locale,
    message: "",
    name: "",
    privacyAccepted: false,
    startedAt: 0,
    topic: "",
    website: "",
  };
}

async function readResponseBody(
  response: Response,
): Promise<Record<string, unknown> | undefined> {
  try {
    const body: unknown = await response.json();
    return body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

function getSafeRequestId(
  response: Response,
  body?: Record<string, unknown>,
): string | undefined {
  const candidate =
    typeof body?.requestId === "string"
      ? body.requestId
      : response.headers.get("x-request-id");

  return candidate && requestIdPattern.test(candidate) ? candidate : undefined;
}

export function ContactForm({ content, locale }: ContactFormProps) {
  const submissionLockRef = useRef(false);
  const isClientReady = useSyncExternalStore(
    subscribeToHydration,
    getClientSnapshot,
    getServerSnapshot,
  );
  const [isSubmissionPending, setIsSubmissionPending] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>({ kind: "idle" });
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<ContactFormValues>({
    defaultValues: createDefaultValues(locale),
    mode: "onSubmit",
    reValidateMode: "onChange",
    resolver: zodResolver(contactFormSchema),
  });

  useEffect(() => {
    register("startedAt");
    register("turnstileToken");
    setValue("startedAt", Date.now());
  }, [register, setValue]);

  const handleTurnstileToken = useCallback(
    (token?: string) => {
      setValue("turnstileToken", token, {
        shouldDirty: false,
        shouldValidate: false,
      });
    },
    [setValue],
  );

  const handleValidSubmit = async (values: ContactFormValues) => {
    const payload = contactRequestSchema.safeParse(values);
    if (!payload.success) {
      setStatus({ kind: "generic-error" });
      submissionLockRef.current = false;
      return;
    }

    setIsSubmissionPending(true);
    setStatus({ kind: "idle" });

    try {
      const response = await fetch("/api/contact", {
        body: JSON.stringify(payload.data),
        headers: { "content-type": "application/json" },
        method: "POST",
      });
      const body = await readResponseBody(response);

      if (response.status === 202) {
        setStatus({ kind: "success" });
        reset({
          ...createDefaultValues(locale),
          startedAt: Date.now(),
        });
        setTurnstileResetKey((value) => value + 1);
        return;
      }

      if (response.status === 429) {
        setStatus({
          kind: "rate-limit",
          requestId: getSafeRequestId(response, body),
        });
        return;
      }

      if (response.status === 503) {
        setStatus({
          kind: "disabled",
          requestId: getSafeRequestId(response, body),
        });
        return;
      }

      setStatus({
        kind: "generic-error",
        requestId: getSafeRequestId(response, body),
      });
    } catch {
      setStatus({ kind: "generic-error" });
    } finally {
      submissionLockRef.current = false;
      setIsSubmissionPending(false);
    }
  };

  const handleInvalidSubmit = () => {
    submissionLockRef.current = false;
    setStatus({ kind: "idle" });
  };

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (submissionLockRef.current) {
      event.preventDefault();
      return;
    }

    submissionLockRef.current = true;
    void handleSubmit(handleValidSubmit, handleInvalidSubmit)(event).catch(
      () => {
        submissionLockRef.current = false;
        setIsSubmissionPending(false);
        setStatus({ kind: "generic-error" });
      },
    );
  };

  const statusMessage =
    status.kind === "success"
      ? content.successMessage
      : status.kind === "rate-limit"
        ? content.rateLimitMessage
        : status.kind === "disabled"
          ? content.disabledMessage
          : status.kind === "generic-error"
            ? content.genericErrorMessage
            : undefined;

  return (
    <Surface padding="large" variant="elevated">
      <form
        className="relative grid gap-6"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
          <label htmlFor="contact-website">Website</label>
          <input
            autoComplete="off"
            id="contact-website"
            tabIndex={-1}
            type="text"
            {...register("website")}
          />
        </div>
        <input type="hidden" {...register("locale")} />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            error={errors.name ? content.errors.name : undefined}
            id="contact-name"
            label={content.nameLabel}
            required
          >
            <input
              autoComplete="name"
              maxLength={80}
              minLength={2}
              type="text"
              {...register("name")}
            />
          </Field>
          <Field
            error={errors.email ? content.errors.email : undefined}
            id="contact-email"
            label={content.emailLabel}
            required
          >
            <input
              autoComplete="email"
              maxLength={254}
              type="email"
              {...register("email")}
            />
          </Field>
        </div>

        <Field
          error={errors.topic ? content.errors.topic : undefined}
          id="contact-topic"
          label={content.topicLabel}
          required
        >
          <select {...register("topic")}>
            <option value="">{content.topicPlaceholder}</option>
            {content.topicOptions.map((topic) => (
              <option key={topic.value} value={topic.value}>
                {topic.label}
              </option>
            ))}
          </select>
        </Field>

        <Field
          description={content.messageDescription}
          error={errors.message ? content.errors.message : undefined}
          id="contact-message"
          label={content.messageLabel}
          required
        >
          <textarea
            className="min-h-40 resize-y"
            maxLength={5_000}
            minLength={20}
            rows={6}
            {...register("message")}
          />
        </Field>

        <div className="grid gap-2">
          <div className="flex items-start gap-3">
            <input
              aria-describedby={
                errors.privacyAccepted
                  ? "contact-privacy-link contact-privacy-error"
                  : "contact-privacy-link"
              }
              aria-invalid={errors.privacyAccepted ? "true" : undefined}
              className="mt-1 size-5 shrink-0 accent-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)]"
              id="contact-privacy"
              required
              type="checkbox"
              {...register("privacyAccepted")}
            />
            <label className="text-sm leading-6" htmlFor="contact-privacy">
              {content.privacyConsentLabel}
            </label>
          </div>
          <a
            className="w-fit text-sm font-semibold text-[var(--color-accent-secondary)] underline underline-offset-4"
            href={`/${locale}/privacy`}
            id="contact-privacy-link"
          >
            {content.privacyLinkLabel}
          </a>
          {errors.privacyAccepted ? (
            <p
              aria-live="polite"
              className="text-sm font-medium text-[var(--color-danger)]"
              id="contact-privacy-error"
            >
              {content.errors.privacy}
            </p>
          ) : null}
        </div>

        {turnstileSiteKey ? (
          <TurnstileWidget
            key={turnstileResetKey}
            label={content.botVerificationLabel}
            locale={locale}
            onTokenChange={handleTurnstileToken}
            siteKey={turnstileSiteKey}
          />
        ) : null}

        <button
          aria-busy={isSubmissionPending}
          className="inline-flex min-h-[var(--target-min)] w-fit items-center justify-center rounded-[var(--radius-control)] border border-transparent bg-[var(--color-accent)] px-6 py-[var(--space-control-y)] text-base font-semibold leading-none text-[var(--color-on-accent)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!isClientReady || isSubmissionPending}
          id="contact-submit"
          type="submit"
        >
          {isSubmissionPending ? content.submittingLabel : content.submitLabel}
        </button>

        <div aria-atomic="true" aria-live="polite" className="min-h-12" role="status">
          {statusMessage ? (
            <p
              className={
                status.kind === "success"
                  ? "text-sm font-semibold text-[var(--color-success)]"
                  : "text-sm font-semibold text-[var(--color-danger)]"
              }
            >
              {statusMessage}
              {status.kind !== "success" &&
              status.kind !== "idle" &&
              status.requestId ? (
                <span className="mt-2 block font-mono text-xs font-normal text-[var(--color-text-secondary)]">
                  {content.requestIdLabel}: {status.requestId}
                </span>
              ) : null}
            </p>
          ) : null}
        </div>

        <div className="border-t border-[var(--color-border-subtle)] pt-5 text-sm text-[var(--color-text-secondary)]">
          <p>
            {content.mailtoFallbackIntro}{" "}
            <a
              className="font-semibold text-[var(--color-accent-secondary)] underline underline-offset-4"
              href="mailto:digitalactivision@gmail.com"
            >
              {content.mailtoFallbackLabel}
            </a>
          </p>
          <p className="mt-2 text-xs">{content.privacyNote}</p>
        </div>
      </form>
    </Surface>
  );
}
