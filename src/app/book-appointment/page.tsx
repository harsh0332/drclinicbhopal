import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import AppointmentForm from "@/components/ui/appointment-form";
import { Calendar, Phone, MessageSquare, ShieldCheck } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata = {
  title: "Book Pediatric Appointment | Baby Steps Clinic Bhopal",
  description: "Request a consultation or vaccination slot online at Baby Steps Clinic Neelbad. Safe, direct booking options via form, WhatsApp, or phone.",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

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

              {/* Compliance / Registration Badge */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 text-xs text-muted-text font-sans leading-relaxed flex gap-2.5">
                <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">NMC Compliance verified:</p>
                  <p>All bookings follow standard clinical consultation protocols. Fees are charged transparently in-clinic according to standard consultation metrics.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
