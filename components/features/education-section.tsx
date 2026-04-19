"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import { useLanguage } from "@/hooks/use-language";
import type { EducationItem, Language } from "@/lib/types";

interface EducationSectionProps {
  education: EducationItem[];
  languages: Language[];
}

const LEVEL_COLOR: Record<string, string> = {
  Native:       "bg-foreground",
  Advanced:     "bg-foreground/70",
  Intermediate: "bg-foreground/40",
  Beginner:     "bg-foreground/25",
};

export function EducationSection({
  education,
  languages,
}: EducationSectionProps) {
  const { copy } = useLanguage();

  return (
    <section id="education" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl grid gap-8 sm:grid-cols-2">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <SectionTag label={copy.education.tag} />
          <h2 className="mt-3 mb-6 text-3xl font-semibold tracking-tight text-white">
            {copy.education.title}
          </h2>

          <div className="flex flex-col gap-4">
            {education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <p className="font-semibold text-foreground">{copy.education.itemsById[item.id]?.degree ?? item.degree}</p>
                <p className="mt-1 text-sm text-muted">{item.institution}</p>
                <p className="mt-1 text-xs text-subtle">{item.period}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div
          id="languages"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
        >
          <SectionTag label={copy.languagesSection.tag} />
          <h2 className="mt-3 mb-6 text-3xl font-semibold tracking-tight text-foreground">
            {copy.languagesSection.title}
          </h2>

          <div className="flex flex-col gap-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl border border-border bg-surface p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-foreground">{copy.languagesSection.itemsById[lang.id]?.name ?? lang.name}</p>
                  <span className="text-xs text-subtle">{copy.languagesSection.levels[lang.level] ?? lang.level}</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-border">
                  <div
                    className={`h-1.5 rounded-full ${LEVEL_COLOR[lang.level] ?? "bg-foreground/25"}`}
                    style={{
                      width:
                        lang.level === "Native"
                          ? "100%"
                          : lang.level === "Advanced"
                            ? "80%"
                            : lang.level === "Intermediate"
                              ? "55%"
                              : "30%",
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
