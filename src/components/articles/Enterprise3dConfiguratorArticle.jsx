'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiSliders,
  FiLayers,
  FiZap,
  FiPackage,
  FiCpu,
  FiServer,
  FiSmartphone,
  FiTrendingUp,
  FiShield,
  FiCode,
  FiDatabase,
  FiActivity,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _volvoHero from '../../assets/About-page/shark.webp';
import _volvoUi from '../../assets/About-page/volvo-ui.png';
import _jetour from '../../assets/About-page/Jetour.webp';
import _kia from '../../assets/About-page/kia.webp';
import _steeringImg from '../../assets/ElipseImages/projects/Streeing-1.webp';
import _configuratorBlogs from '../../assets/About-page/configurator-blogs.png';
import _hero from '../../assets/About-page/kia-1.png';

const volvoHero = getImgSrc(_volvoHero);
const volvoUi = getImgSrc(_volvoUi);
const jetour = getImgSrc(_jetour);
const kia = getImgSrc(_kia);
const steeringImg = getImgSrc(_steeringImg);
const configuratorBlogs = getImgSrc(_configuratorBlogs);
const heroImg = getImgSrc(_hero);

/* CTO decision matrix: one source of truth for the desktop table and the mobile slider.
   win: true = the stronger option for that factor (shown bold). */
const decisionMatrix = [
  { factor: 'Broad Ecommerce Traffic', native: { text: '✓ Strong starting point; CDN scales effortlessly', win: true }, cloud: { text: '✕ Requires costly GPU session pre-warming', muted: true } },
  { factor: 'Rendering Hardware', native: { text: 'Customer device (phone, laptop, tablet)' }, cloud: { text: 'Remote cloud GPU servers (AWS G4dn/G5)' } },
  { factor: 'Visual Complexity', native: { text: 'Fits within device memory & shader budget' }, cloud: { text: '✓ Supports photoreal Lumen/Nanite scenes', win: true } },
  { factor: 'Interaction Responsiveness', native: { text: '✓ Zero network roundtrip for orbit/zoom', win: true }, cloud: { text: '✕ Dependent on video encoding & network ping', muted: true } },
  { factor: 'Initial Experience', native: { text: 'Governed by Draco download & shader compile' }, cloud: { text: 'Governed by WebRTC connection & keyframe handshake' } },
  { factor: 'Traffic Spikes', native: { text: '✓ Absorbs 100k+ visits with static caching', win: true }, cloud: { text: '✕ Limited by available concurrent GPU nodes', muted: true } },
  { factor: 'Operating Costs', native: { text: '✓ Low CDN egress + standard frontend hosting', win: true }, cloud: { text: '✕ Hourly GPU rate ($1.20+/hr) + video egress', muted: true } },
  { factor: 'Asset Exposure', native: { text: 'Transferred to client memory (inspectable)', muted: true }, cloud: { text: '✓ Proprietary 3D/CAD files stay on server', win: true } },
  { factor: 'Typical Fit', native: { text: 'High-volume DTC ecommerce, modular apparel, furniture', win: true }, cloud: { text: 'Luxury automotive showrooms, guided sales, machinery', win: true } },
];

const matrixCellClass = (cell) =>
  cell.win ? 'text-black font-semibold' : cell.muted ? 'text-zinc-600' : 'text-zinc-700';

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative md:aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Enterprise 3D Configurator Development'}
        src={src}
        loading="lazy"
        decoding="async"
        className="block w-full h-auto md:h-full md:object-cover transition-transform duration-700 md:group-hover:scale-105"
      />
    </figure>
    {actionLink ? (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1">
        {cap && (
          <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
            {cap}
          </span>
        )}
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span>{actionText || 'View Experience'}</span>
          <FiExternalLink className="text-xs" />
        </a>
      </div>
    ) : cap ? (
      <p className="font-serif italic text-xs sm:text-sm text-zinc-500 text-center sm:text-left">
        {cap}
      </p>
    ) : null}
  </div>
);

const Enterprise3dConfiguratorArticle = () => {
  const [copied, setCopied] = useState(false);
  const [activeFactor, setActiveFactor] = useState(0);
  const matrixSliderRef = useRef(null);

  // Mobile decision-matrix slider: keep the counter/dots in sync with swipes
  const handleMatrixScroll = () => {
    const el = matrixSliderRef.current;
    if (!el || !el.children.length) return;
    const cardWidth = el.children[0].offsetWidth + 12; // card + gap-3
    const index = Math.round(el.scrollLeft / cardWidth);
    setActiveFactor(Math.max(0, Math.min(decisionMatrix.length - 1, index)));
  };

  const scrollToFactor = (index) => {
    const el = matrixSliderRef.current;
    if (!el) return;
    const i = Math.max(0, Math.min(decisionMatrix.length - 1, index));
    const card = el.children[i];
    if (card) {
      el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
    }
  };

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
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'ENTERPRISE 3D CONFIGURATOR',
    '✦',
    'WEBGL & WEBGPU',
    '✦',
    'THREE.JS PIPELINE',
    '✦',
    'PLAYCANVAS WORKFLOW',
    '✦',
    'UE5 PIXEL STREAMING',
    '✦',
    'HEADLESS COMMERCE',
    '✦',
    'SHOPIFY CART TRANSFORM',
    '✦',
    'DRACO & KTX2 TEXTURES',
    '✦',
    'SUB-2MB RUNTIMES',
    '✦',
    '60 FPS LOW LATENCY',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-24 sm:pb-20 bg-white">

        {/* ══════ HERO SECTION (HD 16:9 WIDESCREEN VIDEO SHOWCASE) ══════ */}
        <section className="relative bg-white text-neutral-900 pt-0 pb-6 sm:pb-8 md:pt-1 md:pb-10 overflow-hidden mb-4 sm:mb-8">

          {/* Decorative ✦ top-left */}
          <div className="hidden lg:block absolute top-2 left-6 text-[#2563EB] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          {/* Decorative arrow top-right */}
          <div className="hidden lg:block absolute top-2 right-8 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-6 sm:pt-8 md:pt-0">

            {/* ── Category Eyebrow & Blue Line ── */}
            <p className="hidden sm:block text-xs sm:text-sm font-semibold tracking-widest uppercase text-neutral-500 mb-2">
              ENTERPRISE 3D CONFIGURATOR DEVELOPMENT
            </p>
            <div className="hidden sm:block w-12 h-[2.5px] bg-[#2563EB] mx-auto mb-4 sm:mb-6 rounded-full" />

            {/* ── Main Center Headline ── */}
            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-5xl xl:text-[48px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-6 px-1 sm:px-4">
              <span className="text-[#2563EB]">WebGL, PlayCanvas and Three.js</span> vs{' '}
              <span className="text-[#2563EB]">Cloud Pixel Streaming</span> — The 2026 CTO Decision Matrix
            </h1>

            {/* ── Subtitle / Meta Bar ── */}
            <p className="text-[11px] sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 leading-relaxed mb-4 sm:mb-8 px-2 sm:px-0">
              By Elipse Studio | October 2026 · Enterprise 3D Architecture · WebGL · Three.js · PlayCanvas · UE5 Pixel Streaming
            </p>

            {/* ── PROMINENT 9:16 VERTICAL REEL SIZE HERO IMAGE ── */}
            <div className="w-full flex justify-center items-center px-4 sm:px-0 my-2 sm:my-6 relative">
              {/* Circular subtle backdrop shape */}
              <div className="hidden sm:flex absolute w-72 h-72 sm:w-[26rem] sm:h-[26rem] lg:w-[30rem] lg:h-[30rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 items-center justify-center pointer-events-none">
                <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">✦</span>
              </div>

              {/* Vertical Showcase Frame */}
              <div className="relative w-[78%] sm:w-full max-w-[18rem] md:max-w-[20rem] lg:max-w-[22rem] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl border-4 border-white bg-white group z-10">
                <img
                  src={heroImg}
                  alt="Enterprise 3D Configurator Development — Vertical Reel Showcase"
                  fetchPriority="high"
                  decoding="async"
                  className="block w-full aspect-[4/5] sm:aspect-auto h-auto object-cover object-center"
                />
              </div>
            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-4 sm:mt-6 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                Book a 15-min technical consultation ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | October 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Read Decision Matrix ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ DARK MARQUEE TICKER ══════ */}
        <section className="my-6 sm:my-10 md:my-12 overflow-hidden border-y border-zinc-200 py-3 sm:py-4 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ SECTION 01: EXECUTIVE BRIEFING ══════ */}
        <section className="py-6 sm:py-8 md:py-10">
          <div className="grid grid-cols-1 md:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-10 items-start">
            {/* Left: Showcase Image */}
            <div className="order-2 md:order-1 bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="md:aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={configuratorBlogs}
                  alt="Enterprise 3D Configurator Architecture & Real-Time Production Benchmark"
                  loading="lazy"
                  decoding="async"
                  className="block w-full h-auto md:h-full md:object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Enterprise 3D Configurator Pipeline · WebGL / Three.js vs Cloud Pixel Streaming
              </p>
            </div>

            {/* Right: Briefing Content */}
            <div className="order-1 md:order-2 md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">
                Executive Briefing · The CTO Decision Framework
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                Architecture Dictates Infrastructure Cost, Mobile Speed & Maintenance.
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A customer changes a finish, rotates the product, and selects a component. Behind that simple interaction sits a strategic choice: render directly in the browser via WebGL/WebGPU, or stream frames from a remote cloud GPU cluster?
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                At Elipse Studio, our production work spans both paradigms: browser-native builds below 2 MB (BMW Steering Wheel & Cap Configurator) and Unreal Engine 5 cloud-streamed showrooms (Volvo S90). Here is the decision matrix for engineering leaders in 2026.
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL / CONTENT ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">CTO Decision Matrix & Architectural Blueprint</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026 Production Data</span>
            </div>

            {/* ══════ ENTRY 01: THE 2026 RENDERING LANDSCAPE ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  The 2026 Rendering Landscape: Browser-Native vs Cloud Pixel Streaming
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm leading-relaxed mb-4">
                  The first fundamental distinction is where pixels are calculated:
                </p>
                <div className="space-y-3 bg-zinc-50 p-4 border border-zinc-200 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-1">
                      <FiSmartphone className="text-[#2563EB]" />
                      <span>Browser-Native (Three.js / PlayCanvas):</span>
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      Rendered on customer devices via WebGL/WebGPU. Assets scale over CDNs with zero rendering-server compute. Best for high-volume ecommerce funnels, but subject to mobile GPU and VRAM constraints.
                    </p>
                  </div>
                  <div className="border-t border-zinc-200 pt-3">
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-1">
                      <FiServer className="text-[#2563EB]" />
                      <span>Cloud Pixel Streaming (Unreal Engine 5):</span>
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      Rendered on remote GPU instances and streamed via WebRTC video. Delivers cinematic ray tracing to any device, but introduces network latency dependencies and ongoing hourly streaming costs.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={kia}
                  cap="Browser-Native WebGL: Kia 3D Configurator engineered for instant load and zero streaming fees"
                  alt="Kia WebGL 3D Configurator Demo"
                />
              </div>
            </article>

            {/* ══════ ENTRY 02: THE CTO DECISION MATRIX (COMPARATIVE TABLE) ══════ */}
            <article className="py-8 sm:py-12 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  02
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-900 border border-zinc-300 mb-2">
                  Architectural Evaluation
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-2">
                  The CTO Decision Matrix: Browser-Native vs Cloud Streamed
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Identify the architecture worth prototyping first. Neither removes engineering work; each shifts it across the stack.
                </p>
              </div>

              {/* Modern Flat Comparative Table (desktop) + swipe slider (mobile) */}
              <div className="w-full border border-zinc-300 bg-white shadow-sm mb-6">

                {/* ── DESKTOP / TABLET: full table ── */}
                <div className="hidden md:block overflow-x-auto">
                  <div className="min-w-[640px] grid grid-cols-12 bg-black text-white p-3.5 sm:p-4 items-center border-b border-zinc-800 text-xs font-mono font-bold uppercase tracking-wider">
                    <div className="col-span-4 text-zinc-400 flex items-center gap-1.5">
                      <FiSliders className="w-3.5 h-3.5" />
                      <span>Decision Factor</span>
                    </div>
                    <div className="col-span-4 text-zinc-300 flex items-center gap-1.5">
                      <FiSmartphone className="w-3.5 h-3.5" />
                      <span>Browser-Native (Three.js / PlayCanvas)</span>
                    </div>
                    <div className="col-span-4 text-white flex items-center gap-1.5">
                      <FiServer className="w-3.5 h-3.5" />
                      <span>Cloud Streamed (Unreal Engine 5)</span>
                    </div>
                  </div>

                  <div className="min-w-[640px] divide-y divide-zinc-200 font-sans text-xs sm:text-sm">
                    {decisionMatrix.map((row) => (
                      <div key={row.factor} className="grid grid-cols-12 p-3 sm:p-4 items-center hover:bg-zinc-50/70">
                        <div className="col-span-4 font-bold text-zinc-900">{row.factor}</div>
                        <div className={`col-span-4 pr-2 ${matrixCellClass(row.native)}`}>{row.native.text}</div>
                        <div className={`col-span-4 ${matrixCellClass(row.cloud)}`}>{row.cloud.text}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ── MOBILE: swipeable comparison cards ── */}
                <div className="md:hidden">
                  <div className="bg-black text-white px-3.5 py-3 flex items-center justify-between text-[11px] font-mono font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5 text-zinc-300">
                      <FiSliders className="w-3.5 h-3.5" />
                      Swipe to compare
                    </span>
                    <span className="text-white">
                      {String(activeFactor + 1).padStart(2, '0')} / {String(decisionMatrix.length).padStart(2, '0')}
                    </span>
                  </div>

                  <div
                    ref={matrixSliderRef}
                    onScroll={handleMatrixScroll}
                    className="relative flex gap-3 overflow-x-auto snap-x snap-mandatory scroll-smooth px-3 py-4 bg-zinc-50 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="CTO decision matrix comparison"
                  >
                    {decisionMatrix.map((row, i) => (
                      <div
                        key={row.factor}
                        className="snap-center shrink-0 w-[86%] bg-white border border-zinc-200 shadow-sm p-4 flex flex-col gap-3"
                        aria-label={`${i + 1} of ${decisionMatrix.length}: ${row.factor}`}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono font-bold text-[#2563EB]">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                            Decision Factor
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-zinc-900 leading-snug -mt-1">{row.factor}</h4>

                        <div className={`border p-3 ${row.native.win ? 'border-black bg-zinc-50' : 'border-zinc-200'}`}>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            <FiSmartphone className="w-3 h-3 text-[#2563EB]" />
                            Browser-Native
                          </div>
                          <p className={`text-sm leading-snug ${matrixCellClass(row.native)}`}>{row.native.text}</p>
                        </div>

                        <div className={`border p-3 ${row.cloud.win ? 'border-black bg-zinc-50' : 'border-zinc-200'}`}>
                          <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-500 mb-1">
                            <FiServer className="w-3 h-3 text-[#2563EB]" />
                            Cloud Streamed (UE5)
                          </div>
                          <p className={`text-sm leading-snug ${matrixCellClass(row.cloud)}`}>{row.cloud.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Prev / dots / next */}
                  <div className="flex items-center justify-between gap-2 px-3 pb-3 bg-zinc-50">
                    <button
                      type="button"
                      onClick={() => scrollToFactor(activeFactor - 1)}
                      disabled={activeFactor === 0}
                      aria-label="Previous factor"
                      className="w-9 h-9 shrink-0 rounded-full border border-zinc-300 bg-white flex items-center justify-center text-zinc-900 disabled:opacity-30 active:scale-95 transition"
                    >
                      <FiChevronLeft />
                    </button>
                    <div className="flex items-center justify-center gap-1.5 flex-wrap">
                      {decisionMatrix.map((row, i) => (
                        <button
                          key={row.factor}
                          type="button"
                          onClick={() => scrollToFactor(i)}
                          aria-label={`Go to ${row.factor}`}
                          className={`h-1.5 rounded-full transition-all ${i === activeFactor ? 'w-5 bg-black' : 'w-1.5 bg-zinc-300'}`}
                        />
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToFactor(activeFactor + 1)}
                      disabled={activeFactor === decisionMatrix.length - 1}
                      aria-label="Next factor"
                      className="w-9 h-9 shrink-0 rounded-full border border-zinc-300 bg-white flex items-center justify-center text-zinc-900 disabled:opacity-30 active:scale-95 transition"
                    >
                      <FiChevronRight />
                    </button>
                  </div>
                </div>

                <div className="bg-black text-white p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <FiZap className="text-white shrink-0" />
                    <span><strong>Rule:</strong> Browser-native maximizes reach; pixel streaming maximizes fidelity.</span>
                  </div>
                  <span className="text-[11px] bg-white text-black px-2.5 py-0.5 font-bold uppercase tracking-wider">
                    Target Velocity First
                  </span>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 03: PLAYCANVAS VS THREE.JS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  PlayCanvas vs Three.js: Workflow & Ownership
                </h3>
                <div className="space-y-3 bg-zinc-50 p-4 border border-zinc-200 text-xs sm:text-sm">
                  <div>
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-0.5">
                      <FiCode className="text-[#2563EB]" />
                      <span>Three.js for Custom Next.js Architecture:</span>
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      Full programmatic control over custom shaders, headless state, and seamless embedding within a Next.js / React storefront.
                    </p>
                  </div>
                  <div className="border-t border-zinc-200 pt-2.5">
                    <h4 className="font-bold text-zinc-900 flex items-center gap-2 mb-0.5">
                      <FiLayers className="text-[#2563EB]" />
                      <span>PlayCanvas for Shared Visual Production:</span>
                    </h4>
                    <p className="text-zinc-600 leading-relaxed">
                      Cloud visual editor allowing 3D artists to tweak PBR materials, lights, and cameras without developer code deployments.
                    </p>
                  </div>
                </div>

                <div className="mt-3 p-3 bg-blue-50/60 border border-blue-200 text-xs">
                  <strong className="text-blue-900 block mb-0.5">Commercial Rule:</strong>
                  <p className="text-blue-800 leading-snug">
                    Keep product options, pricing, and compatibility in backend APIs—never hardcoded inside 3D mesh names or scene scripts.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={jetour}
                  cap="Jetour 3D Vehicle Customizer — Visual iteration and multi-trim material assembly in browser-native WebGL"
                  alt="Jetour 3D Vehicle Customizer"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: MOBILE MEMORY & RUNTIME PERFORMANCE ══════ */}
            <article className="py-8 sm:py-12 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-2">
                  Mobile Memory Matters as Much as Download Size
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  A 2 MB download can expand into 400 MB of GPU VRAM. Benchmark these 6 runtime health checks before launching:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">01. Memory Leaks</span>
                  <p className="text-xs text-zinc-600 mt-1">Audit heap allocation after 50 option changes. Ensure unused textures call <code>dispose()</code>.</p>
                </div>

                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">02. 60 FPS Frame Times</span>
                  <p className="text-xs text-zinc-600 mt-1">Enforce sub-16.6ms touch orbit budgets on mid-tier mobile hardware (iPhone 12 / Galaxy A53).</p>
                </div>

                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">03. Texture VRAM Budgets</span>
                  <p className="text-xs text-zinc-600 mt-1">Cap mobile textures at 1K/2K to prevent mobile browser memory watchdog termination.</p>
                </div>

                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">04. Long Sessions</span>
                  <p className="text-xs text-zinc-600 mt-1">Validate thermal throttling and battery consumption during 15-minute customer sessions.</p>
                </div>

                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">05. Context Recovery</span>
                  <p className="text-xs text-zinc-600 mt-1">Automate listeners for <code>webglcontextlost</code> to recover seamlessly without page reload.</p>
                </div>

                <div className="p-3.5 border border-zinc-200 bg-zinc-50">
                  <span className="text-[10px] font-mono font-bold text-[#2563EB] block">06. Asset Purge</span>
                  <p className="text-xs text-zinc-600 mt-1">Purge superseded component geometry immediately when customers change trim finishes.</p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 05: GEOMETRY & TEXTURE OPTIMIZATION ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  05
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Geometry, Textures & The Sub-2-Second Milestone
                </h3>
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="border-l-2 border-[#2563EB] pl-3 py-0.5">
                    <strong className="text-zinc-900 block">Draco Compression:</strong>
                    <span className="text-zinc-600">Reduces mesh transfer size by 85–90% via WebAssembly background workers.</span>
                  </div>
                  <div className="border-l-2 border-[#2563EB] pl-3 py-0.5">
                    <strong className="text-zinc-900 block">KTX2 & Basis Universal:</strong>
                    <span className="text-zinc-600">Transcodes directly into GPU formats (ASTC/BC7), cutting VRAM by 70%.</span>
                  </div>
                  <div className="border-l-2 border-[#2563EB] pl-3 py-0.5">
                    <strong className="text-zinc-900 block">Lazy Sequence Loading:</strong>
                    <span className="text-zinc-600">Load default trim first, enable camera orbit instantly, and prefetch add-ons lazily.</span>
                  </div>
                  <div className="border-l-2 border-[#2563EB] pl-3 py-0.5">
                    <strong className="text-zinc-900 block">Measure Time to Usable Interaction:</strong>
                    <span className="text-zinc-600">Aim for sub-2-second interactivity under throttled 4G network conditions.</span>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={volvoUi}
                  cap="Enterprise 3D Asset Optimization: Mesh decimation and KTX2 GPU texture transcoding for high-density automotive configurators"
                  alt="Volvo S90 3D UI Pipeline"
                />
              </div>
            </article>

            {/* ══════ ENTRY 06: ELIPSE STUDIO CASE STUDIES ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  06
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Production Proof: Compact WebGL vs Cloud UE5
                </h3>
                <div className="space-y-3">
                  <div className="bg-zinc-50 border border-zinc-200 p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 px-2 py-0.5">
                      Browser-Native · Sub-2 MB Builds
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 mt-1 mb-0.5">BMW Steering Wheel & Cap Configurators</h4>
                    <p className="text-xs text-zinc-600 font-sans">
                      Engineered for high-volume ecommerce. Complete initial payload below 2 MB, sub-second interaction on 4G across 100k+ global visits with zero streaming compute cost.
                    </p>
                  </div>

                  <div className="bg-zinc-50 border border-zinc-200 p-3.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 px-2 py-0.5">
                      Cloud Pixel Streaming · UE5 Ray Tracing
                    </span>
                    <h4 className="text-sm font-bold text-zinc-900 mt-1 mb-0.5">Volvo S90 Unreal Engine 5 Showroom</h4>
                    <p className="text-xs text-zinc-600 font-sans">
                      VIP digital showroom utilizing UE5 Lumen dynamic lighting and 8K ray-traced paint shaders for executive presentations and luxury automotive sales.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={volvoHero}
                  cap="Volvo S90 Cloud-Streamed Real-Time Configurator — Cinema photorealism rendered on remote GPU clusters"
                  alt="Volvo S90 Cloud Streamed Showroom"
                />
              </div>
            </article>

            {/* ══════ ENTRY 07: STATE SYNC & HEADLESS INTEGRATION ══════ */}
            <article className="py-8 sm:py-12 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  07
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-2">
                  State Synchronization & Headless Integration
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Carrying customer choices from the 3D canvas into valid checkout line items and ERP manufacturing:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="p-4 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2 mb-1 text-[#2563EB]">
                    <FiDatabase className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold text-zinc-700 uppercase">Single State Manifest</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    Deterministic JSON state holding SKU, component IDs, and trim codes. 3D canvas is purely a reactive view layer.
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2 mb-1 text-[#2563EB]">
                    <FiCode className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold text-zinc-700 uppercase">Next.js Non-Blocking SSR</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    Render catalog specs and purchase buttons server-side so checkouts remain operational even if 3D initialization fails.
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2 mb-1 text-[#2563EB]">
                    <FiShield className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold text-zinc-700 uppercase">Shopify Cart Transform API</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    Validate component combinations server-side via Shopify Cart Transform API before generating checkout tokens.
                  </p>
                </div>

                <div className="p-4 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2 mb-1 text-[#2563EB]">
                    <FiPackage className="w-4 h-4" />
                    <span className="font-mono text-xs font-bold text-zinc-700 uppercase">Durable ERP BOM Hash</span>
                  </div>
                  <p className="text-xs text-zinc-600 leading-relaxed font-sans">
                    Emit versioned configuration hashes directly into SAP/NetSuite to protect manufacturing fidelity across catalog updates.
                  </p>
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 08: 3-YEAR TCO & BANDWIDTH MATH ══════ */}
            <article className="py-8 sm:py-12 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  08
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-2">
                  Three-Year TCO & Bandwidth Math
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed">
                  Formula: <code>Initial build + Asset pipeline + Integrations + Infrastructure + Maintenance</code>.
                </p>
              </div>

              {/* ── Bandwidth & Infrastructure Cost Model (CTO Benchmark) ── */}
              <div className="mt-8 border border-zinc-300 bg-white shadow-sm overflow-hidden">
                {/* ── TOP AUDIT HEADER BAR ── */}
                <div className="bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FiActivity className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
                          Bandwidth & Infrastructure Cost Model
                        </span>
                        <span className="hidden sm:inline-block text-[9px] bg-white text-black px-2 py-0.5 font-extrabold uppercase tracking-widest">
                          3-Year TCO Benchmark
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-400 font-sans mt-0.5">
                        Simulation baseline: 10,000 monthly customer sessions · 5-minute interaction duration · 60 FPS
                      </p>
                    </div>
                  </div>
                  <div className="text-[10px] sm:text-xs font-mono text-zinc-300 border border-zinc-700 px-3 py-1 bg-zinc-900 shrink-0">
                    75× BANDWIDTH MULTIPLIER
                  </div>
                </div>

                {/* ── SIDE-BY-SIDE ARCHITECTURAL COMPARISON ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200">

                  {/* ── LEFT COLUMN: BROWSER-NATIVE (THREE.JS / WEBGPU) ── */}
                  <div className="p-6 sm:p-8 bg-white flex flex-col justify-between space-y-6">
                    <div>
                      {/* Architecture Tag */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-black bg-zinc-100 border border-zinc-300 px-2.5 py-1">
                          Client-Side · Three.js / WebGL
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase">
                          Zero GPU Compute
                        </span>
                      </div>

                      {/* Hero Metric */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
                            ~50 GB
                          </span>
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500">
                            / month
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-sans mt-1.5">
                          Total monthly bandwidth for 10,000 customer sessions
                        </p>
                      </div>

                      {/* Key Cost Metric Box */}
                      <div className="bg-zinc-50 border border-zinc-200 p-4 mb-5 space-y-2">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-zinc-600 font-sans">Monthly CDN Egress:</span>
                          <span className="font-mono font-bold text-black">&lt; $5.00 / mo</span>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm border-t border-zinc-200/80 pt-2">
                          <span className="text-zinc-600 font-sans">Cost Per Session:</span>
                          <span className="font-mono font-bold text-black">$0.0005</span>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm border-t border-zinc-200/80 pt-2">
                          <span className="text-zinc-600 font-sans">Marginal 1k User Surge:</span>
                          <span className="font-mono font-bold text-black">&lt; $0.50</span>
                        </div>
                      </div>

                      {/* Architecture Mechanism */}
                      <div className="space-y-2 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                        <p>
                          <strong>How it scales:</strong> Master 3D assets are compressed via Draco &amp; KTX2 into a compact ~5 MB payload.
                        </p>
                        <p>
                          Delivered via global CDN edge nodes. Cached in browser storage so repeat visits consume 0 MB. Customer hardware handles all frame calculations.
                        </p>
                      </div>
                    </div>

                    {/* Scale Verdict */}
                    <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
                        Traffic Scalability:
                      </span>
                      <span className="font-bold text-black font-sans">
                        ✓ Infinite (Flat CDN Cost)
                      </span>
                    </div>
                  </div>

                  {/* ── RIGHT COLUMN: CLOUD PIXEL STREAMING (UNREAL ENGINE 5) ── */}
                  <div className="p-6 sm:p-8 bg-zinc-50/50 flex flex-col justify-between space-y-6">
                    <div>
                      {/* Architecture Tag */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-white bg-black border border-black px-2.5 py-1">
                          Server-Side · Unreal Engine 5
                        </span>
                        <span className="text-[10px] font-mono font-semibold text-zinc-500 uppercase">
                          Dedicated GPU Nodes
                        </span>
                      </div>

                      {/* Hero Metric */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-neutral-900 leading-none">
                            ~3,750 GB
                          </span>
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-zinc-500">
                            (3.75 TB) / mo
                          </span>
                        </div>
                        <p className="text-xs text-zinc-500 font-sans mt-1.5">
                          Total monthly video egress (10 Mbps H.264 stream)
                        </p>
                      </div>

                      {/* Key Cost Metric Box */}
                      <div className="bg-white border border-zinc-200 p-4 mb-5 space-y-2 shadow-xs">
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-zinc-600 font-sans">Monthly GPU Compute:</span>
                          <span className="font-mono font-bold text-black">$1,200 – $2,000+ / mo</span>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm border-t border-zinc-200/80 pt-2">
                          <span className="text-zinc-600 font-sans">Cost Per Session:</span>
                          <span className="font-mono font-bold text-black">$0.12 – $0.20</span>
                        </div>
                        <div className="flex items-center justify-between text-xs sm:text-sm border-t border-zinc-200/80 pt-2">
                          <span className="text-zinc-600 font-sans">Marginal 1k User Surge:</span>
                          <span className="font-mono font-bold text-black">$120 – $200+</span>
                        </div>
                      </div>

                      {/* Architecture Mechanism */}
                      <div className="space-y-2 text-xs sm:text-sm text-zinc-600 font-sans leading-relaxed">
                        <p>
                          <strong>How it scales:</strong> Dedicated AWS G4dn/G5 instances render Lumen ray-tracing, streaming 375 MB of video per 5-minute session.
                        </p>
                        <p>
                          Delivers unmatched photorealism to budget devices, but costs scale with every active minute. Spikes require pre-allocated warm server capacity.
                        </p>
                      </div>
                    </div>

                    {/* Scale Verdict */}
                    <div className="pt-4 border-t border-zinc-200 flex items-center justify-between text-xs">
                      <span className="text-zinc-500 uppercase tracking-wider font-semibold text-[10px]">
                        Traffic Scalability:
                      </span>
                      <span className="font-bold text-black font-sans">
                        • Constrained by GPU Capacity
                      </span>
                    </div>
                  </div>

                </div>

                {/* ── BOTTOM TAKEAWAY FOOTER BAR ── */}
                <div className="bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FiZap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                      <strong className="text-white">CTO Decision Rule:</strong> Use Browser-Native for 95% of ecommerce traffic; reserve UE5 Pixel Streaming for high-ticket VIP showrooms.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-sm font-mono">
                    <span>75× SPREAD</span>
                  </div>
                </div>

                {/* ── SUB-NOTE ── */}
                <div className="bg-zinc-50 px-5 py-2.5 border-t border-zinc-200 text-[11px] text-zinc-500 font-sans text-center sm:text-left">
                  *Based on AWS EC2 G5 instance rates ($1.20/hr) and Tier-1 CDN edge egress pricing as of October 2026.
                </div>
              </div>
            </article>

            {/* ══════ ENTRY 09: WHICH ARCHITECTURE TO CHOOSE ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-8 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  09
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  Which Architecture Should You Choose?
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-sans">
                  <div className="p-3 bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-bold">1.</span>
                    <div><strong className="text-zinc-900">Choose Browser-Native (Three.js/PlayCanvas):</strong> For high-traffic consumer shopping, modular products, and zero per-session GPU server costs.</div>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-bold">2.</span>
                    <div><strong className="text-zinc-900">Choose Three.js:</strong> When your dev team demands custom Next.js/React architecture, custom shaders, and headless commerce state control.</div>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-bold">3.</span>
                    <div><strong className="text-zinc-900">Choose PlayCanvas:</strong> When 3D artists need a shared visual editor to iterate lighting, materials, and scenes without engineering rebuilds.</div>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-bold">4.</span>
                    <div><strong className="text-zinc-900">Choose Cloud Pixel Streaming:</strong> For ultra-luxury automotive/real estate presentations where photorealism is paramount and sessions are guided.</div>
                  </div>
                  <div className="p-3 bg-zinc-50 border border-zinc-200 flex items-start gap-2.5">
                    <span className="text-[#2563EB] font-bold">5.</span>
                    <div><strong className="text-zinc-900">Deploy a Hybrid Approach:</strong> Lightweight browser-native 3D for broad shopping, with an optional "Launch Photoreal VIP Showroom" button.</div>
                  </div>
                </div>
              </div>

              <div className="md:order-2">
                <Frame
                  src={steeringImg}
                  cap="BMW Steering Wheel 3D Configurator — Browser-native real-time customization under 2 MB"
                  alt="Enterprise 3D Configurator Architecture"
                />
              </div>
            </article>

            {/* ══════ ENTRY 10: TECHNICAL REFERENCES ══════ */}
            <article className="py-8 sm:py-12 border-b border-zinc-200">
              <div className="max-w-3xl mb-4">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-2">
                  10
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl text-zinc-900 leading-tight mb-1">
                  Technical Documentation References
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs font-mono">
                <a href="https://threejs.org/docs/pages/WebGPURenderer.html" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[1] Three.js WebGPURenderer</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://dev.epicgames.com/documentation/unreal-engine/overview-of-pixel-streaming-in-unreal-engine" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[2] Epic Games Pixel Streaming</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://dev.playcanvas.com/products/engine" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[3] PlayCanvas Engine Overview</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://threejs.org/docs/pages/DRACOLoader.html" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[4] Three.js DRACOLoader Docs</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://threejs.org/docs/pages/KTX2Loader.html" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[5] Three.js KTX2Loader Docs</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://developer.playcanvas.com/user-manual/optimization/texture-compression/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors">
                  <span>[6] PlayCanvas Texture Compression</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
                <a href="https://shopify.dev/docs/api/functions/latest/cart-transform" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-50 border border-zinc-200 hover:border-zinc-900 flex items-center justify-between text-zinc-800 transition-colors sm:col-span-2">
                  <span>[7] Shopify Cart Transform API Documentation</span>
                  <FiExternalLink className="shrink-0 text-zinc-400" />
                </a>
              </div>
            </article>

          </div>
        </section>

        {/* ══════ SECTION: TECHNICAL SCOPING & STRATEGY CTA ══════ */}
        <section className="py-8 sm:py-14 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-1 text-sm sm:text-base">
              Enterprise 3D Technical Scoping
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-3">
              Planning an Enterprise 3D Configurator? Let's Benchmark Your Architecture.
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm leading-relaxed mb-6 max-w-2xl mx-auto">
              Review your target product complexity, device coverage, and infrastructure budget before committing to costly technical architecture.
            </p>

            <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-6 text-left max-w-2xl mx-auto mb-6 shadow-sm text-xs sm:text-sm">
              <h3 className="font-bold uppercase tracking-wider text-zinc-900 mb-2.5">
                What the 15-Minute Technical Call Covers:
              </h3>
              <ul className="space-y-2 text-zinc-700 font-sans">
                <li><strong>1. Asset Complexity Audit:</strong> CAD geometry density, material counts, and mobile VRAM feasibility.</li>
                <li><strong>2. Infrastructure Modeling:</strong> 3-year CDN vs cloud GPU streaming costs for your traffic.</li>
                <li><strong>3. Headless Integration:</strong> Mapping configuration state to Next.js, Shopify Cart Transform, and ERP.</li>
                <li><strong>4. Prototype Roadmap:</strong> Scope and delivery milestones for a high-converting MVP in 2–4 weeks.</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free 15-Minute Technical Call</span>
                <FiArrowRight className="text-sm" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-3 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-black font-extrabold" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="text-zinc-800" />
                    <span>Share Matrix</span>
                  </>
                )}
              </button>
            </div>

            <div className="mt-10 text-center">
              <div className="font-serif italic text-2xl text-zinc-900 font-semibold mb-1">
                Elipse Studio
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">
                Elipse Studio develops browser-native WebGL / Three.js 3D configurators, PlayCanvas applications, and Unreal Engine 5 cloud-streamed spatial experiences for global brands including Volvo, BMW, and Jetour.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Enterprise3dConfiguratorArticle;