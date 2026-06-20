"use client";

import { siteConfig } from "@/lib/site-config";
import { Star, MessageSquare, MapPin } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

export default function GoogleReviews() {
  const shouldReduceMotion = useReducedMotion();
  const showGoogleRating = siteConfig.showGoogleRating;

  const revealVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section className="py-16 bg-white border-y border-gray-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={revealVariants}
          className="max-w-4xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 sm:p-10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          {showGoogleRating ? (
            <>
              {/* Active Rating Stats Group */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-accent-sunshine fill-accent-sunshine" />
                  ))}
                </div>
                <h3 className="text-xl font-bold font-heading text-primary-dark">
                  5.0 Rating on Google Reviews
                </h3>
                <p className="text-xs text-muted-text font-sans">
                  Based on recent reviews from families in Neelbad, Bhopal
                </p>
              </div>

              {/* Active CTA Block */}
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Leave a Google Review</span>
                </a>
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <span>Read all reviews</span>
                </a>
              </div>
            </>
          ) : (
            <>
              {/* Coming Soon / Honest Feedback Request */}
              <div className="flex flex-col gap-2 max-w-xl">
                <div className="flex items-center justify-center md:justify-start gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-sunshine/40 fill-transparent stroke-[1.8]" />
                  ))}
                </div>
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  Feedback helps other families
                </h3>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  Help local parents in Neelbad & South Bhopal find expert pediatric care. If you have visited our clinic, please consider sharing your honest experience.
                </p>
              </div>

              {/* Fallback CTA Block */}
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl hover:bg-primary-dark shadow-sm transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Write a Review</span>
                </a>
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-250 text-muted-text hover:text-primary hover:border-primary/20 text-xs sm:text-sm font-semibold py-3 px-5 rounded-xl hover:bg-gray-50 transition-all active:scale-[0.98] cursor-pointer"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Find us on Maps</span>
                </a>
              </div>
            </>
          )}
        </motion.div>

      </div>
    </section>
  );
}
