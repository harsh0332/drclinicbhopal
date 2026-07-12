import { siteConfig } from "@/lib/site-config";
import { Phone, MessageSquare, Calendar } from "lucide-react";
import WhatsAppCaptureLink from "@/components/ui/whatsapp-capture-link";

export default function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg px-4 py-3 flex items-center justify-between gap-3 animate-in slide-in-from-bottom duration-300">
      {/* Call Button */}
      <a
        href={siteConfig.phoneLink}
        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-primary-dark font-semibold rounded-xl py-3 text-sm min-h-[44px] hover:bg-gray-50 active:scale-[0.98] transition-all"
        aria-label="Call Clinic"
      >
        <Phone className="w-4 h-4 text-primary" />
        <span>Call</span>
      </a>

      {/* WhatsApp Button — captures name+phone as a lead before opening chat */}
      <WhatsAppCaptureLink
        className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-green-600 font-semibold rounded-xl py-3 text-sm min-h-[44px] hover:bg-gray-50 active:scale-[0.98] transition-all"
        ariaLabel="Chat on WhatsApp"
      >
        <MessageSquare className="w-4 h-4 text-green-500 fill-green-500" />
        <span>WhatsApp</span>
      </WhatsAppCaptureLink>

      {/* Book Appointment CTA — same capture flow (books happen on WhatsApp) */}
      <WhatsAppCaptureLink className="flex-[1.5] flex items-center justify-center gap-2 bg-primary text-white font-semibold rounded-xl py-3 text-sm min-h-[44px] shadow-sm hover:bg-primary-dark active:scale-[0.98] transition-all">
        <Calendar className="w-4 h-4" />
        <span>Book</span>
      </WhatsAppCaptureLink>
    </div>
  );
}
