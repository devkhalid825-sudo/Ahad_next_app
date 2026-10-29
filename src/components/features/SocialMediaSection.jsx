'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { apiCall } from '@/utils/api';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useInView } from '@/hooks/useInView';
import MediaFacade from '../ui/MediaFacade';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

// No static fallback — section is hidden until real backend data loads.

const getYouTubeId = (url) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
};

const getInstagramEmbedUrl = (url) => {
  if (!url) return null;
  const match = url.match(/(?:instagram\.com|instagr\.am)\/(?:reel|p)\/([a-zA-Z0-9_-]+)/);
  if (match) return `https://www.instagram.com/${url.includes('/reel/') ? 'reel' : 'p'}/${match[1]}/embed`;
  return null;
};

const isDirectVideo = (url) => {
  if (!url) return false;
  return /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(url);
};

/**
 * LazyDesktopVideoSlide
 *
 * Per-slide lazy-mount wrapper for the desktop marquee. Mounts the video/iframe
 * only when the slide enters the viewport (rootMargin: '0px 200px'). This prevents
 * 12-24 simultaneous decoder allocations that previously caused 7,700ms TBT.
 */
const LazyDesktopVideoSlide = ({ item }) => {
  const [ref, inView] = useInView({ rootMargin: '0px 200px 0px 200px' });
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      {inView && item.videoUrl ? (
        <MediaFacade
          videoUrl={item.videoUrl}
          title={item.projectName || 'Social Video'}
          isActive={true}
          autoPlay={true}
          muted={true}
          loop={true}
          controls={false}
          className="w-full h-full"
        />
      ) : (
        <div className="w-full h-full bg-[#1a1a1c]" />
      )}
    </div>
  );
};

const SocialIcon = ({ href, title, children, activeBg, activeBorder, activeColor }) => {
  const [h, sH] = useState(false);
  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      title={title}
      onMouseEnter={() => sH(true)}
      onMouseLeave={() => sH(false)}
      onClick={handleClick}
      style={{
        background: h ? activeBg : 'rgba(255,255,255,0.05)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: h ? activeBorder : 'rgba(255,255,255,0.12)',
        transition: 'all 0.25s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
      }}
      className="social-icon-btn w-10 h-10 md:w-12 md:h-12 hover:scale-105 active:scale-95 transition-transform duration-200"
    >
      <span
        className="social-icon-inner"
        style={{ color: h ? activeColor : 'rgba(255,255,255,0.55)', transition: 'color 0.25s', display: 'flex' }}
      >
        {children}
      </span>
    </a>
  );
};

const cleanSocialTitle = (text) => {
  if (!text || typeof text !== 'string') return '';
  return text.replace(/\s*\|\s*/g, ' · ').replace(/\s+/g, ' ').trim();
};

const SocialMediaSection = ({ initialSocialMedia = [] }) => {
  const [items, setItems] = useState(() =>
    Array.isArray(initialSocialMedia) && initialSocialMedia.length > 0
      ? initialSocialMedia.map((item) => ({
          id: item.id,
          videoUrl: item.videoUrl,
          projectName: cleanSocialTitle(item.projectName),
          projectLink: item.projectLink || '',
        }))
      : []
  );
  const isMobile = useIsMobile();
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const mobileSwiperRef = useRef(null);
  const marqueeSwiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  const handleVideoEnded = useCallback(() => {
    if (mobileSwiperRef.current) {
      mobileSwiperRef.current.slideNext();
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) return;
    const fetchItems = async () => {
      try {
        const { data, status } = await apiCall('/social-media', 'GET');
        if (status === 200 && Array.isArray(data) && data.length > 0) {
          setItems(
            data.map((item) => ({
              id: item.id,
              videoUrl: item.videoUrl,
              projectName: cleanSocialTitle(item.projectName),
              projectLink: item.projectLink || '',
            }))
          );
        }
      } catch {
        // Silently fail — section stays hidden if both server and client fetch fail
      }
    };
    fetchItems();
  }, [items.length]);

  // Lazy-load: only mount heavy video iframes when section enters viewport
  useEffect(() => {
    if (sectionVisible) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [sectionVisible]);

  if (items.length === 0) return null;

  return (
    <section ref={sectionRef} className="w-full bg-black py-6 md:py-10 overflow-hidden font-sans flex flex-col justify-center relative">
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2 mb-4 md:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-white">
            Social Media
          </h2>

          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => marqueeSwiperRef.current?.slidePrev()}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Previous social media"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => marqueeSwiperRef.current?.slideNext()}
              className="w-11 h-11 rounded-full border border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10 flex items-center justify-center text-white transition-all active:scale-95 cursor-pointer"
              aria-label="Next social media"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Swiper: ONLY rendered on mobile viewports (<768px) */}
        {isMobile !== false && (
          <>
            <Swiper
              ref={mobileSwiperRef}
              onSwiper={(swiper) => {
                mobileSwiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveMobileIndex(swiper.realIndex);
              }}
              modules={[Pagination]}
              loop={true}
              speed={600}
              slidesPerView={1}
              spaceBetween={12}
              grabCursor={true}
              allowTouchMove={true}
              pagination={{ clickable: true, el: '.mobile-social-pagination' }}
              className="md:!hidden !px-[15px]"
            >
              {items.map((item, idx) => (
                <SwiperSlide key={item.id} className="!w-full py-4">
                  <div
                    data-slide-id={idx}
                    className="relative w-full h-[420px] bg-[#1a1a1c] overflow-hidden rounded-[24px]"
                    style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
                  >
                    <div className="block w-full h-full">
                      <div className="absolute inset-0 overflow-hidden">
                        {item.videoUrl && sectionVisible && (
                          <MediaFacade
                            videoUrl={item.videoUrl}
                            title={item.projectName || 'Social Video'}
                            isActive={activeMobileIndex === idx}
                            autoPlay={activeMobileIndex === idx}
                            muted={true}
                            loop={true}
                            onEnded={handleVideoEnded}
                            className="w-full h-full"
                          />
                        )}
                        {(!item.videoUrl || !sectionVisible) && <div className="w-full h-full bg-[#1a1a1c]" />}
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="mt-3 md:hidden flex items-center justify-between px-2 sm:px-4">
              <button
                onClick={() => mobileSwiperRef.current?.slidePrev()}
                className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Previous social media"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <div className="mobile-social-pagination flex justify-center gap-1.5"></div>
              <button
                onClick={() => mobileSwiperRef.current?.slideNext()}
                className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 active:scale-95 transition-all shadow-sm cursor-pointer"
                aria-label="Next social media"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </>
        )}

        {/* Desktop Swiper: Button-controlled (no auto-loop, no drag) */}
        {isMobile !== true && (
          <Swiper
            onSwiper={(swiper) => {
              marqueeSwiperRef.current = swiper;
            }}
            modules={[]}
            loop={false}
            speed={600}
            slidesPerView="auto"
            spaceBetween={16}
            grabCursor={false}
            allowTouchMove={false}
            className="!overflow-visible px-0 max-md:!hidden [&>.swiper-wrapper]:!flex [&>.swiper-wrapper]:!justify-center"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!w-[240px] sm:!w-[270px] md:!w-[290px] lg:!w-[305px] py-2 md:py-3">
                <div className="block w-full h-full">
                  <div
                    className="relative w-full h-[420px] sm:h-[480px] md:h-[515px] lg:h-[540px] bg-[#1a1a1c] overflow-hidden group cursor-pointer rounded-[22px] border border-zinc-800/60 transition-all duration-300 hover:border-zinc-700"
                    style={{ boxShadow: '0 16px 40px rgba(0,0,0,0.6)' }}
                    onClick={() => item.videoUrl && window.open(item.videoUrl, '_blank', 'noopener,noreferrer')}
                  >
                    {sectionVisible ? (
                      <LazyDesktopVideoSlide item={item} />
                    ) : (
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="w-full h-full bg-[#1a1a1c]" />
                      </div>
                    )}

                    {item.projectName && (
                      <div className="absolute bottom-0 left-0 right-0 px-4 md:px-5 py-3 md:py-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:bg-gradient-to-t group-hover:from-[#4169E1]/80 transition-all duration-300">
                        <span className="block text-white text-xs sm:text-[13px] font-medium tracking-tight truncate">
                          {item.projectName}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        {/* Social Media Icons below the videos */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 md:mt-8">
          <SocialIcon
            href="https://www.youtube.com/@officialelipsestudio"
            title="YouTube"
            activeBg="rgba(255,0,0,0.15)"
            activeBorder="rgba(255,0,0,0.4)"
            activeColor="#FF0000"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          </SocialIcon>

          <SocialIcon
            href="https://www.instagram.com/elipse_studio/"
            title="Instagram"
            activeBg="rgba(225,48,108,0.15)"
            activeBorder="rgba(225,48,108,0.4)"
            activeColor="#E1306C"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </svg>
          </SocialIcon>

          <SocialIcon
            href="https://www.facebook.com/elipsestudio"
            title="Facebook"
            activeBg="rgba(24,119,242,0.15)"
            activeBorder="rgba(24,119,242,0.4)"
            activeColor="#1877F2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </SocialIcon>

          <SocialIcon
            href="https://pk.linkedin.com/company/elipse-studioo"
            title="LinkedIn"
            activeBg="rgba(10,102,194,0.15)"
            activeBorder="rgba(10,102,194,0.4)"
            activeColor="#0A66C2"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </SocialIcon>
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
