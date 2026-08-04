'use client';

import React from 'react';
import Link from 'next/link';
import {
  SiUnrealengine,
  SiAutodesk,
  SiCoronarenderer,
  SiUnity,
  SiBlender,
  SiPlaycanvas,
} from 'react-icons/si';
import { TbBrandAdobePhotoshop, TbBrandAdobeAfterEffect } from 'react-icons/tb';
import { HiOutlineBolt } from 'react-icons/hi2';
import { LuPaintbrush, LuDroplet, LuBox } from 'react-icons/lu';

const techHero = '/assets/ElipseImages/hero/volve-configrator.webp';

const technologies = [
  { name: 'Unreal Engine', icon: <SiUnrealengine className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: '3ds Max', icon: <SiAutodesk className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Corona', icon: <SiCoronarenderer className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'V-Ray', icon: <HiOutlineBolt className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'ZBrush', icon: <LuPaintbrush className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Substance', icon: <LuDroplet className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Photoshop', icon: <TbBrandAdobePhotoshop className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'After Effects', icon: <TbBrandAdobeAfterEffect className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Unity', icon: <SiUnity className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'PlayCanvas', icon: <SiPlaycanvas className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Maya', icon: <LuBox className="w-6 h-6 md:w-8 md:h-8" /> },
  { name: 'Blender', icon: <SiBlender className="w-6 h-6 md:w-8 md:h-8" /> },
];

const Technology = () => {
  return (
    <section className="pt-12 md:pt-16 pb-8 md:pb-16 bg-black text-white px-[15px] md:px-[40px] overflow-hidden relative">
      <div className="max-w-8xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch relative z-10">
        <div className="space-y-8 md:space-y-12 flex flex-col justify-center h-full text-center lg:text-left">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
            Cinematic Real‑Time Technology
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed font-light max-w-2xl lg:mx-0 mx-auto">
            Most architectural visualization studios are still offline-render shops &mdash; they make pretty pictures, slowly. Elipse Studio is built differently. Our pipeline combines traditional photoreal rendering with Unreal Engine real-time technology and Cesium global geospatial data.
          </p>

          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 md:gap-4">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-zinc-900/40 border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center gap-3 group hover:border-[#4169E1]/30 transition-all duration-300 h-full will-change-transform"
              >
                <div className="text-gray-400 group-hover:text-[#4169E1] transition-colors duration-300">
                  {tech.icon}
                </div>
                <span className="text-[11px] md:text-xs font-medium text-gray-500 group-hover:text-gray-300 transition-colors duration-300 uppercase tracking-wider text-center">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        <Link href="/project/volvo-configurator" className="relative group cursor-pointer h-full block">
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={techHero}
              alt="Advanced Technology Visualization"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </Link>
      </div>
    </section>
  );
};

export default Technology;
