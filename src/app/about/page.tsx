"use client";

import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function AboutContent() {
  const handleRequestWorkforce = () => {
    window.location.href = "/contact";
  };

  return (
    <SmoothScroll>
      <Navbar onRequestWorkforce={handleRequestWorkforce} showNav={true} />
      <main className="min-h-screen flex flex-col bg-[#070D16] pt-18 sm:pt-22">
        <AboutSection onRequestWorkforce={handleRequestWorkforce} />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function AboutPage() {
  return (
    <LanguageProvider>
      <AboutContent />
    </LanguageProvider>
  );
}
