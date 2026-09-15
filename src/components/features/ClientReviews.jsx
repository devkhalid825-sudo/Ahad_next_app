'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';
import { apiCall } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { useIsMobile } from '@/hooks/useIsMobile';
import { useInView } from '@/hooks/useInView';
import MediaFacade from '../ui/MediaFacade';

const getYouTubeEmbedUrl = (url, muted = true) => {
  if (!url) return null;
  const muteParam = muted ? '1' : '0';
  if (url.includes('youtube.com/embed/'))
    return url.includes('?')
      ? `${url}&autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1`
      : `${url}?autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1`;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube-nocookie.com/embed/${match[1]}?autoplay=1&mute=${muteParam}&enablejsapi=1&playsinline=1&rel=0&modestbranding=1`;
  return null;
};

/**
 * LazyReviewSlide
 *
 * Per-slide lazy-mount wrapper for the desktop marquee. The actual video/iframe
 * is only mounted when the slide enters the viewport (with a 300px horizontal
 * pre-load margin). This prevents 24 simultaneous decoder allocations.
 */
const LazyReviewSlide = ({ review, isMuted, onToggleMute }) => {
  const [ref, inView] = useInView({ rootMargin: '0px 300px 0px 300px' });
  const videoRef = useRef(null);

  return (
    <div
      ref={ref}
      className="w-full h-[140px] md:h-[380px] rounded-[12px] md:rounded-[36px] overflow-hidden border border-white/5 group relative"
    >
      {inView && review.video ? (
        <MediaFacade
          videoUrl={review.video}
          title={`${review.clientName} review`}
          isActive={true}
          autoPlay={true}
          muted={isMuted}
          loop={true}
          controls={false}
          setRef={(el) => { videoRef.current = el; }}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-[#323235]" />
      )}
      {review.video && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleMute(`dt-${review.id}`);
          }}
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
  );
};

// No static fallback — section is hidden until real backend data loads.

const mapReviews = (data) =>
  data.map((r) => ({
    id: r.id,
    video: r.video,
    clientName: r.clientName,
    company: r.company || '',
    projectName: r.projectName || '',
    projectLink: r.projectLink || '',
  }));

const ClientReviews = ({ initialReviews = null }) => {
  const [reviews, setReviews] = useState(initialReviews ? mapReviews(initialReviews) : []);
  const [mutedStates, setMutedStates] = useState({});
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const isMobile = useIsMobile();
  const mobileSwiperRef = useRef(null);
  const marqueeSwiperRef = useRef(null);
  const playerRefs = useRef({});
  const sectionRef = useRef(null);

  const setPlayerRef = useCallback(
    (id) => (el) => {
      playerRefs.current[id] = el;
    },
    []
  );

  const getIsMuted = useCallback(
    (id) => {
      return mutedStates[id] !== false;
    },
    [mutedStates]
  );

  const toggleMute = useCallback((id, isYouTube) => {
    setMutedStates((prev) => {
      const currentMuted = prev[id] !== false;
      const newMuted = !currentMuted;
      if (isYouTube) {
        const el = document.querySelector(`[data-review-id="${id}"]`);
        if (el && el.contentWindow) {
          el.contentWindow.postMessage(
            JSON.stringify({
              event: 'command',
              func: newMuted ? 'mute' : 'unMute',
              args: [],
            }),
            '*'
          );
        }
      } else {
        const el = playerRefs.current[id];
        if (el) {
          el.muted = newMuted;
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

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) {
          const iframes = section.querySelectorAll('iframe[data-review-id]');
          iframes.forEach((el) => {
            if (el.contentWindow) {
              el.contentWindow.postMessage(
                JSON.stringify({
                  event: 'command',
                  func: 'mute',
                  args: [],
                }),
                '*'
              );
            }
          });
          const videos = section.querySelectorAll('video');
          videos.forEach((v) => {
            v.muted = true;
          });
          setMutedStates({});
        } else {
          const videos = section.querySelectorAll('video');
          videos.forEach((v) => {
            v.muted = true;
            const p = v.play();
            if (p !== undefined) p.catch(() => { });
          });
        }
      },
      { threshold: [0, 0.2] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialReviews) return;
    let cancelled = false;
    const fetchReviews = async () => {
      try {
        const { data, status } = await apiCall('/reviews', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data) && data.length > 0) {
          setReviews(mapReviews(data));
        }
      } catch {
        // Network error → keep reviews empty → section stays hidden
      }
    };
    fetchReviews();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayReviews = useMemo(() => {
    return reviews;
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative"
    >
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Client Reviews
          </h2>
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => marqueeSwiperRef.current?.slidePrev()}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95"
              aria-label="Previous review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => marqueeSwiperRef.current?.slideNext()}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95"
              aria-label="Next review"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Swiper: ONLY rendered on mobile viewports (<768px). Prevents desktop duplicate nodes */}
        {isMobile !== false && (
          <div className="relative md:hidden">
            <Swiper
              ref={mobileSwiperRef}
              onSwiper={(swiper) => {
                mobileSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveMobileIndex(swiper.realIndex);
              }}
              modules={[Pagination]}
              loop={reviews.length > 1}
              speed={600}
              slidesPerView={1}
              spaceBetween={12}
              grabCursor={true}
              allowTouchMove={true}
              pagination={{ clickable: true, el: '.mobile-review-pagination' }}
              className="!px-[15px]"
            >
              {reviews.map((review, idx) => {
                const isMuted = getIsMuted(review.id);
                const isActive = activeMobileIndex === idx;

                return (
                  <SwiperSlide key={review.id} className="!w-full py-3 sm:py-4">
                    <div
                      className="w-full h-[380px] xs:h-[420px] sm:h-[460px] bg-[#323235] rounded-[20px] sm:rounded-[24px] flex flex-col p-3 sm:p-4 ring-[4px] sm:ring-[6px] ring-[#2b2b2d] relative"
                      style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                    >
                      <div className="w-full h-full rounded-[14px] sm:rounded-[16px] overflow-hidden border border-white/5 relative">
                        {review.video ? (
                          <MediaFacade
                            videoUrl={review.video}
                            title={`${review.clientName} review`}
                            isActive={isActive}
                            autoPlay={isActive}
                            muted={isMuted}
                            loop={false}
                            controls={true}
                            onEnded={handleVideoEnded}
                            setRef={setPlayerRef(review.id)}
                            className="w-full h-full"
                          />
                        ) : null}
                      </div>

                      {review.video && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMute(review.id, false);
                          }}
                          className="absolute bottom-5 sm:bottom-6 right-5 sm:right-6 z-20 w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-black/70 backdrop-blur flex items-center justify-center hover:bg-black/90 transition-colors shadow-lg text-white"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <line x1="23" y1="9" x2="17" y2="15"></line>
                              <line x1="17" y1="9" x2="23" y2="15"></line>
                            </svg>
                          ) : (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>

            {/* Bottom Controls with Left/Right Arrows and Pointer Dots */}
            <div className="flex items-center justify-center gap-4 mt-4 px-4">
              <button
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
                aria-label="Previous review"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div className="mobile-review-pagination flex justify-center gap-2"></div>

              <button
                onClick={() => mobileSwiperRef.current?.slideNext()}
                className="w-8 h-8 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all shadow-md"
                aria-label="Next review"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Desktop Swiper: Smooth manual draggable slider with navigation */}
        {isMobile !== true && (
          <div className="max-md:!hidden px-[15px] md:px-[40px]">
            <Swiper
              onSwiper={(swiper) => {
                marqueeSwiperRef.current = swiper;
              }}
              modules={[FreeMode]}
              loop={false}
              speed={600}
              slidesPerView="auto"
              spaceBetween={20}
              freeMode={{
                enabled: true,
                momentum: true,
              }}
              grabCursor={true}
              allowTouchMove={true}
              className="!overflow-visible"
            >
              {displayReviews.map((review) => {
                const isDtMuted = getIsMuted(`dt-${review.id}`);
                return (
                  <SwiperSlide key={review.id} className="!w-[420px] lg:!w-[520px] py-2 md:py-4">
                    <div className="w-full h-full">
                      <div
                        className="relative w-full h-[520px] lg:h-[580px] bg-[#323235] rounded-[24px] md:rounded-[36px] flex flex-col p-4 md:p-6 transition-all duration-300 hover:-translate-y-1 ring-[4px] ring-[#2b2b2d]"
                        style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                      >
                        <LazyReviewSlide
                          review={review}
                          isMuted={isDtMuted}
                          onToggleMute={(key) => toggleMute(key, true)}
                        />
                        <div className="flex-1 flex flex-col px-2 md:px-4 py-4">
                          <div className="flex items-center gap-3 text-white/70 text-sm mb-3">
                            <span className="font-medium text-white">{review.clientName}</span>
                            {review.company && (
                              <>
                                <span className="w-1.5 h-1.5 bg-[#4169E1] rounded-full"></span>
                                <span>{review.company}</span>
                              </>
                            )}
                          </div>
                          <h3 className="text-white text-lg md:text-xl font-medium leading-snug line-clamp-2">
                            {review.projectName || review.clientName}
                          </h3>
                          {review.quote && (
                            <p className="text-zinc-400 text-sm mt-2 italic leading-relaxed line-clamp-3">
                              &ldquo;{review.quote}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default ClientReviews;
