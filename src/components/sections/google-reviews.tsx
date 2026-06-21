"use client";

import { siteConfig } from "@/lib/site-config";
import { Star, MessageSquare, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { 
  fadeRise, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function GoogleReviews() {
  const shouldReduceMotion = useReducedMotion();
  const showGoogleRating = siteConfig.showGoogleRating;

  return (
    <section className="py-16 bg-transparent relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="max-w-4xl mx-auto bg-white border border-gray-150 rounded-3xl p-8 sm:p-10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
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
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  Share your honest experience
                </h3>
                <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                  Help local parents in Neelbad &amp; South Bhopal find expert pediatric care. If you have visited our clinic, please consider sharing your feedback on Google Maps.
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
