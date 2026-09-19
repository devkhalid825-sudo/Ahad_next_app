'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ArchVizHeader from '../layouts/ArchVizHeader';
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';
import ClientReviews from '../features/ClientReviews';
import { getImgSrc } from '../../utils/api';

import loveImgRaw from '../../assets/About-page/love.webp';
import zenithImgRaw from '../../assets/About-page/zenith.webp';
import khojImgRaw from '../../assets/About-page/khoj.webp';
import timBarthImgRaw from '../../assets/About-page/tim-barth.webp';
import penthouseImgRaw from '../../assets/About-page/penthouse.webp';
import villaImgRaw from '../../assets/About-page/modern-villas.webp';
import kumarImgRaw from '../../assets/About-page/kumar.webp';
import villasImgRaw from '../../assets/About-page/villas.webp';

const loveImg = getImgSrc(loveImgRaw);
const zenithImg = getImgSrc(zenithImgRaw);
const khojImg = getImgSrc(khojImgRaw);
const timBarthImg = getImgSrc(timBarthImgRaw);
const penthouseImg = getImgSrc(penthouseImgRaw);
const villaImg = getImgSrc(villaImgRaw);
const kumarImg = getImgSrc(kumarImgRaw);
const classicVillaImg = getImgSrc(villasImgRaw);

// Selected Real Estate & Archviz Portfolio Builds
const ARCHVIZ_BUILDS = [
  {
    title: 'Love Apartment | 3D Visualization & VR Experience',
    category: 'Luxury Residential',
    tags: ['VR', '3D Visualization'],
    desc: 'High-end interior & exterior 3D visualization and immersive virtual reality experience crafted for modern luxury apartment marketing.',
    image: loveImg,
    tech: 'Interior CGI · VR Experience',
    behanceLink: 'https://www.behance.net/gallery/254406943/Love-Apartment-3D-Visualization-VR-Experience',
  },
  {
    title: 'Zenith By Amber',
    category: 'High-Rise Tower',
    tags: ['3D Visualization'],
    desc: 'Complete exterior architectural visualization package for a signature luxury high-rise tower, emphasizing structural geometry and urban skyline presence.',
    image: zenithImg,
    tech: 'Tower CGI · Exterior Stills',
    driveLink: 'https://drive.google.com/drive/folders/1n3qM1CtEY1jB9Q079IDLvF5qu6IudXbo?usp=sharing',
    youtubeLink: 'https://youtu.be/Vf6C8e-hLXE?si=A0nV1wfUfoXx2cbu',
  },
  {
    title: 'Khoj Resort Architectural Edit',
    category: 'Cinematic Film',
    tags: ['3D Visualization'],
    desc: 'A cinematic architectural animation reel showcasing a serene eco-resort development nestled in nature, integrating natural sunlight and tranquil waterside living.',
    image: khojImg,
    tech: '4K Film · Hospitality',
    youtubeLink: 'https://youtu.be/ugd5UTGFQ8U?si=76n7Bg-7sI1JFzEl',
  },
  {
    title: 'Interactive Virtual Tour & Flythrough',
    category: 'Unreal Engine 5',
    tags: ['VR', '3D Visualization'],
    desc: 'Interactive real-time property walkthrough built in Unreal Engine. Allows prospective buyers to explore interiors with dynamic lighting and interactive fixtures.',
    image: timBarthImg,
    tech: 'Unreal Engine 5 · Lumen GI',
    behanceLink: 'https://www.behance.net/gallery/240770789/Interactive-Virtual-Tour-Unreal-Engine',
    youtubeLink: 'https://youtu.be/aXGkn51OToA?si=nBWPTScOYEsyamZr',
  },
  {
    title: '360° Virtual Tour (Kumar Residence)',
    category: 'Web 360° Tour',
    tags: ['360'],
    desc: 'Full web-based panoramic tour of an architectural modern residence. Enables instant interactive walkthroughs on client phones and tablets without software installation.',
    image: kumarImg,
    tech: 'Web 360° · Luxury Residence',
    liveLink: 'https://elipsestudio.com/kumar-residence-360-vitrual-tour/',
  },
  {
    title: 'Penthouse VR Walkthrough',
    category: 'VR Walkthrough',
    tags: ['VR'],
    desc: 'Immersive VR showcase for luxury off-plan penthouses. Allows international buyers to walk through bedrooms, balconies, and living areas with real-scale spatial perception.',
    image: penthouseImg,
    tech: 'Meta Quest VR · Off-Plan Sales',
    behanceLink: 'https://www.behance.net/gallery/254721427/VR-Apartment-Walkthrough',
  },
  {
    title: 'Modern Villa | VR & 3D Visualization',
    category: 'Modern Villa',
    tags: ['VR', '3D Visualization'],
    desc: 'Complete exterior architecture and interior living suite CGI for an ultra-modern minimalist villa, accompanied by real-time VR walk simulation.',
    image: villaImg,
    tech: 'Villa CGI · VR Capture',
    behanceLink: 'https://www.behance.net/gallery/221374735/Modern-Villa-Virtual-Reality',
  },
  {
    title: 'Classic Villa | VR & 3D Visualization',
    category: 'Classic Architecture',
    tags: ['3D Visualization'],
    desc: 'Intricate classical stone detailing, grand porticos, symmetrical colonnades, and opulent European estate rendering for private development marketing.',
    image: classicVillaImg,
    tech: 'Neoclassical · Estate CGI',
    behanceLink: 'https://www.behance.net/gallery/220332665/Classic-Villa-Visualization',
  },
];

const ARCHVIZ_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'vr', label: 'VR' },
  { id: '360', label: '360° Virtual Tour' },
  { id: '3d-viz', label: '3D Visualization' },
];

// Archviz Capabilities Cards
const CAPABILITIES = [
  // Row 1: Interactive & Immersive Sales Technology
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h3l2 2h4l2-2h3a2 2 0 002-2V9zM7 13a2 2 0 110-4 2 2 0 010 4zm10 0a2 2 0 110-4 2 2 0 010 4z" />
      </svg>
    ),
    title: 'Immersive VR Experiences & Walkthroughs',
    desc: 'Put high-net-worth investors and buyers directly inside unbuilt penthouses, luxury villas, and towers at true 1:1 human scale. Fully untethered immersion across Meta Quest and PCVR headsets that turns passive viewing into an emotional purchase decision.',
    features: [
      '1:1 scale spatial walkthroughs for Meta Quest & PCVR',
      'True physical depth, ceiling heights & balcony viewline simulation',
      'Turnkey setup for sales galleries, roadshows & VIP investor pitches',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Unreal Engine Interactive Virtual Tours',
    desc: 'Empower buyers to explore unbuilt architecture freely with real-time ray-traced graphics. Engineered for sales center touchscreens, multi-display video walls, and Cloud Pixel Streaming directly to remote buyers\' web browsers.',
    features: [
      'Instant daylight shifts (Day, Golden Hour, Night) & finish swaps',
      'Interactive floor plan navigation & unit availability integration',
      'Sales gallery touchscreen kiosks & Cloud Pixel Streaming to web',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Cinematic Films & Drone Matchmoving',
    desc: 'Hollywood-grade architectural storytelling that anchors your project into its real-world neighborhood. We seamlessly composite photoreal 3D models into live aerial drone footage with flawless camera tracking and color grading.',
    features: [
      '4K UHD 60FPS cinematic camera choreography & narrative pacing',
      'Frame-accurate 3D camera matchmoving over live site drone footage',
      'Realistic lifestyle integration (animated people, vehicles, landscaping)',
    ],
  },
  // Row 2: Photoreal Marketing & Visual Assets
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    title: 'Exterior CGI & Tower Visualizations',
    desc: 'Dramatic architectural presence engineered to dominate billboards, investor prospectuses, and international marketing launches. We craft atmospheric facades, accurate glass reflections, and contextually grounded skyline views.',
    features: [
      'Accurate solar orientation, atmospheric haze & local reflections',
      'Pedestrian eye-level, podium entry & helicopter aerial vistas',
      'Multi-seasonal mood lighting (Crisp Daylight, Golden Hour, Twilight)',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: 'Luxury Interior CGI & Digital Staging',
    desc: 'Bespoke interior styling that sells the aspirational lifestyle. We replicate tactile textures, custom marble veining, natural light dispersion, and physically accurate designer fabrics to make off-plan residences feel immediately livable.',
    features: [
      'Curated luxury FF&E (Furniture, Fixtures & Equipment) digital staging',
      'Hero vignettes for kitchens, master suites & entertainment spaces',
      'Exact material and finish schedule compliance with interior design',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: 'Master Plans & Community Developments',
    desc: 'Bring visionary multi-hectare mixed-use master plans, waterfront developments, golf resorts, and civic infrastructure to life. Clarify scale, connectivity, and development phases for municipal approvals and institutional investment.',
    features: [
      'Expansive bird’s-eye aerial views & contextual terrain modeling',
      'Phased construction timelines & infrastructure sequencing',
      'Amenity spotlights (marinas, clubhouses, parks & retail boulevards)',
    ],
  },
];

/**
 * Cinematic Architectural Reel Video Player (Performance Optimized Facade)
 */
const ArchvizVideoPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] bg-[#0E0E10]">
      {isPlaying ? (
        <iframe
          className="w-full h-full border-0"
          src="https://www.youtube.com/embed/YzLNRBsug_Q?autoplay=1&rel=0&modestbranding=1"
          title="Elipse Studio Architectural Visualization Reel"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div
          onClick={() => setIsPlaying(true)}
          className="relative w-full h-full cursor-pointer group flex items-center justify-center bg-zinc-950"
        >
          <img
            src="https://img.youtube.com/vi/YzLNRBsug_Q/maxresdefault.jpg"
            alt="Elipse Studio Architectural Visualization Reel"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
          <div className="absolute w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-[#4169E1] text-white flex items-center justify-center shadow-[0_0_30px_rgba(65,105,225,0.6)] group-hover:scale-110 group-hover:bg-[#3158D4] transition-all duration-300 z-10">
            <svg className="w-7 sm:w-8 h-7 sm:h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-left z-10">
            <span className="text-xs sm:text-sm font-semibold text-white/90 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
              Watch Architectural Reel (4K)
            </span>
          </div>
        </div>
      )}
    </div>
  );
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
              <div className="w-12 h-12 rounded-xl bg-[#4169E1]/15 text-[#4169E1] border border-[#4169E1]/25 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(65,105,225,0.2)] group-hover:scale-105 group-hover:border-[#4169E1]/50 transition-all duration-300">
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

const ArchitecturalVisualizationPage = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBuilds = useMemo(() => {
    if (activeTab === 'all') return ARCHVIZ_BUILDS;
    return ARCHVIZ_BUILDS.filter((item) => {
      if (activeTab === 'vr') return item.tags?.includes('VR');
      if (activeTab === '360') return item.tags?.includes('360');
      if (activeTab === '3d-viz') return item.tags?.includes('3D Visualization');
      return true;
    });
  }, [activeTab]);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <ArchVizHeader />

      {/* ======================================================== */}
      {/* 1. HERO SECTION (CENTERED FULL-WIDTH DESIGN)             */}
      {/* ======================================================== */}
      <section
        className="relative min-h-[90vh] lg:min-h-[95vh] pt-[110px] sm:pt-[130px] pb-14 sm:pb-20 px-4 sm:px-6 md:px-8 border-b border-white/10 bg-black flex flex-col justify-center items-center text-center overflow-hidden"
      >
        {/* Ambient radial lighting */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_30%,rgba(65,105,225,0.12)_0%,transparent_60%)]" />

        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
          {/* Top Badge (Hidden on mobile) */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-5 sm:mb-6">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
            <span>Architectural Visualization &amp; Real-Time Real Estate</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold tracking-tight leading-[1.1] text-white">
            Turn Off-Plan Real Estate Into{' '}
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent">
              Irresistible Pre-Sales.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-light text-zinc-300 mx-auto">
            We bridge the gap between imagination and reality. From hyper-realistic high-rise CGI and cinematic drone flythroughs to immersive <strong className="text-white font-medium">Unreal Engine 5 virtual tours</strong>, Elipse Studio empowers property developers to sell out developments before construction starts.
          </p>

          {/* Hero Action Buttons (Single compact row on all screens) */}
          <div className="mt-6 sm:mt-9 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-sm sm:max-w-xl mx-auto px-2">
            <a
              href="#archviz-gallery"
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-3.5 bg-white hover:bg-[#4169E1] text-black hover:text-white font-semibold text-[11px] sm:text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(65,105,225,0.4)] hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View Portfolio</span>
            </a>
            <button
              onClick={() => router.push('/contact')}
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-3.5 border font-medium text-[11px] sm:text-sm rounded-full transition-all duration-300 text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-[#4169E1] text-zinc-200 hover:text-white hover:scale-[1.02] whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-[#4169E1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Consultation</span>
            </button>
          </div>

          {/* Key Metrics / Stats Bar (3 columns) */}
          <div className="mt-12 sm:mt-16 w-full grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 p-5 sm:p-7 rounded-2xl bg-[#0E0E10] border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col items-center text-center p-2">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#4169E1]">
                40%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Faster Pre-Sales Cycle
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                100+
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Projects Visualized Worldwide
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#4169E1]">
                UE5
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Real-Time Interactive Digital Twins
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. INTERACTIVE COMPARISON SLIDER & WHY US GRID           */}
      {/* ======================================================== */}
      <section id="comparison" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Uncompromising Visual Precision</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2] text-white">
            From Raw CAD Blueprint to<br />
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent whitespace-nowrap inline-block">
              Interactive Virtual Tour
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Experience our geometric precision, physically-based materials, and natural atmospheric lighting calibrated specifically for high-net-worth real estate buyers.
          </p>
        </div>

        {/* Video Player */}
        <ArchvizVideoPlayer />

        {/* Comparison Grid: Traditional vs Elipse Studio */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-16">
          {/* Left: Traditional Shops */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-white/10">
            <h3 className="text-lg font-semibold text-zinc-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional 3D Archviz Shops</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mb-5">
              Offline CPU rendering shops that deliver static flat images with high revision friction.
            </p>
            <ul className="space-y-3">
              {[
                'Long wait times for simple camera angle and daylight adjustments',
                'Buyers can only look at 2-3 fixed vantage points',
                'Expensive physical sales suite mockups still required',
                'Disconnected files that do not scale across web, mobile, or VR',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-400">
                  <span className="text-red-500 font-bold shrink-0">✕</span>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Elipse Studio Edge */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-[#4169E1]/10 to-[#0E0E10] border border-[#4169E1]/40 shadow-[0_10px_30px_rgba(65,105,225,0.1)]">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase font-mono bg-[#4169E1]/15 text-[#4169E1] mb-3">
              <span>⚡ The Elipse Studio Edge</span>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
              <span>Real-Time Unreal Engine 5 &amp; Hybrid CGI</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-5">
              Cinematic artistry combined with next-generation real-time interactive game engine technology.
            </p>
            <ul className="space-y-3">
              {[
                'Real-time lighting & camera manipulation in minutes, not days',
                'Interactive digital walkthroughs allowing buyers to roam every square foot',
                'Finish & material configurators to swap marble, timber, and layouts on the fly',
                'Touchscreen & VR sales gallery ready for international investor roadshows',
              ].map((text, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-200">
                  <span className="text-[#4169E1] font-bold shrink-0">✓</span>
                  <span><strong className="text-white font-medium">{text.split(' in ')[0]}</strong> {text.includes(' in ') ? `in ${text.split(' in ')[1]}` : ''}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 3. RECENT ARCHVIZ BUILDS (MAIN SHOWCASE GALLERY)         */}
      {/* ======================================================== */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black"
        id="archviz-gallery"
      >
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Proven Track Record</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Selected Real Estate &amp; Archviz Portfolio
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 leading-relaxed font-light text-zinc-300">
            Explore real client projects delivered by Elipse Studio across towers, luxury villas, master communities, and interactive real-time environments.
          </p>

          {/* Interactive Category Filter Tabs */}
          <div className="flex justify-center items-center mt-7 sm:mt-9">
            <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-full bg-[#0E0E10] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
              {ARCHVIZ_TABS.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'bg-[#4169E1] text-white shadow-[0_4px_20px_rgba(65,105,225,0.45)] scale-[1.02]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 sm:mt-12">
          {filteredBuilds.map((item, idx) => {
            const primaryLink = item.behanceLink || item.liveLink || item.driveLink || item.youtubeLink;
            return (
              <div
                key={idx}
                onClick={() => primaryLink && window.open(primaryLink, '_blank', 'noopener,noreferrer')}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(65,105,225,0.18)] flex flex-col justify-between bg-[#0E0E10] border-white/10 hover:border-[#4169E1]/60 cursor-pointer"
              >
                {/* Image Preview Container (16:9 HD Size) */}
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  {/* Category Badges / Tags */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
                    {item.tags?.filter((tag) => tag !== 'Architecture' && tag !== 'Master Plan').map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md shadow-md ${
                          tag === 'VR'
                            ? 'bg-purple-600/90 text-white border border-purple-400/40'
                            : tag === '360'
                            ? 'bg-emerald-600/90 text-white border border-emerald-400/40'
                            : 'bg-black/70 text-white/90 border border-white/20'
                        }`}
                      >
                        {tag === '360' ? '360° Tour' : tag}
                      </span>
                    ))}
                  </div>

                  <img
                    src={item.image}
                    alt={item.title}
                    width="1280"
                    height="720"
                    loading={idx < 3 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={idx === 0 ? "high" : "auto"}
                    onError={(e) => {
                      if (item.fallbackImg && e.currentTarget.src !== item.fallbackImg) {
                        e.currentTarget.src = item.fallbackImg;
                      }
                    }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 will-change-transform"
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
                      <span className="text-[#4169E1] font-semibold">{item.tech}</span>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      {item.liveLink && (
                        <a
                          href={item.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          <span>Launch 360° Tour</span>
                        </a>
                      )}

                      {item.reelLink && (
                        <a
                          href={item.reelLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                        >
                          <svg className="w-3.5 h-3.5 text-pink-500 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.13-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                          <span>Watch Reel</span>
                        </a>
                      )}

                      {item.driveLink && (
                        <a
                          href={item.driveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                        >
                          <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                          <span>Open Drive Archive</span>
                        </a>
                      )}

                      {item.behanceLink && (
                        <a
                          href={item.behanceLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                        >
                          <svg className="w-3.5 h-3.5 text-[#4169E1] fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.076 0-5.625-3.045-5.625-6.046 0-3.418 1.944-5.954 5.375-5.954 3.737 0 5.099 2.766 4.908 6.136h-7.795c.094 1.797 1.134 3.464 3.271 3.464 1.455 0 2.453-.787 2.871-1.6h2.096zm-7.726-4.5c.083-1.428.983-2.646 2.652-2.646 1.583 0 2.508 1.144 2.585 2.646h-5.237zm-11.456 7.5h-4.544v-16h4.868c2.973 0 5.132 1.411 5.132 4.316 0 1.637-.841 2.915-2.227 3.528 1.761.642 2.771 2.158 2.771 4.148 0 3.208-2.483 4.008-6 4.008zm-2.044-6.877h2.247c1.474 0 2.464-.539 2.464-1.929 0-1.258-.871-1.794-2.246-1.794h-2.465v3.723zm0-5.323h2.122c1.237 0 2.053-.48 2.053-1.639 0-1.121-.77-1.561-1.968-1.561h-2.207v3.2z" />
                          </svg>
                          <span>View Behance</span>
                        </a>
                      )}

                      {item.youtubeLink && (
                        <a
                          href={item.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                        >
                          <svg className="w-3.5 h-3.5 text-red-500 fill-current shrink-0" viewBox="0 0 24 24">
                            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                          </svg>
                          <span>Demo</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

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
      {/* 4. CAPABILITIES (6-CARD STATIC GRID)                     */}
      {/* ======================================================== */}
      <section id="services" className="w-full py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="mb-12 text-center max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4169E1] mb-2">
            Comprehensive Archviz Capabilities
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Built for Property Developers, Architects &amp; Sales Galleries
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300">
            From master-planned townships to single trophy penthouses, we supply the complete visual and interactive arsenal needed to market off-plan luxury real estate.
          </p>
        </div>

        {/* 6-Card Static Grid (3 Top, 3 Bottom) */}
        <CapabilitiesGrid />
      </section>

      {/* ======================================================== */}
      {/* 5. PRODUCTION PIPELINE SECTION                           */}
      {/* ======================================================== */}
      <section id="pipeline" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Methodical Execution</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.1] text-white">
            Our Architectural Visualization Pipeline
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            From initial CAD ingestion to interactive digital twin deployment, our phased delivery ensures pixel-perfect fidelity and on-time launches.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'CAD & BIM Ingestion',
              desc: 'Importing Revit, Rhino, SketchUp, and DWG drawings with 1:1 scale accuracy and clean topology optimization.',
            },
            {
              step: '02',
              title: 'PBR Materials & Staging',
              desc: 'Custom FF&E virtual staging, physically accurate lighting, fabric textures, marble, and natural landscape dressing.',
            },
            {
              step: '03',
              title: 'Unreal 5 & VR Setup',
              desc: 'Dynamic Lumen real-time illumination, Nanite geometry, interactive material switchers, and Meta Quest VR builds.',
            },
            {
              step: '04',
              title: 'Multi-Channel Delivery',
              desc: 'Master 8K stills, 4K cinematic flythroughs, web-based 360° interactive tours, and touchscreen kiosk packages.',
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
      {/* 6. CLIENT REVIEWS & TESTIMONIALS                        */}
      {/* ======================================================== */}
      <div id="testimonials">
        <ClientReviews />
      </div>

      {/* ======================================================== */}
      {/* 7. CONTACT & SCOPE ESTIMATOR FORM                       */}
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

export default ArchitecturalVisualizationPage;
