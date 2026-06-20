"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import ServiceIconTile from "@/components/ui/ServiceIconTile";

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

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
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
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {siteConfig.services.map((service, index) => {
            const slug = getServiceSlug(service);
            const isEmergency = service === "Emergency Child Care";
            const theme = getCardTheme(slug, index);

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: `0 12px 25px ${theme.glowColor}` }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="w-full h-full"
              >
                <Link
                  href={`/services/${slug}`}
                  className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[210px] cursor-pointer ${
                    isEmergency
                      ? "bg-red-50/20 border-red-100"
                      : "bg-white border-gray-150"
                  } ${theme.hoverBorder} ${theme.hoverBg}`}
                >
                  <div>
                    {/* Unified Pediatric Icon Tile */}
                    <ServiceIconTile
                      serviceSlug={slug}
                      index={index}
                      size={20}
                      className="mb-4 shadow-sm"
                    />

                    {/* Content */}
                    <h3
                      className={`text-base font-semibold font-heading leading-tight transition-colors duration-300 ${theme.textColor}`}
                    >
                      {service}
                    </h3>
                    <p className="text-xs text-muted-text font-sans mt-2 leading-relaxed">
                      Factual guidance, assessment, and treatment pathways aligned with standard clinical protocols.
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
    </section>
  );
}
