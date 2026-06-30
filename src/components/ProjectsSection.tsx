import { useRef } from 'react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

function StackingCard({
  project,
  index,
  total,
  scrollYProgress,
}: {
  project: (typeof projects)[0];
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}) {
  const segmentSize = 1 / total;
  const targetScale = 1 - (total - index) * 0.04;
  const cardScale = useTransform(
    scrollYProgress,
    [index * segmentSize, (index + 1) * segmentSize],
    [1, targetScale]
  );

  return (
    <div
      className="h-screen sticky top-0 flex items-center justify-center"
      style={{ zIndex: index + 1 }}
    >
      <motion.div
        style={{
          scale: cardScale,
          transformOrigin: 'top center',
          width: '100%',
          paddingTop: `${index * 18}px`,
        }}
        className="max-w-[1200px] mx-auto px-5 sm:px-8 md:px-10"
      >
        <ProjectCard
          project={project}
          index={index}
          locked={project.slug === 'prism-design-system'}
        />
      </motion.div>
    </div>
  );
}

export const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section id="work" className="relative z-1">

      {/* Section Header */}
      <div className="pt-32 pb-12 px-5 sm:px-8 md:px-10">
        <div className="max-w-[1200px] mx-auto w-full space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              01
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Selected Work <span className="text-blue-600 font-bold ml-1">///</span>
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
            Selected Work
          </h2>

          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            Product design projects spanning greenfield features, design systems, and methodology-driven solutions.
          </p>
        </div>
      </div>

      {/* Stacking Cards */}
      <div ref={containerRef}>
        {projects.map((project, i) => (
          <StackingCard
            key={project.id}
            project={project}
            index={i}
            total={projects.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </div>

      <div className="h-24" />
    </section>
  );
};
