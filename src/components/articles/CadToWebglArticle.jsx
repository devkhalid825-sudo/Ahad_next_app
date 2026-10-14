'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiCheckCircle
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// Main Configurator Service Images (from ProductConfiguratorsPage)
import sharkImgRaw from '../../assets/About-page/shark.webp';
import kiaImgRaw from '../../assets/About-page/kia.webp';
import volvoImgRaw from '../../assets/ElipseImages/hero/volve-configrator.webp';
import inverexImgRaw from '../../assets/ElipseImages/projects/G-1.webp';
import seatImgRaw from '../../assets/ElipseImages/projects/seat-2-1.webp';
import marineImgRaw from '../../assets/About-page/marine.webp';
import inverxImgRaw from '../../assets/About-page/inverx.webp';

const sharkImg = getImgSrc(sharkImgRaw);
const kiaImg = getImgSrc(kiaImgRaw);
const volvoImg = getImgSrc(volvoImgRaw);
const inverexImg = getImgSrc(inverexImgRaw);
const seatImg = getImgSrc(seatImgRaw);
const marineImg = getImgSrc(marineImgRaw);
const inverxImg = getImgSrc(inverxImgRaw);

const Frame = ({ src, cap, alt }) => (
  <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-200/80 shadow-md group w-full">
    <img
      alt={alt || cap || 'CAD to WebGL Optimization'}
      src={src}
      loading="lazy"
      decoding="async"
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />
    {cap && (
      <div className="absolute bottom-2 left-3 text-[11px] font-serif italic text-white/90 bg-black/50 px-2 py-0.5 rounded">
        {cap}
      </div>
    )}
  </figure>
);

const CadToWebglArticle = () => {
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

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ HERO SECTION (EXACT LEAP FORMAT) ══════ */}
        <section className="relative bg-white text-neutral-900 py-10 sm:py-16 overflow-hidden mb-8 sm:mb-12">
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
            {/* Meta Category Tag */}


            {/* Main Center Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-8 sm:mb-10 px-4">
              CAD to WebGL: How Enterprise Brands Convert Heavy Engineering Files into{' '}
              <span className="text-[#2563EB]">Sub-2MB Interactive 3D Web Experiences</span>{' '}
              (2026 Guide)
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 items-center relative">
              {/* Left Column */}
              <div className="text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Your SolidWorks assembly is 1.2GB with 14 million polygons. Your mobile buyer&apos;s browser has 150MB of VRAM. Here is the exact 4-step pipeline we use to bridge that gap.
                </p>
                <div className="flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={handleScrollToJournal}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                  >
                    Explore Pipeline ↓
                  </button>
                  <Link
                    href="/contact"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#2563EB] text-white text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm text-center"
                  >
                    Scope CAD File ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Showcase Frame with circular bg */}
              <div className="relative flex justify-center px-4 sm:px-0">
                <div className="absolute w-72 h-72 sm:w-[30rem] sm:h-[30rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">⚡</span>
                </div>
                <div className="relative w-64 h-[20rem] sm:w-[24rem] sm:h-[28rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={sharkImg}
                    alt="BYD Shark 6 Real-Time 3D Configurator"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Right Column: Stars + Stat */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
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
                CAD software uses mathematical NURBS surfaces built for manufacturing precision. WebGL only renders triangles. Attempting to push raw CAD tessellation into a browser floods the GPU with 14M+ triangles and internal fasteners the buyer will never see.
              </p>
              <a
                href="#journal"
                className="inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-0.5 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the 5 optimization stages below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 rotate-[0.6deg] relative shadow-sm">
              <Frame src={kiaImg} cap="Kia Sportage browser-based 3D configurator — sub-2MB WebGL asset" alt="Real-time WebGL product configurator" />
            </div>
          </div>
        </section>

        {/* ══════ THE 5 STAGES (ALTERNATING LEAP JOURNAL FORMAT) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
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
                <Frame src={inverxImg} cap="Inverex e-bike chassis retopology — 60 FPS performance on mobile" alt="Polygon decimation and chassis retopology" />
              </div>
            </article>

            {/* ── Entry 02: Normal Map & AO Baking ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  High-to-low normal and ambient occlusion baking
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Reducing triangles removes surface micro-details: machined bevels, subtle panel seams, and brushed metal grain. Without them, a product renders like an unfinished plastic model.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  We retain the original high-poly CAD reference to bake surface details into a <strong>tangent space normal map</strong>. The GPU calculates light reflections across virtual bevels that carry zero extra geometry. Concurrently, <strong>ambient occlusion (AO)</strong> is baked into recessed joints, providing realistic soft shadowing without costly real-time ray tracing.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={seatImg} cap="Automotive seat customizer — micro-leather normal map and AO baking" alt="Normal map and ambient occlusion baking" />
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
                  Channel packing collapses three grayscale maps into the RGB channels of a single combined image: <strong>Roughness into Red, Metallic into Green, and AO into Blue (ORM)</strong>. The GPU shader samples all three simultaneously in one draw call, slashing texture payload by <strong>60% to 65%</strong> with zero quality degradation.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={marineImg} cap="Pursuit 288 Yacht — single-pass ORM channel packing on marine finishes" alt="PBR texture channel packing" />
              </div>
            </article>

            {/* ── Entry 04: Draco & KTX2 Compression ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Draco geometry and KTX2 texture supercompression
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  The final compression layer applies two algorithms designed specifically for web-delivered 3D:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563EB]">• Draco:</span> Compresses vertices, normals, and index buffers by <strong>70% to 85%</strong> with native browser WebAssembly decoding.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-[#2563EB]">• KTX2 / Basis Universal:</span> Transcodes textures at runtime directly into GPU-native memory formats (ASTC for iOS, ETC2 for Android, BC7 on desktop), preventing iOS Safari VRAM crashes.
                  </li>
                </ul>
              </div>
              <div className="md:order-2">
                <Frame src={inverexImg} cap="Costa Golf Cart — Draco geometry and KTX2 texture supercompression" alt="Draco and KTX2 compression" />
              </div>
            </article>

            {/* ── Entry 05: Benchmark & Case Study ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Case study benchmark: 1.2GB assembly to 1.6MB web GLB
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  On an industrial equipment assembly received as a SolidWorks STEP export (previously crashing mobile browsers in under 4 seconds), our pipeline achieved:
                </p>
                <div className="my-4 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm">
                  <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-2 bg-neutral-100/80 px-3.5 py-2 border-b border-neutral-200 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                    <span>Metric</span>
                    <span className="text-center text-rose-600">Raw CAD</span>
                    <span></span>
                    <span className="text-right text-emerald-600">Web-Ready</span>
                  </div>
                  <div className="divide-y divide-neutral-100 text-xs sm:text-sm">
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-2 px-3.5 py-2.5">
                      <span className="font-semibold text-neutral-800">File Size</span>
                      <span className="text-center text-rose-600 font-medium line-through font-mono text-[11px] sm:text-xs">1.24 GB</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono">1.6 MB</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-2 px-3.5 py-2.5 bg-neutral-50/70">
                      <span className="font-semibold text-neutral-800">Polygon Count</span>
                      <span className="text-center text-rose-600 font-medium line-through font-mono text-[11px] sm:text-xs">14.2M</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono">58,400 Tris</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-2 px-3.5 py-2.5">
                      <span className="font-semibold text-neutral-800">Mobile 4G Load</span>
                      <span className="text-center text-rose-600 font-medium text-[11px] sm:text-xs">Crash</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono">0.9 Seconds</span>
                    </div>
                    <div className="grid grid-cols-[1.3fr_1fr_20px_1.3fr] items-center gap-2 px-3.5 py-2.5 bg-neutral-50/70">
                      <span className="font-semibold text-neutral-800">iPhone 14 Safari</span>
                      <span className="text-center text-rose-600 font-medium text-[11px] sm:text-xs">0 FPS</span>
                      <span className="text-neutral-400 text-xs text-center">→</span>
                      <span className="text-right text-emerald-600 font-bold font-mono">60 FPS Stable</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-3 italic">
                  Turnaround: 11 working days. Deployed as an <Link href="/services/interactive-configurators" className="text-[#2563EB] underline font-medium hover:text-blue-800">interactive 3D product experience</Link> across global distributor portals.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={volvoImg} cap="Volvo S90 vehicle configurator — sub-2MB production asset running at 60 FPS" alt="Industrial vehicle WebGL configurator" />
              </div>
            </article>
          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS (LEAP FORMAT) ══════ */}
        <section className="py-12 sm:py-16 my-12 sm:my-16 border-t border-zinc-200">
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
              Share one representative product file under NDA. We will assess optimization complexity, confirm mobile performance feasibility, and give you a fixed timeline and cost estimate for your specific asset pipeline.
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
