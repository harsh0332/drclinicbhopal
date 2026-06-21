import { Variants } from "framer-motion";

// ─── Shared Timing Configs ─────────────────────────────────────────────────
// Premium spring-like easing used across all sections for consistent feel.
export const transitionPremium = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const transitionPremiumSlow = {
  duration: 0.8,
  ease: [0.16, 1, 0.3, 1] as const,
};

export const transitionSnappy = {
  duration: 0.35,
  ease: "easeOut" as const,
};

// ─── Scroll-reveal Variants ────────────────────────────────────────────────
// Standard rise-and-fade: opacity 0 → 1, translateY 20px → 0.
// Used for section headings, text blocks, and single-item reveals.
export const fadeRise: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionPremium,
  },
};

// Simple opacity fade — for supplemental labels, badges, compliance notes.
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

// Scale-zoom-fade — for cards and image containers.
export const softScaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: transitionPremium,
  },
};

// Card rise — slightly more travel than fadeRise, for grid cards.
export const cardRise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionPremium,
  },
};

// ─── Container / Stagger Variants ─────────────────────────────────────────
// Standard stagger container – 120ms between child reveals.
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

// Dynamic stagger container for custom intervals.
export const getStaggerContainer = (staggerChildren = 0.12): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren,
    },
  },
});

// ─── Reduced-Motion Helpers ────────────────────────────────────────────────
// Pass shouldReduceMotion from useReducedMotion() to these helpers.
// Returns "visible" for initial prop when reduced motion is preferred,
// so sections render fully visible immediately without transitions.
export const getInitial = (shouldReduceMotion: boolean | null) =>
  shouldReduceMotion ? "visible" : "hidden";

// Hover lift config — returns {} when reduced motion is preferred.
export const hoverLift = (
  shouldReduceMotion: boolean | null,
  yOffset = -6,
  extraStyles: Record<string, unknown> = {}
) =>
  shouldReduceMotion
    ? {}
    : { y: yOffset, ...extraStyles };

// Standard viewport config used for all whileInView triggers.
export const viewportOnce = { once: true, margin: "-100px" as const };
