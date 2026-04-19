"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import type { EducationItem, Language } from "@/lib/types";

interface EducationSectionProps {
  education: EducationItem[];
  languages: Language[];
}

const LEVEL_COLOR: Record<string, string> = {
  Native: "bg-cyan-400",
  Advanced: "bg-cyan-500/70",
  Intermediate: "bg-cyan-500/40",
  Beginner: "bg-slate-500",
};

export function EducationSection({
  education,
  languages,
}: EducationSectionProps) {
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
          <SectionTag label="Education" />
          <h2 className="mt-3 mb-6 text-3xl font-semibold tracking-tight text-white">
            Academic background
          </h2>

          <div className="flex flex-col gap-4">
            {education.map((item, i) => (
              <motion.div
                key={item.institution}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <p className="font-semibold text-white">{item.degree}</p>
                <p className="mt-1 text-sm text-cyan-300">{item.institution}</p>
                <p className="mt-1 text-xs text-slate-500">{item.period}</p>
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
          <SectionTag label="Languages" />
          <h2 className="mt-3 mb-6 text-3xl font-semibold tracking-tight text-white">
            Languages
          </h2>

          <div className="flex flex-col gap-4">
            {languages.map((lang, i) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-white">{lang.name}</p>
                  <span className="text-xs text-slate-400">{lang.level}</span>
                </div>
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-1.5 rounded-full ${LEVEL_COLOR[lang.level] ?? "bg-slate-500"}`}
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
