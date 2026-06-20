"use client";

import Link from "next/link";
import { TrendingUp, Scale, Ruler, Compass } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import ClinicImage from "@/components/ui/clinic-image";

export default function GrowthTeaser() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          
          {/* Left Column: Context Card */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 bg-surface-tint border border-primary/5 p-6 sm:p-8 rounded-3xl shadow-soft"
          >
            {/* Reassuring Illustration */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-soft bg-white mb-6">
              <ClinicImage
                src="/images/illustrations/growth-journey.webp"
                alt="Growth journey and percentile monitoring illustration"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-xl font-bold font-heading text-primary-dark mb-6">
              WHO Growth Chart Standard Indicators
            </h3>

            <div className="flex flex-col gap-4">
              {/* Indicator 1 */}
              <div className="flex gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-gray-150/70 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Weight-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Identifies acute nutrition indicators. Standard baby scale checkups done at every consultation.
                  </p>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="flex gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-gray-150/70 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <Ruler className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Height-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Evaluates long-term linear growth. Essential to diagnose linear development constraints.
                  </p>
                </div>
              </div>

              {/* Indicator 3 */}
              <div className="flex gap-4 p-3 -mx-3 rounded-2xl hover:bg-white/80 border border-transparent hover:border-gray-150/70 transition-all duration-300 group cursor-default">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Head Circumference-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Tracks baby brain development and neurological safety margins in early infancy.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Description Text */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="flex flex-col gap-1.5 mx-auto lg:mx-0 text-center lg:text-left">
              <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
                Supporting their strength
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block w-max mx-auto lg:mx-0">
                Growth Monitoring
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Factual assessment of physical growth
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              We monitor height, weight, and head circumference at every consultation, plotting them against WHO (World Health Organization) growth reference charts. This ensures early detection of nutritional or metabolic changes.
            </p>
            <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed font-semibold text-primary">
              Use our interactive online growth calculator to track percentiles and BMI from home.
            </p>

            <div className="pt-2">
              <Link
                href="/tools/growth-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Compass className="w-4.5 h-4.5" />
                <span>Launch Growth Calculator Tool</span>
              </Link>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
