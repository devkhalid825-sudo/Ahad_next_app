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

                    {/* No background images, pure premium dark solid background */}
                    <div className="relative z-10 px-5 sm:px-8 md:px-20 w-full flex-1 flex flex-col justify-center pt-24 pb-16 sm:pb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8 md:mb-12"
                        >
                            <h1 className="text-3xl sm:text-5xl md:text-[84px] tracking-tighter leading-[1] sm:leading-[0.9] font-extralight uppercase break-words">
                                <span className="text-white opacity-100 block">Portfolio</span>
                                <span className="text-[#4169E1] opacity-90 block">our work & case studies</span>
                            </h1>
                            <p className="text-white/60 text-sm md:text-base max-w-xl leading-relaxed mt-6">
                                Explore our collection of 3D visualizations, interactive configurators, VR/AR experiences, and walkthrough animations delivered for clients across real estate, automotive, ecommerce, and manufacturing industries worldwide.
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
