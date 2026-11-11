import type { INavLink } from "@/interface/portfolio";

/** Props for the navigation link molecule. */
export interface INavLinkItemProps {
  readonly link: INavLink;
}

/**
 * Single top-navigation entry. The active state is data-driven so the header
 * organism never needs to know which section is highlighted.
 */
export function NavLinkItem({ link }: INavLinkItemProps) {
  const isActive = link.isActive === true;

  return (
    <a
      href={link.href}
      aria-current={isActive ? "page" : undefined}
      className={`flex flex-col items-start border-b-2 pb-[6px] transition-colors focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none ${
        isActive
          ? "border-[#c0c1ff]"
          : "border-transparent hover:border-[rgba(192,193,255,0.4)]"
      }`}
    >
      <span
        className={`font-mono text-[12px] leading-[16px] font-medium tracking-[0.72px] whitespace-nowrap ${
          isActive ? "text-[#c0c1ff]" : "text-[#c7c4d7]"
        }`}
      >
        {link.label}
      </span>
    </a>
  );
}