'use client';

import React, { useEffect } from 'react';
import { getImgSrc } from '../utils/api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import _backgroundImage from '../assets/About-page/service.webp';
import serviceInnerImg from '../assets/About-page/service-inner.webp';
const backgroundImage = getImgSrc(_backgroundImage);

const services = [
    {
        title: "Architectural Visualization",
        slug: "architectural-visualization",
        description: "Photorealistic architectural visualization for developers, architects, and design firms worldwide. 3D renderings, VR walkthroughs, and interactive platforms.",
        icon: "🏛"
    },
    {
        title: "3D Product Visualization",
        slug: "3d-product-visualization",
        description: "Photorealistic 3D product rendering for e-commerce, manufacturers, and DTC brands. Hero renders, 360° views, and lifestyle shots.",
        icon: "📦"
    },
    {
        title: "3D Product Configurators",
        slug: "3d-product-configurators",
        description: "Custom 3D product configurators for e-commerce brands. Real-time customization with photoreal previews integrated with Shopify, WooCommerce, Magento.",
        icon: "⚙"
    },
    {
        title: "Interactive Web Experiences",
        slug: "interactive-web-experiences",
        description: "Immersive interactive web experiences combining 3D, motion, and WebGL. Award-quality digital campaigns for brands and agencies.",
        icon: "🌐"
    },
    {
        title: "VR Development",
        slug: "vr-development",
        description: "Custom VR development for enterprise training, sales, and marketing. Meta Quest 3, HTC Vive, Varjo XR-4 with Unreal Engine 5.",
        icon: "VR"
    },
    {
        title: "AR Development",
        slug: "ar-development",
        description: "Custom AR development for retail, real estate, and marketing. ARKit, ARCore, and WebAR with no app download required.",
        icon: "AR"
    },
    {
        title: "3D Animation",
        slug: "3d-animation",
        description: "Cinematic 3D animation and motion graphics for brands and enterprises. Architectural walkthroughs, product animation, explainer videos.",
        icon: "▶"
    },
    {
        title: "VFX & Virtual Production",
        slug: "vfx-virtual-production",
        description: "VFX and virtual production services for film, commercial, and brand content. CG visual effects, compositing, LED wall production.",
        icon: "🎬"
    },
    {
        title: "Virtual Showrooms & Digital Twins",
        slug: "virtual-showrooms-digital-twins",
        description: "Immersive virtual showrooms and photorealistic digital twins for brands, developers, and enterprises worldwide.",
        icon: "🔮"
    },
    {
        title: "Custom Software Development",
        slug: "custom-software-development",
        description: "Custom software development for enterprises and startups. Web apps, SaaS platforms, ERP/CRM, APIs, and cloud-native architecture.",
        icon: "💻"
    },
    {
        title: "Website Development",
        slug: "website-development",
        description: "Custom website development with WordPress, Next.js, and JAMstack. SEO, mobile-first responsive design, and Core Web Vitals optimization.",
        icon: "</>"
    },
    {
        title: "Mobile App Development",
        slug: "mobile-app-development",
        description: "Custom mobile app development for iOS, Android, and cross-platform. Swift, Kotlin, React Native, Flutter.",
        icon: "📱"
    },
    {
        title: "Creative Services",
        slug: "creative-services",
        description: "Brand identity, motion graphics, video production, graphic design, UI/UX design, and photography & illustration.",
        icon: "🎨"
    },
    {
        title: "Enterprise Solutions",
        slug: "enterprise-solutions",
        description: "Scalable enterprise-grade solutions including cloud, ERP, custom software, data analytics, cybersecurity, and IT consulting.",
        icon: "🏢"
    },
    {
        title: "Marketing",
        slug: "marketing",
        description: "Data-driven marketing strategies including SEO/SEM, social media, content strategy, email marketing, and analytics.",
        icon: "📊"
    }
];

const ServicesPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    

return (

    <>
        

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white min-h-screen font-sans"
        >
            <section className="relative min-h-screen px-6 md:px-16 pt-[140px] pb-[3rem] flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <Header />
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="max-w-[1600px] mx-auto w-full">
                        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center">
                            <div className="flex-1">

                                <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-[#F2F0EB] leading-[1.0] tracking-tight mb-6">
                                    Digital solutions that move markets<span className="text-[#4169E1]">.</span>
                                </h1>
                                <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
                                    From web and mobile to VR, AR, and animation — we build immersive digital experiences that engage audiences and drive results across every platform.
                                </p>
                                <div className="flex flex-row flex-wrap gap-3 md:gap-4">
                                    <button onClick={() => navigate('/contact')}
                                        className="bg-[#4169E1] hover:bg-[#3558c8] text-white px-5 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40">
                                        Start a Project
                                    </button>
                                    <button onClick={() => navigate('/portfolio')}
                                        className="text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-base font-medium transition-all">
                                        View Our Work
                                    </button>
                                </div>
                            </div>
                            <div className="flex-1 relative w-full flex justify-center lg:justify-end">
                                <div className="relative w-full max-w-[500px] aspect-[4/3]">
                                    <div className="relative bg-[#4169E1]/20 p-3 md:p-4 rounded-[20px] sm:rounded-[32px] shadow-2xl h-full border border-white/10"
                                        style={{ clipPath: "polygon(0 0, calc(100% - 40px) 0, 100% 40px, 100% 100%, 0 100%)" }}
                                    >
                                        <div className="relative w-full h-full bg-[#111] p-[2px] rounded-[18px] sm:rounded-[28px] overflow-hidden"
                                            style={{ clipPath: "polygon(0 0, calc(100% - 36px) 0, 100% 36px, 100% 100%, 0 100%)" }}
                                        >
                                            <img src={getImgSrc(serviceInnerImg)} alt="Services" width="600" height="400" className="w-full h-full object-contain" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative z-10 border-t border-white/20 pt-[1.5rem] max-w-[1600px] mx-auto w-full">
                    <div className="flex flex-wrap gap-3">
                        {services.map((s) => (
                            <button
                                key={s.slug}
                                onClick={() => navigate(`/services/${s.slug}`)}
                                className="text-[12px] font-medium text-white/70 hover:text-white border border-white/20 hover:border-white/50 px-4 py-2 rounded-full transition-all duration-200"
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 md:py-24 px-6 md:px-16">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative bg-[#111111] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-[#4169E1]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(65,105,225,0.05)]"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-14 h-14 rounded-full bg-[#4169E1]/10 flex items-center justify-center text-[#4169E1] text-xl font-bold">
                                    {service.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#4169E1] transition-colors duration-300">
                                {service.title}
                            </h3>
                            <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                                {service.description}
                            </p>
                            <div className="mt-8 flex items-center gap-2 text-[#4169E1] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span>Learn More</span>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            <Footer />
        </motion.div>
    

    </>

    );
};

export default ServicesPage;
