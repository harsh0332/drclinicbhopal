import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { localitiesData } from "@/lib/localities-data";
import { siteConfig } from "@/lib/site-config";
import { MapPin, Calendar, Phone, CheckCircle2, ChevronRight, HelpCircle } from "lucide-react";

import JsonLd from "@/components/ui/json-ld";
import FAQAccordion from "@/components/ui/faq-accordion";
import { getAreaMedicalClinicSchema, getBreadcrumbNode, getFAQSchema } from "@/lib/schemas";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const revalidate = 86400; // revalidate daily

interface LocalityPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LocalityPageProps): Promise<Metadata> {
  const { slug } = await params;
  const area = localitiesData[slug];
  if (!area) return {};

  const pageUrl = `https://babystepsnewbornclinic.com/areas/${slug}`;

  return {
    title: area.metaTitle,
    description: area.metaDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: area.metaTitle,
      description: area.metaDescription,
      url: pageUrl,
      siteName: "Baby Steps – Newborn & Child Clinic",
      images: [
        {
          url: "https://babystepsnewbornclinic.com/images/og/og-default.jpg",
          width: 1200,
          height: 630,
          alt: "Baby Steps – Newborn & Child Clinic",
        }
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: area.metaTitle,
      description: area.metaDescription,
      images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
    },
  };
}

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return Object.keys(localitiesData).map((slug) => ({
    slug
  }));
}

// Generates slug from service name
function getServiceSlug(service: string) {
  return service
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default async function LocalityPage({ params }: LocalityPageProps) {
  const { slug } = await params;
  const area = localitiesData[slug];
  if (!area) {
    notFound();
  }

  const pageUrl = `https://babystepsnewbornclinic.com/areas/${slug}`;
  const clinicSchema = getAreaMedicalClinicSchema(area.name, slug);
  const breadcrumbSchema = getBreadcrumbNode([
    { name: "Home", item: "/" },
    { name: "Areas We Serve", item: "/areas" },
    { name: area.name, item: `/areas/${slug}` }
  ]);
  const faqSchema = getFAQSchema(area.faqs, pageUrl);

  const unifiedSchema = {
    "@context": "https://schema.org",
    "@graph": [clinicSchema, breadcrumbSchema, faqSchema]
  };

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={unifiedSchema} />

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
              <Link href="/areas" className="hover:text-primary transition-colors">Areas We Serve</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">{area.name}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              {area.h1}
            </h1>
            <p className="text-sm text-muted-text font-sans">
              {area.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Locality Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Details, Why Choose, Services, FAQs & Placeholders */}
            <div className="lg:col-span-7 flex flex-col gap-8 text-left">
              
              {/* Intro Section */}
              <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-bold font-heading text-primary-dark">
                  {area.introHeading}
                </h2>
                {area.introParagraphs.map((para, idx) => (
                  <p key={idx} className="text-sm sm:text-base text-muted-text leading-relaxed font-sans">
                    {para}
                  </p>
                ))}
              </div>

              {/* Transit & Road Directions Note */}
              <div className="flex flex-col gap-4 border-t border-gray-150 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span>{area.distanceHeading}</span>
                </h3>
                <div className="p-5 bg-surface-tint border border-primary/5 rounded-2xl text-sm text-muted-text font-sans leading-relaxed flex flex-col gap-3">
                  <p>{area.distanceNote}</p>
                  {area.landmarkPlaceholder && (
                    <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-xl text-xs text-amber-900 font-mono">
                      {area.landmarkPlaceholder}
                    </div>
                  )}
                </div>
              </div>

              {/* Why Choose Section */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  {area.whyChooseHeading}
                </h3>
                <div className="flex flex-col gap-4">
                  {area.whyChoose.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-2xl bg-surface-tint/50 border border-gray-100">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-bold text-primary-dark font-heading">
                          {point.title}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
                          {point.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Offered Links */}
              <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  {area.servicesHeading}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {area.services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={`/services/${getServiceSlug(service)}`}
                      className="p-4 border border-gray-150 rounded-xl text-sm font-semibold text-primary-dark hover:text-primary hover:border-primary/20 transition-all flex items-center justify-between group bg-white shadow-xs"
                    >
                      <span>{service}</span>
                      <ChevronRight className="w-4 h-4 text-muted-text group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Area-Specific FAQs */}
              {area.faqs && area.faqs.length > 0 && (
                <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
                  <h3 className="text-lg font-bold font-heading text-primary-dark flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-primary" />
                    <span>Frequently Asked Questions for {area.name} Families</span>
                  </h3>
                  <FAQAccordion faqs={area.faqs} />
                </div>
              )}

              {/* Patient Experiences / Testimonial Placeholder */}
              <div className="flex flex-col gap-3 border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold font-heading text-primary-dark">
                  Patient Experiences
                </h3>
                <div className="p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl text-xs text-amber-900 font-mono">
                  {area.testimonialPlaceholder}
                </div>
              </div>

            </div>

            {/* Right Column: Embedded Map & Booking CTAs */}
            <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
              
              {/* Map Embed */}
              <div className="bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft flex flex-col min-h-[300px]">
                <div className="relative w-full flex-grow min-h-[220px]">
                  <iframe
                    src="https://maps.google.com/maps?q=Baby%20Steps%20Newborn%20Child%20Clinic,%20Pooja%20Colony,%20Neelbad,%20Bhopal&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    title="Google Map location for Baby Steps Clinic"
                    className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <div className="p-3 bg-white border-t border-gray-100 flex items-center justify-between text-xs font-sans">
                  <span className="text-muted-text">Can&apos;t see the map?</span>
                  <a
                    href={siteConfig.googleMapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-primary hover:underline min-h-[44px] flex items-center"
                  >
                    Open in Google Maps &rarr;
                  </a>
                </div>
              </div>

              {/* Consultation Booking Box */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 shadow-soft text-left flex flex-col gap-5">
                <h3 className="text-lg font-bold font-heading text-primary-dark border-b border-gray-100 pb-3 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  <span>Book Consultation</span>
                </h3>
                
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Appointments are available for routine immunization, critical neonatal follow-ups, and pediatric checkups. Schedule today via WhatsApp or call our desk.
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

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
