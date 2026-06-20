"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import Cloud from "@/components/ui/decor/Cloud";
import Star from "@/components/ui/decor/Star";
import Sparkle from "@/components/ui/decor/Sparkle";
import Balloon from "@/components/ui/decor/Balloon";
import SoftBlob from "@/components/ui/decor/SoftBlob";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";
import { 
  Calendar, 
  Phone, 
  MessageSquare, 
  Star as StarIcon, 
  ShieldAlert, 
  GraduationCap, 
  Award, 
  Stethoscope, 
  Clock, 
  CheckCircle2 
} from "lucide-react";

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  // Entrance variants for container and children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  // Parallax float configurations
  const floatTransition = (duration: number) =>
    shouldReduceMotion
      ? {}
      : {
          y: [0, -10, 0],
          transition: {
            duration,
            repeat: Infinity,
            repeatType: "mirror" as const,
            ease: "easeInOut" as const,
          },
        };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#F4F8FF] via-white to-[#E8F1FF] py-20 lg:py-28 select-none">
      
      {/* Background Graphic Accents (SVG Decor Kit Layer) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        
        {/* Soft Organic Blob (Center background) */}
        <div className="absolute top-[20%] left-[10%] opacity-40">
          <SoftBlob width={350} height={350} colorClass="fill-[#F4F8FF]" />
        </div>

        {/* Slow drifting cloud left */}
        <motion.div 
          className="absolute top-12 left-[8%] opacity-35 hidden md:block"
          animate={shouldReduceMotion ? {} : { x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud width={120} height={70} colorClass="fill-primary-dark/5" />
        </motion.div>

        {/* Slow drifting cloud right */}
        <motion.div 
          className="absolute top-24 right-[12%] opacity-30 hidden md:block"
          animate={shouldReduceMotion ? {} : { x: [0, -25, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud width={160} height={90} colorClass="fill-secondary/10" />
        </motion.div>

        {/* Floating balloon left */}
        <motion.div 
          className="absolute bottom-16 left-[4%] opacity-45 hidden lg:block"
          animate={floatTransition(6)}
        >
          <Balloon width={40} height={60} colorClass="fill-accent-coral" />
        </motion.div>

        {/* Pulsing stars and sparkles */}
        <motion.div 
          className="absolute top-[40%] left-[6%] opacity-60"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Star width={20} height={20} colorClass="fill-accent-sunshine" />
        </motion.div>

        <motion.div 
          className="absolute top-16 right-[45%] opacity-50"
          animate={shouldReduceMotion ? {} : { scale: [1, 1.12, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        >
          <Sparkle width={18} height={18} colorClass="fill-accent-sunshine" />
        </motion.div>

        {/* Brand Signature Motif - Faint Baby Footprints Trail */}
        <div className="absolute top-[18%] left-[45%] opacity-15 rotate-[18deg] hidden xl:block">
          <BabyFootprints width={75} height={55} colorClass="fill-primary" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Trust Badges Bar (Lucide + Token Colored Chips) */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5"
              variants={itemVariants}
            >
              <span className="bg-blue-50 border border-blue-100/50 text-primary-dark font-sans text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <GraduationCap className="w-4 h-4 text-primary shrink-0" />
                <span>DNB New Delhi</span>
              </span>
              <span className="bg-amber-50 border border-amber-100/50 text-amber-900 font-sans text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Award className="w-4 h-4 text-amber-600 shrink-0" />
                <span>PGPN Boston (USA)</span>
              </span>
              <span className="bg-[#EAFBF7] border border-[#34C7A4]/20 text-[#163C7A] font-sans text-xs font-semibold px-3.5 py-2 rounded-full flex items-center gap-2 shadow-sm">
                <Stethoscope className="w-4 h-4 text-[#34C7A4] shrink-0" />
                <span>Rainbow &amp; Apollo SAGE Consultants</span>
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary-dark leading-[1.12] font-heading"
              variants={itemVariants}
            >
              Gentle, expert care for your newborn &amp; child — <span className="text-primary">in Neelbad</span>
            </motion.h1>

            {/* Sub-headline / Factual Credentials */}
            <motion.p 
              className="text-base sm:text-lg text-muted-text max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans"
              variants={itemVariants}
            >
              Led by husband-wife specialist duo: <strong className="text-gray-900 font-semibold">Dr. Sudarshan Dev Arya</strong> (MBBS, DCH, DNB New Delhi, PGPN Boston) &amp; <strong className="text-gray-900 font-semibold">Dr. Manisha Bangarwa Arya</strong> (MBBS, DNB, PGPN Boston, Neonatology Fellowship).
            </motion.p>

            {/* CTAs Actions */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-2"
              variants={itemVariants}
            >
              {/* Primary Book CTA */}
              <Link
                href="#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-base font-semibold py-4 px-8 rounded-2xl shadow-md hover:bg-primary-dark hover:shadow-lg active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>

              {/* Call CTA */}
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-base font-semibold py-4 px-8 rounded-2xl shadow-soft hover:bg-gray-50 active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px] cursor-pointer"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call Clinic</span>
              </a>

              {/* WhatsApp CTA */}
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-green-50 border border-green-200 text-green-700 text-base font-semibold py-4 px-8 rounded-2xl hover:bg-green-100 active:scale-[0.98] transition-all motion-reduce:hover:scale-100 motion-reduce:active:scale-100 min-h-[48px] cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 text-green-500 fill-green-500" />
                <span>WhatsApp</span>
              </a>
            </motion.div>

            {/* Honest Trust Block / Reviews Toggle */}
            <motion.div 
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 mt-2 text-sm"
              variants={itemVariants}
            >
              {siteConfig.showGoogleRating ? (
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-muted-text hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-lg px-2 py-0.5"
                >
                  <StarIcon className="w-4 h-4 text-accent-sunshine fill-accent-sunshine" />
                  <span className="font-semibold text-gray-900">5.0</span> Rating on Google Reviews
                </a>
              ) : (
                <div className="flex items-center gap-1.5 text-muted-text bg-white/70 border border-primary/5 py-1.5 px-3.5 rounded-full text-xs font-semibold shadow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />
                  <span>Trusted by families in Neelbad &amp; South Bhopal</span>
                </div>
              )}

              <Link
                href="#contact"
                className="flex items-center gap-1.5 text-emergency font-semibold hover:underline"
              >
                <ShieldAlert className="w-4 h-4" />
                Emergency Child Care Info
              </Link>
            </motion.div>

          </motion.div>

          {/* Right Column: Hero Image with Glassmorphism Cards */}
          <motion.div 
            className="lg:col-span-5 relative flex items-center justify-center"
            variants={imageVariants}
            initial="hidden"
            animate="visible"
          >
            
            {/* Background Circle */}
            <div className="absolute w-[85%] h-[85%] bg-primary/5 rounded-full blur-3xl z-0" />

            {/* Core Image Container */}
            <div className="relative z-10 w-full max-w-md lg:max-w-none bg-white/30 backdrop-blur-md p-4 rounded-3xl border border-white/50 shadow-soft">
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

              {/* Floating Badge (Glassmorphism overlay - Bottom Left) */}
              <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-md border border-primary/10 py-3.5 px-4 rounded-2xl shadow-soft flex items-center gap-3 z-20">
                <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary font-bold text-lg select-none">
                  👶
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[9px] text-muted-text font-sans font-bold uppercase tracking-wider">Newborn Specialty</span>
                  <span className="text-sm font-semibold text-primary-dark font-heading leading-tight">Neonatology Fellowship</span>
                </div>
              </div>

              {/* Floating Hours Badge (Glassmorphism overlay - Top Right) */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md border border-primary/10 py-2.5 px-3.5 rounded-2xl shadow-soft flex items-center gap-2.5 z-20">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0 select-none">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[8px] text-muted-text font-sans font-bold uppercase tracking-wider">Operational Hours</span>
                  <span className="text-xs font-bold text-primary-dark font-heading leading-none mt-0.5">Open Mon – Sat</span>
                </div>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
