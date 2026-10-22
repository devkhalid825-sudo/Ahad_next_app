'use client';

import React, { useState, useEffect, useRef } from 'react';
import { m as motion } from 'framer-motion';
import Link from 'next/link';
import {
  FiShare2,
  FiCalendar,
  FiCopy,
  FiCheck,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiCompass,
  FiDollarSign,
  FiExternalLink,
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _modernVilla from '../../assets/About-page/thumbnail.png';
import _penthouse from '../../assets/About-page/penthouse.webp';
import _loveImg from '../../assets/About-page/love.webp';
import _zenithImg from '../../assets/About-page/zenith.webp';
import _timBarth from '../../assets/About-page/tim-barth.webp';
import _khojImg from '../../assets/About-page/khoj.webp';
import _classicVilla from '../../assets/About-page/villas.webp';
import _bilalAuthor from '../../assets/ElipseImages/personal/leap-hero.webp';

const modernVilla = getImgSrc(_modernVilla);
const penthouseImg = getImgSrc(_penthouse);
const loveImg = getImgSrc(_loveImg);
const zenithImg = getImgSrc(_zenithImg);
const timBarth = getImgSrc(_timBarth);
const khojImg = getImgSrc(_khojImg);
const classicVilla = getImgSrc(_classicVilla);
const bilalAuthor = getImgSrc(_bilalAuthor);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-2 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-200/90 shadow-md group">
      <img
        alt={alt || cap || 'Real-Time ArchViz & Spatial VR'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {cap && (
      <p className="font-serif italic text-xs text-zinc-500 mt-1">
        {cap}
      </p>
    )}
  </div>
);

const RealTimeArchvizVrPresalesArticle = () => {
  const [activeTab, setActiveTab] = useState('blog'); // 'blog' | 'linkedin' | 'twitter' | 'instagram'
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToJournal = () => {
    setActiveTab('blog');
    setTimeout(() => {
      const el = document.getElementById('journal');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const marqueeItems = [
    'REAL-TIME ARCHVIZ',
    '✦',
    'SPATIAL VR',
    '✦',
    'WEBGL 60 FPS',
    '✦',
    'OFF-PLAN PRESALES',
    '✦',
    'DRACO COMPRESSION',
    '✦',
    'WEBXR DEVICE API',
    '✦',
    'VIRTUAL SHOWROOM',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  const twitterPosts = [
    {
      id: 1,
      text: "A luxury villa that doesn't exist yet sold for £4.2 million.\n\nThe buyer never visited a show home. They walked the living room, stood on the terrace, and swapped kitchen island marble 3 times — inside a browser on a Tuesday afternoon.\n\nHere is how real-time ArchViz is rewiring luxury presales in 2026 🧵👇",
    },
    {
      id: 2,
      text: "1. The static render problem for £2M+ property:\n\nLuxury buyers don't commit on trust. They commit when they know: 'Can I live here?'\n\nStatic CGIs show one frozen moment. They can't show morning light at 8am, acoustic ceiling volume, or terrace privacy. Real-time WebGL lets buyers test all three live.",
    },
    {
      id: 3,
      text: "2. What real-time ArchViz actually means:\n\n• Draco geometry: 100MB BIM CAD reduced to 5MB\n• KTX2 GPU textures: 65% VRAM saved on mobile\n• Level of Detail: First view in under 3 seconds\n• 60 FPS in Chrome, Safari & Edge — zero app download.",
    },
    {
      id: 4,
      text: "3. WebXR: The headset barrier is gone.\n\nOne master build, two delivery modes:\n• 95% of buyers explore directly on laptop/iPad.\n• At private VIP dinners in Singapore or London, hand the buyer a Meta Quest 3 — 1 click immerses them 1:1 at full human scale.",
    },
    {
      id: 5,
      text: "4. The psychology of micro-commitments:\n\nIn our recent 8-villa project, we synced the material configurator to the developer's CRM. Buyers chose finishes; agents entered calls knowing their exact taste.\n\nResult: 3 of 8 multi-million pound units reserved in 10 days.",
    },
    {
      id: 6,
      text: "5. The presales cash flow math:\n\n48-unit scheme at £1.8M avg price:\nMoving 12 reservations forward by 9 months (at 10% deposit) accelerates £21.6M in cash flow.\n\nPlus: £300,000–£600,000 show home capex completely eliminated.",
    },
  ];

  return (
    <div
      data-nav="light"
      className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white"
    >
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ HERO SECTION (LEAP STRUCTURE) ══════ */}
        <section className="relative bg-white text-neutral-900 py-10 sm:py-16 overflow-hidden mb-8 sm:mb-12">
          {/* Decorative ✦ top-left */}
          <div
            className="hidden lg:block absolute top-8 left-10 text-[#2563EB] text-3xl font-bold select-none pointer-events-none"
            aria-hidden="true"
          >
            ✦
          </div>

          {/* Decorative arrow top-right */}
          <div
            className="hidden lg:block absolute top-8 right-12 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70"
            aria-hidden="true"
          >
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path
                d="M4 20 Q20 4 40 16 Q52 22 54 10"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M48 6 L54 10 L50 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

            {/* Main Center Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-8 sm:mb-12 px-4">
              Real-Time ArchViz &amp; Spatial VR:{' '}
              <span className="text-[#2563EB]">
                How Luxury Developers Presell 6–12 Months Before Groundbreak
              </span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 items-center relative text-left">

              {/* Left Column: Intro & CTA (Mobile: Order 2 after image, Desktop: Order 1) */}
              <div className="order-2 md:order-1 space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  A luxury villa that doesn&apos;t exist yet sold for £4.2 million without a single physical show home visit. Discover the spatial WebGL framework closing off-plan deals at full asking price.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-2.5 pt-1 w-full">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap text-center"
                  >
                    Book Scoping Call ↗
                  </Link>
                  <button
                    onClick={handleScrollToJournal}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer whitespace-nowrap text-center"
                  >
                    Explore Insights ↓
                  </button>
                </div>
              </div>

              {/* Center Column: Hero Visual Frame (Mobile: Order 1 right after heading, Desktop: Order 2) */}
              <div className="order-1 md:order-2 relative flex justify-center px-4 sm:px-0 mb-2 md:mb-0">
                <div className="absolute w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">🏛️</span>
                </div>
                <div className="relative w-64 h-[22rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={modernVilla}
                    alt="Luxury villa real-time architectural visualization"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Stars + Key Stat + Quote (Mobile: Order 3, Desktop: Order 3) */}
              <div className="order-3 md:order-3 text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none font-mono">
                  £4.2M Sold
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Zero Show Home Visits
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Static renders show a moment. Real-time spatial VR lets buyers answer the only question that matters: &lsquo;Can I live here?&rsquo;&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1">— Bilal Lania</p>
                </div>
              </div>

            </div>

            {/* Bottom Dark Pill Bar */}
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
              <span className="text-xs sm:text-sm font-medium text-neutral-300">
                By Bilal Lania · Co-founder, Elipse Studio
              </span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read 5 Lessons Below ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ MARQUEE TICKER ══════ */}
        <section className="my-16 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>
                {item}
              </span>
            ))}
          </div>
        </section>


        {activeTab === 'blog' && (
          <div>
            {/* ── INTRO: A DISPATCH FROM UNBUILT LUXURY ── */}
            <section className="py-10 sm:py-16">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
                <div className="md:pt-8">
                  <div className="italic text-[#2563EB] text-base mb-4 font-serif">
                    A dispatch from luxury presales, 2026
                  </div>
                  <p className="text-xl sm:text-2xl md:text-[28px] leading-snug text-zinc-800 max-w-[38ch] font-sans">
                    A luxury villa sold for £4.2 million. The buyer never visited a show home — they walked through it live in a browser on a Tuesday afternoon.
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
                        src={loveImg}
                        alt="Unbuilt luxury apartment interior walkthrough"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* ── THE FIVE LESSONS (JOURNAL ENTRIES: LEAP ALTERNATING FORMAT) ── */}
            <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
              <div className="max-w-none space-y-0">
                <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
                  <span className="font-serif italic text-[#2563EB] text-base">Five ground reality lessons</span>
                  <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest font-mono">
                    Off-Plan Presales · 2026
                  </span>
                </div>

                {/* ── Entry 01 ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4 font-mono">
                      01
                    </div>
                    <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                      The presales problem that photography cannot solve
                    </h3>
                    <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                      A £2 million+ buyer does not purchase on trust or a brochure render. They buy when they can answer with certainty: <strong className="text-zinc-900 font-serif italic">&ldquo;Can I live here?&rdquo;</strong> Static renders show one frozen moment. They cannot reveal the morning light at 8am, the volume of the entrance hall, or terrace privacy. Developers spend <strong className="text-zinc-900 font-semibold">£300,000 to £600,000</strong> building physical show homes that delay the presales window by 9 months. Real-time spatial visualization replaces the show home at day zero.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={penthouseImg} cap="Penthouse spatial suite: Exploring ceiling heights and natural daylight live." />
                  </div>
                </article>

                {/* ── Entry 02 ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                  <div className="md:order-1">
                    <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4 font-mono">
                      02
                    </div>
                    <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                      What real-time ArchViz actually means in 2026
                    </h3>
                    <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                      Real-time ArchViz means a WebGL 3D model running inside the buyer&apos;s browser at a locked <strong className="text-zinc-900 font-semibold">60 FPS</strong> with no plugins or downloads. Four technical pillars make this work at scale: <strong className="text-zinc-900">Draco compression</strong> reduces 100MB BIM CAD files to 5MB; <strong className="text-zinc-900">KTX2 textures</strong> cut GPU memory by 65%; <strong className="text-zinc-900">LOD streaming</strong> renders the first view within 3 seconds; and <strong className="text-zinc-900">spatial audio</strong> adds realistic acoustic depth.
                    </p>
                  </div>
                  <div className="md:order-2">
                    <Frame src={timBarth} cap="WebGL 60 FPS real-time engine: Complete user camera control and dynamic lighting." />
                  </div>
                </article>

                {/* ── Entry 03 ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4 font-mono">
                      03
                    </div>
                    <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                      WebVR and the headset barrier: What changed
                    </h3>
                    <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                      Shipping headsets to buyers failed commercially. The <strong className="text-zinc-900 font-semibold">WebXR Device API</strong> changed everything: <strong className="text-zinc-900">one build, two delivery modes</strong>. Remote buyers explore directly on Safari or Chrome on their iPad with zero friction. But when an agent hosts a private VIP dinner in Singapore using a single Meta Quest 3, an &ldquo;Enter VR&rdquo; button transports the buyer physically into the unbuilt penthouse at 1:1 human scale.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={zenithImg} cap="Zenith Tower: Exterior presence and contextual verification for remote investors." />
                  </div>
                </article>

                {/* ── Entry 04 ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                  <div className="md:order-1">
                    <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4 font-mono">
                      04
                    </div>
                    <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                      The psychology of interactive micro-commitments
                    </h3>
                    <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                      Buyers who spend more than 4 minutes in an interactive walkthrough convert at a markedly higher velocity. A passive video creates a viewer; an interactive configurator creates an owner. Every material selection is a micro-commitment. In our recent enclave of eight luxury villas, the material configurator was synced to the developer&apos;s CRM — <strong className="text-zinc-900 font-semibold">3 of 8 units were reserved within 10 days</strong> of launch.
                    </p>
                  </div>
                  <div className="md:order-2">
                    <Frame src={classicVilla} cap="Configurable luxury estate: Live finish packages synced directly with sales CRM." />
                  </div>
                </article>

                {/* ── Entry 05 ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4 font-mono">
                      05
                    </div>
                    <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                      The £21.6M cash lever: Moving presales forward by 9 months
                    </h3>
                    <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                      Virtual showrooms are built from planning CAD and BIM files in 6 to 8 weeks. This opens presales campaigns 8 to 12 months ahead of physical show homes. On a 48-unit scheme at £1.8M average price, moving the first 12 reservations forward by 9 months represents <strong className="text-zinc-900 font-semibold">£21.6 million of early liquidity</strong> arriving long before groundbreak — while eliminating show home capex completely.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={khojImg} cap="Resort masterplan: Accelerating off-plan sales before foundation excavation." />
                  </div>
                </article>
              </div>
            </section>

            <section className="py-12 sm:py-16 my-8 border-t border-zinc-200">
              <div className="max-w-2xl mx-auto text-center">
                <div className="font-serif italic text-[#2563EB] mb-3">
                  Closing reflections
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-6">
                  Why waiting for construction is no longer a sales strategy
                </h3>
              </div>
              <div className="max-w-2xl mx-auto space-y-4 text-center">
                <p className="text-zinc-700 font-serif leading-relaxed">
                  The developers who dominate presales in 2026 are not waiting for the building to be finished — or even started — to begin selling.
                </p>
                <p className="font-serif italic text-lg text-zinc-900 leading-relaxed">
                  If your project has approved floor plans, you have everything needed to launch your presales campaign today.
                </p>
                <p className="text-zinc-700 font-serif leading-relaxed">
                  The question is no longer whether high-net-worth buyers will commit inside a virtual showroom. The question is whether your competitors will get there first.
                </p>
              </div>


              {/* Conversion CTA Box */}
              <div className="max-w-2xl mx-auto mt-10 p-6 sm:p-8 rounded-2xl bg-neutral-950 text-white text-center">
                <h4 className="text-lg sm:text-xl font-bold mb-2">Ready to open presales before groundbreak?</h4>
                <p className="text-xs sm:text-sm text-zinc-300 mb-5">
                  Delivered in 6–8 weeks from your architectural CAD or BIM files.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto max-w-md mx-auto">
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2563EB] text-white text-xs sm:text-sm font-semibold hover:bg-blue-600 transition-all inline-flex items-center justify-center gap-2 shadow-md text-center whitespace-nowrap"
                  >
                    <span>Book Scoping Consultation</span>
                    <FiArrowRight />
                  </Link>
                  <Link
                    href="/services/architectural-visualization"
                    className="w-full sm:w-auto px-6 py-3 rounded-full border border-white/20 text-white text-xs sm:text-sm font-semibold hover:bg-white/10 transition-all inline-flex items-center justify-center text-center whitespace-nowrap"
                  >
                    View ArchViz Work
                  </Link>
                </div>
              </div>
            </section>
          </div>
        )}

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
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-zinc-200">
                    <img src={bilalAuthor} alt="Bilal Lania" className="w-full h-full object-cover object-top" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-zinc-900 flex items-center gap-2">
                      <span>Bilal Lania</span>
                      <FaLinkedin className="text-[#0077B5]" />
                    </h3>
                    <p className="text-xs text-zinc-500">Co-founder &amp; Creative Director • Elipse Studio</p>
                    <p className="text-[10px] text-zinc-400">Published • Real Estate Tech</p>
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
                <p>A luxury villa that doesn&apos;t exist yet just sold for £4.2 million.</p>
                <p>The buyer never set foot in a physical show home. They walked the living room, checked the terrace sea view, and swapped kitchen island marble 3 times — inside a web browser on a Tuesday afternoon.</p>

                <div className="space-y-3 pt-2">
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">1. Static renders cannot answer &ldquo;Can I live here?&rdquo;</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Brochure CGIs show a frozen moment. Real-time spatial VR lets buyers test 8am morning light, acoustic volume, and terrace privacy.</p>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">2. WebGL 60 FPS in any browser.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Draco compression reduces 100MB CAD files to 5MB. Zero plugins, zero downloads, sub-3-second load on mobile.</p>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">3. WebXR: One build, two delivery channels.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Universal browser 3D for remote international buyers, plus 1-click Meta Quest 3 immersion for agent-led VIP dinners.</p>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">4. Micro-commitments convert.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">In our 8-villa collection, selections synced to CRM in real time: 3 units reserved within 10 days of going live.</p>
                  </div>
                  <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-200">
                    <p className="font-bold text-zinc-900 text-sm mb-1">5. The presales cash flow equation.</p>
                    <p className="text-xs sm:text-sm text-zinc-600">Moving 12 deposits forward by 9 months pulls forward £21.6M in cash flow while eliminating £300k–£600k in show home capex.</p>
                  </div>
                </div>

                <p className="pt-2 font-semibold text-zinc-900">Start presales before the foundation is poured.</p>
                <p className="text-sm font-bold text-[#2563EB]">Bilal Lania</p>
              </div>
            </div>
          </motion.div>
        )}


        {activeTab === 'twitter' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-between px-2 mb-2">
              <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-mono">
                Thread • 6 Posts
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
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-zinc-200 shrink-0">
                    <img src={bilalAuthor} alt="Bilal Lania" className="w-full h-full object-cover object-top" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-1.5 truncate">
                        <span className="text-sm font-bold text-zinc-900">Bilal Lania</span>
                        <span className="text-xs text-zinc-400">@bilallania</span>
                      </div>
                      <span className="text-xs bg-zinc-100 px-2 py-0.5 rounded text-zinc-500 font-mono">
                        {post.id} / 6
                      </span>
                    </div>

                    <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-sans">
                      {post.text}
                    </p>

                    <div className="flex items-center gap-6 mt-4 pt-3 border-t border-zinc-100 text-xs text-zinc-400">
                      <span>💬 Reply</span>
                      <span>🔄 Repost</span>
                      <span>❤️ Like</span>
                      <span>📊 3.8K</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            TAB 4: INSTAGRAM CAROUSEL SLIDES (LEAP STYLE)
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'instagram' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="aspect-[4/5] bg-gradient-to-br from-blue-900 to-indigo-950 p-6 rounded-3xl border border-white/20 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-sky-400 font-mono">Slide 01</span>
                <div>
                  <h3 className="text-2xl font-black text-white leading-tight mb-2">
                    How £4.2M Villas Sell Off-Plan
                  </h3>
                  <p className="text-xs text-blue-200">
                    Inside the real-time ArchViz shift opening presales 6–12 months early.
                  </p>
                </div>
                <span className="text-[11px] text-zinc-400">Swipe →</span>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] font-mono">Pillar 01</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">WebGL 60 FPS</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Draco geometry compression cuts 100MB CAD files to 5MB. Runs inside mobile browser in &lt; 3 seconds.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-mono">01</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] font-mono">Pillar 02</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">WebXR Dual-Delivery</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Browser walkthrough for global prospects; 1:1 scale Meta Quest 3 immersion for private sales events.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-mono">02</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] font-mono">Pillar 03</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">Micro-Commitments</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Configuring marble finishes and outdoor layouts triggers psychological ownership before physical groundbreak.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-mono">03</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-zinc-900 to-zinc-950 p-6 rounded-3xl border border-white/15 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-[#3B82F6] font-mono">Pillar 04</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">£0 Show Home Capex</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    Eliminate £300k–£600k in temporary show home builds. Every unit variation is live on day zero.
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full bg-blue-600/30 flex items-center justify-center text-blue-400 text-xs font-mono">04</div>
              </div>

              <div className="aspect-[4/5] bg-gradient-to-br from-blue-950 to-neutral-950 p-6 rounded-3xl border border-blue-500/30 flex flex-col justify-between shadow-xl">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 font-mono">Take Action</span>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">6–8 Week Turnkey</h4>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Launch your virtual property showroom from your CAD files today.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="py-2.5 px-4 rounded-full bg-[#2563EB] text-white text-xs font-semibold text-center hover:bg-blue-600 transition-colors"
                >
                  Book Scoping Call ↗
                </Link>
              </div>
            </div>
          </motion.div>
        )}

      </main>

      <Footer />
    </div>
  );
};

export default RealTimeArchvizVrPresalesArticle;
