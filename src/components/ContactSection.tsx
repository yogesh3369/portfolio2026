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
      <div className="max-w-4xl mx-auto w-full">
        <h2
          className="text-[36px] sm:text-[48px] md:text-[56px] mb-8 tracking-tight"
          style={{ fontFamily: 'var(--font-heading)' }}
        >
          Let's Connect
        </h2>

        <p className="text-[18px] sm:text-[22px] mb-12 text-black/70 max-w-2xl">
          Open to product design opportunities, design system collaborations, 
          or conversations about OOUX methodology and systems thinking.
        </p>

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
