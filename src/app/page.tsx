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
  return (
    <div className="flex flex-col w-full animate-fadeIn">
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
