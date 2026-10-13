'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Header from '../layouts/Header';
import { HERO_ASSETS } from '@/constants/assets';
import { useTheme } from '@/components/providers/ThemeProvider';

const firstSlidePosterMobile = HERO_ASSETS.images.mobilePoster;
const firstSlidePosterDesktop = HERO_ASSETS.images.desktopPoster;

const DESKTOP_SLIDES = [
  {
    id: 'vr',
    title: 'Spatial computing & real-time digital twins.',
    badge: 'Spatial VR',
    video: HERO_ASSETS.videos.vr,
    poster: '/assets/ElipseImages/projects/VR1.webp',
  },
  {
    id: 'volvo',
    title: 'Luxury celebrates success.',
    badge: 'Automotive CGI',
    video: HERO_ASSETS.videos.volvo,
  },
  {
    id: 'jamSpread',
    title: 'Cinematic 3D commercial animation.',
    badge: 'Commercial CGI',
    video: HERO_ASSETS.videos.jamSpread,
  },
  {
    id: 'khoj',
    title: 'Architectural visualization beyond photorealism.',
    badge: 'Architecture',
    video: HERO_ASSETS.videos.khoj,
  },
  {
    id: 'zarrar',
    title: 'Production-grade VFX & cinematic storytelling.',
    badge: 'VFX & Film',
    video: HERO_ASSETS.videos.zarrar,
  },
  {
    id: 'gabani',
    title: 'Precision 3D craftsmanship for iconic brands.',
    badge: '3D Luxury',
    video: HERO_ASSETS.videos.gabani,
  },
  {
    id: 'virtualTour',
    title: 'Interactive 360° virtual property experiences.',
    badge: 'Virtual Tour',
    video: HERO_ASSETS.videos.virtualTour,
  },
];

// Mobile slides exclude Gabani Emerald as requested
const MOBILE_SLIDES = DESKTOP_SLIDES.filter((s) => s.id !== 'gabani');

const Hero = () => {
  const { isLight } = useTheme();

  // Desktop Carousel State
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const desktopVideoRef = useRef(null);

  // Mobile Hero State
  const [mobileIndex, setMobileIndex] = useState(0);
  const mobileVideoRef = useRef(null);

  const totalDesktop = DESKTOP_SLIDES.length;
  const currentDesktopSlide = DESKTOP_SLIDES[desktopIndex];
  const currentMobileSlide = MOBILE_SLIDES[mobileIndex % MOBILE_SLIDES.length];
  const prevDesktopIndex = (desktopIndex - 1 + totalDesktop) % totalDesktop;
  const nextDesktopIndex = (desktopIndex + 1) % totalDesktop;
  const prevDesktopSlide = DESKTOP_SLIDES[prevDesktopIndex];
  const nextDesktopSlide = DESKTOP_SLIDES[nextDesktopIndex];

  // Desktop Navigation
  const handleDesktopNext = useCallback(() => {
    setDesktopIndex((prev) => (prev + 1) % totalDesktop);
  }, [totalDesktop]);

  const handleDesktopPrev = useCallback(() => {
    setDesktopIndex((prev) => (prev - 1 + totalDesktop) % totalDesktop);
  }, [totalDesktop]);

  // Mobile Navigation (Cycles through MOBILE_SLIDES)
  const handleMobileNext = useCallback(() => {
    setMobileIndex((prev) => (prev + 1) % MOBILE_SLIDES.length);
  }, []);

  // Keyboard navigation for desktop
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handleDesktopPrev();
      if (e.key === 'ArrowRight') handleDesktopNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDesktopNext, handleDesktopPrev]);

  // Handle Desktop video playback
  useEffect(() => {
    const video = desktopVideoRef.current;
    if (!video) return;

    video.currentTime = 0;
    video.muted = isMuted;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => { });
      });
    }
  }, [desktopIndex, isMuted]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE HERO (Header at Top, Video Below Header)                        */}
      {/* ========================================================================= */}
      <section id="hero-mobile" className={`relative w-full overflow-hidden md:hidden transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-black'} pt-[60px] sm:pt-[68px]`}>
        {/* Header Fixed at Top on Mobile */}
        <Header />

        {/* Edge-to-Edge Video Container (Strict 16:9 - No Side Cropping) */}
        <div className="relative w-full aspect-video overflow-hidden bg-black">
          {/* Active Mobile Video (Uses Desktop Slides) */}
          <video
            ref={mobileVideoRef}
            key={currentMobileSlide.video}
            src={currentMobileSlide.video}
            poster={mobileIndex === 0 ? (currentMobileSlide.poster || firstSlidePosterDesktop) : undefined}
            autoPlay
            playsInline
            webkit-playsinline="true"
            muted
            loop={MOBILE_SLIDES.length === 1}
            onEnded={handleMobileNext}
            className="w-full h-full object-contain"
          />
        </div>

        <h1 className="sr-only">
          Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency
        </h1>
      </section>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HERO (Black Luxury Responsive Multi-Card Carousel for >= md)    */}
      {/* ========================================================================= */}
      <section
        id="hero"
        data-nav="dark"
        className="desktop-hero-section hidden md:flex relative w-full min-h-screen bg-black text-white flex-col justify-between overflow-hidden pt-20 md:pt-24 2xl:pt-20 pb-4 md:pb-6 2xl:pb-4 select-none"
      >
        {/* Header */}
        <Header />

        {/* Main Desktop Carousel Container */}
        <div className="flex-1 w-full max-w-[2560px] mx-auto flex flex-col justify-center items-center px-2 sm:px-4 lg:px-6 relative my-auto">
          {/* Responsive center card width:
              - Below 2xl (choti screen / laptops): 76vw to ensure navigation arrows never overlap video edges
              - 2xl and above (bari screen, 2560x1279): 88vw (up to 2260px) for immersive big-screen presentation */}
          <style>{`
            .desktop-hero-center-card {
              width: min(76vw, calc((100dvh - 160px) * 16 / 9), 1360px);
              aspect-ratio: 16 / 9;
            }
            @media (min-width: 1536px) {
              .desktop-hero-center-card {
                width: min(88vw, calc((100dvh - 100px) * 16 / 9), 2260px);
              }
            }
          `}</style>

          <div className="relative w-full flex items-center justify-center">
            {/* Left Navigation Arrow (Clean Minimal Chevron without Circle) */}
            <button
              onClick={handleDesktopPrev}
              aria-label="Previous Slide"
              className="desktop-hero-arrow absolute left-1 sm:left-2 lg:left-3 xl:left-5 2xl:left-8 top-1/2 -translate-y-1/2 z-40 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 stroke-current stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Navigation Arrow (Clean Minimal Chevron without Circle) */}
            <button
              onClick={handleDesktopNext}
              aria-label="Next Slide"
              className="desktop-hero-arrow absolute right-1 sm:right-2 lg:right-3 xl:right-5 2xl:right-8 top-1/2 -translate-y-1/2 z-40 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 stroke-current stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* 3D Multi-Card Stage */}
            <div className="relative w-full flex items-center justify-center overflow-visible">
              {/* Left Peeking Card (Soft Subtle Blur & Gentle Gradient) */}
              <div
                onClick={handleDesktopPrev}
                className="desktop-hero-side-card absolute left-[-2%] xl:left-[0%] 2xl:left-[0.5%] h-[90%] max-h-[760px] 2xl:max-h-[960px] aspect-[9/16] max-w-[260px] 2xl:max-w-[320px] bg-black rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden opacity-65 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-2xl border border-white/20 pointer-events-auto group"
              >
                <video
                  key={`prev-${prevDesktopSlide.video}`}
                  src={prevDesktopSlide.video}
                  className="w-full h-full object-cover pointer-events-none filter blur-[1.5px] scale-105 brightness-90 transition-transform duration-500 group-hover:scale-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Soft Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />
              </div>

              {/* Active Large Center Card (Responsive Proportion - No Arrow Collision on Small Screens) */}
              <div
                className="desktop-hero-center-card relative bg-black rounded-[18px] sm:rounded-[22px] lg:rounded-[26px] overflow-hidden shadow-[0_0_55px_rgba(255,255,255,0.12),0_30px_90px_rgba(0,0,0,0.9)] border border-white/30 z-20 flex flex-col justify-end transition-all duration-500 shrink-0"
              >
                {/* Active Video Player */}
                <video
                  ref={desktopVideoRef}
                  key={currentDesktopSlide.video}
                  src={currentDesktopSlide.video}
                  poster={desktopIndex === 0 ? currentDesktopSlide.poster : undefined}
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted={isMuted}
                  loop={false}
                  onEnded={handleDesktopNext}
                />
              </div>

              {/* Right Peeking Card (Soft Subtle Blur & Gentle Gradient) */}
              <div
                onClick={handleDesktopNext}
                className="desktop-hero-side-card absolute right-[-2%] xl:right-[0%] 2xl:right-[0.5%] h-[90%] max-h-[760px] 2xl:max-h-[960px] aspect-[9/16] max-w-[260px] 2xl:max-w-[320px] bg-black rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden opacity-65 hover:opacity-95 transition-all duration-300 cursor-pointer shadow-2xl border border-white/20 pointer-events-auto group"
              >
                <video
                  key={`next-${nextDesktopSlide.video}`}
                  src={nextDesktopSlide.video}
                  className="w-full h-full object-cover pointer-events-none filter blur-[1.5px] scale-105 brightness-90 transition-transform duration-500 group-hover:scale-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Soft Light Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/50 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <h1 className="sr-only">
          Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency
        </h1>
      </section>
    </>
  );
};


export default Hero;
