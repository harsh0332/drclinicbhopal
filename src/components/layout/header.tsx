"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
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
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <ClinicImage
              src="/images/logo/logo.png"
              alt={siteConfig.name}
              width={160}
              height={38}
              className="h-9 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {siteConfig.navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-muted-text"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Click-to-Call */}
            <a
              href={siteConfig.phoneLink}
              className="flex items-center gap-2 text-sm font-semibold text-primary-dark hover:text-primary transition-colors py-2 px-3 rounded-xl hover:bg-surface-tint"
            >
              <Phone className="w-4 h-4" />
              <span>{siteConfig.phone}</span>
            </a>
            {/* Book Appointment Button */}
            <Link
              href={siteConfig.whatsappLink}
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold py-3 px-6 rounded-2xl hover:bg-primary-dark shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment</span>
            </Link>
          </div>

          {/* Mobile Actions (Hamburger & Call) */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={siteConfig.phoneLink}
              className="p-2.5 text-primary-dark bg-surface-tint rounded-xl hover:bg-blue-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label="Call Clinic"
            >
              <Phone className="w-5 h-5" />
            </a>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 text-muted-text hover:text-primary-dark transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-xl"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 top-[73px] bg-white border-t border-gray-100 animate-in fade-in duration-200">
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
