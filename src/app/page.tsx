import { Metadata } from "next";
import dynamic from "next/dynamic";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import WhyChoose from "@/components/sections/why-choose";
import MeetDoctors from "@/components/sections/meet-doctors";
import ServicesGrid from "@/components/sections/services-grid";

// Lazy-load below-the-fold sections to optimize initial JS bundle size & INP on mobile
const VaccineTeaser = dynamic(() => import("@/components/sections/vaccine-teaser"), {
  loading: () => <div className="w-full h-[400px] bg-surface-tint" />
});
const ParentGuidance = dynamic(() => import("@/components/sections/parent-guidance"), {
  loading: () => <div className="w-full h-[500px] bg-white" />
});
const MilestoneTeaser = dynamic(() => import("@/components/sections/milestone-teaser"), {
  loading: () => <div className="w-full h-[400px] bg-surface-tint" />
});
const GrowthTeaser = dynamic(() => import("@/components/sections/growth-teaser"), {
  loading: () => <div className="w-full h-[500px] bg-white" />
});
const Testimonials = dynamic(() => import("@/components/sections/testimonials"), {
  loading: () => <div className="w-full h-[450px] bg-surface-tint" />
});
const GoogleReviews = dynamic(() => import("@/components/sections/google-reviews"), {
  loading: () => <div className="w-full h-[150px] bg-white" />
});
const FAQs = dynamic(() => import("@/components/sections/faqs"), {
  loading: () => <div className="w-full h-[500px] bg-white" />
});
const LatestArticles = dynamic(() => import("@/components/sections/latest-articles"), {
  loading: () => <div className="w-full h-[450px] bg-surface-tint" />
});
const GalleryPreview = dynamic(() => import("@/components/sections/gallery-preview"), {
  loading: () => <div className="w-full h-[400px] bg-white" />
});
const MapContact = dynamic(() => import("@/components/sections/map-contact"), {
  loading: () => <div className="w-full h-[500px] bg-surface-tint" />
});
import BookAppointment from "@/components/sections/book-appointment";
import JsonLd from "@/components/ui/json-ld";
import { getMedicalClinicSchema, getFAQSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
  description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com",
  },
  openGraph: {
    title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
    description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
    url: "https://babystepsnewbornclinic.com",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function Home() {
  const homeFaqs = [
    {
      q: "What are the clinic timings and consultation hours?",
      a: "Our standard consultation hours are Monday to Saturday: 10:00 AM – 9:00 PM, and Sundays: 10:00 AM – 1:00 PM. Appointments are recommended to minimize waiting area crowding."
    },
    {
      q: "Do I need to book a prior appointment for childhood vaccinations?",
      a: "Yes, we schedule vaccination appointments in advance to ensure the vaccine doses are pre-verified, and to maintain proper separation of healthy vaccination visits from child wellness checkups. You can schedule by calling the clinic or messaging via WhatsApp."
    },
    {
      q: "What vaccine storage standards are followed at the clinic?",
      a: "We maintain strict WHO-compliant vaccine cold-chain protocols. Our vaccines are stored in specialized medical-grade refrigerators with continuous temperature logs. This maintains vaccine safety, quality, and efficacy from arrival to administration."
    },
    {
      q: "With which local hospitals are the clinic's pediatricians associated?",
      a: "Our senior pediatricians hold consultant positions at premier tertiary care hospitals in Bhopal. Dr. Sudarshan Dev Arya is a Consultant at Rainbow Children's Hospital, and Dr. Manisha Bangarwa Arya is a Consultant at Apollo SAGE Hospital. This ensures smooth referral pathways if advanced tertiary care is required."
    },
    {
      q: "What should I bring for my newborn's first wellness visit?",
      a: "Please bring the baby's hospital birth certificate, discharge summary papers from the delivery hospital, maternal health reports, and any vaccination card or immunization booklet issued at birth. These documents help our doctors establish an accurate clinical baseline."
    },
    {
      q: "Do the doctors offer emergency pediatric support?",
      a: "We provide emergency triage guidance and child care during clinic hours. For late-night pediatric emergencies or critical newborn distress, we recommend proceeding directly to the pediatric emergency rooms of associated hospitals (Rainbow Children's Hospital or Apollo SAGE Hospital) where active care is available."
    }
  ];

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Schema Injection */}
      <JsonLd data={getMedicalClinicSchema()} />
      <JsonLd data={getFAQSchema(homeFaqs)} />
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Strip Section */}
      <TrustStrip />

      {/* 3. Why Choose Section */}
      <WhyChoose />

      {/* 4. Meet the Doctors Section */}
      <MeetDoctors />

      {/* 5. Services Grid Section */}
      <ServicesGrid />

      {/* 5b. Areas We Serve Section */}
      <section className="bg-surface-tint/30 border-t border-b border-gray-100 py-8 text-center font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">Areas We Serve:</span>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-sm text-primary-dark font-medium">
            <span>Neelbad</span>
            <span className="text-gray-300 sm:inline">•</span>
            <span>Kolar</span>
            <span className="text-gray-300 sm:inline">•</span>
            <span>Bawadia Kalan</span>
            <span className="text-gray-300 sm:inline">•</span>
            <span>Ratibad</span>
            <span className="text-gray-300 sm:inline">•</span>
            <span>South Bhopal</span>
          </div>
        </div>
      </section>

      {/* 6. Vaccination Schedule Teaser Section */}
      <VaccineTeaser />

      {/* 7. New Parent Guidance Section */}
      <ParentGuidance />

      {/* 8. Milestone Tracker Teaser Section */}
      <MilestoneTeaser />

      {/* 9. Child Growth Monitoring Teaser Section */}
      <GrowthTeaser />

      {/* 10. Patient Testimonials Section */}
      <Testimonials />

      {/* 11. Google Reviews Section */}
      <GoogleReviews />

      {/* 12. FAQs Section */}
      <FAQs />

      {/* 13. Latest Articles Section */}
      <LatestArticles />

      {/* 14. Gallery Preview Section */}
      <GalleryPreview />

      {/* 15. Map + NAP + Hours Section */}
      <MapContact />

      {/* 16. Book Appointment Form Section */}
      <BookAppointment />
    </div>
  );
}
