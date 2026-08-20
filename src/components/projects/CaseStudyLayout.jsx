'use client';

import React from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../layouts/Header";
import { FaThLarge, FaPaperPlane } from "react-icons/fa";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";
import Contact from '../features/Contact';
import Footer from '../layouts/Footer';

const CaseStudyLayout = ({
    title,
    meta,
    heroButtons,
    heroIframe,
    heroImage,
    children,
    nextProject
}) => {
    const navigate = useNavigate();

    const handleStartProject = () => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-full overflow-x-hidden bg-[#F2F0EB] text-[#0D0D0D] selection:bg-[#4169E1]/30 selection:text-[#0D0D0D]">
            <section className="bg-[#0D0D0D] px-8 py-[3.5rem] pb-[3rem] relative min-h-screen">
                <Header />

                <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[3rem] sm:pt-[4rem]">
                    {title}<span className="text-[#4169E1]">.</span>
                </h1>

                {meta && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-1 border-t border-[#222] pt-[1.5rem] max-w-[680px]">
                        {meta.map((item, i) => (
                            <div key={i}>
                                <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">{item.label}</label>
                                <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">{item.value}</p>
                            </div>
                        ))}
                    </div>
                )}

                {heroButtons && (
                    <div className="flex flex-wrap gap-[8px] mt-[3rem]">
                        {heroButtons.map((btn, i) => (
                            btn.to ? (
                                <a
                                    key={i}
                                    href={btn.to}
                                    target={btn.external ? "_blank" : "_self"}
                                    rel={btn.external ? "noopener noreferrer" : ""}
                                    className={`text-[13px] font-medium px-[18px] py-[8px] rounded-full border transition-all duration-200 cursor-pointer ${btn.primary
                                        ? 'bg-[#4169E1] text-white border-[#4169E1] hover:bg-[#3158D4]'
                                        : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                                        }`}
                                >
                                    {btn.label} {btn.external && "↗"}
                                </a>
                            ) : (
                                <button
                                    key={i}
                                    onClick={btn.onClick || handleStartProject}
                                    className={`text-[13px] font-medium px-[18px] py-[8px] rounded-full border transition-all duration-200 cursor-pointer ${btn.primary
                                        ? 'bg-[#4169E1] text-white border-[#4169E1] hover:bg-[#3158D4]'
                                        : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                                        }`}
                                >
                                    {btn.label}
                                </button>
                            )
                        ))}
                    </div>
                )}

                {heroIframe ? (
                    <div className="w-full mt-[1.5rem] h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]">
                        <iframe
                            src={heroIframe}
                            title={title}
                            frameBorder="0"
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                ) : heroImage && (
                    <div className="w-full mt-[1.5rem] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]">
                        <img src={heroImage} alt={title} width="1200" height="700" className="w-full object-cover" />
                    </div>
                )}
            </section>

            {children}

            <footer
                className="px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"
            >
                <div
                    className="flex items-center justify-between flex-wrap gap-[10px] w-full"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex gap-[10px] flex-wrap">
                        <button
                            className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer"
                            onClick={() => navigate('/')}
                        >
                            <FaThLarge aria-hidden="true" /> All work
                        </button>
                        <button
                            className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer"
                            onClick={handleStartProject}
                        >
                            <FaPaperPlane aria-hidden="true" /> Start a project
                        </button>
                    </div>
                    {nextProject && (
                        <button
                            className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer"
                            onClick={() => navigate(nextProject.path)}
                        >
                            Next Project →
                        </button>
                    )}
                </div>
            </footer>

            <LatestWork />
            <ClientReviews />
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
    );
};

export default CaseStudyLayout;
