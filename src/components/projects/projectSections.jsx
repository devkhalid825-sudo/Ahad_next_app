﻿'use client';

import React from "react";

export const OverviewSection = ({ overview, challenge }) => (
  <section className="px-8 py-[6rem] bg-[#F2F0EB] grid grid-cols-1 lg:grid-cols-2 gap-[3rem] items-stretch">
    <div className="p-[2rem]">
      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Overview</p>
      <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#0D0D0D]">{overview.heading}</h4>
      <p className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-[#3A3A3A]/80">{overview.text}</p>
    </div>
    <div className="bg-[#0D0D0D] rounded-lg p-[2rem] text-[#F2F0EB]">
      <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">The challenge</p>
      <h3 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">{challenge.heading}</h3>
      <p className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/80">{challenge.text}</p>
    </div>
  </section>
);

export const ResultsSection = ({ results, title }) => (
  <section className="bg-[#0D0D0D] px-8 py-[6rem]">
    <div className="mb-[3rem]">
      <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Impact</p>
      <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">{title}</h4>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-[black] border border-[#1A1A1A] rounded-xl overflow-hidden">
      {results.map((r, i) => (
        <div key={i} className="bg-[#111] p-[2.5rem] flex flex-col justify-center">
          <div className="text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{r.value}</div>
          <div className="font-semibold text-[#F2F0EB] mb-[8px]">{r.title}</div>
          <div className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/80">{r.desc}</div>
          
        </div>
      ))}
    </div>
  </section>
);

export const ProcessSection = ({ steps }) => (
  <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#F2F0EB]">
    <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">How we did it</p>
    <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-8 md:mb-16 tracking-tight leading-[1.1] text-[#0D0D0D]">Our process</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
      {steps.map((item, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 md:p-8 border border-[#E0DDD7]">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">{item.step}</span>
            <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">{item.phase}</span>
          </div>
          <h4 className="text-[17px] md:text-[20px] font-semibold text-[#0D0D0D] mb-3">{item.title}</h4>
          <p className="text-sm md:text-[15px] font-light leading-[1.7] text-[#555]/80">{item.desc}</p>
        </div>
      ))}
    </div>
  </section>
);

export const GallerySection = ({ images, title }) => {
  if (!images || images.length === 0) return null;
  const single = images.length === 1;
  const cols = single ? "md:grid-cols-2" : images.length === 2 ? "md:grid-cols-2" : images.length === 3 ? "md:grid-cols-3" : "md:grid-cols-4";
  return (
    <section className="bg-[#0D0D0D] px-[15px] md:px-[40px] py-[6rem] overflow-hidden">
      <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Visual output</p>
      <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">{title}</h4>
      {single ? (
        <div className="max-w-4xl rounded-lg overflow-hidden border border-zinc-800 bg-[#0D0D0D] aspect-[16/9] mt-[2rem]">
          <img src={images[0]} alt={`${title} showcase`} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className={`grid grid-cols-1 ${cols} gap-[15px] mt-[2rem]`}>
          {images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 aspect-[16/9] w-full rounded-lg">
              <img src={src} alt={`Project showcase ${i + 1}`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
 
