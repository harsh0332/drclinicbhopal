"use client";

import Link from "next/link";
import { Compass, CheckCircle2 } from "lucide-react";

export default function MilestoneTeaser() {
  const milestones = [
    {
      age: "2 Months",
      skills: ["Begins to smile at people", "Coos and makes gurgling sounds", "Holds head up when on tummy"]
    },
    {
      age: "6 Months",
      skills: ["Rolls over in both directions", "Responds to own name", "Begins to sit without support"]
    },
    {
      age: "12 Months",
      skills: ["Pulls up to stand and walks holding furniture", "Says basic words like 'mama'/'dada'", "Uses simple gestures like waving"]
    },
    {
      age: "18 Months",
      skills: ["Walks alone independently", "Points to show someone what they want", "Drinks from a cup & eats with spoon"]
    }
  ];

  return (
    <section className="py-20 bg-surface-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
            Development Tracker
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Tracking your child&apos;s developmental milestones
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Every child develops at their own pace, but tracking standard milestones helps screen for early support needs in motor, speech, and social skills.
          </p>
        </div>

        {/* Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="p-6 bg-white border border-gray-150 rounded-2xl shadow-soft hover:shadow-md transition-all duration-350 flex flex-col gap-4 text-left"
            >
              <h3 className="text-lg font-bold font-heading text-primary border-b border-gray-50 pb-2 flex items-center justify-between">
                <span>{milestone.age}</span>
                <span className="w-2.5 h-2.5 rounded-full bg-secondary" />
              </h3>
              <ul className="flex flex-col gap-2.5 flex-grow">
                {milestone.skills.map((skill, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-2 text-xs text-muted-text font-sans leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Milestone Advice CTA */}
        <div className="text-center mt-12">
          <Link
            href="/tools/milestone-tracker"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
          >
            <Compass className="w-4.5 h-4.5" />
            <span>Open Milestone Tracker Tool</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
