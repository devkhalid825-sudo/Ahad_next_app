'use client';

import React from 'react';
import Link from 'next/link';

const HeroCTA = () => {
  return (
    <section className="bg-black px-[15px] py-3 md:hidden">
      <div className="flex justify-start w-full">
        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 bg-[#4169E1] hover:bg-[#3558c8] active:bg-[#2e4fba] text-white font-medium text-base md:text-xl lg:text-2xl tracking-wide rounded-full px-5 py-2 md:px-6 md:py-3 transition-all duration-300 shadow-md shadow-[#4169E1]/20"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 md:w-5 md:h-5 shrink-0"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Contact Us</span>
        </Link>
      </div>
    </section>
  );
};

export default HeroCTA;
