﻿'use client';

import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import IndustryLayout from './IndustryLayout';

const IndustryPage = () => {
    const { slug } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        import('../data/industriesData.js').then(mod => {
            const found = mod.industriesData.find(ind => ind.slug === slug);
            setData(found);
        });
    }, [slug]);

    if (!data) {
        return (
            <div className="h-screen bg-black flex items-center justify-center text-white text-2xl font-bold tracking-widest animate-pulse">
                Elipse Studio
            </div>
        );
    }

    return <IndustryLayout {...data} />;
};

export default IndustryPage;
