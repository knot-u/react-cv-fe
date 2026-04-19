"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/* ═══════════════════════════════════════════════════════════════
 * Clocker — parametric circle wheel
 *
 * Every spoke is a segment from origin to a point on a circle:
 *   X = (r · cos(θ), r · sin(θ))
 *
 * Spokes are evenly distributed along the full circumference:
 *   t_i = i · (2π / N)          for i ∈ [0, N)
 *
 * A scroll-driven rotation offset r1 ∈ [0, 2π] rotates all spokes:
 *   θ_i = t_i + r1
 *
 * Each frame is the sequence:
 *   Seq(Segment((0,0), (r_i·cos(t_i + r1), r_i·sin(t_i + r1))), t, 0, 2π, 2π/N)
 *
 * Rotation is applied as:
 *   Rotate({line_i, X_i}, r1, (0, 0))
 *
 * All spokes share the same radius R0 (uniform length).
 * Color interpolates per-spoke from START_RGB → target RGB.
 * ═══════════════════════════════════════════════════════════════ */

const TWO_PI = 2 * Math.PI;
const N      = 15;
const STEP   = TWO_PI / N;          // Δt between spokes (≈ 0.4189 rad ≈ 24°)

// Per-spoke target colour (RGB) — all spokes share the same radius
const SPOKES: [number, number, number][] = [
  [17,  24,  39],   // #111827
  [31,  41,  55],   // #1f2937
  [51,  65,  85],   // #334155
  [71,  85,  105],  // #475569
  [15,  118, 110],  // #0f766e
  [8,   145, 178],  // #0891b2
  [37,  99,  235],  // #2563eb
  [79,  70,  229],  // #4f46e5
  [124, 58,  237],  // #7c3aed
  [147, 51,  234],  // #9333ea
  [192, 38,  211],  // #c026d3
  [219, 39,  119],  // #db2777
  [225, 29,  72],   // #e11d48
  [239, 68,  68],   // #ef4444
  [249, 115, 22],   // #f97316
];

const START_RGB: [number, number, number] = [17, 24, 39]; // #111827
const R0          = 250;             // larger outer radius for every spoke
const INNER_R     = 10;              // small inner orbit for the trailing x1 point
const CANVAS      = 620;             // larger SVG viewport
const HALF        = CANVAS / 2;      // centre = (HALF, HALF)
const COLOR_BOOST = 5;             // color reaches its target earlier in the scroll
const SMOOTHING   = 0.14;            // scroll easing factor for smoother motion
const X1_LAG_MS   = 200;             // x1 trails x2 by roughly 0.2s

type ClockerNavProps = { targetRef: RefObject<HTMLElement | null> };

/* ── helpers ───────────────────────────────────────────────── */

/** Linear interpolation  a + (b − a) · t */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Interpolate RGB channels → "rgb(r,g,b)" */
const lerpRgb = (
  from: readonly [number, number, number],
  to:   readonly [number, number, number],
  t: number,
) =>
  `rgb(${Math.round(lerp(from[0], to[0], t))},${Math.round(lerp(from[1], to[1], t))},${Math.round(lerp(from[2], to[2], t))})`;

/* ── component ─────────────────────────────────────────────── */

export function ClockerNav({ targetRef }: ClockerNavProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef     = useRef<(SVGLineElement | null)[]>([]);
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);
  const tailProgressRef = useRef(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const container = containerRef.current;
    const target    = targetRef.current;
    if (!container || !target) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lines = linesRef.current;

    /* ── scroll progress [0, 1] ─────────────────────────────── */
    const calcProgress = () => {
      const rect   = target.getBoundingClientRect();
      const vh     = window.innerHeight || 1;
      const travel = Math.max(rect.height - vh * 0.2, 1);
      return Math.min(Math.max((-rect.top + vh * 0.1) / travel, 0), 1);
    };

    /* ── render loop ────────────────────────────────────────── */
    let rafId = 0;
    let isAnimating = false;

    const render = (p: number, tailP: number) => {
      const colorP = Math.min(p * COLOR_BOOST, 1);

      // r1 ∈ [0, 2π] — rotation offset driven by scroll
      const r1 = p * TWO_PI;
      const tailR1 = tailP * TWO_PI;

      for (let i = 0; i < N; i++) {
        const line = lines[i];
        if (!line) continue;

        // t_i — base angle for spoke i, evenly distributed
        const t_i = i * STEP;

        // x2 leads, x1 follows with a slight delay
        const theta2 = t_i + r1;
        const theta1 = t_i + tailR1;

        const x1 = HALF + INNER_R * Math.cos(theta1);
        const y1 = HALF + INNER_R * Math.sin(theta1);
        const x2 = HALF + R0 * Math.cos(theta2);
        const y2 = HALF + R0 * Math.sin(theta2);

        line.setAttribute("x1", String(x1));
        line.setAttribute("y1", String(y1));
        line.setAttribute("x2", String(x2));
        line.setAttribute("y2", String(y2));

        // Colour transitions faster than the rotation
        line.setAttribute("stroke", lerpRgb(START_RGB, SPOKES[i], colorP));
        line.setAttribute("stroke-opacity", String(lerp(0.55, 0.95, colorP)));
      }

      container.style.opacity = String(
        p < 0.85 ? 0.9 : Math.max(0.9 - ((p - 0.85) / 0.15) * 0.7, 0.2),
      );
    };

    const tick = () => {
      const next = lerp(currentProgressRef.current, targetProgressRef.current, SMOOTHING);
      const tailStep = Math.min(16 / X1_LAG_MS, 1);
      const nextTail = lerp(tailProgressRef.current, next, tailStep);

      currentProgressRef.current = next;
      tailProgressRef.current = nextTail;
      render(next, nextTail);

      const needsMore =
        Math.abs(targetProgressRef.current - next) > 0.001 ||
        Math.abs(next - nextTail) > 0.001;

      if (needsMore) {
        rafId = requestAnimationFrame(tick);
      } else {
        isAnimating = false;
      }
    };

    const startAnimation = () => {
      if (isAnimating) return;
      isAnimating = true;
      rafId = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      targetProgressRef.current = calcProgress();
      startAnimation();
    };

    targetProgressRef.current = calcProgress();
    startAnimation();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  /* ── SVG render ───────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 z-20 hidden -translate-y-1/2 md:block"
      style={{ right: -HALF, opacity: 0.9 }}
    >
      <svg
        width={CANVAS}
        height={CANVAS}
        viewBox={`0 0 ${CANVAS} ${CANVAS}`}
        className="overflow-visible"
      >
        {/*
          Seq(Segment((0,0), (r·cos(t+r1), r·sin(t+r1))), t, 0, 2π, 2π/N)
          Initial state: r1 = 0, r = R0 for all spokes
          Rendered client-side only to avoid SSR/CSR float mismatch.
        */}
        {mounted && SPOKES.map((_, i) => {
          const t  = i * STEP;
          const x2 = HALF + R0 * Math.cos(t);
          const y2 = HALF + R0 * Math.sin(t);
          return (
            <line
              key={i}
              ref={(el) => { linesRef.current[i] = el; }}
              x1={HALF}
              y1={HALF}
              x2={x2}
              y2={y2}
              stroke="rgb(17,24,39)"
              strokeWidth={2}
              strokeLinecap="round"
              strokeOpacity={0.55}
            />
          );
        })}

        {/* Centre pivot */}
        {mounted && <circle cx={HALF} cy={HALF} r={4} className="fill-foreground/60" />}
      </svg>
    </div>
  );
}
