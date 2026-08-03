'use client';

import React from 'react';
import { Link } from 'react-router-dom';
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

const industries = [
    { title: 'Real Estate', description: 'Off-plan visualization & sales centre installations.', icon: <HiOutlineBuildingOffice2 className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/real-estate' },
    { title: 'Architecture', description: 'Render production for design firms & competitions.', icon: <LuRuler className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/architecture' },
    { title: 'Interior Design', description: 'Photoreal interior visualization for hospitality.', icon: <LuSofa className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/interior-design' },
    { title: 'Manufacturing', description: 'Hero shots, exploded views, assembly animations.', icon: <LuFactory className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/manufacturing' },
    { title: 'E-Commerce', description: '3D configurators, AR shopping & virtual showrooms.', icon: <HiOutlineShoppingCart className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/ecommerce' },
    { title: 'Automotive', description: 'Vehicle configurators, digital showrooms & VR test drives.', icon: <HiOutlineTruck className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/automotive' },
    { title: 'Furniture', description: 'Configurators, AR placement & virtual showrooms.', icon: <HiOutlineHomeModern className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/furniture' },
    { title: 'Healthcare', description: 'Medical device viz, surgical sim & patient education.', icon: <HiOutlineHeart className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/healthcare' },
    { title: 'Education & Training', description: 'Immersive learning, VR training & virtual classrooms.', icon: <HiOutlineBookOpen className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/education-training' },
    { title: 'Construction', description: 'BIM visualization, site safety training & progress viz.', icon: <HiOutlineWrenchScrewdriver className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/construction' },
    { title: 'Energy & Utilities', description: 'Plant viz, digital twins & energy safety training.', icon: <HiOutlineBolt className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/energy-utilities' },
    { title: 'Hospitality', description: 'Hotel marketing, resort virtual tours & venue showcases.', icon: <HiOutlineBuildingOffice className="w-7 h-7 md:w-10 md:h-10" />, link: '/industries/hospitality' },
];

const Industries = () => {
    return (
        <section id="industries" className="py-12 md:py-20 bg-black text-white overflow-hidden">
            <div className="w-full px-[15px] md:px-[40px]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-12 text-center sm:text-left">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-3 sm:mb-0 tracking-tight leading-[1.1]">
                        Industries We Serve
                    </h2>
                    <Link
                        to="/industries"
                        className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-5 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40 mt-2 sm:mt-0 self-center sm:self-auto"
                    >
                        View All Industries
                    </Link>
                </div>

                {/* Mobile: simple 2-column grid of all industries */}
                <div className="grid grid-cols-2 gap-3 md:hidden">
                    {industries.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className="bg-zinc-950/40 backdrop-blur-md border border-white/20 hover:border-[#4169E1]/40 rounded-2xl p-4 flex flex-col items-center gap-3 transition-all duration-500 min-h-[130px]"
                        >
                            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/20 flex items-center justify-center text-white/70">
                                {React.cloneElement(item.icon, { className: "w-5 h-5" })}
                            </div>
                            <h3 className="text-[11px] font-semibold tracking-tight text-center leading-tight">
                                {item.title}
                            </h3>
                        </Link>
                    ))}
                </div>

                {/* Desktop: full grid */}
                <div className="hidden md:grid md:grid-cols-3 xl:grid-cols-6 gap-4">
                    {industries.map((item, index) => (
                        <Link
                            key={index}
                            to={item.link}
                            className="relative bg-zinc-950/40 backdrop-blur-md border border-white/[0.05] hover:border-[#4169E1]/30 rounded-2xl p-4 md:p-6 flex flex-col items-center gap-3 hover:shadow-[0_0_30px_rgba(65,105,225,0.1)] transition-all duration-500 group overflow-hidden min-h-[160px] md:min-h-[190px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/0 via-transparent to-transparent group-hover:from-[#4169E1]/5 transition-all duration-500 pointer-events-none" />
                            <div className="absolute top-3 right-3 text-[#4169E1]/0 group-hover:text-[#4169E1]/40 transition-all duration-300 text-xs">✦</div>
                            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/[0.02] border border-white/[0.05] flex items-center justify-center text-white/70 group-hover:text-[#4169E1] group-hover:bg-[#4169E1]/10 group-hover:border-[#4169E1]/20 transition-all duration-300 relative z-10 shrink-0">
                                {React.cloneElement(item.icon, { className: "w-6 h-6 md:w-8 md:h-8" })}
                            </div>
                            <div className="relative z-10 flex flex-col gap-1.5 flex-1 text-center justify-center">
                                <h3 className="text-[12px] md:text-sm font-semibold tracking-tight leading-tight group-hover:text-white transition-colors duration-300">
                                    {item.title}
                                </h3>
                                <p className="text-[10px] md:text-xs text-gray-400 leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300 line-clamp-2 hidden sm:block">
                                    {item.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Industries;
