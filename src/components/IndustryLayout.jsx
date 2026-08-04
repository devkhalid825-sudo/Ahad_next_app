'use client';

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { SITE_URL } from '../utils/api';
import { motion, AnimatePresence } from 'framer-motion';
import { FaThLarge, FaPaperPlane } from 'react-icons/fa';
import {
    HiOutlineBuildingOffice2,
    HiOutlineShoppingCart,
    HiOutlineTruck,
    HiOutlineHeart,
    HiOutlineBookOpen,
    HiOutlineHomeModern,
    HiOutlineBuildingStorefront,
    HiOutlineWrenchScrewdriver,
    HiOutlineBolt,
    HiOutlineBuildingOffice
} from 'react-icons/hi2';
import { LuSofa, LuFactory, LuRuler } from "react-icons/lu";

import Header from './layouts/Header';
import LatestWork from "./features/LatestWork";
import Footer from './layouts/Footer';
import Contact from './features/Contact';

const iconMap = {
    HiOutlineBuildingOffice2: <HiOutlineBuildingOffice2 />,
    LuRuler: <LuRuler />,
    LuSofa: <LuSofa />,
    LuFactory: <LuFactory />,
    HiOutlineShoppingCart: <HiOutlineShoppingCart />,
    HiOutlineTruck: <HiOutlineTruck />,
    HiOutlineHomeModern: <HiOutlineHomeModern />,
    HiOutlineBuildingStorefront: <HiOutlineBuildingStorefront />,
    HiOutlineHeart: <HiOutlineHeart />,
    HiOutlineBookOpen: <HiOutlineBookOpen />,
    HiOutlineWrenchScrewdriver: <HiOutlineWrenchScrewdriver />,
    HiOutlineBolt: <HiOutlineBolt />,
    HiOutlineBuildingOffice: <HiOutlineBuildingOffice />,
};

const getIndustryStats = (slug) => {
    switch (slug) {
        case "real-estate":
        case "architecture":
        case "interior-design":
            return [
                { stat: "85%", label: "Faster Approvals", desc: "Accelerate stakeholder and client alignment with high-fidelity walkthroughs." },
                { stat: "2.5x", label: "Off-Plan Sales Lift", desc: "Enable international buyers to purchase units before ground breaking." },
                { stat: "100%", label: "Design Fidelity", desc: "Perfect matching to actual specifications, finishes, and physical material libraries." }
            ];
        case "ecommerce":
        case "retail":
        case "furniture":
        case "automotive":
            return [
                { stat: "3x", label: "Conversion Lift", desc: "Customers are significantly more likely to purchase when interacting in 3D." },
                { stat: "40%", label: "Lower Return Rates", desc: "Allowing users to inspect dimensions and configure materials at scale." },
                { stat: "85%", label: "Engagement Boost", desc: "Massive increase in average session durations through interactive customisation." }
            ];
        case "manufacturing":
        case "construction":
        case "energy-utilities":
            return [
                { stat: "60%", label: "Training Efficiency", desc: "Train operator and site teams in high-risk procedures completely risk-free." },
                { stat: "40%", label: "Cost Reduction", desc: "Substitute physical testing and scale mockups with precise digital twins." },
                { stat: "100%", label: "Operational Safety", desc: "Visualise site hazard zones and assembly lines with millimetre accuracy." }
            ];
        case "healthcare":
        case "education-training":
            return [
                { stat: "90%", label: "Information Retention", desc: "Interactive 3D visuals dramatically enhance spatial memory and learning outcomes." },
                { stat: "3D", label: "Real-Time Anatomy", desc: "Deliver complex medical procedure simulations and structural walkthroughs." },
                { stat: "100%", label: "Risk-Free Simulation", desc: "Practice clinical procedures or specialized drills in virtual environment replicas." }
            ];
        default:
            return [
                { stat: "85%", label: "Engagement Boost", desc: "High-fidelity rendering and custom configurations elevate customer interaction." },
                { stat: "3x", label: "Campaign ROI Lift", desc: "Visual assets deployed across channels drive higher conversion rates." },
                { stat: "100%", label: "Client Satisfaction", desc: "Collaborative pipeline delivering exact visual specifications on target timelines." }
            ];
    }
};

const processData = [
    {
        step: "01",
        phase: "Discovery",
        title: "Discovery & Strategy",
        desc: "We dive deep into your brand, audience, and goals. Through research and collaborative workshops, we define the scope, timeline, and technical roadmap for your project."
    },
    {
        step: "02",
        phase: "Design",
        title: "Design & Prototyping",
        desc: "Our creative team crafts concepts, wireframes, and interactive prototypes. We iterate rapidly, presenting visual directions and gathering feedback to refine every detail."
    },
    {
        step: "03",
        phase: "Production",
        title: "Development & Production",
        desc: "Using cutting-edge tools — Unreal Engine, PlayCanvas, Maya, React — we build, animate, and render your project with technical precision and artistic excellence."
    },
    {
        step: "04",
        phase: "Launch",
        title: "Delivery & Optimization",
        desc: "We deploy, test, and optimize across all target platforms. Post-launch support ensures your experience remains smooth, fast, and future-proof."
    }
];

const IndustryLayout = ({
    slug,
    title,
    category,
    icon,
    meta,
    hero,
    tlDr,
    intro,
    solutions,
    whyUs,
    midCta,
    useCases,
    technology,
    faqs,
    finalCta
}) => {
    const navigate = useNavigate();
    const [openFaq, setOpenFaq] = useState(null);

    const handleStartProject = () => navigate('/contact');

    const stats = getIndustryStats(slug);
    const pageUrl = `${SITE_URL}/industries/${slug}/`;
    return (

    <>

        <div className="w-full overflow-x-hidden bg-[#F2F0EB] text-[#0D0D0D] selection:bg-[#4169E1]/30 selection:text-[#0D0D0D]">

            {/* SECTION 1: HERO */}
            <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[120px] md:pt-[140px] pb-[2rem] md:pb-[3rem] relative min-h-screen flex flex-col justify-between">
                <Header />

                <div>
                    <h1 className="text-[clamp(2rem,7vw,5rem)] font-bold text-[#F2F0EB] leading-[1.0] tracking-tight max-w-[800px] mb-[1.5rem] md:mb-[2rem] pt-[1.5rem] md:pt-[3rem]">
                        {title}<span className="text-[#4169E1]">.</span>
                    </h1>

                    {/* Metadata Flex */}
                    <div className="flex flex-wrap gap-x-6 gap-y-3 border-t border-[#222] pt-[1.5rem] max-w-[680px]">
                        <div>
                            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Category</label>
                            <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">{category}</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Focus</label>
                            <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">Immersive Tech</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Deployment</label>
                            <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">Global Reach</p>
                        </div>
                        <div>
                            <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Solutions</label>
                            <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">{solutions ? solutions.length : 0} Core Areas</p>
                        </div>
                    </div>

                    {/* CTA Actions */}
                    <div className="flex flex-wrap gap-[8px] mt-[2rem] md:mt-[3rem]">
                        <button
                            onClick={() => navigate(hero?.ctaLink || "/contact")}
                            className="text-[13px] font-medium px-[18px] py-[8px] rounded-full border bg-[#4169E1] text-white border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer"
                        >
                            {hero?.ctaText || "Get in Touch"}
                        </button>
                        <button
                            onClick={handleStartProject}
                            className="text-[13px] font-semibold px-[20px] py-[8px] border border-[#333] hover:border-[#666] text-[#888] hover:text-[#ccc] rounded-full transition-all duration-200 cursor-pointer"
                        >
                            Start a Project →
                        </button>
                    </div>

                    {/* HERO VISUAL */}
                    <div className="w-full mt-[1.5rem] h-[50vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl relative flex flex-col items-center justify-center p-4 md:p-8 select-none">
                        {hero?.image ? (
                            <img
                                src={hero.image}
                                alt={title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        ) : (
                            <>
                                <div className="absolute inset-0 bg-gradient-to-br from-[#0d0d0d] via-[#121829] to-[#0d0d0d]">
                                    <motion.div
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.15, 0.25, 0.15],
                                            x: [0, 20, 0],
                                            y: [0, -20, 0]
                                        }}
                                        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                                        className="absolute w-[300px] h-[300px] bg-[#4169E1] rounded-full blur-[100px] pointer-events-none"
                                    />
                                    <motion.div
                                        animate={{
                                            scale: [1.2, 1, 1.2],
                                            opacity: [0.1, 0.2, 0.1],
                                            x: [0, -30, 0],
                                            y: [0, 30, 0]
                                        }}
                                        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                                        className="absolute w-[250px] h-[250px] bg-[#008080] rounded-full blur-[80px] pointer-events-none"
                                    />
                                    <div className="absolute inset-0 opacity-[0.05]"
                                        style={{
                                            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                                            backgroundSize: '40px 40px',
                                        }}
                                    />
                                </div>
                                <div className="relative z-10 text-center flex flex-col items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-[#4169E1]/10 flex items-center justify-center border border-[#4169E1]/20 shadow-lg shadow-[#4169E1]/5 mb-2">
                                        <span className="text-[#4169E1] text-3xl">
                                            {iconMap[icon] || <HiOutlineBuildingOffice2 />}
                                        </span>
                                    </div>
                                    <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#4169E1] bg-[#4169E1]/10 border border-[#4169E1]/20 px-3 py-1 rounded-full">
                                        {category}
                                    </span>
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white/90 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
                                        {title}<span className="text-[#4169E1]">.</span>
                                    </h2>
                                    <p className="text-sm md:text-base font-light text-white/50 max-w-md leading-relaxed mt-1">
                                        Premium interactive 3D and immersive configurations designed for {title ? title.toLowerCase() : ""} sector leaders.
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* SECTION 2: OVERVIEW + CHALLENGE */}
            <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB] flex flex-col lg:flex-row gap-[2rem] md:gap-[3rem] items-stretch">
                <div className="flex-1 p-[1.25rem] md:p-[2rem]">
                    <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Overview</p>
                    <h4 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-14 tracking-tight leading-[1.1] text-[#0D0D0D]">
                        {hero?.headline}
                    </h4>
                    <div className="flex flex-row flex-wrap gap-x-6 gap-y-4 md:gap-y-6">
                        {intro && intro.map((p, i) => (
                            <p key={i} className="w-full sm:w-[calc(50%-0.75rem)] lg:w-auto lg:flex-1 text-sm md:text-lg lg:text-xl font-light text-left leading-relaxed text-[#3A3A3A]/80">{p}</p>
                        ))}
                    </div>
                </div>
                <div className="flex-1 bg-[#0D0D0D] rounded-lg p-[1.25rem] md:p-[2rem] text-[#F2F0EB] border border-[#1A1A1A] flex flex-col justify-between">
                    <div>
                        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">TL;DR — Quick Insight</p>
                        <h3 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-14 tracking-tight leading-[1.1] text-[#F2F0EB]">
                            The Industry Challenge
                        </h3>
                        <p className="text-sm md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/85">
                            {tlDr}
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 3: RESULTS (STATISTICS) */}
            <section className="bg-[#0D0D0D] px-5 md:px-8 py-[3rem] md:py-[6rem]">
                <div className="mb-[2rem] md:mb-[3rem]">
                    <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Measurable impact</p>
                    <h4 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
                        Results that move the business
                    </h4>
                </div>
                <div className="flex flex-col md:flex-row gap-px bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl overflow-hidden">
                    {stats.map((item, i) => (
                        <div key={i} className="flex-1 bg-[#111] p-[1.5rem] md:p-[2.5rem] flex flex-col justify-center">
                            <div className="text-[2.5rem] md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{item.stat}</div>
                            <div className="font-semibold text-[#F2F0EB] mb-[8px]">{item.label}</div>
                            <div className="text-sm md:text-base font-light leading-relaxed text-white/70">{item.desc}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SECTION 4: PROCESS */}
            <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB]">
                <div className="text-center mb-10 md:mb-16">
                    <h4 className="text-xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-[#0D0D0D]">
                        Our process
                    </h4>
                </div>

                <div className="flex overflow-x-auto lg:flex lg:flex-wrap lg:justify-center gap-4 md:gap-8 max-w-[1750px] mx-auto pb-6 snap-x snap-mandatory no-scrollbar">
                    {processData.map((item, index) => (
                        <motion.div
                            key={item.step}
                            initial={{ y: 40, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.15 }}
                            className="min-w-[260px] w-[80vw] sm:w-[320px] lg:w-[280px] lg:flex-1 shrink-0 snap-start relative h-full flex flex-col group animate-card"
                        >
                            <div className="text-[4rem] md:text-[6rem] font-bold text-[#0D0D0D]/[0.02] leading-none select-none mb-2 ml-4 pointer-events-none group-hover:text-[#4169E1]/5 transition-colors duration-500">
                                {item.step}
                            </div>
                            <div className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 border border-[#E0DDD7] hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col shadow-sm hover:shadow-lg h-full z-10">
                                <span className="text-[#4169E1] text-[11px] font-bold tracking-widest uppercase mb-1">{item.phase}</span>
                                <h3 className="text-base md:text-xl font-bold text-[#0D0D0D] tracking-tight mb-3 md:mb-4">{item.title}</h3>
                                <p className="text-sm md:text-base font-light leading-relaxed text-[#555]/90 flex-grow">{item.desc}</p>
                            </div>
                            {index < processData.length - 1 && (
                                <div className="hidden lg:block absolute top-[55%] -right-4 z-20 translate-x-1/2 -translate-y-1/2 text-[#4169E1]/40 text-xl pointer-events-none group-hover:translate-x-1 group-hover:text-[#4169E1] transition-all duration-300">
                                    →
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* SECTION 5: SOLUTIONS */}
            <section className="bg-[#0D0D0D] px-5 md:px-8 py-[3rem] md:py-[6rem]">
                <div className="mb-[2rem] md:mb-[3rem]">
                    <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Our Solutions</p>
                    <h4 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-4 md:mb-6 tracking-tight leading-[1.1] text-[#F2F0EB]">
                        Complete Custom Solutions
                    </h4>
                    <p className="text-white/50 text-sm md:text-lg font-light leading-relaxed max-w-2xl">
                        Elipse Studio delivers core solutions specifically tailored to target objectives within the {title ? title.toLowerCase() : ""} sector.
                    </p>
                </div>
                
                <div className="flex flex-row flex-wrap gap-4 md:gap-6">
                    {solutions && solutions.map((s, i) => {
                        const [solTitle, ...descParts] = s.split(' — ');
                        const desc = descParts.join(' — ');
                        return (
                            <div key={i} className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] xl:w-[calc(25%-1.125rem)] bg-[#111] p-[1.5rem] md:p-[2.5rem] border border-white/5 hover:border-[#4169E1]/30 transition-all duration-300 rounded-xl hover:-translate-y-1">
                                <span className="text-[#4169E1] font-bold text-sm mb-3 block">0{i + 1}</span>
                                <h3 className="text-base md:text-xl font-semibold text-[#F2F0EB] mb-2">{solTitle}</h3>
                                <p className="text-white/70 text-sm leading-relaxed font-light">{desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* SECTION 6: WHY US */}
            <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB] flex flex-col lg:flex-row gap-[2rem] md:gap-[3rem]">
                <div className="flex-1 lg:max-w-[40%]">
                    <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Why Elipse Studio</p>
                    <h4 className="text-xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-[#0D0D0D]">
                        Trusted Partner for {title}
                    </h4>
                </div>
                <div className="flex-[2] space-y-4 md:space-y-6">
                    {whyUs && whyUs.map((p, i) => (
                        <p key={i} className="text-sm md:text-lg lg:text-xl font-light text-left leading-relaxed text-[#3A3A3A]/80">{p}</p>
                    ))}
                </div>
            </section>

            {/* MID CTA */}
            {midCta && (
                <section className="py-[3rem] md:py-[6rem] bg-[#0D0D0D] text-[#F2F0EB] px-5 md:px-8 text-center border-t border-[#1A1A1A]">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-4 md:mb-6 tracking-tight leading-[1.1]">{midCta.headline}</h2>
                        <p className="text-sm md:text-lg lg:text-xl font-light leading-relaxed text-white/70 mb-6 md:mb-8 max-w-2xl mx-auto">{midCta.text}</p>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            <button
                                onClick={() => navigate('/portfolio')}
                                className="px-6 md:px-8 py-3 md:py-3.5 bg-[#4169E1] text-white rounded-full font-semibold hover:bg-[#3158D4] transition-colors text-xs md:text-sm"
                            >
                                {midCta.buttonText}
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 md:px-8 py-3 md:py-3.5 border border-[#333] hover:border-white text-[#888] hover:text-[#F2F0EB] rounded-full transition-all text-xs md:text-sm"
                            >
                                Book a Discovery Call
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* SECTION 7: USE CASES & TECHNOLOGY */}
            <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB] flex flex-col lg:flex-row gap-[2rem] md:gap-[3rem] items-stretch border-t border-[#E0DDD7]">
                <div className="flex-1 p-[1.25rem] md:p-[2rem] bg-white rounded-lg border border-[#E0DDD7]/40 shadow-sm flex flex-col justify-between">
                    <div>
                        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Use Cases</p>
                        <h3 className="text-lg md:text-2xl font-bold tracking-tight text-[#0D0D0D] mb-3 md:mb-4">
                            Real-World Scenarios
                        </h3>
                        <p className="text-sm md:text-lg font-light text-left leading-relaxed text-[#3A3A3A]/80">
                            {useCases}
                        </p>
                    </div>
                </div>
                
                <div className="flex-1 bg-[#0D0D0D] rounded-lg p-[1.25rem] md:p-[2rem] text-[#F2F0EB] border border-[#1A1A1A] flex flex-col justify-between">
                    <div>
                        <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Technology</p>
                        <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white mb-3 md:mb-4">
                            Visualization & Tooling Approach
                        </h3>
                        <p className="text-sm md:text-lg font-light text-left leading-relaxed text-white/80">
                            {technology}
                        </p>
                    </div>
                </div>
            </section>

            {/* SECTION 8: FAQ */}
            <section className="py-[3rem] md:py-[6rem] bg-[#F2F0EB] border-t border-[#E0DDD7]">
                <div className="max-w-4xl mx-auto px-5 md:px-6">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4169E1] mb-4 block text-center">Common Questions</span>
                    <h2 className="text-xl md:text-4xl font-medium mb-8 md:mb-12 text-center tracking-tight text-[#0D0D0D]">Frequently Asked Questions</h2>
                    
                    <div className="space-y-4">
                        {faqs && faqs.map((faq, i) => (
                            <div key={i} className="bg-white rounded-xl border border-[#E0DDD7] overflow-hidden shadow-sm">
                                <button
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                >
                                    <span className="font-semibold text-[#0D0D0D] text-sm md:text-base">{faq.q}</span>
                                    <svg className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openFaq === i ? 'rotate-180 text-[#4169E1]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                
                                <AnimatePresence initial={false}>
                                    {openFaq === i && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 text-[#555]/80 text-sm md:text-base leading-relaxed border-t border-[#E0DDD7]/40 pt-4">
                                                {faq.a}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 9: FINAL CTA */}
            {finalCta && (
                <section className="py-[3rem] md:py-[6rem] bg-[#0D0D0D] text-[#F2F0EB] px-5 md:px-8 text-center border-t border-[#1A1A1A]">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-xl md:text-4xl lg:text-[44px] font-medium mb-4 md:mb-6 tracking-tight leading-[1.1]">{finalCta.headline}</h2>
                        <p className="text-sm md:text-lg lg:text-xl font-light leading-relaxed text-white/70 mb-6 md:mb-8 max-w-2xl mx-auto">{finalCta.text}</p>
                        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                            <button
                                onClick={() => navigate(finalCta.buttonLink)}
                                className="px-6 md:px-8 py-3 md:py-3.5 bg-[#4169E1] text-white rounded-full font-semibold hover:bg-[#3158D4] transition-colors text-xs md:text-sm"
                            >
                                {finalCta.buttonText}
                            </button>
                            <button
                                onClick={() => navigate('/contact')}
                                className="px-6 md:px-8 py-3 md:py-3.5 border border-[#333] hover:border-white text-[#888] hover:text-[#F2F0EB] rounded-full transition-all text-xs md:text-sm"
                            >
                                Book a Discovery Call
                            </button>
                        </div>
                    </div>
                </section>
            )}

            {/* FOOTER ACTIONS */}
            <footer className="px-5 md:px-8 py-[2rem] md:py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-between gap-[1.5rem] border-t border-[#1A1A1A]">
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
            </footer>

            <LatestWork />
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
    

    </>

    );
};

export default IndustryLayout;
