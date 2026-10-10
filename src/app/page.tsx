"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoScrollIntro from "@/components/VideoScrollIntro";
import IntroCinematicSection from "@/components/IntroCinematicSection";
import IndustriesSection from "@/components/IndustriesSection";
import AboutSection from "@/components/AboutSection";
import WhyNorvianSection from "@/components/WhyNorvianSection";
import WorkforceFormSection from "@/components/WorkforceFormSection";
import IndustryModal from "@/components/IndustryModal";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function MainContent() {
  const [activeModal, setActiveModal] = useState<"shipbuilding" | "construction" | "logistics" | null>(null);
  const [currentServiceSlide, setCurrentServiceSlide] = useState<"shipbuilding" | "construction" | "logistics">("shipbuilding");
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>("");
  const [isNavVisible, setIsNavVisible] = useState(false);

  const scrollToRequestForm = () => {
    const el = document.getElementById("request-form");
    if (el) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(el, { duration: 1.3, offset: -20 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleSelectIndustry = (key: "shipbuilding" | "construction" | "logistics") => {
    setCurrentServiceSlide(key);
    setActiveModal(key);
  };

  const handleCloseServicePage = () => {
    setActiveModal(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#service-")) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  };

  const handleRequestForIndustry = (industryName: string) => {
    setActiveModal(null);
    setPrefilledIndustry(industryName);
    scrollToRequestForm();
  };

  // Optional URL Hash deep link synchronization
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === "#service-shipbuilding" || hash === "#shipbuilding") {
        setCurrentServiceSlide("shipbuilding");
        setActiveModal("shipbuilding");
      } else if (hash === "#service-construction" || hash === "#construction") {
        setCurrentServiceSlide("construction");
        setActiveModal("construction");
      } else if (hash === "#service-logistics" || hash === "#logistics" || hash === "#transport") {
        setCurrentServiceSlide("logistics");
        setActiveModal("logistics");
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Nav only appears after scrolling through the video intro into the website (memoized boolean flip)
  const handleIntroProgress = useCallback((progress: number) => {
    const shouldShow = progress >= 0.88;
    setIsNavVisible((prev) => (prev !== shouldShow ? shouldShow : prev));
  }, []);

  return (
    <SmoothScroll>
      <Navbar onRequestWorkforce={scrollToRequestForm} showNav={isNavVisible} />
      <main className="min-h-screen flex flex-col bg-[#070D16]">
        {/* 0. Fullscreen 120 FPS Video Scroll Sequence (Pure Cinematic Intro - Unchanged) */}
        <VideoScrollIntro onProgress={handleIntroProgress} />

        {/* 1. Main Website Experience (Curtain Slide-Over: scrolls directly above the static fixed video) */}
        <div className="relative z-30 shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-[#C59C58]/35">
          {/* Section 1: Intro Section — Cinematic Manifesto (WE MOVE WHAT MATTERS.) */}
          <IntroCinematicSection onRequestWorkforce={scrollToRequestForm} />

          {/* Section 2: Specialized Industries with Pinned Horizontal Reel */}
          <IndustriesSection
            onSelectIndustry={handleSelectIndustry}
            activeIndustryKey={currentServiceSlide}
          />

          {/* Section 2.5: Corporate About Us — Västervik, Sweden & International Talent Network */}
          <AboutSection onRequestWorkforce={scrollToRequestForm} />

          {/* Regulatory Pillars & Scandinavian Working Directives */}
          <WhyNorvianSection />

          {/* 9. Section 11: Final CTA Section (BUILD YOUR NEXT TEAM.) */}
          <WorkforceFormSection initialIndustry={prefilledIndustry} />

          {/* 10. Complete Full-Screen Service Detail Pages (MacBook-Inspired Opening/Closing Transition) */}
          <IndustryModal
            industryKey={activeModal}
            onClose={handleCloseServicePage}
            onRequestForIndustry={handleRequestForIndustry}
            onSwitchService={(newKey) => {
              setCurrentServiceSlide(newKey);
              setActiveModal(newKey);
            }}
          />

          {/* 11. High-Authority Corporate Footer */}
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
