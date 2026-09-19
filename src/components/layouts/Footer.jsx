'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FiFacebook, FiPhone, FiMail, SiInstagram, TbBrandLinkedin, RiYoutubeLine, PiTiktokLogo } from '@/components/ui/Icons';
import { apiCall, getImgSrc } from '@/utils/api';

import logo from '@/assets/images/Elipse2.webp';

const FooterColumn = ({ title, sectionKey, as: Tag = 'div', ariaLabel, isOpen, onToggle, alwaysOpen = false, children }) => {
  if (alwaysOpen) {
    return (
      <Tag aria-label={ariaLabel} className="flex flex-col space-y-3 sm:space-y-4">
        <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
          {title}
        </h2>
        {children}
      </Tag>
    );
  }

  return (
    <Tag
      aria-label={ariaLabel}
      className="flex flex-col border-b border-white/10 pb-4 md:border-none md:pb-0"
    >
      <button
        type="button"
        onClick={() => onToggle(sectionKey)}
        aria-expanded={isOpen}
        className="flex items-center justify-between w-full text-left md:pointer-events-none"
      >
        <h2 className="text-white text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
          {title}
        </h2>
        <span
          aria-hidden="true"
          className="md:hidden flex-shrink-0 w-5 h-5 flex items-center justify-center text-white text-xl leading-none font-light transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)' }}
        >
          +
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out md:!grid-rows-[1fr] md:!opacity-100 ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-3 sm:mt-4' : 'grid-rows-[0fr] opacity-0'
          }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </Tag>
  );
};

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [status, setStatus] = useState('');
  const [openSections, setOpenSections] = useState({});

  const toggleSection = (key) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] to-[#1a2a6e] text-white pt-4 md:pt-6 pb-12 md:pb-16 font-sans overflow-hidden">
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between w-full lg:w-auto gap-4 items-center py-8 md:py-12">
          <span className="text-lg font-light tracking-wide text-white/90">Join our mailing list:</span>
          <input
            type="email"
            aria-label="Email Address for Newsletter"
            placeholder={status === 'success' ? 'Subscribed Successfully!' : 'Enter your email..'}
            value={footerEmail}
            onChange={(e) => setFooterEmail(e.target.value)}
            suppressHydrationWarning
            className={`bg-white/5 backdrop-blur-md border border-white/50 rounded-full px-8 py-3 w-full sm:w-[500px] md:w-[850px] lg:w-[1000px] focus:outline-none focus:border-[#4169E1] transition-all placeholder:text-white/30 text-sm shadow-inner ${status === 'success' ? 'border-green-400 text-green-400' : ''
              }`}
          />
          <button
            onClick={handleFooterSubmit}
            disabled={status === 'loading'}
            suppressHydrationWarning
            className="w-full sm:w-auto bg-[#4169E1] text-white font-bold px-12 py-3 rounded-full hover:bg-[#3558c8] hover:scale-105 transition-all duration-300 text-sm md:text-base whitespace-nowrap disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Submit'}
          </button>
        </div>

        <div className="border-t border-white/50 mb-10 w-full"></div>

        <div className="w-full flex lg:flex-row flex-col justify-between items-start gap-10 lg:gap-8 py-8">
          {/* Left Group: Logo + Nav Columns */}
          <div className="flex flex-col lg:flex-row items-start gap-10 sm:gap-14 lg:gap-16 xl:gap-24">
            {/* Logo on the left */}
            <div className="flex-shrink-0 pt-1">
              <Link href="/" className="inline-block hover:opacity-90 transition-opacity">
                <img
                  src="/assets/logo.webp"
                  alt="Elipse Studio"
                  width="180"
                  height="80"
                  className="h-9 sm:h-11 md:h-12 w-auto object-contain"
                />
              </Link>
            </div>

            {/* Nav & Info Columns: Company, Our Services, Contact Us */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-14 md:gap-16 lg:gap-16 xl:gap-20">
              <FooterColumn
                as="nav"
                ariaLabel="Company"
                title="Company"
                sectionKey="company"
                isOpen={!!openSections.company}
                onToggle={toggleSection}
              >
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
              </FooterColumn>

              <FooterColumn
                as="nav"
                ariaLabel="Our Services"
                title="Our Services"
                sectionKey="services"
                isOpen={!!openSections.services}
                onToggle={toggleSection}
              >
                <ul className="space-y-2 text-[13px] sm:text-[14px] font-light text-white/80">
                  <li className="hover:text-white cursor-pointer transition-colors w-fit">
                    <Link href="/services">All Services</Link>
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors w-fit">
                    <Link href="/services/3d-product-configurators">3D Product Configurators</Link>
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors w-fit">
                    <Link href="/services/architectural-visualization">Real-Time ArchViz & VR</Link>
                  </li>
                  <li className="hover:text-white cursor-pointer transition-colors w-fit">
                    <Link href="/services/3d-product-visualization">Cinematic 3D Product Visuals</Link>
                  </li>
                </ul>
              </FooterColumn>

              <FooterColumn
                title="Contact Us"
                sectionKey="contactUs"
                alwaysOpen
                isOpen={!!openSections.contactUs}
                onToggle={toggleSection}
              >
                <div className="text-[13px] sm:text-[14px] font-light leading-relaxed text-white/70 space-y-2">
                  <p>1812 McCormick Ln</p>
                  <p>Hanover Park, IL 60133</p>
                  <p className="pt-1 text-white/90 font-medium">
                    <a href="tel:+16302970428" className="hover:text-white transition-colors">
                      +1 630-297-0428
                    </a>
                  </p>
                  <p className="pt-0.5 text-white font-medium">
                    <a href="mailto:info@elipsestudio.com" className="hover:text-[#4169E1] transition-colors">
                      info@elipsestudio.com
                    </a>
                  </p>
                </div>
              </FooterColumn>
            </div>
          </div>

          {/* Social and Back to top on the right */}
          <div className="flex flex-col justify-between lg:items-end gap-6 sm:gap-10">
            <div className="flex flex-col gap-4 lg:items-end">
              <span className="text-white lg:text-right text-xs sm:text-sm tracking-[0.2em] uppercase font-medium border-white/50 inline-block w-fit">
                Social
              </span>
              <div className="flex gap-4">
                {socialLinkImages.map((data, i) => (
                  <a
                    href={data.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={data.label}
                    className="text-xl sm:text-2xl hover:text-white transition-colors"
                    key={i}
                  >
                    {data.img}
                  </a>
                ))}
              </div>
            </div>
            <button
              onClick={scrollToTop}
              suppressHydrationWarning
              className="flex w-fit xl:mt-0 mt-4 items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full px-7 py-2.5 sm:px-8 sm:py-3 text-xs uppercase tracking-widest hover:bg-white/20 transition-all group cursor-pointer text-white"
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