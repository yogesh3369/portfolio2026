"use client";
import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SkillCardProps {
  category: string;
  skills: string[];
  icon: ReactNode;
  index: number;
}

export const SkillCard = ({ category, skills, icon, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg p-6 sm:p-8 hover:bg-white/80 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
        <div className="text-black/30 mb-6 group-hover:text-black/50 transition-colors duration-300">
          {icon}
        </div>
        
        <h3
          className="text-[22px] sm:text-[26px] mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {category}
        </h3>
        
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-2 hover:bg-black hover:text-white transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
