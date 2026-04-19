"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

// ─── Tune these for feel / performance ────────────────────────
const DOT_GAP = 15;           // px between dots  (larger = fewer DOM nodes)
const MAX_COLS = 30;           // hard cap → total dots ≤ MAX_COLS × MAX_ROWS
const MAX_ROWS = 20;
const BASE_OPACITY = 0.1;
const PULSE_PERIOD = 2000;     // ms between automatic pulses
const RISE_MS = 680;           // rise-phase duration per dot
const FALL_MS = 1050;          // fall-phase duration per dot
const STAGGER_MS = 46;         // delay per grid-unit of distance (ripple speed)
const STAGGER_RETURN_MS = 32;
// ──────────────────────────────────────────────────────────────

export function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // ── Grid dimensions ────────────────────────────────────────
    const w = container.clientWidth;
    const h = container.clientHeight;
    const cols = Math.min(MAX_COLS, Math.round(w / DOT_GAP));
    const rows = Math.min(MAX_ROWS, Math.round(h / DOT_GAP));
    const total = cols * rows;
    const cellW = w / cols;
    const cellH = h / rows;

    // ── Create dot elements imperatively (zero React overhead) ─
    const dots: HTMLSpanElement[] = [];
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const span = document.createElement("span");
      span.style.cssText = [
        "position:absolute",
        `left:${(col + 0.5) * cellW}px`,
        `top:${(row + 0.5) * cellH}px`,
        "width:3px",
        "height:3px",
        "border-radius:50%",
        "background:rgb(34,211,238)",
        `opacity:${BASE_OPACITY}`,
        "will-change:transform,opacity",
        "transform:translate(-50%,-50%)",
      ].join(";");
      dots.push(span);
      frag.appendChild(span);
    }
    container.appendChild(frag);

    // ── Reduced-motion: static grid, no animation ──────────────
    if (prefersReduced) {
      return () => dots.forEach((d) => container.removeChild(d));
    }

    // ── Cursor tracking via parent section ─────────────────────
    // Container is pointer-events-none so we attach to the section instead.
    const centerIdx = Math.floor(rows / 2) * cols + Math.floor(cols / 2);
    let cursorIndex = centerIdx;

    const section = container.closest("section") ?? container.parentElement;

    const onMouseMove = (e: Event) => {
      const { clientX, clientY } = e as MouseEvent;
      const rect = container.getBoundingClientRect();
      const col = Math.min(
        cols - 1,
        Math.max(0, Math.floor((clientX - rect.left) / cellW))
      );
      const row = Math.min(
        rows - 1,
        Math.max(0, Math.floor((clientY - rect.top) / cellH))
      );
      cursorIndex = row * cols + col;
    };

    section?.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── Pulse ──────────────────────────────────────────────────
    // Worst-case spread time from any cursor position to farthest dot.
    const maxDist = Math.ceil(
      Math.sqrt(((cols - 1) / 2) ** 2 + ((rows - 1) / 2) ** 2)
    );
    const maxSpread = maxDist * STAGGER_MS;

    let running = true;
    let fallTimerId: ReturnType<typeof setTimeout> | null = null;

    function pulse(fromIdx: number) {
      if (!running) return;

      const opts = { grid: [cols, rows], from: fromIdx };

      // Rise — nearest dots expand first, wave radiates outward
      animate(dots, {
        scale: stagger([2.5, 1.1], opts),
        opacity: stagger([0.92, 0.2], opts),
        duration: RISE_MS,
        ease: "outExpo",
        delay: stagger(STAGGER_MS, opts),
      });

      // Fall — once the farthest dot has peaked, return everything to base
      if (fallTimerId !== null) clearTimeout(fallTimerId);
      fallTimerId = setTimeout(() => {
        if (!running) return;
        animate(dots, {
          scale: 1,
          opacity: BASE_OPACITY,
          duration: FALL_MS,
          ease: "inOutSine",
          delay: stagger(STAGGER_RETURN_MS, opts),
        });
      }, RISE_MS + maxSpread);
    }

    // Load: pulse from center after hero entrance; then track cursor
    const initTimer = setTimeout(() => pulse(centerIdx), 450);
    const interval = setInterval(() => pulse(cursorIndex), PULSE_PERIOD);

    return () => {
      running = false;
      clearTimeout(initTimer);
      clearInterval(interval);
      if (fallTimerId !== null) clearTimeout(fallTimerId);
      section?.removeEventListener("mousemove", onMouseMove);
      dots.forEach((d) => {
        if (container.contains(d)) container.removeChild(d);
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        maskImage:
          "radial-gradient(ellipse 88% 80% at 50% 50%, black 15%, transparent 88%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 88% 80% at 50% 50%, black 15%, transparent 88%)",
      }}
    />
  );
}
