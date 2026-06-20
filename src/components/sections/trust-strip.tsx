"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  description: string;
}

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
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-soft flex-1 min-w-[200px]">
      <span className="text-4xl sm:text-5xl font-extrabold text-primary font-heading tracking-tight mb-2">
        <span ref={ref}>0{suffix}</span>
      </span>
      <span className="text-sm font-semibold text-primary-dark font-sans mb-1 uppercase tracking-wider">
        {label}
      </span>
      <span className="text-xs text-muted-text font-sans">
        {description}
      </span>
    </div>
  );
}

export default function TrustStrip() {
  return (
    <section className="bg-surface-tint border-y border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
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
          <div className="flex flex-col lg:flex-1 text-center lg:text-left gap-4 max-w-xl">
            <h2 className="text-xl sm:text-2xl font-bold text-primary-dark font-heading leading-tight">
              Hospital Affiliations &amp; Professional Associations
            </h2>
            <p className="text-sm text-muted-text leading-relaxed font-sans">
              Our pediatricians maintain active consultancies with premier healthcare networks: <strong className="text-gray-900 font-medium">Rainbow Children&apos;s Hospital</strong> (Bhopal) and <strong className="text-gray-900 font-medium">Apollo SAGE Hospital</strong> (Bhopal). Formally registered with national medical councils ensuring adherence to strict pediatric practice standards.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
