"use client";

import { motion, useReducedMotion, Variants } from "framer-motion";
import { Users, ShieldCheck, HeartHandshake, Clock, ThermometerSnowflake, BookOpen } from "lucide-react";

export default function WhyChoose() {
  const shouldReduceMotion = useReducedMotion();

  const benefits = [
    {
      icon: Users,
      title: "Dual Specialist Care",
      description: "Get the expertise of two senior pediatricians for your child's health concerns.",
      color: "bg-blue-50 text-primary border-blue-100",
    },
    {
      icon: ShieldCheck,
      title: "Neonatology Fellowship",
      description: "Advanced specialized qualifications for managing premature babies and critical newborn care.",
      color: "bg-teal-50 text-secondary border-teal-100",
    },
    {
      icon: HeartHandshake,
      title: "Child-Friendly Environment",
      description: "Designed with playful wall art and warm tones to minimize clinic anxiety for children.",
      color: "bg-orange-50 text-accent-coral border-orange-100",
    },
    {
      icon: Clock,
      title: "On-Time Consultations",
      description: "Strict scheduling structure to value your time and minimize waiting area crowding.",
      color: "bg-amber-50 text-accent-sunshine border-amber-100",
    },
    {
      icon: ThermometerSnowflake,
      title: "Cold-Chain Integrity",
      description: "WHO-compliant specialized refrigeration units ensuring vaccine efficacy and safety.",
      color: "bg-blue-50 text-blue-600 border-blue-100",
    },
    {
      icon: BookOpen,
      title: "Parent Guidance Focus",
      description: "Counseling sessions for breastfeeding support, developmental milestones, and child nutrition.",
      color: "bg-emerald-50 text-success border-emerald-100",
    },
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            Why Baby Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Dedicated pediatric care built on trust &amp; expertise
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            We combine high-level neonatal training with a welcoming, stress-free clinical environment to give your child the premium medical support they deserve.
          </p>
        </div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial={shouldReduceMotion ? "visible" : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group p-8 bg-white border border-gray-150 rounded-2xl shadow-soft hover:shadow-md hover:border-primary/20 transition-all duration-300 flex flex-col gap-4"
              >
                {/* Icon Container */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${benefit.color} shrink-0`}>
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
