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
import { getHomepageGraphSchema } from "@/lib/schemas";

export const metadata: Metadata = {
  title: "Pediatrician in Neelbad, Bhopal | Baby Steps Clinic",
  description: "Newborn & child specialists in Neelbad, Bhopal. IAP vaccination, growth tracking & NICU follow-up. Walk-ins welcome. Call 62625 60101.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com",
  },
  openGraph: {
    title: "Pediatrician in Neelbad, Bhopal | Baby Steps Clinic",
    description: "Newborn & child specialists in Neelbad, Bhopal. IAP vaccination, growth tracking & NICU follow-up. Walk-ins welcome. Call 62625 60101.",
    url: "https://babystepsnewbornclinic.com",
    siteName: "Baby Steps – Newborn & Child Clinic",
    images: [
      {
        url: "https://babystepsnewbornclinic.com/api/og?title=Pediatrician%20in%20Neelbad%2C%20Bhopal%20%7C%20Baby%20Steps%20Clinic&category=Child%20Care%20%26%20Clinic",
        width: 1200,
        height: 630,
        alt: "Baby Steps – Newborn & Child Clinic",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pediatrician in Neelbad, Bhopal | Baby Steps Clinic",
    description: "Newborn & child specialists in Neelbad, Bhopal. IAP vaccination, growth tracking & NICU follow-up. Walk-ins welcome. Call 62625 60101.",
    images: ["https://babystepsnewbornclinic.com/api/og?title=Pediatrician%20in%20Neelbad%2C%20Bhopal%20%7C%20Baby%20Steps%20Clinic&category=Child%20Care%20%26%20Clinic"],
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
    },
    {
      q: "Do I need an appointment, or can I walk in?",
      a: "Walk-in consultations are welcome during our regular hours — you do not need a prior appointment for a general pediatric consultation. Vaccination visits are the one exception: those are scheduled in advance so that doses can be pre-verified and healthy vaccination visits stay separated from sick-child consultations. If you are travelling from Kolar Road, Bawadia Kalan or elsewhere in South Bhopal, you can call +91 62625 60101 before leaving to check current waiting time."
    },
    {
      q: "What are the consultation charges, and is a follow-up visit charged separately?",
      a: "Consultation charges are shared when you call or visit the clinic — please contact us at +91 62625 60101 for current fees. A follow-up visit within 15 days of your consultation is covered under the same consultation and is not charged again. Vaccination charges depend on the specific vaccine and are separate from the consultation."
    },
    {
      q: "Is parking available at the clinic?",
      a: "Yes. The clinic is located on a main road in Neelbad with ample free street parking directly outside, with space for both cars and two-wheelers. Auto-rickshaws and e-rickshaws are readily available in the area. The clinic is easy to locate on Google Maps — search \"Baby Steps Newborn & Child Clinic\"."
    },
    {
      q: "Which vaccines are available at the clinic?",
      a: "We stock the complete Indian Academy of Pediatrics (IAP) recommended immunisation schedule, including vaccines that many clinics only supply on order — Meningococcal, Rabies and HPV among them. Both Indian and imported brands are available, and we will explain the options for your child before administration. All vaccines are stored under WHO-compliant cold-chain conditions in medical-grade refrigeration with continuous temperature logs."
    }
  ];

  return (
    <div className="flex flex-col w-full animate-fadeIn">
      {/* Schema Injection */}
      <JsonLd data={getHomepageGraphSchema(homeFaqs)} />
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
