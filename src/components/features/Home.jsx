'use client';

import React from 'react';
import Link from 'next/link';
import Hero from './Hero';
import HeroCTA from './HeroCTA';
import CaseStudies from './CaseStudies';
import LatestWork from './LatestWork';
import ClientReviews from './ClientReviews';
import Solutions from './Solutions';
import Industries from './Industries';
import Technology from './Technology';
import SocialMediaSection from './SocialMediaSection';
import News from './News';
import Contact from './Contact';
import Footer from '../layouts/Footer';

const Home = ({ initialFeatured, initialProjects, initialReviews, initialBlogs }) => {
  return (
    <>
      <Hero />
      <HeroCTA />

      <CaseStudies initialFeatured={initialFeatured} />
      <LatestWork initialProjects={initialProjects} />
      <ClientReviews initialReviews={initialReviews} />
      <Solutions />
      <Industries />
      <Technology />
      <SocialMediaSection />
      <News initialBlogs={initialBlogs} />

      <section className="bg-black py-14 md:py-20 px-[15px] md:px-[40px] border-t border-zinc-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium text-white mb-3 md:mb-4 tracking-tight leading-[1.1]">
            Not Ready for a Full Proposal?
          </h2>
          <p className="text-gray-400 text-xs md:text-base max-w-xl mx-auto mb-5 md:mb-8">
            Get a free sample render or ballpark estimate &mdash; no commitment required
          </p>
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 md:gap-4">
            <Link
              href="/contact"
              className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-10 py-4 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
            >
              Get a Free Estimate
            </Link>
            <a
              href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-10 py-4 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-full text-sm md:text-base font-semibold transition-all"
            >
              Schedule a Quick Call
            </a>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </>
  );
};

export default Home;
