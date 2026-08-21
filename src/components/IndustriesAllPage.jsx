'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight } from 'react-icons/fi';
import { getImgSrc } from '../utils/api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import blogImgRaw from '../assets/ElipseImages/blogs/blogs-Ar.webp';
const blogImg = getImgSrc(blogImgRaw);
import {
    HiOutlineBuildingOffice2,
    HiOutlineShoppingCart,
    HiOutlineTruck,
    HiOutlineHeart,
    HiOutlineBookOpen,
    HiOutlineHomeModern,
    HiOutlineWrenchScrewdriver,
    HiOutlineBolt,
    HiOutlineBuildingOffice
} from 'react-icons/hi2';
import { LuSofa, LuFactory, LuRuler } from "react-icons/lu";

const iconMap = {
    HiOutlineBuildingOffice2: <HiOutlineBuildingOffice2 className="w-7 h-7" />,
    LuRuler: <LuRuler className="w-7 h-7" />,
    LuSofa: <LuSofa className="w-7 h-7" />,
    LuFactory: <LuFactory className="w-7 h-7" />,
    HiOutlineShoppingCart: <HiOutlineShoppingCart className="w-7 h-7" />,
    HiOutlineTruck: <HiOutlineTruck className="w-7 h-7" />,
    HiOutlineHomeModern: <HiOutlineHomeModern className="w-7 h-7" />,
    HiOutlineHeart: <HiOutlineHeart className="w-7 h-7" />,
    HiOutlineBookOpen: <HiOutlineBookOpen className="w-7 h-7" />,
    HiOutlineWrenchScrewdriver: <HiOutlineWrenchScrewdriver className="w-7 h-7" />,
    HiOutlineBolt: <HiOutlineBolt className="w-7 h-7" />,
    HiOutlineBuildingOffice: <HiOutlineBuildingOffice className="w-7 h-7" />,
};



const categories = ["ALL", "Real Estate", "Architecture", "Interior Design", "Industrial", "Advertising", "Healthcare", "Education & Training", "Retail"];

const IndustriesAllPage = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [industries, setIndustries] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        import('../data/industriesData.js').then(mod => setIndustries(mod.industriesData));
    }, []);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setSearchTerm('');
    };

    const filtered = industries.filter(ind => {
        const matchesSearch = ind.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ind.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchTerm) return matchesSearch;
        if (activeCategory === 'ALL') return true;
        return ind.category === activeCategory;
    });
return (
    <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white min-h-screen font-sans"
        >
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen px-6 md:px-16 pt-[140px] pb-[3rem] flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 bg-black" />
                <Header />
                <div className="relative z-10 flex-1 flex flex-col justify-center">
                    <div className="max-w-[1600px] mx-auto w-full">
                        <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-24 items-center">
                            <div className="flex-1">

                                <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-bold text-[#F2F0EB] leading-[1.0] tracking-tight mb-6">
                                    Tailored solutions for every industry<span className="text-[#4169E1]">.</span>
                                </h1>
                                <p className="text-base md:text-lg text-gray-400 max-w-2xl leading-relaxed mb-8">
                                    Photoreal visualization, immersive experiences, and interactive platforms — purpose-built for each industry we work with. From architectural renders that sell unbuilt properties to VR training systems that reduce operational risk, we craft digital experiences tailored to your sector's unique challenges and audience expectations.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button
                                        onClick={() => navigate('/contact')}
                                        className="px-6 py-3 bg-[#4169E1] text-white rounded-full text-sm font-medium hover:bg-[#3558c8] transition-all shadow-lg shadow-[#4169E1]/20"
                                    >
                                        Discuss Your Project
                                    </button>
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById('industries-grid');
                                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        }}
                                        className="px-6 py-3 border border-white/20 text-white/80 rounded-full text-sm font-medium hover:border-white/40 hover:text-white transition-all"
                                    >
                                        Browse All
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
                                            <img src={blogImg} alt="Industries" width="600" height="400" className="w-full h-full object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== SEARCH + CTA ROW ===== */}
            <section className="bg-black px-6 md:px-16">
                <div className="max-w-[1750px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                        {/* LEFT: Search + Category Filters */}
                        <div className="lg:col-span-7 bg-[#0e0e0e] rounded-2xl border border-white/[0.04] p-6 md:p-8">
                            {/* Search */}
                            <div className="relative mb-6">
                                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Search industries..."
                                    value={searchTerm}
                                    onChange={(e) => { setSearchTerm(e.target.value); setActiveCategory('ALL'); }}
                                    className="w-full bg-[#0a0a0a] border border-white/[0.06] rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[#4169E1]/40 focus:bg-[#0a0a0a] transition-all duration-300"
                                />
                            </div>

                            {/* Category Tags */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        onClick={() => handleCategoryChange(cat)}
                                        className={`text-xs font-medium px-4 py-2 rounded-full border transition-all duration-300 ${activeCategory === cat && !searchTerm
                                            ? 'bg-[#4169E1]/10 text-[#4169E1] border-[#4169E1]/30 shadow-[inset_0_0_0_1px_rgba(65,105,225,0.3)]'
                                            : 'bg-transparent text-zinc-500 border-white/[0.06] hover:text-zinc-300 hover:border-white/[0.15]'
                                            }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT: CTA Panel */}
                        <div className="lg:col-span-5">
                            <div className="h-full bg-gradient-to-br from-[#0e0e0e] via-[#0e0e0e] to-[#0e0e0e] rounded-2xl border border-white/[0.04] p-6 md:p-8 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#4169E1]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#4169E1]/10 transition-all duration-700"></div>
                                <div className="relative z-10">
                                    <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-[#4169E1] mb-2 block">Let's Collaborate</span>
                                    <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                                        Need a Custom Solution?
                                    </h3>
                                    <p className="text-white/40 text-sm font-light leading-relaxed mb-5">
                                        From photoreal configurators to VR training — we deliver immersive experiences across all industries. Tell us about your project and we will recommend the right technology stack, timeline, and approach.
                                    </p>
                                    <div className="flex flex-wrap gap-2.5">
                                        <button
                                            onClick={() => navigate('/contact')}
                                            className="inline-flex items-center gap-2 bg-[#4169E1] hover:bg-[#3158D4] text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-[#4169E1]/20"
                                        >
                                            Start a Project <FiArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                        <button
                                            onClick={() => navigate('/portfolio')}
                                            className="inline-flex items-center gap-2 border border-white/[0.08] hover:border-white/[0.2] text-zinc-400 hover:text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                                        >
                                            View Portfolio
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== INDUSTRIES GRID ===== */}
            <section id="industries-grid" className="py-16 md:py-24 bg-black px-6 md:px-16">
                <div className="max-w-[1600px] mx-auto">
                    {/* Mobile: first 4 in grid, rest in slider */}
                    <div className="grid grid-cols-2 md:hidden gap-4">
                        {filtered.slice(0, 4).map((ind, index) => (
                            <motion.div
                                key={ind.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05, duration: 0.4 }}
                                onClick={() => navigate(`/industries/${ind.slug}`)}
                                className="group bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#4169E1]/30 transition-all duration-500 cursor-pointer"
                            >
                                <div className="w-10 h-10 rounded-full bg-[#4169E1]/10 flex items-center justify-center text-[#4169E1] text-sm mb-4">
                                    {iconMap[ind.icon] || <HiOutlineBuildingOffice2 className="w-5 h-5" />}
                                </div>
                                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#4169E1] transition-colors">{ind.title}</h3>
                                <p className="text-gray-400 text-xs font-light leading-relaxed">{ind.shortDesc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length > 4 && (
                        <div className="md:hidden mt-4 -mx-6 px-6 overflow-x-auto no-scrollbar snap-x snap-mandatory">
                            <div className="flex gap-4 pb-4">
                                {filtered.slice(4).map((ind, index) => (
                                    <motion.div
                                        key={ind.slug}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        onClick={() => navigate(`/industries/${ind.slug}`)}
                                        className="snap-start shrink-0 w-[75vw] max-w-[280px] group bg-[#111111] border border-white/5 rounded-2xl p-5 hover:border-[#4169E1]/30 transition-all duration-500 cursor-pointer"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#4169E1]/10 flex items-center justify-center text-[#4169E1] text-sm mb-4">
                                            {iconMap[ind.icon] || <HiOutlineBuildingOffice2 className="w-5 h-5" />}
                                        </div>
                                        <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[#4169E1] transition-colors">{ind.title}</h3>
                                        <p className="text-gray-400 text-xs font-light leading-relaxed">{ind.shortDesc}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Desktop: full grid */}
                    <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {filtered.map((ind, index) => (
                            <motion.div
                                key={ind.slug}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                onClick={() => navigate(`/industries/${ind.slug}`)}
                                className="group relative bg-[#111111] border border-white/5 rounded-[2rem] p-8 md:p-10 hover:border-[#4169E1]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(65,105,225,0.05)] cursor-pointer"
                            >
                                <div className="w-14 h-14 rounded-full bg-[#4169E1]/10 flex items-center justify-center text-[#4169E1] text-xl mb-6">
                                    {iconMap[ind.icon] || <HiOutlineBuildingOffice2 className="w-7 h-7" />}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#4169E1] transition-colors duration-300">
                                    {ind.title}
                                </h3>

                                <p className="text-gray-400 text-base md:text-lg font-light leading-relaxed">
                                    {ind.shortDesc}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="text-center py-20 text-white/30">
                            <p className="text-lg font-light">No industries found matching "{searchTerm}"</p>
                        </div>
                    )}
                </div>
            </section>

            <Contact />
            <Footer />
        </motion.div>
    

    </>

    );
};

export default IndustriesAllPage;
