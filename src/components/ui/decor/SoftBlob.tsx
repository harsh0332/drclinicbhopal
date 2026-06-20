import React from "react";

interface SoftBlobProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
}

export default function SoftBlob({ colorClass = "fill-surface-tint/60", ...props }: SoftBlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "200"}
      height={props.height || "200"}
      {...props}
    >
      <path d="M150 50C178 68 190 108 172 138C154 168 106 188 74 178C42 168 26 128 34 88C42 48 74 28 114 28C130 28 138 38 150 50Z" />
    </svg>
  );
}
