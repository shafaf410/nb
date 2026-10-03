"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface WorkforceFormProps {
  initialIndustry?: string;
}

export default function WorkforceFormSection({ initialIndustry = "" }: WorkforceFormProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    industry: initialIndustry || "",
    numberOfWorkers: "",
    requiredSkills: "",
    location: "",
    startDate: "",
    additionalRequirements: "",
  });

  useEffect(() => {
    if (initialIndustry) {
      setFormData(prev => ({ ...prev, industry: initialIndustry }));
    }
  }, [initialIndustry]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  const quickCrewSizes = ["1-5", "5-15", "15-30", "30+"];

  return (
    <section
      id="request-form"
      ref={containerRef}
      className="py-16 sm:py-24 lg:py-36 bg-[#FAF7F2] relative overflow-hidden border-t border-[#0B1522]/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C59C58]">
              {t.form.tag}
            </span>
            <span className="h-[1px] w-10 sm:w-12 bg-[#C59C58]/60" />
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal text-[#0B1522] tracking-[-0.025em] leading-[1.1] sm:leading-[1.08]">
            {t.form.titleMain} <br />
            <span className="text-[#C59C58] italic font-serif">{t.form.titleAccent}</span>
          </h2>

          <p className="text-sm sm:text-base text-[#0B1522]/75 font-light leading-relaxed pt-1 sm:pt-2 max-w-xl">
            {t.form.desc}
          </p>
        </div>

        {/* Cinematic Overlapping Composition: Worker Image & Form Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Larger Cinematic Worker Image with Parallax */}
          <div className="lg:col-span-5 relative z-10">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#0B1522]/15 shadow-[0_20px_50px_-15px_rgba(11,21,34,0.18)] sm:shadow-[0_30px_70px_-20px_rgba(11,21,34,0.22)] aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5.2]">
              <motion.div style={{ y: imageY }} className="relative w-full h-[115%] -top-[7%]">
                <Image
                  src="/images/worker.jpg"
                  alt="NORVIAN Professional Worker overlooking infrastructure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/85 via-[#0B1522]/25 to-transparent" />
              </motion.div>

              {/* Floating Overlay Badge on worker photo */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 bg-[#0B1522]/90 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 text-white space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-[0.25em] text-[#C59C58] block">
                      {t.form.workerBadgeTitle}
                    </span>
                    <h4 className="font-serif text-base sm:text-lg font-normal text-white leading-snug">
                      {t.form.workerBadgeSub}
                    </h4>
                  </div>
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-[#C59C58]">
                    <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </div>
                <p className="text-[11px] sm:text-xs text-white/70 font-light leading-relaxed">
                  {t.form.workerBadgeDesc}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Form Card */}
          <div className="lg:col-span-7 relative z-20">
            <div className="bg-white/85 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-12 border border-[#C59C58]/30 shadow-[0_20px_50px_-15px_rgba(11,21,34,0.1)] sm:shadow-[0_30px_70px_-20px_rgba(11,21,34,0.12)]">
              
              {submitted ? (
                <div className="py-12 text-center space-y-6 animate-fadeIn">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 mx-auto flex items-center justify-center border border-emerald-500/30 shadow-sm">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif text-3xl font-normal text-[#0B1522]">
                      {t.form.submittedTitle}
                    </h3>
                    <p className="text-sm text-[#0B1522]/70 max-w-md mx-auto font-light leading-relaxed">
                      {t.form.submittedDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="inline-flex items-center justify-center bg-[#0B1522] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#162538] transition-all cursor-pointer shadow-md"
                  >
                    {t.form.submitAnother}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Industry & Fast Crew Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Industry */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                        {t.form.labelIndustry} <span className="text-[#C59C58]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.industry}
                          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                          className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all appearance-none cursor-pointer shadow-xs min-h-[48px]"
                        >
                          <option value="">{t.form.selectIndustryPlaceholder}</option>
                          <option value="Shipbuilding">{t.form.optShipbuilding}</option>
                          <option value="Construction">{t.form.optConstruction}</option>
                          <option value="Transport & Logistics">{t.form.optTransport}</option>
                          <option value="Manufacturing">{t.form.optManufacturing}</option>
                          <option value="Other">{t.form.optOther}</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#0B1522]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Number of Workers with Quick Chips */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <div className="flex items-center justify-between flex-wrap gap-1.5">
                        <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                          {t.form.labelCrewSize} <span className="text-[#C59C58]">*</span>
                        </label>
                        <div className="flex items-center gap-1 flex-wrap">
                          {quickCrewSizes.map((chip) => (
                            <button
                              type="button"
                              key={chip}
                              onClick={() => setFormData({ ...formData, numberOfWorkers: chip })}
                              className={`text-[10px] px-2 py-0.5 rounded font-mono font-medium transition-colors cursor-pointer ${
                                formData.numberOfWorkers === chip
                                  ? "bg-[#C59C58] text-white"
                                  : "bg-[#0B1522]/5 text-[#0B1522]/70 hover:bg-[#0B1522]/10"
                              }`}
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder={t.form.placeholderWorkers}
                        required
                        value={formData.numberOfWorkers}
                        onChange={(e) => setFormData({ ...formData, numberOfWorkers: e.target.value })}
                        className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all shadow-xs min-h-[48px]"
                      />
                    </div>
                  </div>

                  {/* Required Skills */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                      {t.form.labelSkills} <span className="text-[#C59C58]">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder={t.form.placeholderSkills}
                      required
                      value={formData.requiredSkills}
                      onChange={(e) => setFormData({ ...formData, requiredSkills: e.target.value })}
                      className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all shadow-xs min-h-[48px]"
                    />
                  </div>

                  {/* Row 2: Location & Start Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Location */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                        {t.form.labelLocation} <span className="text-[#C59C58]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all appearance-none cursor-pointer shadow-xs min-h-[48px]"
                        >
                          <option value="">{t.form.selectCountryPlaceholder}</option>
                          <option value="Norway">Norge (Oslo, Bergen, Stavanger)</option>
                          <option value="Sweden">Sverige (Stockholm, Göteborg)</option>
                          <option value="Denmark">Danmark (Köpenhamn, Århus)</option>
                          <option value="Finland">Finland (Helsingfors, Åbo)</option>
                          <option value="Germany">Tyskland (Hamburg, Bremen)</option>
                          <option value="Netherlands">Nederländerna (Rotterdam)</option>
                          <option value="Other European Nation">Övriga Europa</option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-[#0B1522]/50 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    {/* Start Date */}
                    <div className="space-y-1.5 sm:space-y-2">
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                        {t.form.labelDate} <span className="text-[#C59C58]">*</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.startDate}
                        onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                        className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3.5 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all shadow-xs min-h-[48px]"
                      />
                    </div>
                  </div>

                  {/* Additional Requirements */}
                  <div className="space-y-1.5 sm:space-y-2">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#0B1522]/80">
                      {t.form.labelAdditional}
                    </label>
                    <textarea
                      rows={3}
                      placeholder={t.form.placeholderAdditional}
                      value={formData.additionalRequirements}
                      onChange={(e) => setFormData({ ...formData, additionalRequirements: e.target.value })}
                      className="w-full bg-white border border-[#0B1522]/15 rounded-xl px-4 py-3 text-base sm:text-sm text-[#0B1522] focus:outline-none focus:border-[#C59C58] focus:ring-2 focus:ring-[#C59C58]/20 transition-all resize-none shadow-xs"
                    />
                  </div>

                  {/* Trust Reassurance Strip */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF7F2] border border-[#0B1522]/10 text-xs text-[#0B1522]/80">
                    <ShieldCheck className="w-5 h-5 text-[#C59C58] shrink-0" />
                    <span>
                      {t.form.guaranteeText}
                    </span>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0B1522] via-[#142337] to-[#0B1522] hover:from-[#152336] hover:to-[#0B1522] text-white py-4 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_12px_28px_-8px_rgba(11,21,34,0.3)] border border-[#C59C58]/40 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#C59C58]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                    
                    {loading ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t.form.submittingBtn}</span>
                      </span>
                    ) : (
                      <>
                        <span className="relative z-10">{t.form.submitBtn}</span>
                        <ArrowRight className="w-4 h-4 text-[#C59C58] relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
