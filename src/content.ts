/**
 * Update this file to personalize the portfolio.
 */
/** One project: home page shows `description` (truncated); /projects can show `extended` and `imageUrl`. */
export type ProjectEntry = {
  title: string
  description: string
  tags: readonly string[]
  href: string | null
  /** Path under public/, e.g. images/projects/thing.png (no "public/" prefix). */
  imageUrl?: string
  imageAlt?: string
  /** Extra paragraphs shown only on the full projects page. */
  extended?: readonly string[]
}

export const site = {
  name: 'Grishen Hestiyas',
  role: 'AI Software Engineer',
  tagline: 'I design and build reliable, maintainable software — from idea to production.',
  education: 'B.S. in Computer Science',
  email: 'grishenh@gmail.com',
  social: {
    github: 'https://github.com/',
    linkedin: 'https://www.linkedin.com/in/grishenh',
  },
  /**
   * Long-form “about me” at /about. Put the file in public/ (e.g. public/images/Headshot.jpg)
   * and set imageUrl to the URL path *without* a "public/" prefix (see Vite public dir docs).
   */
  aboutMe: {
    pageTitle: 'More about me',
    imageUrl: 'public/images/Headshot.jpg',
    imageAlt: 'Grishen Hestiyas',
    paragraphs: [
      "I'm an AI software engineer with a computer science background. I like problems that sit at the intersection of good UX, solid systems, and models that actually help people — not demos that fall apart in production.",
      'I work best in teams that value clear ownership, direct feedback, and room to improve things incrementally. I care about code review, tests where they matter, and documentation that the next person can use.',
      'When I am not building, I recharge with learning, side experiments, and staying curious about how the field is moving — and how to apply it responsibly.',
    ],
    highlights: [
      { title: 'What I am looking for', text: 'Roles where I can own meaningful slices of the stack and collaborate closely with product and design.' },
      { title: 'How I work', text: 'I communicate early, time-box exploration, and prefer shipping a small right thing over a large vague one.' },
    ],
  },
  skills: [
    'TypeScript & JavaScript',
    'React & modern web',
    'APIs & services',
    'Testing & quality',
    'Performance & architecture',
    'Databases & data modeling',
  ],
  /**
   * Home: “Selected work” cards (description truncated). /projects: full-width showcases with optional image + extended.
   */
  projects: [
    {
      title: 'Converse IQ',
      description:
        'A multi-tenant helpdesk platform where customer chats automatically become support tickets with full transcripts and AI-driven summaries, field extraction, and routing signals. The stack pairs a FastAPI and PostgreSQL backend (Alembic migrations, tenant-isolated data) with a Vite + React admin and agent UI for managing companies, teams, SLAs, and configuration. I use it to show end-to-end product thinking: real-time support workflows, responsible multi-tenancy, and an LLM layer behind clear interfaces and tests rather than ad hoc API calls.',
      tags: ['TypeScript', 'API', 'UX'],
      href: null as string | null,
      extended: [
        'On this page you can go deeper: architecture, tradeoffs, and what you would ship next. Add a hero image with imageUrl (file under public/images/projects/) to sit next to the text.',
      ],
    },
    {
      title: 'Product or platform work',
      description:
        'A concise summary of scope and impact. Metrics (latency, users, error rate) read very well here.',
      tags: ['System design', 'DevOps', 'CI/CD'],
      href: null,
      extended: ['Optional extra paragraph for the all-projects view only.'],
    },
    {
      title: 'Open source or experiment',
      description:
        'Side projects, libraries, or research — anything that shows how you think and build.',
      tags: ['Open source', 'Tooling'],
      href: null,
    },
  ] satisfies ReadonlyArray<ProjectEntry>,
  /** Copy for the dedicated /projects page */
  projectsPage: {
    title: 'All projects',
    lead:
      'Each project below is one item in content.ts — add optional images, more copy in extended, and public links when you are ready.',
  },
  /**
   * /resume — add your PDF under public/ (e.g. public/resume/Grishen-Hestiyas-Resume.pdf)
   * and set pdfPath to the URL path without a leading "public/" segment.
   */
  resume: {
    pageTitle: 'Resume',
    pdfPath: 'resume/Grishen_Hestiyas_Resume_Original_AIEngineer.pdf',
    downloadFileName: 'Grishen_Hestiyas_Resume_Original_AIEngineer.pdf',
    blurb:
      'Below, the résumé text is read from your PDF and styled to match this site. Use Download PDF for the original file for job applications.',
  },
} as const
