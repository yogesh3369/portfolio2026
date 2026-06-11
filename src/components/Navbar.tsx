import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight;
      
      // Show background when scrolled 50% past hero section, matching the video fade
      setIsScrolled(scrollPosition >= heroHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Work', 'About', 'Skills', 'Beyond Design'];

  const handleNavClick = (link: string) => {
    if (location.pathname !== '/') {
      window.location.href = `/#${link.toLowerCase().replace(' ', '-')}`;
    } else {
      const element = document.getElementById(link.toLowerCase().replace(' ', '-'));
      element?.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <div className="fixed top-4 sm:top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 pointer-events-none">
        <nav className={`pointer-events-auto relative rounded-full px-4 sm:px-6 py-2.5 sm:py-3 flex justify-between items-center w-full max-w-[1200px] overflow-hidden transition-all duration-700 ${
          isScrolled 
            ? 'shadow-[0_12px_40px_-8px_rgba(0,0,0,0.2)] border border-black/10' 
            : 'border border-transparent shadow-none'
        }`}>
          
          {/* Blur, Color & Noise Background */}
          <div 
            className={`absolute inset-0 z-0 transition-opacity duration-700 pointer-events-none ${
              isScrolled ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="absolute inset-0 bg-[#b5b2a8]/75 backdrop-blur-2xl" />
            {/* Subtle white inner ring for glass highlight */}
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-full" />
            <div 
              className="absolute inset-0 opacity-[0.12] mix-blend-overlay"
              style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
            />
          </div>

          {/* Logo */}
          <Link to="/" className="relative z-10 flex items-center gap-2 hover:opacity-60 transition-opacity ml-1 sm:ml-2">
            <span
              className="text-[20px] sm:text-[22px] tracking-tight text-black"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Yogesh
            </span>
            <span
              className="text-[22px] sm:text-[24px] text-black select-none"
              style={{ letterSpacing: '-0.02em' }}
            >
              ✳︎
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="relative z-10 hidden md:flex items-center text-[15px] lg:text-[16px] font-medium text-black/60 gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleNavClick(link)}
                className="hover:text-black px-4 py-2 rounded-full hover:bg-black/5 transition-all duration-300 cursor-pointer whitespace-nowrap"
              >
                {link}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavClick('Contact')}
            className="relative z-10 hidden md:block text-[15px] lg:text-[16px] text-black font-medium transition-all duration-300 cursor-pointer bg-transparent border border-black/10 hover:bg-black hover:text-white px-6 py-2.5 rounded-full mr-1 sm:mr-2"
          >
            Get in touch
          </button>

          {/* Mobile Hamburger */}
          <button
            className="relative z-10 md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-6 h-[2px] bg-black transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </button>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed inset-0 z-9 bg-white/95 backdrop-blur-sm flex flex-col justify-center px-8 gap-8 transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        style={{ zIndex: 9 }}
      >
        {navLinks.map((link) => (
          <button
            key={link}
            onClick={() => handleNavClick(link)}
            className="text-[32px] font-medium text-black text-left"
          >
            {link}
          </button>
        ))}
        <button
          onClick={() => handleNavClick('Contact')}
          className="text-[32px] font-medium text-black underline text-left"
        >
          Get in touch
        </button>
      </div>
    </>
  );
};
