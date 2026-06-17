"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export const AboutSection = () => {
  const [lens, setLens] = useState<'design' | 'code'>('design');

  return (
    <section id="about" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              02
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              About <span className="text-blue-600 font-bold ml-1">///</span>
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
            Designer Who Builds <br />
            <span className="text-black/40 italic font-medium">Builder Who Designs.</span>
          </h2>
          
          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            I didn't plan to end up here. But looking back, every step made sense.
          </p>
        </div>

        {/* Interactive Tactile Toggle Selector */}
        <div className="flex justify-start mb-16">
          <div className="inline-flex bg-black/[0.03] p-1 rounded-full border border-black/[0.05] relative select-none">
            <button
              onClick={() => setLens('design')}
              className={`px-6 py-2.5 rounded-full text-[12px] font-mono font-bold transition-all relative z-10 uppercase ${
                lens === 'design' ? 'text-white' : 'text-black/55 hover:text-black'
              }`}
            >
              Design Thinking
            </button>
            <button
              onClick={() => setLens('code')}
              className={`px-6 py-2.5 rounded-full text-[12px] font-mono font-bold transition-all relative z-10 uppercase ${
                lens === 'code' ? 'text-white' : 'text-black/55 hover:text-black'
              }`}
            >
              Build Execution
            </button>
            {/* Sliding Pill Indicator */}
            <motion.div
              layoutId="lensSlideBg"
              className="absolute top-1 bottom-1 bg-black rounded-full"
              style={{
                width: 'calc(50% - 4px)',
                left: lens === 'design' ? '4px' : 'calc(50%)',
              }}
              transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            />
          </div>
        </div>

        {/* Dynamic Bento Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* CARD 1: SYSTEM ARCHITECTURE */}
          <div className="bg-white/60 backdrop-blur-sm border border-black/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[360px] hover:shadow-lg hover:border-black/[0.12] transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] text-black/40 uppercase tracking-widest">
                  {lens === 'design' ? 'OOUX Structure' : 'Relational Database'}
                </span>
                <span className="text-[12px] font-mono text-black/30">01 //</span>
              </div>

              {/* Dynamic Interactive Icon Canvas */}
              <div className="h-16 flex items-center justify-start text-black/40">
                <AnimatePresence mode="wait">
                  {lens === 'design' ? (
                    <motion.div
                      key="design-ooux"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-3 font-mono text-[11px]"
                    >
                      <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center font-bold">OBJ</div>
                      <span className="text-black/20">⟷</span>
                      <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center font-bold">REL</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code-db"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-[10px] space-y-1 text-black/60 bg-black/5 p-3 rounded border border-black/5"
                    >
                      <div><span className="text-blue-600">table</span> bookings (</div>
                      <div className="pl-3">passenger_id uuid REFERENCES passengers,</div>
                      <div className="pl-3">status varchar</div>
                      <div>)</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Block */}
              <div className="space-y-2">
                <h3 className="text-[20px] font-semibold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {lens === 'design' ? 'Object-Oriented Design' : 'Database Integrity'}
                </h3>
                <p className="text-[14px] leading-relaxed text-black/60">
                  {lens === 'design' 
                    ? 'Structuring system nouns (OOUX/ORCA) to untangle 40+ user roles before drawing screens.'
                    : 'Designing Supabase relational schemas & writing bulletproof row-level security (RLS) policies.'}
                </p>
              </div>
            </div>

            {/* Micro Curiosity Sandbox */}
            <div className="border-t border-dashed border-black/10 pt-4 text-[11px] font-mono text-black/40 leading-snug">
              {lens === 'design' 
                ? '✳︎ Suggestion: Drag-and-drop OOUX relational canvas.'
                : '✳︎ Suggestion: Live schema token compiler demo.'}
            </div>
          </div>

          {/* CARD 2: METHODOLOGY & LOGIC */}
          <div className="bg-white/60 backdrop-blur-sm border border-black/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[360px] hover:shadow-lg hover:border-black/[0.12] transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] text-black/40 uppercase tracking-widest">
                  {lens === 'design' ? 'UX Audit Stack' : 'Workflow Pipelines'}
                </span>
                <span className="text-[12px] font-mono text-black/30">02 //</span>
              </div>

              {/* Dynamic Interactive Icon Canvas */}
              <div className="h-16 flex items-center justify-start text-black/40">
                <AnimatePresence mode="wait">
                  {lens === 'design' ? (
                    <motion.div
                      key="design-audit"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col gap-1 w-24"
                    >
                      <div className="h-3 border border-black/10 bg-black/5 rounded text-[8px] font-mono flex items-center px-1.5 font-bold">L3 INTENT</div>
                      <div className="h-3 border border-black/10 bg-black/5 rounded text-[8px] font-mono flex items-center px-1.5 font-bold">L2 INTERACTION</div>
                      <div className="h-3 border border-black/10 bg-black/5 rounded text-[8px] font-mono flex items-center px-1.5 font-bold">L1 SURFACE</div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code-n8n"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 font-mono text-[10px]"
                    >
                      <div className="px-1.5 py-1 bg-[#ff4c00]/10 text-[#ff4c00] border border-[#ff4c00]/20 rounded">figma_hook</div>
                      <span className="text-black/30">→</span>
                      <div className="px-1.5 py-1 bg-green-600/10 text-green-700 border border-green-600/20 rounded">n8n_compiler</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Block */}
              <div className="space-y-2">
                <h3 className="text-[20px] font-semibold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {lens === 'design' ? '3-Level UX Audit Model' : 'n8n Logic Pipelines'}
                </h3>
                <p className="text-[14px] leading-relaxed text-black/60">
                  {lens === 'design'
                    ? 'Isolating visual aesthetics (L1), interactive state machines (L2), and systemic business intent (L3).'
                    : 'Building custom webhook automation nodes translating design token files directly to GitHub Packages.'}
                </p>
              </div>
            </div>

            {/* Micro Curiosity Sandbox */}
            <div className="border-t border-dashed border-black/10 pt-4 text-[11px] font-mono text-black/40 leading-snug">
              {lens === 'design'
                ? '✳︎ Suggestion: Click to run simulated aircraft re-route.'
                : '✳︎ Suggestion: Simulated prompt compiler webhook.'}
            </div>
          </div>

          {/* CARD 3: OPERATIONS & DEPLOYMENT */}
          <div className="bg-white/60 backdrop-blur-sm border border-black/[0.08] rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-[360px] hover:shadow-lg hover:border-black/[0.12] transition-all duration-300">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[11px] text-black/40 uppercase tracking-widest">
                  {lens === 'design' ? 'Aviation UX Suite' : 'Shipped Stack'}
                </span>
                <span className="text-[12px] font-mono text-black/30">03 //</span>
              </div>

              {/* Dynamic Interactive Icon Canvas */}
              <div className="h-16 flex items-center justify-start text-black/40">
                <AnimatePresence mode="wait">
                  {lens === 'design' ? (
                    <motion.div
                      key="design-ops"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-1.5"
                    >
                      <span className="text-[16px] font-bold">✈</span>
                      <span className="font-mono text-[10px] text-black/70 border border-black/10 px-2 py-0.5 rounded bg-black/5">6E_SKAI // CMS // IROPS</span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="code-stack"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="font-mono text-[11px] font-bold text-green-700 bg-green-500/10 border border-green-500/20 px-3 py-1.5 rounded flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      <span>REACT + NEXT + SUPABASE // DEPLOY_OK</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Content Block */}
              <div className="space-y-2">
                <h3 className="text-[20px] font-semibold text-black tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
                  {lens === 'design' ? 'High-Stakes Aviation UX' : 'The Code Pipeline'}
                </h3>
                <p className="text-[14px] leading-relaxed text-black/60">
                  {lens === 'design'
                    ? 'Senior UX Designer embedded in IndiGo. Designing systems handling millions of passenger workflows daily.'
                    : 'Working adjacent to engineers. Open the codebase, write the React fix, and deploy directly without handoffs.'}
                </p>
              </div>
            </div>

            {/* Micro Curiosity Sandbox */}
            <div className="border-t border-dashed border-black/10 pt-4 text-[11px] font-mono text-black/40 leading-snug">
              {lens === 'design'
                ? '✳︎ Suggestion: View 6E Skai conversational logic.'
                : '✳︎ Suggestion: Trigger live token variable compile.'}
            </div>
          </div>

        </div>

        {/* Footer Through-Line - Short and punchy */}
        <div className="mt-16 pt-8 border-t border-black/[0.08]">
          <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
            <p className="text-[15px] leading-relaxed text-black/50 max-w-2xl font-mono text-[12px] uppercase">
              The Thread: Start with the problem. Understand the system. Design for humans. Build it well.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-black hover:bg-black/80 text-white font-mono text-[12px] font-bold px-6 py-3.5 rounded-full transition-all duration-300 gap-2 shrink-0 self-stretch md:self-auto text-center"
            >
              Let's Build Something Complex
              <span className="text-[13px]">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};


