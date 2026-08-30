import { SkillCard } from './SkillCard';

export const SkillsSection = () => {
  const impactStats = [
    { value: '4+', label: 'Years product design' },
    { value: '12+', label: 'Enterprise projects led' },
    { value: '3x', label: 'Faster dev via AI' },
    { value: '92%', label: 'Usability test score' },
  ];

  const skillCategories = [
    {
      number: '01',
      category: 'UX Design',
      description: 'Where the work starts - research and systems thinking, and audits that catch what screens alone hide.',
      skills: [
        'OOUX / ORCA',
        'User Research',
        'Wireframing',
        'Prototyping',
        'Design Systems',
        'UX Audits',
        'Journey Mapping',
        'Usability Testing',
        'Accessibility',
        'Stakeholder Mgmt',
      ],
    },
    {
      number: '02',
      category: 'AI & Vibe Coding',
      description: 'Turning design decisions into shipped code without waiting two sprints on a dev queue.',
      skills: ['Cursor', 'Claude', 'Lovable', 'Bolt', 'v0', 'Figma AI Agents', 'Figma Make', 'Design Automation'],
    },
    {
      number: '03',
      category: 'Design Systems',
      description: 'A published NPM component library adopted internally at IndiGo and across every vendor surface.',
      skills: ['NPM Component Library', 'Design Tokens', 'Token Architecture', 'Multi-product Adoption'],
    },
    {
      number: '04',
      category: 'Collaboration',
      description: 'Keeping engineering, product and business aligned on why a decision was made, not just what shipped.',
      skills: ['JIRA', 'Confluence', 'Notion', 'Trello'],
    },
  ];

  const achievements = [
    'Built and published the IndiGo NPM Design System - adopted internally and across all IndiGo vendor products',
    "Architected B2B Access's complete object model with OOUX/ORCA - 6 core objects and a full relation matrix before a single screen was drawn",
    'Ran a 3-Level UX Audit (Surface, Behavioural, Structural) using the Four Horsemen of OOUX as diagnostic lenses',
    'Drove design and development automation with Cursor, Claude, Lovable and Bolt - cutting QA cycles and front-end effort',
  ];

  return (
    <section id="skills" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-10 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              04
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Skills <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>

          <h2
            className="tracking-tight font-semibold text-black max-w-4xl"
            style={{
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.05',
              fontSize: 'clamp(42px, 6vw, 76px)',
            }}
          >
            Skills & Expertise
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            4+ years of enterprise UX - systems thinking, AI-native execution, and the tools that make it ship.
          </p>
        </div>

        {/* Impact stat strip */}
        <div className="mb-14 grid grid-cols-2 sm:grid-cols-4 rounded-2xl border border-black/10 divide-x divide-y sm:divide-y-0 divide-black/10 overflow-hidden bg-white/40 backdrop-blur-sm">
          {impactStats.map((stat) => (
            <div key={stat.label} className="p-6 sm:p-7">
              <div
                className="text-[32px] sm:text-[38px] font-semibold tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-[11px] font-mono uppercase tracking-wide text-black/45">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.category}
              number={category.number}
              category={category.category}
              description={category.description}
              skills={category.skills}
              index={index}
            />
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-black/10">
          <h3
            className="text-[24px] sm:text-[28px] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Notable Achievements
          </h3>
          <div className="space-y-4 text-[16px] sm:text-[18px] text-black/80">
            {achievements.map((achievement) => (
              <div key={achievement} className="flex gap-3">
                <span className="text-black/40 select-none">✳︎</span>
                <p>{achievement}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
