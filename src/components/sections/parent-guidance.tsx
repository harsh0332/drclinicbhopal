"use client";

import Link from "next/link";
import { BookOpen, Sparkles, HeartHandshake, HelpCircle } from "lucide-react";

export default function ParentGuidance() {
  const guides = [
    {
      topic: "Breastfeeding Support",
      info: "Latch techniques, feeds frequency, and identifying if baby is receiving sufficient milk.",
      tag: "Nutrition"
    },
    {
      topic: "Newborn Care Basics",
      info: "Umbilical cord care hygiene, safe sponge baths, and identification of warning signs.",
      tag: "Infant Care"
    },
    {
      topic: "Healthy Sleep Environment",
      info: "Back-sleeping recommendations to reduce SIDS risk, swaddling guidance, and night feeds routine.",
      tag: "Safety"
    },
    {
      topic: "Infant Jaundice",
      info: "Understanding normal physiological jaundice vs. medical conditions requiring clinical phototherapy.",
      tag: "Medical"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Grid of Guides */}
          <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-150 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col gap-3 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary bg-surface-tint border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider">
                    {guide.tag}
                  </span>
                  <HelpCircle className="w-4 h-4 text-muted-text/30" />
                </div>
                <h3 className="text-base font-bold font-heading text-primary-dark">
                  {guide.topic}
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  {guide.info}
                </p>
              </div>
            ))}
          </div>

          {/* Right Block: Content */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex flex-col gap-6 text-center lg:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto lg:mx-0 w-max">
              Parent Resources
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Educational Guidance for New Parents
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              Bringing home a newborn comes with questions. We provide evidence-based, medically safe counseling to help you navigate feeding, sleep, and safety without anxiety.
            </p>

            <div className="flex flex-col gap-4 text-sm text-muted-text font-sans">
              <div className="flex items-start gap-3 text-left">
                <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>
                  No medical jargon or unverified home cures. Only factual guidelines from pediatric medical journals.
                </span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <HeartHandshake className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <span>
                  Support groups and lactation guidance scheduled in-clinic.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/blog"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <BookOpen className="w-4.5 h-4.5" />
                <span>Read Parent Guide Blog</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
