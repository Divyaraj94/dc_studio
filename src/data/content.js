export const PROFILE = {
  name: 'DC',
  title: 'Software Engineer & Open Source Builder',
  bio: `I build software people actually use — then open source it so everyone else can too. I care about developer experience, clean APIs, and shipping things that solve real problems.`,
  github: 'https://github.com',
  email: 'dc@example.com',
};

export const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Writing', href: '#writing' },
];

export const ABOUT_PARAGRAPHS = [
  `I got into programming because I wanted to build things — not because I wanted a job title. That hasn't changed. I'm driven by the itch to take something from "this should exist" to "here, use this."`,
  `My day-to-day lives somewhere between full-stack engineering and product thinking. I'm comfortable going deep on <a href="https://react.dev" target="_blank" rel="noreferrer">React</a> component architecture or stepping back to question whether the feature should exist at all. I've worked across <a href="https://nodejs.org" target="_blank" rel="noreferrer">Node.js</a>, <a href="https://python.org" target="_blank" rel="noreferrer">Python</a>, cloud infrastructure, and ML pipelines — whatever the problem asks for.`,
  `Outside of work, I contribute to open source projects, write about what I'm learning, and occasionally go down rabbit holes that turn into side projects. I believe good tools should be accessible to everyone, which is why most of what I build ends up on GitHub.`,
];

export const EXPERIENCE = [
  {
    period: 'Present',
    title: 'Independent Builder & OSS Contributor',
    company: 'Self-Employed',
    url: 'https://github.com',
    description:
      'Building and shipping open source developer tools. Designing, coding, and maintaining projects used by developers across the ecosystem. Working in public, iterating fast, and contributing upstream.',
    tech: ['React', 'Node.js', 'TypeScript', 'Python', 'Docker'],
  },
  {
    period: '2022 — 2024',
    title: 'Full-Stack Engineer',
    company: 'Your Company Here',
    url: '#',
    description:
      'Built and maintained internal platforms serving thousands of daily active users. Led API redesign that reduced average response time by 40%. Mentored junior engineers and contributed to architecture decisions.',
    tech: ['Next.js', 'PostgreSQL', 'AWS', 'TypeScript', 'Redis'],
  },
  {
    period: '2020 — 2022',
    title: 'Software Engineer',
    company: 'Your Company Here',
    url: '#',
    description:
      'Shipped customer-facing features across web and mobile. Introduced automated testing practices that reduced production incidents by 60%. Started contributing to open source on weekends.',
    tech: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'CI/CD'],
  },
];

export const PROJECTS = [
  {
    title: 'Project Alpha',
    description:
      'A CLI tool that automates environment setup for development teams. Reduces onboarding time from hours to minutes. Used by 200+ developers.',
    tech: ['Node.js', 'TypeScript', 'CLI'],
    github: 'https://github.com',
    live: null,
    featured: true,
  },
  {
    title: 'AI Toolkit',
    description:
      'Open source collection of utilities for common ML workflows — data preprocessing, model evaluation, and experiment tracking. Designed for indie hackers who need to move fast.',
    tech: ['Python', 'FastAPI', 'ML'],
    github: 'https://github.com',
    live: null,
    featured: true,
  },
  {
    title: 'DevFlow',
    description:
      'An open platform for developers to manage workflow, track tasks, and share progress. Built as a self-hosted alternative to proprietary project management tools.',
    tech: ['Next.js', 'PostgreSQL', 'WebSockets'],
    github: 'https://github.com',
    live: '#',
    featured: true,
  },
  {
    title: 'Config Sync',
    description:
      'Lightweight tool to sync dotfiles and dev configs across machines. Git-based, zero dependencies, works anywhere.',
    tech: ['Bash', 'Git', 'Shell'],
    github: 'https://github.com',
    live: null,
    featured: false,
  },
];

export const WRITING = [
  {
    title: 'Why I Open Source Everything I Build',
    date: 'August 2026',
    url: '#',
  },
  {
    title: 'From Idea to Shipped in 7 Days',
    date: 'July 2026',
    url: '#',
  },
  {
    title: 'Building AI Tools That Actually Help Developers',
    date: 'June 2026',
    url: '#',
  },
  {
    title: 'The Case for Boring Technology in Side Projects',
    date: 'May 2026',
    url: '#',
  },
  {
    title: 'What I Learned from 1,000 Commits in a Year',
    date: 'March 2026',
    url: '#',
  },
];
