import { Link } from 'react-router-dom';
import { Project } from '../data/projects';
import { playEnterCaseStudy } from '../hooks/useSoundEffects';

interface ProjectCardProps {
  project: Project;
  locked?: boolean;
  index: number;
}

export const ProjectCard = ({ project, locked = false, index }: ProjectCardProps) => {
  return (
    <Link
      to={`/work/${project.slug}`}
      onClick={playEnterCaseStudy}
      className="block group relative w-full h-[68vh] max-h-[620px] rounded-2xl overflow-hidden"
      style={locked ? { cursor: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'32\' height=\'32\' viewBox=\'0 0 32 32\'%3E%3Ctext y=\'26\' font-size=\'26\'%3E%F0%9F%94%92%3C/text%3E%3C/svg%3E") 8 8, pointer' } : {}}
    >
      {/* Full-bleed background image */}
      {project.image ? (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-black/80" />
      )}

      {/* Gradient overlay — heavier at bottom */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 35%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      {/* Top-left: index + label */}
      <div className="absolute top-8 left-9 flex items-center gap-3">
        <div className="w-[6px] h-[6px] rounded-full bg-white/60 shrink-0" />
        <span className="text-[11px] tracking-[0.22em] uppercase font-medium text-white/60 font-mono">
          {String(index + 1).padStart(2, '0')} — {project.tags[0]}
        </span>
      </div>

      {/* Top-right: locked badge */}
      {locked && (
        <div className="absolute top-8 right-9 flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/70 text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/20">
          <span>🔒</span>
          <span className="uppercase tracking-widest text-[10px]">Protected</span>
        </div>
      )}

      {/* Ghost index — decorative */}
      <div
        className="absolute top-5 right-9 text-[7rem] font-black leading-none select-none pointer-events-none"
        style={{
          color: 'transparent',
          WebkitTextStroke: '1px rgba(255,255,255,0.12)',
          lineHeight: 1,
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-9 pb-10">
        <p className="text-[11px] tracking-[0.2em] uppercase mb-3 font-medium text-white/50 font-mono">
          {project.role} · {project.timeline}
        </p>

        <h2
          className="text-white font-black mb-5 leading-[1.05]"
          style={{
            fontSize: 'clamp(2rem, 4.5vw, 3.2rem)',
            letterSpacing: '-0.01em',
          }}
        >
          {project.title}
        </h2>

        <div className="flex items-start gap-4 mb-6">
          <div className="h-[1px] w-8 shrink-0 mt-[10px] bg-white/40" />
          <p className="text-white/65 text-[13px] leading-relaxed max-w-[52ch]">
            {project.description}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.1em] uppercase px-3 py-1 rounded-full border border-white/20 text-white/60 font-mono"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase font-semibold text-white/80 group-hover:text-white transition-colors font-mono">
            {locked ? 'View case study 🔒' : (
              <>
                View case study
                <svg width="28" height="10" viewBox="0 0 28 10" fill="none" aria-hidden="true" className="transform group-hover:translate-x-1 transition-transform duration-200">
                  <path d="M0 5h26M22 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </>
            )}
          </span>
        </div>
      </div>
    </Link>
  );
};
