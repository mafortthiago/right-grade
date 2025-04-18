import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enTranslations from "../locale/en.json";
import ptTranslations from "../locale/pt.json";

const LANGUAGE_STORAGE_KEY = "notaCerta_language";

const getSavedLanguage = (): string => {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage) {
    return savedLanguage;
  }
  return "pt";
};

i18n.use(initReactI18next).init({
  resources: {
    en: {
      ...enTranslations,
    },
    pt: {
      ...ptTranslations,
    },
  },
  lng: getSavedLanguage(),
  fallbackLng: "pt",
});

i18n.on("languageChanged", (lng) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, lng);
  }
});

export default i18n;
