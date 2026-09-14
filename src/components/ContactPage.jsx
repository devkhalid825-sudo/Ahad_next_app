'use client';

import React, { useEffect } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import ContactForm from './ContactForm';

import { getImgSrc } from '../utils/api';
import { m as motion } from 'framer-motion';

import buildingImgRaw from '../assets/images/Background-Image.webp';
const buildingImg = getImgSrc(buildingImgRaw);

const ContactPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-black text-white min-h-screen"
        >
            <Header />

            {/* SECTION 1: CONNECT WITH US */}
            <section className="pt-32 md:pt-40 pb-24 px-6 md:px-16 max-w-[1750px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-start">
                    {/* Left side text */}
                    <div className="flex flex-col justify-center items-center lg:items-start h-full pt-8 lg:pt-6 pb-12 xl:pb-0">
                        <h1 className="text-[#4169E1] text-4xl md:text-[52px] font-bold tracking-tight leading-[1.1] mb-8">
                            Schedule a<br />15-Minute Technical<br />Scoping Call
                        </h1>
                        <p className="text-gray-200 text-lg md:text-[21px] font-light leading-relaxed text-left">
                            Tell us what you&apos;re building and get a realistic timeline, budget ballpark, and a clear go/
                            no-go recommendation — no spam, no pressure.
                        </p>
                    </div>

                    {/* Right side form card */}
                    <ContactForm />
                </div>
            </section>

            {/* SECTION 2: LOCATION & ABOUT */}
            <section className="py-24 bg-black">
                <div className="max-w-[1750px] mx-auto px-6 text-center mb-24">
                    <h2 className="text-4xl md:text-[64px] font-medium tracking-tight leading-[1.05]">
                        All Over the World.<br />
                        Wherever the Work Takes Us.
                    </h2>
                </div>

                <div className="max-w-[1750px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Image with Watermark */}
                    <div className="relative overflow-hidden aspect-[4/3] shadow-2xl">
                        <img
                            src={buildingImg}
                            alt="Elipse Studio"
                            width="800"
                            height="600"
                            className="w-full h-full object-cover brightness-[0.7]"
                        />
                        <div className="absolute top-8 left-8 md:top-12 md:left-12">
                            <span className="text-yellow-400 text-3xl md:text-5xl font-black italic tracking-tighter drop-shadow-lg">
                                ELIPSE STUDIO
                            </span>
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-8 text-gray-300 text-base md:text-[18px] leading-relaxed">
                        <p>
                            We are a creatively led technology company specializing in XR, 3D visualization, and immersive digital experiences.
                            Founded in 2021, we partner with brands to bring bold ideas to life through emerging technology.
                        </p>
                        <p>
                            Our team of accomplished artists and thoughtful engineers leverage emerging technologies and proven processes
                            to produce innovative and creative solutions for today&apos;s digitally connected brands and consumers.
                        </p>
                        <p>
                            We are based across the US, UK, and South Asia, with our team spread around the globe. Throughout our history, we&apos;ve
                            maintained a unique vision to inspire, engage, and entertain by bringing our imagination to life.
                        </p>
                        <p className="text-white italic font-bold">Let us inspire you.</p>
                    </div>
                </div>
            </section>

            <Footer />
        </motion.div>
        </>
    );
};

export default ContactPage;
