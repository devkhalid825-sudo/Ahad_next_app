'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  FiEye,
  FiVolume2,
  FiVolumeX,
  FiShield,
  FiActivity,
  FiMaximize2
} from 'react-icons/fi';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _roohafzaImg from '../../assets/About-page/roohafza.webp';
import _unirealImg from '../../assets/About-page/anamorphicanimation.webp';
import _roohafza2Img from '../../assets/About-page/roohafza-2.png';
import _lahoreImg from '../../assets/About-page/lahore.webp';
import _lahore2Img from '../../assets/About-page/lahore-2.webp';

const roohafzaImg = getImgSrc(_roohafzaImg);
const unirealImg = getImgSrc(_unirealImg);
const roohafza2Img = getImgSrc(_roohafza2Img);
const lahoreImg = getImgSrc(_lahoreImg);
const lahore2Img = getImgSrc(_lahore2Img);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full group">
      <img
        alt={alt || cap || '3D Anamorphic Billboard Production'}
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

const AnamorphicBillboardsPipelineArticle = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

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

  const toggleSound = () => {
    if (!iframeRef.current) return;
    try {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      const command = nextMuted ? 'mute' : 'unMute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: command, args: [] }),
        '*'
      );
    } catch {
      // ignore
    }
  };

  const marqueeItems = [
    '3D ANAMORPHIC BILLBOARDS',
    '✦',
    '90° CORNER LED',
    '✦',
    'OPTICAL SWEET SPOT',
    '✦',
    'HAMDARD ROOH AFZA',
    '✦',
    '6,500+ NITS DAYLIGHT',
    '✦',
    'HOUDINI FLIP SOLVER',
    '✦',
    '180GB SIM CACHE',
    '✦',
    'REDSHIFT 32-BIT EXR',
    '✦',
    'ZERO RESHOOTS',
    '✦',
    'ORGANIC VIRALITY',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20 bg-white">

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

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center pt-8 md:pt-0">

            {/* ── Main Center Headline ── */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-4 sm:mb-6 px-3 sm:px-4">
              High-Fidelity 3D Anamorphic Billboards:{' '}
              <span className="text-[#2563EB]">Creative Storyboarding, Forced-Perspective Mathematics</span>{' '}
              & Production Pipeline in 2026
            </h1>

            {/* ── Subtitle / Meta Bar ── */}
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-neutral-500 mb-6 sm:mb-8">
              By Elipse Studio | October 2026 · Hamdard Rooh Afza Case Study · 90° Corner LED Engineering
            </p>

            {/* ── PROMINENT HD 16:9 WIDESCREEN VIDEO SHOWCASE ── */}
            <div className="w-full max-w-4xl lg:max-w-5xl mx-auto px-2 sm:px-4 mb-8 sm:mb-10 relative">
              {/* Subtle backdrop glow */}
              <div className="absolute inset-0 max-w-3xl mx-auto bg-blue-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />

              <div className="relative w-full aspect-video rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-white bg-black group z-10">
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/RKdb4yePntY?autoplay=1&mute=1&loop=1&playlist=RKdb4yePntY&playsinline=1&controls=1&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=0&fs=1&enablejsapi=1"
                  title="Rooh Afza | Anamorphic 3D Breakdown | Elipse Studio"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0 object-cover"
                />

                {/* Sound Toggle Button */}
                <button
                  onClick={toggleSound}
                  type="button"
                  className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/80 hover:bg-black backdrop-blur-md border border-white/20 text-white flex items-center justify-center shadow-lg transition-all hover:scale-110 cursor-pointer"
                  title={isMuted ? 'Unmute Video' : 'Mute Video'}
                  aria-label={isMuted ? 'Unmute Video' : 'Mute Video'}
                >
                  {isMuted ? (
                    <FiVolumeX className="text-base text-white/90" />
                  ) : (
                    <FiVolume2 className="text-base text-emerald-400" />
                  )}
                </button>
              </div>
            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-8 sm:mt-10 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
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
                Executive Briefing · The Forced-Perspective Problem
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 leading-tight mb-4">
                The 3D Illusion Is a Solved Optical Geometry Problem.
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed font-sans mb-4">
                A corner LED installation isn’t magic—it is precise optical physics. When objects protrude beyond the glass plane, virtual cameras must calculate exact street-level sightlines or the depth reading instantly collapses.
              </p>
              <p className="text-xs sm:text-sm md:text-base text-zinc-600 leading-relaxed font-sans">
                For our Hamdard Rooh Afza campaign, every stage—from 45° angle bisectors to <strong>6,500+ nits daylight calibration</strong>—was engineered so liquid surges past the frame into physical street space without distortion.
              </p>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rounded-2xl relative shadow-sm">
              <div className="aspect-video overflow-hidden bg-zinc-900 rounded-xl w-full">
                <img
                  src={roohafzaImg}
                  alt="Hamdard Rooh Afza 90° Corner LED Anamorphic Billboard"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-zinc-600 mt-2 font-sans font-medium text-center sm:text-left">
                Hamdard Rooh Afza 90° Corner LED · Calibrated optical sweet spot & daylight peak luminance
              </p>
            </div>
          </div>
        </section>

        {/* ══════ MAIN JOURNAL / CONTENT ══════ */}
        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-zinc-900 font-semibold text-sm sm:text-base">Technical & Mathematical Analysis</span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026 Production Data</span>
            </div>

            {/* ══════ ENTRY 01: SWEET SPOT MATHEMATICS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  The Anatomy of Forced Perspective: Calculating the Sweet Spot
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The sweet spot sits along the 45-degree angle bisector of the two screen faces at a horizontal distance of 1.5× to 2.5× the screen’s total width. Camera pitch must match pedestrian eye level.
                </p>
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-none border border-zinc-200 text-xs sm:text-sm">
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>45° Bisector Axis:</strong> Guarantees equal angular convergence across Face A and Face B for stereoscopic depth.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>1.5×–2.5× Distance:</strong> At 10m arc width, sweet spot sits 15–20m away. Prevents stretched geometry.</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="text-zinc-900 font-bold">✓</span>
                    <span className="text-zinc-700"><strong>Eye-Level Compensation:</strong> Production camera pitched upward to eliminate the floating-fake cue on elevated screens.</span>
                  </div>
                </div>
              </div>
              <div className="md:order-1">
                <Frame
                  src={unirealImg}
                  cap="Optical Sweet Spot Calculation: 45° angle bisector sightline mapped to pedestrian approach paths"
                  alt="Anamorphic Billboard Sweet Spot Calculation"
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
                  Generic 3D Billboard Content vs Engineered Anamorphic Pipeline
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  The difference between a gimmick that reads as a flat screen and an installation that commands viral crowds comes down to physical optical alignment and daylight science.
                </p>
              </div>

              {/* Modern Flat Comparative Table with Clean Vector Icons */}
              <div className="w-full border border-zinc-300 bg-white shadow-sm mb-8">
                {/* ── TOP HEADER BAR ── */}
                <div className="grid grid-cols-12 bg-black text-white p-4 sm:p-5 items-center border-b border-zinc-800">
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-2">
                    <FiSliders className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Technical Dimension</span>
                  </div>
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <FiCamera className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>Generic 3D Billboard</span>
                  </div>
                  <div className="col-span-4 text-[11px] sm:text-xs font-mono font-extrabold uppercase tracking-wider text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FiBox className="w-4 h-4 text-white shrink-0" />
                      <span>Elipse Anamorphic Pipeline</span>
                    </div>
                    <span className="hidden md:inline-block text-[9px] bg-white text-black px-2.5 py-0.5 font-extrabold uppercase tracking-widest">
                      Naked-Eye 3D
                    </span>
                  </div>
                </div>

                {/* ── TABLE ROWS ── */}
                <div className="divide-y divide-zinc-200 font-sans text-xs sm:text-sm">

                  {/* Row 1: Sweet Spot Calculation */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Sweet Spot Geometry</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Perspective Alignment</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Rendered with standard frontal camera; distorts heavily from street</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>45° bisector calculation matching pedestrian eye level & approach speed</span>
                    </div>
                  </div>

                  {/* Row 2: Chassis & Shadow Box */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Chassis Shadow Box</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Physical Occlusion</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>No chassis depth model; elements feel floating in front of screen</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>12cm chassis exclusion zone with digital contact shadow on real hardware</span>
                    </div>
                  </div>

                  {/* Row 3: Daylight Calibration */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Daylight Colour Science</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">6,500+ Nits Direct Sun</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Standard sRGB clips destructively under intense 80,000 lux outdoor sun</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>32-bit linear EXR workflow with Helmholtz-Kohlrausch compensation</span>
                    </div>
                  </div>

                  {/* Row 4: Fluid Dynamics */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Physics Simulation</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Liquids & Particles</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Pre-rendered generic stock liquids; unnatural splash scaling</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Houdini FLIP solver with dual-phase viscosity & Rayleigh-Taylor dynamics</span>
                    </div>
                  </div>

                  {/* Row 5: Pedestrian Timing */}
                  <div className="grid grid-cols-12 p-4 sm:p-5 items-center hover:bg-zinc-50/70 transition-colors">
                    <div className="col-span-4 pr-3">
                      <div className="font-bold text-zinc-900 text-xs sm:text-sm">Pedestrian Timing Map</div>
                      <div className="text-[10px] sm:text-xs text-zinc-500">Traffic Choreography</div>
                    </div>
                    <div className="col-span-4 pr-3 text-zinc-600 flex items-start gap-2">
                      <span className="text-zinc-400 font-medium shrink-0 mt-0.5">✕</span>
                      <span>Arbitrary animation cycle; peak pop-out occurs when no one is watching</span>
                    </div>
                    <div className="col-span-4 font-semibold text-black flex items-start gap-2">
                      <span className="text-black font-extrabold shrink-0 mt-0.5">✓</span>
                      <span>Peak protrusion synchronized to 1.5–2.5s pedestrian walking window</span>
                    </div>
                  </div>

                </div>

                {/* ── BOTTOM HIGHLIGHT BAR ── */}
                <div className="bg-black text-white p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left border-t border-zinc-800">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/10 text-white flex items-center justify-center shrink-0">
                      <FiZap className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans">
                      <strong className="text-white">The Bottom Line:</strong> Engineering precision turns outdoor advertising into viral organic cultural events.
                    </p>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-black font-extrabold text-xs uppercase tracking-wider shrink-0 shadow-sm">
                    <FiTrendingUp className="w-4 h-4 text-black" />
                    <span>Proven Impact: Massive Viral Reach · Zero Ad Spend</span>
                  </div>
                </div>
              </div>

              {/* 2 Strategic Breakdown Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6">

                {/* Card 1: Chassis Exclusion Zone */}
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiBox className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Chassis Geometry
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">
                    The 12cm Chassis Shadow Box
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    We model the exact physical aluminum chassis behind the LED panels. When the fluid simulation spills over the ledge, digital shadow passes cast shadows onto the real hardware, forcing human depth commitment.
                  </p>
                </div>

                {/* Card 2: 6500+ Nits Daylight Science */}
                <div className="p-5 sm:p-6 border border-zinc-200 bg-white">
                  <div className="flex items-center gap-2.5 mb-2.5 text-zinc-900">
                    <FiSun className="w-5 h-5 text-black shrink-0" />
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-500">
                      Optics & Radiometry
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base sm:text-lg text-zinc-900 mb-2">
                    Daylight Colour Science at 6,500+ Nits
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Under harsh 80,000 lux afternoon sun, standard tone curves clip destructively. We calibrate linear 32-bit EXR passes with specular ceiling caps at 88% to preserve razor-sharp glass reflections.
                  </p>
                </div>

              </div>
            </article>

            {/* ══════ ENTRY 03: HOUDINI FLUID SIMULATION ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Dual-Phase Fluid Dynamics in Houdini: The Rooh Afza Pour
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The central event was water and concentrated syrup colliding in a high-viscosity dual-phase simulation, solved at billboard scale:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      1. Water Viscosity (0.001 Pa·s)
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      High-speed laminar flow with secondary droplet dispersion across the breach threshold.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      2. Syrup Viscosity (0.05–0.08 Pa·s)
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Dense organic syrup streams producing Rayleigh-Taylor finger-like protrusions.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      3. Dielectric Glass (IOR 1.52)
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Redshift borosilicate shader with amber-red spectral absorption and zero glare blowout.
                    </p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <h4 className="font-bold text-zinc-900 uppercase tracking-wider text-[11px] mb-1">
                      4. 180GB Simulation Cache
                    </h4>
                    <p className="text-zinc-600 leading-snug">
                      Multi-res particle caching at 0.004 grid separation maintaining crisp droplet silhouettes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={roohafza2Img}
                  cap="Houdini FLIP Solver: 180GB dual-phase syrup & water breach at 0.004 grid separation"
                  alt="Houdini FLIP Fluid Dynamics Simulation"
                />
              </div>
            </article>

            {/* ══════ ENTRY 04: HARD PRODUCTION ROI ══════ */}
            <article className="py-10 sm:py-14 border-b border-zinc-200">
              <div className="max-w-3xl mb-6">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-2">
                  Hard Engineering Metrics: The Campaign Numbers
                </h3>
                <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
                  Drawn directly from Elipse Studio’s production accounts on live anamorphic deployments.
                </p>
              </div>

              {/* Grid Cards for ROI Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black">6,500+</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Daylight Nits</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Zero washed-out highlights</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900">180+ GB</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">FLIP Sim Cache</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Multi-res particle detail</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-neutral-900">1.5–2.5s</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">Hero Optical Window</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Choreographed pedestrian peak</p>
                </div>
                <div className="bg-neutral-50 border border-neutral-300 rounded-none p-4 text-center sm:text-left shadow-sm">
                  <div className="text-2xl sm:text-3xl font-extrabold text-black font-extrabold">10 Weeks</div>
                  <p className="text-[11px] sm:text-xs uppercase font-bold text-neutral-700 mt-1">End-to-End Cycle</p>
                  <p className="text-[10px] sm:text-[11px] text-neutral-500 mt-1">Site survey to live display</p>
                </div>
              </div>

              {/* The Organic Virality Callout */}
              <div className="bg-black text-white rounded-none p-5 sm:p-7 border border-black shadow-sm">
                <div className="flex items-center gap-2.5 text-white font-bold font-sans text-xs sm:text-sm uppercase tracking-wider mb-2.5">
                  <FiZap className="text-sm sm:text-base text-white shrink-0" />
                  <span>The Virality Premium: Organic Reach Without Media Spend</span>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-neutral-100 leading-relaxed font-sans">
                  The commercial value of technical perfection is organic engagement. When an anamorphic billboard stops pedestrians mid-stride, viewers film and distribute the content across social media naturally—generating <strong className="text-white font-bold">millions of organic impressions without paid media amplify budgets</strong>.
                </p>
              </div>
            </article>

            {/* ══════ ENTRY 05: LIVE CASE DEPLOYMENTS ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  05
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Live Deployments: Rooh Afza & Lahore Safari
                </h3>

                {/* Rooh Afza Card */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5 mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 px-2 py-0.5 rounded-none">
                    Hamdard Rooh Afza · 90° Corner LED
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">
                    Fluid Surge & Physical Frame Breakthrough
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Produced in partnership with Digitz Agency. Engineered with 45° angle bisector calculations, 12cm chassis shadow boxes, and daylight calibration, achieving nationwide viral recognition.
                  </p>
                </div>

                {/* Lahore Safari Card */}
                <div className="bg-zinc-50 border border-zinc-200 rounded-none p-4 sm:p-5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-black bg-zinc-200 border border-zinc-300 font-bold px-2 py-0.5 rounded-none">
                    Lahore Zoo & Safari · Giant Wildlife Experience
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-zinc-900 mt-2 mb-1">
                    Naked-Eye 3D Animal Anatomy & Foliage Occlusion
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                    Cinema-caliber jaguar anatomy and physical rockery frame penetration engineered to command attention across multi-lane roadway viewing angles.
                  </p>
                </div>
              </div>

              <div className="md:order-1">
                <Frame
                  src={lahoreImg}
                  cap="Lahore Safari 3D Anamorphic Wildlife Installation — Engineered by Elipse Studio"
                  alt="Lahore Safari 3D Anamorphic Billboard"
                />
              </div>
            </article>

            {/* ══════ ENTRY 06: PRODUCTION PIPELINE ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  06
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  10-Week End-to-End Production Execution
                </h3>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  From site laser survey to live on-screen deployment, our pipeline enforces strict weekly quality milestones:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block">Week 1–2</span>
                    <h4 className="font-bold text-zinc-900 text-xs sm:text-sm mb-0.5">Optical Survey & Sweet Spot</h4>
                    <p className="text-zinc-600 leading-snug">Laser measurement of corner angles and approach paths.</p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block">Week 3–4</span>
                    <h4 className="font-bold text-zinc-900 text-xs sm:text-sm mb-0.5">Chassis 3D & Storyboard</h4>
                    <p className="text-zinc-600 leading-snug">Exclusion box modeling & pedestrian timing animatic.</p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block">Week 5–7</span>
                    <h4 className="font-bold text-zinc-900 text-xs sm:text-sm mb-0.5">Hero Simulation Runs</h4>
                    <p className="text-zinc-600 leading-snug">High-res FLIP meshing and droplet stabilization.</p>
                  </div>
                  <div className="bg-zinc-50 p-3.5 rounded-none border border-zinc-200">
                    <span className="text-[10px] font-mono uppercase font-bold text-[#2563EB] block">Week 8–10</span>
                    <h4 className="font-bold text-zinc-900 text-xs sm:text-sm mb-0.5">Daylight QC & Delivery</h4>
                    <p className="text-zinc-600 leading-snug">On-screen sunlight reviews & native panel calibration.</p>
                  </div>
                </div>
              </div>
              <div className="md:order-2">
                <Frame
                  src={lahore2Img}
                  cap="On-Screen Daylight QC: Real hardware calibration under live outdoor sunlight conditions"
                  alt="Anamorphic Billboard Daylight QC"
                />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ SECTION: TECHNICAL SCOPING & STRATEGY CTA (EXACT MATCH) ══════ */}
        <section className="py-10 sm:py-16 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <div className="font-serif italic text-zinc-900 font-semibold mb-2 text-sm sm:text-base">
              Technical Scoping Consultation
            </div>
            <h2 className="font-serif font-medium text-2xl sm:text-3xl md:text-4xl text-zinc-900 leading-tight mb-4">
              Talk to Us Before You Lock Your Outdoor Billboard Architecture
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-2xl mx-auto">
              Anamorphic 3D billboard space is among the highest-cost outdoor inventory in modern advertising. Launching without verified sweet-spot math, chassis shadow boxes, or daylight nits calibration risks spending six figures on content that looks flat.
            </p>

            {/* Audit Checklist Box */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-none p-5 sm:p-7 text-left max-w-2xl mx-auto mb-8 shadow-sm">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 mb-3 text-center sm:text-left">
                What the 15-Minute Technical Consultation Covers:
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-700 font-sans">
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">1.</span>
                  <span><strong>Site Geometry Audit:</strong> Verify corner angle, chassis depth, mounting height, and pedestrian approach paths.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">2.</span>
                  <span><strong>Ambient Lux & Daylight Radiometry:</strong> Measure direct sun lux and specify peak nits headroom for your screen.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">3.</span>
                  <span><strong>Pedestrian Traffic Choreography:</strong> Calculate viewer dwell time and map peak protrusion frames to walking speed.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-zinc-900 font-bold">4.</span>
                  <span><strong>Production Timeline & Costing:</strong> Fixed milestone schedule for 3D animatic, simulation cache, and daylight QC.</span>
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
                    <span>Share Framework</span>
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
                Elipse Studio develops naked-eye 3D anamorphic content, Houdini fluid simulations, and real-time interactive experiences for outdoor LED, spatial retail, and global brands. Specifications cited reflect live Hamdard Rooh Afza corner LED campaign data as of October 2026.
              </p>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AnamorphicBillboardsPipelineArticle;
