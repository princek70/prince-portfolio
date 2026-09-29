/**
 * Single source of truth for every piece of content on the site.
 *
 * All personal, professional and project information below comes from
 * Prince_Kanswal_Resume-3.pdf and the linked GitHub repositories. Nothing here
 * is invented — if a fact is not in the resume, it is not on the site.
 *
 * Edit this file to update the site; the components read from it.
 */
import type { IconName } from "@/components/icons/icon-data";

/** Canonical site URL. Set NEXT_PUBLIC_SITE_URL to a custom domain later. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://princekanswal.vercel.app"
).replace(/\/$/, "");

/**
 * LeetCode profile — surfaced in the contact section and the footer via
 * `socialLinks` below.
 */
export const LEETCODE_URL: string | null = "https://leetcode.com/u/Princek70/";

export const profile = {
  name: "Prince Kanswal",
  initials: "PK",
  role: "Software Developer · B.Tech CSE (AI)",
  /** Fixed by the brief — the only tagline on the page. */
  tagline: "I build practical software powered by AI.",
  intro:
    "I'm a B.Tech Computer Science (AI) student at G.L Bajaj Institute of Technology and Management. I work across the stack — Java and Python on one side, React, Next.js and PostgreSQL on the other — and build AI features with tools like Gemini and Google's Agent Development Kit.",
  location: "Greater Noida, India",
  email: "princekanswal70@gmail.com",
} as const;

/**
 * Optional full-page wallpaper behind everything.
 *
 * `null` gives the plain gradient wash (the default look). To use an image:
 *
 *   1. Drop the file in /public — e.g. /public/wallpaper.jpg
 *   2. Set this to { src: "/wallpaper.jpg", opacity: 0.35 }
 *
 * A dimming tint is applied over whatever you set, so a bright image will not
 * wash out the text in front of it. /public/wallpaper-placeholder.svg is there
 * to preview the slot before you have a file of your own.
 */
export const wallpaper: { src: string; opacity: number } | null = null;

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
] as const;

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/princek70", icon: "github" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/prince-kanswal",
    icon: "linkedin",
  },
  ...(LEETCODE_URL
    ? ([{ label: "LeetCode", href: LEETCODE_URL, icon: "leetcode" }] as const)
    : []),
  { label: "Email", href: `mailto:${profile.email}`, icon: "mail" },
];

export const about = {
  paragraphs: [
    "I'm a B.Tech Computer Science (AI) student at G.L Bajaj Institute of Technology and Management in Greater Noida. My work sits in two places: full-stack web development, and applied AI — adding intelligence to an application where it genuinely helps rather than for its own sake.",
    "Java and Python are my primary languages, backed by data structures and algorithms — I've solved 300+ problems on LeetCode and compete on CodeChef and Codeforces. On the web side I build with React, Next.js, Node.js and PostgreSQL, and I've shipped AI features using Gemini, OpenAI and Google's Agent Development Kit. I also hold a strong interest in cybersecurity, which is where most of my certifications come from.",
  ],
  stats: [
    { value: "300+", label: "LeetCode problems solved" },
    { value: "12+", label: "AI & cybersecurity certifications" },
    { value: "8.3/10", label: "Current B.Tech GPA" },
  ],
} as const;

export type SkillGroup = {
  title: string;
  items: { name: string; icon: IconName }[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "Java", icon: "java" },
      { name: "Python", icon: "python" },
      { name: "C", icon: "c" },
    ],
  },
  {
    title: "Core CS & Security",
    items: [
      { name: "Data Structures & Algorithms", icon: "dsa" },
      { name: "OOPs", icon: "oop" },
      { name: "Cybersecurity Fundamentals", icon: "security" },
    ],
  },
  {
    title: "Frontend",
    items: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    title: "Backend & Databases",
    items: [
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "PostgreSQL", icon: "postgresql" },
      { name: "Prisma", icon: "prisma" },
    ],
  },
  {
    title: "AI & GenAI",
    items: [
      { name: "Generative AI", icon: "genai" },
      { name: "Agentic AI", icon: "agentic" },
      { name: "Google ADK", icon: "googleadk" },
      { name: "Gemini", icon: "gemini" },
      { name: "OpenAI", icon: "openai" },
      { name: "Anthropic", icon: "anthropic" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git", icon: "git" },
      { name: "Vercel", icon: "vercel" },
      { name: "Render", icon: "render" },
      { name: "Neon", icon: "neon" },
      { name: "Netlify", icon: "netlify" },
      { name: "Antigravity IDE", icon: "antigravity" },
    ],
  },
];

/** Listed on the resume under "Soft Skills". */
export const softSkills = ["Communication", "Problem-Solving", "Teamwork"];

export type Project = {
  name: string;
  subtitle: string;
  period: string;
  description: string;
  /** 2–4 most important technologies, taken from the resume. */
  stack: string[];
  github: string;
  /** Omitted when no live deployment exists — no fake buttons. */
  live?: string;
  /** Key resolved by components/Icon.tsx, used for the card visual. */
  icon: IconName;
  /**
   * Drop a real screenshot path here (e.g. "/projects/delizioso.png") and the
   * decorative panel is replaced by the image automatically.
   */
  image?: string;
};

export const projects: Project[] = [
  {
    name: "Delizioso",
    subtitle: "Full-Stack Fine Dining Website",
    period: "Aug 2025",
    description:
      "A responsive restaurant website with a secure admin panel and full CRUD over its content. PostgreSQL, Cloudinary and TanStack Query handle the data and image pipeline, with type-safe forms validated by Zod and a Tailwind CSS interface.",
    stack: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    github: "https://github.com/princek70/project-res",
    live: "https://project-res.onrender.com",
    icon: "react",
    image: "/projects/delizioso.jpg",
  },
  {
    name: "ArchitectAI",
    subtitle: "AI-Powered Resume Builder",
    period: "Feb 2026",
    description:
      "A full-stack AI resume builder with live preview, editable templates and PDF export. Gemini AI powers resume analysis, content generation and real-time writing assistance, while Prisma and PostgreSQL back drag-and-drop editing and auto-save.",
    stack: ["Next.js", "TypeScript", "Prisma", "Gemini AI"],
    github: "https://github.com/princek70/ArchitectAI",
    live: "https://architect-ai-sand.vercel.app/builder",
    icon: "nextjs",
    image: "/projects/architectai.jpg",
  },
  {
    name: "Ambient Expense Agent",
    subtitle: "AI-Powered Expense Auditing System",
    period: "Jun 2026",
    description:
      "An expense auditing system built on Google's Agent Development Kit with asynchronous workflow orchestration. It adds PII masking, prompt-injection detection and automated compliance checks through Gemini Pro, plus human-in-the-loop approval for high-risk expenses via FastAPI.",
    stack: ["Python", "Google ADK", "FastAPI", "Gemini Pro"],
    github: "https://github.com/princek70/ambient-expense-agent",
    // No public deployment for this project — the Live Demo button is omitted.
    icon: "agentic",
    image: "/projects/ambient-expense-agent.jpg",
  },
];

export const education = [
  {
    period: "2024 – 2028",
    qualification: "B.Tech, Computer Science (AI)",
    institution: "G.L Bajaj Institute of Technology and Management",
    detail: "GPA: 8.3 / 10.0",
  },
  {
    period: "2023 – 2024",
    qualification: "Intermediate",
    institution: "S.B.M Public School",
    detail: "Percentage: 85%",
  },
  {
    period: "2021 – 2022",
    qualification: "Matriculation",
    institution: "Omakrananda Saraswati Nilayam",
    detail: "Percentage: 95%",
  },
] as const;

/** Grouped under Education, as agreed — not a standalone section. */
export const certifications = [
  { name: "Google AI Essentials", issuer: "Coursera and Google" },
  { name: "5-Day AI Agent Intensive Course", issuer: "Kaggle and Google" },
  { name: "Agentic AI Certified Associate", issuer: "Oracle" },
  {
    name: "12+ Certifications in Cybersecurity",
    issuer: "Palo Alto, EC-Council, Oracle and RedHat",
  },
  { name: "Communications with Impact", issuer: "IBM SkillBuild" },
  { name: "AI Tools and Productivity Workshop", issuer: "be10X" },
] as const;

export const competitiveProgramming = [
  { platform: "LeetCode", rating: "1400+" },
  { platform: "CodeChef", rating: "1300+" },
  { platform: "Codeforces", rating: "900+" },
] as const;

export const sectionCopy = {
  about: {
    title: "About me",
    lead: "A short version of where I am and what I work on.",
  },
  skills: {
    title: "Skills",
    lead: "The languages, frameworks and platforms I actually build with.",
  },
  projects: {
    title: "Projects",
    lead: "Three things I've built end to end.",
  },
  education: {
    title: "Education",
    lead: "Where I studied, and the certifications alongside it.",
  },
  contact: {
    title: "Contact",
    lead: "Open to software engineering internships.",
  },
} as const;
