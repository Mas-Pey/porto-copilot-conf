import { AmbientBackdrop } from "@/components/atoms/AmbientBackdrop";
import { HeroSection } from "@/components/organisms/HeroSection";
import { SiteHeader } from "@/components/organisms/SiteHeader";
import { SlideFooter } from "@/components/organisms/SlideFooter";
import { useOrientationPage } from "@/hooks/useOrientationPage";

/**
 * Orientation slide page ("Welcome Aboard").
 *
 * Composition only: every piece of copy and imagery arrives from
 * `useOrientationPage()`, which reads the mock service today and can be
 * swapped for React Query later without touching this file.
 */
export default function Home() {
  const { data } = useOrientationPage();

  return (
    <div className="relative flex min-h-screen w-full flex-1 flex-col overflow-hidden bg-[#0f131d] pb-[160px]">
      <AmbientBackdrop />

      <SiteHeader
        brand={data.brand}
        status={data.status}
        metaPills={data.metaPills}
      />

      <main className="relative flex flex-1 flex-col items-center justify-center">
        <HeroSection
          hero={data.hero}
          highlights={data.highlights}
          actions={data.actions}
        />
      </main>

      <div className="relative mt-auto">
        <SlideFooter footer={data.footer} />
      </div>
    </div>
  );
}
