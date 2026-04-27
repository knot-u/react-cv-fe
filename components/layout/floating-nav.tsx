"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { useLanguage } from "@/hooks/use-language";
import { Logo } from "./logo";

type NavId = "about" | "work" | "playground" | "contact";

type NavItem = {
  id: NavId;
  label: string;
  color: string;
  textColor: string;
};

function splitLabel(label: string) {
  return Array.from(label);
}

export function FloatingNav() {
  const { copy } = useLanguage();
  const [activeId, setActiveId] = useState<NavId>("about");
  const [hoveredId, setHoveredId] = useState<NavId | null>(null);

  const navItems: NavItem[] = useMemo(
    () => [
      {
        id: "about",
        label: copy.sections.about,
        color: "#000000",
        textColor: "#ffffff",
      },
      {
        id: "work",
        label: "Work",
        color: "#0ADDFF",
        textColor: "#000000",
      },
      {
        id: "playground",
        label: "Playground",
        color: "#FF001F",
        textColor: "#ffffff",
      },
      {
        id: "contact",
        label: copy.sections.contact,
        color: "#FFED08",
        textColor: "#000000",
      },
    ],
    [copy.sections.about, copy.sections.contact],
  );

  useEffect(() => {
    const ids = navItems.map((item) => item.id);

    const syncActiveSection = () => {
      const anchorY = window.innerHeight * 0.42;
      const scrollBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;

      if (scrollBottom) {
        setActiveId("contact");
        return;
      }

      let closest: NavId = activeId;
      let minDistance = Number.POSITIVE_INFINITY;

      for (const id of ids) {
        const section = document.getElementById(id);
        if (!section) continue;

        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - anchorY);

        if (distance < minDistance) {
          minDistance = distance;
          closest = id;
        }
      }

      setActiveId(closest);
    };

    syncActiveSection();
    window.addEventListener("scroll", syncActiveSection, { passive: true });
    window.addEventListener("resize", syncActiveSection);

    return () => {
      window.removeEventListener("scroll", syncActiveSection);
      window.removeEventListener("resize", syncActiveSection);
    };
  }, [activeId, navItems]);

  const handleClick = useCallback((id: NavId) => {
    setActiveId(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <Logo />
      <nav
        aria-label="Main navigation"
        className="fixed left-0 top-0 z-30 hidden h-screen w-60 flex-col justify-center py-20 sm:flex"
      >
        <ul className="mt-[22vh] w-full space-y-4 pr-4">
          {navItems.map((item) => {
            const expanded = hoveredId === item.id || activeId === item.id;
            const letters = splitLabel(item.label);

            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => handleClick(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(item.id)}
                  onBlur={() => setHoveredId(null)}
                  aria-current={activeId === item.id ? "page" : undefined}
                  data-expanded={expanded ? "true" : "false"}
                  className="floating-nav-item relative block h-14 w-full overflow-hidden text-left"
                  style={
                    {
                      "--nav-color": item.color,
                      "--nav-label-color": item.textColor,
                    } as CSSProperties
                  }
                >
                  <span aria-hidden="true" className="floating-nav-shape">
                    <svg
                      className="floating-nav-svg"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                    >
                      <rect
                        className="floating-nav-rect"
                        x="0"
                        y="0"
                        width="100"
                        height="100"
                      />
                    </svg>
                  </span>

                  <span
                    className="floating-nav-label"
                    style={{ "--char-total": letters.length } as CSSProperties}
                  >
                    {letters.map((char, index) => (
                      <span
                        key={`${item.id}-${index}-${char}`}
                        className="floating-nav-char"
                        style={{ "--char-index": index } as CSSProperties}
                        aria-hidden="true"
                      >
                        {char === " " ? "\u00A0" : char}
                      </span>
                    ))}
                  </span>

                  <span className="sr-only">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-30 h-full w-px bg-black"
        />
      </nav>
    </>
  );
}