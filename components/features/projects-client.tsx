"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import type { Project } from "@/lib/types";

const PAGE_SIZE = 4;

interface ProjectsClientProps {
  initialProjects: Project[];
  allProjects: Project[];
}

export function ProjectsClient({
  initialProjects,
  allProjects,
}: ProjectsClientProps) {
  const [visible, setVisible] = useState<Project[]>(initialProjects);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(
    initialProjects.length < allProjects.length
  );
  const [loading, setLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    if (loading || !hasMore) return;
    setLoading(true);

    // Simulate async fetch with a small delay
    setTimeout(() => {
      const nextPage = page + 1;
      const start = nextPage * PAGE_SIZE - PAGE_SIZE;
      const newItems = allProjects.slice(start, start + PAGE_SIZE);
      setVisible((prev) => [...prev, ...newItems]);
      setPage(nextPage);
      setHasMore(start + PAGE_SIZE < allProjects.length);
      setLoading(false);
    }, 400);
  }, [loading, hasMore, page, allProjects]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence initial={false}>
          {visible.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: i < PAGE_SIZE ? 0 : 0.05 * (i % PAGE_SIZE),
                ease: "easeOut",
              }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Sentinel + state indicators */}
      <div ref={sentinelRef} className="mt-8 flex justify-center">
        {loading && (
          <div className="flex gap-1.5" aria-label="Loading more projects">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-2 w-2 rounded-full bg-foreground"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        )}
        {!hasMore && !loading && visible.length > 0 && (
          <p className="text-xs text-subtle">All projects loaded</p>
        )}
      </div>
    </div>
  );
}
