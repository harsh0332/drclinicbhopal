"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface BalloonProps extends React.SVGProps<SVGSVGElement> {
  colorClass?: string;
  stringColorClass?: string;
  animate?: boolean;
}

export default function Balloon({ 
  colorClass = "fill-accent-coral", 
  stringColorClass = "stroke-gray-300", 
  animate = true,
  ...props 
}: BalloonProps) {
  const shouldReduceMotion = useReducedMotion();
  const isAnimated = animate && !shouldReduceMotion;

  return (
    <svg
      viewBox="0 0 24 36"
      width={props.width || "24"}
      height={props.height || "36"}
      className={props.className || ""}
      {...props}
    >
      <motion.g
        animate={isAnimated ? { y: [0, -6, 0], rotate: [0, 4, -4, 0] } : {}}
        transition={isAnimated ? { duration: 6, repeat: Infinity, ease: "easeInOut" } : {}}
        style={{ transformOrigin: "bottom center" }}
      >
        {/* String */}
        <path
          d="M12 24C10 28 14 31 12 35"
          fill="none"
          className={stringColorClass}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        {/* Balloon Body */}
        <path
          d="M12 2C6.5 2 2 6.5 2 12C2 17 6 21 10.5 21.8L12 24L13.5 21.8C18 21 22 17 22 12C22 6.5 17.5 2 12 2Z"
          className={colorClass}
        />
        {/* Inner highlight for premium glossy look */}
        <path
          d="M6 8C5.5 10 6 12 6.5 13"
          fill="none"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-40"
        />
      </motion.g>
    </svg>
  );
}
