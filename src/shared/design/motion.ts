import type { Variants } from "framer-motion";
import { motionDuration, motionEase } from "./tokens";

/**
 * Canonical motion variants. Components use these by name through `<Motion/>`.
 * Reduced-motion users get only opacity (no transforms).
 */
export const motionVariants = {
  rise: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  },
} as const satisfies Record<string, Variants>;

export type MotionVariantName = keyof typeof motionVariants;

/** Reduced-motion replacements — opacity-only. */
export const reducedMotionVariants: Record<MotionVariantName, Variants> = {
  rise: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  scale: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
};

export { motionDuration, motionEase };
