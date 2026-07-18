import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import ClinicImage from "@/components/ui/clinic-image";
import { Phone, Mail, MapPin, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-dark text-white pt-16 pb-24 md:pb-12 border-t border-blue-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & About */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="inline-block">
              <ClinicImage
                src="/images/logo/logo-navy.png"
                alt={siteConfig.name}
                width={191}
                height={70}
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-blue-200 leading-relaxed font-sans max-w-sm mt-2">
              Providing premium, international-quality pediatric and newborn care in Neelbad, Bhopal. Guided by expert consultation and clinical excellence.
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              {Object.entries(siteConfig.socials).map(([key, value]) => (
                <a
                  key={key}
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-blue-900/50 hover:bg-primary text-blue-200 hover:text-white rounded-xl transition-all text-xs font-semibold capitalize flex items-center justify-center gap-1.5 min-h-[44px]"
                >
                  <span>{key}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-heading font-semibold text-accent-sunshine border-b border-blue-900 pb-2">
              Consultation Hours
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-150">
              {siteConfig.hours.map((hour, index) => (
                <li key={index} className="flex flex-col">
                  <span className="font-semibold text-white">{hour.days}</span>
                  <span className="text-blue-200 mt-0.5">{hour.time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-heading font-semibold text-accent-sunshine border-b border-blue-900 pb-2">
              Our Services
            </h3>
            <ul className="grid grid-cols-1 gap-2 text-sm text-blue-200">
              {siteConfig.services.slice(0, 6).map((service, index) => {
                const slug = service
                  .toLowerCase()
                  .replace(/[^a-z0-9\s-]/g, "")
                  .replace(/\s+/g, "-");
                return (
                  <li key={index}>
                    <Link href={`/services/${slug}`} className="hover:text-white transition-colors">
                      • {service}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href="/services" className="text-accent-sunshine hover:underline font-semibold block mt-1">
                  View All Services &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (NAP) */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-heading font-semibold text-accent-sunshine border-b border-blue-900 pb-2">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 shrink-0 text-secondary mt-0.5" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 shrink-0 text-secondary mt-1" />
                <div className="flex flex-col gap-1">
                  <a href={siteConfig.phoneLink} className="hover:text-white transition-colors font-semibold block">
                    +91 {siteConfig.phone} (Mobile)
                  </a>
                  <a href={siteConfig.landlineLink} className="hover:text-white transition-colors font-semibold block">
                    0755-{siteConfig.landline.split("-")[1]} (Landline)
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0 text-secondary" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </li>
              <li className="text-[11px] text-blue-300 font-sans border-t border-blue-900/50 pt-3.5 mt-1.5 leading-relaxed">
                {siteConfig.napString}
              </li>
            </ul>
            <a
              href={siteConfig.googleReviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 w-full inline-flex items-center justify-center gap-1.5 bg-accent-sunshine hover:bg-yellow-400 text-primary-dark text-xs font-bold py-2.5 px-4 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
            >
              <span>★ Review us on Google</span>
            </a>
          </div>
        </div>

        {/* Credentials and Disclaimer */}
        <div className="mt-12 pt-8 border-t border-blue-900 flex flex-col gap-6">
          {/* Medical Disclaimer */}
          <div className="p-4 bg-blue-950/60 rounded-2xl border border-blue-900 text-[11px] text-blue-300 leading-relaxed font-sans">
            <div className="flex items-center gap-1.5 font-semibold text-white mb-1.5">
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>REGULATORY &amp; MEDICAL DISCLAIMER</span>
            </div>
            <p>{siteConfig.compliance.disclaimer}</p>
            <p className="mt-2 font-mono text-[10px] text-blue-400">
              {siteConfig.compliance.medicalRegistration}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-300 border-t border-blue-900/50 pt-6">
            <div className="flex items-center gap-2.5">
              <div className="relative w-7 h-7 shrink-0">
                <ClinicImage
                  src="/images/illustrations/mascot.webp"
                  alt="Baby Steps Mascot"
                  fill
                  className="object-contain"
                />
              </div>
              <p>&copy; {currentYear} {siteConfig.name}. All Rights Reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Use
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
