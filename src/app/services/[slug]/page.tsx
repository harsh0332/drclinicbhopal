import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/lib/services-data";
import { siteConfig } from "@/lib/site-config";
import { Calendar, Phone, CheckCircle2, Activity, GraduationCap } from "lucide-react";
import FAQAccordion from "@/components/ui/faq-accordion";
import JsonLd from "@/components/ui/json-ld";
import { getServiceSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schemas";
import { blogData } from "@/lib/blog-data";

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
    description: `Learn more about our ${service.title} services. Why it matters and what to expect during your child's visit at Baby Steps Clinic in Neelbad, Bhopal.`,
    alternates: {
      canonical: `https://babystepsnewbornclinic.com/services/${slug}`,
    },
    openGraph: {
      title: `${service.title} in Neelbad, Bhopal | Baby Steps Clinic`,
      description: `Learn more about our ${service.title} services. Why it matters and what to expect during your child's visit at Baby Steps Clinic in Neelbad, Bhopal.`,
      url: `https://babystepsnewbornclinic.com/services/${slug}`,
      siteName: "Baby Steps – Newborn & Child Clinic",
      type: "website",
    },
  };
}

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug
  }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData[slug];

  if (!service) {
    notFound();
  }

  const serviceSchema = getServiceSchema({ ...service, slug });
  const faqSchema = getFAQSchema(service.faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Services", item: "/services" },
    { name: service.title, item: `/services/${slug}` }
  ]);

  // Local SEO internal links mapping
  const drSudarshan = siteConfig.doctors.find(d => d.id === "dr-sudarshan-dev-arya")!;
  const drManisha = siteConfig.doctors.find(d => d.id === "dr-manisha-bangarwa-arya")!;
  
  const manishaFirst = [
    "nicu-follow-up",
    "breastfeeding-counseling",
    "newborn-care",
    "development-assessment",
    "milestone-tracking"
  ].includes(slug);
  
  const careTeam = manishaFirst ? [drManisha, drSudarshan] : [drSudarshan, drManisha];

  const blogMapping: Record<string, string> = {
    "vaccination-clinic": "baby-vaccination-guide",
    "breastfeeding-counseling": "breastfeeding-tips-new-mothers",
    "milestone-tracking": "six-month-development-milestones"
  };
  const blogSlug = blogMapping[slug];
  const relatedArticle = blogSlug ? blogData[blogSlug] : null;

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />
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

              {/* Consulting Specialists Care Team */}
              <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 text-left flex flex-col gap-4 shadow-soft">
                <h3 className="text-sm font-bold font-heading text-primary-dark flex items-center gap-2">
                  <GraduationCap className="w-4.5 h-4.5 text-primary" />
                  <span>Consulting Specialists</span>
                </h3>
                <div className="flex flex-col gap-3">
                  {careTeam.map((doc, idx) => (
                    <Link
                      key={idx}
                      href={`/doctors/${doc.id}`}
                      className="p-3 bg-surface-tint/50 border border-primary/5 hover:bg-surface-tint rounded-xl transition-all flex flex-col text-left group"
                    >
                      <span className="font-semibold text-xs sm:text-sm text-primary-dark group-hover:text-primary transition-colors">
                        {doc.name}
                      </span>
                      <span className="text-[10.5px] text-muted-text mt-0.5 font-sans leading-relaxed">
                        {doc.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Related Educational Article for Parents */}
              {relatedArticle && (
                <div className="bg-white border border-gray-150 rounded-3xl p-6 sm:p-8 text-left flex flex-col gap-4 shadow-soft">
                  <h3 className="text-sm font-bold font-heading text-primary-dark flex items-center gap-2">
                    <Activity className="w-4.5 h-4.5 text-primary" />
                    <span>Parent Resources</span>
                  </h3>
                  <Link
                    href={`/blog/${relatedArticle.slug}`}
                    className="p-3.5 bg-surface-tint/40 hover:bg-surface-tint/80 border border-primary/5 rounded-xl transition-all flex flex-col gap-1.5 text-left group"
                  >
                    <span className="font-semibold text-xs sm:text-sm text-primary-dark group-hover:text-primary transition-colors leading-snug">
                      {relatedArticle.title}
                    </span>
                    <span className="text-[10.5px] text-muted-text leading-relaxed font-sans">
                      {relatedArticle.excerpt}
                    </span>
                  </Link>
                </div>
              )}

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
