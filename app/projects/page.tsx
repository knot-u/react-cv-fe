import { Navbar } from "@/components/layout/navbar";
import { ProjectsClient } from "@/components/features/projects-client";
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
      <main className="px-4 pb-16 pt-8 sm:px-6 sm:pt-12">
        <div className="mx-auto max-w-6xl">
          <section className="mb-8 rounded-[32px] border border-white/10 bg-slate-900/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
              Projects
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              All work
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">
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
