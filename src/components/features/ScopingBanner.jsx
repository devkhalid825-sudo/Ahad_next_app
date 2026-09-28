'use client';

import React from 'react';
import Link from 'next/link';

export function ScopingBanner() {
  return (
    <section
      className="scoping-banner keep-dark-hero relative w-full text-white py-16 md:py-24 px-6 overflow-hidden border-t border-b border-white/10"
      style={{ backgroundColor: '#050505', color: '#ffffff' }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#4169E1]/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Heading */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-bold tracking-tight leading-[1.2] mb-4"
          style={{ color: '#ffffff' }}
        >
          Have a 3D Brief or CAD Files Ready to Evaluate?
        </h2>

        {/* Description */}
        <p
          className="text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mb-8"
          style={{ color: 'rgba(255, 255, 255, 0.78)' }}
        >
          Book a free 15-minute technical scoping call. We review your files, confirm feasibility, and outline the build timeline.
        </p>

        {/* CTA Button */}
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2.5 bg-[#4169E1] hover:bg-[#3158D4] active:bg-[#2749b5] text-white font-medium text-sm sm:text-base px-8 py-3.5 sm:py-4 rounded-full transition-all duration-300 shadow-[0_4px_25px_rgba(65,105,225,0.35)] hover:shadow-[0_6px_35px_rgba(65,105,225,0.5)] hover:scale-105"
          style={{ color: '#ffffff' }}
        >
          <span>Book a 15-Minute Scoping Call</span>
          <span className="text-base leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </section>
  );
}

export default ScopingBanner;
