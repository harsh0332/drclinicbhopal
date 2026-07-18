import Link from "next/link";
import { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { ShieldCheck, ArrowLeft, Mail, Phone, MapPin } from "lucide-react";
import Cloud from "@/components/ui/decor/Cloud";
import BabyFootprints from "@/components/ui/decor/BabyFootprints";

export const metadata: Metadata = {
  title: "Privacy Policy | Baby Steps Newborn & Child Clinic Bhopal",
  description: "Learn how Baby Steps Clinic protects your personal information and clinical booking data. We adhere to medical confidentiality guidelines.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/privacy",
  },
  openGraph: {
    title: "Privacy Policy | Baby Steps Newborn & Child Clinic Bhopal",
    description: "Learn how Baby Steps Clinic protects your personal information and clinical booking data. We adhere to medical confidentiality guidelines.",
    url: "https://babystepsnewbornclinic.com/privacy",
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
    title: "Privacy Policy | Baby Steps Newborn & Child Clinic Bhopal",
    description: "Learn how Baby Steps Clinic protects your personal information and clinical booking data. We adhere to medical confidentiality guidelines.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function PrivacyPage() {
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
              <span className="text-primary-dark font-medium">Privacy Policy</span>
            </div>
            <h1 className="text-4xl font-extrabold text-primary-dark font-heading leading-tight flex items-center gap-3">
              <ShieldCheck className="w-9 h-9 text-secondary shrink-0" />
              <span>Privacy Policy</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-text font-sans max-w-2xl leading-relaxed">
              Last updated: June 2026. Your privacy and clinical confidentiality are our utmost priorities.
            </p>
          </div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
          
          <div className="prose prose-blue max-w-none font-sans text-sm sm:text-base leading-relaxed text-muted-text flex flex-col gap-8">
            
            <p className="text-base text-gray-700">
              At <strong>Baby Steps – Newborn &amp; Child Clinic</strong>, we are committed to protecting the privacy of our patients (infants, children, and parents) and visitors. This Privacy Policy details how we collect, store, protect, and handle your information when you use our website, book appointments, or consult with us.
            </p>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                1. Information We Collect
              </h2>
              <p>
                To provide efficient appointment booking and healthcare services, we may collect the following details:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                <li><strong>Parent/Guardian Details:</strong> Name, phone number, and email address.</li>
                <li><strong>Child Details:</strong> Name, date of birth (for age-specific vaccine schedule calculations), and gender.</li>
                <li><strong>Clinical Inquiry Information:</strong> Preferred doctor (Dr. Sudarshan or Dr. Manisha), booking date, preferred slot, and optional brief reason for visit.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                2. How We Use Your Information
              </h2>
              <p>
                We use the collected information strictly for:
              </p>
              <ul className="list-disc pl-5 flex flex-col gap-2.5 mt-2">
                <li>Processing and scheduling your clinic appointments.</li>
                <li>Sending SMS/WhatsApp booking confirmations and schedule updates.</li>
                <li>Calculating personalized vaccine alerts based on your child&apos;s birthdate.</li>
                <li>Maintaining standard medical records as mandated by Indian clinical regulations.</li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                3. Confidentiality and Medical Records
              </h2>
              <p>
                Patient clinical histories and consultations are strictly confidential. We adhere to the <strong>National Medical Commission (NMC)</strong> guidelines and medical ethical practices in India. Medical records are shared only with the registered parents/guardians and are not disclosed to any third party without explicit legal consent.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                4. Data Storage and Security
              </h2>
              <p>
                All online appointment submissions are encrypted during transit (using SSL/HTTPS protocols) and stored securely within our private, access-controlled record systems (Google Workspace). Access to patient records is strictly restricted to authorized clinic staff.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                5. Third-Party Sharing Policy
              </h2>
              <p>
                We do not sell, trade, rent, or lease your personal information, contact numbers, or medical records to any marketing agencies or third parties. Information is shared strictly when required by law or local health authorities.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-bold font-heading text-primary-dark border-b border-gray-150 pb-2">
                6. Contact for Privacy Concerns
              </h2>
              <p>
                If you have any questions about this Privacy Policy or wish to request updating/deleting any stored contact information, please contact us:
              </p>
              <div className="mt-4 p-5 bg-surface-tint border border-primary/10 rounded-2xl flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-primary-dark">{siteConfig.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-semibold text-primary-dark">contact@babystepsclinic.in</span>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-primary-dark text-sm leading-tight">{siteConfig.address}</span>
                </div>
              </div>
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
