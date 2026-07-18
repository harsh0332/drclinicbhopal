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
  return <>{children}</>;
}
