import type {
  ITerminalLine,
  ITerminalPreview,
  ITerminalToken,
  TTerminalTone,
} from "@/interface/portfolio";
import { IconGlyph } from "@/components/atoms/IconGlyph";
import { Panel } from "@/components/atoms/Panel";

/** Props for the terminal preview molecule. */
export interface ITerminalPreviewCardProps {
  readonly terminal: ITerminalPreview;
}

const toneClasses: Record<TTerminalTone, string> = {
  plain: "text-[#c7c4d7]",
  keyword: "text-[#7bd0ff]",
  string: "text-[#4fdbc8]",
  module: "text-[#4fdbc8]",
  comment: "text-[#464554]",
  variable: "text-[#c0c1ff]",
  accent: "text-[#c0c1ff]",
};

const indentClasses: Record<ITerminalLine["indent"], string> = {
  0: "",
  1: "pl-[16px]",
  2: "pl-[32px]",
};

function TerminalToken({ token }: { readonly token: ITerminalToken }) {
  return <span className={toneClasses[token.tone]}>{token.text}</span>;
}

/**
 * Non-interactive terminal preview used as the hero's right-hand visual.
 * Every line, token, and command comes from the data layer.
 */
export function TerminalPreviewCard({ terminal }: ITerminalPreviewCardProps) {
  return (
    <Panel
      variant="glass"
      className="flex w-full flex-col overflow-hidden rounded-[12px] shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]"
    >
      {/* Terminal chrome */}
      <div className="flex items-center justify-between border-b border-[rgba(70,69,84,0.3)] bg-[rgba(10,14,24,0.9)] px-[16px] pt-[12px] pb-[13px]">
        <span className="flex items-center gap-[8px]" aria-hidden>
          <span className="size-[12px] rounded-full bg-[#464554]" />
          <span className="size-[12px] rounded-full bg-[rgba(70,69,84,0.6)]" />
          <span className="size-[12px] rounded-full bg-[rgba(70,69,84,0.4)]" />
        </span>
        <span className="font-mono text-[13px] leading-[22px] text-[#908fa0]">
          {terminal.filename}
        </span>
        <button
          type="button"
          aria-label={terminal.copyLabel}
          className="shrink-0 cursor-pointer opacity-80 transition-opacity hover:opacity-100 focus-visible:ring-2 focus-visible:ring-[#c0c1ff] focus-visible:outline-none"
        >
          <IconGlyph
            src={terminal.copyIconSrc}
            alt=""
            width={11}
            height={13}
          />
        </button>
      </div>

      {/* Code body */}
      <div className="flex flex-col gap-[4px] overflow-auto p-[20px]">
        {terminal.lines.map((line) => (
          <p
            key={line.id}
            className={`font-mono text-[11px] leading-[22px] whitespace-nowrap sm:text-[13px] ${indentClasses[line.indent]}`}
          >
            {line.tokens.map((token) => (
              <TerminalToken key={token.id} token={token} />
            ))}
          </p>
        ))}

        <div className="mt-[9px] flex items-center gap-[8px] border-t border-[rgba(70,69,84,0.2)] pt-[13px]">
          <IconGlyph
            src={terminal.promptIconSrc}
            alt=""
            width={12}
            height={9}
          />
          <span className="font-mono text-[11px] leading-[16px] whitespace-nowrap text-[#4fdbc8] sm:text-[12px]">
            {terminal.footerCommand}
          </span>
        </div>
      </div>
    </Panel>
  );
}