import React from "react";

interface BabyFootprintsProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
}

export default function BabyFootprints({ colorClass = "fill-primary/20", ...props }: BabyFootprintsProps) {
  return (
    <svg
      viewBox="0 0 42 32"
      width={props.width || "42"}
      height={props.height || "32"}
      className={props.className || ""}
      {...props}
    >
      {/* Left Foot */}
      <g className={colorClass}>
        {/* Footprint Sole */}
        <path d="M12.5 24C11.5 22.5 9 17 9 13C9 9 11.5 6.5 13.5 6.5C15.5 6.5 17 9 17 13C17 17.5 14.5 22.5 13.5 24C13.2 24.5 12.8 24.5 12.5 24Z" />
        {/* Toes */}
        <ellipse cx="14.5" cy="3.5" rx="1.8" ry="2.2" />
        <circle cx="11.2" cy="4.5" r="1.3" />
        <circle cx="8.5" cy="6.5" r="1.1" />
        <circle cx="6.8" cy="9.2" r="1.0" />
        <circle cx="6.2" cy="12.5" r="0.9" />
      </g>

      {/* Right Foot (Walking step: shifted right, slightly lower, and mirrored) */}
      <g className={colorClass} transform="translate(26, 4) scale(-1, 1) translate(-14, 0)">
        {/* Footprint Sole */}
        <path d="M12.5 24C11.5 22.5 9 17 9 13C9 9 11.5 6.5 13.5 6.5C15.5 6.5 17 9 17 13C17 17.5 14.5 22.5 13.5 24C13.2 24.5 12.8 24.5 12.5 24Z" />
        {/* Toes */}
        <ellipse cx="14.5" cy="3.5" rx="1.8" ry="2.2" />
        <circle cx="11.2" cy="4.5" r="1.3" />
        <circle cx="8.5" cy="6.5" r="1.1" />
        <circle cx="6.8" cy="9.2" r="1.0" />
        <circle cx="6.2" cy="12.5" r="0.9" />
      </g>
    </svg>
  );
}
