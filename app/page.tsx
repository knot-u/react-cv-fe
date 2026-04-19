import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/features/hero-section";
import { AboutSection } from "@/components/features/about-section";
import { SkillsSection } from "@/components/features/skills-section";
import { ExperienceSection } from "@/components/features/experience-section";
import { EducationSection } from "@/components/features/education-section";
import { ProjectsPreview } from "@/components/features/projects-preview";
import { ContactSection } from "@/components/features/contact-section";
import { getPortfolioData } from "@/lib/api";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <main>
        <HeroSection hero={data.hero} />
        <AboutSection about={data.about} />
        <SkillsSection skills={data.skills} />
        <ExperienceSection experience={data.experience} />
        <EducationSection education={data.education} languages={data.languages} />
        <ProjectsPreview projects={data.projects} />
        <ContactSection contact={data.hero.contact} />
      </main>
    </>
  );
}
