"use client";

import Link from "next/link";
import { TrendingUp, Scale, Ruler, Compass } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ClinicImage from "@/components/ui/clinic-image";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import Cloud from "@/components/ui/decor/Cloud";
import { 
  fadeRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function GrowthTeaser() {
  const shouldReduceMotion = useReducedMotion();


  return (
    <section className="relative overflow-hidden pt-28 pb-32 bg-[#FFC53D]/[0.03]">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />

      {/* Decorative Cloud accent */}
      <div className="absolute right-[4%] top-[10%] opacity-[0.03] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <Cloud className="w-56 h-36 fill-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          
          {/* Left Column: Description & Interactive Indicators (Now Left aligned) */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
          >
            <div className="flex flex-col gap-1.5 mx-auto lg:mx-0 text-center lg:text-left">
              <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">
                Supporting their strength
              </span>
              <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block w-max mx-auto lg:mx-0">
                Growth Monitoring
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Careful tracking of your child&apos;s growth
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              We monitor height, weight, and head circumference at every consultation, plotting them against WHO (World Health Organization) growth reference charts. This ensures early detection of nutritional or metabolic changes.
            </p>

            {/* WHO Growth Chart Standard Indicators as Clickable Previews */}
            <div className="flex flex-col gap-4 mt-2">
              {/* Indicator 1 */}
              <Link href="/tools/growth-calculator" className="group">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-150/70 hover:border-primary/25 hover:bg-surface-tint/20 transition-all duration-300 shadow-soft hover:shadow-md cursor-pointer text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Weight-for-Age</span>
                    <p className="text-xs text-muted-text font-sans leading-relaxed">
                      Identifies acute nutrition indicators. Standard baby scale checkups done at every consultation.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Indicator 2 */}
              <Link href="/tools/growth-calculator" className="group">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-150/70 hover:border-primary/25 hover:bg-surface-tint/20 transition-all duration-300 shadow-soft hover:shadow-md cursor-pointer text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Height-for-Age</span>
                    <p className="text-xs text-muted-text font-sans leading-relaxed">
                      Evaluates long-term linear growth. Essential to diagnose linear development constraints.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Indicator 3 */}
              <Link href="/tools/growth-calculator" className="group">
                <div className="flex gap-4 p-4 rounded-2xl bg-white border border-gray-150/70 hover:border-primary/25 hover:bg-surface-tint/20 transition-all duration-300 shadow-soft hover:shadow-md cursor-pointer text-left">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center text-primary shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm font-semibold font-heading text-primary-dark group-hover:text-primary transition-colors">Head Circumference-for-Age</span>
                    <p className="text-xs text-muted-text font-sans leading-relaxed">
                      Tracks baby brain development and neurological safety margins in early infancy.
                    </p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
              <Link
                href="/tools/growth-calculator"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Compass className="w-4.5 h-4.5" />
                <span>Launch Growth Calculator Tool</span>
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Illustration (Now Right aligned) */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-5 relative flex flex-col items-center justify-center w-full"
          >
            {/* Background organic shape */}
            <div className="absolute w-[80%] h-[80%] bg-primary/5 rounded-full blur-2xl z-0" />
            
            {/* Visual Frame */}
            <div className="relative z-10 w-full bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-soft">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-gray-150 shadow-soft bg-surface-tint">
                <ClinicImage
                  src="/images/illustrations/growth-journey-premium.webp"
                  alt="Growth journey and percentile monitoring illustration"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
