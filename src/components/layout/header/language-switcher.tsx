"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useTranslations } from "@/hooks/useTranslations";
import type { Locale } from "@/lib/i18n/getDictionary";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const { locale } = useTranslations();

  // Функция для получения пути на другом языке
  const getLocalizedPath = (newLocale: Locale) => {
    const segments = pathname.split("/");

    // segments[0] всегда "" (пустая строка перед первым слешем)
    // Проверяем, является ли второй сегмент текущей локалью (ru или uk)
    const isRu = segments[1] === "ru";
    const isUk = segments[1] === "uk";

    // Создаем копию сегментов для модификации
    const newSegments = [...segments];

    if (newLocale === "ru") {
      if (isRu) return pathname; // Уже на RU
      if (isUk) {
        // Заменяем uk на ru
        newSegments[1] = "ru";
      } else {
        // Если префикса не было (базовый путь /services), добавляем ru
        newSegments.splice(1, 0, "ru");
      }
    } else {
      // Переход на UK (дефолтная локаль без префикса или с префиксом /uk)
      if (isRu) {
        // Удаляем /ru
        newSegments.splice(1, 1);
      } else if (isUk) {
        // Если мы хотим "чистые" URL для UK, можно удалить префикс /uk
        // newSegments.splice(1, 1);
        return pathname; // Или оставить как есть, если /uk допустим
      }
    }

    // Собираем путь обратно, фильтруя лишние пустые строки
    const finalPath = newSegments.join("/") || "/";
    return finalPath.replace(/\/+$/, "") || "/"; // Убираем лишний слеш в конце
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
