import React from "react";

interface SectionDividerProps {
  type?: "wave" | "clouds";
  position?: "top" | "bottom";
  colorClass?: string; // e.g. "fill-surface-tint" or "fill-white"
  className?: string;
}

export default function SectionDivider({
  type = "wave",
  position = "bottom",
  colorClass = "fill-white",
  className = "",
}: SectionDividerProps) {
  // SVG paths based on type and position
  let dPath = "";
  let viewBox = "0 0 1440 100";

  if (type === "wave") {
    if (position === "bottom") {
      // Smooth wave dipping downwards to transition into next section
      dPath = "M0,0 C480,80 960,80 1440,0 L1440,100 L0,100 Z";
    } else {
      // Smooth wave curving upwards
      dPath = "M0,100 C480,20 960,20 1440,100 L1440,0 L0,0 Z";
    }
  } else {
    // Cloud edge divider (bubbly, friendly arches)
    if (position === "bottom") {
      dPath = `M0,0 
               Q90,60 180,0 
               Q270,60 360,0 
               Q450,60 540,0 
               Q630,60 720,0 
               Q810,60 900,0 
               Q990,60 1080,0 
               Q1170,60 1260,0 
               Q1350,60 1440,0 
               L1440,100 L0,100 Z`;
    } else {
      dPath = `M0,100 
               Q90,40 180,100 
               Q270,40 360,100 
               Q450,40 540,100 
               Q630,40 720,100 
               Q810,40 900,100 
               Q990,40 1080,100 
               Q1170,40 1260,100 
               Q1350,40 1440,100 
               L1440,0 L0,0 Z`;
    }
  }

  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`}>
      <svg
        viewBox={viewBox}
        className={`w-full h-auto ${colorClass}`}
        preserveAspectRatio="none"
        style={{ height: "40px", minHeight: "20px" }}
      >
        <path d={dPath} />
      </svg>
    </div>
  );
}
