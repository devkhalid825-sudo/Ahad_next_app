'use client';

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';
import { apiCall, SITE_URL, getImgSrc } from '../utils/api';

import heroRaw from '../assets/ElipseImages/projects/News1.webp';
import elephantImgRaw from '../assets/ElipseImages/projects/Animation4.webp';
import hero4Raw from '../assets/ElipseImages/projects/elipse-artitecture.webp';
import configuratorHeroRaw from '../assets/ElipseImages/blogs/jetour.webp';
import arThumbnailRaw from '../assets/ElipseImages/projects/AR.webp';
import volveImgRaw from '../assets/ElipseImages/hero/volve-configrator.webp';
import vrImgRaw from '../assets/ElipseImages/projects/VR1.webp';
import questImgRaw from '../assets/ElipseImages/blogs/quest.3.webp';
import mainHeroImageRaw from '../assets/ElipseImages/blogs/Ar.webp';
import animationMainImgRaw from '../assets/ElipseImages/projects/Animation.webp';
import furnitureImgRaw from '../assets/ElipseImages/blogs/alnoor.webp';
import edu1Raw from '../assets/images/edu-1.webp';
import vrHeroRaw from '../assets/images/1 (1).webp';
import techBgRaw from '../assets/ElipseImages/blogs/blogs-Ar.webp';
import articleImg1Raw from '../assets/article-img/A (3) .webp';
import articleImg2Raw from '../assets/article-img/A (5) .webp';
import articleImg3Raw from '../assets/article-img/A (4) .webp';
import articleImg5Raw from '../assets/article-img/A (6) .webp';
import articleImg6Raw from '../assets/ElipseImages/projects/Artictecture.webp';

const hero = getImgSrc(heroRaw);
const elephantImg = getImgSrc(elephantImgRaw);
const hero4 = getImgSrc(hero4Raw);
const configuratorHero = getImgSrc(configuratorHeroRaw);
const arThumbnail = getImgSrc(arThumbnailRaw);
const volveImg = getImgSrc(volveImgRaw);
const vrImg = getImgSrc(vrImgRaw);
const questImg = getImgSrc(questImgRaw);
const mainHeroImage = getImgSrc(mainHeroImageRaw);
const animationMainImg = getImgSrc(animationMainImgRaw);
const furnitureImg = getImgSrc(furnitureImgRaw);
const edu1 = getImgSrc(edu1Raw);
const vrHero = getImgSrc(vrHeroRaw);
const techBg = getImgSrc(techBgRaw);
const articleImg1 = getImgSrc(articleImg1Raw);
const articleImg2 = getImgSrc(articleImg2Raw);
const articleImg3 = getImgSrc(articleImg3Raw);
const articleImg5 = getImgSrc(articleImg5Raw);
const articleImg6 = getImgSrc(articleImg6Raw);


import 'swiper/css';
import 'swiper/css/free-mode';

const mapBlogs = (data) => data.map(b => ({
  id: b.id,
  title: b.title,
  image: b.image,
  date: b.date || new Date(b.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).toUpperCase(),
  category: b.category,
  readTime: Math.max(1, Math.ceil((b.content || '').replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length / 200)) + ' min read',
  url: '/blog/' + b.slug
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
      } catch { /* ignore */ }
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
      url: '/blog/apparel-configurator-fashion-brands-2026'
    },
    {
      id: 17,
      title: 'What Is Architectural Visualization? A Complete Guide for Property Developers',
      image: articleImg6,
      date: 'June 09, 2026',
      category: 'Real Estate',
      readTime: '9 min read',
      url: '/blog/architectural-visualization-guide'
    },
    {
      id: 15,
      title: 'Trusted VR Services Company for Custom Development in 2026',
      image: vrHero,
      date: 'June 02, 2026',
      category: 'VR/AR',
      readTime: '20 min read',
      url: '/blog/vr-custom-development-2026'
    },
    {
      id: 14,
      title: 'Educational Animation Services for E-Learning Platforms in 2026',
      image: edu1,
      date: 'June 02, 2026',
      category: 'Education',
      readTime: '15 min read',
      url: '/blog/educational-animation-2026'
    },
    {
      id: 13,
      title: 'Configurator Solutions for Custom Furniture Brands in USA 2026',
      image: furnitureImg,
      date: 'May 11, 2026',
      category: 'Innovation',
      readTime: '12 min read',
      url: '/blog/furniture-configurator-2026'
    },
    {
      id: 12,
      title: 'Why Animated Videos Boost Customer Engagement in 2026',
      image: animationMainImg,
      date: 'May 11, 2026',
      category: 'Marketing',
      readTime: '22 min read',
      url: '/blog/animated-videos-engagement'
    },
    {
      id: 11,
      title: 'AR vs. VR vs. MR: Which Immersive Technology Will Transform Your Brand in 2026?',
      image: mainHeroImage,
      date: 'May 11, 2026',
      category: 'Strategy',
      readTime: '30 min read',
      url: '/blog/immersive-tech-2026'
    },
    {
      id: 9,
      title: 'How Virtual Reality Is Reshaping the Way We Work and Experience the World',
      image: questImg,
      date: 'May 05, 2026',
      category: 'Innovation',
      readTime: '25 min read',
      url: '/blog/vr-reshaping-world'
    },
    {
      id: 8,
      title: 'How Automotive Configurators Are Redefining the Car Buying Experience',
      image: volveImg,
      date: 'May 08, 2026',
      category: 'Automotive',
      readTime: '20 min read',
      url: '/blog/automotive-configurator'
    },
    {
      id: 10,
      title: 'What Is Immersive Experience Design and Why Brands Need It in 2026',
      image: techBg,
      date: 'May 10, 2026',
      category: 'Strategy',
      readTime: '15 min read',
      url: '/blog/immersive-experience-design'
    },
    {
      id: 6,
      title: 'Book Professional Industrial Animation for Your Brand Today',
      image: elephantImg,
      date: 'May 06, 2026',
      category: 'Animation',
      readTime: '18 min read',
      url: '/blog/industrial-animation'
    },
    {
      id: 0,
      title: 'The Future of Interactive Product Customization',
      image: configuratorHero,
      date: 'May 02, 2026',
      category: 'Innovation',
      readTime: '15 min read',
      url: '/blog/web-based-configurator'
    },
    {
      id: 5,
      title: 'What Is Immersive AR Marketing in 2026',
      image: arThumbnail,
      date: 'May 04, 2026',
      category: 'AR/VR',
      readTime: '12 min read',
      url: '/blog/immersive-ar-marketing'
    },
    {
      id: 2,
      title: 'Elipse Studio Landing ',
      image: hero,
      date: 'Jan 29, 2026',
      category: 'Design Inspiration',
      readTime: '12 min read',
      url: `${SITE_URL}/capabilities`
    },
    {
      id: 4,
      title: 'Elipse Studio Architectures',
      image: hero4,
      date: 'Dec 28, 2025',
      category: 'Innovation',
      readTime: '7 min read',
      url: `${SITE_URL}/services/architectural-visualization`
    }
  ];

  const apiUrls = new Set(apiBlogs.map(b => b.url));
  const mergedApiBlogs = apiBlogs.map(b => ({ ...b, _key: `api-${b.id}` }));
  const mergedStaticPosts = staticPosts
    .filter(p => !apiUrls.has(p.url))
    .map(p => ({ ...p, _key: `static-${p.id}` }));
  const blogPosts = [...mergedApiBlogs, ...mergedStaticPosts];

  return (
    <section id="news" className="w-full bg-[#1e2d6e] py-8 md:py-14 overflow-hidden font-sans flex flex-col justify-center relative">
      <div className="w-full relative">
        {/* HEADER */}
        <div className="flex justify-between items-center px-[15px] md:px-[40px] gap-2">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-[1.1] text-white">
            Latest News & Blogs
          </h2>
          <Link
            to="/blog"
            className="rounded-full text-[11px] md:text-base bg-white text-[#4169E1] font-bold py-1.5 px-4 md:py-2 md:px-8 shadow-sm hover:scale-105 transition flex items-center justify-center whitespace-nowrap flex-shrink-0"
          >
            View All
          </Link>
        </div>

        {/* SWIPER */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          slidesPerView="auto"
          spaceBetween={15}
          breakpoints={{
            768: {
              slidesOffsetBefore: 15
            },
            1024: {
              slidesOffsetBefore: 15
            }
          }}
          freeMode={true}
          grabCursor={true}
          className="!overflow-visible px-0"
        >
          {blogPosts.map((post) => (
            <SwiperSlide
              key={post._key}
              className="!w-[220px] md:!w-[577px] py-2 md:py-4"
            >
              <div className="w-full h-full">
                <div
                  className="relative w-full h-[280px] md:h-[637px] bg-[#323235] rounded-[24px] md:rounded-[48px] flex flex-col p-3 md:p-6 transition-all duration-300 hover:-translate-y-2 ring-[4px] md:ring-[8px] ring-[#2b2b2d] will-change-transform"
                  style={{
                    boxShadow: 'rgba(0,0,0,0.3) 0px 10px 30px -5px'
                  }}
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
                    <div className="md:hidden flex items-center gap-2 text-white/80 text-[11px] mb-4">
                      <span>{post.date}</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4169E1]"></span>
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
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-7 md:h-7">
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </div>
                        </a>
                      ) : (
                        <Link
                          to={post.url}
                          className="group flex items-center justify-between w-full text-white text-[13px] md:text-md mt-4"
                        >
                          <span>Learn More</span>
                          <div className="bg-white/10 p-1.5 md:p-3 rounded-full border border-white/10 group-hover:translate-x-1 transition">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 md:w-7 md:h-7">
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
