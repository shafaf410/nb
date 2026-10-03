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
        onClick={toggleLanguage}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-300 hover:text-[#C59C58] cursor-pointer ${className}`}
        title={language === "en" ? "Byt till Svenska" : "Switch to English"}
        aria-label="Switch Language"
      >
        {language === "en" ? "SV" : "EN"}
      </button>
    );
  }

  if (variant === "dark") {
    return (
      <div
        className={`inline-flex items-center p-0.5 rounded-full bg-white/[0.07] border border-white/10 backdrop-blur-md ${className}`}
        role="group"
        aria-label="Language Selector"
      >
        <button
          type="button"
          onClick={() => setLanguage("en")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            language === "en"
              ? "bg-white/15 text-[#E6C687] shadow-xs"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={language === "en"}
        >
          EN
        </button>
        <button
          type="button"
          onClick={() => setLanguage("sv")}
          className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
            language === "sv"
              ? "bg-white/15 text-[#E6C687] shadow-xs"
              : "text-white/60 hover:text-white"
          }`}
          aria-pressed={language === "sv"}
        >
          SV
        </button>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-full bg-[#0B1522]/8 border border-[#0B1522]/10 backdrop-blur-md shadow-xs ${className}`}
      role="group"
      aria-label="Language Selector"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
          language === "en"
            ? "bg-[#0B1522] text-[#C59C58] shadow-sm"
            : "text-[#0B1522]/60 hover:text-[#0B1522]"
        }`}
        aria-pressed={language === "en"}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("sv")}
        className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
          language === "sv"
            ? "bg-[#0B1522] text-[#C59C58] shadow-sm"
            : "text-[#0B1522]/60 hover:text-[#0B1522]"
        }`}
        aria-pressed={language === "sv"}
      >
        SV
      </button>
    </div>
  );
}
