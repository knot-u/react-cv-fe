"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const SECTION_IDS = ["hero", "about", "skills", "experience", "education", "projects", "contact"] as const;

type SectionId = (typeof SECTION_IDS)[number];

export function VerticalNav() {
  const [active, setActive] = useState<SectionId>("hero");
  const activeRef = useRef<SectionId>("hero");
  const { copy } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const sections = useMemo(
    () => [
      { id: "hero" as const, label: copy.sections.home },
      { id: "about" as const, label: copy.sections.about },
      { id: "skills" as const, label: copy.sections.skills },
      { id: "experience" as const, label: copy.sections.experience },
      { id: "education" as const, label: copy.sections.education },
      { id: "projects" as const, label: copy.sections.projects },
      { id: "contact" as const, label: copy.sections.contact },
    ],
    [copy]
  );

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const observedSections = SECTION_IDS.map((id) => {
      const element = document.getElementById(id);
      return element ? { id, element } : null;
    }).filter((item): item is { id: SectionId; element: HTMLElement } => item !== null);

    const updateActiveSection = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 12) {
        setActive("contact");
        return;
      }

      const viewportAnchor = window.innerHeight * 0.42;
      let closest = activeRef.current;
      let smallestDistance = Number.POSITIVE_INFINITY;

      observedSections.forEach(({ id, element }) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.bottom > 0 && rect.top < window.innerHeight;

        if (!isVisible) {
          return;
        }

        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportAnchor);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          closest = id;
        }
      });

      setActive(closest);
    };

    const observer = new IntersectionObserver(updateActiveSection, {
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      rootMargin: "-20% 0px -20% 0px",
    });

    observedSections.forEach(({ element }) => observer.observe(element));
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const handleClick = useCallback((id: SectionId) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="fixed left-4 top-1/2 z-40 hidden -translate-y-1/2 sm:flex xl:left-8">
      <div className="flex w-12 flex-col items-stretch gap-3">
        <div className="w-12 rounded-2xl border border-border bg-background/85 p-1.5 shadow-sm backdrop-blur-md">
          <LanguageSwitcher orientation="vertical" />
        </div>

        <nav aria-label="Page sections" className="w-12">
          <div className="w-12 rounded-full border border-border bg-background/85 py-3 shadow-sm backdrop-blur-md">
            <ul className="flex flex-col items-center gap-4">
              {sections.map(({ id, label }) => {
                const isActive = active === id;
                const smoothTransition = shouldReduceMotion
                  ? { duration: 0 }
                  : { type: "spring" as const, stiffness: 260, damping: 20, mass: 0.7 };

                return (
                  <li key={id} className="relative flex items-center">
                    <button
                      type="button"
                      onClick={() => handleClick(id)}
                      aria-label={`Go to ${label}`}
                      aria-current={isActive ? "location" : undefined}
                      className="group relative flex h-5 w-5 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-border-focus focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    >
                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: isActive ? 1 : 0.82, opacity: isActive ? 0.95 : 0 }}
                        animate={{
                          scale: isActive ? 1 : 0.82,
                          opacity: isActive ? 0.95 : 0,
                        }}
                        transition={smoothTransition}
                        className="absolute inset-[-6px] rounded-full bg-surface"
                      />

                      <motion.span
                        key={`${id}-${isActive ? "active" : "inactive"}-ripple-a`}
                        aria-hidden="true"
                        initial={isActive ? { scale: 0.78, opacity: 0 } : { scale: 0.72, opacity: 0 }}
                        animate={
                          isActive
                            ? shouldReduceMotion
                              ? { scale: 1, opacity: 0.22 }
                              : { scale: [0.78, 0.98, 1.16], opacity: [0, 0.26, 0] }
                            : { scale: 0.72, opacity: 0 }
                        }
                        transition={
                          isActive && !shouldReduceMotion
                            ? { duration: 1.05, repeat: Infinity, ease: "easeOut", times: [0, 0.45, 1] }
                            : { duration: 0.2, ease: "easeOut" }
                        }
                        className="absolute inset-[-9px]"
                      >
                        <Image
                          src="/circle.svg"
                          alt=""
                          fill
                          sizes="32px"
                          className="object-contain"
                        />
                      </motion.span>

                      <motion.span
                        key={`${id}-${isActive ? "active" : "inactive"}-ripple-b`}
                        aria-hidden="true"
                        initial={isActive ? { scale: 0.82, opacity: 0 } : { scale: 0.74, opacity: 0 }}
                        animate={
                          isActive
                            ? shouldReduceMotion
                              ? { scale: 1, opacity: 0.12 }
                              : { scale: [0.82, 1.04, 1.22], opacity: [0, 0.18, 0] }
                            : { scale: 0.74, opacity: 0 }
                        }
                        transition={
                          isActive && !shouldReduceMotion
                            ? { duration: 1.05, repeat: Infinity, ease: "easeOut", delay: 0.22, times: [0, 0.5, 1] }
                            : { duration: 0.2, ease: "easeOut" }
                        }
                        className="absolute inset-[-10px]"
                      >
                        <Image
                          src="/circle.svg"
                          alt=""
                          fill
                          sizes="32px"
                          className="object-contain opacity-70"
                        />
                      </motion.span>

                      <motion.span
                        aria-hidden="true"
                        initial={{ scale: isActive ? 1 : 0.9, opacity: isActive ? 1 : 0.72 }}
                        animate={{
                          scale: isActive ? 1 : 0.9,
                          opacity: isActive ? 1 : 0.72,
                        }}
                        transition={smoothTransition}
                        className="relative z-10"
                      >
                        <Image src="/dot.svg" alt="" width={10} height={10} className="h-2.5 w-2.5" />
                      </motion.span>

                      <span
                        className="pointer-events-none absolute left-7 top-1/2 -translate-y-1/2 -translate-x-1 whitespace-nowrap rounded-lg border border-border bg-background/90 px-2.5 py-1 text-xs font-medium text-foreground opacity-0 shadow-sm backdrop-blur-sm transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
                      >
                        {label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
}
