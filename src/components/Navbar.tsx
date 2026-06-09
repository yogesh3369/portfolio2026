import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

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
      <nav className="fixed top-0 left-0 right-0 z-10 px-5 sm:px-8 py-4 sm:py-5 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-60 transition-opacity">
          <span
            className="text-[21px] sm:text-[26px] tracking-tight text-black"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Yogesh
          </span>
          <span
            className="text-[25px] sm:text-[30px] text-black select-none"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center text-[23px] text-black gap-1">
          {navLinks.map((link, index) => (
            <span key={link} className="flex items-center gap-1">
              <button
                onClick={() => handleNavClick(link)}
                className="hover:opacity-60 transition-opacity cursor-pointer"
              >
                {link}
              </button>
              {index < navLinks.length - 1 && <span>,</span>}
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <button
          onClick={() => handleNavClick('Contact')}
          className="hidden md:block text-[23px] text-black underline underline-offset-2 hover:opacity-60 transition-opacity cursor-pointer"
        >
          Get in touch
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] z-20"
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
