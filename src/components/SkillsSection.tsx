import { SkillCard } from './SkillCard';

export const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Design Tools',
      skills: ['Figma', 'Prototyping', 'Design Systems'],
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <rect x="12" y="12" width="40" height="40" stroke="currentColor" strokeWidth="2.5" rx="4" />
          <path d="M12 28 L52 28 M28 12 L28 52" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="32" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      category: 'Methodology',
      skills: ['OOUX/ORCA', 'User Research', 'Systems Thinking'],
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="20" r="8" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="20" cy="44" r="8" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="44" cy="44" r="8" stroke="currentColor" strokeWidth="2.5" />
          <path d="M28 26 L24 38 M36 26 L40 38" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      category: 'Development',
      skills: ['React (via AI toolchain)', 'Storybook', 'Component Libraries'],
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <path d="M16 20 L16 44 L32 52 L48 44 L48 20 L32 12 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M16 20 L32 28 L48 20 M32 28 L32 52" stroke="currentColor" strokeWidth="2.5" />
        </svg>
      ),
    },
    {
      category: 'Accessibility',
      skills: ['WCAG 2.1 AA', 'Inclusive Design', 'Semantic HTML'],
      icon: (
        <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
          <circle cx="32" cy="32" r="20" stroke="currentColor" strokeWidth="2.5" />
          <circle cx="32" cy="24" r="4" fill="currentColor" />
          <path d="M24 36 C24 36 28 44 32 44 C36 44 40 36 40 36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="skills" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
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
            A hybrid skillset bridging design methodology and technical implementation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.category}
              category={category.category}
              skills={category.skills}
              icon={category.icon}
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
            <div className="flex gap-3">
              <span className="text-black/40 select-none">✳︎</span>
              <p>Built and published npm package on GitHub with no formal engineering background</p>
            </div>
            <div className="flex gap-3">
              <span className="text-black/40 select-none">✳︎</span>
              <p>Applied OOUX/ORCA methodology to surface invisible structural issues in greenfield features</p>
            </div>
            <div className="flex gap-3">
              <span className="text-black/40 select-none">✳︎</span>
              <p>Solo-architected React component library with Storybook documentation</p>
            </div>
            <div className="flex gap-3">
              <span className="text-black/40 select-none">✳︎</span>
              <p>WCAG 2.1 AA accessibility compliance in design system work</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
