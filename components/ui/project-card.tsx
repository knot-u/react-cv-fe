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
      className="flex cursor-pointer flex-col rounded-2xl border border-white/10 bg-slate-900/60 p-5 transition-colors hover:border-cyan-500/30"
      onClick={onClick}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs text-slate-400 capitalize">
          {project.category}
        </span>
        <div className="flex gap-2">
          {project.githubUrl !== "#" && (
            <Link
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-slate-400 hover:text-white transition-colors"
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
              className="text-xs text-cyan-400 hover:text-cyan-200 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              Live ↗
            </Link>
          )}
        </div>
      </div>

      <h3 className="mb-2 text-base font-semibold text-white">
        {project.title}
      </h3>
      <p className="mb-4 flex-1 text-sm leading-6 text-slate-400">
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
