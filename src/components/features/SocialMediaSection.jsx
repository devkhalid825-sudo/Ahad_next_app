'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from 'swiper/modules';
import { apiCall } from '@/utils/api';

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

const VideoPlayer = ({ url, onEnded, videoRef }) => {
  const youtubeId = useMemo(() => getYouTubeId(url), [url]);
  const instagramUrl = useMemo(() => getInstagramEmbedUrl(url), [url]);
  const direct = useMemo(() => isDirectVideo(url), [url]);

  if (youtubeId) {
    const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&loop=1&playlist=${youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&fs=0`;
    return (
      <div className="w-full h-full relative" style={{ overflow: 'hidden', transform: 'translateZ(0)' }}>
        <div style={{ position: 'absolute', top: '-15%', left: '-10%', width: '120%', height: '130%', pointerEvents: 'none', overflow: 'hidden' }}>
          <iframe
            ref={videoRef}
            src={embedUrl}
            className="w-full h-full"
            style={{ border: 'none', background: '#000' }}
            allow="autoplay; encrypted-media; picture-in-picture"
            title="YouTube"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
  if (instagramUrl)
    return (
      <iframe
        src={instagramUrl}
        className="w-full h-full"
        allow="autoplay; encrypted-media"
        title="Instagram"
        loading="lazy"
        style={{ overflow: 'hidden', borderRadius: '24px' }}
      />
    );
  if (direct)
    return (
      <video
        ref={videoRef}
        src={url}
        muted
        autoPlay
        loop
        playsInline
        onEnded={onEnded}
        className="w-full h-full object-cover bg-black rounded-[24px]"
        style={{ overflow: 'hidden' }}
      />
    );
  return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white/40 text-[10px] uppercase tracking-wider">
      Unsupported URL
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
      className="w-9 h-9 md:w-12 md:h-12"
    >
      <span style={{ color: h ? activeColor : 'rgba(255,255,255,0.55)', transition: 'color 0.25s', display: 'flex' }}>
        {children}
      </span>
    </a>
  );
};

const SocialMediaSection = () => {
  const [items, setItems] = useState([]);
  const mobileSwiperRef = useRef(null);

  const handleVideoEnded = useCallback(() => {
    if (mobileSwiperRef.current) {
      mobileSwiperRef.current.slideNext();
    }
  }, []);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const { data, status } = await apiCall('/social-media', 'GET');
        if (status === 200 && Array.isArray(data) && data.length > 0) {
          setItems(
            data.map((item) => ({
              id: item.id,
              videoUrl: item.videoUrl,
              projectName: item.projectName || '',
              projectLink: item.projectLink || '',
            }))
          );
        }
        // If backend returns no data, keep items empty → section stays hidden
      } catch {
        // Network error → keep items empty → section stays hidden
      }
    };
    fetchItems();
  }, []);

  if (items.length === 0) return null;

  return (
    <section className="w-full bg-black py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative">
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2 mb-6 md:mb-10">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Social Media
          </h2>

          <div className="flex items-center gap-2 md:gap-3">
            <SocialIcon
              href="https://www.youtube.com/@officialelipsestudio"
              title="YouTube"
              activeBg="rgba(65,105,225,0.18)"
              activeBorder="rgba(65,105,225,0.45)"
              activeColor="#4169E1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </SocialIcon>

            <SocialIcon
              href="https://www.instagram.com/elipse_studio/"
              title="Instagram"
              activeBg="rgba(65,105,225,0.18)"
              activeBorder="rgba(65,105,225,0.45)"
              activeColor="#4169E1"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
              </svg>
            </SocialIcon>
          </div>
        </div>

        <Swiper
          ref={mobileSwiperRef}
          onSwiper={(swiper) => {
            mobileSwiperRef.current = swiper;
          }}
          modules={[Pagination, Autoplay]}
          loop={true}
          speed={600}
          autoplay={{ delay: 9000, disableOnInteraction: false }}
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
                className="relative w-full h-[420px] bg-[#1a1a1c] overflow-hidden"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
              >
                <div className="block w-full h-full">
                  <div className="absolute inset-0 overflow-hidden">
                    {item.videoUrl && <VideoPlayer url={item.videoUrl} onEnded={handleVideoEnded} />}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="mobile-social-pagination flex justify-center gap-1.5 mt-3 md:hidden"></div>

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
            momentum: true,
            sticky: false,
          }}
          grabCursor={true}
          allowTouchMove={true}
          className="!overflow-visible px-0 marquee-swiper max-md:!hidden"
        >
          {[...items, ...items].map((item, index) => (
            <SwiperSlide key={`${item.id}-${index}`} className="!w-[160px] md:!w-[440px] py-2 md:py-4">
              <div className="block w-full h-full">
                <div
                  className="relative w-full h-[280px] md:h-[780px] bg-[#1a1a1c] overflow-hidden group cursor-pointer"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.7)' }}
                  onClick={() => item.videoUrl && window.open(item.videoUrl, '_blank', 'noopener,noreferrer')}
                >
                  <div className="absolute inset-0 overflow-hidden">
                    {item.videoUrl && <VideoPlayer url={item.videoUrl} />}
                  </div>

                  {item.projectName && (
                    <div className="absolute bottom-0 left-0 right-0 px-4 md:px-6 py-4 md:py-6 bg-gradient-to-t from-black/90 to-transparent group-hover:bg-gradient-to-t group-hover:from-[#4169E1]/80 transition-all duration-300">
                      <span className="hidden md:block text-white text-[11px] md:text-sm font-semibold tracking-tight truncate">
                        {item.projectName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SocialMediaSection;
