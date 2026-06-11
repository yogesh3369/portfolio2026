import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';

export const ProjectsSection = () => {
  return (
    <section id="work" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        <h2
          className="text-[36px] sm:text-[48px] md:text-[56px] mb-4 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Selected Work
        </h2>
        
        <p className="text-[18px] sm:text-[22px] mb-12 sm:mb-16 text-black/70 max-w-2xl">
          Product design projects spanning greenfield features, design systems, and methodology-driven solutions.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};
