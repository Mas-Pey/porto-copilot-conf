"use client";

import type { FormEvent } from "react";
import type { IContactSection } from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";
import { StatusDot } from "@/components/atoms/StatusDot";
import { ContactFormCard, ContactPill } from "@/components/molecules/ContactFormCard";
import { useContactForm } from "@/hooks/useContactForm";

/** Props for the contact section organism. */
export interface IContactSectionProps {
  readonly contact: IContactSection;
}

/** Icon box sizes are part of the design, not the data payload. */
const SOCIAL_ICON_SIZES: Record<string, { width: number; height: number }> = {
  linkedin: { width: 15, height: 15 },
  github: { width: 15, height: 12 },
  twitter: { width: 14, height: 15 },
};

/** Form field ids the backend contract requires. */
const FIELD_NAMES = ["name", "email", "message"] as const;

/**
 * Contact / CTA banner: ambient glows, narrative column with direct email and
 * social links, and the message form wired to `POST /api/messages`.
 */
export function ContactSection({ contact }: IContactSectionProps) {
  const { feedback, status, isSubmitting, submit } = useContactForm(
    contact.form.successMessage,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // `currentTarget` is null after the first `await`, so capture it up front.
    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = FIELD_NAMES.map((name) => String(formData.get(name) ?? ""));

    const [name = "", email = "", message = ""] = values;

    const didSend = await submit({ name, email, message });

    if (didSend) {
      form.reset();
    }
  }

  return (
    <section
      id="kontak"
      className="flex w-full flex-col border-t border-[rgba(70,69,84,0.2)] pt-[64px] pb-[96px] lg:pt-[97px]"
    >
      <Panel
        variant="glass"
        className="relative w-full overflow-hidden rounded-[24px] p-[24px] sm:p-[40px] lg:p-[57px]"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[96px] -right-[96px] size-[384px] rounded-full bg-[rgba(192,193,255,0.1)] blur-[64px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-[96px] -left-[96px] size-[384px] rounded-full bg-[rgba(79,219,200,0.1)] blur-[64px]"
        />

        <div className="relative grid w-full grid-cols-1 gap-[48px] lg:grid-cols-12">
          {/* Narrative */}
          <div className="flex flex-col gap-[24px] lg:col-span-6">
            <span className="inline-flex w-fit items-center gap-[8px] rounded-full border border-[rgba(70,69,84,0.3)] bg-[#262a35] px-[13px] py-[5px]">
              <StatusDot tone="teal" size="sm" />
              <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#dfe2f1]">
                {contact.badge}
              </span>
            </span>

            <h2 className="font-sans text-[28px] leading-[36px] font-bold tracking-[-0.9px] text-[#dfe2f1] sm:text-[32px] sm:leading-[40px] lg:text-[36px] lg:leading-[44px]">
              {contact.title}
            </h2>

            <p className="font-sans text-[16px] leading-[26px] tracking-[-0.09px] text-[#c7c4d7] sm:text-[18px] sm:leading-[29.25px]">
              {contact.descriptionLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>

            <div className="flex flex-col gap-[16px] pt-[16px]">
              <a
                href={contact.emailHref}
                className="flex w-full items-center gap-[12px] rounded-[12px] border border-[rgba(70,69,84,0.3)] bg-[#1c1f2a] p-[13px] transition-colors hover:bg-[#242833] focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none"
              >
                <span className="flex size-[40px] shrink-0 items-center justify-center rounded-[8px] bg-[#313540]">
                  <IconGlyph
                    src={contact.emailIconSrc}
                    alt=""
                    width={17}
                    height={13}
                  />
                </span>
                <span className="flex flex-col items-start">
                  <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#908fa0]">
                    {contact.emailLabel}
                  </span>
                  <span className="font-sans text-[15px] leading-[24px] font-medium whitespace-nowrap text-[#dfe2f1]">
                    {contact.emailValue}
                  </span>
                </span>
              </a>

              <div className="flex flex-wrap items-center gap-[12px] pt-[8px]">
                {contact.socials.map((social) => {
                  const size = SOCIAL_ICON_SIZES[social.id] ?? {
                    width: 15,
                    height: 15,
                  };

                  return (
                    <ContactPill
                      key={social.id}
                      link={social}
                      iconWidth={size.width}
                      iconHeight={size.height}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-6">
            <ContactFormCard
              form={contact.form}
              onSubmit={handleSubmit}
              statusMessage={feedback}
              statusTone={status === "error" ? "error" : "success"}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </Panel>
    </section>
  );
}