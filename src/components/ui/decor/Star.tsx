import React from "react";

interface StarProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
}

export default function Star({ colorClass = "fill-accent-sunshine", ...props }: StarProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "24"}
      height={props.height || "24"}
      {...props}
    >
      <path d="M12 2C12 7.523 16.477 12 22 12C16.477 12 12 16.477 12 22C12 16.477 7.523 12 2 12C7.523 12 12 7.523 12 2Z" />
    </svg>
  );
}
