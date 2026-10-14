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

import _heroImg from '../../assets/ElipseImages/projects/Animation.webp';
import _anim4Img from '../../assets/ElipseImages/projects/Animation4.webp';
import _capSecImg from '../../assets/ElipseImages/projects/capabilities-sec.webp';
import _anim2Img from '../../assets/ElipseImages/projects/Animation2.webp';
import _digitalTwinsImg from '../../assets/ElipseImages/personal/Digital twins.webp';

const heroImg = getImgSrc(_heroImg);
const anim4Img = getImgSrc(_anim4Img);
const capSecImg = getImgSrc(_capSecImg);
const anim2Img = getImgSrc(_anim2Img);
const digitalTwinsImg = getImgSrc(_digitalTwinsImg);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-3 w-full my-4 sm:my-6">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || 'CAD to 3D Animation Production Pipeline'}
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

const WhatHappensToCadFileArticle = () => {
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
    'CAD TO 3D ANIMATION',
    '✦',
    'INDUSTRIAL 3D',
    '✦',
    'POLYGON OPTIMIZATION',
    '✦',
    'PBR MATERIALS',
    '✦',
    'MECHANICAL RIGGING',
    '✦',
    'PRODUCT ANIMATION',
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
              <span>Industrial 3D Animation</span>
              <span>·</span>
              <span>7 min read</span>
            </div>

            {/* Main Center Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              What Happens to Your CAD File When You Send It to a{' '}
              <span className="text-[#2563EB]">3D Studio?</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative text-left">
              {/* Left Column */}
              <div className="space-y-3 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-lg sm:text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Pipeline Insight</span>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Most clients send their CAD file and wait. Here is what actually happens to it inside a 3D production pipeline — and why the quality of your output depends on what happens in the first 48 hours.
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
                    className="px-4 py-1.5 sm:px-5 sm:py-2.5 rounded-full bg-[#2563EB] text-[#ffffff] text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap"
                  >
                    Submit CAD Files ↗
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
                    alt="CAD File to 3D Industrial Animation Pipeline"
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
                  CAD Pipeline
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Process Transparency
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;The first 24 hours after receiving a CAD file determine 80% of what the final output can be. A clean file assessment is the most valuable thing we do.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Elipse Studio Production Lead</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Submit Your CAD Files for Assessment ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio · Industrial 3D Animation</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Pipeline Steps Below ↓
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
              <span className="font-serif italic text-[#2563EB] text-base">Industrial CAD to 3D CGI Pipeline</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026</span>
            </div>

            {/* Intro Header */}
            <div className="py-8 border-b border-zinc-200 max-w-3xl">
              <p className="text-lg sm:text-xl text-zinc-800 leading-relaxed font-serif italic mb-4">
                Most clients send us their CAD file and then wait.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                What happens on our end between the moment your file lands in our inbox and the moment you see the first rendered frame is a process most clients never see — and most agencies never explain.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                Understanding the production pipeline helps you prepare better files, set realistic expectations, and spot early whether a studio actually knows what they&apos;re doing.
              </p>
            </div>

            {/* Step 1 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Step 1: The File Assessment (First 24 Hours)
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Before any artistic work begins, your CAD file goes through a technical assessment (SolidWorks, STEP, CATIA, IGES, FBX) to inspect part hierarchy, polygon density, and hidden internal geometry.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={anim4Img} cap="Engineering CAD file geometry assessment and assembly structure breakdown." />
              </div>
            </article>

            {/* Step 2 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Step 2: Polygon Optimization (The Work Nobody Sees)
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Engineering CAD is built for manufacturing, containing millions of microscopic polygons. Manual retopology preserves fine surface curves while optimizing models to 50k–300k polys for video or 20k–80k for WebGL.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={capSecImg} cap="Manual retopology transforms heavy CAD assemblies into high-speed render geometry." />
              </div>
            </article>

            {/* Step 3 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Step 3: Materials and Texturing
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  CAD materials are functional code definitions. We convert them into Physically-Based Rendering (PBR) shaders using RAL/Pantone paints, brushed metal textures, and exact spec samples.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={anim2Img} cap="Photorealistic PBR shader assignment for industrial machinery renders." />
              </div>
            </article>

            {/* Step 4 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  Step 4: Rigging for Moving Parts & Review
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Rigging defines mechanical joint constraints — pistons, conveyor belts, robotic arms. Constrained rigging ensures machinery moves accurately as engineered.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={digitalTwinsImg} cap="Mechanical joint and kinematic constraint rigging for complex machinery animation." />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA BOX SECTION (CLEAN LIGHT THEME) ══════ */}
        <section className="mt-16 pt-10 pb-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-zinc-50/80 border border-zinc-200/90 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              3D CAD Assessment
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-tight mb-4">
              Ready to Start a 3D Animation Project?
            </h2>
            
            <p className="text-zinc-600 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Send us your CAD files and a brief description of what you need. We&apos;ll assess your files within 24 hours and give you a clear production timeline and cost estimate.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                <span className="leading-tight">Submit Your CAD Files for Assessment</span>
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
              question="Do you sign Non-Disclosure Agreements (NDAs) before reviewing CAD files?"
              answer="Yes. We routinely execute bilateral NDAs with industrial clients and OEMs before accepting proprietary CAD assemblies or unannounced product files."
            />
            <FAQItem
              question="Can you work with incomplete or draft CAD files?"
              answer="Yes, our 3D artists can model missing components or clean up corrupted CAD geometries as part of the initial pre-production stage."
            />
            <FAQItem
              question="Which CAD file format is best for 3D animation?"
              answer="STEP (.stp) and SolidWorks (.sldasm) formats are best as they preserve component hierarchy and curved surface mathematical definitions cleanly."
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default WhatHappensToCadFileArticle;
