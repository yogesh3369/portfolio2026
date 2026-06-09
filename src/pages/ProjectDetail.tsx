import { useParams, Link, Navigate } from 'react-router-dom';
import { projects } from '../data/projects';

export const ProjectDetail = () => {
  const { projectSlug } = useParams<{ projectSlug: string }>();
  const project = projects.find((p) => p.slug === projectSlug);

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="relative z-1 min-h-screen py-24 sm:py-32 px-5 sm:px-8 md:px-10">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[15px] mb-8 hover:opacity-60 transition-opacity"
        >
          <span>←</span>
          <span>Back to work</span>
        </Link>

        {/* Project header */}
        <div className="mb-12">
          <h1
            className="text-[42px] sm:text-[56px] md:text-[64px] mb-4 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {project.title}
          </h1>
          
          <div className="flex items-center gap-3 mb-6 text-[16px] sm:text-[18px] text-black/60">
            <span>{project.role}</span>
            <span>•</span>
            <span>{project.timeline}</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center justify-center bg-black/5 text-black border border-black/10 rounded-full text-[13px] sm:text-[14px] px-4 py-2"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Project content sections */}
        <div className="space-y-16">
          {project.overview && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Overview
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.overview}
              </p>
            </section>
          )}

          {project.problem && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Problem
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.problem}
              </p>
            </section>
          )}

          {project.methodology && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Methodology
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.methodology}
              </p>
            </section>
          )}

          {project.process && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Process
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.process}
              </p>
            </section>
          )}

          {project.solution && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Solution
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.solution}
              </p>
            </section>
          )}

          {project.learnings && (
            <section>
              <h2
                className="text-[28px] sm:text-[36px] mb-4 tracking-tight"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                Key Learnings
              </h2>
              <p className="text-[17px] sm:text-[20px] leading-relaxed text-black/80">
                {project.learnings}
              </p>
            </section>
          )}
        </div>

        {/* Navigation to other projects */}
        <div className="mt-20 pt-12 border-t border-black/10">
          <h3
            className="text-[24px] sm:text-[28px] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Other Projects
          </h3>
          <div className="flex flex-wrap gap-3">
            {projects
              .filter((p) => p.slug !== projectSlug)
              .map((p) => (
                <Link
                  key={p.slug}
                  to={`/work/${p.slug}`}
                  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[14px] sm:text-[16px] px-5 sm:px-6 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors duration-200"
                >
                  {p.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
