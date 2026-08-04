'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { apiCall } from '../utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const getYouTubeEmbedUrl = (url, muted = true) => {
    if (!url) return null;
    const muteParam = muted ? '1' : '0';
    if (url.includes('youtube.com/embed/')) return url.includes('?') ? `${url}&autoplay=1&mute=${muteParam}&enablejsapi=1` : `${url}?autoplay=1&mute=${muteParam}&enablejsapi=1`;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
    if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=${muteParam}&enablejsapi=1`;
    return null;
};

const staticReviews = [
    { id: 1, video: "https://www.youtube.com/shorts/dkL3Ouz-0Vo", clientName: "Tim Barth", company: "Virtual Immo", projectName: "Interactive Virtual Tour", projectLink: "", quote: "The virtual tour exceeded our expectations — engagement doubled within the first month." },
    { id: 2, video: "https://www.youtube.com/shorts/dkL3Ouz-0Vo", clientName: "Hyper", company: "Hyper Co.", projectName: "3D Art & Animations", projectLink: "", quote: "Elipse delivered stunning 3D visuals that brought our brand story to life." },
    { id: 3, video: "https://www.youtube.com/shorts/dkL3Ouz-0Vo", clientName: "Aviv", company: "Aviv Design", projectName: "Web configurator integration", projectLink: "", quote: "Our clients love the interactive configurator — it has streamlined the entire selection process." },
    { id: 4, video: "https://www.youtube.com/shorts/dkL3Ouz-0Vo", clientName: "Ahmed", company: "Ahmed Food", projectName: "Social commercial campaign", projectLink: "", quote: "The campaign visuals were cinematic quality. Our social engagement saw a real boost." },
    { id: 5, video: "https://www.youtube.com/shorts/dkL3Ouz-0Vo", clientName: "Abel Cm Marketing", company: "CM Marketing", projectName: "Brand Video Assets", projectLink: "", quote: "Professional, creative, and on time — exactly what we needed for our brand launch." },
];

const mapReviews = (data) => data.map(r => ({
    id: r.id,
    video: r.video,
    clientName: r.clientName,
    company: r.company || '',
    projectName: r.projectName || '',
    projectLink: r.projectLink || '',
}));

const ClientReviews = ({ initialReviews = null }) => {
    const [reviews, setReviews] = useState(initialReviews ? mapReviews(initialReviews) : []);
    // Default: all muted = true (required for autoplay to work)
    const [mutedStates, setMutedStates] = useState({});
    const mobileSwiperRef = useRef(null);
    const playerRefs = useRef({});
    const sectionRef = useRef(null);

    const getPlayerRef = useCallback((id) => {
        if (!playerRefs.current[id]) {
            playerRefs.current[id] = React.createRef();
        }
        return playerRefs.current[id];
    }, []);

    // isMuted: default true (muted) unless explicitly set to false
    const getIsMuted = useCallback((id) => {
        return mutedStates[id] !== false;
    }, [mutedStates]);

    const toggleMute = useCallback((id, isYouTube) => {
        setMutedStates(prev => {
            const currentMuted = prev[id] !== false; // default true
            const newMuted = !currentMuted;
            if (isYouTube) {
                const el = document.querySelector(`[data-review-id="${id}"]`);
                if (el && el.contentWindow) {
                    el.contentWindow.postMessage(JSON.stringify({
                        event: 'command',
                        func: newMuted ? 'mute' : 'unMute',
                        args: []
                    }), '*');
                }
            } else {
                const ref = playerRefs.current[id];
                if (ref && ref.current) {
                    ref.current.muted = newMuted;
                }
            }
            return { ...prev, [id]: newMuted };
        });
    }, []);

    const handleVideoEnded = () => {
        if (mobileSwiperRef.current) {
            mobileSwiperRef.current.slideNext();
        }
    };

    useEffect(() => {
        const handler = (e) => {
            if (e.data && e.data.event === 'onStateChange' && e.data.info === 0) {
                handleVideoEnded();
            }
        };
        window.addEventListener('message', handler);
        return () => window.removeEventListener('message', handler);
    }, []);

    // Auto-mute all mobile iframes when section scrolls out of view (mobile only)
    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                // When less than 20% of section is visible, mute everything
                if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
                    // Mute all mobile YouTube iframes via postMessage
                    const iframes = section.querySelectorAll('iframe[data-review-id]');
                    iframes.forEach((el) => {
                        if (el.contentWindow) {
                            el.contentWindow.postMessage(JSON.stringify({
                                event: 'command',
                                func: 'mute',
                                args: []
                            }), '*');
                        }
                    });
                    // Mute all plain video elements
                    const videos = section.querySelectorAll('video');
                    videos.forEach((v) => { v.muted = true; });
                    // Reset mutedStates so UI icons update too
                    setMutedStates({});
                }
            },
            { threshold: [0, 0.2] }
        );
        observer.observe(section);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (initialReviews !== null) return;
        const fetchReviews = async () => {
            try {
                const { data, status } = await apiCall('/reviews', 'GET');
                if (status === 200 && Array.isArray(data) && data.length > 0) {
                    setReviews(mapReviews(data));
                } else {
                    setReviews(staticReviews);
                }
            } catch {
                setReviews(staticReviews);
            }
        };
        fetchReviews();
    }, [initialReviews]);

    // For seamless marquee loop, we need enough slides.
    const displayReviews = useMemo(() => {
        if (reviews.length === 0) return [];
        let list = [...reviews];
        while (list.length > 0 && list.length < 12) {
            list = [...list, ...reviews.map(r => ({ ...r, id: `${r.id}-dup-${list.length}` }))];
        }
        return list;
    }, [reviews]);

    if (reviews.length === 0) return null;

    return (
        <section ref={sectionRef} className="w-full bg-black py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative">
            <div className="w-full relative">
                <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2">
                    <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
                        Client Reviews
                    </h2>

                </div>

                <style>{`
                    .mobile-review-pagination .swiper-pagination-bullet {
                        background: rgba(255,255,255,0.3);
                        width: 8px;
                        height: 8px;
                        opacity: 1;
                    }
                    .mobile-review-pagination .swiper-pagination-bullet-active {
                        background: #4169E1;
                        width: 24px;
                        border-radius: 4px;
                    }
                `}</style>
                {/* Mobile Swiper - full card design with video only */}
                <Swiper
                    ref={mobileSwiperRef}
                    onSwiper={(swiper) => { mobileSwiperRef.current = swiper; }}
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    slidesPerView={1}
                    spaceBetween={12}
                    grabCursor={true}
                    allowTouchMove={true}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true, el: '.mobile-review-pagination' }}
                    className="md:!hidden !px-[15px]"
                >
                    {reviews.map((review) => {
                        const isMuted = getIsMuted(review.id);
                        const ytUrl = getYouTubeEmbedUrl(review.video, isMuted);
                        return (
                            <SwiperSlide key={review.id} className="!w-full py-4">
                                <div className="w-full h-[380px] bg-[#323235] rounded-[24px] flex flex-col p-4 ring-[6px] ring-[#2b2b2d]" style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}>
                                    <div className="w-full h-full rounded-[16px] overflow-hidden border border-white/5 relative" style={{ transform: 'translateZ(0)' }}>
                                        {review.video && ytUrl ? (
                                            <div className="relative w-full h-full">
                                                {/* pointer-events: none prevents YouTube redirect on click */}
                                                <iframe
                                                    ref={getPlayerRef(review.id)}
                                                    src={`${ytUrl}&rel=0&modestbranding=1&iv_load_policy=3`}
                                                    data-review-id={review.id}
                                                    className="w-full h-full"
                                                    style={{ border: 'none', background: '#000', borderRadius: '16px', pointerEvents: 'none' }}
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    title={`${review.clientName} review`}
                                                    loading="lazy"
                                                />
                                            </div>
                                        ) : review.video ? (
                                            <video
                                                ref={getPlayerRef(review.id)}
                                                src={review.video}
                                                muted={isMuted}
                                                controls
                                                autoPlay
                                                playsInline
                                                onEnded={handleVideoEnded}
                                                className="w-full h-full object-contain bg-black rounded-[16px]"
                                            />
                                        ) : null}
                                        {review.video && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleMute(review.id, !!ytUrl);
                                                }}
                                                style={{ pointerEvents: 'auto' }}
                                                className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors"
                                                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                                            >
                                                {isMuted ? (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                        <line x1="23" y1="9" x2="17" y2="15"></line>
                                                        <line x1="17" y1="9" x2="23" y2="15"></line>
                                                    </svg>
                                                ) : (
                                                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                    </svg>
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="mobile-review-pagination flex justify-center gap-1.5 mt-3 md:hidden"></div>

                {/* Desktop Swiper - marquee style */}
                <Swiper
                    modules={[Autoplay, FreeMode]}
                    loop={true}
                    speed={8000}
                    autoplay={{
                        delay: 0,
                        disableOnInteraction: true,
                        pauseOnMouseEnter: true,
                    }}
                    slidesPerView="auto"
                    spaceBetween={10}
                    freeMode={{
                        enabled: true,
                        momentum: false,
                    }}
                    grabCursor={true}
                    allowTouchMove={true}
                    className="!overflow-visible px-0 marquee-swiper max-md:!hidden"
                    breakpoints={{
                        768: {
                            spaceBetween: 10,
                        },
                        1024: {
                            spaceBetween: 10,
                        }
                    }}
                >
                    {displayReviews.map((review) => {
                        const isDtMuted = getIsMuted(`dt-${review.id}`);
                        const dtYtUrl = getYouTubeEmbedUrl(review.video, isDtMuted);
                        return (
                            <SwiperSlide
                                key={review.id}
                                className="!w-[220px] md:!w-[577px] py-2 md:py-4"
                            >
                                <div className="w-full h-full">
                                    <div
                                        className="relative w-full h-[280px] md:h-[637px] bg-[#323235] rounded-[16px] md:rounded-[48px] flex flex-col p-3 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d] will-change-transform"
                                        style={{
                                            boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px'
                                        }}
                                    >
                                        <div className="w-full h-[140px] md:h-[380px] rounded-[12px] md:rounded-[36px] overflow-hidden border border-white/5 group relative" style={{ transform: 'translateZ(0)' }}>
                                            {review.video && dtYtUrl ? (
                                                <div className="relative w-full h-full">
                                                    {/* pointer-events: none prevents YouTube redirect; volume button uses pointer-events: auto */}
                                                    <iframe
                                                        src={`${dtYtUrl}&rel=0&modestbranding=1`}
                                                        data-review-id={`dt-${review.id}`}
                                                        className="w-full h-full"
                                                        style={{ border: 'none', background: '#000', borderRadius: '12px', pointerEvents: 'none' }}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        title={`${review.clientName} review`}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            ) : review.video ? (
                                                <video
                                                    src={review.video}
                                                    muted={isDtMuted}
                                                    controls
                                                    preload="none"
                                                    playsInline
                                                    className="w-full h-full object-contain bg-black rounded-[12px] md:rounded-[36px]"
                                                />
                                            ) : null}
                                            {review.video && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleMute(`dt-${review.id}`, !!dtYtUrl);
                                                    }}
                                                    style={{ pointerEvents: 'auto' }}
                                                    className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors"
                                                    aria-label={isDtMuted ? 'Unmute video' : 'Mute video'}
                                                >
                                                    {isDtMuted ? (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                            <line x1="23" y1="9" x2="17" y2="15"></line>
                                                            <line x1="17" y1="9" x2="23" y2="15"></line>
                                                        </svg>
                                                    ) : (
                                                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                                                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                                                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                                                        </svg>
                                                    )}
                                                </button>
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col md:px-6 px-3 md:py-8 py-3" onClick={(e) => e.stopPropagation()}>
                                            <div className="hidden md:flex items-center gap-4 text-white/70 text-sm mb-6">
                                                <span>{review.clientName}</span>
                                                {review.company && (
                                                    <>
                                                        <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>
                                                        <span>{review.company}</span>
                                                    </>
                                                )}
                                            </div>
                                            <div className="md:hidden flex items-center gap-2 text-white/80 text-[11px] mb-4">
                                                <span>{review.clientName}</span>
                                                {review.company && (
                                                    <>
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#4169E1]"></span>
                                                        <span>{review.company}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h3 className="text-white md:text-[22px] text-[13px] font-medium leading-tight line-clamp-3">
                                                {review.projectName || review.clientName}
                                            </h3>
                                            {review.quote && (
                                                <p className="text-zinc-400 text-xs md:text-sm mt-2 italic leading-relaxed line-clamp-2">
                                                    &ldquo;{review.quote}&rdquo;
                                                </p>
                                            )}
                                            <div className="mt-auto">
                                                {review.projectLink ? (
                                                    <a href={review.projectLink} className="group flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4 cursor-pointer">
                                                        <span>View Project</span>
                                                        <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover:translate-x-1 transition">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-7 md:h-7">
                                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                                <polyline points="7 7 17 7 17 17"></polyline>
                                                            </svg>
                                                        </div>
                                                    </a>
                                                ) : (
                                                    <span className="group flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4 cursor-pointer">
                                                        <span>Case Study</span>
                                                        <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover:translate-x-1 transition">
                                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-7 md:h-7">
                                                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                                                <polyline points="7 7 17 7 17 17"></polyline>
                                                            </svg>
                                                        </div>
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>

            </div>
        </section>
    );
};

export default ClientReviews;
