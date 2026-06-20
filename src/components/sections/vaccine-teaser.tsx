"use client";

import Link from "next/link";
import { ShieldCheck, Calendar, ThermometerSnowflake } from "lucide-react";

export default function VaccineTeaser() {
  const milestones = [
    { age: "At Birth", vaccines: "BCG, OPV-0, Hep-B 1", note: "Essential initial protection" },
    { age: "6 Weeks", vaccines: "Hexavalent (DTwP-1, IPV-1, Hep-B 2, Hib-1), Rotavirus-1, PCV-1", note: "Primary series start" },
    { age: "10 Weeks", vaccines: "DTwP-2, IPV-2, Hib-2, Hep-B 3, Rotavirus-2, PCV-2", note: "Secondary protection booster" },
    { age: "14 Weeks", vaccines: "DTwP-3, IPV-3, Hib-3, Hep-B 4, Rotavirus-3, PCV-3", note: "Primary series completion" },
    { age: "6 Months", vaccines: "Influenza-1, Typhoid Conjugate Vaccine", note: "Seasonal protection start" },
    { age: "9 Months", vaccines: "MMR-1 (Measles, Mumps, Rubella)", note: "Core viral immunization" }
  ];

  return (
    <section className="py-20 bg-surface-tint">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Block: Description */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white/80 border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto lg:mx-0 w-max">
              Immunization Schedule
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              IAP-Aligned Vaccination Timeline
            </h2>
            <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
              We follow the official immunization schedule recommended by the <strong className="text-gray-900 font-medium">Indian Academy of Pediatrics (IAP)</strong>. Proper vaccination ensures high-efficacy protection against critical childhood illnesses.
            </p>

            {/* Factual Highlight List */}
            <div className="flex flex-col gap-4 text-sm text-muted-text font-sans">
              <div className="flex items-start gap-3 text-left">
                <ThermometerSnowflake className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-900 font-medium">WHO Cold-Chain Standards:</strong> Real-time temperature logs monitor our storage to maintain vaccine potency.
                </span>
              </div>
              <div className="flex items-start gap-3 text-left">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>
                  <strong className="text-gray-900 font-medium">Safety-First Protocols:</strong> Factual counseling on potential post-vaccine symptoms (like mild fever) before administration.
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/tools/vaccination-schedule"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-8 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>View Complete Schedule</span>
              </Link>
            </div>
          </div>

          {/* Right Block: Preview Timeline */}
          <div className="lg:col-span-7 bg-white border border-gray-150 p-6 sm:p-8 rounded-3xl shadow-soft">
            <h3 className="text-lg font-bold font-heading text-primary-dark mb-6 border-b border-gray-100 pb-3">
              Early Childhood Schedule Preview (IAP Recommendations)
            </h3>

            <div className="flex flex-col gap-4">
              {milestones.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-50 pb-4 last:border-b-0 last:pb-0 gap-2 text-left"
                >
                  <div className="flex items-start sm:items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary shrink-0 mt-1.5 sm:mt-0" />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-primary-dark font-heading">
                        {item.age}
                      </span>
                      <span className="text-xs text-muted-text font-sans">
                        {item.note}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs font-mono bg-surface-tint border border-primary/5 text-primary-dark py-1.5 px-3 rounded-lg max-w-full sm:max-w-[60%] truncate">
                    {item.vaccines}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
