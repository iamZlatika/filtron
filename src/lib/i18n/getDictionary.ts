import ru from "../i18n/dictionary/ru.json";
import uk from "../i18n/dictionary/uk.json";

export type Locale = "uk" | "ru";
export type Dictionary = typeof uk;

const dictionaries: Record<Locale, Dictionary> = { uk, ru };

export const isLocale = (v: string | undefined): v is Locale =>
  v === "uk" || v === "ru";

export function getDictionary(locale?: string): Dictionary {
  const key: Locale = isLocale(locale) ? locale : "uk";
  return dictionaries[key];
}
