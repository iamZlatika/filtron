import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getLocalizedHref(href: string, locale: string) {
  const cleanHref = href.startsWith("/") ? href : `/${href}`;

  if (locale === "ru") {
    return `/ru${cleanHref}`;
  }

  return cleanHref;
}
