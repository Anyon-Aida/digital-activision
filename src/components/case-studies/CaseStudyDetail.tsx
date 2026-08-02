import Image from "next/image";
import type {
  CaseStudy,
  CaseStudyLocale,
} from "@/content/case-studies";
import {
  getCaseStudy,
  getCaseStudyPath,
  localize,
} from "@/content/case-studies";
import {
  getProjectMedia,
  getProjectMediaSource,
  type ProjectMediaId,
} from "@/content/project-media";
import {
  EditorialSection,
  InlineLinkArrow,
  ProjectMediaFrame,
  TechnicalAnnotation,
} from "@/components/ui";

type CaseStudyDetailProps = {
  locale: CaseStudyLocale;
  study: CaseStudy;
};

const detailCopy = {
  hu: {
    eyebrow: "ESETTANULMÁNY",
    home: "Főoldal",
    work: "Munkák",
    role: "Szerepkör",
    technologies: "Technológiák és területek",
    disclosure: "A bemutatás kerete",
    measuredImpact: "Mérhető hatás",
    sharedOutcome: "Közös rendszereredmény",
    impactClaim:
      "20%-kal pontosabb rendszám-ellenőrzési folyamat a modernizált rendszerben.",
    impactAttribution:
      "A mérőszám a vállalati modernizáció közös rendszereredménye, nem kizárólagos egyéni teljesítmény.",
    privateDisclosure:
      "A képernyők és diagramok portfóliócélú rekonstrukciók vagy tesztadatokat mutató referenciák. A vállalati információk anonimizáltak.",
    inProgressDisclosure:
      "A QuestLog fejlesztés alatt áll; a bemutatás a termékirányt és a tervezett PWA-alapokat foglalja össze.",
    related: "Kapcsolódó munkák",
    back: "Vissza az összes munkához",
  },
  en: {
    eyebrow: "CASE STUDY",
    home: "Home",
    work: "Work",
    role: "Role",
    technologies: "Technologies and disciplines",
    disclosure: "Presentation context",
    measuredImpact: "Measured impact",
    sharedOutcome: "Shared system outcome",
    impactClaim:
      "A 20% more accurate licence-plate verification workflow in the modernized system.",
    impactAttribution:
      "The metric is a shared outcome of the enterprise modernization, not an exclusively individual achievement.",
    privateDisclosure:
      "Screens and diagrams are portfolio reconstructions or references using test data. Company information is anonymized.",
    inProgressDisclosure:
      "QuestLog is in progress; this presentation outlines the product direction and planned PWA foundations.",
    related: "Related work",
    back: "Back to all work",
  },
} as const;

function MediaFigure({
  caption = true,
  id,
  locale,
  priority = false,
  sizes,
}: {
  caption?: boolean;
  id: ProjectMediaId;
  locale: CaseStudyLocale;
  priority?: boolean;
  sizes: string;
}) {
  const media = getProjectMedia(id);
  const isDiagram = media.kind === "diagram";

  return (
    <ProjectMediaFrame
      caption={caption ? media.alt[locale] : undefined}
      className="h-full"
      radius="soft"
    >
      <div
        className={
          isDiagram
            ? media.surface === "light"
              ? "flex min-h-72 items-center bg-[var(--color-surface)] p-5 sm:p-8"
              : "flex min-h-72 items-center bg-[var(--color-diagram-surface)] p-5 sm:p-8"
            : "bg-[var(--color-surface-subtle)]"
        }
      >
        <Image
          alt={isDiagram ? "" : media.alt[locale]}
          className={
            isDiagram
              ? "h-auto w-full object-contain"
              : "h-auto w-full object-cover"
          }
          height={media.height}
          priority={priority}
          sizes={sizes}
          src={getProjectMediaSource(media)}
          unoptimized={isDiagram}
          width={media.width}
        />
      </div>
    </ProjectMediaFrame>
  );
}

function StoryMedia({
  ids,
  locale,
}: {
  ids: readonly ProjectMediaId[];
  locale: CaseStudyLocale;
}) {
  if (ids.length === 0) {
    return null;
  }

  const mediaItems = ids.map((id) => getProjectMedia(id));
  const splitPortraitPair =
    mediaItems.length === 2 &&
    mediaItems.every(({ kind }) => kind === "screenshot") &&
    mediaItems.some(({ width, height }) => height > width) &&
    mediaItems.some(({ width, height }) => width >= height);

  return (
    <div
      className={
        splitPortraitPair
          ? "mt-9 grid gap-6 md:grid-cols-12 md:items-start"
          : "mt-9 grid gap-8"
      }
    >
      {ids.map((id) => {
        const media = getProjectMedia(id);
        const portrait = media.height > media.width;

        return (
          <div
            className={
              splitPortraitPair
                ? portrait
                  ? "md:col-span-4"
                  : "md:col-span-8"
                : undefined
            }
            key={id}
          >
            <MediaFigure
              id={id}
              locale={locale}
              sizes={
                splitPortraitPair
                  ? portrait
                    ? "(min-width: 1024px) 24vw, (min-width: 768px) 30vw, 94vw"
                    : "(min-width: 1024px) 50vw, (min-width: 768px) 62vw, 94vw"
                  : "(min-width: 1024px) 72vw, 94vw"
              }
            />
          </div>
        );
      })}
    </div>
  );
}

export function CaseStudyDetail({ locale, study }: CaseStudyDetailProps) {
  const copy = detailCopy[locale];
  const heroMediaId = study.presentation.featuredMedia[0];
  const publicDisclosure =
    study.visibility === "anonymized"
      ? copy.privateDisclosure
      : study.status === "in-progress"
        ? copy.inProgressDisclosure
        : undefined;
  const measuredResult = study.results.find(({ metric }) => Boolean(metric));

  return (
    <article>
      <EditorialSection
        className="overflow-hidden"
        rule="bottom"
        spacing="spacious"
        tone="light"
      >
        <nav aria-label={locale === "hu" ? "Morzsanavigáció" : "Breadcrumb"}>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[var(--color-text-secondary)]">
            <li>
              <a className="underline underline-offset-4" href={`/${locale}`}>
                {copy.home}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <a
                className="underline underline-offset-4"
                href={`/${locale}/work`}
              >
                {copy.work}
              </a>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page">{localize(study.title, locale)}</li>
          </ol>
        </nav>

        <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div
            className={
              heroMediaId
                ? "lg:col-span-6 lg:col-start-1 lg:row-start-1"
                : "lg:col-span-9"
            }
          >
            <TechnicalAnnotation>{copy.eyebrow}</TechnicalAnnotation>
            <h1 className="mt-5 text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.055em] text-balance">
              {localize(study.title, locale)}
            </h1>
            <p className="mt-7 max-w-[70ch] text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
              {localize(study.presentation.homepageSummary, locale)}
            </p>

          </div>

          {heroMediaId ? (
            <div className="lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1">
              <MediaFigure
                caption={false}
                id={heroMediaId}
                locale={locale}
                priority
                sizes="(min-width: 1024px) 50vw, 94vw"
              />
            </div>
          ) : null}

          <dl
            className={`grid gap-6 border-t border-[var(--color-border-subtle)] pt-6 sm:grid-cols-2 ${
              heroMediaId
                ? "lg:col-span-6 lg:col-start-1 lg:row-start-2"
                : "lg:col-span-9"
            }`}
          >
            <div>
              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                {copy.role}
              </dt>
              <dd className="mt-2 font-semibold">
                {localize(study.presentation.roleSummary, locale)}
              </dd>
            </div>
            <div>
              <dt className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-text-secondary)]">
                {copy.technologies}
              </dt>
              <dd className="mt-2 text-sm leading-6">
                {study.technologies.map(({ name }) => name).join(" · ")}
              </dd>
            </div>
          </dl>
        </header>

        {publicDisclosure ? (
          <aside className="mt-10 max-w-4xl border-l-2 border-[var(--color-industrial)] bg-[var(--color-surface-subtle)] px-5 py-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.12em] text-[var(--color-accent-secondary)]">
              {copy.disclosure}
            </p>
            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              {publicDisclosure}
            </p>
          </aside>
        ) : null}
      </EditorialSection>

      {study.presentation.storySections.map((section, index) => (
        <EditorialSection
          className="scroll-mt-24"
          data-case-study-section={section.id}
          id={`case-study-${section.id}`}
          key={section.id}
          rule="bottom"
          spacing="spacious"
          tone={index % 2 === 0 ? "light" : "subtle"}
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-3">
              <span
                aria-hidden="true"
                className="block h-px w-12 bg-[var(--color-industrial)]"
              />
              <h2 className="mt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-balance sm:text-3xl">
                {localize(section.title, locale)}
              </h2>
            </div>
            <div className="min-w-0 lg:col-span-9">
              <div className="max-w-[76ch] space-y-5 text-lg leading-8 text-[var(--color-text-secondary)]">
                {section.paragraphs.map((paragraph) => (
                  <p key={localize(paragraph, locale)}>
                    {localize(paragraph, locale)}
                  </p>
                ))}
              </div>
              <StoryMedia ids={section.mediaIds} locale={locale} />
            </div>
          </div>
        </EditorialSection>
      ))}

      {measuredResult?.metric ? (
        <EditorialSection rule="bottom" spacing="spacious" tone="dark">
          <div className="grid gap-8 lg:grid-cols-[minmax(12rem,0.55fr)_minmax(0,1fr)] lg:items-center">
            <p className="font-mono text-[clamp(4rem,11vw,9rem)] font-semibold leading-none tracking-[-0.07em] text-[var(--color-signal)]">
              +{measuredResult.metric.value}%
            </p>
            <div className="max-w-2xl">
              <TechnicalAnnotation>{copy.measuredImpact}</TechnicalAnnotation>
              <p className="mt-4 text-2xl font-semibold leading-tight tracking-[-0.03em] sm:text-4xl">
                {copy.impactClaim}
              </p>
              <p className="mt-5 text-sm leading-6 text-[var(--color-text-secondary)]">
                <span className="font-semibold">{copy.sharedOutcome}: </span>
                {copy.impactAttribution}
              </p>
            </div>
          </div>
        </EditorialSection>
      ) : null}

      <EditorialSection spacing="spacious" tone="light">
        <div className="grid gap-12">
          <section aria-labelledby="related-work-title">
            <TechnicalAnnotation>{copy.related}</TechnicalAnnotation>
            <h2
              className="mt-4 text-3xl font-semibold tracking-[-0.035em] sm:text-5xl"
              id="related-work-title"
            >
              {copy.related}
            </h2>
            <ul className="mt-8 grid gap-px border-y border-[var(--color-border-subtle)] bg-[var(--color-border-subtle)] sm:grid-cols-2">
              {study.relatedSlugs.map((slug) => {
                const related = getCaseStudy(slug);

                return (
                  <li className="bg-[var(--color-page)]" key={slug}>
                    <a
                      className="group flex min-h-28 items-center justify-between gap-5 px-5 py-6 no-underline transition-colors hover:bg-[var(--color-surface-subtle)]"
                      href={getCaseStudyPath(slug, locale)}
                    >
                      <span>
                        <span className="block text-lg font-semibold">
                          {localize(related.title, locale)}
                        </span>
                        <span className="mt-2 block text-sm text-[var(--color-text-secondary)]">
                          {localize(
                            related.presentation.homepageSummary,
                            locale,
                          )}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="transition-transform group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </section>

          <InlineLinkArrow className="w-fit" href={`/${locale}/work`}>
            {copy.back}
          </InlineLinkArrow>
        </div>
      </EditorialSection>
    </article>
  );
}
