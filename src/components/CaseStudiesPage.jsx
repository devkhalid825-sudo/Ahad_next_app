'use client';

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import HeroCTA from './HeroCTA';
import Footer from './Footer';
import Contact from './Contact';
import Solutions from './Solutions';
import News from './News';
import SocialMediaSection from './SocialMediaSection';
import { apiCall, BACKEND_ORIGIN } from '../utils/api';

const CaseStudiesPage = () => {
    const [caseStudies, setCaseStudies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchCaseStudies = async () => {
            const { data, status } = await apiCall('/case-studies', 'GET');
            if (status === 200 && Array.isArray(data)) {
                setCaseStudies(data);
            }
            setLoading(false);
        };
        fetchCaseStudies();
    }, []);

    return (
        <>
        

        <div className="bg-black min-h-screen text-white font-sans selection:bg-[#4169E1]/20 selection:text-white overflow-x-hidden">

            {/* HOME HERO */}
            <Hero />
            <HeroCTA />

            {/* CASE STUDIES SECTION */}
            <section className="w-full bg-[black] py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative">
                <div className="w-full relative">
                    {/* HEADER */}
                    <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2">
                        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
                            Case Studies
                        </h2>
                        <Link
                            to="/case-studies"
                            className="rounded-full text-[11px] md:text-base bg-white text-[#4169E1] font-bold py-1.5 px-4 md:py-2 md:px-8 shadow-sm hover:scale-105 transition flex items-center justify-center whitespace-nowrap flex-shrink-0"
                        >
                            View All
                        </Link>
                    </div>

                    {/* CARDS */}
                    {loading ? null : caseStudies.length > 0 ? (
                        <div className="flex overflow-x-auto no-scrollbar gap-[15px] px-[15px] md:px-[40px] pb-4 snap-x snap-mandatory">
                            {caseStudies.map((cs, ci) => (
                                <Link
                                    key={cs.id}
                                    to={`/case-study/${cs.slug}`}
                                    className="group snap-start shrink-0 w-[220px] md:w-[577px] py-2 md:py-4"
                                >
                                    <div className="relative w-full h-[280px] md:h-[637px] bg-[#323235] rounded-[24px] md:rounded-[48px] flex flex-col p-3 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d] will-change-transform"
                                        style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                                    >
                                        {/* Image */}
                                        <div className="w-full h-[150px] md:h-[380px] rounded-[16px] md:rounded-[36px] overflow-hidden border border-white/5">
                                            <img
                                                src={cs.largeBanner ? (cs.largeBanner.startsWith('http') ? cs.largeBanner : `${BACKEND_ORIGIN}${cs.largeBanner}`) : ''}
                                                alt={cs.title}
                                                loading="lazy"
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-center"
                                            />
                                        </div>

                                        {/* Body */}
                                        <div className="flex-1 flex flex-col md:px-6 px-3 md:py-8 py-3">
                                            <div className="hidden md:flex items-center gap-4 text-white/70 text-sm mb-6">
                                                {cs.client && <span>{cs.client}</span>}
                                                {cs.client && cs.category && <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>}
                                                {cs.category && <span>{cs.category}</span>}
                                                {cs.category && cs.service && <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>}
                                                {cs.service && <span>{cs.service}</span>}
                                            </div>
                                            <div className="md:hidden flex items-center gap-2 text-white/80 text-[11px] mb-4">
                                                {cs.category && <span>{cs.category}</span>}
                                                {cs.category && cs.service && <span className="w-1.5 h-1.5 rounded-full bg-[#4169E1]"></span>}
                                                {cs.service && <span>{cs.service}</span>}
                                            </div>
                                            <h3 className="text-white md:text-[22px] text-[13px] font-medium leading-tight line-clamp-3">
                                                {cs.title}
                                            </h3>
                                            <div className="mt-auto">
                                                <span className="group/link flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4">
                                                    <span>View Case Study</span>
                                                    <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover/link:translate-x-1 transition">
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-7 md:h-7">
                                                            <line x1="7" y1="17" x2="17" y2="7"></line>
                                                            <polyline points="7 7 17 7 17 17"></polyline>
                                                        </svg>
                                                    </div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <p className="text-white/50 text-lg font-light">No case studies available right now.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* SOLUTION & CAPABILITIES */}
            <Solutions isLight={false} />

            {/* NEWS & BLOGS */}
            <News isLight={false} />

            <SocialMediaSection />

            {/* CONTACT & FOOTER */}
            <div id="contact"><Contact /></div>
            <Footer />
        </div>
    
        </>
        );
};

export default CaseStudiesPage;
