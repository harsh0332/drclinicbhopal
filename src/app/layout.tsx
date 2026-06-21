import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileStickyBar from "@/components/layout/mobile-sticky-bar";
import WhatsAppFloating from "@/components/layout/whatsapp-floating";
import AmbientBackground from "@/components/layout/ambient-background";
import { siteConfig } from "@/lib/site-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const baloo2 = Baloo_2({
  variable: "--font-baloo-2",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
  description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
  keywords: ["pediatrician Bhopal", "child clinic Neelbad", "baby vaccination Bhopal", "newborn specialist Bhopal", "Dr. Sudarshan Dev Arya", "Dr. Manisha Bangarwa Arya"],
  icons: {
    icon: "/images/logo/logo.svg",
  },
  openGraph: {
    title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
    description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
    url: "https://www.babystepsclinic.in",
    siteName: "Baby Steps – Newborn & Child Clinic",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${baloo2.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-transparent text-gray-900 pb-20 lg:pb-0">
        <AmbientBackground />
        {/* Skip to content link for keyboard & screen-reader users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <WhatsAppFloating />
        <MobileStickyBar />
        {/* JSON-LD Structured Data for the clinic */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: siteConfig.name,
              url: "https://www.babystepsclinic.in",
              telephone: "+916262560101",
              email: siteConfig.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: "227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad",
                addressLocality: "Bhopal",
                addressRegion: "Madhya Pradesh",
                postalCode: "462044",
                addressCountry: "IN",
              },
              medicalSpecialty: "Pediatrics",
              openingHours: "Mo-Sa 10:00-13:00,17:00-20:00",
            }),
          }}
        />
      </body>
    </html>
  );
}
