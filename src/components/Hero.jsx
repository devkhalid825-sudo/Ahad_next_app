'use client';

import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import Header from './Header';
// Lazy load non-critical components to break the dependency tree
const VideoBg = lazy(() => import('./VideoBg'));
const CarouselIndicators = lazy(() => import('./CarouselIndicators'));

// Static public paths -> files are in /public/assets/ElipseImages/
const ASSETS = {
    videos: {
        volvo: '/assets/ElipseImages/videos/Volvo.webm',
        zarrar: '/assets/ElipseImages/videos/Zarrar_1.webm',
        khoj: '/assets/ElipseImages/videos/Khoj.webm',
        vfx: '/assets/ElipseImages/videos/Vfx.webm',
        jamSpread: '/assets/ElipseImages/videos/Jam & Spread 15 Sec.webm',
        gabani: '/assets/ElipseImages/videos/Gabani.webm',
        bombay: '/assets/ElipseImages/videos/Bombay 05 Sec.webm',
        inverex: '/assets/ElipseImages/videos/Inverex.webm',
        mobile: '/assets/ElipseImages/videos/mobile.webm'
    },

    images: {
        volvo: '/assets/ElipseImages/hero/volve-configrator.webp',
        zoo: '/assets/ElipseImages/projects/0.webp',
        hero1: '/assets/ElipseImages/hero/hero1.webp',
        boat: '/assets/ElipseImages/projects/Boat.webp',
        villas: '/assets/ElipseImages/projects/khoj-villas.webp',
        rendering: '/assets/ElipseImages/projects/3D-rendering.webp'
    }
};

// Stable public paths for LCP images — MUST match preload hints in index.html
// Stored in /public/assets/ to avoid Vite content-hashing and enable accurate preloading.
const firstSlidePosterMobile = '/assets/mobile-hero.webp';
const firstSlidePosterDesktop = '/assets/hero-khalid.webp';

const Hero = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.matchMedia("(max-width: 767px)").matches;
        }
        return false;
    });
    // Delay video loading until after first paint so poster image can be LCP
    const [canLoadVideo, setCanLoadVideo] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState({});

    useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 767px)");
        setIsMobile(mediaQuery.matches);
        const handleResize = (e) => setIsMobile(e.matches);
        mediaQuery.addEventListener('change', handleResize);
        return () => mediaQuery.removeEventListener('change', handleResize);
    }, []);

    // Enable video only after first paint — keeps poster as LCP candidate
    useEffect(() => {
        const enable = () => setCanLoadVideo(true);
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(enable, { timeout: 4000 });
        } else {
            setTimeout(enable, 500);
        }
    }, []);

    const desktopBackgrounds = useMemo(() => [
        ASSETS.videos.zarrar,
        ASSETS.videos.volvo,
        ASSETS.videos.khoj,
        ASSETS.videos.jamSpread,
        ASSETS.videos.vfx,
        ASSETS.videos.gabani,
        ASSETS.videos.bombay,
        ASSETS.videos.inverex
    ], []);

    const mobileBackgrounds = useMemo(() => [
        ASSETS.videos.mobile
    ], []);

    const backgrounds = isMobile ? mobileBackgrounds : desktopBackgrounds;

    const nextSlide = () => {
        if (backgrounds.length === 0) return;
        setActiveIndex((current) => (current + 1) % backgrounds.length);
    };

    useEffect(() => {
        if (backgrounds.length === 0) return;
        const currentBg = backgrounds[activeIndex];
        const isVideo = typeof currentBg === 'string' && (currentBg.toLowerCase().includes('.mp4') || currentBg.toLowerCase().includes('.webm'));

        if (!isVideo && backgrounds.length > 1) {
            const timeout = setTimeout(nextSlide, 8000);
            return () => clearTimeout(timeout);
        }
    }, [activeIndex, backgrounds.length]);

    return (
        <section className="relative w-full h-dvh bg-black max-md:px-[15px] max-md:py-[15px]">
            <div className="relative w-full h-full overflow-hidden bg-black shadow-2xl max-md:rounded-[24px]">

                <Header />

                {/* 
                       CRITICAL: Static LCP Image 
                       This renders instantly and syncs with the index.html shell.
                    */}

                {/* Background Mapping */}
                {backgrounds.map((bg, index) => {
                    const isVideo = typeof bg === 'string' && (bg.toLowerCase().includes('.mp4') || bg.toLowerCase().includes('.webm'));
                    const isActive = index === activeIndex;
                    const isNext = index === (activeIndex + 1) % backgrounds.length;
                    const isSlide0 = index === 0;

                    // Defer 'next' slide on mobile to save bandwidth for LCP
                    if (!isActive && (!isNext || isMobile)) return null;

                    const poster = bg === ASSETS.videos.volvo ? ASSETS.images.volvo : (isMobile ? firstSlidePosterMobile : firstSlidePosterDesktop);
                    const posterWidth = isMobile ? "1080" : "1920";
                    const posterHeight = isMobile ? "1350" : "1080";

                    return (
                        <div
                            key={index}
                            className={`absolute inset-0 ${index === 0 ? '' : 'transition-opacity duration-500 ease-in-out'} ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                            style={{ visibility: isActive ? 'visible' : 'hidden' }}
                        >
                            {isVideo ? (
                                <div className="relative w-full h-full">
                                    {isActive && (
                                        <img
                                            src={poster}
                                            alt="Hero Background"
                                            width={posterWidth}
                                            height={posterHeight}
                                            className={`absolute inset-0 w-full h-full object-cover z-20 transition-opacity duration-300 ease-in-out ${videoLoaded[index] ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                                            fetchPriority={isSlide0 ? "high" : "auto"}
                                            loading="eager"
                                            decoding={isSlide0 ? "sync" : "async"}
                                        />
                                    )}
                                    {canLoadVideo && (
                                        <Suspense fallback={null}>
                                            <VideoBg
                                                videoFile={bg}
                                                darken={false}
                                                overlay={false}
                                                className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-500 ease-in-out ${videoLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                                                videoPoster={poster}
                                                isActive={isActive}
                                                lazy={!isActive && !isNext}
                                                onEnded={nextSlide}
                                                onLoaded={() => setVideoLoaded(prev => ({ ...prev, [index]: true }))}
                                                loop={backgrounds.length === 1}
                                                preload={isActive || (isNext && !isMobile) ? "metadata" : "none"}
                                                fetchPriority={isActive ? "high" : "low"}
                                            />
                                        </Suspense>
                                    )}
                                </div>
                            ) : (
                                index === 0 ? (
                                    <img
                                        src={bg}
                                        alt={`Hero Slide ${index}`}
                                        className="absolute inset-0 w-full h-full object-cover z-0"
                                        fetchPriority="high"
                                        loading="eager"
                                        decoding="sync"
                                        width="1080"
                                        height="1920"
                                    />
                                ) : (
                                    <img
                                        src={bg}
                                        alt={`Hero Slide ${index}`}
                                        className="absolute inset-0 w-full h-full object-cover z-0 animate-hero-scale"
                                        fetchPriority={isActive ? "high" : "auto"}
                                        loading={isActive ? "eager" : "lazy"}
                                        decoding="async"
                                    />
                                )
                            )}
                        </div>
                    );
                })}

                {/* Removed dark overlay for maximum native clarity and brightness */}

                {backgrounds.length > 1 && (
                    <Suspense fallback={null}>
                        <CarouselIndicators
                            activeIndex={activeIndex}
                            total={backgrounds.length}
                            onSelect={setActiveIndex}
                        />
                    </Suspense>
                )}

                {/* Primary heading for Google — visually hidden, design untouched */}
                <h1 className="sr-only">Elipse Studio &mdash; 3D Visualization, AR/VR &amp; Web Configurator Agency</h1>
            </div>
        </section>
    );
};

export default Hero;
