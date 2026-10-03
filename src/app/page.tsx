"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import VideoScrollIntro from "@/components/VideoScrollIntro";
import HeroSection from "@/components/HeroSection";
import LiveDeploymentsTicker from "@/components/LiveDeploymentsTicker";
import IndustriesSection from "@/components/IndustriesSection";
import GlobalNetworkSection from "@/components/GlobalNetworkSection";
import WhyNorvianSection from "@/components/WhyNorvianSection";
import WorkforceFormSection from "@/components/WorkforceFormSection";
import IndustryModal from "@/components/IndustryModal";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/context/LanguageContext";

function MainContent() {
  const [introProgress, setIntroProgress] = useState(0);
  const [activeModal, setActiveModal] = useState<"shipbuilding" | "construction" | "logistics" | null>(null);
  const [prefilledIndustry, setPrefilledIndustry] = useState<string>("");

  const scrollToRequestForm = () => {
    const el = document.getElementById("request-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRequestForIndustry = (industryName: string) => {
    setPrefilledIndustry(industryName);
    scrollToRequestForm();
  };

  // Nav only appears after scrolling through the video intro into the website
  const isNavVisible = introProgress >= 0.90;

  return (
    <main className="min-h-screen flex flex-col bg-[#FAF7F2]">
      {/* 0. Fullscreen 120 FPS Video Scroll Sequence (Pure Cinematic Intro) */}
      <VideoScrollIntro onProgress={setIntroProgress} />

      {/* 1. High-Prestige Floating Navigation (only revealed after scrolling) */}
      <Navbar onRequestWorkforce={scrollToRequestForm} showNav={isNavVisible} />

      {/* 2. Main Website Experience (Hero, Ticker, Disciplines, Global Network, Form, Footer) */}
      <div className="relative z-10 shadow-[0_-24px_60px_rgba(7,13,22,0.6)]">
        <HeroSection onRequestWorkforce={scrollToRequestForm} />

        {/* 3. Live Verified Deployments Ticker across Europe */}
        <LiveDeploymentsTicker />

        {/* 4. Specialized Industries with ISO & Code 95 Badges */}
        <IndustriesSection
          onSelectIndustry={(key) => setActiveModal(key)}
        />

        {/* 5. Global Corridor: Interactive Map, Flight Arcs, 4-Phase Timeline & Live Stats */}
        <GlobalNetworkSection />

        {/* 6. Why Norvian: Compliance Pillars & Scandinavian Working Directives */}
        <WhyNorvianSection />

        {/* 7. Executive Workforce Deployment Request Portal */}
        <WorkforceFormSection initialIndustry={prefilledIndustry} />

        {/* 8. Detailed Industry Disciplines Modal */}
        <IndustryModal
          industryKey={activeModal}
          onClose={() => setActiveModal(null)}
          onRequestForIndustry={handleRequestForIndustry}
        />

        {/* 9. High-Authority Corporate Footer */}
        <Footer />
      </div>
    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
