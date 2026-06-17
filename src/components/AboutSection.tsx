"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'design' | 'code' | 'story';

export const AboutSection = () => {
  const [lens, setLens] = useState<Tab>('design');

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
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-10 lg:gap-16 items-start">

          {/* ── Left: Identity Column ── */}
          <div className="space-y-8">

            {/* Photo */}
            <div className="relative overflow-hidden rounded-2xl border border-black/10 aspect-[4/5] bg-black/[0.02]">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=700&q=80"
                alt="Yogesh Yadav"
                className="w-full h-full object-cover grayscale brightness-90 contrast-110"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-sm border border-black/10 rounded-full px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                  </span>
                  <span className="text-[11px] font-mono text-black/60 font-bold uppercase tracking-wide">Open to work</span>
                </div>
                <span className="text-[10px] font-mono text-black/35 uppercase tracking-wider">Delhi, IN</span>
              </div>
            </div>

            {/* Name + role */}
            <div className="space-y-1">
              <h3 className="text-[22px] font-semibold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                Yogesh Yadav
              </h3>
              <p className="text-[12px] font-mono text-black/40 uppercase tracking-widest">
                Senior UX Designer, AIonOS / IndiGo
              </p>
            </div>

            {/* Timeline */}
            <div className="space-y-3">
              {[
                { co: 'AIonOS x IndiGo', role: 'Product Designer', year: '2023 - Now' },
                { co: 'Prism Design System', role: 'Lead Designer + Engineer', year: '2024' },
                { co: 'OOUX Consultant', role: 'Independent', year: '2022 - 23' },
              ].map((item, i) => (
                <div key={i} className="flex items-start justify-between gap-4 py-3 border-b border-black/[0.06] last:border-0">
                  <div className="space-y-0.5">
                    <p className="text-[13px] font-medium text-black tracking-tight">{item.co}</p>
                    <p className="text-[11px] text-black/45">{item.role}</p>
                  </div>
                  <span className="text-[11px] font-mono text-black/30 whitespace-nowrap pt-0.5">{item.year}</span>
                </div>
              ))}
            </div>

          </div>

          {/* ── Right: Tab Content Column ── */}
          <div className="space-y-6">

            {/* Expertise Lens Header & Tactile Switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-black/[0.06] pt-1">
              <div className="space-y-0.5">
                <span className="font-mono text-[10px] text-black/45 uppercase tracking-widest font-bold">
                  Expertise Lens //
                </span>
                <p className="text-[12px] text-black/45">
                  Design thinking · Build execution · My story.
                </p>
              </div>

              <div className="relative inline-flex bg-black/[0.03] p-1 rounded-full border border-black/[0.05]">
                <button
                  onClick={() => setLens('design')}
                  className={`relative z-10 px-4 py-2 rounded-full text-[11px] font-mono font-bold transition-colors uppercase tracking-wider whitespace-nowrap ${
                    lens === 'design' ? 'text-white' : 'text-black/55 hover:text-black'
                  }`}
                >
                  Design Thinking
                </button>
                <button
                  onClick={() => setLens('code')}
                  className={`relative z-10 px-4 py-2 rounded-full text-[11px] font-mono font-bold transition-colors uppercase tracking-wider whitespace-nowrap ${
                    lens === 'code' ? 'text-white' : 'text-black/55 hover:text-black'
                  }`}
                >
                  Build Execution
                </button>
                <button
                  onClick={() => setLens('story')}
                  className={`relative z-10 px-4 py-2 rounded-full text-[11px] font-mono font-bold transition-colors uppercase tracking-wider whitespace-nowrap ${
                    lens === 'story' ? 'text-white' : 'text-black/55 hover:text-black'
                  }`}
                >
                  Profile Story
                </button>
                {/* Sliding Pill Indicator */}
                <motion.div
                  layoutId="lensSlideBg"
                  className="absolute top-1 bottom-1 bg-black rounded-full"
                  style={{
                    width: 'calc(33.333% - 2.666px)',
                    left: lens === 'design' ? '2px' : lens === 'code' ? 'calc(33.333% + 1px)' : 'calc(66.666% + 1px)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              </div>
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">

              {/* ─ Design Thinking ─ */}
              {lens === 'design' && (
                <motion.div
                  key="design"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Card 1 */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      {/* OOUX booking object widget */}
                      <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-3 font-mono text-[9px] text-black/60 mb-3 space-y-1">
                        <div className="flex justify-between border-b border-black/5 pb-1 mb-1 font-bold text-black text-[8px] uppercase">
                          <span>Booking Object</span>
                          <span className="text-blue-600">OOUX</span>
                        </div>
                        <div className="flex items-center gap-1.5"><span className="text-blue-500 font-bold">■</span> ID</div>
                        <div className="flex items-center gap-1.5"><span className="text-green-500 font-bold">⟷</span> Passenger</div>
                        <div className="flex items-center gap-1.5"><span className="text-orange-500 font-bold">⚡</span> Status</div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">OOUX / Object-Map</span>
                        <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Object-Oriented Design</h3>
                        <p className="text-[12px] text-black/50 leading-relaxed">Structuring nouns & workflows to map complex passenger ecosystems before visual design begins.</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      {/* 3-layer audit stack widget */}
                      <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-2.5 flex flex-col gap-1 items-center justify-center mb-3 h-[74px]">
                        <div className="w-full text-center bg-white border border-black/10 py-1 rounded text-[8px] font-mono font-bold text-black/75 shadow-sm">L3 INTENT</div>
                        <div className="w-full text-center bg-white/70 border border-black/10 py-0.5 rounded text-[8px] font-mono font-bold text-black/50">L2 ACTION</div>
                        <div className="w-full text-center bg-white/40 border border-black/10 py-0.5 rounded text-[8px] font-mono font-bold text-black/30">L1 SURFACE</div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">Auditing Framework</span>
                        <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>3-Level Audit Model</h3>
                        <p className="text-[12px] text-black/50 leading-relaxed">Systematic analysis isolating business intent, interactive state machines, and interface surfaces.</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 (Full Width) */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 col-span-1 sm:col-span-2">
                    {/* Live status widget */}
                    <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-3 font-mono text-[9px] text-black/60 shrink-0 w-full sm:w-[150px] space-y-1">
                      <div className="flex justify-between items-center border-b border-black/5 pb-1 mb-1">
                        <span className="font-bold text-black/80 text-[7px] uppercase">Indigo 6E</span>
                        <span className="text-blue-600 animate-pulse font-bold">● LIVE</span>
                      </div>
                      <div className="flex justify-between"><span>IROPS</span> <span className="font-bold text-black/75">ACTIVE</span></div>
                      <div className="flex justify-between"><span>PAX FLOW</span> <span className="font-bold text-black/75">2.4M/D</span></div>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">Aviation Operations</span>
                      <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>High-Stakes Aviation UX</h3>
                      <p className="text-[12px] text-black/50 leading-relaxed">Designing complex operations software at IndiGo to handle cabin crew tracking, disruption management, and agentic check-ins.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─ Build Execution ─ */}
              {lens === 'code' && (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  {/* Card 1 */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      {/* Postgres Table Widget */}
                      <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-3 font-mono text-[9px] text-black/60 mb-3 space-y-1">
                        <div className="flex justify-between border-b border-black/5 pb-1 mb-1 font-bold text-blue-600 text-[8px] uppercase">
                          <span>bookings table</span>
                          <span className="text-black/35">SQL</span>
                        </div>
                        <div className="flex justify-between"><span>id</span> <span className="text-black/35">uuid [PK]</span></div>
                        <div className="flex justify-between"><span>passenger_id</span> <span className="text-black/35">uuid [FK]</span></div>
                        <div className="flex justify-between"><span>status</span> <span className="text-black/35">varchar</span></div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">Relational Schema</span>
                        <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Database Integrity</h3>
                        <p className="text-[12px] text-black/50 leading-relaxed">Designing clean relational structures with Supabase and writing secure row-level security policies.</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col justify-between">
                    <div>
                      {/* Compiler webhooks widget */}
                      <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-2.5 flex flex-col gap-1 items-center justify-center mb-3 h-[74px] font-mono text-[8px]">
                        <div className="px-1.5 py-0.5 bg-[#ff4c00]/10 text-[#ff4c00] border border-[#ff4c00]/20 rounded font-bold w-full text-center">figma_hook</div>
                        <span className="text-black/20 leading-none">↓</span>
                        <div className="px-1.5 py-0.5 bg-green-600/10 text-green-700 border border-green-600/20 rounded font-bold w-full text-center">node_compiler</div>
                      </div>
                      <div className="space-y-1">
                        <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">Token Automation</span>
                        <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>n8n Logic Pipelines</h3>
                        <p className="text-[12px] text-black/50 leading-relaxed">Compiling design files into platform variables and executing production pull requests with n8n.</p>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 (Full Width) */}
                  <div className="border border-black/[0.08] bg-white/65 hover:border-black/15 transition-all p-4 sm:p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 col-span-1 sm:col-span-2">
                    {/* npm stack status widget */}
                    <div className="bg-black/[0.02] border border-black/[0.04] rounded-xl p-3 font-mono text-[9px] text-black/60 shrink-0 w-full sm:w-[150px] space-y-1">
                      <div className="flex justify-between items-center border-b border-black/5 pb-1 mb-1">
                        <span className="font-bold text-green-600 text-[7px] uppercase">npm publish</span>
                        <span className="text-black/30">v1.0.4</span>
                      </div>
                      <div className="font-bold text-black/85 text-[9px]">@prism/ui</div>
                      <div className="text-[7px] text-black/40">37 components · 198 variants</div>
                    </div>
                    <div className="space-y-1">
                      <span className="font-mono text-[9px] text-black/35 uppercase tracking-widest font-bold">Component Engineering</span>
                      <h3 className="text-[15px] font-bold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>Prism Design System</h3>
                      <p className="text-[12px] text-black/50 leading-relaxed">Led Phase 1 Figma libraries and solo-engineered its production-ready npm React component system to accelerate developers by 60%.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* ─ Profile Story ─ */}
              {lens === 'story' && (
                <motion.div
                  key="story"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-5"
                >
                  <p className="text-[15px] text-black/65 leading-relaxed">
                    <span className="text-black font-semibold">I didn't plan to end up here.</span> I started where most designers do - wireframes, user flows, the fundamentals. But I quickly realised that great design doesn't stop at the handoff. It lives in the product, in the system, in the decision three sprints later when no one remembers the original intent.
                  </p>
                  <p className="text-[15px] text-black/65 leading-relaxed">
                    At <span className="text-black font-medium">IndiGo / AIonOS</span>, I'm embedded in high-stakes product work - agentic AI check-in flows, irregular operations systems, catering management. I apply OOUX and ORCA methodology to untangle complex object relationships before touching a single screen.
                  </p>
                  <p className="text-[15px] text-black/65 leading-relaxed">
                    I crossed a line somewhere between "I should understand how this gets built" and "I just want to ship it myself." I work in <span className="text-black font-medium">React, Supabase, and n8n</span>. I built Prism Design System solo - component library, token pipeline, npm publish - and I use Cursor and Windsurf daily. Not a full-stack engineer. But the designer who can open the codebase and ship the fix without waiting two sprints.
                  </p>

                  <div className="pt-2 border-t border-black/[0.06]">
                    <p className="text-[12px] font-mono text-black/30 italic leading-relaxed">
                      "Start with the problem. Understand the system. Design for humans. Build it well."
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

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



