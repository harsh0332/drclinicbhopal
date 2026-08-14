import Link from "next/link";
import { Metadata } from "next";
import { localitiesData } from "@/lib/localities-data";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbNode } from "@/lib/schemas";
import JsonLd from "@/components/ui/json-ld";
import ClinicImage from "@/components/ui/clinic-image";
import { MapPin, Clock, Calendar, Phone, CheckCircle2, ChevronRight, Car, CreditCard } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Pediatric Care Across South Bhopal | Baby Steps Newborn & Child Clinic",
  description: "Baby Steps Clinic in Neelbad serves families across South Bhopal including Kolar Road, Bawadia Kalan, Danish Kunj, Salaiya, Chuna Bhatti, Katara Hills, Bagmugaliya, Lalghati, and AIIMS area.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/areas",
  },
  openGraph: {
    title: "Pediatric Care Across South Bhopal | Baby Steps Clinic",
    description: "Baby Steps Clinic in Neelbad serves families across South Bhopal including Kolar Road, Bawadia Kalan, Danish Kunj, Salaiya, Chuna Bhatti, Katara Hills, Bagmugaliya, Lalghati, and AIIMS area.",
    url: "https://babystepsnewbornclinic.com/areas",
    siteName: "Baby Steps – Newborn & Child Clinic",
    images: [
      {
        url: "https://babystepsnewbornclinic.com/images/og/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Baby Steps – Newborn & Child Clinic",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pediatric Care Across South Bhopal | Baby Steps Clinic",
    description: "Baby Steps Clinic in Neelbad serves families across South Bhopal including Kolar Road, Bawadia Kalan, Danish Kunj, Salaiya, Chuna Bhatti, Katara Hills, Bagmugaliya, Lalghati, and AIIMS area.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function AreasHubPage() {
  const breadcrumbSchema = getBreadcrumbNode([
    { name: "Home", item: "/" },
    { name: "Areas We Serve", item: "/areas" }
  ]);

  const hubWebPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://babystepsnewbornclinic.com/areas",
        "url": "https://babystepsnewbornclinic.com/areas",
        "name": "Pediatric Care Across South Bhopal | Baby Steps Clinic",
        "about": {
          "@id": "https://babystepsnewbornclinic.com/#clinic"
        }
      },
      breadcrumbSchema
    ]
  };

  const localitiesList = Object.values(localitiesData);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={hubWebPageSchema} />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[30%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-3 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Areas We Serve</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-dark font-heading leading-tight">
              Pediatric Care Across South Bhopal
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-3xl leading-relaxed">
              Located conveniently on the main road in Neelbad, Baby Steps Newborn &amp; Child Clinic provides accessible outpatient consultations, WHO-compliant immunizations, and specialized neonatal checkups for families residing across South Bhopal. Walk-in consultations are welcome during regular hours — no prior appointment needed for general pediatric visits. Free street parking is available directly outside the clinic with space for both cars and two-wheelers.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Location Highlights */}
      <section className="py-8 bg-surface-tint/50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-sans text-muted-text">
            <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-2xl border border-gray-150 shadow-soft">
              <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Main Road Location:</strong> 227/1, Pooja Colony, Neelbad, Bhopal</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-2xl border border-gray-150 shadow-soft">
              <Car className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Parking:</strong> Ample free street parking outside for cars &amp; 2-wheelers</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-2xl border border-gray-150 shadow-soft">
              <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Walk-ins Welcome:</strong> General consults require no appointment</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-white rounded-2xl border border-gray-150 shadow-soft">
              <CreditCard className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong>Payments:</strong> Cash, UPI, debit &amp; credit cards accepted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Localities Directory */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2 text-left">
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary-dark">
                Locality Travel &amp; Access Routes
              </h2>
              <p className="text-sm text-muted-text font-sans max-w-2xl">
                Find commute details and travel times to Baby Steps Clinic from major neighborhoods across South Bhopal:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {localitiesList.map((loc) => {
                const isNeelbad = loc.slug === "neelbad";
                return (
                  <div
                    key={loc.slug}
                    id={loc.slug}
                    className={`bg-white border ${
                      isNeelbad ? "border-primary shadow-md ring-2 ring-primary/10" : "border-gray-150 shadow-soft"
                    } rounded-3xl p-6 flex flex-col gap-4 text-left justify-between`}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold font-heading text-primary-dark">
                          {loc.name}
                        </h3>
                        {isNeelbad && (
                          <span className="bg-primary/10 text-primary text-[11px] font-bold py-1 px-2.5 rounded-full uppercase tracking-wider">
                            Clinic Home Locality
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-text font-sans leading-relaxed">
                        {loc.introParagraphs[0]}
                      </p>
                      <div className="p-3 bg-surface-tint rounded-2xl border border-gray-100 text-xs font-sans text-primary-dark leading-relaxed">
                        <strong>Distance &amp; Travel:</strong> {loc.distanceNote}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                      {["neelbad", "kolar-road", "bawadia-kalan"].includes(loc.slug) ? (
                        <Link
                          href={`/areas/${loc.slug}`}
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-semibold text-xs transition-colors"
                        >
                          <span>Explore {loc.name} clinic guide</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      ) : (
                        <a
                          href={siteConfig.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-primary hover:text-primary-dark font-semibold text-xs transition-colors"
                        >
                          <span>Get directions on Google Maps</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Map Embed Section */}
            <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft flex flex-col mt-8">
              <div className="p-6 bg-surface-tint border-b border-gray-100 flex flex-col gap-1 text-left">
                <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Interactive Map &amp; Clinic Directions</span>
                </h3>
                <p className="text-xs text-muted-text font-sans">
                  Baby Steps Newborn &amp; Child Clinic, 227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal, MP 462044
                </p>
              </div>
              <div className="relative w-full h-[360px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3667.272378278338!2d77.34782957593083!3d23.196742209804935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c5d6345e3a901%3A0xa317090ce42385e2!2sBaby%20Steps%20Newborn%20%26%20Child%20Clinic!5e0!3m2!1sen!2sin!4v1784411102327!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Map location of Baby Steps Clinic in Neelbad, Bhopal"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
            </div>

            {/* Appointment Call-to-Action Block */}
            <div className="bg-surface-tint border border-primary/10 rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center gap-4">
              <h3 className="text-2xl font-bold font-heading text-primary-dark">
                Consult with Senior Pediatricians in Neelbad
              </h3>
              <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
                General consultations are available on a walk-in basis. Scheduled appointments are required for vaccination visits.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
                <Link
                  href="/#appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-bold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Request Appointment</span>
                </Link>
                <a
                  href={siteConfig.phoneLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-bold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4 h-4 text-primary" />
                  <span>Call Desk: {siteConfig.phone}</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
