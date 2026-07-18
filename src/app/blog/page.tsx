import Link from "next/link";
import { Metadata } from "next";
import { blogData } from "@/lib/blog-data";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import JsonLd from "@/components/ui/json-ld";
import { Calendar, Clock, ArrowRight, ShieldCheck } from "lucide-react";

import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Parent Education Blog & Resources | Baby Steps Clinic",
  description: "Read child care articles, newborn wellness advice, and pediatric guidelines written by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/blog",
  },
  openGraph: {
    title: "Parent Education Blog & Resources | Baby Steps Clinic",
    description: "Read child care articles, newborn wellness advice, and pediatric guidelines written by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya.",
    url: "https://babystepsnewbornclinic.com/blog",
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
    title: "Parent Education Blog & Resources | Baby Steps Clinic",
    description: "Read child care articles, newborn wellness advice, and pediatric guidelines written by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function BlogHubPage() {
  const posts = Object.values(blogData);

  // Breadcrumbs schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Blog", item: "/blog" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <JsonLd data={breadcrumbSchema} />

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
              <span className="text-primary-dark font-medium">Blog</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Pediatric &amp; Newborn Education Blog
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Trustworthy guidance and helpful parenting tips written and reviewed by our pediatric specialists. We focus on child development, immunizations, and newborn care.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Directory List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="bg-white border border-gray-150 rounded-3xl shadow-soft hover:shadow-md transition-all duration-300 flex flex-col h-full overflow-hidden text-left"
              >
                {/* Tag */}
                <div className="p-6 pb-2">
                  <span className="text-[10px] font-bold text-primary bg-surface-tint border border-primary/10 py-1 px-2.5 rounded-full uppercase tracking-wider">
                    {post.category}
                  </span>
                </div>

                {/* Content */}
                <div className="px-6 flex-grow flex flex-col gap-3">
                  <h2 className="text-lg font-bold font-heading text-primary-dark leading-snug line-clamp-2 hover:text-primary transition-colors">
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-xs text-muted-text font-sans leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                {/* Footer details */}
                <div className="p-6 mt-auto border-t border-gray-50 flex flex-col gap-4">
                  <div className="flex items-center justify-between text-[11px] text-muted-text font-sans">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between gap-2 border-t border-gray-50 pt-3">
                    <div className="flex flex-col text-left">
                      <span className="text-[11px] font-semibold text-primary-dark font-sans">
                        By {post.author}
                      </span>
                      <span className="text-[9px] text-muted-text truncate max-w-[150px]">
                        Medical Reviewer
                      </span>
                    </div>
                    
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center justify-center p-2 border border-gray-200 hover:border-primary/20 text-muted-text hover:text-primary rounded-xl transition-all"
                      aria-label="Read Post"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Medical Disclaimer Panel */}
          <div className="max-w-3xl mx-auto mt-16 p-5 bg-surface-tint border border-primary/5 rounded-2xl text-left flex gap-3 text-xs text-muted-text leading-relaxed font-sans">
            <ShieldCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <strong className="text-primary-dark font-heading block mb-1">E-E-A-T Compliance Note</strong>
              <p>All articles published on the Baby Steps Clinic blog are authored or reviewed by qualified pediatric specialists. Content is strictly educational and does not constitute medical diagnosis or individual treatment plans.</p>
              <p className="mt-2 font-semibold">{siteConfig.compliance.medicalRegistration}</p>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
