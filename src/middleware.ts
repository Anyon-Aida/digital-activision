import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { isUnsupportedLocaleSegment, routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const firstSegment = request.nextUrl.pathname.split("/")[1];

  if (isUnsupportedLocaleSegment(firstSegment)) {
    const notFoundUrl = request.nextUrl.clone();
    notFoundUrl.pathname = `/${routing.defaultLocale}/__invalid-locale`;
    return NextResponse.rewrite(notFoundUrl);
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
