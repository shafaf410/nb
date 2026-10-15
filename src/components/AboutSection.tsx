"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Building2, 
  ShieldCheck, 
  FileCheck, 
  Users, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle2, 
  ArrowRight,
  Plane,
  Scale
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AboutSectionProps {
  onRequestWorkforce?: () => void;
}

export default function AboutSection({ onRequestWorkforce }: AboutSectionProps) {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const revealItems = container.querySelectorAll(".about-fade-up");
      if (revealItems.length > 0) {
        gsap.from(revealItems, {
          y: 20,
          opacity: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#080E18] text-white py-16 sm:py-24 lg:py-28 border-t border-white/10"
    >
      <div id="about-us" className="sr-only" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Formal Institutional Header */}
        <div className="about-fade-up pb-8 mb-12 sm:mb-16 border-b border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#C59C58] tracking-widest uppercase mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
              <span>{isSv ? "Officiell Företagsprofil // Norvian AB" : "Official Corporate Statement // Norvian AB"}</span>
            </div>
            <div className="text-white/50 text-[11px]">
              {isSv ? "Org. Reg. Sverige (2024) • 10+ Års Fälterfarenhet" : "Registered in Sweden (2024) • 10+ Years Operational Experience"}
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            {isSv ? "Om Norvian AB" : "About Norvian AB"}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/70 font-light max-w-3xl leading-relaxed">
            {isSv 
              ? "Svensk personalförsörjning och internationell industriell rekrytering med säte i Västervik, Sverige."
              : "Swedish manpower supply and international industrial recruitment based in Västervik, Sweden."}
          </p>
        </div>

        {/* 2-Column Formal Layout: Left Main Statement (8 cols), Right Institutional Governance (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Main Statement Content (8 Columns) */}
          <div className="about-fade-up lg:col-span-8 space-y-10 sm:space-y-12">
            
            {/* Section 1: Overview & Track Record */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>01</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Företagsbakgrund & Europeisk Erfarenhet" : "Company Overview & European Track Record"}</span>
              </div>
              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    Norvian AB är ett svenskt bemannings- och rekryteringsföretag baserat i Västervik, Sverige. Vårt företag registrerades i Sverige 2024, men vårt team har mer än 10 års erfarenhet inom personalförsörjning, arbetskraftshantering och industriell rekrytering. Genom åren har vi framgångsrikt placerat fler än 1 000 arbetare inom olika industrier över hela Europa.
                  </>
                ) : (
                  <>
                    Norvian AB is a Swedish manpower supply and recruitment company based in Västervik, Sweden. Our company was registered in Sweden in 2024, but our team has more than 10 years of experience in manpower supply, workforce management, and industrial recruitment. Over the years, we have successfully placed more than 1,000 workers in different industries across Europe.
                  </>
                )}
              </p>
            </div>

            {/* Section 2: Experienced European Team */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>02</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Europeiskt Team & Regulatorisk Förankring" : "European Team & Regulatory Understanding"}</span>
              </div>
              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    En av våra främsta styrkor är vårt erfarna europeiska team. Våra företagsägare, administrativa personal och personalsamordnare är europeiska medborgare som förstår europeiska industrier, anställningsregler och rekryteringsförfaranden. Detta hjälper oss att kommunicera och arbeta i nära samarbete med europeiska arbetsgivare och relevanta institutioner.
                  </>
                ) : (
                  <>
                    One of our main strengths is our experienced European team. Our company owners, administration staff, and worker coordinators are European citizens who understand European industries, employment regulations, and recruitment procedures. This helps us communicate and work closely with European employers and relevant institutions.
                  </>
                )}
              </p>
            </div>

            {/* Section 3: Strict Selection, Verification & Non-Migration Policy */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>03</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Urvalsprocess, Verifiering & Non-Migrationspolicy" : "Strict Selection, Document Verification & Non-Migration Policy"}</span>
              </div>
              
              <div className="space-y-4 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                <p>
                  {isSv ? (
                    <>
                      Vi är mycket noggranna vid urvalet av internationell arbetskraft. Vårt företag fokuserar på att rekrytera skickliga, kvalificerade och erfarna arbetare med fläckfri bakgrund. Vi stöder uttryckligen inte migration eller bosättning i Europa. Norvian AB rekryterar utländska arbetstagare uteslutande för genuina anställningsmöjligheter, inte för migrationsändamål.
                    </>
                  ) : (
                    <>
                      We are very careful when selecting international workers. Our company focuses on recruiting skilled, qualified, and experienced workers with clean backgrounds. We strictly do not support migration or settlement in Europe. Norvian AB recruits foreign workers only for genuine employment opportunities, not for immigration purposes.
                    </>
                  )}
                </p>

                <p>
                  {isSv ? (
                    <>
                      Samtliga internationella arbetare måste tillhandahålla sina utbildnings- och yrkesbevis, europeiskt erkännande av kvalifikationer där så krävs, samt utdrag ur belastningsregistret från sina hemländer med nödvändig officiell legalisering och intygande.
                    </>
                  ) : (
                    <>
                      All international workers must provide their educational and professional certificates, European qualification recognition where required, and police clearance certificates from their home countries with the necessary official attestation.
                    </>
                  )}
                </p>

                <p>
                  {isSv ? (
                    <>
                      Vi förlitar oss inte enbart på handlingar som lämnats in av kandidaterna. Vi samarbetar även med privata verifieringsorgan i kandidaternas hemländer för att granska deras certifikat, anställningshistorik och andra relevanta dokument innan rekryteringsprocessen fortskrider.
                    </>
                  ) : (
                    <>
                      We do not rely only on the documents submitted by candidates. We also work with private verification agencies in their home countries to check their certificates, employment history, and other relevant documents before proceeding with recruitment.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Section 4: Direct Recruitment Visits for Large Volumes (100+ Workers) */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>04</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Direkta Rekryteringsbesök (100+ Arbetare)" : "Direct Recruitment Delegations (100+ Workers)"}</span>
              </div>

              <div className="space-y-4 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                <p>
                  {isSv ? (
                    <>
                      För företag med behov av fler än 100 arbetare kan vi arrangera direkta rekryteringsresor till länder såsom Filippinerna, Indien och länder i Sydamerika. Vårt team reser till dessa länder för att genomföra personliga intervjuer, praktiska arbetsdemonstrationer och yrkesprov innan det slutgiltiga urvalet fastställs.
                    </>
                  ) : (
                    <>
                      For companies requiring more than 100 workers, we can arrange direct recruitment visits to countries such as the Philippines, India, and countries in South America. Our team travels to these countries to conduct face-to-face interviews, practical work demonstrations, and skills examinations before making the final selection.
                    </>
                  )}
                </p>

                <p>
                  {isSv ? (
                    <>
                      Vi välkomnar även en eller två representanter från det europeiska kundföretaget att delta i intervju- och urvalsprocessen. Norvian AB står för boende och lokala transporter för dessa representanter på vårt företags bekostnad under rekryteringsbesöket.
                    </>
                  ) : (
                    <>
                      We also welcome one or two representatives from the European client company to take part in the interview and selection process. Norvian AB provides accommodation and local transportation for these representatives at our company’s expense during the recruitment visit.
                    </>
                  )}
                </p>
              </div>
            </div>

            {/* Section 5: Our Core Objective */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0B1522] border border-white/15 space-y-3">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>05</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Vårt Huvudsakliga Mål" : "Our Core Objective"}</span>
              </div>
              <p className="font-serif text-lg sm:text-xl text-white font-normal leading-relaxed">
                {isSv ? (
                  <>
                    ”Vårt huvudsakliga mål är att förse europeisk industri med genuin, yrkeskunnig och pålitlig arbetskraft. Vi vill att våra kunder ska känna sig helt trygga med att den arbetskraft vi tillhandahåller är vederbörligen kvalificerad, noggrant utvald och redo för arbete.”
                  </>
                ) : (
                  <>
                    “Our main goal is to provide European industries with genuine, skilled, and reliable workers. We want our clients to feel confident that the workers we supply are properly qualified, carefully selected, and ready to work.”
                  </>
                )}
              </p>
            </div>

          </div>

          {/* Right Sidebar: Formal Corporate Facts & Governance (4 Columns) */}
          <div className="about-fade-up lg:col-span-4 space-y-6">
            
            {/* Corporate Factsheet Card */}
            <div className="bg-[#0B1522] border border-white/15 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58]">
                  {isSv ? "Bolagsfakta" : "Corporate Profile"}
                </span>
                <Building2 className="w-4 h-4 text-[#C59C58]" />
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Juridiskt Namn" : "Legal Entity"}
                  </span>
                  <span className="text-sm text-white font-serif mt-0.5 block">Norvian AB</span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Registrering" : "Registration"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block">
                    {isSv ? "Registrerat i Sverige (2024)" : "Registered in Sweden (2024)"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Erfarenhet" : "Industry Experience"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block">
                    {isSv ? "10+ års branscherfarenhet" : "10+ Years Operational Experience"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Genomförda Placeringar" : "Workers Placed"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block">
                    {isSv ? "1 000+ arbetare över hela Europa" : "1,000+ Placed Across Europe"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Huvudkontor" : "Headquarters"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block leading-relaxed">
                    Baumansgatan 4, 593 32 Västervik, {isSv ? "Sverige" : "Sweden"}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Leadership Card */}
            <div className="bg-[#0B1522] border border-white/15 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58]">
                  {isSv ? "Ledning & Partners" : "Leadership & Partners"}
                </span>
                <Users className="w-4 h-4 text-[#C59C58]" />
              </div>

              <div className="space-y-3.5">
                <div className="pb-3 border-b border-white/5">
                  <h3 className="font-serif text-sm text-white font-medium">
                    Bianka Bittlingmeier
                  </h3>
                  <p className="text-[#C59C58] text-[11px] font-semibold mt-0.5">
                    {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                  </p>
                  <p className="text-white/60 text-[10.5px] mt-0.5 font-light">
                    {isSv ? "Rekrytering & Affärspartnerskap" : "Recruitment & Business Partnerships"}
                  </p>
                </div>

                <div className="pb-3 border-b border-white/5">
                  <h3 className="font-serif text-sm text-white font-medium">
                    Vinu Mohan
                  </h3>
                  <p className="text-[#C59C58] text-[11px] font-semibold mt-0.5">
                    {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                  </p>
                  <p className="text-white/60 text-[10.5px] mt-0.5 font-light">
                    {isSv ? "Internationell Drift & Rekrytering" : "International Operations & Recruitment"}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-sm text-white font-medium">
                    Isabelle Beyer
                  </h3>
                  <p className="text-[#C59C58] text-[11px] font-semibold mt-0.5">
                    {isSv ? "Extern Affärspartner – Tyskland" : "External Business Partner – Germany"}
                  </p>
                  <p className="text-white/60 text-[10.5px] mt-0.5 font-light">
                    {isSv ? "Tysk Marknadskoordinering" : "German Market Coordination"}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Official Contact Box */}
            <div className="bg-[#0B1522] border border-white/15 rounded-2xl p-6 space-y-3 text-xs text-white/80">
              <span className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] block mb-2">
                {isSv ? "Officiell Kontakt" : "Official Contact"}
              </span>

              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                <a href="mailto:contact@norvian.no" className="hover:text-[#C59C58] transition-colors font-mono">
                  contact@norvian.no
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                <a href="tel:+4722009000" className="hover:text-[#C59C58] transition-colors font-mono">
                  +47 22 00 90 00
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#C59C58] hover:bg-[#D4AF37] text-[#080E18] py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer"
                >
                  <span>{isSv ? "Kontakta Ledningen" : "Contact Leadership"}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
