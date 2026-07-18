import { ImageResponse } from "next/og";
import { CaseStudySocialImage } from "@/components/case-studies/SocialImage";
import { caseStudyUi } from "@/components/case-studies/labels";
import {
  caseStudySlugs,
  getCaseStudy,
  localize,
  type CaseStudySlug,
} from "@/content/case-studies";
import { isLocale, routing } from "@/i18n/routing";

export const dynamicParams = false;

function isCaseStudySlug(value: string): value is CaseStudySlug {
  return caseStudySlugs.some((slug) => slug === value);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    caseStudySlugs.map((slug) => ({ locale, slug })),
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string; slug: string }> },
) {
  const { locale, slug } = await params;

  if (!isLocale(locale) || !isCaseStudySlug(slug)) {
    return new Response("Not found", { status: 404 });
  }

  const study = getCaseStudy(slug);
  const labels = caseStudyUi[locale];

  return new ImageResponse(
    (
      <CaseStudySocialImage
        locale={locale}
        result={localize(study.results[0].claim, locale)}
        status={labels.status[study.status]}
        title={localize(study.title, locale)}
      />
    ),
    { height: 630, width: 1200 },
  );
}
