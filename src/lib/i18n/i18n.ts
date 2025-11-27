"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { dictionary } from "./dictionary";

const resources = {
  uk: { translation: dictionary.uk },
  ru: { translation: dictionary.ru },
};

if (!i18n.isInitialized) {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: "uk",
      supportedLngs: ["uk", "ru"],

      detection: {
        order: ["localStorage", "navigator"],
      },

      interpolation: {
        escapeValue: false,
      },
    });
}

export default i18n;
