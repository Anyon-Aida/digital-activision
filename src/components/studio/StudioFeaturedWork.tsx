import Image from "next/image";
import type { StudioLocaleContent } from "@/content/studio";
import { Link } from "@/i18n/navigation";
import { EditorialSection, ProjectMediaFrame } from "@/components/ui";

type StudioFeaturedWorkProps = {
  content: StudioLocaleContent;
};

export function StudioFeaturedWork({ content }: StudioFeaturedWorkProps) {
  return (
    <EditorialSection
      aria-labelledby="studio-featured-title"
      id="featured-work"
      rule="top"
      tone="light"
    >
      <header className="max-w-3xl">
        <h2
          className="text-[length:var(--font-size-section)] font-semibold leading-[1] tracking-[var(--letter-spacing-heading)]"
          id="studio-featured-title"
        >
          {content.featuredHeading}
        </h2>
        <p className="mt-5 text-lg leading-8 text-[var(--color-text-secondary)]">
          {content.featuredIntro}
        </p>
      </header>

      <div className="mt-14 space-y-20">
        {content.featuredWork.map((project, index) => (
          <article
            className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12"
            key={project.id}
          >
            <ProjectMediaFrame
              className={
                index % 2 === 0
                  ? "lg:col-span-7"
                  : "lg:order-2 lg:col-span-7"
              }
              radius="surface"
            >
              <Link
                aria-label={project.title}
                className="group relative block aspect-[16/9] bg-[var(--color-surface-subtle)]"
                href={project.href}
              >
                <Image
                  alt={project.alt}
                  className="object-cover object-top transition-transform duration-[var(--motion-duration-default)] ease-[var(--motion-ease-standard)] group-hover:scale-[1.015]"
                  fill
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  src={project.image}
                />
              </Link>
            </ProjectMediaFrame>

            <div
              className={
                index % 2 === 0
                  ? "lg:col-span-5 lg:pl-4"
                  : "lg:order-1 lg:col-span-5 lg:pr-4"
              }
            >
              <h3 className="text-[length:var(--font-size-project)] font-semibold leading-[1.03] tracking-[var(--letter-spacing-heading)]">
                <Link
                  className="decoration-[var(--color-border-strong)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
                  href={project.href}
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-5 max-w-xl leading-7 text-[var(--color-text-secondary)]">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </EditorialSection>
  );
}
