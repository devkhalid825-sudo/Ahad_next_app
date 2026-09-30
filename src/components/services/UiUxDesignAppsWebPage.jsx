'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import UiUxHeader from '../layouts/UiUxHeader';
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';
import ClientReviews from '../features/ClientReviews';
import { getImgSrc } from '../../utils/api';

// Project images — web-app-ui
import firstWebImgRaw from '../../assets/web-app-ui/first-web.webp';
import secondWebImgRaw from '../../assets/web-app-ui/second-web.webp';
import thirdWebImgRaw from '../../assets/web-app-ui/third-web.webp';
import firstAppImgRaw from '../../assets/web-app-ui/first-app.webp';
import secondAppImgRaw from '../../assets/web-app-ui/second-app.webp';
import thirdAppImgRaw from '../../assets/web-app-ui/third-app.webp';
import fourthAppImgRaw from '../../assets/web-app-ui/fourth-app.webp';
import fiveAppImgRaw from '../../assets/web-app-ui/five-app.webp';
import sevenAppImgRaw from '../../assets/web-app-ui/seven-app.webp';
import nineAppImgRaw from '../../assets/web-app-ui/nine-app.webp';
import figmaOneImgRaw from '../../assets/web-app-ui/f-1.webp';
import figmaTwoImgRaw from '../../assets/web-app-ui/f-2.webp';
import figmaThreeImgRaw from '../../assets/web-app-ui/f-3.webp';

const firstWebImg = getImgSrc(firstWebImgRaw);
const secondWebImg = getImgSrc(secondWebImgRaw);
const thirdWebImg = getImgSrc(thirdWebImgRaw);
const firstAppImg = getImgSrc(firstAppImgRaw);
const secondAppImg = getImgSrc(secondAppImgRaw);
const thirdAppImg = getImgSrc(thirdAppImgRaw);
const fourthAppImg = getImgSrc(fourthAppImgRaw);
const fiveAppImg = getImgSrc(fiveAppImgRaw);
const sevenAppImg = getImgSrc(sevenAppImgRaw);
const nineAppImg = getImgSrc(nineAppImgRaw);
const figmaOneImg = getImgSrc(figmaOneImgRaw);
const figmaTwoImg = getImgSrc(figmaTwoImgRaw);
const figmaThreeImg = getImgSrc(figmaThreeImgRaw);

// Selected UI/UX & Product Design Portfolio Builds (replace titles/tools/links with real projects)
const UIUX_BUILDS = [
  {
    title: 'Bean Trailer — UI/UX Prototype',
    category: 'Interactive Prototyping',
    desc: 'Clickable high-fidelity prototype simulating the real product flow, tested with users early so costly build mistakes never happen.',
    image: figmaThreeImg,
    tools: 'Figma Prototyping · User Testing',
    siteLink: 'https://www.figma.com/proto/Ygv1JHMqUCzuo9t5jYuWo1/Bean-Trailer?node-id=1745-173',
    siteLabel: 'Figma',
  },
  {
    title: 'Qist Market',
    category: 'E-Commerce Platform',
    desc: 'E-commerce platform for installment-based shopping and financial flexibility.',
    image: firstWebImg,
    tools: 'E-Commerce Platform · Web Development',
    siteLink: 'https://www.qistmarket.pk/',
  },
  {
    title: 'Volvo Cars',
    category: 'Automotive Web Platform',
    desc: 'Global automotive platform delivering a seamless digital experience for Volvo users.',
    image: secondWebImg,
    tools: 'Automotive Web Platform · Digital Experience',
    siteLink: 'https://www.volvocars.com/intl/',
  },
  {
    title: 'Housing Society',
    category: 'Urban Management Platform',
    desc: 'Smart urban planning and residential management platform.',
    image: thirdWebImg,
    tools: 'Urban Management · Web Application',
    siteLink: 'https://legacy.elipsestudio.com/City_app/',
  },
  {
    title: 'Live Wallpaper Engine Pro',
    category: 'Desktop App',
    desc: 'macOS app for dynamic live wallpapers — polished interface, smooth preview experience, and effortless wallpaper management.',
    image: firstAppImg,
    tools: 'macOS App · Interface Design',
    siteLink: 'https://apps.apple.com/pk/app/live-wallpaper-engine-pro/id780060759?mt=12',
    siteLabel: 'App Store',
  },
  {
    title: 'iBizzi',
    category: 'Mobile App',
    desc: 'iOS app for iBizzi — clean, intuitive interface design focused on a smooth and friction-free user experience.',
    image: secondAppImg,
    tools: 'iOS App · Interface Design',
    siteLink: 'https://apps.apple.com/us/app/ibizi/id1659590288',
    siteLabel: 'App Store',
  },
  {
    title: 'MaxSave',
    category: 'Mobile App',
    desc: 'iOS app for MaxSave — clean, intuitive interface design focused on a smooth and friction-free user experience.',
    image: thirdAppImg,
    tools: 'iOS App · Interface Design',
    siteLink: 'https://apps.apple.com/us/app/maxsave/id6720754965',
    siteLabel: 'App Store',
  },
  {
    title: 'Despelote',
    category: 'Desktop App',
    desc: 'macOS app for Despelote — polished, intuitive interface design focused on a smooth user experience.',
    image: fourthAppImg,
    tools: 'macOS App · Interface Design',
    siteLink: 'https://apps.apple.com/pk/app/despelote/id6747992743?mt=12',
    siteLabel: 'App Store',
  },
  {
    title: 'HotelTonight',
    category: 'Hotel Booking App',
    desc: 'Hotel booking app — clean, intuitive interface design focused on a smooth and effortless booking experience.',
    image: fiveAppImg,
    tools: 'Hotel Booking App · Interface Design',
    siteLink: 'https://apps.apple.com/us/app/hoteltonight-hotel-booking/id407690035',
    siteLabel: 'App Store',
  },
  {
    title: 'iPhone App Grouping',
    category: 'iOS Apps',
    desc: 'Collection of iOS apps — consistent interface design system applied across the product family for a smooth user experience.',
    image: sevenAppImg,
    tools: 'iOS Apps · Design System',
    siteLink: 'https://apps.apple.com/us/iphone/grouping/26451',
    siteLabel: 'App Store',
  },
  {
    title: 'Proptech Connect',
    category: 'PropTech App',
    desc: 'PropTech mobile app — clean, intuitive interface design focused on a smooth and friction-free user experience.',
    image: nineAppImg,
    tools: 'PropTech App · Interface Design',
    siteLink: 'https://apps.apple.com/us/app/proptech-connect/id6451210755',
    siteLabel: 'App Store',
  },
  {
    title: 'Number 9 — Website Design',
    category: 'Website Design',
    desc: 'Scalable design system built in Figma: color, type, and spacing tokens with a living component library that keeps the whole product consistent.',
    image: figmaOneImg,
    tools: 'Design Tokens · Component Library',
    siteLink: 'https://www.figma.com/design/qomJxk8cPgL7SsszKeQeCQ/Number_9_New_Design?node-id=0-1&p=f&t=Q53ztwH7S2KYqiPP-0',
    siteLabel: 'Figma',
  },
  {
    title: 'SaaS Platform UI — Figma Screens',
    category: 'High-Fidelity UI',
    desc: 'Pixel-perfect Figma screens for a SaaS platform — dense workflows simplified into clear, brand-true interfaces ready for development.',
    image: figmaTwoImg,
    tools: 'Figma · High-Fidelity UI',
    links: [
      { label: 'Figma', href: 'https://www.figma.com/design/UBsp8fmwchjwMgNwceuh4P/ILAAN?node-id=221-34&p=f&t=SaOWoZbXlChBm4zA-0' },
      { label: 'Website', href: 'https://www.ilaan.io/', secondary: true },
    ],
  },
];

// Capabilities Grid
const CAPABILITIES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    title: 'User Research & Product Strategy',
    desc: 'Interviews, analytics reviews, and competitor analysis that turn assumptions into evidence — before any wireframe is drawn.',
    features: [
      'User interviews, surveys & analytics synthesis',
      'Personas, journey maps & Jobs-to-be-Done framing',
      'Quantified success metrics tied to real business KPIs',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'UX Flows & Information Architecture',
    desc: 'Clear navigation, screens, and user flows across the whole product — so users complete tasks in fewer steps and without confusion.',
    features: [
      'User flows, wireframes & sitemaps',
      'Rapid task-flow simplification validated by testing',
      'Cross-device responsive UX architecture',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'High-Fidelity UI Design',
    desc: 'Pixel-perfect visual design that carries your brand — motion, spacing, typography, and color engineered for clarity and conversion.',
    features: [
      'Pixel-perfect web & mobile UI screens',
      'Brand-true visual language & iconography',
      'Motion design & micro-interaction specs',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Design Systems & Tokens',
    desc: 'Scalable component libraries, color/type/space tokens, and living documentation so development teams ship fast without design drift.',
    features: [
      'Component libraries & variant systems in Figma',
      'Global color, typography & spacing tokens',
      'Developer handoff specs & versioned documentation',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Interactive Prototypes',
    desc: 'Clickable, high-fidelity prototypes that simulate the real product — tested with users early, so costly build mistakes never happen.',
    features: [
      'Clickable Figma & Framer prototypes',
      'Early-flow validation before development',
      'Stakeholder demos that make decisions easy',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Usability Testing & Accessibility',
    desc: 'Evidence-driven iteration: moderated tests, heatmaps, and WCAG-compliant interfaces that include every user and measurably improve outcomes.',
    features: [
      'Moderated & unmoderated usability testing',
      'WCAG 2.1 AA compliance & audit fixes',
      'Analytics-informed iteration post-launch',
    ],
  },
];

/**
 * Auto-playing image slider for the showcase area
 */
const UIUX_SLIDES = [figmaThreeImg, firstWebImg, firstAppImg, figmaTwoImg, secondWebImg];

const ImageAutoSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % UIUX_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] bg-[#0E0E10]">
        {UIUX_SLIDES.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`UI/UX Design Showcase ${i + 1}`}
            className={`w-full h-full object-cover transition-opacity duration-700 ${i === current ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'}`}
            loading="lazy"
            width="1280"
            height="720"
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {UIUX_SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? 'bg-[#4169E1] w-6' : 'bg-white/40 w-2'}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Card type mapping for Website/App tabs
const CARD_TYPE = {
  'Qist Market': 'website',
  'Volvo Cars': 'website',
  'Housing Society': 'website',
  'Live Wallpaper Engine Pro': 'app',
  'iBizzi': 'app',
  'MaxSave': 'app',
  'Despelote': 'app',
  'HotelTonight': 'app',
  'iPhone App Grouping': 'app',
  'Proptech Connect': 'app',
  'Number 9 — Website Design': 'website',
  'SaaS Platform UI — Figma Screens': 'website',
  'Bean Trailer — UI/UX Prototype': 'app',
};

/**
 * 6-Card Static Grid for Capabilities (3 Top, 3 Bottom)
 */
const CapabilitiesGrid = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {CAPABILITIES.map((cap, i) => (
          <div
            key={i}
            className="p-7 sm:p-8 rounded-2xl bg-[#0D0F14] border border-white/10 hover:border-[#4169E1]/60 transition-all duration-300 flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.6)] min-h-[420px] group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/25 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(65,105,225,0.2)] scale-100 group-hover:scale-105 group-hover:border-[#4169E1]/50 transition-all duration-300">
                {cap.icon}
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight leading-snug">
                {cap.title}
              </h3>
              <p className="text-sm text-zinc-400 font-normal leading-relaxed mb-6">
                {cap.desc}
              </p>
            </div>

            <ul className="space-y-3 pt-5 border-t border-white/10">
              {cap.features.map((f, fi) => (
                <li key={fi} className="flex items-start gap-3 text-xs sm:text-[13px] text-zinc-300 font-normal leading-normal">
                  <span className="text-[#4169E1] font-bold text-sm shrink-0">✓</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const UiUxDesignAppsWebPage = () => {
  const router = useRouter();
  const [galleryTab, setGalleryTab] = useState('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredBuilds = galleryTab === 'all'
    ? UIUX_BUILDS
    : UIUX_BUILDS.filter((b) => (CARD_TYPE[b.title] || 'website') === galleryTab);

  const visibleBuilds = filteredBuilds.slice(0, visibleCount);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <UiUxHeader />

      {/* ======================================================== */}
      {/* 1. SHOWCASE REEL & WHY US COMPARISON GRID                */}
      {/* ======================================================== */}
      <section id="comparison" className="w-full px-4 sm:px-6 md:px-8 pt-[110px] sm:pt-[130px] pb-16 sm:pb-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Data-Driven Product Design</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2] text-white">
            From Research Backed Wireframes to<br />
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent whitespace-nowrap inline-block">
              Conversion-Focused UI/UX
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Experience how Elipse Studio turns user research, information architecture, and pixel-perfect interface design into web apps and mobile apps users love.
          </p>
        </div>

        {/* Auto-playing Image Slider */}
        <ImageAutoSlider />

        {/* Comparison Grid: Traditional Dev-Driven vs Elipse Studio */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-16">
          {/* Left: Traditional Dev-Driven Build */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-white/10">
            <h3 className="text-lg font-semibold text-zinc-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional Dev-Driven Build</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mb-5">
              Products built directly from requirements documents, with UI decisions made during development and no user validation before launch.
            </p>
            <ul className="space-y-3">
              {[
                'No user research — features guessed from stakeholder opinions',
                'Confusing flows discovered only after the product ships',
                'Inconsistent UI scraped together across different screens',
                'Guesswork redesigns and rework that triple the total cost',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Elipse Studio Edge */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-[#4169E1]/40 shadow-[0_10px_30px_rgba(65,105,225,0.1)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase font-mono bg-[#4169E1]/15 text-[#4169E1] mb-3">
              <span>⚡ The Elipse Studio Edge</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <span>Research-Backed UI/UX Design Pipeline</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-5">
              100% evidence-driven product design — research, flows, high-fidelity UI, and design systems validated with real users before a line of code is written.
            </p>
            <ul className="space-y-3">
              {[
                'Real user research: interviews, analytics & usability testing',
                'Clear flows validated before development starts',
                'Pixel-perfect UI rooted in your brand and design systems',
                'WCAG-compliant, conversion-optimized, and developer-ready handoff',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                  <span className="text-[#4169E1] font-bold shrink-0">✓</span>
                  <span><strong className="text-white font-medium">{text.split(';')[0]}</strong> {text.includes(';') ? `— ${text.split(';')[1]}` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SELECTED UI/UX BUILDS (MAIN SHOWCASE GALLERY)         */}
      {/* ======================================================== */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black"
        id="uiux-gallery"
      >
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Proven Product Design Track Record</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Selected UI/UX &amp; Product Design Portfolio
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 leading-relaxed font-light text-zinc-300">
            Explore app and web interfaces, design systems, and research-driven product experiences created by Elipse Studio for global brands.
          </p>
        </div>

        {/* Website / App filter tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
          {[
            { id: 'all', label: 'All Projects' },
            { id: 'website', label: 'Websites' },
            { id: 'app', label: 'Apps' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setGalleryTab(tab.id);
                setVisibleCount(6);
              }}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                galleryTab === tab.id
                  ? 'bg-[#4169E1] text-white shadow-lg shadow-[#4169E1]/30'
                  : 'bg-white/5 border border-white/15 text-zinc-300 hover:border-[#4169E1]/50 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-0">
          {visibleBuilds.map((item, idx) => (
            <div
              key={idx}
              className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(65,105,225,0.18)] flex flex-col justify-between bg-[#0E0E10] border-white/10 hover:border-[#4169E1]/60"
            >
              {/* Image Preview Container (16:9 HD Size) */}
              <div className="relative aspect-video overflow-hidden bg-black/40">
                <img
                  src={item.image}
                  alt={item.title}
                  width="1280"
                  height="720"
                  loading={idx < 3 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                  className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-700 will-change-transform"
                />
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-xl sm:text-2xl font-medium group-hover:text-[#4169E1] transition-colors duration-300 text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed font-light text-zinc-400">
                    {item.desc}
                  </p>
                </div>

                {/* Card Action Section & Buttons */}
                <div className="mt-6 pt-4 border-t border-white/10 flex flex-col gap-3.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#4169E1] font-semibold">{item.tools}</span>
                  </div>

                  <div className="flex items-center gap-2.5 flex-wrap">
                    {(() => {
                      const links = item.links && item.links.length
                        ? item.links
                        : item.siteLink
                          ? [{ label: item.siteLabel || 'Visit Site', href: item.siteLink }]
                          : item.behanceLink
                            ? [{ label: 'View Behance', href: item.behanceLink }]
                            : [];
                      return links.length ? links.map((lk, li) => (
                        <a
                          key={li}
                          href={lk.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={lk.secondary
                            ? "flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-transparent border border-white/20 hover:border-[#4169E1] text-white hover:text-[#4169E1] shadow-md hover:shadow-lg hover:shadow-[#4169E1]/20 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                            : "flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"}
                        >
                          <svg className="w-3.5 h-3.5 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 010 5.656l-2 2a4 4 0 01-5.656-5.656l1.121-1.121M10.172 13.828a4 4 0 010-5.656l2-2a4 4 0 015.656 5.656l-1.121 1.121" />
                          </svg>
                          <span>{lk.label}</span>
                        </a>
                      )) : null;
                    })()}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBuilds.length > 6 && (
          <div className="w-full flex justify-center mt-10 sm:mt-12">
            <button
              onClick={() => setVisibleCount(filteredBuilds.length > visibleCount ? filteredBuilds.length : 6)}
              className="flex items-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-lg shadow-[#4169E1]/25 hover:shadow-[#4169E1]/40 hover:scale-[1.03] transition-all duration-300 cursor-pointer"
            >
              <span>{filteredBuilds.length > visibleCount ? 'Load More' : 'Show Less'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v14m0-14l-6 6m6-6l6 6" />
              </svg>
            </button>
          </div>
        )}

        {/* 2 CTAs Directly Below Portfolio Gallery */}
        <div className="mt-14 sm:mt-16 flex flex-row flex-wrap items-center justify-center gap-3.5 sm:gap-4 w-full">
          <button
            onClick={() => router.push('/contact')}
            className="px-6 sm:px-8 py-3.5 bg-[#4169E1] hover:bg-[#3158D4] text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 shadow-lg shadow-[#4169E1]/25 hover:shadow-[#4169E1]/40 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            <span>Book a Free Consultation</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
          <button
            onClick={() => window.open('https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting', '_blank')}
            className="px-6 sm:px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white font-semibold text-xs sm:text-sm rounded-full transition-all duration-300 hover:scale-[1.03] cursor-pointer flex items-center gap-2"
          >
            <span>Schedule a 15-Min Technical Call</span>
            <svg className="w-4 h-4 text-[#4169E1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. CAPABILITIES (6-CARD STATIC GRID)                     */}
      {/* ======================================================== */}
      <section id="services" className="w-full py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="mb-12 text-center max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4169E1] mb-2">
            Comprehensive UI/UX Design Capabilities
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Built for Web Apps, Mobile Apps &amp; Enterprise Products
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300">
            From user research and information architecture to high-fidelity UI, design systems, and accessibility — the complete design arsenal for growing products.
          </p>
        </div>

        {/* 6-Card Static Grid (3 Top, 3 Bottom) */}
        <CapabilitiesGrid />
      </section>

      {/* ======================================================== */}
      {/* 4. PRODUCTION PIPELINE SECTION                           */}
      {/* ======================================================== */}
      <section id="pipeline" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Methodical Execution</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.1] text-white">
            Our UI/UX Design Pipeline
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            From evidence-based discovery to tested, developer-ready handoff, our phased process guarantees on-time product launch and measurable results.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Discover & Research',
              desc: 'Deep-dive into business goals, user interviews, analytics, and competitor analysis to define evidence-based success metrics.',
            },
            {
              step: '02',
              title: 'Structure & Wireframe',
              desc: 'Information architecture, user flows, and low-fidelity wireframes that map every task and remove friction before design begins.',
            },
            {
              step: '03',
              title: 'Design & Prototype',
              desc: 'High-fidelity UI, brand-true visuals, and clickable prototypes that simulate the real product on every device.',
            },
            {
              step: '04',
              title: 'Test & Handoff',
              desc: 'Usability testing, WCAG compliance, design system delivery, and developer-ready specs for a smooth build.',
            },
          ].map((pipe, i) => (
            <div
              key={i}
              className="p-6 sm:p-7 rounded-2xl bg-[#0E0E10] border border-white/10 hover:border-[#4169E1]/50 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <span className="text-3xl sm:text-4xl font-mono font-bold text-[#4169E1]/40 group-hover:text-[#4169E1] transition-colors duration-300">
                  {pipe.step}
                </span>
                <h3 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
                  {pipe.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
                  {pipe.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ======================================================== */}
      {/* 5. CLIENT REVIEWS & TESTIMONIALS                         */}
      {/* ======================================================== */}
      <div id="testimonials">
        <ClientReviews />
      </div>

      {/* ======================================================== */}
      {/* 6. CONTACT & SCOPE ESTIMATOR FORM                        */}
      {/* ======================================================== */}
      <div id="contact">
        <div id="scope-estimator">
          <Contact />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UiUxDesignAppsWebPage;