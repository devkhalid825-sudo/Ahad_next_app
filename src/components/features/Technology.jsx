'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SiUnrealengine, SiAutodesk, SiCoronarenderer, SiUnity, SiBlender, SiPlaycanvas, TbBrandAdobePhotoshop, TbBrandAdobeAfterEffect, HiOutlineBolt, LuPaintbrush, LuDroplet, LuBox } from '@/components/ui/Icons';

const YACHT_COLORS = [
  { id: 'LaserBlack:', name: 'Laser Black', hex: '#1d181f' },
  { id: 'PearlyWhite:', name: 'Pearly White', hex: '#edd0bd' },
  { id: 'TealRainbow:', name: 'Teal Rainbow', hex: '#162f31' },
  { id: 'RoseGrey:', name: 'Rose Grey', hex: '#502e20' },
];

const LiveDemo = ({ src }) => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const isMobile = useIsMobile();
  const frameRef = useRef(null);

  const shouldMountIframe = isMobile === false ? true : isActivated;

  const sendColor = (colorId) => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    frame.contentWindow.postMessage(colorId, '*');
  };

  return (
    <div className="flex flex-col gap-3.5 h-full">
      <div className="relative w-full h-full min-h-[320px] lg:min-h-[420px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0d0f1c]">
        {shouldMountIframe ? (
          <>
            <div className={`absolute inset-0 z-[2] flex items-center justify-center bg-[#0d0f1c] transition-opacity duration-300 ${loaded ? 'opacity-0 pointer-events-none' : ''}`}>
              <div className="w-8 h-8 rounded-full border-[3px] border-white/15 border-t-[#4169E1] animate-spin" />
            </div>
            <iframe
              ref={frameRef}
              src={src}
              title="Live 3D Configurator Demo"
              loading="lazy"
              allow="fullscreen"
              className="absolute inset-0 w-full h-full border-0 z-[1] bg-[#0d0f1c]"
              onLoad={() => {
                setLoaded(true);
                if (YACHT_COLORS[0]) sendColor(YACHT_COLORS[0].id);
              }}
            />
          </>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsActivated(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsActivated(true);
              }
            }}
            className="w-full h-full min-h-[320px] lg:min-h-[420px] flex flex-col items-center justify-center bg-[#151517] text-white p-6 cursor-pointer group select-none relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-zinc-900 opacity-90" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[11px] font-semibold text-[#4169E1] bg-[#4169E1]/10 border border-[#4169E1]/30 px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                Live Configurator
              </span>
              <div className="w-13 h-13 rounded-full bg-[#4169E1] text-white flex items-center justify-center shadow-lg shadow-[#4169E1]/40 mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <h4 className="text-base font-medium text-white mb-1">Live 3D Configurator Demo</h4>
              <p className="text-xs text-zinc-400 max-w-xs">Tap to launch real-time 3D model in browser</p>
            </div>
          </div>
        )}
      </div>
      {YACHT_COLORS.length > 0 && (
        <div className="px-4 py-4 bg-[#0b0d16] border border-white/10 rounded-2xl flex flex-col gap-2.5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#9aa3d6]">
            Finish — <span className="text-white">{YACHT_COLORS[active]?.name}</span>
          </div>
          <div className="flex gap-2.5 flex-wrap items-center">
            {YACHT_COLORS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ${i === active ? 'border-[#4169E1] scale-110' : 'border-white/20'}`}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => {
                  setActive(i);
                  if (shouldMountIframe) {
                    sendColor(c.id);
                  } else {
                    setIsActivated(true);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

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

          <p className="text-gray-300 text-sm md:text-base leading-relaxed font-light max-w-md lg:max-w-lg lg:mx-0 mx-auto">
            Most studios are still offline-render shops — pretty pictures, slowly. Elipse Studio pairs traditional photoreal rendering with Unreal Engine real-time technology and Cesium global geospatial data.
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

          <div className="flex flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 py-2.5 md:px-8 md:py-3.5 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
            >
              Get a Free Estimate
            </Link>
            <Link
              href="/project/volvo-configurator"
              className="inline-block px-6 py-2.5 md:px-8 md:py-3.5 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-full text-sm md:text-base font-semibold transition-all"
            >
              View Volvo Case Study
            </Link>
          </div>
        </div>

        <LiveDemo src="https://playcanv.as/e/p/B6sx93V1/" />
      </div>
    </section>
  );
};

export default Technology;
