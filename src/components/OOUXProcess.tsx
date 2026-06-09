"use client";
import { motion } from 'motion/react';

export const OOUXProcess = () => {
  const steps = [
    {
      number: '01',
      title: 'Objects',
      description: 'Identify core entities and their attributes',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="2" rx="4" />
          <circle cx="24" cy="24" r="6" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Relationships',
      description: 'Map connections between objects',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <circle cx="12" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
          <circle cx="36" cy="24" r="6" stroke="currentColor" strokeWidth="2" />
          <line x1="18" y1="24" x2="30" y2="24" stroke="currentColor" strokeWidth="2" />
          <polygon points="30,24 26,22 26,26" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'CTAs',
      description: 'Define user actions and interactions',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="16" width="32" height="16" rx="8" stroke="currentColor" strokeWidth="2" />
          <path d="M20 24 L26 24 M26 24 L23 21 M26 24 L23 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Attributes',
      description: 'Detail properties and metadata',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <rect x="8" y="8" width="32" height="32" stroke="currentColor" strokeWidth="2" rx="4" />
          <line x1="14" y1="18" x2="34" y2="18" stroke="currentColor" strokeWidth="2" />
          <line x1="14" y1="24" x2="28" y2="24" stroke="currentColor" strokeWidth="2" />
          <line x1="14" y1="30" x2="32" y2="30" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <div className="my-16">
      <h3
        className="text-[24px] sm:text-[28px] mb-8 tracking-tight"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        OOUX/ORCA Methodology
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg p-6 hover:bg-white/80 hover:shadow-lg transition-all duration-300">
              <div className="text-black/30 mb-4">{step.icon}</div>
              
              <div className="text-[12px] font-mono text-black/40 mb-2">{step.number}</div>
              
              <h4
                className="text-[20px] mb-2 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {step.title}
              </h4>
              
              <p className="text-[14px] leading-relaxed text-black/70">
                {step.description}
              </p>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-[2px] bg-black/10" />
            )}
          </motion.div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-black/5 rounded-lg border border-black/10">
        <p className="text-[15px] leading-relaxed text-black/70">
          This methodology surfaces structural issues invisible at the screen level, 
          ensuring scalable and maintainable system architecture before visual design begins.
        </p>
      </div>
    </div>
  );
};
