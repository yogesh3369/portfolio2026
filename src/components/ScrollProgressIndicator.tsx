import { useEffect, useState } from 'react';

export const ScrollProgressIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollableHeight = documentHeight - windowHeight;
      const progress = (scrollTop / scrollableHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const remainingProgress = 100 - scrollProgress;

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-black/5 z-30">
        <div
          className="h-full bg-black transition-all duration-300"
          style={{
            width: `${scrollProgress}%`,
          }}
        />
      </div>

      {/* Scroll progress badge - bottom right */}
      <div className="fixed bottom-6 right-6 z-30 hidden lg:block">
        <div className="bg-black/90 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2.5 shadow-xl">
          <div className="flex items-center gap-2.5">
            <div className="relative w-10 h-10">
              {/* Background circle */}
              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="3"
                />
                {/* Progress circle */}
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray={`${scrollProgress} ${100 - scrollProgress}`}
                  strokeLinecap="round"
                  className="transition-all duration-300"
                />
              </svg>
              {/* Percentage text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-emerald-400 font-mono">
                  {Math.round(scrollProgress)}
                </span>
              </div>
            </div>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-widest text-white/40 font-mono leading-none mb-0.5">
                {remainingProgress > 5 ? 'Reading' : 'Complete'}
              </div>
              <div className="text-[13px] font-semibold text-white leading-none">
                {remainingProgress > 5 ? `${Math.round(remainingProgress)}% left` : 'Done'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
