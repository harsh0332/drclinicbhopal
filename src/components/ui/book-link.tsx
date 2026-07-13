"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { scrollToAppointment } from "@/lib/scroll-to-appointment";

/**
 * Shared "Book Appointment" CTA. Renders as a normal link to /#appointment,
 * but when the user is ALREADY on the homepage it intercepts the click and
 * runs the settle-aware smooth scroll (see scroll-to-appointment.ts). From
 * any other page it lets Next.js navigate; SiteChrome's hash handler then
 * performs the same settle-scroll on arrival.
 */
interface BookLinkProps {
  className?: string;
  ariaLabel?: string;
  children: React.ReactNode;
  /** Called on click before scrolling/navigation (e.g. close a mobile menu). */
  onNavigate?: () => void;
}

export default function BookLink({ className, ariaLabel, children, onNavigate }: BookLinkProps) {
  const pathname = usePathname();

  return (
    <Link
      href="/#appointment"
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        onNavigate?.();
        if (pathname === "/" && scrollToAppointment()) {
          e.preventDefault();
        }
      }}
    >
      {children}
    </Link>
  );
}
