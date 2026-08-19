import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbNode } from "@/lib/schemas";
import JsonLd from "@/components/ui/json-ld";
import AppointmentForm from "@/components/ui/appointment-form";
import MapFacade from "@/components/ui/map-facade";
import { MapPin, Clock, Calendar, ShieldAlert } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Contact Pediatric Clinic in Neelbad | Baby Steps Clinic",
  description: "Visit Baby Steps Clinic in Neelbad, Bhopal. View clinic address, map directions, contact numbers, and consultation hours for pediatric care.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/contact",
  },
  openGraph: {
    title: "Contact Pediatric Clinic in Neelbad | Baby Steps Clinic",
    description: "Visit Baby Steps Clinic in Neelbad, Bhopal. View clinic address, map directions, contact numbers, and consultation hours for pediatric care.",
    url: "https://babystepsnewbornclinic.com/contact",
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
    title: "Contact Pediatric Clinic in Neelbad | Baby Steps Clinic",
    description: "Visit Baby Steps Clinic in Neelbad, Bhopal. View clinic address, map directions, contact numbers, and consultation hours for pediatric care.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function ContactPage() {
  const breadcrumbSchema = getBreadcrumbNode([
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" }
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://babystepsnewbornclinic.com/contact",
        "url": "https://babystepsnewbornclinic.com/contact",
        "name": "Contact Us & Location Map | Baby Steps Clinic Bhopal",
        "about": {
          "@id": "https://babystepsnewbornclinic.com/#clinic"
        }
      },
      breadcrumbSchema
    ]
  };

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={contactPageSchema} />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12 relative overflow-hidden">
        {/* Background SVGs */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[30%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Contact</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Contact &amp; Location
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Find our clinic address in Pooja Colony, Neelbad. Request an appointment slot or contact our reception desks.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
            
            {/* Left Block: Contact Details & Map */}
            <div className="lg:col-span-6 flex flex-col gap-8 text-left">
              
              {/* Details Card */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
                <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-3 flex items-center gap-2">
                  <MapPin className="w-5.5 h-5.5 text-primary" />
                  <span>Clinic Location (NAP)</span>
                </h2>

                <ul className="flex flex-col gap-4 text-sm text-muted-text font-sans">
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Address:</span>
                    <span>{siteConfig.address}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20 mt-1">Phone:</span>
                    <div className="flex flex-col gap-1">
                      <a href={siteConfig.phoneLink} className="hover:text-primary transition-colors font-semibold text-gray-950 block">
                        +91 {siteConfig.phone} (Mobile)
                      </a>
                      <a href={siteConfig.landlineLink} className="hover:text-primary transition-colors font-semibold text-gray-950 block">
                        0755-{siteConfig.landline.split("-")[1]} (Landline)
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Email:</span>
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                      {siteConfig.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Parking:</span>
                    <span>Free street parking available outside the clinic (space for cars &amp; two-wheelers).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Payments:</span>
                    <span>Cash, UPI, debit and credit cards accepted.</span>
                  </li>
                </ul>
                <div className="text-[11px] text-muted-text font-sans border-t border-gray-100 pt-3.5 mt-2 leading-relaxed">
                  {siteConfig.napString}
                </div>
              </div>

              {/* Opening Hours Card */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-4">
                <h2 className="text-lg font-bold font-heading text-primary-dark border-b border-gray-100 pb-2.5 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Hours of Operation</span>
                </h2>
                
                <ul className="flex flex-col gap-2.5 text-sm text-muted-text font-sans">
                  {siteConfig.hours.map((hour, idx) => (
                    <li key={idx} className="flex justify-between border-b border-gray-50 pb-1.5 last:border-b-0 last:pb-0">
                      <span className="font-semibold text-gray-950">{hour.days}</span>
                      <span>{hour.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Map Embed */}
              <MapFacade heightClass="min-h-[300px]" />

            </div>

            {/* Right Block: Appointment Booking Form */}
            <div className="lg:col-span-6 bg-white border border-gray-150 p-8 sm:p-10 rounded-3xl shadow-soft text-left flex flex-col gap-6 relative">
              {/* Accent border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-3xl" />
              
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-bold font-heading text-primary-dark flex items-center gap-2">
                  <Calendar className="w-5.5 h-5.5 text-primary" />
                  <span>Request Appointment</span>
                </h2>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Request a consultation slot. Our clinic coordinator will contact you to verify the scheduled slot.
                </p>
              </div>

              <AppointmentForm />

              {/* Emergency message */}
              <div className="p-4 bg-red-50/50 border border-red-100 rounded-2xl flex items-start gap-2.5 text-xs text-muted-text leading-relaxed font-sans mt-4">
                <ShieldAlert className="w-4 h-4 text-emergency shrink-0 mt-0.5" />
                <span>
                  <strong>Emergencies:</strong> For acute distress outside clinic hours, proceed directly to associated pediatric ER care units at associated hospitals.
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
