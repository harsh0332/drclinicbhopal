import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Vaccination Schedule Calculator | Baby Steps",
  description: "Generate a personalized childhood immunization chart based on official IAP guidelines. Calculate exact due dates for your baby's vaccines online.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/tools/vaccination-schedule",
  },
  openGraph: {
    title: "Child Vaccination Schedule Calculator | Baby Steps",
    description: "Generate a personalized childhood immunization chart based on official IAP guidelines. Calculate exact due dates for your baby's vaccines online.",
    url: "https://babystepsnewbornclinic.com/tools/vaccination-schedule",
    siteName: "Baby Steps – Newborn & Child Clinic",
    images: [
      {
        url: "https://babystepsnewbornclinic.com/api/og?title=Child%20Vaccination%20Schedule%20Calculator&category=Free%20Pediatric%20Tool",
        width: 1200,
        height: 630,
        alt: "Baby Steps – Newborn & Child Clinic",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Child Vaccination Schedule Calculator | Baby Steps",
    description: "Generate a personalized childhood immunization chart based on official IAP guidelines. Calculate exact due dates for your baby's vaccines online.",
    images: ["https://babystepsnewbornclinic.com/api/og?title=Child%20Vaccination%20Schedule%20Calculator&category=Free%20Pediatric%20Tool"],
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
