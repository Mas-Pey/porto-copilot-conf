import type { IContactLink, IFormField, IContactForm } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";

/** Props for the contact form molecule. */
export interface IContactFormCardProps {
  readonly form: IContactForm;
  /** Submission handler supplied by the container (page or organism). */
  readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Feedback text shown after a submit attempt; `null` hides it. */
  readonly statusMessage: string | null;
  /** Tone of the feedback line: success (teal) or failure (amber). */
  readonly statusTone?: "success" | "error";
  /** Disables the submit button and fields while a request is in flight. */
  readonly isSubmitting?: boolean;
}

function FieldControl({
  field,
  disabled,
}: {
  readonly field: IFormField;
  readonly disabled: boolean;
}) {
  const shared =
    "w-full rounded-[8px] border border-[rgba(255,255,255,0.08)] bg-[#111827] px-[17px] font-sans text-[15px] text-[#dfe2f1] placeholder:text-[#908fa0]/50 focus:border-[#c0c1ff] focus:ring-1 focus:ring-[#c0c1ff] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60";

  if (field.type === "textarea") {
    return (
      <textarea
        id={field.id}
        name={field.id}
        rows={4}
        required
        disabled={disabled}
        placeholder={field.placeholder}
        className={`${shared} resize-none py-[11px] leading-[24px]`}
      />
    );
  }

  return (
    <input
      id={field.id}
      name={field.id}
      type={field.type}
      required
      disabled={disabled}
      autoComplete={field.autoComplete}
      placeholder={field.placeholder}
      className={`${shared} py-[13px] leading-[18px]`}
    />
  );
}

/**
 * Contact form card. It is a real, progressively enhanced `<form>` — the
 * submission handler is left to the page so the CMS/API wiring stays outside
 * the presentation layer.
 */
export function ContactFormCard({
  form,
  onSubmit,
  statusMessage,
  statusTone = "success",
  isSubmitting = false,
}: IContactFormCardProps) {
  return (
    <Panel
      variant="form"
      className="flex w-full flex-col gap-[16px] rounded-[16px] p-[24px] sm:p-[33px]"
    >
      <h3 className="font-sans text-[20px] leading-[28px] font-semibold tracking-[-0.2px] text-[#dfe2f1]">
        {form.title}
      </h3>

      <form onSubmit={onSubmit} className="flex flex-col gap-[16px]">
        {form.fields.map((field) => (
          <div key={field.id} className="flex flex-col gap-[6px]">
            <label
              htmlFor={field.id}
              className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] uppercase text-[#908fa0]"
            >
              {field.label}
            </label>
            <FieldControl field={field} disabled={isSubmitting} />
          </div>
        ))}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-[6px] flex w-full cursor-pointer items-center justify-center gap-[8px] rounded-[8px] bg-[#c0c1ff] py-[12px] shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)] transition-colors hover:bg-[#d0d1ff] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0e18] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          <span className="font-mono text-[12px] leading-[16px] font-semibold tracking-[0.6px] text-center uppercase whitespace-nowrap text-[#1000a9]">
            {isSubmitting ? form.submittingLabel ?? "Sending…" : form.submitLabel}
          </span>
          <IconGlyph src={form.submitIconSrc} alt="" width={14} height={12} />
        </button>

        {statusMessage ? (
          <p
            role="status"
            className={`font-sans text-[13px] leading-[20px] ${
              statusTone === "error" ? "text-[#ffb4a9]" : "text-[#4fdbc8]"
            }`}
          >
            {statusMessage}
          </p>
        ) : null}
      </form>
    </Panel>
  );
}

/** Props for the social contact pill molecule. */
export interface IContactPillProps {
  readonly link: IContactLink;
  readonly iconWidth: number;
  readonly iconHeight: number;
}

/** Small icon + label pill used for LinkedIn / GitHub / Twitter links. */
export function ContactPill({
  link,
  iconWidth,
  iconHeight,
}: IContactPillProps) {
  return (
    <a
      href={link.href}
      target={link.external ? "_blank" : undefined}
      rel={link.external ? "noopener noreferrer" : undefined}
      className="inline-flex shrink-0 items-center gap-[8px] rounded-[8px] border border-[rgba(255,255,255,0.07)] bg-[rgba(255,255,255,0.03)] px-[17px] py-[9px] backdrop-blur-[8px] transition-colors hover:bg-[rgba(255,255,255,0.06)] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none"
    >
      <IconGlyph src={link.iconSrc} alt="" width={iconWidth} height={iconHeight} />
      <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#dfe2f1]">
        {link.label}
      </span>
    </a>
  );
}