import Link from "next/link";
import { Metadata } from "next";
import { FileText, ArrowLeft, AlertTriangle } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Terms of Use | Baby Steps Newborn & Child Clinic Bhopal",
  description: "Review the Terms of Use for Baby Steps Newborn & Child Clinic website. Understand our medical disclaimer and online booking conditions.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/terms",
  },
  openGraph: {
    title: "Terms of Use | Baby Steps Newborn & Child Clinic Bhopal",
    description: "Review the Terms of Use for Baby Steps Newborn & Child Clinic website. Understand our medical disclaimer and online booking conditions.",
    url: "https://babystepsnewbornclinic.com/terms",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function TermsPage() {
  return (
    <main className="flex-1 bg-white select-none">
      {/* Page Header */}
      <section className="bg-surface-tint border-b border-gray-100 py-12 relative overflow-hidden">
        {/* Background Decors */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] z-0 select-none">
          <div className="absolute right-[12%] top-[10%]">
            <Cloud className="w-36 h-20 fill-primary" />
          </div>
          <div className="absolute left-[3%] bottom-[-10px]">
            <BabyFootprints className="w-12 h-10 rotate-[15deg] fill-primary" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-2 text-left">
            <div className="flex items-center gap-2 text-xs text-muted-text font-sans">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-primary-dark font-medium">Terms of Use</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight flex items-center gap-3">
              <FileText className="w-9 h-9 text-secondary shrink-0" />
              <span>Terms of Use</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Last updated: June 2026. Please read these terms carefully before using our website and clinical tools.
            </p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="prose prose-blue max-w-none font-sans text-sm sm:text-base leading-relaxed text-muted-text flex flex-col gap-8">
            
            <p className="text-base text-gray-700">
              Welcome to the website of <strong>Baby Steps – Newborn &amp; Child Clinic</strong>. By accessing or using our website, tools, and online booking systems, you agree to comply with and be bound by the following Terms of Use. If you do not agree to these terms, please do not use this website.
            </p>

            {/* Crucial Medical Disclaimer */}
            <div className="p-5 bg-red-50/50 border border-red-100 rounded-2xl flex flex-col gap-3">
              <h3 className="text-base font-bold font-heading text-red-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                <span>CRITICAL MEDICAL DISCLAIMER</span>
              </h3>
              <p className="text-xs sm:text-sm text-red-950 font-sans leading-relaxed">
                The content on this website, including text, graphics, blog articles, milestone trackers, and growth calculators, is provided for general informational purposes only. It is <strong>NOT</strong> intended to be a substitute for professional medical advice, diagnosis, treatment, or clinical consultation. Always seek the advice of <strong>Dr. Sudarshan Dev Arya</strong>, <strong>Dr. Manisha Bangarwa Arya</strong>, or other qualified healthcare providers in person regarding any child health or medical concerns. Never ignore professional medical advice or delay seeking it because of something read on this website.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                1. Use of Website and Interactive Tools
              </h2>
              <p>
                We provide online pediatric tools (such as the Vaccine Schedule generator, Growth Calculator, and Milestone Tracker) for educational estimation only:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                <li>Calculations and recommendations are estimates based on standard clinical charts (WHO and IAP guidelines) and may vary depending on individual child health histories.</li>
                <li>You agree to use these tools solely for personal, non-commercial purposes.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                2. Online Appointment Booking
              </h2>
              <p>
                Our booking form allows parents to submit slot inquiries. Please note:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                <li>Submission of a booking request does <strong>not</strong> guarantee an immediate appointment. A clinic coordinator will confirm your appointment via phone, SMS, or WhatsApp.</li>
                <li>Please arrive at the clinic 10 minutes prior to your confirmed slot to help minimize waiting room congestion.</li>
                <li>If you need to cancel or reschedule, please call the clinic number at least 2 hours in advance.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                3. Intellectual Property Rights
              </h2>
              <p>
                All original content, designs, custom illustrations, branding logos, and layouts on this website are the intellectual property of <strong>Baby Steps Clinic</strong> and are protected under Indian copyright laws. Copying, republishing, or distributing any assets without written permission is strictly prohibited.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                4. Limitation of Liability
              </h2>
              <p>
                Baby Steps Clinic and its practitioners shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use of, or inability to use, this website, its educational content, or online calculators.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                5. Governing Law and Jurisdiction
              </h2>
              <p>
                These Terms of Use are governed by the laws of India. Any disputes arising out of the use of this website shall be subject to the exclusive jurisdiction of the competent courts in <strong>Bhopal, Madhya Pradesh, India</strong>.
              </p>
            </div>

            <div className="pt-6 border-t border-gray-100 flex justify-center">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:underline"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Homepage</span>
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
