import { OOUXProcess } from './OOUXProcess';

export const AboutSection = () => {
  return (
    <section id="about" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10">
      <div className="max-w-[1200px] mx-auto w-full">
        <h2
          className="text-[36px] sm:text-[48px] md:text-[56px] mb-8 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          About
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <p className="text-[18px] sm:text-[22px] leading-relaxed text-black/80 mb-6">
              Product Designer specializing in <strong>systems thinking</strong> and <strong>OOUX/ORCA methodology</strong> — 
              surfacing structural relationships invisible at the screen level.
            </p>
            <p className="text-[16px] sm:text-[18px] leading-relaxed text-black/70">
              Despite having no formal engineering background, I've built and published npm packages, 
              created React component libraries, and work increasingly engineering-adjacent. 
              This hybrid skillset bridges design methodology with practical implementation.
            </p>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border border-black/10 rounded-lg p-6 sm:p-8">
            <h3
              className="text-[20px] sm:text-[24px] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Design Philosophy
            </h3>
            <ul className="space-y-3 text-[15px] sm:text-[17px] text-black/70">
              <li className="flex items-start gap-3">
                <span className="text-black/40 mt-1">✳︎</span>
                <span>Systems thinking over screen-level solutions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black/40 mt-1">✳︎</span>
                <span>Methodology depth over surface aesthetics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-black/40 mt-1">✳︎</span>
                <span>Structural integrity before visual polish</span>
              </li>
            </ul>
          </div>
        </div>

        <OOUXProcess />
      </div>
    </section>
  );
};
