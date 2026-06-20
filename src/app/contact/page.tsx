import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema, getMedicalClinicSchema } from "@/lib/schemas";
import AppointmentForm from "@/components/ui/appointment-form";
import { MapPin, Phone, Mail, Clock, Calendar, ShieldAlert } from "lucide-react";

export const metadata = {
  title: "Contact & Location | Baby Steps Clinic Bhopal",
  description: "Visit Baby Steps Clinic in Neelbad, Bhopal. Find NAP contact details, opening hours, interactive maps, and our verified booking form.",
};

export default function ContactPage() {
  // Breadcrumbs schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Contact", item: "/contact" }
  ]);

  // MedicalClinic schema
  const clinicSchema = getMedicalClinicSchema();

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(clinicSchema) }}
      />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Phone:</span>
                    <a href={siteConfig.phoneLink} className="hover:text-primary transition-colors font-semibold text-gray-950">
                      +91 {siteConfig.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="font-semibold text-gray-900 shrink-0 w-20">Email:</span>
                    <a href={`mailto:${siteConfig.email}`} className="hover:text-primary transition-colors">
                      {siteConfig.email}
                    </a>
                  </li>
                </ul>
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
              <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft aspect-[4/3] min-h-[250px]">
                <iframe
                  src="https://maps.google.com/maps?q=Baby%20Steps%20Newborn%20Child%20Clinic%20Neelbad%20Bhopal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title="Google Map location of Baby Steps Clinic"
                  className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>

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
