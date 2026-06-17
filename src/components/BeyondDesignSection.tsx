"use client";
import { motion } from 'motion/react';

export const BeyondDesignSection = () => {
  const interests = [
    {
      title: 'Playing Sports',
      description: 'Staying active and competitive through various sports — the same strategic thinking that goes into design applies on the field.',
      image: 'https://picsum.photos/seed/sports-activity/600/400',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" />
          <path d="M24 6 L24 42 M6 24 L42 24" stroke="currentColor" strokeWidth="2" />
          <path d="M12 12 L36 36 M36 12 L12 36" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
    {
      title: 'Travelling',
      description: 'Exploring new places and cultures. Every journey offers fresh perspectives that inform how I think about user experiences.',
      image: 'https://picsum.photos/seed/travel-explore/600/400',
      icon: (
        <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none">
          <path d="M24 6 L30 18 L42 20 L33 29 L35 42 L24 36 L13 42 L15 29 L6 20 L18 18 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
      ),
    },
  ];

  return (
    <section id="beyond-design" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              05
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Beyond <span className="text-blue-600 font-bold ml-1">///</span>
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
            Beyond Design
          </h2>
          
          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            When I'm not designing systems or shipping components, you'll find me:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {interests.map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group"
            >
              <div className="border border-black/10 rounded-lg overflow-hidden bg-white/60 backdrop-blur-sm hover:bg-white/80 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-black/5">
                  <img
                    src={interest.image}
                    alt={interest.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white/90">
                    {interest.icon}
                  </div>
                </div>
                
                <div className="p-6 sm:p-8">
                  <h3
                    className="text-[24px] sm:text-[28px] mb-3 tracking-tight"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {interest.title}
                  </h3>
                  <p className="text-[15px] sm:text-[17px] leading-relaxed text-black/80">
                    {interest.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-black/10">
          <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
            Life outside design keeps me grounded and curious. The best ideas rarely come 
            from staring at a screen — they emerge during a game, on a trail, or in a 
            conversation with someone from a completely different world.
          </p>
        </div>
      </div>
    </section>
  );
};
