"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import type { ContactInfo } from "@/lib/types";

interface ContactSectionProps {
  contact: ContactInfo;
}

export function ContactSection({ contact }: ContactSectionProps) {
  return (
    <section id="contact" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-8 sm:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <SectionTag label="Contact" />
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s work together
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-slate-400">
              Open to new opportunities. Reach out via email or connect on
              LinkedIn.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Link
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-slate-950 transition-colors hover:bg-cyan-400"
            >
              {contact.email}
            </Link>
            <Link
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/5"
            >
              LinkedIn ↗
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 text-xs text-slate-600"
          >
            {contact.phone}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
