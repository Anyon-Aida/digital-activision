import type { NextRequest } from "next/server";
import { localizedNotFoundResponse } from "@/i18n/not-found-response";
import { isLocale, routing } from "@/i18n/routing";

type CatchAllContext = {
  params: Promise<{ locale: string; rest: string[] }>;
};

export async function GET(request: NextRequest, context: CatchAllContext) {
  const { locale: requestedLocale } = await context.params;
  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return localizedNotFoundResponse(request.nextUrl.pathname, locale);
}
