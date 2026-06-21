"use client";

import React from "react";

export default function AmbientBackground() {
  return (
    <div 
      className="fixed inset-0 w-full h-full -z-50 pointer-events-none select-none overflow-hidden bg-[#FBFCFF]"
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
          background: radial-gradient(circle, rgba(46, 108, 246, 0.09) 0%, rgba(46, 108, 246, 0) 70%);
        }
        .ambient-blob-2 {
          background: radial-gradient(circle, rgba(52, 199, 164, 0.07) 0%, rgba(52, 199, 164, 0) 70%);
        }
        .ambient-blob-3 {
          background: radial-gradient(circle, rgba(255, 197, 61, 0.06) 0%, rgba(255, 197, 61, 0) 70%);
        }
        .ambient-blob-4 {
          background: radial-gradient(circle, rgba(255, 138, 122, 0.06) 0%, rgba(255, 138, 122, 0) 70%);
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

      {/* Blob 1: Primary Blue (Top-Left) */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] min-w-[450px] min-h-[450px] rounded-full blur-[80px] sm:blur-[100px] ambient-blob-1 animate-blob-1 will-change-transform"
      />

      {/* Blob 2: Mint Green (Top-Right) */}
      <div 
        className="absolute top-[10%] right-[-15%] w-[55vw] h-[55vw] min-w-[500px] min-h-[500px] rounded-full blur-[90px] sm:blur-[120px] ambient-blob-2 animate-blob-2 will-change-transform"
      />

      {/* Blob 3: Sunshine Yellow (Bottom-Left) */}
      <div 
        className="absolute bottom-[-15%] left-[-10%] w-[50vw] h-[50vw] min-w-[480px] min-h-[480px] rounded-full blur-[80px] sm:blur-[100px] ambient-blob-3 will-change-transform"
      />

      {/* Blob 4: Coral Red (Bottom-Right) */}
      <div 
        className="absolute bottom-[10%] right-[-10%] w-[45vw] h-[45vw] min-w-[420px] min-h-[420px] rounded-full blur-[80px] sm:blur-[100px] ambient-blob-4 will-change-transform"
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
