import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection = () => {
  return (
    <section id="work" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              locked={project.slug === 'prism-design-system'}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
