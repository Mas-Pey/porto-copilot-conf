/**
 * Database seed for the Config1 MVP.
 *
 * Content mirrors `portfolio/services/portfolioService.ts` so the Next.js app
 * and the API show the same data once the frontend switches to the CMS.
 *
 * Run with: `npm run db:seed` (or `npx prisma db seed`).
 * The script is idempotent: re-running resets Profile/Skill/Project rows
 * instead of accumulating duplicates.
 */
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

import { PrismaClient } from '../src/generated/prisma/client.js';
import { resolveDatabaseUrlFromEnv } from '../src/services/databaseUrl.js';

const adapter = new PrismaBetterSqlite3({ url: resolveDatabaseUrlFromEnv() });
const prisma = new PrismaClient({ adapter });

interface SeedStat {
  readonly value: string;
  readonly label: string;
}

const profileSeed = {
  headline: 'AI Native Engineer (Fullstack)',
  bio: [
    "I'm riding the AI Native Engineer wave (Fullstack), but with actual intelligence baked in.",
    'Not just prompting though – we are talking Agent + Human-in-the-Loop systems that actually make sense.',
  ].join('\n\n'),
  location: 'Yogyakarta',
  status: 'Single',
  education: 'Informatics (UPNVYK)',
  stats: JSON.stringify([
    { value: '1+ YoE', label: 'Years of Experience' },
    { value: '<100 Projects', label: 'Shipped & Still Counting' },
    { value: '69%', label: 'Client Satisfaction' },
  ] satisfies readonly SeedStat[]),
} as const;

const skillsSeed = [
  {
    name: 'TensorFlow Certified',
    badgeUrl: '/icons/skill-frontend.svg',
    category: 'AI Engineering',
  },
  {
    name: 'n8n',
    badgeUrl: '/icons/skill-devops.svg',
    category: 'Agents & Automation',
  },
  {
    name: 'RAG & ReAct',
    badgeUrl: '/icons/skill-backend.svg',
    category: 'AI Engineering',
  },
  {
    name: 'AI Agents',
    badgeUrl: '/icons/skill-frontend.svg',
    category: 'AI Engineering',
  },
  {
    name: 'MCP (Model Context Protocol)',
    badgeUrl: '/icons/skill-uiux.svg',
    category: 'Agents & Automation',
  },
] as const;

const projectsSeed = [
  {
    title: 'Bioskop Web',
    description:
      'Movie ticket booking on the web: seat selection, schedules, and checkout in one flow.',
    category: 'Fullstack',
    imageUrl: '/images/project-bioskopweb.png',
    techStack: 'Next.js,TypeScript,Tailwind CSS,PostgreSQL',
  },
  {
    title: 'Bioskop Mobile',
    description:
      'The same booking flow, rebuilt mobile-first with offline-friendly state.',
    category: 'Fullstack',
    imageUrl: '/images/project-bioskopmobile.png',
    techStack: 'React Native,TypeScript,Node.js,REST API',
  },
  {
    title: 'UI/UX Design Project',
    description:
      'End-to-end product design: research, wireframes, design tokens, and a clickable prototype.',
    category: 'UI/UX',
    imageUrl: '/images/project-uiux.png',
    techStack: 'Figma,Design Tokens,Prototyping',
  },
] as const;

async function main(): Promise<void> {
  // Reset so the seed stays idempotent across repeated runs.
  await prisma.message.deleteMany();
  await prisma.project.deleteMany();
  await prisma.skill.deleteMany();
  await prisma.profile.deleteMany();

  const profile = await prisma.profile.create({ data: profileSeed });
  await prisma.skill.createMany({ data: [...skillsSeed] });
  await prisma.project.createMany({ data: [...projectsSeed] });

  const [skillCount, projectCount] = await Promise.all([
    prisma.skill.count(),
    prisma.project.count(),
  ]);

  console.log(
    `Seeded profile #${profile.id}, ${skillCount} skills, ${projectCount} projects.`,
  );
}

main()
  .catch((error: unknown) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });