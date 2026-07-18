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
    type: "website",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
