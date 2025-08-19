import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const storedLocale = request.cookies.get("NEXT_LOCALE")?.value || false;
  const [, locale, ...segments] = request.nextUrl.pathname.split("/");
  const cookieStore = cookies();

  // Default fallback locale
  let modifiedLocale: "en" | "mm" | "cn" = "en";

  if (locale && ["en", "mm", "cn"].includes(locale)) {
    modifiedLocale = locale as typeof modifiedLocale;
  }

  if (!storedLocale) {
    const redirectUrl = new URL(
      `/${modifiedLocale}/${segments.join("/")}`,
      request.url
    );

    (await cookieStore).set("NEXT_LOCALE", modifiedLocale);
    return NextResponse.redirect(redirectUrl);
  } else if (request.nextUrl.pathname === `/${storedLocale}/maintain`) {
    return NextResponse.redirect(new URL(`/${storedLocale}`, request.url));
  }

  return handleI18nRouting(request);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(mm|en|cn)/:path*"],
};
