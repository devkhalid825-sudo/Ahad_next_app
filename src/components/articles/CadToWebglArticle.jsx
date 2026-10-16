'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiCheckCircle,
  FiVolume2,
  FiVolumeX,
  FiExternalLink
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Configurator & Engineering Showcase Assets (all verified .webp)
import _volvoHero from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _sharkImg from '../../assets/About-page/shark.webp';
import _kiaImg from '../../assets/About-page/kia.webp';
import _seatImg from '../../assets/About-page/seat.webp';
import _inverxImg from '../../assets/About-page/Jetour.webp';
import _inverexImg from '../../assets/ElipseImages/projects/G-1.webp';
import _marineImg from '../../assets/About-page/marine.webp';

const volvoHero = getImgSrc(_volvoHero);
const sharkImg = getImgSrc(_sharkImg);
const kiaImg = getImgSrc(_kiaImg);
const seatImg = getImgSrc(_seatImg);
const inverxImg = getImgSrc(_inverxImg);
const inverexImg = getImgSrc(_inverexImg);
const marineImg = getImgSrc(_marineImg);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-3 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-200/80 shadow-md group w-full">
      <img
        alt={alt || cap || 'CAD to WebGL Optimization'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {actionLink && (
      <div className="flex justify-center pt-1">
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto text-center"
        >
          <span>{actionText || 'Launch Configurator'}</span>
          <FiExternalLink className="text-sm" />
        </a>
      </div>
    )}
  </div>
);

const CadToWebglArticle = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = React.useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleSound = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const action = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: action, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleScrollToJournal = () => {
    const el = document.getElementById('journal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'CAD TO WEBGL',
    '✦',
    'SOLIDWORKS TO WEBGL',
    '✦',
    'POLYGON DECIMATION',
    '✦',
    'NORMAL MAP BAKING',
    '✦',
    'PBR CHANNEL PACKING',
    '✦',
    'DRACO & KTX2',
    '✦',
    '60 FPS MOBILE',
    '✦',
    'SUB-2MB PAYLOAD',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ HERO SECTION (EXACT LEAP/AUTOMOTIVE RESPONSIVE FORMAT) ══════ */}
        <section className="relative bg-white text-neutral-900 pt-2 pb-8 sm:py-16 overflow-hidden mb-8 sm:mb-12">
          {/* Decorative ✦ top-left */}
          <div className="hidden lg:block absolute top-8 left-10 text-[#2563EB] text-3xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>

          {/* Decorative arrow top-right */}
          <div className="hidden lg:block absolute top-8 right-12 text-[#2563EB] text-lg font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">

            {/* Main Center Headline */}
            <h1 className="text-xl sm:text-3xl md:text-[32px] lg:text-4xl xl:text-[38px] font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug mb-5 sm:mb-8 px-6 sm:px-8">
              CAD to WebGL: How Enterprise Brands Convert Heavy Engineering Files into{' '}
              <span className="text-[#2563EB]">Sub-2MB Interactive 3D Web Experiences</span>{' '}
              (2026 Guide)
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 items-center relative">
              {/* Left Column: Body Text & CTA Buttons */}
              <div className="text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 order-2 md:order-1">
                <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Your SolidWorks assembly is 1.2GB with 14 million polygons. Your mobile buyer&apos;s browser has 150MB of VRAM. This is the exact 4-step pipeline we use to bridge that gap — polygon decimation, normal baking, PBR channel packing, and Draco/KTX2 compression.
                </p>
                <div className="flex flex-row gap-2 sm:gap-2.5 w-full">
                  <button
                    onClick={handleScrollToJournal}
                    className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center whitespace-nowrap"
                  >
                    Explore Insights ↓
                  </button>
                  <Link
                    href="/contact"
                    className="flex-1 sm:flex-initial px-3 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm text-center whitespace-nowrap"
                  >
                    Scope CAD File ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Showcase Frame with Exact 9:16 Responsive Framing */}
              <div className="relative flex justify-center items-center px-2 sm:px-0 w-full order-1 md:order-2 my-2 sm:my-0">
                {/* Circular background decoration */}
                <div className="absolute w-56 h-56 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 text-neutral-400 text-xl select-none">⚡</span>
                </div>

                {/* Video Reel Frame */}
                <div
                  onClick={toggleSound}
                  className="relative w-full max-w-[13rem] sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10 cursor-pointer"
                >
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/GF24vTpWEsc?autoplay=1&mute=1&loop=1&playlist=GF24vTpWEsc&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="CAD to WebGL 3D Configurator Reel"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-contain border-0"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Sound Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleSound();
                    }}
                    type="button"
                    className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
                    title={isMuted ? 'Unmute Video' : 'Mute Video'}
                    aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                  >
                    {isMuted ? (
                      <FiVolumeX className="text-base text-white/90" />
                    ) : (
                      <FiVolume2 className="text-base text-blue-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Stars + Stat */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 order-3 md:order-3">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  1.2GB → 1.6MB
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Geometry Translation
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;The 1.2GB CAD file is not the problem. It is a manufacturing document. The web asset is a separate deliverable — built from the CAD reference, not derived from it.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1">— Bilal Lania</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Upload a Sample CAD File for Assessment ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Bilal Lania · CEO & Creative Director, Elipse Studio</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleCopyLink}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {copied ? <><FiCheck className="text-emerald-400" /> Copied</> : <><FiCopy /> Share Article</>}
              </button>
            </div>
          </div>
        </section>

        {/* ══════ MARQUEE TICKER ══════ */}
        <section className="my-12 sm:my-16 overflow-hidden border-y border-zinc-200 py-5 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ INTRO: A DISPATCH FROM 3D ENGINEERING ══════ */}
        <section className="py-8 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-4">
              <div className="italic text-[#2563EB] text-base mb-3 font-serif">
                The CAD-to-Web Paradox
              </div>
              <p className="text-xl sm:text-2xl leading-snug text-zinc-800 font-sans mb-4">
                When engineering opens an 800MB–1.4GB SolidWorks assembly, they conclude it cannot run in a browser. They are right about the raw file, but wrong about the conclusion.
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                A production-grade CAD assembly contains internal bolts, bracket assemblies, and tolerance surfaces built for manufacturing accuracy. WebGL only renders triangles. Attempting to push raw CAD tessellation into a browser floods mobile GPUs with 14M+ triangles and internal hardware the buyer will never see.
              </p>
              <div className="flex flex-wrap gap-2.5 sm:gap-4 pt-1 mb-4">
                <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full whitespace-nowrap"><strong>14.2M → 58K</strong> Tris</span>
                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap"><strong>Sub-2MB</strong> Payload</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full whitespace-nowrap"><strong>60 FPS</strong> Mobile</span>
              </div>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 rotate-[0.6deg] relative shadow-sm">
              <Frame
                src={kiaImg}
                cap="Kia Sportage browser-based 3D configurator — sub-2MB WebGL asset"
                alt="Real-time WebGL product configurator"
                actionLink="https://legacy.elipsestudio.com/Kia/"
                actionText="Launch KIA Configurator"
              />
            </div>
          </div>
        </section>

        {/* ══════ THE 4 PILLARS (EXACT ALTERNATING LEAP JOURNAL FORMAT) ══════ */}
        <section id="journal" className="pt-10 sm:pt-16 pb-0 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-5 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">The CAD to WebGL master pipeline</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026</span>
            </div>

            {/* ── Entry 01: Decimation & Quad Retopology ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Automated polygon decimation and quad retopology
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  A typical CAD assembly wastes 30–60% of its polygon budget on invisible internal fasteners, brackets, and bolts. We strip internal geometry first, reducing raw count by over 50% immediately.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  For remaining exterior surfaces, we combine automated decimation with manual quad retopology. Rebuilding topology along the product&apos;s natural edge flow targets <strong>15,000 to 80,000 triangles</strong> for a complete <Link href="/capabilities" className="text-[#2563EB] underline font-medium hover:text-blue-800">3D web configurator</Link> hero asset — low enough to sustain 60 FPS on mobile, high enough to retain crisp silhouettes.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={sharkImg}
                  cap="BYD Shark 6 chassis retopology — 60 FPS performance on mobile viewports"
                  alt="Polygon decimation and vehicle chassis retopology"
                  actionLink="https://legacy.elipsestudio.com/Zeus-Configurator/"
                  actionText="Launch Zeus Configurator"
                />
              </div>
            </article>

            {/* ── Entry 02: Normal Map & AO Baking ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  High-to-low normal map and ambient occlusion baking
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Reducing triangles removes surface micro-details: machined bevels, subtle panel seams, and brushed metal grain. Without them, a product renders like an unfinished plastic model.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  We retain the original high-poly CAD reference to bake surface details into a <strong>tangent space normal map</strong>. The GPU calculates light reflections across virtual bevels that carry zero extra geometry. Concurrently, <strong>ambient occlusion (AO)</strong> is baked into recessed joints, providing realistic soft shadowing without costly real-time ray tracing.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src={seatImg}
                  cap="Automotive seat customizer — micro-leather normal map and AO baking"
                  alt="Normal map and ambient occlusion baking"
                  actionLink="https://seat-cover-configurator.inknalgorithm.com/"
                  actionText="Launch Seat Configurator"
                />
              </div>
            </article>

            {/* ── Entry 03: PBR Channel Packing ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  PBR texture channel packing (ORM workflow)
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Standard PBR materials (Three.js, PlayCanvas) require Albedo, Roughness, Metallic, Normal, and Ambient Occlusion maps. Loading each as a separate file can bloat texture data to 30MB–50MB before compression.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Channel packing collapses three grayscale maps into the RGB channels of a single combined image: <strong>Roughness into Red, Metallic into Green, and AO into Blue (ORM)</strong>. The GPU reads all three simultaneously, slashing texture payload by <strong>60% to 65%</strong> with zero quality degradation.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={marineImg}
                  cap="Pursuit 288 Yacht — single-pass ORM channel packing on marine finishes"
                  alt="PBR texture channel packing"
                  actionLink="https://legacy.elipsestudio.com/Kia/"
                  actionText="Launch Interactive Showcase"
                />
              </div>
            </article>

            {/* ── Entry 04: Draco Compression & Verified Benchmark ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-10 sm:pt-12 pb-6 sm:pb-8 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Draco geometry, KTX2 compression & case study benchmark
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  The final compression stage applies <strong>Draco</strong> (compressing geometry by 70–85%) and <strong>KTX2 / Basis Universal</strong> (runtime GPU transcoding into ASTC/ETC2/BC7 to prevent iOS Safari VRAM crashes).
                </p>

                {/* Benchmark Card */}
                <div className="my-4 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm w-full">
                  <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-1.5 sm:gap-2 bg-neutral-100/80 px-3 sm:px-3.5 py-2 border-b border-neutral-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <span>Metric</span>
                    <span className="text-center text-rose-600">Raw CAD</span>
                    <span></span>
                    <span className="text-right text-emerald-600">Web-Ready</span>
                  </div>
                  <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2">
                      <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">File Size</span>
                      <span className="text-center text-rose-600 font-medium line-through font-mono text-[10px] sm:text-xs">1.24 GB</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono text-[11px] sm:text-xs">1.6 MB</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 bg-neutral-50/70">
                      <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">Polygon Count</span>
                      <span className="text-center text-rose-600 font-medium line-through font-mono text-[10px] sm:text-xs">14.2M</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono text-[11px] sm:text-xs">58,400 Tris</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2">
                      <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">Mobile 4G Load</span>
                      <span className="text-center text-rose-600 font-medium text-[10px] sm:text-xs">Crash</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono text-[11px] sm:text-xs">0.9 Seconds</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-2 bg-neutral-50/70">
                      <span className="font-semibold text-neutral-800 text-[11px] sm:text-xs">iPhone 14 Safari</span>
                      <span className="text-center text-rose-600 font-medium text-[10px] sm:text-xs">0 FPS</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono text-[11px] sm:text-xs">60 FPS Stable</span>
                    </div>
                  </div>
                </div>

                <p className="text-zinc-700 font-sans leading-relaxed text-xs sm:text-sm">
                  Turnaround: 11 working days. Deployed as an <Link href="/services/interactive-configurators" className="text-[#2563EB] underline font-medium hover:text-blue-800">interactive 3D product experience</Link> across global ecommerce and distributor portals.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src={volvoHero}
                  cap="Volvo S90 vehicle configurator — sub-2MB production asset running at 60 FPS"
                  alt="Industrial vehicle WebGL configurator"
                  actionLink="https://legacy.elipsestudio.com/Zeus-Configurator/"
                  actionText="Launch Configurator"
                />
              </div>
            </article>
          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS (EXACT LEAP/AUTOMOTIVE FORMAT) ══════ */}
        <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-serif italic text-[#2563EB] mb-3">
              Closing reflections
            </div>
            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-8">
              Why your CAD file is the start of your web experience — not the barrier
            </h3>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-zinc-700 font-serif leading-relaxed">
              The 1.2GB CAD file is not the problem. The problem is treating it as if it is a render-ready asset. It is a manufacturing document. The web asset is a separate engineering deliverable — built from the CAD reference, not derived from it.
            </p>
            <p className="font-serif italic text-lg text-zinc-900 leading-relaxed">
              Upload a sample CAD file and let us map your optimization pipeline.
            </p>
            <p className="text-zinc-700 font-serif leading-relaxed">
              Book a free 15-minute technical scoping call. Share one product file under NDA and we will assess optimization complexity, confirm mobile performance feasibility, and give you timeline and cost estimates for your specific asset pipeline.
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="font-serif italic text-2xl text-[#2563EB]">
              Bilal Lania
            </div>
            <p className="text-xs uppercase tracking-wider text-zinc-500 font-medium mt-1">
              CEO & Creative Director · Elipse Studio
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/contact"
                className="px-6 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm"
              >
                Book a Free Technical Scoping Call ↗
              </Link>
              <Link
                href="/capabilities"
                className="px-6 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-all shadow-sm"
              >
                Explore Capabilities
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CadToWebglArticle;
