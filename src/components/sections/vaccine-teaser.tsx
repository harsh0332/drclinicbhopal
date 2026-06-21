"use client";

import Link from "next/link";
import { ShieldCheck, Calendar, ThermometerSnowflake } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";
import { 
  fadeRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function VaccineTeaser() {
  const shouldReduceMotion = useReducedMotion();

  const milestones = [
    { age: "At Birth", vaccines: "BCG, OPV-0, Hep-B 1", note: "Essential initial protection" },
    { age: "6 Weeks", vaccines: "Hexavalent (DTwP-1, IPV-1, Hep-B 2, Hib-1), Rotavirus-1, PCV-1", note: "Primary series start" },
    { age: "10 Weeks", vaccines: "DTwP-2, IPV-2, Hib-2, Hep-B 3, Rotavirus-2, PCV-2", note: "Secondary protection booster" },
    { age: "14 Weeks", vaccines: "DTwP-3, IPV-3, Hib-3, Hep-B 4, Rotavirus-3, PCV-3", note: "Primary series completion" },
    { age: "6 Months", vaccines: "Influenza-1, Typhoid Conjugate Vaccine", note: "Seasonal protection start" },
    { age: "9 Months", vaccines: "MMR-1 (Measles, Mumps, Rubella)", note: "Core viral immunization" }
  ];

  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 bg-transparent">
      {/* Decorative BabyFootprints trail bridging Services and Vaccine Teaser */}
      <div className="absolute left-[8%] top-[5%] opacity-[0.10] pointer-events-none hidden lg:block select-none" aria-hidden="true" style={{ transform: "rotate(15deg)" }}>
        <BabyFootprints className="w-24 h-12 fill-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Left Block: Description */}
          <motion.div 
            variants={fadeRise} 
            className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left"
          >
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto lg:mx-0 w-max">
              Immunization Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              IAP-Aligned Vaccination Timeline
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              We follow the official immunization schedule recommended by the <strong className="text-gray-900 font-medium">Indian Academy of Pediatrics (IAP)</strong>. Proper vaccination ensures high-efficacy protection against critical childhood illnesses.
            </p>
 
            {/* Vaccine Highlight List */}
            <div className="flex flex-col gap-4 text-sm text-muted-text font-sans">
              <div className="flex items-start gap-3 text-left">
                <ThermometerSnowflake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-900 font-medium">WHO Cold-Chain Standards:</strong> Real-time temperature logs monitor our storage to maintain vaccine potency.
                </span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-900 font-medium">Safety-First Protocols:</strong> Clear counseling on potential post-vaccine symptoms (like mild fever) before administration.
                </span>
              </div>
            </div>
 
            <div className="pt-2">
              <Link
                href="/tools/vaccination-schedule"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>View Complete Schedule</span>
              </Link>
            </div>
          </motion.div>
 
          {/* Right Block: Preview Timeline */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-7 bg-white border border-gray-150 p-6 sm:p-8 rounded-3xl shadow-soft"
          >
            <h3 className="text-lg font-bold font-heading text-primary-dark mb-6 border-b border-gray-100 pb-3">
              Early Childhood Schedule Preview (IAP Recommendations)
            </h3>
 
            <div className="relative pl-6 flex flex-col gap-4 border-l-2 border-dashed border-gray-150">
              {milestones.map((item, index) => (
                <Link
                  key={index}
                  href="/tools/vaccination-schedule"
                  className="relative flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100/70 pb-3.5 last:border-b-0 last:pb-0 gap-2 text-left hover:bg-surface-tint px-3 py-2.5 -ml-3 rounded-xl transition-all duration-200 group/row cursor-pointer"
                >
                  {/* Timeline Dot centered on vertical track */}
                  <span className="absolute left-[12px] -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-secondary flex items-center justify-center group-hover/row:scale-125 group-hover/row:border-primary group-hover/row:bg-primary/10 transition-all duration-200 z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary group-hover/row:bg-primary transition-all duration-200" />
                  </span>

                  <div className="flex items-start sm:items-center gap-3 pl-4 sm:pl-5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary-dark font-heading group-hover/row:text-primary transition-colors">
                        {item.age}
                      </span>
                      <span className="text-xs text-muted-text font-sans">
                        {item.note}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-mono bg-primary/5 border border-primary/10 text-primary-dark py-1.5 px-3 rounded-lg max-w-full sm:max-w-[60%] whitespace-normal break-words font-semibold group-hover/row:bg-primary group-hover/row:text-white group-hover/row:border-primary transition-colors duration-200">
                    {item.vaccines}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
 
        </motion.div>
      </div>

      {/* Bottom wave divider transitioning to white */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
