import Image from "next/image";
import type { IProject } from "@/interface/portfolio";
import { MetaTag } from "@/components/atoms/MetaTag";
import { Panel } from "@/components/atoms/Panel";
import { ActionLinkButton } from "@/components/molecules/ActionLinkButton";

/** Props for the project card molecule. */
export interface IProjectCardProps {
  readonly project: IProject;
}

/**
 * Featured project card: thumbnail with category pill, copy, tech stack, and
 * the demo / source action pair.
 */
export function ProjectCard({ project }: IProjectCardProps) {
  return (
    <Panel
      variant="glass"
      className="flex h-full flex-col justify-between overflow-hidden rounded-[16px]"
    >
      <div className="flex flex-col">
        <div className="relative isolate">
          <div className="relative aspect-[598/374] w-full overflow-hidden bg-[#262a35]">
            <Image
              src={project.imageSrc}
              alt={project.imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 600px"
              className="object-cover"
            />
          </div>
          <span className="absolute top-[18px] left-[16px] rounded-full border border-[rgba(70,69,84,0.4)] bg-[rgba(10,14,24,0.8)] px-[13px] py-[5px] backdrop-blur-[12px]">
            <span className="font-mono text-[11px] leading-[14px] font-medium tracking-[0.88px] whitespace-nowrap text-[#4fdbc8]">
              {project.category}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-[12px] p-[24px] sm:p-[32px]">
          <h3 className="font-sans text-[20px] leading-[28px] font-semibold tracking-[-0.36px] text-[#dfe2f1] sm:text-[24px] sm:leading-[32px]">
            {project.title}
          </h3>
          <p className="font-sans text-[15px] leading-[24px] text-[#c7c4d7]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-[8px] pt-[8px]">
            {project.techStack.map((tech) => (
              <MetaTag key={`${project.id}-${tech}`} label={tech} />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-[12px] px-[24px] pb-[24px] sm:gap-[16px] sm:px-[32px] sm:pb-[32px]">
        <ActionLinkButton action={project.demo} />
        <ActionLinkButton action={project.source} />
      </div>
    </Panel>
  );
}