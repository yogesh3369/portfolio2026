export interface Project {
  id: string;
  slug: string;
  title: string;
  role: string;
  timeline: string;
  description: string;
  tags: string[];
  image?: string;
  overview?: string;
  problem?: string;
  methodology?: string;
  process?: string;
  solution?: string;
  learnings?: string;
}

export const projects: Project[] = [
  {
    id: '1',
    slug: 'brand-gift-voucher',
    title: 'Brand Gift Voucher',
    role: 'Product Designer',
    timeline: 'IndiGo',
    description: 'Inherited an incomplete greenfield feature at IndiGo, applied OOUX/ORCA methodology to surface structural object relationship issues invisible at the screen level.',
    tags: ['OOUX/ORCA', 'Systems Design', 'Greenfield', 'IndiGo'],
    image: 'https://picsum.photos/seed/indigo-voucher-system/800/600',
    overview: 'A greenfield feature development project at IndiGo where I inherited an incomplete brand gift voucher system and restructured it using OOUX/ORCA methodology.',
    problem: 'The initial design had structural object relationship issues that were invisible at the screen level, leading to potential scalability and maintenance challenges.',
    methodology: 'Applied OOUX (Object-Oriented UX) and ORCA (Objects, Relationships, CTAs, Attributes) methodology to map out the entire system architecture before diving into interface design.',
    process: 'Detailed case study content to be added.',
    solution: 'Detailed case study content to be added.',
    learnings: 'Detailed case study content to be added.',
  },
  {
    id: '2',
    slug: 'prism-design-system',
    title: 'Prism Design System',
    role: 'Lead Designer (Phase 1) to Solo Engineer (Phase 2)',
    timeline: '1 month (team) + 1.5 weeks (solo)',
    description: 'Led a 6-designer team to build Prism design system when 34% of dev time was wasted rebuilding components, then solo-engineered its npm package using AI tools despite zero coding background.',
    tags: ['Design Systems', 'React', 'WCAG 2.1 AA', 'AI-Assisted Development', 'npm'],
    image: 'https://picsum.photos/seed/prism-components-library/800/600',
    overview: 'Two-phase design system solving fragmented UI ecosystem. Phase 1 (1 month, 6 designers): Figma library and React components with WCAG 2.1 AA. Phase 2 (1.5 weeks, solo): npm package via Claude Code, Cursor, Figma MCP. Result: 37 components, 47% faster rebuild time, 60% faster handoff.',
    problem: 'Post-launch audit revealed crisis: 34% dev capacity wasted rebuilding components, 6 designers with separate Figma files, 12+ inconsistent UI patterns, 3-5x slower handoff than industry standard. Customer complaints up 23% in 6 months. Root cause: no single source of truth.',
    methodology: 'Discovery-driven with stakeholder buy-in: (1) Audited 3 products, interviewed 6 designers, 4 Sr. Designers, 3 PMs, leadership. (2) Presented data on 34% waste to secure approval. (3) Accessibility experts defined WCAG 2.1 AA baseline upfront. (4) Figma MCP eliminated design-dev gap. (5) AI tools as engineering partners when no bandwidth available.',
    process: 'Phase 1 (1 month, 6 designers): Week 1 - Discovery, stakeholder buy-in, accessibility consultation. Week 2-3 - Figma library, React components, overcame dev skepticism via Figma MCP demos. Week 4 - Storybook with a11y addon. Phase 2 (1.5 weeks, solo): Leadership experiment - can designer ship code with AI? Used Claude Code for architecture/ARIA, Cursor for SCSS. Challenge: no code reviewers, every API decision permanent. Published to GitHub npm.',
    solution: 'Four deliverables: (1) Unified Figma library replacing 6 files, (2) 37 WCAG 2.1 AA React components with 198 variants, (3) npm package for one-command install, (4) Storybook docs. Impact: 47% faster rebuild (18-22h to 9-12h/sprint), 60% faster handoff (3-5 days to 1-2 days), 12+ patterns to 1 system, 100% WCAG AA built-in.',
    learnings: 'Key insights: (1) Leadership empathy unlocked buy-in - they sought solution too. Quantified data (34% waste) secured approval. (2) Dev skepticism valid - proved Figma MCP via live demos. (3) Accessibility upfront prevented retrofitting. (4) AI tools enabled non-technical designer to ship production code in 1.5 weeks. (5) No code reviewers made API decisions critical. (6) Surprising finding: leadership actively sought design-dev sync solution. Prism became that solution.',
  },
  {
    id: '3',
    slug: 'cops-indigo-catering',
    title: 'Cops Indigo (Catering)',
    role: 'Product Designer',
    timeline: 'IndiGo',
    description: 'Detailed description to be added.',
    tags: ['Product Design', 'IndiGo', 'Catering'],
    image: 'https://picsum.photos/seed/indigo-catering-ops/800/600',
    overview: 'Detailed case study content to be added.',
    problem: 'Detailed case study content to be added.',
    methodology: 'Detailed case study content to be added.',
    process: 'Detailed case study content to be added.',
    solution: 'Detailed case study content to be added.',
    learnings: 'Detailed case study content to be added.',
  },
];
