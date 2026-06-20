import React from "react";

interface SparkleProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
}

export default function Sparkle({ colorClass = "fill-accent-sunshine", ...props }: SparkleProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "24"}
      height={props.height || "24"}
      {...props}
    >
      {/* Large Sparkle */}
      <path d="M10 2C10 6.4 6.4 10 2 10C6.4 10 10 13.6 10 18C10 13.6 13.6 10 18 10C13.6 10 10 6.4 10 2Z" />
      {/* Small Sparkle Offset */}
      <path d="M18 13C18 15.2 16.2 17 14 17C16.2 17 18 18.8 18 21C18 18.8 19.8 17 22 17C19.8 17 18 15.2 18 13Z" className="opacity-80" />
    </svg>
  );
}
