'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCalendar,
  FiMapPin,
  FiCopy,
  FiCheck
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import _leapHero from '../../assets/ElipseImages/personal/leap-hero.webp';
import _leapPartner from '../../assets/ElipseImages/personal/leap-partner.webp';
import _waSep1 from '../../assets/ElipseImages/personal/WhatsApp Image 2026-09-01 at 6.55.45 PM.jpeg';
import _waSep2 from '../../assets/ElipseImages/personal/WhatsApp Image 2026-09-02 at 4.18.12 AM.webp';
import _wa528pm from '../../assets/ElipseImages/personal/WhatsApp Image 2026-09-03 at 2.05.28 PM.webp';
import _wa1258 from '../../assets/ElipseImages/personal/images/WhatsApp Image 2026-09-03 at 1.25.58 AM.webp';
import _digitalTwins from '../../assets/ElipseImages/personal/Digital twins.webp';
import _eLearning from '../../assets/ElipseImages/personal/e-learning.webp';
import _enterpriseValidation from '../../assets/ElipseImages/personal/Enterprise validation.webp';
import _mainPng from '../../assets/ElipseImages/personal/main.webp';
import _configuratorPng from '../../assets/ElipseImages/personal/Configurator.webp';
import _gaming from '../../assets/ElipseImages/personal/gaming.webp';
import _football from '../../assets/ElipseImages/personal/football.webp';
import _f1 from '../../assets/ElipseImages/personal/maaz-bhai-image.png';
import { getImgSrc } from '../../utils/api';

const leapHero = getImgSrc(_leapHero);
const leapPartner = getImgSrc(_leapPartner);
const waSep1 = getImgSrc(_waSep1);
const waSep2 = getImgSrc(_waSep2);
const wa528pm = getImgSrc(_wa528pm);
const wa1258 = getImgSrc(_wa1258);
const digitalTwins = getImgSrc(_digitalTwins);
const eLearning = getImgSrc(_eLearning);
const enterpriseValidation = getImgSrc(_enterpriseValidation);
const mainPng = getImgSrc(_mainPng);
const configuratorPng = getImgSrc(_configuratorPng);
const gamingPng = getImgSrc(_gaming);
const footballPng = getImgSrc(_football);
const f1Png = getImgSrc(_f1);
const leapVideos = [
  '/assets/leap-2026/videos/video-1.mp4',
  '/assets/leap-2026/videos/video-2.mp4',
  '/assets/leap-2026/videos/video-3.mp4',
  '/assets/leap-2026/videos/video-4.mp4',
];

const leapCards = [
  {
    title: '1. The Evolution of Visualization',
    description:
      'Architectural visualization has relied on pre-rendered flythrough videos and static images for decades. Across the LEAP floor, the most compelling showcases were fully interactive.',
    image: leapPartner,
  },
  {
    title: '2. Enterprise Validation: VR and AR Converge',
    description:
      "We have moved past the era where VR was merely an experimental booth attraction. The strongest validation came from the Kingdom's largest enterprises like Aramco and STC.",
    image: waSep1,
  },
  {
    title: '3. Partnering with Regional E-Learning Platforms',
    description:
      'For international studios wondering how to enter the Saudi ecosystem, one of the clearest paths is through regional partnership.',
    image: waSep2,
  },
  {
    title: '4. Digital Twins at National Scale',
    description:
      'Digital twins are transitioning from an industry buzzword to an essential infrastructure requirement across the Kingdom.',
    image: wa528pm,
  },
  {
    title: '5. Anamorphic Content Owns the Attention',
    description:
      'Riyadh has already built extraordinary digital display infrastructure, yet most screens still broadcast traditional flat video.',
    image: wa1258,
  },
];

const Frame = ({ src, cap }) => (
  <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900">
    <img alt={cap} src={src} loading="lazy" decoding="async" className="w-full h-full object-cover" />
    <figcaption className="absolute left-2.5 bottom-2.5 right-2.5 font-serif italic text-[11px] text-white/70 leading-snug">
      {cap}
    </figcaption>
  </figure>
);

const LazyVideo = ({ src, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.src = src;
          el.play().catch(() => { });
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={videoRef} autoPlay loop muted playsInline preload="none" className={className} />;
};

const Leap2026Article = () => {
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' | 'linkedin' | 'twitter' | 'instagram'
  const [copied, setCopied] = useState(false);
  const [activeCard, setActiveCard] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeCard < leapCards.length - 1) setActiveCard(activeCard + 1);
      if (diff < 0 && activeCard > 0) setActiveCard(activeCard - 1);
    }
    setTouchStart(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    const timer = setInterval(() => {
      setActiveCard((prev) => (prev + 1) % leapCards.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToContact = () => {
    setActiveTab('blog');
    setTimeout(() => {
      const journalEl = document.getElementById('journal');
      if (journalEl) {
        journalEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const twitterPosts = [
    {
      id: 1,
      text: "5 practical takeaways from 4 days on the ground at LEAP in Riyadh.\n\nZero generic fluff. Just real market signals for creative tech and 3D studios looking at Saudi Arabia:",
    },
    {
      id: 2,
      text: "1. 3D Interactive Configurators are replacing static renders.\nFlythrough videos no longer cut it for massive projects. Buyers want interaction. A 3D Interactive Configurator drives sales. Separately, Unreal Engine 5 gives the visual fidelity needed before breaking ground.",
    },
    {
      id: 3,
      text: "2. Enterprise is proving VR.\nAramco and STC are deploying VR for high stakes workforce training.\n\nMy personal view: VR and AR will blur completely soon. Step into full VR when needed, or augment the exact same objects directly into your physical room.",
    },
    {
      id: 4,
      text: "3. E learning partnerships.\nRegional platforms want VR training modules but lack in house 3D teams. They are actively seeking external technical partners to build simulations for them. This is the fastest shortcut to enter the market.",
    },
    {
      id: 5,
      text: "4. Digital Twins are a national priority.\nHaramain is looking for partners across four core services, with Digital Twins front and center. Government entities need teams that can build live, data connected virtual assets.",
    },
    {
      id: 6,
      text: "5. Anamorphic 3D owns attention.\nRiyadh has massive screen infrastructure, but most displays run flat video. Anamorphic screens at LEAP stopped foot traffic dead in its tracks. Demand for custom 3D anamorphic content is about to surge.",
    },
    {
      id: 7,
      text: "Had to head to Madinah a day early, Alhamdulillah, but leaving Riyadh to probably do more in the future InshaAllah.\n\nIn new markets, show up in person. Deals happen on trust and experience.",
    },
  ];

  const marqueeItems = [
    'INNOVATE',
    '✦',
    'INSPIRE',
    '✦',
    'CREATE',
    '✦',
    'LEAP 2026',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    'DIGITAL TWINS',
    '✦',
  ];

  return (
    <div data-nav="light" className="w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        <section className="relative bg-white text-neutral-900 py-10 sm:py-16 overflow-hidden mb-8 sm:mb-12">

          {/* Decorative ✦ top-left */}
          <div className="absolute top-8 left-10 text-[#2563EB] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          {/* Decorative arrow top-right */}
          <div className="absolute top-8 right-12 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

            {/* ── Main Center Headline ── */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-8 sm:mb-12 px-4">
              Beyond the Conference Hype:{' '}
              <span className="text-[#2563EB]">Five Ground Reality Lessons</span>{' '}
              from LEAP in Riyadh
            </h1>

            {/* ── 3-Column Content Grid ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 items-center relative">

              {/* Left Column: Intro / Description */}
              <div className="text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Traditional conference recaps offer zero value. Here are five practical lessons and commercial opportunities observed directly on the ground at LEAP for creative tech founders.
                </p>
                <button
                  onClick={handleScrollToContact}
                  className="w-full sm:w-auto px-6 py-3 sm:px-5 sm:py-2.5 rounded-full border border-neutral-300 text-sm sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore Insights
                </button>
              </div>

              {/* Center Column: Hero Image with circular background */}
              <div className="relative flex justify-center px-4 sm:px-0">
                {/* Circular background shape */}
                <div className="absolute w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">⚡</span>
                </div>

                {/* Person photo */}
                <div className="relative w-64 h-[22rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={leapHero}
                    alt="Bilal Lania at LEAP 2026 Riyadh"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Stars + Stats */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  LEAP 2026
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Riyadh Exhibition Floor
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Deals happen on trust. In new markets, you cannot win from behind a desk.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1">— Bilal Lania</p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a 15-min strategy call ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Bilal Lania</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={() => setActiveTab('blog')}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Full Article ↓
              </button>
            </div>

          </div>
        </section>

        <section className="my-16 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ INTRO: A DISPATCH FROM THE FLOOR ══════ */}
        <section className="py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-8">
              <div className="italic text-[#2563EB] text-base mb-4">
                A dispatch from the exhibition floor, Riyadh
              </div>
              <p className="text-xl sm:text-2xl md:text-[28px] leading-snug text-zinc-800 max-w-[38ch] font-sans">
                Sitting down and going through the photos from LEAP, one thing is clear: the Kingdom is not waiting. Capital, procurement, and technical demand are all moving at once.
              </p>
              <a
                href="#journal"
                className="mt-7 inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the five lessons below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-5 rotate-[0.6deg] relative">
              <div className="relative">
                <div className="aspect-video overflow-hidden bg-zinc-900 rounded-md w-full">
                  <img
                    src={mainPng}
                    alt="Bilal Lania at LEAP 2026"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ THE FIVE LESSONS (JOURNAL ENTRIES) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Five lessons from the floor</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Riyadh · LEAP 2026</span>
            </div>

            {/* ── Entry 01 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Interactive configurators are replacing passive renders
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                  Architectural visualization has relied on pre-rendered flythrough videos and static images for decades. Across the LEAP floor, the most compelling showcases were fully interactive, with real estate and automotive configurators letting buyers change finishes, layouts, and lighting in real time.{' '}
                  <strong className="text-zinc-900 font-semibold">Position your offering around a 3D Interactive Configurator</strong>, and a passive visual asset becomes a commercial sales engine.
                </p>
              </div>
              <div className="md:order-1">
                <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900">
                  <video
                    src="/assets/ElipseImages/videos/Configurator.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                  <figcaption className="absolute left-2.5 bottom-2.5 right-2.5 font-serif italic text-[11px] text-white/70 leading-snug">
                    Touchless Configurator
                  </figcaption>
                </figure>
              </div>
            </article>

            {/* ── Entry 02 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Enterprise validation is pushing VR and AR together
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                  We have moved past the era where VR was an experimental booth attraction. The strongest validation came from the Kingdom&apos;s largest enterprises — organizations like <strong className="text-zinc-900 font-semibold font-sans">Aramco</strong> and <strong className="text-zinc-900 font-semibold font-sans">STC</strong> were actively demonstrating VR for mission-critical industrial training and complex technical simulation. Expect the line between VR and AR to keep blurring as augmentation folds into daily enterprise workflows.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={enterpriseValidation} cap="Enterprise validation, main concourse" />
              </div>
            </article>

            {/* ── Entry 03 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Regional e-learning platforms are the fastest door in
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                  For international studios wondering how to enter the Saudi ecosystem, one of the clearest paths is partnership — not a standalone launch. Regional e-learning and training platforms already carry the institutional trust, the Arabic-language content pipelines, and the government relationships it takes years to build from scratch. <strong className="text-zinc-900 font-semibold">Plug 3D and interactive content into an existing platform</strong> and move faster than competing with it.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={eLearning} cap="E-learning partners, training desk" />
              </div>
            </article>

            {/* ── Entry 04 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Digital twins are becoming a national-scale requirement
                </h3>
                <p className="text-zinc-700 font-serif leading-relaxed max-w-[66ch]">
                  Digital twins are transitioning from an industry buzzword to essential infrastructure across the Kingdom. International teams showcased complete city-scale twins, and <strong className="text-zinc-900 font-semibold">Haramain</strong> — the authority managing the two Holy Cities — is actively exploring partners, with digital twins among its most significant service areas. Government bodies, master developers, and smart-city operators need studios that can build accurate, data-connected 3D replicas of physical assets.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={digitalTwins} cap="City-scale twins, government pavilion" />
              </div>
            </article>

            {/* ── Entry 05 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The screens already exist — anamorphic content will own the attention
                </h3>
                <p className="text-zinc-700 font-serif leading-relaxed max-w-[66ch]">
                  Riyadh has already built extraordinary digital display infrastructure, yet most screens still broadcast flat video. At LEAP, the pavilions that deployed anamorphic 3D displays achieved real stopping power — forced-perspective illusions made people physically halt and watch. The value over the next few years belongs to studios that can build <strong className="text-zinc-900 font-semibold font-sans">custom, anamorphic animations</strong> that turn public screens into landmarks.
                </p>
              </div>
              <div className="md:order-1">
                <div className="relative overflow-hidden rounded-md bg-zinc-900 aspect-video">
                  <LazyVideo
                    src="/assets/leap-2026/videos/anamorphic.webm"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-900 mt-2 font-sans">Captured by Syed Maaz Hashim</p>
              </div>
            </article>
          </div>
        </section>

        {/* ══════ ON-GROUND: FROM THE FLOOR (VIDEOS) ══════ */}
        <section className="py-12 sm:py-16 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
            <div>
              <div className="font-serif italic text-[#2563EB] text-sm mb-2">
                On the ground — video from the floor
              </div>
            </div>
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-medium">
              Riyadh · On location
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            {leapVideos.map((video, i) => (
              <div
                key={i}
                className="relative rounded-md overflow-hidden bg-zinc-900 w-full"
              >
                <LazyVideo
                  src={video}
                  className="w-full h-auto block object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* ══════ LEAP 2026 STORIES ══════ */}
        <section className="bg-white rounded-2xl sm:rounded-3xl py-4 sm:py-6 md:py-8 mt-4">
          <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-6">
            <span className="font-serif italic text-[#2563EB] text-base">The five in short</span>
            <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Stories at a glance</span>
          </div>

          <div className="md:grid md:grid-cols-5 md:gap-6 relative">
            {/* Mobile: carousel */}
            <div className="md:hidden overflow-hidden rounded-xl" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              <motion.div
                key={activeCard}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-zinc-100"
              >
                <div className="aspect-[3/4] w-full bg-zinc-900 relative">
                  <img
                    src={leapCards[activeCard].image}
                    alt={leapCards[activeCard].title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            </div>

            {/* Mobile: dots */}
            <div className="flex md:hidden justify-center gap-2 mt-4">
              {leapCards.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCard(i)}
                  className={`w-2 h-2 rounded-full transition-all cursor-pointer ${i === activeCard ? 'bg-[#2563EB] w-6' : 'bg-zinc-300'
                    }`}
                />
              ))}
            </div>

            {/* Desktop: grid */}
            <div className="hidden md:contents">
              {leapCards.map((card, i) => (
                <article
                  key={i}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-zinc-100 flex flex-col group"
                >
                  <div className="h-56 sm:h-72 lg:h-[26rem] w-full overflow-hidden bg-zinc-900 relative">
                    <img
                      src={card.image}
                      alt={card.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ── Entry 06 ── */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
            <div className="md:order-1">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                06
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                Gaming experiences at LEAP are redefining interactive entertainment
              </h3>
              <p className="text-zinc-700 font-serif leading-relaxed max-w-[66ch]">
                Gaming studios are showcasing immersive, multiplayer experiences that blend virtual reality, augmented reality, and cloud gaming to engage visitors at scale. The convergence of high‑performance graphics and real‑time interaction is opening new avenues for brand storytelling and audience engagement.
              </p>
            </div>
            <div className="md:order-2">
              <Frame src={gamingPng} cap="Gaming showcase at LEAP" />
            </div>
          </article>

          {/* ── Entry 07 ── */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
            <div className="md:order-2">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                07
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                Football innovations spotlight next‑gen fan experiences
              </h3>
              <p className="text-zinc-700 font-serif leading-relaxed max-w-[66ch]">
                Football brands and federations leveraged mixed reality to bring stadium‑level analytics, live stats overlays, and interactive fan zones to the exhibition floor, illustrating how sports technology can drive deeper engagement and new revenue streams.
              </p>
            </div>
            <div className="md:order-1">
              <Frame src={footballPng} cap="Football tech demo at LEAP" />
            </div>
          </article>

          {/* ── Entry 08 ── */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
            <div className="md:order-1">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                08
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                Formula 1 digital experiences accelerate motorsport&rsquo;s future
              </h3>
              <p className="text-zinc-700 font-serif leading-relaxed max-w-[66ch]">
                F1 partners delivered VR pit‑stop simulations and data‑rich AR dashboards, allowing visitors to experience the precision and speed of racing in an immersive, educational format.
              </p>
            </div>
            <div className="md:order-2">
              <Frame src={f1Png} cap="Used by Syed Maaz Hashim" />
            </div>
          </article>
        </section>

        {/* ══════ CLOSING REFLECTIONS ══════ */}
        <section className="py-12 sm:py-16 my-12 sm:my-16 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-serif italic text-[#2563EB] mb-3">
              Closing reflections
            </div>
            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-8">
              Why showing up in person still decides who wins
            </h3>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-zinc-700 font-serif leading-relaxed">
              I concluded my time at LEAP a day early to begin the journey to Madinah, Alhamdulillah.
            </p>
            <p className="font-serif italic text-lg text-zinc-900 leading-relaxed">
              You cannot understand or win in this market from behind a desk in another country.
            </p>
            <p className="text-zinc-700 font-serif leading-relaxed">
              The Kingdom moves at extraordinary speed, but business is still conducted at the speed of trust. Investing in travel, walking the floors, listening to local priorities, and shaking hands is non-negotiable.
            </p>
            <p className="text-zinc-700 font-serif leading-relaxed">
              The opportunities in Saudi Arabia are real for teams who bring high-quality execution, humility, and a genuine commitment to partnership.
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="font-serif italic text-2xl text-[#2563EB]">
              Bilal Lania
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            TAB 2: LINKEDIN POST VERSION (Short Executive Format)
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'linkedin' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-white border border-zinc-200 rounded-3xl p-6 sm:p-10 shadow-sm">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#0077B5] flex items-center justify-center text-white font-bold text-lg">
                    BL
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span>Bilal Lania</span>
                      <FaLinkedin className="text-[#0077B5]" />
                    </h3>
                    <p className="text-xs text-zinc-500">Founder & Creative Director • Elipse Studio</p>
                    <p className="text-[10px] text-zinc-400">Published • Riyadh, Saudi Arabia</p>
                  </div>
                </div>
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full hover:bg-zinc-100 text-zinc-400 hover:text-zinc-900 transition-all cursor-pointer"
                  title="Share Post"
                >
                  <FiShare2 />
                </button>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-zinc-700 leading-relaxed font-sans">
                <p>I am sitting here going through the photos on my friend&apos;s phone from our time at LEAP in Riyadh.</p>

                <p>I promised myself I would not write a generic wrap up post about LEAP. This is not an AI generated recap. These are five concrete observations from walking the exhibition floor, shared openly for founders, artists, and creative tech studios who could not attend in person but want to build and work with enterprise clients in Saudi Arabia.</p>

                <div className="space-y-3 pt-2">
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">1. 3D Interactive Configurators are replacing static media.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Passive flythrough videos and static renders are no longer enough for ambitious gigaprojects. Real estate and automotive leaders want active commercial tools. A 3D Interactive Configurator drives sales conversion. Separately, leveraging Unreal Engine 5 delivers the real time cinematic realism needed before construction begins.</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">2. Enterprise giants are proving VR utility, and AR will follow.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Industry leaders like Aramco and STC were actively showcasing VR for high stakes workforce training and technical simulations. When the largest companies in the Kingdom validate spatial tech for real operations, the rest of the market follows. In my personal view, the boundary between VR and AR will soon blur completely.</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">3. The untapped goldmine: partnerships in e learning.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Regional companies building e learning platforms and corporate training solutions want to integrate VR, but many lack in house 3D pipelines and interactive developers. Rather than building internal teams from scratch, local firms are actively partnering with specialized external studios.</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">4. Digital Twins are a massive government and enterprise priority.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">One of the most exciting takeaways was seeing how seriously large entities treat digital twins. We saw an impressive full scale Moscow Digital Twin showcase on the floor. Even more compelling: Haramain is looking for partners across four core services, with Digital Twins being a major area of interest.</p>
                  </div>

                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">5. Anamorphic 3D is the ultimate pattern interrupt.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Riyadh has incredible screen infrastructure across Boulevard City and major highways, but most displays still run flat 2D video. At LEAP, the booths deploying anamorphic 3D screens stopped foot traffic dead in its tracks. In an environment packed with noise, whatever makes people physically stop walking is doing its job.</p>
                  </div>
                </div>

                <p className="pt-2">I had to wrap up my visit a day early to travel to Madinah now, Alhamdulillah, but I am leaving Riyadh to probably do more in the future InshaAllah.</p>

                <p>If you want to grow in regions where you do not yet have an established footprint, invest in showing up. Travel, attend the right events, walk the floors, and build genuine human relationships. Deals happen on trust and experience.</p>

                <p className="font-semibold text-zinc-900">Wishing everyone safe travels and continued growth. Please keep us in your prayers.</p>

                <p className="text-sm font-bold text-[#2563EB]">Bilal Lania</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 3: X / TWITTER THREAD VERSION (Interactive Tweet Cards)
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'twitter' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                Thread • 7 Posts
              </span>
              <span className="text-xs text-zinc-500">By @bilallania</span>
            </div>

            {twitterPosts.map((post, index) => (
              <div
                key={post.id}
                className="relative bg-white border border-zinc-200 hover:border-zinc-300 p-5 sm:p-6 rounded-2xl transition-all shadow-sm"
              >
                {index < twitterPosts.length - 1 && (
                  <div className="absolute left-8 bottom-0 w-0.5 h-6 bg-zinc-200 -mb-6 z-0 hidden sm:block" />
                )}

                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-200 flex items-center justify-center text-white font-bold text-xs shrink-0">
                    BL
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-bold text-zinc-900">Bilal Lania</span>
                        <span className="text-xs text-zinc-400">@bilallania</span>
                      </div>
                      <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-500">
                        {post.id} / 7
                      </span>
                    </div>

                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                      {post.text}
                    </p>

                    <div className="flex items-center gap-6 mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-400">
                      <span>💬 Reply</span>
                      <span>🔄 Repost</span>
                      <span>❤️ Like</span>
                      <span>📊 2.4K</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: INSTAGRAM / CAROUSEL PREVIEW
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'instagram' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            {/* Visual Carousel Slides */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-3xl border border-white/20 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400">Slide 01</span>
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight mb-2">LEAP in Riyadh: 5 Real Shifts</h3>
                  <p className="text-xs text-blue-200">Zero fluff. Real market signals from the ground in Saudi Arabia.</p>
                </div>
                <span className="text-[11px] text-zinc-400">Swipe →</span>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Shift 01</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">3D Configurators</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Static renders are out. Clients want active commercial tools that convert sales. Powered by Unreal Engine 5.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs">01</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Shift 02</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Enterprise VR & AR</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Giants like Aramco & STC are validating VR for high-stakes training. VR and AR will soon blur into seamless augmentation.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs">02</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Shift 03</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">E-Learning Demand</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Regional training platforms want VR modules but lack in-house 3D teams. Partnering with external studios is the shortcut.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs">03</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Shift 04</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Digital Twins</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Haramain is seeking partners across core services. Smart cities and mega projects demand live, data-connected virtual assets.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs">04</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6]">Shift 05</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Anamorphic 3D</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">Riyadh has screens everywhere, but anamorphic 3D stops people in their tracks. Custom spatial content is the next frontier.</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs">05</div>
              </div>
            </div>

            {/* Post Caption Box */}
            <div className="bg-zinc-50 border border-zinc-200 p-6 rounded-2xl text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-3">
              <span className="font-bold text-zinc-900 block text-sm">Carousel Caption:</span>
              <p>Photos from LEAP in Riyadh.</p>
              <p>I promised myself I would not write a generic wrap up post about LEAP. Going through these photos on my friend&apos;s phone, here are 5 real shifts happening in Saudi Arabia for creative tech:</p>
              <ol className="list-decimal pl-5 space-y-1 text-zinc-600">
                <li><strong className="text-zinc-900">3D Interactive Configurators:</strong> Static renders are out. Clients want active tools that convert sales. (Powered separately by Unreal Engine 5 for cinematic realism).</li>
                <li><strong className="text-zinc-900">Enterprise VR and AR:</strong> Giants like Aramco and STC are using VR for real training. Soon, VR and AR will blur into seamless real world augmentation.</li>
                <li><strong className="text-zinc-900">E Learning Demand:</strong> Regional training companies are actively looking for external 3D partners to build their VR modules.</li>
                <li><strong className="text-zinc-900">Digital Twins:</strong> Haramain is looking for partners across core services including Digital Twins. National demand is massive.</li>
                <li><strong className="text-zinc-900">Anamorphic 3D:</strong> Riyadh has screens everywhere, but anamorphic 3D stops people in their tracks. Custom spatial content is the next wave.</li>
              </ol>
              <p className="pt-2">Wrapped up a day early to travel to Madinah, Alhamdulillah. Leaving Riyadh to probably do more in the future InshaAllah.</p>
              <p className="font-semibold text-zinc-900">Deals happen on trust and experience.</p>
              <p className="text-[#2563EB] font-semibold">What was your biggest takeaway from LEAP this year?</p>
            </div>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default Leap2026Article;
