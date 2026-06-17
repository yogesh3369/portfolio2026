import { Link } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  locked?: boolean;
}

export const ProjectCard = ({ project, locked = false }: ProjectCardProps) => {
  return (
    <Link
      to={`/work/${project.slug}`}
      className="block group"
      style={locked ? { cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ctext y=\'26\' font-size=\'26\'%3E%F0%9F%94%92%3C/text%3E%3C/svg%3E") 8 8, pointer' } : {}}
    >
      <div className="border border-black/10 rounded-lg overflow-hidden hover:border-black/30 hover:shadow-xl transition-all duration-300 bg-white/60 backdrop-blur-sm group-hover:bg-white/80 group-hover:scale-[1.02]">
        {/* Project Image */}
        {project.image && (
          <div className="relative h-48 sm:h-56 overflow-hidden bg-black/5">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {locked && (
              <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>🔒</span>
                <span className="uppercase tracking-widest">Protected</span>
              </div>
            )}
          </div>
        )}
        
        <div className="p-6 sm:p-8">
          <h3
            className="text-[28px] sm:text-[32px] mb-3 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.title}
          </h3>
          
          <div className="flex items-center gap-3 mb-4 text-[14px] sm:text-[15px] text-black/60">
            <span>{project.role}</span>
            <span>•</span>
            <span>{project.timeline}</span>
          </div>

          <p className="text-[15px] sm:text-[17px] leading-relaxed mb-5 text-black/80 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center justify-center bg-black/5 text-black border border-black/10 rounded-full text-[12px] sm:text-[13px] px-3 py-1"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="inline-flex items-center justify-center text-black/60 text-[12px] sm:text-[13px] px-2">
                +{project.tags.length - 3}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-[15px] group-hover:gap-3 transition-all duration-200">
            {locked ? (
              <>
                <span className="underline underline-offset-2">View case study</span>
                <span className="text-[13px] opacity-60">🔒</span>
              </>
            ) : (
              <>
                <span className="underline underline-offset-2">View case study</span>
                <span className="transform group-hover:translate-x-1 transition-transform duration-200">→</span>
              </>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
