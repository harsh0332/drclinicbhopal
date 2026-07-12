import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Baby Steps Clinic",
  robots: { index: false, follow: false },
};

// Shared shell for everything under /admin (login + panel). The public site
// chrome (header, footer, WhatsApp bar) is skipped for these routes in
// SiteChrome, so admin pages control their own full-screen canvas.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  // -mb-20 cancels the body's mobile pb-20 (reserved for the public sticky bar).
  return <div className="min-h-dvh w-full bg-slate-100 font-sans text-slate-900 -mb-20 lg:mb-0">{children}</div>;
}
