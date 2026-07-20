import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileStickyBar from "@/components/layout/mobile-sticky-bar";
import WhatsAppFloating from "@/components/layout/whatsapp-floating";
import AmbientBackground from "@/components/layout/ambient-background";
import SiteChrome from "@/components/layout/site-chrome";
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
  metadataBase: new URL("https://babystepsnewbornclinic.com"),
  title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
  description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" }
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
    description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
    url: "https://babystepsnewbornclinic.com",
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
    title: "Baby Steps – Newborn & Child Clinic | Neelbad, Bhopal",
    description: "Premium pediatric clinic in Neelbad, Bhopal. Expert care by Dr. Sudarshan Dev Arya & Dr. Manisha Bangarwa Arya. Vaccination, newborn care, developmental assessment, and child health counseling.",
    images: ["https://babystepsnewbornclinic.com/images/og/og-default.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${inter.variable} ${baloo2.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-transparent text-gray-900 pb-20 lg:pb-0">
        <SiteChrome
          ambient={<AmbientBackground />}
          header={<Header />}
          footer={<Footer />}
          whatsapp={<WhatsAppFloating />}
          stickyBar={<MobileStickyBar />}
          schema={<></>}
        >
          {children}
        </SiteChrome>
      </body>
    </html>
  );
}
