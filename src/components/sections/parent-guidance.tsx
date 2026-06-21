"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ClinicImage from "@/components/ui/clinic-image";
import { 
  fadeRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function ParentGuidance() {
  const shouldReduceMotion = useReducedMotion();

  const guides = [
    {
      topic: "Breastfeeding Support",
      info: "Latch techniques, feeds frequency, and identifying if baby is receiving sufficient milk.",
      tag: "Nutrition"
    },
    {
      topic: "Newborn Care Basics",
      info: "Umbilical cord care hygiene, safe sponge baths, and identification of warning signs.",
      tag: "Infant Care"
    },
    {
      topic: "Healthy Sleep Environment",
      info: "Back-sleeping recommendations to reduce SIDS risk, swaddling guidance, and night feeds routine.",
      tag: "Safety"
    },
    {
      topic: "Infant Jaundice",
      info: "Understanding normal physiological jaundice vs. medical conditions requiring clinical phototherapy.",
      tag: "Medical"
    }
  ];


  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* Left Column: Image/Visual (Now Left aligned) */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-5 relative flex flex-col items-center justify-center w-full"
          >
            {/* Background blob for visual interest */}
            <div className="absolute w-[80%] h-[80%] bg-secondary/5 rounded-full blur-2xl z-0" />
            
            {/* Reassuring Illustration Container */}
            <div className="relative z-10 w-full bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-soft">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-soft bg-surface-tint">
                <ClinicImage
                  src="/images/illustrations/parent-guidance-premium.webp"
                  alt="Caring for your newborn - baby steps clinic"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Column: Content & Guides (Now Right aligned) */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="flex flex-col gap-1.5 mx-auto lg:mx-0 text-center lg:text-left">
              <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">
                Caring for every little step
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block w-max mx-auto lg:mx-0">
                Parent Resources
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Friendly Guidance for New Parents
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              Bringing home a newborn comes with many questions. We provide gentle, medically safe counseling to help you navigate feeding, sleep, and safety with confidence.
            </p>

            {/* Vertical Guides List (replaces the card grid to break card fatigue) */}
            <div className="flex flex-col gap-5 mt-2">
              {guides.map((guide, index) => (
                <div 
                  key={index}
                  className="flex gap-4 items-start text-left group p-3 -mx-3 rounded-2xl hover:bg-surface-tint/50 transition-all duration-200 cursor-default"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary border border-primary/15 flex items-center justify-center font-bold text-sm shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <span className="text-[9px] font-bold text-secondary-dark bg-secondary/10 border border-secondary/15 py-0.5 px-2 rounded-md uppercase tracking-wider font-sans">
                        {guide.tag}
                      </span>
                      <h3 className="text-base font-bold font-heading text-primary-dark group-hover:text-primary transition-colors duration-200">
                        {guide.topic}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                      {guide.info}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Read Parent Guide Blog</span>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
