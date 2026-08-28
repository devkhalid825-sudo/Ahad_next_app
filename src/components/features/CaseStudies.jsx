'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { apiCall, BACKEND_ORIGIN } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/pagination';

const DEFAULT_IMAGE = '/assets/og-image.png';
const DEFAULT_IMAGE_LIGHT = 'https://placehold.co/800x450/222/888?text=Case+Study';

const CaseStudies = ({ isLight = false, initialFeatured = null }) => {
  const [featured, setFeatured] = useState(initialFeatured || []);
  const [loading, setLoading] = useState(initialFeatured === null);
  const topSwiperRef = useRef(null);
  const bottomSwiperRef = useRef(null);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialFeatured) return;
    let cancelled = false;
    const fetchFeatured = async () => {
      try {
        const { data, status } = await apiCall('/case-studies?featured=true', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data)) {
          setFeatured(data);
        }
      } catch {
        /* keep initialFeatured as fallback */
      }
      if (!cancelled) setLoading(false);
    };
    fetchFeatured();
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fallback = isLight ? DEFAULT_IMAGE_LIGHT : DEFAULT_IMAGE;

  const resolveImg = (url) => {
    if (!url) return fallback;
    if (url.startsWith('http')) return url;
    if (url.startsWith('/uploads/')) return `${BACKEND_ORIGIN}${url}`;
    return url || fallback;
  };

  const topItems = !loading
    ? featured.slice(0, 4).map((cs) => ({
        id: cs.id,
        title: cs.title,
        image: resolveImg(cs.largeBanner || cs.smallBanner),
        path: `/case-study/${cs.slug}`,
      }))
    : [];

  const bottomItems = !loading
    ? featured.slice(4).map((cs) => ({
        id: cs.id,
        title: cs.title,
        image: resolveImg(cs.smallBanner || cs.largeBanner),
        path: `/case-study/${cs.slug}`,
      }))
    : [];

  const isEmpty = !loading && featured.length === 0;

  if (isEmpty) return null;

  return (
    <section
      id="portfolio"
      className={`hidden md:block pt-6 pb-3 md:pt-16 md:pb-10 transition-colors duration-300 ${
        isLight ? 'bg-white text-black' : 'bg-black text-white'
      }`}
    >
      <style>{`
        .top-pagination.swiper-pagination {
          position: static;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .top-pagination .swiper-pagination-bullet {
          background: ${isLight ? 'rgba(0, 0, 0, 0.35)' : 'rgba(255, 255, 255, 0.35)'};
          width: 8px;
          height: 8px;
          border-radius: 9999px;
          opacity: 1;
          margin: 0;
          transition: all 0.3s ease;
        }
        .top-pagination .swiper-pagination-bullet-active {
          background: #4169E1;
          width: 24px;
          border-radius: 9999px;
        }
      `}</style>
      <div className="mx-auto px-[15px] md:px-[40px] flex justify-between items-center md:items-end mb-4 md:mb-6 gap-4">
        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
          Featured Case Studies
        </h2>
        <button
          onClick={() => topSwiperRef.current?.slideNext()}
          className={`p-1 transition-all duration-300 group shrink-0 bg-transparent border-none appearance-none outline-none cursor-pointer ${
            isLight ? 'text-black hover:text-[#4169E1]' : 'text-white hover:text-[#4169E1]'
          }`}
          aria-label="Next case study"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 md:h-8 md:w-8 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="w-full relative flex flex-col gap-[3px] md:gap-[15px]">
        {loading ? (
          <>
            <div className="w-full relative overflow-hidden">
              <div className="flex gap-[5px] md:gap-[15px]">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`aspect-video rounded-lg ${i === 1 ? 'w-full' : 'w-[60%]'} ${
                      isLight ? 'bg-gray-200' : 'bg-[#1A1A1A]'
                    } animate-pulse`}
                  />
                ))}
              </div>
            </div>
            <div className="w-full relative overflow-hidden">
              <div className="flex gap-[5px] md:gap-[15px]">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-video w-[45%] md:w-[30%] rounded-lg bg-[#1A1A1A] animate-pulse"
                  />
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="w-full relative overflow-hidden">
              <Swiper
                modules={[Autoplay, Pagination]}
                loop={true}
                speed={2000}
                autoplay={{ delay: 8000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                onInit={(swiper) => {
                  topSwiperRef.current = swiper;
                }}
                pagination={{ clickable: true, el: '.top-pagination' }}
                slidesPerView={1.5}
                centeredSlides={true}
                spaceBetween={5}
                breakpoints={{ 768: { spaceBetween: 15 } }}
                allowTouchMove={true}
                touchRatio={1}
                touchAngle={45}
                simulateTouch={true}
                shortSwipes={true}
                longSwipes={true}
                longSwipesRatio={0.3}
                followFinger={true}
                onSwiper={(swiper) => (topSwiperRef.current = swiper)}
                className="!overflow-visible"
              >
                {[...topItems, ...topItems].map((study, idx) => (
                  <SwiperSlide key={`top-${idx}`}>
                    <div className="w-full aspect-video relative overflow-hidden group cursor-pointer">
                      <Link href={study.path} className="absolute inset-0 w-full h-full block">
                        <img
                          src={study.image}
                          alt={study.title}
                          width="800"
                          height="450"
                          loading={idx < 2 ? 'eager' : 'lazy'}
                          className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                        <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-6">
                          <h3 className="text-2xl sm:text-4xl md:text-5xl font-bold uppercase text-center text-white">
                            {study.title}
                          </h3>
                        </div>
                      </Link>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
            {bottomItems.length > 0 && (
              <div className="w-full relative overflow-hidden">
                <Swiper
                  modules={[Autoplay]}
                  loop={true}
                  speed={2000}
                  autoplay={{ delay: 9000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                  onInit={(swiper) => {
                    bottomSwiperRef.current = swiper;
                  }}
                  slidesPerView={1.8}
                  centeredSlides={true}
                  spaceBetween={5}
                  breakpoints={{ 768: { slidesPerView: 3.5, centeredSlides: true, spaceBetween: 15 } }}
                  allowTouchMove={true}
                  touchRatio={1}
                  touchAngle={45}
                  simulateTouch={true}
                  shortSwipes={true}
                  longSwipes={true}
                  longSwipesRatio={0.3}
                  followFinger={true}
                  onSwiper={(swiper) => (bottomSwiperRef.current = swiper)}
                  className="!overflow-visible"
                >
                  {[...bottomItems, ...bottomItems].map((study, idx) => (
                    <SwiperSlide key={`bottom-${idx}`}>
                      <div className="w-full aspect-video relative overflow-hidden group cursor-pointer">
                        <Link href={study.path} className="absolute inset-0 w-full h-full block">
                          <img
                            src={study.image}
                            alt={study.title}
                            width="400"
                            height="225"
                            loading="lazy"
                            className="absolute inset-0 w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                          <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 p-4">
                            <h3 className="text-sm sm:text-lg md:text-xl font-bold uppercase text-center text-white">
                              {study.title}
                            </h3>
                          </div>
                        </Link>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </>
        )}
      </div>

      <div className="top-pagination flex justify-center !mt-[5px] md:!mt-[15px] gap-2"></div>
    </section>
  );
};

export default CaseStudies;
