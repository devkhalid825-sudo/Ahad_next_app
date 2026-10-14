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

import _heroImg from '../../assets/ElipseImages/blogs/quest.3.webp';
import _vr1Img from '../../assets/ElipseImages/projects/VR1.webp';
import _vr2Img from '../../assets/ElipseImages/projects/VR2.webp';
import _vr5Img from '../../assets/ElipseImages/projects/VR5.webp';
import _eLearningImg from '../../assets/ElipseImages/personal/e-learning.webp';

const heroImg = getImgSrc(_heroImg);
const vr1Img = getImgSrc(_vr1Img);
const vr2Img = getImgSrc(_vr2Img);
const vr5Img = getImgSrc(_vr5Img);
const eLearningImg = getImgSrc(_eLearningImg);

const Frame = ({ src, cap, alt }) => (
  <div className="flex flex-col gap-3 w-full my-4 sm:my-6">
    <figure className="relative aspect-video overflow-hidden rounded-xl bg-zinc-900 border border-zinc-200/80 shadow-md group">
      <img
        alt={alt || cap || 'Enterprise VR Training Visualization'}
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

const RealCostBadVrTrainingArticle = () => {
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
    'VR TRAINING PLATFORM',
    '✦',
    'ENTERPRISE VR TRAINING',
    '✦',
    'LEARNING DESIGN',
    '✦',
    'SCENARIO-BASED LEARNING',
    '✦',
    'VR SALES TRAINING',
    '✦',
    'L&D ROI',
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
              <span>VR Training Platform</span>
              <span>·</span>
              <span>7 min read</span>
            </div>

            {/* Main Center Headline */}
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-[52px] font-bold tracking-tight text-neutral-900 max-w-4xl leading-tight mb-4 sm:mb-8 px-2 sm:px-4">
              The Real Cost of a Bad VR Training Experience{' '}
              <span className="text-[#2563EB]">(And How to Avoid It)</span>
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
                  Bad VR training doesn&apos;t just waste budget — it wastes the goodwill of your trainees. Here is what separates VR training that works from expensive tech demos nobody uses.
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
                    Book Scoping Call ↗
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
                    alt="Enterprise VR Training Headset Experience"
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
                  VR Training
                </div>
                <p className="text-xs sm:text-sm text-neutral-500 uppercase tracking-wider font-medium">
                  Learning Design & ROI
                </p>
                <div className="mt-3 bg-blue-50 border border-blue-100 p-4 rounded-2xl text-center md:text-left w-full">
                  <p className="text-[11px] sm:text-xs text-zinc-700 font-serif italic leading-snug">
                    &ldquo;Great learning design in a simple VR environment outperforms poor learning design in a technically impressive one every time.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#2563EB] mt-1.5">— Elipse Studio VR Training Team</p>
                </div>
              </div>
            </div>

            {/* Bottom Dark Pill Bar */}
            <div className="mt-12 sm:mt-16 hidden sm:flex flex-row items-center gap-4 bg-neutral-900 text-white px-6 py-3 rounded-full shadow-xl">
              <Link
                href="/contact"
                className="text-xs sm:text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Book a VR Training Consultation ↗
              </Link>
              <span className="hidden sm:block h-4 w-px bg-neutral-700" />
              <span className="text-xs sm:text-sm font-medium text-neutral-300">By Elipse Studio · Enterprise VR Platform</span>
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
              <span className="font-serif italic text-[#2563EB] text-base">Enterprise Learning Design & VR ROI</span>
              <span className="font-serif italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · 2026</span>
            </div>

            {/* Intro Header */}
            <div className="py-8 border-b border-zinc-200 max-w-3xl">
              <p className="text-lg sm:text-xl text-zinc-800 leading-relaxed font-serif italic mb-4">
                There&apos;s a version of VR training that everyone who has worked in L&D has seen at least once.
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base mb-4">
                The company invests in headsets. There&apos;s a launch event. Leadership is excited. The trainees try it on, nod politely, and go back to their desks. <strong>Three months later, the headsets are in a cupboard.</strong>
              </p>
              <p className="text-zinc-700 font-sans leading-relaxed text-sm sm:text-base">
                This isn&apos;t a technology failure. It&apos;s a design failure. In this article, we outline what actually makes VR training work.
              </p>
            </div>

            {/* Entry 01 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  01
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  First, What Does &lsquo;Bad VR Training&rsquo; Actually Cost?
                </h3>
                <p className="text-zinc-700 font-sans leading-relaxed max-w-[66ch] mb-4">
                  When calculating ROI of a failed VR program, most focus on hardware and licenses. But the hidden organizational costs are often far larger:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 max-w-[66ch]">
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span><strong>Trainer time lost:</strong> Hosting sessions with broken or confusing modules.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span><strong>Learner cynicism:</strong> Scepticism towards future digital L&D initiatives.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                    <span><strong>Compliance & safety risk:</strong> Unabsorbed safety protocols cause liability.</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-2">
                <Frame src={vr1Img} cap="Immersive VR training simulations require strategic instructional design to avoid low adoption." />
              </div>
            </article>

            {/* Entry 02 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  02
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The Four Reasons VR Training Fails
                </h3>
                <div className="space-y-3 text-xs sm:text-sm text-zinc-700 max-w-[66ch]">
                  <p><strong>1. Built as Tech Demo:</strong> Showcasing graphics rather than answering what the learner needs to do differently.</p>
                  <p><strong>2. Passive Interaction:</strong> Treating VR like a 360° video rather than a decision-making environment.</p>
                  <p><strong>3. Unvalidated Scenarios:</strong> Scripted by L&D without feedback from frontline workers.</p>
                  <p><strong>4. Hardware Friction:</strong> Complex 45-minute IT setup that kills daily adoption.</p>
                </div>
              </div>
              <div className="md:order-1">
                <Frame src={vr2Img} cap="Branching interaction pathways allow trainees to experience real consequences in virtual space." />
              </div>
            </article>

            {/* Entry 03 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-1">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  03
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  What Good VR Training Looks Like
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-zinc-700 max-w-[66ch] mb-4">
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#2563EB] shrink-0 text-base mt-0.5" />
                    <span><strong>Scenario-based:</strong> Real workplace decision points over passive content.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#2563EB] shrink-0 text-base mt-0.5" />
                    <span><strong>Branching consequences:</strong> Immediate visual feedback for incorrect choices.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#2563EB] shrink-0 text-base mt-0.5" />
                    <span><strong>LMS integration:</strong> Automatic reporting of completion and score data.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <FiCheckCircle className="text-[#2563EB] shrink-0 text-base mt-0.5" />
                    <span><strong>Optimal duration:</strong> Focused 8 to 15 minute sessions prevent physical fatigue.</span>
                  </li>
                </ul>
              </div>
              <div className="md:order-2">
                <Frame src={vr5Img} cap="Custom enterprise VR modules integrated directly into corporate Learning Management Systems." />
              </div>
            </article>

            {/* Entry 04 */}
            <article className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 py-12 sm:py-14 border-b border-zinc-200 items-center">
              <div className="md:order-2">
                <div className="font-serif font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(23,30,66,0.35)] select-none mb-4">
                  04
                </div>
                <h3 className="font-serif font-medium text-2xl sm:text-3xl text-zinc-900 max-w-[22ch] leading-tight mb-4">
                  The One Question to Ask Any VR Provider
                </h3>
                <div className="p-4 rounded-xl bg-zinc-900 text-white mb-4 max-w-[66ch]">
                  <p className="font-serif italic text-sm sm:text-base text-blue-300">
                    &ldquo;Can you show me the learning objectives this module was designed to achieve, and how you measured whether it achieved them?&rdquo;
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-[66ch]">
                  If the answer is vague, you&apos;re buying a tech demo. A good provider will have pre- and post-assessments and scenario validation records.
                </p>
              </div>
              <div className="md:order-1">
                <Frame src={eLearningImg} cap="Interactive corporate e-learning and VR training scenario validation." />
              </div>
            </article>

          </div>
        </section>

        {/* ══════ CTA BOX SECTION (CLEAN LIGHT THEME) ══════ */}
        <section className="mt-16 pt-10 pb-6 border-t border-zinc-200">
          <div className="max-w-4xl mx-auto rounded-[2rem] bg-zinc-50/80 border border-zinc-200/90 p-8 sm:p-12 text-center shadow-sm">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold uppercase tracking-wider rounded-full mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
              Enterprise Consultation
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-normal tracking-tight text-zinc-900 leading-tight mb-4">
              Building a VR Training Programme?
            </h2>
            
            <p className="text-zinc-600 font-sans leading-relaxed text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Talk to our learning design team before you commit to a brief. We&apos;ll help you design for outcomes, not just immersion.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#2563EB] hover:bg-blue-700 active:scale-95 text-white font-sans font-semibold text-xs sm:text-sm md:text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer w-full sm:w-auto text-center"
              >
                <span className="leading-tight">Book a VR Training Consultation</span>
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
              question="Which VR headset hardware is best for enterprise training?"
              answer="Standalone headsets like Meta Quest 3 or Pico 4 Enterprise are usually ideal for corporate L&D due to low friction setup, high display resolution, and zero cables."
            />
            <FAQItem
              question="Can VR training connect directly with SCORM or xAPI LMS platforms?"
              answer="Yes, Elipse Studio VR training modules export xAPI (Tin Can) statements to track completion, score performance, and record user decision trees inside your existing LMS."
            />
            <FAQItem
              question="What is the average development timeline for a custom VR training module?"
              answer="A standard 10-15 minute interactive VR training scenario typically takes 6 to 10 weeks from instructional design script to final LMS build."
            />
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default RealCostBadVrTrainingArticle;
