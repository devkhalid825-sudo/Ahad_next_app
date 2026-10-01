'use client';

import React, { useState, useEffect } from 'react';
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
  FiTrendingUp,
  FiClock,
  FiTarget,
  FiCalendar
} from 'react-icons/fi';
import { FaLinkedin, FaTwitter, FaInstagram, FaRegLightbulb } from 'react-icons/fa';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _heroImg from '../../assets/ElipseImages/projects/elipse-artitecture.webp';
import _configuratorCard from '../../assets/ElipseImages/personal/Configurator.webp';
import _leapPartner from '../../assets/ElipseImages/personal/leap-partner.webp';
import _digitalTwins from '../../assets/ElipseImages/personal/Digital twins.webp';
import _housingImg from '../../assets/ElipseImages/projects/housing-8.webp';
import _steeringImg from '../../assets/ElipseImages/projects/Streeing-1.webp';
import _leapHero from '../../assets/ElipseImages/personal/leap-hero.webp';
import _marineImg from '../../assets/About-page/marine.webp';
import _tradeShowCostImg from '../../assets/About-page/The True Cost of Trade Shows.png';

const heroImg = getImgSrc(_heroImg);
const configuratorCard = getImgSrc(_configuratorCard);
const leapPartner = getImgSrc(_leapPartner);
const digitalTwins = getImgSrc(_digitalTwins);
const housingImg = getImgSrc(_housingImg);
const steeringImg = getImgSrc(_steeringImg);
const leapHero = getImgSrc(_leapHero);
const marineImg = getImgSrc(_marineImg);
const tradeShowCostImg = getImgSrc(_tradeShowCostImg);

const Frame = ({ src, cap, alt, actionLink, actionText }) => (
  <div className="flex flex-col gap-3 w-full my-6 sm:my-8">
    <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || '3D Virtual Showroom architectural render'}
        src={src}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
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
          <span>{actionText || 'Explore Showcase'}</span>
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

const VirtualShowroomsRoiArticle = () => {
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
    'VIRTUAL SHOWROOMS',
    '✦',
    '3D COMMERCE',
    '✦',
    'WEBGL ARCHITECTURE',
    '✦',
    '2026 ROI BENCHMARKS',
    '✦',
    '365-DAY CONVERSION HUB',
    '✦',
    'UNREAL ENGINE 5',
    '✦',
    'ENTERPRISE STRATEGY',
    '✦',
    'ELIPSE STUDIO',
    '✦',
  ];

  return (
    <div data-nav="light" className="w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header />

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

            {/* Main Center Headline (H1) */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              Virtual Showrooms vs Physical Retail:{' '}
              <span className="text-[#2563EB]">The 2026 Financial Case</span>{' '}
              and ROI Benchmarks
            </h1>

            {/* 3-Column Content Grid (LEAP Template - Video in Center) */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center relative text-left">

              {/* Left Column: Summary & CTAs */}
              <div className="space-y-3 max-w-md mx-auto md:mx-0 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <FaRegLightbulb className="text-[#2563EB] text-lg sm:text-xl" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">Executive Brief</span>
                </div>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Why enterprise brands treat virtual showrooms as 365-day conversion hubs alongside trade shows. Hard financial benchmarks, WebGL architecture, and commercial payback math.
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
                    Book Call ↗
                  </Link>
                </div>
              </div>

              {/* Center Column: Hero Photo Render in LEAP frame */}
              <div className="relative flex justify-center px-4 sm:px-0 my-2 md:my-0">
                {/* Circular background shape */}
                <div className="absolute w-56 h-56 sm:w-[32rem] sm:h-[32rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 flex items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>

                {/* Hero Showcase YouTube Shorts Reel Frame */}
                <div className="relative w-52 h-[18rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <iframe
                    src="https://www.youtube.com/embed/Rm2SXb_reVI?rel=0"
                    title="Virtual Showrooms YouTube Shorts Reel"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Right Column: Stars + Quote Callout */}
              <div className="text-center md:text-left flex flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  Enterprise Strategy
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  3D Commerce & ROI Guide
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;Building a virtual showroom was never about cutting costs. It belongs in your annual marketing plan as the core conversion hub.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Bilal Lania</p>
                </div>
              </div>

            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a 15-min scoping call ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Bilal Lania · CEO & Creative Director</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <button
                onClick={handleScrollToJournal}
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Full Guide ↓
              </button>
            </div>

          </div>
        </section>

        {/* ══════ CONTINUOUS MARQUEE TICKER ══════ */}
        <section className="my-12 overflow-hidden border-y border-zinc-200 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ SECTION 2: BIG 5 CONVERSATION & 16:9 VIDEO ══════ */}
        <section className="py-10 sm:py-14">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-8 sm:gap-12 items-start">
            <div className="md:pt-4">
              <div className="italic text-[#2563EB] text-base mb-3 font-serif">
                A conversation following Big 5
              </div>
              <p className="text-xl sm:text-2xl md:text-[26px] leading-snug text-zinc-800 font-sans">
                Right after we finished walking the halls at Big 5, Noman bhai turned to me and asked a very direct question: <span className="italic text-zinc-600 font-serif font-normal text-xl sm:text-2xl block pt-2">&ldquo;Bilal, do you honestly think these companies get their money back after spending so much on these massive booths, logistics, and setups?&rdquo;</span>
              </p>
              <a
                href="#journal"
                className="mt-6 inline-flex items-center gap-2 font-serif italic text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the financial breakdown below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-4 sm:p-5 rotate-[0.6deg] relative shadow-md rounded-lg">
              <div className="relative">
                <div className="aspect-video overflow-hidden bg-zinc-900 rounded-md w-full">
                  <iframe
                    src="https://www.youtube.com/embed/rO1sg3y3TF0?rel=0"
                    title="Virtual Showrooms vs Physical Retail 2026 Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════ ARTICLE SECTIONS (NUMBERED LEAP JOURNAL ENTRIES) ══════ */}
        <section id="journal" className="py-10 sm:py-16 border-t border-zinc-200">
          <div className="max-w-none space-y-0">
            <div className="flex items-baseline justify-between border-b border-zinc-200 pb-6 mb-2">
              <span className="font-serif italic text-[#2563EB] text-base">Commercial Strategy & ROI Breakdown</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026</span>
            </div>

            {/* ── ENTRY 01: Introduction & Mindset ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Trade Show Ecosystem & Digital Mindset
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  It was a fair question. When you walk through an expo like Big 5, you see brands dropping serious capital on elaborate multi-story structures, specialized lighting rigs, and flying in full sales teams across continents. From the outside, it looks like an enormous gamble on a four-day window.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                  My answer to him was simple. Smart enterprise companies do not view a trade show booth as a standalone gamble. They have annual marketing budgets planned out months in advance. They run Meta ads. They run Google search campaigns. They invest in major trade shows. They build multiple funnels because enterprise sales is never about relying on one magic trick. It is about building an ecosystem of channels that feed into each other across the entire year.
                </p>
              </div>
              <div className="md:order-1">
                <Frame
                  src={marineImg}
                  cap="Enterprise trade show presence requires an interconnected year-round digital conversion strategy."
                  alt="Enterprise Trade Show Ecosystem"
                />
              </div>
            </article>

            {/* ── ENTRY 02: The Problem With One-Off Event Spends ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div>
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Problem With One-Off Event Spends
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Let us look at the actual economics. A typical mid-sized brand in building products, commercial furniture, or industrial equipment easily allocates <strong>$150,000 to $200,000</strong> across two major trade show appearances each year.
                </p>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                  If that $180,000 budget produces 250 badge scans, and 40 of those turn into real sales conversations, you are investing roughly <strong>$4,500 per qualified lead</strong> for four days of foot traffic. What happens when the buyer flies back to their office and visits your website to find a static PDF catalog? You lose the momentum.
                </p>
              </div>

              <div className="w-full">
                <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-zinc-50/50 p-1">
                  <table className="w-full text-left text-xs sm:text-sm text-zinc-800">
                    <thead className="bg-zinc-100 text-zinc-900 uppercase font-semibold text-[11px] tracking-wider border-b border-zinc-200">
                      <tr>
                        <th className="py-3.5 px-4">Expense Category</th>
                        <th className="py-3.5 px-4">Cost Range (USD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3.5 px-4 font-medium">Booth Space & Registration</td>
                        <td className="py-3.5 px-4 text-[#2563EB] font-semibold">$40,000 – $50,000</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3.5 px-4 font-medium">Custom Fabrication & Design</td>
                        <td className="py-3.5 px-4 text-[#2563EB] font-semibold">$50,000 – $70,000</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3.5 px-4 font-medium">International Freight & Logistics</td>
                        <td className="py-3.5 px-4 text-[#2563EB] font-semibold">$25,000 – $30,000</td>
                      </tr>
                      <tr className="hover:bg-white transition-colors">
                        <td className="py-3.5 px-4 font-medium">Staff Travel & Hotel Accommodations</td>
                        <td className="py-3.5 px-4 text-[#2563EB] font-semibold">$30,000 – $35,000</td>
                      </tr>
                      <tr className="bg-blue-50/70 font-semibold text-zinc-900">
                        <td className="py-4 px-4">Total Event Budget</td>
                        <td className="py-4 px-4 text-[#2563EB] text-base font-bold">$145,000 – $185,000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </article>

            {/* ── ENTRY 03: The 365-Day Conversion Hub ── */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 items-center mb-8">
                <div>
                  <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                    03
                  </div>
                  <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                    The 365-Day Conversion Hub
                  </h3>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                    This is where a virtual showroom actually earns its budget. It is not an alternative to your sales channels. It is the permanent, year-round home where all your traffic lands and converts.
                  </p>
                  <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch]">
                    When your sales team follows up on a trade show lead, they do not attach a heavy slide deck. They send a direct link to an interactive 3D digital space. The client clicks the link and opens it instantly on their laptop, tablet, or mobile phone without plugins, walking through your{' '}
                    <Link href="/services/architectural-visualization" className="text-[#2563EB] font-semibold underline decoration-2 underline-offset-4 hover:text-blue-800 transition-colors">
                      full architectural space
                    </Link>
                    .
                  </p>
                </div>
                <div>
                  <Frame
                    src={tradeShowCostImg}
                    cap="Year-round interactive architectural digital showroom for remote client walkthroughs."
                    alt="The True Cost of Trade Shows"
                  />
                </div>
              </div>

              {/* Channel Matrix Table */}
              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white mt-6">
                <table className="w-full text-left text-xs sm:text-sm text-zinc-800">
                  <thead className="bg-zinc-900 text-white uppercase font-semibold text-[11px] tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4">Marketing Channel</th>
                      <th className="py-3.5 px-4">Primary Role</th>
                      <th className="py-3.5 px-4">How Virtual Showroom Multiplies ROI</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">Physical Trade Shows</td>
                      <td className="py-3.5 px-4 text-zinc-600">In-person handshakes & trust</td>
                      <td className="py-3.5 px-4 text-zinc-800">Gives overseas prospects an interactive space long after booth is packed away.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">Meta & LinkedIn Ads</td>
                      <td className="py-3.5 px-4 text-zinc-600">Brand awareness & reach</td>
                      <td className="py-3.5 px-4 text-zinc-800">Replaces high-bounce static landing pages with engaging 3D environments.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">Google Search Campaigns</td>
                      <td className="py-3.5 px-4 text-zinc-600">High-intent commercial discovery</td>
                      <td className="py-3.5 px-4 text-zinc-800">Directs buyers straight into a photorealistic catalog with dynamic quoting tools.</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3.5 px-4 font-bold text-zinc-900">Direct Sales Outreach</td>
                      <td className="py-3.5 px-4 text-zinc-600">B2B relationship sales</td>
                      <td className="py-3.5 px-4 text-zinc-800">Arms sales reps with interactive visual tools for live video calls.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* ── ENTRY 04: Hard Numbers & Data Benchmarks ── */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                04
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                The Hard Numbers: What the Data Shows
              </h3>
              <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-6">
                Across commercial deployments, giving buyers direct visual control shifts sales behavior dramatically:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-3xl font-extrabold text-[#2563EB] mb-1">&gt; 3.5 Min</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Dwell Time Jumps</h4>
                  <p className="text-xs text-zinc-600">Dwell time increases from 42s on static catalogs to 3 min 48s inside 3D showrooms.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-3xl font-extrabold text-[#2563EB] mb-1">+ 34%</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Quote Conversion</h4>
                  <p className="text-xs text-zinc-600">Buyers interacting with 3D customizers submit 34% more Request for Quotes.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-3xl font-extrabold text-[#2563EB] mb-1">- 40%</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Spec Errors Drop</h4>
                  <p className="text-xs text-zinc-600">Visual verification of textures and dimensions eliminates costly order disputes.</p>
                </div>
                <div className="p-5 rounded-xl bg-zinc-50 border border-zinc-200">
                  <div className="text-3xl font-extrabold text-[#2563EB] mb-1">20% - 40%</div>
                  <h4 className="text-sm font-bold text-zinc-900 mb-1">Higher Order Value</h4>
                  <p className="text-xs text-zinc-600">Visual modular experimentation naturally drives higher-tier package configurations.</p>
                </div>
              </div>
            </article>

            {/* ── ENTRY 05: The Engineering Stack ── */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div>
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  05
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Engineering Stack: WebGL & UE5
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  Speed is everything. At Elipse Studio, we divide technology across two distinct capabilities:
                </p>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-blue-50 border border-blue-100">
                    <h4 className="font-bold text-zinc-900 text-sm mb-1">
                      1. Browser-Native{' '}
                      <Link href="/services/3d-product-configurators" className="text-[#2563EB] underline hover:text-blue-800">
                        3D Interactive Configurator
                      </Link>
                    </h4>
                    <p className="text-xs text-zinc-700">Lightweight WebGL/PlayCanvas scene loading under 2s on mobile Safari and Chrome with zero GPU streaming fees.</p>
                  </div>
                  <div className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800">
                    <h4 className="font-bold text-white text-sm mb-1">2. Unreal Engine 5 Real-Time Rendering</h4>
                    <p className="text-xs text-zinc-300">Ultra-photorealistic global illumination for luxury automotive, high-stakes real estate walkthroughs and private investor pitches.</p>
                  </div>
                </div>
              </div>
              <div>
                <Frame
                  src={steeringImg}
                  cap="Optimized 3D configurator stack running natively in browser."
                  alt="3D Configurator Engineering Stack"
                />
              </div>
            </article>

            {/* ── ENTRY 06: Payback Math & ROI ── */}
            <article className="py-12 sm:py-14 border-b border-zinc-200">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                06
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                The Payback Math: A Realistic B2B Example
              </h3>
              <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-6">
                Consider an architectural lighting or commercial furniture manufacturer doing <strong>$8,000,000 in annual revenue</strong> with an average wholesale order value of <strong>$25,000</strong>:
              </p>

              <div className="overflow-x-auto rounded-xl border border-zinc-200 shadow-sm bg-white mb-6">
                <table className="w-full text-left text-xs sm:text-sm text-zinc-800">
                  <thead className="bg-zinc-100 text-zinc-900 font-semibold text-[11px] uppercase tracking-wider border-b border-zinc-200">
                    <tr>
                      <th className="py-3.5 px-4">Metric</th>
                      <th className="py-3.5 px-4">Baseline (Static Catalogs)</th>
                      <th className="py-3.5 px-4 text-[#2563EB]">With Virtual Showroom</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200">
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-medium">Annual Inbound Inquiries</td>
                      <td className="py-3 px-4">1,200 leads</td>
                      <td className="py-3 px-4 font-semibold">1,200 leads</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-medium">Quote Close Rate</td>
                      <td className="py-3 px-4">8.0% (96 orders)</td>
                      <td className="py-3 px-4 font-bold text-[#2563EB]">9.5% (+1.5% lift)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-medium">Closed Orders per Year</td>
                      <td className="py-3 px-4">96 accounts</td>
                      <td className="py-3 px-4 font-bold">114 accounts (+18 closed orders)</td>
                    </tr>
                    <tr className="hover:bg-zinc-50">
                      <td className="py-3 px-4 font-medium">Gross Revenue</td>
                      <td className="py-3 px-4">$2,400,000</td>
                      <td className="py-3 px-4 font-bold text-emerald-600">$2,850,000 (+$450,000 growth)</td>
                    </tr>
                    <tr className="bg-emerald-50/70 font-bold text-zinc-900">
                      <td className="py-3.5 px-4">Payback Period & ROI</td>
                      <td className="py-3.5 px-4 text-zinc-500">—</td>
                      <td className="py-3.5 px-4 text-emerald-700">Paid off in &lt; 90 days (&gt;10x Year 1 ROI)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>

            {/* ── ENTRY 07: The Final Verdict ── */}
            <article className="py-12 sm:py-14">
              <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                07
              </div>
              <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                The Final Verdict
              </h3>
              <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                Physical trade shows and showroom locations are not going away. Shaking hands in person will always be valuable. The mistake is treating a four-day trade show as an isolated event and hoping people remember your catalog weeks later.
              </p>
              <p className="text-zinc-900 font-semibold text-lg sm:text-xl max-w-[66ch]">
                Stop looking at 3D digital spaces as a way to trim your budget. Build your virtual showroom as the central engine of your annual marketing plan.
              </p>
            </article>
          </div>
        </section>

        {/* ══════ BOTTOM CONVERSION CTA CARD ══════ */}
        <section className="mt-16 pt-10 pb-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto bg-gradient-to-b from-zinc-50 to-white border border-zinc-200/90 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
            <span className="inline-block px-3.5 py-1 bg-blue-50 border border-blue-100/80 text-[#2563EB] text-xs font-bold uppercase tracking-wider rounded-full mb-4">
              Commercial Assessment
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-tight mb-4">
              Ready to Evaluate a Virtual Showroom for Your Catalog?
            </h2>
            
            <p className="text-zinc-600 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Let our engineering team assess your CAD models and calculate the commercial payback for an interactive 3D build.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="w-full sm:w-auto px-5 sm:px-8 py-3.5 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <span>Book a 15-Minute Scoping Call</span>
                <FiArrowRight className="text-base shrink-0" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default VirtualShowroomsRoiArticle;
