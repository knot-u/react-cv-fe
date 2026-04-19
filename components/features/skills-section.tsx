"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import { TechBadge } from "@/components/ui/tech-badge";
import { useLanguage } from "@/hooks/use-language";
import type { SkillsData } from "@/lib/types";

interface SkillsSectionProps {
  skills: SkillsData;
}

const CATEGORIES: Array<keyof SkillsData> = [
  "frontend",
  "backend",
  "devops",
  "databases",
  "tools",
  "other",
];

export function SkillsSection({ skills }: SkillsSectionProps) {
  const { copy } = useLanguage();

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
          <SectionTag label={copy.skills.tag} />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {copy.skills.title}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
              className="rounded-2xl border border-border bg-surface p-5"
            >
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-subtle">
                {copy.skills.categories[cat] ?? cat}
              </p>
              <div className="flex flex-wrap gap-2">
                {skills[cat].map((skill) => (
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
