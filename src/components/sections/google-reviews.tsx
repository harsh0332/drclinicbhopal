"use client";

import { siteConfig } from "@/lib/site-config";
import { Star, MessageSquare } from "lucide-react";

export default function GoogleReviews() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-4xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 sm:p-10 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* Stats Group */}
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

          {/* CTA Block */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
            <a
              href={siteConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Leave a Google Review</span>
            </a>
            <a
              href={siteConfig.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
            >
              <span>Read all reviews</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
