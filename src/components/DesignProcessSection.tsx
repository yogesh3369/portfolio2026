"use client";
import { motion } from 'motion/react';

export const DesignProcessSection = () => {
  const processPhases = [
    {
      phase: 'Understand',
      items: [
        {
          logo: (
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10 shadow-sm">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M4 4h16v16H4z" fill="#000" />
                <path d="M8 8h8v8H8z" fill="#fff" />
              </svg>
            </div>
          ),
          tool: 'Notion',
          task: 'Research synthesis',
          description: 'Briefs structured, assumptions aligned, and initial decisions documented with the team.'
        },
        {
          logo: (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#fff" />
                <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          ),
          tool: 'Claude',
          task: 'Scope definition',
          description: 'Problem space explored and core challenges identified through AI-assisted analysis.'
        },
        {
          logo: (
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-black/10 shadow-sm">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <rect x="6" y="6" width="12" height="12" stroke="#000" strokeWidth="2" fill="none" />
                <circle cx="12" cy="12" r="2" fill="#000" />
              </svg>
            </div>
          ),
          tool: 'Miro',
          task: 'Research synthesis',
          description: 'Results and insights summarized, clustered, and prioritized from research data.'
        }
      ]
    },
    {
      phase: 'Analyse',
      items: [
        {
          logo: (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#fff" />
                <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          ),
          tool: 'Claude',
          task: 'Problem synthesis & analysis',
          description: 'Collected data cross-referenced to generate prioritized problem clusters.'
        },
        {
          logo: (
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 7v10l8 5 8-5V7z" fill="#fff" />
                <path d="M12 12l-4-2.5M12 12l4-2.5M12 12v5" stroke="#22c55e" strokeWidth="1.5" />
              </svg>
            </div>
          ),
          tool: 'FigJam',
          task: 'Competitive benchmarking',
          description: 'Competitors and trends researched with real citations, real app flows browsed by category.'
        },
        {
          logo: (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#fff" />
                <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          ),
          tool: 'Claude',
          task: 'Hypothesis formulation',
          description: 'Problems become testable hypotheses grounded in the project context.'
        }
      ]
    },
    {
      phase: 'Create',
      items: [
        {
          logo: (
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <circle cx="8" cy="8" r="3" fill="#fff" />
                <circle cx="16" cy="8" r="3" fill="#fff" />
                <circle cx="8" cy="16" r="3" fill="#fff" />
                <circle cx="16" cy="16" r="3" fill="#fff" />
                <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="1" opacity="0.5" />
              </svg>
            </div>
          ),
          tool: 'Figma',
          task: 'Ideation',
          description: 'Layout variations and flows explored directly within the design environment.'
        },
        {
          logo: (
            <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#fff" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
          ),
          tool: 'Lovable',
          task: 'Functional prototyping',
          description: 'Prototypes become functional interfaces with real code from description or design.'
        }
      ]
    },
    {
      phase: 'Validate',
      items: [
        {
          logo: (
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-sm">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="3" fill="#fff" />
                <circle cx="12" cy="12" r="6" stroke="#fff" strokeWidth="1.5" fill="none" />
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1" fill="none" opacity="0.5" />
              </svg>
            </div>
          ),
          tool: 'Claude',
          task: 'User testing & iteration',
          description: 'Test data interpreted, hypotheses cross-referenced, and objective adjustments identified.'
        }
      ]
    }
  ];

  return (
    <section id="process" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header */}
        <div className="mb-24 flex flex-col md:flex-row gap-8 md:gap-16 items-start">
          <div className="md:w-1/4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50">
              02
            </div>
            <div
              className="tracking-wide font-medium text-black/60"
              style={{
                fontSize: '14px',
                letterSpacing: '0.02em',
              }}
            >
              How I work <span className="text-blue-600 font-bold ml-1">///</span>
            </div>
          </div>
          
          <div className="md:w-3/4">
            <h2
              className="mb-6 tracking-tight max-w-3xl"
              style={{ 
                fontFamily: 'var(--font-heading)',
                lineHeight: '1.05',
                fontSize: 'clamp(42px, 6vw, 76px)',
              }}
            >
              <span className="text-black font-semibold">AI applied to the</span>{' '}
              <br />
              <span className="text-black/40 italic" style={{ fontStyle: 'italic', fontWeight: 500 }}>
                product design process.
              </span>
            </h2>
            <p className="text-[18px] sm:text-[20px] text-black/60 max-w-xl">
              The tools changed. The craft didn't.
            </p>
          </div>
        </div>

        {/* Process Phases */}
        <div className="relative">
          {processPhases.map((phase, phaseIndex) => (
            <motion.div
              key={phase.phase}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className={`flex flex-col md:flex-row gap-8 md:gap-16 py-16 ${
                phaseIndex !== 0 ? 'border-t border-black/[0.08]' : 'border-t border-black/[0.08]'
              } relative`}
            >
              {/* Optional dot separator on border (for middle sections) */}
              {phaseIndex > 0 && (
                <div className="hidden md:flex absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 bg-[#f8f9fa] border border-black/10 rounded-full items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-black/40 rounded-full"></div>
                </div>
              )}

              {/* Left Column: Phase Title */}
              <div className="md:w-1/4 flex-shrink-0">
                <h3
                  className="text-[32px] sm:text-[40px] md:text-[48px] tracking-tight sticky top-32 font-bold text-black/90"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {phase.phase}
                </h3>
              </div>

              {/* Right Column: Cards Grid */}
              <div className="md:w-3/4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                  {phase.items.map((item, itemIndex) => (
                    <motion.div
                      key={itemIndex}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                    >
                      <div className="bg-white rounded-2xl p-6 sm:p-8 h-full border border-black/[0.08] shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300">
                        {/* Card Header: Logo & Tool (Left) + Task (Right) */}
                        <div className="flex items-start justify-between gap-4 mb-8">
                          <div className="flex items-center gap-3">
                            <div className="shrink-0">
                              {item.logo}
                            </div>
                            <span className="text-[16px] font-medium text-black/80">
                              {item.tool}
                            </span>
                          </div>
                          <div
                            className="text-[14px] sm:text-[16px] font-bold text-right leading-tight max-w-[140px] text-black/90"
                            style={{ fontFamily: 'var(--font-heading)' }}
                          >
                            {item.task}
                          </div>
                        </div>

                        {/* Card Description */}
                        <p className="text-[13px] sm:text-[14px] leading-relaxed text-black/50">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          
          <div className="border-t border-black/[0.08] w-full mt-4"></div>
        </div>
      </div>
    </section>
  );
};
