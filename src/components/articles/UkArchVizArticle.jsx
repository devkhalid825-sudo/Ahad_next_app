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
  FiHelpCircle
} from 'react-icons/fi';
import { FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _zenith from '../../assets/About-page/zenith.webp';
import _khoj from '../../assets/About-page/khoj.webp';
import _nevegan from '../../assets/About-page/Nevegan.jpg';
import _timBarth from '../../assets/About-page/tim-barth.webp';
import _kumar from '../../assets/About-page/kumar.webp';

const zenith = getImgSrc(_zenith);
const khoj = getImgSrc(_khoj);
const nevegan = getImgSrc(_nevegan);
const timBarth = getImgSrc(_timBarth);
const kumar = getImgSrc(_kumar);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-2 w-full">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-100 border border-zinc-200/90 shadow-md group">
      <img
        alt={alt || cap || '3D Architectural Visualisation UK'}
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

const UkArchVizArticle = () => {
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
    'ARCHITECTURAL VISUALISATION UK',
    '✦',
    'OFF-PLAN RENDERS',
    '✦',
    'PLANNING PERMISSION CGIS',
    '✦',
    'LONDON CONSERVATION AREAS',
    '✦',
    'PHOTOMONTAGE VERIFICATION',
    '✦',
    'INTERACTIVE VIRTUAL TOURS',
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
              3D Architectural Visualisation for UK Property Developers:{' '}
              <span className="text-[#2563EB]">The 2026 Guide</span>
            </h1>

            {/* 3-Column Content Grid */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 items-center relative text-left">

              {/* Left Column: Intro & CTAs (Mobile: Order 2, Desktop: Order 1) */}
              <div className="order-2 md:order-1 text-center md:text-left space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">UK Market Guide</span>
                </div>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                  UK property developers are using 3D architectural visualisation to sell off-plan units faster, win planning in conservation areas, and reduce buyer dropout.
                </p>
                <div className="w-full flex flex-row flex-nowrap items-center justify-center gap-2 sm:gap-2.5 pt-1">
                  <Link
                    href="/contact"
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full bg-[#2563EB] text-white text-[11px] sm:text-xs font-semibold hover:bg-blue-700 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Book Scoping Call ↗
                  </Link>
                  <Link
                    href="/services/architectural-visualization"
                    className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-full border border-neutral-300 text-[11px] sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    View ArchViz Work ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Visual Frame (Mobile: Order 1, Desktop: Order 2) */}
              <div className="order-1 md:order-2 relative flex justify-center px-4 sm:px-0 -mt-2 sm:-mt-4 md:-mt-8 mb-4 md:mb-0">
                <div className="absolute w-72 h-72 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">🏛️</span>
                </div>
                <div className="relative w-64 h-[22rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <iframe
                    src="https://www.youtube.com/embed/cdfn5uHR3Co?rel=0"
                    title="3D Architectural Visualisation UK Property Developers Reel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Key Stats & Quote (Mobile: Order 3, Desktop: Order 3) */}
              <div className="order-3 md:order-3 text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none font-mono">
                  43% Faster
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Off-Plan Reservations
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;A show home gives you one unit that thirty buyers walk through. A CGI suite gives every buyer their own visual experience before the building exists.&rdquo;
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
                Book a Free UK Scoping Call ↗
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
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">UK Market · 2026</span>
            </div>

            {/* ── Entry 01: The Four Deliverables (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  The four deliverables UK developers actually use
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  When developers commission{' '}
                  <Link
                    href="/services/architectural-visualization"
                    className="text-[#2563EB] font-semibold underline hover:text-blue-700 transition-colors"
                  >
                    architectural visualisation services
                  </Link>
                  , misaligned briefs waste thousands. UK developers rely on four core tools: <strong>Exterior Photomontages</strong> (calibrated streetscapes for planning), <strong>Interior CGIs</strong> (driving buyer emotional conviction), <strong>Animated Walkthroughs</strong> (60–90 second launch reels), and an{' '}
                  <Link
                    href="/capabilities"
                    className="text-[#2563EB] font-semibold underline hover:text-blue-700 transition-colors"
                  >
                    interactive virtual tour
                  </Link>{' '}
                  for real-time self-directed buyer exploration.
                </p>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Commercial distinction:</strong> Static CGIs show what you want buyers to see. An interactive tour lets overseas and remote buyers explore on their own terms, producing significantly higher purchase conviction.
                  </p>
                </div>
              </div>
              <div className="md:order-2">
                <Frame src={zenith} cap="Zenith luxury residential tower: verified exterior architectural CGI deliverable for off-plan developer marketing." alt="Zenith Exterior Architectural CGI" />
              </div>
            </article>

            {/* ── Entry 02: Off-Plan Economics & Show Home Comparison (IMAGE LEFT | CONTENT RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  Off-plan sales impact: replacing the £65K physical show home
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  A typical UK physical show home fit-out costs <strong>£35,000 to £65,000</strong> to showcase a single unit for local weekend visitors. A full CGI suite covering multiple unit types costs <strong>£8,000 to £22,000</strong> and works 24/7 for buyers in Hong Kong, Dubai, or Manchester reviewing listings at 11pm.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-4">
                  <div className="bg-zinc-50/80 border border-zinc-200 p-4 rounded-xl">
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#2563EB] leading-none mb-1.5">43%</div>
                    <p className="text-xs text-zinc-600 font-medium leading-snug">Of off-plan buyers say CGI renders were the primary factor in their reservation decision.</p>
                  </div>
                  <div className="bg-zinc-50/80 border border-zinc-200 p-4 rounded-xl">
                    <div className="text-3xl sm:text-4xl font-extrabold font-mono text-[#2563EB] leading-none mb-1.5">2.8×</div>
                    <p className="text-xs text-zinc-600 font-medium leading-snug">Longer session dwell time on listings featuring interactive visualisation vs static images.</p>
                  </div>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  High-quality interior CGIs eliminate buyer anxiety between reservation and exchange, reducing specification queries by 68%.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={timBarth} cap="Bespoke kitchen & interior CGI: high-spec show apartment finishes eliminating off-plan buyer hesitation." alt="Luxury Show Apartment Interior CGI" />
              </div>
            </article>

            {/* ── Entry 03: Planning & Conservation Areas (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  Planning permission in conservation areas: why quality is non-negotiable
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  Conservation areas cover roughly a fifth of London&apos;s land mass, alongside historic centres in Edinburgh, Bath, York, Bristol, and Chester. In these locations, planning photomontages are not marketing art — they are legally scrutinized technical evidence.
                </p>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Pre-App Guidance:</strong> Arriving at LPA pre-application meetings with verified contextual CGIs rather than line drawings accelerates committee approval on sensitive urban schemes. Commission visuals before the pre-app, not after.
                  </p>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Camera positions must be surveyor-verified, materials matched to architectural schedules, and shadows accurately simulated against neighbouring building heights.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={khoj} cap="Khoj luxury development masterplan: high-precision architectural CGI detailing scale, amenity zoning, and context." alt="Khoj Architectural Visualisation" />
              </div>
            </article>

            {/* ── Entry 04: UK Cost Breakdown & Schedule Drivers (IMAGE LEFT | CONTENT RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  What UK architectural visualisation costs in 2026
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  UK CGI pricing reflects genuine capability differences. Transparent fee benchmarks across UK deliverables:
                </p>
                <div className="w-full rounded-xl border border-zinc-200 bg-white shadow-xs overflow-hidden my-4">
                  <table className="w-full text-left text-xs sm:text-sm text-zinc-800">
                    <thead className="bg-zinc-100 text-zinc-900 uppercase font-semibold text-[10px] sm:text-[11px] tracking-wider border-b border-zinc-200">
                      <tr>
                        <th className="py-3 px-3.5 sm:px-4">Deliverable</th>
                        <th className="py-3 px-3.5 sm:px-4 text-right">UK Fee Range</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Single exterior CGI photomontage</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">£2,500 – £9,000</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Interior CGI per room</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">£1,500 – £6,000</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Animated walkthrough (60–90s)</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">£8,000 – £35,000</td>
                      </tr>
                      <tr className="hover:bg-zinc-50/60 transition-colors">
                        <td className="py-2.5 px-3.5 sm:px-4 font-medium">Interactive virtual tour</td>
                        <td className="py-2.5 px-3.5 sm:px-4 text-right text-[#2563EB] font-bold font-mono whitespace-nowrap">£18,000 – £85,000</td>
                      </tr>
                      <tr className="bg-blue-50/50 font-semibold">
                        <td className="py-3 px-3.5 sm:px-4 text-zinc-900 font-bold">Full off-plan launch CGI suite</td>
                        <td className="py-3 px-3.5 sm:px-4 text-right text-[#2563EB] font-extrabold font-mono whitespace-nowrap">£15,000 – £60,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed mt-2.5">
                  <strong className="text-zinc-700 font-semibold">Cost Drivers:</strong> A standard 6-week window costs materially less than a rushed 2-week turnaround. Avoid cheap offshore packs with generic furniture — they signal cost-cutting to experienced buyers and planning officers.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={kumar} cap="Kumar luxury foyer & entrance lobby CGI: double-height residential arrival space visualised for off-plan marketing." alt="Kumar Luxury Lobby Foyer CGI" />
              </div>
            </article>

            {/* ── Entry 05: Briefing Best Practices & Launch Advantage (CONTENT LEFT | IMAGE RIGHT) ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 py-12 sm:py-16 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
                  How to brief a studio and establish market leadership
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                  The smoothest projects start with five clear assets: <strong>1. Architectural models</strong> (Revit, ArchiCAD, DWG), <strong>2. OS MasterMap site data</strong>, <strong>3. Material schedule</strong> (brick, mortar, cladding, joinery), <strong>4. Defined audience</strong> (planning vs sales launch), and <strong>5. Portal aspect ratios</strong> (Rightmove/Zoopla).
                </p>
                <div className="bg-blue-50/70 border-l-4 border-[#2563EB] p-4 sm:p-5 rounded-r-xl my-4">
                  <p className="text-xs sm:text-sm text-zinc-800 leading-relaxed">
                    <strong className="text-zinc-900 font-semibold">Ask before appointing:</strong> &ldquo;Show me recent work for a UK conservation area scheme.&rdquo; Streetscape sensitivity is a specialized skill.
                  </p>
                </div>
                <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                  Developers who commission{' '}
                  <Link
                    href="/services/architectural-visualization"
                    className="text-[#2563EB] font-semibold underline hover:text-blue-700 transition-colors"
                  >
                    real estate 3D visualisation
                  </Link>{' '}
                  early — alongside legal packs and agent appointments — avoid rush fees and lock in launch reservation momentum.
                </p>
              </div>
              <div className="md:order-2">
                <Frame src={nevegan} cap="Nevegan luxury penthouse apartment CGI: bespoke open-plan living and skyline terrace rendered for UK off-plan launch campaign." alt="Nevegan Luxury Penthouse Apartment CGI" />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CLOSING REFLECTIONS (LEAP FORMAT) ══════ */}
        <section className="py-12 sm:py-16 my-12 border-t border-zinc-200">
          <div className="max-w-2xl mx-auto text-center">
            <div className="font-serif italic text-[#2563EB] mb-3">
              Closing reflections
            </div>
            <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 leading-tight mb-4">
              Working on a UK Development? Let&apos;s Talk.
            </h3>
            <p className="text-zinc-600 text-sm sm:text-base leading-relaxed mb-8">
              Share your drawings and brief with our team. We work with UK residential, commercial, and mixed-use developers on CGI suites, planning visualisation, animated walkthroughs, and interactive launch packages.
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
                Book a Free Scoping Call ↗
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

export default UkArchVizArticle;
