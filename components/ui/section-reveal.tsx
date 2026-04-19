"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionRevealProps {
  children: ReactNode;
}

export function SectionReveal({ children }: SectionRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(14px)" }}
      whileInView={{ opacity: 1, filter: "blur(0px)" }}
      viewport={{ once: false, margin: "-12%" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}
