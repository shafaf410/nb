"use client";

import { useState, useCallback } from "react";
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
  const [activeModal, setActiveModal] = useState<"shipbuilding" | "construction" | "logistics" | null>(null);
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

  const handleRequestForIndustry = (industryName: string) => {
    setPrefilledIndustry(industryName);
    scrollToRequestForm();
  };

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
        <div
          className="relative z-30 bg-[#FAF7F2] shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-[#C59C58]/35"
          style={{ transform: "translate3d(0,0,0)" }}
        >
          {/* Section 1: Intro Section — Cinematic Manifesto (WE MOVE WHAT MATTERS.) */}
          <IntroCinematicSection onRequestWorkforce={scrollToRequestForm} />

          {/* Section 2: Specialized Industries with Pinned Horizontal Reel */}
          <IndustriesSection
            onSelectIndustry={(key) => setActiveModal(key)}
          />

          {/* Regulatory Pillars & Scandinavian Working Directives */}
          <WhyNorvianSection />

          {/* 9. Section 11: Final CTA Section (BUILD YOUR NEXT TEAM.) */}
          <WorkforceFormSection initialIndustry={prefilledIndustry} />

          {/* 10. Detailed Industry Disciplines Modal */}
          <IndustryModal
            industryKey={activeModal}
            onClose={() => setActiveModal(null)}
            onRequestForIndustry={handleRequestForIndustry}
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
