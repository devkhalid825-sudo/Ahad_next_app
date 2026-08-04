'use client';

import React, { useState, useEffect, useRef, useCallback, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import _still1 from '../../assets/Ahmed-food/stills/01.webp';
const still1 = getImgSrc(_still1);
import _still2 from '../../assets/Ahmed-food/stills/04.webp';
const still2 = getImgSrc(_still2);
const stillImages = [still1, still2];

import Header from "../layouts/Header";
import {
    FaCube,
    FaImage,
    FaSun,
    FaFileArchive,
    FaSync,
    FaThLarge,
    FaPaperPlane
} from "react-icons/fa";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';

import _b1 from '../../assets/Ahmed-food/bombay-biryani/01.webp';
const b1 = getImgSrc(_b1);
import _b2 from '../../assets/Ahmed-food/bombay-biryani/02.webp';
const b2 = getImgSrc(_b2);
import _b3 from '../../assets/Ahmed-food/bombay-biryani/03.webp';
const b3 = getImgSrc(_b3);
import _b4 from '../../assets/Ahmed-food/bombay-biryani/04.webp';
const b4 = getImgSrc(_b4);
import _b5 from '../../assets/Ahmed-food/bombay-biryani/06.webp';
const b5 = getImgSrc(_b5);
import _b6 from '../../assets/Ahmed-food/bombay-biryani/07.webp';
const b6 = getImgSrc(_b6);
import _b7 from '../../assets/Ahmed-food/bombay-biryani/09.webp';
const b7 = getImgSrc(_b7);
import _b8 from '../../assets/Ahmed-food/bombay-biryani/10.webp';
const b8 = getImgSrc(_b8);
import _b9 from '../../assets/Ahmed-food/bombay-biryani/11.webp';
const b9 = getImgSrc(_b9);
import _b10 from '../../assets/Ahmed-food/bombay-biryani/13.webp';
const b10 = getImgSrc(_b10);
const bombayImages = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];

import _j1 from '../../assets/Ahmed-food/jam&spread/02.webp';
const j1 = getImgSrc(_j1);
import _j2 from '../../assets/Ahmed-food/jam&spread/03.webp';
const j2 = getImgSrc(_j2);
import _j3 from '../../assets/Ahmed-food/jam&spread/04.webp';
const j3 = getImgSrc(_j3);
import _j4 from '../../assets/Ahmed-food/jam&spread/06.webp';
const j4 = getImgSrc(_j4);
import _j5 from '../../assets/Ahmed-food/jam&spread/07.webp';
const j5 = getImgSrc(_j5);
import _j6 from '../../assets/Ahmed-food/jam&spread/09.webp';
const j6 = getImgSrc(_j6);
import _j7 from '../../assets/Ahmed-food/jam&spread/10.webp';
const j7 = getImgSrc(_j7);
import _j8 from '../../assets/Ahmed-food/jam&spread/11.webp';
const j8 = getImgSrc(_j8);
import _j9 from '../../assets/Ahmed-food/jam&spread/13.webp';
const j9 = getImgSrc(_j9);
import _j10 from '../../assets/Ahmed-food/jam&spread/15.webp';
const j10 = getImgSrc(_j10);
const jamImages = [j1, j2, j3, j4, j5, j6, j7, j8, j9, j10];

import _l1 from '../../assets/Ahmed-food/jelly/01.webp';
const l1 = getImgSrc(_l1);
import _l2 from '../../assets/Ahmed-food/jelly/02.webp';
const l2 = getImgSrc(_l2);
import _l3 from '../../assets/Ahmed-food/jelly/03.webp';
const l3 = getImgSrc(_l3);
import _l4 from '../../assets/Ahmed-food/jelly/04.webp';
const l4 = getImgSrc(_l4);
import _l5 from '../../assets/Ahmed-food/jelly/06.webp';
const l5 = getImgSrc(_l5);
import _l6 from '../../assets/Ahmed-food/jelly/07.webp';
const l6 = getImgSrc(_l6);
import _l7 from '../../assets/Ahmed-food/jelly/09.webp';
const l7 = getImgSrc(_l7);
import _l8 from '../../assets/Ahmed-food/jelly/10.webp';
const l8 = getImgSrc(_l8);
import _l9 from '../../assets/Ahmed-food/jelly/11.webp';
const l9 = getImgSrc(_l9);
const jellyImages = [l1, l2, l3, l4, l5, l6, l7, l8, l9];

import _h1 from '../../assets/ElipseImages/hero/15.webp';
const h1 = getImgSrc(_h1);
import _h2 from '../../assets/ElipseImages/hero/background.webp';
const h2 = getImgSrc(_h2);
import _h3 from '../../assets/ElipseImages/hero/hero1.webp';
const h3 = getImgSrc(_h3);
import _h4 from '../../assets/ElipseImages/hero/volve-configrator.webp';
const h4 = getImgSrc(_h4);
import { getImgSrc } from "../../utils/api";

const heroImages = [h1, h2, h3, h4];
const showcaseImages = stillImages.length ? stillImages : heroImages;

const showcaseCardsData = showcaseImages.map((_, i) => {
    const total = showcaseImages.length;
    const center = (total - 1) / 2;
    const offset = i - center;
    const spacing = total >= 10 ? 120 : 140;
    return {
        targetX: offset * spacing,
        targetY: Math.abs(offset) * (total >= 10 ? 16 : 16),
        targetRotate: offset * (total >= 10 ? 5.5 : 7),
        zIndex: Math.round(total - Math.abs(offset)),
    };
}).map((data, i) => ({ ...data, img: showcaseImages[i] }));

const RenderCard = ({ src, title }) => (
    <div className="group relative overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl aspect-[16/9] w-[360px] sm:w-[480px] md:w-[560px] shrink-0 snap-start rounded-lg">
        <div className="relative h-full w-full overflow-hidden rounded-lg">
            <img
                src={src}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
        </div>
    </div>
);

const AutoScrollRow = ({ children }) => {
    const scrollRef = useRef(null);
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        let animFrame;
        const step = () => {
            el.scrollLeft += 1;
            if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
            animFrame = requestAnimationFrame(step);
        };
        const timer = setTimeout(() => { animFrame = requestAnimationFrame(step); }, 2000);
        return () => { clearTimeout(timer); cancelAnimationFrame(animFrame); };
    }, []);
    return (
        <div className="relative mt-[2rem]">
            <div ref={scrollRef} className="flex overflow-x-hidden no-scrollbar gap-[15px] pb-4">
                {children}
                {React.Children.map(children, (child) => React.cloneElement(child, { key: `dup-${child.key}` }))}
            </div>
        </div>
    );
};

const AhmedFood = () => {
    const navigate = useNavigate();
    const [activeVideo, setActiveVideo] = useState(0);

    const handleStartProject = () => navigate('/contact');

    const videoTabs = [
        { id: 0, label: "Jam & Spread", url: "https://www.youtube.com/embed/D902VeEqsnE" },
        { id: 1, label: "Bombay Biryani", url: "https://www.youtube.com/embed/gjtQTltVD5A" },
        { id: 2, label: "Crystal Jelly", url: "https://www.youtube.com/embed/BsKw4i6riRw" },
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <>
        <div className="w-full overflow-x-hidden bg-[#F2F0EB] text-[#0D0D0D] selection:bg-[#4169E1]/30 selection:text-[#0D0D0D]">

            {/* HERO */}
            <section className="bg-[#0D0D0D] px-8 py-[3.5rem] pb-[3rem] relative min-h-screen">
                <Header />

                <h1 className=" text-[clamp(2.5rem,7vw,5rem)] font-bold text-[#F2F0EB] leading-[1.0] tracking-tight max-w-[700px] mb-[2rem] pt-[4rem] sm:pt-[6rem]">
                    Ahmed Foods<span className="text-[#4169E1]">.</span>
                </h1>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-1 border-t border-[#222] pt-[1.5rem] max-w-[680px]">
                    <div className="cs-hero-meta-item">
                        <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Client</label>
                        <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">Ahmed Food Pvt.</p>
                    </div>
                    <div className="cs-hero-meta-item">
                        <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Service</label>
                        <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">3D Product Viz</p>
                    </div>
                    <div className="cs-hero-meta-item">
                        <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Duration</label>
                        <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">6 weeks</p>
                    </div>
                    <div className="cs-hero-meta-item">
                        <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">Deliverables</label>
                        <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">24 render assets</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-[8px] mt-[3rem]">
                    {videoTabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveVideo(tab.id)}
                            className={`text-[13px] font-medium px-[18px] py-[8px] rounded-full border transition-all duration-200 cursor-pointer ${activeVideo === tab.id
                                ? 'bg-[#4169E1] text-white border-[#4169E1]'
                                : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                    <button
                        onClick={handleStartProject}
                        className="text-[13px] font-semibold px-[20px] py-[8px] bg-[#4169E1] text-white rounded-full border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-auto"
                    >
                        Start a Project →
                    </button>
                </div>

                <div className="w-full mt-[1.5rem] h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]">
                    <iframe
                        src={videoTabs[activeVideo].url}
                        title={videoTabs[activeVideo].label}
                        frameBorder="0"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </section>

            {/* OVERVIEW + CHALLENGE */}
            <section className="px-8 py-[6rem] bg-[#F2F0EB] grid grid-cols-1 lg:grid-cols-2 gap-[3rem] items-stretch">
                <div className="p-[2rem]">
                    <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Overview</p>
                    <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#0D0D0D]">
                        Turning packaged food into a premium visual brand
                    </h4>
                    <p className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-[#3A3A3A]/80">
                        Ahmed Food needed to compete on digital shelves where photography alone wasn't cutting through. We created a library of photorealistic 3D product renders that gave their team complete control — any angle, any surface, any lighting.
                    </p>
                </div>
                <div className="bg-[#0D0D0D] rounded-lg p-[2rem] text-[#F2F0EB]">
                    <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">The challenge</p>
                    <h3 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
                        Product photography was slow, expensive, and inflexible
                    </h3>
                    <p className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80">
                        Every time a new SKU launched or packaging changed, the client had to schedule a studio, hire a photographer, and wait weeks. Digital campaigns were bottlenecked. The brief: build a 3D asset pipeline that makes render production as fast as marketing moves.
                    </p>
                </div>
            </section>

            {/* RESULTS */}
            <section className="bg-[#0D0D0D] px-8 py-[6rem]">
                <div className="mb-[3rem]">
                    <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Measurable impact</p>
                    <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
                        Results that moved the business
                    </h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl overflow-hidden">
                    <div className="bg-[#111] p-[2.5rem] flex flex-col justify-center">
                        <div className="text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">80%</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 font-semibold text-[#F2F0EB] mb-[8px]">Faster asset delivery</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 leading-[1.6]">From 3-week photoshoots to 48-hour render turnaround per SKU</div>
                    </div>
                    <div className="bg-[#111] p-[2.5rem] flex flex-col justify-center">
                        <div className="text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">24</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 font-semibold text-[#F2F0EB] mb-[8px]">Render assets delivered</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 leading-[1.6]">Packshots, hero shots, lifestyle composites — all in one pipeline</div>
                    </div>
                    <div className="bg-[#111] p-[2.5rem] flex flex-col justify-center">
                        <div className="text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">3×</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 font-semibold text-[#F2F0EB] mb-[8px]">Campaign output increase</div>
                        <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80 leading-[1.6]">Marketing team tripled A/B variant production with same headcount</div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB]">
                <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">How we did it</p>
                <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-8 md:mb-16 tracking-tight leading-[1.1] text-[#0D0D0D]">
                    Our process
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0DDD7]">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">01</span>
                            <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">Discovery</span>
                        </div>
                        <h4 className="text-[17px] md:text-[20px] font-semibold text-[#0D0D0D] mb-3">Brand & packaging audit</h4>
                        <p className="text-sm md:text-[15px] font-light leading-[1.7] text-[#555]/80">
                            We started with a deep audit of every existing packaging file, brand guideline, and reference shoot. Identifying what the client wanted to keep — and what the photography had always failed to capture — shaped the entire asset brief.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0DDD7]">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">02</span>
                            <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">Asset build</span>
                        </div>
                        <h4 className="text-[17px] md:text-[20px] font-semibold text-[#0D0D0D] mb-3">High-fidelity 3D modelling</h4>
                        <p className="text-sm md:text-[15px] font-light leading-[1.7] text-[#555]/80">
                            Each product was built from technical dielines and reference images — accurate geometry, material stacking, and label mapping that holds up at any scale from a 1080px ad unit to a 4K billboard.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0DDD7]">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">03</span>
                            <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">Lighting</span>
                        </div>
                        <h4 className="text-[17px] md:text-[20px] font-semibold text-[#0D0D0D] mb-3">Studio & lifestyle lighting setups</h4>
                        <p className="text-sm md:text-[15px] font-light leading-[1.7] text-[#555]/80">
                            We built three lighting presets: clean white studio, warm lifestyle, and moody dark hero. Each preset was reusable — a new SKU drops into the scene and renders in hours, not days.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0DDD7]">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">04</span>
                            <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">Delivery</span>
                        </div>
                        <h4 className="text-[17px] md:text-[20px] font-semibold text-[#0D0D0D] mb-3">Organised asset library + source files</h4>
                        <p className="text-sm md:text-[15px] font-light leading-[1.7] text-[#555]/80">
                            Final delivery included layered PSDs, transparent PNGs, and locked .blend source files with documentation — so the client's internal team can request new variants independently going forward.
                        </p>
                    </div>
                </div>
            </section>

            {/* SELECTED RENDERS — Auto-scroll Rows */}
            <section className="bg-[#0D0D0D] px-[15px] md:px-[40px] py-[6rem] overflow-hidden">
                <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Visual output</p>
                <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
                    Selected renders
                </h4>
                <div className="flex flex-col gap-[24px] mt-[2rem]">
                    <div>
                        <h4 className="text-[18px] font-semibold text-[#F2F0EB] tracking-tight mb-3">Jam & Spread</h4>
                        <AutoScrollRow>
                            {jamImages.map((src, i) => (
                                <RenderCard key={i} src={src} title="Jam & Spread" />
                            ))}
                        </AutoScrollRow>
                    </div>
                    <div>
                        <h4 className="text-[18px] font-semibold text-[#F2F0EB] tracking-tight mb-3">Crystal Jelly</h4>
                        <AutoScrollRow>
                            {jellyImages.map((src, i) => (
                                <RenderCard key={i} src={src} title="Crystal Jelly" />
                            ))}
                        </AutoScrollRow>
                    </div>
                    <div>
                        <h4 className="text-[18px] font-semibold text-[#F2F0EB] tracking-tight mb-3">Bombay Biryani</h4>
                        <AutoScrollRow>
                            {bombayImages.map((src, i) => (
                                <RenderCard key={i} src={src} title="Bombay Biryani" />
                            ))}
                        </AutoScrollRow>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <footer
                className="px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-between gap-[1.5rem] border-t border-[#1A1A1A]"
            >
                <div
                    className="flex gap-[10px] flex-wrap"
                >
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

            {/* Standard page sections to keep experience consistent */}
            <LatestWork />
            <ClientReviews />
            <div id="contact">
                <Contact />
            </div>
            <Footer />
        </div>
    

    </>

    );
};

export default AhmedFood;
