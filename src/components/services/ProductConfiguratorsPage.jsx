'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';
import ClientReviews from '../features/ClientReviews';
import SocialMediaSection from '../features/SocialMediaSection';
import { getImgSrc } from '../../utils/api';

// Project images
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

// Configurator Gallery Builds (Direct from Latest Work Configurator Section)
const CONFIGURATOR_BUILDS = [
  {
    title: 'BMW Steering Wheel Configurator',
    category: 'Automotive WebGL',
    desc: 'Real-time 3D browser customization for stickers, colors, and carbon textures powered by PlayCanvas.',
    image: steeringImg,
    tech: 'PlayCanvas · WebGL',
    link: '/portfolio',
    liveLink: 'https://steering-configurator.netlify.app/',
    reelLink: 'https://youtube.com/shorts/Rm2SXb_reVI?si=cNPmF7I7lDLglhNb',
  },
  {
    title: 'Volvo Vehicle Walkthrough',
    category: 'Vehicle Configurator',
    desc: 'Interactive 3D exterior and interior configurator with photoreal material switching and camera presets.',
    image: volvoImg,
    tech: 'Unreal Engine · WebGL',
    link: '/portfolio',
    reelLink: 'https://youtu.be/rO1sg3y3TF0?si=9yv7WSm0m5AwqG0p',
  },
  {
    title: 'Costa Golf Cart Configurator',
    category: 'Electric Vehicle 3D',
    desc: 'Real-time 3D golf cart customization with live color switching, accessories, and instant interactive preview.',
    image: inverexImg,
    tech: 'PlayCanvas · WebGL',
    link: '/portfolio',
    liveLink: 'https://costa-carts.netlify.app/',
  },
  {
    title: 'Kia Sportage 3D Configurator',
    category: 'Automotive WebGL',
    desc: 'Interactive 3D vehicle configurator with day/night environment switching, exterior paints, and interior trims.',
    image: kiaImg,
    tech: 'Unreal Engine · WebGL',
    link: '/portfolio',
    liveLink: 'https://legacy.elipsestudio.com/Kia/',
  },
  {
    title: 'BYD Shark 6 Configurator',
    category: 'Vehicle Customizer',
    desc: 'Interactive multi-angle vehicle builder with dynamic accessory packs, bullbars, colors, and live pricing.',
    image: sharkImg,
    tech: 'PlayCanvas · WebGL',
    link: '/portfolio',
    liveLink: 'https://legacy.elipsestudio.com/Zeus-Configurator/',
  },
  {
    title: 'Inverex E-Bike Configurator',
    category: 'Motorcycle & EV 3D',
    desc: 'Real-time 3D electric motorcycle configurator with dynamic color switching, accessories, and studio lighting.',
    image: inverxImg,
    tech: 'PlayCanvas · WebGL',
    link: '/portfolio',
    liveLink: 'https://legacy.elipsestudio.com/Bike-Configurator/',
  },
  {
    title: 'Automotive Seat Customizer',
    category: 'Material & Trim 3D',
    desc: 'Browser-based 3D automotive seating customizer delivering photoreal textures, stitching, and ergonomic views.',
    image: seatImg,
    tech: 'PlayCanvas · WebGL',
    link: '/portfolio',
    liveLink: 'https://seat-cover-configurator.inknalgorithm.com/',
  },
  {
    title: 'Pursuit 288 Yacht Configurator',
    category: 'Luxury Marine 3D',
    desc: 'High-fidelity real-time marine vessel customizer with custom wraps, deck materials, and interactive 3D navigation.',
    image: marineImg,
    tech: 'Unreal 5 · WebGL',
    link: '/portfolio',
    liveLink: 'https://legacy.elipsestudio.com/Yacht_Configurator/',
    reelLink: 'https://youtube.com/shorts/YD_TWiIeL5U?si=aXBtfAFGUwsoPVzS',
  },
  {
    title: 'Custom T-Shirt 3D Configurator',
    category: 'Apparel & Fashion 3D',
    desc: 'Interactive 3D garment customization with real-time print placement, fabric textures, colorways, and instant preview.',
    image: tshirtImg,
    tech: 'WebGL · Three.js',
    link: '/portfolio',
    liveLink: 'https://legacy.elipsestudio.com/T-Shirt/',
  },
];

// PlayCanvas Golf Cart Live Configurator
const GOLF_CART_SRC = 'https://playcanv.as/e/p/JOJu0DAt/';

const GOLF_CART_COLORS = [
  { id: 'glossWhitePaint', name: 'Gloss White', hex: '#FFFFFF' },
  { id: 'blackDiamondPaint', name: 'Black Diamond', hex: '#111113' },
  { id: 'glossRedPaint', name: 'Gloss Red', hex: '#cc0000' },
  { id: 'glossTealPaint', name: 'Gloss Teal', hex: '#008080' },
];

/**
 * Interactive Live PlayCanvas Golf Cart Configurator Component
 */
const GolfCartConfiguratorViewer = ({ isDark = true }) => {
  const [activeColor, setActiveColor] = useState(GOLF_CART_COLORS[0].id);
  const [isLoaded, setIsLoaded] = useState(false);
  const frameRef = useRef(null);

  const sendColor = (colorId) => {
    setActiveColor(colorId);
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    try {
      // Send raw colorId string and structured message for full compatibility
      frame.contentWindow.postMessage(colorId, '*');
      frame.contentWindow.postMessage({ type: 'CHANGE_COLOR', color: colorId, buttonId: colorId }, '*');
    } catch (e) {
      console.error('Error posting message to PlayCanvas:', e);
    }
  };

  const handleIframeLoad = () => {
    setIsLoaded(true);
    // Send initial color with small delay to let PlayCanvas scripts initialize
    setTimeout(() => {
      sendColor(activeColor);
    }, 600);
  };

  return (
    <div
      className="relative w-full h-[250px] xs:h-[280px] sm:h-[380px] md:h-[460px] lg:h-[calc(100vh-170px)] lg:max-h-[560px] rounded-2xl sm:rounded-3xl overflow-hidden group transition-all duration-500 bg-[#0E0E10] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
    >
      {/* Loading Spinner */}
      {!isLoaded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2.5 sm:gap-3 bg-[#0E0E10]">
          <div className="w-7 h-7 sm:w-10 sm:h-10 border-2 border-[#4169E1]/20 border-t-[#4169E1] rounded-full animate-spin" />
          <p className="text-[9px] sm:text-xs font-medium tracking-wide uppercase text-zinc-400">
            Initializing 3D Engine...
          </p>
        </div>
      )}

      {/* PlayCanvas iframe Viewport */}
      <iframe
        ref={frameRef}
        src={GOLF_CART_SRC}
        title="Golf Cart 3D Configurator"
        loading="eager"
        allow="fullscreen; xr-spatial-tracking"
        onLoad={handleIframeLoad}
        className="w-full h-full border-0 relative z-0 bg-transparent"
      />

      {/* Centered Floating Luxury Color Dock */}
      <div className="absolute bottom-2.5 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 pointer-events-auto max-w-[95%] sm:max-w-[92%]">
        <div className="flex items-center gap-1.5 sm:gap-3.5 bg-black/85 backdrop-blur-2xl px-2.5 py-1 sm:px-5 sm:py-2.5 rounded-full border border-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-1 sm:gap-2 pr-1.5 sm:pr-3 border-r border-white/15">
            <span className="w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide text-white whitespace-nowrap">
              {GOLF_CART_COLORS.find((c) => c.id === activeColor)?.name || 'Gloss White'}
            </span>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {GOLF_CART_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => sendColor(c.id)}
                title={c.name}
                className={`w-5 h-5 sm:w-8 sm:h-8 rounded-full transition-all duration-300 relative flex items-center justify-center cursor-pointer ${activeColor === c.id
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
    </div>
  );
};

const ProductConfiguratorsPage = () => {
  const router = useRouter();
  const [theme, setTheme] = useState('dark');

  const isDark = theme === 'dark';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <Header />

      {/* ======================================================== */}
      {/* 1. HERO SECTION (100VH FIRST FOLD: FULL WIDTH)          */}
      {/* ======================================================== */}
      <section
        className="relative min-h-[100svh] lg:h-[100svh] pt-[72px] sm:pt-[95px] md:pt-[105px] pb-6 sm:pb-8 px-3.5 sm:px-6 md:px-8 border-b border-white/10 bg-black flex flex-col justify-center overflow-hidden"
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-10 xl:gap-14 items-center my-auto">
          {/* Left Column: Large Heading, Subtitle, CTAs & Stats */}
          <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:items-start lg:text-left">
            <h1
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[54px] font-semibold tracking-tight leading-[1.2] text-white"
            >
              Real-time 3D that sells,<br className="hidden xs:inline" />
              {' '}before your buyer clicks a thing.
            </h1>

            <p
              className="mt-2.5 sm:mt-5 text-xs sm:text-base md:text-lg leading-relaxed max-w-xl font-light text-zinc-300 mx-auto lg:mx-0"
            >
              We build custom 3D WebGL and Unreal-driven configurators for automotive, luxury DTC, and enterprise eCommerce brands — orbit, recolor, swap parts, and checkout directly on the product page.
            </p>

            {/* Mobile-optimized Buttons */}
            <div className="mt-4 sm:mt-7 flex flex-row items-center justify-center lg:justify-start gap-2 sm:gap-4 w-full sm:w-auto max-w-md lg:max-w-none">
              <button
                onClick={() => router.push('/contact')}
                className="flex-1 sm:flex-initial px-3 sm:px-8 py-2.5 sm:py-3.5 bg-[#4169E1] hover:bg-[#3158D4] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap"
              >
                Schedule a 15-Min Call
              </button>
              <a
                href="#configurator-gallery"
                className="flex-1 sm:flex-initial px-3 sm:px-8 py-2.5 sm:py-3.5 border font-medium text-xs sm:text-sm rounded-full transition-all duration-300 text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-zinc-200 whitespace-nowrap"
              >
                See Live Builds ↓
              </a>
            </div>

            {/* Stats row */}
            <div
              className="mt-4 sm:mt-8 pt-3.5 sm:pt-6 border-t border-white/10 grid grid-cols-3 gap-2 sm:gap-8 w-full max-w-xl mx-auto lg:mx-0 text-center"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-lg sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  Sub-2s
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-0.5 sm:mt-1 text-zinc-400">
                  Load Speed
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-white/10 pl-2 sm:pl-8">
                <span className="text-lg sm:text-3xl lg:text-4xl font-semibold tracking-tight text-white">
                  +40%
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-0.5 sm:mt-1 text-zinc-400">
                  Conversion Lift
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-l border-white/10 pl-2 sm:pl-8">
                <span className="text-lg sm:text-3xl lg:text-4xl font-semibold text-[#4169E1] tracking-tight">
                  Shopify
                </span>
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-0.5 sm:mt-1 text-zinc-400">
                  &amp; Headless
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Live Golf Cart 3D Configurator */}
          <div className="lg:col-span-6 w-full flex items-center justify-center">
            <GolfCartConfiguratorViewer isDark={true} />
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. RECENT CONFIGURATOR BUILDS (MAIN SHOWCASE GALLERY)   */}
      {/* ======================================================== */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black"
        id="configurator-gallery"
      >
        <div className="mb-8 sm:mb-12 text-center sm:text-left max-w-3xl mx-auto sm:mx-0">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Featured 3D Configurator Builds
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 leading-relaxed font-light text-zinc-300">
            Explore our real-time WebGL, PlayCanvas, and Unreal Engine interactive product configurators built for automotive, luxury, and enterprise brands.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {CONFIGURATOR_BUILDS.map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(65,105,225,0.18)] flex flex-col justify-between bg-[#0E0E10] border-white/10 hover:border-[#4169E1]/60"
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

              {/* Text Card Content */}
              <div className="p-6 text-left flex-1 flex flex-col justify-between">
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

                  <div className="flex items-center gap-2.5">
                    {item.liveLink && (
                      <a
                        href={item.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                        <span>View Live</span>
                      </a>
                    )}

                    {item.reelLink && (
                      <a
                        href={item.reelLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                      >
                        <svg className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                        </svg>
                        <span>Watch Reel</span>
                      </a>
                    )}

                    {!item.liveLink && !item.reelLink && (
                      <button
                        onClick={() => router.push(item.link || '/contact')}
                        className="w-full flex items-center justify-between py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:border-[#4169E1] cursor-pointer bg-white/5 hover:bg-white/10 border-white/10 text-zinc-300 hover:text-white"
                      >
                        <span>Explore Project</span>
                        <span>→</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. THREE CORE PILLARS HEADER & 2 CTAS                   */}
      {/* ======================================================== */}
      <div className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4169E1] mb-2">
            Core Disciplines
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Three things we&apos;re genuinely the best at.
          </h2>
          <p className="text-base sm:text-lg mt-4 leading-relaxed font-light max-w-2xl text-zinc-300">
            Not sixteen. We turned down the generalist menu on purpose — every project below sits inside one of these three enterprise disciplines.
          </p>

          {/* 2 CTAs */}
          <div className="mt-8 flex flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto">
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
              onClick={() => router.push('/contact')}
              className="px-6 sm:px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
            >
              <span>Schedule a 15-Min Technical Call</span>
              <svg className="w-4 h-4 text-[#4169E1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>


      <ClientReviews />


      <SocialMediaSection />


      <div id="contact">
        <Contact />
      </div>

      <Footer />
    </div>
  );
};

export default ProductConfiguratorsPage;
