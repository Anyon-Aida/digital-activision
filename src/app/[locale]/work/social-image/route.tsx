import { ImageResponse } from "next/og";
import { WorkSocialImage } from "@/components/case-studies/SocialImage";
import { caseStudyUi } from "@/components/case-studies/labels";
import { isLocale } from "@/i18n/routing";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const labels = caseStudyUi[locale];

  return new ImageResponse(
    (
      <WorkSocialImage
        description={labels.indexMetaDescription}
        locale={locale}
        title={labels.indexTitle}
      />
    ),
    { height: 630, width: 1200 },
  );
}
