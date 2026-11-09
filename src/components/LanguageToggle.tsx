"use client";

import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  variant?: "pill" | "minimal" | "dark" | "dropdown";
  className?: string;
}

export default function LanguageToggle({ variant = "pill", className = "" }: LanguageToggleProps) {
  const { language, setLanguage, toggleLanguage } = useLanguage();

  if (variant === "minimal") {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        translate="no"
        className={`notranslate px-2.5 py-1 rounded-full text-[10.5px] font-bold tracking-wider uppercase transition-all duration-300 hover:text-[#C59C58] cursor-pointer whitespace-nowrap select-none ${className}`}
        title={language === "sv" ? "Switch to English" : "Byt till Svenska"}
        aria-label="Switch Language"
      >
        <span translate="no" className="notranslate font-bold">
          {language === "sv" ? "ENG" : "SW"}
        </span>
      </button>
    );
  }

  if (variant === "dark") {
    return (
      <div
        translate="no"
        className={`notranslate inline-flex items-center p-0.5 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-md shrink-0 whitespace-nowrap select-none ${className}`}
        role="group"
        aria-label="Language Selector"
      >
        <button
          type="button"
          onClick={() => setLanguage("sv")}
          translate="no"
          className={`notranslate px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            language === "sv"
              ? "bg-white/15 text-[#E6C687] shadow-xs"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={language === "sv"}
        >
          <span translate="no" className="notranslate font-bold">SW</span>
        </button>
        <button
          type="button"
          onClick={() => setLanguage("en")}
          translate="no"
          className={`notranslate px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            language === "en"
              ? "bg-white/15 text-[#E6C687] shadow-xs"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={language === "en"}
        >
          <span translate="no" className="notranslate font-bold">ENG</span>
        </button>
      </div>
    );
  }

  return (
    <div
      translate="no"
      className={`notranslate inline-flex items-center p-0.5 rounded-full bg-[#0B1522]/8 border border-[#0B1522]/10 backdrop-blur-md shadow-xs shrink-0 whitespace-nowrap select-none ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("sv")}
        translate="no"
        className={`notranslate px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
          language === "sv"
            ? "bg-[#0B1522] text-[#C59C58] shadow-sm font-bold"
            : "text-[#0B1522]/60 hover:text-[#0B1522] font-semibold"
        }`}
        aria-pressed={language === "sv"}
      >
        <span translate="no" className="notranslate font-bold">SW</span>
      </button>
      <button
        type="button"
        onClick={() => setLanguage("en")}
        translate="no"
        className={`notranslate px-2.5 py-1 rounded-full text-[10.5px] sm:text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[#0B1522] text-[#C59C58] shadow-sm font-bold"
            : "text-[#0B1522]/60 hover:text-[#0B1522] font-semibold"
        }`}
        aria-pressed={language === "en"}
      >
        <span translate="no" className="notranslate font-bold">ENG</span>
      </button>
    </div>
  );
}
