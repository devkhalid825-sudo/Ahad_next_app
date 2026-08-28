'use client';

import React, { useEffect } from 'react';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import LatestWork from './features/LatestWork';
import Contact from './features/Contact';
import CaseStudies from './features/CaseStudies';
import { motion } from 'framer-motion';

const PortfolioPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (

    <>

        

        <div className="bg-white min-h-screen text-black font-sans selection:bg-[#4169E1]/20 selection:text-black overflow-x-hidden">

            {/* HERO SECTION */}
            <section className="relative w-full bg-white ">
                <div className="relative mx-auto min-h-[50vh] md:min-h-[60vh] w-full overflow-hidden bg-black rounded-none shadow-2xl flex flex-col p-4 md:p-8">
                    <Header />

                    {/* Hero Content */}
                    <div className="relative z-10 px-5 sm:px-8 md:px-14 lg:px-16 w-full flex-1 flex flex-col justify-center items-center text-center pt-24 pb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="max-w-xl mx-auto flex flex-col items-center"
                        >
                            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[50px] font-medium tracking-tight leading-[1.15] uppercase mb-4">
                                <span className="text-white block">Portfolio</span>
                                <span className="text-[#4169E1] block mt-1">Our Work &amp; Case Studies</span>
                            </h1>

                            <p className="text-white/65 text-xs sm:text-sm md:text-base leading-relaxed max-w-lg mx-auto font-normal">
                                Real results from real projects. See how we help property developers, automotive brands, and ecommerce companies increase engagement, reduce returns, and accelerate sales through immersive 3D, VR, and interactive configurator solutions.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURED CASE STUDIES */}
            <CaseStudies isLight={true} />

            {/* LATEST WORK INTEGRATION */}
            <LatestWork isLight={true} />

            {/* CONTACT & FOOTER SECTIONS */}
            <Contact />
            <Footer />
        </div>
    

    </>

    );
};

export default PortfolioPage;
