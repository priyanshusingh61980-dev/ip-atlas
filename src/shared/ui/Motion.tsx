import { useEffect, useState } from "react";
import { m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import {
  motionVariants,
  reducedMotionVariants,
  type MotionVariantName,
} from "@/shared/design/motion";
import { motionDuration, motionEase, type MotionDuration } from "@/shared/design/tokens";

interface MotionProps {
  /** Animation variant. Defaults to `rise`. */
  variant?: MotionVariantName;
  /** Token-named duration. Defaults to `base`. */
  duration?: MotionDuration;
  /** Token-named delay applied before the animation starts. */
  delay?: MotionDuration | 0;
  /** Trigger on mount (default) or when scrolled into view. */
  trigger?: "mount" | "in-view";
  /** Force opacity-only output (also forced under `prefers-reduced-motion`). */
  reducedMotion?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Canonical motion primitive. Most Framer Motion usage in the app goes
 * through this wrapper so durations, easings, and reduced-motion behavior
 * stay consistent. Low-level `m.*` use is permitted for fine-grained
 * SVG/canvas animation, but those components must also call
 * `useReducedMotion()` and gate transforms.
 *
 * `LazyMotion` is mounted globally by `MotionProvider`.
 */
export function Motion({
  variant = "rise",
  duration = "base",
  delay = 0,
  trigger = "mount",
  reducedMotion,
  className,
  children,
}: MotionProps) {
  const systemReducedMotion = useReducedMotion();
  const reduce = reducedMotion ?? systemReducedMotion ?? false;
  const variants = reduce ? reducedMotionVariants[variant] : motionVariants[variant];

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const transition = {
    duration: motionDuration[duration],
    delay: delay === 0 ? 0 : motionDuration[delay],
    ease: motionEase.standard,
  };

  const animateProps =
    trigger === "in-view"
      ? { whileInView: "visible", viewport: { once: true, margin: "-10%" } }
      : { animate: mounted ? "visible" : "hidden" };

  return (
    <m.div
      className={className}
      initial="hidden"
      variants={variants}
      transition={transition}
      {...animateProps}
    >
      {children}
    </m.div>
  );
}
