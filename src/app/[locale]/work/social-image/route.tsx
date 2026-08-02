import { ImageResponse } from "next/og";
import { WorkSocialImage } from "@/components/case-studies/SocialImage";
import { isLocale } from "@/i18n/routing";

export const runtime = "edge";

const workSocialCopy = {
  hu: {
    title: "Rendszerek, termékek és interakciók.",
    description:
      "Vállalati workflow, 3D konfiguráció, valós idejű analitika és szolgáltatásfoglalás.",
  },
  en: {
    title: "Systems, products and interactions.",
    description:
      "Enterprise workflow, 3D configuration, real-time analytics and service booking.",
  },
} as const;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return new Response("Not found", { status: 404 });
  }

  const copy = workSocialCopy[locale];

  return new ImageResponse(
    (
      <WorkSocialImage
        description={copy.description}
        locale={locale}
        title={copy.title}
      />
    ),
    { height: 630, width: 1200 },
  );
}
