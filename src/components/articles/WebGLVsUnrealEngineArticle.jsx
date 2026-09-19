'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiLayers,
  FiCpu,
  FiDollarSign,
  FiZap,
  FiShoppingCart,
  FiCheckCircle,
  FiArrowRight,
  FiShield,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _volvoHero from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _configuratorCard from '../../assets/ElipseImages/personal/Configurator.webp';
import _technology from '../../assets/About-page/technology.webp';
import _jetour from '../../assets/About-page/Jetour.webp';
import _kia from '../../assets/About-page/kia.webp';
import _shark from '../../assets/About-page/shark.webp';
import _steering from '../../assets/ElipseImages/projects/Steering-1.webp';
import _leapPartner from '../../assets/ElipseImages/personal/leap-partner.webp';
import _digitalTwins from '../../assets/ElipseImages/personal/Digital twins.webp';
import _enterpriseValidation from '../../assets/ElipseImages/personal/Enterprise validation.webp';

const volvoHero = getImgSrc(_volvoHero);
const configuratorCard = getImgSrc(_configuratorCard);
const technologyImg = getImgSrc(_technology);
const jetourImg = getImgSrc(_jetour);
const kiaImg = getImgSrc(_kia);
const sharkImg = getImgSrc(_shark);
const steeringImg = getImgSrc(_steering);
const leapPartner = getImgSrc(_leapPartner);
const digitalTwins = getImgSrc(_digitalTwins);
const enterpriseValidation = getImgSrc(_enterpriseValidation);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-3 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || '3D Product Configurator visual demonstration'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
      />
    </figure>

    {actionLink ? (
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
        {cap && (
          <span className="font-serif italic text-xs sm:text-sm text-zinc-600">
            {cap}
          </span>
        )}
        <a
          href={actionLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto shrink-0"
        >
          <span>{actionText || 'View Configurator'}</span>
          <FiExternalLink className="text-sm" />
        </a>
      </div>
    ) : cap ? (
      <p className="font-serif italic text-xs sm:text-sm text-zinc-500">
        {cap}
      </p>
    ) : null}
  </div>
);

const LazyVideo = ({ src, poster, caption, transcriptSummary, className }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!el.src && src) {
            el.src = src;
            el.play().catch(() => {});
          }
          observer.disconnect();
        }
      },
      { rootMargin: '250px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [src]);

  return (
    <div className="relative rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 shadow-md">
      <div className="relative aspect-video w-full">
        <video
          ref={videoRef}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className={className || 'w-full h-full object-cover'}
          aria-label={caption || '3D Configurator Interactive Video Demonstration'}
        />
        {caption && (
          <div className="absolute left-2.5 bottom-2.5 right-2.5 font-serif italic text-[11px] text-white/90 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-md leading-snug">
            {caption}
          </div>
        )}
      </div>
      {transcriptSummary && (
        <p className="p-3 text-[11px] text-zinc-600 bg-zinc-50 border-t border-zinc-100 font-sans">
          <strong className="text-zinc-800">Visual Summary:</strong> {transcriptSummary}
        </p>
      )}
    </div>
  );
};

const WebGLVsUnrealEngineArticle = () => {
  const [copied, setCopied] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const iframeRef = useRef(null);

  const toggleSound = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: command, args: '' }),
        '*'
      );
      setIsMuted(!isMuted);
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

  const handleScrollToComparison = () => {
    const el = document.getElementById('comparison-matrix');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToJournal = () => {
    const el = document.getElementById('deep-dive');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'WEBGL 3D',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    'PIXEL STREAMING',
    '✦',
    'ZERO LATENCY',
    '✦',
    '3D CONFIGURATOR',
    '✦',
    'ARCWARE & STREAMPIXEL',
    '✦',
    'E-COMMERCE INTEGRATION',
    '✦',
    'PHOTOREALISM',
    '✦',
    'REAL-TIME 3D',
    '✦',
  ];

  return (
    <div data-nav="light" className="w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-20 md:pt-22 pb-12 sm:pb-16">

        {/* ══════ HERO SECTION ══════ */}
        <section className="relative bg-white text-neutral-900 py-3 sm:py-6 lg:py-8 overflow-hidden mb-4 sm:mb-8">
          {/* Decorative ✦ top-left */}
          <div className="absolute top-4 left-8 text-[#2563EB] text-2xl font-bold select-none pointer-events-none" aria-hidden="true">
            ✦
          </div>
          {/* Decorative arrow top-right */}
          <div className="absolute top-4 right-10 text-[#2563EB] text-base font-bold select-none pointer-events-none opacity-70" aria-hidden="true">
            <svg width="32" height="20" viewBox="0 0 60 40" fill="none">
              <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </div>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

            {/* ── Main Center Headline (Single <h1>) ── */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] xl:text-[44px] font-bold tracking-tight text-neutral-900 max-w-3xl leading-snug mb-5 sm:mb-7 px-2">
              WebGL vs. Unreal Engine <span className="whitespace-nowrap">3D Configurator:</span>{' '}
              <span className="text-[#2563EB]">Which Technology is Right</span> for Your Business?
            </h1>

            {/* ── 3-Column Content Grid ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_1.25fr_1fr] gap-5 sm:gap-6 md:gap-6 items-center relative">

              {/* Left Column: Intro / Quick Summary (Mobile: Order 2, Desktop: Order 1) */}
              <div className="order-2 md:order-1 flex flex-col justify-center text-left space-y-3 md:pr-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full">
                <FaRegLightbulb className="text-[#2563EB] text-xl" />
                <p className="text-neutral-600 text-xs sm:text-[13px] md:text-sm leading-relaxed font-sans">
                  Interactive 3D product configurators are transforming modern e-commerce and automotive sales. Compare graphics fidelity, recurring pixel streaming costs, latency, and checkout integration to make the right investment.
                </p>
                <div className="flex flex-row items-center gap-2 pt-1 w-full">
                  <button
                    onClick={handleScrollToJournal}
                    className="flex-1 px-3 py-2 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center flex items-center justify-center leading-tight whitespace-nowrap"
                  >
                    Read Breakdown ↓
                  </button>
                  <button
                    onClick={handleScrollToComparison}
                    className="flex-1 px-3 py-2 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer text-center flex items-center justify-center leading-tight whitespace-nowrap"
                  >
                    Comparison Table
                  </button>
                </div>
              </div>

              {/* Center Column: Hero Visual with Zoomed Clean YouTube Short Embed (Mobile: Order 1, Desktop: Order 2) */}
              <div className="order-1 md:order-2 relative flex justify-center items-center px-2 sm:px-0 w-full">
                <div className="absolute w-64 h-64 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 text-neutral-400 text-xl select-none">✦</span>
                </div>

                <div className="relative w-full max-w-[16rem] sm:max-w-[19rem] md:max-w-[21rem] lg:max-w-[23rem] h-[21rem] sm:h-[24rem] md:h-[26rem] lg:h-[28rem] xl:h-[29.5rem] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10">
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/GF24vTpWEsc?autoplay=1&mute=1&loop=1&playlist=GF24vTpWEsc&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="Volvo 3D Configurator Real-Time Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-[155%] h-[155%] max-w-none border-0 object-cover scale-[1.18]"
                    />
                  </div>

                  {/* Interactive Sound Control Button (Bottom-Right) */}
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

              {/* Right Column: Key Takeaway Box (Mobile: Order 3, Desktop: Order 3) */}
              <div className="order-3 md:order-3 text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-1.5 md:pl-2 px-3 sm:px-0 max-w-sm mx-auto md:mx-0 w-full">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-base">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  WebGL vs UE5
                </div>
                <p className="text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider font-medium">
                  3D Configurator Engineering Matrix
                </p>
                <div className="mt-2 bg-blue-50/80 border border-blue-100 p-3.5 rounded-2xl text-center md:text-left w-full space-y-1.5">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Choose WebGL when cost scalability and instant web loads matter. Choose Unreal Engine when cinematic photorealism directly converts high-ticket luxury sales.&rdquo;
                  </p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-6 sm:mt-8 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-5 py-2.5 rounded-full shadow-lg">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-[13px] font-semibold text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <span>Book a 15-min Technical Consultation</span>
                <FiExternalLink />
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-[13px] font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Explore Full Guide ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ ANIMATED MARQUEE ══════ */}
        <section className="my-10 overflow-hidden border-y border-zinc-200 py-5 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>
                {item}
              </span>
            ))}
          </div>
        </section>

          {/* ══════ EXECUTIVE DISPATCH / INTRO ══════ */}
          <section className="py-10 sm:py-14">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
              <div className="md:pt-4">
                <div className="italic text-[#2563EB] text-base mb-3 font-serif">
                  The Future of Interactive Commerce & 3D Visualization
                </div>
                <p className="text-2xl sm:text-3xl md:text-[32px] leading-tight text-zinc-900 max-w-[38ch] font-serif font-medium">
                  Today&apos;s digital consumers demand interactive 3D product experiences. But choosing the wrong engine can either inflate your cloud hosting bills or bottleneck your visual quality.
                </p>
                <p className="mt-4 text-zinc-600 text-sm sm:text-base leading-relaxed">
                  In today&apos;s digital era, e-commerce brands and automotive leaders are leveraging interactive 3D product configurators to redefine customer engagement. Whether customizing a luxury vehicle, personalizing premium furniture materials, or exploring industrial machinery mechanics — 3D configurators significantly elevate buyer confidence and checkout conversions.
                </p>
                <div className="mt-6 flex flex-wrap gap-4">
                  <a
                    href="#comparison-matrix"
                    className="inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
                  >
                    Jump directly to Feature Matrix ↓
                  </a>
                </div>
              </div>

              <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-5 rounded-2xl relative">
                <Frame
                  src={kiaImg}
                  cap="Interactive 3D Configurator — Kia"
                  alt="Interactive WebGL 3D Product Configurator interface with real-time material swapping"
                  actionLink="https://legacy.elipsestudio.com/Kia/"
                  actionText="View Configurator"
                />
              </div>
            </div>
          </section>

          {/* ══════ THE 5 CORE NUMBERED JOURNAL SECTIONS ══════ */}
          <section id="deep-dive" className="py-10 sm:py-16 border-t border-zinc-200">
            <div className="max-w-none space-y-0">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-4 border-b border-zinc-200 pb-4 sm:pb-6 mb-2">
                <span className="font-serif italic text-[#2563EB] text-sm sm:text-base font-medium">
                  Technical & Commercial Comparison
                </span>
                <span className="font-sans text-[11px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  3D Configurator Architecture
                </span>
              </div>

              {/* ── Section 01: WebGL ── */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                <div className="md:order-2">
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                    01
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                    WebGL 3D Configurator: Browser-Native 3D Without Streaming Fees
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                    <strong className="text-zinc-900 font-semibold">WebGL (Web Graphics Library)</strong> is a browser-native standard that renders interactive 2D and 3D graphics directly on the user&apos;s device GPU without requiring any external plugins, downloads, or cloud streaming instances.
                  </p>
                  
                  <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Key Commercial Advantages:</h3>
                    <ul className="text-xs sm:text-sm text-zinc-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <FiDollarSign className="text-emerald-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>Zero Pixel Streaming Cost:</strong> Direct browser execution means you never pay recurring hourly GPU streaming fees, regardless of whether 100 or 100,000 visitors configure products simultaneously.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiZap className="text-[#2563EB] mt-0.5 shrink-0 text-base" />
                        <span><strong>Universal Compatibility:</strong> Works seamlessly across Chrome, Safari, iOS, Android, Firefox, and Edge with zero downloads or plug-ins.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiLayers className="text-purple-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>Ultra-Low Latency:</strong> Local GPU processing delivers zero video lag, instant touch response, and snappy UI feedback.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:order-1">
                  <Frame
                    src={jetourImg}
                    cap="WebGL 3D Configurator — Jetour T2"
                    alt="WebGL 3D Jetour T2 product configurator showing custom parts and paints rendered directly on client browser"
                    actionLink="https://legacy.elipsestudio.com/Car_Configurator/"
                    actionText="View Configurator"
                  />
                </div>
              </article>

              {/* ── Section 02: Unreal Engine ── */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                <div className="md:order-1">
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                    02
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                    Unreal Engine 3D Configurator: Cinematic Photorealism via Pixel Streaming
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                    <strong className="text-zinc-900 font-semibold">Unreal Engine (UE5)</strong> is the world&apos;s leading real-time 3D engine, renowned for cinematic ray tracing, Lumen global illumination, and ultra-high fidelity physically based materials (PBR).
                  </p>

                  <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Key Advantages & Cloud Requirements:</h3>
                    <ul className="text-xs sm:text-sm text-zinc-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <FiShield className="text-[#2563EB] mt-0.5 shrink-0 text-base" />
                        <span><strong>Ultra-High Photorealism:</strong> Real-time reflections, accurate paint flaking, leather stitching, and cinematic depth of field for high-end luxury goods.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCpu className="text-amber-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>Cloud GPU Pixel Streaming:</strong> The 3D scene renders on remote cloud GPUs and streams interactive video frames to the web via WebRTC SDKs (like <span className="font-semibold text-zinc-900">Arcware</span> or <span className="font-semibold text-zinc-900">StreamPixel</span>).</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiDollarSign className="text-rose-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>Recurring Streaming Fees:</strong> Requires active cloud GPU hosting budget based on active user concurrency and stream duration.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:order-2">
                  <Frame
                    src={volvoHero}
                    cap="Unreal Engine 5 Configurator — Volvo S90"
                    alt="Unreal Engine 5 automotive 3D configurator with photorealistic lighting and dynamic reflections"
                    actionLink="https://www.behance.net/gallery/249430145/Volvo-Cars-Configurator"
                    actionText="View on Behance"
                  />
                </div>
              </article>

              {/* ── Section 03: Side-by-Side Comparison Matrix ── */}
              <article id="comparison-matrix" className="py-12 sm:py-16 border-b border-zinc-200">
                <div className="text-center max-w-4xl mx-auto mb-10 px-2">
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                    03
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl lg:text-[34px] text-zinc-900 leading-tight mb-4">
                    WebGL vs. Unreal Engine: Direct Feature <span className="whitespace-nowrap">Comparison Matrix</span>
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto">
                    Here is how both technologies compare across graphics fidelity, infrastructure costs, SDK requirements, and integration capabilities:
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                  {/* WebGL Card */}
                  <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#2563EB] text-2xl mb-5">
                        <FiZap />
                      </div>
                      <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight mb-3">
                        WebGL 3D Configurator
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                        Browser-native real-time 3D rendering executed directly on the user’s device GPU. Delivers instant load speeds, universal device support, and zero recurring server streaming costs.
                      </p>
                    </div>

                    <div className="border-t border-zinc-100 pt-5 mt-auto">
                      <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>100% Free Streaming:</strong> Zero hourly cloud GPU streaming fees</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Universal Compatibility:</strong> Runs across Chrome, Safari, iOS & Android</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Native Web Embed:</strong> Direct HTML5 Canvas / Next.js integration</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Sub-Second Loading:</strong> Instant 60 FPS performance on all mobile devices</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Ideal Use Cases:</strong> High-traffic retail, fashion & consumer goods</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Unreal Engine Card */}
                  <div className="bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:border-blue-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100 flex items-center justify-center text-[#2563EB] text-2xl mb-5">
                        <FiCpu />
                      </div>
                      <h3 className="font-bold text-xl sm:text-2xl text-zinc-900 tracking-tight mb-3">
                        Unreal Engine 5 (UE5)
                      </h3>
                      <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                        Cloud-rendered photorealistic 3D visualization streamed live to the browser via WebRTC. Delivers unmatched cinematic lighting, reflections, and ray tracing.
                      </p>
                    </div>

                    <div className="border-t border-zinc-100 pt-5 mt-auto">
                      <ul className="space-y-3 text-xs sm:text-sm text-zinc-700">
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Cinematic Photorealism:</strong> Lumen global illumination & ray tracing</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Pixel Streaming Cloud:</strong> Streamed via Arcware & StreamPixel SDKs</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Interactive WebRTC:</strong> High-bitrate video stream with UI controls</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Network Dependent:</strong> Requires stable 4G/5G high-speed connection</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <FiCheck className="text-[#2563EB] text-base mt-0.5 shrink-0 font-bold" />
                          <span><strong>Ideal Use Cases:</strong> Luxury automotive, high-ticket real estate & enterprise</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>

              {/* ── Section 04: End-to-End E-Commerce Integration ── */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
                <div className="md:order-2">
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                    04
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                    End-to-End E-Commerce & Checkout Integration
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                    Regardless of whether you choose WebGL or Unreal Engine, both technologies integrate 100% seamlessly into your existing Shopify, WooCommerce, Magento, or headless Next.js e-commerce platform.
                  </p>

                  <div className="space-y-3 bg-zinc-50 p-4 rounded-xl border border-zinc-200 mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">3-Step Technical Workflow:</h3>
                    <ul className="text-xs sm:text-sm text-zinc-700 space-y-2">
                      <li className="flex items-start gap-2">
                        <FiLayers className="text-[#2563EB] mt-0.5 shrink-0 text-base" />
                        <span><strong>1. CAD & Asset Ingestion:</strong> Client provides CAD models (STEP, OBJ, FBX). We retopologize meshes and bake textures for high-speed real-time 3D execution.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiZap className="text-emerald-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>2. UI/UX & Interactive Logic:</strong> Custom brand controls, smooth 360° camera rigs, interactive hotspot annotations, and material switches are programmed.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <FiShoppingCart className="text-purple-600 mt-0.5 shrink-0 text-base" />
                        <span><strong>3. Live Cart & Dynamic BOM:</strong> Real-time checkout integration reads the live 3D configuration, computes pricing dynamically, and pushes straight to your cart.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="md:order-1">
                  <Frame
                    src={steeringImg}
                    cap="3D Steering Wheel Configurator — BMW"
                    alt="Interactive BMW 3D Steering Wheel Configurator with real-time material switches and dynamic checkout"
                    actionLink="https://steering-configurator.netlify.app/"
                    actionText="View Configurator"
                  />
                </div>
              </article>

              {/* ── Section 05: Decision Framework ── */}
              <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 items-center">
                <div className="md:order-1">
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                    05
                  </div>
                  <h2 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-4">
                    Decision Framework: Which Technology Should Your Business Choose?
                  </h2>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-6">
                    Selecting the ideal engine for your business depends on your monthly streaming budget, anticipated web traffic volume, and visual fidelity requirements:
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* WebGL Decision Card */}
                    <div className="bg-white rounded-2xl border border-zinc-200/90 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-blue-300 hover:shadow-md transition-all flex flex-col">
                      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-zinc-100">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center text-base shrink-0">
                          <FiZap />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block leading-none">Best For Scale</span>
                          <h3 className="text-sm font-bold text-zinc-900 mt-0.5">Choose WebGL If:</h3>
                        </div>
                      </div>
                      <ul className="space-y-2.5 text-xs text-zinc-700 font-sans">
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-[#2563EB] text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Zero streaming fees:</strong> You need 100% predictable zero server costs.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-[#2563EB] text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>High consumer traffic:</strong> Thousands of simultaneous web shoppers.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-[#2563EB] text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Instant mobile loading:</strong> Sub-2s execution on Safari and Chrome.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-[#2563EB] text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Retail products:</strong> Apparel, accessories, furniture, electronics.</span>
                        </li>
                      </ul>
                    </div>

                    {/* Unreal Engine Decision Card */}
                    <div className="bg-white rounded-2xl border border-zinc-200/90 p-4 sm:p-5 shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:border-emerald-300 hover:shadow-md transition-all flex flex-col">
                      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-zinc-100">
                        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center text-base shrink-0">
                          <FiShield />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block leading-none">Best For Fidelity</span>
                          <h3 className="text-sm font-bold text-zinc-900 mt-0.5">Choose Unreal Engine If:</h3>
                        </div>
                      </div>
                      <ul className="space-y-2.5 text-xs text-zinc-700 font-sans">
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-emerald-600 text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Cinematic photorealism:</strong> Ray-traced lighting drives sales conversion.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-emerald-600 text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Luxury automotive & estates:</strong> Vehicles, yachts, architecture.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-emerald-600 text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>Pixel streaming budget:</strong> Dedicated monthly cloud GPU allowance.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <FiCheck className="text-emerald-600 text-sm mt-0.5 shrink-0 font-bold" />
                          <span><strong>B2B sales demos:</strong> Reps configure complex machinery live.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="md:order-2">
                  <Frame
                    src={sharkImg}
                    cap="Commercial 3D Configurator — BYD Shark"
                    alt="Interactive BYD Shark 3D Product Configurator interface with real-time trim and accessory options"
                    actionLink="https://legacy.elipsestudio.com/Zeus-Configurator/"
                    actionText="View Configurator"
                  />
                </div>
              </article>
            </div>
          </section>

          {/* ══════ CLOSING REFLECTIONS & STRATEGY CTA ══════ */}
          <section className="pt-10 sm:pt-12 pb-6 border-t border-zinc-200">
            <div className="max-w-3xl mx-auto bg-gradient-to-b from-zinc-50 to-white border border-zinc-200/80 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
              <span className="inline-block px-3.5 py-1 bg-blue-50 border border-blue-100/80 text-[#2563EB] text-xs font-bold uppercase tracking-wider rounded-full mb-3">
                Strategic Next Steps
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-[32px] font-bold tracking-tight text-zinc-900 leading-snug mb-4">
                Turn 3D CAD Into a High-Converting Sales Engine
              </h2>
              
              <div className="space-y-3 max-w-2xl mx-auto">
                <p className="text-zinc-600 font-sans leading-relaxed text-xs sm:text-sm md:text-base">
                  Demand for interactive real-time 3D configurators is expanding rapidly as one of the highest-converting digital assets in modern commerce. Both WebGL and Unreal Engine deliver distinct commercial advantages — the right choice ultimately hinges on your unit margins, target audience, and visual expectations.
                </p>
                <p className="text-zinc-900 font-medium text-xs sm:text-sm md:text-base pt-1">
                  Have a 3D model or CAD asset ready? Let our technical team build a working proof of concept.
                </p>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-lg bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book a 15-Minute Strategy Call</span>
                  <FiArrowRight className="text-sm" />
                </a>
                <Link
                  href="/project/volvo-configurator"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-lg border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-bold text-xs sm:text-sm transition-all text-center flex items-center justify-center shadow-sm"
                >
                  Explore Volvo 3D Case Study
                </Link>
              </div>
            </div>
          </section>

      </main>

      <Footer />
    </div>
  );
};

export default WebGLVsUnrealEngineArticle;

