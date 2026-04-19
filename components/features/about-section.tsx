"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import type { AboutData } from "@/lib/types";

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionTag label="About" />
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Who I am
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {about.paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="text-sm leading-7 text-slate-400"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
