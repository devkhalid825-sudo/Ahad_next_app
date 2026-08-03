'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
const logo = '/assets/logo.webp';

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [servicesOpen, setServicesOpen] = useState(false);
    const [isLightSection, setIsLightSection] = useState(false);
    const headerRef = useRef(null);

    useEffect(() => {
        const sections = document.querySelectorAll('[data-nav]');
        if (!sections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bg = entry.target.getAttribute('data-nav');
                    setIsLightSection(bg === 'light');
                }
            });
        }, { rootMargin: '-80px 0px 0px 0px' });

        sections.forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    const hamburgerPath = isMenuOpen
        ? 'M6 6l12 12M6 18L18 6'
        : 'M4 8h16M4 16h16';

    const menuItems = [
        { name: "Home", href: "#" },
        { name: "About Us", href: "#about" },
        { name: "Capabilities", href: "#capabilities" },
        { name: "Services", href: "#services", hasSubmenu: true },
        { name: "Portfolio", href: "/portfolio" },
        { name: "Industries", href: "/industries" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Blogs", href: "/blog" },
        { name: "Contact", href: "#contact" }
    ];

    const serviceSubItems = [
        { name: "Architectural Visualization", href: "/services/architectural-visualization" },
        { name: "3D Product Visualization", href: "/services/3d-product-visualization" },
        { name: "3D Product Configurators", href: "/services/3d-product-configurators" },
        { name: "Interactive Web Experiences", href: "/services/interactive-web-experiences" },
        { name: "VR Development", href: "/services/vr-development" },
        { name: "AR Development", href: "/services/ar-development" },
        { name: "3D Animation", href: "/services/3d-animation" },
        { name: "VFX & Virtual Production", href: "/services/vfx-virtual-production" },
        { name: "Virtual Showrooms & Digital Twins", href: "/services/virtual-showrooms-digital-twins" },
        { name: "Custom Software Development", href: "/services/custom-software-development" },
        { name: "Website Development", href: "/services/website-development" },
        { name: "Mobile App Development", href: "/services/mobile-app-development" },
        { name: "Creative Services", href: "/services/creative-services" },
        { name: "Enterprise Solutions", href: "/services/enterprise-solutions" },
        { name: "Marketing", href: "/services/marketing" }
    ];

    return (
        <nav ref={headerRef} className={`fixed top-0 left-0 w-full p-6 z-50 transition-all duration-300 ${isMenuOpen ? '' : isLightSection ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            <div className="flex justify-between items-center relative z-50">
                <a
                    href="/"
                    className="cursor-pointer relative z-50"
                    onClick={(e) => {
                        e.preventDefault();
                        navigate('/');
                        setIsMenuOpen(false);
                    }}
                >
                    <img
                        src={logo}
                        alt="Elipse Studio"
                        width="230"
                        height="105"
                        className={`h-16 md:h-24 w-auto object-contain transition-all duration-300 hover:scale-105 ${isLightSection ? 'brightness-0' : 'drop-shadow-md'}`}
                    />
                </a>

                <div className="flex items-center gap-6 relative z-50">
                    <button
                        onClick={() => navigate('/contact')}
                        className={`hidden md:block border ${isLightSection ? 'border-black/20 hover:border-[#4169E1] text-black hover:text-[#4169E1]' : 'border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1]'} bg-transparent px-9 py-3.5 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(65,105,225,0.3)] transition-all duration-300 transform hover:scale-105 active:scale-95 backdrop-blur-md`}
                    >
                        Contact
                    </button>
                    <button
                        onClick={toggleMenu}
                        className={`focus:outline-none hover:scale-110 active:scale-95 p-2 rounded-full transition-transform ${isLightSection ? 'text-black' : 'text-white'}`}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
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
                className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out z-40 overflow-y-auto flex flex-col pt-24 md:pt-32 pb-8 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                    }`}
            >
                {isMenuOpen && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
                        <img
                            src={logo}
                            alt=""
                            className="w-[80vw] max-w-4xl -rotate-12 opacity-50 grayscale invert brightness-200"
                        />
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
                                            className="text-white text-2xl md:text-4xl lg:text-5xl max-h-[900px]:text-xs max-h-[900px]:sm:text-sm max-h-[900px]:md:text-base max-h-[900px]:lg:text-lg font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans bg-transparent border-none cursor-pointer text-left"
                                        >
                                            {item.name}
                                            <span className="ml-2 text-[#4169E1] text-base md:text-lg max-h-[900px]:text-[10px] max-h-[900px]:sm:text-xs font-light transition-transform duration-300 inline-block select-none" style={{ transform: servicesOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                                                +
                                            </span>
                                        </button>
                                        <div className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-[320px] opacity-100 mt-0.5' : 'max-h-0 opacity-0'}`}>
                                            <div className="pl-3 md:pl-4 border-l-2 border-[#4169E1]/30 space-y-0.5 max-h-[900px]:space-y-0 max-h-[220px] overflow-y-auto pr-2 scrollbar-thin [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#4169E1] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                                {serviceSubItems.map((sub, i) => (
                                                    <a
                                                        key={i}
                                                        href={sub.href}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            navigate(sub.href);
                                                            setIsMenuOpen(false);
                                                            setServicesOpen(false);
                                                        }}
                                                        className="block text-white/80 text-sm md:text-base lg:text-lg max-h-[900px]:text-[10px] max-h-[900px]:sm:text-xs font-medium hover:text-[#4169E1] transition-colors duration-200"
                                                    >
                                                        {sub.name}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <a
                                        href={item.href}
                                        onClick={(e) => {
                                            if (item.name === "Contact") {
                                                e.preventDefault();
                                                navigate('/contact');
                                            } else if (item.name === "Blogs") {
                                                e.preventDefault();
                                                navigate('/blog');
                                            } else if (item.name === "About Us") {
                                                e.preventDefault();
                                                navigate('/about');
                                            } else if (item.name === "Capabilities") {
                                                e.preventDefault();
                                                navigate('/capabilities');
                                            } else if (item.name === "Home") {
                                                e.preventDefault();
                                                window.scrollTo(0, 0);
                                                navigate('/');
                                            } else if (item.name === "Portfolio") {
                                                e.preventDefault();
                                                navigate('/portfolio');
                                            } else if (item.name === "Industries") {
                                                e.preventDefault();
                                                navigate('/industries');
                                            } else if (item.name === "Case Studies") {
                                                e.preventDefault();
                                                navigate('/case-studies');
                                            }
                                            setIsMenuOpen(false);
                                        }}
                                        className="text-white text-2xl md:text-4xl lg:text-5xl max-h-[900px]:text-xs max-h-[900px]:sm:text-sm max-h-[900px]:md:text-base max-h-[900px]:lg:text-lg font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans"
                                    >
                                        {item.name}
                                        <span className="absolute -top-1 -right-5 md:-right-6 text-[#4169E1] text-xs md:text-sm max-h-[900px]:text-[8px] max-h-[900px]:sm:text-[10px] font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 select-none">
                                            +
                                        </span>
                                    </a>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
