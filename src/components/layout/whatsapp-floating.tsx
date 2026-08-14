"use client";

import { useState, useEffect } from "react";
import { MessageSquare } from "lucide-react";
import dynamic from "next/dynamic";
import { siteConfig } from "@/lib/site-config";

const WhatsAppCaptureLink = dynamic(
  () => import("@/components/ui/whatsapp-capture-link"),
  { ssr: false }
);

export default function WhatsAppFloating() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setReady(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", trigger);
      window.removeEventListener("pointermove", trigger);
      window.removeEventListener("touchstart", trigger);
      window.removeEventListener("keydown", trigger);
    };

    window.addEventListener("scroll", trigger, { passive: true, once: true });
    window.addEventListener("pointermove", trigger, { passive: true, once: true });
    window.addEventListener("touchstart", trigger, { passive: true, once: true });
    window.addEventListener("keydown", trigger, { passive: true, once: true });

    if ("requestIdleCallback" in window) {
      const id = (window as any).requestIdleCallback(trigger, { timeout: 3000 });
      return () => {
        cleanup();
        (window as any).cancelIdleCallback(id);
      };
    } else {
      const timeout = setTimeout(trigger, 2500);
      return () => {
        cleanup();
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="hidden lg:flex fixed bottom-8 right-8 z-40 items-center justify-center">
      {ready ? (
        <WhatsAppCaptureLink
          className="flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group duration-300"
          ariaLabel="Contact us on WhatsApp"
        >
          {/* Tooltip Badge */}
          <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
            Chat with us
          </span>
          {/* WhatsApp Icon */}
          <MessageSquare className="w-6 h-6 fill-white stroke-[1.5]" />
        </WhatsAppCaptureLink>
      ) : (
        <a
          href={siteConfig.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group duration-300"
          aria-label="Contact us on WhatsApp"
        >
          {/* Tooltip Badge */}
          <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
            Chat with us
          </span>
          {/* WhatsApp Icon */}
          <MessageSquare className="w-6 h-6 fill-white stroke-[1.5]" />
        </a>
      )}
    </div>
  );
}
