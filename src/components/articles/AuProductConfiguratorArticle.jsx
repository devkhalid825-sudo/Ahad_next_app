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

// Configurator Service Images (same verified assets as Automotive 3D Configurator)
import _volvoHero from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _sharkImg from '../../assets/About-page/shark.webp';
import _kiaImg from '../../assets/About-page/kia.webp';
import _seatImg from '../../assets/About-page/seat.webp';
import _inverxImg from '../../assets/About-page/Jetour.webp';
import _inverexImg from '../../assets/ElipseImages/projects/G-1.webp';

const volvoHero = getImgSrc(_volvoHero);
const sharkImg = getImgSrc(_sharkImg);
const kiaImg = getImgSrc(_kiaImg);
const seatImg = getImgSrc(_seatImg);
const inverxImg = getImgSrc(_inverxImg);
const inverexImg = getImgSrc(_inverexImg);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-3 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-200/80 shadow-md group w-full">
      <img
        alt={alt || cap || '3D Product Configurator'}
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
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer w-full sm:w-auto"
        >
          <span>{actionText || 'Launch Configurator'}</span>
          <FiExternalLink className="text-sm" />
        </a>
      </div>
    )}
  </div>
);

const AuProductConfiguratorArticle = () => {
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
    '3D PRODUCT CONFIGURATORS AUSTRALIA',
    '✦',
    'REAL-TIME WEBGL CONFIGURATOR',
    '✦',
    'SHOPIFY PLUS & WOOCOMMERCE',
    '✦',
    'WEBAR 1:1 SCALE IN ROOM',
    '✦',
    'SUB-2MB DRACO PAYLOAD',
    '✦',
    'AUD PRICING & GST LOGIC',
    '✦',
    'SYDNEY · MELBOURNE · BRISBANE',
    '✦',
    '–30% RETURN RATES',
    '✦',
    '+40% CONVERSION LIFT',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">


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
            <h1 className="text-xl sm:text-3xl md:text-[32px] lg:text-4xl xl:text-[38px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug mb-5 sm:mb-8 px-6 sm:px-8">
              3D Product Configurators for{' '}
              <span className="text-[#2563EB]">Australian E-Commerce Brands</span>{' '}
              (2026 Guide)
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-8 items-center relative">

              {/* Left Column: Body Text & CTA Buttons */}
              <div className="text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 order-2 md:order-1">
                <FaRegLightbulb className="text-[#2563EB] text-2xl" />
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Australian online retail returns regularly exceed 20% in furniture, homewares, and building products. The root cause is not product quality — it is expectation mismatch from static JPEGs.
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
                    Contact Us ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Video Showcase with 9:16 Shorts Framing */}
              <div className="relative flex justify-center items-center px-2 sm:px-0 w-full order-1 md:order-2 my-2 sm:my-0">
                <div className="absolute w-56 h-56 sm:w-[24rem] sm:h-[24rem] lg:w-[27rem] lg:h-[27rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 text-neutral-400 text-xl select-none">⚡</span>
                </div>

                <div
                  onClick={toggleSound}
                  className="relative w-full max-w-[13rem] sm:max-w-[17rem] md:max-w-[18rem] lg:max-w-[20rem] aspect-[9/16] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black group z-10 cursor-pointer"
                >
                  <div className="absolute inset-0 overflow-hidden flex items-center justify-center pointer-events-none">
                    <iframe
                      ref={iframeRef}
                      src="https://www.youtube.com/embed/Z_7q0SBbZ1Y?autoplay=1&mute=1&loop=1&playlist=Z_7q0SBbZ1Y&playsinline=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1&fs=0&enablejsapi=1"
                      title="Australian 3D Configurator Reel"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="w-full h-full object-contain border-0"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

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
                  +40% Lift
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  E-Commerce Conversion Rate
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Static photography shows what a product looks like. A 3D configurator shows buyers what their custom product will look like in their real space.&rdquo;
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
                Book a Free 15-Minute Scoping Call (AUD Pricing) ↗
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

        {/* ══════ INTRO: DISPATCH FROM SYDNEY & MELBOURNE ══════ */}
        <section className="py-8 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-4">
              <div className="italic text-[#2563EB] text-base mb-3 font-serif">
                The Australian Retail Shift
              </div>
              <p className="text-xl sm:text-2xl leading-snug text-zinc-800 font-sans mb-4">
                Australian consumers researching high-consideration purchases in 2026 do not rely on flat photos. They expect to configure finishes in real time before checkout.
              </p>
              <p className="text-neutral-600 text-sm leading-relaxed mb-4">
                Across furniture, homewares, and building materials, return rates exceed 20% due to expectation mismatch. A production-grade WebGL 3D configurator lets shoppers rotate geometry, swap PBR materials, and place items at 1:1 scale in WebAR.
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <span className="text-xs font-bold text-neutral-900 bg-neutral-100 px-3 py-1 rounded-full"><strong>+40%</strong> Conversion Lift</span>
                <span className="text-xs font-bold text-[#2563EB] bg-blue-50 px-3 py-1 rounded-full"><strong>–30%</strong> Return Reduction</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full"><strong>AUD + GST</strong> Checkout Sync</span>
              </div>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 rotate-[0.6deg] relative shadow-sm">
              <Frame
                src={kiaImg}
                cap="Real-time WebGL interactive customizer — multi-variant rendering directly in browser"
                alt="3D Product Configurator"
                actionLink="https://legacy.elipsestudio.com/Kia/"
                actionText="Launch KIA Configurator"
              />
            </div>
          </div>
        </section>

        {/* ══════ THE 4 PILLARS (EXACT AUTOMOTIVE / LEAP JOURNAL FORMAT) ══════ */}
        <section id="journal" className="pt-10 sm:pt-16 pb-0 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-5 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">The Australian 3D configurator architecture</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026</span>
            </div>

            {/* ── Entry 01: Real-Time WebGL & Draco Compression ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Sub-2MB WebGL assets with Draco compression
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  A 3D configurator is not a 360-degree photo spinner. It renders real geometry live via WebGL using Three.js or Babylon.js. With Draco geometry compression, high-detail models compress to <strong>sub-2MB payloads</strong> that load in under 2 seconds on Australian 4G mobile connections.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Physically Based Rendering (PBR) swaps material shaders (leather, linen, brushed metallic) in milliseconds without reloading geometry, sustaining a guaranteed 60 FPS across mobile viewports.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={sharkImg}
                  cap="BYD Shark 6 interactive multi-angle visualizer — browser WebGL with live accessories"
                  alt="BYD Shark 6 3D Configurator"
                  actionLink="https://legacy.elipsestudio.com/Zeus-Configurator/"
                  actionText="Launch Zeus Configurator"
                />
              </div>
            </article>

            {/* ── Entry 02: 1:1 Scale WebAR Room Placement ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  WebAR: 1:1 scale spatial placement with zero app downloads
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Over 60% of Australian e-commerce transactions happen on mobile devices. Expectation mismatch occurs because buyers cannot judge scale or room compatibility from a flat photo.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Shoppers tap an AR button and the configured product appears at real 1:1 scale in their living room via iOS Safari or Android Chrome. <strong>No app download or QR code friction.</strong> What they see is what they receive.
                </p>
              </div>
              <div className="md:order-2">
                <Frame
                  src={seatImg}
                  cap="Automotive seat customizer — micro-leather PBR normal depth and tactile material toggles"
                  alt="Automotive seat customizer"
                  actionLink="https://seat-cover-configurator.inknalgorithm.com/"
                  actionText="Launch Seat Configurator"
                />
              </div>
            </article>

            {/* ── Entry 03: Native Shopify Plus & WooCommerce Checkout Sync ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-10 sm:py-12 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Shopify Plus, WooCommerce & AUD/GST quote sync
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  A 3D configurator must integrate into your existing store. For <strong>Shopify Plus</strong>, it embeds via Theme App Extensions and syncs directly with the Storefront API, passing the configured variant SKU with AUD pricing and GST-inclusive logic into the cart.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  For <strong>WooCommerce</strong>, it embeds as a Gutenberg block and integrates with local gateways (Afterpay, Zip, eWAY). For custom B2B portals, it outputs structured line-item quote PDFs for procurement teams.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={inverxImg}
                  cap="Inverex multi-variant customizer — studio lighting controls and dynamic pricing calculations"
                  alt="Real-time multi-coat finishes"
                  actionLink="https://legacy.elipsestudio.com/Car_Configurator/"
                  actionText="Launch Car Configurator"
                />
              </div>
            </article>

            {/* ── Entry 04: Hard Commercial ROI & 48h Seasonal Variants ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 pt-10 sm:pt-12 pb-6 sm:pb-8 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                  Commercial ROI benchmarks & 48-hour seasonal variants
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Production configurators consistently deliver <strong>+40% conversion rate lift</strong> and <strong>20–30% lower return rates</strong> on configured products.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-3">
                  Crucially, adding new seasonal variants — a summer colourway or limited-edition finish — takes <strong>48 to 72 hours</strong> using our PBR material library. No new photography shoots. No rebuild of the 3D model.
                </p>
                <ul className="space-y-1.5 text-xs sm:text-sm text-neutral-700">
                  <li>• <strong>Furniture & Homewares:</strong> $800–$4,000+ AOV; configurator pays for itself in 3–4 months.</li>
                  <li>• <strong>Building Materials & CPQ:</strong> Instant SafeWork NSW/VIC compliant quotes.</li>
                  <li>• <strong>Outdoor & Lifestyle:</strong> BBQ and pergola customizers for peak summer demand.</li>
                </ul>
              </div>
              <div className="md:order-2">
                <Frame
                  src={volvoHero}
                  cap="Volvo S90 photorealistic real-time build experience — high-ticket configuration at 60 FPS"
                  alt="Volvo S90 3D Configurator"
                />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS & SCOPING (EXACT AUTOMOTIVE FORMAT) ══════ */}
        <section className="pt-8 sm:pt-12 pb-12 sm:pb-16 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="italic text-[#2563EB] mb-3 font-serif">
              Closing reflections
            </div>
            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-8">
              Static photography shows what a product looks like. A 3D configurator shows what their product will look like.
            </h3>
          </div>
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-zinc-700 leading-relaxed font-sans">
              Before an Australian shopper checks out, they have already configured their build. That shift in psychological ownership — from observed product to personalized choice — is where the conversion happens and returns disappear.
            </p>
            <p className="italic text-lg text-zinc-900 leading-relaxed font-serif">
              Audit your product catalogue. Define your configurator specification.
            </p>
            <p className="text-zinc-700 leading-relaxed font-sans">
              Book a free 15-minute technical scoping call. We will review your CAD models or current photography, confirm your Australian variant matrix, recommend browser WebGL vs WebAR integration, and provide transparent delivery timelines with AUD pricing.
            </p>
          </div>
          <div className="max-w-2xl mx-auto text-center mt-8">
            <div className="italic text-2xl text-[#2563EB] font-serif">
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
                Book a Free Technical Scoping Call (AUD) ↗
              </Link>
              <Link
                href="/services/3d-product-configurators"
                className="px-6 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-all shadow-sm"
              >
                Explore 3D Configurators
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default AuProductConfiguratorArticle;
