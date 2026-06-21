"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface SoftBlobProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
  animate?: boolean;
}

export default function SoftBlob({ colorClass = "fill-surface-tint/60", animate = true, ...props }: SoftBlobProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = animate && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 200 200"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "200"}
      height={props.height || "200"}
      {...props}
    >
      <motion.path 
        d="M150 50C178 68 190 108 172 138C154 168 106 188 74 178C42 168 26 128 34 88C42 48 74 28 114 28C130 28 138 38 150 50Z" 
        animate={isAnimated ? { scale: [1, 1.05, 0.97, 1], rotate: [0, 5, -5, 0] } : {}}
        transition={isAnimated ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : {}}
        style={{ transformOrigin: "center center" }}
      />
    </svg>
  );
}
