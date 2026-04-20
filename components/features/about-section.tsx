"use client";

import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import { useLanguage } from "@/hooks/use-language";
import type { AboutData } from "@/lib/types";

interface AboutSectionProps {
  about: AboutData;
}

export function AboutSection({ about }: AboutSectionProps) {
  const { copy } = useLanguage();
  const paragraphs = copy.about.paragraphs?.length ? copy.about.paragraphs : about.paragraphs;

  return (
    <section id="about" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-border bg-surface p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionTag label={copy.about.tag} />
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {copy.about.title}
            </h2>
          </motion.div>

          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {paragraphs.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                className="text-sm leading-7 text-muted"
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
