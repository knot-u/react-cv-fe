"use client";

import { useLanguage } from "@/hooks/use-language";

export function ProjectsPageHeader() {
  const { copy } = useLanguage();

  return (
    <section className="mb-8 rounded-[32px] border border-border bg-background/70 p-6 backdrop-blur-md sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
        {copy.projects.tag}
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        {copy.projects.allTitle}
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        {copy.projects.intro}
      </p>
    </section>
  );
}
