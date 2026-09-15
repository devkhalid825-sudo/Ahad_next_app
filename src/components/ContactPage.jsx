'use client';

import React, { useEffect } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ContactForm from './ContactForm';

import { getImgSrc } from '../utils/api';
import { m as motion } from 'framer-motion';

import buildingImgRaw from '../assets/images/Background-Image.webp';
const buildingImg = getImgSrc(buildingImgRaw);

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white min-h-screen"
        >
            <Header />

            {/* SECTION 1: CONNECT WITH US */}
            <section className="pt-32 md:pt-40 pb-20 px-6 md:px-16 max-w-[1750px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 xl:gap-20 items-start">
                    {/* Left side text */}
                    <div className="flex flex-col justify-start items-start pt-2 lg:pt-6 pb-6 lg:pb-0 lg:sticky lg:top-32">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-[#4169E1]/10 border border-[#4169E1]/20 text-[#4169E1] text-xs font-bold tracking-widest uppercase mb-6">
                            Start a Project
                        </span>
                        <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight leading-[1.08] mb-6 text-white text-left">
                            Let&apos;s Build Something <span className="text-[#4169E1]">Exceptional.</span>
                        </h1>
                        <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-8 text-left max-w-lg">
                            Share your project brief for a personalized 3D engineering breakdown, or book a 15-minute scoping call directly on our calendar.
                        </p>

                        <div className="space-y-4 w-full max-w-md pt-6 border-t border-white/10">
                            <div className="flex items-start gap-3.5">
                                <span className="w-8 h-8 rounded-lg bg-[#4169E1]/15 text-[#4169E1] flex items-center justify-center shrink-0 mt-0.5 border border-[#4169E1]/20">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-white">Direct 1-on-1 with 3D Engineers</p>
                                    <p className="text-xs text-gray-400">No account managers or salespeople — speak directly with technical leads.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <span className="w-8 h-8 rounded-lg bg-[#4169E1]/15 text-[#4169E1] flex items-center justify-center shrink-0 mt-0.5 border border-[#4169E1]/20">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10" />
                                        <circle cx="12" cy="12" r="6" />
                                        <circle cx="12" cy="12" r="2" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-white">Fast Feasibility &amp; Ballpark</p>
                                    <p className="text-xs text-gray-400">Realistic production timelines, tech stack recommendations, and fixed quotes.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3.5">
                                <span className="w-8 h-8 rounded-lg bg-[#4169E1]/15 text-[#4169E1] flex items-center justify-center shrink-0 mt-0.5 border border-[#4169E1]/20">
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-white">Enterprise Confidentiality &amp; NDA</p>
                                    <p className="text-xs text-gray-400">Your CAD files, concepts, and IP remain 100% confidential.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side form / calendly card */}
                    <ContactForm />
                </div>
            </section>

            {/* SECTION 2: LOCATION & ABOUT */}
            <section className="py-24 bg-black">
                <div className="max-w-[1750px] mx-auto px-6 text-center mb-24">
                    <h2 className="text-4xl md:text-[64px] font-medium tracking-tight leading-[1.05]">
                        All Over the World.<br />
                        Wherever the Work Takes Us.
                    </h2>
                </div>

                <div className="max-w-[1750px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image with Watermark */}
                    <div className="relative overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                            src={buildingImg}
                            alt="Elipse Studio"
                            width="800"
                            height="600"
                            className="w-full h-full object-cover brightness-[0.7]"
                        />
                        <div className="absolute top-8 left-8 md:top-12 md:left-12">
                            <span className="text-yellow-400 text-3xl md:text-5xl font-black italic tracking-tighter drop-shadow-lg">
                                ELIPSE STUDIO
                            </span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-8 text-gray-300 text-base md:text-[18px] leading-relaxed">
                        <p>
                            We are a creatively led technology company specializing in XR, 3D visualization, and immersive digital experiences.
                            Founded in 2021, we partner with brands to bring bold ideas to life through emerging technology.
                        </p>
                        <p>
                            Our team of accomplished artists and thoughtful engineers leverage emerging technologies and proven processes
                            to produce innovative and creative solutions for today&apos;s digitally connected brands and consumers.
                        </p>
                        <p>
                            We are based across the US, UK, and South Asia, with our team spread around the globe. Throughout our history, we&apos;ve
                            maintained a unique vision to inspire, engage, and entertain by bringing our imagination to life.
                        </p>
                        <p className="text-white italic font-bold">Let us inspire you.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
        </>
    );
};

export default ContactPage;
