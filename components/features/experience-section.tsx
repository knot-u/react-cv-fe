"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import type { ExperienceItem } from "@/lib/types";

interface ExperienceSectionProps {
  experience: ExperienceItem[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <SectionTag label="Experience" />
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Work history
          </h2>
        </motion.div>

        <div className="relative flex flex-col gap-0">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 hidden h-full w-px bg-white/10 sm:block" />

          {experience.map((item, i) => (
            <motion.div
              key={`${item.company}-${item.period}`}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
              className="relative pb-8 sm:pl-8"
            >
              {/* Dot */}
              <div className="absolute left-0 top-1.5 hidden h-3.5 w-3.5 rounded-full border-2 border-cyan-500 bg-slate-950 sm:block" />

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <span className="font-semibold text-white">
                      {item.role}
                    </span>
                    <span className="ml-2 text-sm text-cyan-300">
                      @ {item.company}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">{item.period}</span>
                </div>

                <ul className="mt-3 space-y-1.5">
                  {item.responsibilities.map((r, j) => (
                    <li
                      key={j}
                      className="flex gap-2 text-sm leading-6 text-slate-400"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-cyan-500/50" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
