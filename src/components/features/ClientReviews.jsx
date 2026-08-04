'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { apiCall } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const getYouTubeEmbedUrl = (url, muted = true) => {
  if (!url) return null;
  const muteParam = muted ? '1' : '0';
  if (url.includes('youtube.com/embed/'))
    return url.includes('?')
      ? `${url}&autoplay=1&mute=${muteParam}&enablejsapi=1`
      : `${url}?autoplay=1&mute=${muteParam}&enablejsapi=1`;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/);
  if (match) return `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=${muteParam}&enablejsapi=1`;
  return null;
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
  const mobileSwiperRef = useRef(null);
  const playerRefs = useRef({});
  const sectionRef = useRef(null);

  const getPlayerRef = useCallback((id) => {
    if (!playerRefs.current[id]) {
      playerRefs.current[id] = React.createRef();
    }
    return playerRefs.current[id];
  }, []);

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
        }
        // If backend returns no data, keep reviews empty → section stays hidden
      } catch {
        // Network error → keep reviews empty → section stays hidden
      }
    };
    fetchReviews();
  }, [initialReviews]);

  const displayReviews = useMemo(() => {
    if (reviews.length === 0) return [];
    let list = [...reviews];
    while (list.length > 0 && list.length < 12) {
      list = [...list, ...reviews.map((r) => ({ ...r, id: `${r.id}-dup-${list.length}` }))];
    }
    return list;
  }, [reviews]);

  if (reviews.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="w-full bg-black py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative"
    >
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
            Client Reviews
          </h2>
        </div>

        <Swiper
          ref={mobileSwiperRef}
          onSwiper={(swiper) => {
            mobileSwiperRef.current = swiper;
          }}
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
                <div
                  className="w-full h-[380px] bg-[#323235] rounded-[24px] flex flex-col p-4 ring-[6px] ring-[#2b2b2d]"
                  style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                >
                  <div className="w-full h-full rounded-[16px] overflow-hidden border border-white/5 relative">
                    {review.video && ytUrl ? (
                      <div className="relative w-full h-full">
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
                        className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors"
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      >
                        {isMuted ? (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
                            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                            <line x1="23" y1="9" x2="17" y2="15"></line>
                            <line x1="17" y1="9" x2="23" y2="15"></line>
                          </svg>
                        ) : (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-4 h-4"
                          >
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
        >
          {displayReviews.map((review) => {
            const isDtMuted = getIsMuted(`dt-${review.id}`);
            const dtYtUrl = getYouTubeEmbedUrl(review.video, isDtMuted);
            return (
              <SwiperSlide key={review.id} className="!w-[220px] md:!w-[577px] py-2 md:py-4">
                <div className="w-full h-full">
                  <div
                    className="relative w-full h-[280px] md:h-[637px] bg-[#323235] rounded-[16px] md:rounded-[48px] flex flex-col p-3 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d]"
                    style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                  >
                    <div className="w-full h-[140px] md:h-[380px] rounded-[12px] md:rounded-[36px] overflow-hidden border border-white/5 group relative">
                      {review.video && dtYtUrl ? (
                        <div className="relative w-full h-full">
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
                          className="absolute bottom-3 right-3 z-20 w-9 h-9 rounded-full bg-black/60 backdrop-blur flex items-center justify-center hover:bg-black/80 transition-colors"
                          aria-label={isDtMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isDtMuted ? (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <line x1="23" y1="9" x2="17" y2="15"></line>
                              <line x1="17" y1="9" x2="23" y2="15"></line>
                            </svg>
                          ) : (
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                            </svg>
                          )}
                        </button>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col md:px-6 px-3 md:py-8 py-3">
                      <div className="hidden md:flex items-center gap-4 text-white/70 text-sm mb-6">
                        <span>{review.clientName}</span>
                        {review.company && (
                          <>
                            <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>
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
