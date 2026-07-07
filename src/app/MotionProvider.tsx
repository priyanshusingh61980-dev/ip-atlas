import type { ReactNode } from "react";
import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";

/**
 * Global motion provider. Mounts `LazyMotion` once at the app root so
 * feature components can use `m.*` elements without re-initializing the
 * Framer Motion runtime. Also applies the canonical transition defaults
 * and forwards the user's `prefers-reduced-motion` preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user" transition={{ ease: [0.2, 0, 0.2, 1] }}>
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
