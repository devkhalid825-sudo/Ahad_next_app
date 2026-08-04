'use client';

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _jetourImage from '../../assets/ElipseImages/blogs/jetour.webp';
import _kiaImage from '../../assets/ElipseImages/blogs/kia-configrator.webp';
import { getImgSrc } from "../../utils/api";
const jetourImage = getImgSrc(_jetourImage);
const kiaImage = getImgSrc(_kiaImage);

const ConfiguratorArticle = () => {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') return window.innerWidth < 768;
    return false;
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Web Configurator' },
    { label: 'Duration', value: '8–12 weeks' },
    { label: 'Deliverables', value: 'Real-time 3D tool' },
  ];

  const overview = `A web-based configurator is an interactive digital tool embedded directly into a website that allows users to customize a product to their exact specifications. It translates complex product variations — colors, sizes, materials, components, features — into a smooth, visual, and engaging online experience. Unlike static product pages, configurators are dynamic and respond to every user action instantly.`;

  const challenge = `• Businesses that deploy them report higher conversion rates, lower return rates, and significantly improved customer satisfaction.\n• We follow a mobile-first approach, ensuring 3D interactions are fast and intuitive on every smartphone.\n• Built headless to integrate with Shopify, Magento, or custom B2B platforms via APIs.`;

  const results = [
    { stat: '40%', label: 'Average Conversion Increase', desc: 'Customers who engage with a configurator are significantly more likely to purchase.' },
    { stat: '25%', label: 'Reduction in Returns', desc: 'Configurators eliminate surprises by showing exactly what the customer will receive.' },
    { stat: '3x', label: 'Higher Engagement Time', desc: 'Interactive customization keeps users on your site far longer than static pages.' },
  ];

  const process = [
    { step: '01', phase: 'Discovery', title: 'Mapping catalog & logic', desc: 'We audit your product catalog, variations, and business rules to design the configuration logic.' },
    { step: '02', phase: '3D Production', title: 'Photorealistic modeling', desc: 'Every variant is built as a real-time 3D asset with PBR materials and accurate geometry.' },
    { step: '03', phase: 'UX Design', title: 'Guided user journeys', desc: 'We design intuitive, mobile-first flows that make customization effortless for any customer.' },
    { step: '04', phase: 'Integration', title: 'Connecting CRM/ERP', desc: 'Configurators pass exact configuration data into your e-commerce and business systems.' },
    { step: '05', phase: 'Launch', title: 'Optimization & scale', desc: 'We optimize performance and scale the experience across markets and devices.' },
  ];

  const gallery = [jetourImage, kiaImage];

    return (
    <>
      
      <AhmedFoodLayout
        title="Web-Based Configurator"
        meta={meta}
        heroImage={jetourImage}
        overview={overview}
        challenge={challenge}
        results={results}
        process={process}
        gallery={gallery}
      />
    </>
  );
};

export default ConfiguratorArticle;
