"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, FileCheck } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import Sparkle from "@/components/ui/decor/Sparkle";
import { 
  fadeRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const testimonials = [
    {
      text: "Dr. Sudarshan and Dr. Manisha provided wonderful support during our NICU discharge. They explained the baby's feeding schedule and growth tracking parameters very clearly, which helped reduce our anxiety as first-time parents.",
      author: "Pooja Sharma",
      relation: "Mother",
      childName: "Kabir (3m)",
      locality: "Neelbad, Bhopal",
      initial: "P",
      gradient: "from-primary to-mint"
    },
    {
      text: "The clinic's appointment scheduling is extremely efficient. We rarely have to wait more than 10 minutes, and the vaccination cold-chain transparency gives us absolute peace of mind. Highly recommend their care.",
      author: "Rajesh Verma",
      relation: "Father",
      childName: "Aarav (1.5y)",
      locality: "Kolar Road, Bhopal",
      initial: "R",
      gradient: "from-sunshine to-coral"
    },
    {
      text: "Dr. Manisha's breastfeeding counseling sessions were incredibly helpful. She took the time to explain proper techniques and monitored our baby's weight-for-age chart to ensure everything was on track.",
      author: "Anjali Gupta",
      relation: "Mother",
      childName: "Kiara (6w)",
      locality: "Pooja Colony, Bhopal",
      initial: "A",
      gradient: "from-mint to-primary"
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };


  const slideVariants = {
    initial: { opacity: 0, x: shouldReduceMotion ? 0 : 15 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
    exit: { opacity: 0, x: shouldReduceMotion ? 0 : -15, transition: { duration: 0.25, ease: "easeIn" as const } }
  };

  return (
    <section className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-transparent">
      {/* Decorative Sparkle accent */}
      <div className="absolute left-[8%] bottom-[20%] opacity-[0.15] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <Sparkle className="w-12 h-12 fill-secondary" />
      </div>
      {/* Top Wave Divider */}
      <SectionDivider
        type="wave"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Feedback from parents
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Real experiences shared by families who consult our pediatricians. Real, consented reviews only.
          </p>
        </motion.div>

        {/* Clean Testimonials-Only Layout (Carousel) */}
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-4xl mx-auto"
        >
          <motion.div 
            variants={fadeRise}
            className="bg-white border border-gray-150 rounded-3xl p-8 sm:p-12 shadow-soft flex flex-col justify-between relative min-h-[340px]"
          >
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/5 stroke-[1.5]" />
            
            {/* Testimonial Card */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={slideVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center gap-6 w-full"
                >
                  <p className="text-lg sm:text-xl text-gray-800 leading-relaxed font-sans italic max-w-3xl">
                    &ldquo;{testimonials[activeIndex].text}&rdquo;
                  </p>
                  
                  <div className="flex flex-col items-center gap-3">
                    {/* Gradient initials avatar badge */}
                    <div className={`w-14 h-14 rounded-full bg-gradient-to-tr ${testimonials[activeIndex].gradient} flex items-center justify-center text-white font-bold font-heading text-lg shadow-sm shrink-0 select-none`}>
                      {testimonials[activeIndex].initial}
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-base font-bold font-heading text-primary-dark">
                        {testimonials[activeIndex].author}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-text font-sans mt-1">
                        {testimonials[activeIndex].relation} of {testimonials[activeIndex].childName} &bull; {testimonials[activeIndex].locality}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Carousel Controls & Pagination Dots */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-10 border-t border-gray-100 pt-6 z-20">
              {/* Pagination Dots Indicator */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className="p-2 -m-2 cursor-pointer focus:outline-none"
                    aria-label={`Go to testimonial ${idx + 1}`}
                  >
                    <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      activeIndex === idx ? "bg-primary w-6" : "bg-gray-300 hover:bg-gray-400"
                    }`} />
                  </button>
                ))}
              </div>

              {/* Navigation controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={prevTestimonial}
                  className="w-11 h-11 flex items-center justify-center border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-xl transition-all cursor-pointer hover:bg-surface-tint active:scale-95 focus:outline-none"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextTestimonial}
                  className="w-11 h-11 flex items-center justify-center border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-xl transition-all cursor-pointer hover:bg-surface-tint active:scale-95 focus:outline-none"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </motion.div>
        </motion.div>

        {/* Ethical Compliance Consent Note */}
        <motion.div 
          variants={fadeRise}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-3xl mx-auto mt-8 p-4 bg-white/60 border border-gray-100 rounded-2xl flex items-start gap-2.5 text-[11px] text-muted-text leading-relaxed font-sans text-left"
        >
          <FileCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <span>
            <strong>Consent Note:</strong> Testimonials are published with the express, written consent of the parents in accordance with the National Medical Commission (NMC) ethics guidelines and the Drugs &amp; Magic Remedies Act. Testimonials represent individual patient experiences and do not constitute a promise or guarantee of clinical treatment outcomes. Real reviews only; no fabricated ratings.
          </span>
        </motion.div>

      </div>

      {/* Bottom Wave Divider */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
