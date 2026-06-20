"use client";

import { useState } from "react";
import { Quote, ChevronLeft, ChevronRight, Play, FileCheck } from "lucide-react";

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      text: "Dr. Sudarshan and Dr. Manisha provided wonderful support during our NICU discharge. They explained the baby's feeding schedule and growth tracking parameters very clearly, which helped reduce our anxiety as first-time parents.",
      author: "Pooja Sharma",
      role: "Mother of 3-month-old baby, Bhopal",
    },
    {
      text: "The clinic's appointment scheduling is extremely efficient. We rarely have to wait more than 10 minutes, and the vaccination cold-chain transparency gives us absolute peace of mind. Highly recommend their care.",
      author: "Rajesh Verma",
      role: "Father of 1.5-year-old child, Neelbad",
    },
    {
      text: "Dr. Manisha's breastfeeding counseling sessions were incredibly helpful. She took the time to explain proper techniques and monitored our baby's weight-for-age chart to ensure everything was on track.",
      author: "Anjali Gupta",
      role: "Mother of 6-week-old newborn, Bhopal",
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-surface-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
            Testimonials
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Feedback from parents
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Real experiences shared by families who consult our pediatricians.
          </p>
        </div>

        {/* Carousel & Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-stretch">
          
          {/* Left Block: Video testimonial placeholder */}
          <div className="lg:col-span-5 bg-white border border-gray-150 rounded-3xl p-6 shadow-soft flex flex-col justify-center items-center relative overflow-hidden aspect-[4/3] lg:aspect-auto">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-50 z-0" />
            
            <div className="relative z-10 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all">
                <Play className="w-6 h-6 fill-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold font-heading text-primary-dark">Video Feedback Placeholder</span>
                <span className="text-xs text-muted-text font-sans mt-1">Available soon (Parent consent approved)</span>
              </div>
            </div>
          </div>

          {/* Right Block: Text Reviews Carousel */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-8 sm:p-10 shadow-soft flex flex-col justify-between relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/5 stroke-[1.5]" />
            
            <div className="relative z-10 flex-grow flex items-center">
              <div className="flex flex-col gap-6 text-left">
                <p className="text-base sm:text-lg text-gray-800 leading-relaxed font-sans italic">
                  &ldquo;{testimonials[activeIndex].text}&rdquo;
                </p>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold font-heading text-primary-dark">
                    {testimonials[activeIndex].author}
                  </span>
                  <span className="text-xs text-muted-text font-sans">
                    {testimonials[activeIndex].role}
                  </span>
                </div>
              </div>
            </div>

            {/* Navigation controls */}
            <div className="flex items-center justify-end gap-3 mt-8 border-t border-gray-50 pt-6">
              <button
                onClick={prevTestimonial}
                className="p-2 border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-xl transition-all"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-xl transition-all"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

          </div>

        </div>

        {/* Ethical Compliance Consent Note */}
        <div className="max-w-3xl mx-auto mt-8 p-4 bg-white/60 border border-gray-100 rounded-2xl flex items-start gap-2.5 text-[11px] text-muted-text leading-relaxed font-sans text-left">
          <FileCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
          <span>
            <strong>Consent Note:</strong> Testimonials are published with the express, written consent of the parents in accordance with the National Medical Commission (NMC) ethics guidelines and the Drugs &amp; Magic Remedies Act. Testimonials represent individual patient experiences and do not constitute a promise or guarantee of clinical treatment outcomes.
          </span>
        </div>

      </div>
    </section>
  );
}
