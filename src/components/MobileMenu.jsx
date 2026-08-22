'use client';


import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import logoRaw from '../assets/images/logo.webp';
import { getImgSrc } from '../utils/api';
const logo = getImgSrc(logoRaw);

const MobileMenu = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [servicesOpen, setServicesOpen] = useState(false);

    const menuItemsBefore = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Capabilities", href: "/capabilities" }
    ];

    const menuItemsAfter = [
        { name: "Portfolio", href: "/portfolio" },
        { name: "Case Studies", href: "/case-studies" },
        { name: "Blogs", href: "/blog" },
        { name: "Contact", href: "/contact" }
    ];

    const serviceSubItems = [
        { name: "Architectural Visualization", href: "/services/architectural-visualization" },
        { name: "3D Product Visualization", href: "/services/3d-product-visualization" },
        { name: "3D Product Configurators", href: "/services/3d-product-configurators" },
        { name: "Interactive Web Experiences", href: "/services/interactive-web-experiences" },
        { name: "VR Development", href: "/services/vr-development" },
        { name: "AR Development", href: "/services/ar-development" },
        { name: "3D Animation", href: "/services/3d-animation" },
        { name: "3D Product Animation", href: "/services/product-animation" },
        { name: "VFX & Virtual Production", href: "/services/vfx-virtual-production" },
        { name: "Virtual Showrooms & Digital Twins", href: "/services/virtual-showrooms-digital-twins" },
        { name: "Custom Software Development", href: "/services/custom-software-development" },
        { name: "Website Development", href: "/services/website-development" },
        { name: "Mobile App Development", href: "/services/mobile-app-development" },
        { name: "Creative Services", href: "/services/creative-services" },
        { name: "Enterprise Solutions", href: "/services/enterprise-solutions" },
        { name: "Marketing", href: "/services/marketing" }
    ];

    const handleNavigation = (item, e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
        router.push(item.href);
        onClose();
    };

    return (
        <div
            className={`fixed inset-0 bg-black transition-all duration-500 ease-in-out z-[100] flex flex-col ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}
        >
            {/* --- TOP BAR (Logo & Close) --- */}
            {/* Added px-8 to ensure elements don't touch screen edges */}
            <div className="flex justify-between items-center w-full px-8 pt-10 pb-6 md:p-10 relative z-[110]">
                <img src={logo} alt="Elipse Studio Logo" width="180" height="40" className="h-5 md:h-8 w-auto grayscale invert brightness-200" />

                <button
                    onClick={onClose}
                    className="text-white hover:text-[#4169E1] transition-colors focus:outline-none"
                    aria-label="Close menu"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* --- BACKGROUND WATERMARK --- */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                <img src={logo} alt="Elipse Studio Logo" width="180" height="40" className="w-[110vw] max-w-5xl -rotate-12 grayscale invert brightness-200" />
            </div>

            {/* --- MENU LINKS --- */}
            <div className="relative z-10 flex-grow flex items-center justify-center px-10 md:px-24 mt-auto mb-auto">
                <nav className="w-full max-w-7xl mx-auto">
                    <ul className="space-y-1.5 md:space-y-3">
                        {/* Items before Services */}
                        {menuItemsBefore.map((item, index) => (
                            <li key={index} className="group">
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavigation(item, e)}
                                    className="text-white text-2xl sm:text-3xl md:text-5xl font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans"
                                >
                                    {item.name}
                                    <span className="absolute -top-2 -right-6 md:-right-8 text-[#4169E1] text-xl font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 select-none">
                                        +
                                    </span>
                                </a>
                            </li>
                        ))}

                        {/* Services with submenu */}
                        <li className="group">
                            <button
                                onClick={() => setServicesOpen(!servicesOpen)}
                                className="text-white text-2xl sm:text-3xl md:text-5xl font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans bg-transparent border-none cursor-pointer text-left"
                            >
                                Services
                                <span className={`ml-3 text-[#4169E1] text-xl md:text-2xl font-light inline-block transition-transform duration-300 ${servicesOpen ? 'rotate-45' : ''}`}>
                                    +
                                </span>
                            </button>
                            <div className={`overflow-hidden transition-all duration-300 ${servicesOpen ? 'max-h-[280px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                <div className="pl-4 border-l-2 border-[#4169E1]/30 space-y-0.5 max-h-[220px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-[#4169E1] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
                                    {serviceSubItems.map((sub, i) => (
                                        <a
                                            key={i}
                                            href={sub.href}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                router.push(sub.href);
                                                onClose();
                                                setServicesOpen(false);
                                            }}
                                            className="block text-white/80 text-sm sm:text-base md:text-lg font-medium hover:text-[#4169E1] transition-colors duration-200"
                                        >
                                            {sub.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </li>

                        {/* Items after Services */}
                        {menuItemsAfter.map((item, index) => (
                            <li key={index} className="group">
                                <a
                                    href={item.href}
                                    onClick={(e) => handleNavigation(item, e)}
                                    className="text-white text-2xl sm:text-3xl md:text-5xl font-bold hover:text-[#4169E1] transition-colors duration-300 relative inline-block leading-tight font-sans"
                                >
                                    {item.name}
                                    <span className="absolute -top-2 -right-6 md:-right-8 text-[#4169E1] text-xl font-light opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 select-none">
                                        +
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default MobileMenu;
