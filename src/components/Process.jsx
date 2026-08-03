'use client';

import React from 'react';
import { Link } from 'react-router-dom';

const steps = [
    {
        number: '01',
        title: 'Discovery',
        description: 'A 30-minute call to understand the project, audience, deadline, and what success looks like.'
    },
    {
        number: '02',
        title: 'Reference & Direction',
        description: 'Floor plans, elevations, materials. Senior art director shapes the visual treatment.'
    },
    {
        number: '03',
        title: 'Modelling & Layout',
        description: 'Models built in 3ds Max from CAD. Clay render sign-off before lighting begins.'
    },
    {
        number: '04',
        title: 'Lighting & Render',
        description: 'Photoreal materials, lighting, and final renders or real-time builds delivered in stages.'
    },
    {
        number: '05',
        title: 'Delivery & Iteration',
        description: 'All formats delivered. Two rounds of revisions standard. Dedicated PM on major projects.'
    }
];

const Process = () => {
    return (
        <section id="process" className="pb-8 md:pb-16 pt-8 md:pt-12 bg-black text-white px-6 md:px-16 overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-14 gap-4">
                    <div className="max-w-3xl">
                        <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-3 tracking-tight leading-[1.1]">
                            How We Turn a Brief Into a Sales-Ready Visualization
                        </h2>
                        <p className="text-gray-400 text-sm md:text-base max-w-2xl font-light">
                            From first call to final delivery — a streamlined process built for speed, clarity, and quality.
                        </p>
                    </div>
                    <Link
                        to="/contact"
                        className="bg-[#4169E1] hover:bg-[#3558c8] text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full text-xs md:text-sm font-medium transition-all inline-block shadow-lg shadow-[#4169E1]/20 hover:shadow-[#4169E1]/40 shrink-0"
                    >
                        Start Your Project
                    </Link>
                </div>

                <div className="relative px-0 md:px-4">
                    <div className="hidden lg:block absolute top-[40px] left-[20px] right-[20px] h-[2px] bg-gradient-to-r from-[#4169E1]/40 via-zinc-700 to-[#4169E1]/40" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center lg:items-start text-center lg:text-left gap-4 md:gap-8 group"
                            >
                                <div className="relative">
                                    <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center text-xl font-bold group-hover:bg-[#4169E1] group-hover:text-white transition-all duration-500 shadow-2xl relative z-20 will-change-transform">
                                        {step.number}
                                    </div>
                                </div>
                                <div className="space-y-3 md:space-y-5">
                                    <h3 className="text-lg md:text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-[#4169E1]">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-400 text-[14px] md:text-base leading-relaxed font-light max-w-[250px] mx-auto lg:mx-0">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Process;
