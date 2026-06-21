"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { Award, Building, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import SoftBlob from "@/components/ui/decor/SoftBlob";
import { 
  fadeRise, 
  cardRise, 
  staggerContainer, 
  hoverLift, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function MeetDoctors() {
  const shouldReduceMotion = useReducedMotion();


  return (
    <section id="doctors" className="relative overflow-hidden pt-28 pb-32 bg-[#34C7A4]/[0.03]">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-white"
        className="absolute top-0 left-0 right-0 z-10"
      />

      {/* Decorative SoftBlob behind the grid */}
      <div className="absolute left-[3%] top-[25%] opacity-[0.03] pointer-events-none hidden lg:block select-none" aria-hidden="true">
        <SoftBlob className="w-[450px] h-[450px] fill-[#34C7A4]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
            Pediatric Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Meet our pediatric specialists
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Our clinic is led by a dedicated husband-wife pediatrician duo, holding advanced qualifications from premier institutions in India and the USA.
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto"
        >
          {siteConfig.doctors.map((doctor) => {
            const degrees = doctor.degree.split(",").map(d => d.trim());
            return (
              <motion.div
                key={doctor.id}
                variants={cardRise}
                whileHover={hoverLift(shouldReduceMotion, -6, { boxShadow: "0 20px 40px rgba(22, 60, 122, 0.12)" })}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group bg-white border border-gray-150 hover:border-primary/20 rounded-3xl shadow-soft transition-all duration-300 overflow-hidden flex flex-col h-full cursor-default"
              >
                {/* Top Gradient Hover Outline */}
                <div className="h-1.5 w-full bg-transparent group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-secondary transition-all duration-300 shrink-0" />

                {/* Image Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                  <ClinicImage
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.title}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider">
                      {doctor.title}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-primary-dark">
                      {doctor.name}
                    </h3>
                    
                    {/* Degree Chips */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {degrees.map((deg, idx) => (
                        <span key={idx} className="text-[10px] font-bold bg-primary/5 text-primary border border-primary/10 px-2.5 py-0.5 rounded-full font-sans">
                          {deg}
                        </span>
                      ))}
                    </div>

                    {/* Hospital Affiliation Badge */}
                    <div className="mt-3">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary-dark/5 border border-secondary-dark/15 text-secondary-dark rounded-full text-xs font-semibold font-sans">
                        <Building className="w-3.5 h-3.5" />
                        <span>{doctor.hospital}</span>
                      </div>
                    </div>
                  </div>

                  {/* Warm Philosophy One-Liner */}
                  <div className="border-l-2 border-secondary/40 pl-3.5 py-2 text-xs sm:text-[13px] italic text-muted-text font-medium leading-relaxed font-sans bg-secondary/5 rounded-r-xl pr-3 my-1">
                    &ldquo;{doctor.id === "dr-sudarshan-dev-arya" 
                      ? "Dedicated to providing gentle, thorough pediatric care that helps your child feel safe and supported." 
                      : "Passionate about newborn care and supporting new mothers through gentle lactation and infant health guidance."
                    }&rdquo;
                  </div>

                  <div className="flex flex-col gap-3 text-sm text-muted-text font-sans border-t border-gray-100 pt-4">
                    {/* Registration info */}
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>
                        Registered under Medical Council of India &amp; Madhya Pradesh Medical Council.
                      </span>
                    </div>
                  </div>

                  {/* Dual CTA */}
                  <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-3">
                    <Link
                      href="/#book-appointment"
                      className="w-full sm:w-auto text-center px-5 py-2.5 bg-primary text-white font-semibold text-sm rounded-xl hover:bg-primary-dark shadow-soft hover:shadow-md transition-all duration-300"
                    >
                      Book Appointment
                    </Link>
                    <Link
                      href={`/doctors#${doctor.id}`}
                      className="w-full sm:w-auto text-center px-4 py-2.5 border border-gray-250 text-muted-text hover:text-primary hover:border-primary/30 font-semibold text-sm rounded-xl transition-all duration-300 group flex items-center justify-center gap-1.5"
                    >
                      <span>View full profile</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* What to Expect Callout */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="mt-20 bg-gradient-to-br from-[#F4F8FF] to-white border border-primary/10 rounded-3xl p-8 sm:p-10 shadow-soft max-w-5xl mx-auto relative overflow-hidden"
        >
          {/* Subtle decor blob */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-secondary/5 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="text-[10px] font-bold text-secondary-dark bg-secondary-dark/10 border border-secondary-dark/15 py-1 px-3 rounded-full uppercase tracking-wider font-sans">
                First Visit Guide
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-dark font-heading mt-3">
                What to expect at your child&apos;s first visit
              </h3>
              <p className="text-xs sm:text-sm text-muted-text font-sans mt-2">
                We believe in building a gentle, stress-free relationship with your little one. Here is how we ensure a welcoming first experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="flex flex-col gap-3.5 bg-white/70 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-base shrink-0 font-heading">
                  1
                </div>
                <h4 className="text-base font-bold text-primary-dark font-heading">
                  Gentle Welcoming
                </h4>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  We start with baseline screenings and vitals measurements without stress, letting your child adapt to the clinic space at their own pace.
                </p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-3.5 bg-white/70 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-secondary-dark/10 flex items-center justify-center text-secondary-dark font-bold text-base shrink-0 font-heading">
                  2
                </div>
                <h4 className="text-base font-bold text-primary-dark font-heading">
                  Unhurried Chat
                </h4>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  Enjoy a detailed consultation where we discuss growth, nutrition, and address all your parenting questions without any rush.
                </p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-3.5 bg-white/70 backdrop-blur-sm border border-white p-6 rounded-2xl shadow-xs">
                <div className="w-10 h-10 rounded-full bg-[#EAFBF7] flex items-center justify-center text-[#163C7A] font-bold text-base shrink-0 font-heading">
                  3
                </div>
                <h4 className="text-base font-bold text-primary-dark font-heading">
                  Clear Path Forward
                </h4>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  Leave with a written personalized care plan, tracking milestones and future vaccine guidelines tailored specifically for your child.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
