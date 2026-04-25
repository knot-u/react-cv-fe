"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionTag } from "@/components/ui/section-tag";
import { ProjectCard } from "@/components/ui/project-card";
import { useLanguage } from "@/hooks/use-language";
import type { Project } from "@/lib/types";

interface ProjectsPreviewProps {
  projects: Project[];
}

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  const preview = projects.slice(0, 3);
  const { copy } = useLanguage();

  return (
    <section id="playground" className="scroll-mt-20 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <SectionTag label={copy.projects.tag} />
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {copy.projects.previewTitle}
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden text-sm text-foreground transition-colors hover:text-muted sm:block"
          >
            {copy.projects.viewAll}
          </Link>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="mt-8 text-center sm:hidden"
        >
          <Link
            href="/projects"
            className="text-sm text-foreground transition-colors hover:text-muted"
          >
            {copy.projects.viewAllProjects}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
