import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Developmental Milestone Tracker | Baby Steps Clinic",
  description: "Track your baby's cognitive, motor, language, and social developmental milestones from birth to 5 years. Interactive checklist.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/tools/milestone-tracker",
  },
  openGraph: {
    title: "Child Developmental Milestone Tracker | Baby Steps Clinic",
    description: "Track your baby's cognitive, motor, language, and social developmental milestones from birth to 5 years. Interactive checklist.",
    url: "https://babystepsnewbornclinic.com/tools/milestone-tracker",
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
    title: "Child Developmental Milestone Tracker | Baby Steps Clinic",
    description: "Track your baby's cognitive, motor, language, and social developmental milestones from birth to 5 years. Interactive checklist.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className="bg-surface-tint/50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
            The Child Developmental Milestone Tracker provides an interactive checklist of cognitive, motor, language, and social milestones from birth up to 5 years. Based on Indian Academy of Pediatrics (IAP) developmental benchmarks, it helps parents identify age-appropriate progress. Early tracking allows timely consultation with our pediatric specialists in Neelbad, Bhopal.
          </p>
        </div>
      </section>
      {children}
    </>
  );
}
