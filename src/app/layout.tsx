import type { Metadata } from "next";
import { Inter, Baloo_2 } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import MobileStickyBar from "@/components/layout/mobile-sticky-bar";
import WhatsAppFloating from "@/components/layout/whatsapp-floating";

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
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 pb-20 lg:pb-0">
        <Header />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
        <WhatsAppFloating />
        <MobileStickyBar />
      </body>
    </html>
  );
}
