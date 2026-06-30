import { useState } from 'react';

export const ContactSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('yogesh.ai.ux@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: 'LinkedIn', url: '#', placeholder: true },
    { name: 'GitHub', url: '#', placeholder: true },
    { name: 'Dribbble', url: '#', placeholder: true },
  ];

  return (
    <section id="contact" className="relative z-1 min-h-screen py-20 sm:py-28 px-5 sm:px-8 md:px-10 flex items-center">
      <div className="max-w-[1200px] mx-auto w-full">
        {/* Section Header - Left Aligned Stacked */}
        <div className="mb-14 space-y-5">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-[13px] text-black/50 font-mono">
              07
            </div>
            <div className="tracking-wide font-mono text-[13px] text-black/60 uppercase">
              Contact <span className="text-blue-600 font-bold ml-1">///</span>
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
            Let's Connect
          </h2>
          
          <p className="text-[18px] sm:text-[20px] text-black/60 max-w-2xl leading-relaxed">
            Open to product design opportunities, design system collaborations, or conversations about OOUX methodology and systems thinking.
          </p>
        </div>

        <div className="space-y-8">
          <div>
            <h3
              className="text-[20px] sm:text-[24px] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Email
            </h3>
            <button
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-3 text-[20px] sm:text-[26px] hover:opacity-60 transition-opacity group"
            >
              <span className="underline underline-offset-4">yogesh.ai.ux@gmail.com</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <rect x="3" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
                <rect x="1" y="1" width="8" height="8" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
              {copied && (
                <span className="text-[14px] text-black/60">Copied!</span>
              )}
            </button>
          </div>

          <div>
            <h3
              className="text-[20px] sm:text-[24px] mb-4 tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[14px] sm:text-[16px] px-5 sm:px-6 py-2 sm:py-3 hover:bg-black hover:text-white transition-colors duration-200"
                  onClick={(e) => {
                    if (link.placeholder) {
                      e.preventDefault();
                      alert('Link placeholder - update with your actual profile URL');
                    }
                  }}
                >
                  {link.name}
                  {link.placeholder && <span className="ml-2 text-[11px] opacity-50">(placeholder)</span>}
                </a>
              ))}
            </div>
          </div>

          <div className="pt-8 border-t border-black/10">
            <p className="text-[15px] sm:text-[17px] text-black/60">
              Currently based in India • Available for remote opportunities • 
              Preferred contact: Email
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
