'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { m as motion } from 'framer-motion';
import {
  FiShare2,
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiCheckCircle,
  FiArrowRight,
  FiClock,
  FiCalendar,
  FiSmartphone,
  FiBox,
  FiHelpCircle
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _techBg from '../../assets/About-page/vertical.webp';
import _arThumb from '../../assets/Ar/07.webp';
import _mainAr from '../../assets/About-page/AR.png';
import _configHero from '../../assets/Ar/03.webp';
import _volveImg from '../../assets/Ar/08.png';

const techBg = getImgSrc(_techBg);
const arThumb = getImgSrc(_arThumb);
const mainAr = getImgSrc(_mainAr);
const configHero = getImgSrc(_configHero);
const volveImg = getImgSrc(_volveImg);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-2 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/90 shadow-md group">
      <img
        alt={alt || cap || 'AR Product Visualization'}
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

const ArProductVisualizationArticle = () => {
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
    'AR PRODUCT VISUALIZATION',
    '✦',
    'WEBAR EXPERIENCES',
    '✦',
    'REDUCE RETURN RATES',
    '✦',
    '3D COMMERCE',
    '✦',
    'BROWSER-NATIVE SPATIAL',
    '✦',
    'SHOPIFY & WOOCOMMERCE',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ HERO SECTION (LEAP STRUCTURE) ══════ */}
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

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center">

            {/* Main Center Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-[56px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-6 md:mb-8 px-4">
              AR Product Visualization for Ecommerce Brands:{' '}
              <span className="text-[#2563EB]">The 2026 Guide</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 items-center relative text-left">

              {/* Left Column: Summary & CTAs (Mobile: Order 2, Desktop: Order 1) */}
              <div className="order-2 md:order-1 text-center md:text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Ecommerce Brief</span>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  Your customers cannot touch your product online. AR product visualization solves that — letting buyers place, rotate, and inspect your product in their real space before buying.
                </p>
                <div className="w-full flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
                  <Link
                    href="/contact"
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Book AR Strategy Call ↗
                  </Link>
                  <Link
                    href="/services/3d-product-configurators"
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    View 3D Configurators ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Visual Frame (Mobile: Order 1, Desktop: Order 2) */}
              <div className="order-1 md:order-2 relative flex justify-center px-4 sm:px-0 -mt-2 sm:-mt-4 md:-mt-8 mb-4 md:mb-0">
                <div className="absolute w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">📱</span>
                </div>
                <div className="relative w-64 h-[22rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-100 group z-10">
                  <img
                    src={techBg}
                    alt="AR Product Visualization for Ecommerce Brands"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                </div>
              </div>

              {/* Right Column: Key Stats & Quote (Mobile: Order 3, Desktop: Order 3) */}
              <div className="order-3 md:order-3 text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none font-mono">
                  2.4x Lift
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Conversion When AR Is Active
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;The return problem is not a quality problem. It is a visualization problem. When buyers see it in their space, returns disappear.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1">— Bilal Lania</p>
                </div>
              </div>

            </div>

            {/* Bottom Clean Light Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-zinc-50 border border-zinc-200 text-zinc-800 px-6 py-3 rounded-full shadow-sm">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-[#2563EB] hover:underline"
              >
                Book a Free AR Scoping Call ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-zinc-300" />
              <span className="text-xs sm:text-sm font-medium text-zinc-600">By Bilal Lania · CEO & Creative Director, Elipse Studio</span>
              <span className="hidden sm:block h-4 w-px bg-zinc-300" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-zinc-800 hover:text-[#2563EB] transition-colors cursor-pointer"
              >
                Read 5 Lessons Below ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ MARQUEE TICKER ══════ */}
        <section className="my-16 overflow-hidden border-y border-zinc-200 py-6 bg-zinc-50/80 -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#2563EB]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ 5 CORE SECTIONS (JOURNAL ENTRIES: LEAP ALTERNATING FORMAT) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Five Ground Reality Lessons</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">WebAR · Ecommerce 2026</span>
            </div>

            {/* ── Entry 01: What WebAR Actually Is (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  What WebAR actually is: frictionless browser spatial shopping
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  WebAR is browser-based augmented reality that places a photorealistic 3D model into the buyer&apos;s physical environment using their smartphone camera. <strong>No app download required. No QR code redirects.</strong> It runs natively on iOS Safari (iPhone 8+) and Android Chrome.
                </p>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Why browser wins:</strong> App-based AR loses 80%+ of users to download friction and is invisible to Google search traffic. WebAR keeps shoppers on the product page — going from search result to live AR in under 30 seconds.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={arThumb} cap="Mobile WebAR experience launching instantly from a product page button." alt="WebAR Mobile Product Experience" />
              </div>
            </article>

            {/* ── Entry 02: Return Rate Crisis & Conversion Lift (IMAGE LEFT | CONTENT RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  The return rate crisis: why buyers abandon and how AR fixes it
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  In furniture and home goods, average return rates hit 30%, with <strong>64% of returns citing &ldquo;product looked different in real life.&rdquo;</strong> These are not product quality failures — they are <em>information failures</em> where static photos couldn&apos;t communicate scale or context.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                  <div className="bg-zinc-50/80 border border-zinc-200 p-4 rounded-xl">
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#2563EB] leading-none mb-1.5">2.4×</div>
                    <p className="text-xs text-zinc-600 font-medium leading-snug">Higher conversion when AR is available vs static product photography.</p>
                  </div>
                  <div className="bg-zinc-50/80 border border-zinc-200 p-4 rounded-xl">
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#2563EB] leading-none mb-1.5">11 min</div>
                    <p className="text-xs text-zinc-600 font-medium leading-snug">Average spatial dwell time before confident checkout.</p>
                  </div>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  When buyers inspect items at 1:1 scale in their actual room, delivery surprises disappear — and returns drop by 40% to 55%.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={mainAr} cap="Real-time room placement eliminating dimensional mismatch complaints." alt="Real-time room placement" />
              </div>
            </article>

            {/* ── Entry 03: The 3-Step Pipeline (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  How it works: from CAD model to buyer&apos;s living room
                </h3>
                <div className="space-y-3 font-sans text-xs sm:text-sm text-zinc-700 mb-4">
                  <p>
                    <strong className="text-zinc-900 font-semibold">1. Optimized 3D Model:</strong> Built from CAD data (STEP, OBJ, SolidWorks), with reduced polygons and compressed textures. Exports USDZ for Apple Safari and GLB for Android Chrome.
                  </p>
                  <p>
                    <strong className="text-zinc-900 font-semibold">2. WebXR Spatial Tracking:</strong> Accesses the device camera, detects horizontal surfaces, and locks the asset at precise real-world scale for 360° inspection.
                  </p>
                  <p>
                    <strong className="text-zinc-900 font-semibold">3. Seamless Storefront Integration:</strong> Embeds directly into Shopify, WooCommerce, or headless Next.js templates so the cart remains active.
                  </p>
                </div>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Diagnostic rule:</strong> If return notes say &ldquo;smaller than expected&rdquo; or &ldquo;didn&apos;t fit,&rdquo; your catalog will see immediate conversion and bottom-line lift from AR.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={techBg} cap="End-to-end WebXR 3D pipeline delivering interactive AR on mobile web." alt="WebXR 3D Model Pipeline" />
              </div>
            </article>

            {/* ── Entry 04: Costs & Payback Math (IMAGE LEFT | CONTENT RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  2026 build costs, ROI payback, and key sectors
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  Realistic investment ranges for commercial WebAR deployments:
                </p>
                <div className="w-full rounded-xl border border-zinc-200 bg-white shadow-xs overflow-hidden my-4">
                  <table className="w-full text-left text-xs sm:text-sm text-zinc-800">
                    <thead className="bg-zinc-100 text-zinc-900 uppercase font-semibold text-[10px] sm:text-[11px] tracking-wider border-b border-zinc-200">
                      <tr>
                        <th className="py-3 px-3.5 sm:px-4">Scope</th>
                        <th className="py-3 px-3.5 sm:px-4 text-right">Cost Range (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Single product WebAR (up to 3 finishes)</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">$5,500 – $12,000</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Multi-product WebAR (5–10 SKUs)</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">$18,000 – $35,000</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Full catalog AR (20+ SKUs)</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">$40,000 – $85,000+</td>
                      </tr>
                      <tr className="bg-blue-50/50 font-semibold">
                        <td className="py-3 px-3.5 sm:px-4 text-zinc-900 font-bold">
                          Combined{' '}
                          <Link href="/services/3d-product-configurators" className="text-[#2563EB] underline">
                            3D product configurator
                          </Link>{' '}
                          + AR
                        </td>
                        <td className="py-3 px-3.5 sm:px-4 text-right text-[#2563EB] font-extrabold font-mono whitespace-nowrap">$25,000 – $65,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mt-2.5">
                  <strong className="text-zinc-700 font-semibold">Payback Math:</strong> Shipping 1,000 units/mo with a 20% return rate costs ~$7,000/mo. Cutting returns by 30% saves $2,100/mo, paying for the build in under 6 months. High-lift sectors include Furniture, Lighting, and{' '}
                  <Link href="/services/architectural-visualization" className="text-[#2563EB] font-semibold underline">
                    real estate 3D visualization
                  </Link>.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={configHero} cap="Seamless WebAR product customizer running natively in mobile browser." alt="WebAR Configurator Experience" />
              </div>
            </article>

            {/* ── Entry 05: How to Brief & Asset Ownership (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  How to brief an AR studio and retain asset ownership
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  Prepare five items before briefing: <strong>1. CAD or 3D files</strong> (STEP/OBJ), <strong>2. Colorway & texture list</strong>, <strong>3. Platform stack</strong> (Shopify/WooCommerce), <strong>4. Top 3–5 bestsellers</strong> for quick ROI validation, and <strong>5. Target metrics</strong> (return reduction vs conversion lift).
                </p>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Critical ownership question:</strong> &ldquo;Do you deliver the USDZ and GLTF files to us, or do assets stay on your servers?&rdquo; Ensure your brand retains complete ownership of its 3D digital twins.
                  </p>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  The bottom line: AR product visualization is not a novelty. It directly eliminates hesitation at the single most expensive moment in your funnel: the moment a customer is not quite sure.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={volveImg} cap="High-fidelity 3D interactive viewer empowering buyer purchase conviction." alt="3D Real-Time Configurator & AR Product Viewer" />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS (LEAP FORMAT) ══════ */}
        <section className="py-12 sm:py-16 my-12 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-serif italic text-[#2563EB] mb-3">
              Evaluate AR for Your Brand
            </div>
            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
              Ready to Evaluate AR for Your Product Catalog?
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8">
              Send us your product list and any existing 3D assets. We will assess compatibility, confirm timelines, and give you honest cost estimates for your specific catalog and platform.
            </p>
          </div>

          <div className="max-w-2xl mx-auto text-center mt-6">
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
                Book a Free AR Scoping Call ↗
              </Link>
              <a
                href="mailto:info@elipsestudio.com"
                className="px-6 py-2.5 rounded-full border border-neutral-300 text-xs font-semibold text-neutral-800 hover:bg-neutral-100 transition-all shadow-sm"
              >
                info@elipsestudio.com
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default ArProductVisualizationArticle;
