"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { useReducedMotion } from "framer-motion";

const TAU = Math.PI * 2;
const frac = (x: number) => x - Math.floor(x);          // wrap to [0,1)
const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(b, v));
const smooth = (t: number) => t * t * (3 - 2 * t);      // smoothstep
const breathe = (p: number, phase = 0) => 0.5 + 0.5 * Math.sin(TAU * (p + phase));

// Brand palette (pastel / lightened)
const C = {
  skyTop: "#CFE2FF",
  skyMid: "#E6F0FF",
  skyLow: "#FBFDFF",
  mint:   "#34C7A4",
  blue:   "#2E6CF6",
  sun:    "#FFC53D",
  coral:  "#FF8A7A",
  foot:   "rgba(78, 112, 184, 0.22)",
};

interface CloudShapeProps {
  w: number;
  opacity: number;
}

function CloudShape({ w, opacity }: CloudShapeProps) {
  const h = w * 0.6;
  return (
    <svg width={w} height={h} viewBox="0 0 200 120"
      style={{ display: "block", filter: "blur(1.2px)", overflow: "visible" }}>
      <defs>
        <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="0.6" stopColor="#F2F7FF" stopOpacity="1" />
          <stop offset="1" stopColor="#D6E6FB" stopOpacity="1" />
        </linearGradient>
      </defs>
      <g fill="url(#cg)" opacity={opacity}>
        <ellipse cx="68" cy="74" rx="56" ry="33" />
        <ellipse cx="116" cy="64" rx="50" ry="40" />
        <ellipse cx="150" cy="80" rx="42" ry="29" />
        <ellipse cx="100" cy="90" rx="74" ry="26" />
      </g>
    </svg>
  );
}

interface SparkleProps {
  size: number;
  color: string;
}

function Sparkle({ size, color }: SparkleProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: "block" }}>
      <path d="M12 0.5c0.9 6.6 4 9.6 11 11-7 1.4-10.1 4.4-11 11-0.9-6.6-4-9.6-11-11 7-1.4 10.1-4.4 11-11Z"
        fill={color} />
    </svg>
  );
}

const BALLOON_TINTS = {
  coral: { id: "balg-c", hi: "#FFB7AB", mid: "#FF8A7A", lo: "#F4715F", line: "rgba(244,113,95,0.45)" },
  sun:   { id: "balg-s", hi: "#FFE3A1", mid: "#FFC53D", lo: "#F0AC1E", line: "rgba(240,172,30,0.45)" },
  mint:  { id: "balg-m", hi: "#9FE8D4", mid: "#34C7A4", lo: "#1FA486", line: "rgba(31,164,134,0.45)" },
};

interface BalloonShapeProps {
  w: number;
  tint?: "coral" | "sun" | "mint";
}

function BalloonShape({ w, tint = "coral" }: BalloonShapeProps) {
  const h = w * 1.42;
  const t = BALLOON_TINTS[tint] || BALLOON_TINTS.coral;
  return (
    <svg width={w} height={h} viewBox="0 0 120 170" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id={t.id} cx="0.38" cy="0.34" r="0.75">
          <stop offset="0" stopColor={t.hi} />
          <stop offset="0.55" stopColor={t.mid} />
          <stop offset="1" stopColor={t.lo} />
        </radialGradient>
      </defs>
      <path d="M60 118 C60 134 52 146 60 168" fill="none"
        stroke={t.line} strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="60" cy="58" rx="48" ry="56" fill={`url(#${t.id})`} />
      <path d="M54 112 L66 112 L60 124 Z" fill={t.lo} />
      <ellipse cx="44" cy="40" rx="13" ry="20" fill="rgba(255,255,255,0.45)"
        transform="rotate(-22 44 40)" />
    </svg>
  );
}

interface FootShapeProps {
  w: number;
  color: string;
}

function FootShape({ w, color }: FootShapeProps) {
  const h = w * 1.38;
  return (
    <svg width={w} height={h} viewBox="0 0 40 56" style={{ display: "block" }}>
      <g fill={color}>
        <path d="M20 14 C28 14 31.5 21 30.5 31 C29.6 40 25.5 49 20 50.5
                 C14.5 49 10.4 40 9.5 31 C8.5 21 12 14 20 14 Z" />
        <ellipse cx="11.5" cy="11" rx="3.1" ry="3.6" />
        <ellipse cx="17.5" cy="7.4" rx="2.7" ry="3.1" />
        <ellipse cx="23" cy="7" rx="2.4" ry="2.8" />
        <ellipse cx="27.6" cy="9" rx="2.1" ry="2.5" />
        <ellipse cx="31" cy="12.4" rx="1.8" ry="2.1" />
      </g>
    </svg>
  );
}

interface CloudDef {
  w: number;
  y: number;
  start: number;
  op: number;
  bob: number;
  phase: number;
}

interface StarDef {
  x: number;
  y: number;
  size: number;
  op: number;
  n: number;
  phase: number;
  color: string;
}

interface BalloonCfg {
  w: number;
  x: number;
  sway: number;
  swayPhase: number;
  offset: number;
  tint?: "coral" | "sun" | "mint";
  op?: number;
  blur?: number;
}

interface MoteDef {
  x: number;
  k: number;
  start: number;
  size: number;
  drift: number;
  phase: number;
  op: number;
  color: string;
}

interface FootprintPt {
  x: number;
  y: number;
  w: number;
  rot: number;
  mirror: boolean;
  op: number;
}

interface RainbowCfg {
  cx: number;
  cy: number;
  r: number;
  op: number;
  phase: number;
  a0: number;
  a1: number;
}

interface LayoutDef {
  clouds: CloudDef[];
  stars: StarDef[];
  balloon: BalloonCfg;
  balloon2: BalloonCfg;
  motes: MoteDef[];
  footpath: FootprintPt[];
  rainbow: RainbowCfg;
}

interface SkyProps {
  W: number;
  sunGlowRef: React.RefObject<HTMLDivElement | null>;
  coolLightRef: React.RefObject<HTMLDivElement | null>;
  iridescentWashRef: React.RefObject<HTMLDivElement | null>;
  sunDiscRef: React.RefObject<HTMLDivElement | null>;
}

function Sky({ W, sunGlowRef, coolLightRef, iridescentWashRef, sunDiscRef }: SkyProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* base sky gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${C.skyTop} 0%, ${C.skyMid} 46%, ${C.skyLow} 78%, #F1FBF7 100%)`,
      }} />
      {/* warm sun-glow, upper-right corner — breathes */}
      <div ref={sunGlowRef} style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(46% 50% at 86% 8%, rgba(255,197,61,0.34) 0%, rgba(255,197,61,0) 62%)`,
        willChange: "opacity",
      }} />
      {/* soft sun disc + slowly turning rays */}
      <div ref={sunDiscRef} style={{
        position: "absolute", left: "86%", top: "8%",
        transformOrigin: "center",
        willChange: "transform, opacity",
      }}>
        <svg width={W * 0.30} height={W * 0.30} viewBox="0 0 200 200" style={{ display: "block", filter: "blur(1px)" }}>
          <g stroke="rgba(255,197,61,0.20)" strokeWidth="7" strokeLinecap="round">
            {[0,1,2,3,4,5,6,7,8,9,10,11].map((k) => {
              const a = (k / 12) * TAU;
              const r0 = 58 + (k % 2) * 9, r1 = r0 + 16 + (k % 3) * 6;
              return <line key={k} x1={100 + r0 * Math.cos(a)} y1={100 + r0 * Math.sin(a)} x2={100 + r1 * Math.cos(a)} y2={100 + r1 * Math.sin(a)} />;
            })}
          </g>
          <circle cx="100" cy="100" r="34" fill="rgba(255,215,120,0.55)" />
          <circle cx="100" cy="100" r="24" fill="rgba(255,230,160,0.85)" />
        </svg>
      </div>
      {/* slow iridescent wash drifting across the top */}
      <div ref={iridescentWashRef} style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(60% 46% at 38% -6%, rgba(52,199,164,0.10) 0%, rgba(52,199,164,0) 60%)`,
        willChange: "background",
      }} />
      {/* faint cool light, upper-left */}
      <div ref={coolLightRef} style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(55% 60% at 16% 2%, rgba(46,108,246,1) 0%, rgba(46,108,246,0) 55%)`,
        willChange: "opacity",
      }} />
      {/* soft mint floor glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(70% 40% at 50% 108%, rgba(52,199,164,0.14) 0%, rgba(52,199,164,0) 60%)`,
      }} />
    </div>
  );
}

interface RainbowProps {
  W: number;
  H: number;
  cfg: RainbowCfg;
  wide: boolean;
  rainbowRef: React.RefObject<SVGGElement | null>;
}

function Rainbow({ W, H, cfg, wide, rainbowRef }: RainbowProps) {
  const cx = cfg.cx * W, cy = cfg.cy * H, r = cfg.r * W;
  const bands = ["#FF8A7A", "#FFC53D", "#34C7A4", "#2E6CF6"];
  const bw = r * 0.055;
  const a0 = (cfg.a0 ?? 26) * Math.PI / 180;   // arc kept to the top so no vertical legs
  const a1 = (cfg.a1 ?? 154) * Math.PI / 180;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <g ref={rainbowRef} fill="none" strokeLinecap="round" style={{ filter: wide ? "blur(2px)" : "none", willChange: "opacity" }}>
        {bands.map((col, k) => {
          const rr = r - k * bw * 1.3;
          const x0 = cx + rr * Math.cos(a0), y0 = cy - rr * Math.sin(a0);
          const x1 = cx + rr * Math.cos(a1), y1 = cy - rr * Math.sin(a1);
          return (
            <path key={k} d={`M ${x0} ${y0} A ${rr} ${rr} 0 0 0 ${x1} ${y1}`}
              stroke={col} strokeWidth={bw} opacity="0.7" />
          );
        })}
      </g>
    </svg>
  );
}

interface CloudsProps {
  W: number;
  defs: CloudDef[];
  wide: boolean;
  cloudRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function Clouds({ W, defs, wide, cloudRefs }: CloudsProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {defs.map((c, i) => {
        const cw = c.w * W;
        return (
          <div key={i}
            ref={(el) => { cloudRefs.current[i] = el; }}
            style={{
              position: "absolute", left: 0, top: 0,
              filter: wide ? "drop-shadow(0 16px 26px rgba(96,134,205,0.28))" : "none",
              willChange: "transform",
            }}>
            <CloudShape w={cw} opacity={c.op} />
          </div>
        );
      })}
    </div>
  );
}

interface StarsProps {
  W: number;
  H: number;
  defs: StarDef[];
  starRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function Stars({ W, H, defs, starRefs }: StarsProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {defs.map((s, i) => {
        return (
          <div key={i}
            ref={(el) => { starRefs.current[i] = el; }}
            style={{
              position: "absolute",
              left: `${s.x * W}px`,
              top: `${s.y * H}px`,
              willChange: "transform, opacity",
            }}>
            <Sparkle size={s.size} color={s.color} />
          </div>
        );
      })}
    </div>
  );
}

interface MotesProps {
  defs: MoteDef[];
  moteRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function Motes({ defs, moteRefs }: MotesProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {defs.map((m, i) => {
        return (
          <div key={i}
            ref={(el) => { moteRefs.current[i] = el; }}
            style={{
              position: "absolute", left: 0, top: 0,
              width: m.size, height: m.size, borderRadius: "50%",
              background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.95), ${m.color} 70%)`,
              opacity: 0,
              filter: "blur(0.4px)",
              willChange: "transform, opacity",
            }} />
        );
      })}
    </div>
  );
}

interface BalloonProps {
  W: number;
  cfg: BalloonCfg;
  balloonRef: React.RefObject<HTMLDivElement | null>;
}

function Balloon({ W, cfg, balloonRef }: BalloonProps) {
  const bw = cfg.w * W;
  const blurVal = cfg.blur ?? 0;
  return (
    <div ref={balloonRef} style={{
      position: "absolute", left: 0, top: 0,
      transformOrigin: "50% 0%",
      willChange: "transform",
      opacity: cfg.op ?? 1,
      filter: blurVal > 0 ? `blur(${blurVal}px)` : "none",
    }}>
      <BalloonShape w={bw} tint={cfg.tint} />
    </div>
  );
}

interface FootprintsProps {
  W: number;
  H: number;
  path: FootprintPt[];
  footprintRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function Footprints({ W, H, path, footprintRefs }: FootprintsProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {path.map((pt, i) => {
        const fw = pt.w * W;
        return (
          <div key={i}
            ref={(el) => { footprintRefs.current[i] = el; }}
            style={{
              position: "absolute",
              left: `${pt.x * W}px`,
              top: `${pt.y * H}px`,
              transform: `translate(-50%,-50%) rotate(${pt.rot}deg) scale(${pt.mirror ? -1 : 1}, 1)`,
              opacity: 0,
              willChange: "transform, opacity",
            }}>
            <FootShape w={fw} color={C.foot} />
          </div>
        );
      })}
    </div>
  );
}

function Grain() {
  const url = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
  return (
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: url, backgroundSize: "140px 140px",
      opacity: 0.05, mixBlendMode: "soft-light",
    }} />
  );
}

function layoutFor(wide: boolean): LayoutDef {
  if (wide) {
    return {
      clouds: [
        { w: 0.24, y: 0.05, start: 0.05, op: 0.95, bob: 9, phase: 0.0 },
        { w: 0.17, y: 0.02, start: 0.42, op: 0.7,  bob: 7, phase: 0.3 },
        { w: 0.20, y: 0.17, start: 0.66, op: 0.9,  bob: 11, phase: 0.6 },
        { w: 0.13, y: 0.27, start: 0.80, op: 0.55, bob: 6, phase: 0.15 },
      ],
      stars: [
        { x: 0.74, y: 0.10, size: 15, op: 0.9, n: 2, phase: 0.0,  color: C.sun },
        { x: 0.83, y: 0.21, size: 11, op: 0.8, n: 3, phase: 0.4,  color: "#ffffff" },
        { x: 0.91, y: 0.13, size: 13, op: 0.85, n: 2, phase: 0.7, color: C.sun },
        { x: 0.88, y: 0.35, size: 10, op: 0.7, n: 3, phase: 0.2,  color: "#ffffff" },
        { x: 0.96, y: 0.30, size: 12, op: 0.8, n: 2, phase: 0.55, color: C.sun },
        { x: 0.79, y: 0.06, size: 9,  op: 0.7, n: 3, phase: 0.85, color: "#ffffff" },
        { x: 0.68, y: 0.19, size: 10, op: 0.6, n: 2, phase: 0.33, color: C.sun },
        { x: 0.95, y: 0.50, size: 9,  op: 0.6, n: 3, phase: 0.1,  color: "#ffffff" },
        { x: 0.86, y: 0.55, size: 11, op: 0.55, n: 2, phase: 0.65, color: C.sun },
        { x: 0.73, y: 0.42, size: 8,  op: 0.5, n: 3, phase: 0.9,  color: "#ffffff" },
      ],
      balloon: { w: 0.072, x: 0.73, sway: 0.012, swayPhase: 0.0, offset: 0.18, tint: "coral" },
      balloon2: { w: 0.042, x: 0.885, sway: 0.009, swayPhase: 0.45, offset: 0.62, tint: "sun", op: 0.75, blur: 1.2 },
      motes: [
        { x: 0.70, k: 1, start: 0.10, size: 7, drift: 0.006, phase: 0.1, op: 0.5, color: "rgba(180,205,250,0.7)" },
        { x: 0.80, k: 1, start: 0.55, size: 5, drift: 0.008, phase: 0.5, op: 0.45, color: "rgba(255,214,140,0.7)" },
        { x: 0.90, k: 1, start: 0.30, size: 6, drift: 0.005, phase: 0.8, op: 0.4, color: "rgba(160,225,205,0.7)" },
        { x: 0.63, k: 1, start: 0.80, size: 4, drift: 0.007, phase: 0.3, op: 0.35, color: "rgba(180,205,250,0.7)" },
        { x: 0.96, k: 1, start: 0.72, size: 5, drift: 0.006, phase: 0.65, op: 0.4, color: "rgba(255,214,140,0.7)" },
      ],
      footpath: [
        { x: 0.45, y: 0.83, w: 0.026, rot: 14,  mirror: false, op: 0.95 },
        { x: 0.52, y: 0.85, w: 0.026, rot: 16,  mirror: true,  op: 0.95 },
        { x: 0.59, y: 0.865, w: 0.025, rot: 17, mirror: false, op: 0.9 },
        { x: 0.66, y: 0.875, w: 0.025, rot: 18, mirror: true,  op: 0.9 },
        { x: 0.735, y: 0.885, w: 0.024, rot: 19, mirror: false, op: 0.85 },
        { x: 0.81, y: 0.89, w: 0.024, rot: 20,  mirror: true,  op: 0.8 },
        { x: 0.885, y: 0.895, w: 0.023, rot: 21, mirror: false, op: 0.7 },
      ],
      rainbow: { cx: 0.79, cy: 0.60, r: 0.24, op: 0.26, phase: 0.5, a0: 28, a1: 152 },
    };
  }
  
  // vertical (9:16) — keep upper area lively, mid clear for headline.
  // Mobile Lightening Applied: Reduced counts and disabled secondary balloon completely.
  return {
    clouds: [
      { w: 0.42, y: 0.06, start: 0.05, op: 0.95, bob: 12, phase: 0.0 },
      { w: 0.30, y: 0.02, start: 0.45, op: 0.7,  bob: 9,  phase: 0.3 },
      { w: 0.36, y: 0.15, start: 0.70, op: 0.9,  bob: 14, phase: 0.6 },
    ],
    stars: [
      { x: 0.70, y: 0.08, size: 18, op: 0.9, n: 2, phase: 0.0,  color: C.sun },
      { x: 0.82, y: 0.16, size: 13, op: 0.8, n: 3, phase: 0.4,  color: "#ffffff" },
      { x: 0.88, y: 0.10, size: 15, op: 0.85, n: 2, phase: 0.7, color: C.sun },
      { x: 0.84, y: 0.25, size: 12, op: 0.7, n: 3, phase: 0.2,  color: "#ffffff" },
      { x: 0.20, y: 0.12, size: 13, op: 0.7, n: 2, phase: 0.55, color: C.sun },
      { x: 0.30, y: 0.06, size: 12, op: 0.65, n: 2, phase: 0.33, color: C.sun },
    ],
    balloon: { w: 0.16, x: 0.62, sway: 0.02, swayPhase: 0.0, offset: 0.2, tint: "coral" },
    balloon2: { w: 0, x: 0.85, sway: 0, swayPhase: 0, offset: 0, tint: "sun", op: 0, blur: 0 }, // Disabled
    motes: [
      { x: 0.20, k: 1, start: 0.10, size: 8, drift: 0.010, phase: 0.1, op: 0.5, color: "rgba(180,205,250,0.7)" },
      { x: 0.78, k: 1, start: 0.55, size: 6, drift: 0.012, phase: 0.5, op: 0.45, color: "rgba(255,214,140,0.7)" },
    ],
    footpath: [
      { x: 0.30, y: 0.80, w: 0.05, rot: 12,  mirror: false, op: 0.95 },
      { x: 0.38, y: 0.815, w: 0.05, rot: 14, mirror: true,  op: 0.95 },
      { x: 0.46, y: 0.835, w: 0.048, rot: 15, mirror: false, op: 0.9 },
      { x: 0.54, y: 0.85, w: 0.048, rot: 16, mirror: true,  op: 0.9 },
      { x: 0.625, y: 0.865, w: 0.046, rot: 17, mirror: false, op: 0.82 },
      { x: 0.71, y: 0.875, w: 0.046, rot: 18, mirror: true,  op: 0.75 },
      { x: 0.79, y: 0.885, w: 0.044, rot: 19, mirror: false, op: 0.65 },
    ],
    rainbow: { cx: 0.80, cy: 0.50, r: 0.34, op: 0.24, phase: 0.5, a0: 28, a1: 152 },
  };
}

interface HeroCanvasProps {
  W: number;
  H: number;
  wide: boolean;
  breatheContainerRef: React.RefObject<HTMLDivElement | null>;
  sunGlowRef: React.RefObject<HTMLDivElement | null>;
  coolLightRef: React.RefObject<HTMLDivElement | null>;
  iridescentWashRef: React.RefObject<HTMLDivElement | null>;
  sunDiscRef: React.RefObject<HTMLDivElement | null>;
  rainbowRef: React.RefObject<SVGGElement | null>;
  cloudRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  starRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  balloon1Ref: React.RefObject<HTMLDivElement | null>;
  balloon2Ref: React.RefObject<HTMLDivElement | null>;
  moteRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  footprintRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}

function HeroCanvas({
  W,
  H,
  wide,
  breatheContainerRef,
  sunGlowRef,
  coolLightRef,
  iridescentWashRef,
  sunDiscRef,
  rainbowRef,
  cloudRefs,
  starRefs,
  balloon1Ref,
  balloon2Ref,
  moteRefs,
  footprintRefs,
}: HeroCanvasProps) {
  const L = useMemo(() => layoutFor(wide), [wide]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <div
        ref={breatheContainerRef}
        style={{
          position: "absolute",
          inset: 0,
          transformOrigin: "50% 60%",
          willChange: "transform",
        }}
      >
        <Sky
          W={W}
          sunGlowRef={sunGlowRef}
          coolLightRef={coolLightRef}
          iridescentWashRef={iridescentWashRef}
          sunDiscRef={sunDiscRef}
        />
        <Rainbow W={W} H={H} cfg={L.rainbow} wide={wide} rainbowRef={rainbowRef} />
        {wide && <Balloon W={W} cfg={L.balloon2} balloonRef={balloon2Ref} />}
        <Clouds W={W} defs={L.clouds} wide={wide} cloudRefs={cloudRefs} />
        <Stars W={W} H={H} defs={L.stars} starRefs={starRefs} />
        <Motes defs={L.motes} moteRefs={moteRefs} />
        <Balloon W={W} cfg={L.balloon} balloonRef={balloon1Ref} />
        <Footprints W={W} H={H} path={L.footpath} footprintRefs={footprintRefs} />
      </div>
      {wide && <Grain />}
    </div>
  );
}

export default function HeroBackground() {
  const dur = 12; // Animation duration in seconds

  const reducedMotionLib = useReducedMotion();
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [wide, setWide] = useState(true);
  const [scale, setScale] = useState(1);

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Time is tracked in a Ref to avoid per-frame React state triggers
  const timeRef = useRef(dur * 0.35); // Start at calm visual frame (~0.35 p-value)

  // Imperative Refs for animating elements
  const breatheContainerRef = useRef<HTMLDivElement>(null);
  const sunGlowRef = useRef<HTMLDivElement>(null);
  const coolLightRef = useRef<HTMLDivElement>(null);
  const iridescentWashRef = useRef<HTMLDivElement>(null);
  const sunDiscRef = useRef<HTMLDivElement>(null);
  const rainbowRef = useRef<SVGGElement>(null);
  const cloudRefs = useRef<(HTMLDivElement | null)[]>([]);
  const starRefs = useRef<(HTMLDivElement | null)[]>([]);
  const balloon1Ref = useRef<HTMLDivElement>(null);
  const balloon2Ref = useRef<HTMLDivElement>(null);
  const moteRefs = useRef<(HTMLDivElement | null)[]>([]);
  const footprintRefs = useRef<(HTMLDivElement | null)[]>([]);

  const W = wide ? 1600 : 900;
  const H = wide ? 900 : 1600;

  const reducedMotion = reducedMotionLib === true;

  // Sync state values with refs to avoid closure stale state in rAF loop
  const wideRef = useRef(wide);
  const scaleRef = useRef(scale);
  useEffect(() => { wideRef.current = wide; }, [wide]);
  useEffect(() => { scaleRef.current = scale; }, [scale]);

  // Responsive dimension tracking & Cover Scaling
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const isWide = window.matchMedia("(min-width: 768px)").matches;
      setWide(isWide);

      const currentW = isWide ? 1600 : 900;
      const currentH = isWide ? 900 : 1600;

      setScale(Math.max(el.clientWidth / currentW, el.clientHeight / currentH));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const mediaQuery = window.matchMedia("(min-width: 768px)");
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", measure);
      return () => {
        ro.disconnect();
        mediaQuery.removeEventListener("change", measure);
      };
    } else {
      mediaQuery.addListener(measure);
      return () => {
        ro.disconnect();
        mediaQuery.removeListener(measure);
      };
    }
  }, []);

  // IntersectionObserver to pause loop player when out of view
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Purely Imperative Animation Updater
  const updateAnimation = (p: number) => {
    const isWide = wideRef.current;
    const L = layoutFor(isWide);
    const currentW = isWide ? 1600 : 900;
    const currentH = isWide ? 900 : 1600;

    // 0. Breathe scale container
    const breatheScale = 1 + 0.006 * Math.sin(TAU * p);
    if (breatheContainerRef.current) {
      breatheContainerRef.current.style.transform = `scale(${breatheScale.toFixed(5)})`;
    }

    // 1. Sky Glower & Rotator
    const dawn = 0.5 + 0.5 * Math.sin(TAU * p);
    const sunBreath = 0.55 + 0.45 * breathe(p, 0.0);
    if (sunGlowRef.current) {
      sunGlowRef.current.style.opacity = sunBreath.toString();
    }
    if (coolLightRef.current) {
      coolLightRef.current.style.opacity = (0.05 + 0.04 * dawn).toString();
    }
    if (sunDiscRef.current) {
      sunDiscRef.current.style.transform = `translate(-50%,-50%) rotate(${(p * 360).toFixed(2)}deg)`;
      sunDiscRef.current.style.opacity = (0.5 + 0.3 * sunBreath).toString();
    }
    if (iridescentWashRef.current) {
      const offset = 38 + 10 * Math.sin(TAU * p);
      iridescentWashRef.current.style.background = `radial-gradient(60% 46% at ${offset.toFixed(2)}% -6%, rgba(52,199,164,0.10) 0%, rgba(52,199,164,0) 60%)`;
    }

    // 2. Rainbow opacity
    if (rainbowRef.current) {
      const op = L.rainbow.op * (0.35 + 0.65 * breathe(p, L.rainbow.phase));
      rainbowRef.current.style.opacity = op.toString();
    }

    // 3. Clouds position
    L.clouds.forEach((c, i) => {
      const cloudDiv = cloudRefs.current[i];
      if (cloudDiv) {
        const cw = c.w * currentW;
        const span = currentW + cw;
        const x = frac(c.start + p) * span - cw;
        const y = c.y * currentH + Math.sin(TAU * (p + c.phase)) * c.bob;
        cloudDiv.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
      }
    });

    // 4. Stars twinkle
    L.stars.forEach((s, i) => {
      const starDiv = starRefs.current[i];
      if (starDiv) {
        const tw = 0.5 + 0.5 * Math.sin(TAU * (s.n * p + s.phase));
        const op = s.op * (0.18 + 0.82 * tw);
        const sc = 0.7 + 0.45 * tw;
        starDiv.style.transform = `translate(-50%,-50%) scale(${sc.toFixed(3)})`;
        starDiv.style.opacity = op.toString();
      }
    });

    // 5. Motes Drift
    L.motes.forEach((m, i) => {
      const moteDiv = moteRefs.current[i];
      if (moteDiv) {
        const pp = frac(p * m.k + m.start);
        const y = (1.06 - pp * 1.12) * currentH;
        const x = m.x * currentW + Math.sin(TAU * (p * 2 + m.phase)) * (m.drift * currentW);
        const fade = smooth(clamp(pp / 0.12, 0, 1)) * (1 - smooth(clamp((pp - 0.85) / 0.15, 0, 1)));
        const op = m.op * fade;
        moteDiv.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
        moteDiv.style.opacity = op.toString();
      }
    });

    // 6. Balloon 1 & 2 rise & sway
    if (balloon1Ref.current) {
      const bw = L.balloon.w * currentW;
      const bh = bw * 1.42;
      const travel = currentH + bh * 2.2;
      const pp = frac(p + L.balloon.offset);
      const y = (currentH + bh) - pp * travel;
      const x = L.balloon.x * currentW + Math.sin(TAU * (p + L.balloon.swayPhase)) * (L.balloon.sway * currentW);
      const rot = Math.sin(TAU * (p + L.balloon.swayPhase)) * 4;
      balloon1Ref.current.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
    }

    if (isWide && balloon2Ref.current && L.balloon2) {
      const bw = L.balloon2.w * currentW;
      const bh = bw * 1.42;
      const travel = currentH + bh * 2.2;
      const pp = frac(p + L.balloon2.offset);
      const y = (currentH + bh) - pp * travel;
      const x = L.balloon2.x * currentW + Math.sin(TAU * (p + L.balloon2.swayPhase)) * (L.balloon2.sway * currentW);
      const rot = Math.sin(TAU * (p + L.balloon2.swayPhase)) * 4;
      balloon2Ref.current.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
    }

    // 7. Footprints Reveal
    const revealStart = 0.10, revealEnd = 0.64;
    const fadeStart = 0.80, fadeEnd = 0.97;
    const trailFade = 1 - smooth(clamp((p - fadeStart) / (fadeEnd - fadeStart), 0, 1));
    const n = L.footpath.length;

    L.footpath.forEach((pt, i) => {
      const footprintDiv = footprintRefs.current[i];
      if (footprintDiv) {
        const t0 = revealStart + (revealEnd - revealStart) * (i / n);
        const appear = smooth(clamp((p - t0) / 0.06, 0, 1));
        const op = pt.op * appear * trailFade;
        footprintDiv.style.opacity = op.toString();
        const sc = 0.72 + 0.28 * appear;
        footprintDiv.style.transform = `translate(-50%,-50%) rotate(${pt.rot}deg) scale(${(pt.mirror ? -1 : 1) * sc}, ${sc})`;
      }
    });
  };

  // requestAnimationFrame loop player
  useEffect(() => {
    if (reducedMotion || !isIntersecting) {
      lastTime.current = null;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const step = (ts: number) => {
      if (lastTime.current == null) {
        lastTime.current = ts;
      }
      const dt = (ts - lastTime.current) / 1000;
      lastTime.current = ts;

      let nextTime = timeRef.current + dt;
      if (nextTime >= dur) nextTime = nextTime % dur;
      timeRef.current = nextTime;

      const p = frac(nextTime / dur);
      updateAnimation(p);

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      lastTime.current = null;
    };
  }, [reducedMotion, isIntersecting]);

  // One-time static render whenever layout, scale, intersection, or motion mode changes
  useEffect(() => {
    const p = frac(timeRef.current / dur);
    const frameId = requestAnimationFrame(() => {
      updateAnimation(p);
    });
    return () => cancelAnimationFrame(frameId);
  }, [wide, scale, reducedMotion, isIntersecting]);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: "#EAF1FE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
        zIndex: 0,
      }}
    >
      <div
        style={{
          width: `${W}px`,
          height: `${H}px`,
          position: "relative",
          flexShrink: 0,
          transform: `scale(${scale})`,
          transformOrigin: "center",
        }}
      >
        <HeroCanvas
          W={W}
          H={H}
          wide={wide}
          breatheContainerRef={breatheContainerRef}
          sunGlowRef={sunGlowRef}
          coolLightRef={coolLightRef}
          iridescentWashRef={iridescentWashRef}
          sunDiscRef={sunDiscRef}
          rainbowRef={rainbowRef}
          cloudRefs={cloudRefs}
          starRefs={starRefs}
          balloon1Ref={balloon1Ref}
          balloon2Ref={balloon2Ref}
          moteRefs={moteRefs}
          footprintRefs={footprintRefs}
        />
      </div>
    </div>
  );
}
