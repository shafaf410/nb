"use client";

import Navbar from "@/components/Navbar";
import ImpressumSection from "@/components/ImpressumSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function ImpressumContent() {
  const handleRequestWorkforce = () => {
    window.location.href = "/contact";
  };

  return (
    <SmoothScroll>
      <Navbar onRequestWorkforce={handleRequestWorkforce} showNav={true} />
      <main className="min-h-screen flex flex-col bg-[#070D16] pt-16 sm:pt-20">
        <ImpressumSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function ImpressumPage() {
  return (
    <LanguageProvider>
      <ImpressumContent />
    </LanguageProvider>
  );
}
