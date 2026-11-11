import type { ISiteHeader } from "@/interface/portfolio";
import { ActionLinkButton } from "@/components/molecules/ActionLinkButton";
import { NavLinkItem } from "@/components/molecules/NavLinkItem";

/** Props for the site header organism. */
export interface ISiteHeaderProps {
  readonly header: ISiteHeader;
}

/**
 * Sticky top navigation: brand monogram + name, desktop links, and the
 * "Get in touch" CTA.
 */
export function SiteHeader({ header }: ISiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[rgba(70,69,84,0.3)] bg-[rgba(15,19,29,0.8)] backdrop-blur-[12px]">
      <div className="mx-auto flex h-[64px] w-full max-w-[1280px] items-center justify-between px-[24px]">
        <a
          href={header.brand.href}
          className="flex shrink-0 items-center gap-[12px] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none"
        >
          <span className="flex size-[36px] items-center justify-center rounded-[8px] border border-[rgba(70,69,84,0.4)] bg-[#262a35]">
            <span className="font-sans text-[20px] leading-[28px] font-semibold tracking-[-0.2px] text-[#c0c1ff]">
              {header.brand.monogram}
            </span>
          </span>
          <span className="flex flex-col items-start">
            <span className="font-sans text-[18px] leading-[24px] font-bold tracking-[-0.5px] whitespace-nowrap text-[#dfe2f1] sm:text-[20px] sm:leading-[28px]">
              {header.brand.title}
            </span>
            <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#c7c4d7]">
              {header.brand.subtitle}
            </span>
          </span>
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden items-center gap-[32px] md:flex"
        >
          {header.navLinks.map((link) => (
            <NavLinkItem key={link.id} link={link} />
          ))}
        </nav>

        <ActionLinkButton action={header.cta} />
      </div>
    </header>
  );
}