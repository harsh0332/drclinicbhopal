"use client";

import Link from "next/link";
import { Compass, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import Star from "@/components/ui/decor/Star";

export default function MilestoneTeaser() {
  const shouldReduceMotion = useReducedMotion();

  const milestones = [
    {
      age: "2 Months",
      skills: ["Begins to smile at people", "Coos and makes gurgling sounds", "Holds head up when on tummy"],
      glowColor: "rgba(46, 108, 246, 0.08)"
    },
    {
      age: "6 Months",
      skills: ["Rolls over in both directions", "Responds to own name", "Begins to sit without support"],
      glowColor: "rgba(52, 199, 164, 0.08)"
    },
    {
      age: "12 Months",
      skills: ["Pulls up to stand and walks holding furniture", "Says basic words like 'mama'/'dada'", "Uses simple gestures like waving"],
      glowColor: "rgba(255, 197, 61, 0.08)"
    },
    {
      age: "18 Months",
      skills: ["Walks alone independently", "Points to show someone what they want", "Drinks from a cup & eats with spoon"],
      glowColor: "rgba(255, 138, 122, 0.08)"
    }
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const headerVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-36 bg-surface-tint">
      {/* Decorative pulsing star */}
      <div className="absolute left-[8%] top-[12%] opacity-[0.06] pointer-events-none hidden lg:block select-none">
        <Star className="w-12 h-12 fill-accent-sunshine animate-pulse" style={{ animationDuration: "3.5s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Heading */}
        <motion.div
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5 mx-auto text-center">
            <span className="text-xs font-bold text-secondary uppercase tracking-wider block">
              Watching them grow
            </span>
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto w-max">
              Development Tracker
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Tracking your child&apos;s developmental milestones
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Every child develops at their own pace, but tracking standard milestones helps screen for early support needs in motor, speech, and social skills.
          </p>
        </motion.div>

        {/* Milestones Grid */}
        <motion.div 
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
        >
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={shouldReduceMotion ? {} : { y: -5, boxShadow: `0 10px 25px ${milestone.glowColor}` }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="p-6 bg-white border border-gray-150 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col gap-4 text-left cursor-default"
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
            </motion.div>
          ))}
        </motion.div>

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

      {/* Clouds divider transitioning to white */}
      <SectionDivider
        type="clouds"
        position="bottom"
        colorClass="fill-white"
        className="absolute bottom-0 left-0 right-0 z-10"
      />
    </section>
  );
}
