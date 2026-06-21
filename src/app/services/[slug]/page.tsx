import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { Calendar, Phone, CheckCircle2, Activity } from "lucide-react";
import FAQAccordion from "@/components/ui/faq-accordion";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const revalidate = 86400; // revalidate daily

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug];
  if (!service) return {};

  return {
    title: `${service.title} in Neelbad, Bhopal | Baby Steps Clinic`,
    description: `Factual clinical details about ${service.title}. Why it matters and what to expect during your child's visit at Baby Steps Clinic in Neelbad, Bhopal.`,
    alternates: {
      canonical: `https://www.babystepsclinic.in/services/${slug}`,
    },
  };
}

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug
  }));
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

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
              <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">{service.title}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              {service.title} in Neelbad, Bhopal
            </h1>
            <p className="text-sm text-muted-text font-sans">
              Clinical Pediatric Guidance &bull; Baby Steps Clinic
            </p>
          </div>
        </div>
      </section>

      {/* Main Service Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: What/Why/Expect */}
            <div className="lg:col-span-8 flex flex-col gap-10 text-left">
              
              {/* Section 1: What It Is */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold font-heading text-primary-dark">
                  What is {service.title}?
                </h2>
                <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
                  {service.whatItIs}
                </p>
              </div>

              {/* Section 2: Why It Matters */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6">
                <h2 className="text-2xl font-bold font-heading text-primary-dark">
                  Why it Matters for Your Child
                </h2>
                <p className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
                  {service.whyItMatters}
                </p>
              </div>

              {/* Section 3: What to Expect */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h2 className="text-2xl font-bold font-heading text-primary-dark">
                  What to Expect During Your Visit
                </h2>
                <div className="flex flex-col gap-3.5">
                  {service.whatToExpect.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-surface-tint border border-primary/10 flex items-center justify-center text-xs font-bold text-primary shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="text-sm text-muted-text font-sans leading-relaxed">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: FAQs Accordion */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h2 className="text-2xl font-bold font-heading text-primary-dark mb-4">
                  Frequently Asked Questions
                </h2>
                <FAQAccordion faqs={service.faqs} />
              </div>

            </div>

            {/* Right Column: Actions & Related Services */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              {/* Appointment Booking Box */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-soft text-left flex flex-col gap-5">
                <h3 className="text-lg font-bold font-heading text-primary-dark border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Book Consultation</span>
                </h3>
                
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Schedule a clinical review for {service.title} at our Neelbad clinic. Select your slot online or call our desk.
                </p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/#appointment"
                    className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 rounded-2xl shadow-md hover:bg-primary-dark transition-all active:scale-[0.98]"
                  >
                    <span>Request Appointment</span>
                  </Link>
                  <a
                    href={siteConfig.phoneLink}
                    className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 text-primary-dark text-sm font-semibold py-3.5 rounded-2xl shadow-soft hover:bg-gray-50 transition-all active:scale-[0.98]"
                  >
                    <Phone className="w-4.5 h-4.5 text-primary" />
                    <span>Call: {siteConfig.phone}</span>
                  </a>
                </div>
              </div>

              {/* Related Services Links */}
              <div className="bg-surface-tint border border-primary/5 rounded-3xl p-6 sm:p-8 text-left flex flex-col gap-4">
                <h3 className="text-sm font-bold font-heading text-primary-dark flex items-center gap-2">
                  <Activity className="w-4.5 h-4.5 text-primary" />
                  <span>Related Care Pathways</span>
                </h3>
                
                <div className="flex flex-col gap-2.5">
                  {service.related.map((rel, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${rel.slug}`}
                      className="p-3.5 bg-white hover:bg-gray-50 border border-gray-100 rounded-xl text-xs sm:text-sm font-semibold text-primary-dark hover:text-primary transition-all flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                      <span>{rel.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
