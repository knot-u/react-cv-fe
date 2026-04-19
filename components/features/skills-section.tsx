"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import { TechBadge } from "@/components/ui/tech-badge";
import type { SkillsData } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillsData;
}

const CATEGORIES: { key: keyof SkillsData; label: string }[] = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "devops", label: "DevOps" },
  { key: "databases", label: "Databases" },
  { key: "tools", label: "Tools" },
  { key: "other", label: "Certifications" },
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <SectionTag label="Skills" />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Tech stack
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.key}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                {cat.label}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills[cat.key].map((skill) => (
                  <TechBadge key={skill} label={skill} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
