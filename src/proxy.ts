import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const locales = ["uk", "ru"];
const defaultLocale = "uk";

const noLocaleRoutes = ["/admin-news", "/login"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes(".")
  ) {
    return;
  }

  if (pathname.startsWith("/admin-news")) {
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_AUTH_SECRET,
    });

    if (!token) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  if (pathname === "/login") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXT_AUTH_SECRET,
    });
    if (token) {
      const backTo =
        request.nextUrl.searchParams.get("callbackUrl") || "/admin-news";
      return NextResponse.redirect(new URL(backTo, request.url));
    }
  }

  if (noLocaleRoutes.includes(pathname)) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathname === "/") {
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  return;
}
