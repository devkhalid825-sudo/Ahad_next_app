'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { apiCall, getImgSrc, toCdnUrl } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';

import articleImg1Raw from '../../assets/article-img/A (3) .webp';
import articleImg6Raw from '../../assets/ElipseImages/projects/Artictecture.webp';
import vrHeroRaw from '../../assets/images/1 (1).webp';
import configuratorCardRaw from '../../assets/ElipseImages/personal/leap-hero.webp';
import volvoHeroRaw from '../../assets/ElipseImages/hero/volve-configrator.webp';
import techBgRaw from '../../assets/ElipseImages/blogs/blogs-Ar.webp';
import steeringImgRaw from '../../assets/ElipseImages/projects/Streeing-1.webp';
import vfxImgRaw from '../../assets/About-page/QORDEN.webp';
import ahmedFoodRaw from '../../assets/Ahmed-food/jam&spread/15.webp';
import renderingImgRaw from '../../assets/Ahmed-food/jelly/03.webp';
import kiaRaw from '../../assets/About-page/kia.webp';
import spatialCommerceRaw from '../../assets/About-page/spatial-commerce.png';
import highTicketRaw from '../../assets/About-page/high-ticket.png';
import sharkRaw from '../../assets/About-page/shark.webp';
import marineRaw from '../../assets/About-page/marine.webp';
import timBarthRaw from '../../assets/About-page/tim-barth.webp';
import modernVillaRaw from '../../assets/About-page/Nevegan.jpg';
import furnitureRaw from '../../assets/ElipseImages/blogs/alnoor.webp';
import jetourRaw from '../../assets/About-page/Jetour.webp';

const jetourImg = getImgSrc(jetourRaw);
const modernVilla = getImgSrc(modernVillaRaw);
const furnitureImg = getImgSrc(furnitureRaw);
const articleImg1 = getImgSrc(articleImg1Raw);
const articleImg6 = getImgSrc(articleImg6Raw);
const vrHero = getImgSrc(vrHeroRaw);
const configuratorCard = getImgSrc(configuratorCardRaw);
const volvoHero = getImgSrc(volvoHeroRaw);
const techBg = getImgSrc(techBgRaw);
const steeringImg = getImgSrc(steeringImgRaw);
const vfxImg = getImgSrc(vfxImgRaw);
const ahmedFoodImg = getImgSrc(ahmedFoodRaw);
const renderingImg = getImgSrc(renderingImgRaw);
const kiaImg = getImgSrc(kiaRaw);
const spatialCommerceImg = getImgSrc(spatialCommerceRaw);
const highTicketImg = getImgSrc(highTicketRaw);
const shark = getImgSrc(sharkRaw);
const marineImg = getImgSrc(marineRaw);
const timBarth = getImgSrc(timBarthRaw);

const getImageSrc = (image) => {
  if (!image) return articleImg1;
  let src = image;
  if (typeof src === 'object') src = src.url || src.src || '';
  if (typeof src !== 'string' || !src.trim()) return articleImg1;
  // Always prefer the production CDN for upload images
  const cdn = toCdnUrl(src);
  if (cdn && cdn !== src) return cdn;
  if (src.startsWith('/uploads/') || src.startsWith('/media/')) return `${BACKEND_ORIGIN}${src}`;
  return src;
};

const mapBlogs = (data) =>
  data.map((b) => ({
    id: b.id,
    title: b.title,
    image: b.image,
    date:
      b.date ||
      new Date(b.createdAt)
        .toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        .toUpperCase(),
    category: b.category,
    readTime:
      Math.max(
        1,
        Math.ceil(
          (b.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200
        )
      ) + ' min read',
    url: '/blog/' + b.slug,
  }));

const News = ({ initialBlogs = null }) => {
  const [apiBlogs, setApiBlogs] = useState(initialBlogs ? mapBlogs(initialBlogs) : []);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialBlogs) return;
    let cancelled = false;
    const fetchBlogs = async () => {
      try {
        const { data, status } = await apiCall('/blogs', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data)) {
          setApiBlogs(mapBlogs(data));
        }
      } catch {
        /* keep initialBlogs as fallback */
      }
    };
    fetchBlogs();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const staticPosts = [
    {
      id: 36,
      title: 'Commercial CGI vs Traditional Product Photography: Why High-Growth CPG Brands Cut Production Timelines by 70% with 3D Pipelines',
      image: renderingImg,
      date: 'OCTOBER 29, 2026',
      category: 'Commercial CGI & 3D Packaging',
      readTime: '11 min read',
      url: '/blog/commercial-cgi-vs-traditional-product-photography',
    },
    {
      id: 35,
      title: 'Unreal Engine 5 Pixel Streaming vs WebGL: The Enterprise Decision Framework for Interactive 3D (2026)',
      image: jetourImg,
      date: 'OCTOBER 27, 2026',
      category: '3D Engine Architecture',
      readTime: '12 min read',
      url: '/blog/unreal-engine-5-pixel-streaming-vs-webgl-2026',
    },
    {
      id: 34,
      title: 'Spatial Commerce for High-Ticket B2B & Luxury Retail: The 2026 Conversion and Return-Rate Benchmark Report',
      image: highTicketImg,
      date: 'OCTOBER 26, 2026',
      category: 'Spatial Commerce & B2B',
      readTime: '8 min read',
      url: '/blog/spatial-commerce-b2b-luxury-retail-2026-benchmark',
    },
    {
      id: 33,
      title: 'Real-Time ArchViz & Spatial VR: How Luxury Real Estate Developers Presell Properties 6–12 Months Before Groundbreak',
      image: modernVilla,
      date: 'OCTOBER 22, 2026',
      category: 'Architectural Visualisation',
      readTime: '10 min read',
      url: '/blog/real-time-archviz-vr-luxury-real-estate-presales-2026',
    },
    {
      id: 32,
      title: '3D Product Configurators for Australian E-Commerce Brands (2026 Guide)',
      image: kiaImg,
      date: 'OCTOBER 21, 2026',
      category: '3D Configurators AU',
      readTime: '9 min read',
      url: '/blog/3d-product-configurator-australia-2026',
    },
    {
      id: 31,
      title: 'CAD to WebGL: How Enterprise Brands Convert Heavy Engineering Files into Sub-2MB Interactive 3D Web Experiences (2026 Guide)',
      image: shark,
      date: 'OCTOBER 14, 2026',
      category: 'WebGL Engineering',
      readTime: '8 min read',
      url: '/blog/cad-to-webgl-enterprise-3d-optimization-pipeline-2026',
    },
    {
      id: 30,
      title: 'Automotive 3D Configurators: How Next-Gen Car Visualizers Drive Dealership Foot Traffic and Online Reservations (2026 Benchmark)',
      image: volvoHero,
      date: 'OCTOBER 12, 2026',
      category: 'Automotive 3D',
      readTime: '10 min read',
      url: '/blog/automotive-3d-configurator-dealership-conversion-2026',
    },
    {
      id: 28,
      title: '3D Architectural Visualisation for UK Property Developers: The 2026 Guide',
      image: timBarth,
      date: 'OCTOBER 10, 2026',
      category: 'Architectural Visualisation',
      readTime: '13 min read',
      url: '/blog/3d-architectural-visualisation-uk-property-developers-guide',
    },
    {
      id: 29,
      title: 'AR Product Visualization for Ecommerce Brands: The 2026 Guide',
      image: techBg,
      date: 'OCTOBER 8, 2026',
      category: 'AR & Ecommerce',
      readTime: '11 min read',
      url: '/blog/ar-product-visualization-ecommerce-brands-2026-guide',
    },
    {
      id: 27,
      title: 'Cinematic CGI and Interactive 3D: Why High-Growth Brands Need a Unified Pipeline in 2026',
      image: marineImg,
      date: 'OCTOBER 6, 2026',
      category: 'Commercial 3D Strategy',
      readTime: '12 min read',
      url: '/blog/interactive-3d-vs-cgi-production-pipeline-2026',
    },
    {
      id: 25,
      title: 'Why Your Product Photography Budget Is Going to the Wrong Place in 2026',
      image: renderingImg,
      date: 'OCTOBER 3, 2026',
      category: '3D Product Rendering',
      readTime: '9 min read',
      url: '/blog/why-product-photography-budget-3d-rendering-2026',
    },
    {
      id: 26,
      title: 'Virtual Showrooms vs Physical Retail: The 2026 Financial Case and ROI Benchmarks',
      image: kiaImg,
      date: 'OCTOBER 1, 2026',
      category: 'Enterprise Strategy',
      readTime: '11 min read',
      url: '/blog/virtual-showrooms-vs-physical-retail-2026-roi-guide',
    },
    {
      id: 20,
      title: 'WebGL vs. Unreal Engine 3D Configurator: Which is Better for Your Business?',
      image: volvoHero,
      date: 'SEPTEMBER 19, 2026',
      category: '3D Configurators',
      readTime: '12 min read',
      url: '/blog/webgl-vs-unreal-engine-3d-configurator',
    },
    {
      id: 21,
      title: 'How Brands Are Replacing 150 Photoshoots with a Single 3D Master Model',
      image: ahmedFoodImg,
      date: 'SEPTEMBER 21, 2026',
      category: '3D Animation',
      readTime: '11 min read',
      url: '/blog/3d-animation-services-uk-2026',
    },
    {
      id: 22,
      title: "Can a 3D Web Configurator Load in Under 1.5 Seconds on Mobile? (Here's How We Did It)",
      image: steeringImg,
      date: 'SEPTEMBER 21, 2026',
      category: '3D Configurators',
      readTime: '10 min read',
      url: '/blog/interactive-web-experiences-au-2026',
    },
    {
      id: 23,
      title: 'The Optical Illusion Effect: Why Anamorphic 3D Billboards Stop Crowds in Their Tracks',
      image: vfxImg,
      date: 'SEPTEMBER 21, 2026',
      category: 'Anamorphic Animation',
      readTime: '12 min read',
      url: '/blog/vfx-services-us-2026',
    },
    {
      id: 19,
      title: 'LEAP 2026 Wrap Up: Five Ground Lessons From Riyadh',
      image: configuratorCard,
      date: 'SEPTEMBER 10, 2026',
      category: 'Event & Strategy',
      readTime: '10 min read',
      url: '/blog/leap-2026-wrap-up',
    },
    {
      id: 18,
      title: 'Apparel Configurator for Fashion Brands in 2026: The Complete Guide',
      image: articleImg1,
      date: 'June 09, 2026',
      category: 'Innovation',
      readTime: '14 min read',
      url: '/blog/apparel-configurator-fashion-brands-2026',
    },
    {
      id: 17,
      title: 'What Is Architectural Visualization? A Complete Guide for Property Developers',
      image: articleImg6,
      date: 'June 09, 2026',
      category: 'Real Estate',
      readTime: '9 min read',
      url: '/blog/architectural-visualization-guide',
    },
    {
      id: 15,
      title: 'Trusted VR Services Company for Custom Development in 2026',
      image: vrHero,
      date: 'June 02, 2026',
      category: 'VR/AR',
      readTime: '20 min read',
      url: '/blog/vr-custom-development-2026',
    },
  ];

  const isExcluded = (post) => {
    const t = (post.title || '').toLowerCase();
    const u = (post.url || '').toLowerCase();
    return (
      t.includes('shopify plus') ||
      t.includes('threekit') ||
      t.includes('sketchfab') ||
      u.includes('shopify') ||
      u.includes('threekit')
    );
  };

  const filteredApiBlogs = apiBlogs.filter((b) => !isExcluded(b));
  const apiUrls = new Set(filteredApiBlogs.map((b) => b.url));
  const mergedApiBlogs = filteredApiBlogs.map((b) => ({ ...b, _key: `api-${b.id}` }));
  const mergedStaticPosts = staticPosts
    .filter((p) => !isExcluded(p) && !apiUrls.has(p.url))
    .map((p) => ({ ...p, _key: `static-${p.id}` }));
  const allPosts = [...mergedStaticPosts, ...mergedApiBlogs];

  // Pick top curated featured blogs without manual duplicate cloning (Swiper loop handles infinite looping natively)
  const featuredLoopPosts = allPosts.slice(0, 8);

  return (
    <section
      id="news"
      className="w-full bg-[#1e2d6e] py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative"
    >
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2 mb-6 md:mb-10">
          <h2
            className="news-heading text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] !text-white"
            style={{ color: '#ffffff' }}
          >
            Latest News & Blogs
          </h2>
          <Link
            href="/blog"
            className="rounded-full text-[11px] md:text-base bg-white text-[#4169E1] font-bold py-1.5 px-4 md:py-2 md:px-8 shadow-sm hover:scale-105 transition flex items-center justify-center whitespace-nowrap flex-shrink-0"
          >
            View All
          </Link>
        </div>

        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          slidesPerView="auto"
          spaceBetween={16}
          speed={900}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          freeMode={false}
          grabCursor={true}
          className="!overflow-visible !px-[15px] md:!px-0"
        >
          {featuredLoopPosts.map((post) => (
            <SwiperSlide key={post._key} className="!w-[230px] sm:!w-[340px] md:!w-[540px] lg:!w-[577px] py-2 md:py-4">
              <div className="w-full h-full">
                <div
                  className="relative w-full h-[290px] sm:h-[380px] md:h-[637px] bg-[#323235] rounded-[24px] md:rounded-[48px] flex flex-col p-3.5 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d]"
                  style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                >
                  <div className="w-full h-[150px] sm:h-[200px] md:h-[380px] rounded-[16px] md:rounded-[36px] overflow-hidden border border-white/5 group">
                    <img
                      src={getImageSrc(post.image)}
                      alt={post.title}
                      width="577"
                      height="380"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{ objectPosition: '50% 30%' }}
                    />
                  </div>
                  <div className="flex-1 flex flex-col md:px-6 px-2.5 md:py-8 py-3">
                    {post.date && (
                      <div className="flex items-center text-white/70 text-xs md:text-sm mb-3 md:mb-6">
                        <span>{post.date}</span>
                      </div>
                    )}
                    <h3 className="text-white md:text-[22px] text-[13px] font-medium leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="mt-auto">
                      {post.url.startsWith('http') ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between w-full text-white text-[13px] md:text-base mt-4"
                        >
                          <span>Learn More</span>
                          <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover:translate-x-1 transition">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 md:w-6 md:h-6"
                            >
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </a>
                      ) : (
                        <Link
                          href={post.url}
                          className="group flex items-center justify-between w-full text-white text-[13px] md:text-base mt-4"
                        >
                          <span>Learn More</span>
                          <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover:translate-x-1 transition">
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4 md:w-6 md:h-6"
                            >
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default News;
