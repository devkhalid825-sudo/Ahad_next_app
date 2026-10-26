'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';
import { getImgSrc } from '../../utils/api';

import _kiaImg from '../../assets/About-page/kia.webp';
import _spatialCommerceImg from '../../assets/About-page/spatial-commerce.png';
import _villaImg from '../../assets/About-page/Nevegan.jpg';
import _industrialImg from '../../assets/About-page/inverx.webp';
import _seatImg from '../../assets/About-page/seat.webp';
import _highTicketImg from '../../assets/About-page/high-ticket.png';
import _luxararyImg from '../../assets/About-page/luxarary.png';

const kiaImg = getImgSrc(_kiaImg);
const spatialCommerceImg = getImgSrc(_spatialCommerceImg);
const villaImg = getImgSrc(_villaImg);
const industrialImg = getImgSrc(_industrialImg);
const seatImg = getImgSrc(_seatImg);
const highTicketImg = getImgSrc(_highTicketImg);
const luxararyImg = getImgSrc(_luxararyImg);

const Frame = ({ src, cap }) => (
  <figure className="relative aspect-video overflow-hidden rounded-md bg-zinc-900">
    <img alt={cap} src={src} loading="lazy" decoding="async" className="w-full h-full object-cover" />
  </figure>
);

const SpatialCommerceBenchmarkArticle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleScrollToJournal = () => {
    const journalEl = document.getElementById('journal');
    if (journalEl) {
      journalEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [
    'SPATIAL COMMERCE',
    '✦',
    '3D CONFIGURATORS',
    '✦',
    '38% RETURN REDUCTION',
    '✦',
    'AUTOMOTIVE',
    '✦',
    'LUXURY REAL ESTATE',
    '✦',
    'INDUSTRIAL B2B',
    '✦',
    '2.8X CONVERSIONS',
    '✦',
  ];

  return (
    <div data-nav="light" className="hardcoded-article w-full min-h-screen overflow-x-hidden bg-white text-zinc-900 selection:bg-[#2563EB]/30 selection:text-white">
      <Header hideThemeToggle={true} />

      <main className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pt-14 sm:pt-16 md:pt-20 pb-12 sm:pb-20">

        {/* ══════ HERO SECTION (3-COLUMN EXACT LEAP FORMAT) ══════ */}
        <section className="relative bg-white text-neutral-900 pt-0 pb-6 sm:pb-8 md:pt-1 md:pb-12 overflow-hidden mb-4 sm:mb-8 md:mb-12">

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

            {/* ── Main Center Headline ── */}
            <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[54px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-snug sm:leading-tight mb-6 sm:mb-8 md:mb-12 px-3 sm:px-4">
              Spatial Commerce for High-Ticket B2B & Luxury Retail:{' '}
              <span className="text-[#2563EB]">The 2026 Conversion & Return-Rate</span>{' '}
              Benchmark Report
            </h1>

            {/* ── Content Grid: On mobile (1: Image, 2: Body & Button, 3: Stats); on desktop 3 columns ── */}
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-8 items-center relative">

              {/* Center Column on Mobile (order-1), Middle on Desktop (order-2) */}
              <div className="order-1 md:order-2 relative flex justify-center px-4 sm:px-0 my-2 sm:my-0">
                {/* Circular background shape (hidden on mobile for clean look) */}
                <div className="hidden sm:flex absolute w-[30rem] h-[30rem] lg:w-[36rem] lg:h-[36rem] bg-neutral-100 rounded-full -z-10 border border-neutral-200 items-center justify-center">
                  <span className="absolute bottom-4 sm:bottom-6 text-neutral-400 text-xl sm:text-2xl select-none">⚡</span>
                </div>

                {/* Hero photo (prominent and increased on mobile) */}
                <div className="relative w-72 h-[22rem] sm:w-[26rem] sm:h-[32rem] lg:w-[30rem] lg:h-[36rem] rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-zinc-900 group z-10">
                  <img
                    src={spatialCommerceImg}
                    alt="Spatial Commerce 2026 Benchmark Report"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Left Column on Desktop (order-1), Below Image on Mobile (order-2) */}
              <div className="order-2 md:order-1 block text-left space-y-3 sm:space-y-4 md:pr-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-6 md:mt-0">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-[#2563EB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <p className="text-neutral-600 text-xs sm:text-sm md:text-base leading-relaxed">
                  Industrial equipment returns average $47,000 per incident. This report compiles operational benchmark data from Elipse Studio deployments across automotive, luxury real estate, and capital equipment.
                </p>
                <button
                  onClick={handleScrollToJournal}
                  className="w-full sm:w-auto px-5 py-2.5 sm:px-5 sm:py-2.5 rounded-full border border-neutral-300 text-xs sm:text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900 transition-all shadow-sm cursor-pointer text-center"
                >
                  Explore Benchmark Data
                </button>
              </div>

              {/* Right Column: Stars + Stats (order-3 on mobile and desktop) */}
              <div className="order-3 md:order-3 flex text-center md:text-left flex-col items-center md:items-start justify-center space-y-2 md:pl-4 px-4 sm:px-0 max-w-md mx-auto md:mx-0 mt-6 md:mt-0">
                <div className="flex gap-0.5 text-[#2563EB] justify-center text-base sm:text-lg">
                  {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 leading-none">
                  $47,000
                </div>
                <p className="text-[11px] sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Avg Cost Per Industrial Return
                </p>
                <div className="mt-2 sm:mt-3 bg-blue-50 border border-blue-100 p-3 sm:p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-medium leading-snug">
                    &ldquo;Spatial commerce attacks the decision-information gap directly. When the buyer builds it, post-delivery disputes drop by 38%.&rdquo;
                  </p>
                  <p className="text-[10px] sm:text-[11px] font-bold text-[#2563EB] mt-1">— Elipse Studio Benchmark</p>
                </div>
              </div>

            </div>

            {/* ── Bottom Dark Pill Bar ── */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a 15-min strategy call ↗
              </a>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio | October 2026</span>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <a
                href="#journal"
                className="text-xs sm:text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
              >
                Read Full Report ↓
              </a>
            </div>

          </div>
        </section>

        {/* ══════ DARK MARQUEE TICKER ══════ */}
        <section className="my-6 sm:my-10 md:my-14 overflow-hidden border-y border-zinc-200 py-3 sm:py-5 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
          <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white">
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
            ))}
          </div>
        </section>

        {/* ══════ INTRO: A DISPATCH FROM THE BENCHMARK ══════ */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[0.9fr_1.1fr] gap-6 sm:gap-10 items-start">
            <div className="md:pt-4">
              <div className="italic text-[#2563EB] text-sm sm:text-base mb-3 font-serif">
                Executive Briefing · The Decision-Information Gap
              </div>
              <p className="text-lg sm:text-xl md:text-2xl leading-snug text-zinc-800 max-w-[38ch] font-sans">
                High-ticket buyers don’t return products because they’re impulsive. They return because photography created a gap between representation and reality.
              </p>
              <a
                href="#journal"
                className="mt-5 inline-flex items-center gap-2 font-serif italic text-sm sm:text-base border-b border-zinc-900 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
              >
                Read the vertical benchmark findings below ↓
              </a>
            </div>
            <div className="bg-zinc-50 border border-zinc-200 p-3 sm:p-5 rotate-[0.6deg] relative">
              <div className="relative">
                <div className="aspect-video overflow-hidden bg-zinc-900 rounded-md w-full">
                  <img
                    src={highTicketImg}
                    alt="High-Ticket B2B & Luxury Retail 3D Configurator"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-xs text-zinc-600 mt-2 font-sans font-medium">High-Ticket B2B & Luxury Retail 3D Configurator · 2026 Benchmark</p>
              </div>
            </div>
          </div>
        </section>

        <section id="journal" className="py-6 sm:py-8 md:py-12 border-t border-zinc-200">
              <div className="max-w-none space-y-0">
                <div className="flex items-baseline justify-between border-b border-zinc-200 pb-4 mb-1">
                  <span className="font-serif italic text-[#2563EB] text-sm sm:text-base">Key Benchmark Findings</span>
                  <span className="font-serif italic text-[11px] sm:text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · October 2026</span>
                </div>

                {/* ── Entry 01: Automotive ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-12 border-b border-zinc-200 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                      01
                    </div>
                    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                      Automotive 3D configurators lift conversions by 2.8×
                    </h3>
                    <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-[66ch]">
                      The{' '}
                      <Link
                        href="/services/3d-product-configurators"
                        className="text-[#2563EB] hover:text-[#1d4ed8] underline font-medium decoration-[#2563EB]/40 hover:decoration-[#2563EB] transition-colors"
                      >
                        Kia 3D configurator
                      </Link>{' '}
                      built and deployed by Elipse Studio provides real-time control over trim level, exterior colour, wheel design, and interior materials directly in web browsers. Buyers who engaged for over 90 seconds—specifically sequencing exterior colour followed by interior materials—converted at rates <strong className="text-zinc-900 font-semibold font-sans">2.8× higher</strong> than single-interaction sessions. Dealerships reported in-showroom closes shifted from objection-handling to simple confirmation, and returns on configured SKU accessories dropped to near zero.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={kiaImg} cap="Automotive: Kia 3D Configurator Deployment" />
                  </div>
                </article>

                {/* ── Entry 02: Luxury Real Estate ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-12 border-b border-zinc-200 items-center">
                  <div className="md:order-1">
                    <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                      02
                    </div>
                    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                      Off-plan virtual walkthroughs accelerate sales velocity by 34%
                    </h3>
                    <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-[66ch]">
                      Physical show homes cost £300,000–£800,000 to construct and show only one unit. Elipse Studio’s{' '}
                      <Link
                        href="/services/architectural-visualization"
                        className="text-[#2563EB] hover:text-[#1d4ed8] underline font-medium decoration-[#2563EB]/40 hover:decoration-[#2563EB] transition-colors"
                      >
                        virtual walkthrough deployments
                      </Link>{' '}
                      allow luxury buyers to navigate apartments before groundbreak, evaluate views by floor, and toggle finish packages. Benchmark results: off-plan units supported by interactive walkthroughs closed <strong className="text-zinc-900 font-semibold font-sans">34% faster</strong>, with a <strong className="text-zinc-900 font-semibold font-sans">41% higher premium upgrade attachment rate</strong> as buyers visualized Calacatta marble versus standard tile in real time.
                    </p>
                  </div>
                  <div className="md:order-2">
                    <Frame src={villaImg} cap="Luxury Residential: Off-Plan Interactive Walkthrough" />
                  </div>
                </article>

                {/* ── Entry 03: Industrial Equipment ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-12 border-b border-zinc-200 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                      03
                    </div>
                    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                      Industrial equipment configurators cut returns & disputes by 38%
                    </h3>
                    <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-[66ch]">
                      Capital equipment returns disrupt factory operations and impose massive freight penalties. Elipse Studio’s industrial configurators allow engineering and procurement teams to inspect unit sizes against human reference scale, verify connection points, and export pre-populated spec sheets. Headline benchmark: a <strong className="text-zinc-900 font-semibold font-sans">38% reduction in post-delivery returns and specification disputes</strong> within 12 months, with payback achieved in under 3 months.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={industrialImg} cap="Industrial Capital Equipment: 3D Configurator with True Scale" />
                  </div>
                </article>

                {/* ── Entry 04: Psychology of Commitment ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-12 border-b border-zinc-200 items-center">
                  <div className="md:order-1">
                    <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                      04
                    </div>
                    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                      The psychology of configured commitment: Why spatial interaction works
                    </h3>
                    <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-[66ch]">
                      The mechanism driving these outcomes is the <strong className="text-zinc-900 font-semibold font-sans">Endowment Effect</strong>, documented in behavioural economics since Richard Thaler’s foundational work. When a buyer customizes a product—selecting finishes, materials, and modules—they develop psychological ownership before checkout. Post-purchase cognitive dissonance is eliminated: the buyer knows exactly what they built, closing the decision-information gap that photography creates.
                    </p>
                  </div>
                  <div className="md:order-2">
                    <Frame src={seatImg} cap="Material & Specification Customization Interface" />
                  </div>
                </article>

                {/* ── Entry 05: ROI & Payback ── */}
                <article className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-10 py-6 sm:py-8 md:py-12 items-center">
                  <div className="md:order-2">
                    <div className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-3">
                      05
                    </div>
                    <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-3">
                      Under 4 months payback: The CFO math of returns elimination
                    </h3>
                    <p className="text-zinc-700 font-sans text-xs sm:text-sm md:text-base leading-relaxed max-w-[66ch]">
                      A luxury brand selling 200 high-ticket units monthly ($8,500 AOV) with a 12% return rate spends $57,600/month on reverse logistics and restocking. A 31% return reduction saves $17,760 monthly—or <strong className="text-zinc-900 font-semibold font-sans">$213,120 annually</strong>. A mid-complexity 3D configurator ($30,000–$80,000) achieves full payback in under 4 months through return savings alone, before counting conversion uplift.
                    </p>
                  </div>
                  <div className="md:order-1">
                    <Frame src={luxararyImg} cap="Luxury Retail & High-Ticket B2B: Real-Time 3D Product Visualizer" />
                  </div>
                </article>
              </div>
            </section>

            {/* ══════ CLOSING REFLECTIONS ══════ */}
            <section className="py-6 sm:py-10 md:py-14 mt-6 sm:mt-8 md:mt-12 border-t border-zinc-200">
              <div className="max-w-2xl mx-auto text-center">
                <div className="font-serif italic text-[#2563EB] mb-2 text-sm sm:text-base">
                  Closing reflections
                </div>
                <h3 className="font-serif font-medium text-xl sm:text-2xl md:text-3xl text-zinc-900 leading-tight mb-6">
                  The 2026 Window is Open: Why Waiting Costs More Than Deploying
                </h3>
              </div>
              <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-zinc-700 font-serif leading-relaxed">
                  Despite the data—and it is not ambiguous data—spatial commerce adoption among high-ticket B2B and luxury retail brands remains uneven. Most enterprise buyers have heard of configurators; far fewer have deployed one at production quality.
                </p>
                <p className="font-serif italic text-lg text-zinc-900 leading-relaxed">
                  You cannot fix a decision-information crisis with flatter photography.
                </p>
                <p className="text-zinc-700 font-serif leading-relaxed">
                  Every enterprise buyer who configures their equipment or finishes in an interactive 3D session and then visits a competitor’s static page has an immediate frame of reference. You set the standard for what &ldquo;good&rdquo; looks like in the category.
                </p>
                <p className="text-zinc-700 font-serif leading-relaxed">
                  The 2026 window is still open. It won’t be for much longer.
                </p>
              </div>
              <div className="max-w-2xl mx-auto text-center mt-8">
                <div className="font-serif italic text-2xl text-[#2563EB]">
                  Elipse Studio
                </div>
              </div>
            </section>

      </main>

      <Footer />
    </div>
  );
};

export default SpatialCommerceBenchmarkArticle;
