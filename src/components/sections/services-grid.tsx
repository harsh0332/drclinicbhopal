"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Syringe,
  Baby,
  HeartPulse,
  TrendingUp,
  Apple,
  ClipboardCheck,
  Heart,
  Thermometer,
  Wind,
  Activity,
  ShieldAlert,
  GraduationCap,
  Milestone,
  ArrowRight
} from "lucide-react";

const iconMap: Record<string, any> = {
  "Vaccination Clinic": Syringe,
  "Newborn Care": Baby,
  "NICU Follow-up": HeartPulse,
  "Growth Monitoring": TrendingUp,
  "Child Nutrition": Apple,
  "Development Assessment": ClipboardCheck,
  "Breastfeeding Counseling": Heart,
  "Fever Management": Thermometer,
  "Allergy & Asthma Care": Wind,
  "Adolescent Health": Activity,
  "Emergency Child Care": ShieldAlert,
  "Parent Education": GraduationCap,
  "Milestone Tracking": Milestone,
};

// Generates slug from service name
function getServiceSlug(service: string) {
  return service
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function ServicesGrid() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Comprehensive pediatric care services
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            From essential newborn support and immunizations to emergency guidance and developmental tracking, we support your child through every milestone.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {siteConfig.services.map((service, index) => {
            const IconComponent = iconMap[service] || Baby;
            const slug = getServiceSlug(service);
            const isEmergency = service === "Emergency Child Care";

            return (
              <Link
                key={index}
                href={`/services/${slug}`}
                className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[200px] ${
                  isEmergency
                    ? "bg-red-50/50 border-red-100 hover:border-emergency/30 hover:bg-red-50 hover:shadow-soft"
                    : "bg-white border-gray-150 hover:border-primary/20 hover:bg-surface-tint/30 hover:shadow-soft"
                }`}
              >
                <div>
                  {/* Icon Container */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 mb-4 ${
                      isEmergency
                        ? "bg-red-100 text-emergency border-red-200"
                        : "bg-surface-tint text-primary border-primary/10"
                    }`}
                  >
                    <IconComponent className="w-5 h-5 stroke-[2]" />
                  </div>

                  {/* Content */}
                  <h3
                    className={`text-base font-semibold font-heading leading-tight ${
                      isEmergency ? "text-emergency" : "text-primary-dark group-hover:text-primary transition-colors"
                    }`}
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
                    className={`text-xs font-semibold inline-flex items-center gap-1 transition-colors ${
                      isEmergency
                        ? "text-emergency group-hover:underline"
                        : "text-primary group-hover:text-primary-dark"
                    }`}
                  >
                    <span>Read details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
