import type { IFooterContent } from "@/interface/portfolio";

/** Props for the site footer organism. */
export interface ISiteFooterProps {
  readonly footer: IFooterContent;
}

/** Page footer: brand note, copyright, and the secondary link row. */
export function SiteFooter({ footer }: ISiteFooterProps) {
  return (
    <footer className="w-full border-t border-[rgba(70,69,84,0.2)] bg-[#0a0e18]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start justify-between gap-[24px] px-[24px] py-[48px] md:flex-row md:items-center">
        <div className="flex flex-col gap-[4px]">
          <span className="font-sans text-[20px] leading-[28px] font-bold tracking-[-0.2px] whitespace-nowrap text-[#dfe2f1]">
            {footer.brand}
          </span>
          <span className="font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#c7c4d7]">
            {footer.note}
          </span>
          <span className="pt-[4px] font-sans text-[13px] leading-[20px] tracking-[0.065px] text-[#908fa0]">
            {footer.copyright}
          </span>
        </div>

        <nav
          aria-label="Navigasi footer"
          className="flex flex-wrap items-center gap-[24px]"
        >
          {footer.links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              aria-current={link.isActive ? "page" : undefined}
              className={`font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none ${
                link.isActive
                  ? "text-[#dfe2f1]"
                  : "text-[#c7c4d7] hover:text-[#dfe2f1]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}