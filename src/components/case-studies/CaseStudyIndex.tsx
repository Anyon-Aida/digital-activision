import Image from "next/image";
import type { CaseStudyLocale } from "@/content/case-studies";
import { getCaseStudyCards } from "@/content/case-studies";
import {
  getProjectMedia,
  getProjectMediaSource,
  type ProjectMediaId,
} from "@/content/project-media";
import { studioContent } from "@/content/studio";
import {
  EditorialSection,
  InlineLinkArrow,
  ProjectMediaFrame,
  TechnicalAnnotation,
} from "@/components/ui";

type CaseStudyIndexProps = {
  locale: CaseStudyLocale;
};

type CaseStudyCard = ReturnType<typeof getCaseStudyCards>[number];

const workCopy = {
  hu: {
    eyebrow: "MUNKÁK",
    title: "Rendszerek, termékek és interakciók.",
    description:
      "Öt különböző projekt vállalati workflowktól és valós idejű analitikától a 3D konfiguráción és szolgáltatásfoglaláson át egy fejlesztés alatt álló PWA-ig.",
    role: "Szerepkör",
    open: "Esettanulmány megnyitása",
    inProgress: "Fejlesztés alatt",
    experimentLabel: "Demo / prototípus",
  },
  en: {
    eyebrow: "WORK",
    title: "Systems, products and interactions.",
    description:
      "Five different projects spanning enterprise workflows, real-time analytics, 3D configuration, service booking and an in-progress PWA.",
    role: "Role",
    open: "Open case study",
    inProgress: "In progress",
    experimentLabel: "Demo / prototype",
  },
} as const;

function ProjectImage({
  id,
  locale,
  priority = false,
  sizes,
}: {
  id: ProjectMediaId;
  locale: CaseStudyLocale;
  priority?: boolean;
  sizes: string;
}) {
  const media = getProjectMedia(id);

  return (
    <Image
      alt={media.kind === "diagram" ? "" : media.alt[locale]}
      className={
        media.kind === "diagram"
          ? media.surface === "light"
            ? "h-full w-full bg-[var(--color-surface)] p-5 object-contain sm:p-8"
            : "h-full w-full bg-[var(--color-diagram-surface)] p-5 object-contain sm:p-8"
          : "h-full w-full object-cover"
      }
      height={media.height}
      priority={priority}
      sizes={sizes}
      src={getProjectMediaSource(media)}
      unoptimized={media.kind === "diagram"}
      width={media.width}
    />
  );
}

function ProjectMeta({
  card,
  locale,
}: {
  card: CaseStudyCard;
  locale: CaseStudyLocale;
}) {
  const copy = workCopy[locale];

  return (
    <div className="max-w-xl">
      <TechnicalAnnotation>{card.heroVariant}</TechnicalAnnotation>
      <h2 className="mt-5 text-[clamp(2rem,4vw,4.75rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
        {card.title}
      </h2>
      <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
        {card.summary}
      </p>
      <dl className="mt-7 border-l border-[var(--color-industrial)] pl-5">
        <dt className="text-sm font-semibold text-[var(--color-text-secondary)]">
          {copy.role}
        </dt>
        <dd className="mt-1 font-semibold">{card.role}</dd>
      </dl>
      <InlineLinkArrow className="mt-7" href={card.href}>
        {copy.open}
      </InlineLinkArrow>
    </div>
  );
}

function LargeFeature({
  card,
  locale,
  mediaFirst = false,
  priority = false,
}: {
  card: CaseStudyCard;
  locale: CaseStudyLocale;
  mediaFirst?: boolean;
  priority?: boolean;
}) {
  const mediaId = card.featuredMedia[0];

  return (
    <article className="grid items-center gap-10 border-t border-[var(--color-border-subtle)] py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
      <div
        className={
          mediaFirst
            ? "lg:order-2 lg:col-span-5"
            : "lg:col-span-5"
        }
      >
        <ProjectMeta card={card} locale={locale} />
      </div>
      {mediaId ? (
        <ProjectMediaFrame
          className={
            mediaFirst
              ? "lg:order-1 lg:col-span-7"
              : "lg:col-span-7"
          }
          radius="soft"
        >
          <div className="aspect-[16/9] bg-[var(--color-surface-subtle)]">
            <ProjectImage
              id={mediaId}
              locale={locale}
              priority={priority}
              sizes="(min-width: 1024px) 58vw, 94vw"
            />
          </div>
        </ProjectMediaFrame>
      ) : null}
    </article>
  );
}

function MediumFeature({
  card,
  locale,
}: {
  card: CaseStudyCard;
  locale: CaseStudyLocale;
}) {
  const copy = workCopy[locale];
  const mediaId = card.featuredMedia[0];

  return (
    <article className="flex h-full flex-col border-t border-[var(--color-border-subtle)] pt-8">
      {mediaId ? (
        <ProjectMediaFrame radius="soft">
          <div className="aspect-[16/10] bg-[var(--color-surface-subtle)]">
            <ProjectImage
              id={mediaId}
              locale={locale}
              sizes="(min-width: 1024px) 46vw, 94vw"
            />
          </div>
        </ProjectMediaFrame>
      ) : null}
      <TechnicalAnnotation className="mt-7">
        {card.heroVariant}
      </TechnicalAnnotation>
      <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-[-0.035em] text-balance sm:text-4xl">
        {card.title}
      </h2>
      <p className="mt-5 text-[var(--color-text-secondary)]">{card.summary}</p>
      <p className="mt-5 text-sm">
        <span className="font-semibold text-[var(--color-text-secondary)]">
          {copy.role}:{" "}
        </span>
        {card.role}
      </p>
      <InlineLinkArrow className="mt-auto pt-6" href={card.href}>
        {copy.open}
      </InlineLinkArrow>
    </article>
  );
}

export function CaseStudyIndex({ locale }: CaseStudyIndexProps) {
  const copy = workCopy[locale];
  const experiments = studioContent[locale].experiments;
  const cards = getCaseStudyCards(locale);
  const bySlug = new Map(cards.map((card) => [card.slug, card]));
  const adott = bySlug.get("adott-enterprise-project-workflow");
  const alba = bySlug.get("alba-medence-3d-configurator");
  const samsung = bySlug.get("samsung-smart-gate-analytics");
  const sanjiwani = bySlug.get("sanjiwani-booking-experience");
  const questlog = bySlug.get("questlog-offline-first-pwa");

  if (!adott || !alba || !samsung || !sanjiwani || !questlog) {
    throw new Error("The Work index requires all five V3 case studies.");
  }

  return (
    <>
      <EditorialSection
        className="overflow-hidden"
        rule="bottom"
        spacing="spacious"
        tone="light"
      >
        <header className="max-w-4xl">
          <TechnicalAnnotation>{copy.eyebrow}</TechnicalAnnotation>
          <h1 className="mt-5 text-[clamp(3rem,8vw,7.5rem)] font-semibold leading-[0.95] tracking-[-0.06em] text-balance">
            {copy.title}
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            {copy.description}
          </p>
        </header>
      </EditorialSection>

      <EditorialSection spacing="none" tone="light">
        <LargeFeature card={adott} locale={locale} priority />
        <LargeFeature card={alba} locale={locale} mediaFirst />

        <div className="grid gap-10 border-t border-[var(--color-border-subtle)] py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <MediumFeature card={samsung} locale={locale} />
          <MediumFeature card={sanjiwani} locale={locale} />
        </div>

        <article className="grid gap-7 border-y border-[var(--color-border-subtle)] py-10 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="max-w-3xl">
            <TechnicalAnnotation>{copy.inProgress}</TechnicalAnnotation>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-4xl">
              {questlog.title}
            </h2>
            <p className="mt-4 text-[var(--color-text-secondary)]">
              {questlog.summary}
            </p>
          </div>
          <InlineLinkArrow href={questlog.href}>{copy.open}</InlineLinkArrow>
        </article>
      </EditorialSection>

      <EditorialSection
        rule="bottom"
        spacing="spacious"
        tone="subtle"
      >
        <header className="max-w-3xl">
          <TechnicalAnnotation>{copy.experimentLabel}</TechnicalAnnotation>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
            {studioContent[locale].experimentsHeading}
          </h2>
          <p className="mt-5 text-[var(--color-text-secondary)]">
            {studioContent[locale].experimentsIntro}
          </p>
        </header>

        <ul className="mt-10 grid gap-8 md:grid-cols-3">
          {experiments.map((experiment) => (
            <li key={experiment.id}>
              <article>
                <a
                  className="group block"
                  href={experiment.href}
                >
                  <ProjectMediaFrame radius="soft">
                    <div className="relative aspect-[4/3] bg-[var(--color-surface)]">
                      <Image
                        alt={experiment.alt}
                        className="object-cover transition-transform duration-[var(--motion-duration-default)] group-hover:scale-[1.02]"
                        fill
                        sizes="(min-width: 768px) 30vw, 94vw"
                        src={experiment.image}
                      />
                    </div>
                  </ProjectMediaFrame>
                  <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-secondary)]">
                    {copy.experimentLabel}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">{experiment.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {experiment.description}
                  </p>
                </a>
              </article>
            </li>
          ))}
        </ul>
      </EditorialSection>
    </>
  );
}
