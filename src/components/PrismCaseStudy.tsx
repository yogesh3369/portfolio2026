import { Link } from 'react-router-dom';

export const PrismCaseStudy = () => {
  return (
    <div className="relative z-1 min-h-screen py-24 sm:py-32 px-5 sm:px-8 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[15px] mb-8 hover:opacity-60 transition-opacity"
        >
          <span>←</span>
          <span>Back to work</span>
        </Link>

        {/* Hero Section */}
        <div className="mb-20">
          {/* Context tags */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {['Design System', 'npm Package', '6-person team', '1.5 weeks solo', 'AI-assisted'].map((tag, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1 rounded-full bg-black/6 border border-black/10 text-[12px] text-black/55 uppercase tracking-wider">
                {tag}
              </span>
            ))}
          </div>

          <h1
            className="text-[52px] sm:text-[68px] md:text-[84px] mb-5 tracking-tight leading-[1.05]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            How a designer with{' '}
            <span className="text-black/35">zero coding experience</span>{' '}
            shipped Prism to npm
          </h1>

          <p className="text-[18px] sm:text-[21px] leading-[1.65] text-black/60 mb-10">
            Indigo had six designers each maintaining their own Figma file, and three products with no
            shared component library. Every sprint, teams rebuilt the same work from scratch —
            burning 34% of development capacity on redundant effort. I led Prism to fix that:
            from a post-launch audit to a published npm package, without a single engineer on my team.
          </p>

          {/* Outcomes + Figma proof */}
          <div className="lg:grid lg:grid-cols-[1fr_460px] lg:gap-6 lg:items-stretch">
            {/* Left: 2×2 outcome cards */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { number: '37', label: 'components', note: 'shipped to npm' },
                { number: '198', label: 'variants', note: 'across all states & themes' },
                { number: '47%', label: 'faster rebuilds', note: 'vs. pre-Prism baseline' },
                { number: '100%', label: 'WCAG 2.1 AA', note: 'built-in, not retrofitted' },
              ].map((metric, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] border border-[#ccc8c0] rounded-2xl p-5 hover:bg-[#e6e1da] transition-colors"
                >
                  <div className="text-[42px] font-bold leading-none tracking-tight mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
                    {metric.number}
                  </div>
                  <div className="text-[13px] font-semibold text-black/75 leading-snug">{metric.label}</div>
                  <div className="text-[11px] text-black/40 mt-1">{metric.note}</div>
                </div>
              ))}
            </div>

            {/* Right: Figma library proof placeholder */}
            <div className="mt-4 lg:mt-0">
              <div className="relative rounded-2xl bg-[#1a1815] overflow-hidden h-full min-h-[280px] flex flex-col items-center justify-center text-center p-8">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 max-w-xs">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">📐 Figma Screenshot</span>
                  </div>
                  <div className="text-[17px] font-semibold text-white/50 mb-2">Prism Component Library</div>
                  <div className="text-[12px] text-white/25 leading-relaxed">All 37 components · 198 variants · organised by category · single source of truth</div>
                </div>
              </div>
              <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: 1 Figma library that replaced 6 fragmented files</p>
            </div>
          </div>
        </div>

        {/* TL;DR Callout */}
        <div className="bg-emerald-50 border-l-4 border-emerald-600 rounded-r-xl p-6 sm:p-8 mb-20">
          <div className="text-[11px] uppercase tracking-widest text-emerald-800 mb-3 font-medium">
            TL;DR
          </div>
          <p className="text-[16px] sm:text-[18px] leading-relaxed text-emerald-900">
            Indigo's teams were rebuilding identical components every sprint, burning 34% of development capacity.
            I led discovery with 6 designers, interviewed 4 Sr. Designers + 3 PMs + leadership, then built Prism
            in two phases: collaborative Figma system (1 month, team of 6) and solo npm package engineering
            (1.5 weeks, AI-assisted). Result: 37 WCAG 2.1 AA components, 47% reduction in component rebuild time,
            60% faster design-to-dev handoff.
          </p>
        </div>

        {/* Who Prism Serves */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Users</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Who Prism serves
          </h2>
          <p className="text-[17px] leading-relaxed text-black/60 mb-10 max-w-2xl">
            Prism was designed for two internal audiences whose needs had never been aligned before.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: '🎨',
                role: 'Designers',
                tagline: '1 shared library. No more diverging files.',
                get: [
                  'Single Figma library replacing 6 fragmented files',
                  'Component documentation with usage guidelines',
                  'Accessibility annotations built into every component',
                ],
                color: 'bg-blue-50 border-blue-100',
                labelColor: 'text-blue-700',
              },
              {
                icon: '⚙️',
                role: 'Developers',
                tagline: 'One npm install. Fully typed. WCAG included.',
                get: [
                  'npm install @indigo/prism — one command, all 37 components',
                  'TypeScript typings and prop documentation',
                  'WCAG 2.1 AA compliance out of the box, zero extra work',
                ],
                color: 'bg-emerald-50 border-emerald-100',
                labelColor: 'text-emerald-700',
              },
              {
                icon: '📋',
                role: 'Product Managers',
                tagline: 'Faster sprints. Consistent experience.',
                get: [
                  'Design-to-dev handoff cut from 3–5 days to 1–2 days',
                  'Guaranteed visual consistency across all 3 products',
                  'Accessibility compliance as a default, not a retrofit',
                ],
                color: 'bg-violet-50 border-violet-100',
                labelColor: 'text-violet-700',
              },
            ].map((user, i) => (
              <div
                key={i}
                className={`${user.color} border rounded-2xl p-6 hover:shadow-lg transition-shadow`}
              >
                <div className="text-[32px] mb-3">{user.icon}</div>
                <div className={`text-[11px] uppercase tracking-widest font-semibold mb-1 ${user.labelColor}`}>
                  {user.role}
                </div>
                <p className="text-[15px] font-semibold mb-4 text-black/80">
                  {user.tagline}
                </p>
                <ul className="space-y-2">
                  {user.get.map((item, j) => (
                    <li key={j} className="flex gap-2 items-start text-[13px] text-black/60 leading-snug">
                      <span className="mt-0.5 flex-shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* The Trigger */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Discovery</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            The trigger: A post-launch audit that exposed the cost of chaos
          </h2>

          <p className="text-[18px] sm:text-[20px] leading-relaxed text-black/70 mb-10">
            After launching three products in six months, leadership commissioned a UX consistency audit.
            The findings were damning: 12+ conflicting UI patterns, 34% of dev time spent rebuilding components,
            and a 23% spike in customer complaints about inconsistent experiences. That audit became my brief.
          </p>

          {/* Discovery Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              {
                icon: '💬',
                title: 'Internal design team (6 designers)',
                desc: 'Collected feedback from all 6 designers — everyone maintained separate Figma files with zero shared component library. No single source of truth.',
                finding: 'Finding: "We all know it\'s broken. No one owns fixing it."',
              },
              {
                icon: '🎯',
                title: 'Stakeholder interviews',
                desc: 'Interviewed 4 Sr. Designers, 3 Product Managers, and leadership. Key insight: "Why are design and tech never in sync?" — a question both sides were asking.',
                finding: 'Finding: Leadership was actively looking for a solution, not just tolerating the pain.',
              },
              {
                icon: '🔍',
                title: 'Product audit',
                desc: 'Audited 3 recently launched products — found 12+ inconsistent UI patterns: 5 button styles, 4 card variants, 3 input treatments, all with different behavior.',
                finding: 'Finding: The inconsistency was invisible to individual teams but glaring at the system level.',
              },
              {
                icon: '📊',
                title: 'Competitive benchmarking',
                desc: 'Researched MUI, Chakra, Radix, and Atlassian design systems. Learned industry standard: design systems reduce component rebuild time by 31–47%.',
                finding: 'Finding: 34% dev time waste at Indigo matched exactly what mature design systems eliminate.',
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-[#ede9e3] border border-[#ccc8c0] rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-[32px] mb-3">{card.icon}</div>
                <h3 className="text-[16px] font-semibold mb-2">{card.title}</h3>
                <p className="text-[14px] leading-relaxed text-black/60 mb-4">{card.desc}</p>
                <div className="bg-black/5 rounded-lg px-4 py-3">
                  <p className="text-[13px] text-black/70 italic">{card.finding}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Proof: Discovery */}
        <div className="mb-16">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: '📋 Audit Doc', title: 'Product Inconsistency Audit', desc: 'Screenshot of the audit spreadsheet — 12+ patterns catalogued across 3 products' },
              { label: '🎙 Research Notes', title: 'Stakeholder Interview Synthesis', desc: 'Screenshot of FigJam or Notion synthesis — themes from 4 Sr. Designers + 3 PMs' },
            ].map((p, i) => (
              <div key={i} className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center px-8 py-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 max-w-[240px]">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{p.label}</span>
                  </div>
                  <div className="text-[15px] font-semibold text-white/50 mb-2">{p.title}</div>
                  <div className="text-[11px] text-white/25 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: the research that quantified 34% dev waste and secured leadership buy-in</p>
        </div>

        {/* Problem Statement */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Insight</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            What the research told us
          </h2>

          {/* Findings */}
          <div className="space-y-3 mb-8">
            {[
              '34% of development capacity was wasted rebuilding identical components every sprint — no reusable code library, no shared implementation baseline across teams.',
              '6 designers, 6 separate Figma files — everyone building on their own version of truth. Design-to-dev handoff took 3-5x longer than industry benchmarks.',
              '12+ inconsistent UI patterns across 3 products — buttons, cards, inputs all looked and behaved differently. Customer complaints about UX inconsistency up 23% in 6 months.',
            ].map((finding, i) => (
              <div key={i} className="flex gap-4 items-start bg-red-50 border border-red-200 rounded-xl p-5">
                <div className="w-6 h-6 rounded-full bg-red-100 border border-red-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-red-600 text-[12px]">✕</span>
                </div>
                <p className="text-[15px] leading-relaxed text-red-900">{finding}</p>
              </div>
            ))}
          </div>

          {/* Root Cause Arrow */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-black/20"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/40">root cause</span>
            <div className="h-px flex-1 bg-black/20"></div>
          </div>

          {/* Problem Statement Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 sm:p-10">
            <div className="text-[11px] uppercase tracking-widest text-emerald-400 mb-4">
              Problem Statement
            </div>
            <p className="text-[20px] sm:text-[24px] leading-relaxed text-white/90">
              Indigo's fragmented UI ecosystem was burning 34% of development capacity on redundant work,
              creating 12+ inconsistent patterns that eroded user trust, and slowing design-to-dev handoff
              to 3-5x industry standard — all because there was no single source of truth for components,
              in design or code.
            </p>
          </div>
        </section>

        {/* Contribution Pillars */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Contributions</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Two phases — and one unconventional constraint
          </h2>
          <p className="text-[17px] leading-relaxed text-black/60 mb-12 max-w-2xl">
            Prism was built in two distinct phases. Here's exactly what I did in each, and what it produced.
          </p>

          {/* Phase 1 */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="bg-blue-600 text-white text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
                Phase 01
              </div>
              <span className="text-[14px] text-black/50">1 month · Team of 6 designers</span>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  area: 'UI Audit & Research',
                  did: 'Audited 3 products end-to-end, catalogued every button, input, card, and modal variant across the ecosystem.',
                  impact: 'Uncovered 12+ inconsistent patterns and quantified 34% dev time waste — the data that secured leadership buy-in.',
                },
                {
                  area: 'Design Tokenization',
                  did: 'Defined a complete token system: color palettes, typography scale, spacing grid, elevation, and border radii.',
                  impact: 'One source of truth for all design decisions. Tokens pushed to both Figma variables and CSS custom properties simultaneously.',
                },
                {
                  area: 'Component Architecture',
                  did: 'Architected and built all 37 components with 198 variants in Figma, including states, dark mode, and responsive behavior.',
                  impact: 'Replaced 6 fragmented Figma files with 1 shared library. Designers immediately stopped rebuilding components from scratch.',
                },
                {
                  area: 'Accessibility Engineering',
                  did: 'Engaged an external accessibility consultant to define WCAG 2.1 AA requirements for every component before a line of code was written.',
                  impact: '100% WCAG AA compliance on every component — built in from day one, not retrofitted. Zero accessibility rework needed post-launch.',
                },
                {
                  area: 'Storybook Documentation',
                  did: 'Built Storybook docs for all 37 components with the a11y addon, prop tables, usage guidelines, and interactive stories.',
                  impact: 'Developers could self-serve documentation without a design handoff meeting. Reduced back-and-forth questions by eliminating ambiguity.',
                },
                {
                  area: 'Stakeholder Management',
                  did: 'Pitched with quantified data (34% dev waste). Overcame developer skepticism with live Figma MCP demos showing zero-interpretation handoff.',
                  impact: 'Secured leadership approval in one meeting. Dev team adoption followed after the Figma MCP demo eliminated "another Figma library" objections.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-[11px] uppercase tracking-widest text-blue-600 font-semibold mb-3">
                    {pillar.area}
                  </div>
                  <div className="mb-4">
                    <div className="text-[11px] uppercase tracking-widest text-black/40 mb-1">What I did</div>
                    <p className="text-[14px] leading-relaxed text-black/70">{pillar.did}</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-[11px] uppercase tracking-widest text-blue-600 mb-1">Impact created</div>
                    <p className="text-[13px] leading-relaxed text-blue-900 font-medium">{pillar.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Proof: Phase 1 Deliverables */}
          <div className="mb-10">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { label: '🎨 Figma Variables', title: 'Token System in Figma', desc: 'Screenshot of the Figma variables panel — color, spacing, typography tokens mapped to CSS properties' },
                { label: '📖 Storybook', title: 'Component Documentation', desc: 'Screenshot of Storybook — component with prop table, a11y panel, and interactive story' },
              ].map((p, i) => (
                <div key={i} className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center px-8 py-10">
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                  <div className="relative z-10 max-w-[240px]">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                      <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{p.label}</span>
                    </div>
                    <div className="text-[15px] font-semibold text-white/50 mb-2">{p.title}</div>
                    <div className="text-[11px] text-white/25 leading-relaxed">{p.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: Phase 1 deliverables — token system + living documentation</p>
          </div>

          {/* Constraint Callout */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 my-10">
            <div className="text-[11px] uppercase tracking-widest text-amber-800 mb-4">
              The Constraint
            </div>
            <blockquote className="text-[20px] sm:text-[24px] font-bold mb-4 text-amber-900" style={{ fontFamily: 'var(--font-heading)' }}>
              "I'm a product designer. Zero coding background. Publishing an npm package is an engineer's job —
              except we had no engineers available."
            </blockquote>
            <p className="text-[16px] leading-relaxed text-amber-900">
              Leadership's question: "Can you ship this without engineering support?" My answer: "Yes, if I use AI
              as my pair programmer." Claude Code and Cursor became my engineering partners — they handled architecture
              and implementation while I drove product decisions. The 1.5-week timeline forced ruthless prioritization.
            </p>
          </div>

          {/* Proof: AI Session */}
          <div className="mb-10">
            <div className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center p-8">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 max-w-sm">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                  <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">🤖 Claude Code / Cursor</span>
                </div>
                <div className="text-[17px] font-semibold text-white/50 mb-2">AI-Assisted Engineering Session</div>
                <div className="text-[12px] text-white/25 leading-relaxed">Screenshot of Claude Code or Cursor mid-session — ARIA implementation, component architecture, or TypeScript prop definitions being generated</div>
              </div>
            </div>
            <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: what "AI as pair programmer" actually looked like in practice</p>
          </div>

          {/* Phase 2 */}
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="bg-emerald-600 text-white text-[12px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
                Phase 02
              </div>
              <span className="text-[14px] text-black/50">1.5 weeks · Solo</span>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  area: 'npm Package Architecture',
                  did: 'Designed a tree-shakeable package structure with proper entry points, peer dependencies, and build pipeline using Vite.',
                  impact: 'Zero-config install: npm install @indigo/prism — consumers only bundle the components they actually use.',
                },
                {
                  area: 'React Component Engineering',
                  did: 'Solo-engineered all 37 components as production React with ARIA attributes, keyboard navigation, and TypeScript props.',
                  impact: 'Developers integrated their first component in under 30 minutes. No custom styling required — accessibility and theming built in.',
                },
                {
                  area: 'API Design',
                  did: 'Designed every component\'s prop API for ergonomics — intuitive naming, sensible defaults, composability over configuration.',
                  impact: 'API decisions made under time pressure, without code reviewers, became permanent. Prioritized backwards-compatibility from the start.',
                },
                {
                  area: 'AI-Assisted Engineering',
                  did: 'Used Claude Code for component architecture and ARIA implementation decisions. Used Cursor for SCSS and React patterns. I drove all product decisions.',
                  impact: 'A non-technical designer shipped 37 production-grade React components in 1.5 weeks — proving AI tooling can bridge the skill gap entirely.',
                },
              ].map((pillar, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-[11px] uppercase tracking-widest text-emerald-600 font-semibold mb-3">
                    {pillar.area}
                  </div>
                  <div className="mb-4">
                    <div className="text-[11px] uppercase tracking-widest text-black/40 mb-1">What I did</div>
                    <p className="text-[14px] leading-relaxed text-black/70">{pillar.did}</p>
                  </div>
                  <div className="bg-emerald-50 rounded-lg p-3">
                    <div className="text-[11px] uppercase tracking-widest text-emerald-600 mb-1">Impact created</div>
                    <p className="text-[13px] leading-relaxed text-emerald-900 font-medium">{pillar.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proof: Phase 2 Deliverables */}
        <div className="mb-16">
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: '📦 npm', title: 'Package on npm Registry', desc: 'Screenshot of @indigo/prism on npmjs.com — weekly downloads, version, bundle size' },
              { label: '💻 VS Code', title: 'Component in a Real Codebase', desc: 'Screenshot of a dev importing from @indigo/prism — TypeScript autocomplete showing props' },
            ].map((p, i) => (
              <div key={i} className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[220px] flex flex-col items-center justify-center text-center px-8 py-10">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                <div className="relative z-10 max-w-[240px]">
                  <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
                    <span className="text-[10px] text-white/30 uppercase tracking-widest font-mono">{p.label}</span>
                  </div>
                  <div className="text-[15px] font-semibold text-white/50 mb-2">{p.title}</div>
                  <div className="text-[11px] text-white/25 leading-relaxed">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: Prism shipped to production — a real npm package, not a Figma deliverable</p>
        </div>

        {/* Impact Metrics */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Impact</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Measurable outcomes: What changed after Prism
          </h2>

          {/* ROI Framing */}
          <div className="bg-black/5 border border-black/10 rounded-xl px-6 py-4 mb-10">
            <p className="text-[15px] leading-relaxed text-black/70">
              <span className="font-semibold text-black/90">The cost of inaction: </span>
              34% of a 6-engineer sprint team over 3 months ≈ the equivalent of ~500 engineering hours
              wasted on redundant component work — before Prism existed.
            </p>
          </div>

          {/* Big Numbers */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { value: '47%', label: 'reduction in component rebuild time' },
              { value: '60%', label: 'faster design-to-dev handoff' },
              { value: '12→1', label: 'UI patterns consolidated' },
              { value: '100%', label: 'WCAG 2.1 AA compliance' },
            ].map((stat, i) => (
              <div key={i} className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 text-center">
                <div className="text-[48px] font-bold text-emerald-900 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {stat.value}
                </div>
                <div className="text-[12px] text-emerald-700 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Before/After Table */}
          <div className="bg-[#ede9e3] border border-[#ccc8c0] rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-black/5 border-b border-black/10">
                  <th className="text-left p-4 text-[12px] uppercase tracking-wide text-black/60">Metric</th>
                  <th className="text-left p-4 text-[12px] uppercase tracking-wide text-black/60">Before Prism</th>
                  <th className="text-right p-4 text-[12px] uppercase tracking-wide text-black/60">After Prism</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Component rebuild time per sprint', '~18–22 hours', '~9–12 hours'],
                  ['Design-to-dev handoff duration', '3–5 days', '1–2 days'],
                  ['Inconsistent UI patterns', '12+ patterns', '1 unified system'],
                  ['Figma component libraries', '6 fragmented files', '1 shared library'],
                  ['WCAG compliance coverage', 'Inconsistent, retrofitted', '100% AA, built-in'],
                ].map((row, i) => (
                  <tr key={i} className="border-b border-black/5 last:border-0">
                    <td className="p-4 text-[14px] font-medium">{row[0]}</td>
                    <td className="p-4 text-[14px] text-black/60">{row[1]}</td>
                    <td className="p-4 text-[14px] text-right font-semibold text-emerald-700">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Proof: Before / After UI */}
        <div className="mb-16">
          <div className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[280px] flex items-center justify-center">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {/* Vertical divider */}
            <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 z-10" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white/40 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-20 font-mono">Before → After</div>
            <div className="relative z-10 grid grid-cols-2 w-full h-full">
              {[
                { side: 'Before Prism', desc: 'Product screenshot showing inconsistent UI — 5 different button styles, mismatched inputs, visual fragmentation across 3 products' },
                { side: 'After Prism', desc: 'Same product screenshot after Prism adoption — unified components, consistent spacing, one visual language' },
              ].map((p, i) => (
                <div key={i} className="flex flex-col items-center justify-center text-center px-8 py-12">
                  <div className="text-[11px] text-white/20 uppercase tracking-widest mb-3 font-mono">{p.side}</div>
                  <div className="text-[12px] text-white/25 leading-relaxed max-w-[200px]">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-black/30 text-center mt-2.5 uppercase tracking-widest">↑ Proof: visual before/after — the difference Prism made in the actual product</p>
        </div>

        {/* Key Learnings */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-black/10"></div>
            <span className="text-[11px] uppercase tracking-widest text-black/50">Learnings</span>
            <div className="h-px flex-1 bg-black/10"></div>
          </div>

          <h2
            className="text-[36px] sm:text-[48px] mb-8 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Key insights
          </h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                num: '01',
                title: 'Leadership empathy was the unlock',
                desc: 'They were equally concerned about design-dev sync issues and actively seeking a solution. Presenting quantified data (34% dev time waste) secured buy-in immediately.',
              },
              {
                num: '02',
                title: 'Developer skepticism was valid',
                desc: 'Had to prove Figma MCP eliminated the interpretation gap through live demos. "Another Figma library" concerns were overcome with tangible proof.',
              },
              {
                num: '03',
                title: 'Accessibility upfront prevented retrofitting',
                desc: 'WCAG 2.1 AA compliance from day one was non-negotiable. This upfront investment saved massive rework costs later.',
              },
              {
                num: '04',
                title: 'AI tools bridged the skill gap',
                desc: 'Enabled a non-technical designer to ship production-grade code in 1.5 weeks, proving AI-assisted workflows can bridge skill gaps.',
              },
              {
                num: '05',
                title: 'No code reviewers = critical decisions',
                desc: 'Without code reviewers, every API choice had permanent consequences as breaking changes. Product decisions became more critical.',
              },
              {
                num: '06',
                title: 'The surprising stakeholder finding',
                desc: 'Leadership was not just empathetic about design-dev handoff time, they were actively looking for a solution. Prism became that solution.',
              },
            ].map((learning, i) => (
              <div key={i} className="bg-white border border-black/10 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="text-[40px] font-bold text-black/10 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {learning.num}
                </div>
                <h3 className="text-[18px] font-semibold mb-3">{learning.title}</h3>
                <p className="text-[14px] leading-relaxed text-black/60">{learning.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Quote */}
        <div className="bg-slate-900 rounded-2xl p-8 sm:p-12 text-center">
          <p className="text-[20px] sm:text-[28px] italic text-white/90 leading-relaxed">
            "The npm package was when Prism stopped being a designer's artifact and became a developer's tool —
            WCAG compliance included, automatically, on every install. That's when the ROI became undeniable."
          </p>
        </div>
      </div>
    </div>
  );
};
