'use client';

import React, { useState, useEffect, useMemo, useSyncExternalStore, Suspense, lazy } from 'react';
import Header from '../layouts/Header';
import { HERO_ASSETS } from '@/constants/assets';

const VideoBg = lazy(() => import('./VideoBg'));
const CarouselIndicators = lazy(() => import('../ui/CarouselIndicators'));

const firstSlidePosterMobile = HERO_ASSETS.images.mobilePoster;
const firstSlidePosterDesktop = HERO_ASSETS.images.desktopPoster;

function subscribeToMobileQuery(callback) {
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}
const getIsMobileSnapshot = () => window.matchMedia('(max-width: 767px)').matches;
// null = unknown (SSR / pre-hydration). Avoids fetching wrong video type before
// the browser resolves the media query. Renders poster-only until determined.
const getIsMobileServerSnapshot = () => null;

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useSyncExternalStore(subscribeToMobileQuery, getIsMobileSnapshot, getIsMobileServerSnapshot);

  const desktopBackgrounds = useMemo(
    () => [
      HERO_ASSETS.videos.zarrar,
      HERO_ASSETS.videos.volvo,
      HERO_ASSETS.videos.khoj,
      HERO_ASSETS.videos.jamSpread,
      HERO_ASSETS.videos.vfx,
      HERO_ASSETS.videos.gabani,
      HERO_ASSETS.videos.bombay,
      HERO_ASSETS.videos.inverex,
    ],
    []
  );

  const mobileBackgrounds = useMemo(() => [HERO_ASSETS.videos.mobile], []);

  const backgrounds = isMobile ? mobileBackgrounds : desktopBackgrounds;

  const nextSlide = () => {
    if (backgrounds.length === 0) return;
    setActiveIndex((current) => (current + 1) % backgrounds.length);
  };

  useEffect(() => {
    if (backgrounds.length === 0) return;
    const currentBg = backgrounds[activeIndex];
    const isVideo =
      typeof currentBg === 'string' &&
      (currentBg.toLowerCase().includes('.mp4') || currentBg.toLowerCase().includes('.webm'));

    if (!isVideo && backgrounds.length > 1) {
      const timeout = setTimeout(nextSlide, 8000);
      return () => clearTimeout(timeout);
    }
  }, [activeIndex, backgrounds.length]);

  // While isMobile is null (SSR / first paint), show poster only — no video request.
  // <picture>/<source media> lets the browser pick the right poster at parse time,
  // before JS/matchMedia resolves, so mobile never flashes the desktop poster.
  if (isMobile === null) {
    return (
      <section className="relative w-full h-dvh bg-black max-md:px-[15px] max-md:py-[15px]">
        <div className="relative w-full h-full overflow-hidden bg-black shadow-2xl max-md:rounded-[24px]">
          <Header />
          <picture>
            <source media="(max-width: 767px)" srcSet={firstSlidePosterMobile} />
            <img
              src={firstSlidePosterDesktop}
              alt="Hero Background"
              width="1920"
              height="1080"
              fetchPriority="high"
              loading="eager"
              decoding="sync"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </picture>
          <h1 className="sr-only">
            Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full h-dvh bg-black max-md:px-[15px] max-md:py-[15px]">
      <div className="relative w-full h-full overflow-hidden bg-black shadow-2xl max-md:rounded-[24px]">
        <Header />

        {backgrounds.map((bg, index) => {
          const isVideo =
            typeof bg === 'string' &&
            (bg.toLowerCase().includes('.mp4') || bg.toLowerCase().includes('.webm'));
          const isActive = index === activeIndex;
          const isNext = index === (activeIndex + 1) % backgrounds.length;
          const isSlide0 = index === 0;

          if (!isActive && (!isNext || isMobile)) return null;

          const poster =
            bg === HERO_ASSETS.videos.volvo
              ? HERO_ASSETS.images.volvo
              : isMobile
                ? firstSlidePosterMobile
                : firstSlidePosterDesktop;
          const posterWidth = isMobile ? '1080' : '1920';
          const posterHeight = isMobile ? '1350' : '1080';

          return (
            <div
              key={index}
              className={`absolute inset-0 ${index === 0 ? '' : 'transition-opacity duration-500 ease-in-out'
                } ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
              style={{ visibility: isActive ? 'visible' : 'hidden' }}
            >
              {isVideo ? (
                <Suspense
                  fallback={
                    <img
                      src={poster}
                      alt="Hero Background"
                      width={posterWidth}
                      height={posterHeight}
                      className="absolute inset-0 w-full h-full object-cover"
                      fetchPriority={isSlide0 ? 'high' : 'auto'}
                      loading="eager"
                      decoding={isSlide0 ? 'sync' : 'async'}
                    />
                  }
                >
                  <VideoBg
                    videoFile={bg}
                    darken={false}
                    overlay={false}
                    className="absolute inset-0 w-full h-full object-cover z-10"
                    videoPoster={poster}
                    isActive={isActive}
                    lazy={!isActive && !isNext}
                    onEnded={nextSlide}
                    loop={backgrounds.length === 1}
                    preload={isActive ? 'metadata' : 'none'}
                    fetchPriority={isActive ? 'high' : 'low'}
                  />
                </Suspense>
              ) : (
                <img
                  src={bg}
                  alt={`Hero Slide ${index}`}
                  className="absolute inset-0 w-full h-full object-cover z-0"
                  fetchPriority={isSlide0 ? 'high' : 'auto'}
                  loading="eager"
                  decoding={isSlide0 ? 'sync' : 'async'}
                  width={posterWidth}
                  height={posterHeight}
                />
              )}
            </div>
          );
        })}

        {backgrounds.length > 1 && (
          <Suspense fallback={null}>
            <CarouselIndicators
              activeIndex={activeIndex}
              total={backgrounds.length}
              onSelect={setActiveIndex}
            />
          </Suspense>
        )}

        <h1 className="sr-only">
          Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency
        </h1>
      </div>
    </section>
  );
};

export default Hero;
