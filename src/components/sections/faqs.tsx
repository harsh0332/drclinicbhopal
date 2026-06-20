"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
    <section id="faqs" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
          <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
            Frequently asked questions
          </h2>
          <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
            Factual information regarding appointments, vaccine protocols, and pediatric consultations.
          </p>
        </div>

        {/* FAQs List */}
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white border border-gray-150 rounded-2xl shadow-soft overflow-hidden transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left gap-4 hover:bg-surface-tint/25 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="text-sm sm:text-base font-bold font-heading text-primary-dark">
                      {faq.q}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg border border-gray-100 bg-white shrink-0 text-muted-text">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Accordion Content */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-gray-50 text-xs sm:text-sm text-muted-text font-sans leading-relaxed text-left animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
