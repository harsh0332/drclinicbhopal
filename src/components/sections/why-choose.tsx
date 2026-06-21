"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Users, ShieldCheck, HeartHandshake, Clock, ThermometerSnowflake, BookOpen } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import Star from "@/components/ui/decor/Star";
import { 
  fadeRise, 
  cardRise, 
  staggerContainer, 
  hoverLift, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function WhyChoose() {
  const shouldReduceMotion = useReducedMotion();

  const benefits = [
    {
      icon: Users,
      title: "Dual Specialist Care",
      description: "Get the expertise of two senior pediatricians for your child's health concerns.",
      color: "bg-blue-50/50 text-primary border-blue-100/70",
      glowColor: "rgba(46, 108, 246, 0.08)",
      borderColor: "rgba(46, 108, 246, 0.2)"
    },
    {
      icon: ShieldCheck,
      title: "Neonatology Fellowship",
      description: "Advanced specialized qualifications for managing premature babies and critical newborn care.",
      color: "bg-teal-50/50 text-secondary border-teal-100/70",
      glowColor: "rgba(52, 199, 164, 0.08)",
      borderColor: "rgba(52, 199, 164, 0.2)"
    },
    {
      icon: HeartHandshake,
      title: "Child-Friendly Environment",
      description: "Designed with playful wall art and warm tones to minimize clinic anxiety for children.",
      color: "bg-orange-50/50 text-accent-coral border-orange-100/70",
      glowColor: "rgba(255, 138, 122, 0.08)",
      borderColor: "rgba(255, 138, 122, 0.2)"
    },
    {
      icon: Clock,
      title: "On-Time Consultations",
      description: "Strict scheduling structure to value your time and minimize waiting area crowding.",
      color: "bg-amber-50/50 text-accent-sunshine border-amber-100/70",
      glowColor: "rgba(255, 197, 61, 0.08)",
      borderColor: "rgba(255, 197, 61, 0.2)"
    },
    {
      icon: ThermometerSnowflake,
      title: "Cold-Chain Integrity",
      description: "WHO-compliant specialized refrigeration units ensuring vaccine efficacy and safety.",
      color: "bg-blue-50/50 text-blue-600 border-blue-100/70",
      glowColor: "rgba(46, 108, 246, 0.08)",
      borderColor: "rgba(46, 108, 246, 0.2)"
    },
    {
      icon: BookOpen,
      title: "Parent Guidance Focus",
      description: "Counseling sessions for breastfeeding support, developmental milestones, and child nutrition.",
      color: "bg-emerald-50/50 text-success border-emerald-100/70",
      glowColor: "rgba(47, 184, 107, 0.08)",
      borderColor: "rgba(47, 184, 107, 0.2)"
    },
  ];


  return (
    <section id="about" className="relative overflow-hidden py-24 bg-white">
      {/* Decorative Cloud */}
      <div className="absolute left-[-4%] top-[8%] opacity-[0.04] pointer-events-none hidden lg:block select-none">
        <Cloud className="w-56 h-36 fill-primary" />
      </div>

      {/* Decorative Star */}
      <div className="absolute right-[5%] bottom-[12%] opacity-[0.06] pointer-events-none hidden lg:block select-none">
        <Star className="w-14 h-14 fill-accent-sunshine animate-pulse" style={{ animationDuration: "4s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          variants={fadeRise}
          className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4"
        >
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            Why Baby Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Dedicated pediatric care built on trust &amp; expertise
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            We combine high-level neonatal training with a welcoming, stress-free clinical environment to give your child the premium medical support they deserve.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardRise}
                whileHover={hoverLift(shouldReduceMotion, -6, { boxShadow: `0 12px 30px ${benefit.glowColor}`, borderColor: benefit.borderColor })}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="group p-8 bg-white border border-gray-150 rounded-2xl shadow-soft hover:border-primary/20 transition-all duration-300 flex flex-col gap-4 cursor-default"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${benefit.color} shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="w-5 h-5 stroke-[2]" />
                </div>
                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-heading font-semibold text-primary-dark group-hover:text-primary transition-colors">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-text font-sans leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
