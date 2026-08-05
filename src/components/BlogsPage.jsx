'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BACKEND_ORIGIN } from '../utils/api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LatestWork from './features/LatestWork';
import Contact from './features/Contact';
import { motion } from 'framer-motion';
import { FiEye, FiSearch } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import { apiCall, getImgSrc } from '../utils/api';

// Assets — only import what is actually used
import elephantImgRaw from '../assets/ElipseImages/projects/Animation4.webp';
import configuratorHeroRaw from '../assets/ElipseImages/blogs/jetour.webp';
import arThumbnailRaw from '../assets/ElipseImages/projects/AR.webp';
import heroRaw from '../assets/ElipseImages/projects/News1.webp';
import hero4Raw from '../assets/ElipseImages/projects/elipse-artitecture.webp';
import techBgRaw from '../assets/ElipseImages/blogs/blogs-Ar.webp';
import volveImgRaw from '../assets/ElipseImages/hero/volve-configrator.webp';
import questImgRaw from '../assets/ElipseImages/blogs/quest.3.webp';
import mainHeroImageRaw from '../assets/ElipseImages/blogs/Ar.webp';
import animationMainImgRaw from '../assets/ElipseImages/projects/Animation.webp';
import furnitureImgRaw from '../assets/ElipseImages/blogs/alnoor.webp';
import edu1Raw from '../assets/images/edu-1.webp';
import vrHeroRaw from '../assets/images/1 (1).webp';
import articleImg1Raw from '../assets/article-img/A (3) .webp';
import articleImg2Raw from '../assets/article-img/A (5) .webp';

const elephantImg = getImgSrc(elephantImgRaw);
const configuratorHero = getImgSrc(configuratorHeroRaw);
const arThumbnail = getImgSrc(arThumbnailRaw);
const hero = getImgSrc(heroRaw);
const hero4 = getImgSrc(hero4Raw);
const techBg = getImgSrc(techBgRaw);
const volveImg = getImgSrc(volveImgRaw);
const questImg = getImgSrc(questImgRaw);
const mainHeroImage = getImgSrc(mainHeroImageRaw);
const animationMainImg = getImgSrc(animationMainImgRaw);
const furnitureImg = getImgSrc(furnitureImgRaw);
const edu1 = getImgSrc(edu1Raw);
const vrHero = getImgSrc(vrHeroRaw);
const articleImg1 = getImgSrc(articleImg1Raw);
const articleImg2 = getImgSrc(articleImg2Raw);

const staticImages = {
    elephantImg, configuratorHero, arThumbnail, hero, hero4, techBg, volveImg,
    questImg, mainHeroImage, animationMainImg, furnitureImg, edu1, vrHero,
    articleImg1, articleImg2
};

const staticPosts = [
    {
        id: 'static-1',
        title: 'How Web-Based Configurators Are Transforming Product Sales',
        excerpt: 'Web-based configurators let users customize products to exact specifications. Explore how interactive 3D tools drive conversions, reduce returns, and improve customer satisfaction.',
        image: configuratorHero,
        date: '2026-01-15',
        category: '3D Configurators',
        url: '/blog/web-based-configurator',
    },
    {
        id: 'static-2',
        title: 'What Is Immersive AR Marketing?',
        excerpt: 'AR marketing blends digital content with the real world. Learn how WebAR, 5G, and immersive experiences are transforming brand engagement in 2026.',
        image: arThumbnail,
        date: '2026-01-20',
        category: 'AR Marketing',
        url: '/blog/immersive-ar-marketing',
    },
    {
        id: 'static-3',
        title: 'Industrial 3D Animation: Communicating Complexity Visually',
        excerpt: 'Industrial animation turns complex machinery, processes, and systems into clear visual stories. Learn how 3D animation drives understanding across manufacturing, energy, and engineering.',
        image: elephantImg,
        date: '2026-02-01',
        category: '3D Animation',
        url: '/blog/industrial-animation',
    },
    {
        id: 'static-4',
        title: 'Automotive 3D Configurator: The Future of Car Buying',
        excerpt: 'Real-time 3D configurators are reshaping how customers choose, personalize, and commit to vehicle purchases. Discover the technology behind the next generation of automotive retail.',
        image: volveImg,
        date: '2026-02-10',
        category: '3D Configurators',
        url: '/blog/automotive-configurator',
    },
    {
        id: 'static-5',
        title: 'How VR Is Reshaping the World',
        excerpt: 'Virtual reality is moving from novelty to necessity across industries. Explore how VR is transforming real estate, healthcare, education, and retail in 2026.',
        image: questImg,
        date: '2026-02-20',
        category: 'VR Development',
        url: '/blog/vr-reshaping-world',
    },
    {
        id: 'static-6',
        title: 'Immersive Experience Design: Principles & Best Practices',
        excerpt: 'Great immersive experiences are built on clarity, emotion, and interactivity. Learn the core design principles that separate memorable digital experiences from forgettable ones.',
        image: mainHeroImage,
        date: '2026-03-01',
        category: 'Immersive Design',
        url: '/blog/immersive-experience-design',
    },
    {
        id: 'static-7',
        title: 'Top Immersive Tech Trends to Watch in 2026',
        excerpt: 'From spatial computing to AI-driven AR, 2026 is a defining year for immersive technology. We break down the biggest trends shaping the next wave of digital experiences.',
        image: hero4,
        date: '2026-03-10',
        category: 'Technology',
        url: '/blog/immersive-tech-2026',
    },
    {
        id: 'static-8',
        title: 'Why Animated Videos Drive More Engagement Than Static Content',
        excerpt: 'Animation captures attention, simplifies complex ideas, and drives measurable engagement. Explore why brands are shifting to animated content as a core marketing strategy.',
        image: animationMainImg,
        date: '2026-03-20',
        category: '3D Animation',
        url: '/blog/animated-videos-engagement',
    },
    {
        id: 'static-9',
        title: 'Furniture 3D Configurator: How Brands Sell More in 2026',
        excerpt: 'Furniture brands using real-time 3D configurators see higher conversions and fewer returns. Discover how interactive customization is reshaping furniture e-commerce.',
        image: furnitureImg,
        date: '2026-04-01',
        category: '3D Configurators',
        url: '/blog/furniture-configurator-2026',
    },
    {
        id: 'static-10',
        title: 'Educational Animation in 2026: Transforming How We Learn',
        excerpt: 'Educational animation makes complex concepts accessible, engaging, and memorable. See how institutions and brands are using 3D animation to revolutionize learning.',
        image: edu1,
        date: '2026-04-10',
        category: '3D Animation',
        url: '/blog/educational-animation-2026',
    },
    {
        id: 'static-11',
        title: 'Custom VR Development Services in 2026',
        excerpt: 'Off-the-shelf VR isn\'t enough anymore. Explore why leading brands invest in custom VR development and what it takes to build truly immersive virtual experiences.',
        image: vrHero,
        date: '2026-04-20',
        category: 'VR Development',
        url: '/blog/vr-custom-development-2026',
    },
    {
        id: 'static-12',
        title: '3D Real-Time Configurators for Real Estate in Dubai',
        excerpt: 'Dubai\'s real estate market is embracing 3D configurators to let buyers customize units before they\'re built. Learn how this technology is accelerating off-plan sales.',
        image: articleImg1,
        date: '2026-05-01',
        category: '3D Configurators',
        url: '/blog/3d-real-time-configurators-real-estate-dubai',
    },
    {
        id: 'static-13',
        title: 'Architectural Visualization: The Complete Guide',
        excerpt: 'Architectural visualization transforms blueprints into photorealistic renders, walkthroughs, and interactive experiences. This guide covers every format, use case, and tool.',
        image: hero,
        date: '2026-05-10',
        category: 'Architectural Visualization',
        url: '/blog/architectural-visualization-guide',
    },
    {
        id: 'static-14',
        title: 'Apparel 3D Configurator for Fashion Brands in 2026',
        excerpt: 'Fashion brands using 3D configurators give customers the ability to design their own garments in real time. Explore how this technology is transforming apparel retail.',
        image: articleImg2,
        date: '2026-05-20',
        category: '3D Configurators',
        url: '/blog/apparel-configurator-fashion-brands-2026',
    },
];


const getImageSrc = (image) => {
    if (!image) return '';
    if (typeof image === 'string') {
        if (image.startsWith('http')) return image;
        if (image.startsWith('/uploads/')) return `${BACKEND_ORIGIN}${image}`;
        return image;
    }
    if (typeof image === 'object') {
        const u = image.url || image.src || image.srcSet;
        if (typeof u === 'string') {
            if (u.startsWith('http')) return u;
            if (u.startsWith('/uploads/')) return `${BACKEND_ORIGIN}${u}`;
            return u;
        }
    }
    return '';
};

const BlogCard = ({ post, eager = false }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="group relative flex flex-col rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#161617] min-h-[400px] md:h-[540px] transition-all duration-300 hover:-translate-y-2 shadow-2xl"
    >
        {/* IMAGE CONTAINER */}
        <div className="w-full h-[180px] md:h-[280px] p-3 md:p-5 pb-0">
            <div className="w-full h-full rounded-t-[20px] md:rounded-t-[32px] overflow-hidden relative">
                <img
                    src={getImageSrc(post.image)}
                    alt={post.title}
                    loading={eager ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="bg-black/40 backdrop-blur-md text-white p-2 md:p-3 rounded-full absolute top-4 left-4 shadow-xl z-20">
                    <FiEye className="w-4 h-4 md:w-5 md:h-5" />
                </div>
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 flex flex-col items-start justify-between p-5 md:p-8 bg-white text-[#1a1a1a] transition-colors group-hover:bg-zinc-50 relative z-10">
            <div className="w-full">
                <div className="flex items-center gap-2 text-[9px] md:text-[11px] font-bold opacity-40 mb-2 uppercase tracking-wide">
                    <span>{post.date}</span>
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                    <span>{post.category}</span>
                </div>
                <h3 className="text-[14px] md:text-[22px] font-black uppercase leading-[1.2] line-clamp-2 md:line-clamp-3 tracking-tight">
                    {post.title}
                </h3>
            </div>

            <div className="w-full pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest opacity-80">Learn More</span>
                <div className="bg-gray-50 p-2 md:p-3 rounded-full transition-transform group-hover:rotate-45">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4 md:w-5 md:h-5">
                        <line x1="7" y1="17" x2="17" y2="7"></line>
                        <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                </div>
            </div>

            {post.url.startsWith('http') ? (
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 z-10"
                />
            ) : (
                <Link
                    to={post.url}
                    className="absolute inset-0 z-10"
                />
            )}
        </div>
    </motion.div>
);

const BlogCardSkeleton = () => (
    <div className="group relative flex flex-col rounded-[32px] md:rounded-[48px] overflow-hidden bg-[#161617] min-h-[400px] md:h-[540px]">
        <div className="w-full h-[180px] md:h-[280px] p-3 md:p-5 pb-0">
            <div className="w-full h-full rounded-t-[20px] md:rounded-t-[32px] overflow-hidden relative bg-[#1f1f21] animate-pulse" />
        </div>
        <div className="flex-1 flex flex-col items-start justify-between p-5 md:p-8 bg-white">
            <div className="w-full">
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-2.5 w-16 rounded-full bg-gray-200 animate-pulse" />
                    <span className="w-1 h-1 rounded-full bg-blue-500"></span>
                    <div className="h-2.5 w-20 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="h-4 w-full rounded bg-gray-200 animate-pulse mb-2" />
                <div className="h-4 w-4/5 rounded bg-gray-200 animate-pulse mb-2" />
                <div className="h-4 w-2/3 rounded bg-gray-200 animate-pulse" />
            </div>
            <div className="w-full pt-4 md:pt-6 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="h-2.5 w-20 rounded-full bg-gray-200 animate-pulse" />
                <div className="bg-gray-100 p-2 md:p-3 rounded-full">
                    <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-gray-200 animate-pulse" />
                </div>
            </div>
        </div>
    </div>
);

const BlogsPage = ({ initialBlogs }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [apiBlogs, setApiBlogs] = useState(initialBlogs || []);
    const [filteredPosts, setFilteredPosts] = useState(() => {
        if (initialBlogs && initialBlogs.length) {
            const apiUrls = new Set(initialBlogs.map(b => b.url));
            return [...initialBlogs, ...staticPosts.filter(p => !apiUrls.has(p.url))].sort((a, b) => new Date(b.date) - new Date(a.date));
        }
        return staticPosts;
    });
    const [loading, setLoading] = useState(!(initialBlogs && initialBlogs.length));
    const [error, setError] = useState('');

    

    useEffect(() => {
        if (initialBlogs && initialBlogs.length) return;
        const fetchBlogs = async () => {
            try {
                const { data, status } = await apiCall('/blogs', 'GET');
                if (status === 200 && Array.isArray(data)) {
                    const mapped = data.map(b => ({
                        id: b.id,
                        title: b.title,
                        excerpt: b.excerpt,
                        image: b.image,
                        date: b.date,
                        category: b.category,
                        url: '/blog/' + b.slug
                    }));
                    const sorted = mapped.sort((a, b) => new Date(b.date) - new Date(a.date));
                    setApiBlogs(sorted);
                    const apiUrls = new Set(sorted.map(b => b.url));
                    const uniqueStatic = staticPosts.filter(p => !apiUrls.has(p.url));
                    setFilteredPosts([...sorted, ...uniqueStatic].sort((a, b) => new Date(b.date) - new Date(a.date)));
                } else {
                    setError('Failed to load blogs from server');
                }
            } catch (err) {
                console.error('Failed to fetch blogs:', err);
                setError('Failed to load blogs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const allPosts = (() => {
        const apiUrls = new Set(apiBlogs.map(b => b.url));
        const uniqueStatic = staticPosts.filter(p => !apiUrls.has(p.url));
        return [...apiBlogs, ...uniqueStatic].sort((a, b) => new Date(b.date) - new Date(a.date));
    })();

    const handleSearchChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = allPosts.filter(post =>
            post.title.toLowerCase().includes(term) ||
            post.category.toLowerCase().includes(term)
        );
        setFilteredPosts(filtered);
    };return (

    <>

        

        <div className="bg-[#0a0a0a] min-h-screen text-white font-sans selection:bg-[#4169E1] selection:text-black overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative w-full bg-black ">
                <div className="relative mx-auto min-h-screen w-full overflow-hidden bg-zinc-900 shadow-2xl flex flex-col">
                    <Header />
                    <div className="absolute inset-0 z-0">
                        <img
                            src={techBg}
                            alt="Hero Background"
                            fetchPriority="high"
                            loading="eager"
                            decoding="async"
                            className="w-full h-full object-cover opacity-100"
                            style={{ willChange: 'transform' }}
                        />
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
                    </div>

                    <div className="relative z-10 px-8 md:px-20 w-full flex-1 flex flex-col justify-center md:justify-start pt-24 md:pt-44 pb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8 md:mb-12"
                        >
                            <h1 className="text-5xl md:text-[84px] tracking-tighter mb-2 leading-[0.9] font-extralight">
                                <span className="text-white opacity-100 block">Blogs</span>
                                <span className="text-[#4169E1] opacity-90 block">tech & trends</span>
                            </h1>
                        </motion.div>

                        {/* FEATURED CARDS - SWIPER SCROLL */}
                        <div className="w-full mt-8 md:mt-12 featured-swiper-container">
                            <style>{`
                                .featured-swiper .swiper-pagination-bullet {
                                    background: rgba(34, 211, 238, 0.5);
                                    width: 12px;
                                    height: 4px;
                                    border-radius: 2px;
                                    transition: all 0.3s ease;
                                }
                                .featured-swiper .swiper-pagination-bullet-active {
                                    background: #22d3ee;
                                    width: 24px;
                                }
                                .featured-swiper {
                                    padding-bottom: 50px !important;
                                }
                            `}</style>
                            <Swiper
                                modules={[Autoplay, Pagination, FreeMode]}
                                spaceBetween={20}
                                slidesPerView={'auto'}
                                freeMode={true}
                                pagination={{ clickable: true }}
                                loop={true}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: true,
                                }}
                                className="featured-swiper !overflow-visible"
                            >
                                {loading ? (
                                    [0, 1, 2, 3, 4].map((i) => (
                                        <SwiperSlide key={`skeleton-featured-${i}`} className="!w-[300px] md:!w-[450px] lg:!w-[480px]">
                                            <BlogCardSkeleton />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    allPosts.slice(0, 5).map((post, index) => (
                                        <SwiperSlide key={`${post.id}-${index}`} className="!w-[300px] md:!w-[450px] lg:!w-[480px]">
                                            <BlogCard post={post} eager={true} />
                                        </SwiperSlide>
                                    ))
                                )}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>


            <section className="py-12 md:py-24 bg-black">
                <div className="w-full px-8 md:px-20">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase">Latest Articles</h2>

                        {/* SEARCH BAR */}
                        <div className="relative w-full md:w-[450px]">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full bg-white/5 border border-white/10 rounded-full py-4 md:py-5 px-14 focus:outline-none focus:border-[#4169E1] focus:bg-white/10 transition-all text-white placeholder-zinc-500 backdrop-blur-xl"
                            />
                            <FiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#4169E1] w-5 h-5 md:w-6 md:h-6" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                        {loading ? (
                            [0, 1, 2, 3, 4, 5].map((i) => (
                                <div key={`skeleton-grid-${i}`} className="w-full">
                                    <BlogCardSkeleton />
                                </div>
                            ))
                        ) : (
                            filteredPosts.map((post) => (
                                <div key={post.id} className="w-full">
                                    <BlogCard post={post} />
                                </div>
                            ))
                        )}
                    </div>

                    {!loading && filteredPosts.length === 0 && (
                        <div className="text-center py-20 text-zinc-500 text-xl font-light">
                            {error ? error : (searchTerm ? `No articles found matching "${searchTerm}"` : 'No articles yet. Check back soon for new content.')}
                        </div>
                    )}
                </div>
            </section>

            {/* LATEST WORK INTEGRATION */}
            <div className="border-t border-zinc-900">
                <LatestWork />
            </div>

            {/* CONTACT SECTION */}
            <Contact />
            <Footer />
        </div>
    

    </>

    );
};

export default BlogsPage;
