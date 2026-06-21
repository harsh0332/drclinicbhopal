import Link from "next/link";
import { Metadata } from "next";
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schemas";
import FAQAccordion from "@/components/ui/faq-accordion";
import { siteConfig } from "@/lib/site-config";
import { HelpCircle, Calendar, Phone } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | Baby Steps Clinic",
  description: "Helpful, medically verified answers regarding pediatric consultations, vaccine safety standards, and appointment bookings in Neelbad, Bhopal.",
  alternates: {
    canonical: "https://www.babystepsclinic.in/faqs",
  },
  openGraph: {
    title: "Frequently Asked Questions | Baby Steps Clinic",
    description: "Helpful, medically verified answers regarding pediatric consultations, vaccine safety standards, and appointment bookings in Neelbad, Bhopal.",
    url: "https://www.babystepsclinic.in/faqs",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function FAQsPage() {
  const visitFaqs = [
    {
      q: "What are the clinic timings and consultation hours?",
      a: `Our standard consultation hours are Monday to Saturday: 10:00 AM – 1:00 PM and 5:00 PM – 8:00 PM. On Sundays, the clinic is closed for routine visits but remains available for emergency pediatric consultations. Appointments are recommended to minimize waiting area crowding.`
    },
    {
      q: "How can I book or request a consultation slot?",
      a: "You can submit an appointment request using our website's booking form, or message/call our reception desk directly via WhatsApp/phone at +91 62625 60101. Our clinic coordinator will contact you to verify the final time slot."
    },
    {
      q: "What is the average waiting time at the clinic?",
      a: "By scheduling appointments in advance, we aim to maintain average waiting times under 15 minutes. This reduces clinic crowding and minimizes healthy infants' exposure to sick children."
    }
  ];

  const vaccineFaqs = [
    {
      q: "What vaccine storage standards are maintained at the clinic?",
      a: "We maintain strict WHO-compliant vaccine cold-chain protocols. Our vaccines are stored in specialized medical-grade refrigerators with continuous temperature logs. This maintains vaccine safety, quality, and efficacy from arrival to administration."
    },
    {
      q: "Do I need a prior booking for routine immunizations?",
      a: "Yes, prior booking is required. This allows our clinical team to verify the required vaccine batch and dose in advance, ensuring a smooth, minimal-wait experience for your child."
    },
    {
      q: "What happens if my child misses a vaccination milestone?",
      a: "Most missed vaccinations can be safely scheduled as catch-up immunizations. Our pediatricians will review your child's immunization card and construct a custom IAP-aligned catch-up schedule."
    }
  ];

  const clinicalFaqs = [
    {
      q: "With which local hospitals are the clinic's pediatricians associated?",
      a: `Our senior pediatricians hold consultant positions at premier tertiary care hospitals in Bhopal. Dr. Sudarshan Dev Arya is a Consultant at Rainbow Children's Hospital, and Dr. Manisha Bangarwa Arya is a Consultant at Apollo SAGE Hospital. This ensures smooth referral pathways if advanced tertiary care is required.`
    },
    {
      q: "Do the doctors manage high-risk NICU graduate follow-ups?",
      a: "Yes. Dr. Manisha Bangarwa Arya holds a specialized Fellowship in Neonatology, qualifying her to manage critical newborn care, premature baby follow-ups, motor skills milestones tracking, and infant lactation counseling."
    },
    {
      q: "Can I consult both pediatricians for a single clinical concern?",
      a: "Yes. Our husband-wife specialist team coordinates clinical consults, providing families with combined pediatric and neonatal expertise for complex developmental or physical health concerns."
    }
  ];

  // Aggregate all FAQs for SEO FAQPage schema
  const allFaqs = [...visitFaqs, ...vaccineFaqs, ...clinicalFaqs];
  const faqSchema = getFAQSchema(allFaqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "FAQs", item: "/faqs" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <span className="text-primary-dark font-medium">FAQs</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Frequently Asked Questions (FAQs)
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Medically verified, easy-to-understand answers regarding clinic protocols, vaccine safety, and pediatric consultation guidelines.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs Groups */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-12 text-left">
          
          {/* Group 1: Bookings */}
          <div className="flex flex-col gap-5">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <HelpCircle className="w-5.5 h-5.5 text-primary" />
              <span>Clinic Bookings &amp; Timing</span>
            </h2>
            <FAQAccordion faqs={visitFaqs} />
          </div>

          {/* Group 2: Vaccinations */}
          <div className="flex flex-col gap-5 border-t border-gray-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <HelpCircle className="w-5.5 h-5.5 text-primary" />
              <span>Immunizations &amp; Storage Safety</span>
            </h2>
            <FAQAccordion faqs={vaccineFaqs} />
          </div>

          {/* Group 3: Clinical Specialties */}
          <div className="flex flex-col gap-5 border-t border-gray-100 pt-8">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-primary-dark border-b border-gray-100 pb-2.5 flex items-center gap-2">
              <HelpCircle className="w-5.5 h-5.5 text-primary" />
              <span>Doctors &amp; Clinical Specialties</span>
            </h2>
            <FAQAccordion faqs={clinicalFaqs} />
          </div>

          {/* Direct Actions block */}
          <div className="bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-8 flex flex-col items-center gap-4 w-full">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Have other questions?
            </h3>
            <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              Feel free to call our reception desk directly or reach out via WhatsApp for immediate support.
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
              <Link
                href="/book-appointment"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Appointment</span>
              </Link>
              <a
                href={siteConfig.phoneLink}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-gray-50 transition-all active:scale-[0.98]"
              >
                <Phone className="w-4 h-4 text-primary" />
                <span>Call: {siteConfig.phone}</span>
              </a>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
