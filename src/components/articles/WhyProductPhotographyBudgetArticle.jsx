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
  FiCalendar
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';
import { FAQItem } from './articleHelpers';

import _heroImg from '../../assets/ElipseImages/projects/3D-rendering.webp';
import _c1Img from '../../assets/ElipseImages/projects/C-1.webp';
import _c2Img from '../../assets/ElipseImages/projects/C-2.webp';
import _towelImg from '../../assets/ElipseImages/projects/TOWEL.webp';
import _boatImg from '../../assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp';
import _workflowImg from '../../assets/ElipseImages/blogs/workflow.webp';

// Ahmed Food 3D CGI Product Assets
import _ahmedJam03 from '../../assets/Ahmed-food/jam&spread/07.webp';
import _ahmedJelly02 from '../../assets/Ahmed-food/jelly/03.webp';
import _ahmedBiryani01 from '../../assets/Ahmed-food/bombay-biryani/11.webp';
import _ahmedJam15 from '../../assets/Ahmed-food/jelly/04.webp';

const heroImg = getImgSrc(_heroImg);
const c1Img = getImgSrc(_c1Img);
const c2Img = getImgSrc(_c2Img);
const towelImg = getImgSrc(_towelImg);
const boatImg = getImgSrc(_boatImg);
const workflowImg = getImgSrc(_workflowImg);

const ahmedJam03 = getImgSrc(_ahmedJam03);
const ahmedJelly02 = getImgSrc(_ahmedJelly02);
const ahmedBiryani01 = getImgSrc(_ahmedBiryani01);
const ahmedJam15 = getImgSrc(_ahmedJam15);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-3 w-full my-4 sm:my-6">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || '3D Product Rendering Visual'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </figure>
    {cap && (
      <p className="font-serif italic text-xs sm:text-sm text-zinc-500">
        {cap}
      </p>
    )}
  </div>
);

const WhyProductPhotographyBudgetArticle = () => {
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
    '3D PRODUCT RENDERING',
    '✦',
    'PRODUCT VISUALIZATION',
    '✦',
    'PHOTOGRAPHY VS 3D',
    '✦',
    'REUSABLE 3D ASSETS',
    '✦',
    'ECOMMERCE 2026',
    '✦',
    'COST OPTIMIZATION',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">

        {/* ══════ LEAP-STYLE HERO SECTION ══════ */}
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
            {/* Meta Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider mb-6">
              <span>3D Product Rendering</span>
              <span>·</span>
              <span>7 min read</span>
            </div>

            {/* Main Center Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              Why Your Product Photography Budget Is Going to the{' '}
              <span className="text-[#2563EB]">Wrong Place in 2026</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative text-left">
              {/* Left Column */}
              <div className="space-y-3 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-lg sm:text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Executive Brief</span>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Most brands spend $2,000–$8,000 per product shoot on photos that can&apos;t be reused. Here is why 3D product rendering is a smarter long-term investment — and when photography still wins.
                </p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-2.5 pt-1">
                  <button
                    onClick={handleScrollToJournal}
                    className="px-3.5 py-1.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Read Analysis ↓
                  </button>
                  <Link
                    href="/contact"
                    className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Get Scoped ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Showcase YouTube Shorts Reel Frame */}
              <div className="relative flex justify-center px-4 sm:px-0 my-2 md:my-0">
                <div className="absolute w-56 h-56 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>
                <div className="relative w-52 h-[18rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <iframe
                    src="https://www.youtube.com/embed/E3X9qNqT2MA?rel=0"
                    title="3D Product Rendering YouTube Shorts Reel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Quote Callout */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  Product CGI
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Cost Efficiency & Scaling
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;The most expensive photograph is the one you have to take twice. The smartest brands are figuring out which shots they never need to take at all.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Bilal Lania, CEO — Elipse Studio</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Get a Free Rendering Assessment ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio · 3D Product Rendering</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Article Below ↓
              </button>
            </div>
          </div>
        </section>

        {/* ══════ MARQUEE TICKER ══════ */}
        <section className="my-12 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ JOURNAL ARTICLES (RESPONSIVE GRID SYSTEM) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Commercial CGI Strategy & Cost Analysis</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026</span>
            </div>

            {/* Intro Header Paragraph */}
            <div className="py-8 border-b border-zinc-200 max-w-3xl">
              <p className="text-lg sm:text-xl text-zinc-800 leading-relaxed font-serif italic mb-4">
                Let&apos;s have an honest conversation about product photography.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                It&apos;s expensive. It&apos;s slow. And every time your product changes — new colorway, new size, new configuration — you do it all over again.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                Most ecommerce brands budget $2,000 to $8,000 per product shoot. Add a studio day rate, a stylist, post-production, and the cost climbs fast. For a brand with 50 product variants, that&apos;s a significant chunk of annual marketing spend going to assets that can&apos;t be updated without starting from scratch.
              </p>
            </div>

            {/* Entry 01 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Hidden Cost Nobody Puts in the Brief
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  When a brand books a product shoot, they calculate the obvious costs: photographer day rate, studio hire, props, retouching. But there are hidden costs that accumulate silently:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 max-w-[66ch]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <span><strong>Reshoots for updates:</strong> A new handle or packaging requires a full studio rebook.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <span><strong>Missing angles:</strong> Forgotten interior or rear panel views can&apos;t be generated post-shoot.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] mt-1.5 shrink-0" />
                    <span><strong>Inconsistent seasonal lighting:</strong> Shoots in different months never produce identical catalog lighting.</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-2">
                <Frame src={ahmedJam03} cap="Photorealistic 3D CGI product render for Ahmed Foods jam and spread packaging." />
              </div>
            </article>

            {/* Entry 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  What 3D Product Rendering Actually Is
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  3D product rendering is a photorealistic image generated digitally from a 3D model. We take your CAD file or build a model from samples, apply PBR materials (fabrics, metals, leathers, organic food glass), set up virtual studio lighting, and render from any angle.
                </p>
                <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl max-w-[66ch]">
                  <p className="text-xs sm:text-sm text-zinc-800 font-medium">
                    The key word is <strong>&lsquo;once.&rsquo;</strong> Once we build the 3D master model, generating a new colorway costs a fraction of a reshoot, and a new camera angle is a few hours of rendering.
                  </p>
                </div>
              </div>
              <div className="md:order-1">
                <Frame src={ahmedJelly02} cap="Photorealistic 3D organic material render for Ahmed Foods translucent jelly product." />
              </div>
            </article>

            {/* Entry 03: Real World Comparison Table */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                03
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-6">
                A Real-World Commercial Comparison
              </h3>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
                <table className="w-full min-w-[580px] text-left text-xs sm:text-sm text-zinc-800">
                  <thead className="bg-zinc-900 text-white uppercase font-semibold text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Scenario</th>
                      <th className="py-3.5 px-4 sm:px-6 whitespace-nowrap">Product Photography</th>
                      <th className="py-3.5 px-4 sm:px-6 text-[#3B82F6] whitespace-nowrap">3D Product Rendering</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Initial product (6 angles, 3 colorways)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-600 whitespace-nowrap">$4,500 – $9,000</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#2563EB] whitespace-nowrap">$2,800 – $4,500</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Add a 4th colorway later</td>
                      <td className="py-3.5 px-4 sm:px-6 text-red-600 font-medium whitespace-nowrap">$1,800 – $3,000 (reshoot)</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-600 whitespace-nowrap">$200 – $400 (material swap)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Add 3 new angles</td>
                      <td className="py-3.5 px-4 sm:px-6 text-red-600 font-medium whitespace-nowrap">$1,500 – $2,500 (reshoot)</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-600 whitespace-nowrap">$300 – $600 (re-render)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Animated product turntable</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-600">Separate video shoot</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#2563EB]">Included from same model</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">AR viewer for ecommerce</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-400">Not possible from photos</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#2563EB]">Same model, separate build</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* Entry 04 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  When Photography Still Wins
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  This isn&apos;t a takedown of product photography. Real photography is still the right choice for lifestyle shots with human models, high-tactile handmade leathers/ceramics, and art-directed brand stories.
                </p>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 max-w-[66ch]">
                  <p className="text-xs sm:text-sm text-zinc-800 font-medium">
                    <strong>The Hybrid Strategy:</strong> Use 3D rendering for your main catalog, variant assets, and web configurators. Use photography for brand campaigns and lifestyle media.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={ahmedBiryani01} cap="High-speed cinematic 3D CGI render for Ahmed Foods Bombay Biryani commercial spot." />
              </div>
            </article>

            {/* Entry 05 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Multiplier Effect Nobody Accounts For
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Once Elipse Studio builds a 3D master model of your product, that single digital asset can power ecommerce imagery, animated social media turntables, AR &lsquo;view in room&rsquo; experiences, and web configurators.
                </p>
                <p className="text-zinc-900 font-semibold text-xs sm:text-sm bg-zinc-100 p-4 rounded-xl max-w-[66ch]">
                  You pay once for the model. Every output after that costs significantly less than recreating from scratch.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={ahmedJam15} cap="Commercial product master CGI render for Ahmed Foods jam and spread lineup." />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA BOX SECTION (CLEAN LIGHT THEME) ══════ */}
        <section className="mt-16 pt-10 pb-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-zinc-50/80 border border-zinc-200/90 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Commercial Assessment
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-tight mb-4">
              See What 3D Rendering Costs for Your Product Range
            </h2>
            
            <p className="text-zinc-600 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Send us your product list and CAD files. We&apos;ll give you a clear breakdown of what 3D rendering costs versus your current photography budget — with honest advice on where each makes sense.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                <span className="leading-tight">Get a Free Rendering Assessment</span>
                <FiArrowRight className="text-base sm:text-lg shrink-0 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </div>
        </section>

        {/* ══════ FAQ SECTION ══════ */}
        <div className="py-12 border-t border-zinc-200 max-w-4xl mx-auto">
          <h3 className="font-serif font-bold text-2xl text-zinc-900 mb-6">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <FAQItem
              question="How accurate are 3D product renders compared to physical photos?"
              answer="Our 3D renders match physical product spec sheets with 99%+ visual fidelity. We use Physically Based Rendering (PBR) shaders to accurately mimic light behavior on metals, plastics, glass, fabrics, and leathers."
            />
            <FAQItem
              question="What files do I need to send to start a 3D product render project?"
              answer="CAD files (SolidWorks, STEP, IGES, OBJ, FBX) are ideal. If you don't have CAD files, we can also build 3D models from physical product samples or high-resolution technical drawings."
            />
            <FAQItem
              question="How long does it take to render a product range in 3D?"
              answer="Initial 3D master model setup typically takes 3 to 7 business days. Once the master model exists, generating new colorways, materials, or camera angles takes just 24 to 48 hours."
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default WhyProductPhotographyBudgetArticle;
