'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { getImgSrc } from '../utils/api';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import ClientReviews from './features/ClientReviews';

import heroAboutImgRaw from '../assets/About-page/hero-About.jpg';
import ceoImgRaw from '../assets/ElipseImages/projects/ceo.webp';
import cofounderImgRaw from '../assets/ElipseImages/projects/co-founder.webp';
import clubproImgRaw from '../assets/ElipseImages/projects/clubpro-1.webp';
import steeringImgRaw from '../assets/ElipseImages/projects/Steering-1.webp';
import ahmedImgRaw from '../assets/ElipseImages/hero/15.webp';
import zooImgRaw from '../assets/ElipseImages/projects/0.webp';

const heroAboutImg = getImgSrc(heroAboutImgRaw);
const ceoImg = getImgSrc(ceoImgRaw);
const cofounderImg = getImgSrc(cofounderImgRaw);
const clubproImg = getImgSrc(clubproImgRaw);
const steeringImg = getImgSrc(steeringImgRaw);
const ahmedImg = getImgSrc(ahmedImgRaw);
const zooImg = getImgSrc(zooImgRaw);
const statsData = [
  { label: 'Projects Delivered', value: '250+' },
  { label: 'Global Clients', value: '80+' },
  { label: 'Years Experience', value: '8+' },
  { label: 'Team Members', value: '40+' },
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

const valuesData = [
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Innovation',
    description: 'We push creative and technical boundaries to deliver cutting-edge 3D solutions that redefine what is possible.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 8v4l3 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Precision',
    description: 'Every pixel, model, and interaction is crafted with meticulous attention to detail and technical excellence.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Real-Time Immersion',
    description: 'We specialize in real-time technologies that transform static concepts into living, interactive experiences.',
  },
  {
    icon: (
      <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: 'Client Partnership',
    description: 'We collaborate closely with our clients, treating their vision as our own and delivering beyond expectations.',
  },
];

const teamData = [
  {
    name: 'Bilal Lania',
    role: 'CEO & Co-Founder',
    img: ceoImg,
    description: 'Visionary leader driving Elipse Studio and Ink & Algorithm with a passion for creative technology and immersive digital experiences.',
  },
  {
    name: 'Syed Maaz Ali',
    role: 'Co-Founder & Technical Director',
    img: cofounderImg,
    description: 'Unreal Generalist with expertise in Unreal Engine, 3D Web Configurators, 3ds Max, Maya, and Lumion. Leads technical direction, project management, and on-time delivery of immersive experiences.',
  },
];

  const AboutPage = () => {
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
          className="absolute top-1/2 right-[8%] w-40 h-40 bg-[#4169E1]/5 rounded-full blur-sm hidden md:block"
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
                  About{' '}
                  <span className="text-[#4169E1]">Elipse Studio</span>
                </motion.h1>
              </div>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="mt-8 text-white/50 text-sm md:text-lg font-light max-w-md leading-relaxed"
              >
                A creative tech studio where art meets engineering. Transforming bold ideas into immersive digital experiences that push boundaries.
              </motion.p>

              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.65 }}
                className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4"
              >
                
                <a href="#contact" className="px-8 py-3 md:px-8 md:py-3.5 border border-white/15 text-white/50 text-sm md:text-sm font-medium uppercase tracking-widest rounded-full hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-300 text-center w-full sm:w-auto">
                  Get in Touch
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
                    src={heroAboutImg}
                    alt="Elipse Studio team at work"
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

      {/* ===== CORE VALUES ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1750px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">What We Stand For</span>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Core Values</h2>
          </motion.div>
          <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {valuesData.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-2"
              >
                <span className="text-[#4169E1] inline-block">{value.icon}</span>
                <h3 className="mt-5 md:mt-6 text-lg md:text-2xl font-semibold text-white">{value.title}</h3>
                <p className="mt-3 md:mt-4 text-white/70 text-sm md:text-base font-light leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1750px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Expertise</span>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Our Services</h2>
            <p className="mt-4 md:mt-6 text-white/70 text-base md:text-lg font-light max-w-2xl mx-auto">
              End-to-end creative technology solutions — from concept to execution.
            </p>
          </motion.div>
          <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4169E1]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#4169E1]/20 transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4169E1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M14.5 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V7.5L14.5 2z" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18v-6" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9 15l3-3 3 3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">Animation & Video</h3>
              <p className="mt-2 md:mt-3 text-white/60 text-sm font-light leading-relaxed">Compelling visual storytelling through motion.</p>
              <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/70 text-sm md:text-base font-light">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />3D Animation, Video Animation & Motion Graphics</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />VFX, Character Animation & Commercials</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Video Editing & Post-Production</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4169E1]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#4169E1]/20 transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4169E1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">Interactive Tech & XR</h3>
              <p className="mt-2 md:mt-3 text-white/60 text-sm font-light leading-relaxed">Real-time interactivity across web and immersive platforms.</p>
              <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/70 text-sm md:text-base font-light">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />3D Web-Based Configurators (Unreal Engine, PlayCanvas)</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Real-Time Interactive 3D & WebGL</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />VR (Virtual Reality) & AR (Augmented Reality)</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4169E1]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#4169E1]/20 transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4169E1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">Design & Architecture</h3>
              <p className="mt-2 md:mt-3 text-white/60 text-sm font-light leading-relaxed">Precision-crafted visualizations for the built environment.</p>
              <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/70 text-sm md:text-base font-light">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />3D Architectural Visualization & Walkthroughs</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Interior & Industrial Design Visualization</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Web Design, WordPress & Brand Identity</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#4169E1]/10 flex items-center justify-center mb-4 md:mb-6 group-hover:bg-[#4169E1]/20 transition-colors">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-[#4169E1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-lg md:text-2xl font-semibold text-white group-hover:text-[#4169E1] transition-colors">Marketing & Development</h3>
              <p className="mt-2 md:mt-3 text-white/60 text-sm font-light leading-relaxed">Digital solutions that drive engagement and growth.</p>
              <ul className="mt-4 md:mt-6 space-y-2 md:space-y-3 text-white/70 text-sm md:text-base font-light">
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Web Development & Full-Stack Solutions</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Product & Functional Visualization</li>
                <li className="flex items-start gap-3"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#4169E1] flex-shrink-0" />Advertising, Ad Design & Digital Marketing</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1750px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Portfolio</span>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Featured Projects</h2>
          </motion.div>
          <div className="mt-8 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={clubproImg} alt="Club Pro 3D Configurator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 md:p-8">
                <h3 className="text-lg md:text-2xl font-semibold text-white">Club Pro 3D Configurator</h3>
                <p className="mt-2 md:mt-3 text-white/70 text-sm md:text-base font-light leading-relaxed">
                  Premium interactive 3D configurator built for Club Pro, enabling real-time customization of products with intuitive controls. Customers can explore finishes, materials, and options in a fully immersive browser-based experience powered by Unreal Engine.
                </p>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Unreal Engine</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">WebGL</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Interactive 3D</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={steeringImg} alt="BMW Steering Wheel Configurator" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 md:p-8">
                <h3 className="text-lg md:text-2xl font-semibold text-white">BMW Steering Wheel Configurator</h3>
                <p className="mt-2 md:mt-3 text-white/70 text-sm md:text-base font-light leading-relaxed">
                  PlayCanvas-based custom steering wheel configurator built for Carbon Powered (BMW Group). Enables real-time browser customization of stickers, colors, and textures without any app download — delivering a seamless interactive 3D experience.
                </p>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">PlayCanvas</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">WebGL</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Interactive 3D</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={ahmedImg} alt="Ahmed Foods CGI Commercials" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 md:p-8">
                <h3 className="text-lg md:text-2xl font-semibold text-white">Ahmed Foods CGI Commercials</h3>
                <p className="mt-2 md:mt-3 text-white/70 text-sm md:text-base font-light leading-relaxed">
                  Premium CGI commercial campaign for Ahmed Foods featuring Bombay Biryani, Crystal Jelly, and Jam & Spread range. Each project blends organic CGI assets with AI-assisted workflows — rich food-grade textures, smooth motion design, and cinematic lighting delivered through Maya3D, After Effects, Nuke, and Redshift Render.
                </p>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Maya3D</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Redshift</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">After Effects</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Nuke</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group bg-[#111111] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/5 hover:border-[#4169E1]/30 transition-all duration-500 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img src={zooImg} alt="Lahore Zoo 3D Visualization" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5 md:p-8">
                <h3 className="text-lg md:text-2xl font-semibold text-white">Lahore Zoo 3D Visualization</h3>
                <p className="mt-2 md:mt-3 text-white/70 text-sm md:text-base font-light leading-relaxed">
                  Landmark architectural visualization project for Lahore Zoo / Safari Zoo Lahore (Punjab Govt). The team captured on-ground references and details to rebuild the entire zoo in 3D from scratch — delivered by Rameez Rafiq and the Elipse team with cinematic precision.
                </p>
                <div className="mt-3 md:mt-4 flex flex-wrap gap-2">
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">3ds Max</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">Lumion</span>
                  <span className="inline-block text-[11px] text-[#4169E1] tracking-widest uppercase font-medium bg-[#4169E1]/10 px-3 py-1 rounded-full">ArchViz</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TEAM FOCUS ===== */}
      <section className="py-12 md:py-32 bg-[#0a0a0a] px-5 md:px-16">
        <div className="max-w-[1750px] mx-auto">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <span className="text-[#4169E1] text-xs md:text-sm tracking-[0.3em] uppercase font-medium">Leadership</span>
            <h2 className="mt-4 md:mt-6 text-3xl md:text-6xl font-semibold tracking-tighter">Meet the Founders</h2>
          </motion.div>
          <div className="mt-8 md:mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 lg:gap-12 max-w-5xl mx-auto">
            {teamData.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#1a1a1a] border border-white/5 group-hover:border-[#4169E1]/40 transition-all duration-500 group-hover:scale-[1.02] group-hover:shadow-[0_0_30px_rgba(65,105,225,0.15)]">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <div className="mt-6 text-center">
                  <h3 className="text-lg md:text-xl font-semibold text-white">{member.name}</h3>
                  <p className="mt-1 text-sm text-[#4169E1] font-medium">{member.role}</p>
                  <p className="mt-3 text-white/70 text-sm font-light leading-relaxed max-w-xs mx-auto">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ClientReviews />

      <Contact />
      <Footer />
    </motion.div>
  

  </>

  );
};

export default AboutPage;
