import { useTranslations } from "next-intl";

export default function Loading() {
  const t = useTranslations("boundaries.loading");

  return (
    <div
      className="mx-auto flex min-h-[50vh] max-w-7xl items-center px-6 py-24"
      role="status"
      aria-live="polite"
    >
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-violet-600 motion-reduce:animate-none" />
      <span className="ml-3 text-sm font-medium text-neutral-600">
        {t("label")}
      </span>
    </div>
  );
}
