import { siteConfig } from "@/lib/site-config";
import { MessageSquare } from "lucide-react";

export default function WhatsAppFloating() {
  return (
    <a
      href={siteConfig.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden lg:flex fixed bottom-8 right-8 z-40 items-center justify-center bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group duration-300"
      aria-label="Contact us on WhatsApp"
    >
      {/* Tooltip Badge */}
      <span className="absolute right-14 bg-white text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-100">
        Chat with us
      </span>
      {/* WhatsApp Icon */}
      <MessageSquare className="w-6 h-6 fill-white stroke-[1.5]" />
    </a>
  );
}
