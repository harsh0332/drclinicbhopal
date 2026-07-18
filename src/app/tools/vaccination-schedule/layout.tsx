import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Vaccination Schedule & Immunization Chart | Baby Steps Clinic",
  description: "View complete age-wise childhood vaccination schedule based on latest IAP & WHO guidelines. Plan immunization visits online in Bhopal.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/tools/vaccination-schedule",
  },
  openGraph: {
    title: "Child Vaccination Schedule & Immunization Chart | Baby Steps Clinic",
    description: "View complete age-wise childhood vaccination schedule based on latest IAP & WHO guidelines. Plan immunization visits online in Bhopal.",
    url: "https://babystepsnewbornclinic.com/tools/vaccination-schedule",
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
    title: "Child Vaccination Schedule & Immunization Chart | Baby Steps Clinic",
    description: "View complete age-wise childhood vaccination schedule based on latest IAP & WHO guidelines. Plan immunization visits online in Bhopal.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-surface-tint/50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
            The Childhood Vaccination Schedule Tool displays a complete age-wise immunization chart based on current Indian Academy of Pediatrics (IAP) and UIP guidelines. Parents can view mandatory and recommended vaccine doses from birth through 18 years, including Hexavalent, Rotavirus, and Pneumococcal vaccines. Schedule your child&apos;s WHO-compliant cold-chain vaccination visit at Baby Steps Clinic, Bhopal.
          </p>
        </div>
      </section>
      {children}
    </>
  );
}
