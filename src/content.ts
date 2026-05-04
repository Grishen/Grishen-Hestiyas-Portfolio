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
  /** Short labels shown on the home page skills strip — keep scannable; detail lives on /skills. */
  skills: [
    'TypeScript & JavaScript',
    'React & modern web',
    'APIs & services',
    'Testing & quality',
    'Performance & architecture',
    'Databases & data modeling',
  ],
  /**
   * Full skills page at /skills — grouped categories and chip lists; edit anytime.
   */
  skillsPage: {
    pageTitle: 'Skills & tooling',
    lead:
      'How I categorize my stack: things I ship with often, then adjacent tools and practices from product work — including AI-enabled systems and tenant-safe backends.',
    categories: [
      {
        title: 'Languages & runtimes',
        blurb: 'Comfortable shipping and reviewing production code.',
        items: ['TypeScript', 'JavaScript (ES modules)', 'Python 3'],
      },
      {
        title: 'Web & UX',
        blurb: 'Interfaces that stay maintainable as the product grows.',
        items: ['React', 'Vite', 'Tailwind CSS', 'Responsive & accessible markup', 'Client-side routing & state patterns'],
      },
      {
        title: 'Backend, APIs & data',
        blurb: 'Services, persistence, and clear contracts.',
        items: ['FastAPI', 'REST APIs & JSON', 'PostgreSQL', 'Alembic / schema migrations', 'Multi-tenant data modeling', 'Auth patterns & guarded endpoints'],
      },
      {
        title: 'AI / ML in products',
        blurb: 'LLMs as part of the system, not a black box on the side.',
        items: ['LLM integration & provider boundaries', 'Prompting & structured outputs', 'Transcript / ticket summarization patterns', 'Testing and guarding model-facing code'],
      },
      {
        title: 'Quality & delivery',
        blurb: 'How code stays understandable for the team.',
        items: ['Unit & integration tests', 'CI/CD pipelines', 'Code review habits', 'Observability basics (logging, errors)', 'Documentation for the next engineer'],
      },
      {
        title: 'Architecture & platform',
        blurb: 'End-to-end thinking from schema to deployment.',
        items: ['Monorepo-friendly structure', 'Service boundaries', 'Performance awareness', 'Docker basics', 'Git workflows'],
      },
    ],
  },
  /**
   * Home: “Selected work” cards (description truncated). /projects: full-width showcases with optional image + extended.
   */
  projects: [
    {
      title: 'FRIDAY (Personal OS)',
      description:
        'Full-stack “personal OS” on FastAPI and Postgres: streaming LLMs (WebSockets and SSE), multi-tenant auth, governed local automation with workspace allow-lists (not raw shell), RAG over chunks with pgvector, proactive workflows, plus voice—Porcupine wake word, Whisper-style STT, WebRTC to OpenAI’s Realtime API—Redis/Celery, and OTEL. An ambitious prototype slice that still reads like a real platform: clear tenancy, contracts, and observability rather than a chat demo.',
      tags: ['Next.js', 'FastAPI', 'PostgreSQL', 'Voice / realtime', 'LLM & RAG', 'Multi-tenant'],
      href: null as string | null,
      extended: [
        'FRIDAY is an end-to-end multi-tenant “personal OS” assistant stack I architected across a TypeScript (Next.js) client and Python (FastAPI) API backed by PostgreSQL, Redis, and Celery, with structured auth/session boundaries suitable for SaaS-style tenancy. At the conversational layer it combines classical intent/planner/orchestration with streaming LLM responses (WebSockets plus SSE for REST), optional OpenAI-compatible providers, governed sandboxed host automation (local tooling with workspace + allow-lists rather than unrestricted shell access), approvals/workflows, RAG over embedded document chunks (pgvector), and proactive notifications—so the assistant isn’t just chat, it’s wired into memory, tools, and policy.',
        'For voice I integrated server-side speech handling (Whisper-style transcribe + WebSocket audio paths), Picovoice Porcupine for true wake-word, and bidirectional realtime speech via WebRTC bridged to OpenAI’s Realtime API (/realtime/calls), while keeping orchestration-grade features clearly separated until tool-calling can be mediated server-side—showing restraint on scope and explicit tradeoffs.',
        'Observability (OpenTelemetry/OTLP toward collectors), hygiene around coverage, linting, and API contracts (OpenAPI), and pragmatic documentation round out something that reads less like “a demo toy” and more like a credibly structured platform slice employers can map to backend, infra, realtime, ML ops, and product engineering. Positioning: a prototype / platform slice—not every path is production-hardened, but scope and tradeoffs are intentional and documented.',
        'Case-study lens — tenancy & policy: SaaS-shaped boundaries for sessions and data; host automation behind allow-lists and approvals rather than opaque shell access.',
        'Case-study lens — voice & realtime: wake word → streaming STT → orchestration → TTS / Realtime bridging, with a deliberate split until server-mediated tool calls are safe at orchestration scale.',
        'Case-study lens — quality: OpenAPI-first API surface, tests and linting as guardrails, and OTEL traces/metrics aimed at collectors so the stack is debuggable as complexity grows.',
      ],
    },
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
