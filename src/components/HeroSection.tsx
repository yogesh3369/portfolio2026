import { useState, useEffect } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

export const HeroSection = () => {
  const [showButtons, setShowButtons] = useState(false);

  const { displayed, done } = useTypewriter({
    text: "I design with methodology depth and systems thinking. Three years in, increasingly engineering-adjacent. Let's build something intentional.",
    speed: 38,
    startDelay: 600,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButtons(true);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yogesh.ai.ux@gmail.com');
  };

  const whitePillButtons = [
    'View my work',
    'Read case studies',
    'See my process',
    'Download resume',
  ];

  return (
    <section className="relative z-1 h-screen flex flex-col justify-end pb-12 md:justify-center md:pb-0 px-5 sm:px-8 md:px-10 overflow-hidden">
      <div className="max-w-xl relative z-10">
        {/* Blurred intro label */}
        <div
          className="pointer-events-none select-none mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: '1.3',
            fontWeight: 400,
            color: '#000',
            filter: 'blur(4px)',
          }}
        >
          Hey, I'm Yogesh,
          <br />
          Product Designer — systems thinker, OOUX practitioner
        </div>

        {/* Typewriter text */}
        <p
          className="text-black mb-5 sm:mb-6"
          style={{
            fontSize: 'clamp(18px, 4vw, 26px)',
            lineHeight: '1.35',
            fontWeight: 400,
            minHeight: '54px',
          }}
        >
          {displayed}
          {!done && (
            <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] blink" />
          )}
        </p>

        {/* Action pill buttons */}
        <div
          className="flex flex-wrap gap-y-1"
          style={{
            opacity: showButtons ? 1 : 0,
            transform: showButtons ? 'translateY(0)' : 'translateY(8px)',
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
        >
          {whitePillButtons.map((label) => (
            <button
              key={label}
              className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] hover:bg-black hover:text-white transition-colors duration-200"
              style={{ whiteSpace: 'nowrap' }}
            >
              {label}
            </button>
          ))}

          <button
            onClick={handleCopyEmail}
            className="inline-flex items-center justify-center text-white bg-transparent border border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] gap-2 sm:gap-3 hover:bg-white hover:text-black transition-colors duration-200"
            style={{ whiteSpace: 'nowrap' }}
          >
            <span>
              Email: <span className="underline" style={{ textDecorationSkipInk: 'none', textUnderlineOffset: '1px' }}>yogesh.ai.ux@gmail.com</span>
            </span>
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="inline-block"
            >
              <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
              <rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
