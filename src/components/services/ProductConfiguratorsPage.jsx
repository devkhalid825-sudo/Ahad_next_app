'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ConfiguratorHeader from '../layouts/ConfiguratorHeader';
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';
import ClientReviews from '../features/ClientReviews';
import { getImgSrc } from '../../utils/api';

// Project Images
import steeringImgRaw from '../../assets/ElipseImages/projects/Steering-1.webp';
import volvoImgRaw from '../../assets/ElipseImages/hero/volve-configrator.webp';
import inverexImgRaw from '../../assets/ElipseImages/projects/G-1.webp';
import seatImgRaw from '../../assets/ElipseImages/projects/seat-2-1.webp';
import sharkImgRaw from '../../assets/About-page/shark.webp';
import kiaImgRaw from '../../assets/About-page/kia.webp';
import marineImgRaw from '../../assets/About-page/marine.webp';
import inverxImgRaw from '../../assets/About-page/inverx.webp';
import tshirtImgRaw from '../../assets/About-page/t-shirt.webp';

const steeringImg = getImgSrc(steeringImgRaw);
const volvoImg = getImgSrc(volvoImgRaw);
const inverexImg = getImgSrc(inverexImgRaw);
const sharkImg = getImgSrc(sharkImgRaw);
const kiaImg = getImgSrc(kiaImgRaw);
const marineImg = getImgSrc(marineImgRaw);
const inverxImg = getImgSrc(inverxImgRaw);
const tshirtImg = getImgSrc(tshirtImgRaw);
const seatImg = getImgSrc(seatImgRaw);

// Selected 3D Product Configurator Portfolio Builds
const CONFIGURATOR_BUILDS = [
  {
    title: 'BMW Steering Wheel Configurator',
    category: 'Automotive WebGL',
    desc: 'Real-time 3D browser customization for stitching, paddle shifters, carbon textures, and trim colors powered by PlayCanvas.',
    image: steeringImg,
    tech: 'PlayCanvas · WebGL',
    liveLink: 'https://steering-configurator.netlify.app/',
    reelLink: 'https://youtube.com/shorts/Rm2SXb_reVI?si=cNPmF7I7lDLglhNb',
  },
  {
    title: 'Volvo Vehicle 3D Walkthrough',
    category: 'Vehicle Configurator',
    desc: 'Interactive 3D exterior and interior vehicle customizer with photoreal material switching, camera presets, and real-time lighting.',
    image: volvoImg,
    tech: 'Unreal Engine · WebGL',
    reelLink: 'https://youtu.be/rO1sg3y3TF0?si=9yv7WSm0m5AwqG0p',
    youtubeLink: 'https://youtu.be/rO1sg3y3TF0?si=9yv7WSm0m5AwqG0p',
  },
  {
    title: 'Costa Golf Cart Configurator',
    category: 'Electric Vehicle 3D',
    desc: 'Real-time 3D electric cart customizer with dynamic body color shifts, canopy styling, tire packages, and instant live quotation.',
    image: inverexImg,
    tech: 'PlayCanvas · WebGL',
    liveLink: 'https://costa-carts.netlify.app/',
  },
  {
    title: 'Kia Sportage 3D Configurator',
    category: 'Automotive WebGL',
    desc: 'Interactive 3D crossover configurator featuring day/night environment toggles, custom rims, metallic paints, and cockpit inspection.',
    image: kiaImg,
    tech: 'Unreal Engine · WebGL',
    liveLink: 'https://legacy.elipsestudio.com/Kia/',
  },
  {
    title: 'BYD Shark 6 Configurator',
    category: 'Vehicle Customizer',
    desc: 'Interactive multi-angle truck builder with dynamic bullbars, roll cages, off-road accessories, and real-time SKU generation.',
    image: sharkImg,
    tech: 'PlayCanvas · WebGL',
    liveLink: 'https://legacy.elipsestudio.com/Zeus-Configurator/',
  },
  {
    title: 'Inverex E-Bike Configurator',
    category: 'Motorcycle & EV 3D',
    desc: 'Real-time 3D electric motorcycle configurator with dynamic frame finishes, battery pack upgrades, and studio lighting controls.',
    image: inverxImg,
    tech: 'PlayCanvas · WebGL',
    liveLink: 'https://legacy.elipsestudio.com/Bike-Configurator/',
  },
  {
    title: 'Automotive Seat Customizer',
    category: 'Material & Trim 3D',
    desc: 'Browser-based 3D automotive seating customizer delivering photoreal micro-leather grain, seam stitching, and ergonomic cross-sections.',
    image: seatImg,
    tech: 'PlayCanvas · WebGL',
    liveLink: 'https://seat-cover-configurator.inknalgorithm.com/',
  },
  {
    title: 'Pursuit 288 Yacht Configurator',
    category: 'Luxury Marine 3D',
    desc: 'High-fidelity real-time marine vessel customizer with bespoke hull wraps, teak decking options, cabin trims, and sea simulation.',
    image: marineImg,
    tech: 'Unreal 5 · WebGL',
    liveLink: 'https://legacy.elipsestudio.com/Yacht_Configurator/',
    reelLink: 'https://youtube.com/shorts/YD_TWiIeL5U?si=aXBtfAFGUwsoPVzS',
  },
  {
    title: 'Custom Apparel 3D Configurator',
    category: 'Apparel & Fashion 3D',
    desc: 'Interactive 3D garment customization with real-time artwork placement, fabric weave textures, colorways, and instant 360° spin.',
    image: tshirtImg,
    tech: 'WebGL · Three.js',
    liveLink: 'https://legacy.elipsestudio.com/T-Shirt/',
  },
];

// Capabilities Grid
const CAPABILITIES = [
  // Row 1: Real-Time WebGL & Commercial Engines
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
      </svg>
    ),
    title: 'Real-Time WebGL & 3D Web Engines',
    desc: 'Zero-download browser-based 3D configurators powered by Three.js, PlayCanvas, and Babylon.js. Fluid 60 FPS orbital cameras and instant response on mobile Safari, Chrome, and desktop browsers.',
    features: [
      'Universal browser support across iOS, Android, macOS & Windows',
      'Ultra-fast load times with Draco geometry & KTX2 texture compression',
      'Smooth 60 FPS real-time orbital interaction & cinematic camera presets',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Photoreal PBR Material & Texture Swapping',
    desc: 'Sub-100ms finish shifts for automotive paints, leather grains, metallic brushing, glass transmittances, and carbon fiber weaves calibrated with accurate HDR environmental reflections.',
    features: [
      'Micro-texture detail with normal, roughness, and clearcoat maps',
      'Dynamic daylight, studio, and night environment mood presets',
      'Instant colorway switches with zero lag or frame drops',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    title: 'Dynamic CPQ & E-Commerce Cart Integration',
    desc: 'Real-time price recalculation, dynamic SKU generation, and native integration into Shopify, WooCommerce, Magento, BigCommerce, or custom headless checkout architectures.',
    features: [
      'Direct Add-to-Cart with dynamic line-item properties & selected options',
      'Automated bill-of-materials (BOM) & spec sheet PDF generation',
      'Logic rules engine to prevent invalid accessory or component pairings',
    ],
  },
  // Row 2: Advanced Interaction, AR & Enterprise
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Augmented Reality (WebAR) Quick-Look',
    desc: 'Enable shoppers to project their customized 3D product directly into their physical living room, garage, or office at true 1:1 scale using iOS AR Quick Look and Android Scene Viewer without downloading any app.',
    features: [
      'Instant WebAR launch directly from the browser configurator',
      'True-to-life physical scale, depth sensing, and real-world lighting',
      'Dramatically lowers return rates by verifying fit before checkout',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    title: 'Exploded Views & Mechanism Animation',
    desc: 'Allow buyers to peel back layers, inspect internal engineering, rotate mechanical parts, and click interactive hot-spots for rich feature callouts and technical breakdowns.',
    features: [
      'Smooth animated part disassembly and dimensional callouts',
      'Interactive annotation pins linking to detailed tech specs',
      'Cutaway x-ray views showcasing internal components & craftsmanship',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Mobile Optimization & Unreal Pixel Streaming',
    desc: 'Designed mobile-first with adaptive texture resolution and intuitive touch gestures. For ultra-luxury supercars and superyachts, we offer cloud-based Unreal Engine 5 Pixel Streaming for cinematic fidelity.',
    features: [
      'Sub-2 second initial load time on 4G/5G mobile connections',
      'Responsive touch UI engineered for one-handed mobile customization',
      'Unreal Engine 5 Cloud Streaming option for photoreal luxury builds',
    ],
  },
];

// PlayCanvas Live 3D Configurator Setup
const CAR_CONFIGURATOR_SRC = 'https://playcanv.as/apps/254d39fc/index.html';

const CAR_CONFIGURATOR_COLORS = [
  { id: 'blue', name: 'Gravity Blue', hex: '#1C3857' },
  { id: 'black', name: 'Fusion Black', hex: '#121214' },
  { id: 'white', name: 'Clear White', hex: '#FFFFFF' },
  { id: 'Igrey', name: 'Interstellar Grey', hex: '#3E4148' },
  { id: 'grey', name: 'Gravity Grey', hex: '#9CA0A5' },
];

const KIA_FALLBACK_IMG = '/assets/About-page/kia.webp';
const SECONDARY_FALLBACK = '/assets/ElipseImages/hero/volve-configrator.webp';

/**
 * Interactive Live PlayCanvas 3D Configurator Component
 * (On-demand WebGL launch for optimal SEO, Core Web Vitals & crash resilience)
 */
const CarConfiguratorViewer = () => {
  const [activated, setActivated] = useState(false);
  const [activeColor, setActiveColor] = useState(CAR_CONFIGURATOR_COLORS[0].id);
  const [isLoaded, setIsLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [imgSrc, setImgSrc] = useState(kiaImg || KIA_FALLBACK_IMG);
  const frameRef = useRef(null);

  const sendColor = (colorId) => {
    setActiveColor(colorId);
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    try {
      const msgWithColon = colorId.endsWith(':') ? colorId : `${colorId}:`;
      const msgRaw = colorId.replace(/:$/, '');

      frame.contentWindow.postMessage(msgWithColon, '*');
      frame.contentWindow.postMessage(msgRaw, '*');
      frame.contentWindow.postMessage({ type: 'CHANGE_COLOR', color: msgWithColon, buttonId: msgRaw, value: msgRaw }, '*');
    } catch (e) {
      console.error('Error posting message to PlayCanvas:', e);
    }
  };

  // Timeout protection: If iframe takes longer than 14 seconds and hasn't loaded, flag error gracefully
  useEffect(() => {
    if (!activated || isLoaded || iframeError) return;
    const timeout = setTimeout(() => {
      if (!isLoaded) {
        setIframeError(true);
      }
    }, 14000);
    return () => clearTimeout(timeout);
  }, [activated, isLoaded, iframeError]);

  const handleIframeLoad = () => {
    setIsLoaded(true);
    setTimeout(() => {
      sendColor(activeColor);
    }, 1000);
  };

  const handleLaunch = () => {
    setActivated(true);
    setIsLoaded(false);
    setIframeError(false);
  };

  const handleClose = () => {
    setActivated(false);
    setIsLoaded(false);
    setIframeError(false);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] bg-[#0E0E10] group">
      {activated ? (
        <>
          {/* Close Demo Button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close 3D Configurator"
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 z-30 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {iframeError ? (
            /* Graceful Fallback if 3D Configurator Fails to Load */
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0d0f1c] text-white p-6 text-center">
              <div className="relative w-full h-full max-h-[220px] mb-4 overflow-hidden rounded-2xl border border-white/10">
                <img
                  src={imgSrc}
                  alt="Kia Sportage 3D Configurator Fallback"
                  className="w-full h-full object-cover filter brightness-75"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
              <p className="text-sm font-medium text-white/90 mb-1.5">3D Interactive Configurator Unavailable</p>
              <p className="text-xs text-white/50 mb-4 max-w-xs">Viewing static model preview.</p>
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
              {/* Loading Spinner */}
              {!isLoaded && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 sm:gap-3 bg-[#0E0E10]">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-[#4169E1]/20 border-t-[#4169E1] rounded-full animate-spin" />
                  <p className="text-[10px] sm:text-xs font-medium tracking-wide uppercase text-zinc-400">
                    Initializing Real-Time 3D Engine...
                  </p>
                </div>
              )}

              {/* Live PlayCanvas Configurator Iframe */}
              <iframe
                ref={frameRef}
                src={CAR_CONFIGURATOR_SRC}
                title="Kia Sportage Interactive 3D Product Configurator"
                allow="fullscreen; xr-spatial-tracking"
                onError={() => setIframeError(true)}
                onLoad={handleIframeLoad}
                className="w-full h-full border-0 relative z-0 bg-transparent"
              />

              {/* Centered Floating Luxury Color Dock */}
              <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[95%] sm:max-w-[92%]">
                <div className="flex items-center gap-1.5 sm:gap-3 bg-black/85 backdrop-blur-2xl px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
                  <div className="flex items-center gap-1.5 sm:gap-2 pr-2 sm:pr-2.5 border-r border-white/15">
                    <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                    <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-white whitespace-nowrap">
                      {CAR_CONFIGURATOR_COLORS.find((c) => c.id === activeColor)?.name || 'Gravity Blue'}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    {CAR_CONFIGURATOR_COLORS.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => sendColor(c.id)}
                        title={c.name}
                        className={`w-5 h-5 sm:w-7 sm:h-7 rounded-full transition-all duration-300 relative flex items-center justify-center cursor-pointer ${activeColor === c.id
                          ? 'scale-110 ring-2 ring-white shadow-[0_0_16px_rgba(255,255,255,0.8)]'
                          : 'opacity-70 hover:opacity-100 hover:scale-105 ring-1 ring-white/20'
                          }`}
                        style={{ backgroundColor: c.hex }}
                        aria-label={c.name}
                      >
                        {activeColor === c.id && (
                          <span className={`w-1.5 h-1.5 rounded-full ${c.hex === '#FFFFFF' ? 'bg-black' : 'bg-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        /* Preview Image with Launch Configurator Button (SEO Optimized, Fast LCP) */
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden group">
          <img
            src={imgSrc}
            alt="Kia Sportage 3D Configurator Real-Time WebGL Preview"
            onError={() => {
              if (imgSrc !== KIA_FALLBACK_IMG) {
                setImgSrc(KIA_FALLBACK_IMG);
              } else {
                setImgSrc(SECONDARY_FALLBACK);
              }
            }}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          {/* Subtle Contrast Overlay */}
          <div className="absolute inset-0 bg-black/35 backdrop-blur-[1px] transition-colors duration-300 group-hover:bg-black/25" />

          {/* Launch Configurator Button */}
          <button
            type="button"
            onClick={handleLaunch}
            className="relative z-10 px-7 py-3.5 sm:px-9 sm:py-4 bg-[#4169E1] hover:bg-[#3558c8] active:bg-[#2e4fba] text-white text-xs sm:text-sm md:text-base font-semibold tracking-wide rounded-full transition-all duration-300 shadow-[0_8px_25px_rgba(65,105,225,0.5)] hover:shadow-[0_12px_35px_rgba(65,105,225,0.7)] hover:scale-105 active:scale-95 flex items-center gap-2.5 sm:gap-3 cursor-pointer select-none"
          >
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
            <span>Launch 3D Configurator</span>
          </button>
        </div>
      )}
    </div>
  );
};

/**
 * 6-Card Static Grid for Capabilities (3 Top, 3 Bottom)
 */
const CapabilitiesGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={i}
            className="p-7 sm:p-8 rounded-2xl bg-[#0D0F14] border border-white/10 hover:border-[#4169E1]/60 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] min-h-[420px] group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/25 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(65,105,225,0.2)] group-hover:scale-105 group-hover:border-[#4169E1]/50 transition-all duration-300">
                {cap.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight leading-snug">
                {cap.title}
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed mb-6">
                {cap.desc}
              </p>
            </div>

            <ul className="space-y-3 pt-5 border-t border-white/10">
              {cap.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-3 text-xs sm:text-[13px] text-zinc-300 font-normal leading-normal">
                  <span className="text-[#4169E1] font-bold text-sm shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductConfiguratorsPage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <ConfiguratorHeader />

      {/* ======================================================== */}
      {/* 1. HERO SECTION (CENTERED FULL-WIDTH DESIGN)             */}
      {/* ======================================================== */}
      <section
        className="relative min-h-[90vh] lg:min-h-[95vh] pt-[110px] sm:pt-[130px] pb-14 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/10 bg-black flex flex-col justify-center items-center text-center overflow-hidden"
      >
        {/* Ambient radial lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(65,105,225,0.12)_0%,transparent_60%)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Top Badge (Hidden on mobile) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-5 sm:mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
            </svg>
            <span>Interactive 3D Web &amp; Product Configurators</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold tracking-tight leading-[1.1] text-white">
            Turn Browsers Into Buyers With{' '}
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent">
              Real-Time 3D Configurators.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-light text-zinc-300 mx-auto">
            Empower your customers to customize, orbit, and interact with products in real-time WebGL directly inside their web browser. From automotive and luxury customizers to fashion, furniture, and enterprise e-commerce CPQ, <strong className="text-white font-medium">Elipse Studio</strong> builds high-converting 3D tools that eliminate return friction.
          </p>

          {/* Hero Action Buttons (Single compact row on all screens) */}
          <div className="mt-6 sm:mt-9 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-sm sm:max-w-xl mx-auto px-2">
            <a
              href="#configurator-gallery"
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-3.5 bg-white hover:bg-[#4169E1] text-black hover:text-white font-semibold text-[11px] sm:text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(65,105,225,0.4)] hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View 3D Portfolio</span>
            </a>
            <button
              onClick={() => router.push('/contact')}
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-3.5 border font-medium text-[11px] sm:text-sm rounded-full transition-all duration-300 text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-[#4169E1] text-zinc-200 hover:text-white hover:scale-[1.02] whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#4169E1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Key Metrics / Stats Bar (3 columns) */}
          <div className="mt-12 sm:mt-16 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl bg-[#0E0E10] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center text-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#4169E1]">
                +94%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Higher Purchase Conversion
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Sub-2s
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Instant WebGL Load Speed
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#4169E1]">
                -35%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                E-Commerce Return Rate Reduction
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE 3D CONFIGURATOR & WHY US COMPARISON GRID */}
      {/* ======================================================== */}
      <section id="comparison" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Uncompromising Interactive Performance</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2] text-white">
            From CAD Engineering Asset to<br />
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent whitespace-nowrap inline-block">
              Real-Time Web Configurator
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Interact with our live WebGL automotive configurator below. Experience instant color switching, smooth orbit controls, and physically accurate PBR lighting calibrated for global brands.
          </p>
        </div>

        {/* Live Interactive Configurator Embed (Where video was on ArchViz) */}
        <CarConfiguratorViewer />

        {/* Comparison Grid: Traditional vs Elipse Studio */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-16">
          {/* Left: Traditional 2D Photography */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-white/10">
            <h3 className="text-lg font-semibold text-zinc-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional 2D Product Photography</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mb-5">
              Static image shoots that require costly physical samples for every single SKU and colorway.
            </p>
            <ul className="space-y-3">
              {[
                'Expensive studio rentals and photography for hundreds of color combinations',
                'Buyers cannot inspect fine details, internal parts, or back angles',
                'High return rates caused by unexpected color or finish variations',
                'Cannot launch pre-orders until physical prototypes are manufactured',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Elipse Studio Edge */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#4169E1]/10 to-[#0E0E10] border border-[#4169E1]/40 shadow-[0_10px_30px_rgba(65,105,225,0.1)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase font-mono bg-[#4169E1]/15 text-[#4169E1] mb-3">
              <span>⚡ The Elipse Studio Edge</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <span>Real-Time WebGL, Three.js &amp; Headless CPQ</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-5">
              One master 3D asset produces infinite real-time variants, dynamic pricing, and WebAR.
            </p>
            <ul className="space-y-3">
              {[
                'Instant material & color swapping in sub-100ms with zero server latency',
                'Native Shopify, WooCommerce, and headless e-commerce checkout integration',
                'WebAR Quick-Look allows buyers to visualize products at 1:1 scale in AR',
                'Launch interactive pre-sales and DTC customization before physical tooling',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                  <span className="text-[#4169E1] font-bold shrink-0">✓</span>
                  <span><strong className="text-white font-medium">{text.split(' in ')[0]}</strong> {text.includes(' in ') ? `in ${text.split(' in ')[1]}` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. RECENT CONFIGURATOR BUILDS (MAIN SHOWCASE GALLERY)    */}
      {/* ======================================================== */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black"
        id="configurator-gallery"
      >
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Selected 3D Product Configurator Portfolio
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 leading-relaxed font-light text-zinc-300">
            Explore live builds and WebGL configurators engineered by Elipse Studio across automotive, consumer products, luxury marine, and enterprise apparel.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 sm:mt-12">
          {CONFIGURATOR_BUILDS.map((item, idx) => (
            <div
              key={idx}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(65,105,225,0.18)] flex flex-col justify-between bg-[#0E0E10] border-white/10 hover:border-[#4169E1]/60"
            >
              {/* Image Preview Container (16:9 HD Size) */}
              <div className="relative aspect-video overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  width="1280"
                  height="720"
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium group-hover:text-[#4169E1] transition-colors duration-300 text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed font-light text-zinc-400">
                    {item.desc}
                  </p>
                </div>

                {/* Card Action Section & Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#4169E1] font-semibold">{item.tech}</span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {item.liveLink && (
                      <a
                        href={item.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>Launch 3D Tool</span>
                      </a>
                    )}

                    {item.reelLink && (
                      <a
                        href={item.reelLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                      >
                        <svg className="w-3.5 h-3.5 text-pink-500 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        <span>Watch Reel</span>
                      </a>
                    )}

                    {item.youtubeLink && (
                      <a
                        href={item.youtubeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                      >
                        <svg className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        <span>Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 2 CTAs Directly Below Portfolio Gallery */}
        <div className="mt-14 sm:mt-16 flex flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
          <button
            onClick={() => router.push('/contact')}
            className="px-6 sm:px-8 py-3.5 bg-[#4169E1] hover:bg-[#3158D4] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#4169E1]/25 hover:shadow-[#4169E1]/40 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            <span>Book a Free Consultation</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={() => window.open('https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting', '_blank')}
            className="px-6 sm:px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            <span>Schedule a 15-Min Technical Call</span>
            <svg className="w-4 h-4 text-[#4169E1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 4. CAPABILITIES (6-CARD STATIC GRID)                     */}
      {/* ======================================================== */}
      <section id="services" className="w-full py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="mb-12 text-center max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4169E1] mb-2">
            Comprehensive Configurator Capabilities
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Built for High-Ticket E-Commerce Brands, DTC &amp; Enterprise CPQ
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300">
            From consumer customization to complex industrial configurations, we engineer full-stack 3D shaders, real-time logic, and turnkey checkout integrations.
          </p>
        </div>

        {/* 6-Card Static Grid (3 Top, 3 Bottom) */}
        <CapabilitiesGrid />
      </section>

      {/* ======================================================== */}
      {/* 5. PRODUCTION PIPELINE SECTION                           */}
      {/* ======================================================== */}
      <section id="pipeline" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Methodical Execution</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.1] text-white">
            Our 3D Configurator Development Pipeline
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            From raw CAD optimization to real-time WebGL shader logic and e-commerce cart integration, our structured pipeline guarantees speed and visual fidelity.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'CAD & 3D Asset Optimization',
              desc: 'Converting STEP, Rhino, SolidWorks & OBJ files into lightweight polygon geometry with Draco and glTF compression for sub-second web delivery.',
            },
            {
              step: '02',
              title: 'PBR Shaders & Lighting',
              desc: 'Calibrating physically accurate roughness, metallic, normal, and sheen textures under custom studio HDR lighting rigs.',
            },
            {
              step: '03',
              title: 'Interactive Logic & CPQ Rules',
              desc: 'Programming real-time state trees, color/finish switchers, camera constraints, dynamic pricing, and compatibility logic engines.',
            },
            {
              step: '04',
              title: 'Storefront Deployment & AR',
              desc: 'Seamless integration with Shopify, WooCommerce, or headless APIs, cross-browser QA testing, and WebAR quick-look deployment.',
            },
          ].map((pipe, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-[#0E0E10] border border-white/10 hover:border-[#4169E1]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#4169E1]/40 group-hover:text-[#4169E1] transition-colors duration-300">
                  {pipe.step}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
                  {pipe.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {pipe.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 6. CLIENT REVIEWS & TESTIMONIALS                         */}
      {/* ======================================================== */}
      <div id="testimonials">
        <ClientReviews />
      </div>

      {/* ======================================================== */}
      {/* 7. CONTACT & SCOPE ESTIMATOR FORM                        */}
      {/* ======================================================== */}
      <div id="contact">
        <div id="scope-estimator">
          <Contact />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductConfiguratorsPage;
