"use client";

import Navbar from "@/components/Navbar";
import WorkforceFormSection from "@/components/WorkforceFormSection";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider } from "@/context/LanguageContext";

function ContactContent() {
  const scrollToRequestForm = () => {
    const el = document.getElementById("contact") || document.getElementById("request-form");
    if (el) {
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.scrollTo(el, { duration: 1.2, offset: -20 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <SmoothScroll>
      <Navbar onRequestWorkforce={scrollToRequestForm} showNav={true} />
      <main className="min-h-screen flex flex-col bg-[#070D16] pt-16 sm:pt-20">
        <WorkforceFormSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function ContactPage() {
  return (
    <LanguageProvider>
      <ContactContent />
    </LanguageProvider>
  );
}
