import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { servicesData } from "@/lib/services-data";
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
  ArrowRight,
  Calendar,
  Phone
} from "lucide-react";

export const metadata: Metadata = {
  title: "Pediatric Services & Treatments | Baby Steps Clinic Bhopal",
  description: "Factual overview of our services: WHO-compliant vaccinations, newborn care, developmental milestone tracking, and asthma care in Neelbad, Bhopal.",
  alternates: {
    canonical: "https://www.babystepsclinic.in/services",
  },
};

const iconMap: Record<string, any> = {
  "vaccination-clinic": Syringe,
  "newborn-care": Baby,
  "nicu-follow-up": HeartPulse,
  "growth-monitoring": TrendingUp,
  "child-nutrition": Apple,
  "development-assessment": ClipboardCheck,
  "breastfeeding-counseling": Heart,
  "fever-management": Thermometer,
  "allergy-asthma-care": Wind,
  "adolescent-health": Activity,
  "emergency-child-care": ShieldAlert,
  "parent-education": GraduationCap,
  "milestone-tracking": Milestone,
};

export default function ServicesPage() {
  const servicesList = Object.values(servicesData);

  return (
    <main className="flex-1 bg-white">
      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Services</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Our Pediatric Services
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              We offer comprehensive outpatient medical care, routine immunizations, neonatal developmental screenings, and parent counseling guidelines in Neelbad, Bhopal.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {servicesList.map((service) => {
              const IconComponent = iconMap[service.slug] || Baby;
              const isEmergency = service.slug === "emergency-child-care";

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className={`group p-6 rounded-2xl border transition-all duration-300 flex flex-col justify-between h-full min-h-[220px] text-left ${
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
                    <h2
                      className={`text-base font-semibold font-heading leading-tight ${
                        isEmergency ? "text-emergency" : "text-primary-dark group-hover:text-primary transition-colors"
                      }`}
                    >
                      {service.title}
                    </h2>
                    <p className="text-xs text-muted-text font-sans mt-2 leading-relaxed line-clamp-3">
                      {service.description}
                    </p>
                  </div>

                  {/* Action Link */}
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

          {/* Action CTAs Block */}
          <div className="max-w-3xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-16 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Need to book a consultation?
            </h3>
            <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              Our pediatric clinic provides vaccination scheduling, newborn growth mapping, and routine medical reviews. Request a slot online or contact our reception.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <Link
                href="/#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Appointment</span>
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
