/**
 * Design tokens.
 *
 * Components must reference these — never hard-code colors, spacing, or motion.
 * Color tokens are defined as CSS variables in `src/styles/globals.css` and
 * are surfaced through Tailwind. This module exports JS-side mirrors for
 * non-Tailwind contexts (charts, canvases, motion configs).
 */

export const motionDuration = {
  instant: 0.08,
  fast: 0.16,
  base: 0.24,
  slow: 0.4,
  cinematic: 0.8,
} as const;

export type MotionDuration = keyof typeof motionDuration;

export const motionEase = {
  standard: [0.2, 0, 0.2, 1],
  decelerate: [0, 0, 0.2, 1],
  accelerate: [0.4, 0, 1, 1],
} as const;

export type MotionEase = keyof typeof motionEase;

export const jurisdictions = ["IN", "US", "EU", "UK", "SG", "JP", "AE", "TH"] as const;
export type Jurisdiction = (typeof jurisdictions)[number];

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
  "3xl": 1920,
} as const;
