'use client';

import React, { useState, useEffect } from 'react';
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

const Home = ({ initialFeatured, initialProjects, initialReviews, initialBlogs, initialSocialMedia }) => {
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const sections = document.querySelectorAll('[data-animate]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible((prev) => ({ ...prev, [entry.target.dataset.animate]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const animClass = (id) =>
    visible[id] ? 'opacity-100 translate-y-0 transition-all duration-700 ease-out' : 'opacity-0 translate-y-6';

  return (
    <>
      <Hero />
      <HeroCTA />

      <div data-animate="s1" className={animClass('s1')}>
        <CaseStudies initialFeatured={initialFeatured} />
        <LatestWork initialProjects={initialProjects} />
      </div>

      <div data-animate="s2" className={animClass('s2')}>
        <ClientReviews initialReviews={initialReviews} />
        <Solutions />
      </div>

      <div data-animate="s3" className={animClass('s3')}>
        <Industries />
        <Technology />
        <SocialMediaSection initialSocialMedia={initialSocialMedia} />
        <News initialBlogs={initialBlogs} />
      </div>

      <div data-animate="s4" className={animClass('s4')}>
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
                className="inline-block bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 py-2.5 md:px-10 md:py-4 rounded-full text-sm md:text-base font-semibold transition-all shadow-lg shadow-[#4169E1]/30 hover:shadow-[#4169E1]/50 transform hover:-translate-y-0.5"
              >
                Get a Free Estimate
              </Link>
              <a
                href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-2.5 md:px-10 md:py-4 border border-white/20 text-white/80 hover:text-white hover:border-white/40 rounded-full text-sm md:text-base font-semibold transition-all"
              >
                Schedule a Quick Call
              </a>
            </div>
          </div>
        </section>

        <Contact />
        <Footer />
      </div>
    </>
  );
};

export default Home;
