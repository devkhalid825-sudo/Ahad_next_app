'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiFacebook, FiPhone, FiMail } from 'react-icons/fi';
import { SiInstagram } from 'react-icons/si';
import { TbBrandLinkedin } from 'react-icons/tb';
import { RiYoutubeLine } from 'react-icons/ri';
import { PiTiktokLogo } from 'react-icons/pi';
import { apiCall, getImgSrc } from '@/utils/api';

import logo from '@/assets/images/Elipse2.webp';
import brandsImg1 from '@/assets/images/brandslogo01.webp';
import brandsImg2 from '@/assets/images/brandslogo02.webp';
import brandsImg3 from '@/assets/images/brandslogo03.webp';
import brandsImg4 from '@/assets/images/brandslogo04.webp';
import brandsImg6 from '@/assets/ElipseImages/logos/logo6.webp';
import brandsImg7 from '@/assets/ElipseImages/logos/logo7.webp';
import brandsImg8 from '@/assets/ElipseImages/logos/logo8.webp';
import brandsImg9 from '@/assets/ElipseImages/logos/logo9.webp';
import brandsImg10 from '@/assets/ElipseImages/logos/logo10.webp';
import brandsImgStudentLife from '@/assets/ElipseImages/logos/SL.webp';
import brandsImgCarbon from '@/assets/ElipseImages/logos/carbon.webp';

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleFooterSubmit = async () => {
    if (!footerEmail) return;
    setStatus('loading');
    const { status: resStatus } = await apiCall('/meetings/join', 'POST', { email: footerEmail });
    if (resStatus === 201) {
      setStatus('success');
      setFooterEmail('');
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus('error');
      setTimeout(() => setStatus(''), 3000);
    }
  };

  const scrollToTop = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinkImages = [
    { img: <FiFacebook />, link: 'https://www.facebook.com/elipsestudio', label: 'Facebook' },
    { img: <SiInstagram />, link: 'https://www.instagram.com/elipse_studio/', label: 'Instagram' },
    {
      img: <TbBrandLinkedin />,
      link: 'https://www.linkedin.com/company/elipse-studioo/posts/?feedView=all',
      label: 'LinkedIn',
    },
    { img: <RiYoutubeLine />, link: 'https://www.youtube.com/@officialelipsestudio', label: 'YouTube' },
    { img: <PiTiktokLogo />, link: 'https://www.tiktok.com/@elipse_studio?lang=en', label: 'TikTok' },
  ];

  const brandsImages = [
    { img: brandsImg1 },
    { img: brandsImg2 },
    { img: brandsImg3 },
    { img: brandsImg4 },
    { img: brandsImg9, className: 'brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]' },
    { img: brandsImg6 },
    { img: brandsImg7 },
    { img: brandsImg8 },
    { img: brandsImg10, className: 'brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]' },
    { img: brandsImgStudentLife, className: 'brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]' },
    { img: brandsImgCarbon, className: 'opacity-80 hover:opacity-100 scale-[1.5] md:scale-[1.8]' },
  ];

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] to-[#1a2a6e] text-white pt-0 pb-12 md:pb-16 font-sans overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="relative w-full overflow-hidden py-6 md:py-10">
          <div className="animate-marquee-custom flex">
            {[...brandsImages, ...brandsImages, ...brandsImages, ...brandsImages].map((brand, index) => (
              <div key={index} className="flex-shrink-0 flex items-center justify-center px-8 md:px-16">
                <img
                  src={typeof brand.img === 'string' ? brand.img : brand.img?.src}
                  alt={`Brand logo ${index}`}
                  width="120"
                  height="48"
                  loading="lazy"
                  className={`h-8 md:h-12 w-auto object-contain opacity-100 hover:opacity-100 transition-opacity ${brand.className || ''
                    }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/50 w-full"></div>

        <div className="flex flex-col md:flex-row justify-between w-full lg:w-auto gap-4 items-center py-8 md:py-12">
          <span className="text-lg font-light tracking-wide text-white/90">Join our mailing list:</span>
          <input
            type="email"
            aria-label="Email Address for Newsletter"
            placeholder={status === 'success' ? 'Subscribed Successfully!' : 'Enter your email..'}
            value={footerEmail}
            onChange={(e) => setFooterEmail(e.target.value)}
            className={`bg-white/5 backdrop-blur-md border border-white/50 rounded-full px-8 py-3 w-full sm:w-[500px] md:w-[850px] lg:w-[1000px] focus:outline-none focus:border-[#4169E1] transition-all placeholder:text-white/30 text-sm shadow-inner ${status === 'success' ? 'border-green-400 text-green-400' : ''
              }`}
          />
          <button
            onClick={handleFooterSubmit}
            disabled={status === 'loading'}
            className="w-full sm:w-auto bg-[#4169E1] text-white font-bold px-12 py-3 rounded-full hover:bg-[#3558c8] hover:scale-105 transition-all duration-300 text-sm md:text-base whitespace-nowrap disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </button>
        </div>

        <div className="border-t border-white/50 mb-10 w-full"></div>

        <div className="w-full flex lg:flex-row flex-col justify-between gap-8 py-8">
          <div className="w-full xl:w-[85%] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-x-6 gap-y-8 relative">
            <nav aria-label="Company" className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                Company
              </h2>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-light text-white/80">
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/about">About Us</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/capabilities">Capabilities</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/portfolio">Portfolio</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/industries">Industries</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/case-studies">Case Studies</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/blog">Blogs</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/contact">Contact</Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Our Services" className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                Our Services
              </h2>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-light text-white/80">
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services">All Services</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/architectural-visualization">Architectural Visualization</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/3d-product-visualization">3D Product Visualization</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/3d-animation">3D Animation</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/custom-software-development">Custom Software Development</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/website-development">Website Development</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                  <Link href="/services/mobile-app-development">Mobile App Development</Link>
                </li>
              </ul>
            </nav>

            {/* Regional / South Asia Column */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                South Asia Operations
              </h2>
              <div className="text-[13px] sm:text-[14px] font-light leading-relaxed text-white/70 space-y-1.5">
                <p>Regional Development Hub</p>
                <p>Worldwide Project Delivery</p>
                <p className="pt-2 text-white/90 font-medium flex flex-col space-y-1">
                  <a href="tel:+923471245257" className="hover:text-white transition-colors">
                    +92 3471245257
                  </a>
                  <a href="tel:+923323141556" className="hover:text-white transition-colors">
                    +92 3323141556
                  </a>
                </p>
                <p className="pt-1 text-white font-medium break-all sm:break-normal">
                  <a href="mailto:info@elipsestudio.com" className="hover:text-white transition-colors">
                    info@elipsestudio.com
                  </a>
                </p>
              </div>
            </div>

            {/* United States Column */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                United States
              </h2>
              <div className="text-[13px] sm:text-[14px] font-light leading-relaxed text-white/70 space-y-1.5">
                <p>1812 McCormick Ln</p>
                <p>Hanover Park, IL 60133</p>
                <p>United States</p>
                <p className="pt-2 text-white/90 font-medium flex flex-col space-y-1">
                  <a href="tel:+16302970428" className="hover:text-white transition-colors">
                    +1 630-297-0428
                  </a>
                </p>
              </div>
            </div>

            {/* United Kingdom Column */}
            <div className="flex flex-col space-y-3 sm:space-y-4">
              <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                United Kingdom
              </h2>
              <div className="text-[13px] sm:text-[14px] font-light leading-relaxed text-white/70 space-y-1.5">
                <p>Elipse Studio UK</p>
                <p>London, United Kingdom</p>
                <p className="pt-2 text-white/90 font-medium flex flex-col space-y-1">
                  <a href="tel:+442046343117" className="hover:text-white transition-colors">
                    +44 20 4634 3117
                  </a>
                </p>
                <p className="pt-1 text-white font-medium break-all sm:break-normal">

                </p>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/5 flex flex-col justify-between lg:items-end gap-6">
            <div className="flex flex-col gap-4 lg:items-end">
              <span className="text-white lg:text-right text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                Social
              </span>
              <div className="flex gap-4">
                {socialLinkImages.map((data, i) => (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={data.label}
                    className="text-2xl hover:text-white transition-colors"
                    key={i}
                  >
                    {data.img}
                  </a>
                ))}
              </div>
            </div>
            <button
              onClick={scrollToTop}
              className="flex w-fit xl:mt-0 mt-6 items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 text-xs uppercase tracking-widest hover:bg-white/20 transition-all group cursor-pointer text-white"
            >
              Back to top
              <svg
                className="w-4 h-4 transition-transform group-hover:-translate-y-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="border-t border-white/50 mt-8 mb-8 w-full"></div>

        <div className="text-center text-[11px] md:text-[13px] text-white tracking-[0.2em] md:tracking-[0.3em] font-light uppercase flex flex-col gap-3 md:gap-4">
          <span>© Elipse Studio. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;