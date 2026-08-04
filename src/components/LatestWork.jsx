'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import { apiCall } from '../utils/api';
import { BACKEND_ORIGIN } from '../utils/api';

const Animation4 = '/assets/ElipseImages/projects/Animation4.webp';
const qist = '/assets/ElipseImages/projects/Qist-market.webp';
const VR1 = '/assets/ElipseImages/projects/VR1.webp';
const Artictecture = '/assets/ElipseImages/projects/Artictecture.webp';
const boat = '/assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp';
const Animation2 = '/assets/ElipseImages/projects/Animation2.webp';
const Animation3 = '/assets/ElipseImages/projects/Animation3.webp';
const Animation = '/assets/ElipseImages/projects/Animation.webp';
const AR = '/assets/ElipseImages/projects/AR.webp';
const Animation7 = '/assets/ElipseImages/projects/Animation7.webp';
const kia = '/assets/ElipseImages/projects/2.webp';
const seat = '/assets/ElipseImages/projects/seat-2-1.webp';
const fruit = '/assets/ElipseImages/projects/Nawarco2.webp';
const towel = '/assets/ElipseImages/projects/TOWEL.webp';
const boat1 = '/assets/ElipseImages/projects/Boat.webp';
const VR2 = '/assets/ElipseImages/projects/VR2.webp';
const VR3 = '/assets/ElipseImages/projects/VR3.webp';
const VR4 = '/assets/ElipseImages/projects/VR4.webp';
const VR5 = '/assets/ElipseImages/projects/VR5.webp';
const AR1 = '/assets/ElipseImages/projects/AR1.webp';
const AR2 = '/assets/ElipseImages/projects/AR2.webp';
const Artictecture1 = '/assets/ElipseImages/projects/VR1.webp';
const Artictecture2 = '/assets/ElipseImages/projects/Artictecture2.webp';
const Artictecture3 = '/assets/ElipseImages/projects/Artictecture3.webp';
const club = '/assets/ElipseImages/projects/clubpro.webp';
const housingThumb = '/assets/ElipseImages/projects/housing-2.webp';
const T1 = '/assets/ElipseImages/projects/3601.webp';
const T2 = '/assets/ElipseImages/projects/3602.webp';
const T4 = '/assets/ElipseImages/projects/3604.webp';

const categories = [
    "ALL", "Animation", "Web", "Configurator", "VR", "AR", "Architecture", "Tour 360"
];

const staticProjects = [];

const mapProjects = (data) => data
    .filter(p => p.title !== 'Costa Cart' && p.title !== 'Costa Cart Config' && p.path !== '/project/costa-cart')
    .map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        image: p.image,
        path: p.path
    }));

const LatestWork = ({ isLight = false, initialProjects = null }) => {
    const location = useLocation();
    const [apiProjects, setApiProjects] = useState(initialProjects ? mapProjects(initialProjects) : []);
    const [activeCategory, setActiveCategory] = useState('ALL');
    const [searchTerm, setSearchTerm] = useState('');
    const [visibleCount, setVisibleCount] = useState(6);
    const scrollRef = useRef(null);
    const [showLeftFade, setShowLeftFade] = useState(false);
    const [showRightFade, setShowRightFade] = useState(true);
    const leftSentinelRef = useRef(null);
    const rightSentinelRef = useRef(null);

    useEffect(() => {
        if (initialProjects !== null) return;
        const fetchProjects = async () => {
            try {
                const { data, status } = await apiCall('/projects', 'GET');
                if (status === 200 && Array.isArray(data)) {
                    setApiProjects(mapProjects(data));
                }
            } catch { /* ignore */ }
        };
        fetchProjects();
    }, [initialProjects]);

    const apiPaths = new Set(apiProjects.map(p => p.path));
    const projects = [...apiProjects, ...staticProjects.filter(p => !apiPaths.has(p.path))];

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const category = params.get('category');
        if (category) {
            const foundCategory = categories.find(c => c.toUpperCase() === category.toUpperCase());
            if (foundCategory) {
                setActiveCategory(foundCategory);
            }
        }
    }, [location.search]);

    useEffect(() => {
        const leftObserver = new IntersectionObserver(
            ([entry]) => setShowLeftFade(!entry.isIntersecting),
            { threshold: 0.1 }
        );
        const rightObserver = new IntersectionObserver(
            ([entry]) => setShowRightFade(!entry.isIntersecting),
            { threshold: 0.1 }
        );

        if (leftSentinelRef.current) leftObserver.observe(leftSentinelRef.current);
        if (rightSentinelRef.current) rightObserver.observe(rightSentinelRef.current);

        return () => {
            leftObserver.disconnect();
            rightObserver.disconnect();
        };
    }, []);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        setSearchTerm('');
        setVisibleCount(6);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setVisibleCount(6);
    };

    const loadMore = () => {
        setVisibleCount(prev => prev + 6);
    };

    const filteredProjects = projects.filter(project => {
        if (location.pathname === project.path) return false;
        const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.category.toLowerCase().includes(searchTerm.toLowerCase());
        if (searchTerm) return matchesSearch;
        if (activeCategory === 'ALL') return true;
        return (project.category || '').split(',').map(c => c.trim().toUpperCase()).includes(activeCategory.toUpperCase());
    });

    const displayedProjects = filteredProjects.slice(0, visibleCount);

    return (
        <section id="latest-work" className={`relative transition-colors duration-300 ${isLight ? 'bg-white pt-8 md:pt-16 pb-10 md:pb-16 text-zinc-900' : 'bg-black text-white'}`}>
            {isLight && <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>}
            {/* Heading & Categories */}
            <div className="w-full mx-auto px-[15px] md:px-[40px] pt-8 md:pt-12">
                <div className="flex items-center justify-between gap-4 mb-6 md:mb-6">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
                        Latest Work
                    </h2>
                    <div className="relative flex items-center w-full max-w-[180px] md:max-w-xs">
                        <div className={`flex items-center border rounded-full pl-4 pr-1.5 py-1.5 w-full hover:border-[#4169E1]/50 transition-all duration-300 focus-within:border-[#4169E1] ${isLight ? 'bg-zinc-100/50 border-zinc-200 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.06)]' : 'bg-zinc-900/50 border-zinc-800 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.1)]'}`}>
                            <input
                                type="text"
                                placeholder="Search..."
                                className={`bg-transparent border-none outline-none text-[10px] md:text-sm w-full placeholder:text-zinc-500 min-h-[32px] ${isLight ? 'text-black' : 'text-white'}`}
                                value={searchTerm}
                                onChange={handleSearchChange}
                                aria-label="Search projects"
                            />
                            <button
                                className="bg-[#4169E1] text-black p-2 md:p-2.5 rounded-full hover:bg-[#4169E1] transition-colors shrink-0 flex items-center justify-center min-w-[32px] min-h-[32px]"
                                aria-label="Submit Search"
                            >
                                <FiSearch className="w-3.5 h-3.5 md:w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="relative mb-4 md:mb-8">
                    <div className={`absolute left-0 top-0 bottom-4 w-12 pointer-events-none z-20 transition-opacity duration-500 lg:hidden ${showLeftFade ? 'opacity-100' : 'opacity-0'} ${isLight ? 'bg-gradient-to-r from-white to-transparent' : 'bg-gradient-to-r from-black to-transparent'}`} />
                    <div
                        ref={scrollRef}
                        className="flex overflow-x-auto no-scrollbar gap-x-6 md:gap-x-12 pb-4 snap-x snap-mandatory scroll-smooth pl-1"
                        style={{ WebkitOverflowScrolling: 'touch' }}
                    >
                        {/* Sentinels for IntersectionObserver */}
                        <span ref={leftSentinelRef} className="absolute left-0 w-1 h-full pointer-events-none" />

                        {categories.map((cat, index) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange(cat)}
                                className={`text-sm md:text-2xl transition-all duration-300 whitespace-nowrap snap-start ${activeCategory === cat && !searchTerm
                                    ? (isLight ? 'text-zinc-900 border-b-2 border-[#4169E1] pb-1 font-semibold' : 'text-white border-b-2 border-[#4169E1] pb-1')
                                    : (isLight ? 'text-zinc-500 hover:text-zinc-900' : 'text-zinc-400 hover:text-white')
                                    } ${index === categories.length - 1
                                        ? 'pr-20 md:pr-32'
                                        : ''
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}

                        <span ref={rightSentinelRef} className="absolute right-0 w-1 h-full pointer-events-none" />
                    </div>
                </div>
            </div>

            {/* Grid of cards - perfectly uniform 15px spacing everywhere */}
            <div className="w-full px-[15px] md:px-[40px]">
                <div
                    key={activeCategory}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]"
                >
                    {displayedProjects.map((project) => (
                        <Link
                            key={project.id}
                            to={project.path || `/case-study/${project.id}`}
                            target={project.path?.startsWith('http') ? "_blank" : "_self"}
                            rel={project.path?.startsWith('http') ? "noopener noreferrer" : ""}
                            aria-label={`View project: ${project.title}`}
                            className={`group block relative overflow-hidden border transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl aspect-[16/9] w-full ${isLight ? 'border-zinc-200 hover:border-zinc-300' : 'border-zinc-800 hover:border-zinc-700'}`}
                        >
                            <div className="relative h-full w-full overflow-hidden">

                                <img
                                    src={project.image ? (project.image.startsWith('http') ? project.image : `${BACKEND_ORIGIN}${project.image}`) : ''}
                                    alt={project.title}
                                    width="600"
                                    height="400"
                                    loading="lazy"
                                    decoding="async"
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
                                    <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-zinc-300 text-xs md:text-sm mb-2 line-clamp-2">
                                        {project.category === "Configurator" ? "Interactive configurator that drives engagement and conversions" :
                                         project.category === "VR" ? "Immersive VR experience that captivates audiences" :
                                         project.category === "AR" ? "Augmented reality that bridges digital and physical" :
                                         project.category === "Animation" ? "Cinematic animation that tells your brand story" :
                                         project.category === "Web" ? "High-performance web experience built for results" :
                                         project.category === "Architecture" ? "Photoreal architectural visualization that sells" :
                                         project.category === "Tour 360" ? "Immersive 360 tour that showcases every detail" :
                                         "Real results delivered through immersive technology"}
                                    </p>
                                    <div className="pt-3 border-t border-zinc-700/50">
                                        <span className="inline-flex items-center text-xs font-semibold text-white group-hover:text-[#4169E1] transition-colors uppercase tracking-widest">
                                            {project.category === "Tour 360" ? "View 360 Tour" : "View Case Study"}
                                            <svg className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {filteredProjects.length > 6 && (
                    <div className="flex justify-center mt-8 pb-6 md:pb-8">
                        <button
                            onClick={filteredProjects.length > visibleCount ? loadMore : () => setVisibleCount(6)}
                            className={`group relative flex items-center gap-3 border rounded-full px-10 py-4 text-sm font-medium tracking-widest uppercase hover:scale-105 transition-all duration-500 ${isLight ? 'bg-black/5 border-black/20 hover:bg-black hover:text-white' : 'bg-white/5 border-white/20 hover:bg-white hover:text-black'}`}
                        >
                            {filteredProjects.length > visibleCount ? "Load More" : "Show Less"}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LatestWork;
