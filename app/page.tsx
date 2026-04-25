import { Logo } from "@/components/layout/logo";
import { FloatingNav } from "@/components/layout/floating-nav";
import { HeroSection } from "@/components/features/hero-section";
import { AboutSection } from "@/components/features/about-section";
import { ExperienceSection } from "@/components/features/experience-section";
import { ProjectsPreview } from "@/components/features/projects-preview";
import { ContactSection } from "@/components/features/contact-section";
import { SectionReveal } from "@/components/ui/section-reveal";
import { getPortfolioData } from "@/lib/api";

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <>
      <Logo />
      <FloatingNav />
      <main>
        <HeroSection hero={data.hero} />
        <SectionReveal>
          <AboutSection about={data.about} />
        </SectionReveal>
        <SectionReveal>
          <ExperienceSection experience={data.experience} />
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
