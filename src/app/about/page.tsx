import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { HeartPulse, Calendar, Phone, Sparkles, Building, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "About Us | Baby Steps Newborn & Child Clinic Bhopal",
  description: "Meet our senior pediatricians Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya and learn about our WHO-compliant vaccine cold-chain facility in Neelbad, Bhopal.",
  alternates: {
    canonical: "https://www.babystepsclinic.in/about",
  },
};

export default function AboutPage() {
  const facilities = [
    {
      title: "Child-Friendly Waiting Area",
      description: "Equipped with cartoon wall paintings, soft lighting, and interactive toys to help lower kids' anxiety before consultation.",
      image: "/images/clinic/waiting-area.jpg"
    },
    {
      title: "Equipped Consultation Suite",
      description: "Safe, sterile environments for diagnostic procedures, growth assessment scales, and pediatric consultations.",
      image: "/images/clinic/consultation-room.jpg"
    },
    {
      title: "Vaccination Cold-Chain Suite",
      description: "WHO-compliant refrigeration system monitoring proper temperature storage to preserve immunization efficacy.",
      image: "/images/clinic/vaccination-room.jpg"
    }
  ];

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
              <span className="text-primary-dark font-medium">About Clinic</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              About Baby Steps Clinic
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Newborn &amp; Child Clinic in Neelbad, Bhopal. Providing high-standard pediatric health checkups, vaccination schedules, and newborn support.
            </p>
          </div>
        </div>
      </section>

      {/* Clinic Philosophy / Intro */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Block: Image */}
            <div className="lg:col-span-5 bg-surface-tint p-4 rounded-3xl border border-primary/5 shadow-soft">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <ClinicImage
                  src="/images/clinic/exterior.jpg"
                  alt="Baby Steps Clinic exterior signage and front"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Block: Content */}
            <div className="lg:col-span-7 flex flex-col gap-6 text-left">
              <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block w-max">
                Our Philosophy
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-primary-dark leading-tight">
                Gentle, evidence-based clinical pediatric care
              </h2>
              <p className="text-sm sm:text-base text-muted-text font-sans leading-relaxed">
                At Baby Steps Clinic, we believe in providing pediatric support that prioritizes clinical safety, WHO-standard immunizations, and stress-free environments. We follow evidence-based guidelines and provide families with clear educational tools for milestone monitoring, child nutrition, and newborn care.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-text font-sans mt-2">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>No unverified outcome claims; pure clinical guidance.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <HeartPulse className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                  <span>Direct consultation by post-graduate pediatricians.</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Facilities Overview */}
      <section className="py-16 bg-surface-tint border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-white border border-primary/10 shadow-soft px-4 py-1.5 rounded-full inline-block mx-auto">
              Our Facilities
            </span>
            <h2 className="text-3xl font-bold font-heading text-primary-dark">
              Equipped clinic environment for infants &amp; children
            </h2>
            <p className="text-sm text-muted-text font-sans leading-relaxed">
              We design our spaces to be clean, safe, and welcoming for families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-white border border-gray-150 rounded-2xl shadow-soft hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col h-full text-left"
              >
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden shrink-0">
                  <ClinicImage
                    src={facility.image}
                    alt={facility.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-grow gap-2">
                  <h3 className="text-lg font-bold font-heading text-primary-dark">
                    {facility.title}
                  </h3>
                  <p className="text-xs text-muted-text font-sans leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Meet the Doctors Summaries */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col gap-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-widest bg-surface-tint px-4 py-1.5 rounded-full inline-block mx-auto">
              Specialists
            </span>
            <h2 className="text-3xl font-bold font-heading text-primary-dark">
              Led by husband-wife pediatrician duo
            </h2>
            <p className="text-sm text-muted-text font-sans leading-relaxed">
              Consult with doctors holding credentials from top Indian and USA pediatric programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {siteConfig.doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white border border-gray-150 rounded-2xl p-6 shadow-soft flex gap-5 items-center text-left"
              >
                <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 bg-gray-100">
                  <ClinicImage
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] font-bold text-secondary uppercase tracking-wider">{doctor.title}</span>
                  <h3 className="text-lg font-bold font-heading text-primary-dark">{doctor.name}</h3>
                  <p className="text-xs text-muted-text font-sans line-clamp-1">{doctor.degree}</p>
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="text-xs font-semibold text-primary hover:underline mt-1"
                  >
                    View detailed clinical credentials &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Map, NAP, Hours and CTAs */}
      <section className="py-16 bg-surface-tint border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch max-w-6xl mx-auto">
            
            {/* Left Column: Map */}
            <div className="lg:col-span-6 bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft aspect-[4/3] lg:aspect-auto min-h-[300px]">
              <iframe
                src="https://maps.google.com/maps?q=Baby%20Steps%20Newborn%20Child%20Clinic%20Neelbad%20Bhopal&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Baby Steps Clinic Google Map Location"
                className="w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
              />
            </div>

            {/* Right Column: Hours, Address & Booking */}
            <div className="lg:col-span-6 bg-white border border-gray-150 p-8 sm:p-10 rounded-3xl shadow-soft flex flex-col justify-between gap-6 text-left">
              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold font-heading text-primary-dark border-b border-gray-100 pb-2 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>Clinic Address</span>
                </h3>
                <p className="text-sm text-muted-text font-sans leading-relaxed">
                  {siteConfig.address}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h3 className="text-lg font-bold font-heading text-primary-dark border-b border-gray-100 pb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-primary" />
                  <span>Hours of Operation</span>
                </h3>
                <ul className="flex flex-col gap-2 text-sm text-muted-text font-sans">
                  {siteConfig.hours.map((hour, idx) => (
                    <li key={idx} className="flex justify-between border-b border-gray-50 pb-1.5 last:border-b-0 last:pb-0">
                      <span className="font-semibold text-gray-950">{hour.days}</span>
                      <span>{hour.time}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation Call CTAs */}
              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                <Link
                  href="/#appointment"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
                >
                  <Calendar className="w-4.5 h-4.5" />
                  <span>Book Appointment</span>
                </Link>
                <a
                  href={siteConfig.phoneLink}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
                >
                  <Phone className="w-4.5 h-4.5 text-primary" />
                  <span>Call: {siteConfig.phone}</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
