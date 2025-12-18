import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["uk", "ru"];
const defaultLocale = "uk";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Исключаем статику и API (уже есть в конфиге, но для надежности)
  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    pathname.includes(".")
  ) {
    return;
  }

  // 2. Проверка, есть ли локаль в пути
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  // 3. Если мы на главной '/'
  if (pathname === "/") {
    // Делаем REWRITE на /uk, чтобы в строке браузера осталось '/',
    // но Next.js отрендерил страницу из src/app/[locale]/page.tsx
    return NextResponse.rewrite(new URL(`/${defaultLocale}`, request.url));
  }

  // 4. Если локали нет в пути (например, /services)
  if (!pathnameHasLocale) {
    // Для всех остальных страниц делаем REDIRECT на /uk/services
    // (так как вы хотели, чтобы дальнейшие переходы имели префикс)
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname}`, request.url),
    );
  }

  return;
}
