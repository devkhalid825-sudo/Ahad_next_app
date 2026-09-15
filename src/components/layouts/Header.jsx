'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const logo = '/assets/logo.webp';

const LOCATIONS = [
  { name: 'Global', href: '/' },
  { name: 'United Kingdom', href: '/uk/services' },
  { name: 'Australia', href: '/au/services' },
  { name: 'United States', href: '/us/services' },
];

const Header = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef(null);
  const locationRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!locationOpen) return;
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [locationOpen]);

  useEffect(() => {
    const sections = document.querySelectorAll('[data-nav]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bg = entry.target.getAttribute('data-nav');
            setIsLightSection(bg === 'light');
          }
        });
      },
      { rootMargin: '-80px 0px 0px 0px' }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const hamburgerPath = isMenuOpen ? 'M6 6l12 12M6 18L18 6' : 'M4 8h16M4 16h16';

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Capabilities', href: '/capabilities' },
    { name: 'Services', href: '/services', hasSubmenu: true },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Industries', href: '/industries' },
    { name: 'Case Studies', href: '/case-studies' },
    { name: 'Blogs', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ];

  // Three enterprise pillars
  const serviceSubItems = [
    { name: 'Interactive 3D Web & Product Configurators', href: '/services/3d-product-configurators' },
    { name: 'Real-Time ArchViz & Spatial VR/AR', href: '/services/architectural-visualization' },
    { name: 'Cinematic 3D Product & Commercial Visuals', href: '/services/3d-product-visualization' },
  ];

  const headerBgClass = isMenuOpen
    ? 'bg-black'
    : isScrolled
      ? isLightSection
        ? 'bg-white/40 backdrop-blur-xl border-b border-black/5 shadow-sm'
        : 'bg-black/10 backdrop-blur-xl border-b border-white/10'
      : 'bg-transparent';

  const headerPaddingClass = 'py-3 sm:py-4 md:py-5';
  const logoSizeClass = 'h-10 sm:h-14 md:h-16 lg:h-20';

  return (
    <header className={`fixed top-0 left-0 w-full px-4 sm:px-6 md:px-8 ${headerPaddingClass} ${headerBgClass} z-50 transition-all duration-300`}>
    <nav
      ref={headerRef}
      className="w-full"
    >
      <div className="flex justify-between items-center relative z-50">
        <Link
          href="/"
          className="cursor-pointer relative z-50 flex items-center"
          onClick={() => setIsMenuOpen(false)}
        >
          <img
            src={logo}
            alt="Elipse Studio"
            width="230"
            height="105"
            className={`${logoSizeClass} w-auto object-contain transition-transform duration-300 hover:scale-105 ${
              isLightSection ? 'invert' : ''
            }`}
          />
        </Link>

        <div className="flex items-center gap-6 relative z-50">
          <div className="hidden" ref={locationRef}>
            <button
              onClick={() => setLocationOpen((prev) => !prev)}
              className={`w-[130px] h-11 flex items-center justify-center gap-1.5 border ${
                isLightSection
                  ? 'border-black/20 hover:border-[#4169E1] text-black hover:text-[#4169E1]'
                  : 'border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1]'
              } bg-transparent rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 backdrop-blur-md`}
              aria-haspopup="true"
              aria-expanded={locationOpen}
            >
              Location
              <span className={`text-[10px] transition-transform duration-200 ${locationOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            {locationOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-xl overflow-hidden">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.href}
                    href={loc.href}
                    onClick={() => setLocationOpen(false)}
                    className="block px-5 py-3.5 text-sm font-semibold text-white/90 hover:bg-white/10 hover:text-[#4169E1] transition-colors"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsMenuOpen(false);
              router.push('/contact');
            }}
            className={`hidden md:flex w-[130px] h-11 items-center justify-center border ${
              isLightSection
                ? 'border-black/20 hover:border-[#4169E1] text-black hover:text-[#4169E1]'
                : 'border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1]'
            } bg-transparent rounded-full text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(65,105,225,0.3)] transition-all duration-300 backdrop-blur-md`}
          >
            Contact
          </button>
          <button
            onClick={toggleMenu}
            className={`focus:outline-none hover:scale-110 active:scale-95 p-2 rounded-full transition-transform ${
              isLightSection ? 'text-black' : 'text-white'
            }`}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            >
              <path d={hamburgerPath} className="transition-all duration-300" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out z-40 overflow-y-auto flex flex-col pt-24 md:pt-32 pb-8 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        {isMenuOpen && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
            <img src={logo} alt="Elipse Studio Logo" width="180" height="40" className="w-[80vw] max-w-4xl -rotate-12 opacity-50" />
          </div>
        )}

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 mt-auto mb-auto">
          <div className="hidden">
            <button
              onClick={() => setMobileLocationOpen((prev) => !prev)}
              className="flex items-center gap-2 border border-white/20 text-white/90 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:border-[#4169E1] hover:text-[#4169E1] transition-colors"
            >
              Location
              <span className={`text-[10px] transition-transform duration-200 ${mobileLocationOpen ? 'rotate-180' : ''}`}>▾</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileLocationOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="flex flex-col gap-1 pl-1">
                {LOCATIONS.map((loc) => (
                  <Link
                    key={loc.href}
                    href={loc.href}
                    onClick={() => {
                      setIsMenuOpen(false);
                      setMobileLocationOpen(false);
                    }}
                    className="text-white/80 text-sm font-medium hover:text-[#4169E1] transition-colors py-1"
                  >
                    {loc.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <ul className="grid grid-cols-1 max-h-[900px]:grid-cols-2 gap-x-16 gap-y-1 max-h-[900px]:gap-y-0.5">
            {menuItems.map((item, index) => (
              <li key={index} className="group">
                {item.hasSubmenu ? (
                  <>
                    <button
                      onClick={() => setServicesOpen(!servicesOpen)}
                      className="text-white text-2xl md:text-4xl lg:text-5xl max-h-[900px]:text-xs max-h-[900px]:sm:text-sm max-h-[900px]:md:text-base max-h-[900px]:lg:text-lg font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-flex items-center gap-2 leading-tight font-sans bg-transparent border-none cursor-pointer text-left"
                    >
                      <span>{item.name}</span>
                      <svg
                        className="w-4 h-4 md:w-6 md:h-6 text-[#4169E1] transition-transform duration-300 select-none flex-shrink-0"
                        style={{ transform: servicesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        servicesOpen ? 'max-h-[320px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="pl-3 md:pl-4 border-l-2 border-[#4169E1]/30 space-y-0.5 max-h-[900px]:space-y-0 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#4169E1] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                        {serviceSubItems.map((sub, i) => (
                          <Link
                            key={i}
                            href={sub.href}
                            onClick={() => {
                              setIsMenuOpen(false);
                              setServicesOpen(false);
                            }}
                            className="block text-white/80 text-sm md:text-base lg:text-lg max-h-[900px]:text-[10px] max-h-[900px]:sm:text-xs font-medium hover:text-[#4169E1] transition-colors duration-200"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-white text-2xl md:text-4xl lg:text-5xl max-h-[900px]:text-xs max-h-[900px]:sm:text-sm max-h-[900px]:md:text-base max-h-[900px]:lg:text-lg font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
    </header>
  );
};

export default Header;
