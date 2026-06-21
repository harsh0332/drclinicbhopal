"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ClinicImage from "@/components/ui/clinic-image";
import SectionDivider from "@/components/ui/decor/SectionDivider";
import { 
  fadeRise, 
  staggerContainer, 
  getInitial, 
  viewportOnce 
} from "@/lib/motion";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const faqs = [
    {
      q: "What are the clinic timings and consultation hours?",
      a: `Our standard consultation hours are Monday to Saturday: 10:00 AM – 1:00 PM and 5:00 PM – 8:00 PM. On Sundays, the clinic is closed for routine visits but remains available for emergency pediatric consultations. Appointments are recommended to minimize waiting area crowding.`
    },
    {
      q: "Do I need to book a prior appointment for childhood vaccinations?",
      a: "Yes, we schedule vaccination appointments in advance to ensure the vaccine doses are pre-verified, and to maintain proper separation of healthy vaccination visits from child wellness checkups. You can schedule by calling the clinic or messaging via WhatsApp."
    },
    {
      q: "What vaccine storage standards are followed at the clinic?",
      a: "We maintain strict WHO-compliant vaccine cold-chain protocols. Our vaccines are stored in specialized medical-grade refrigerators with continuous temperature logs. This maintains vaccine safety, quality, and efficacy from arrival to administration."
    },
    {
      q: "With which local hospitals are the clinic's pediatricians associated?",
      a: `Our senior pediatricians hold consultant positions at premier tertiary care hospitals in Bhopal. Dr. Sudarshan Dev Arya is a Consultant at Rainbow Children's Hospital, and Dr. Manisha Bangarwa Arya is a Consultant at Apollo SAGE Hospital. This ensures smooth referral pathways if advanced tertiary care is required.`
    },
    {
      q: "What should I bring for my newborn's first wellness visit?",
      a: "Please bring the baby's hospital birth certificate, discharge summary papers from the delivery hospital, maternal health reports, and any vaccination card or immunization booklet issued at birth. These documents help our doctors establish an accurate clinical baseline."
    },
    {
      q: "Do the doctors offer emergency pediatric support?",
      a: "We provide emergency triage guidance and child care during clinic hours. For late-night pediatric emergencies or critical newborn distress, we recommend proceeding directly to the pediatric emergency rooms of associated hospitals (Rainbow Children's Hospital or Apollo SAGE Hospital) where active care is available."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <section id="faqs" className="relative overflow-hidden pt-28 pb-32 bg-transparent">
      {/* Top Clouds Divider */}
      <SectionDivider
        type="clouds"
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
            FAQ
          </span>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
              Frequently asked questions
            </h2>
            <div className="relative w-12 h-12 shrink-0 animate-bounce" style={{ animationDuration: "3s" }}>
              <ClinicImage
                src="/images/illustrations/mascot.webp"
                alt="Clinic mascot bear"
                fill
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Clear, pediatrician-approved answers to help you navigate your child&apos;s visits and care.
          </p>
        </motion.div>

        {/* FAQs Dual Column Layout */}
        <motion.div 
          variants={staggerContainer}
          initial={getInitial(shouldReduceMotion)}
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto items-start"
        >
          {/* Left Block: FAQ Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4 w-full">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={index}
                  variants={fadeRise}
                  className={`bg-white border rounded-2xl shadow-soft overflow-hidden transition-all duration-300 ${
                    isOpen ? "border-primary/45 ring-1 ring-primary/5" : "border-gray-150"
                  }`}
                >
                  {/* Accordion Trigger */}
                  <button
                    id={`home-faq-btn-${index}`}
                    onClick={() => toggleFAQ(index)}
                    aria-expanded={isOpen}
                    aria-controls={`home-faq-answer-${index}`}
                    className={`w-full flex items-center justify-between p-6 text-left gap-4 transition-colors duration-250 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-2xl ${
                      isOpen ? "bg-surface-tint/20" : "hover:bg-surface-tint/25"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-sm sm:text-base font-bold font-heading text-primary-dark transition-colors duration-300">
                        {faq.q}
                      </span>
                    </div>
                    <div className="p-1 rounded-lg border border-gray-100 bg-white shrink-0 text-muted-text">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Accordion Content with AnimatePresence */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div
                          id={`home-faq-answer-${index}`}
                          role="region"
                          aria-labelledby={`home-faq-btn-${index}`}
                          className="px-6 pb-6 pt-2 border-t border-gray-50 text-xs sm:text-sm text-muted-text font-sans leading-relaxed text-left"
                        >
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Right Block: Cute Illustration */}
          <motion.div 
            variants={fadeRise}
            className="lg:col-span-5 relative aspect-[4/3] rounded-3xl overflow-hidden border border-gray-150 shadow-soft bg-surface-tint hidden lg:block sticky top-24"
          >
            <ClinicImage
              src="/images/illustrations/doctor-baby.webp"
              alt="Pediatrician consulting baby - Baby Steps Neelbad Bhopal"
              fill
              className="object-cover"
            />
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
