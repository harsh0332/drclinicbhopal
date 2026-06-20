import React from "react";

interface RainbowArcProps extends React.SVGProps<SVGSVGElement> {
  outerColor?: string;
  mid1Color?: string;
  mid2Color?: string;
  innerColor?: string;
}

export default function RainbowArc({
  outerColor = "stroke-[#2E6CF6]",
  mid1Color = "stroke-[#34C7A4]",
  mid2Color = "stroke-[#FFC53D]",
  innerColor = "stroke-[#FF8A7A]",
  ...props
}: RainbowArcProps) {
  return (
    <svg
      viewBox="0 0 100 60"
      width={props.width || "100"}
      height={props.height || "60"}
      className={props.className || ""}
      {...props}
    >
      <g fill="none" strokeWidth="4" strokeLinecap="round" className="opacity-90">
        {/* Outer Arc */}
        <path d="M 10 55 A 40 40 0 0 1 90 55" className={outerColor} />
        {/* Mid-1 Arc */}
        <path d="M 22 55 A 28 28 0 0 1 78 55" className={mid1Color} />
        {/* Mid-2 Arc */}
        <path d="M 34 55 A 16 16 0 0 1 66 55" className={mid2Color} />
        {/* Inner Arc */}
        <path d="M 46 55 A 4 4 0 0 1 54 55" className={innerColor} strokeWidth="3" />
      </g>
    </svg>
  );
}
