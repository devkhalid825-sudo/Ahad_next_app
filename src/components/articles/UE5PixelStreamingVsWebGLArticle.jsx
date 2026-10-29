'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  FiCopy,
  FiCheck,
  FiArrowRight,
  FiExternalLink,
  FiCpu,
  FiZap,
  FiDollarSign,
  FiClock,
  FiVolume2,
  FiVolumeX
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _volvoHero from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _volvoUi from '../../assets/About-page/volvo-ui.png';
import _jetour from '../../assets/About-page/Jetour.webp';
import _kia from '../../assets/About-page/kia.webp';

const volvoHero = getImgSrc(_volvoHero);
const volvoUi = getImgSrc(_volvoUi);
const jetour = getImgSrc(_jetour);
const kia = getImgSrc(_kia);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-2.5 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-2xl bg-zinc-100 border border-zinc-200 shadow-sm w-full">
      <img
        alt={alt || cap || '3D Configurator Benchmark'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
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
          className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer w-full sm:w-auto shrink-0"
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

const UE5PixelStreamingVsWebGLArticle = () => {
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

  const handleScrollToJournal = () => {
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'UNREAL ENGINE 5',
    '✦',
    'WEBGL 3D',
    '✦',
    'PIXEL STREAMING',
    '✦',
    'VOLVO S90 BENCHMARK',
    '✦',
    'JETOUR & KIA WEBGL',
    '✦',
    'AWS G5 CLOUD GPU',
    '✦',
    'SUB-2S ZERO LATENCY',
    '✦',
    'LUMEN RAY TRACING',
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

            {/* ── Headline ── */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[50px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4">
              Unreal Engine 5 Pixel Streaming vs WebGL:{' '}
              <span className="text-[#2563EB]">The Enterprise Decision Framework</span>{' '}
              for Interactive 3D in 2026
            </h1>

            {/* ── 3-Column Grid: mobile (1: Image, 2: Body, 3: Stats) ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative">

              {/* Center Column: Hero Visual with Exact 9:16 Shorts Framing */}
              <div className="order-1 md:order-2 relative flex justify-center items-center px-2 sm:px-0 my-2 sm:my-0 w-full">
                <div className="absolute w-56 h-56 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>

                <div
                  onClick={toggleSound}
                  className="relative w-full max-w-[13rem] sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10 cursor-pointer"
                >
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/GF24vTpWEsc?autoplay=1&mute=1&loop=1&playlist=GF24vTpWEsc&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="Volvo 3D Configurator Real-Time Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-contain border-0"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                  {/* Interactive Sound Control Button (Bottom-Right) */}
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
                      <FiVolume2 className="text-base text-emerald-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Left Column on Desktop (order-1), Below Image on Mobile (order-2) */}
              <div className="order-2 md:order-1 block text-left space-y-3 sm:space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-4 md:mt-0">
                <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed font-sans">
                  Every serious enterprise 3D project in 2026 reaches this architectural fork: client-side WebGL or cloud GPU pixel streaming via Unreal Engine 5. A structured decision framework built on our real Volvo, Jetour, and Kia production data.
                </p>
                <button
                  onClick={handleScrollToJournal}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore 4 Key Sections ↓
                </button>
              </div>

              {/* Right Column: Stars + Stats (order-3) */}
              <div className="order-3 md:order-3 flex text-center md:text-left flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-4 md:mt-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-base sm:text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  0.8s vs 8.0s
                </div>
                <p className="text-[11px] sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Mobile Time to Interactive
                </p>
                <div className="mt-2 sm:mt-3 bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;The decision isn’t which engine is better. It’s what your product’s complexity, device profile, and concurrent user economics demand at scale.&rdquo;
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] mt-1">— Elipse Studio Benchmark</p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-10 sm:mt-14 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-lg">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a 15-min technical consultation ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | October 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read 4-Part Analysis ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ CLEAN WHITE MARQUEE TICKER ══════ */}
        <section className="my-6 sm:my-8 overflow-hidden border-y border-zinc-200 py-3 sm:py-4 bg-zinc-50/70 -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-lg sm:text-xl md:text-2xl font-extrabold tracking-tight text-zinc-900">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#2563EB]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ THE 4 CORE SECTIONS (ALTERNATING IMAGE & CONTENT) ══════ */}
        <section id="journal" className="py-6 sm:py-10 bg-white">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 mb-2">
              <span className="font-serif italic text-[#2563EB] text-sm sm:text-base font-medium">
                Four-Part Architectural Breakdown
              </span>
              <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest font-semibold">
                Elipse Studio · October 2026
              </span>
            </div>

            {/* ══════ SECTION 01: IMAGE LEFT (KIA WEBGL), CONTENT RIGHT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center bg-white">
              {/* Left Column: Image (WebGL: Kia) */}
              <div className="md:order-1">
                <Frame
                  src={kia}
                  cap="WebGL Benchmark: Kia 3D Configurator — Browser-native real-time 3D with zero streaming fees"
                  alt="Kia WebGL 3D Product Configurator interface"
                  actionLink="https://legacy.elipsestudio.com/Kia/"
                  actionText="Launch Kia Configurator"
                />
              </div>

              {/* Right Column: Content */}
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h2 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  Executive Decision Matrix: WebGL vs UE5
                </h2>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  The decision is usually made by whoever on the team has the most confident opinion — rather than by working through the actual variables: your product&apos;s visual complexity, your audience&apos;s device profile, your expected concurrent user load, and what a session costs you at scale.
                </p>

                {/* Structured Matrix Highlights */}
                <div className="space-y-2.5 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs sm:text-sm font-sans">
                  <div className="flex items-start gap-2">
                    <FiCheck className="text-emerald-600 mt-0.5 shrink-0 font-bold" />
                    <span><strong>Initial Load Latency:</strong> WebGL (Three.js / PlayCanvas) loads in 0.8–2.5s (progressive) vs UE5 taking 4–12s for stream negotiation and first frame.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck className="text-emerald-600 mt-0.5 shrink-0 font-bold" />
                    <span><strong>Time to First Interaction:</strong> Sub-2s on 4G for WebGL vs 6–15s for UE5 including the WebRTC handshake.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck className="text-[#2563EB] mt-0.5 shrink-0 font-bold" />
                    <span><strong>Visual Fidelity Ceiling:</strong> WebGL achieves high PBR with custom shaders; UE5 reaches photorealism with real-time Lumen global illumination and sub-surface scattering.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck className="text-emerald-600 mt-0.5 shrink-0 font-bold" />
                    <span><strong>Concurrency Cost:</strong> $0 server GPU cost for WebGL vs $0.52–$3.40/hour per active concurrent user on AWS GPU instances.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FiCheck className="text-emerald-600 mt-0.5 shrink-0 font-bold" />
                    <span><strong>Best Architectural Fit:</strong> WebGL for consumer e-commerce and mobile retail; UE5 for high-ticket automotive ($60K+), luxury retail, and complex architectural visualization.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* ══════ SECTION 02: CONTENT LEFT, IMAGE RIGHT (VOLVO UE5 PIXEL STREAMING) ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center bg-white">
              {/* Left Column: Content */}
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  02
                </div>
                <h2 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  The True Cost of Cloud Pixel Streaming
                </h2>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Pixel streaming demos look spectacular. The AWS bill arrives three weeks later and looks spectacular for very different reasons. In enterprise deployments, web users don&apos;t run native Unreal on their device — UE5 runs on remote cloud GPUs and streams interactive video via WebRTC. That introduces four compounding cost layers:
                </p>

                <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs sm:text-sm font-sans">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
                      <FiCpu /> 1. AWS GPU Rates & Concurrency
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      AWS G5.2xlarge (A10G GPU, 8 vCPU) costs $1.212/hr — roughly $0.02 per active minute. In a standard architecture, 1 concurrent user = 1 dedicated GPU. A product launch with 200 simultaneous users requires <strong>$242/hr peak</strong>.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
                      <FiClock /> 2. WebRTC Latency Budget (25–110ms)
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      GPU Render (8–16ms) + Encode (2–5ms) + Edge Transport (10–80ms) + Client Decode (2–8ms) + Display (16.7ms) = 25–110ms round-trip latency. On mobile touch screens, 110ms lag feels sluggish.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB] flex items-center gap-1.5">
                      <FiDollarSign /> 3. Idle Warm Pool Math ($3,490/Month)
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Retail traffic peaks at lunch and evenings (5:1 ratio). Maintaining a 10-instance peak warm pool (6 hrs @ $72.72) and 2 off-peak instances (18 hrs @ $43.63) totals <strong>$3,490/month in GPU costs alone</strong> before bandwidth fees.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Image (Unreal Pixel Streaming: Volvo UI) */}
              <div className="md:order-2">
                <Frame
                  src={volvoUi}
                  cap="Unreal Engine 5 Cloud Pixel Streaming Benchmark: Volvo S90 on AWS G5.2xlarge node"
                  alt="Volvo S90 Unreal Engine 5 Cloud Pixel Streaming UI"
                />
              </div>
            </article>

            {/* ══════ SECTION 03: IMAGE LEFT (VOLVO UE5 RAY TRACING), CONTENT RIGHT ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center bg-white">
              {/* Left Column: Image (Unreal Engine: Volvo S90) */}
              <div className="md:order-1">
                <Frame
                  src={volvoHero}
                  cap="Unreal Engine 5: Real-time ray-traced reflections on Volvo S90 paint and glass surfaces"
                  alt="Volvo S90 Unreal Engine 5 photorealistic ray tracing"
                  actionLink="https://legacy.elipsestudio.com/Volvo-Configurator/"
                  actionText="View Volvo Configurator"
                />
              </div>

              {/* Right Column: Content */}
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h2 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  When Unreal Engine 5 Pixel Streaming Is Essential
                </h2>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  Pixel streaming exists because there is a tier of visual experience that cannot be delivered in browser WebGL at acceptable quality — regardless of shader optimization. For web delivery, Unreal Engine cannot run directly in the browser; it streams video frames live from cloud GPUs:
                </p>

                <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs sm:text-sm font-sans">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      High-Ticket Automotive: The Volvo S90 Benchmark
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      NVIDIA Iridescent shaders replicate multi-angle anisotropic metallic flake sparkles. Windscreen glass accurately reflects overhead lights and refractorily transmits interior materials. For a vehicle above $60,000 with a $2,000–$8,000 paint upgrade, a <strong>$0.61 per-session GPU cost</strong> is fully justified against order value.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      Complex Architectural Visualisation & Materials
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Lumen handles real-time indirect bounces for dynamic dawn-to-sunset lighting across luxury estates. Nanite streams 50–100 million CAD polygons without LOD reduction, while sub-surface scattering replicates authentic marble translucency.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      Enterprise B2B Collaborative Sales
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Guided sales demonstrations in boardroom environments where sales engineers present to procurement teams. Multiple stakeholders can route to the identical rendered stream with zero client GPU strain.
                    </p>
                  </div>
                </div>
              </div>
            </article>

            {/* ══════ SECTION 04: CONTENT LEFT, IMAGE RIGHT (JETOUR WEBGL) ══════ */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-14 border-b border-zinc-200 items-center bg-white">
              {/* Left Column: Content */}
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h2 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[24ch] leading-tight mb-3">
                  When WebGL Wins & The Hybrid Architecture
                </h2>
                <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-4">
                  WebGL isn’t a compromise. For the vast majority of enterprise 3D applications, our browser-native WebGL configurators (like Jetour T2 and Kia) deliver the superior commercial outcome:
                </p>

                <div className="space-y-3 bg-zinc-50 p-4 rounded-2xl border border-zinc-200 text-xs sm:text-sm font-sans mb-4">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      Browser-Native Performance at Sub-2MB
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Heavy CAD assemblies are engineered into lightweight, progressive WebGL models. 1.4s time to first interaction on 4G, 60 FPS on mobile, 4-level LOD mesh decimation, Basis Universal texture compression, and custom 3-layer GLSL automotive paint shaders.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      E-Commerce Mobile Conversion Advantage
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Google data confirms each second above 2s drops conversion by 4–8%. WebGL avoids 8–12s stream startup delays, runs on flat CDN bandwidth with zero per-session GPU bills, and integrates natively into Shopify Plus cart and checkout contexts with zero iframe lag.
                    </p>
                  </div>

                  <div className="pt-2 border-t border-zinc-200">
                    <h3 className="font-bold text-zinc-900 text-xs uppercase tracking-wider text-[#2563EB]">
                      The Practical Hybrid Pattern
                    </h3>
                    <p className="text-zinc-600 mt-1 leading-relaxed">
                      Deploy lightweight WebGL on the product page for instant mobile browsing (handling 95% of traffic), and offer an opt-in &ldquo;Photoreal Studio View&rdquo; (UE5 streaming) for desktop buyers on fast connections. A shared JSON session object preserves configured specifications across both engines.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Image (WebGL: Jetour T2) */}
              <div className="md:order-2">
                <Frame
                  src={jetour}
                  cap="WebGL Benchmark: Jetour T2 Customizer — Progressive client-side rendering with real-time paint switches"
                  alt="Jetour T2 WebGL 3D Configurator"
                  actionLink="https://legacy.elipsestudio.com/Car_Configurator/"
                  actionText="Launch Jetour Configurator"
                />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS & STRATEGY CTA ══════ */}
        <section className="py-10 sm:py-14 bg-white">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-serif italic text-[#2563EB] mb-2 text-sm sm:text-base">
              Closing reflections
            </div>
            <h2 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-4">
              Talk to Us Before You Lock the Architecture
            </h2>
            <p className="text-zinc-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-6">
              The decision between WebGL and UE5 pixel streaming is reversible in theory and exceptionally expensive in practice. Committing before validating concurrency math or visual thresholds costs months of rebuild time.
            </p>
          </div>

          <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Technical Architecture Review</span>
              <FiArrowRight className="text-sm" />
            </a>
            <button
              onClick={handleCopyLink}
              className="w-full sm:w-auto px-5 py-3 rounded-full border border-zinc-300 hover:bg-zinc-100 active:scale-95 text-zinc-800 font-sans font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              {copied ? (
                <>
                  <FiCheck className="text-emerald-600" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <FiCopy />
                  <span>Share Framework</span>
                </>
              )}
            </button>
          </div>

          <div className="max-w-2xl mx-auto text-center mt-10">
            <div className="font-serif italic text-2xl text-[#2563EB] mb-2">
              Elipse Studio
            </div>
            <p className="text-[11px] sm:text-xs text-zinc-500 max-w-md mx-auto leading-relaxed font-sans">
              Elipse Studio designs and delivers interactive 3D experiences across WebGL and Unreal Engine 5 architectures for enterprise automotive, luxury retail, and architectural clients. Benchmark figures reflect internal Elipse Studio testing environments and AWS published pricing as of October 2026.
            </p>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default UE5PixelStreamingVsWebGLArticle;
