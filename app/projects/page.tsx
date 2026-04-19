import { Navbar } from "@/components/layout/navbar";
import { ProjectsClient } from "@/components/features/projects-client";
import { HeroGrid } from "@/components/ui/hero-grid";
import { getPortfolioData, getProjectsPage } from "@/lib/api";

export const metadata = {
  title: "Projects — Santiago Cardona",
  description: "Full stack projects and selected work by Santiago Cardona.",
};

export default async function ProjectsPage() {
  const data = await getPortfolioData();
  const initial = await getProjectsPage(1, 4);

  return (
    <>
      <Navbar />
      <main className="relative px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        {/* Interactive net grid background */}
        <HeroGrid />

        <div className="relative mx-auto max-w-6xl">
          <section className="mb-8 rounded-[32px] border border-border bg-background/70 p-6 backdrop-blur-md sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground">
              Projects
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
              All work
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
              A collection of full stack, backend, frontend, and DevOps projects.
              Scroll to load more.
            </p>
          </section>

          <ProjectsClient
            initialProjects={initial.items}
            allProjects={data.projects}
          />
        </div>
      </main>
    </>
  );
}
