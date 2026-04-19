"use client";

import { useEffect, type RefObject } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Shared collapsed state — all strokes look identical at scroll=0
const START_ANGLE  = 0;       // horizontal (pointing left from right-edge pivot)
const START_LENGTH = 800;     // max length — same for every stroke
const START_COLOR  = "#111827"; // darkest colour — same for every stroke
const STAGGER      = 0.4;    // fraction of progress range used for the cascade delay

const N = 15;
const STROKES = [
  { length: 172, color: "#111827" },
  { length: 164, color: "#1f2937" },
  { length: 156, color: "#334155" },
  { length: 148, color: "#475569" },
  { length: 140, color: "#0f766e" },
  { length: 132, color: "#0891b2" },
  { length: 124, color: "#2563eb" },
  { length: 116, color: "#4f46e5" },
  { length: 108, color: "#7c3aed" },
  { length: 100, color: "#9333ea" },
  { length: 92,  color: "#c026d3" },
  { length: 84,  color: "#db2777" },
  { length: 76,  color: "#e11d48" },
  { length: 68,  color: "#ef4444" },
  { length: 60,  color: "#f97316" },
] as const;

type ClockerNavProps = { targetRef: RefObject<HTMLElement | null> };

type FanStrokeProps = {
  progress:      MotionValue<number>;
  reducedMotion: boolean;
  targetLength:  number;
  targetColor:   string;
  inputStart:    number;
  inputEnd:      number;
  endAngle:      number;
  zOrder:        number;
};

function useHeroFanProgress(targetRef: RefObject<HTMLElement | null>) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const update = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect          = el.getBoundingClientRect();
      const viewportH     = window.innerHeight || 1;
      const travel        = Math.max(rect.height - viewportH * 0.2, 1);
      const next          = Math.min(Math.max((-rect.top + viewportH * 0.1) / travel, 0), 1);
      progress.set(next);
    };

    let rafId = 0;
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [progress, targetRef]);

  return progress;
}

function FanStroke({
  progress, reducedMotion,
  targetLength, targetColor,
  inputStart, inputEnd, endAngle, zOrder,
}: FanStrokeProps) {
  // Each value transitions from the shared start → individual target
  // within its own [inputStart, inputEnd] window of the scroll progress.
  const rotate  = useTransform(progress, [inputStart, inputEnd], [START_ANGLE, endAngle],    { clamp: true });
  const width   = useTransform(progress, [inputStart, inputEnd], [START_LENGTH, targetLength], { clamp: true });
  const bgColor = useTransform(progress, [inputStart, inputEnd], [START_COLOR, targetColor],  { clamp: true });
  const opacity = useTransform(progress, [inputStart, inputEnd], [0.75, 0.98],                { clamp: true });

  return (
    <motion.span
      aria-hidden="true"
      className="absolute right-0 top-0 block -translate-y rounded-full"
      style={{
        height: 2,
        width,
        backgroundColor: bgColor,
        transformOrigin: "100% 50%",
        rotate:   reducedMotion ? endAngle  : rotate,
        opacity:  reducedMotion ? 0.95      : opacity,
        zIndex:   zOrder,
      }}
    />
  );
}

export function ClockerNav({ targetRef }: ClockerNavProps) {
  const reducedMotion   = useReducedMotion();
  const progress        = useHeroFanProgress(targetRef);
  const containerOpacity = useTransform(progress, [0, 0.85, 1], [0.9, 1, 0.2]);

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed right-0 top-1/2 z-20 hidden -translate-y-1/2 md:block"
      style={{ opacity: containerOpacity }}
    >
      <div className="relative h-[320px] w-[220px] overflow-visible">
        {/* Pivot dot */}
        <span className="absolute right-0 top-1/2 h-2 w-2 translate-x-1/2 rounded-full bg-foreground/70" />

        {STROKES.map((stroke, index) => {
          // Stagger: index 0 (top of fan) starts immediately, index N-1 (bottom) starts at STAGGER
          const inputStart = (index / (N - 1)) * STAGGER;
          const inputEnd   = inputStart + (1 - STAGGER);

          // All strokes rotate counterclockwise (negative = upward from pivot).
          // index 0 reaches the top (-90°, straight up) — biggest sweep.
          // index N-1 barely moves (-10°, near horizontal) — stays near bottom.
          const endAngle = -90 + (index / (N - 1)) * 80; // -90° → -10°

          return (
            <FanStroke
              key={index}
              progress={progress}
              reducedMotion={Boolean(reducedMotion)}
              targetLength={stroke.length}
              targetColor={stroke.color}
              inputStart={inputStart}
              inputEnd={inputEnd}
              endAngle={endAngle}
              zOrder={N - index}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
