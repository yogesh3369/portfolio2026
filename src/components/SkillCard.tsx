"use client";
import { motion } from 'motion/react';

interface SkillCardProps {
  number: string;
  category: string;
  description: string;
  skills: string[];
  index: number;
}

export const SkillCard = ({ number, category, description, skills, index }: SkillCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <div className="flex h-full flex-col bg-white/60 backdrop-blur-sm border border-black/10 rounded-2xl p-6 sm:p-8 hover:bg-white/80 hover:border-black/20 hover:shadow-xl transition-all duration-300">
        <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono mb-6 group-hover:border-blue-600/30 group-hover:text-blue-600 transition-colors duration-300">
          {number}
        </div>

        <h3
          className="text-[22px] sm:text-[26px] mb-2 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          {category}
        </h3>

        <p className="text-[13px] sm:text-[14px] text-black/50 leading-relaxed mb-6">
          {description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 + i * 0.05 }}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[12px] sm:text-[13px] px-3.5 sm:px-4 py-1.5 hover:bg-black hover:text-white transition-colors duration-200"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
