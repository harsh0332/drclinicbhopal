import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { blogData } from "@/lib/blog-data";
import { getBlogPostingSchema, getFAQSchema, getBreadcrumbSchema } from "@/lib/schemas";
import JsonLd from "@/components/ui/json-ld";
import FAQAccordion from "@/components/ui/faq-accordion";
import { Calendar, Clock, GraduationCap, Building, ShieldCheck, ArrowLeft, CalendarDays } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const revalidate = 86400; // revalidate daily

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogData[slug];
  if (!post) return {};

  return {
    title: `${post.title} | Pediatric Health Blog`,
    description: post.excerpt,
    alternates: {
      canonical: `https://babystepsnewbornclinic.com/blog/${slug}`,
    },
    openGraph: {
      title: `${post.title} | Pediatric Health Blog`,
      description: post.excerpt,
      url: `https://babystepsnewbornclinic.com/blog/${slug}`,
      siteName: "Baby Steps – Newborn & Child Clinic",
      type: "article",
    },
  };
}

// Generate static params for build-time static generation
export async function generateStaticParams() {
  return Object.keys(blogData).map((slug) => ({
    slug
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogData[slug];

  if (!post) {
    notFound();
  }

  // Schema generations
  const articleSchema = getBlogPostingSchema(post);
  const faqSchema = getFAQSchema(post.faqs);
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" },
    { name: post.title, item: `/blog/${post.slug}` }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Dynamic JSON-LD Schemas Injection */}
      <JsonLd data={articleSchema} />
      <JsonLd data={faqSchema} />
      <JsonLd data={breadcrumbSchema} />

      {/* Page Header */}
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

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left relative z-10">
          <div className="flex flex-col gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline w-max"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to blog index</span>
            </Link>
            
            <span className="text-[10px] font-bold text-primary bg-white border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider w-max">
              {post.category}
            </span>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-xs text-muted-text font-sans mt-2">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {post.readTime}
              </span>
              <span>&bull;</span>
              <span>Reviewed by: <strong className="text-gray-900 font-medium">{post.author}</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Post content */}
            <div className="lg:col-span-8 flex flex-col gap-8 text-left">
              {/* Rich Text Wrapper */}
              <div
                className="prose prose-blue max-w-none text-sm sm:text-base text-muted-text font-sans leading-relaxed flex flex-col gap-6"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }}
              />

              {/* FAQs Accordion */}
              <div className="border-t border-gray-150 pt-8 mt-4 flex flex-col gap-4">
                <h2 className="text-xl font-bold font-heading text-primary-dark mb-2">
                  Frequently Asked Questions (Article Q&amp;A)
                </h2>
                <FAQAccordion faqs={post.faqs} />
              </div>
            </div>

            {/* Right Column: Reviewer Byline & CTA */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              {/* Reviewer Byline Card */}
              <div className="bg-white border border-gray-150 rounded-2xl p-5 text-left flex flex-col gap-4 shadow-soft">
                <h3 className="text-xs font-bold text-secondary-dark uppercase tracking-wider border-b border-gray-50 pb-2">
                  Medical Reviewer
                </h3>
                <div className="flex flex-col gap-1">
                  <span className="text-base font-bold font-heading text-primary-dark">
                    {post.author}
                  </span>
                  <span className="text-xs text-muted-text font-sans leading-relaxed">
                    Senior Pediatric Specialist
                  </span>
                </div>
                <div className="flex flex-col gap-2.5 text-xs text-muted-text font-sans mt-1">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{post.authorTitle}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Building className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{post.authorAffiliation}</span>
                  </div>
                </div>
                <div className="p-3 bg-surface-tint rounded-xl border border-primary/5 text-[10px] text-muted-text leading-relaxed font-sans mt-1 flex gap-2">
                  <ShieldCheck className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                  <span>Verified credentials aligned with National Medical Commission code.</span>
                </div>
              </div>

              {/* Booking CTA Box */}
              <div className="bg-white border border-gray-150 rounded-2xl p-6 text-left flex flex-col gap-4 shadow-soft">
                <h3 className="text-sm font-bold font-heading text-primary-dark flex items-center gap-1.5">
                  <CalendarDays className="w-4.5 h-4.5 text-primary" />
                  <span>Consult our Doctors</span>
                </h3>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Appointments are available for routine immunization, critical neonatal follow-ups, and pediatric checkups.
                </p>
                <Link
                  href="/#appointment"
                  className="w-full inline-flex items-center justify-center bg-primary text-white text-xs font-semibold py-3 rounded-xl hover:bg-primary-dark transition-all active:scale-[0.98] shadow-sm"
                >
                  Request Appointment
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
