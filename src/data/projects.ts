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
    role: 'Design System Architect',
    timeline: 'Two-phase project',
    description: 'Built Figma design system and created solo React component library, then solo-architected and published an npm package on GitHub — notable because I have no formal engineering background.',
    tags: ['Design Systems', 'React', 'Figma', 'Storybook', 'npm'],
    image: 'https://picsum.photos/seed/prism-components-library/800/600',
    overview: 'A comprehensive design system project executed in two phases: collaborative Figma system build followed by solo React component library development and npm package publication.',
    problem: 'Need for a scalable, maintainable design system that bridges design and development, despite having no formal engineering background.',
    methodology: 'Component-driven design approach with systematic documentation, accessibility-first thinking, and AI-assisted development workflow.',
    process: 'Detailed case study content to be added.',
    solution: 'Detailed case study content to be added.',
    learnings: 'Detailed case study content to be added.',
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
