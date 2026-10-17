"use client";

import { useState, useCallback, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoScrollIntro from "@/components/VideoScrollIntro";
import IntroCinematicSection from "@/components/IntroCinematicSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyNorvianSection from "@/components/WhyNorvianSection";
import WorkforceFormSection from "@/components/WorkforceFormSection";
import IndustryModal from "@/components/IndustryModal";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function MainContent() {
  const [activeModal, setActiveModal] = useState<"shipbuilding" | "construction" | "logistics" | "industrial" | null>(null);
  const [currentServiceSlide, setCurrentServiceSlide] = useState<"shipbuilding" | "construction" | "logistics" | "industrial">("shipbuilding");
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>("");
  const [isNavVisible, setIsNavVisible] = useState(true);

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

  const handleSelectIndustry = (key: "shipbuilding" | "construction" | "logistics" | "industrial") => {
    setCurrentServiceSlide(key);
    setActiveModal(key);
    if (typeof window !== "undefined") {
      window.history.pushState({ modal: key }, "", `#service-${key}`);
    }
  };

  const handleCloseServicePage = () => {
    setActiveModal(null);
    if (typeof window !== "undefined") {
      if (window.location.hash.startsWith("#service-")) {
        if (window.history.state && window.history.state.modal) {
          window.history.back();
        } else {
          window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
      }
    }
  };

  const handleRequestForIndustry = (industryName: string) => {
    setActiveModal(null);
    setPrefilledIndustry(industryName);
    scrollToRequestForm();
  };

  // URL Hash & Browser History Synchronization:
  // Intercepts browser Back button so user returns to the main page without exiting the website!
  useEffect(() => {
    const syncModalWithHash = () => {
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
      } else if (hash === "#service-industrial" || hash === "#industrial" || hash === "#manufacturing") {
        setCurrentServiceSlide("industrial");
        setActiveModal("industrial");
      } else {
        // When hash no longer contains a service (e.g. user pressed browser Back button), close modal!
        setActiveModal(null);
      }
    };

    syncModalWithHash();
    window.addEventListener("hashchange", syncModalWithHash);
    window.addEventListener("popstate", syncModalWithHash);
    return () => {
      window.removeEventListener("hashchange", syncModalWithHash);
      window.removeEventListener("popstate", syncModalWithHash);
    };
  }, []);

  // Keep Nav visible throughout intro and main content
  const handleIntroProgress = useCallback((_progress: number) => {
    setIsNavVisible(true);
  }, []);

  const handleGoHome = useCallback(() => {
    setActiveModal(null);
    if (typeof window !== "undefined") {
      if (window.location.hash !== "#home") {
        window.history.pushState(null, "", "/#home");
      }
      window.dispatchEvent(new CustomEvent("norvian:go-to-home"));
      const homeEl = document.getElementById("home") || document.getElementById("intro-manifesto");
      const targetY = homeEl ? homeEl.offsetTop : window.innerHeight;
      if ((window as any).lenis) {
        (window as any).lenis.start();
        (window as any).lenis.scrollTo(targetY, { duration: 1.1 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  }, []);

  return (
    <SmoothScroll>
      <Navbar
        onRequestWorkforce={scrollToRequestForm}
        onGoHome={handleGoHome}
        showNav={isNavVisible}
      />
      <main className="min-h-screen flex flex-col bg-[#070D16]">
        {/* 0. Fullscreen 120 FPS Video Scroll Sequence (Pure Cinematic Intro - Unchanged) */}
        <VideoScrollIntro onProgress={handleIntroProgress} />

        {/* 1. Main Website Experience (Curtain Slide-Over: scrolls directly above the static fixed video) */}
        <div id="home" className="relative z-30 shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-[#C59C58]/35">
          {/* Section 1: Intro Section — Your Industry. Our People. One Goal. */}
          <IntroCinematicSection onRequestWorkforce={scrollToRequestForm} />

          {/* Section 2: Specialized Industries with Pinned Horizontal Reel */}
          <IndustriesSection
            onSelectIndustry={handleSelectIndustry}
            activeIndustryKey={currentServiceSlide}
          />

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
              if (typeof window !== "undefined") {
                window.history.pushState({ modal: newKey }, "", `#service-${newKey}`);
              }
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
