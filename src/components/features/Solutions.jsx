'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { FiArrowRight } from 'react-icons/fi';

import 'swiper/css';
import 'swiper/css/pagination';

import kiaConfiguratorImg from '@/assets/About-page/kia-1.png';
import zenithImg from '@/assets/About-page/virtual-tour.png';
import cgiJellyImg from '@/assets/About-page/malka-reel.png';

const solutionsCards = [
  {
    id: 'configurators',
    category: '3D CONFIGURATORS',
    title: 'High-Converting 3D Commerce.',
    description:
      'We build the real-time 3D, spatial, and cinematic experiences that turn complex products and unbuilt spaces into revenue.',
    image: kiaConfiguratorImg,
    alt: 'Kia Vehicle 3D Product Configurator',
    metaLabel: 'DELIVERABLES',
    pills: ['Interactive WebGL', 'Photorealistic UE5', 'Configurator Engine'],
    linkText: 'Explore 3D Configurators',
    linkHref: '/services/3d-product-configurators',
  },
  {
    id: 'archviz',
    category: 'ARCHVIZ',
    title: 'Pre-Sales Before Groundbreaking.',
    description:
      'Unreal Engine 5 virtual walkthroughs, dynamic daylight cycles, and luxury architectural visualization.',
    image: zenithImg,
    alt: 'Luxury Architectural Interactive Virtual Tour',
    videoUrl: 'https://youtu.be/YzLNRBsug_Q?si=sMzcBvQwZ-NjpG4b',
    metaLabel: 'DELIVERABLES',
    pills: ['UE5 Walkthroughs', 'Dynamic Daylight Cycles', 'Spatial Digital Twins'],
    linkText: 'Explore Spatial ArchViz',
    linkHref: '/services/architectural-visualization',
  },
  {
    id: 'commercials',
    category: 'CGI PRODUCTION',
    title: 'Cinematic 3D Product & Commercial Visuals.',
    titleSmall: true,
    description:
      'We craft cinema-caliber CGI that commands audience attention and elevates brand value.',
    image: cgiJellyImg,
    alt: 'Malka Foods Commercial 3D Product CGI & Fluid Simulation',
    videoUrl: 'https://youtu.be/BsKw4i6riRw?si=mS2PuOxRmvKKElpR',
    metaLabel: 'DELIVERABLES',
    pills: [
      'Commercial CGI',
      'Complex Liquid & Particle FX',
      'Exploded Engineering CAD Renders',
      'Broadcast Color Grading',
    ],
    linkText: 'Explore 3D Commercials',
    linkHref: '/services/3d-product-visualization',
  },
];

const SolutionsSection = () => {
  const swiperRef = useRef(null);

  return (
    <section
      id="solutions"
      className="solutions-section w-full bg-black text-white overflow-hidden font-sans border-t border-zinc-800/80 py-14 md:py-24 relative"
    >
      {/* Top corner soft blur gradients — dark mode only, desktop+. Cards keep their own clean bg */}
      <div
        className="solutions-corner-glow hidden md:block absolute -top-48 -left-48 w-[640px] h-[640px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />
      <div
        className="solutions-corner-glow hidden md:block absolute -top-48 -right-48 w-[640px] h-[640px] rounded-full pointer-events-none z-0"
        style={{
          background:
            'radial-gradient(circle, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0) 72%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Section Header - Full Width, No Left/Right Gap */}
        <div className="flex items-center justify-between gap-3 sm:gap-6 mb-8 md:mb-12 px-[15px] md:px-[40px]">
          <div className="min-w-0">
            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white whitespace-nowrap">
              What We Do
            </h2>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden md:flex xl:hidden items-center gap-2">
              <button
                onClick={() => swiperRef.current?.slidePrev()}
                className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Previous slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => swiperRef.current?.slideNext()}
                className="solutions-nav-btn w-11 h-11 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
                aria-label="Next slide"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
            <Link
              href="/contact"
              className="solutions-cta-btn inline-flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-5 sm:px-6 md:px-7 py-3 rounded-full text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-md hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              <span className="sm:hidden">Inquire Now</span>
              <span className="hidden sm:inline">Inquire Now</span>
              <FiArrowRight className="text-sm" />
            </Link>
          </div>
        </div>

        {/* Carousel / 3 Centered Cards */}
        <div className="relative max-w-[1680px] mx-auto w-full px-4 sm:px-6 md:px-10 lg:px-12">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Pagination]}
            pagination={{ clickable: true, el: '.mobile-solutions-pagination' }}
            slidesPerView="auto"
            spaceBetween={16}
            centeredSlides={true}
            grabCursor={true}
            breakpoints={{
              0: {
                slidesPerView: 'auto',
                spaceBetween: 16,
                centeredSlides: true,
              },
              480: {
                slidesPerView: 'auto',
                spaceBetween: 16,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 'auto',
                spaceBetween: 20,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 'auto',
                spaceBetween: 24,
                centeredSlides: false,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 28,
                centeredSlides: false,
                allowTouchMove: false,
              },
            }}
            className="!overflow-visible py-2 md:py-4 [&>.swiper-wrapper]:xl:justify-center"
          >
            {solutionsCards.map((card) => {
              return (
                <SwiperSlide
                  key={card.id}
                  className="!w-[86vw] xs:!w-[380px] sm:!w-[420px] md:!w-[460px] xl:!w-[calc((100%-56px)/3)] py-2 md:py-4 !h-auto flex justify-center items-center"
                >
                  <div className="group solution-card w-full h-[470px] xs:h-[500px] sm:h-[630px] md:h-[660px] lg:h-[690px] xl:h-[710px] rounded-[24px] sm:rounded-[32px] px-5 sm:px-8 md:px-9 pt-5 sm:pt-7 pb-5 sm:pb-7 md:pb-8 flex flex-col justify-between select-none relative overflow-hidden bg-gradient-to-b from-[#18181c] via-[#101115] to-[#08080a] text-white border border-zinc-800/80 transition-all duration-300 hover:border-[#4169E1]/40">
                    {/* Header Text (Shifted up) */}
                    <div className="relative z-20 flex flex-col justify-start shrink-0">
                      <div className="solution-card-category text-[11px] sm:text-xs font-sans tracking-[0.14em] uppercase font-semibold mb-1 sm:mb-1.5 text-zinc-400">
                        {card.category}
                      </div>
                      <h3
                        className={`solution-card-title font-semibold tracking-tight text-white leading-tight mb-2 sm:mb-2.5 ${card.titleSmall
                          ? 'text-[15px] sm:text-[18px] md:text-[19px] lg:text-[20px]'
                          : 'text-[18px] sm:text-[23px] md:text-[26px]'
                          }`}
                      >
                        {card.title}
                      </h3>
                      <p className="solution-card-desc text-xs sm:text-[13.5px] text-zinc-400 leading-relaxed font-sans line-clamp-3">
                        {card.description}
                      </p>
                    </div>

                    {/* Showcase Image: Framed with rounded corners and subtle border */}
                    {card.image && (
                      <div className="solution-card-img-box relative w-full flex-1 min-h-0 my-3 sm:my-4 rounded-xl sm:rounded-[22px] overflow-hidden border border-white/10">
                        <Image
                          src={card.image}
                          alt={card.alt || card.title}
                          fill
                          quality={100}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover object-center"
                        />
                      </div>
                    )}

                    {/* Bottom Section */}
                    <div className="relative z-20 flex flex-col justify-end shrink-0 mt-auto">
                      {/* Footer Row: Explore Link with Card-Hover Background Effect */}
                      <div className="solution-card-footer pt-3 flex items-center justify-end border-t border-white/10">
                        <Link
                          href={card.linkHref}
                          className="solution-card-link inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/5 group-hover:bg-[#4169E1] text-white/90 group-hover:text-white border border-white/10 group-hover:border-[#4169E1] text-xs sm:text-[13px] font-semibold transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_20px_rgba(65,105,225,0.4)]"
                        >
                          <span className="whitespace-nowrap">{card.linkText}</span>
                          <span className="w-5 h-5 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#4169E1] flex items-center justify-center text-[11px] font-bold transition-all transform group-hover:translate-x-1 shrink-0">
                            →
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Mobile Prev/Next Arrows & Pagination */}
          <div className="flex md:hidden items-center justify-between mt-6 px-2 sm:px-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Previous slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <div className="mobile-solutions-pagination flex justify-center gap-2"></div>
            <button
              onClick={() => swiperRef.current?.slideNext()}
              className="solutions-nav-btn w-10 h-10 rounded-full border border-zinc-800 bg-zinc-900/90 hover:bg-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-200 transition-all active:scale-95 shadow-sm cursor-pointer"
              aria-label="Next slide"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionsSection;