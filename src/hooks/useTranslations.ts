"use client";

import { useParams } from "next/navigation";

import { getDictionary, isLocale } from "@/lib/i18n/getDictionary";

export function useTranslations() {
  const params = useParams();

  const localeParam =
    typeof params.locale === "string" ? params.locale : undefined;

  const locale = isLocale(localeParam) ? localeParam : "uk";
  const dict = getDictionary(locale);

  return {
    locale,
    dict,
    t: dict,
  };
}
