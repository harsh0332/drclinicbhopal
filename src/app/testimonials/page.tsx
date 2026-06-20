import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { getBreadcrumbSchema } from "@/lib/schemas";
import { MessageSquare, Star, Play, FileCheck, Calendar, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Parent Testimonials | Baby Steps Clinic",
  description: "Factual feedback and clinical experiences shared by families consulting our pediatric specialists in Neelbad, Bhopal.",
};

export default function TestimonialsPage() {
  const writtenReviews = [
    {
      text: "Dr. Sudarshan and Dr. Manisha provided wonderful support during our NICU discharge. They explained the baby's feeding schedule and growth tracking parameters very clearly, which helped reduce our anxiety as first-time parents.",
      author: "Pooja Sharma",
      role: "Mother of 3-month-old baby, Bhopal",
      date: "May 2026"
    },
    {
      text: "The clinic's appointment scheduling is extremely efficient. We rarely have to wait more than 10 minutes, and the vaccination cold-chain transparency gives us absolute peace of mind. Highly recommend their care.",
      author: "Rajesh Verma",
      role: "Father of 1.5-year-old child, Neelbad",
      date: "April 2026"
    },
    {
      text: "Dr. Manisha's breastfeeding counseling sessions were incredibly helpful. She took the time to explain proper techniques and monitored our baby's weight-for-age chart to ensure everything was on track.",
      author: "Anjali Gupta",
      role: "Mother of 6-week-old newborn, Bhopal",
      date: "June 2026"
    },
    {
      text: "Dr. Sudarshan was extremely thorough in diagnosing our daughter's asthma. He spent 15 minutes teaching us the correct spacer and inhaler techniques and gave us a written action plan. Her symptoms are now well monitored.",
      author: "Vikram Singh",
      role: "Father of 6-year-old child, Kolar Road",
      date: "May 2026"
    }
  ];

  // Breadcrumbs schema
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Testimonials", item: "/testimonials" }
  ]);

  return (
    <main className="flex-1 bg-white">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Testimonials</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight">
              Parent Testimonials &amp; Reviews
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Factual, compliance-approved clinical feedback shared by families who consult our pediatricians in Neelbad, Bhopal.
            </p>
          </div>
        </div>
      </section>

      {/* Main content grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top segment: Google Reviews Widget + Video Testimonial placeholder */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto mb-16 items-stretch">
            
            {/* Google Reviews stats */}
            <div className="lg:col-span-5 bg-surface-tint border border-primary/5 rounded-3xl p-8 flex flex-col justify-between text-left">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-accent-sunshine fill-accent-sunshine" />
                  ))}
                </div>
                <h2 className="text-xl font-bold font-heading text-primary-dark">
                  Verified Google Rating
                </h2>
                <p className="text-xs text-muted-text font-sans leading-relaxed">
                  Based on reviews from local families in Bhopal. We encourage objective feedback regarding outpatient care, timing, and facility cleanliness.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href={siteConfig.googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white text-xs font-semibold py-3 px-5 rounded-xl hover:bg-primary-dark shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Write Google Review</span>
                </a>
              </div>
            </div>

            {/* Video Testimonials placeholder */}
            <div className="lg:col-span-7 bg-gray-50 border border-gray-150 rounded-3xl p-8 flex flex-col justify-center items-center relative overflow-hidden min-h-[220px]">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-55" />
              <div className="relative z-10 flex flex-col items-center gap-3 text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm">
                  <Play className="w-5 h-5 fill-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-heading text-primary-dark">Video Feedback Placeholder</h3>
                  <p className="text-xs text-muted-text font-sans mt-0.5">Parent consent approved for educational screening</p>
                </div>
              </div>
            </div>

          </div>

          {/* Written Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {writtenReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white border border-gray-150 rounded-3xl p-8 shadow-soft flex flex-col justify-between text-left hover:border-primary/15 transition-all duration-300"
              >
                <p className="text-sm sm:text-base text-gray-800 leading-relaxed font-sans italic mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                
                <div className="flex items-center justify-between border-t border-gray-50 pt-4 text-xs">
                  <div className="flex flex-col">
                    <span className="font-bold font-heading text-primary-dark">{review.author}</span>
                    <span className="text-muted-text font-sans">{review.role}</span>
                  </div>
                  <span className="text-muted-text font-sans flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {review.date}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* NMC Ethics Compliance disclaimer */}
          <div className="max-w-4xl mx-auto mt-16 p-5 bg-white border border-gray-150 rounded-2xl text-left flex gap-3 text-[11px] text-muted-text leading-relaxed font-sans shadow-soft">
            <FileCheck className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
            <div>
              <strong className="text-primary-dark font-heading block mb-1">NMC Compliance &amp; Consent Standard</strong>
              <p>In accordance with the National Medical Commission (NMC) ethics guidelines and the Drugs &amp; Magic Remedies Act, all patient testimonials listed on this page represent genuine experiences shared voluntarily by parents. Written consent forms are kept on file in our medical records office. Testimonials are purely observational and do not constitute a diagnostic claim, clinical cure guarantee, or endorsement of clinical superiority.</p>
              <p className="mt-2 font-semibold">{siteConfig.compliance.medicalRegistration}</p>
            </div>
          </div>

          {/* Bottom booking CTA */}
          <div className="max-w-3xl mx-auto bg-surface-tint border border-primary/5 rounded-3xl p-8 text-center mt-16 flex flex-col items-center gap-4">
            <h3 className="text-xl font-bold font-heading text-primary-dark">
              Consult with our Specialists
            </h3>
            <p className="text-sm text-muted-text font-sans leading-relaxed max-w-xl">
              Appointments are available for routine immunization, critical neonatal follow-ups, and pediatric checkups.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link
                href="/book-appointment"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white text-sm font-semibold py-3.5 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all active:scale-[0.98]"
              >
                <Calendar className="w-4.5 h-4.5" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
