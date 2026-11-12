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
  ArrowLeft,
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
  const isDe = language === "de";
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
      className="relative bg-[#080E18] text-white pt-2 sm:pt-4 pb-16 sm:pb-24 border-t border-white/5"
    >
      <div id="about-us" className="sr-only" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Back Button Navigation */}
        <div className="mb-8">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/#home";
                }
              }
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/15 hover:border-[#C59C58] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            aria-label={isSv ? "Gå tillbaka till föregående sida" : isDe ? "Zurück zur vorherigen Seite" : "Go back to previous page"}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{isSv ? "Tillbaka" : isDe ? "Zurück" : "Back"}</span>
          </button>
        </div>

        {/* Formal Institutional Header */}
        <div className="about-fade-up pb-8 mb-12 sm:mb-16 border-b border-white/15">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#C59C58] tracking-widest uppercase mb-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
              <span>{isSv ? "Officiell Företagsprofil // Norvian AB" : isDe ? "Offizielles Unternehmensprofil // Norvian AB" : "Official Corporate Statement // Norvian AB"}</span>
            </div>
            <div className="text-white/50 text-[11px] tracking-wider uppercase">
              {isSv 
                ? "Registrerat i Sverige (2024) • 5 Års Teamerfarenhet Inom Internationell Rekrytering" 
                : isDe
                ? "Registriert in Schweden (2024) • 5 Jahre Teamerfahrung in Internationaler Rekrutierung"
                : "Registered in Sweden (2024) • 5 Years of Team Experience in International Recruitment"}
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white tracking-tight">
            {isSv ? "Om Norvian AB" : isDe ? "Über Norvian AB" : "About Norvian AB"}
          </h1>
          <p className="mt-3 text-base sm:text-lg text-white/70 font-light max-w-3xl leading-relaxed">
            {isSv 
              ? "Svenskt rekryteringsföretag specialiserat på internationell rekrytering baserat i Västervik, Sverige."
              : isDe
              ? "Schwedisches Personalvermittlungsunternehmen spezialisiert auf internationale Rekrutierung mit Sitz in Västervik, Schweden."
              : "Swedish recruitment company specializing in international recruitment based in Västervik, Sweden."}
          </p>
        </div>

        {/* 2-Column Formal Layout: Left Main Statement (8 cols), Right Institutional Governance (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          
          {/* Main Statement Content (8 Columns) */}
          <div className="about-fade-up lg:col-span-8 space-y-10 sm:space-y-12">
            
            {/* Section 1: Overview & European Experience */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>01</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Företagsöversikt & Europeisk Erfarenhet" : isDe ? "Unternehmensüberblick & Europäische Erfahrung" : "Company Overview & European Experience"}</span>
              </div>
              <div className="space-y-3.5 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    <p>
                      NORVIAN AB är ett svenskt rekryteringsföretag baserat i Västervik, Sverige, specialiserat på internationell rekrytering.
                    </p>
                    <p>
                      Även om NORVIAN AB registrerades i Sverige 2024, tillför vårt team cirka fem års erfarenhet inom internationell rekrytering samt samarbete med företag och rekryteringspartners över hela Europa.
                    </p>
                    <p>
                      Innan vi etablerade verksamheten under NORVIAN AB förvärvade vi värdefull branscherfarenhet genom tidigare affärsverksamhet under en annan bolagsstruktur.
                    </p>
                    <p>
                      I dag bygger vi vidare på denna erfarenhet för att koppla samman europeiska arbetsgivare med kvalificerade och pålitliga yrkespersoner inom olika branscher.
                    </p>
                  </>
                ) : isDe ? (
                  <>
                    <p>
                      NORVIAN AB ist ein schwedisches Personalvermittlungsunternehmen mit Sitz in Västervik, Schweden, spezialisiert auf die internationale Rekrutierung.
                    </p>
                    <p>
                      Obwohl NORVIAN AB im Jahr 2024 in Schweden registriert wurde, bringt unser Team rund fünf Jahre Erfahrung in der internationalen Personalvermittlung sowie in der Zusammenarbeit mit Unternehmen und Partnern in ganz Europa mit.
                    </p>
                    <p>
                      Vor dem Aufbau unserer Aktivitäten unter NORVIAN AB haben wir wertvolle Branchenerfahrung durch unsere früheren Geschäftsaktivitäten unter einer anderen Unternehmensstruktur gesammelt.
                    </p>
                    <p>
                      Heute bauen wir auf diese Erfahrung auf, um europäische Arbeitgeber mit qualifizierten und zuverlässigen Fachkräften in verschiedenen Branchen zu verbinden.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      NORVIAN AB is a Swedish recruitment company based in Västervik, Sweden, specializing in international recruitment.
                    </p>
                    <p>
                      Although NORVIAN AB was registered in Sweden in 2024, our team brings around five years of experience in international recruitment and working with companies and recruitment partners across Europe.
                    </p>
                    <p>
                      Before establishing our operations under NORVIAN AB, we gained valuable industry experience through our previous business activities under a different company structure.
                    </p>
                    <p>
                      Today, we build on this experience to connect European employers with qualified and reliable professionals across various industries.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Section 2: European Market Knowledge & Regulatory Understanding */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>02</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Europeisk Marknadskunskap & Regulatorisk Förståelse" : isDe ? "Europäische Marktkenntnis & Regulatorisches Verständnis" : "European Market Knowledge & Regulatory Understanding"}</span>
              </div>
              <div className="space-y-3.5 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    <p>
                      En av våra främsta styrkor är vår förståelse för den europeiska arbetsmarknaden och de specifika rekryteringsbehoven hos europeiska företag.
                    </p>
                    <p>
                      Vårt team har praktisk erfarenhet av internationell rekrytering, personalsamordning och samarbete med arbetsgivare och rekryteringspartners över hela Europa.
                    </p>
                    <p>
                      Vi förstår vikten av anställningsregler, dokumentationskrav och rekryteringsförfaranden i olika europeiska länder.
                    </p>
                    <p>
                      Denna kunskap gör det möjligt för oss att kommunicera effektivt med arbetsgivare och relevanta institutioner samt stödja en strukturerad och transparent rekryteringsprocess.
                    </p>
                  </>
                ) : isDe ? (
                  <>
                    <p>
                      Eine unserer Hauptstärken ist unser Verständnis des europäischen Arbeitsmarktes und der spezifischen Rekrutierungsbedürfnisse europäischer Unternehmen.
                    </p>
                    <p>
                      Unser Team verfügt über praktische Erfahrung in der internationalen Personalvermittlung, der Personalkoordination und der Zusammenarbeit mit Arbeitgebern und Rekrutierungspartnern in ganz Europa.
                    </p>
                    <p>
                      Wir verstehen die Bedeutung von Arbeitsvorschriften, Dokumentationsanforderungen und Einstellungsverfahren in verschiedenen europäischen Ländern.
                    </p>
                    <p>
                      Dieses Wissen ermöglicht es uns, effektiv mit Arbeitgebern und relevanten Institutionen zu kommunizieren und einen strukturierten und transparenten Rekrutierungsprozess zu unterstützen.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      One of our key strengths is our understanding of the European labour market and the specific recruitment needs of European companies.
                    </p>
                    <p>
                      Our team has practical experience in international recruitment, workforce coordination, and working with employers and recruitment partners across Europe.
                    </p>
                    <p>
                      We understand the importance of employment regulations, documentation requirements, and recruitment procedures in different European countries.
                    </p>
                    <p>
                      This knowledge enables us to communicate effectively with employers and relevant institutions and to support a structured and transparent recruitment process.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Section 3: Careful Selection & Document Verification */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>03</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Noggrant Urval & Dokumentverifiering" : isDe ? "Sorgfältige Auswahl & Dokumentenprüfung" : "Careful Selection & Document Verification"}</span>
              </div>
              <div className="space-y-3.5 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    <p>
                      På NORVIAN AB fokuserar vi på att rekrytera skickliga, kvalificerade och erfarna yrkespersoner som uppfyller de specifika kraven från våra europeiska kunder.
                    </p>
                    <p>
                      Vi lägger stor vikt vid en noggrann och transparent urvalsprocess. Detta inkluderar granskning av yrkeskvalifikationer, relevant arbetslivserfarenhet och styrkande dokument.
                    </p>
                    <p>
                      Där det krävs beaktar vi även erkännande av yrkeskvalifikationer samt tillämpliga anställnings- och arbetstillståndskrav.
                    </p>
                    <p>
                      Vårt mål är att koppla samman europeiska arbetsgivare med pålitliga och lämpliga kandidater samtidigt som vi stödjer en professionell och ansvarsfull rekryteringsprocess.
                    </p>
                  </>
                ) : isDe ? (
                  <>
                    <p>
                      Bei NORVIAN AB konzentrieren wir uns auf die Rekrutierung von qualifizierten, erfahrenen Fachkräften, die den spezifischen Anforderungen unserer europäischen Kunden entsprechen.
                    </p>
                    <p>
                      Wir legen großen Wert auf einen sorgfältigen und transparenten Auswahlprozess. Dazu gehört die Prüfung von Berufsqualifikationen, relevanter Berufserfahrung und entsprechenden Nachweisen.
                    </p>
                    <p>
                      Soweit erforderlich, berücksichtigen wir auch die Anerkennung von Berufsqualifikationen sowie geltende Beschäftigungs- und Arbeitserlaubnisanforderungen.
                    </p>
                    <p>
                      Unser Ziel ist es, europäische Arbeitgeber mit zuverlässigen und passenden Kandidaten zu verbinden und dabei einen professionellen und verantwortungsvollen Rekrutierungsprozess zu gewährleisten.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      At NORVIAN AB, we focus on recruiting skilled, qualified, and experienced professionals who meet the specific requirements of our European clients.
                    </p>
                    <p>
                      We place great importance on a careful and transparent selection process. This includes reviewing professional qualifications, relevant work experience, and supporting documents.
                    </p>
                    <p>
                      Where required, we also consider the recognition of professional qualifications and applicable employment and work authorization requirements.
                    </p>
                    <p>
                      Our goal is to connect European employers with reliable and suitable candidates while supporting a professional and responsible recruitment process.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Section 4: Large-Scale Recruitment & Individual Workforce Solutions */}
            <div className="space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>04</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Storskalig Rekrytering & Individuella Bemanningslösningar" : isDe ? "Großvolumige Rekrutierung & Individuelle Personal-Lösungen" : "Large-Scale Recruitment & Individual Workforce Solutions"}</span>
              </div>
              <div className="space-y-3.5 text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv ? (
                  <>
                    <p>
                      För företag med större personalbehov erbjuder NORVIAN AB skräddarsydda rekryteringslösningar utformade för att möta specifika bransch- och bemanningsbehov.
                    </p>
                    <p>
                      Genom vårt internationella rekryteringsnätverk stödjer vi arbetsgivare i att identifiera och välja ut kvalificerade yrkespersoner, med särskilt fokus på kandidater som redan är baserade i Europa.
                    </p>
                    <p>
                      Beroende på projektets storlek och krav kan vi samordna strukturerade rekryteringsprocesser, kandidatintervjuer, kompetensbedömningar och samarbete med internationella rekryteringspartners.
                    </p>
                    <p>
                      För större rekryteringsprojekt kan ytterligare tjänster och urvalsprocesser på plats arrangeras individuellt i samråd med våra kunder.
                    </p>
                  </>
                ) : isDe ? (
                  <>
                    <p>
                      Für Unternehmen mit größerem Personalbedarf bietet NORVIAN AB maßgeschneiderte Rekrutierungslösungen, die auf spezifische Branchen- und Personalanforderungen abgestimmt sind.
                    </p>
                    <p>
                      Über unser internationales Rekrutierungsnetzwerk unterstützen wir Arbeitgeber bei der Identifizierung und Auswahl qualifizierter Fachkräfte – mit besonderem Fokus auf Kandidaten, die bereits in Europa ansässig sind.
                    </p>
                    <p>
                      Je nach Projektgröße und Anforderungen koordinieren wir strukturierte Rekrutierungsprozesse, Vorstellungsgespräche, Qualifikationsprüfungen und die Zusammenarbeit mit internationalen Rekrutierungspartnern.
                    </p>
                    <p>
                      Für größere Rekrutierungsprojekte können zusätzliche Dienstleistungen und Auswahlverfahren vor Ort individuell in Abstimmung mit unseren Kunden organisiert werden.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      For companies with larger workforce requirements, NORVIAN AB offers tailored recruitment solutions designed to meet specific industry and staffing needs.
                    </p>
                    <p>
                      Through our international recruitment network, we support employers in identifying and selecting qualified professionals, with a particular focus on candidates already based in Europe.
                    </p>
                    <p>
                      Depending on the size and requirements of the project, we can coordinate structured recruitment processes, candidate interviews, qualification assessments, and cooperation with international recruitment partners.
                    </p>
                    <p>
                      For larger recruitment projects, additional services and on-site selection processes can be arranged individually in consultation with our clients.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Section 5: Our Core Objective */}
            <div className="p-7 sm:p-8 rounded-2xl bg-[#0B1522] border border-white/15 space-y-4">
              <div className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58] flex items-center gap-2">
                <span>05</span>
                <span className="h-[1px] w-6 bg-[#C59C58]/40" />
                <span>{isSv ? "Vårt Huvudsakliga Mål" : isDe ? "Unser Zentrales Ziel" : "Our Core Objective"}</span>
              </div>
              <div className="space-y-3 text-base sm:text-lg text-white/95 font-light leading-relaxed">
                {isSv ? (
                  <>
                    <p className="font-serif text-lg sm:text-xl text-white font-normal leading-relaxed">
                      Vårt mål är att koppla samman europeiska företag med skickliga, erfarna och pålitliga yrkespersoner som möter deras specifika kompetensbehov.
                    </p>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      Vi är övertygade om att framgångsrik rekrytering bygger på förtroende, transparens och långsiktiga partnerskap. Vårt åtagande är att skapa varaktigt värde för både arbetsgivare och yrkespersoner genom ansvarsfulla och pålitliga rekryteringslösningar.
                    </p>
                  </>
                ) : isDe ? (
                  <>
                    <p className="font-serif text-lg sm:text-xl text-white font-normal leading-relaxed">
                      Unser Ziel ist es, europäische Unternehmen mit qualifizierten, erfahrenen und zuverlässigen Fachkräften zusammenzubringen, die ihren spezifischen Personalbedarf erfüllen.
                    </p>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      Wir sind überzeugt, dass erfolgreiche Rekrutierung auf Vertrauen, Transparenz und langfristigen Partnerschaften basiert. Unser Anspruch ist es, durch verantwortungsvolle und verlässliche Personallösungen nachhaltigen Mehrwert für Arbeitgeber und Fachkräfte zu schaffen.
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-serif text-lg sm:text-xl text-white font-normal leading-relaxed">
                      Our goal is to connect European companies with skilled, experienced, and reliable professionals who meet their specific workforce needs.
                    </p>
                    <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                      We believe that successful recruitment is built on trust, transparency, and long-term partnerships. Our commitment is to create lasting value for both employers and professionals through responsible and reliable recruitment solutions.
                    </p>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Formal Corporate Facts & Governance (4 Columns) */}
          <div className="about-fade-up lg:col-span-4 space-y-6">
            
            {/* Corporate Factsheet Card */}
            <div className="bg-[#0B1522] border border-white/15 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58]">
                  {isSv ? "Bolagsfakta" : isDe ? "Unternehmensdaten" : "Corporate Profile"}
                </span>
                <Building2 className="w-4 h-4 text-[#C59C58]" />
              </div>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Juridiskt Namn" : isDe ? "Rechtsträger" : "Legal Entity"}
                  </span>
                  <span className="text-sm text-white font-serif mt-0.5 block">NORVIAN AB</span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Registrering" : isDe ? "Registrierung" : "Registration"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block">
                    {isSv
                      ? "Registrerat i Sverige (2024)"
                      : isDe
                      ? "Registriert in Schweden (2024)"
                      : "Registered in Sweden (2024)"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Branscherfarenhet" : isDe ? "Branchenerfahrung" : "Industry Experience"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block leading-relaxed">
                    {isSv
                      ? "Cirka 5 års teamerfarenhet inom internationell rekrytering"
                      : isDe
                      ? "Rund 5 Jahre Teamerfahrung in der internationalen Rekrutierung"
                      : "Around 5 Years of Team Experience in International Recruitment"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Specialisering" : isDe ? "Spezialisierung" : "Specialization"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block leading-relaxed">
                    {isSv
                      ? "Internationell rekrytering & skickliga bemanningslösningar över hela Europa"
                      : isDe
                      ? "Internationale Rekrutierung & qualifizierte Personallösungen in ganz Europa"
                      : "International Recruitment & Skilled Workforce Solutions Across Europe"}
                  </span>
                </div>

                <div>
                  <span className="text-white/40 block uppercase text-[10px] tracking-wider">
                    {isSv ? "Huvudkontor" : isDe ? "Hauptsitz" : "Headquarters"}
                  </span>
                  <span className="text-xs text-white/90 mt-0.5 block leading-relaxed">
                    Baumansgatan 4, 593 32 Västervik, {isSv ? "Sverige" : isDe ? "Schweden" : "Sweden"}
                  </span>
                </div>
              </div>
            </div>

            {/* Direct Leadership Card */}
            <div className="bg-[#0B1522] border border-white/15 rounded-2xl p-6 sm:p-7 space-y-4">
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono tracking-widest uppercase text-[#C59C58]">
                  {isSv ? "Ledning & Partners" : isDe ? "Führung & Partner" : "Leadership & Partners"}
                </span>
                <Users className="w-4 h-4 text-[#C59C58]" />
              </div>

              <div className="space-y-3.5 divide-y divide-white/5">
                <div className="pb-3">
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

                <div className="py-3">
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

                <div className="py-3">
                  <h3 className="font-serif text-sm text-white font-medium">
                    Alina Aleksandriuk
                  </h3>
                  <p className="text-[#C59C58] text-[11px] font-semibold mt-0.5">
                    {isSv ? "Filialchef & Administratör" : "Branch Manager & Administrator"}
                  </p>
                  <p className="text-white/60 text-[10.5px] mt-0.5 font-light">
                    {isSv ? "Kontorsdrift & Administration" : "Branch Operations & Administration"}
                  </p>
                </div>

                <div className="py-3">
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

                <div className="pt-3">
                  <h3 className="font-serif text-sm text-white font-medium">
                    Baiju Babu
                  </h3>
                  <p className="text-[#C59C58] text-[11px] font-semibold mt-0.5">
                    {isSv ? "Extern Affärspartner – Storbritannien" : "External Business Partner – UK"}
                  </p>
                  <p className="text-white/60 text-[10.5px] mt-0.5 font-light">
                    {isSv ? "UK & Internationell Utveckling" : "UK & International Business Development"}
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
                <a href="mailto:office@norvian.se" className="hover:text-[#C59C58] transition-colors font-mono">
                  office@norvian.se
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
