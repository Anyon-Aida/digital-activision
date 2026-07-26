import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { localizedNotFoundResponse } from "@/i18n/not-found-response";
import {
  isLocale,
  isUnsupportedLocaleSegment,
  routing,
} from "@/i18n/routing";
import { isCaseStudySlug } from "@/lib/case-study-routes";
import { isLegacyPathname } from "@/lib/legacy-routes";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (isLegacyPathname(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.length > 1 &&
    request.nextUrl.pathname.endsWith("/")
  ) {
    const canonicalUrl = new URL(request.url);
    canonicalUrl.pathname = request.nextUrl.pathname.slice(0, -1);
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const firstSegment = request.nextUrl.pathname.split("/")[1];

  if (isUnsupportedLocaleSegment(firstSegment)) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = `/${routing.defaultLocale}/__invalid-locale`;
    return NextResponse.rewrite(notFoundUrl);
  }

  const segments = request.nextUrl.pathname.split("/").filter(Boolean);
  if (
    segments.length === 3 &&
    isLocale(segments[0]) &&
    segments[1] === "work" &&
    segments[2] !== "social-image" &&
    !isCaseStudySlug(segments[2])
  ) {
    return localizedNotFoundResponse(request.nextUrl.pathname, segments[0]);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
