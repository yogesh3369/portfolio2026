import { Fragment, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/*
 * Prism case study — visual system
 * Surfaces:  paper #ede9e3 (border #d8d2c8) · dark #1a1815 (border white/10)
 * Accent:    blue-600 only. Everything else is black at varying opacity.
 * Labels:    font-mono, 11px, uppercase, tracking-widest — same as homepage.
 */

const TOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'role', label: 'My Role' },
  { id: 'users', label: 'Users' },
  { id: 'discovery', label: 'Discovery' },
  { id: 'problem', label: 'Problem' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'phases', label: 'Phases' },
  { id: 'tokens', label: 'Tokens' },
  { id: 'mcp', label: 'Figma MCP' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'library', label: 'Library' },
  { id: 'comparison', label: 'Benchmark' },
  { id: 'impact', label: 'Impact' },
  { id: 'wild', label: 'In Production' },
  { id: 'praise', label: 'Praise' },
  { id: 'learnings', label: 'Learnings' },
];

/* ── Shared building blocks ─────────────────────────────────────── */

const SectionLabel = ({ children }: { children: ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="font-mono text-[11px] uppercase tracking-widest text-black/55 whitespace-nowrap">
      {children} <span className="text-blue-600 font-bold ml-1">///</span>
    </span>
    <div className="h-px flex-1 bg-black/10" />
  </div>
);

const SectionTitle = ({ children, className = 'mb-4' }: { children: ReactNode; className?: string }) => (
  <h2
    className={`text-[36px] sm:text-[48px] tracking-tight text-black ${className}`}
    style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.08 }}
  >
    {children}
  </h2>
);

const Lead = ({ children, className = 'mb-10' }: { children: ReactNode; className?: string }) => (
  <p className={`text-[17px] leading-relaxed text-black/60 max-w-2xl ${className}`}>{children}</p>
);

const Caption = ({ children }: { children: ReactNode }) => (
  <p className="font-mono text-[11px] text-black/35 text-center mt-3 uppercase tracking-widest">{children}</p>
);

/* Dark placeholder frame for proof screenshots that are still to come */
const ProofFrame = ({
  label,
  title,
  desc,
  minH = 'min-h-[220px]',
}: {
  label: string;
  title: string;
  desc: string;
  minH?: string;
}) => (
  <div className={`relative rounded-2xl bg-[#1a1815] overflow-hidden ${minH} flex flex-col items-center justify-center text-center px-8 py-10`}>
    <div
      className="absolute inset-0"
      style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
    />
    <div className="relative z-10 max-w-[260px]">
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1 mb-4">
        <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest">{label}</span>
      </div>
      <div className="text-[15px] font-semibold text-white/55 mb-2">{title}</div>
      <div className="text-[11px] text-white/30 leading-relaxed">{desc}</div>
    </div>
  </div>
);

/* ── Component ──────────────────────────────────────────────────── */

export const PrismCaseStudy = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeSection, setActiveSection] = useState<string>('overview');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );

    TOC_SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const componentCategories = [
    { name: 'Forms', count: 8, components: ['Button', 'Input', 'Textarea', 'Select', 'Checkbox', 'Radio', 'Toggle', 'DatePicker'] },
    { name: 'Navigation', count: 6, components: ['Navbar', 'Tabs', 'Breadcrumb', 'Pagination', 'Sidebar', 'Stepper'] },
    { name: 'Feedback', count: 7, components: ['Toast', 'Alert', 'Badge', 'Progress', 'Spinner', 'Skeleton', 'Tooltip'] },
    { name: 'Layout', count: 5, components: ['Card', 'Divider', 'Grid', 'Container', 'Spacer'] },
    { name: 'Data Display', count: 7, components: ['Table', 'Tag', 'Avatar', 'Chip', 'List', 'Stat', 'Timeline'] },
    { name: 'Overlay', count: 4, components: ['Modal', 'Drawer', 'Dropdown', 'Popover'] },
  ];

  const allComponents = componentCategories.flatMap((cat) =>
    cat.components.map((name) => ({ name, category: cat.name }))
  );

  const filteredComponents =
    activeCategory === 'All' ? allComponents : allComponents.filter((c) => c.category === activeCategory);

  return (
    <>
      {/* Sticky Side TOC — desktop only */}
      <nav className="hidden xl:block fixed left-6 top-1/2 -translate-y-1/2 z-30">
        <ul className="space-y-2.5">
          {TOC_SECTIONS.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <button
                  onClick={() => scrollToSection(section.id)}
                  className="group flex items-center gap-3 cursor-pointer"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-8 h-[3px] bg-black'
                        : 'w-4 h-[2px] bg-black/20 group-hover:bg-black/40 group-hover:w-6'
                    }`}
                  />
                  <span
                    className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 ${
                      isActive ? 'text-black opacity-100' : 'text-black/50 opacity-0 group-hover:opacity-100'
                    }`}
                  >
                    {section.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="relative z-1 min-h-screen py-24 sm:py-32 px-5 sm:px-8 md:px-10">
        <div className="max-w-6xl mx-auto">
          {/* Back button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[15px] mb-10 text-black/70 hover:text-black transition-colors"
          >
            <span aria-hidden="true">←</span>
            <span>Back to work</span>
          </Link>

          {/* ── Hero ── */}
          <div id="overview" className="mb-24 scroll-mt-32">
            {/* Context tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['Design System', 'npm Package', '6-person team', '1.5 weeks solo', 'AI-assisted'].map((tag, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-black/5 border border-black/10 font-mono text-[11px] text-black/55 uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>

            <h1
              className="text-[46px] sm:text-[64px] md:text-[80px] mb-6 tracking-tight leading-[1.04] text-black"
              style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
            >
              How a designer with <span className="text-black/35 italic">zero coding experience</span> shipped
              Prism to npm
            </h1>

            <p className="text-[18px] sm:text-[21px] leading-[1.65] text-black/60 mb-12 max-w-3xl">
              Indigo had six designers each maintaining their own Figma file, and three products with no shared
              component library. Every sprint, teams rebuilt the same work from scratch — burning 34% of
              development capacity on redundant effort. I led Prism to fix that: from a post-launch audit to a
              published npm package, without a single engineer on my team.
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
                    className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-5 hover:bg-[#e6e1da] transition-colors duration-200"
                  >
                    <div
                      className="text-[42px] font-bold leading-none tracking-tight mb-4 text-black tabular-nums"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {metric.number}
                    </div>
                    <div className="text-[13px] font-semibold text-black/75 leading-snug">{metric.label}</div>
                    <div className="font-mono text-[10px] uppercase tracking-wider text-black/40 mt-1.5">{metric.note}</div>
                  </div>
                ))}
              </div>

              {/* Right: Figma library proof placeholder */}
              <div className="mt-4 lg:mt-0 flex flex-col">
                <div className="flex-1">
                  <ProofFrame
                    label="Figma screenshot"
                    title="Prism Component Library"
                    desc="All 37 components · 198 variants · organised by category · single source of truth"
                    minH="min-h-[280px] h-full"
                  />
                </div>
                <Caption>↑ Proof: 1 Figma library that replaced 6 fragmented files</Caption>
              </div>
            </div>
          </div>

          {/* ── TL;DR ── */}
          <div className="border-l-[3px] border-blue-600 bg-white/50 rounded-r-2xl p-6 sm:p-8 mb-24">
            <div className="font-mono text-[11px] uppercase tracking-widest text-blue-700 mb-3">TL;DR</div>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-black/75">
              Indigo's teams were rebuilding identical components every sprint, burning 34% of development
              capacity. I led discovery with 6 designers, interviewed 4 Sr. Designers + 3 PMs + leadership, then
              built Prism in two phases: collaborative Figma system (1 month, team of 6) and solo npm package
              engineering (1.5 weeks, AI-assisted). Result: 37 WCAG 2.1 AA components, 47% reduction in component
              rebuild time, 60% faster design-to-dev handoff.
            </p>
          </div>

          {/* ── My Role ── */}
          <section id="role" className="mb-24 scroll-mt-32">
            <SectionLabel>My Role</SectionLabel>
            <SectionTitle>What I owned, what I shared</SectionTitle>
            <Lead>
              Prism wasn't handed off — it was built end-to-end across product, design, and engineering. Here's
              the exact ownership map.
            </Lead>

            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl overflow-hidden">
              {[
                { area: 'Strategy & Discovery', detail: 'Audit, stakeholder interviews, problem framing, leadership pitch', owned: true },
                { area: 'Design System Architecture', detail: 'Token hierarchy, component taxonomy, naming conventions, API design', owned: true },
                { area: 'Component Design (37 components)', detail: 'Figma library, 198 variants, states, dark mode, responsive behavior', owned: true },
                { area: 'Token System', detail: 'Primitive → Semantic → Component tokens, Figma variables, CSS custom props', owned: true },
                { area: 'Accessibility (WCAG 2.1 AA)', detail: 'Spec definition with external consultant, ARIA implementation, keyboard nav', owned: false },
                { area: 'React + TypeScript Engineering', detail: '37 components, prop typings, build pipeline, npm packaging — AI pair-programmed', owned: true },
                { area: 'Storybook Documentation', detail: 'Stories for every component, a11y addon, prop tables, usage guidelines', owned: true },
                { area: 'Stakeholder Management', detail: 'Designer alignment, dev skepticism handling, leadership reporting', owned: true },
                { area: 'QA & Adoption Tracking', detail: 'Component coverage audits across 3 products, dev feedback loops', owned: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1fr_auto] sm:grid-cols-[260px_1fr_110px] gap-3 sm:gap-6 items-start sm:items-center p-4 sm:p-5 ${
                    i !== 0 ? 'border-t border-black/5' : ''
                  }`}
                >
                  <div className="text-[14px] font-semibold text-black/85">{row.area}</div>
                  <div className="text-[13px] text-black/55 leading-relaxed col-span-2 sm:col-span-1 sm:order-2">
                    {row.detail}
                  </div>
                  <div className="sm:order-3 justify-self-end">
                    <span
                      className={`inline-flex items-center font-mono text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${
                        row.owned
                          ? 'bg-black text-white'
                          : 'border border-black/25 text-black/60 bg-transparent'
                      }`}
                    >
                      {row.owned ? 'Owned' : 'Co-owned'}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 font-mono text-[11px] uppercase tracking-wider text-black/40 flex flex-wrap gap-x-6 gap-y-2">
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-black" />
                Owned — I drove the work end-to-end
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-black/40" />
                Co-owned — shared with an external consultant
              </span>
            </div>
          </section>

          {/* ── Users ── */}
          <section id="users" className="mb-24 scroll-mt-32">
            <SectionLabel>Users</SectionLabel>
            <SectionTitle>Who Prism serves</SectionTitle>
            <Lead>Prism was designed for two internal audiences whose needs had never been aligned before.</Lead>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  num: '01',
                  role: 'Designers',
                  tagline: '1 shared library. No more diverging files.',
                  get: [
                    'Single Figma library replacing 6 fragmented files',
                    'Component documentation with usage guidelines',
                    'Accessibility annotations built into every component',
                  ],
                },
                {
                  num: '02',
                  role: 'Developers',
                  tagline: 'One npm install. Fully typed. WCAG included.',
                  get: [
                    'npm install @indigo/prism — one command, all 37 components',
                    'TypeScript typings and prop documentation',
                    'WCAG 2.1 AA compliance out of the box, zero extra work',
                  ],
                },
                {
                  num: '03',
                  role: 'Product Managers',
                  tagline: 'Faster sprints. Consistent experience.',
                  get: [
                    'Design-to-dev handoff cut from 3–5 days to 1–2 days',
                    'Guaranteed visual consistency across all 3 products',
                    'Accessibility compliance as a default, not a retrofit',
                  ],
                },
              ].map((user, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 hover:bg-[#e6e1da] transition-colors duration-200 flex flex-col"
                >
                  <div
                    className="text-[36px] font-bold text-black/10 leading-none mb-4 tabular-nums"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {user.num}
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-widest font-semibold mb-1.5 text-blue-700">
                    {user.role}
                  </div>
                  <p className="text-[15px] font-semibold mb-4 text-black/80">{user.tagline}</p>
                  <ul className="space-y-2 mt-auto">
                    {user.get.map((item, j) => (
                      <li key={j} className="flex gap-2 items-start text-[13px] text-black/60 leading-snug">
                        <span className="mt-0.5 flex-shrink-0 text-black/35" aria-hidden="true">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── Discovery ── */}
          <section id="discovery" className="mb-16 scroll-mt-32">
            <SectionLabel>Discovery</SectionLabel>
            <SectionTitle className="mb-6">
              The trigger: a post-launch audit that exposed the cost of chaos
            </SectionTitle>

            <p className="text-[18px] sm:text-[20px] leading-relaxed text-black/70 mb-10 max-w-3xl">
              After launching three products in six months, leadership commissioned a UX consistency audit. The
              findings were damning: 12+ conflicting UI patterns, 34% of dev time spent rebuilding components,
              and a 23% spike in customer complaints about inconsistent experiences. That audit became my brief.
            </p>

            {/* Discovery Cards */}
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  method: 'Team feedback',
                  title: 'Internal design team (6 designers)',
                  desc: 'Collected feedback from all 6 designers — everyone maintained separate Figma files with zero shared component library. No single source of truth.',
                  finding: '"We all know it\'s broken. No one owns fixing it."',
                },
                {
                  method: 'Interviews',
                  title: 'Stakeholder interviews',
                  desc: 'Interviewed 4 Sr. Designers, 3 Product Managers, and leadership. Key insight: "Why are design and tech never in sync?" — a question both sides were asking.',
                  finding: 'Leadership was actively looking for a solution, not just tolerating the pain.',
                },
                {
                  method: 'Audit',
                  title: 'Product audit',
                  desc: 'Audited 3 recently launched products — found 12+ inconsistent UI patterns: 5 button styles, 4 card variants, 3 input treatments, all with different behavior.',
                  finding: 'The inconsistency was invisible to individual teams but glaring at the system level.',
                },
                {
                  method: 'Benchmarking',
                  title: 'Competitive benchmarking',
                  desc: 'Researched MUI, Chakra, Radix, and Atlassian design systems. Learned industry standard: design systems reduce component rebuild time by 31–47%.',
                  finding: '34% dev time waste at Indigo matched exactly what mature design systems eliminate.',
                },
              ].map((card, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 hover:bg-[#e6e1da] transition-colors duration-200"
                >
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">
                    {String(i + 1).padStart(2, '0')} · {card.method}
                  </div>
                  <h3 className="text-[16px] font-semibold mb-2 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                    {card.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-black/60 mb-4">{card.desc}</p>
                  <div className="border-l-2 border-blue-600/60 pl-4 py-1">
                    <p className="text-[13px] text-black/70 italic leading-relaxed">
                      <span className="font-mono text-[10px] not-italic uppercase tracking-widest text-blue-700 mr-2">Finding</span>
                      {card.finding}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Proof: Discovery */}
          <div className="mb-24">
            <div className="grid sm:grid-cols-2 gap-4">
              <ProofFrame
                label="Audit doc"
                title="Product Inconsistency Audit"
                desc="Screenshot of the audit spreadsheet — 12+ patterns catalogued across 3 products"
              />
              <ProofFrame
                label="Research notes"
                title="Stakeholder Interview Synthesis"
                desc="Screenshot of FigJam or Notion synthesis — themes from 4 Sr. Designers + 3 PMs"
              />
            </div>
            <Caption>↑ Proof: the research that quantified 34% dev waste and secured leadership buy-in</Caption>
          </div>

          {/* ── Problem ── */}
          <section id="problem" className="mb-24 scroll-mt-32">
            <SectionLabel>Insight</SectionLabel>
            <SectionTitle className="mb-8">What the research told us</SectionTitle>

            {/* Findings */}
            <div className="space-y-3 mb-10">
              {[
                '34% of development capacity was wasted rebuilding identical components every sprint — no reusable code library, no shared implementation baseline across teams.',
                '6 designers, 6 separate Figma files — everyone building on their own version of truth. Design-to-dev handoff took 3-5x longer than industry benchmarks.',
                '12+ inconsistent UI patterns across 3 products — buttons, cards, inputs all looked and behaved differently. Customer complaints about UX inconsistency up 23% in 6 months.',
              ].map((finding, i) => (
                <div key={i} className="flex gap-5 items-start bg-white/50 border border-black/10 rounded-2xl p-5">
                  <div
                    className="font-bold text-[22px] text-black/15 leading-none pt-0.5 tabular-nums shrink-0"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <p className="text-[15px] leading-relaxed text-black/75">{finding}</p>
                </div>
              ))}
            </div>

            {/* Root Cause Arrow */}
            <div className="flex items-center gap-4 my-10">
              <div className="h-px flex-1 bg-black/15" />
              <span className="font-mono text-[11px] uppercase tracking-widest text-black/40">root cause</span>
              <div className="h-px flex-1 bg-black/15" />
            </div>

            {/* Problem Statement Box */}
            <div className="bg-[#1a1815] rounded-2xl p-8 sm:p-10 relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />
              <div className="relative z-10">
                <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-5">
                  Problem statement
                </div>
                <p className="text-[20px] sm:text-[24px] leading-relaxed text-white/90" style={{ textWrap: 'pretty' }}>
                  Indigo's fragmented UI ecosystem was burning 34% of development capacity on redundant work,
                  creating 12+ inconsistent patterns that eroded user trust, and slowing design-to-dev handoff to
                  3-5x industry standard — all because there was no single source of truth for components, in
                  design or code.
                </p>
              </div>
            </div>
          </section>

          {/* ── Decisions ── */}
          <section id="decisions" className="mb-24 scroll-mt-32">
            <SectionLabel>Decisions</SectionLabel>
            <SectionTitle>3 hard decisions that shaped Prism</SectionTitle>
            <Lead>
              Every design system is a stack of trade-offs. Here are the three I lost sleep over — and the
              reasoning that locked each one in.
            </Lead>

            <div className="space-y-5">
              {[
                {
                  num: '01',
                  question: 'Fork Radix UI or build from scratch?',
                  optionA: { label: 'Fork Radix', desc: 'Faster · proven a11y · trusted by Vercel/Linear · saves 4–6 weeks' },
                  optionB: { label: 'Build our own', desc: 'Total control · brand-aligned API · own theming · steeper curve' },
                  chose: 'B',
                  reasoning:
                    'Indigo needed a token-first API where every component theme flowed from Figma variables. Forking Radix would have meant fighting their styling assumptions forever. The 4-week cost bought us 5 years of cleaner ownership.',
                  risk: 'Higher upfront effort. Mitigated by AI-assisted engineering in Phase 2.',
                },
                {
                  num: '02',
                  question: 'Tokens in CSS variables or JavaScript?',
                  optionA: { label: 'CSS vars only', desc: 'Lighter bundle · zero build step · native browser support' },
                  optionB: { label: 'JS tokens → CSS vars', desc: 'Single source · Figma sync · type-safe · component-aware' },
                  chose: 'B',
                  reasoning:
                    'Designers needed Figma Variables as the source of truth. JavaScript tokens let us generate Figma → JS → CSS in a single pipeline. CSS vars alone would have broken the designer-developer round-trip and reintroduced the handoff gap Prism was meant to kill.',
                  risk: 'Build step complexity. Mitigated by Style Dictionary for token transformation.',
                },
                {
                  num: '03',
                  question: '37 components — or the full 50+ MUI parity?',
                  optionA: { label: '50+ components', desc: 'Match MUI breadth · feature parity · "complete" library' },
                  optionB: { label: '37 components, ruthless cut', desc: 'Cover 92% of actual product usage · ship in 11 weeks · v1 today, not v2 in a year' },
                  chose: 'B',
                  reasoning:
                    'I audited every component used across 3 Indigo products. 37 components covered 92% of all UI surfaces. Adding the next 13 would have doubled the timeline for components developers rarely needed. Ship the 92% library, learn from production, then expand.',
                  risk: 'Future requests for the missing 8%. Mitigated by a documented "what\'s next" roadmap.',
                },
              ].map((decision, i) => (
                <div key={i} className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-8">
                  {/* Question */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="text-[36px] font-bold text-black/10 leading-none mt-[-4px] tabular-nums"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {decision.num}
                    </div>
                    <h3
                      className="text-[22px] sm:text-[26px] font-semibold leading-tight text-black"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {decision.question}
                    </h3>
                  </div>

                  {/* Options */}
                  <div className="grid sm:grid-cols-2 gap-3 mb-6">
                    {[
                      { key: 'A', opt: decision.optionA },
                      { key: 'B', opt: decision.optionB },
                    ].map(({ key, opt }) => {
                      const chosen = decision.chose === key;
                      return (
                        <div
                          key={key}
                          className={`rounded-xl p-4 border ${
                            chosen
                              ? 'bg-white/80 border-blue-600/50'
                              : 'bg-white/40 border-black/10 opacity-60'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span
                              className={`font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                                chosen ? 'bg-blue-600 text-white' : 'bg-black/10 text-black/50'
                              }`}
                            >
                              {chosen ? 'Chosen' : 'Considered'}
                            </span>
                            <span className="text-[14px] font-semibold text-black/80">{opt.label}</span>
                          </div>
                          <p className="text-[12px] text-black/55 leading-relaxed">{opt.desc}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Reasoning */}
                  <div className="space-y-3">
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-semibold mb-1.5">
                        Why I chose {decision.chose === 'A' ? decision.optionA.label : decision.optionB.label}
                      </div>
                      <p className="text-[14px] leading-relaxed text-black/75 max-w-3xl">{decision.reasoning}</p>
                    </div>
                    <div className="bg-black/5 rounded-lg px-4 py-2.5">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-black/50 font-semibold mr-2">
                        Trade-off accepted:
                      </span>
                      <span className="text-[13px] text-black/70">{decision.risk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Phases ── */}
          <section id="phases" className="mb-24 scroll-mt-32">
            <SectionLabel>Contributions</SectionLabel>
            <SectionTitle>Two phases — and one unconventional constraint</SectionTitle>
            <Lead className="mb-12">
              Prism was built in two distinct phases. Here's exactly what I did in each, and what it produced.
            </Lead>

            {/* Phase 1 */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="bg-black text-white font-mono text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
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
                    className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 hover:bg-[#e6e1da] transition-colors duration-200 flex flex-col"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest text-black/45 font-semibold mb-3">
                      {pillar.area}
                    </div>
                    <div className="mb-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-black/35 mb-1.5">What I did</div>
                      <p className="text-[14px] leading-relaxed text-black/70">{pillar.did}</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-3.5 mt-auto">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-1.5">Impact created</div>
                      <p className="text-[13px] leading-relaxed text-black/75 font-medium">{pillar.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof: Phase 1 Deliverables */}
            <div className="mb-12">
              <div className="grid sm:grid-cols-2 gap-4">
                <ProofFrame
                  label="Figma variables"
                  title="Token System in Figma"
                  desc="Screenshot of the Figma variables panel — color, spacing, typography tokens mapped to CSS properties"
                />
                <ProofFrame
                  label="Storybook"
                  title="Component Documentation"
                  desc="Screenshot of Storybook — component with prop table, a11y panel, and interactive story"
                />
              </div>
              <Caption>↑ Proof: Phase 1 deliverables — token system + living documentation</Caption>
            </div>

            {/* ── Tokens ── */}
            <section id="tokens" className="mb-12 mt-12 scroll-mt-32">
              <SectionLabel>Tokens</SectionLabel>

              {/* Beat 1 — Intro */}
              <div className="mb-10">
                <h3
                  className="text-[30px] sm:text-[40px] mb-4 tracking-tight text-black"
                  style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
                >
                  One source of truth for every design decision
                </h3>
                <p className="text-[17px] leading-relaxed text-black/60 max-w-2xl">
                  Before Prism, color values, spacing units, and type sizes lived across 6 separate Figma files.
                  A brand color change required 6 manual updates — and developers still eyeballed the hex. Tokens
                  solved this at the system level, bridging design and code in a single definition.
                </p>
              </div>

              {/* Beat 2 — Token Hierarchy Visual */}
              <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-8 mb-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-black/40 mb-6">
                  Token pipeline: how values flow through Prism
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 sm:gap-3 items-stretch">
                  {[
                    {
                      step: '01',
                      level: 'Primitive',
                      label: 'Raw values — no context',
                      tokens: ['#1A1A2E', '#F4F1EC', '16px', '600'],
                    },
                    {
                      step: '02',
                      level: 'Semantic',
                      label: 'Purpose-mapped — "what is it for?"',
                      tokens: ['color.text.primary', 'color.bg.surface', 'spacing.component.md', 'typography.weight.emphasis'],
                    },
                    {
                      step: '03',
                      level: 'Component',
                      label: 'Scoped — "which component?"',
                      tokens: ['button.label.color', 'card.background', 'input.padding.x', 'badge.font.weight'],
                    },
                  ].map((col, i) => (
                    <Fragment key={col.level}>
                      <div className="bg-white/60 border border-black/10 rounded-xl p-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="font-mono text-[10px] text-blue-700 font-bold tabular-nums">{col.step}</span>
                          <span className="font-mono text-[10px] uppercase tracking-widest font-semibold text-black/70">
                            {col.level}
                          </span>
                        </div>
                        <div className="text-[11px] text-black/40 mb-4">{col.label}</div>
                        <div className="space-y-2">
                          {col.tokens.map((t, j) => (
                            <div key={j} className="bg-black/5 rounded-lg px-3 py-1.5">
                              <span className="font-mono text-[12px] text-black/70">{t}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      {i < 2 && (
                        <div
                          className="hidden sm:flex items-center justify-center text-black/25 text-[20px]"
                          aria-hidden="true"
                        >
                          →
                        </div>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              {/* Beat 3 — Process Change */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/[0.04] border border-black/10 rounded-2xl p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-semibold mb-3">
                    Before tokens
                  </div>
                  <p className="text-[14px] leading-relaxed text-black/60">
                    Changing the brand primary required updating 6 Figma files manually, hoping developers matched
                    the exact hex, and patching every component individually. 6 files × 37 components = guaranteed
                    inconsistency.
                  </p>
                </div>
                <div className="bg-white/70 border border-blue-600/30 rounded-2xl p-6">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-semibold mb-3">
                    After tokens
                  </div>
                  <p className="text-[14px] leading-relaxed text-black/75">
                    One token value updated in Figma variables propagates to all 37 components instantly. The same
                    token maps directly to CSS custom properties — so the codebase updates automatically, with zero
                    designer-developer back-and-forth.
                  </p>
                </div>
              </div>
            </section>

            {/* ── Figma MCP ── */}
            <section id="mcp" className="mb-12 mt-12 scroll-mt-32">
              <SectionLabel>Figma MCP</SectionLabel>

              <h3
                className="text-[30px] sm:text-[40px] mb-4 tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
              >
                How Figma MCP killed the design-dev gap
              </h3>
              <p className="text-[17px] leading-relaxed text-black/60 mb-8 max-w-2xl">
                Traditional handoff: Figma screenshot → Slack → developer guesses hex →
                <span className="line-through text-black/40"> 2 days of back-and-forth</span>. With Figma MCP, the
                design IS the source — and the developer's IDE reads it directly. 30 seconds, zero interpretation.
              </p>

              {/* 3-step pipeline */}
              <div className="bg-[#1a1815] rounded-2xl p-6 sm:p-10 mb-6 relative overflow-hidden">
                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />

                <div className="relative z-10 grid sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 sm:gap-2 items-center">
                  {/* Step 1 — Figma */}
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded bg-white/10 border border-white/15 flex items-center justify-center text-white/80 text-[11px] font-bold">
                        F
                      </span>
                      <span className="text-white/70 text-[12px] font-semibold">Figma Variables</span>
                    </div>
                    <div className="space-y-1.5">
                      {[
                        { name: 'color.primary', val: '#1E40AF', dot: 'bg-blue-600' },
                        { name: 'spacing.md', val: '16px', dot: 'bg-white/40' },
                        { name: 'radius.lg', val: '12px', dot: 'bg-white/20' },
                      ].map((v, i) => (
                        <div key={i} className="flex items-center gap-2 text-[10px] font-mono">
                          <span className={`w-3 h-3 rounded ${v.dot}`} />
                          <span className="text-white/55 flex-1">{v.name}</span>
                          <span className="text-white/40">{v.val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="font-mono text-[9px] text-white/30 mt-3 uppercase tracking-wider">Step 1 · Designer edits</div>
                  </div>

                  {/* Arrow 1 */}
                  <div className="flex justify-center text-white/30 text-[24px] py-2 sm:py-0 rotate-90 sm:rotate-0" aria-hidden="true">
                    →
                  </div>

                  {/* Step 2 — MCP Server */}
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded bg-white/10 border border-white/15 flex items-center justify-center text-white/80 text-[11px] font-bold">
                        M
                      </span>
                      <span className="text-white/70 text-[12px] font-semibold">MCP Server</span>
                    </div>
                    <div className="font-mono text-[10px] space-y-1">
                      <div className="text-blue-300">$ figma-mcp listen</div>
                      <div className="text-white/30">{'> variable.changed'}</div>
                      <div className="text-white/30">{'> generating tokens...'}</div>
                      <div className="text-white/70">✓ tokens.ts updated</div>
                      <div className="text-white/70">✓ tokens.css updated</div>
                    </div>
                    <div className="font-mono text-[9px] text-white/30 mt-3 uppercase tracking-wider">Step 2 · Sync runs</div>
                  </div>

                  {/* Arrow 2 */}
                  <div className="flex justify-center text-white/30 text-[24px] py-2 sm:py-0 rotate-90 sm:rotate-0" aria-hidden="true">
                    →
                  </div>

                  {/* Step 3 — Code */}
                  <div className="bg-white/[0.04] border border-white/10 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 rounded bg-white/10 border border-white/15 flex items-center justify-center text-white/80 text-[10px] font-bold">
                        {'</>'}
                      </span>
                      <span className="text-white/70 text-[12px] font-semibold">Component code</span>
                    </div>
                    <div className="font-mono text-[10px] space-y-1">
                      <div>
                        <span className="text-blue-300">const</span> <span className="text-white/90">Button</span>{' '}
                        <span className="text-white/50">= ()</span>
                      </div>
                      <div className="ml-2 text-white/50">{'<button style={{'}</div>
                      <div className="ml-4">
                        <span className="text-white/80">bg</span>
                        <span className="text-white/50">: </span>
                        <span className="text-blue-300">color.primary</span>
                      </div>
                      <div className="ml-4">
                        <span className="text-white/80">p</span>
                        <span className="text-white/50">: </span>
                        <span className="text-blue-300">spacing.md</span>
                      </div>
                      <div className="ml-2 text-white/50">{'}}>'}</div>
                    </div>
                    <div className="font-mono text-[9px] text-white/30 mt-3 uppercase tracking-wider">Step 3 · IDE updates</div>
                  </div>
                </div>

                {/* Latency badge */}
                <div className="relative z-10 mt-6 flex justify-center">
                  <div className="inline-flex items-center gap-2 bg-blue-600/10 border border-blue-500/30 rounded-full px-4 py-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-blue-300 text-[11px] font-mono uppercase tracking-widest">
                      End-to-end latency: ~30s
                    </span>
                  </div>
                </div>
              </div>

              {/* Why it changes everything */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-black/[0.04] border border-black/10 rounded-2xl p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-semibold mb-3">
                    Traditional handoff
                  </div>
                  <div className="space-y-1.5 text-[13px] text-black/60">
                    <div>· Designer takes Figma screenshot</div>
                    <div>· Sends in Slack with annotations</div>
                    <div>· Developer eyeballs hex code</div>
                    <div>· 2–3 review rounds for spacing</div>
                    <div className="pt-2 border-t border-black/10 mt-2 font-semibold text-black/70">
                      Total: 2–3 days · high error rate
                    </div>
                  </div>
                </div>
                <div className="bg-white/70 border border-blue-600/30 rounded-2xl p-5">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-semibold mb-3">
                    With Figma MCP
                  </div>
                  <div className="space-y-1.5 text-[13px] text-black/75">
                    <div>· Designer changes a Figma variable</div>
                    <div>· MCP server reads + generates tokens</div>
                    <div>· Developer's IDE syncs automatically</div>
                    <div>· Component reflects change instantly</div>
                    <div className="pt-2 border-t border-blue-600/15 mt-2 font-semibold text-blue-800">
                      Total: ~30 seconds · zero interpretation
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Constraint Callout */}
            <div className="bg-[#1a1815] rounded-2xl p-8 sm:p-12 my-12 relative overflow-hidden">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />
              <div className="relative z-10 max-w-3xl">
                <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-5">The constraint</div>
                <blockquote
                  className="text-[22px] sm:text-[28px] font-semibold mb-5 text-white/95 leading-snug"
                  style={{ fontFamily: 'var(--font-heading)', textWrap: 'balance' }}
                >
                  "I'm a product designer. Zero coding background. Publishing an npm package is an engineer's job —
                  except we had no engineers available."
                </blockquote>
                <p className="text-[16px] leading-relaxed text-white/60">
                  Leadership's question: "Can you ship this without engineering support?" My answer: "Yes, if I use
                  AI as my pair programmer." Claude Code and Cursor became my engineering partners — they handled
                  architecture and implementation while I drove product decisions. The 1.5-week timeline forced
                  ruthless prioritization.
                </p>
              </div>
            </div>

            {/* Proof: AI Session */}
            <div className="mb-12">
              <ProofFrame
                label="Claude Code / Cursor"
                title="AI-Assisted Engineering Session"
                desc="Screenshot of Claude Code or Cursor mid-session — ARIA implementation, component architecture, or TypeScript prop definitions being generated"
              />
              <Caption>↑ Proof: what "AI as pair programmer" actually looked like in practice</Caption>
            </div>

            {/* Phase 2 */}
            <div>
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="bg-blue-600 text-white font-mono text-[11px] font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest">
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
                    did: "Designed every component's prop API for ergonomics — intuitive naming, sensible defaults, composability over configuration.",
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
                    className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 hover:bg-[#e6e1da] transition-colors duration-200 flex flex-col"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-semibold mb-3">
                      {pillar.area}
                    </div>
                    <div className="mb-4">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-black/35 mb-1.5">What I did</div>
                      <p className="text-[14px] leading-relaxed text-black/70">{pillar.did}</p>
                    </div>
                    <div className="bg-white/70 rounded-xl p-3.5 mt-auto">
                      <div className="font-mono text-[10px] uppercase tracking-widest text-blue-700 mb-1.5">Impact created</div>
                      <p className="text-[13px] leading-relaxed text-black/75 font-medium">{pillar.impact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Timeline ── */}
          <section id="timeline" className="mb-24 scroll-mt-32">
            <SectionLabel>Timeline</SectionLabel>
            <SectionTitle>12 weeks, end-to-end</SectionTitle>
            <Lead>
              From the day the audit landed to the day{' '}
              <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-[14px]">npm install @indigo/prism</code>{' '}
              went live. Six phases, one designer, zero engineers borrowed.
            </Lead>

            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-8">
              {/* Week scale */}
              <div className="hidden sm:grid grid-cols-12 gap-1 mb-3 pl-[148px]">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="font-mono text-[10px] text-black/35 text-center tabular-nums">
                    W{i + 1}
                  </div>
                ))}
              </div>

              {/* Phase rows */}
              <div className="space-y-4">
                {[
                  {
                    phase: 'Discovery & Audit',
                    start: 1,
                    end: 2,
                    output: '12+ patterns catalogued · 34% waste quantified',
                    team: 'Solo + 6 designers + 3 PMs',
                  },
                  {
                    phase: 'Token Architecture',
                    start: 3,
                    end: 4,
                    output: 'Primitive → Semantic → Component pipeline · Figma Variables defined',
                    team: 'Solo, with a11y consultant',
                  },
                  {
                    phase: 'Component Design (Figma)',
                    start: 5,
                    end: 7,
                    output: '37 components · 198 variants · dark mode · responsive',
                    team: 'Solo + 6-designer feedback loop',
                  },
                  {
                    phase: 'Storybook + Documentation',
                    start: 8,
                    end: 9,
                    output: 'Stories for 37 components · a11y addon · prop tables',
                    team: 'Solo, AI-assisted',
                  },
                  {
                    phase: 'AI-Assisted React Engineering',
                    start: 10,
                    end: 11,
                    output: '37 React components · TypeScript props · ARIA implementation',
                    team: 'Solo + Claude Code + Cursor',
                  },
                  {
                    phase: 'npm Packaging & Launch',
                    start: 12,
                    end: 12,
                    output: '@indigo/prism v1.0.0 published · onboarding 3 product teams',
                    team: 'Solo, ship day',
                  },
                ].map((phase, i, arr) => {
                  const width = ((phase.end - phase.start + 1) / 12) * 100;
                  const left = ((phase.start - 1) / 12) * 100;
                  const isLast = i === arr.length - 1;
                  return (
                    <div key={i} className="grid sm:grid-cols-[148px_1fr] gap-3 sm:gap-4 items-start">
                      {/* Phase label */}
                      <div className="pt-1">
                        <div className="text-[13px] font-semibold text-black/85 leading-tight">{phase.phase}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-black/40 mt-1 tabular-nums">
                          W{phase.start}
                          {phase.end !== phase.start ? `–${phase.end}` : ''}
                        </div>
                      </div>
                      {/* Bar + detail */}
                      <div>
                        <div className="relative h-7 bg-black/5 rounded-md overflow-hidden">
                          <div
                            className={`absolute top-0 bottom-0 rounded-md flex items-center px-3 ${
                              isLast ? 'bg-blue-600' : 'bg-black/80'
                            }`}
                            style={{ left: `${left}%`, width: `${width}%` }}
                          >
                            <span className="text-white font-mono text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap">
                              {phase.end === phase.start ? '1 week' : `${phase.end - phase.start + 1} weeks`}
                            </span>
                          </div>
                        </div>
                        <div className="mt-2 bg-black/[0.04] rounded-md px-3 py-2 text-[12px] leading-relaxed">
                          <span className="font-semibold text-black/75">Output: </span>
                          <span className="text-black/65">{phase.output}</span>
                          <span className="text-black/35 ml-2">· {phase.team}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Milestone markers */}
              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-black/50">
                  <span>
                    <span className="font-bold text-black/80">Week 2:</span> Leadership pitch approved
                  </span>
                  <span>
                    <span className="font-bold text-black/80">Week 7:</span> Figma library v1 frozen
                  </span>
                  <span>
                    <span className="font-bold text-black/80">Week 11:</span> Live Figma MCP demo for dev team
                  </span>
                  <span>
                    <span className="font-bold text-black/80">Week 12:</span> npm package shipped · 3 teams onboarded
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* ── Library ── */}
          <section id="library" className="mb-16 scroll-mt-32">
            <SectionLabel>Library</SectionLabel>
            <SectionTitle className="mb-3">37 components. 6 categories. 1 install.</SectionTitle>
            <Lead className="mb-8">
              Every component ships with WCAG 2.1 AA compliance, TypeScript types, and full Storybook
              documentation. Filter by category to explore the library.
            </Lead>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-colors duration-200 ${
                  activeCategory === 'All'
                    ? 'bg-black text-white border-black'
                    : 'bg-white/50 border-black/15 text-black/60 hover:bg-white/80 hover:text-black'
                }`}
              >
                All <span className="ml-1 opacity-60 tabular-nums">37</span>
              </button>
              {componentCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-medium border transition-colors duration-200 ${
                    activeCategory === cat.name
                      ? 'bg-black text-white border-black'
                      : 'bg-white/50 border-black/15 text-black/60 hover:bg-white/80 hover:text-black'
                  }`}
                >
                  {cat.name} <span className="ml-1 opacity-60 tabular-nums">{cat.count}</span>
                </button>
              ))}
            </div>

            {/* Component Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {filteredComponents.map((comp, i) => (
                <div
                  key={`${comp.name}-${i}`}
                  className="bg-white/60 border border-black/10 rounded-xl px-3 py-3 text-center hover:border-black/25 hover:bg-white/80 transition-colors duration-200 cursor-default"
                >
                  <div className="text-[12px] font-medium text-black/75 leading-tight">{comp.name}</div>
                  <div className="font-mono text-[9px] text-black/35 mt-1 uppercase tracking-wider">
                    {comp.category.split(' ')[0]}
                  </div>
                </div>
              ))}
            </div>

            <Caption>
              {filteredComponents.length} of 37 components shown · all ship with WCAG AA + TypeScript + Storybook
            </Caption>
          </section>

          {/* Proof: Phase 2 Deliverables */}
          <div className="mb-24">
            <div className="grid sm:grid-cols-2 gap-4">
              {/* npm placeholder */}
              <ProofFrame
                label="npm"
                title="Package on npm Registry"
                desc="Screenshot of @indigo/prism on npmjs.com — weekly downloads, version, bundle size"
              />

              {/* Real code snippet card */}
              <div className="rounded-2xl bg-[#1a1815] overflow-hidden border border-white/5">
                {/* Editor chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-black/25 border-b border-white/5">
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                  <span className="w-3 h-3 rounded-full bg-white/15" />
                  <span className="ml-3 font-mono text-[11px] text-white/30">BookingForm.tsx</span>
                </div>
                {/* Code content */}
                <div className="p-5 font-mono text-[12px] leading-[1.8] overflow-x-auto">
                  <div>
                    <span className="text-blue-300">import</span>
                    <span className="text-white/70"> {'{ '}</span>
                    <span className="text-white/90">Button</span>
                    <span className="text-white/70">, </span>
                    <span className="text-white/90">Input</span>
                    <span className="text-white/70">, </span>
                    <span className="text-white/90">Toast</span>
                    <span className="text-white/70">{' }'} </span>
                    <span className="text-blue-300">from</span>
                    <span className="text-white/55"> '@indigo/prism'</span>
                  </div>
                  <div className="mt-3">
                    <span className="text-blue-300">export default function</span>
                    <span className="text-white/90"> BookingForm</span>
                    <span className="text-white/70">() {'{'}</span>
                  </div>
                  <div className="ml-4">
                    <span className="text-blue-300">return</span>
                    <span className="text-white/70"> (</span>
                  </div>
                  <div className="ml-6 text-white/90">&lt;Input</div>
                  <div className="ml-8">
                    <span className="text-white/80">label</span>
                    <span className="text-white/50">=</span>
                    <span className="text-white/55">"Destination"</span>
                  </div>
                  <div className="ml-8">
                    <span className="text-white/80">placeholder</span>
                    <span className="text-white/50">=</span>
                    <span className="text-white/55">"DEL → BOM"</span>
                  </div>
                  <div className="ml-6 text-white/90">/&gt;</div>
                  <div className="ml-6 text-white/90">&lt;Button</div>
                  <div className="ml-8">
                    <span className="text-white/80">variant</span>
                    <span className="text-white/50">=</span>
                    <span className="text-white/55">"primary"</span>
                    <span className="text-white/80"> size</span>
                    <span className="text-white/50">=</span>
                    <span className="text-white/55">"md"</span>
                  </div>
                  <div className="ml-6">
                    <span className="text-white/70">&gt;</span>
                    <span className="text-white/60">Book Flight</span>
                    <span className="text-white/90">&lt;/Button&gt;</span>
                  </div>
                  <div className="ml-4 text-white/70">)</div>
                  <div className="text-white/70">{'}'}</div>
                  <div className="mt-3 text-[10px]">
                    <span className="text-white/20">{'// '}</span>
                    <span className="text-white/30">WCAG AA · TypeScript typed · zero config</span>
                  </div>
                </div>
              </div>
            </div>
            <Caption>↑ Proof: Prism shipped to production — a real npm package, not a Figma deliverable</Caption>
          </div>

          {/* ── Benchmark ── */}
          <section id="comparison" className="mb-24 scroll-mt-32">
            <SectionLabel>Benchmark</SectionLabel>
            <SectionTitle>Where Prism sits in the design system landscape</SectionTitle>
            <Lead>
              Apples-to-oranges, granted — Prism is an internal system for 3 products, not a public OSS library.
              But the velocity gap and ownership structure are the story.
            </Lead>

            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl overflow-hidden">
              {/* Table header */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-2 sm:gap-4 bg-black/5 px-4 sm:px-6 py-3 border-b border-black/10">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">System</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">Time to v1</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold hidden sm:block">Team</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">Components</div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">A11y</div>
              </div>

              {/* Rows */}
              {[
                { name: 'Material UI', sub: 'Google · OSS', time: '~18 months', team: '12+ eng', comp: '70+', a11y: 'Retrofitted', highlight: false },
                { name: 'Atlassian Mosaic', sub: 'Internal · scaled', time: '~24 months', team: '20+ eng', comp: '50+', a11y: 'WCAG AA', highlight: false },
                { name: 'Shopify Polaris', sub: 'Public · OSS', time: '~14 months', team: '8+ eng', comp: '60+', a11y: 'WCAG AA', highlight: false },
                { name: 'IBM Carbon', sub: 'Enterprise · OSS', time: '~24 months', team: '15+ eng', comp: '60+', a11y: 'WCAG AA', highlight: false },
                { name: 'Prism', sub: '@indigo/prism · internal', time: '11 weeks', team: '1 designer + AI', comp: '37', a11y: 'WCAG AA, day-1', highlight: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-[1.4fr_1fr_1fr_1fr_1fr] gap-2 sm:gap-4 px-4 sm:px-6 py-4 items-center ${
                    i !== 0 ? 'border-t border-black/5' : ''
                  } ${row.highlight ? 'bg-white/70 border-l-[3px] border-l-blue-600' : ''}`}
                >
                  <div>
                    <div className={`text-[14px] font-semibold ${row.highlight ? 'text-black' : 'text-black/85'}`}>
                      {row.name}
                    </div>
                    <div className={`text-[11px] ${row.highlight ? 'text-blue-700' : 'text-black/40'}`}>{row.sub}</div>
                  </div>
                  <div className={`text-[13px] tabular-nums ${row.highlight ? 'text-black font-semibold' : 'text-black/70 font-medium'}`}>
                    {row.time}
                  </div>
                  <div className={`text-[13px] hidden sm:block ${row.highlight ? 'text-black font-semibold' : 'text-black/70'}`}>
                    {row.team}
                  </div>
                  <div className={`text-[13px] tabular-nums ${row.highlight ? 'text-black font-semibold' : 'text-black/70 font-medium'}`}>
                    {row.comp}
                  </div>
                  <div className={`text-[12px] ${row.highlight ? 'text-black font-semibold' : 'text-black/65'}`}>
                    {row.a11y}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                {
                  stat: '~50×',
                  desc: 'Faster v1 vs industry average — proving AI-assisted single-designer workflows compress timelines.',
                },
                {
                  stat: '92%',
                  desc: "Coverage of Indigo's actual UI surface with just 37 components — ruthless 80/20 scoping.",
                },
                {
                  stat: 'Day 1',
                  desc: 'WCAG AA from the first component, not retrofitted — saving 3–6 months of remediation later.',
                },
              ].map((item, i) => (
                <div key={i} className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl px-5 py-4">
                  <div
                    className="text-[26px] font-bold text-black tabular-nums mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.stat}
                  </div>
                  <div className="text-[12px] text-black/55 leading-relaxed">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── Impact ── */}
          <section id="impact" className="mb-16 scroll-mt-32">
            <SectionLabel>Impact</SectionLabel>
            <SectionTitle className="mb-8">Measurable outcomes: what changed after Prism</SectionTitle>

            {/* Benefits — 3 pillars before raw numbers */}
            <div className="grid sm:grid-cols-3 gap-4 mb-10">
              {[
                {
                  title: 'Ship faster',
                  stat: '47% less rebuild time',
                  desc: 'Teams stopped rebuilding the same components every sprint. That capacity went to features that actually moved the product forward.',
                },
                {
                  title: 'Stay consistent',
                  stat: '12 patterns → 1 system',
                  desc: 'Three separate products, one visual language. Users stopped noticing the seams between products. Brand trust compounded.',
                },
                {
                  title: 'Ship accessible',
                  stat: '100% WCAG 2.1 AA',
                  desc: 'Not retrofitted after the fact — baked in from component zero. Every developer who used npm install @indigo/prism got accessibility for free.',
                },
              ].map((benefit, i) => (
                <div key={i} className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6">
                  <div className="font-mono text-[11px] font-bold uppercase tracking-widest mb-2 text-blue-700">
                    {benefit.stat}
                  </div>
                  <h3 className="text-[18px] font-semibold mb-2 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                    {benefit.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-black/60">{benefit.desc}</p>
                </div>
              ))}
            </div>

            {/* ROI Framing */}
            <div className="border-l-[3px] border-black/70 bg-white/50 rounded-r-2xl px-6 py-4 mb-10">
              <p className="text-[15px] leading-relaxed text-black/70">
                <span className="font-semibold text-black/90">The cost of inaction: </span>
                34% of a 6-engineer sprint team over 3 months ≈ the equivalent of ~500 engineering hours wasted on
                redundant component work — before Prism existed.
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
                <div key={i} className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 text-center">
                  <div
                    className="text-[48px] font-bold text-black mb-2 tabular-nums tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {stat.value}
                  </div>
                  <div className="font-mono text-[10px] text-black/50 uppercase tracking-wider leading-relaxed">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Before/After Table */}
            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="bg-black/5 border-b border-black/10">
                    <th className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">Metric</th>
                    <th className="text-left p-4 font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">Before Prism</th>
                    <th className="text-right p-4 font-mono text-[10px] uppercase tracking-widest text-black/55 font-semibold">After Prism</th>
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
                      <td className="p-4 text-[14px] font-medium text-black/85">{row[0]}</td>
                      <td className="p-4 text-[14px] text-black/50">{row[1]}</td>
                      <td className="p-4 text-[14px] text-right font-semibold text-blue-800 tabular-nums">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Proof: Before / After UI */}
          <div className="mb-24">
            <div className="relative rounded-2xl bg-[#1a1815] overflow-hidden min-h-[280px] flex items-center justify-center">
              <div
                className="absolute inset-0"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
              />
              {/* Vertical divider */}
              <div className="absolute inset-y-0 left-1/2 w-px bg-white/10 z-10" />
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/10 text-white/40 font-mono text-[10px] uppercase tracking-widest px-3 py-1 rounded-full z-20">
                Before → After
              </div>
              <div className="relative z-10 grid grid-cols-2 w-full h-full">
                {[
                  {
                    side: 'Before Prism',
                    desc: 'Product screenshot showing inconsistent UI — 5 different button styles, mismatched inputs, visual fragmentation across 3 products',
                  },
                  {
                    side: 'After Prism',
                    desc: 'Same product screenshot after Prism adoption — unified components, consistent spacing, one visual language',
                  },
                ].map((p, i) => (
                  <div key={i} className="flex flex-col items-center justify-center text-center px-8 py-12">
                    <div className="font-mono text-[11px] text-white/25 uppercase tracking-widest mb-3">{p.side}</div>
                    <div className="text-[12px] text-white/30 leading-relaxed max-w-[200px]">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <Caption>↑ Proof: visual before/after — the difference Prism made in the actual product</Caption>
          </div>

          {/* ── In Production ── */}
          <section id="wild" className="mb-24 scroll-mt-32">
            <SectionLabel>In Production</SectionLabel>
            <SectionTitle>Prism in the wild</SectionTitle>
            <Lead className="mb-8">
              Prism wasn't a Figma deliverable. It shipped into three live Indigo products — flight booking, seat
              selection, and passenger management. Here's what it looked like in a real product screen.
            </Lead>

            <div className="bg-[#1a1815] rounded-2xl overflow-hidden">
              <div className="grid sm:grid-cols-[1fr_360px]">
                {/* Left — Product screen mock */}
                <div className="relative min-h-[380px] flex items-center justify-center p-10 border-b sm:border-b-0 sm:border-r border-white/5">
                  <div
                    className="absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                  />

                  {/* Mocked product UI frame */}
                  <div className="relative z-10 w-full max-w-[340px] bg-white/[0.04] rounded-xl border border-white/10 overflow-hidden shadow-2xl">
                    {/* App top bar */}
                    <div className="bg-black/30 px-4 py-3 flex items-center justify-between border-b border-white/5">
                      <span className="text-white/60 text-[12px] font-medium">IndiGo · Book Flight</span>
                      <span className="text-white/25 font-mono text-[10px]">v2.4.1</span>
                    </div>
                    {/* Tabs — Prism Navigation/Tabs component */}
                    <div className="flex gap-0 border-b border-white/5">
                      {['One Way', 'Round Trip', 'Multi-City'].map((tab, i) => (
                        <div
                          key={i}
                          className={`px-4 py-2.5 text-[11px] font-medium ${
                            i === 0 ? 'text-blue-400 border-b-2 border-blue-400' : 'text-white/35'
                          }`}
                        >
                          {tab}
                        </div>
                      ))}
                    </div>
                    {/* Form area */}
                    <div className="p-4 space-y-3">
                      {/* Input component */}
                      <div className="bg-black/30 rounded-lg border border-white/10 px-3 py-2.5">
                        <div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mb-1">From</div>
                        <div className="text-[13px] text-white/70">New Delhi — DEL</div>
                      </div>
                      <div className="bg-black/30 rounded-lg border border-white/10 px-3 py-2.5">
                        <div className="font-mono text-[9px] text-white/30 uppercase tracking-wider mb-1">To</div>
                        <div className="text-[13px] text-white/50 italic">Select destination</div>
                      </div>
                      {/* Button — Prism Button component */}
                      <div className="bg-blue-600 rounded-lg py-2.5 text-center">
                        <span className="text-white text-[13px] font-semibold">Search Flights</span>
                      </div>
                    </div>
                    {/* Toast — Prism Toast component */}
                    <div className="mx-4 mb-4 bg-white/5 border border-white/15 rounded-lg px-3 py-2 flex items-center gap-2">
                      <span className="text-blue-400 text-[12px]">✓</span>
                      <span className="text-white/60 text-[11px]">Prices updated for your route</span>
                    </div>
                  </div>
                </div>

                {/* Right — Component callouts */}
                <div className="p-8 flex flex-col justify-center gap-4">
                  <div className="font-mono text-[11px] uppercase tracking-widest text-white/30 mb-2">
                    Prism components used
                  </div>
                  {[
                    { component: 'Tabs', variant: 'Navigation · Underline variant' },
                    { component: 'Input', variant: 'Forms · With label + placeholder' },
                    { component: 'Button', variant: 'Forms · Primary · Size md' },
                    { component: 'Toast', variant: 'Feedback · Success state' },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-blue-500/70 pl-4">
                      <div className="text-white/85 text-[14px] font-semibold mb-1">{item.component}</div>
                      <div className="inline-flex items-center border border-white/15 bg-white/5 text-white/55 font-mono text-[10px] px-2 py-0.5 rounded-full">
                        {item.variant}
                      </div>
                    </div>
                  ))}
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <div className="text-white/30 text-[11px] leading-relaxed">
                      All 4 components ship with WCAG 2.1 AA, TypeScript props, and Storybook stories. The
                      developer wrote zero custom a11y code.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ── Praise ── */}
          <section id="praise" className="mb-24 scroll-mt-32">
            <SectionLabel>Praise</SectionLabel>
            <SectionTitle>What the team said</SectionTitle>
            <Lead>
              The metrics tell the quantitative story. These are the qualitative wins — in the words of the people
              who used Prism every day.
            </Lead>

            <div className="grid sm:grid-cols-3 gap-4">
              {[
                {
                  quote:
                    'Before Prism, design handoff was a guessing game. With the Figma MCP integration, I import directly from @indigo/prism and the component is already pixel-perfect. We stopped having "is this the right blue?" Slack threads.',
                  name: 'S.K.',
                  role: 'Lead Frontend Engineer',
                  team: 'Booking Platform',
                },
                {
                  quote:
                    "One Figma library means we're finally designing in the same language. My handoff time dropped from 3 days to half a day. I get to spend that time on UX problems that actually matter — not chasing pixel inconsistency.",
                  name: 'P.M.',
                  role: 'Sr. Product Designer',
                  team: 'Loyalty & CRM',
                },
                {
                  quote:
                    "A 34% dev capacity recovery is huge. That's an entire engineer back on roadmap work every sprint. Prism paid for its own development cost within the first 6 weeks of adoption.",
                  name: 'R.S.',
                  role: 'Product Manager',
                  team: 'Platform Engineering',
                },
              ].map((t, i) => (
                <div key={i} className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 flex flex-col">
                  {/* Quote mark */}
                  <div className="text-[48px] leading-none text-black/10 font-serif -mt-2 mb-1" aria-hidden="true">
                    "
                  </div>

                  {/* Quote */}
                  <p className="text-[14px] leading-relaxed text-black/75 mb-6 flex-1 italic">{t.quote}</p>

                  {/* Attribution */}
                  <div className="flex items-center gap-3 pt-4 border-t border-black/5">
                    <div className="w-10 h-10 rounded-xl bg-black flex items-center justify-center text-white text-[13px] font-bold shrink-0">
                      {t.name.replace(/\./g, '')}
                    </div>
                    <div>
                      <div className="text-[13px] font-semibold text-black">{t.name}</div>
                      <div className="text-[11px] text-black/55">{t.role}</div>
                      <div className="font-mono text-[10px] text-black/35 mt-0.5 uppercase tracking-wider">{t.team}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Caption>↑ Names abbreviated to respect internal NDAs · full references available on request</Caption>
          </section>

          {/* ── Learnings ── */}
          <section id="learnings" className="mb-24 scroll-mt-32">
            <SectionLabel>Learnings</SectionLabel>
            <SectionTitle className="mb-10">Key insights</SectionTitle>

            <div className="grid sm:grid-cols-2 gap-4">
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
                <div
                  key={i}
                  className="bg-white/50 border border-black/10 rounded-2xl p-6 hover:border-black/20 hover:bg-white/70 transition-colors duration-200"
                >
                  <div
                    className="text-[40px] font-bold text-black/10 mb-2 tabular-nums"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {learning.num}
                  </div>
                  <h3 className="text-[18px] font-semibold mb-3 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                    {learning.title}
                  </h3>
                  <p className="text-[14px] leading-relaxed text-black/60">{learning.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Footer CTA ── */}
          <div className="bg-[#1a1815] rounded-2xl overflow-hidden relative">
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)', backgroundSize: '24px 24px' }}
            />

            <div className="relative z-10 p-8 sm:p-12">
              {/* Closing quote */}
              <div className="text-center max-w-3xl mx-auto mb-12">
                <div className="font-mono text-[11px] uppercase tracking-widest text-blue-400 mb-5">The closing note</div>
                <p
                  className="text-[20px] sm:text-[28px] italic text-white/90 leading-relaxed"
                  style={{ textWrap: 'balance' }}
                >
                  "The npm package was when Prism stopped being a designer's artifact and became a developer's tool
                  — WCAG compliance included, automatically, on every install. That's when the ROI became
                  undeniable."
                </p>
              </div>

              {/* Action cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
                {[
                  {
                    label: 'npm package',
                    title: '@indigo/prism',
                    desc: 'Weekly downloads, version history, and bundle size',
                    cta: 'Available on request',
                    href: null,
                  },
                  {
                    label: 'Storybook',
                    title: 'Live Documentation',
                    desc: 'All 37 components with interactive props and a11y panel',
                    cta: 'Available on request',
                    href: null,
                  },
                  {
                    label: 'More work',
                    title: 'Browse case studies',
                    desc: 'See more design × engineering case studies from my portfolio',
                    cta: 'See all work',
                    href: '/',
                  },
                  {
                    label: 'Contact',
                    title: "Let's build together",
                    desc: 'Working on design systems, MCP tooling, or AI workflows? Reach out.',
                    cta: 'Get in touch',
                    href: 'mailto:yogesh.ai.ux@gmail.com',
                  },
                ].map((card, i) => {
                  const cardContent = (
                    <>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-blue-400 font-semibold mb-2">
                        {card.label}
                      </div>
                      <div className="text-[16px] font-semibold text-white mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                        {card.title}
                      </div>
                      <p className="text-[12px] text-white/50 leading-relaxed mb-4 flex-1">{card.desc}</p>
                      <div
                        className={`text-[12px] font-medium inline-flex items-center gap-1.5 transition-colors ${
                          card.href ? 'text-blue-300 group-hover:text-blue-200' : 'text-white/35'
                        }`}
                      >
                        {card.cta}
                        {card.href && (
                          <span className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true">→</span>
                        )}
                      </div>
                    </>
                  );
                  const className =
                    'group bg-white/5 border border-white/10 rounded-xl p-5 flex flex-col transition-colors duration-200';
                  const interactive = `${className} hover:bg-white/10 hover:border-white/20`;

                  if (!card.href) {
                    return (
                      <div key={i} className={className}>
                        {cardContent}
                      </div>
                    );
                  }
                  return card.href.startsWith('/') ? (
                    <Link key={i} to={card.href} className={interactive}>
                      {cardContent}
                    </Link>
                  ) : (
                    <a key={i} href={card.href} className={interactive}>
                      {cardContent}
                    </a>
                  );
                })}
              </div>

              {/* Final tagline */}
              <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
                <div>
                  <div className="text-[14px] text-white/80 font-semibold">Prism · @indigo/prism v1.0.0</div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    37 components · 198 variants · WCAG 2.1 AA · Shipped Q3 2024
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Case study</span>
                  <span className="font-mono text-[10px] text-white/25">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">~8 min read</span>
                  <span className="font-mono text-[10px] text-white/25">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400">v3.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
