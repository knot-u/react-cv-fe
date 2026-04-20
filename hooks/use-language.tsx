"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import mockData from "@/mock-data.json";
import type { Language, LanguageId, LocalizedContent, PortfolioData } from "@/lib/types";

const portfolioData = mockData as PortfolioData;
const fallbackLanguage = portfolioData.languages.find((item) => item.id === "eng")?.id ?? portfolioData.languages[0]?.id ?? "eng";

type LanguageContextValue = {
  language: LanguageId;
  setLanguage: (language: LanguageId) => void;
  languages: Language[];
  copy: LocalizedContent;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<LanguageId>(fallbackLanguage);

  useEffect(() => {
    const stored = window.localStorage.getItem("portfolio-language") as LanguageId | null;
    if (stored && portfolioData.localizedContent[stored]) {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("portfolio-language", language);
    document.documentElement.lang = language === "esp" ? "es" : language === "por" ? "pt" : "en";
  }, [language]);

  const value = useMemo<LanguageContextValue>(() => ({
    language,
    setLanguage,
    languages: portfolioData.languages,
    copy: portfolioData.localizedContent[language] ?? portfolioData.localizedContent[fallbackLanguage],
  }), [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
