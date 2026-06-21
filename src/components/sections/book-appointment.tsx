"use client";

import { siteConfig } from "@/lib/site-config";
import AppointmentForm from "@/components/ui/appointment-form";
import { CheckCircle2, ShieldCheck, Phone } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import { 
  fadeRise, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function BookAppointment() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="appointment" className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-transparent">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="max-w-5xl mx-auto bg-white border border-gray-150 rounded-3xl shadow-soft p-8 sm:p-10 lg:p-12 relative overflow-hidden"
        >
          {/* Top border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Left Column: Guidelines & Contact Details */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-8 text-left border-b lg:border-b-0 lg:border-r border-gray-100 pb-8 lg:pb-0 lg:pr-10">
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider block">
                    Caring for every little step
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-primary-dark font-heading leading-tight">
                    Preparing for your visit
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  To ensure a comprehensive baseline check, please remember to bring along the following documents:
                </p>

                {/* Checklist */}
                <ul className="flex flex-col gap-3 text-xs sm:text-sm text-muted-text font-sans">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                    <span>Discharge summary from delivery hospital</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                    <span>Vaccination records or birth card booklets</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                    <span>Any ongoing prescription details</span>
                  </li>
                </ul>
              </div>

              {/* Direct consultation quick links */}
              <div className="flex flex-col gap-4 bg-surface-tint/50 border border-primary/5 p-5 rounded-2xl">
                <h4 className="text-xs font-bold text-primary-dark uppercase tracking-wider flex items-center gap-1.5 font-heading">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Immediate support</span>
                </h4>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Call or WhatsApp our coordinator directly to clarify any slot preferences:
                </p>
                <div className="flex flex-wrap gap-3 items-center text-xs font-semibold font-sans">
                  <a href={siteConfig.phoneLink} className="text-primary hover:underline">
                    Call: +91 {siteConfig.phone}
                  </a>
                  <span className="text-gray-300">|</span>
                  <a href={siteConfig.whatsappLink} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    WhatsApp Direct
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column: Appointment Form */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left justify-between">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  Request a consultation slot
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Fill in your details below to log your slot preference. Our coordinator will contact you to verify details.
                </p>
              </div>

              {/* Reusable Form Component */}
              <AppointmentForm />

              {/* Data security helper text */}
              <div className="flex items-center gap-2 text-[10px] text-muted-text font-sans mt-2 pt-2 border-t border-gray-50">
                <ShieldCheck className="w-4 h-4 text-secondary shrink-0" />
                <span>Your details are secure and only used for outpatient clinical scheduling.</span>
              </div>
            </div>

          </div>

        </motion.div>

      </div>
      {/* Bottom Wave Divider to transition to footer */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-[#163C7A]"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
