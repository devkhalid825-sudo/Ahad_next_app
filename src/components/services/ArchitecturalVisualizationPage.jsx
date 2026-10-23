'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
    title: 'Modern Villa | VR & 3D Visualization',
    category: 'Modern Villa',
    tags: ['VR', '3D Visualization'],
    desc: 'Complete exterior architecture and interior living suite CGI for an ultra-modern minimalist villa, accompanied by real-time VR walk simulation.',
    image: villaImg,
    tech: 'Villa CGI · VR Capture',
    projectPath: '/project/villa',
  },
  {
    title: 'Love Apartment | 3D Visualization & VR Experience',
    category: 'Luxury Residential',
    tags: ['VR', '3D Visualization'],
    desc: 'High-end interior & exterior 3D visualization and immersive virtual reality experience crafted for modern luxury apartment marketing.',
    image: loveImg,
    tech: 'Interior CGI · VR Experience',
    projectPath: '/project/love',
  },
  {
    title: 'Zenith By Amber',
    category: 'High-Rise Tower',
    tags: ['3D Visualization'],
    desc: 'Complete exterior architectural visualization package for a signature luxury high-rise tower, emphasizing structural geometry and urban skyline presence.',
    image: zenithImg,
    tech: 'Tower CGI · Exterior Stills',
    projectPath: '/project/zenith-by-amber',
    youtubeLink: 'https://youtu.be/Vf6C8e-hLXE?si=A0nV1wfUfoXx2cbu',
  },
  {
    title: 'Khoj Resort Architectural Edit',
    category: 'Cinematic Film',
    tags: ['3D Visualization', 'Cinematics & Flythrough'],
    desc: 'A cinematic architectural animation reel showcasing a serene eco-resort development nestled in nature, integrating natural sunlight and tranquil waterside living.',
    image: khojImg,
    tech: '4K Film · Hospitality',
    projectPath: '/project/khoj',
    youtubeLink: 'https://youtu.be/ugd5UTGFQ8U?si=76n7Bg-7sI1JFzEl',
  },
  {
    title: 'Interactive Virtual Tour & Flythrough',
    category: 'Unreal Engine 5',
    tags: ['3D Visualization', 'Cinematics & Flythrough', 'Interactive Virtual Tour'],
    desc: 'Interactive real-time property walkthrough built in Unreal Engine. Allows prospective buyers to explore interiors with dynamic lighting and interactive fixtures.',
    image: timBarthImg,
    tech: 'Unreal Engine 5 · Lumen GI',
    projectPath: '/project/tim-barth',
    youtubeLink: 'https://youtu.be/aXGkn51OToA?si=nBWPTScOYEsyamZr',
  },
  {
    title: '360° Virtual Tour (Kumar Residence)',
    category: 'Web 360° Tour',
    tags: ['360', '3D Visualization'],
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
    projectPath: '/project/penthouse-vr-walkthrough',
  },
  {
    title: 'Classic Villa | VR & 3D Visualization',
    category: 'Classic Architecture',
    tags: ['3D Visualization'],
    desc: 'Intricate classical stone detailing, grand porticos, symmetrical colonnades, and opulent European estate rendering for private development marketing.',
    image: classicVillaImg,
    tech: 'Neoclassical · Estate CGI',
    projectPath: '/project/classic-villa',
  },

  // ── Newly Synced Projects from Backend ──────────────────────────────────────

  {
    title: 'Nevegan Apartment | 3D Visualization & VR',
    category: 'Apartment Visualization',
    tags: ['VR', '3D Visualization'],
    desc: 'Transforming 2D architectural blueprints into a realistic digital showcase — accurately conveying spatial depth, natural lighting, and premium material finishes before construction begins.',
    image: 'https://api.elipsestudio.com/media/290',
    tech: 'Architecture CGI · VR Walkthrough',
    projectPath: '/project/neveganapartment',
  },
  {
    title: 'The Academy | Architecture & VR',
    category: 'Educational Architecture',
    tags: ['VR', '3D Visualization', 'Cinematics & Flythrough'],
    desc: 'Immersive architectural visualization and VR walkthrough for an academy campus, delivering real-time exploration of educational spaces and infrastructure.',
    image: 'https://api.elipsestudio.com/media/63',
    tech: 'Campus VR · Architectural Flythrough',
    projectPath: '/project/the-academy',
    youtubeLink: 'https://youtu.be/y9AR-z7TDZs?si=jm4v-PnQWfUO1PGH',
  },
  {
    title: 'Amalie Arena | Architectural Visualization',
    category: 'Sports Venue',
    tags: ['Cinematics & Flythrough', '3D Visualization'],
    desc: 'Photorealistic architectural visualization and cinematic walkthroughs for Amalie Arena, showcasing the venue\'s design, atmosphere, and spatial experience through high-quality 3D visuals.',
    image: 'https://api.elipsestudio.com/media/68',
    tech: 'Cinematic CGI · Arena Visualization',
    projectPath: '/project/amalie-arena',
    youtubeLink: 'https://youtu.be/_LbHUNVG-mM?si=q4vHNCwpwGcL1dzL',
  },
  {
    title: 'Scala | Restaurant Visualization',
    category: 'Commercial Interior',
    tags: ['3D Visualization'],
    desc: 'High-fidelity interior and exterior 3D visualization for a premium restaurant space — photorealistic materials, curated lighting, and atmospheric staging for pre-launch marketing.',
    image: 'https://api.elipsestudio.com/media/86',
    tech: 'Interior CGI · Commercial Viz',
    projectPath: '/project/restaurant-visualization',
  },
  {
    title: 'Penthouse | 3D Visualization & 360° Tour',
    category: 'Luxury Penthouse',
    tags: ['3D Visualization', 'Interactive Virtual Tour'],
    desc: 'Transport prospective buyers into fully interactive, photorealistic penthouse environments. Web-based 360° panoramic experience and high-resolution CGI stills for pre-sale marketing.',
    image: 'https://api.elipsestudio.com/media/296',
    tech: 'Penthouse CGI · Interactive Tour',
    projectPath: '/project/penthouse-360-tour',
  },
  {
    title: 'Interactive Virtual Home | WebVR',
    category: 'Web VR Experience',
    tags: ['VR'],
    desc: 'Fully interactive web-based VR experience for a residential property. Enables buyers to explore interior spaces and architectural details immersively from any device.',
    image: 'https://api.elipsestudio.com/media/309',
    tech: 'WebVR · Real-Time Walkthrough',
    projectPath: '/project/virtual-reality-experience',
    youtubeLink: 'https://youtu.be/YzLNRBsug_Q?si=ChhX6nOlEGbmAHbB',
  },
  {
    title: 'Jewellery Shop | VR Virtual Tour',
    category: 'Retail VR',
    tags: ['VR'],
    desc: 'Step inside and explore every detail through an immersive VR virtual tour. Navigate through realistic retail spaces, discover key features, and experience the environment from every angle.',
    image: 'https://api.elipsestudio.com/media/313',
    tech: 'Retail VR · Immersive Tour',
    projectPath: '/project/jewellery-shop',
    youtubeLink: 'https://www.youtube.com/shorts/kGOsjykp1Pc',
  },
  {
    title: 'Roamstead | Web VR Experience',
    category: 'Web VR',
    tags: ['VR'],
    desc: 'Browser-based VR real estate walkthrough for Roamstead — enabling prospective buyers to explore architectural spaces interactively without headset hardware.',
    image: 'https://api.elipsestudio.com/media/165',
    tech: 'Web VR · Real Estate',
    projectPath: '/project/roamstead-web-vr',
    youtubeLink: 'https://youtu.be/I5T6C2RheG0?si=LM_dG0r5XPE3ecQR',
  },
  {
    title: 'Adnan Qaiser Residence | 360° Tour',
    category: 'Residential 360°',
    tags: ['360'],
    desc: 'Full web-based panoramic 360° tour of a private luxury residence. Enables instant interactive walkthroughs on any device without software installation.',
    image: 'https://api.elipsestudio.com/media/247',
    tech: 'Web 360° · Luxury Residence',
    liveLink: 'https://elipsestudio-adnanresidence.netlify.app/',
  },
  {
    title: 'Christmas Market | 360° Virtual Tour',
    category: 'Event 360°',
    tags: ['360'],
    desc: 'Immersive 360° virtual tour of a festive Christmas market setting — bringing seasonal experiences to life through interactive web-based panoramic exploration.',
    image: 'https://api.elipsestudio.com/media/244',
    tech: 'Event 360° · Panoramic Tour',
    liveLink: 'https://elipsestudio.com/ChristmasMarket_360_Virtual_Tour/',
  },
  {
    title: 'Hyperstar | 360° Store Tour',
    category: 'Retail 360°',
    tags: ['360'],
    desc: 'Interactive 360° virtual tour of a Hyperstar retail environment — allowing customers to explore the store layout, aisles, and departments from anywhere in the world.',
    image: 'https://api.elipsestudio.com/media/401',
    tech: 'Retail 360° · Web Tour',
    liveLink: 'https://elipsestudio.com/Hyperstar-360-tour/',
  },
  {
    title: 'Office Tour | 360° Virtual Experience',
    category: 'Corporate 360°',
    tags: ['360'],
    desc: 'Professional 360° virtual office tour enabling remote visitors to explore workspaces, meeting rooms, and facilities through an engaging web-based panoramic experience.',
    image: 'https://api.elipsestudio.com/media/402',
    tech: 'Corporate 360° · Office Walkthrough',
    liveLink: 'https://elipsestudio.com/office-tour/',
  },
  {
    title: 'Apartment Tour | 360° Virtual Walkthrough',
    category: 'Residential 360°',
    tags: ['360'],
    desc: 'Web-based 360° apartment tour delivering an immersive panoramic walkthrough experience for off-plan residential marketing, accessible on any device without installation.',
    image: 'https://api.elipsestudio.com/media/400',
    tech: 'Web 360° · Apartment Showcase',
    liveLink: 'https://elipsestudio.com/apartment-tour/',
  },
];

const ARCHVIZ_TABS = [
  { id: 'all', label: 'All Projects' },
  { id: 'cinematic', label: 'Cinematics & Flythrough' },
  { id: 'interactive-tour', label: 'Interactive Virtual Tour' },
  { id: 'vr', label: 'VR' },
  { id: '360', label: '360° Virtual Tour' },
  { id: '3d-viz', label: '3D Visualization' },
];


const CAPABILITIES = [

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
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBuilds = useMemo(() => {
    if (activeTab === 'all') return ARCHVIZ_BUILDS;
    return ARCHVIZ_BUILDS.filter((item) => {
      if (activeTab === 'cinematic') return item.tags?.includes('Cinematics & Flythrough');
      if (activeTab === 'interactive-tour') return item.tags?.includes('Interactive Virtual Tour');
      if (activeTab === 'vr') return item.tags?.includes('VR');
      if (activeTab === '360') return item.tags?.includes('360');
      if (activeTab === '3d-viz') return item.tags?.includes('3D Visualization');
      return true;
    });
  }, [activeTab]);

  const visibleBuilds = filteredBuilds.slice(0, visibleCount);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <ArchVizHeader />

      {/* ======================================================== */}
      {/* 1. INTERACTIVE COMPARISON SLIDER & WHY US GRID           */}
      {/* ======================================================== */}
      <section id="comparison" className="w-full px-4 sm:px-6 md:px-8 pt-[110px] sm:pt-[130px] pb-16 sm:pb-24 border-b border-white/10 bg-black">
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
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-[#4169E1]/40 shadow-[0_10px_30px_rgba(65,105,225,0.1)]">
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
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="w-full max-w-5xl mx-auto flex justify-center px-3 mt-7 sm:mt-9">
          <div className="max-w-full overflow-x-auto no-scrollbar flex flex-nowrap items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full bg-[#0E0E10] border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            {ARCHVIZ_TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setVisibleCount(6);
                  }}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex items-center justify-center whitespace-nowrap rounded-full font-semibold leading-none px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-[13px] transition-all duration-300 cursor-pointer ${isActive
                    ? 'bg-[#4169E1] text-white shadow-[0_4px_20px_rgba(65,105,225,0.45)] border border-[#4169E1]'
                    : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 sm:mt-12">
          {visibleBuilds.map((item, idx) => {
            const primaryLink = item.projectPath || item.liveLink || item.driveLink || item.youtubeLink;
            return (
              <div
                key={idx}
                onClick={() => {
                  if (!primaryLink) return;
                  if (primaryLink.startsWith('http')) {
                    window.open(primaryLink, '_blank', 'noopener,noreferrer');
                  } else {
                    router.push(primaryLink);
                  }
                }}
                className="w-full md:w-[calc(50%-1rem)] lg:w-[calc((100%-4rem)/3)] group relative rounded-2xl overflow-hidden border transition-all duration-500 hover:shadow-[0_12px_40px_rgba(65,105,225,0.18)] flex flex-col justify-between bg-[#0E0E10] border-white/10 hover:border-[#4169E1]/60 cursor-pointer"
              >
                {/* Image Preview Container (16:9 HD Size) */}
                <div className="relative aspect-video overflow-hidden bg-black/40">
                  {/* Category Badges / Tags */}
                  <div className="absolute top-3 left-3 z-10 flex flex-wrap gap-1.5 pointer-events-none">
                    {item.tags?.filter((tag) => tag !== 'Architecture' && tag !== 'Master Plan').map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-md ${tag === 'VR'
                          ? 'bg-purple-600 text-white border border-purple-400/50'
                          : tag === '360'
                            ? 'bg-emerald-600 text-white border border-emerald-400/50'
                            : tag === '3D Visualization'
                              ? 'bg-[#4169E1] text-white border border-blue-300/40'
                              : 'bg-zinc-900 text-white border border-zinc-700/80'
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

                      {item.projectPath && (
                        <Link
                          href={item.projectPath}
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                        >
                          <svg className="w-3.5 h-3.5 text-[#4169E1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                          <span>View Project</span>
                        </Link>
                      )}

                      {item.youtubeLink && (
                        <a
                          href={item.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold border transition-all duration-300 hover:scale-[1.02] cursor-pointer text-center bg-white/5 hover:bg-white/10 border-white/15 hover:border-white/30 text-white"
                        >
                          <svg className="w-3.5 h-3.5 fill-current text-[#4169E1] shrink-0" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                          <span>Video</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
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
      {/* 5. CLIENT REVIEWS & TESTIMONIALS                        */}
      {/* ======================================================== */}
      <div id="testimonials">
        <ClientReviews />
      </div>

      {/* ======================================================== */}
      {/* 6. CONTACT & SCOPE ESTIMATOR FORM                       */}
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
