import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/features/hero-section";
import { AboutSection } from "@/components/features/about-section";
import { SkillsSection } from "@/components/features/skills-section";
import { ExperienceSection } from "@/components/features/experience-section";
import { EducationSection } from "@/components/features/education-section";
import { ProjectsPreview } from "@/components/features/projects-preview";
import { ContactSection } from "@/components/features/contact-section";
import { VerticalNav } from "@/components/ui/vertical-nav";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getPortfolioData } from "@/lib/api";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <>
      <Navbar />
      <VerticalNav />
      <main>
        <HeroSection hero={data.hero} />
        <SectionReveal>
          <AboutSection about={data.about} />
        </SectionReveal>
        <SectionReveal>
          <SkillsSection skills={data.skills} />
        </SectionReveal>
        <SectionReveal>
          <ExperienceSection experience={data.experience} />
        </SectionReveal>
        <SectionReveal>
          <EducationSection education={data.education} languages={data.languages} />
        </SectionReveal>
        <SectionReveal>
          <ProjectsPreview projects={data.projects} />
        </SectionReveal>
        <SectionReveal>
          <ContactSection contact={data.hero.contact} />
        </SectionReveal>
      </main>
    </>
  );
}
