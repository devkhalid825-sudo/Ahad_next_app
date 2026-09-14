'use client';

import React, { useEffect, useState, useRef } from 'react';
import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import { getImgSrc } from '../utils/api';

import capabilitiesHeroImgRaw from '../assets/About-page/capabilities.webp';
import capabilitiesSecImgRaw from '../assets/costom-software/xyz.webp';

const capabilitiesHeroImg = getImgSrc(capabilitiesHeroImgRaw);
const capabilitiesSecImg = getImgSrc(capabilitiesSecImgRaw);

const statsData = [
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Global Clients', value: '80+' },
  { label: 'Years Experience', value: '8+' },
  { label: 'Industries Served', value: '12+' },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const num = parseInt(value);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setHasAnimated(true);
        const duration = 2000;
        const steps = 60;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) {
            setCount(num);
            clearInterval(timer);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [num, hasAnimated]);

  return <span ref={ref}>{hasAnimated ? count : 0}{suffix || (value.includes('+') ? '+' : '')}</span>;
};

// Three enterprise pillars
const capabilitiesData = [
  {
    pillarNumber: '01',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Interactive 3D Configurators',
    description: 'Real-time web-based product configurators that let buyers customize, preview, and purchase — built with Unreal Engine, PlayCanvas, and WebGL for any platform.',
    features: [
      'Automotive & Transport Configurators',
      'Furniture & Product Customizers',
      'Real Estate Customization Tools',
      'Interactive Web Experiences',
      'Virtual Showrooms & Digital Twins',
      'Multi-Platform & E-Commerce Integration',
    ],
  },
  {
    pillarNumber: '02',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time ArchViz & Spatial VR/AR',
    description: 'Photorealistic architectural visualization, immersive VR walkthroughs, and AR spatial overlays for real estate, hospitality, retail, and enterprise.',
    features: [
      'Exterior & Interior Rendering',
      'Day/Night & Seasonal Variations',
      'Interactive Virtual Tours',
      'VR Showrooms & Walkthroughs',
      'AR Product & Space Previews',
      'Multi-User VR Environments',
    ],
  },
  {
    pillarNumber: '03',
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <polygon points="10 8 16 12 10 16 10 8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Cinematic 3D Product & Commercial Visuals',
    description: 'Hero-quality product renders, photorealistic 3D animation, and cinematic CGI for product launches, brand campaigns, and e-commerce at scale.',
    features: [
      'Photorealistic Product Renders & 360° Spins',
      'Lifestyle & Context Shots',
      '3D Product Animation & Hero Videos',
      'CGI Commercials & VFX',
      'Motion Graphics & Explainer Videos',
      'Virtual Production & Compositing',
    ],
  },
];

const processData = [
  {
    number: '01',
    title: 'Discovery & Strategy',
    description: 'We dive deep into your brand, audience, and goals. Through research and collaborative workshops, we define the scope, timeline, and technical roadmap for your project.',
  },
  {
    number: '02',
    title: 'Design & Prototyping',
    description: 'Our creative team crafts concepts, wireframes, and interactive prototypes. We iterate rapidly, presenting visual directions and gathering feedback to refine every detail.',
  },
  {
    number: '03',
    title: 'Development & Production',
    description: 'Using cutting-edge tools — Unreal Engine, PlayCanvas, Maya, React — we build, animate, and render your project with technical precision and artistic excellence.',
  },
  {
    number: '04',
    title: 'Delivery & Optimization',
    description: 'We deploy, test, and optimize across all target platforms. Post-launch support ensures your experience remains smooth, fast, and future-proof.',
  },
];

const techData = [
  { name: 'Unreal Engine', category: 'Real-Time 3D' },
  { name: 'PlayCanvas', category: 'WebGL Configurators' },
  { name: 'Three.js / WebGL', category: 'Interactive 3D' },
  { name: 'Maya 3D', category: '3D Modeling' },
  { name: '3ds Max', category: 'ArchViz' },
  { name: 'Blender', category: '3D Modeling' },
  { name: 'Lumion', category: 'Visualization' },
  { name: 'Redshift', category: 'Rendering' },
  { name: 'V-Ray', category: 'Rendering' },
  { name: 'After Effects', category: 'Motion Design' },
  { name: 'Nuke', category: 'VFX & Compositing' },
  { name: 'DaVinci Resolve', category: 'Post-Production' },
];

const CapabilitiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="bg-gradient-to-b from-[#0a0a0a] via-[#000000] to-[#0a0a0a] text-white min-h-screen font-sans"
      >
        {/* ===== HERO SECTION ===== */}
        <section className="relative min-h-[600px] md:min-h-[700px] lg:min-h-screen overflow-hidden bg-black">
          <Header />

          <div className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />

          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute top-32 right-[15%] w-20 h-20 border border-white/5 rounded-lg hidden md:block"
          />
          <motion.div
            animate={{ y: [0, 30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            className="absolute bottom-40 left-[10%] w-16 h-16 border border-white/5 rounded-full hidden md:block"
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute top-1/3 right-[8%] w-40 h-40 bg-[#4169E1]/5 rounded-full blur-sm hidden md:block"
          />

          <div className="relative z-10 min-h-[600px] md:min-h-[700px] lg:h-screen flex items-center px-5 md:px-16 lg:px-24 py-24 md:py-0">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">

                <div className="overflow-hidden mt-3">
                  <motion.h1
                    initial={{ y: 80 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="text-[clamp(2.5rem,6vw,6.5rem)] font-semibold tracking-tighter leading-none text-white"
                  >
                    Our{' '}
                    <span className="text-[#4169E1]">Capabilities</span>
                  </motion.h1>
                </div>

                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="mt-8 text-white/50 text-sm md:text-lg font-light max-w-md leading-relaxed"
                >
                  Enterprise-grade 3D experiences — interactive configurators, real-time ArchViz & spatial VR/AR, and cinematic product visuals that convert.
                </motion.p>

                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.65 }}
                  className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4"
                >
                  <Link to="/contact" data-el-track="get-in-touch-capabilities-hero" className="relative px-8 py-3 md:px-8 md:py-3.5 bg-[#4169E1] text-white text-sm md:text-sm font-medium uppercase tracking-widest rounded-full hover:bg-[#3a5ecc] transition-all duration-300 text-center w-full sm:w-auto">
                    Start Your Project
                  </Link>
                  <a href="#capabilities" className="px-8 py-3 md:px-8 md:py-3.5 border border-white/15 text-white/50 text-sm md:text-sm font-medium uppercase tracking-widest rounded-full hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300 text-center w-full sm:w-auto">
                    Explore Services
                  </a>
                </motion.div>

                <motion.div
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  className="mt-8 md:mt-14 pt-6 md:pt-8 border-t border-white/[0.04] w-full"
                >
                  <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-4 md:gap-x-14 md:gap-y-5">
                    {statsData.map((stat) => (
                      <div key={stat.label}>
                        <span className="text-xl md:text-[2rem] font-bold text-white tabular-nums tracking-tight">
                          <AnimatedCounter value={stat.value} />
                        </span>
                        <p className="mt-1 text-[10px] tracking-[0.2em] uppercase text-white/35 font-medium">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-6 hidden lg:block relative">
                <motion.div
                  initial={{ x: 60, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-full h-full"
                >
                  <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] w-full h-[400px] sm:h-[500px] lg:h-[600px] xl:h-[680px]">
                    <img
                      src={capabilitiesHeroImg}
                      alt="Elipse Studio capabilities"
                      width="800"
                      height="680"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          >
            <motion.svg
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="w-4 h-4 text-white/15"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </motion.svg>
          </motion.div>
        </section>

        {/* ===== INTRO / OVERVIEW ===== */}
        <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Our Expertise</span>
                <h2 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tighter leading-none">
                  Three Pillars of <br />3D Excellence
                </h2>
                <p className="mt-8 text-white/80 text-lg md:text-xl font-light leading-relaxed">
                  Elipse Studio delivers enterprise-grade 3D experiences across three focused practice areas: interactive
                  real-time configurators, photorealistic architectural visualization with VR/AR, and cinematic product
                  &amp; commercial visuals. Every project is driven by our 40+ specialist team and built to perform.
                </p>
                <p className="mt-6 text-white/80 text-lg md:text-xl font-light leading-relaxed">
                  From a web-based product configurator that drives e-commerce conversions, to a VR walkthrough that
                  closes real estate deals, to a CGI commercial that wins attention — we focus exclusively on 3D
                  disciplines where we deliver world-class results.
                </p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-10"
                >
                  <Link to="/contact"
                    className="bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-base font-medium transition-all inline-block shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40"
                  >
                    Discuss Your Project
                  </Link>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ x: 40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className=" overflow-hidden shadow-2xl aspect-[4/3]"
              >
                <img
                  src={capabilitiesSecImg}
                  alt="Elipse Studio team workspace — creative technology and 3D design studio"
                  width="800"
                  height="600"
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CORE CAPABILITIES ===== */}
        <section id="capabilities" className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">What We Do</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Our Three Enterprise Pillars</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                Focused expertise in the three 3D disciplines that deliver measurable business impact.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {capabilitiesData.map((cap, index) => (
                <motion.div
                  key={cap.title}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-2 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#4169E1]/40 text-xs font-bold tracking-[0.25em] uppercase">Pillar {cap.pillarNumber}</span>
                  </div>
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#4169E1]/10 flex items-center justify-center group-hover:bg-[#4169E1]/20 transition-colors">
                    <span className="text-[#4169E1]">{cap.icon}</span>
                  </div>
                  <h3 className="mt-5 md:mt-6 text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">{cap.title}</h3>
                  <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed flex-1">{cap.description}</p>
                  <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/60 text-sm font-light border-t border-white/5 pt-4 md:pt-6">
                    {cap.features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== OUR PROCESS ===== */}
        <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">How We Work</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Our Process</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                A proven methodology that ensures every project is delivered on time, on budget, and beyond expectations.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {processData.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="relative h-full"
                >
                  <div className="text-[3rem] md:text-[5rem] font-bold text-white/[0.04] leading-none -mb-4 md:-mb-6 select-none">
                    {step.number}
                  </div>
                  <div className="relative bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 min-h-[200px] md:min-h-[220px] h-full flex flex-col">
                    <span className="text-[#4169E1] text-sm font-bold tracking-widest">{step.number}</span>
                    <h3 className="mt-3 md:mt-4 text-lg md:text-2xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed flex-1">{step.description}</p>
                  </div>
                  {index < processData.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 z-10">
                      <svg className="w-6 h-6 text-white/10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== TECHNOLOGIES ===== */}
        <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
          <div className="max-w-[1750px] mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Technology</span>
              <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Tools &amp; Technologies</h2>
              <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
                Industry-leading software and frameworks powering every project we deliver.
              </p>
            </motion.div>
            <div className="mt-8 md:mt-16 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-5 lg:gap-6">
              {techData.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group bg-[#111111] rounded-2xl p-6 md:p-8 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 text-center hover:-translate-y-1"
                >
                  <h3 className="text-sm md:text-base font-semibold text-white/90 group-hover:text-[#4169E1] transition-colors">{tech.name}</h3>
                  <p className="mt-2 text-[10px] tracking-[0.2em] uppercase text-white/30 font-medium">{tech.category}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA SECTION ===== */}
        <section className="py-10 md:py-20 bg-black px-5 md:px-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
                Ready to Bring Your Vision to Life?
              </h2>
              <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mb-5 md:mb-8 font-light">
                Let&apos;s discuss how our capabilities can transform your next project into an immersive digital experience.
              </p>
              <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
                <Link to="/contact"
                  data-el-track="start-your-project-capabilities"
                  className="bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-base font-medium transition-all inline-block shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40"
                >
                  Start Your Project
                </Link>
                <a
                  href="https://calendly.com/elipsestudio"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-el-track="schedule-call-capabilities"
                  className="text-white/70 hover:text-white border border-white/20 hover:border-white/40 px-6 md:px-8 py-2.5 md:py-3 rounded-full transition-all text-xs md:text-base font-medium"
                >
                  Schedule a Call
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        <Contact />
        <Footer />
      </motion.div>

    </>

  );
};

export default CapabilitiesPage;
