"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface CloudProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
  animate?: boolean;
}

export default function Cloud({ colorClass = "fill-surface-tint", animate = true, ...props }: CloudProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = animate && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 100 60"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "100"}
      height={props.height || "60"}
      {...props}
    >
      <motion.path 
        d="M 20 40 a 15 15 0 0 1 15 -15 a 20 20 0 0 1 35 -5 a 18 18 0 0 1 20 12 a 12 12 0 0 1 -10 18 H 20 a 12 12 0 0 1 0 -20 Z" 
        animate={isAnimated ? { y: [0, -4, 0] } : {}}
        transition={isAnimated ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : {}}
      />
    </svg>
  );
}
