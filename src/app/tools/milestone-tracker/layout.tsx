import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Baby Developmental Milestone Tracker | Baby Steps Bhopal",
  description: "Track your baby's physical, cognitive, social, and motor development milestones by age. Free pediatric screening tool by Baby Steps Clinic Bhopal.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/tools/milestone-tracker",
  },
  openGraph: {
    title: "Baby Developmental Milestone Tracker | Baby Steps Bhopal",
    description: "Track your baby's physical, cognitive, social, and motor development milestones by age. Free pediatric screening tool by Baby Steps Clinic Bhopal.",
    url: "https://babystepsnewbornclinic.com/tools/milestone-tracker",
    siteName: "Baby Steps – Newborn & Child Clinic",
    images: [
      {
        url: "https://babystepsnewbornclinic.com/api/og?title=Baby%20Developmental%20Milestone%20Tracker&category=Free%20Pediatric%20Tool",
        width: 1200,
        height: 630,
        alt: "Baby Steps – Newborn & Child Clinic",
      }
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Baby Developmental Milestone Tracker | Baby Steps Bhopal",
    description: "Track your baby's physical, cognitive, social, and motor development milestones by age. Free pediatric screening tool by Baby Steps Clinic Bhopal.",
    images: ["https://babystepsnewbornclinic.com/api/og?title=Baby%20Developmental%20Milestone%20Tracker&category=Free%20Pediatric%20Tool"],
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
