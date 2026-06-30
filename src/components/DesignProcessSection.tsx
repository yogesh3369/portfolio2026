"use client";
import { motion, useReducedMotion } from 'motion/react';
import { useState } from 'react';

const ToolLogo = ({ tool }: { tool: string }) => {
  const slugMap: Record<string, string> = {
    Notion: 'notion',
    Claude: 'anthropic',
    FigJam: 'figma',
    Figma: 'figma',
    Cursor: 'cursor',
    Supabase: 'supabase',
  };

  const slug = slugMap[tool];

  if (slug) {
    return (
      <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <img
          src={`https://cdn.simpleicons.org/${slug}/1a1a1a`}
          alt={tool}
          className="w-4 h-4 object-contain"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
    );
  }

  // Lovable — custom mark (stylised L in a rounded square)
  return (
    <div className="w-8 h-8 rounded-lg bg-white border border-black/10 flex items-center justify-center shrink-0 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21C12 21 4 16 4 9.5C4 7.015 6.015 5 8.5 5C10.0 5 11.3 5.75 12 6.85C12.7 5.75 14.0 5 15.5 5C17.985 5 20 7.015 20 9.5C20 16 12 21 12 21Z"
          fill="currentColor"
          className="text-black/60"
        />
      </svg>
    </div>
  );
};

const phases = [
  {
    number: '01',
    phase: 'Understand',
    description: 'Ground the project in reality before making anything.',
    tools: [
      { name: 'Notion', task: 'Research synthesis' },
      { name: 'Claude', task: 'Scope definition' },
      { name: 'FigJam', task: 'Insight clustering' },
    ],
  },
  {
    number: '02',
    phase: 'Analyse',
    description: 'Turn raw data into decisions worth building around.',
    tools: [
      { name: 'Claude', task: 'Problem synthesis & benchmarking' },
    ],
  },
  {
    number: '03',
    phase: 'Create',
    description: 'Make things real, from rough sketches to working interfaces.',
    tools: [
      { name: 'Figma', task: 'Ideation & flows' },
      { name: 'Cursor', task: 'Ideation & hand-off' },
      { name: 'Lovable', task: 'Functional prototyping' },
      { name: 'Supabase', task: 'Prototype data layer' },
    ],
  },
  {
    number: '04',
    phase: 'Validate',
    description: 'Test against reality, not assumptions.',
    tools: [
      { name: 'Claude', task: 'User testing & iteration' },
      { name: 'Notion', task: 'Findings documentation' },
    ],
  },
];

export const DesignProcessSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <section id="process" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Section Header */}
        <motion.div
          className="mb-16 space-y-5"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              03
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              How I work <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>

          <h2
            className="tracking-tight max-w-4xl"
            style={{
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.05',
              fontSize: 'clamp(42px, 6vw, 76px)',
            }}
          >
            <span className="text-black font-semibold">AI applied to the</span>{' '}
            <br />
            <span
              className="text-black/40 italic"
              style={{ fontStyle: 'italic', fontWeight: 500, lineHeight: '1.1', display: 'inline-block', paddingBottom: '2px' }}
            >
              product design process.
            </span>
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            The tools changed. The craft didn't.
          </p>
        </motion.div>

        {/* Phase Strips */}
        <div className="relative">
          {phases.map((phase, i) => (
            <motion.div
              key={phase.phase}
              initial={reduce ? false : { opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="relative border-t border-black/[0.08] cursor-default"
            >
              {/* Blue left accent bar — reveals on hover */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[3px] bg-blue-600 origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: hoveredIndex === i ? 1 : 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Row content */}
              <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-12 py-10 md:py-12">

                {/* LEFT — Phase label: compact, anchors the row */}
                <div className="md:w-[38%] shrink-0 flex items-start gap-5">
                  {/* Ghost number */}
                  <span
                    className="hidden md:block font-bold leading-none tracking-tighter shrink-0 select-none"
                    style={{
                      fontFamily: 'var(--font-heading)',
                      fontSize: '52px',
                      color: 'rgba(0,0,0,0.06)',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      marginTop: '4px',
                    }}
                  >
                    {phase.number}
                  </span>

                  <div className="min-w-0">
                    <span className="font-mono text-[11px] uppercase tracking-widest text-black/40 mb-2 block md:hidden">
                      {phase.number}
                    </span>
                    <h3
                      className="tracking-tight leading-[1.05] font-bold text-black"
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: 'clamp(28px, 3.2vw, 44px)',
                      }}
                    >
                      {phase.phase}
                    </h3>
                    <p className="mt-2.5 text-[14px] text-black/70 leading-relaxed">
                      {phase.description}
                    </p>
                  </div>
                </div>

                {/* RIGHT — Tools: the real content, always visible as cards */}
                <div className="flex-1 min-w-0">
                  {/* Desktop: horizontal row of tool cards */}
                  <div className="hidden md:flex flex-wrap gap-3">
                    {phase.tools.map((tool, j) => (
                      <motion.div
                        key={`${tool.name}-${j}`}
                        initial={reduce ? false : { opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: i * 0.08 + j * 0.08, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-3 bg-white/65 backdrop-blur-sm border border-black/10 rounded-xl px-4 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 transition-all duration-200 cursor-default"
                      >
                        <ToolLogo tool={tool.name} />
                        <div>
                          <div className="text-[14px] font-semibold text-black leading-tight whitespace-nowrap">
                            {tool.name}
                          </div>
                          <div className="text-[11px] font-mono uppercase tracking-widest text-black/45 mt-0.5 whitespace-nowrap">
                            {tool.task}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Mobile: same cards, wrapping */}
                  <div className="flex flex-wrap gap-2 md:hidden">
                    {phase.tools.map((tool, j) => (
                      <div
                        key={`${tool.name}-mobile-${j}`}
                        className="flex items-center gap-2 bg-white/65 border border-black/10 rounded-xl px-3 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.06)]"
                      >
                        <ToolLogo tool={tool.name} />
                        <div>
                          <div className="text-[13px] font-semibold text-black">{tool.name}</div>
                          <div className="text-[10px] font-mono uppercase tracking-widest text-black/45">{tool.task}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <div className="border-t border-black/[0.08]" />
        </div>
      </div>
    </section>
  );
};
