/**
 * Decorative ambient glows behind the page.
 *
 * Purely presentational and inert for assistive tech — it only supplies the
 * soft violet/teal light bleed visible in the design.
 */
export function AmbientBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute -top-[240px] left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[rgba(192,193,255,0.08)] blur-[120px]" />
      <div className="absolute top-[900px] -right-[200px] h-[480px] w-[480px] rounded-full bg-[rgba(79,219,200,0.06)] blur-[120px]" />
    </div>
  );
}