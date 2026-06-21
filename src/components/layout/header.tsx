"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { Phone, Menu, X, Calendar } from "lucide-react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-soft py-3"
          : "bg-white py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 focus-visible:outline-3 focus-visible:outline-[#163C7A] focus-visible:outline-offset-3 rounded-xl">
            <div className="w-[42px] h-[42px] rounded-[13px] bg-gradient-to-br from-[#2E6CF6] to-[#34C7A4] flex items-center justify-center shadow-[0_5px_16px_rgba(46,108,246,0.3)]">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
                <ellipse cx="9" cy="13" rx="4.4" ry="5.6" />
                <circle cx="6.4" cy="5.8" r="1.7" />
                <circle cx="9.6" cy="4.2" r="1.7" />
                <circle cx="12.8" cy="5.4" r="1.6" />
                <circle cx="14.6" cy="8.2" r="1.4" />
              </svg>
            </div>
            <div className="flex flex-col leading-[1.05]">
              <span className="font-heading font-bold text-lg text-[#163C7A]">Baby Steps</span>
              <span className="text-[10.5px] font-medium tracking-[0.05em] text-[#5A6B85]">NEWBORN &amp; CHILD CLINIC</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-[14.5px] font-semibold transition-colors hover:text-[#2E6CF6] relative pb-1 after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-[-2px] after:h-[2px] after:bg-[#2E6CF6] after:rounded-[2px] after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-250 ${
                    isActive ? "text-[#2E6CF6] after:scale-x-100" : "text-[#5A6B85]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Click-to-Call */}
            <a
              href={siteConfig.phoneLink}
              aria-label={`Call the clinic at ${siteConfig.phone}`}
              className="flex items-center gap-2 text-[13.5px] font-bold text-[#163C7A] border border-[#163C7A]/15 hover:bg-[#F4F8FF] hover:border-[#2E6CF6]/35 transition-all py-2.5 px-4 rounded-full min-h-[44px]"
            >
              <Phone className="w-4 h-4 text-[#2E6CF6]" />
              <span>{siteConfig.phone}</span>
            </a>
            {/* Book Appointment Button */}
            <Link
              href="#appointment"
              className="inline-flex items-center justify-center gap-2 bg-[#2E6CF6] text-white text-sm font-bold py-3 px-5 rounded-full hover:shadow-lg transition-all active:scale-[0.98] min-h-[44px]"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Actions (Hamburger & Call) */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={siteConfig.phoneLink}
              className="p-3 text-primary-dark bg-surface-tint rounded-xl hover:bg-blue-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Call Clinic"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-muted-text hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div id="mobile-menu" role="dialog" aria-label="Navigation Menu" className="lg:hidden fixed inset-0 z-40 top-[73px] bg-white border-t border-gray-100 animate-in fade-in duration-200">
          <nav className="flex flex-col p-6 gap-6 h-full bg-white">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-heading font-medium pb-2 border-b border-gray-50 transition-colors ${
                    isActive ? "text-primary font-bold border-primary/20" : "text-muted-text"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <div className="flex flex-col gap-4 mt-6">
              <a
                href={siteConfig.phoneLink}
                className="flex items-center justify-center gap-2 text-base font-semibold text-primary-dark bg-surface-tint py-4 rounded-2xl"
              >
                <Phone className="w-5 h-5" />
                <span>Call: {siteConfig.phone}</span>
              </a>
              <Link
                href={siteConfig.whatsappLink}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-center gap-2 bg-primary text-white text-base font-semibold py-4 rounded-2xl shadow-md"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Appointment</span>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
