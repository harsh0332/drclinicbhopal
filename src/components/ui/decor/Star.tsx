"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface StarProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
  animate?: boolean;
}

export default function Star({ colorClass = "fill-accent-sunshine", animate = true, ...props }: StarProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = animate && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${colorClass} ${props.className || ""}`}
      width={props.width || "24"}
      height={props.height || "24"}
      {...props}
    >
      <motion.path 
        d="M12 2C12 7.523 16.477 12 22 12C16.477 12 12 16.477 12 22C12 16.477 7.523 12 2 12C7.523 12 12 7.523 12 2Z" 
        animate={isAnimated ? { scale: [1, 1.15, 1], rotate: [0, 15, 0] } : {}}
        transition={isAnimated ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : {}}
        style={{ transformOrigin: "center center" }}
      />
    </svg>
  );
}
