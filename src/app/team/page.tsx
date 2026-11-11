"use client";

import Navbar from "@/components/Navbar";
import TeamSection from "@/components/TeamSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function TeamContent() {
  const handleRequestWorkforce = () => {
    window.location.href = "/request";
  };

  return (
    <SmoothScroll>
      <Navbar onRequestWorkforce={handleRequestWorkforce} showNav={true} />
      <main className="min-h-screen flex flex-col bg-[#070D16] pt-16 sm:pt-20">
        <TeamSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function TeamPage() {
  return (
    <LanguageProvider>
      <TeamContent />
    </LanguageProvider>
  );
}

