import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Child Growth Calculator & Percentile Tracker | Baby Steps Clinic",
  description: "Check your child's height, weight, and BMI percentiles using WHO-standard growth benchmarks. Simple and fast online calculator.",
  alternates: {
    canonical: "https://babystepsnewbornclinic.com/tools/growth-calculator",
  },
  openGraph: {
    title: "Child Growth Calculator & Percentile Tracker | Baby Steps Clinic",
    description: "Check your child's height, weight, and BMI percentiles using WHO-standard growth benchmarks. Simple and fast online calculator.",
    url: "https://babystepsnewbornclinic.com/tools/growth-calculator",
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
    title: "Child Growth Calculator & Percentile Tracker | Baby Steps Clinic",
    description: "Check your child's height, weight, and BMI percentiles using WHO-standard growth benchmarks. Simple and fast online calculator.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
