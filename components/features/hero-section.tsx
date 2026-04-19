"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { createTimeline, stagger } from "animejs";
import type { HeroData } from "@/lib/types";
import { ClockerNav } from "../ui/clocker-nav";

interface HeroSectionProps {
  hero: HeroData;
}

export function HeroSection({ hero }: HeroSectionProps) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const tl = createTimeline();
    tl.add(".hero-tag", {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        ease: "outExpo",
      })
      .add(".hero-name", {
          opacity: [0, 1],
          translateY: [24, 0],
          duration: 700,
          ease: "outExpo",
        },
        "-=300"
      )
      .add(".hero-role", {
          opacity: [0, 1],
          translateY: [16, 0],
          duration: 600,
          ease: "outExpo",
        },
        "-=400"
      )
      .add(".hero-summary", {
          opacity: [0, 1],
          translateY: [12, 0],
          duration: 600,
          ease: "outExpo",
        },
        "-=300"
      )
      .add(".hero-action", {
          opacity: [0, 1],
          translateY: [10, 0],
          delay: stagger(100),
          duration: 500,
          ease: "outExpo",
        },
        "-=200"
      );
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-[calc(100vh-64px)] flex-col items-start justify-center px-4 py-20 sm:px-6"
    >
      {/* Radial vignette */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, var(--background) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto w-full max-w-6xl md:pr-28 lg:pr-40">
        <p className="hero-tag mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-foreground opacity-0">
          Available for work
        </p>

        <h1 className="hero-name mb-3 text-5xl font-bold tracking-tight text-foreground opacity-0 sm:text-7xl">
          {hero.name}
        </h1>

        <p className="hero-role mb-6 text-xl font-medium text-muted opacity-0 sm:text-2xl">
          {hero.role}
        </p>

        <p className="hero-summary mb-10 max-w-2xl text-base leading-7 text-muted opacity-0 sm:text-lg">
          {hero.summary}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/projects"
            className="hero-action inline-flex items-center rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background opacity-0 transition-colors hover:bg-foreground/80"
          >
            View Projects
          </Link>
          <Link
            href={`mailto:${hero.contact.email}`}
            className="hero-action inline-flex items-center rounded-xl border border-border-strong px-5 py-2.5 text-sm font-semibold text-foreground opacity-0 transition-colors hover:border-border-focus hover:bg-foreground/5"
          >
            Get in Touch
          </Link>
          <Link
            href={hero.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-action inline-flex items-center rounded-xl border border-border-strong px-5 py-2.5 text-sm font-semibold text-foreground opacity-0 transition-colors hover:border-border-focus hover:bg-foreground/5"
          >
            LinkedIn ↗
          </Link>
        </div>

        <ClockerNav targetRef={containerRef} />
      </div>
    </section>
  );
}
