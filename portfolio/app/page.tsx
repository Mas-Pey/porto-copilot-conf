"use client";

import { AmbientBackdrop } from "@/components/atoms/AmbientBackdrop";
import { AboutSection } from "@/components/organisms/AboutSection";
import { ContactSection } from "@/components/organisms/ContactSection";
import { HeroSection } from "@/components/organisms/HeroSection";
import { ProjectsSection } from "@/components/organisms/ProjectsSection";
import { SiteFooter } from "@/components/organisms/SiteFooter";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SkillsSection } from "@/components/organisms/SkillsSection";
import { usePortfolioPage } from "@/hooks/usePortfolioPage";

/**
 * Portfolio landing page.
 *
 * Composition only: every piece of copy and imagery arrives from
 * `usePortfolioPage()`, which reads the mock service today and can be swapped
 * for React Query later without touching this file.
 */
export default function Home() {
  const { data, activeFilterId, setActiveFilterId, visibleProjects } =
    usePortfolioPage();

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col bg-[#0f131d]">
      <AmbientBackdrop />
      <SiteHeader header={data.header} />

      <main className="relative mx-auto flex w-full max-w-[1280px] flex-col px-[24px]">
        <HeroSection hero={data.hero} />
        <AboutSection about={data.about} />
        <SkillsSection skills={data.skills} />
        <ProjectsSection
          eyebrow={data.projects.eyebrow}
          eyebrowTone={data.projects.eyebrowTone}
          title={data.projects.title}
          subtitle={data.projects.subtitle}
          filters={data.projects.filters}
          activeFilterId={activeFilterId}
          onSelectFilter={setActiveFilterId}
          projects={visibleProjects}
        />
        <ContactSection contact={data.contact} />
      </main>

      <SiteFooter footer={data.footer} />
    </div>
  );
}
