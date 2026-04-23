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
    linkedin: 'www.linkedin.com/in/grishenh',
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
} as const
