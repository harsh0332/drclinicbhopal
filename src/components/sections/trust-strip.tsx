"use client";

import { Shield, GraduationCap, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeRise, getInitial, viewportOnce } from "@/lib/motion";

export default function TrustStrip() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <section
        aria-label="Trust signals"
        className="bg-[#163C7A] text-white py-5 px-6"
      >
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3.5 text-center"
        >
          {/* Signal 1 */}
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
            <Shield className="w-[17px] h-[17px] text-[#FFC53D]" />
            <span>Consultants at Rainbow Children&apos;s Hospital</span>
          </div>

          <span className="hidden md:inline text-white/30 select-none font-sans">•</span>

          {/* Signal 2 */}
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
            <Shield className="w-[17px] h-[17px] text-[#34C7A4]" />
            <span>Consultants at Apollo SAGE Hospital</span>
          </div>

          <span className="hidden md:inline text-white/30 select-none font-sans">•</span>

          {/* Signal 3 */}
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
            <GraduationCap className="w-[17px] h-[17px] text-[#FF8A7A]" />
            <span>DNB New Delhi · PGPN Boston, USA</span>
          </div>

          <span className="hidden md:inline text-white/30 select-none font-sans">•</span>

          {/* Signal 4 */}
          <div className="flex items-center gap-2 text-[13.5px] font-semibold text-white">
            <MapPin className="w-[17px] h-[17px] text-white" />
            <span>Serving South Bhopal</span>
          </div>
        </motion.div>
      </section>

      {/* Organic divider transitioning from navy (#163C7A) to white (#FFFFFF) */}
      <div aria-hidden="true" className="bg-[#163C7A] w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 54"
          preserveAspectRatio="none"
          className="w-full h-auto fill-white"
          style={{ height: "48px", minHeight: "20px" }}
        >
          <path d="M0,10 C300,52 760,52 1080,28 C1240,16 1360,18 1440,24 L1440,54 L0,54 Z" />
        </svg>
      </div>
    </>
  );
}
