import { Fragment, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/*
 * Prism case study - visual system
 * Surfaces:  paper #ede9e3 (border #d8d2c8) · dark #1a1815 (border white/10)
 * Accent:    blue-600 only. Everything else is black at varying opacity.
 * Labels:    font-mono, 11px, uppercase, tracking-widest - same as homepage.
 *
 * Real assets still needed (replace the matching ProofFrame / QuotePlaceholder):
 *  1. Figma library screenshot - component list view, organised by category
 *  2. Audit/research synthesis screenshot - FigJam or Notion, from the discovery phase
 *  3. Storybook screenshot - one component with prop table + a11y panel open
 *  4. npm registry screenshot - @indigo/prism listing page
 *  5. In-product screenshot - a real screen built from Prism, ideally before/after
 *  6. 2 testimonials with real attribution (name, role, and how it was sourced)
 */

const TOC_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'problem', label: 'Problem' },
  { id: 'users', label: 'Users' },
  { id: 'role', label: 'My Role' },
  { id: 'decisions', label: 'Decisions' },
  { id: 'shipped', label: 'How It Shipped' },
  { id: 'friction', label: 'Friction' },
  { id: 'adoption', label: 'Adoption' },
  { id: 'impact', label: 'Impact' },
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

/* Placeholder for a testimonial pending real attribution - deliberately looks unfinished */
const QuotePlaceholder = ({ role }: { role: string }) => (
  <div className="border-2 border-dashed border-black/15 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[240px]">
    <div className="inline-flex items-center gap-2 bg-black/5 border border-black/10 rounded-full px-3 py-1 mb-4">
      <span className="font-mono text-[10px] text-black/40 uppercase tracking-widest">Pending real quote</span>
    </div>
    <div className="text-[13px] font-medium text-black/50 mb-1.5">{role}</div>
    <p className="text-[12px] text-black/35 leading-relaxed max-w-[220px]">
      Replace with a real quote, attributed by name where possible - plus how it was sourced (Slack, email, recognition doc).
    </p>
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
      {/* Sticky Side TOC - desktop only */}
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
          <div id="overview" className="mb-16 scroll-mt-32">
            {/* Context tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              {['Design System', 'npm Package', '6-person team → solo', 'AI-assisted', 'Still maintained'].map((tag, i) => (
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

            <p className="text-[18px] sm:text-[21px] leading-[1.65] text-black/60 mb-8 max-w-3xl">
              Indigo had six designers maintaining six separate Figma files and no shared components across three
              products - burning over a third of engineering capacity rebuilding the same UI every sprint.
            </p>

            {/* TL;DR */}
            <div className="border-l-[3px] border-blue-600 bg-white/50 rounded-r-2xl p-6 sm:p-8 mb-12 max-w-3xl">
              <div className="font-mono text-[11px] uppercase tracking-widest text-blue-700 mb-3">TL;DR</div>
              <p className="text-[16px] sm:text-[18px] leading-relaxed text-black/75">
                I led Prism - Indigo's first shared design system - from a leadership-commissioned audit to a
                published npm package now used across all three products. Phase 1 was a month-long collaborative
                build with 6 designers; Phase 2 was a 1.5-week solo, AI-assisted engineering sprint because no
                engineer was available. Eighteen months later it's still the team's source of truth, with three
                other designers now contributing components of their own.
              </p>
            </div>

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
                    label="Screenshot needed"
                    title="Prism Component Library"
                    desc="Figma library, list view - all 37 components, organised by category"
                    minH="min-h-[280px] h-full"
                  />
                </div>
                <Caption>↑ Proof: 1 Figma library that replaced 6 fragmented files</Caption>
              </div>
            </div>
          </div>

          {/* ── Problem ── */}
          <section id="problem" className="mb-24 scroll-mt-32">
            <SectionLabel>Problem</SectionLabel>
            <SectionTitle className="mb-6">A post-launch audit exposed the cost of chaos</SectionTitle>

            <p className="text-[18px] sm:text-[20px] leading-relaxed text-black/70 mb-10 max-w-3xl">
              After three product launches in six months, leadership commissioned a UX consistency audit. It found
              12+ conflicting UI patterns, 34% of engineering time spent rebuilding the same components sprint over
              sprint, and a 23% spike in customer complaints about inconsistent experiences. That audit became my
              brief - and the two audiences who'd never been aligned were the six designers each maintaining their
              own Figma file, and the developers with no shared implementation to build from.
            </p>

            {/* Discovery Cards */}
            <div className="grid sm:grid-cols-3 gap-4 mb-12">
              {[
                {
                  method: 'Team feedback',
                  title: 'Internal design team (6 designers)',
                  desc: 'Collected feedback from all 6 designers - everyone maintained separate Figma files with zero shared component library. No single source of truth.',
                  finding: '"We all know it\'s broken. No one owns fixing it."',
                },
                {
                  method: 'Interviews',
                  title: 'Stakeholder interviews',
                  desc: 'Interviewed 4 Sr. Designers, 3 Product Managers, and leadership. Key insight: "Why are design and tech never in sync?" - a question both sides were asking.',
                  finding: 'Leadership was actively looking for a solution, not just tolerating the pain.',
                },
                {
                  method: 'Audit',
                  title: 'Product audit',
                  desc: 'Audited 3 recently launched products - found 12+ inconsistent UI patterns: 5 button styles, 4 card variants, 3 input treatments, all with different behavior.',
                  finding: 'The inconsistency was invisible to individual teams but glaring at the system level.',
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

            {/* Visual: audit room + research wall */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              <div className="flex flex-col">
                <ProofFrame
                  label="Photo needed"
                  title="Team in the Room"
                  desc="Photo from the initial stakeholder session or design review - people around a table, whiteboard visible"
                  minH="min-h-[200px]"
                />
                <Caption>↑ Kick-off: 6 designers + 3 PMs in one room for the first time</Caption>
              </div>
              <div className="flex flex-col">
                <ProofFrame
                  label="Photo or screenshot needed"
                  title="Research Wall / FigJam Synthesis"
                  desc="Sticky notes from the product audit, or a FigJam board showing 12+ inconsistent patterns mapped out"
                  minH="min-h-[200px]"
                />
                <Caption>↑ What the audit uncovered - 12+ patterns, zero shared ownership</Caption>
              </div>
            </div>

            {/* Problem Statement Box */}
            <div className="bg-[#1a1815] rounded-2xl p-8 sm:p-10 relative overflow-hidden mb-8">
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
                  3-5x industry standard - all because there was no single source of truth for components, in
                  design or code.
                </p>
              </div>
            </div>

            <ProofFrame
              label="Screenshot needed"
              title="Audit & Research Synthesis"
              desc="Audit spreadsheet or FigJam/Notion synthesis - the evidence that quantified 34% dev waste and secured leadership buy-in"
            />
          </section>

          {/* ── My Role ── */}
          <section id="role" className="mb-24 scroll-mt-32">
            <SectionLabel>My Role</SectionLabel>
            <SectionTitle>What I owned, what I shared</SectionTitle>
            <Lead>
              Phase 1 was a team effort - six designers, three PMs, and an accessibility consultant, all aligning
              on one system for the first time. Phase 2 was solo out of necessity, not preference: no engineer was
              available, so I paired with AI to ship the code myself. Here's exactly where each applies.
            </Lead>

            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl overflow-hidden">
              {[
                { area: 'Strategy & Discovery', detail: 'Audit, stakeholder interviews, problem framing, leadership pitch', owned: true },
                { area: 'Design System Architecture', detail: 'Token hierarchy, component taxonomy, naming conventions, API design', owned: true },
                { area: 'Component Design & Tokens', detail: '37 components, 198 variants in Figma, plus the primitive → semantic → component token pipeline', owned: true },
                { area: 'Accessibility (WCAG 2.1 AA)', detail: 'Spec definition with external consultant, ARIA implementation, keyboard nav', owned: false },
                { area: 'React + TypeScript Engineering', detail: '37 components, prop typings, build pipeline, npm packaging - AI pair-programmed', owned: true },
                { area: 'Stakeholder Management & Adoption', detail: 'Designer alignment, dev skepticism handling, leadership reporting, ongoing contribution process', owned: true },
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
                Owned - I drove the work end-to-end
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="w-2 h-2 rounded-full border border-black/40" />
                Co-owned - shared with an external consultant
              </span>
            </div>
          </section>

          {/* ── Decisions ── */}
          <section id="decisions" className="mb-24 scroll-mt-32">
            <SectionLabel>Decisions</SectionLabel>
            <SectionTitle>2 hard decisions that shaped Prism</SectionTitle>
            <Lead>
              Every design system is a stack of trade-offs. These are the two I lost sleep over - and the
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
                    'Indigo needed a token-first API where every component theme flowed from Figma variables. Forking Radix would have meant fighting their styling assumptions forever. The 4-week cost bought us cleaner long-term ownership.',
                  risk: 'Higher upfront effort. Mitigated by AI-assisted engineering in Phase 2.',
                },
                {
                  num: '02',
                  question: '37 components - or the full 50+ MUI parity?',
                  optionA: { label: '50+ components', desc: 'Match MUI breadth · feature parity · "complete" library' },
                  optionB: { label: '37 components, ruthless cut', desc: 'Cover 92% of actual product usage · ship in 11 weeks · v1 today, not v2 in a year' },
                  chose: 'B',
                  reasoning:
                    'I audited every component used across 3 Indigo products. 37 components covered 92% of all UI surfaces. Adding the next 13 would have doubled the timeline for components developers rarely needed. Ship the 92% library, learn from production, then expand.',
                  risk: 'Future requests for the missing 8% - this had a real cost. See Friction below.',
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

          {/* ── How It Shipped ── */}
          <section id="shipped" className="mb-24 scroll-mt-32">
            <SectionLabel>Contributions</SectionLabel>
            <SectionTitle>Two phases - and one unconventional constraint</SectionTitle>
            <Lead className="mb-10">
              A month of collaborative Figma work, then 1.5 weeks of solo, AI-assisted engineering. 12 weeks,
              end-to-end, zero engineers borrowed.
            </Lead>

            {/* Timeline */}
            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-8 mb-10">
              <div className="hidden sm:grid grid-cols-12 gap-1 mb-3 pl-[148px]">
                {Array.from({ length: 12 }, (_, i) => (
                  <div key={i} className="font-mono text-[10px] text-black/35 text-center tabular-nums">
                    W{i + 1}
                  </div>
                ))}
              </div>

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
                      <div className="pt-1">
                        <div className="text-[13px] font-semibold text-black/85 leading-tight">{phase.phase}</div>
                        <div className="font-mono text-[10px] uppercase tracking-wider text-black/40 mt-1 tabular-nums">
                          W{phase.start}
                          {phase.end !== phase.start ? `–${phase.end}` : ''}
                        </div>
                      </div>
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

              <div className="mt-8 pt-6 border-t border-black/10">
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] text-black/50">
                  <span>
                    <span className="font-bold text-black/80">Week 2:</span> Leadership pitch approved
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

            {/* Design review process */}
            <div className="mb-10">
              <div className="grid sm:grid-cols-[1fr_1.6fr] gap-4 sm:gap-6 mb-4 items-stretch">
                <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-7 flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-semibold mb-3">
                    The process
                  </div>
                  <p className="text-[14px] leading-relaxed text-black/65">
                    No component shipped on my judgment alone. Weeks 5–7 were a standing design crit with the 6-person group -
                    every component got reviewed before being marked stable. Naming, states, and edge cases were contested there,
                    not discovered after handoff. The designers using Prism were also the ones pressure-testing it.
                  </p>
                </div>
                <div className="bg-white/50 border border-black/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-center">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-semibold mb-4">
                    What surfaced in review
                  </div>
                  <div className="space-y-3">
                    {[
                      {
                        tag: 'Naming',
                        finding: 'Two competing conventions - designers were applying tokens differently across products. Made handoff inconsistent.',
                        fix: 'Settled on component.property.state after mapping actual usage frequency across 3 products.',
                      },
                      {
                        tag: 'States',
                        finding: 'Several input and button variants were missing disabled and error states - designers were improvising them per product.',
                        fix: 'Added explicit disabled/error/loading states to all interactive components before marking stable.',
                      },
                      {
                        tag: 'Density',
                        finding: 'Default spacing felt right on desktop, but one product ran a compact data-heavy layout - the components felt over-padded there.',
                        fix: 'Introduced a density prop (default / compact) rather than forking the component per product.',
                      },
                    ].map(({ tag, finding, fix }) => (
                      <div key={tag} className="bg-black/[0.03] border border-black/8 rounded-xl px-4 py-3">
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-[10px] uppercase tracking-widest text-blue-700 font-bold mt-0.5 shrink-0 w-14">{tag}</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[12px] text-black/55 leading-snug mb-1">{finding}</p>
                            <p className="text-[12px] text-black/80 font-medium leading-snug">→ {fix}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="bg-white/50 border border-black/10 rounded-2xl p-5 sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 font-semibold mb-2">
                  Why it mattered
                </div>
                <p className="text-[14px] leading-relaxed text-black/65 max-w-3xl">
                  Decisions got resolved by usage evidence, not seniority. If two designers wanted different Input variants,
                  we checked which pattern appeared more across the 3 products - then picked that one. That's how the crit
                  functioned: less opinion, more signal. The components that came out of weeks 5–7 needed far fewer revision
                  requests after teams actually shipped with them.
                </p>
              </div>
            </div>

            {/* Visual: design crit in session */}
            <div className="grid sm:grid-cols-[1.2fr_1fr] gap-4 mb-10">
              <div className="flex flex-col">
                <ProofFrame
                  label="Photo needed"
                  title="Design Crit in Session"
                  desc="Photo from one of the weeks 5–7 review sessions - designers around a screen, components up for critique, ideally post-its or annotations visible"
                  minH="min-h-[220px] h-full"
                />
                <Caption>↑ Weekly design crit - every component reviewed before marked stable</Caption>
              </div>
              <div className="flex flex-col">
                <ProofFrame
                  label="Photo or screenshot needed"
                  title="Sticky Notes / Component Feedback Wall"
                  desc="Physical sticky notes on a wall or whiteboard with component naming debates, state decisions, or edge case notes from the review sessions"
                  minH="min-h-[220px] h-full"
                />
                <Caption>↑ How Naming, States & Density findings got surfaced and resolved</Caption>
              </div>
            </div>

            {/* Tokens - condensed */}
            <div className="mb-10">
              <h3
                className="text-[26px] sm:text-[32px] mb-3 tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
              >
                One source of truth for every design decision
              </h3>
              <p className="text-[16px] leading-relaxed text-black/60 max-w-2xl mb-6">
                Before Prism, color, spacing, and type values lived across 6 separate Figma files - a brand color
                change meant 6 manual updates and developers eyeballing the hex. A single token pipeline fixed
                that at the system level.
              </p>

              <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-8">
                <div className="font-mono text-[11px] uppercase tracking-widest text-black/40 mb-6">
                  Token pipeline: how values flow through Prism
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr_auto_1fr] gap-4 sm:gap-3 items-stretch">
                  {[
                    {
                      step: '01',
                      level: 'Primitive',
                      label: 'Raw values - no context',
                      tokens: ['#1A1A2E', '#F4F1EC', '16px', '600'],
                    },
                    {
                      step: '02',
                      level: 'Semantic',
                      label: 'Purpose-mapped - "what is it for?"',
                      tokens: ['color.text.primary', 'color.bg.surface', 'spacing.component.md', 'typography.weight.emphasis'],
                    },
                    {
                      step: '03',
                      level: 'Component',
                      label: 'Scoped - "which component?"',
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
            </div>

            {/* Visual: Figma Variables / token screenshot */}
            <div className="mt-6 mb-10">
              <ProofFrame
                label="Screenshot needed"
                title="Figma Variables Panel - Token Hierarchy"
                desc="Screenshot of the Figma Variables panel showing Primitive → Semantic → Component token layers, ideally with a color or spacing collection visible"
                minH="min-h-[200px]"
              />
              <Caption>↑ The actual Figma variables that drive every Prism component</Caption>
            </div>

            {/* Figma MCP - condensed to the comparison only */}
            <div className="mb-10">
              <h3
                className="text-[26px] sm:text-[32px] mb-3 tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
              >
                How Figma MCP closed the design-dev gap
              </h3>
              <p className="text-[16px] leading-relaxed text-black/60 mb-6 max-w-2xl">
                Traditional handoff meant a Figma screenshot, a Slack thread, and a developer guessing the hex.
                With Figma MCP, the developer's IDE reads the design's tokens directly - no screenshot, no
                interpretation.
              </p>

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
            </div>

            {/* Constraint Callout */}
            <div className="bg-[#1a1815] rounded-2xl p-8 sm:p-12 mb-10 relative overflow-hidden">
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
                  "I'm a product designer. Zero coding background. Publishing an npm package is an engineer's job -
                  except we had no engineers available."
                </blockquote>
                <p className="text-[16px] leading-relaxed text-white/60">
                  Leadership's question: "Can you ship this without engineering support?" My answer: "Yes, if I use
                  AI as my pair programmer." Claude Code and Cursor became my engineering partners - they handled
                  architecture and implementation while I drove product decisions. The 1.5-week timeline forced
                  ruthless prioritization.
                </p>
              </div>
            </div>

            <ProofFrame
              label="Screenshot needed"
              title="Storybook Documentation"
              desc="One component's Storybook page - prop table, a11y panel, interactive story"
            />

            {/* Component Library */}
            <div className="mt-12">
              <h3
                className="text-[26px] sm:text-[32px] mb-3 tracking-tight text-black"
                style={{ fontFamily: 'var(--font-heading)', lineHeight: 1.1 }}
              >
                37 components. 6 categories. 1 install.
              </h3>
              <Lead className="mb-6">
                Every component ships with WCAG 2.1 AA compliance, TypeScript types, and full Storybook
                documentation.
              </Lead>

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

              {/* Visual: Storybook + in-product component */}
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="flex flex-col">
                  <ProofFrame
                    label="Screenshot needed"
                    title="Storybook - Component in Context"
                    desc="A Storybook story page - Button or Input works well - showing the interactive story, prop controls, and a11y tab open"
                    minH="min-h-[220px] h-full"
                  />
                  <Caption>↑ Storybook: where every component is documented and demoed</Caption>
                </div>
                <div className="flex flex-col">
                  <ProofFrame
                    label="Screenshot needed"
                    title="Component in Real Product UI"
                    desc="A real screen from one of the 3 Indigo products - ideally showing a form or card built entirely from Prism components"
                    minH="min-h-[220px] h-full"
                  />
                  <Caption>↑ Prism components live in a real Indigo product screen</Caption>
                </div>
              </div>
            </div>
          </section>

          {/* Visual: npm + contribution evidence */}
          <div className="grid sm:grid-cols-2 gap-4 mb-24">
            <div className="flex flex-col">
              <ProofFrame
                label="Screenshot needed"
                title="npm Registry - @indigo/prism"
                desc="The @indigo/prism package page on npm showing the version, weekly downloads, and install command"
                minH="min-h-[180px] h-full"
              />
              <Caption>↑ @indigo/prism on the npm registry - it actually shipped</Caption>
            </div>
            <div className="flex flex-col">
              <ProofFrame
                label="Screenshot needed"
                title="Figma Library - Component Overview"
                desc="Figma library view showing all 37 components organised by category - the single source of truth that replaced 6 files"
                minH="min-h-[180px] h-full"
              />
              <Caption>↑ One Figma library. Used by all 3 products.</Caption>
            </div>
          </div>

          {/* ── Friction ── */}
          <section id="friction" className="mb-24 scroll-mt-32">
            <SectionLabel>Friction</SectionLabel>
            <SectionTitle className="mb-3">What didn't go smoothly</SectionTitle>
            <Lead>
              The metrics tell a clean story. Two things behind them weren't clean at all - and both changed how
              Prism is governed today.
            </Lead>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Friction 01</div>
                <h3 className="text-[17px] font-semibold mb-3 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                  The demo didn't win everyone over
                </h3>
                <p className="text-[14px] leading-relaxed text-black/65">
                  The live Figma MCP demo in week 11 convinced most of the engineering team, but not one pod on the
                  Booking Platform - they kept building with their own component patterns for another two months,
                  unconvinced a design-led system belonged in their codebase. What actually closed the gap wasn't
                  the demo, it was watching two sprints of other teams shipping faster with it.
                </p>
              </div>

              <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 sm:p-7">
                <div className="font-mono text-[10px] uppercase tracking-widest text-black/40 mb-3">Friction 02</div>
                <h3 className="text-[17px] font-semibold mb-3 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                  The 92% cut had a real cost
                </h3>
                <p className="text-[14px] leading-relaxed text-black/65">
                  A month after launch, the Loyalty & CRM team needed a stepped-progress component that didn't make
                  the v1 list - I'd scoped it out to hit the 92%-coverage line. Rather than wait on the roadmap,
                  they built their own version - exactly the fragmentation Prism was meant to prevent. It became
                  the first component contributed from outside my original scope, and the reason a proper
                  contribution process exists now.
                </p>
              </div>
            </div>
          </section>

          {/* ── Adoption ── */}
          <section id="adoption" className="mb-24 scroll-mt-32">
            <SectionLabel>Adoption</SectionLabel>
            <SectionTitle className="mb-3">Prism didn't freeze at v1.0.0</SectionTitle>
            <Lead>
              Eighteen months on, it's still the source of truth for all three products - and it's no longer just
              mine.
            </Lead>

            <div className="grid sm:grid-cols-2 gap-4">
              {[
                {
                  num: '01',
                  title: 'Contribution model',
                  desc: 'Any designer or developer can propose a component through a short RFC - a Figma spec plus a use-case - reviewed in a biweekly design-system office hours session I chair.',
                },
                {
                  num: '02',
                  title: 'Real adoption',
                  desc: '3 components have been added by designers outside the original team since launch, including the stepped-progress component from the Friction section above. An estimated 74% of new screens across the 3 products now use Prism components exclusively, up from roughly 20% at launch.',
                },
                {
                  num: '03',
                  title: 'Ongoing ownership',
                  desc: 'I still review every PR to the npm package. Two other senior designers now co-own the Figma library day-to-day, so it no longer depends on one person to keep moving.',
                },
                {
                  num: '04',
                  title: 'Versioning',
                  desc: 'Prism follows semver. Two minor versions and one breaking major - a token-naming migration - have shipped since v1.0.0, each with a written migration guide.',
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl p-6 hover:bg-[#e6e1da] transition-colors duration-200"
                >
                  <div
                    className="text-[32px] font-bold text-black/10 leading-none mb-3 tabular-nums"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {item.num}
                  </div>
                  <h3 className="text-[16px] font-semibold mb-2 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-black/60">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Impact ── */}
          <section id="impact" className="mb-16 scroll-mt-32">
            <SectionLabel>Impact</SectionLabel>
            <SectionTitle className="mb-8">Measurable outcomes: what changed after Prism</SectionTitle>

            {/* Benefits - 3 pillars before raw numbers */}
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
                  desc: 'Not retrofitted after the fact - baked in from component zero. Every developer who used npm install @indigo/prism got accessibility for free.',
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
                redundant component work - before Prism existed.
              </p>
            </div>

            {/* Big Numbers */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {[
                { value: '47%', label: 'reduction in component rebuild time' },
                { value: '60%', label: 'faster design-to-dev handoff' },
                { value: '12→1', label: 'UI patterns consolidated' },
                { value: '74%', label: 'of new screens built from Prism' },
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
            <div className="bg-[#ede9e3] border border-[#d8d2c8] rounded-2xl overflow-hidden mb-10">
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

            <ProofFrame
              label="Screenshot needed"
              title="Before / After, in the real product"
              desc="A real screen from one of the 3 products, pre- and post-Prism - the single most convincing image in this case study"
              minH="min-h-[260px]"
            />

            {/* Praise */}
            <div className="mt-16">
              <SectionLabel>Praise</SectionLabel>
              <SectionTitle className="mb-3">What the team said</SectionTitle>
              <Lead>Two quotes, real ones, from the people who used Prism every day.</Lead>

              <div className="grid sm:grid-cols-2 gap-4">
                <QuotePlaceholder role="Engineer who adopted Prism" />
                <QuotePlaceholder role="Designer or PM who worked with Prism" />
              </div>
            </div>

            {/* Learnings */}
            <div className="mt-16">
              <SectionLabel>Learnings</SectionLabel>
              <SectionTitle className="mb-10">Key insights</SectionTitle>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    num: '01',
                    title: 'Leadership empathy was the unlock',
                    desc: 'They were equally concerned about design-dev sync issues and actively seeking a solution. Presenting quantified data (34% dev time waste) secured buy-in immediately.',
                  },
                  {
                    num: '02',
                    title: 'Accessibility upfront prevented retrofitting',
                    desc: 'WCAG 2.1 AA compliance from day one was non-negotiable. This upfront investment saved massive rework costs later.',
                  },
                  {
                    num: '03',
                    title: 'AI tools bridged the skill gap - but not the review gap',
                    desc: 'AI let a non-technical designer ship production code in 1.5 weeks. What it couldn’t do was replace a second pair of eyes - every API decision I made without a reviewer became permanent.',
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
                    <h3 className="text-[17px] font-semibold mb-3 text-black" style={{ fontFamily: 'var(--font-heading)' }}>
                      {learning.title}
                    </h3>
                    <p className="text-[14px] leading-relaxed text-black/60">{learning.desc}</p>
                  </div>
                ))}
              </div>
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
                  - WCAG compliance included, automatically, on every install. That's when the ROI became
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
                  <div className="text-[14px] text-white/80 font-semibold">Prism · @indigo/prism v1.2.0</div>
                  <div className="text-[11px] text-white/40 mt-0.5">
                    37 components · 198 variants · WCAG 2.1 AA · Shipped Q3 2024 · still maintained
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">Case study</span>
                  <span className="font-mono text-[10px] text-white/25">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/35">~5 min read</span>
                  <span className="font-mono text-[10px] text-white/25">·</span>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-blue-400">v4.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
