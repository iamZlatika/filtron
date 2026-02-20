"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslations } from "@/hooks/useTranslations";
import type { Locale } from "@/lib/i18n/getDictionary";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useTranslations();

  const getLocalizedPath = (newLocale: Locale) => {
    const segments = pathname.split("/");

    const isRu = segments[1] === "ru";
    const isUk = segments[1] === "uk";

    const newSegments = [...segments];

    if (newLocale === "ru") {
      if (isRu) return pathname; // Уже на RU
      if (isUk) {
        newSegments[1] = "ru";
      } else {
        newSegments.splice(1, 0, "ru");
      }
    } else {
      if (isRu) {
        newSegments.splice(1, 1);
      } else if (isUk) {
        return pathname;
      }
    }

    const finalPath = newSegments.join("/") || "/";
    return finalPath.replace(/\/+$/, "") || "/";
  };

  return (
    <div className="flex items-center gap-2 leading-none">
      {(["uk", "ru"] as const).map((lng) => {
        const isActive = locale === lng;
        return (
          <Link
            key={lng}
            href={getLocalizedPath(lng)}
            aria-current={isActive ? "page" : undefined}
            className={`uppercase inline-flex items-center justify-center h-8 px-3 rounded-full border text-xs md:text-sm font-medium transition-colors ${
              isActive
                ? "bg-primary text-white border-primary shadow-sm"
                : "text-white/90 border-white/20 hover:bg-white/10 hover:text-white"
            } focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/70 focus-visible:outline-offset-2`}
          >
            {lng}
          </Link>
        );
      })}
    </div>
  );
}
