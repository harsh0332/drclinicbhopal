"use client";

import { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site-config";
import { MapPin } from "lucide-react";

interface MapFacadeProps {
  className?: string;
  heightClass?: string;
}

export default function MapFacade({
  className = "",
  heightClass = "min-h-[300px]",
}: MapFacadeProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoaded) return;

    // IntersectionObserver to load iframe when user scrolls near the map (200px margin)
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [isLoaded]);

  return (
    <div
      ref={containerRef}
      className={`bg-white border border-gray-150 rounded-3xl overflow-hidden shadow-soft flex flex-col ${heightClass} ${className}`}
    >
      <div
        className="relative w-full flex-grow min-h-[220px] bg-surface-tint cursor-pointer group"
        onClick={() => setIsLoaded(true)}
      >
        {isLoaded ? (
          <iframe
            src="https://maps.google.com/maps?q=Baby%20Steps%20Newborn%20Child%20Clinic,%20Pooja%20Colony,%20Neelbad,%20Bhopal&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map location for Baby Steps Clinic"
            className="absolute inset-0 w-full h-full grayscale hover:grayscale-0 transition-all duration-300"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#F4F8FF] to-[#EAF1FF]">
            {/* Map styling elements */}
            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 shadow-xs group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6 stroke-[2]" />
            </div>
            <span className="text-sm font-bold font-heading text-primary-dark mb-1">
              Baby Steps Clinic Location
            </span>
            <span className="text-xs text-muted-text font-sans max-w-xs mb-4">
              227/1, Near Durga Mata Mandir, Pooja Colony, Neelbad, Bhopal
            </span>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl shadow-xs hover:bg-primary-dark transition-colors"
            >
              <span>Explore Interactive Map</span>
            </button>
          </div>
        )}
      </div>
      <div className="p-3.5 bg-white border-t border-gray-100 flex items-center justify-between text-xs font-sans">
        <span className="text-muted-text">Can&apos;t see the map?</span>
        <a
          href={siteConfig.googleMapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 font-semibold text-primary hover:underline min-h-[44px] flex items-center"
        >
          Open in Google Maps &rarr;
        </a>
      </div>
    </div>
  );
}
