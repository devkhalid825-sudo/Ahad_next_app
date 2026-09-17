'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import logoRaw from '@/assets/images/khalid.png';
import { getImgSrc } from '@/utils/api';

const logo = getImgSrc(logoRaw);

const PRODUCT_VIZ_NAV_LINKS = [
  { id: 'services', label: 'Capabilities' },
  { id: 'product-gallery', label: '3D Portfolio' },
  { id: 'why-us', label: 'Why Us' },
  { id: 'pipeline', label: 'Pipeline' },
  { id: 'scope-estimator', label: 'Scope Estimator' },
  { id: 'testimonials', label: 'Testimonials' },
];

const ProductVizHeader = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const headerRef = useRef(null);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    setActiveSection(id);
    const targetId = id === 'why-us' ? 'comparison' : id === 'scope-estimator' ? 'contact' : id;
    const el = document.getElementById(targetId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const scrollY = window.scrollY + 180;
      const sectionMapping = [
        { id: 'contact', navId: 'scope-estimator' },
        { id: 'testimonials', navId: 'testimonials' },
        { id: 'pipeline', navId: 'pipeline' },
        { id: 'services', navId: 'services' },
        { id: 'product-gallery', navId: 'product-gallery' },
        { id: 'comparison', navId: 'why-us' },
      ];

      for (const section of sectionMapping) {
        const el = document.getElementById(section.id);
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(section.navId);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const serviceSubItems = [
    { name: 'Cinematic 3D Product & Commercial Visuals', href: '/services/3d-product-visualization' },
    { name: 'Interactive 3D Web & Product Configurators', href: '/services/3d-product-configurators' },
    { name: 'Real-Time ArchViz & Spatial VR/AR', href: '/services/architectural-visualization' },
  ];

  const headerBgClass = isMenuOpen
    ? 'bg-black'
    : isScrolled
      ? isLightSection
        ? 'bg-white/40 backdrop-blur-xl shadow-sm'
        : 'bg-black/40 backdrop-blur-xl'
      : 'bg-transparent';

  const headerPaddingClass = 'px-7 sm:px-6 md:px-8 pt-6 pb-3 sm:py-3.5 md:py-4';
  const logoSizeClass = 'h-6 sm:h-8 md:h-10 lg:h-12';

  return (
    <header className={`fixed top-0 left-0 w-full ${headerPaddingClass} ${headerBgClass} z-50 transition-all duration-300 flex items-center`}>
      <nav
        ref={headerRef}
        className="w-full flex items-center"
      >
        <div className="w-full flex justify-between items-center relative z-50">
          {/* Logo */}
          <Link
            href="/"
            className="cursor-pointer relative z-50 flex items-center justify-center shrink-0 self-center"
            onClick={() => setIsMenuOpen(false)}
          >
            <img
              src={logo}
              alt="Elipse Studio"
              width="230"
              height="105"
              className={`${logoSizeClass} w-auto object-contain transition-transform duration-300 hover:scale-105 block self-center ${isLightSection ? 'invert' : ''
                }`}
            />
          </Link>

          {/* In-Page Navigation Links for 3D Product Visualization */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto my-auto">
            {PRODUCT_VIZ_NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => scrollToSection(e, item.id)}
                  className={`text-xs xl:text-[13px] font-medium tracking-wide uppercase transition-colors duration-200 cursor-pointer ${isActive ? 'text-[#8ca8ff] font-semibold' : isLightSection ? 'text-zinc-700 hover:text-black' : 'text-zinc-300 hover:text-white'
                    }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Right actions: Contact & Hamburger menu */}
          <div className="flex items-center gap-3 sm:gap-5 relative z-50 shrink-0 self-center">
            <button
              onClick={() => {
                setIsMenuOpen(false);
                router.push('/contact');
              }}
              className={`hidden md:flex px-6 sm:px-7 h-10 sm:h-11 items-center justify-center border ${isLightSection
                ? 'border-black/20 hover:border-[#4169E1] text-black hover:text-[#4169E1]'
                : 'border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1]'
                } bg-transparent rounded-full text-xs sm:text-[13px] font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(65,105,225,0.3)] transition-all duration-300 backdrop-blur-md`}
            >
              Contact
            </button>
            <button
              onClick={toggleMenu}
              className={`focus:outline-none hover:scale-110 active:scale-95 p-1.5 flex items-center justify-center rounded-full transition-transform ${isLightSection ? 'text-black' : 'text-white'
                }`}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8"
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

        {/* Full screen menu drawer */}
        <div
          className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out z-40 overflow-y-auto flex flex-col pt-24 md:pt-32 pb-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
            }`}
        >
          {isMenuOpen && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
              <img src={logo} alt="Elipse Studio Logo" width="180" height="40" className="w-[80vw] max-w-4xl -rotate-12 opacity-50" />
            </div>
          )}

          <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-20 mt-auto mb-auto">
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
                        className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-[320px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'
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

export default ProductVizHeader;
