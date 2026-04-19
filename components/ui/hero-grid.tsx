"use client";

import { useEffect, useRef } from "react";
import { palette } from "@/lib/palette";

// ─── Grid ──────────────────────────────────────────────────────
const DOT_GAP       = 50;    // 1 node per 50 CSS px (dynamic resolution)
const MAX_NODES     = 3000;  // safety cap for very large viewports
const BASE_OPACITY  = 0.18;  // static opacity — no pulse
const DOT_SIZE      = 4;     // px

// ─── Net displacement (cursor repulsion) ───────────────────────────────────
const INFLUENCE_R   = 240;   // px — radius of cursor influence
const MAX_DISP      = 18;    // px — max node displacement at cursor centre
const POS_LERP      = 0.10;  // position smoothing per frame
const CUR_LERP      = 0.09;  // cursor smoothing

export function HeroGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const w   = container.clientWidth;
    const h   = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;

    // ── Dynamic grid dimensions ────────────────────────────────
    let cols = Math.max(2, Math.round(w / DOT_GAP));
    let rows = Math.max(2, Math.round(h / DOT_GAP));
    // Clamp total nodes
    if (cols * rows > MAX_NODES) {
      const ratio = Math.sqrt(MAX_NODES / (cols * rows));
      cols = Math.max(2, Math.floor(cols * ratio));
      rows = Math.max(2, Math.floor(rows * ratio));
    }
    const total = cols * rows;
    const cellW = w / cols;
    const cellH = h / rows;

    // ── Canvas for net lines ───────────────────────────────────
    const canvas = document.createElement("canvas");
    canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
    canvas.width  = w * dpr;
    canvas.height = h * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr); // work in CSS px from here on
    container.appendChild(canvas);

    // ── Position buffers ───────────────────────────────────────
    // origX/Y: home positions   curX/Y: live (lerped, displaced) positions
    const origX     = new Float32Array(total);
    const origY     = new Float32Array(total);
    const curX      = new Float32Array(total);
    const curY      = new Float32Array(total);

    // ── Two-layer DOM nodes ────────────────────────────────────
    // wrapper  → positioned via RAF transform (displacement)
    // innerDot → animated by anime.js (scale + opacity, no conflict)
    const wrappers : HTMLSpanElement[] = [];
    const frag = document.createDocumentFragment();

    for (let i = 0; i < total; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const ox  = (col + 0.5) * cellW;
      const oy  = (row + 0.5) * cellH;
      origX[i] = ox; origY[i] = oy;
      curX[i]  = ox; curY[i]  = oy;

      // Wrapper: 0×0 anchor, moved only via transform
      const wrapper = document.createElement("span");
      wrapper.style.cssText = [
        "position:absolute",
        "left:0", "top:0",
        "width:0", "height:0",
        "will-change:transform",
      // -(DOT_SIZE/2) centres the dot at its origin
        `transform:translate(${ox - DOT_SIZE / 2}px,${oy - DOT_SIZE / 2}px)`,
      ].join(";");

      // Inner dot: anime.js owns scale + opacity
      const inner = document.createElement("span");
      inner.style.cssText = [
        "display:block",
        `width:${DOT_SIZE}px`, `height:${DOT_SIZE}px`,
        "border-radius:50%",
        "background:" + palette.gridDot,
        `opacity:${BASE_OPACITY}`,
        "will-change:transform",
      ].join(";");

      wrapper.appendChild(inner);
      wrappers.push(wrapper);
      frag.appendChild(wrapper);
    }
    container.appendChild(frag);

    // ── Reduced-motion: static net, no animation ───────────────
    if (prefersReduced) {
      ctx.strokeStyle = palette.gridLine;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        if (col < cols - 1) { ctx.moveTo(origX[i], origY[i]); ctx.lineTo(origX[i + 1],    origY[i + 1]);    }
        if (row < rows - 1) { ctx.moveTo(origX[i], origY[i]); ctx.lineTo(origX[i + cols],  origY[i + cols]); }
      }
      ctx.stroke();
      return () => {
        if (container.contains(canvas))  container.removeChild(canvas);
        wrappers.forEach((wr) => { if (container.contains(wr)) container.removeChild(wr); });
      };
    }

    // ── Cursor tracking ────────────────────────────────────────
    // Container is fixed, so listen on window directly.
    let rawX = w / 2, rawY = h / 2;
    let smoothX = rawX, smoothY = rawY;

    const onMouseMove = (e: MouseEvent) => {
      rawX = e.clientX;
      rawY = e.clientY;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // ── RAF loop: displacement + line redraw ───────────────────
    const INF_R_SQ = INFLUENCE_R * INFLUENCE_R;
    let rafId = 0;

    function drawLines() {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = palette.gridLine;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      for (let i = 0; i < total; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        if (col < cols - 1) { ctx.moveTo(curX[i], curY[i]); ctx.lineTo(curX[i + 1],    curY[i + 1]);    }
        if (row < rows - 1) { ctx.moveTo(curX[i], curY[i]); ctx.lineTo(curX[i + cols],  curY[i + cols]); }
      }
      ctx.stroke();
    }

    function tick() {
      // Smooth cursor
      smoothX += (rawX - smoothX) * CUR_LERP;
      smoothY += (rawY - smoothY) * CUR_LERP;

      // Displace nodes away from cursor, lerp toward target
      for (let i = 0; i < total; i++) {
        const dx = origX[i] - smoothX;
        const dy = origY[i] - smoothY;
        const dSq = dx * dx + dy * dy;
        let tx = origX[i], ty = origY[i];

        if (dSq < INF_R_SQ && dSq > 0) {
          const d   = Math.sqrt(dSq);
          const t   = 1 - d / INFLUENCE_R;         // linear 0→1
          const str = t * t * MAX_DISP;             // quadratic ease
          tx = origX[i] + (dx / d) * str;
          ty = origY[i] + (dy / d) * str;
        }

        curX[i] += (tx - curX[i]) * POS_LERP;
        curY[i] += (ty - curY[i]) * POS_LERP;

        // -(DOT_SIZE/2) centres the dot on the node position
        wrappers[i].style.transform =
          `translate(${curX[i] - DOT_SIZE / 2}px,${curY[i] - DOT_SIZE / 2}px)`;
      }

      drawLines();
      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      if (container.contains(canvas)) container.removeChild(canvas);
      wrappers.forEach((wr) => { if (container.contains(wr)) container.removeChild(wr); });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    />
  );
}
