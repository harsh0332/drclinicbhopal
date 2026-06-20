"use client";

import Link from "next/link";
import { TrendingUp, Scale, Ruler, Compass } from "lucide-react";

export default function GrowthTeaser() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Context Card */}
          <div className="lg:col-span-6 bg-surface-tint border border-primary/5 p-8 rounded-3xl shadow-soft">
            <h3 className="text-xl font-bold font-heading text-primary-dark mb-6">
              WHO Growth Chart Standard Indicators
            </h3>

            <div className="flex flex-col gap-6">
              {/* Indicator 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Scale className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark">Weight-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Identifies acute nutrition indicators. Standard baby scale checkups done at every consultation.
                  </p>
                </div>
              </div>

              {/* Indicator 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Ruler className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark">Height-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Evaluates long-term linear growth. Essential to diagnose linear development constraints.
                  </p>
                </div>
              </div>

              {/* Indicator 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-white border border-primary/10 flex items-center justify-center text-primary shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left gap-1">
                  <span className="text-sm font-semibold font-heading text-primary-dark">Head Circumference-for-Age</span>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    Tracks baby brain development and neurological safety margins in early infancy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Description Text */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto lg:mx-0 w-max">
              Growth Monitoring
            </span>
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
          </div>

        </div>
      </div>
    </section>
  );
}
