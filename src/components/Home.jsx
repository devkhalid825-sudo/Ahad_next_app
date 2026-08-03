'use client';

import React, { Suspense, lazy, useMemo, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import Hero from './Hero';
import HeroCTA from './HeroCTA';

// Lazy load sections below the fold
const CaseStudies = lazy(() => import('./CaseStudies'));
const LatestWork = lazy(() => import('./LatestWork'));
const ClientReviews = lazy(() => import('./ClientReviews'));
const Solutions = lazy(() => import('./Solutions'));

const Industries = lazy(() => import('./Industries'));
const Technology = lazy(() => import('./Technology'));
const Process = lazy(() => import('./Process'));
const News = lazy(() => import('./News'));
const SocialMediaSection = lazy(() => import('./SocialMediaSection'));
const Contact = lazy(() => import('./Contact'));
const Footer = lazy(() => import('./Footer'));

const LazySection = ({ children, height = "40vh" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px',
  });

  return (
    <div
      ref={ref}
      style={{
        minHeight: inView ? 'auto' : height,
        contentVisibility: 'auto',
        containIntrinsicSize: `0 ${height}`
      }}
    >
      {children}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <Hero />
      <HeroCTA />
      <LazySection height="60vh">
        <Suspense fallback={<div className="h-[40vh] bg-black animate-pulse" />}>
          <CaseStudies />
        </Suspense>
      </LazySection>

      <LazySection height="60vh">
        <Suspense fallback={<div className="h-[40vh] bg-black animate-pulse" />}>
          <LatestWork />
        </Suspense>
      </LazySection>

      <LazySection height="60vh">
        <Suspense fallback={<div className="h-[40vh] bg-black animate-pulse" />}>
          <ClientReviews />
        </Suspense>
      </LazySection>

      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <Solutions />
        </Suspense>
      </LazySection>

      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <Industries />
        </Suspense>
      </LazySection>

      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <Technology />
        </Suspense>
      </LazySection>

      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <SocialMediaSection />
        </Suspense>
      </LazySection>
      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <News />
        </Suspense>
      </LazySection>

      {/* Lead Magnet — lightweight CTA before full form */}
      <section className="bg-black py-14 md:py-20 px-[15px] md:px-[40px] border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
            Not Ready for a Full Proposal?
          </h2>
          <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mb-5 md:mb-8">
            Get a free sample render or ballpark estimate — no commitment required
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link
              to="/contact"
              data-el-track="get-a-free-estimate-hero"
              className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-10 py-4 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
            >
              Get a Free Estimate
            </Link>
            <a
              href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-07"
              target="_blank"
              rel="noopener noreferrer"
              data-el-track="schedule-quick-call-hero"
              className="inline-block px-10 py-4 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-full text-sm md:text-base font-semibold transition-all"
            >
              Schedule a Quick Call
            </a>
          </div>
        </div>
      </section>

      <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <Contact />
        </Suspense>
      </LazySection>

      {/* <LazySection height="30vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <News />
        </Suspense>
      </LazySection> */}

      <LazySection height="20vh">
        <Suspense fallback={<div className="h-[20vh] bg-black" />}>
          <Footer />
        </Suspense>
      </LazySection>
    </>
  

  );
};

export default Home;
