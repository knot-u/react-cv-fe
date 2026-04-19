"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { copy } = useLanguage();

  const navLinks = [
    { label: copy.navbar.about, href: "/#about" },
    { label: copy.navbar.skills, href: "/#skills" },
    { label: copy.navbar.experience, href: "/#experience" },
    { label: copy.navbar.projects, href: "/projects" },
    { label: copy.navbar.contact, href: "/#contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6">
        <LanguageSwitcher />

        <Link
          href="/"
          className="mr-auto text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-muted"
        >
          Santiago Cardona
        </Link>

        {/* Desktop nav */}
        <nav className="hidden gap-6 sm:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/projects" && pathname === "/projects";
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform origin-center ${open ? "translate-y-2 rotate-45" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`block h-0.5 w-5 bg-foreground transition-transform origin-center ${open ? "-translate-y-2 -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border sm:hidden"
          >
            <ul className="flex flex-col px-4 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-3 text-sm text-muted hover:text-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
