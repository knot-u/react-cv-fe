"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { TechBadge } from "./tech-badge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex cursor-pointer flex-col rounded-2xl border border-border bg-background/70 p-5 backdrop-blur-md transition-colors hover:border-border-strong"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center justify-between">
          <span className="rounded-full bg-border px-2.5 py-0.5 text-xs text-muted capitalize">
          {project.category}
        </span>
        <div className="flex gap-2">
          {project.githubUrl !== "#" && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted hover:text-foreground transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              GitHub
            </Link>
          )}
          {project.liveUrl !== "#" && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-foreground hover:text-muted transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Live ↗
            </Link>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-foreground">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-6 text-muted">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </motion.article>
  );
}
