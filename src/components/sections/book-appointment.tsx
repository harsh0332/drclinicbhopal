"use client";

import { siteConfig } from "@/lib/site-config";
import AppointmentForm from "@/components/ui/appointment-form";

export default function BookAppointment() {
  return (
    <section id="appointment" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto bg-white border border-gray-150 rounded-3xl shadow-soft p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Top border Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-primary" />

          <div className="flex flex-col gap-8 text-left">
            <div className="text-center flex flex-col gap-3">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading">
                Request an appointment
              </h2>
              <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl mx-auto">
                Fill in your details below to request a consultation. Our coordinator will contact you to verify the scheduled slot.
              </p>
            </div>

            {/* Reusable Form Component */}
            <AppointmentForm />

            {/* Direct Booking Fallback */}
            <div className="border-t border-gray-100 pt-6 text-center text-xs text-muted-text font-sans">
              Prefer faster booking?{" "}
              <a href={siteConfig.whatsappLink} className="text-primary hover:underline font-semibold">
                Book directly via WhatsApp &rarr;
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
