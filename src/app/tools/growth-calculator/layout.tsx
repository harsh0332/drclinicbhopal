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
  return (
    <>
      <section className="bg-surface-tint/50 border-b border-gray-100 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs sm:text-sm text-muted-text font-sans leading-relaxed">
            The WHO Child Growth Calculator allows parents to track their child&apos;s height, weight, and Body Mass Index (BMI) against World Health Organization growth standards. By calculating exact percentiles for infants and children up to 10 years, parents can monitor developmental trajectories. Consult our Bhopal pediatricians at Baby Steps Clinic to interpret percentile trends and ensure optimal nutritional wellness.
          </p>
        </div>
      </section>
      {children}
    </>
  );
}
