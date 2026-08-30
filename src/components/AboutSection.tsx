"use client";
import { useState } from 'react';
import { motion } from 'motion/react';

const EXPERIENCE = [
  { co: 'IndiGo', role: 'Senior UX Designer', year: 'Sep 2025 - Now' },
  { co: 'Stylework Innovation Hub', role: 'Senior Associate, UI/UX Designer', year: 'Nov 2023 - Sep 2025' },
  { co: 'RARR Technologies', role: 'UI/UX Designer', year: 'May 2022 - Nov 2023' },
];

export const AboutSection = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="about" className="relative z-1 py-16 sm:py-24 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">

        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-10 sm:mb-14 space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              02
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              About <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>
          
          <h2
            className="tracking-tight font-semibold text-black max-w-4xl animate-fade-in"
            style={{
              fontFamily: 'var(--font-heading)',
              lineHeight: '1.05',
              fontSize: 'clamp(42px, 6vw, 76px)',
            }}
          >
            Designer Who Builds,<br />
            <span className="text-black/40 italic font-medium">Builder Who Designs.</span>
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            4+ years building enterprise B2B and B2C products - deep in OOUX, fluent in AI-driven design.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left: Identity Column ── */}
          <div className="space-y-5">

            {/* Photo */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 aspect-[6/5] bg-black/[0.02]">
              <img
                src="/yogesh.png"
                alt="Yogesh Yadav"
                className="w-full h-full object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-full px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-mono text-black/60 font-bold uppercase tracking-wide">Open to work</span>
                </div>
                <span className="text-[10px] font-mono text-black/35 uppercase tracking-wider">Gurgaon, IN</span>
              </div>
            </div>

            {/* Name + role */}
            <div className="space-y-1">
              <h3 className="text-[22px] font-semibold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Yogesh Yadav
              </h3>
              <p className="text-[12px] font-mono text-black/40 uppercase tracking-widest">
                Senior UX Designer · IndiGo
              </p>
            </div>

            {/* Experience */}
            <div className={expanded ? 'space-y-3' : 'pb-2'}>
              {EXPERIENCE.map((item, i) => {
                const tier = expanded ? 0 : i;
                const overlap = expanded ? 0 : i === 1 ? -10 : i === 2 ? -7 : 0;
                const inset = expanded ? '' : i === 1 ? 'mx-3' : i === 2 ? 'mx-6' : '';

                return (
                  <motion.div
                    key={item.co}
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ type: 'spring', stiffness: 320, damping: 30, delay: i * 0.08 }}
                    style={{ position: 'relative', zIndex: EXPERIENCE.length - i, marginTop: expanded ? undefined : overlap }}
                    className={`rounded-2xl border bg-white transition-all duration-300 ${inset} ${
                      tier === 0
                        ? 'border-black/10 p-4 shadow-[0_16px_36px_-16px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.3)]'
                        : tier === 1
                        ? 'flex h-10 items-end justify-between gap-4 border-black/[0.08] px-4 pb-2 shadow-[0_4px_10px_-6px_rgba(0,0,0,0.1)]'
                        : 'flex h-[34px] items-end justify-between gap-4 border-black/[0.06] px-3.5 pb-1.5 shadow-[0_3px_8px_-5px_rgba(0,0,0,0.08)]'
                    }`}
                  >
                    {tier === 0 ? (
                      <>
                        <div className="flex items-baseline justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-1.5">
                            {i === 0 && (
                              <span className="relative flex h-1.5 w-1.5 shrink-0">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-green-500" />
                              </span>
                            )}
                            <h4
                              className="truncate text-[14px] font-bold tracking-tight text-black"
                              style={{ fontFamily: 'var(--font-heading)' }}
                            >
                              {item.co}
                            </h4>
                          </div>
                          <span className="shrink-0 whitespace-nowrap font-mono text-[11px] text-black/30">
                            {item.year}
                          </span>
                        </div>
                        <p className="mt-1 whitespace-nowrap text-[11px] text-black/45">{item.role}</p>
                      </>
                    ) : (
                      <>
                        <p
                          className={`truncate font-medium tracking-tight text-black ${
                            tier === 1 ? 'text-[12px]' : 'text-[11px] text-black/65'
                          }`}
                        >
                          {item.co}
                        </p>
                        <span
                          className={`shrink-0 whitespace-nowrap font-mono text-black/35 ${
                            tier === 1 ? 'text-[10px]' : 'text-[9px]'
                          }`}
                        >
                          {item.year}
                        </span>
                      </>
                    )}
                  </motion.div>
                );
              })}

              <div className="flex justify-center pt-4">
                <button
                  onClick={() => setExpanded((v) => !v)}
                  aria-expanded={expanded}
                  aria-label={expanded ? 'Collapse experience history' : 'Expand experience history'}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 text-black/40 transition-all duration-200 hover:border-black/20 hover:bg-black/[0.02] hover:text-black active:scale-95"
                >
                  <svg
                    className={`h-3.5 w-3.5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

          </div>

          {/* ── Right: Story Column ── */}
          <div className="space-y-6">

            <div className="pb-4 border-b border-black/[0.06] pt-1">
              <span className="font-mono text-[10px] text-black/45 uppercase tracking-widest font-bold">
                My Story //
              </span>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="space-y-5"
            >
              <p className="text-[15px] text-black/65 leading-relaxed">
                <span className="text-black font-semibold">I didn't plan to end up here.</span> I started where most designers do - wireframes, user flows, the fundamentals. But I quickly realised that great design doesn't stop at the handoff. It lives in the product, in the system, in the decision three sprints later when no one remembers the original intent.
              </p>
              <p className="text-[15px] text-black/65 leading-relaxed">
                At <span className="text-black font-medium">IndiGo</span>, I lead end-to-end UX for B2B Access - IndiGo's B2B flight booking platform for travel agents - and built the IndiGo NPM Design System, now adopted internally and across every vendor product. I apply OOUX and ORCA methodology to untangle complex object relationships before touching a single screen.
              </p>
              <p className="text-[15px] text-black/65 leading-relaxed">
                I crossed a line somewhere between "I should understand how this gets built" and "I just want to ship it myself." I work daily in <span className="text-black font-medium">Cursor, Claude, Lovable and Bolt</span>, automating repetitive UI work to cut QA cycles and dev effort. Before IndiGo, I led UX across enterprise B2B platforms at Stylework and architected a dual-sided recruitment ecosystem at RARR that cut hiring time by 30%. Not a full-stack engineer. But the designer who can open the codebase and ship the fix without waiting two sprints.
              </p>

              <div className="pt-2 border-t border-black/[0.06]">
                <p className="text-[12px] font-mono text-black/60 italic leading-relaxed">
                  "Design is a system before it is a screen. Every interface is built on invisible object relationships - get those right and the UI almost draws itself. AI amplifies speed; rigour gives it direction."
                </p>
              </div>
            </motion.div>

            {/* CTA */}
            <div className="pt-4 flex items-center gap-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-black hover:bg-black/80 text-white font-mono text-[12px] font-bold px-6 py-3 rounded-full transition-colors uppercase tracking-widest"
              >
                Let's build something
                <span>→</span>
              </a>
              <a
                href="#work"
                className="text-[12px] font-mono text-black/45 hover:text-black transition-colors uppercase tracking-widest"
              >
                View work
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};



