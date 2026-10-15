"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, Check, Settings2, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

export default function CookieConsent() {
  const { language } = useLanguage();
  const isSv = language === "sv";

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [hasConsented, setHasConsented] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    setMounted(true);

    // Check existing consent
    const stored = localStorage.getItem("norvian_cookie_consent");
    if (stored) {
      setHasConsented(true);
      try {
        const parsed = JSON.parse(stored);
        if (parsed.preferences) {
          setPreferences(parsed.preferences);
        }
      } catch (e) {
        // ignore parse error
      }
    } else {
      // Not yet consented: trigger banner on scroll (low threshold: 50px), wheel, touch, or 3s timer
      let triggered = false;
      const triggerConsent = () => {
        if (!triggered) {
          triggered = true;
          setIsVisible(true);
          cleanupListeners();
        }
      };

      const handleScroll = () => {
        const y = window.scrollY || document.documentElement.scrollTop || 0;
        if (y > 50) {
          triggerConsent();
        }
      };

      const handleWheelOrTouch = () => {
        triggerConsent();
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("wheel", handleWheelOrTouch, { passive: true });
      window.addEventListener("touchmove", handleWheelOrTouch, { passive: true });

      // Lenis listener check
      const lenisTimer = setInterval(() => {
        if (typeof window !== "undefined" && (window as any).lenis) {
          (window as any).lenis.on("scroll", (e: any) => {
            if (e && (e.scroll > 50 || e.velocity > 0.1)) {
              triggerConsent();
            }
          });
          clearInterval(lenisTimer);
        }
      }, 150);

      // Graceful fallback timer after 3.5 seconds
      const fallbackTimer = setTimeout(() => {
        triggerConsent();
      }, 3500);

      const cleanupListeners = () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("wheel", handleWheelOrTouch);
        window.removeEventListener("touchmove", handleWheelOrTouch);
        clearInterval(lenisTimer);
        clearTimeout(fallbackTimer);
      };
    }

    // Global listener to re-open cookie preferences from footer or floating button
    const handleOpenCookies = () => {
      setIsVisible(true);
      setShowPreferences(true);
    };

    window.addEventListener("norvian:open-cookies", handleOpenCookies);
    return () => {
      window.removeEventListener("norvian:open-cookies", handleOpenCookies);
    };
  }, []);

  const saveConsent = (type: "all" | "necessary" | "custom", prefs?: CookiePreferences) => {
    const finalPrefs = prefs || (type === "all" 
      ? { necessary: true, analytics: true, marketing: true }
      : type === "necessary"
      ? { necessary: true, analytics: false, marketing: false }
      : preferences);

    localStorage.setItem("norvian_cookie_consent", JSON.stringify({ 
      type, 
      preferences: finalPrefs, 
      timestamp: new Date().toISOString() 
    }));
    setHasConsented(true);
    setIsVisible(false);
    setShowPreferences(false);
  };

  const handleAcceptAll = () => saveConsent("all");
  const handleAcceptNecessary = () => saveConsent("necessary");
  const handleSaveCustom = () => saveConsent("custom", preferences);

  // Avoid SSR hydration mismatch for portal
  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <>
      {/* 1. Permanent Floating Cookie Trigger Pill (Always available on every page in bottom-left corner) */}
      <AnimatePresence>
        {!isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[9990] pointer-events-auto"
          >
            <button
              type="button"
              onClick={() => {
                setIsVisible(true);
                setShowPreferences(true);
              }}
              className="flex items-center gap-2 bg-[#0B1522]/90 hover:bg-[#0E1A2B] backdrop-blur-xl border border-white/20 hover:border-[#C59C58]/60 text-white px-3.5 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-200 group cursor-pointer text-xs"
              title={isSv ? "Hantera kakor och integritet" : "Manage cookies and privacy"}
            >
              <div className="w-5 h-5 rounded-full bg-[#C59C58]/20 flex items-center justify-center text-[#C59C58] group-hover:scale-110 transition-transform">
                <Cookie className="w-3 h-3" />
              </div>
              <span className="font-mono text-[11px] text-white/90 group-hover:text-white font-medium">
                {isSv ? "Kakor" : "Cookies"}
              </span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Full Cookie Consent Banner & Preferences Drawer */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-3 inset-x-3 sm:bottom-6 sm:inset-x-auto sm:right-6 z-[9999] max-w-lg w-full pointer-events-auto"
          >
            <div className="relative bg-[#0B1522]/95 backdrop-blur-2xl border border-white/20 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-white space-y-4">
              
              {/* Top Bar with Icon & Title */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#C59C58]/15 border border-[#C59C58]/30 flex items-center justify-center shrink-0">
                    <Cookie className="w-5 h-5 text-[#C59C58]" />
                  </div>
                  <div>
                    <h4 className="font-serif text-base font-medium text-white">
                      {isSv ? "Integritet & Kakor (Cookies)" : "Cookie & Privacy Preferences"}
                    </h4>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#C59C58]">
                      {isSv ? "GDPR & Europeisk Efterlevnad" : "GDPR & EU ePrivacy Compliant"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsVisible(false)}
                  className="text-white/40 hover:text-white transition-colors p-1 rounded-lg cursor-pointer"
                  aria-label="Close cookie banner"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-white/75 font-light leading-relaxed">
                {isSv
                  ? "Vi använder kakor för att optimera webbplatsens funktionalitet, analysera trafik och säkerställa en sömlös användarupplevelse enligt europeiska dataskyddsregler."
                  : "We use cookies to ensure fundamental site functionality, analyze performance, and deliver a seamless experience in accordance with European data protection regulations."}
              </p>

              {/* Expandable Preferences Drawer */}
              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden space-y-2.5 pt-2 border-t border-white/10"
                  >
                    {/* Category 1: Strictly Necessary */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-white">
                            {isSv ? "Nödvändiga Kakor" : "Strictly Necessary"}
                          </span>
                          <span className="text-[9px] font-mono uppercase text-[#C59C58] bg-[#C59C58]/15 px-2 py-0.5 rounded-full border border-[#C59C58]/30">
                            {isSv ? "Alltid aktiv" : "Always Active"}
                          </span>
                        </div>
                        <p className="text-[11px] text-white/55 font-light">
                          {isSv 
                            ? "Krävs för säkerhet, språkval och sidnavigering."
                            : "Essential for site security, language choice, and core navigation."}
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-[#C59C58]/20 flex items-center justify-center text-[#C59C58]">
                        <Check className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Category 2: Analytics & Performance */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-white">
                          {isSv ? "Analys & Prestanda" : "Analytics & Performance"}
                        </span>
                        <p className="text-[11px] text-white/55 font-light">
                          {isSv 
                            ? "Hjälper oss mäta laddtider och förbättra användarresan."
                            : "Helps us assess page load speeds and optimize user journeys."}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C59C58]" />
                      </label>
                    </div>

                    {/* Category 3: Marketing & Media */}
                    <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-3">
                      <div className="space-y-0.5">
                        <span className="text-xs font-semibold text-white">
                          {isSv ? "Funktion & Media" : "Functionality & Media"}
                        </span>
                        <p className="text-[11px] text-white/55 font-light">
                          {isSv 
                            ? "Stödjer kartvisning och interaktiva videoelement."
                            : "Powers interactive maps and embedded video media elements."}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.marketing}
                          onChange={(e) => setPreferences({ ...preferences, marketing: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#C59C58]" />
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                {showPreferences ? (
                  <>
                    <button
                      type="button"
                      onClick={handleSaveCustom}
                      className="flex-1 bg-[#C59C58] hover:bg-[#D4AF37] text-[#080E18] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm text-center"
                    >
                      {isSv ? "Spara Inställningar" : "Save Preferences"}
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="bg-white/10 hover:bg-white/15 text-white py-2.5 px-4 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
                    >
                      {isSv ? "Godkänn Alla" : "Accept All"}
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleAcceptAll}
                      className="flex-1 bg-[#C59C58] hover:bg-[#D4AF37] text-[#080E18] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm text-center"
                    >
                      {isSv ? "Godkänn Alla" : "Accept All"}
                    </button>
                    <button
                      type="button"
                      onClick={handleAcceptNecessary}
                      className="bg-white/10 hover:bg-white/15 text-white/90 py-2.5 px-3.5 rounded-xl text-xs font-medium transition-all duration-200 cursor-pointer"
                    >
                      {isSv ? "Endast Nödvändiga" : "Necessary Only"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowPreferences(true)}
                      className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all duration-200 cursor-pointer flex items-center gap-1.5 text-xs"
                      title={isSv ? "Anpassa inställningar" : "Customize preferences"}
                    >
                      <Settings2 className="w-3.5 h-3.5 text-[#C59C58]" />
                      <span className="hidden sm:inline">{isSv ? "Anpassa" : "Customize"}</span>
                    </button>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>,
    document.body
  );
}
