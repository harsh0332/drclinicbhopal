import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { GraduationCap, Building, Award, ArrowRight, Calendar, Phone } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Our Pediatric Specialists | Baby Steps Clinic Neelbad",
  description: "Expert medical consultation for newborns, infants, and children by our senior pediatricians Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/doctors",
  },
  openGraph: {
    title: "Our Pediatric Specialists | Baby Steps Clinic Neelbad",
    description: "Expert medical consultation for newborns, infants, and children by our senior pediatricians Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya.",
    url: "https://babystepsnewbornclinic.com/doctors",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function DoctorsPage() {
  return (
    <main className="flex-1 bg-white">
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
              <span className="text-primary-dark font-medium">Doctors</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Our Pediatric Specialists
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Dr. Sudarshan Dev Arya &amp; Dr. Manisha Bangarwa Arya provide expert medical consultation for newborns, infants, and children at Baby Steps Clinic.
            </p>
          </div>
        </div>
      </section>

      {/* Doctors Profiles List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {siteConfig.doctors.map((doctor) => (
              <div
                key={doctor.id}
                id={doctor.id}
                className="bg-white border border-gray-150 rounded-3xl shadow-soft hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full text-left"
              >
                {/* Photo Container */}
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                  <ClinicImage
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.title}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow gap-5">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider">
                      {doctor.title}
                    </span>
                    <h3 className="text-2xl font-bold font-heading text-primary-dark">
                      {doctor.name}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3 text-sm text-muted-text font-sans border-t border-gray-100 pt-4">
                    {/* Credentials */}
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-gray-900 font-medium">Qualifications:</strong> {doctor.degree}
                      </span>
                    </div>

                    {/* Affiliation */}
                    <div className="flex items-start gap-2.5">
                      <Building className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-gray-900 font-medium">Clinical Affiliation:</strong> {doctor.hospital}
                      </span>
                    </div>

                    {/* Association info */}
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4.5 h-4.5 text-primary shrink-0 mt-0.5" />
                      <span>
                        Registered under Medical Council of India &amp; Madhya Pradesh Medical Council.
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between gap-4">
                    <Link
                      href={`/doctors/${doctor.id}`}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-semibold text-sm transition-colors group"
                    >
                      <span>View full clinical profile</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Appointment Action block */}
          <div className="max-w-3xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-16 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Consult with our pediatricians
            </h3>
            <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              Appointments are available for routine immunization, critical neonatal follow-ups, and pediatric checkups. Schedule today via WhatsApp or call our desk.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <Link
                href="/#appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Request Appointment</span>
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call Clinic</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
