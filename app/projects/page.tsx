import { Navbar } from "@/components/layout/navbar";
import { ProjectsClient } from "@/components/features/projects-client";
import { ProjectsPageHeader } from "@/components/features/projects-page-header";
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
          <ProjectsPageHeader />

          <ProjectsClient
            initialProjects={initial.items}
            allProjects={data.projects}
          />
        </div>
      </main>
    </>
  );
}
