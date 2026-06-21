"use client";

import { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";
import { 
  Calendar, 
  Printer, 
  ChevronRight, 
  FileText, 
  ShieldAlert, 
  ArrowLeft,
  Info
} from "lucide-react";

// IAP Aligned childhood immunization schedule data
interface VaccineScheduleItem {
  age: string;
  ageGroup: "infancy" | "toddler" | "school-adolescent";
  vaccines: string;
  diseases: string;
  type: string;
  notes: string;
}

const vaccineSchedule: VaccineScheduleItem[] = [
  {
    age: "At Birth",
    ageGroup: "infancy",
    vaccines: "BCG, OPV-0, Hep-B 1",
    diseases: "Tuberculosis, Polio, Hepatitis B",
    type: "Intradermal, Oral, Intramuscular",
    notes: "Must be administered within 24 hours of birth if possible."
  },
  {
    age: "6 Weeks",
    ageGroup: "infancy",
    vaccines: "Hexavalent-1 (DTwP-1, IPV-1, Hep-B 2, Hib-1), Rotavirus-1, PCV-1",
    diseases: "Diphtheria, Tetanus, Pertussis, Polio, Hep B, Hib, Rotavirus Diarrhea, Pneumococcal Meningitis/Pneumonia",
    type: "Intramuscular, Oral",
    notes: "Primary series begins. Combination shots reduce injection count."
  },
  {
    age: "10 Weeks",
    ageGroup: "infancy",
    vaccines: "DTwP-2, IPV-2, Hib-2, Hep-B 3, Rotavirus-2, PCV-2",
    diseases: "Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B, Rotavirus, Pneumococcal",
    type: "Intramuscular, Oral",
    notes: "Second primary dose. Can use DTaP (painless) after pediatrician discussion."
  },
  {
    age: "14 Weeks",
    ageGroup: "infancy",
    vaccines: "DTwP-3, IPV-3, Hib-3, Hep-B 4, Rotavirus-3, PCV-3",
    diseases: "Diphtheria, Tetanus, Pertussis, Polio, Hib, Hep B, Rotavirus, Pneumococcal",
    type: "Intramuscular, Oral",
    notes: "Completes the initial primary 3-dose vaccine series."
  },
  {
    age: "6 Months",
    ageGroup: "infancy",
    vaccines: "Influenza-1, Typhoid Conjugate Vaccine",
    diseases: "Seasonal Influenza (Flu), Typhoid Fever",
    type: "Intramuscular",
    notes: "Influenza requires a second dose 4 weeks later for first-timers."
  },
  {
    age: "7 Months",
    ageGroup: "infancy",
    vaccines: "Influenza-2",
    diseases: "Seasonal Influenza (Flu)",
    type: "Intramuscular",
    notes: "Booster dose for seasonal flu protection."
  },
  {
    age: "9 Months",
    ageGroup: "infancy",
    vaccines: "MMR-1, OPV-1",
    diseases: "Measles, Mumps, Rubella, Polio booster",
    type: "Subcutaneous, Oral",
    notes: "Highly critical milestone. Protects against core viral infections."
  },
  {
    age: "12 Months",
    ageGroup: "toddler",
    vaccines: "Hepatitis A-1",
    diseases: "Hepatitis A (Liver Infection)",
    type: "Intramuscular",
    notes: "Single dose is sufficient if live vaccine is chosen."
  },
  {
    age: "15 Months",
    ageGroup: "toddler",
    vaccines: "MMR-2, Varicella-1, PCV Booster",
    diseases: "Measles, Mumps, Rubella, Chickenpox, Pneumococcal Booster",
    type: "Subcutaneous, Intramuscular",
    notes: "Ensures long-term community immunity and cellular safety."
  },
  {
    age: "18 Months",
    ageGroup: "toddler",
    vaccines: "DTwP/DTaP Booster-1, IPV Booster-1, Hib Booster-1, Varicella-2",
    diseases: "Diphtheria, Tetanus, Pertussis, Polio, Hib, Chickenpox Booster",
    type: "Intramuscular, Subcutaneous",
    notes: "Maintains high antibody counts during early toddler socialization."
  },
  {
    age: "2 Years (24m)",
    ageGroup: "toddler",
    vaccines: "Hepatitis A-2",
    diseases: "Hepatitis A Booster",
    type: "Intramuscular",
    notes: "Required only if inactivated Hepatitis A vaccine was administered at 12m."
  },
  {
    age: "4 – 6 Years",
    ageGroup: "school-adolescent",
    vaccines: "DTwP/DTaP Booster-2, OPV-2, MMR-3, Varicella Booster (Optional)",
    diseases: "Diphtheria, Tetanus, Pertussis, Polio, Measles, Mumps, Rubella, Chickenpox",
    type: "Intramuscular, Oral",
    notes: "School entry boosters. Verifying this card is standard for admissions."
  },
  {
    age: "10 – 12 Years",
    ageGroup: "school-adolescent",
    vaccines: "Tdap, HPV (2 Doses)",
    diseases: "Tetanus, Reduced Diphtheria & Pertussis, Cervical Cancer/HPV Diseases",
    type: "Intramuscular",
    notes: "HPV vaccine is strongly recommended for adolescent girls (9-14y: 2 doses; 15y+: 3 doses)."
  },
  {
    age: "15 – 18 Years",
    ageGroup: "school-adolescent",
    vaccines: "Td",
    diseases: "Tetanus, Diphtheria",
    type: "Intramuscular",
    notes: "Decennial (10-yearly) booster starts here. Crucial for wound tetanus safety."
  }
];

export default function VaccinationSchedulePage() {
  const [filter, setFilter] = useState<"all" | "infancy" | "toddler" | "school-adolescent">("all");

  const filteredSchedule = vaccineSchedule.filter(
    (item) => filter === "all" || item.ageGroup === filter
  );

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Parent Tools", item: "/tools" },
    { name: "Vaccination Schedule", item: "/tools/vaccination-schedule" }
  ]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header - Hidden on Print */}
      <section className="bg-surface-tint border-b border-gray-100 py-10 print:hidden relative overflow-hidden">
        {/* Background SVGs */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[30%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline w-max"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to home</span>
            </Link>
            
            <span className="text-[10px] font-bold text-primary bg-white border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider w-max">
              Parent Utility Tool
            </span>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Childhood Vaccination Schedule
            </h1>
            
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Interactive, IAP-aligned (Indian Academy of Pediatrics) immunization tracker for children from birth up to 18 years. Check milestones and print for records.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Printable Document Header (Only visible when printing) */}
          <div className="hidden print:block text-left border-b-2 border-primary-dark pb-6 mb-8 font-sans">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-2xl font-bold text-primary-dark font-heading leading-none">
                  BABY STEPS
                </div>
                <p className="text-xs text-primary font-semibold tracking-wider uppercase mt-1">
                  Newborn &amp; Child Clinic
                </p>
                <p className="text-[10px] text-muted-text mt-2 max-w-sm">
                  {siteConfig.address}
                </p>
              </div>
              <div className="text-right text-[10px] text-muted-text">
                <p className="font-semibold text-gray-900">Dr. Sudarshan Dev Arya</p>
                <p className="font-semibold text-gray-900">Dr. Manisha Bangarwa Arya</p>
                <p className="mt-1">Reg No: MP-42113 / MP-9230</p>
                <p className="mt-1">Phone: +91 {siteConfig.phone}</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-base font-bold uppercase tracking-wider text-gray-800">
                Childhood Immunization Record Schedule
              </h2>
              <p className="text-[10px] text-muted-text mt-0.5">
                Aligned with Indian Academy of Pediatrics (IAP) Guidelines
              </p>
            </div>
          </div>

          {/* Interactive Controls - Hidden on Print */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white border border-gray-150 p-4 rounded-2xl shadow-soft print:hidden">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => setFilter("all")}
                className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  filter === "all"
                    ? "bg-primary text-white"
                    : "bg-surface-tint text-primary-dark border border-primary/5 hover:bg-blue-100/50"
                }`}
              >
                All Ages
              </button>
              <button
                onClick={() => setFilter("infancy")}
                className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  filter === "infancy"
                    ? "bg-primary text-white"
                    : "bg-surface-tint text-primary-dark border border-primary/5 hover:bg-blue-100/50"
                }`}
              >
                Infancy (0-1y)
              </button>
              <button
                onClick={() => setFilter("toddler")}
                className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  filter === "toddler"
                    ? "bg-primary text-white"
                    : "bg-surface-tint text-primary-dark border border-primary/5 hover:bg-blue-100/50"
                }`}
              >
                Toddler (1-3y)
              </button>
              <button
                onClick={() => setFilter("school-adolescent")}
                className={`text-xs font-semibold py-2 px-4 rounded-xl transition-all cursor-pointer ${
                  filter === "school-adolescent"
                    ? "bg-primary text-white"
                    : "bg-surface-tint text-primary-dark border border-primary/5 hover:bg-blue-100/50"
                }`}
              >
                Adolescent (4-18y)
              </button>
            </div>

            {/* Print Action */}
            <button
              onClick={handlePrint}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-gray-250 hover:border-primary/20 text-muted-text hover:text-primary text-xs font-semibold py-2.5 px-4 rounded-xl transition-all cursor-pointer bg-white"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
          </div>

          {/* Interactive Schedule Table */}
          <div className="bg-white border border-gray-150 rounded-3xl shadow-soft overflow-hidden print:shadow-none print:border-none">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px] print:min-w-full">
                <thead>
                  <tr className="bg-surface-tint border-b border-gray-150 print:bg-gray-50 print:border-b-2 print:border-gray-300">
                    <th className="py-4 px-6 text-xs font-bold text-primary-dark uppercase tracking-wider w-[12%]">
                      Age
                    </th>
                    <th className="py-4 px-6 text-xs font-bold text-primary-dark uppercase tracking-wider w-[35%]">
                      Vaccines Recommended
                    </th>
                    <th className="py-4 px-6 text-xs font-bold text-primary-dark uppercase tracking-wider w-[30%]">
                      Protects Against
                    </th>
                    <th className="py-4 px-6 text-xs font-bold text-primary-dark uppercase tracking-wider w-[23%]">
                      Clinical Notes
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 print:divide-y print:divide-gray-300">
                  {filteredSchedule.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className="hover:bg-gray-50/50 transition-colors print:hover:bg-transparent page-break-inside-avoid"
                    >
                      <td className="py-4.5 px-6 align-top">
                        <span className="text-xs font-bold text-primary-dark font-heading block mt-0.5">
                          {item.age}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 align-top">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs font-semibold text-gray-900 leading-relaxed">
                            {item.vaccines}
                          </span>
                          <span className="text-[10px] text-muted-text font-mono">
                            Route: {item.type}
                          </span>
                        </div>
                      </td>
                      <td className="py-4.5 px-6 align-top text-xs text-muted-text font-sans leading-relaxed">
                        {item.diseases}
                      </td>
                      <td className="py-4.5 px-6 align-top text-[11px] text-muted-text font-sans leading-relaxed">
                        {item.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Guidelines info block */}
          <div className="max-w-4xl mx-auto mt-10 p-5 bg-surface-tint border border-primary/5 rounded-2xl text-left flex gap-3 text-xs text-muted-text leading-relaxed font-sans print:hidden">
            <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div>
              <strong className="text-primary-dark font-heading block mb-1">Vaccination Safety &amp; Scheduling</strong>
              <p>Immunizations can be given within a grace window if milestones are missed. Our clinic follows strict Catch-up Immunization Protocols designed by the IAP to ensure children who miss doses can still build full immunity safely. Do not skip doses due to minor cold or cough symptoms unless directed by our pediatrician.</p>
            </div>
          </div>

          {/* Legal Medical Disclaimer Panel */}
          <div className="max-w-4xl mx-auto mt-6 p-5 bg-red-50/40 border border-red-100 rounded-2xl text-left flex gap-3 text-xs text-muted-text leading-relaxed font-sans print:mt-12 print:bg-white print:border-t print:border-gray-300">
            <ShieldAlert className="w-5 h-5 text-emergency shrink-0 mt-0.5 print:text-gray-600" />
            <div>
              <strong className="text-primary-dark font-heading block mb-1 print:text-gray-800">
                Informational Medical Disclaimer
              </strong>
              <p>This immunization schedule is an informational screening and education utility only. It does NOT constitute individual medical advice, clinical prescription, or diagnostic recommendations. Vaccine requirements can vary based on your child&apos;s health status, previous doses, and specific manufacturer availability. Always confirm your child&apos;s specific schedule and vaccine brands with our pediatricians during consultation.</p>
              <p className="mt-2 font-semibold text-gray-900 print:text-gray-700">
                {siteConfig.compliance.medicalRegistration}
              </p>
            </div>
          </div>

          {/* Call to Action - Hidden on Print */}
          <div className="max-w-3xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-12 flex flex-col items-center gap-4 print:hidden">
            <h3 className="text-lg font-bold font-heading text-primary-dark">
              Schedule Your Child&apos;s Next Dose
            </h3>
            <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              We maintain continuous WHO-compliant cold-chain logs to guarantee vaccine quality. Request a vaccination slot online.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 mt-2 w-full sm:w-auto">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold py-3.5 px-6 rounded-xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98] cursor-pointer"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Vaccination Slot</span>
              </Link>
              <a
                href={siteConfig.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-3.5 px-6 rounded-xl hover:bg-[#128C7E] transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4 fill-white text-white" />
                <span>Inquire via WhatsApp</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
