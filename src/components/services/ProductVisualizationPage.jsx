'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import ProductVizHeader from '../layouts/ProductVizHeader';
import Footer from '../layouts/Footer';
import Contact from '../features/Contact';
import ClientReviews from '../features/ClientReviews';
import { getImgSrc } from '../../utils/api';

// Project images
import ahmedJamSpreadImgRaw from '../../assets/Ahmed-food/jam&spread/15.webp';
import ahmedBiryaniImgRaw from '../../assets/Ahmed-food/bombay-biryani/13.webp';
import clubProImgRaw from '../../assets/ElipseImages/projects/G-2.webp';
import inverxImgRaw from '../../assets/About-page/inverx.webp';
import ahmedFoodsImgRaw from '../../assets/Ahmed-food/jelly/01.webp';
import lahoreZooImgRaw from '../../assets/ElipseImages/projects/0.webp';
import tapalImgRaw from '../../assets/animation/tapal.webp';
import roohAfzaImgRaw from '../../assets/ElipseImages/projects/R-1.webp';
import malkaImgRaw from '../../assets/animation/Malka-food.webp';
import gipproImgRaw from '../../assets/animation/gipppro.webp';
import dogguoImgRaw from '../../assets/animation/DOGGUO.webp';
import parcoImgRaw from '../../assets/animation/parcho.webp';
import dhoopImgRaw from '../../assets/animation/motiongrapics copy.webp';
import giordanoImgRaw from '../../assets/animation/Giordano.webp';

const ahmedJamSpreadImg = getImgSrc(ahmedJamSpreadImgRaw);
const ahmedBiryaniImg = getImgSrc(ahmedBiryaniImgRaw);
const clubProImg = getImgSrc(clubProImgRaw);
const inverxImg = getImgSrc(inverxImgRaw);
const ahmedFoodsImg = getImgSrc(ahmedFoodsImgRaw);
const lahoreZooImg = getImgSrc(lahoreZooImgRaw);
const tapalImg = getImgSrc(tapalImgRaw);
const roohAfzaImg = getImgSrc(roohAfzaImgRaw);
const malkaImg = getImgSrc(malkaImgRaw);
const gipproImg = getImgSrc(gipproImgRaw);
const dogguoImg = getImgSrc(dogguoImgRaw);
const parcoImg = getImgSrc(parcoImgRaw);
const dhoopImg = getImgSrc(dhoopImgRaw);
const giordanoImg = getImgSrc(giordanoImgRaw);

// Selected 3D Product Visualization & Commercial CGI Portfolio Builds
const PRODUCT_VIZ_BUILDS = [
  {
    title: 'Ahmed Foods Jam & Spread | 3D Product Advertisement',
    category: 'FMCG & Commercial Animation',
    desc: 'Dynamic 3D product commercial and fruit spread simulation highlighting fresh ingredients, appetizing jar textures, and vibrant breakfast lifestyle CGI.',
    image: ahmedJamSpreadImg,
    tech: 'Fluid Dynamics · Redshift · 3D VFX',
    behanceLink: 'https://www.behance.net/gallery/249579553/Ahmed-Foods-Jam-Spread-3D-Product-Advertisement',
  },
  {
    title: 'Ahmed Foods Bombay Biryani | CGI Commercial',
    category: 'FMCG & Commercial Animation',
    desc: 'Cinematic 3D commercial featuring photoreal ingredient dynamics, sizzling spices, steam simulation, and packaging CGI for Ahmed Foods Bombay Biryani recipe mix.',
    image: ahmedBiryaniImg,
    tech: 'Food CGI · Particle Dynamics · Redshift',
    behanceLink: 'https://www.behance.net/gallery/250610119/Ahmed-Foods-Bombay-Biryani-CGI-Commercial',
  },
  {
    title: 'Club & ball washer | Club Pro',
    category: 'Automotive & Golf Cart Accessories',
    desc: 'Photorealistic 3D product rendering, exploded accessory visualization, and studio lighting for Club Pro golf cart club & ball washer systems.',
    image: clubProImg,
    tech: 'Studio CGI · 3D Product Rendering',
    behanceLink: 'https://www.behance.net/gallery/251145627/Club-ball-washer-Club-Pro',
  },
  {
    title: 'Inverex Product Visualization',
    category: 'Industrial & Tech CGI',
    desc: 'Photorealistic 3D product rendering and exploded technical visualization for solar power conversion units and high-capacity battery systems.',
    image: inverxImg,
    tech: 'Cinema 4D · Octane Render',
    behanceLink: 'https://www.behance.net/gallery/254405865/Inverex-Product-Visualization',
  },
  {
    title: 'Ahmed Foods Crystal Jelly 3D Commercial',
    category: 'FMCG & Commercial Animation',
    desc: 'Vibrant 3D commercial animation showcasing dynamic fruit jelly splashes, translucent material physics, and appetizing packaging aesthetics.',
    image: ahmedFoodsImg,
    tech: 'Fluid Dynamics · Houdini · Redshift',
    behanceLink: 'https://www.behance.net/gallery/251531045/Ahmed-Foods-Crystal-Jelly-3D-Animation',
  },
  {
    title: 'Lahore Zoo 3D Anamorphic Animation',
    category: '3D Anamorphic Billboard',
    desc: 'Mind-bending naked-eye 3D anamorphic corner LED billboard animation bringing majestic wildlife leaping out of the architectural display.',
    image: lahoreZooImg,
    tech: 'Forced Perspective · Unreal 5 · VFX',
    behanceLink: 'https://www.behance.net/gallery/239269921/Lahore-Zoo-Anamorphic-Animation',
  },
  {
    title: 'Tapal | Animation',
    category: 'Beverage CGI & VFX',
    desc: 'Tea holds a special place in every Pakistani household, and Tapal Tea (Pvt.) Ltd. has been a part of our lives for as long as we can remember. It’s an absolute pleasure to collaborate with a brand we’ve grown up with and always trusted.',
    image: tapalImg,
    tech: 'Liquid Simulation · 3ds Max · V-Ray',
    behanceLink: 'https://www.behance.net/gallery/229323883/Tapal-Animation',
  },
  {
    title: 'Rooh Afza 3D Anamorphic Billboard',
    category: '3D Anamorphic Billboard',
    desc: 'Spectacular outdoor 3D anamorphic commercial featuring explosive rose water splashes, ice crystals, and hyper-realistic beverage bottles.',
    image: roohAfzaImg,
    tech: 'Anamorphic CGI · Fluid Physics',
    behanceLink: 'https://www.behance.net/gallery/221757889/Rooh-Afza-Bill-Board-Animation',
  },
  {
    title: 'MALKA FOODS',
    category: 'Food CGI & Particle VFX',
    desc: 'Cinematic spice swirl simulations, slow-motion grain bursts, and rich culinary CGI tailored for broadcast commercials and digital ads.',
    image: malkaImg,
    tech: 'Particle VFX · Maya · Arnold',
    behanceLink: 'https://www.behance.net/gallery/193724187/Malka-Foods-VFX-Animation',
  },
  {
    title: 'Gippro | Animation',
    category: 'Consumer Hardware CGI',
    desc: 'Ultra-clean studio lighting, micro-anodized metal shaders, and layer-by-layer mechanical component teardowns for next-gen consumer devices.',
    image: gipproImg,
    tech: 'CAD Ingestion · Exploded Assembly',
    behanceLink: 'https://www.behance.net/gallery/212949897/Gippro-Animation',
  },
  {
    title: 'DOGGUO Luxury Pet Accessories CGI',
    category: 'Luxury Product Stills',
    desc: 'Sub-millimeter texture accuracy rendering genuine leather grain, polished metallic buckles, and soft textile weaves in custom studio environments.',
    image: dogguoImg,
    tech: 'PBR Textures · Studio CGI',
    behanceLink: 'https://www.behance.net/gallery/206167799/DOGGUO-CGI',
  },
  {
    title: 'Parco | Animation',
    category: 'Energy & Industrial CGI',
    desc: 'Complex oil refining machinery visualization, high-precision pipeline network animation, and corporate technical storytelling.',
    image: parcoImg,
    tech: 'Industrial 3D · Motion Graphics',
    behanceLink: 'https://www.behance.net/gallery/201090447/Parco-Animation',
  },
  {
    title: 'Dhoop Ki Deewar VFX & Title Sequence',
    category: 'Cinematic VFX & Motion Graphics',
    desc: 'Atmospheric cinematic title sequences, historical narrative compositing, and evocative motion graphic treatments for high-profile streaming series.',
    image: dhoopImg,
    tech: 'Compositing · After Effects · 3D VFX',
    behanceLink: 'https://www.behance.net/gallery/154519401/Dhoop-Ki-Deewar-(Motion-Graphics-VFX)',
  },
  {
    title: 'GIORDANO COMMERCIAL',
    category: 'Luxury Watch CGI',
    desc: 'Intricate tourbillon gear movement animation, diamond-cut bezel refraction, and sapphire crystal reflections for luxury watch marketing.',
    image: giordanoImg,
    tech: 'Macro Detailing · Chronograph CGI',
    behanceLink: 'https://www.behance.net/gallery/152471537/Giordano-Commercial',
  },
];

// Capabilities Grid
const CAPABILITIES = [
  // Row 1: Commercial Imagery & Dynamics
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: 'Hero Commercial CGI & E-Commerce Stills',
    desc: 'Studio-grade 8K packshots, lifestyle contextual scenes, and Amazon/Shopify-ready transparent visuals that replace expensive physical photography with infinite revision flexibility.',
    features: [
      'Crisp 8K UHD output calibrated for print, billboard & digital storefronts',
      'Microscopic material detail (brushed aluminum, fabric weave, glass refraction)',
      'Consistent master lighting setups across hundreds of catalog SKUs',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ),
    title: '3D Anamorphic Billboards & Out-of-Home CGI',
    desc: 'Jaw-dropping forced-perspective 3D corner LED screen animations that create the illusion of physical products popping out of high-traffic city billboards.',
    features: [
      'Custom viewpoint perspective mapping calibrated to precise LED screen geometry',
      'Hyper-realistic physical lighting blending with ambient city environments',
      'Viral social media engagement driving massive organic PR reach',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: 'Fluid Dynamics, Splashes & Particle VFX',
    desc: 'High-speed liquid pouring simulations, cosmetic cream splashes, beverage condensation droplets, and explosive culinary particle dynamics powered by Houdini.',
    features: [
      'Viscous fluid simulations (beverages, lotions, sauces, honey, tea)',
      'Atmospheric smoke, mist, embers, steam, and explosive spice swirls',
      'Ultra-slow-motion 1000 FPS macro capture choreography',
    ],
  },
  // Row 2: Engineering, AR & Variant Pipelines
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Exploded Assembly & Cutaway Engineering',
    desc: 'Translate complex industrial CAD models into crystal-clear visual stories that show off internal craftsmanship, motor mechanics, and proprietary technology.',
    features: [
      'STEP, IGES, SolidWorks & Rhino CAD direct ingestion',
      'Smooth animated part disassembly with callout annotations',
      'Transparent x-ray shaders and cross-sectional slices',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
    title: '360° Interactive Spins & WebAR Quick-Look',
    desc: 'Lightweight USDZ & glTF 3D assets ready for seamless integration into Shopify, WooCommerce, and web platforms, allowing shoppers to view products in AR directly in their space.',
    features: [
      'Interactive 360-degree orbital rotation for web product pages',
      'Instant WebAR launch on iPhone (Quick Look) & Android (Scene Viewer)',
      'Zero app install needed with guaranteed high-speed mobile loading',
    ],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: 'Rapid Variant & Catalog Batch Rendering',
    desc: 'Generate hundreds of color, finish, and packaging variations from a single master 3D asset in hours rather than re-shooting physical items in a photo studio.',
    features: [
      'Automated batch rendering for full seasonal product collections',
      'Perfect angle & camera consistency across whole e-commerce catalogs',
      '48-hour turnaround for new colorways, labels, and material trims',
    ],
  },
];

/**
 * Cinematic Product Visualization Showcase Player
 */
const ProductVizVideoPlayer = () => {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_50px_rgba(0,0,0,0.8)] bg-[#0E0E10]">
      <iframe
        className="w-full h-full border-0"
        src="https://www.youtube.com/embed/BsKw4i6riRw?rel=0&modestbranding=1"
        title="Ahmed Foods Crystal Jelly 3D Commercial Animation — Elipse Studio"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
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

const ProductVisualizationPage = () => {
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      data-nav="dark"
      className="min-h-screen font-sans bg-black text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-white"
    >
      <ProductVizHeader />

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span>Photorealistic 3D Product Visualization &amp; Commercial CGI</span>
          </div>

          {/* Hero Title */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-[62px] font-bold tracking-tight leading-[1.1] text-white">
            Transform Physical Products Into{' '}
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent">
              Hyperreal Commercial CGI.
            </span>
          </h1>

          {/* Hero Subtitle */}
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-3xl font-light text-zinc-300 mx-auto">
            Say goodbye to expensive photography studios, sample shipping bottlenecks, and static imagery limits. <strong className="text-white font-medium">Elipse Studio</strong> crafts cinematic 3D product renders, 3D anamorphic billboards, 360° interactive spins, and fluid simulations that drive massive conversion lifts for global brands.
          </p>

          {/* Hero Action Buttons (Single compact row on all screens) */}
          <div className="mt-6 sm:mt-9 flex flex-row items-center justify-center gap-2 sm:gap-4 w-full max-w-sm sm:max-w-xl mx-auto px-2">
            <a
              href="#product-gallery"
              className="flex-1 sm:flex-initial px-3.5 sm:px-8 py-2.5 sm:py-3.5 bg-white hover:bg-[#4169E1] text-black hover:text-white font-semibold text-[11px] sm:text-sm rounded-full transition-all duration-300 shadow-[0_4px_20px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_25px_rgba(65,105,225,0.4)] hover:scale-[1.02] cursor-pointer text-center whitespace-nowrap flex items-center justify-center gap-1.5 sm:gap-2"
            >
              <svg className="w-3.5 sm:w-4 h-3.5 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span>View 3D Portfolio</span>
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
                70%
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Lower Cost Vs Physical Shoots
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                8K UHD
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Photoreal Surface Precision
              </span>
            </div>
            <div className="flex flex-col items-center text-center p-2 border-t sm:border-t-0 sm:border-l border-white/10">
              <span className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#4169E1]">
                48hr
              </span>
              <span className="text-[10px] sm:text-xs uppercase tracking-wider font-medium mt-1 text-zinc-400">
                Rapid Variant Batch Delivery
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* 2. SHOWCASE VIDEO REEL & WHY US COMPARISON GRID          */}
      {/* ======================================================== */}
      <section id="comparison" className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black">
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-4">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <span>Uncompromising Visual Fidelity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[44px] font-bold tracking-tight leading-[1.2] text-white">
            From Raw CAD Blueprints to<br />
            <span className="bg-gradient-to-r from-white via-[#8ca8ff] to-[#4169E1] bg-clip-text text-transparent whitespace-nowrap inline-block">
              Cinematic Commercial Visuals
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            Experience our micro-surface material calibration, physically accurate studio lighting rigs, and fluid simulations engineered to turn consumer products into irresistible hero visuals.
          </p>
        </div>

        {/* Video Showcase Reel Player */}
        <ProductVizVideoPlayer />

        {/* Comparison Grid: Traditional vs Elipse Studio */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 sm:mt-16">
          {/* Left: Traditional Photography */}
          <div className="p-6 sm:p-8 rounded-2xl bg-[#0E0E10] border border-white/10">
            <h3 className="text-lg font-semibold text-zinc-300 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Traditional Studio Photography</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-light mb-5">
              Physical studio shoots burdened with heavy logistics, expensive sets, and zero post-shoot lighting adjustments.
            </p>
            <ul className="space-y-3">
              {[
                'Costly studio rentals, lighting crews, and physical prototype shipping',
                'Impossible to change camera angles or lighting without expensive re-shoots',
                'Cannot create exploded mechanical views or transparent cutaway visuals',
                'Slow turnaround when updating packaging labels, seasonal colors, or materials',
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
              <span>Hyperrealistic 3D CGI &amp; Digital Twin Pipeline</span>
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light mb-5">
              100% digital CGI asset mastery unlocking unlimited angles, materials, fluid physics, and WebAR exports.
            </p>
            <ul className="space-y-3">
              {[
                'Zero prototype shipping needed; render directly from CAD engineering files',
                'Infinite colorways, textures, and lighting setups generated in hours',
                'Dynamic fluid splash simulations, particle bursts, and exploded mechanical CGI',
                'Ready for 3D anamorphic billboards, interactive web spins, and WebAR quick-look',
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
      {/* 3. SELECTED PRODUCT VIZ BUILDS (MAIN SHOWCASE GALLERY)  */}
      {/* ======================================================== */}
      <section
        className="w-full px-4 sm:px-6 md:px-8 py-16 sm:py-24 border-b border-white/10 bg-black"
        id="product-gallery"
      >
        <div className="mb-8 sm:mb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase font-mono bg-[#4169E1]/10 border border-[#4169E1]/25 text-[#4169E1] mb-3">
            <span>Proven Commercial Track Record</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Selected 3D Product &amp; Commercial Portfolio
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-2.5 sm:mt-3 leading-relaxed font-light text-zinc-300">
            Explore commercial CGI, photoreal product renders, 3D anamorphic billboards, and fluid dynamic animations created by Elipse Studio for leading global brands.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 mt-10 sm:mt-12">
          {PRODUCT_VIZ_BUILDS.map((item, idx) => (
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
                    {item.behanceLink && (
                      <a
                        href={item.behanceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-[#4169E1] hover:bg-[#3158D4] text-white shadow-md hover:shadow-lg hover:shadow-[#4169E1]/30 hover:scale-[1.02] transition-all duration-300 cursor-pointer text-center"
                      >
                        <svg className="w-3.5 h-3.5 text-white fill-current shrink-0" viewBox="0 0 24 24">
                          <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-4.076 0-5.625-3.045-5.625-6.046 0-3.418 1.944-5.954 5.375-5.954 3.737 0 5.099 2.766 4.908 6.136h-7.795c.094 1.797 1.134 3.464 3.271 3.464 1.455 0 2.453-.787 2.871-1.6h2.096zm-7.726-4.5c.083-1.428.983-2.646 2.652-2.646 1.583 0 2.508 1.144 2.585 2.646h-5.237zm-11.456 7.5h-4.544v-16h4.868c2.973 0 5.132 1.411 5.132 4.316 0 1.637-.841 2.915-2.227 3.528 1.761.642 2.771 2.158 2.771 4.148 0 3.208-2.483 4.008-6 4.008zm-2.044-6.877h2.247c1.474 0 2.464-.539 2.464-1.929 0-1.258-.871-1.794-2.246-1.794h-2.465v3.723zm0-5.323h2.122c1.237 0 2.053-.48 2.053-1.639 0-1.121-.77-1.561-1.968-1.561h-2.207v3.2z" />
                        </svg>
                        <span>View on Behance</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
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
            Comprehensive Product Visualization Capabilities
          </p>
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1] text-white">
            Built for E-Commerce, Consumer Tech &amp; Global Advertising
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300">
            From hero packshots and micro-surface closeups to 3D anamorphic billboards and fluid VFX, we supply the complete visual arsenal for high-growth brands.
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
            Our 3D Product Visualization Pipeline
          </h2>
          <p className="text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-light text-zinc-300 max-w-2xl mx-auto">
            From raw CAD optimization to hyperrealistic shader authoring and multi-channel 8K master delivery, our phased process guarantees on-time commercial success.
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'CAD & Engineering Ingestion',
              desc: 'Importing SolidWorks, STEP, Rhino, IGES, and polygon meshes with precision topology cleanup and boundary curve optimization.',
            },
            {
              step: '02',
              title: 'PBR Micro-Surface Crafting',
              desc: 'Calibrating physically accurate roughness, anisotropic brushing, marble veining, fabric sheen, and subsurface scattering.',
            },
            {
              step: '03',
              title: 'Studio Lighting & Cameras',
              desc: 'Bespoke virtual 3-point studio lighting, cinematic depth of field, anamorphic lens flares, and dynamic fluid/particle simulations.',
            },
            {
              step: '04',
              title: '8K Multi-Format Delivery',
              desc: 'Master 8K print TIFFs, 4K 60FPS video reels, transparent packshot bundles, and lightweight USDZ/glTF WebAR assets.',
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
      {/* 6. CLIENT REVIEWS & TESTIMONIALS                         */}
      {/* ======================================================== */}
      <div id="testimonials">
        <ClientReviews />
      </div>

      {/* ======================================================== */}
      {/* 7. CONTACT & SCOPE ESTIMATOR FORM                        */}
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

export default ProductVisualizationPage;
