"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import i18n from "@/lib/i18n/i18n";

type Lang = "uk" | "ru";

type LanguageContextType = {
  lang: Lang;
  switchLang: (l: Lang) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Инициализируем состояние из i18n, если уже определён язык, иначе — uk
  const [lang, setLang] = useState<Lang>((i18n.language as Lang) || "uk");

  // Подписываемся на смену языка в i18next, чтобы синхронизировать контекст
  useEffect(() => {
    const handler = (lng: string) => setLang((lng as Lang) || "uk");
    i18n.on("languageChanged", handler);
    return () => {
      i18n.off("languageChanged", handler);
    };
  }, []);

  const switchLang = (l: Lang) => {
    i18n.changeLanguage(l);
  };

  return (
    <LanguageContext.Provider value={{ lang, switchLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
