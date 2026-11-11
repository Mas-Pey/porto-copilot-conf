import type { IPortfolioPage } from "@/interface/portfolio";

/**
 * Mock content for the portfolio landing page.
 *
 * All copy, links, and asset paths live here so the Presentation Layer stays
 * data-agnostic. When the Backend CMS is ready, only this module is replaced
 * with a `fetch` call — the hook signature and every component stay untouched.
 */
const portfolioPage: IPortfolioPage = {
  header: {
    brand: {
      monogram: "HW.",
      title: "Portfolio",
      subtitle: "Harish Wijaya",
      href: "#beranda",
    },
    navLinks: [
      { id: "about", label: "About", href: "#tentang" },
      { id: "skills", label: "Skills", href: "#keahlian" },
      { id: "projects", label: "Projects", href: "#proyek", isActive: true },
      { id: "contact", label: "Contact", href: "#kontak" },
    ],
    cta: {
      id: "header-contact",
      label: "Get in touch",
      href: "#kontak",
      variant: "primary",
      iconSrc: "/icons/header-arrow.svg",
      size: "sm",
    },
  },

  hero: {
    availabilityLabel: "Open to fullstack & AI engineering roles",
    headline: [
      {
        id: "line-1",
        segments: [{ id: "line-1-a", text: "Building AI-Native" }],
      },
      {
        id: "line-2",
        segments: [{ id: "line-2-a", text: "Web Systems with" }],
      },
      {
        id: "line-3",
        segments: [
          {
            id: "line-3-a",
            text: "Real Intelligence",
            gradient: true,
          },
          { id: "line-3-b", text: " that" },
        ],
      },
      {
        id: "line-4",
        segments: [{ id: "line-4-a", text: "Actually Ships." }],
      },
    ],
    descriptionLines: [
      "I'm riding the AI Native Engineer wave (Fullstack), but with actual",
      "intelligence baked in. Not just prompting though – we're talking",
      "Agent + Human-in-the-Loop systems that actually make sense.",
    ],
    actions: [
      {
        id: "hero-explore",
        label: "View Projects",
        href: "#proyek",
        variant: "primary",
        iconSrc: "/icons/hero-arrow-primary.svg",
      },
      {
        id: "hero-about",
        label: "About Me",
        href: "#tentang",
        variant: "secondary",
        iconSrc: "/icons/hero-arrow-secondary.svg",
      },
    ],
    techStackLabel: "Core stack:",
    techStack: [
      { id: "agents", label: "AI Agents", tone: "accent" },
      { id: "rag", label: "RAG & ReAct", tone: "teal" },
      { id: "mcp", label: "MCP", tone: "sky" },
      { id: "tensorflow", label: "TensorFlow", tone: "accent" },
      { id: "n8n", label: "n8n", tone: "teal" },
    ],
    terminal: {
      filename: "harish.config.ts",
      copyIconSrc: "/icons/terminal-copy.svg",
      copyLabel: "Copy profile config",
      promptIconSrc: "/icons/terminal-prompt.svg",
      footerCommand: '$ git commit -m "feat: ship ai-native systems"',
      lines: [
        {
          id: "t-1",
          indent: 0,
          tokens: [
            { id: "t-1-1", text: "import", tone: "keyword" },
            { id: "t-1-2", text: " { ", tone: "plain" },
            { id: "t-1-3", text: "Engineer", tone: "module" },
            { id: "t-1-4", text: " } ", tone: "plain" },
            { id: "t-1-5", text: "from", tone: "keyword" },
            { id: "t-1-6", text: " ", tone: "plain" },
            { id: "t-1-7", text: "'@harish/ai-native'", tone: "variable" },
            { id: "t-1-8", text: ";", tone: "plain" },
          ],
        },
        {
          id: "t-2",
          indent: 0,
          tokens: [
            {
              id: "t-2-1",
              text: "// Human in the loop, agent in the stack",
              tone: "comment",
            },
          ],
        },
        {
          id: "t-3",
          indent: 0,
          tokens: [
            { id: "t-3-1", text: "export const", tone: "keyword" },
            { id: "t-3-2", text: " ", tone: "plain" },
            { id: "t-3-3", text: "harish", tone: "variable" },
            { id: "t-3-4", text: " = ", tone: "plain" },
            { id: "t-3-5", text: "new", tone: "keyword" },
            { id: "t-3-6", text: " ", tone: "plain" },
            { id: "t-3-7", text: "Engineer", tone: "module" },
            { id: "t-3-8", text: "({", tone: "plain" },
          ],
        },
        {
          id: "t-4",
          indent: 1,
          tokens: [
            { id: "t-4-1", text: "name: ", tone: "plain" },
            { id: "t-4-2", text: "'Harish Wijaya'", tone: "string" },
            { id: "t-4-3", text: ",", tone: "plain" },
          ],
        },
        {
          id: "t-5",
          indent: 1,
          tokens: [
            { id: "t-5-1", text: "role: ", tone: "plain" },
            {
              id: "t-5-2",
              text: "'AI Native Engineer (Fullstack)'",
              tone: "string",
            },
            { id: "t-5-3", text: ",", tone: "plain" },
          ],
        },
        {
          id: "t-6",
          indent: 1,
          tokens: [
            { id: "t-6-1", text: "location: ", tone: "plain" },
            { id: "t-6-2", text: "'Yogyakarta, Indonesia'", tone: "string" },
            { id: "t-6-3", text: ",", tone: "plain" },
          ],
        },
        {
          id: "t-7",
          indent: 1,
          tokens: [{ id: "t-7-1", text: "stack: [", tone: "plain" }],
        },
        {
          id: "t-8",
          indent: 2,
          tokens: [
            { id: "t-8-1", text: "'RAG + ReAct Pipelines'", tone: "plain" },
            { id: "t-8-2", text: ",", tone: "accent" },
          ],
        },
        {
          id: "t-9",
          indent: 2,
          tokens: [
            {
              id: "t-9-1",
              text: "'Agent Orchestration & MCP'",
              tone: "plain",
            },
            { id: "t-9-2", text: ",", tone: "accent" },
          ],
        },
        {
          id: "t-10",
          indent: 2,
          tokens: [
            {
              id: "t-10-1",
              text: "'Human-in-the-Loop Design'",
              tone: "plain",
            },
          ],
        },
        {
          id: "t-11",
          indent: 1,
          tokens: [{ id: "t-11-1", text: "],", tone: "plain" }],
        },
        {
          id: "t-12",
          indent: 1,
          tokens: [
            { id: "t-12-1", text: "status: ", tone: "plain" },
            {
              id: "t-12-2",
              text: "'Building things that ship'",
              tone: "string",
            },
            { id: "t-12-3", text: ",", tone: "plain" },
          ],
        },
        {
          id: "t-13",
          indent: 1,
          tokens: [
            { id: "t-13-1", text: "getInTouch: () =>", tone: "plain" },
            { id: "t-13-2", text: "window", tone: "keyword" },
            { id: "t-13-3", text: ".open(", tone: "plain" },
            {
              id: "t-13-4",
              text: "'mailto:justpey2win@gmail.com'",
              tone: "variable",
            },
            { id: "t-13-5", text: ")", tone: "plain" },
          ],
        },
        {
          id: "t-14",
          indent: 0,
          tokens: [{ id: "t-14-1", text: "});", tone: "plain" }],
        },
      ],
    },
    stats: [
      {
        id: "experience",
        iconSrc: "/icons/stat-experience.svg",
        iconWidth: 23,
        iconHeight: 14,
        value: "1+ YoE",
        label: "Years of Experience",
      },
      {
        id: "projects",
        iconSrc: "/icons/stat-projects.svg",
        iconWidth: 23,
        iconHeight: 23,
        value: "<100 Projects",
        label: "Shipped & Still Counting",
      },
      {
        id: "satisfaction",
        iconSrc: "/icons/stat-satisfaction.svg",
        iconWidth: 23,
        iconHeight: 23,
        value: "69%",
        label: "Client Satisfaction",
      },
    ],
  },

  about: {
    eyebrow: "Profile & Journey",
    title: "About Me",
    subtitle:
      "A short look at how I got here, what I value, and how I work.",
    profile: {
      avatarSrc: "/images/avatar.png",
      avatarAlt: "Portrait of Harish Wijaya",
      name: "Harish Wijaya",
      role: "AI Native Engineer (Fullstack)",
      specs: [
        {
          id: "location",
          label: "Location",
          value: "Yogyakarta, Indonesia",
          divider: true,
        },
        {
          id: "status",
          label: "Status",
          value: "Single",
          highlight: true,
          divider: true,
        },
        {
          id: "education",
          label: "Education",
          value: "Informatics (UPNVYK)",
        },
      ],
      cta: {
        id: "download-cv",
        label: "Download CV (PDF)",
        href: "#unduh-cv",
        variant: "secondary",
        iconSrc: "/icons/about-download.svg",
        download: true,
      },
    },
    bio: [
      "Quick heads up, this is my journey from nothing to AI Native Engineer (actually back to nothing 🤣 LoL).",
      "Started with Machine Learning – built classifiers, played with NLP, back when AI was just a playground thing. Then the LLM APIs dropped, and I got deep into RAG, ReAct, AI Agents—even wired up n8n to automate the whole workflow.",
    ],
    pillars: [
      {
        id: "clean-code",
        iconSrc: "/icons/pillar-clean-code.svg",
        iconWidth: 17,
        iconHeight: 17,
        title: "Clean Code",
        description:
          "SOLID principles, TypeScript strict mode, and regular testing for long-term reliability.",
      },
      {
        id: "user-centric",
        iconSrc: "/icons/pillar-user-centric.svg",
        iconWidth: 18,
        iconHeight: 18,
        title: "User-Centric",
        description:
          "Interfaces grounded in WCAG accessibility, smooth micro-interactions, and 60fps performance.",
      },
      {
        id: "agility",
        iconSrc: "/icons/pillar-agility.svg",
        iconWidth: 15,
        iconHeight: 18,
        title: "Agility & Growth",
        description:
          "Fast iteration, transparent communication, and adapting to whatever the problem actually needs.",
      },
    ],
    timeline: {
      title: "Career Snapshot",
      iconSrc: "/icons/timeline-clock.svg",
      items: [
        {
          id: "current",
          period: "2024 — Present",
          role: "AI Native Engineer (Fullstack) — Freelance & Contract",
          description:
            "Building RAG pipelines, ReAct agents, and MCP integrations on top of modern fullstack web apps.",
          isCurrent: true,
        },
        {
          id: "ml-foundation",
          period: "2022 — 2024",
          role: "Machine Learning & NLP — Self-Taught Foundation",
          description:
            "Built classifiers, explored NLP, and shipped early AI experiments long before LLM APIs existed.",
          isCurrent: false,
        },
      ],
    },
  },

  skills: {
    eyebrow: "Toolkit",
    eyebrowTone: "teal",
    title: "Skills & Tech",
    subtitle:
      "The stack I actually reach for: AI engineering, agent workflows, and the fullstack web that carries them.",
    footnoteIconSrc: "/icons/skill-check.svg",
    categories: [
      {
        id: "ai-engineering",
        iconSrc: "/icons/skill-frontend.svg",
        iconWidth: 22,
        iconHeight: 18,
        title: "AI Engineering",
        description: "Models, retrieval, and reasoning loops.",
        footnote: "Core Discipline",
        skills: [
          { id: "ai-tf", label: "TensorFlow Certified", tone: "accent" },
          { id: "ai-nlp", label: "NLP", tone: "teal" },
          { id: "ai-rag", label: "RAG", tone: "sky" },
          { id: "ai-react", label: "ReAct", tone: "teal" },
          { id: "ai-agents", label: "AI Agents", tone: "accent" },
        ],
      },
      {
        id: "agents-automation",
        iconSrc: "/icons/skill-devops.svg",
        iconWidth: 22,
        iconHeight: 18,
        title: "Agents & Automation",
        description: "Tools, protocols, and workflows that run.",
        footnote: "Human in the Loop",
        skills: [
          { id: "ag-mcp", label: "MCP", tone: "accent" },
          { id: "ag-n8n", label: "n8n", tone: "teal" },
          { id: "ag-tools", label: "Tool Use", tone: "sky" },
          { id: "ag-orchestration", label: "Orchestration", tone: "neutral" },
          { id: "ag-hooks", label: "Agent Hooks", tone: "teal" },
        ],
      },
      {
        id: "fullstack",
        iconSrc: "/icons/skill-backend.svg",
        iconWidth: 20,
        iconHeight: 20,
        title: "Fullstack",
        description: "Products end to end, API to interface.",
        footnote: "Production Tested",
        skills: [
          { id: "fs-next", label: "Next.js", tone: "accent" },
          { id: "fs-react", label: "React", tone: "teal" },
          { id: "fs-ts", label: "TypeScript", tone: "sky" },
          { id: "fs-node", label: "Node.js", tone: "teal" },
          { id: "fs-python", label: "Python", tone: "neutral" },
          { id: "fs-postgres", label: "PostgreSQL", tone: "accent" },
        ],
      },
      {
        id: "uiux",
        iconSrc: "/icons/skill-uiux.svg",
        iconWidth: 22,
        iconHeight: 22,
        title: "UI/UX Design",
        description: "Interfaces that stay out of the way.",
        footnote: "Human Centered",
        skills: [
          { id: "ux-figma", label: "Figma", tone: "sky" },
          { id: "ux-tokens", label: "Design Tokens", tone: "accent" },
          { id: "ux-wireframe", label: "Wireframing", tone: "teal" },
          { id: "ux-prototype", label: "Prototyping", tone: "neutral" },
        ],
      },
    ],
  },

  projects: {
    eyebrow: "Selected Work",
    eyebrowTone: "accent",
    title: "Featured Projects",
    subtitle:
      "Three builds that show how I think — from ticket booking to mobile and interface design.",
    allFilterId: "all",
    filters: [
      { id: "all", label: "All", count: 3 },
      { id: "fullstack", label: "Fullstack", count: 2 },
      { id: "uiux", label: "UI/UX", count: 1 },
    ],
    projects: [
      {
        id: "bioskop-web",
        category: "Fullstack",
        title: "Bioskop Web",
        description:
          "Movie ticket booking on the web: seat selection, schedules, and checkout in one flow.",
        imageSrc: "/images/project-bioskopweb.png",
        imageAlt: "Screenshot of the Bioskop Web app",
        techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL"],
        tags: ["fullstack"],
        demo: {
          id: "bioskop-web-demo",
          label: "Live Demo",
          href: "#demo-bioskop-web",
          variant: "primary",
          iconSrc: "/icons/project-demo-arrow.svg",
          size: "sm",
          external: true,
        },
        source: {
          id: "bioskop-web-source",
          label: "Source Code",
          href: "#source-bioskop-web",
          variant: "secondary",
          iconSrc: "/icons/project-code-arrow.svg",
          size: "sm",
          external: true,
        },
      },
      {
        id: "bioskop-mobile",
        category: "Fullstack",
        title: "Bioskop Mobile",
        description:
          "The same booking flow, rebuilt mobile-first with offline-friendly state.",
        imageSrc: "/images/project-bioskopmobile.png",
        imageAlt: "Screenshot of the Bioskop Mobile app",
        techStack: ["React Native", "TypeScript", "Node.js", "REST API"],
        tags: ["fullstack"],
        demo: {
          id: "bioskop-mobile-demo",
          label: "Live Demo",
          href: "#demo-bioskop-mobile",
          variant: "primary",
          iconSrc: "/icons/project-demo-arrow.svg",
          size: "sm",
          external: true,
        },
        source: {
          id: "bioskop-mobile-source",
          label: "Source Code",
          href: "#source-bioskop-mobile",
          variant: "secondary",
          iconSrc: "/icons/project-code-arrow.svg",
          size: "sm",
          external: true,
        },
      },
      {
        id: "uiux-project",
        category: "UI/UX",
        title: "UI/UX Design Project",
        description:
          "End-to-end product design: research, wireframes, design tokens, and a clickable prototype.",
        imageSrc: "/images/project-uiux.png",
        imageAlt: "Screenshot of the UI/UX design project",
        techStack: ["Figma", "Design Tokens", "Prototyping"],
        tags: ["uiux"],
        demo: {
          id: "uiux-demo",
          label: "View Prototype",
          href: "#demo-uiux",
          variant: "primary",
          iconSrc: "/icons/project-demo-arrow.svg",
          size: "sm",
          external: true,
        },
        source: {
          id: "uiux-source",
          label: "Case Study",
          href: "#source-uiux",
          variant: "secondary",
          iconSrc: "/icons/project-code-arrow.svg",
          size: "sm",
          external: true,
        },
      },
    ],
  },

  contact: {
    badge: "Let's Build Something",
    title: "Let's Work Together.",
    descriptionLines: [
      "Got a product idea, a system that needs untangling, or just",
      "want to talk AI agents and fullstack architecture? My inbox",
      "is always open.",
    ],
    emailLabel: "Email",
    emailValue: "justpey2win@gmail.com",
    emailHref: "mailto:justpey2win@gmail.com",
    emailIconSrc: "/icons/contact-mail.svg",
    socials: [
      {
        id: "linkedin",
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/harish-wijaya/",
        iconSrc: "/icons/social-linkedin.svg",
        external: true,
      },
      {
        id: "twitter",
        label: "Twitter / X",
        href: "https://x.com/ColdColePalmer_",
        iconSrc: "/icons/social-twitter.svg",
        external: true,
      },
    ],
    form: {
      title: "Send a Message",
      fields: [
        {
          id: "name",
          label: "Full Name",
          placeholder: "e.g. Jane Doe",
          type: "text",
          autoComplete: "name",
        },
        {
          id: "email",
          label: "Email Address",
          placeholder: "you@company.com",
          type: "email",
          autoComplete: "email",
        },
        {
          id: "message",
          label: "Message / Project Brief",
          placeholder:
            "Tell me the goal, the scope, and your rough timeline...",
          type: "textarea",
        },
      ],
      submitLabel: "Send Message",
      submitIconSrc: "/icons/contact-send.svg",
      successMessage: "Your message is ready to send. Thanks for reaching out!",
    },
  },

  footer: {
    brand: "Harish Wijaya",
    note: "AI Native Engineer (Fullstack) based in Yogyakarta.",
    copyright: "© 2026 Harish Wijaya. All rights reserved.",
    links: [
      { id: "footer-about", label: "About", href: "#tentang" },
      { id: "footer-skills", label: "Skills", href: "#keahlian" },
      {
        id: "footer-projects",
        label: "Projects",
        href: "#proyek",
        isActive: true,
      },
      { id: "footer-contact", label: "Contact", href: "#kontak" },
      {
        id: "footer-email",
        label: "justpey2win@gmail.com",
        href: "mailto:justpey2win@gmail.com",
      },
    ],
  },
};

/**
 * Returns the portfolio landing page payload.
 *
 * Swap the body for an `await fetch(...)` against the Backend CMS; the return
 * type is already `Promise`-compatible at the hook boundary.
 */
export function getPortfolioPage(): IPortfolioPage {
  return portfolioPage;
}