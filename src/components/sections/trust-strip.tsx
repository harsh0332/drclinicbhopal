"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion, animate, Variants } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
  }
};

function StatItem({ value, suffix, label, description }: StatItemProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      if (ref.current) {
        ref.current.textContent = `${value.toLocaleString()}${suffix}`;
      }
      return;
    }

    if (inView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (ref.current) {
            ref.current.textContent = `${Math.floor(latest).toLocaleString()}${suffix}`;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, suffix, shouldReduceMotion]);

  return (
    <motion.div
      variants={statItemVariants}
      whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: "0 12px 30px rgba(46, 108, 246, 0.1)", borderColor: "rgba(46, 108, 246, 0.2)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-150 shadow-soft flex-1 min-w-[200px] transition-colors duration-300"
    >
      <span className="text-4xl sm:text-5xl font-extrabold text-primary font-heading tracking-tight mb-2">
        <span ref={ref}>0{suffix}</span>
      </span>
      <span className="text-sm font-semibold text-primary-dark font-sans mb-1 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-xs text-muted-text font-sans leading-relaxed">
        {description}
      </span>
    </motion.div>
  );
}

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const textVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="relative overflow-hidden bg-surface-tint border-t border-gray-100 pt-16 pb-24">
      {/* Decorative Footprints */}
      <div className="absolute right-[8%] top-[15%] opacity-[0.07] pointer-events-none hidden md:block select-none">
        <BabyFootprints className="w-16 h-12 rotate-[25deg] fill-primary" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
        >
          
          {/* Factual Stats Group */}
          <div className="flex flex-wrap justify-center items-stretch gap-6 w-full lg:w-auto lg:flex-1">
            <StatItem
              value={15}
              suffix="+"
              label="Years Experience"
              description="Combined clinical practice in pediatrics and neonatology"
            />
            <StatItem
              value={10000}
              suffix="+"
              label="Vaccinations"
              description="Administered in safe, temperature-controlled conditions"
            />
          </div>

          {/* Factual Associations Info */}
          <motion.div 
            variants={textVariants}
            className="flex flex-col lg:flex-1 text-center lg:text-left gap-4 max-w-xl"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-primary-dark font-heading leading-tight">
              Hospital Affiliations &amp; Professional Associations
            </h2>
            <p className="text-sm text-muted-text leading-relaxed font-sans">
              Our pediatricians maintain active consultancies with premier healthcare networks: <strong className="text-gray-900 font-medium font-sans">Rainbow Children&apos;s Hospital</strong> (Bhopal) and <strong className="text-gray-900 font-medium font-sans">Apollo SAGE Hospital</strong> (Bhopal). Formally registered with national medical councils ensuring adherence to strict pediatric practice standards.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Wave divider transitioning to white */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0"
      />
    </section>
  );
}
