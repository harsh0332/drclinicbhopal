import React from "react";
import { LucideIcon } from "lucide-react";
import { serviceIconMap } from "@/lib/services-data";

interface ServiceIconTileProps {
  icon?: LucideIcon;
  serviceSlug?: string;
  index?: number;
  size?: number;
  className?: string;
}

// Color schemes matching the pediatric brand tokens
const colorSchemes = [
  { bg: "bg-[#F4F8FF]", border: "border-[#2E6CF6]/15", text: "text-[#2E6CF6]" }, // Blue (Primary)
  { bg: "bg-[#EAFBF7]", border: "border-[#34C7A4]/15", text: "text-[#34C7A4]" }, // Green (Mint)
  { bg: "bg-[#FFFBF0]", border: "border-[#FFC53D]/15", text: "text-[#FFC53D]" }, // Yellow (Sunshine)
  { bg: "bg-[#FFF6F5]", border: "border-[#FF8A7A]/15", text: "text-[#FF8A7A]" }  // Coral (Accent)
];

const serviceKeys = [
  "vaccination-clinic",
  "newborn-care",
  "nicu-follow-up",
  "growth-monitoring",
  "child-nutrition",
  "development-assessment",
  "breastfeeding-counseling",
  "fever-management",
  "allergy-asthma-care",
  "adolescent-health",
  "emergency-child-care",
  "parent-education",
  "milestone-tracking"
];

export default function ServiceIconTile({
  icon: IconComponent,
  serviceSlug,
  index,
  size = 24,
  className = ""
}: ServiceIconTileProps) {
  // Determine color scheme
  let colorIdx = 0;
  if (typeof index === "number") {
    colorIdx = index % colorSchemes.length;
  } else if (serviceSlug) {
    const slugIdx = serviceKeys.indexOf(serviceSlug);
    colorIdx = slugIdx !== -1 ? slugIdx % colorSchemes.length : 0;
  }

  const scheme = colorSchemes[colorIdx];

  // Resolve Icon Component if slug is provided
  const ResolvedIcon = IconComponent || (serviceSlug ? serviceIconMap[serviceSlug] : null);

  if (!ResolvedIcon) {
    return null;
  }

  return (
    <div
      className={`inline-flex items-center justify-center rounded-2xl border ${scheme.bg} ${scheme.border} p-3.5 shadow-sm transition-all duration-300 hover:scale-105 ${className}`}
    >
      <ResolvedIcon size={size} className={`${scheme.text} stroke-[1.8]`} />
    </div>
  );
}
