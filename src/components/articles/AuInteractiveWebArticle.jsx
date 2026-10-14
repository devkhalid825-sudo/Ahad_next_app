'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCalendar,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiZap,
  FiPhone,
  FiMail,
  FiExternalLink,
  FiVolume2,
  FiVolumeX,
  FiTrendingUp,
  FiCpu,
  FiMonitor,
  FiCheckCircle
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _heroImg from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _mainPng from '../../assets/ElipseImages/projects/Streeing-1.webp';
import _volvoHero from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _jetourImg from '../../assets/About-page/Jetour.webp';
import _kiaImg from '../../assets/About-page/kia.webp';
import _sharkImg from '../../assets/About-page/shark.webp';

const heroImg = getImgSrc(_heroImg);
const mainPng = getImgSrc(_mainPng);
const volvoHero = getImgSrc(_volvoHero);
const jetourImg = getImgSrc(_jetourImg);
const kiaImg = getImgSrc(_kiaImg);
const sharkImg = getImgSrc(_sharkImg);

const marqueeItems = [
  'INTERACTIVE WEB AUSTRALIA',
  '✦',
  'WEBGL AT 60 FPS',
  '✦',
  'THREE.JS COMMERCE',
  '✦',
  'PIXEL STREAMING',
  '✦',
  'SYDNEY · AEST',
  '✦',
  'ZERO PLUGINS',
  '✦',
];

const Frame = ({ src, cap, actionLink, actionText }) => (
  <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col gap-3">
    <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200 shadow-md group">
      <img alt={cap || 'Interactive WebGL'} src={src} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
    </figure>
    {(cap || actionLink) && (
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
        {cap && (
          <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
            {cap}
          </span>
        )}
        {actionLink && (
          <a
            href={actionLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold font-sans transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0"
          >
            <span>{actionText || 'View on Behance'}</span>
            <FiExternalLink className="text-sm" />
          </a>
        )}
      </div>
    )}
  </div>
);

export default function AuInteractiveWebArticle() {
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
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white font-sans antialiased">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16">

        {/* ══════ HERO SECTION (LEAP STYLE 3-COLUMN) ══════ */}
        <section className="relative bg-white text-neutral-900 pt-2 pb-6 sm:py-6 lg:py-8 overflow-hidden mb-6 sm:mb-8 min-h-[calc(100vh-7.5rem)] min-h-[calc(100svh-7.5rem)] md:min-h-0 flex flex-col justify-center md:block">
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

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            {/* ── Main Center Headline ── */}
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug mb-5 sm:mb-7 px-2">
              Interactive Web Experiences in Australia:{' '}
              <span className="text-[#2563EB]">Why Static Sites Are Losing</span>{' '}
              to Real-Time 3D
            </h1>

            {/* ── 3-Column Content Grid ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.25fr_1fr] gap-5 sm:gap-6 md:gap-6 items-center relative">

              {/* Left Column: Intro / Description (Hidden on mobile) */}
              <div className="hidden md:flex order-2 md:order-1 text-center md:text-left space-y-3 md:pr-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full flex-col items-center md:items-start">
                <FaRegLightbulb className="text-[#2563EB] text-xl" />
                <p className="text-neutral-600 text-xs sm:text-[13px] md:text-sm leading-relaxed font-sans">
                  Australian consumer and industrial brands are replacing flat 2D photography with real-time WebGL experiences. Give buyers the freedom to explore, rotate, and customize products directly in browser.
                </p>
                <button
                  onClick={handleScrollToJournal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore WebGL Formats ↓
                </button>
              </div>

              {/* Center Column: Hero Visual with Exact WebGL vs UE5 Video Sizing */}
              <div className="order-1 md:order-2 relative flex justify-center items-center px-2 sm:px-0 w-full">
                <div className="absolute w-64 h-64 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 text-neutral-400 text-xl select-none">✦</span>
                </div>

                <div className="relative w-full max-w-[15rem] sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10">
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/Z_7q0SBbZ1Y?autoplay=1&mute=1&loop=1&playlist=Z_7q0SBbZ1Y&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="Interactive Web Experiences Australia - WebGL Reel"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-contain border-0"
                    />
                  </div>

                  {/* Sound Toggle Button */}
                  <button
                    onClick={toggleSound}
                    type="button"
                    className="absolute bottom-3.5 right-3.5 z-30 w-10 h-10 rounded-full bg-black/75 hover:bg-black/95 backdrop-blur-md border border-white/25 text-white flex items-center justify-center shadow-2xl transition-all hover:scale-110 cursor-pointer"
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

              {/* Right Column: Stars + Stats (Hidden on mobile) */}
              <div className="hidden md:flex order-3 md:order-3 text-center md:text-left flex-col items-center md:items-start justify-center space-y-1.5 md:pl-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  AU 2026
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  REAL-TIME 3D & WEBGL
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Up to 6× longer session duration and double-digit conversion gains without sacrificing mobile speed.&rdquo;
                  </p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-10 sm:mt-16 hidden sm:inline-flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 bg-neutral-900 text-white px-5 sm:px-7 py-3.5 sm:py-3 rounded-2xl sm:rounded-full shadow-xl text-xs sm:text-sm font-medium border border-neutral-800">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-09"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors text-center"
              >
                Schedule a 15-min scoping call ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-center">
                <span className="text-neutral-300">By Elipse Studio Editorial Team</span>
                <span className="h-3.5 w-px bg-neutral-700" />
                <button
                  onClick={handleCopyLink}
                  className="font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
                  <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* ══════ BLACK MARQUEE BAR ══════ */}
        <section className="mt-6 sm:mt-16 mb-16 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ INTRO SECTION: A DISPATCH FROM SYDNEY ══════ */}
        <section className="py-10 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-8">
              <div className="italic text-[#2563EB] text-base mb-4 font-serif">
                A dispatch on Australian digital commerce, 2026
              </div>
              <p className="font-serif font-normal text-xl sm:text-2xl md:text-[28px] leading-snug text-zinc-900 max-w-[38ch]">
                When shoppers land on high-ticket product pages, flat photos leave critical questions unanswered. Real-time browser 3D answers every hesitation before checkout.
              </p>
              <a
                href="#journal"
                className="mt-7 inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the interactive web formats below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-4 rounded-2xl shadow-xl flex flex-col gap-3">
              <figure className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200 shadow-md group">
                <img
                  src={mainPng}
                  alt="Carbon Powered Custom Steering Wheel Configurator by Elipse Studio"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </figure>
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
                <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
                  Carbon Powered — Custom Steering Wheel 3D WebGL Configurator
                </span>
                <a
                  href="https://www.behance.net/gallery/250822531/Custom-Steering-Wheel-Configurator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold font-sans transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] shrink-0"
                >
                  <span>View on Behance</span>
                  <FiExternalLink className="text-sm" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ PERFORMANCE STANDARDS CARDS ══════ */}
        <section className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-4 mb-6 sm:mb-8">
            <span className="font-serif italic text-[#2563EB] text-base sm:text-lg font-medium">Performance Standards</span>
            <span className="font-mono text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200 w-fit">Speed & Engagement 2026</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 xs:gap-3 sm:gap-6">
            {/* Card 1 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiTrendingUp className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Engagement
                  </span>
                </div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2563EB] font-sans mb-1">
                  6×
                </div>
                <p className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-800 mb-1 sm:mb-2 leading-tight">
                  Session Duration
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Compared to static 2D product landing pages across retail, marine & automotive e-commerce.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiZap className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Instant
                  </span>
                </div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2563EB] font-sans mb-1">
                  &lt;1.5s
                </div>
                <p className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-800 mb-1 sm:mb-2 leading-tight">
                  Initialization Speed
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  KTX2 & Basis texture compression for instant 4G/5G mobile loading across Australia.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiMonitor className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Silky Smooth
                  </span>
                </div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2563EB] font-sans mb-1">
                  60 FPS
                </div>
                <p className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-800 mb-1 sm:mb-2 leading-tight">
                  Fluid Framerate
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  Optimized for Safari iOS, Chrome Android, and desktop browsers seamlessly.
                </p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative p-3.5 xs:p-4 sm:p-7 rounded-xl sm:rounded-2xl bg-zinc-50 hover:bg-white border border-zinc-200/90 hover:border-blue-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1">
              <div>
                <div className="flex items-center justify-between gap-1.5 mb-2.5 sm:mb-4">
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <FiCheckCircle className="text-base sm:text-xl" />
                  </div>
                  <span className="text-[9px] xs:text-[10px] font-mono font-semibold uppercase tracking-wider text-blue-700 bg-blue-50/80 border border-blue-100 px-1.5 xs:px-2 py-0.5 rounded-full truncate">
                    Zero Friction
                  </span>
                </div>
                <div className="text-2xl xs:text-3xl sm:text-4xl font-extrabold tracking-tight text-[#2563EB] font-sans mb-1">
                  0 Apps
                </div>
                <p className="text-[11px] xs:text-xs uppercase tracking-wider font-semibold text-zinc-800 mb-1 sm:mb-2 leading-tight">
                  Zero Plugins Required
                </p>
                <p className="text-[10.5px] xs:text-xs text-zinc-600 leading-snug sm:leading-relaxed">
                  100% native WebGL and Three.js execution directly inside web checkout pages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ THE FOUR FORMATS (NUMBERED JOURNAL ENTRIES) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Four Interactive 3D Web Formats</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">For Australian Brands</span>
            </div>

            {/* ── Entry 01 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  3D Product Detail Pages (Shopify Plus & WooCommerce)
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Shoppers orbit, zoom, and inspect physical details with natural touch gestures. Selecting a custom finish automatically updates the active SKU and price in the cart with one-click native iOS/Android WebAR preview.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={sharkImg}
                  badge="Interactive 3D"
                  cap="BYD Shark 6 — Interactive 3D WebGL Configurator"
                  actionLink="https://legacy.elipsestudio.com/Zeus-Configurator/"
                  actionText="Launch 3D Tool"
                />
              </div>
            </article>

            {/* ── Entry 02 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  Scroll-Driven 3D Brand Microsites
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  High-impact digital launch campaigns that reveal product architecture as the user scrolls. Camera coordinates, lighting transitions, and exploded part animations tied directly to page scroll position.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src={jetourImg}
                  badge="Scroll Microsite"
                  cap="Jetour T2 — Real-Time 3D Car Configurator"
                  actionLink="https://legacy.elipsestudio.com/Car_Configurator/"
                  actionText="View Configurator"
                />
              </div>
            </article>

            {/* ── Entry 03 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  2D Photo vs. 3D Interactive Comparison
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Flat 2D catalog photography provides limited angles and static colors. Interactive 3D allows customers to personalize luxury automotive finishes, superyacht teak decking, and architectural finishes in real time.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={kiaImg}
                  badge="Pixel Streaming & WebGL"
                  cap="Kia Sportage"
                  actionLink="https://legacy.elipsestudio.com/Kia/"
                  actionText="View Configurator"
                />
              </div>
            </article>

            {/* ── Entry 04 ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                  Unreal Engine 5 Cloud Pixel Streaming
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Full Unreal Engine 5 builds featuring hardware ray-tracing and Nanite geometry streamed via cloud GPUs (Arcware/PureWeb), alongside sub-2MB lightweight Three.js promotional campaign portals.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src="/au-assets/golf-cart.webp"
                  badge="WebGL Configurator"
                  cap="Golf Cart Configurator"
                  actionLink="https://costa-carts.netlify.app/"
                  actionText="View Configurator"
                />
              </div>
            </article>
          </div>
        </section>

        {/* ══════ BENCHMARK PRICING TABLE (AUSTRALIA) ══════ */}
        <section className="py-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-zinc-200 pb-3 sm:pb-4 mb-6 sm:mb-8">
            <span className="font-serif italic text-[#2563EB] text-base">Development Cost Benchmarks</span>
            <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Australia 2026</span>
          </div>

          {/* Mobile Card View (No Cut-Off / No Horizontal Scroll Required) */}
          <div className="grid grid-cols-1 gap-3.5 sm:hidden">
            {[
              {
                tier: '3D Product Page Integration',
                price: 'AUD $6,000 – $18,000',
                time: '3–6 Weeks',
                tech: 'PlayCanvas / Three.js on Shopify / Custom Web',
              },
              {
                tier: 'Immersive Brand Microsite',
                price: 'AUD $18,000 – $55,000',
                time: '8–14 Weeks',
                tech: 'Scroll-Driven Three.js + GSAP Motion Engine',
              },
              {
                tier: 'Unreal Engine 5 Pixel Streaming',
                price: 'AUD $25,000 – $75,000+',
                time: '10–16 Weeks',
                tech: 'Cloud GPU Streaming (PureWeb / Furioos)',
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200 shadow-sm flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-semibold text-zinc-900 text-sm">{item.tier}</h4>
                  <span className="font-mono text-[#2563EB] font-bold text-xs whitespace-nowrap bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{item.price}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
                  <span>⏱ {item.time}</span>
                </div>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.tech}</p>
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white">
            <table className="w-full text-left text-sm min-w-[640px]">
              <thead className="bg-zinc-50 text-xs font-mono uppercase tracking-wider text-zinc-600 border-b border-zinc-200">
                <tr>
                  <th className="py-4 px-6 font-semibold">Experience Tier</th>
                  <th className="py-4 px-6 font-semibold">Benchmark Investment (AUD)</th>
                  <th className="py-4 px-6 font-semibold">Typical Timeline</th>
                  <th className="py-4 px-6 font-semibold">Deployment Tech</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 text-zinc-700">
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">3D Product Page Integration</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">AUD $6,000 – $18,000</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">3–6 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">PlayCanvas / Three.js on Shopify / Custom Web</td>
                </tr>
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">Immersive Brand Microsite</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">AUD $18,000 – $55,000</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">8–14 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">Scroll-Driven Three.js + GSAP Motion Engine</td>
                </tr>
                <tr className="hover:bg-zinc-50/80 transition-colors">
                  <td className="py-4 px-6 font-semibold text-zinc-900">Unreal Engine 5 Pixel Streaming</td>
                  <td className="py-4 px-6 font-mono text-[#2563EB] font-bold">AUD $25,000 – $75,000+</td>
                  <td className="py-4 px-6 font-mono text-zinc-500">10–16 Weeks</td>
                  <td className="py-4 px-6 text-xs text-zinc-600">Cloud GPU Streaming (PureWeb / Furioos)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ══════ BOTTOM CALLOUT CTA (WHITE EDITORIAL) ══════ */}
        <section className="mt-16 sm:mt-20 p-8 sm:p-14 rounded-3xl bg-zinc-50 text-zinc-900 text-center shadow-xl border border-zinc-200">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-normal tracking-tight text-zinc-900 mb-4 max-w-2xl leading-snug">
              Evaluate Interactive 3D for Your Website
            </h2>

            <p className="text-zinc-600 font-sans text-sm sm:text-base leading-relaxed mb-8 max-w-2xl">
              Interested in adding real-time 3D to your online store or launch campaign? Share your product details or CAD files with our team. Within 24 AEST business hours, we’ll deliver a live sandbox preview and technical integration plan.
            </p>

            <div className="flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-full max-w-lg sm:max-w-none mx-auto sm:w-auto">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-09"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 sm:px-8 py-3 sm:py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm whitespace-nowrap shadow-md hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <FiCalendar className="text-sm" />
                <span>Book Consultation</span>
              </a>
              <Link
                href="/contact"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-8 py-3 sm:py-3.5 rounded-full border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 font-medium text-[11px] xs:text-xs sm:text-sm whitespace-nowrap transition-all shadow-sm"
              >
                <FiMail className="text-xs sm:text-sm" />
                <span>Request Sandbox</span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
