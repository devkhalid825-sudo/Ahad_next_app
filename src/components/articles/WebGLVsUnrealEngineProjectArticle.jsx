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

import _heroImg from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _jetourImg from '../../assets/ElipseImages/blogs/jetour.webp';
import _autoImg from '../../assets/ElipseImages/blogs/Auto.webp';
import _kiaImg from '../../assets/ElipseImages/blogs/kia-configrator.webp';
import _configuratorCardImg from '../../assets/ElipseImages/personal/Configurator.webp';
import _steeringImg from '../../assets/ElipseImages/projects/Streeing-1.webp';

const heroImg = getImgSrc(_heroImg);
const jetourImg = getImgSrc(_jetourImg);
const autoImg = getImgSrc(_autoImg);
const kiaImg = getImgSrc(_kiaImg);
const configuratorCardImg = getImgSrc(_configuratorCardImg);
const steeringImg = getImgSrc(_steeringImg);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-3 w-full my-4 sm:my-6">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || 'WebGL vs Unreal Engine 3D Configurator'}
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

const WebGLVsUnrealEngineProjectArticle = () => {
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
    'WEBGL VS UNREAL ENGINE',
    '✦',
    'PIXEL STREAMING',
    '✦',
    'REAL TIME 3D',
    '✦',
    '3D CONFIGURATOR',
    '✦',
    'BROWSER RENDERING',
    '✦',
    'UNREAL ENGINE 5',
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
              <span>3D Technology</span>
              <span>·</span>
              <span>6 min read</span>
            </div>

            {/* Main Center Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              WebGL vs Unreal Engine:{' '}
              <span className="text-[#2563EB]">Which One Should Power Your Next 3D Project?</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative text-left">
              {/* Left Column */}
              <div className="space-y-3 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-lg sm:text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Technical Evaluation</span>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  WebGL or Unreal Engine 5? The wrong choice adds cost and complexity you don&apos;t need. Here is how to decide — based on your product, audience, and actual budget.
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
                    Free Consultation ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Photo */}
              <div className="relative flex justify-center px-4 sm:px-0 my-2 md:my-0">
                <div className="absolute w-56 h-56 sm:w-[26rem] sm:h-[26rem] lg:w-[30rem] lg:h-[30rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>
                <div className="relative w-full h-[18rem] sm:h-[22rem] lg:h-[26rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={heroImg}
                    alt="WebGL vs Unreal Engine 3D Configurator Comparison"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Right Column: Quote Callout */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  3D Architecture
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  WebGL vs UE5 Pixel Streaming
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;The answer isn&apos;t one-size-fits-all. Both technologies serve different key moments in the buyer journey.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Elipse Studio Engineering Team</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a Free Technical Consultation ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio · 3D Technology</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Comparison Below ↓
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
              <span className="font-serif italic text-[#2563EB] text-base">3D Engine & Pipeline Decision Framework</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026</span>
            </div>

            {/* Intro Header */}
            <div className="py-8 border-b border-zinc-200 max-w-3xl">
              <p className="text-lg sm:text-xl text-zinc-800 leading-relaxed font-serif italic mb-4">
                We get asked this question constantly.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                A brand comes to us with a 3D brief — a configurator, a virtual showroom, a product visualization — and one of the first decisions we help them make is:
              </p>
              <p className="text-base sm:text-lg font-bold text-zinc-900 bg-zinc-100 p-4 rounded-xl border-l-4 border-[#2563EB]">
                &ldquo;Should we use WebGL or Unreal Engine?&rdquo;
              </p>
            </div>

            {/* Entry 01 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  What WebGL Actually Is
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  WebGL is a browser API giving direct access to the device GPU. It renders real-time 3D without plugins, apps, or downloads right inside Chrome, Safari, and Edge.
                </p>
                <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 max-w-[66ch]">
                  <p className="text-xs sm:text-sm text-zinc-800 font-medium">
                    Runs directly on the user device — instantaneous URL loading for ecommerce shoppers.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={jetourImg} cap="Web-based WebGL product configurator optimized for fast mobile rendering." />
              </div>
            </article>

            {/* Entry 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  What Unreal Engine 5 with Pixel Streaming Is
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  UE5 renders real-time graphics at Hollywood cinematic fidelity. With Pixel Streaming, powerful GPU cloud servers stream live video frames directly to any viewer phone or browser.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={autoImg} cap="Unreal Engine 5 photorealistic automotive showroom rendered via cloud pixel streaming." />
              </div>
            </article>

            {/* Entry 03: Table */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                03
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-6">
                The Honest Comparison
              </h3>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white">
                <table className="w-full min-w-[580px] text-left text-xs sm:text-sm text-zinc-800">
                  <thead className="bg-zinc-900 text-white uppercase font-semibold text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 sm:px-6">Factor</th>
                      <th className="py-3.5 px-4 sm:px-6 text-[#3B82F6] whitespace-nowrap">WebGL</th>
                      <th className="py-3.5 px-4 sm:px-6 text-purple-400 whitespace-nowrap">Unreal Engine 5 (Pixel Streaming)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Visual quality</td>
                      <td className="py-3.5 px-4 sm:px-6 font-medium text-zinc-800">Excellent (photorealistic PBR)</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-purple-600">Cinematic — Hollywood grade</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Load time</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-600">Under 2 seconds</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-600">3–8 seconds (stream startup)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Device requirement</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-600">Any modern phone or laptop</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#2563EB]">Any device (rendering is cloud-side)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Ongoing cost</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-600">Zero GPU cost after launch</td>
                      <td className="py-3.5 px-4 sm:px-6 text-amber-600 font-medium">Ongoing cloud GPU server cost</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Simultaneous users</td>
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-emerald-600">Unlimited (runs on-device)</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-600">Scales with server capacity</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Best for</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-800">Ecommerce, configurators, product pages</td>
                      <td className="py-3.5 px-4 sm:px-6 text-zinc-800">Luxury auto, premium real estate, investor pitches</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-zinc-900">Development cost</td>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-[#2563EB] whitespace-nowrap">$12,000 – $45,000</td>
                      <td className="py-3.5 px-4 sm:px-6 font-semibold text-purple-600 whitespace-nowrap">$35,000 – $120,000+</td>
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
                  The Decision Framework
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-zinc-700 max-w-[66ch]">
                  <p><strong>1. Audience Location:</strong> Mobile searchers need fast WebGL; enterprise presentations favor UE5.</p>
                  <p><strong>2. Concurrency:</strong> 10k users costs $0 extra on WebGL, but requires 10k GPU instances on UE5.</p>
                  <p><strong>3. Use Case:</strong> Daily ecommerce configurator = WebGL; High-ticket trade show pitches = UE5.</p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={configuratorCardImg} cap="3D product configurator UI design for web browser deployment." />
              </div>
            </article>

            {/* Entry 05 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Hybrid Strategy Most Brands Choose
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Use WebGL on your product page for daily ecommerce buyers, and use Unreal Engine 5 pixel streaming for trade show presentations and VIP pitches. They serve different moments in the buyer journey.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={steeringImg} cap="High-speed WebGL mobile interactive steering and product configurator demo." />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA BOX SECTION (CLEAN LIGHT THEME) ══════ */}
        <section className="mt-16 pt-10 pb-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-zinc-50/80 border border-zinc-200/90 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Technical Consultation
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-tight mb-4">
              Not Sure Which Technology Fits Your Brief?
            </h2>
            
            <p className="text-zinc-600 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Tell us about your project and audience. We&apos;ll recommend the right stack with honest cost and timeline estimates.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                <span className="leading-tight">Book a Free Technical Consultation</span>
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
              question="Does WebGL work on mobile smartphones?"
              answer="Yes, WebGL 2.0 is supported natively on iOS (Safari) and Android (Chrome). When optimized properly by Elipse Studio, WebGL 3D configurators load in under 2 seconds on 4G connections."
            />
            <FAQItem
              question="How much does Pixel Streaming for Unreal Engine 5 cost per hour?"
              answer="Cloud GPU server instances (AWS G4/G5 or Azure NV series) for UE5 pixel streaming range between $1.00 to $2.50 per active streaming hour depending on GPU specs and concurrency."
            />
            <FAQItem
              question="Can we convert a WebGL 3D model into an Unreal Engine 5 project?"
              answer="Yes, 3D asset geometries (FBX, OBJ, GLTF) and PBR texture maps can be shared and adapted between WebGL pipelines and Unreal Engine 5."
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default WebGLVsUnrealEngineProjectArticle;
