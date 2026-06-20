"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { Calendar, Phone, MessageSquare, Star, ShieldAlert } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4F8FF] via-white to-[#E8F1FF] py-20 lg:py-28">
      {/* Self-contained CSS for floating elements */}
      <style jsx global>{`
        @keyframes float-cloud-slow {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(5px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        @keyframes float-cloud-fast {
          0% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-6px) translateX(-4px); }
          100% { transform: translateY(0px) translateX(0px); }
        }
        .animate-float-slow {
          animation: float-cloud-slow 8s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-cloud-fast 5s ease-in-out infinite;
        }
      `}</style>

      {/* Background Graphic Accents (Floating clouds and stars) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {/* Soft yellow cloud */}
        <div className="absolute top-12 left-[10%] w-24 h-12 bg-accent-sunshine/10 rounded-full blur-xl animate-float-slow" />
        {/* Soft coral star/bubble */}
        <div className="absolute bottom-20 left-[5%] w-16 h-16 bg-accent-coral/10 rounded-full blur-lg animate-float-fast" />
        {/* Soft mint cloud */}
        <div className="absolute top-24 right-[15%] w-32 h-16 bg-secondary/15 rounded-full blur-2xl animate-float-slow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            
            {/* Trust Badges Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="bg-white/80 border border-primary/10 shadow-soft text-primary-dark font-sans text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                🎓 DNB New Delhi
              </span>
              <span className="bg-white/80 border border-primary/10 shadow-soft text-primary-dark font-sans text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                🇺🇸 PGPN Boston (USA)
              </span>
              <span className="bg-white/80 border border-primary/10 shadow-soft text-primary-dark font-sans text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                🏥 Rainbow &amp; Apollo SAGE Consultants
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-dark leading-[1.15] font-heading">
              Gentle, expert care for your newborn &amp; child — <span className="text-primary">in Neelbad</span>
            </h1>

            {/* Sub-headline / Factual Credentials */}
            <p className="text-base sm:text-lg text-muted-text max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Led by husband-wife specialist duo: <strong className="text-gray-900 font-semibold">Dr. Sudarshan Dev Arya</strong> (MBBS, DCH, DNB New Delhi, PGPN Boston) &amp; <strong className="text-gray-900 font-semibold">Dr. Manisha Bangarwa Arya</strong> (MBBS, DNB, PGPN Boston, Neonatology Fellowship).
            </p>

            {/* CTAs Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2">
              {/* Primary Book CTA */}
              <Link
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-base font-semibold py-4 px-8 rounded-2xl shadow-md hover:bg-primary-dark hover:shadow-lg active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px]"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>

              {/* Call CTA */}
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-base font-semibold py-4 px-8 rounded-2xl shadow-soft hover:bg-gray-50 active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px]"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call Clinic</span>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={siteConfig.whatsappLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 text-base font-semibold py-4 px-8 rounded-2xl hover:bg-green-100 active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px]"
              >
                <MessageSquare className="w-4 h-4 text-green-500 fill-green-500" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Secondary CTAs Info */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 mt-2 text-sm">
              <a
                href="https://google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-muted-text hover:text-primary transition-colors"
              >
                <Star className="w-4 h-4 text-accent-sunshine fill-accent-sunshine" />
                <span className="font-semibold text-gray-900">5.0</span> Rating on Google Reviews
              </a>

              <Link
                href="#contact"
                className="flex items-center gap-1.5 text-emergency font-semibold hover:underline"
              >
                <ShieldAlert className="w-4 h-4" />
                Emergency Child Care Info
              </Link>
            </div>

          </div>

          {/* Right Column: Hero Image with Glassmorphism Cards */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Background Circle */}
            <div className="absolute w-[80%] h-[80%] bg-primary/5 rounded-full blur-3xl z-0" />

            <div className="relative z-10 w-full max-w-md lg:max-w-none bg-white/40 backdrop-blur-md p-4 rounded-3xl border border-white/60 shadow-soft">
              <div className="overflow-hidden rounded-2xl aspect-[4/3] relative">
                <ClinicImage
                  src="/images/hero/hero-1.jpg"
                  alt="Dr. Manisha checking baby with stethoscope at Baby Steps Clinic"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover select-none"
                  priority
                />
              </div>

              {/* Floating Badge (Glassmorphism overlay) */}
              <div className="absolute -bottom-4 -left-4 sm:left-4 bg-white/95 backdrop-blur-sm border border-primary/10 py-3 px-4 rounded-2xl shadow-soft flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary font-bold text-lg">
                  👶
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-xs text-muted-text font-sans">Newborn Clinic</span>
                  <span className="text-sm font-semibold text-primary-dark font-heading leading-tight">Neonatology Specialty</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
