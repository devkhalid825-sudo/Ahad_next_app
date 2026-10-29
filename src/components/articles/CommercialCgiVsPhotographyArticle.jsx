'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiClock,
  FiDollarSign,
  FiLayers,
  FiZap,
  FiPackage,
  FiSun,
  FiCamera,
  FiBox,
  FiTrendingUp,
  FiSliders,
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

// ── Images: Pre-imported for Ahmed Foods, Malka Foods & CGI Visuals ──
// Users can easily swap these imports or image references below
import _heroImg from '../../assets/About-page/Jelly_02.png';
import _malkaImg from '../../assets/Ahmed-food/jam&spread/09.webp';
import _jamImg from '../../assets/About-page/Digital.png';
import _biryaniImg from '../../assets/Ahmed-food/bombay-biryani/11.webp';
import _renderingImg from '../../assets/About-page/Broken.png';

const heroImg = getImgSrc(_heroImg);
const malkaImg = getImgSrc(_malkaImg);
const jamImg = getImgSrc(_jamImg);
const biryaniImg = getImgSrc(_biryaniImg);
const renderingImg = getImgSrc(_renderingImg);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || 'Commercial 3D CGI Packaging Render'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          <span>{actionText || 'View Case Study'}</span>
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

const CommercialCgiVsPhotographyArticle = () => {
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
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'COMMERCIAL CGI',
    '✦',
    'TRADITIONAL PHOTOGRAPHY',
    '✦',
    '70% FASTER TURNAROUND',
    '✦',
    'AHMED FOODS',
    '✦',
    'MALKA FOODS',
    '✦',
    'ZERO PHYSICAL RESHOOTS',
    '✦',
    'MASTER 3D DIGITAL TWIN',
    '✦',
    'HOUDINI FLUID SIMS',
    '✦',
    '50% LOWER ASSET COSTS',
    '✦',
    'UNLIMITED SKU VARIANTS',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20 bg-white">

        {/* ══════ HERO SECTION (3-COLUMN LEAP FORMAT) ══════ */}
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

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">

            {/* ── Main Center Headline ── */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
              Commercial CGI vs Traditional Product Photography:{' '}
              <span className="text-[#2563EB]">Why CPG Brands Cut Turnaround by 70%</span>{' '}
              with 3D Pipelines
            </h1>

            {/* ── Subtitle / Meta Bar ── */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-8 sm:mb-10">
              2026 ROI Breakdown · Ahmed Foods · Malka Foods · Elipse Studio
            </p>

            {/* ── Content Grid: Desktop 3 cols | Mobile (1: Image, 2: Body & Button, 3: Stats) ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 items-center relative">

              {/* Center Column on Mobile (order-1), Middle on Desktop (order-2) */}
              <div className="order-1 md:order-2 relative flex justify-center px-4 sm:px-0 my-2 sm:my-0">
                {/* Circular background glow shape */}
                <div className="hidden sm:flex absolute w-[28rem] h-[28rem] lg:w-[32rem] lg:h-[32rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">✦</span>
                </div>

                {/* Hero Product Render Card */}
                <div className="relative w-72 h-[22rem] sm:w-[24rem] sm:h-[28rem] lg:w-[28rem] lg:h-[32rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={heroImg}
                    alt="Commercial CGI Packaging Render — Ahmed Foods Crystal Jelly"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Left Column on Desktop (order-1), Below Image on Mobile (order-2) */}
              <div className="order-2 md:order-1 block text-left space-y-3 sm:space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-6 md:mt-0">
                <div className="w-8 h-8 rounded-lg bg-neutral-100 border border-neutral-300 text-neutral-900 flex items-center justify-center text-base">
                  <FiLayers />
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  For food, beverage, and CPG brands, physical studio shoots cost £4,000–£18,000 per SKU and drag launches by 8–12 weeks. Master 3D packaging twins eliminate prototype couriers, glare, and reshoots permanently.
                </p>
                <button
                  onClick={handleScrollToJournal}
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-300 text-xs sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore Production Breakdown ↓
                </button>
              </div>

              {/* Right Column: Stars + Key Stat + Takeaway Box (order-3) */}
              <div className="order-3 md:order-3 flex text-center md:text-left flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-6 md:mt-0">
                <div className="flex gap-0.5 text-neutral-900 justify-center text-base sm:text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  70% Faster
                </div>
                <p className="text-[11px] sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Campaign Turnaround vs Physical Studio
                </p>
                <div className="mt-2 sm:mt-3 bg-neutral-50 border border-neutral-300 p-3.5 sm:p-4 rounded-none text-center md:text-left w-full shadow-sm">
                  <p className="text-[11px] sm:text-xs text-zinc-800 font-medium leading-snug">
                    &ldquo;From a single master 3D packaging twin, our teams render any angle, lighting, or seasonal flavour swap in hours—without physical studios, couriers, or reshoots.&rdquo;
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-neutral-600 mt-1">— Elipse Studio Production Data</p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-10 sm:mt-14 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-zinc-300 transition-colors"
              >
                Book a 15-min scoping consultation ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | October 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a
                href="#journal"
                className="text-xs sm:text-sm font-semibold text-white underline hover:text-neutral-300 transition-colors cursor-pointer"
              >
                Read Full Breakdown ↓
              </a>
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
          <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-6 sm:gap-10 items-start">
            <div className="md:pt-2">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-2 font-serif">
                Executive Briefing · The Physical Studio Bottleneck
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                The 30-Year-Old Photo Workflow Is Broken.
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A physical prototype is couriered to a studio. Lights are adjusted; reflections bounce unpredictably off metallic foils; samples arrive scuffed. Someone spots a pre-production font error on the dieline. The shoot resets.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                This cycle—prototype, ship, shoot, revise, reshoot—costs enterprise FMCG brands <strong>£4,000–£18,000 per SKU</strong> per campaign and burns weeks of critical market launch time. In fast-moving consumer goods, physical photography is no longer just expensive; it is an operational liability.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={renderingImg}
                  alt="Physical Studio Bottleneck vs 3D CGI Master Digital Twin"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Elipse Studio Master 3D Packaging Twin · Procedural condensation, foil embossing & zero courier delay
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL / CONTENT ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Operational & Economic Analysis</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026 Production Data</span>
            </div>

            {/* ══════ ENTRY 01: THE DIGITAL PACKAGING TWIN ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  The Master Digital Twin: Build Once, Deploy Indefinitely
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Instead of photographing a physical object, Elipse Studio builds a master digital packaging twin: a sub-millimetre accurate 3D model with procedurally calibrated materials—metallic foils, matte paperboard, condensation drops, and embossed typography.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Zero Prototype Dependency:</strong> Production begins the instant flat 2D dielines and label vectors are approved.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Instant Angle & Lighting Swaps:</strong> Need a top-down hero shot or a side-dramatic sweep? Rendered digitally in minutes without re-rigging.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Flawless Glare-Free Physics:</strong> Mathematically controlled HDR IBL ensures metallic closures and holographic labels never suffer blown-out hotspots.</span>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={jamImg}
                  cap="Ahmed Foods Jam & Spread · Master 3D geometry with procedurally simulated fruit preserve viscosity"
                  alt="Ahmed Foods 3D CGI Packaging"
                />
              </div>
            </article>

            {/* ══════ ENTRY 02: PREMIUM COMPARISON MATRIX ══════ */}
            <article className="py-10 sm:py-16 border-b border-zinc-200">
              <div className="max-w-3xl mb-8">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  02
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold tracking-widest uppercase bg-zinc-100 text-zinc-900 border border-zinc-300 mb-2">
                  Head-to-Head Comparative Matrix
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-2">
                  Traditional Photography vs Commercial CGI Pipeline
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Managing multiple flavour variants across retail channels is not comparing two line items—it is comparing a fragile physical logistics chain against an agile, compounding digital asset library.
                </p>
              </div>

              {/* Modern Flat Comparative Table with Clean Vector Icons */}
              <div className="w-full border border-zinc-300 bg-white shadow-sm mb-8">
                {/* ── TOP HEADER BAR WITH CLEAN ICONS ── */}
                <div className="grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800">
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <FiSliders className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Operational Dimension</span>
                  </div>
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <FiCamera className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Traditional Studio</span>
                  </div>
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-wider text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiBox className="w-4 h-4 text-white shrink-0" />
                      <span>Elipse 3D CGI</span>
                    </div>
                    <span className="hidden md:inline-block text-[9px] bg-white text-black px-2.5 py-0.5 font-extrabold uppercase tracking-widest">
                      Digital Twin
                    </span>
                  </div>
                </div>

                {/* ── TABLE ROWS: Clean Flat Tabular Rows (No rounded pill boxes inside) ── */}
                <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">

                  {/* Row 1: Prototype Sourcing */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Prototype Sourcing</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Physical Packaging Logistics</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Physical sample fabricated, printed & shipped via courier</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Zero physical shipping — built directly from 2D vector dielines</span>
                    </div>
                  </div>

                  {/* Row 2: Studio Day Rate */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Studio Day Rate</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Space, Lighting & Crew</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>£2,000–£6,000 / day + lighting crew, camera rental & catering</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>£0 studio day rate — 100% digital cloud render pipeline</span>
                    </div>
                  </div>

                  {/* Row 3: Label Revisions */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Artwork / Dieline Revision</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Late Packaging Edits</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Triggers full reprint, courier reship & complete studio reshoot</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Texture map swapped & re-rendered in minutes from source file</span>
                    </div>
                  </div>

                  {/* Row 4: Turnaround Time */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Turnaround Time</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Brief to Approved Pack</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>4–6 weeks standard lead time (8–12 weeks across multi-SKUs)</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>5–10 business days for complete multi-format campaign pack</span>
                    </div>
                  </div>

                  {/* Row 5: Fluids & Dynamic Elements */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Fluids, Pours & Splashes</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Sauces, Creams & Condensation</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Costly food stylists, messy reset cycles, melting dairy under hot lights</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Houdini particle physics: accurate viscosity, steam & pour loops</span>
                    </div>
                  </div>

                  {/* Row 6: Per-Variant Cost */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Per-Variant Update Cost</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Flavour / SKU Iterations</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>£800–£1,400 per SKU per shoot cycle</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>£180–£350 per variant from master digital twin</span>
                    </div>
                  </div>

                  {/* Row 7: Multi-Channel Outputs */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Multi-Channel Outputs</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Print, Social, DTC & Web</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Single camera crop; separate shoots required for reels/print</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Simultaneous 4K print, 9:16 reels, e-comm white & 3D WebGL</span>
                    </div>
                  </div>

                </div>

                {/* ── BOTTOM HIGHLIGHT BAR WITH CLEAN ICONS ── */}
                <div className="bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FiZap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                      <strong className="text-white">The Bottom Line:</strong> CGI replaces an entire physical logistics chain with an asset that compounds in value over time.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-sm">
                    <FiTrendingUp className="w-4 h-4 text-black" />
                    <span>Average ROI: 70% Faster · 50% Lower Cost</span>
                  </div>
                </div>
              </div>

              {/* 2 Strategic Breakdown Cards (Clean, Flat, Professional Vector Icons) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">

                {/* Card 1: The Prototype Shipping Problem */}
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiPackage className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Physical Logistics
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">
                    The Prototype Shipping Problem
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Photoshoots demand physical packaging samples—bottles, pouches, embossed cans—that external printers often deliver late or scuffed. If the packaging timeline slips by one week, the studio booking is forfeited. With Elipse Studio, 3D modelling begins the moment a flat 2D dieline vector is shared. No physical sample is ever required.
                  </p>
                </div>

                {/* Card 2: Reflection, Glare & The Reshoot Cycle */}
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiSun className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Lighting & Optics
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">
                    Reflection, Glare & The Reshoot Cycle
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Metallic foils, holographic seals, and glossy glass bottles reflect studio cameras, diffusers, and crew. Achieving clean highlights requires hours of flag adjustments—and often ends in reshoots. In our 3D pipeline, physically calibrated HDR spherical environments illuminate every material with mathematical perfection.
                  </p>
                </div>

              </div>
            </article>

            {/* ══════ ENTRY 03: CAPABILITIES IMPOSSIBLE WITH CAMERAS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Capabilities Structurally Impossible with Physical Cameras
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Commercial CGI is not simply a budget replacement. It unlocks visual fidelity and campaign storytelling formats that cameras cannot physically capture:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      1. Houdini Fluid Dynamics
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Sauce pours, cream swirls, and spice explosions simulated at particle level with accurate viscosity.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      2. Sub-Surface Scattering
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Physically accurate light penetration through jams, jellies, and translucent beverages without glare.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      3. Multi-Format Master Render
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Export 300 DPI A3 print, native 9:16 TikTok cutdowns, and clean white Amazon hero shots simultaneously.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      4. 48-Hour Seasonal Swaps
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Summer, Eid, or Christmas label variants updated in 48–72 hours with camera and lighting locked.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={biryaniImg}
                  cap="Ahmed Foods Bombay Biryani · High-Fidelity 3D Packaging Render with Micro-Embossing"
                  alt="Ahmed Foods Bombay Biryani 3D Render"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: HARD ROI NUMBERS ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Hard Production ROI: The Real Numbers
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Drawn directly from Elipse Studio production accounts across enterprise FMCG clients in 2025–2026.
                </p>
              </div>

              {/* Grid Cards for ROI Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">70%</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Faster Delivery</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">10–14 days vs 8–12 weeks</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900">~75%</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Lower Hero SKU Cost</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">£180–£350 vs £1,200</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900">90%</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Cheaper Flavour Swaps</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">£95–£220 per variant</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black font-extrabold">4 Weeks</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">The Agility Premium</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Campaign live before shelf arrival</p>
                </div>
              </div>

              {/* The Agility Premium Callout */}
              <div className="bg-black text-white rounded-none p-5 sm:p-7 border border-black shadow-sm">
                <div className="flex items-center gap-2.5 text-white font-bold font-sans text-xs sm:text-sm uppercase tracking-wider mb-2.5">
                  <FiZap className="text-sm sm:text-base text-white shrink-0" />
                  <span>The Agility Premium: Pre-Launch Revenue Impact</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-100 leading-relaxed font-sans">
                  The commercial value of speed often exceeds raw cost savings. When full CGI campaign visuals are live across Amazon, e-commerce, and paid media <strong className="text-white font-bold">3–4 weeks before the physical SKU lands on retail shelves</strong>, consumer demand is primed in advance. Ahmed Foods and Malka Foods both leveraged this to sell out opening retail inventory batches.
                </p>
              </div>
            </article>

            {/* ══════ ENTRY 05: CLIENT CASE DEPLOYMENTS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  05
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Client Case Studies: Ahmed Foods & Malka Foods
                </h3>

                {/* Ahmed Foods Card */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 px-2 py-0.5 rounded-none">
                    Ahmed Foods · 20+ SKU Condiment Range
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">
                    Multi-SKU Packaging Library & Sauce Pour Simulations
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    With over 20 SKUs, traditional photoshoots took 10+ weeks with frequent label revision reshoots. Elipse Studio modelled the entire condiment line into a master 3D asset library. Turnaround for new seasonal flavours dropped to under 72 hours, with looping 4K sauce pour animations delivered with zero physical food stylists.
                  </p>
                </div>

                {/* Malka Foods Card */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 font-bold px-2 py-0.5 rounded-none">
                    Malka Foods · Dairy & Culinary Range
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">
                    12 SKUs Across 3 Environments + 10s Fluid Reveal
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Dairy creams spoil and melt rapidly under hot studio lights. Elipse Studio rendered 12 culinary SKUs across 3 distinct lighting environments (kitchen daylight, retail refrigeration, dramatic hero), paired with a 10-second 4K cream pour fluid simulation—eliminating 2 days of physical filming entirely.
                  </p>
                </div>
              </div>

              <div className="md:order-1">
                <Frame
                  src={malkaImg}
                  cap="Malka Foods · 3D Culinary Packaging Asset with Procedural Condensation & Fluid Viscosity"
                  alt="Malka Foods 3D Commercial CGI Render"
                />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ SECTION 06: TECHNICAL SCOPING & STRATEGY CTA ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Technical Scoping Consultation
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Transition Your Packaging Pipeline from Studio to 3D
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Transitioning from physical photography to a commercial CGI pipeline begins with a structured 15-minute audit of your packaging library, production calendar, and multi-channel asset requirements.
            </p>

            {/* Audit Checklist Box */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-none p-5 sm:p-7 text-left max-w-2xl mx-auto mb-8 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 text-center sm:text-left">
                What the 15-Minute Technical Consultation Covers:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">1.</span>
                  <span><strong>Current Workflow Audit:</strong> Evaluate current photography spend, reshoot rates, and lead times.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">2.</span>
                  <span><strong>SKU & Variant Scope:</strong> Map master geometry requirements and interchangeable label layers.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">3.</span>
                  <span><strong>Pipeline Architecture:</strong> Recommend PBR material specs, lighting HDRs, and multi-format outputs.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">4.</span>
                  <span><strong>Indicative Turnaround & Quote:</strong> Costed production proposal for your first campaign pack.</span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-black hover:bg-neutral-800 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book Free 15-Minute Scoping Call</span>
                <FiArrowRight className="text-sm" />
              </a>
              <button
                onClick={handleCopyLink}
                className="w-full sm:w-auto px-5 py-3.5 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                {copied ? (
                  <>
                    <FiCheck className="text-black font-extrabold" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <FiCopy className="text-zinc-800" />
                    <span>Share Breakdown</span>
                  </>
                )}
              </button>
            </div>

            {/* Author / Credential Signature */}
            <div className="mt-12 text-center">
              <div className="font-serif italic text-2xl text-zinc-900 font-semibold mb-1">
                Elipse Studio
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">
                Elipse Studio develops high-fidelity 3D CGI pipelines, Houdini fluid simulations, and interactive 3D configurators for enterprise FMCG, luxury goods, and automotive brands. Client benchmarks reflect real production engagements delivered in 2025–2026.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default CommercialCgiVsPhotographyArticle;

