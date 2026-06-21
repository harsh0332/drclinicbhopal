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

interface BalloonShapeProps {
  w: number;
}

function BalloonShape({ w }: BalloonShapeProps) {
  const h = w * 1.42;
  return (
    <svg width={w} height={h} viewBox="0 0 120 170" style={{ display: "block", overflow: "visible" }}>
      <defs>
        <radialGradient id="balg" cx="0.38" cy="0.34" r="0.75">
          <stop offset="0" stopColor="#FFB7AB" />
          <stop offset="0.55" stopColor="#FF8A7A" />
          <stop offset="1" stopColor="#F4715F" />
        </radialGradient>
      </defs>
      <path d="M60 118 C60 134 52 146 60 168" fill="none"
        stroke="rgba(244,113,95,0.45)" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="60" cy="58" rx="48" ry="56" fill="url(#balg)" />
      <path d="M54 112 L66 112 L60 124 Z" fill="#F4715F" />
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
  footpath: FootprintPt[];
  rainbow: RainbowCfg;
}

interface SkyProps {
  p: number;
}

function Sky({ p }: SkyProps) {
  const dawn = 0.5 + 0.5 * Math.sin(TAU * p);           // 0..1
  const sunBreath = 0.55 + 0.45 * breathe(p, 0.0);
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* base sky gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: `linear-gradient(180deg, ${C.skyTop} 0%, ${C.skyMid} 46%, ${C.skyLow} 78%, #F1FBF7 100%)`,
      }} />
      {/* warm sun-glow, upper-right corner — breathes */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(46% 50% at 86% 8%, rgba(255,197,61,${0.34 * sunBreath}) 0%, rgba(255,197,61,0) 62%)`,
      }} />
      {/* faint cool light, upper-left, gives depth but stays clear */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(55% 60% at 16% 2%, rgba(46,108,246,${0.05 + 0.04 * dawn}) 0%, rgba(46,108,246,0) 55%)`,
      }} />
      {/* soft mint floor glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: `radial-gradient(70% 40% at 50% 108%, rgba(52,199,164,0.14) 0%, rgba(52,199,164,0) 60%)`,
      }} />
    </div>
  );
}

interface CloudsProps {
  W: number;
  H: number;
  p: number;
  defs: CloudDef[];
}

function Clouds({ W, H, p, defs }: CloudsProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {defs.map((c, i) => {
        const cw = c.w * W;
        const span = W + cw;                       // exactly one wrap per loop
        const x = frac(c.start + p) * span - cw;   // drifts right, wraps seamlessly
        const y = c.y * H + Math.sin(TAU * (p + c.phase)) * c.bob;
        return (
          <div key={i} style={{
            position: "absolute", left: 0, top: 0,
            transform: `translate(${x}px, ${y}px)`,
            filter: "drop-shadow(0 16px 26px rgba(96,134,205,0.28))",
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
  p: number;
  defs: StarDef[];
}

function Stars({ W, H, p, defs }: StarsProps) {
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {defs.map((s, i) => {
        const tw = 0.5 + 0.5 * Math.sin(TAU * (s.n * p + s.phase));
        const op = s.op * (0.18 + 0.82 * tw);
        const sc = 0.7 + 0.45 * tw;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${s.x * W}px`,
            top: `${s.y * H}px`,
            transform: `translate(-50%,-50%) scale(${sc})`,
            opacity: op, willChange: "transform, opacity",
          }}>
            <Sparkle size={s.size} color={s.color} />
          </div>
        );
      })}
    </div>
  );
}

interface BalloonProps {
  W: number;
  H: number;
  p: number;
  cfg: BalloonCfg;
}

function Balloon({ W, H, p, cfg }: BalloonProps) {
  const bw = cfg.w * W;
  const bh = bw * 1.42;
  const travel = H + bh * 2.2;
  const pp = frac(p + cfg.offset);                 // own phase
  const y = (H + bh) - pp * travel;                // bottom → up & out, wraps off-screen
  const x = cfg.x * W + Math.sin(TAU * (p + cfg.swayPhase)) * (cfg.sway * W);
  return (
    <div style={{
      position: "absolute", left: 0, top: 0,
      transform: `translate(${x}px, ${y}px) rotate(${Math.sin(TAU * (p + cfg.swayPhase)) * 4}deg)`,
      transformOrigin: "50% 0%",
      willChange: "transform",
    }}>
      <BalloonShape w={bw} />
    </div>
  );
}

interface FootprintsProps {
  W: number;
  H: number;
  p: number;
  path: FootprintPt[];
}

function Footprints({ W, H, p, path }: FootprintsProps) {
  const revealStart = 0.10, revealEnd = 0.64;      // window over which prints appear
  const fadeStart = 0.80, fadeEnd = 0.97;          // whole trail fades out
  const trailFade = 1 - smooth(clamp((p - fadeStart) / (fadeEnd - fadeStart), 0, 1));
  const n = path.length;

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {path.map((pt, i) => {
        const t0 = revealStart + (revealEnd - revealStart) * (i / n);
        const appear = smooth(clamp((p - t0) / 0.06, 0, 1));
        const op = pt.op * appear * trailFade;
        if (op < 0.002) return null;
        const fw = pt.w * W;
        return (
          <div key={i} style={{
            position: "absolute",
            left: `${pt.x * W}px`,
            top: `${pt.y * H}px`,
            transform: `translate(-50%,-50%) rotate(${pt.rot}deg) scale(${pt.mirror ? -1 : 1}, 1)`,
            opacity: op,
          }}>
            <FootShape w={fw} color={C.foot} />
          </div>
        );
      })}
    </div>
  );
}

interface RainbowProps {
  W: number;
  H: number;
  p: number;
  cfg: RainbowCfg;
}

function Rainbow({ W, H, p, cfg }: RainbowProps) {
  const op = cfg.op * (0.35 + 0.65 * breathe(p, cfg.phase));
  const cx = cfg.cx * W, cy = cfg.cy * H, r = cfg.r * W;
  const bands = ["#FF8A7A", "#FFC53D", "#34C7A4", "#2E6CF6"];
  const bw = r * 0.055;
  const a0 = (cfg.a0 ?? 26) * Math.PI / 180;   // arc kept to the top so no vertical legs
  const a1 = (cfg.a1 ?? 154) * Math.PI / 180;
  return (
    <svg width={W} height={H} style={{ position: "absolute", inset: 0, overflow: "visible" }}>
      <g opacity={op} fill="none" strokeLinecap="round" style={{ filter: "blur(2px)" }}>
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
      balloon: { w: 0.072, x: 0.73, sway: 0.012, swayPhase: 0.0, offset: 0.18 },
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
  // vertical (9:16) — keep upper area lively, mid clear for headline
  return {
    clouds: [
      { w: 0.42, y: 0.06, start: 0.05, op: 0.95, bob: 12, phase: 0.0 },
      { w: 0.30, y: 0.02, start: 0.45, op: 0.7,  bob: 9,  phase: 0.3 },
      { w: 0.36, y: 0.15, start: 0.70, op: 0.9,  bob: 14, phase: 0.6 },
      { w: 0.24, y: 0.23, start: 0.85, op: 0.5,  bob: 8,  phase: 0.15 },
    ],
    stars: [
      { x: 0.70, y: 0.08, size: 18, op: 0.9, n: 2, phase: 0.0,  color: C.sun },
      { x: 0.82, y: 0.16, size: 13, op: 0.8, n: 3, phase: 0.4,  color: "#ffffff" },
      { x: 0.88, y: 0.10, size: 15, op: 0.85, n: 2, phase: 0.7, color: C.sun },
      { x: 0.84, y: 0.25, size: 12, op: 0.7, n: 3, phase: 0.2,  color: "#ffffff" },
      { x: 0.20, y: 0.12, size: 13, op: 0.7, n: 2, phase: 0.55, color: C.sun },
      { x: 0.14, y: 0.20, size: 11, op: 0.6, n: 3, phase: 0.85, color: "#ffffff" },
      { x: 0.30, y: 0.06, size: 12, op: 0.65, n: 2, phase: 0.33, color: C.sun },
      { x: 0.90, y: 0.30, size: 11, op: 0.6, n: 3, phase: 0.1,  color: "#ffffff" },
      { x: 0.10, y: 0.30, size: 10, op: 0.5, n: 2, phase: 0.65, color: C.sun },
      { x: 0.50, y: 0.05, size: 10, op: 0.6, n: 3, phase: 0.9,  color: "#ffffff" },
    ],
    balloon: { w: 0.16, x: 0.62, sway: 0.02, swayPhase: 0.0, offset: 0.2 },
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
  p: number;
  wide: boolean;
}

function HeroCanvas({ W, H, p, wide }: HeroCanvasProps) {
  const L = useMemo(() => layoutFor(wide), [wide]);
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <Sky p={p} />
      <Rainbow W={W} H={H} p={p} cfg={L.rainbow} />
      <Clouds W={W} H={H} p={p} defs={L.clouds} />
      <Stars W={W} H={H} p={p} defs={L.stars} />
      <Balloon W={W} H={H} p={p} cfg={L.balloon} />
      <Footprints W={W} H={H} p={p} path={L.footpath} />
      <Grain />
    </div>
  );
}

export default function HeroBackground() {
  const dur = 12; // Animation duration in seconds

  const reducedMotionLib = useReducedMotion();
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [wide, setWide] = useState(true);
  const [scale, setScale] = useState(1);
  const [time, setTime] = useState(dur * 0.35); // Start at calm visual frame (~0.35 p-value)

  const wrapRef = useRef<HTMLDivElement>(null);
  const lastTime = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const W = wide ? 1600 : 900;
  const H = wide ? 900 : 1600;

  const reducedMotion = reducedMotionLib === true;

  // Responsive dimension tracking & Cover Scaling (like background-size: cover)
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const measure = () => {
      const isWide = window.matchMedia("(min-width: 768px)").matches;
      setWide(isWide);

      const currentW = isWide ? 1600 : 900;
      const currentH = isWide ? 900 : 1600;

      // Cover scaling so it fills the screen perfectly without letterboxing
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

  // IntersectionObserver to pause loop player when out of view (saves battery/INP)
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

      setTime((t) => {
        let n = t + dt;
        if (n >= dur) n = n % dur;
        return n;
      });

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

  const p = frac(time / dur);

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
        <HeroCanvas W={W} H={H} p={p} wide={wide} />
      </div>
    </div>
  );
}
