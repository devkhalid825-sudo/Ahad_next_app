'use client';

import React, { useEffect } from 'react';
import { m as motion } from 'framer-motion';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import CaseStudies from './features/CaseStudies';
import LatestWork from './features/LatestWork';
import Contact from './features/Contact';
import { getImgSrc } from '../utils/api';

import casestudyImgRaw from '../assets/About-page/casestudy.webp';

const casestudyImg = getImgSrc(casestudyImgRaw);

const CaseStudiesPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-[#4169E1]/30 selection:text-white overflow-x-hidden">
      <Header />

      {/* ══════════════════════════════════════════════════════════
          HERO SECTION WITH FULL-WIDTH BACKGROUND IMAGE
      ══════════════════════════════════════════════════════════ */}
      <section className="relative w-full min-h-[55vh] sm:min-h-[65vh] md:min-h-[75vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Full-width background image */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={casestudyImg}
            alt="Case Studies Background"
            className="w-full h-full object-cover object-center"
          />
          {/* Elegant Dark Gradient Overlays for High Contrast Readability */}
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/50" />
        </div>

        {/* Ambient subtle blue glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4169E1]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-12 py-32 sm:py-40 md:py-48 flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl"
          >
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white leading-[1.12] uppercase">
              We work with<br />
              amazing clients to<br />
              bring their vision<br />
              to life.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          FEATURED CASE STUDIES SECTION
      ══════════════════════════════════════════════════════════ */}
      <CaseStudies isLight={false} />

      {/* ══════════════════════════════════════════════════════════
          LATEST WORK SECTION
      ══════════════════════════════════════════════════════════ */}
      <LatestWork isLight={false} />

      {/* ══════════════════════════════════════════════════════════
          CONTACT FORM SECTION
      ══════════════════════════════════════════════════════════ */}
      <Contact />

      {/* ══════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════ */}
      <Footer />
    </div>
  );
};

export default CaseStudiesPage;
