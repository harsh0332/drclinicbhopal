"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div 
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none select-none overflow-hidden bg-[linear-gradient(180deg,#FBFCFF_0%,#F4F8FF_30%,#EAFBF7_60%,#FBFCFF_100%)]"
      aria-hidden="true"
    >
      {/* CSS Keyframes for slow floating blobs, only enabled on desktop (md:) and when prefers-reduced-motion is not set */}
      <style jsx global>{`
        @keyframes ambient-float-1 {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(50px, -60px) scale(1.1); }
          66% { transform: translate(-30px, 40px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes ambient-float-2 {
          0% { transform: translate(0px, 0px) scale(1); }
          50% { transform: translate(-60px, 50px) scale(0.95); }
          100% { transform: translate(0px, 0px) scale(1); }
        }

        .ambient-blob-1 {
          background: radial-gradient(circle, rgba(46, 108, 246, 0.24) 0%, rgba(46, 108, 246, 0) 88%);
        }
        .ambient-blob-2 {
          background: radial-gradient(circle, rgba(52, 199, 164, 0.20) 0%, rgba(52, 199, 164, 0) 88%);
        }
        .ambient-blob-3 {
          background: radial-gradient(circle, rgba(255, 197, 61, 0.18) 0%, rgba(255, 197, 61, 0) 88%);
        }
        .ambient-blob-4 {
          background: radial-gradient(circle, rgba(255, 138, 122, 0.16) 0%, rgba(255, 138, 122, 0) 88%);
        }
        .ambient-blob-5 {
          background: radial-gradient(circle, rgba(52, 199, 164, 0.14) 0%, rgba(52, 199, 164, 0) 88%);
        }

        /* Responsive float animation only for desktop/tablet and non-reduced-motion users */
        @media (min-width: 768px) {
          @media (prefers-reduced-motion: no-preference) {
            .animate-blob-1 {
              animation: ambient-float-1 25s ease-in-out infinite;
            }
            .animate-blob-2 {
              animation: ambient-float-2 28s ease-in-out infinite;
            }
          }
        }
      `}</style>

      {/* Blob 1: Primary Blue (Top-Left / Center-Left on Mobile) */}
      <div 
        className="absolute left-[-20%] top-[-5%] w-[80vw] h-[80vw] rounded-full blur-[70px] md:left-[-10%] md:top-[-10%] md:w-[50vw] md:h-[50vw] ambient-blob-1 animate-blob-1 will-change-transform"
      />

      {/* Blob 2: Mint Green (Top-Right / Center-Right on Mobile) */}
      <div 
        className="absolute right-[-25%] top-[15%] w-[90vw] h-[90vw] rounded-full blur-[80px] md:right-[-15%] md:top-[10%] md:w-[55vw] md:h-[55vw] ambient-blob-2 animate-blob-2 will-change-transform"
      />

      {/* Blob 3: Sunshine Yellow (Bottom-Left / Mid-Left on Mobile) */}
      <div 
        className="absolute left-[-25%] bottom-[10%] w-[85vw] h-[85vw] rounded-full blur-[70px] md:left-[-10%] md:bottom-[-15%] md:w-[50vw] md:h-[50vw] ambient-blob-3 will-change-transform"
      />

      {/* Blob 4: Coral Red (Bottom-Right / Mid-Right on Mobile) */}
      <div 
        className="absolute right-[-20%] bottom-[5%] w-[80vw] h-[80vw] rounded-full blur-[70px] md:right-[-10%] md:bottom-[10%] md:w-[45vw] md:h-[45vw] ambient-blob-4 will-change-transform"
      />

      {/* Blob 5: Middle Mint/Blue Blob for central coverage */}
      <div 
        className="absolute left-[10%] top-[45%] w-[80vw] h-[80vw] rounded-full blur-[80px] md:left-[30%] md:top-[45%] md:w-[35vw] md:h-[35vw] ambient-blob-5 will-change-transform"
      />

      {/* SVG Grain Noise Overlay (2% opacity) */}
      <div 
        className="absolute inset-0 w-full h-full opacity-[0.02] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
