"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import ServiceIconTile from "@/components/ui/ServiceIconTile";
import { 
  fadeRise, 
  staggerContainer, 
  hoverLift, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";
import { servicesData } from "@/lib/services-data";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";


// Generates slug from service name
function getServiceSlug(service: string) {
  return service
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

interface CardTheme {
  hoverBorder: string;
  hoverBg: string;
  glowColor: string;
  textColor: string;
}

function getCardTheme(slug: string, index: number): CardTheme {
  if (slug === "emergency-child-care") {
    return {
      hoverBorder: "hover:border-emergency/30",
      hoverBg: "hover:bg-[#FFF6F5]/40",
      glowColor: "rgba(229, 72, 77, 0.08)",
      textColor: "text-emergency"
    };
  }

  const themes = [
    {
      hoverBorder: "hover:border-[#2E6CF6]/20",
      hoverBg: "hover:bg-[#F4F8FF]/40",
      glowColor: "rgba(46, 108, 246, 0.08)",
      textColor: "text-primary-dark group-hover:text-[#2E6CF6]"
    },
    {
      hoverBorder: "hover:border-[#34C7A4]/20",
      hoverBg: "hover:bg-[#EAFBF7]/40",
      glowColor: "rgba(52, 199, 164, 0.08)",
      textColor: "text-primary-dark group-hover:text-[#34C7A4]"
    },
    {
      hoverBorder: "hover:border-[#FFC53D]/20",
      hoverBg: "hover:bg-[#FFFBF0]/40",
      glowColor: "rgba(255, 197, 61, 0.08)",
      textColor: "text-primary-dark group-hover:text-primary"
    },
    {
      hoverBorder: "hover:border-[#FF8A7A]/20",
      hoverBg: "hover:bg-[#FFF6F5]/40",
      glowColor: "rgba(255, 138, 122, 0.08)",
      textColor: "text-primary-dark group-hover:text-[#FF8A7A]"
    }
  ];

  return themes[index % themes.length];
}

export default function ServicesGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="services" className="relative overflow-hidden pt-28 pb-32 bg-transparent">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />

      {/* Decorative BabyFootprints trail bridging Services and Vaccine Teaser */}
      <div className="absolute right-[8%] bottom-[4%] opacity-[0.05] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <BabyFootprints className="w-24 h-12 fill-primary" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Comprehensive pediatric care services
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            From essential newborn support and immunizations to emergency guidance and developmental tracking, we support your child through every milestone.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {siteConfig.services.map((service, index) => {
            const slug = getServiceSlug(service);
            const isEmergency = service === "Emergency Child Care";
            const theme = getCardTheme(slug, index);

            return (
              <motion.div
                key={index}
                variants={fadeRise}
                whileHover={hoverLift(shouldReduceMotion, -5, { boxShadow: `0 20px 40px ${theme.glowColor}` })}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Link
                  href={`/services/${slug}`}
                  className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[210px] cursor-pointer ${
                    isEmergency
                      ? "bg-[#FFF6F5]/30 border-red-100"
                      : "bg-white border-gray-150"
                  } ${theme.hoverBorder} ${theme.hoverBg}`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      {/* Unified Pediatric Icon Tile */}
                      <ServiceIconTile
                        serviceSlug={slug}
                        index={index}
                        size={20}
                        className="mb-4 shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-300"
                      />
                      {isEmergency && (
                        <span className="text-[9px] font-bold text-emergency bg-[#FFF6F5] border border-red-100/50 py-1 px-2.5 rounded-full uppercase tracking-wider animate-pulse select-none font-sans">
                          🚨 24/7 Support
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <h3
                      className={`text-base font-semibold font-heading leading-tight transition-colors duration-300 ${theme.textColor}`}
                    >
                      {service}
                    </h3>
                    <p className="text-xs text-muted-text font-sans mt-2 leading-relaxed">
                      {servicesData[slug]?.description || "Expert clinical guidance and support tailored for your child's developmental and health needs."}
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <div className="mt-4 flex justify-end">
                    <span
                      className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors duration-300 ${
                        isEmergency
                          ? "text-emergency group-hover:underline"
                          : "text-primary group-hover:text-primary-dark"
                      }`}
                    >
                      <span>Read details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

      </div>

      {/* Bottom Curve/Wave Divider to transition to transparent VaccineTeaser */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
