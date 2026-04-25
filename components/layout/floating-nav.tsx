"use client";

import { useCallback } from "react";
import { useLanguage } from "@/hooks/use-language";

type NavItem = {
  id: string;
  label: string;
};

export function FloatingNav() {
  const { copy } = useLanguage();

  const navItems: NavItem[] = [
    { id: "about", label: copy.sections.about },
    { id: "work", label: "Work" },
    { id: "playground", label: "Playground" },
    { id: "contact", label: copy.sections.contact },
  ];

  const handleClick = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="fixed left-0 top-0 z-30 hidden h-screen w-48 flex-col items-start justify-center gap-8 px-8 py-20 transition-opacity duration-200 hover:opacity-100 sm:flex sm:opacity-0 lg:w-64"
    >
      <ul className="space-y-6">
        {navItems.map((item) => (
          <li key={item.id}>
            <button
              onClick={() => handleClick(item.id)}
              className="text-left text-sm font-medium text-muted transition-colors hover:text-foreground sm:text-base"
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
