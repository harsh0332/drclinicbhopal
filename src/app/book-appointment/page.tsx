import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import JsonLd from "@/components/ui/json-ld";
import AppointmentForm from "@/components/ui/appointment-form";
import { Calendar, Phone, MessageSquare, ShieldCheck } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Book Pediatric Consultation in Bhopal | Baby Steps",
  description: "Schedule a consultation or vaccination visit at Baby Steps Clinic in Neelbad, Bhopal. Easy direct booking via online form, WhatsApp, or instant phone call.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/book-appointment",
  },
  openGraph: {
    title: "Book Pediatric Consultation in Bhopal | Baby Steps",
    description: "Schedule a consultation or vaccination visit at Baby Steps Clinic in Neelbad, Bhopal. Easy direct booking via online form, WhatsApp, or instant phone call.",
    url: "https://babystepsnewbornclinic.com/book-appointment",
    siteName: "Baby Steps – Newborn & Child Clinic",
    images: [
      {
        url: "https://babystepsnewbornclinic.com/api/og?title=Book%20Pediatric%20Consultation%20in%20Bhopal%20%7C%20Baby%20Steps&category=Appointments",
        width: 1200,
        height: 630,
        alt: "Baby Steps – Newborn & Child Clinic",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Book Pediatric Consultation in Bhopal | Baby Steps",
    description: "Schedule a consultation or vaccination visit at Baby Steps Clinic in Neelbad, Bhopal. Easy direct booking via online form, WhatsApp, or instant phone call.",
    images: ["https://babystepsnewbornclinic.com/api/og?title=Book%20Pediatric%20Consultation%20in%20Bhopal%20%7C%20Baby%20Steps&category=Appointments"],
  },
};

export default function BookAppointmentPage() {
  // Breadcrumbs schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Book Appointment", item: "/book-appointment" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={breadcrumbSchema} />

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
              <span className="text-primary-dark font-medium">Book Appointment</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Request a Consultation
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Verify your preferred date and time slot using our form below. Our coordinator will contact you to verify.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form container */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-start">
            
            {/* Left Block: Form card */}
            <div className="lg:col-span-8 bg-white border border-gray-150 p-8 sm:p-10 rounded-3xl shadow-soft text-left relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-primary rounded-t-3xl" />
              
              <h2 className="text-xl font-bold font-heading text-primary-dark mb-6 flex items-center gap-2">
                <Calendar className="w-5.5 h-5.5 text-primary" />
                <span>Appointment Booking Form</span>
              </h2>

              <AppointmentForm />
            </div>

            {/* Right Block: Direct contact paths */}
            <div className="lg:col-span-4 flex flex-col gap-6 text-left">
              
              {/* Direct Booking options */}
              <div className="bg-surface-tint border border-primary/5 rounded-3xl p-6 sm:p-8 flex flex-col gap-5">
                <h3 className="text-base font-bold font-heading text-primary-dark border-b border-primary/10 pb-2">
                  Direct Booking Options
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  If you prefer immediate confirmation or want to schedule via phone:
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href={siteConfig.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white text-xs font-semibold py-3.5 rounded-2xl hover:bg-[#128C7E] transition-all"
                  >
                    <MessageSquare className="w-4 h-4 fill-white" />
                    <span>Book via WhatsApp</span>
                  </a>
                  
                  <a
                    href={siteConfig.phoneLink}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-xs font-semibold py-3.5 rounded-2xl hover:bg-gray-50 transition-all"
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Call: {siteConfig.phone}</span>
                  </a>
                </div>
              </div>

              {/* Preparing for your visit Card */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-7 shadow-soft flex flex-col gap-4 text-left">
                <h3 className="text-sm font-bold font-heading text-primary-dark border-b border-gray-100 pb-2 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span>Preparing For Your Visit</span>
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  To ensure a comprehensive check, please bring along:
                </p>
                <ul className="flex flex-col gap-2.5 text-xs text-muted-text font-sans">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>Discharge summary from delivery hospital</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>Vaccination records or baby health card</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                    <span>Previous prescriptions or test reports</span>
                  </li>
                </ul>
              </div>

              {/* Clinic Timings & Location Card */}
              <div className="bg-surface-tint border border-primary/10 rounded-3xl p-6 text-xs text-muted-text font-sans flex flex-col gap-3">
                <div className="font-bold text-primary-dark font-heading text-sm">Clinic Consultation Timings</div>
                <div className="flex flex-col gap-1 text-gray-700">
                  <div className="flex justify-between">
                    <span className="font-medium">Mon – Sat:</span>
                    <span>10:00 AM – 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span>10:00 AM – 1:00 PM</span>
                  </div>
                </div>
                <div className="text-[11px] text-muted-text pt-2 border-t border-primary/10">
                  📍 227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
