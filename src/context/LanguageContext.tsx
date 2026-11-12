"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language } from "@/data/translations";

export type TranslationDict = typeof translations[Language];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDict;
}

const defaultContextValue: LanguageContextType = {
  language: "sv",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: translations.sv,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("sv");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("norvian_user_chosen_lang") as Language;
      if (saved === "en" || saved === "sv" || saved === "de") {
        setLanguageState(saved);
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem("norvian_user_chosen_lang", lang);
    } catch {
      // Ignore
    }
  };

  const toggleLanguage = () => {
    const next: Language = language === "sv" ? "en" : language === "en" ? "de" : "sv";
    setLanguage(next);
  };

  const t = translations[language] || translations.sv;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  return context || defaultContextValue;
}
