/**
 * Update this file to personalize the portfolio.
 */
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
   * Long-form “about me” page at /about. Add your headshot as public/images/profile.jpg
   * (or change imageUrl). Recommended: square or 4:5, ~800px+, compressed JPG/WebP.
   */
  aboutMe: {
    pageTitle: 'More about me',
    imageUrl: '/images/profile.jpg',
    imageAlt: 'Grishen Hestiyas',
    lead:
      "Here's a fuller picture of who I am beyond the one-line bio — my path, what I care about, and what I'm looking for next.",
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
  projects: [
    {
      title: 'Featured project one',
      description:
        'Describe a project you are proud of: the problem, your role, and the outcome. Link to a repo or demo when ready.',
      tags: ['TypeScript', 'API', 'UX'],
      href: null as string | null,
    },
    {
      title: 'Product or platform work',
      description:
        'A concise summary of scope and impact. Metrics (latency, users, error rate) read very well here.',
      tags: ['System design', 'DevOps', 'CI/CD'],
      href: null,
    },
    {
      title: 'Open source or experiment',
      description:
        'Side projects, libraries, or research — anything that shows how you think and build.',
      tags: ['Open source', 'Tooling'],
      href: null,
    },
  ],
  /** Copy for the dedicated /projects page */
  projectsPage: {
    title: 'All projects',
    lead: 'Each card comes from the projects list in this file — add links, expand descriptions, and ship.',
  },
} as const

export type ProjectEntry = (typeof site.projects)[number]
