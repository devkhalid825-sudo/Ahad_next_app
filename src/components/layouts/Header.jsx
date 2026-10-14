'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import logoRaw from '@/assets/images/khalid.png';
import iconWhiteRaw from '@/assets/images/elipse-icon-white.png';
import iconBlackRaw from '@/assets/images/elipse-icon-black.png';
import { getImgSrc } from '@/utils/api';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useTheme } from '@/components/providers/ThemeProvider';

const logo = getImgSrc(logoRaw);
const iconWhite = getImgSrc(iconWhiteRaw);
const iconBlack = getImgSrc(iconBlackRaw);

const LOCATIONS = [
  { name: 'Global', href: '/' },
  { name: 'United Kingdom', href: '/uk/services' },
  { name: 'Australia', href: '/au/services' },
  { name: 'United States', href: '/us/services' },
];

const HARDCODED_BLOG_SLUGS = new Set([
  'virtual-showrooms-vs-physical-retail-2026-roi-guide',
  'leap-2026',
  'leap-2026-wrap-up',
  'leap-2026-wrap-up-bilal-lania',
  'webgl-vs-unreal-engine-3d-configurator',
  'web-based-configurator',
  'immersive-ar-marketing',
  'industrial-animation',
  'automotive-configurator',
  'vr-reshaping-world',
  'immersive-experience-design',
  'immersive-tech-2026',
  'animated-videos-engagement',
  'furniture-configurator-2026',
  'educational-animation-2026',
  'vr-custom-development-2026',
  '3d-real-time-configurators-real-estate-dubai',
  'architectural-visualization-guide',
  'apparel-configurator-fashion-brands-2026',
  'why-product-photography-budget-3d-rendering-2026',
  '3d-animation-services-uk-2026',
  'interactive-web-experiences-au-2026',
  'vfx-services-us-2026',
  'interactive-3d-vs-cgi-production-pipeline-2026',
  '3d-architectural-visualisation-uk-property-developers-guide',
  'ar-product-visualization-ecommerce-brands-2026-guide',
  'what-happens-to-cad-file-when-you-hire-3d-animation-studio',
  'real-cost-bad-vr-training-simulations-2026',
]);

const Header = ({ isBelowVideoMobile = false, darkHero = false, hideThemeToggle = false }) => {
  const router = useRouter();
  const pathname = usePathname();
  const isHardcodedArticleRoute = React.useMemo(() => {
    if (!pathname || !pathname.startsWith('/blog/')) return false;
    const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
    return HARDCODED_BLOG_SLUGS.has(slug);
  }, [pathname]);

  const shouldHideThemeToggle = hideThemeToggle || isHardcodedArticleRoute;
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isLightSection, setIsLightSection] = useState(false);
  const [hasDarkHero, setHasDarkHero] = useState(darkHero);
  const { isLight } = useTheme();
  const isLightMode = isLight || isLightSection;
  const [locationOpen, setLocationOpen] = useState(false);
  const [mobileLocationOpen, setMobileLocationOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showBrandIcon, setShowBrandIcon] = useState(false);
  const [enterAnim, setEnterAnim] = useState(false);
  const [exitAnim, setExitAnim] = useState(false);
  const headerRef = useRef(null);
  const locationRef = useRef(null);
  const showBrandIconRef = useRef(showBrandIcon);
  const animTimerRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (darkHero || document.querySelector('.keep-dark-hero, .portfolio-hero-section, .case-studies-hero-section, .blogs-hero-section')) {
      setHasDarkHero(true);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Attach: play slide/fade-in when the header re-attaches (becomes fixed)
    if (showBrandIcon && !showBrandIconRef.current) {
      window.clearTimeout(animTimerRef.current);
      setExitAnim(false);
      setEnterAnim(true);
      animTimerRef.current = window.setTimeout(() => setEnterAnim(false), 500);
    }
    // Detach: play slide/fade-out first, then swap back to absolute/transparent
    else if (!showBrandIcon && showBrandIconRef.current) {
      setEnterAnim(false);
      setExitAnim(true);
      window.clearTimeout(animTimerRef.current);
      animTimerRef.current = window.setTimeout(() => setExitAnim(false), 480);
    }
    showBrandIconRef.current = showBrandIcon;
    return () => {
      window.clearTimeout(animTimerRef.current);
    };
  }, [showBrandIcon]);

  useEffect(() => {
    const handleScroll = () => {
      // Attach/detach with hysteresis so tiny scroll jitter around the
      // boundary cannot re-trigger the enter/exit animations repeatedly.
      const latestWorkEl = document.getElementById('latest-work');
      let shouldAttach = false;
      let shouldDetach = false;

      if (latestWorkEl) {
        const rect = latestWorkEl.getBoundingClientRect();
        shouldAttach = rect.top <= 120;
        shouldDetach = rect.top > 240;
      } else {
        // Fallback for pages that do not have a #latest-work section
        const desktopHero = document.getElementById('hero');
        const mobileHero = document.getElementById('hero-mobile');
        let heroEl = null;

        if (window.innerWidth >= 768 && desktopHero && desktopHero.offsetHeight > 0) {
          heroEl = desktopHero;
        } else if (mobileHero && mobileHero.offsetHeight > 0) {
          heroEl = mobileHero;
        } else {
          heroEl = desktopHero || mobileHero || document.querySelector('section');
        }

        if (heroEl && heroEl.offsetHeight > 0) {
          const rect = heroEl.getBoundingClientRect();
          shouldAttach = rect.bottom <= 80;
          shouldDetach = rect.bottom > 240;
        } else {
          shouldAttach = window.scrollY > 350;
          shouldDetach = window.scrollY < 200;
        }
      }

      const currentlyAttached = showBrandIconRef.current;
      if (shouldAttach && !currentlyAttached) {
        setShowBrandIcon(true);
      } else if (shouldDetach && currentlyAttached) {
        setShowBrandIcon(false);
      }

      setIsScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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

  const hamburgerPath = isMenuOpen ? 'M6 6l12 12M6 18L18 6' : 'M12 5v14M5 12h14';

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

  // Keep the fixed/scrolled look alive during exit so the fade-out is visible
  const isAttached = showBrandIcon || exitAnim;
  const isEffectiveLight = isMenuOpen ? false : ((hasDarkHero && !isAttached) ? false : isLightMode);

  const headerBgClass = isMenuOpen
    ? 'bg-black text-white header-menu-open'
    : isAttached
      ? isLightMode
        ? 'header-scrolled bg-white/95 backdrop-blur-xl text-black shadow-sm'
        : 'header-scrolled bg-black/90 backdrop-blur-xl text-white shadow-xl shadow-black/40'
      : isEffectiveLight
        ? 'bg-transparent text-black'
        : 'bg-transparent text-white';

  const positionClass = isMenuOpen
    ? 'fixed top-0 left-0 w-full'
    : isAttached
      ? 'fixed top-0 left-0 w-full'
      : 'absolute top-0 left-0 w-full';

  const headerHeightClass = 'h-[60px] sm:h-[68px] md:h-20';
  const headerPaddingClass = 'px-[15px] sm:px-8 md:px-12';
  const logoSizeClass = 'h-7 sm:h-8 md:h-9 lg:h-11';

  return (
    <>
      <header
        className={`${positionClass} ${headerHeightClass} ${headerPaddingClass} ${headerBgClass} ${enterAnim && !isMenuOpen ? 'header-enter' : ''} ${exitAnim && !isMenuOpen ? 'header-exit' : ''} z-50 transition-colors duration-200 ease-in-out flex items-center`}
      >
        <nav
          ref={headerRef}
          className="w-full flex items-center"
        >
          <div className="w-full flex justify-between items-center relative z-50">
<Link
            href="/"
            className="cursor-pointer relative z-50 flex items-center justify-center shrink-0 self-center"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Elipse Studio Home"
          >
            {/* Stacked logo slot: full logo and compact icon crossfade in place */}
            <div className={`grid ${showBrandIcon && !isMenuOpen ? 'place-items-start' : 'place-items-center'}`}>
              {/* Full Logo (Visible before reaching Latest Work / when menu open; swaps instantly) */}
              <img
                src={logo}
                alt="Elipse Studio"
                width="230"
                height="105"
                className={`${logoSizeClass} w-auto object-contain col-start-1 row-start-1 site-logo transition-transform duration-300 hover:scale-105 ${
                  showBrandIcon && !isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
                } ${isEffectiveLight && !isMenuOpen ? 'invert' : ''}`}
              />

              {/* Compact Brand Icon (already shown while the attach animation plays) */}
              <img
                src={isEffectiveLight && !isMenuOpen ? iconBlack : iconWhite}
                alt="Elipse Studio Icon"
                width="48"
                height="48"
                className={`h-7 sm:h-8 md:h-9 lg:h-10 w-auto object-contain col-start-1 row-start-1 site-logo transition-transform duration-300 hover:scale-110 ${
                  showBrandIcon && !isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </div>
          </Link>

            <div className="flex items-center gap-2 sm:gap-4 relative z-50 shrink-0 self-center">
              <div className="hidden" ref={locationRef}>
                <button
                  onClick={() => setLocationOpen((prev) => !prev)}
                  className={`px-4 h-8 sm:h-8.5 flex items-center justify-center gap-1.5 border ${
                    isEffectiveLight
                      ? 'border-black/20 hover:border-[#4169E1] text-black hover:text-[#4169E1]'
                      : 'border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1]'
                  } bg-transparent rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md`}
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
                className={`hidden md:flex px-6 sm:px-7 h-10 sm:h-11 items-center justify-center border ${
                  isEffectiveLight
                    ? 'border-black/30 hover:border-black text-black hover:bg-black/5'
                    : 'border-white/30 hover:border-white text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]'
                } bg-transparent rounded-full text-xs sm:text-[13px] font-semibold tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer`}
              >
                Contact Us
              </button>
              {!shouldHideThemeToggle && <ThemeToggle isLightMode={isEffectiveLight} />}
              <button
                onClick={toggleMenu}
                className={`focus:outline-none hover:scale-110 active:scale-95 p-1 flex items-center justify-center rounded-full transition-transform ${
                  isEffectiveLight && !isMenuOpen ? 'text-black' : 'text-white'
                }`}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-current"
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
        </nav>
      </header>

      {/* Full-Screen Portal Drawer (rendered directly on document.body to bypass all section clipping/transforms) */}
      {mounted &&
        createPortal(
          <div
            className={`site-header-drawer fixed inset-0 bg-[#050505]/98 backdrop-blur-2xl transition-all duration-300 ease-out z-[99999] flex flex-col ${
              isMenuOpen ? 'opacity-100 visible pointer-events-auto' : 'opacity-0 invisible pointer-events-none'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Site Navigation Menu"
          >
            {/* Top Bar inside Drawer (Matches Header position and height perfectly) */}
            <div className={`w-full ${headerHeightClass} ${headerPaddingClass} flex items-center justify-between shrink-0 relative z-50`}>
              <Link
                href="/"
                className="cursor-pointer relative z-50 flex items-center justify-center shrink-0 self-center"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Elipse Studio Home"
              >
                <img
                  src={logo}
                  alt="Elipse Studio"
                  width="230"
                  height="105"
                  className={`${logoSizeClass} w-auto object-contain transition-transform duration-300 hover:scale-105`}
                />
              </Link>

              <div className="flex items-center gap-2 sm:gap-4 relative z-50 shrink-0 self-center">
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    router.push('/contact');
                  }}
                  className="hidden md:flex px-6 sm:px-7 h-10 sm:h-11 items-center justify-center border border-white/30 hover:border-white text-white hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] bg-transparent rounded-full text-xs sm:text-[13px] font-semibold tracking-wider transition-all duration-300 backdrop-blur-md cursor-pointer"
                >
                  Contact Us
                </button>
                {!shouldHideThemeToggle && <ThemeToggle className="!text-white !border-white/20 !bg-white/5" />}
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="focus:outline-none hover:scale-110 active:scale-95 p-1 flex items-center justify-center rounded-full transition-transform text-white cursor-pointer"
                  aria-label="Close menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12M6 18L18 6" className="transition-all duration-300" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation Content */}
            <div className="relative z-10 flex-1 min-h-0 w-full max-w-7xl mx-auto px-6 md:px-20 overflow-y-auto overscroll-contain">
              <div className="min-h-full flex items-center justify-center py-6">
                <ul className="grid grid-cols-1 gap-y-2 w-full">
                {menuItems.map((item, index) => (
                  <li key={index} className="group">
                    {item.hasSubmenu ? (
                      <>
                        <button
                          onClick={() => setServicesOpen(!servicesOpen)}
                          className="text-white text-2xl md:text-4xl lg:text-5xl font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-flex items-center gap-2 leading-tight font-sans bg-transparent border-none cursor-pointer text-left"
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
                            servicesOpen ? 'max-h-[320px] opacity-100 mt-2' : 'max-h-0 opacity-0'
                          }`}
                        >
                          <div className="pl-3 md:pl-4 border-l-2 border-[#4169E1]/30 space-y-1.5 md:space-y-1 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#4169E1] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                            {serviceSubItems.map((sub, i) => (
                              <Link
                                key={i}
                                href={sub.href}
                                onClick={() => {
                                  setIsMenuOpen(false);
                                  setServicesOpen(false);
                                }}
                                className="block text-white/80 text-sm md:text-base lg:text-lg font-medium hover:text-[#4169E1] transition-colors duration-200 py-0.5"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (item.name === 'Contact' || item.name === 'Contact Us') ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="inline-flex items-center justify-center px-6 md:px-8 py-2.5 sm:py-3 rounded-full bg-[#4169E1] hover:bg-[#3158D4] text-white text-lg sm:text-xl md:text-2xl font-bold transition-all duration-300 shadow-[0_4px_25px_rgba(65,105,225,0.45)] hover:shadow-[0_4px_30px_rgba(65,105,225,0.7)] hover:scale-105 my-2 gap-2"
                      >
                        <span>Contact Us</span>
                        <span className="text-base md:text-lg">→</span>
                      </Link>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="text-white text-2xl md:text-4xl lg:text-5xl font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans py-1"
                      >
                        {item.name}
                      </Link>
                    )}
                  </li>
                ))}
                </ul>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Header;
