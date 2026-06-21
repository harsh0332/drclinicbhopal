"use client";

import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { GraduationCap, Award, Building, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
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
    <section id="doctors" className="relative overflow-hidden pt-28 pb-32 bg-surface-tint">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
        position="top"
        colorClass="fill-surface-tint"
        className="absolute top-0 left-0 right-0 z-10"
      />

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
            Our Doctors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Meet our pediatric specialists
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Our clinic is led by fully registered and credentialed pediatricians holding advanced qualifications from premier institutions in India and the USA.
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
                whileHover={hoverLift(shouldReduceMotion, -6, { boxShadow: "0 15px 35px rgba(22, 60, 122, 0.08)" })}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group bg-white border border-gray-150 rounded-3xl shadow-soft transition-all duration-300 overflow-hidden flex flex-col h-full cursor-default"
              >
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
                    <span className="text-xs font-bold text-secondary uppercase tracking-wider">
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
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-secondary/5 border border-secondary/15 text-secondary rounded-full text-xs font-semibold font-sans">
                        <Building className="w-3.5 h-3.5" />
                        <span>{doctor.hospital}</span>
                      </div>
                    </div>
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

      </div>

      {/* Bottom Wave Divider */}
      <SectionDivider
        type="wave"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
