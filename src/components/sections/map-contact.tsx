"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import { 
  fadeRise, 
  cardRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function MapContact() {
  const shouldReduceMotion = useReducedMotion();
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-transparent">
      {/* Top Wave Divider */}
      <SectionDivider
        type="wave"
        position="top"
        colorClass="fill-white"
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
            Contact &amp; Location
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Find our clinic in Neelbad
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Locate us easily near Durga Mata Mandir. Open six days a week for pediatric care.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-6xl mx-auto items-stretch"
        >
          
          {/* Left Block: Map Embed */}
          <motion.div 
            ref={mapRef}
            variants={cardRise}
            className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft flex flex-col min-h-[380px]"
          >
            <div className="relative w-full flex-grow min-h-[300px] bg-surface-tint">
              {shouldLoadMap ? (
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.272378278338!2d77.34782957593083!3d23.196742209804935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c5d6345e3a901%3A0xa317090ce42385e2!2sBaby%20Steps%20Newborn%20%26%20Child%20Clinic!5e0!3m2!1sen!2sin!4v1784411102327!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="Baby Steps Clinic Google Map Location"
                  className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-350"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-xs text-muted-text font-sans">
                  Loading interactive clinic map...
                </div>
              )}
            </div>
            <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between text-xs font-sans">
              <span className="text-muted-text">Having trouble viewing the map?</span>
              <a
                href={siteConfig.googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline min-h-[44px] flex items-center"
              >
                Open in Google Maps &rarr;
              </a>
            </div>
          </motion.div>

          {/* Right Block: Details & Hours */}
          <motion.div 
            variants={cardRise}
            className="lg:col-span-5 bg-white border border-gray-150 p-8 sm:p-10 rounded-3xl shadow-soft flex flex-col justify-between gap-8 text-left"
          >
            {/* Contact NAP Details */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-3">
                Clinic Details (NAP)
              </h3>
              
              <ul className="flex flex-col gap-3 text-sm text-muted-text font-sans">
                <li className="flex items-start gap-3 p-2 -mx-2 rounded-xl hover:bg-surface-tint/50 transition-colors duration-200">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-gray-900 block mb-0.5">Clinic Address:</span>
                    <span>{siteConfig.address}</span>
                  </div>
                </li>
                
                <li className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-surface-tint/50 transition-colors duration-200">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 block mb-0.5">Phone Consultation:</span>
                    <a href={siteConfig.phoneLink} className="hover:text-primary transition-colors font-semibold text-gray-950">
                      +91 {siteConfig.phone}
                    </a>
                  </div>
                </li>

                <li className="flex items-center gap-3 p-2 -mx-2 rounded-xl hover:bg-surface-tint/50 transition-colors duration-200">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-900 block mb-0.5">Email Support:</span>
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                      {siteConfig.email}
                    </a>
                  </div>
                </li>
              </ul>
              <div className="text-[11px] text-muted-text font-sans border-t border-gray-100 pt-3 mt-3 leading-relaxed">
                {siteConfig.napString}
              </div>
            </div>

            {/* Hours Details */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <h3 className="text-xl font-bold font-heading text-primary-dark flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span>Consultation Hours</span>
              </h3>
              
              <ul className="flex flex-col gap-3 text-sm text-muted-text font-sans">
                {siteConfig.hours.map((hour, idx) => (
                  <li key={idx} className="flex justify-between border-b border-gray-50 pb-2 last:border-b-0 last:pb-0 p-1">
                    <span className="font-semibold text-gray-900">{hour.days}</span>
                    <span>{hour.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Emergency note */}
            <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-muted-text leading-relaxed font-sans mt-auto">
              <ShieldAlert className="w-4 h-4 text-emergency shrink-0 mt-0.5" />
              <span>
                <strong>Emergencies:</strong> If your child is in acute distress outside of consultation hours, proceed to the nearest pediatric emergency care unit at associated hospitals immediately.
              </span>
            </div>

          </motion.div>

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
