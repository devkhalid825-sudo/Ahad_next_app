'use client';

import React from 'react';
import logoRaw from '../assets/images/Elipse2.webp';
import brandsImg1Raw from "../assets/images/brandslogo01.webp";
import brandsImg2Raw from "../assets/images/brandslogo02.webp";
import brandsImg3Raw from "../assets/images/brandslogo03.webp";
import brandsImg4Raw from "../assets/images/brandslogo04.webp";
import brandsImg6Raw from "../assets/ElipseImages/logos/logo6.webp";
import brandsImg7Raw from "../assets/ElipseImages/logos/logo7.webp";
import brandsImg8Raw from "../assets/ElipseImages/logos/logo8.webp";
import brandsImg9Raw from "../assets/ElipseImages/logos/logo9.webp";
import brandsImg10Raw from "../assets/ElipseImages/logos/logo10.webp";
import brandsImgStudentLifeRaw from "../assets/ElipseImages/logos/SL.webp";
import brandsImgCarbonRaw from "../assets/ElipseImages/logos/carbon.webp";
import { FiFacebook } from 'react-icons/fi';
import { SiInstagram } from 'react-icons/si';
import { TbBrandLinkedin } from 'react-icons/tb';
import { RiYoutubeLine } from 'react-icons/ri';
import { PiTiktokLogo } from 'react-icons/pi';
import { apiCall, getImgSrc } from '../utils/api';
import { Link } from 'react-router-dom';

const logo = getImgSrc(logoRaw);
const brandsImg1 = getImgSrc(brandsImg1Raw);
const brandsImg2 = getImgSrc(brandsImg2Raw);
const brandsImg3 = getImgSrc(brandsImg3Raw);
const brandsImg4 = getImgSrc(brandsImg4Raw);
const brandsImg6 = getImgSrc(brandsImg6Raw);
const brandsImg7 = getImgSrc(brandsImg7Raw);
const brandsImg8 = getImgSrc(brandsImg8Raw);
const brandsImg9 = getImgSrc(brandsImg9Raw);
const brandsImg10 = getImgSrc(brandsImg10Raw);
const brandsImgStudentLife = getImgSrc(brandsImgStudentLifeRaw);
const brandsImgCarbon = getImgSrc(brandsImgCarbonRaw);

const Footer = () => {
    const [footerEmail, setFooterEmail] = React.useState('');
    const [status, setStatus] = React.useState(''); // 'loading', 'success', 'error'

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
        try {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            document.documentElement.scrollTo({ top: 0, behavior: 'smooth' });
            document.body.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            window.scrollTo(0, 0);
        }
        try {
            document.documentElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
            window.scrollTo(0, 0);
            document.body.scrollTop = 0;
            document.documentElement.scrollTop = 0;
        }
    };
    const socialLinkImages = [
        { img: <FiFacebook />, link: "https://www.facebook.com/elipsestudio", label: "Facebook" },
        { img: <SiInstagram />, link: "https://www.instagram.com/elipse_studio/", label: "Instagram" },
        { img: <TbBrandLinkedin />, link: "https://www.linkedin.com/company/elipse-studioo/posts/?feedView=all", label: "LinkedIn" },
        { img: <RiYoutubeLine />, link: "https://www.youtube.com/@officialelipsestudio", label: "YouTube" },
        { img: <PiTiktokLogo />, link: "https://www.tiktok.com/@elipse_studio?lang=en", label: "TikTok" },
    ]
    const brandsImages = [
        { img: brandsImg1 },
        { img: brandsImg2 },
        { img: brandsImg3 },
        { img: brandsImg4 },
        { img: brandsImg9, className: "brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]" },
        { img: brandsImg6 },
        { img: brandsImg7 },
        { img: brandsImg8 },
        { img: brandsImg10, className: "brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]" },
        { img: brandsImgStudentLife, className: "brightness-0 invert opacity-100 scale-[1.5] md:scale-[1.8]" },
        { img: brandsImgCarbon, className: "opacity-80 hover:opacity-100 scale-[1.5] md:scale-[1.8]" },
    ]
    const displayImages = [...brandsImages, ...brandsImages];

    return (
        <footer className="relative bg-gradient-to-b from-[#0a1628] to-[#1a2a6e] text-white pt-0 pb-12 md:pb-16 font-sans overflow-hidden">
            <div className="w-full px-6 md:px-12">
                <div className="relative w-full overflow-hidden py-6 md:py-10">
                    <div className="animate-marquee-custom flex">
                        {[...brandsImages, ...brandsImages, ...brandsImages, ...brandsImages].map((brand, index) => (
                            <div
                                key={index}
                                className="flex-shrink-0 flex items-center justify-center px-8 md:px-16"
                            >
                                <img
                                    src={brand.img}
                                    alt={`Brand logo ${index}`}
                                    width="120"
                                    height="48"
                                    loading="lazy"
                                    className={`h-8 md:h-12 w-auto object-contain opacity-100 hover:opacity-100 transition-opacity ${brand.className || ''}`}
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
                        placeholder={status === 'success' ? "Subscribed Successfully!" : "Enter your email.."}
                        value={footerEmail}
                        onChange={(e) => setFooterEmail(e.target.value)}
                        className={`bg-white/5 backdrop-blur-md border border-white/50 rounded-full px-8 py-3 w-full sm:w-[500px] md:w-[850px] lg:w-[1000px] focus:outline-none focus:border-[#4169E1] transition-all placeholder:text-white/30 text-sm shadow-inner ${status === 'success' ? 'border-green-400 text-green-400' : ''}`}
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

                <div className="w-full xl:h-72 flex lg:flex-row flex-col justify-between gap-5">

                    <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10 gap-6 mb-16 relative">

                        <div className="col-span-1 flex justify-start sm:justify-start">
                            <a href="#" onClick={scrollToTop} className="cursor-pointer inline-block">
                                <img
                                    src={logo}
                                    alt="Elipse Studio"
                                    width="180"
                                    height="96"
                                    loading="lazy"
                                    className="md:h-24 h-16 w-auto object-contain brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                                />
                            </a>
                        </div>

                        <div className="flex flex-col md:space-y-6 space-y-6">
                            <h3 className="text-white text-sm tracking-[0.2em] border-white/50 inline-block w-fit">Company</h3>
                            <ul className="space-y-2 text-[14px] font-light text-white/80">
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/about">About Us</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/blog">Blogs</Link>
                                </li>
                            </ul>
                        </div>

                        <div className="flex flex-col md:space-y-6 space-y-6">
                            <h3 className="text-white text-sm tracking-[0.2em] border-white/50 inline-block w-fit">Our Services</h3>
                            <ul className="space-y-2 text-[14px] font-light text-white/80">
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services">All Services</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/architectural-visualization">Architectural Visualization</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/3d-product-visualization">3D Product Visualization</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/3d-animation">3D Animation</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/custom-software-development">Custom Software Development</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/website-development">Website Development</Link>
                                </li>
                                <li className="hover:text-white cursor-pointer transition-colors w-fit">
                                    <Link to="/services/mobile-app-development">Mobile App Development</Link>
                                </li>
                            </ul>
                        </div>


                        <div className="flex flex-col justify-between h-full space-y-12">
                            <div>
                                <h3 className="text-white text-sm tracking-[0.2em] mb-4 inline-block w-fit">Contact Us</h3>
                                <div className="text-[14px] font-light leading-relaxed text-white/70 space-y-3">
                                    <p>House no A-08, near Wasim Bagh</p>
                                    <p>Block 13D-3, Gulshan-e-Iqbal</p>
                                    <p>Karachi, 75300</p>
                                    <p className="pt-2 text-white font-medium"><a href="mailto:info@elipsestudio.com" className="hover:text-white transition-colors">info@elipsestudio.com</a></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-1/3 h-full flex flex-col justify-between lg:items-end">
                        <div className="flex flex-col gap-6 lg:items-end">
                            <span className="text-white lg:text-right text-sm tracking-[0.2em] border-white/50 inline-block w-fit">Social</span>
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
                        <a href="#" onClick={scrollToTop} className="flex w-fit xl:mt-0 mt-10 items-center gap-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-full px-8 py-3 text-xs uppercase tracking-widest hover:bg-white/20 transition-all group cursor-pointer text-white no-underline" >
                            Back to top
                            <svg className="w-4 h-4 transition-transform group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </a>
                    </div>
                </div>

                <div className="border-t border-white/50 mt-12 mb-8 w-full"></div>

                <div className="text-center text-[11px] md:text-[13px] text-white tracking-[0.2em] md:tracking-[0.3em] font-light uppercase flex flex-col gap-3 md:gap-4">
                    <span>© Elipse Studio. All rights reserved.</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

