"use client";

import { usePathname } from "next/navigation";

interface SiteChromeProps {
  ambient: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
  whatsapp: React.ReactNode;
  stickyBar: React.ReactNode;
  schema: React.ReactNode;
  children: React.ReactNode;
}

// Renders the public marketing chrome (header, footer, floating widgets)
// around page content — except for /admin routes, which provide their own
// full-screen shell. The chrome elements arrive as server-rendered props so
// nothing about the public pages changes.
export default function SiteChrome({
  ambient,
  header,
  footer,
  whatsapp,
  stickyBar,
  schema,
  children,
}: SiteChromeProps) {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <>
      {ambient}
      {/* Skip to content link for keyboard & screen-reader users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>
      {header}
      <main id="main-content" className="flex-1 flex flex-col">
        {children}
      </main>
      {footer}
      {whatsapp}
      {stickyBar}
      {schema}
    </>
  );
}
