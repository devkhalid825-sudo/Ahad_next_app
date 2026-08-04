'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { apiCall, SITE_URL, getImgSrc } from '@/utils/api';

import 'swiper/css';
import 'swiper/css/free-mode';

const hero = getImgSrc('/assets/ElipseImages/projects/News1.webp');
const elephantImg = getImgSrc('/assets/ElipseImages/projects/Animation4.webp');
const hero4 = getImgSrc('/assets/ElipseImages/projects/elipse-artitecture.webp');
const configuratorHero = getImgSrc('/assets/ElipseImages/blogs/jetour.webp');
const arThumbnail = getImgSrc('/assets/ElipseImages/projects/AR.webp');
const volveImg = getImgSrc('/assets/ElipseImages/hero/volve-configrator.webp');
const questImg = getImgSrc('/assets/ElipseImages/blogs/quest.3.webp');
const mainHeroImage = getImgSrc('/assets/ElipseImages/blogs/Ar.webp');
const animationMainImg = getImgSrc('/assets/ElipseImages/projects/Animation.webp');
const furnitureImg = getImgSrc('/assets/ElipseImages/blogs/alnoor.webp');
const edu1 = getImgSrc('/assets/images/edu-1.webp');
const vrHero = getImgSrc('/assets/images/1 (1).webp');
const techBg = getImgSrc('/assets/ElipseImages/blogs/blogs-Ar.webp');
const articleImg1 = getImgSrc('/assets/article-img/A (3) .webp');
const articleImg6 = getImgSrc('/assets/ElipseImages/projects/Artictecture.webp');

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
    if (initialBlogs !== null) return;
    const fetchBlogs = async () => {
      try {
        const { data, status } = await apiCall('/blogs', 'GET');
        if (status === 200 && Array.isArray(data)) {
          setApiBlogs(mapBlogs(data));
        }
      } catch {
        /* ignore */
      }
    };
    fetchBlogs();
  }, [initialBlogs]);

  const staticPosts = [
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

  const apiUrls = new Set(apiBlogs.map((b) => b.url));
  const mergedApiBlogs = apiBlogs.map((b) => ({ ...b, _key: `api-${b.id}` }));
  const mergedStaticPosts = staticPosts
    .filter((p) => !apiUrls.has(p.url))
    .map((p) => ({ ...p, _key: `static-${p.id}` }));
  const blogPosts = [...mergedApiBlogs, ...mergedStaticPosts];

  return (
    <section
      id="news"
      className="w-full bg-[#1e2d6e] py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative"
    >
      <div className="w-full relative">
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
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
          spaceBetween={15}
          freeMode={true}
          grabCursor={true}
          className="!overflow-visible px-0"
        >
          {blogPosts.map((post) => (
            <SwiperSlide key={post._key} className="!w-[220px] md:!w-[577px] py-2 md:py-4">
              <div className="w-full h-full">
                <div
                  className="relative w-full h-[280px] md:h-[637px] bg-[#323235] rounded-[24px] md:rounded-[48px] flex flex-col p-3 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d]"
                  style={{ boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px' }}
                >
                  <div className="w-full h-[150px] md:h-[380px] rounded-[16px] md:rounded-[36px] overflow-hidden border border-white/5 group">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 object-center"
                    />
                  </div>
                  <div className="flex-1 flex flex-col md:px-6 px-3 md:py-8 py-3">
                    <div className="hidden md:flex items-center gap-4 text-white/70 text-sm mb-6">
                      <span>{post.date}</span>
                      <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>
                      <span>{post.category}</span>
                      <span className="w-1 h-1 bg-[#4169E1] rounded-full"></span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-white md:text-[22px] text-[13px] font-medium leading-tight line-clamp-3">
                      {post.title}
                    </h3>
                    <div className="mt-auto">
                      {post.url.startsWith('http') ? (
                        <a
                          href={post.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4"
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
                              className="w-4 h-4 md:w-7 md:h-7"
                            >
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </a>
                      ) : (
                        <Link
                          href={post.url}
                          className="group flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4"
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
                              className="w-4 h-4 md:w-7 md:h-7"
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
