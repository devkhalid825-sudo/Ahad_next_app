'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo, Suspense, lazy } from 'react';
import Header from '../layouts/Header';
import VideoBg from './VideoBg';
import { HERO_ASSETS } from '@/constants/assets';

const CarouselIndicators = lazy(() => import('../ui/CarouselIndicators'));

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

const MOBILE_BACKGROUNDS = [
  HERO_ASSETS.videos.love,
  HERO_ASSETS.videos.volvoReel,
  HERO_ASSETS.videos.mobile,
];

const Hero = () => {
  // Desktop Carousel State
  const [desktopIndex, setDesktopIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const desktopVideoRef = useRef(null);

  // Mobile Hero State
  const [mobileIndex, setMobileIndex] = useState(0);

  const totalDesktop = DESKTOP_SLIDES.length;
  const currentDesktopSlide = DESKTOP_SLIDES[desktopIndex];
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

  // Mobile Navigation
  const handleMobileNext = useCallback(() => {
    setMobileIndex((prev) => (prev + 1) % MOBILE_BACKGROUNDS.length);
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
      {/* 1. MOBILE HERO (Original Full-Screen Immersive Dark Layout for < md)       */}
      {/* ========================================================================= */}
      <section className="relative w-full h-dvh bg-black px-[15px] py-[15px] md:hidden">
        <div className="relative w-full h-full overflow-hidden bg-black shadow-2xl rounded-[24px]">
          <Header />

          {MOBILE_BACKGROUNDS.map((bg, index) => {
            const isActive = index === mobileIndex;
            const isNext = index === (mobileIndex + 1) % MOBILE_BACKGROUNDS.length;

            if (!isActive && !isNext) return null;

            return (
              <div
                key={index}
                className={`absolute inset-0 ${index === 0 ? '' : 'transition-opacity duration-500 ease-in-out'
                  } ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                style={{ visibility: isActive ? 'visible' : 'hidden' }}
              >
                <VideoBg
                  videoFile={bg}
                  darken={false}
                  overlay={false}
                  className="absolute inset-0 w-full h-full object-cover z-10"
                  videoPoster={firstSlidePosterMobile}
                  isActive={isActive}
                  lazy={!isActive && !isNext}
                  onEnded={handleMobileNext}
                  loop={MOBILE_BACKGROUNDS.length === 1}
                  preload={isActive ? 'auto' : isNext ? 'metadata' : 'none'}
                  fetchPriority={isActive ? 'high' : isNext ? 'auto' : 'low'}
                />
              </div>
            );
          })}

          {MOBILE_BACKGROUNDS.length > 1 && (
            <Suspense fallback={null}>
              <CarouselIndicators
                activeIndex={mobileIndex}
                total={MOBILE_BACKGROUNDS.length}
                onSelect={setMobileIndex}
              />
            </Suspense>
          )}

          <h1 className="sr-only">
            Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency
          </h1>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. DESKTOP HERO (Black Luxury Responsive Multi-Card Carousel for >= md)    */}
      {/* ========================================================================= */}
      <section
        data-nav="dark"
        className="hidden md:flex relative w-full min-h-screen bg-black text-white flex-col justify-between overflow-hidden pt-24 md:pt-28 pb-12 select-none"
      >
        {/* Header */}
        <Header />

        {/* Main Desktop Carousel Container */}
        <div className="flex-1 w-full max-w-[1780px] mx-auto flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 relative my-auto">
          <div className="relative w-full flex items-center justify-center">
            {/* Left Arrow Navigation Button (Clean Chevron with Balanced Gap from Video) */}
            <button
              onClick={handleDesktopPrev}
              aria-label="Previous Slide"
              className="absolute left-3 sm:left-6 lg:left-10 xl:left-12 z-30 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
            >
              <svg
                className="w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 stroke-current stroke-[3]"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Right Arrow Navigation Button (Clean Chevron with Balanced Gap from Video) */}
            <button
              onClick={handleDesktopNext}
              aria-label="Next Slide"
              className="absolute right-3 sm:right-6 lg:right-10 xl:right-12 z-30 p-2 text-white/80 hover:text-white transition-all duration-300 hover:scale-125 active:scale-95 cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]"
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
              {/* Left Peeking Card */}
              <div
                onClick={handleDesktopPrev}
                className="absolute left-[-1%] xl:left-[1%] w-[18vw] max-w-[280px] h-[85%] max-h-[720px] bg-neutral-900 rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden opacity-40 hover:opacity-75 transition-all duration-500 cursor-pointer shadow-2xl border border-white/15 scale-90 pointer-events-auto"
              >
                <video
                  key={`prev-${prevDesktopSlide.video}`}
                  src={prevDesktopSlide.video}
                  className="w-full h-full object-cover filter brightness-75 pointer-events-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>

              {/* Active Large Center Card (Exact 16:9 Aspect Ratio - No Video Cut) */}
              <div className="relative w-[88vw] md:w-[82vw] lg:w-[78vw] xl:w-[76vw] 2xl:w-[74vw] max-w-[1400px] 2xl:max-w-[1550px] aspect-video max-h-[75vh] 2xl:max-h-[80vh] bg-black rounded-[16px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden shadow-[0_0_45px_rgba(255,255,255,0.12),0_30px_90px_rgba(0,0,0,0.9)] border border-white/30 z-20 flex flex-col justify-end transition-all duration-500">
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

              {/* Right Peeking Card */}
              <div
                onClick={handleDesktopNext}
                className="absolute right-[-1%] xl:right-[1%] w-[18vw] max-w-[280px] h-[85%] max-h-[720px] bg-neutral-900 rounded-[14px] sm:rounded-[18px] lg:rounded-[22px] overflow-hidden opacity-40 hover:opacity-75 transition-all duration-500 cursor-pointer shadow-2xl border border-white/15 scale-90 pointer-events-auto"
              >
                <video
                  key={`next-${nextDesktopSlide.video}`}
                  src={nextDesktopSlide.video}
                  className="w-full h-full object-cover filter brightness-75 pointer-events-none"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
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
