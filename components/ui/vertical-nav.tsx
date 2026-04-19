"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { animate } from "animejs";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

export function VerticalNav() {
  const [active, setActive] = useState<SectionId>("hero");
  const prevActive = useRef<SectionId>("hero");
  const dotRefs = useRef<Partial<Record<SectionId, HTMLSpanElement | null>>>({});

  // Observe sections to track active one
  useEffect(() => {
    const latestRatio: Partial<Record<SectionId, number>> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.id as SectionId;
          latestRatio[id] = entry.intersectionRatio;
        });

        // Pick the section with the highest visibility
        let best: SectionId = prevActive.current;
        let bestRatio = -1;
        (Object.keys(latestRatio) as SectionId[]).forEach((id) => {
          const r = latestRatio[id] ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = id;
          }
        });

        if (bestRatio > 0) setActive(best);
      },
      { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Animate dot when active section changes
  useEffect(() => {
    const prev = prevActive.current;
    const curr = active;
    if (prev === curr) return;

    const prevDot = dotRefs.current[prev];
    const currDot = dotRefs.current[curr];

    if (prevDot) {
      animate(prevDot, {
        scale: [1.6, 1],
        duration: 300,
        ease: "outExpo",
      });
    }
    if (currDot) {
      animate(currDot, {
        scale: [1, 1.6],
        duration: 400,
        ease: "outBack(1.8)",
      });
    }

    prevActive.current = curr;
  }, [active]);

  // Animate label reveal on hover
  const handleMouseEnter = useCallback((id: SectionId) => {
    const label = document.getElementById(`vnav-label-${id}`);
    if (!label) return;
    animate(label, {
      opacity: [0, 1],
      translateX: [-6, 0],
      duration: 200,
      ease: "outQuad",
    });
  }, []);

  const handleMouseLeave = useCallback((id: SectionId) => {
    const label = document.getElementById(`vnav-label-${id}`);
    if (!label) return;
    animate(label, {
      opacity: [1, 0],
      translateX: [0, -6],
      duration: 150,
      ease: "inQuad",
    });
  }, []);

  const handleClick = useCallback((id: SectionId) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center xl:left-8 sm:flex"
    >
      {/* Track line */}
      <div className="absolute left-[5px] top-0 h-full w-px bg-white/10" />

      <ul className="relative flex flex-col gap-6">
        {SECTIONS.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <li key={id} className="flex items-center">
              <button
                onClick={() => handleClick(id)}
                onMouseEnter={() => handleMouseEnter(id)}
                onMouseLeave={() => handleMouseLeave(id)}
                aria-label={`Go to ${label}`}
                className="group relative flex items-center focus:outline-none"
              >
                {/* Dot */}
                <span
                  ref={(el) => {
                    dotRefs.current[id] = el;
                  }}
                  className={`block h-2.5 w-2.5 rounded-full transition-colors duration-200 ${
                    isActive
                      ? "bg-cyan-400 shadow-[0_0_8px_theme(colors.cyan.400/60%)]"
                      : "bg-slate-600 group-hover:bg-slate-400"
                  }`}
                  style={{ transformOrigin: "center" }}
                />

                {/* Label (animated by anime.js, starts hidden) */}
                <span
                  id={`vnav-label-${id}`}
                  style={{ opacity: 0 }}
                  className="pointer-events-none absolute left-5 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900/90 px-2.5 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm"
                >
                  {label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
