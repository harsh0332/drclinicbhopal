import { notFound } from "next/navigation";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import Link from "next/link";
import { GraduationCap, Building, Award, Heart, CheckCircle2, Calendar, Phone } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const revalidate = 86400; // revalidate daily

interface DoctorPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: DoctorPageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = siteConfig.doctors.find((d) => d.id === id);
  if (!doctor) return {};

  return {
    title: `${doctor.name} - ${doctor.degree} | Pediatrician Bhopal`,
    description: `Professional credentials and clinical experience profile of ${doctor.name}, ${doctor.title} at Baby Steps Clinic, Neelbad, Bhopal.`,
    alternates: {
      canonical: `https://www.babystepsclinic.in/doctors/${id}`,
    },
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  return [
    { id: "dr-sudarshan-dev-arya" },
    { id: "dr-manisha-bangarwa-arya" }
  ];
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const { id } = await params;
  const doctor = siteConfig.doctors.find((d) => d.id === id);

  if (!doctor) {
    notFound();
  }

  // Detailed credentials and scope of practice based on doctor ID
  const isSudarshan = id === "dr-sudarshan-dev-arya";
  
  const doctorDetails = isSudarshan
    ? {
        h1Title: "Dr. Sudarshan Dev Arya – Pediatrician",
        description: "Dr. Sudarshan Dev Arya is a registered pediatrician dedicated to providing clinical care for infants, children, and adolescents. He holds postgraduate degrees in child health and has completed international training in pediatric nutrition.",
        experience: "Over 10 years of clinical practice in pediatric care.",
        qualifications: [
          "MBBS — Bachelor of Medicine & Bachelor of Surgery",
          "DCH — Diploma in Child Health",
          "DNB (New Delhi) — Diplomate of National Board in Pediatrics",
          "PGPN (Boston, USA) — Post Graduate Program in Pediatric Nutrition, Boston University School of Medicine"
        ],
        areasOfCare: [
          "Routine childhood vaccinations and immunization scheduling",
          "Management of childhood fever and acute infections",
          "Allergy & asthma screening and long-term care management",
          "Growth monitoring and pediatric nutritional guidelines",
          "Developmental milestones tracking and pediatric wellness checkups"
        ]
      }
    : {
        h1Title: "Dr. Manisha Bangarwa Arya – Pediatrician & Neonatologist",
        description: "Dr. Manisha Bangarwa Arya is a registered pediatrician and neonatologist specializing in newborn care, critical infant support, and developmental follow-ups. She holds fellowships in newborn care and pediatric nutrition.",
        experience: "Over 8 years of clinical practice in neonatal and pediatric care.",
        qualifications: [
          "MBBS — Bachelor of Medicine & Bachelor of Surgery",
          "DNB (New Delhi) — Diplomate of National Board in Pediatrics",
          "PGPN (Boston, USA) — Post Graduate Program in Pediatric Nutrition, Boston University School of Medicine",
          "Fellowship in Neonatology — Specialized training in critical newborn and neonatal intensive care"
        ],
        areasOfCare: [
          "NICU discharge follow-up and tracking of high-risk newborns",
          "Lactation counseling and maternal support for breastfeeding",
          "Developmental assessment and motor skills milestones monitoring",
          "Management of newborn jaundice and infant feeding problems",
          "Well-baby consultations and early developmental intervention guidelines"
        ]
      };

  return (
    <main className="flex-1 bg-white">
      {/* Breadcrumbs / Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-10 relative overflow-hidden">
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
              <Link href="/doctors" className="hover:text-primary transition-colors">Doctors</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">{doctor.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              {doctorDetails.h1Title}
            </h1>
            <p className="text-sm text-muted-text font-sans">
              Registered Medical Practitioner &bull; {doctor.title}
            </p>
          </div>
        </div>
      </section>

      {/* Main Profile Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Photo & CTAs */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-white border border-gray-150 rounded-3xl p-4 shadow-soft">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <ClinicImage
                    src={doctor.image}
                    alt={`${doctor.name} - ${doctor.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Clinical Affiliation Box */}
              <div className="bg-surface-tint border border-primary/5 rounded-2xl p-6 text-left flex flex-col gap-4">
                <h3 className="text-sm font-bold font-heading text-primary-dark flex items-center gap-2">
                  <Building className="w-4.5 h-4.5 text-primary" />
                  <span>Clinical Affiliation</span>
                </h3>
                <p className="text-sm text-muted-text leading-relaxed font-sans">
                  {doctor.name} maintains an active consulting practice at:
                </p>
                <div className="p-4 bg-white rounded-xl border border-gray-100 text-sm font-semibold text-primary-dark font-heading">
                  {doctor.hospital}
                </div>
                <p className="text-xs text-muted-text leading-relaxed font-sans italic">
                  This affiliation enables direct, coordinated care and hospital admission if your child requires specialized tertiary medical support.
                </p>
              </div>

              {/* Quick Contact CTAs */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/#appointment"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-base font-semibold py-4 rounded-2xl shadow-md hover:bg-primary-dark active:scale-[0.98] transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Request Appointment</span>
                </Link>
                <a
                  href={siteConfig.phoneLink}
                  className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-base font-semibold py-4 rounded-2xl shadow-soft hover:bg-gray-50 active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4.5 h-4.5 text-primary" />
                  <span>Call: {siteConfig.phone}</span>
                </a>
              </div>
            </div>

            {/* Right Column: Credentials & Details */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-left">
              
              {/* Introduction & Experience */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold font-heading text-primary-dark">
                  Clinical Profile
                </h2>
                <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
                  {doctorDetails.description}
                </p>
                <p className="text-xs sm:text-sm text-primary font-semibold font-sans mt-1">
                  💡 {doctorDetails.experience}
                </p>
              </div>

              {/* Qualifications */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span>Medical Qualifications</span>
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-muted-text font-sans">
                  {doctorDetails.qualifications.map((qual, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                      <span>{qual}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scope of Practice / Areas of Care */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  <span>Areas of Pediatric Care</span>
                </h3>
                <ul className="flex flex-col gap-3 text-sm text-muted-text font-sans">
                  {doctorDetails.areasOfCare.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4.5 h-4.5 text-secondary shrink-0 mt-0.5" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Medical Council Registrations */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  <span>Professional Registration</span>
                </h3>
                <div className="p-4 bg-gray-50 border border-gray-100 rounded-2xl text-xs text-muted-text font-sans leading-relaxed">
                  <p className="font-semibold text-gray-900 mb-1">Medical Council Registrations:</p>
                  <p>State Medical Registration: Registered under Madhya Pradesh Medical Council.</p>
                  <p>Qualifications are formally verified and compliant with the National Medical Commission (NMC) ethics code for Indian medical practitioners.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
