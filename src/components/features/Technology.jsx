'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useIsMobile } from '@/hooks/useIsMobile';
import { SiUnrealengine, SiAutodesk, SiCoronarenderer, SiUnity, SiBlender, SiPlaycanvas, TbBrandAdobePhotoshop, TbBrandAdobeAfterEffect, HiOutlineBolt, LuPaintbrush, LuDroplet, LuBox } from '@/components/ui/Icons';
import { getImgSrc } from '@/utils/api';
import technologyImgRaw from '@/assets/About-page/technology.webp';

const technologyImg = getImgSrc(technologyImgRaw);

const PLAYCANVAS_SRC = 'https://playcanv.as/e/p/77f02e22/';

const CAR_COLORS = [
  { id: '#000000', name: 'Obsidian Pearl Metallic', hex: '#0F0F0F' },
  { id: '#ffffff', name: 'Pure White', hex: '#ffffff' },
  { id: '#2A4858', name: 'Ocean Blue', hex: '#2A4858' },
  { id: '#4D3D1A', name: 'Desert Gold', hex: '#4D3D1A' },
];

const FALLBACK_PREVIEW_IMG = '/assets/About-page/technology.webp';
const SECONDARY_FALLBACK = '/assets/ElipseImages/hero/volve-configrator.webp';

const LiveDemo = () => {
  const [activated, setActivated] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [activeColor, setActiveColor] = useState(CAR_COLORS[0].id);
  const [imgSrc, setImgSrc] = useState(technologyImg || FALLBACK_PREVIEW_IMG);
  const frameRef = useRef(null);
  const wrapperRef = useRef(null);
  const unloadTimer = useRef(null);

  // Send postMessage to PlayCanvas
  const sendMsg = useCallback((msg) => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    try {
      frame.contentWindow.postMessage(msg, '*');
    } catch (e) {
      console.error('Error posting message to PlayCanvas:', e);
    }
  }, []);

  const sendStudio = useCallback(() => {
    sendMsg({ action: 'customAction4', buttonId: 'Studio' });
  }, [sendMsg]);

  // Continuously send Studio message as soon as Launch is clicked
  // Retries every 300ms for 10s to ensure PlayCanvas engine picks it up the exact millisecond its scripts initialize
  useEffect(() => {
    if (!activated || iframeError) return;

    // Send immediately
    sendStudio();

    const interval = setInterval(() => {
      sendStudio();
    }, 300);

    // Stop polling after 10 seconds (PlayCanvas fully ready by then)
    const stopTimer = setTimeout(() => {
      clearInterval(interval);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearTimeout(stopTimer);
    };
  }, [activated, iframeError, sendStudio]);

  // Timeout protection: If iframe takes longer than 14 seconds and hasn't loaded, flag error gracefully
  useEffect(() => {
    if (!activated || iframeLoaded || iframeError) return;
    const timeout = setTimeout(() => {
      if (!iframeLoaded) {
        setIframeError(true);
      }
    }, 14000);
    return () => clearTimeout(timeout);
  }, [activated, iframeLoaded, iframeError]);

  // Ensure 3D assets & Studio cubemap fully apply before fading out the loading screen (1.8s buffer)
  useEffect(() => {
    if (!iframeLoaded) {
      setIsReady(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 1800);
    return () => clearTimeout(timer);
  }, [iframeLoaded]);

  // Listen for PlayCanvas ready notification
  useEffect(() => {
    if (!activated) return;
    const handleWindowMessage = (event) => {
      try {
        const d = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        if (d && (d.event === 'ready' || d.action === 'ready' || d === 'ready')) {
          sendStudio();
        }
      } catch (_) { }
    };
    window.addEventListener('message', handleWindowMessage);
    return () => window.removeEventListener('message', handleWindowMessage);
  }, [activated, sendStudio]);

  const handleLaunch = () => {
    setActivated(true);
    setIframeLoaded(false);
    setIframeError(false);
    setIsReady(false);
  };

  const handleClose = () => {
    setActivated(false);
    setIframeLoaded(false);
    setIframeError(false);
    setIsReady(false);
  };

  // Color swatch click
  const handleColorClick = useCallback((colorId) => {
    setActiveColor(colorId);
    sendMsg({ action: 'changeColor', color: colorId });
  }, [sendMsg]);

  // Scroll-away unload after 5.5s when out of viewport
  useEffect(() => {
    if (!activated) return;
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (unloadTimer.current) {
            clearTimeout(unloadTimer.current);
            unloadTimer.current = null;
          }
        } else {
          unloadTimer.current = setTimeout(() => {
            setActivated(false);
            setIframeLoaded(false);
            setIframeError(false);
            setIsReady(false);
          }, 5500);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (unloadTimer.current) clearTimeout(unloadTimer.current);
    };
  }, [activated]);

  return (
    <div ref={wrapperRef} className="flex flex-col gap-3.5 h-full">
      {/* Iframe / Launch area */}
      <div className="relative w-full h-full min-h-[320px] lg:min-h-[420px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-[#0d0f1c]">
        {activated ? (
          <>
            {/* Close Demo Button */}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Close 3D Configurator"
              className="absolute top-4 right-4 z-30 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {iframeError ? (
              /* Graceful Fallback if 3D Configurator Fails to Load */
              <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center bg-[#0d0f1c] text-white p-6 text-center">
                <div className="relative w-full h-full max-h-[220px] mb-4 overflow-hidden rounded-2xl border border-white/10">
                  <img
                    src={imgSrc}
                    alt="Configurator Fallback Preview"
                    className="w-full h-full object-cover filter brightness-75"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                </div>
                <p className="text-sm font-medium text-white/90 mb-1.5">3D Interactive Configurator Unavailable</p>
                <p className="text-xs text-white/50 mb-4 max-w-xs">Viewing static preview model.</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-2.5 bg-[#4169E1] hover:bg-[#3558c8] text-white text-xs font-semibold rounded-full transition-all cursor-pointer shadow-md"
                >
                  Return to Preview
                </button>
              </div>
            ) : (
              <>
                {/* Spinner with optimal timing for Studio transition */}
                <div className={`absolute inset-0 z-[2] flex items-center justify-center bg-[#0d0f1c] transition-opacity duration-700 ${isReady ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                  <div className="flex flex-col items-center gap-3.5">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full border-[3px] border-white/10" />
                      <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#4169E1] animate-spin" />
                    </div>
                    <div className="flex flex-col items-center gap-1 text-center px-4">
                      <p className="text-white/80 text-xs font-medium tracking-wide">Preparing Studio Environment</p>
                      <p className="text-white/30 text-[11px]">Loading 3D assets & lighting…</p>
                    </div>
                  </div>
                </div>
                <iframe
                  ref={frameRef}
                  src={PLAYCANVAS_SRC}
                  title="Elipse Studio 3D Car Configurator"
                  allow="autoplay; fullscreen; xr-spatial-tracking"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0 z-[1] bg-[#0d0f1c]"
                  onError={() => setIframeError(true)}
                  onLoad={() => {
                    setIframeLoaded(true);
                    sendStudio();
                  }}
                />
              </>
            )}
          </>
        ) : (
          /* Preview image with Live Demo button and safe fallback */
          <div className="relative w-full h-full min-h-[320px] lg:min-h-[420px] flex items-center justify-center overflow-hidden group">
            <img
              src={imgSrc}
              alt="Technology 3D Demo Preview"
              onError={() => {
                if (imgSrc !== FALLBACK_PREVIEW_IMG) {
                  setImgSrc(FALLBACK_PREVIEW_IMG);
                } else {
                  setImgSrc(SECONDARY_FALLBACK);
                }
              }}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {/* Dark overlay for contrast */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-black/30" />

            <button
              type="button"
              onClick={handleLaunch}
              className="relative z-10 px-8 py-3.5 md:px-10 md:py-4 bg-[#4169E1] hover:bg-[#3558c8] active:bg-[#2e4fba] text-white text-sm md:text-base font-semibold tracking-wide rounded-full transition-all duration-300 shadow-lg shadow-[#4169E1]/40 hover:shadow-[#4169E1]/60 hover:scale-105 active:scale-95 flex items-center gap-2.5 cursor-pointer"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
              <span>Live Demo</span>
            </button>
          </div>
        )}
      </div>

      {/* Color swatches — visible only after launch */}
      {activated && (
        <div className="px-4 py-4 bg-[#0b0d16] border border-white/10 rounded-2xl flex flex-col gap-2.5">
          <div className="text-[11px] font-bold uppercase tracking-widest text-[#9aa3d6]">
            Colour —{' '}
            <span className="text-white">
              {CAR_COLORS.find((c) => c.id === activeColor)?.name}
            </span>
          </div>
          <div className="flex gap-2.5 flex-wrap items-center">
            {CAR_COLORS.map((c) => (
              <button
                key={c.id}
                type="button"
                title={c.name}
                aria-label={c.name}
                onClick={() => handleColorClick(c.id)}
                className={`w-7 h-7 rounded-full border-2 transition-all duration-150 ${activeColor === c.id ? 'border-[#4169E1] scale-110' : 'border-white/20'
                  }`}
                style={{ background: c.hex }}
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
            Cinematic Real&#8209;Time Technology
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
              Book Project Consultation
            </Link>

          </div>
        </div>

        <LiveDemo />
      </div>
    </section>
  );
};

export default Technology;
