import Image from "next/image";
import type { HomeContent } from "@/content/home";
import {
  getProjectMedia,
  type ProjectMediaId,
} from "@/content/project-media";
import { getCaseStudyPath } from "@/content/case-studies";
import type { Locale } from "@/i18n/routing";
import {
  ButtonLink,
  EditorialSection,
  InlineLinkArrow,
  ProjectMediaFrame,
  TechnicalAnnotation,
} from "@/components/ui";
import { DeferredContactForm } from "./DeferredContactForm";
import { LabTeaserFlow } from "./LabTeaserFlow";
import { LegacyStudioAnchorRedirect } from "@/components/studio/LegacyStudioAnchorRedirect";

type DeveloperHomepageProps = {
  content: HomeContent;
  locale: Locale;
};

type ProjectImageProps = {
  className?: string;
  id: ProjectMediaId;
  locale: Locale;
  priority?: boolean;
  sizes: string;
};

const heroMedia = {
  adott: {
    alt: {
      hu: "Ajánlati struktúra modulokkal, feladatokkal, fázisokkal és órabecslésekkel.",
      en: "Quote structure with modules, tasks, phases and effort estimates.",
    },
    height: 473,
    src: "/portfolio-v3/hero/hero-blueprint-adott.avif",
    width: 1_200,
  },
  alba: {
    alt: {
      hu: "Interaktív 3D medencekonfigurátor opcióválasztó felülettel.",
      en: "Interactive 3D pool configurator with configuration controls.",
    },
    height: 746,
    src: "/portfolio-v3/hero/hero-blueprint-alba.avif",
    width: 1_130,
  },
  sanjiwani: {
    alt: {
      hu: "Időpontfoglaló felület szolgáltatás-, masszőr- és idősávválasztással.",
      en: "Booking interface with service, therapist and time-slot selection.",
    },
    height: 735,
    src: "/portfolio-v3/hero/hero-blueprint-sanjiwani.avif",
    width: 620,
  },
} as const;

function ProjectImage({
  className,
  id,
  locale,
  priority = false,
  sizes,
}: ProjectImageProps) {
  const media = getProjectMedia(id);

  if (media.kind !== "screenshot") {
    return null;
  }

  return (
    <Image
      alt={media.alt[locale]}
      className={className}
      height={media.height}
      priority={priority}
      sizes={sizes}
      src={media.sources.avif}
      width={media.width}
    />
  );
}

function HeroBlueprint({
  annotations,
  label,
  locale,
}: {
  annotations: HomeContent["hero"]["blueprintAnnotations"];
  label: string;
  locale: Locale;
}) {
  return (
    <figure
      aria-label={label}
      className="relative mx-auto h-[27rem] w-full max-w-[42rem] sm:h-[32rem] lg:h-[38rem]"
      data-testid="hero-blueprint"
    >
      <figcaption className="sr-only">{label}</figcaption>
      <div
        aria-hidden="true"
        className="absolute inset-x-[8%] top-[48%] h-px bg-[linear-gradient(90deg,transparent,var(--color-industrial),var(--color-signal),transparent)]"
      />
      <div
        aria-hidden="true"
        className="absolute left-[48%] top-[12%] h-[74%] w-px bg-[linear-gradient(180deg,transparent,var(--color-border-strong),transparent)]"
      />

      <div className="blueprint-reveal absolute left-0 top-[8%] z-20 w-[82%]">
        <TechnicalAnnotation className="mb-2">
          <span className="size-1.5 rounded-full bg-[var(--color-industrial)]" />
          {annotations[0]}
        </TechnicalAnnotation>
        <div className="overflow-hidden rounded-[var(--radius-surface)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-surface)]">
          <Image
            alt={heroMedia.adott.alt[locale]}
            className="h-auto w-full"
            height={heroMedia.adott.height}
            priority
            sizes="(max-width: 1023px) 78vw, 38vw"
            src={heroMedia.adott.src}
            width={heroMedia.adott.width}
          />
        </div>
      </div>

      <div className="blueprint-reveal blueprint-reveal--delay absolute right-0 top-[44%] z-30 w-[55%]">
        <TechnicalAnnotation className="mb-2 justify-end">
          {annotations[1]}
          <span className="size-1.5 rounded-full bg-[var(--color-signal)]" />
        </TechnicalAnnotation>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-surface)]">
          <Image
            alt={heroMedia.alba.alt[locale]}
            className="aspect-[1.5] w-full object-cover object-center"
            height={heroMedia.alba.height}
            sizes="(max-width: 1023px) 52vw, 25vw"
            src={heroMedia.alba.src}
            width={heroMedia.alba.width}
          />
        </div>
      </div>

      <div className="blueprint-reveal blueprint-reveal--late absolute bottom-[2%] left-[5%] z-40 w-[31%]">
        <TechnicalAnnotation className="mb-2">{annotations[2]}</TechnicalAnnotation>
        <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-border-subtle)] bg-[var(--color-surface)] shadow-[var(--shadow-surface)]">
          <Image
            alt={heroMedia.sanjiwani.alt[locale]}
            className="aspect-[0.84] w-full object-cover object-center"
            height={heroMedia.sanjiwani.height}
            sizes="(max-width: 1023px) 30vw, 14vw"
            src={heroMedia.sanjiwani.src}
            width={heroMedia.sanjiwani.width}
          />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-[7%] right-[4%] z-10 w-[43%] rounded-[var(--radius-control)] border border-[var(--color-border-subtle)] bg-[color-mix(in_srgb,var(--color-page)_90%,transparent)] p-3"
      >
        <TechnicalAnnotation>{annotations[3]}</TechnicalAnnotation>
        <svg className="mt-2 h-12 w-full" viewBox="0 0 240 48">
          <path
            d="M2 36 C40 36, 46 13, 82 18 S126 43, 154 24 S203 8, 238 15"
            fill="none"
            stroke="var(--color-industrial)"
            strokeWidth="1.5"
          />
          <circle
            className="blueprint-signal"
            cx="154"
            cy="24"
            fill="var(--color-signal)"
            r="4"
          />
        </svg>
      </div>
    </figure>
  );
}

function ProjectCopy({
  actionLabel,
  highlightsLabel,
  locale,
  project,
  roleLabel,
}: {
  actionLabel: string;
  highlightsLabel: string;
  locale: Locale;
  project: HomeContent["selectedWork"]["projects"][number];
  roleLabel: string;
}) {
  return (
    <div className="max-w-xl">
      <TechnicalAnnotation>{project.tag}</TechnicalAnnotation>
      <h3 className="mt-5 text-[length:var(--font-size-project)] font-semibold leading-[1.04] tracking-[-0.04em] text-balance">
        {project.title}
      </h3>
      <p className="mt-6 text-lg leading-8 text-[var(--color-text-secondary)]">
        {project.summary}
      </p>
      <dl className="mt-7 border-l border-[var(--color-industrial)] pl-5">
        <dt className="text-sm font-semibold text-[var(--color-text-secondary)]">
          {roleLabel}
        </dt>
        <dd className="mt-1 font-semibold">{project.role}</dd>
      </dl>
      <div className="mt-7">
        <p className="text-sm font-semibold text-[var(--color-text-secondary)]">
          {highlightsLabel}
        </p>
        <ul className="mt-3 grid gap-x-5 gap-y-2 text-sm sm:grid-cols-2">
          {project.highlights.map((highlight) => (
            <li className="flex gap-2" key={highlight}>
              <span
                aria-hidden="true"
                className="mt-[0.65em] size-1.5 shrink-0 rounded-full bg-[var(--color-signal)]"
              />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
      <InlineLinkArrow
        className="mt-6"
        href={getCaseStudyPath(project.slug, locale)}
      >
        {actionLabel}
      </InlineLinkArrow>
    </div>
  );
}

function AdottShowcase({
  content,
  locale,
}: {
  content: HomeContent["selectedWork"];
  locale: Locale;
}) {
  const project = content.projects[0];

  return (
    <article className="grid items-center gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-24">
      <div className="lg:col-span-5">
        <ProjectCopy
          actionLabel={content.actionLabel}
          highlightsLabel={content.highlightsLabel}
          locale={locale}
          project={project}
          roleLabel={content.roleLabel}
        />
      </div>
      <div className="relative lg:col-span-7 lg:pl-8">
        <ProjectMediaFrame
          caption={
            locale === "hu"
              ? "Ajánlati struktúra, amely nagy modul–task–phase hierarchiát tesz áttekinthetővé."
              : "A quote structure that keeps a large module–task–phase hierarchy understandable."
          }
          radius="surface"
        >
          <ProjectImage
            className="h-auto w-full"
            id={project.mediaIds[0]}
            locale={locale}
            sizes="(max-width: 1023px) 92vw, 55vw"
          />
        </ProjectMediaFrame>
        <ProjectMediaFrame
          className="mt-5 w-[92%] sm:ml-auto sm:w-[78%] lg:absolute lg:-bottom-14 lg:-left-2 lg:mt-0 lg:w-[52%]"
          radius="soft"
        >
          <ProjectImage
            className="h-auto w-full"
            id={project.mediaIds[1]}
            locale={locale}
            sizes="(max-width: 1023px) 72vw, 28vw"
          />
        </ProjectMediaFrame>
      </div>
    </article>
  );
}

function AlbaShowcase({
  content,
  locale,
}: {
  content: HomeContent["selectedWork"];
  locale: Locale;
}) {
  const project = content.projects[1];

  return (
    <article className="grid items-center gap-12 border-y border-[var(--color-border-subtle)] py-16 lg:grid-cols-12 lg:gap-12 lg:py-28">
      <div className="relative lg:col-span-7">
        <ProjectMediaFrame
          caption={
            locale === "hu"
              ? "A konfigurációs panel és a 3D nézet egy közös állapotot kezel desktopon és mobilon."
              : "The controls and 3D view share one configuration state across desktop and mobile."
          }
          radius="surface"
        >
          <ProjectImage
            className="h-auto w-full"
            id={project.mediaIds[0]}
            locale={locale}
            sizes="(max-width: 1023px) 92vw, 56vw"
          />
        </ProjectMediaFrame>
        <ProjectMediaFrame
          className="absolute -bottom-8 right-[4%] w-[24%] min-w-[6.5rem] shadow-[var(--shadow-surface)] sm:-bottom-14"
          radius="soft"
        >
          <ProjectImage
            className="h-auto w-full"
            id={project.mediaIds[1]}
            locale={locale}
            sizes="(max-width: 1023px) 22vw, 12vw"
          />
        </ProjectMediaFrame>
        <div
          aria-hidden="true"
          className="absolute -left-5 -top-5 -z-10 h-[72%] w-[68%] border-l border-t border-[var(--color-signal)] opacity-50"
        />
      </div>
      <div className="pt-8 lg:col-span-5 lg:pt-0">
        <ProjectCopy
          actionLabel={content.actionLabel}
          highlightsLabel={content.highlightsLabel}
          locale={locale}
          project={project}
          roleLabel={content.roleLabel}
        />
      </div>
    </article>
  );
}

function SanjiwaniShowcase({
  content,
  locale,
}: {
  content: HomeContent["selectedWork"];
  locale: Locale;
}) {
  const project = content.projects[2];

  return (
    <article className="my-16 overflow-hidden rounded-[var(--radius-surface)] bg-[var(--color-surface-warm)] px-5 py-10 sm:px-8 lg:my-24 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-12 lg:py-16">
      <div className="lg:col-span-5">
        <ProjectCopy
          actionLabel={content.actionLabel}
          highlightsLabel={content.highlightsLabel}
          locale={locale}
          project={project}
          roleLabel={content.roleLabel}
        />
      </div>
      <div className="mt-12 grid grid-cols-[minmax(0,1.35fr)_minmax(5rem,0.65fr)] gap-3 lg:col-span-7 lg:mt-0">
        <ProjectMediaFrame className="row-span-2" radius="surface">
          <ProjectImage
            className="h-full min-h-[24rem] w-full object-cover object-center sm:min-h-[32rem]"
            id={project.mediaIds[0]}
            locale={locale}
            sizes="(max-width: 1023px) 58vw, 35vw"
          />
        </ProjectMediaFrame>
        <ProjectMediaFrame radius="soft">
          <ProjectImage
            className="h-full min-h-0 w-full object-cover object-center"
            id={project.mediaIds[1]}
            locale={locale}
            sizes="(max-width: 1023px) 28vw, 17vw"
          />
        </ProjectMediaFrame>
        <ProjectMediaFrame radius="soft">
          <ProjectImage
            className="h-full min-h-0 w-full object-cover object-left"
            id={project.mediaIds[2]}
            locale={locale}
            sizes="(max-width: 1023px) 28vw, 17vw"
          />
        </ProjectMediaFrame>
      </div>
    </article>
  );
}

export function DeveloperHomepage({
  content,
  locale,
}: DeveloperHomepageProps) {
  return (
    <>
      <LegacyStudioAnchorRedirect locale={locale} />

      <EditorialSection
        className="overflow-hidden py-14 sm:py-20 lg:min-h-[43rem] lg:py-24"
        id="hero"
        spacing="none"
        tone="light"
      >
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <TechnicalAnnotation>{content.hero.eyebrow}</TechnicalAnnotation>
            <h1 className="mt-7 max-w-3xl text-[length:var(--font-size-display)] font-semibold leading-[0.96] tracking-[var(--letter-spacing-heading)] text-balance">
              {content.hero.headlineLead}{" "}
              <span className="font-serif font-normal italic">
                {content.hero.headlineAccent}
              </span>
            </h1>
            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              {content.hero.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="#featured-work" size="large">
                {content.hero.primaryCta}
              </ButtonLink>
              <ButtonLink
                download={content.chrome.cvDownloadFilename}
                href={content.chrome.cvHref}
                size="large"
                variant="secondary"
              >
                {content.hero.cvCta}
              </ButtonLink>
              <ButtonLink
                href={content.chrome.githubHref}
                size="large"
                target="_blank"
                variant="quiet"
              >
                {content.hero.githubCta} ↗
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <HeroBlueprint
              annotations={content.hero.blueprintAnnotations}
              label={content.hero.blueprintLabel}
              locale={locale}
            />
          </div>
        </div>

        <ul className="mt-12 grid border-y border-[var(--color-border-subtle)] sm:grid-cols-3 lg:mt-8">
          {content.hero.proofPoints.map((proof, index) => (
            <li
              className="flex min-h-20 items-center gap-4 border-b border-[var(--color-border-subtle)] py-4 text-sm font-semibold last:border-b-0 sm:border-b-0 sm:border-r sm:px-5 sm:first:pl-0 sm:last:border-r-0"
              key={proof}
            >
              <span
                aria-hidden="true"
                className="font-mono text-xs text-[var(--color-accent-secondary)]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              {proof}
            </li>
          ))}
        </ul>
      </EditorialSection>

      <EditorialSection
        id="featured-work"
        rule="top"
        spacing="spacious"
        tone="light"
      >
        <div className="max-w-4xl">
          <h2 className="text-[length:var(--font-size-section)] font-semibold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)]">
            {content.selectedWork.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
            {content.selectedWork.description}
          </p>
        </div>
        <AdottShowcase content={content.selectedWork} locale={locale} />
        <AlbaShowcase content={content.selectedWork} locale={locale} />
        <SanjiwaniShowcase content={content.selectedWork} locale={locale} />
      </EditorialSection>

      <EditorialSection
        className="overflow-hidden"
        id="samsung-impact"
        rule="both"
        spacing="compact"
        tone="subtle"
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-[clamp(5rem,11vw,9rem)] font-semibold leading-none tracking-[-0.08em] text-[var(--color-industrial)]">
              {content.samsungImpact.metric}
            </p>
          </div>
          <div className="max-w-xl lg:col-span-5">
            <h2 className="text-3xl font-semibold leading-tight tracking-[-0.035em] sm:text-4xl">
              {content.samsungImpact.title}
            </h2>
            <p className="mt-5 leading-7 text-[var(--color-text-secondary)]">
              {content.samsungImpact.description}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.1em] text-[var(--color-text-secondary)]">
              {content.samsungImpact.meta}
            </p>
            <InlineLinkArrow
              className="mt-5"
              href={getCaseStudyPath(
                "samsung-smart-gate-analytics",
                locale,
              )}
            >
              {content.samsungImpact.action}
            </InlineLinkArrow>
          </div>
          <figure className="lg:col-span-4">
            <figcaption className="sr-only">
              {content.samsungImpact.diagramLabel}
            </figcaption>
            <Image
              alt=""
              aria-hidden="true"
              className="h-auto w-full"
              height={320}
              sizes="(max-width: 1023px) 90vw, 30vw"
              src="/portfolio-v3/diagrams/samsung-gate-flow.svg"
              width={960}
            />
          </figure>
        </div>
      </EditorialSection>

      <EditorialSection id="experience" spacing="spacious" tone="light">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2 className="text-[length:var(--font-size-section)] font-semibold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)]">
              {content.profile.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {content.profile.description}
            </p>
          </div>
          <div className="lg:col-span-7">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
              {content.profile.experienceTitle}
            </h3>
            <ol className="mt-5 border-t border-[var(--color-border-strong)]">
              {content.profile.experience.map((entry) => (
                <li
                  className="grid gap-3 border-b border-[var(--color-border-subtle)] py-6 sm:grid-cols-[minmax(9rem,0.8fr)_minmax(0,1.7fr)] sm:gap-8"
                  key={entry.organization}
                >
                  <div>
                    <p className="font-semibold">
                      {entry.organization}
                      {entry.location ? (
                        <span className="text-[var(--color-text-secondary)]">
                          {" "}
                          · {entry.location}
                        </span>
                      ) : null}
                    </p>
                    <p className="mt-1 font-mono text-xs text-[var(--color-text-secondary)]">
                      {entry.period}
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold">{entry.role}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                      {entry.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div
          className="mt-20 border-t border-[var(--color-border-strong)] pt-10"
          id="capabilities"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            <h3 className="text-2xl font-semibold tracking-[-0.025em] lg:col-span-3">
              {content.profile.capabilityTitle}
            </h3>
            <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-9 lg:grid-cols-4">
              {content.profile.capabilities.map((group) => (
                <div key={group.title}>
                  <h4 className="font-semibold">{group.title}</h4>
                  <ul className="mt-4 grid gap-2 text-sm leading-6 text-[var(--color-text-secondary)]">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <InlineLinkArrow className="mt-8 lg:ml-[25%]" href={`/${locale}/lab`}>
            {content.profile.labAction}
          </InlineLinkArrow>
        </div>
      </EditorialSection>

      <EditorialSection
        className="py-6 sm:py-10"
        id="lab"
        spacing="none"
        tone="light"
      >
        <div
          className="overflow-hidden rounded-[var(--radius-surface)] bg-[var(--color-page)] px-6 py-10 text-[var(--color-text-primary)] sm:px-10 lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:px-14 lg:py-14"
          data-tone="dark"
        >
          <div className="lg:col-span-5">
            <TechnicalAnnotation>{content.labTeaser.eyebrow}</TechnicalAnnotation>
            <h2 className="mt-5 text-[clamp(2.2rem,4vw,4.4rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-balance">
              {content.labTeaser.title}
            </h2>
            <p className="mt-6 max-w-xl leading-7 text-[var(--color-text-secondary)]">
              {content.labTeaser.description}
            </p>
            <InlineLinkArrow className="mt-6" href={`/${locale}/lab`}>
              {content.labTeaser.action}
            </InlineLinkArrow>
          </div>
          <div className="mt-10 lg:col-span-7 lg:mt-0">
            <LabTeaserFlow content={content.labTeaser} />
          </div>
        </div>
      </EditorialSection>

      <EditorialSection id="studio" spacing="spacious" tone="light">
        <div className="relative overflow-hidden border-y border-[var(--color-border-strong)] py-12 sm:py-16 lg:grid lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
          <div className="max-w-4xl">
            <h2 className="text-[length:var(--font-size-section)] font-semibold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)]">
              {content.studioBridge.title}
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {content.studioBridge.description}
            </p>
          </div>
          <ButtonLink
            className="mt-8 lg:mt-0"
            href={`/${locale}/studio`}
            size="large"
          >
            {content.studioBridge.action}
          </ButtonLink>
          <span
            aria-hidden="true"
            className="absolute right-[18%] top-0 h-full w-px -skew-x-12 bg-[var(--color-accent)] opacity-30"
          />
        </div>
      </EditorialSection>

      <EditorialSection
        id="contact"
        rule="top"
        spacing="spacious"
        tone="light"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <TechnicalAnnotation>{content.contact.eyebrow}</TechnicalAnnotation>
            <h2 className="mt-5 text-[length:var(--font-size-section)] font-semibold leading-[var(--line-height-heading)] tracking-[var(--letter-spacing-heading)]">
              {content.contact.title}
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[var(--color-text-secondary)]">
              {content.contact.description}
            </p>
            <a
              className="mt-8 inline-flex min-h-[var(--target-min)] items-center border-b border-[var(--color-border-strong)] text-lg font-semibold underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
              href="mailto:digitalactivision@gmail.com"
            >
              {content.contact.directEmailLabel}
            </a>
          </div>
          <div className="lg:col-span-7">
            <DeferredContactForm content={content.contact} locale={locale} />
          </div>
        </div>
      </EditorialSection>
    </>
  );
}
