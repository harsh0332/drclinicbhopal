"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  faqs: FAQItem[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-gray-150 rounded-xl overflow-hidden transition-all duration-300 bg-white"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex items-center justify-between p-5 text-left gap-4 hover:bg-surface-tint/20 transition-colors"
            >
              <span className="text-sm sm:text-base font-bold font-heading text-primary-dark flex items-center gap-2">
                <HelpCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>{faq.q}</span>
              </span>
              <ChevronDown className={`w-4 h-4 text-muted-text transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-gray-50 text-xs sm:text-sm text-muted-text font-sans leading-relaxed text-left animate-in fade-in duration-200">
                {faq.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
