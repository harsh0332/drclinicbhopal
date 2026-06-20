import { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustStrip from "@/components/sections/trust-strip";
import WhyChoose from "@/components/sections/why-choose";
import MeetDoctors from "@/components/sections/meet-doctors";
import ServicesGrid from "@/components/sections/services-grid";
import VaccineTeaser from "@/components/sections/vaccine-teaser";
import ParentGuidance from "@/components/sections/parent-guidance";
import MilestoneTeaser from "@/components/sections/milestone-teaser";
import GrowthTeaser from "@/components/sections/growth-teaser";

export const metadata: Metadata = {
  title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
  description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
  alternates: {
    canonical: "https://www.babystepsclinic.in",
  },
};
import Testimonials from "@/components/sections/testimonials";
import GoogleReviews from "@/components/sections/google-reviews";
import FAQs from "@/components/sections/faqs";
import LatestArticles from "@/components/sections/latest-articles";
import GalleryPreview from "@/components/sections/gallery-preview";
import MapContact from "@/components/sections/map-contact";
import BookAppointment from "@/components/sections/book-appointment";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
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
