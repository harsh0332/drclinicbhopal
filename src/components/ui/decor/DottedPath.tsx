import React from "react";

interface DottedPathProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
  dasharray?: string;
}

export default function DottedPath({
  colorClass = "stroke-primary/30",
  dasharray = "4, 6",
  ...props
}: DottedPathProps) {
  return (
    <svg
      viewBox="0 0 100 40"
      width={props.width || "100"}
      height={props.height || "40"}
      className={props.className || ""}
      {...props}
    >
      <path
        d="M 5 20 C 30 5, 70 35, 95 20"
        fill="none"
        className={colorClass}
        strokeWidth="2.5"
        strokeDasharray={dasharray}
        strokeLinecap="round"
      />
    </svg>
  );
}
