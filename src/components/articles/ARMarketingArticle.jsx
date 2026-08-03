'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _arHeroImage from '../../assets/ElipseImages/blogs/Ar-one.webp';
import _techImage from '../../assets/ElipseImages/blogs/Ar-two.webp';
import _typesImage from '../../assets/ElipseImages/blogs/Ar.webp';
import _furnitureImg from '../../assets/ElipseImages/blogs/alnoor.webp';
import { getImgSrc } from "../../utils/api";
const arHeroImage = getImgSrc(_arHeroImage);
const techImage = getImgSrc(_techImage);
const typesImage = getImgSrc(_typesImage);
const furnitureImg = getImgSrc(_furnitureImg);

const ARMarketingArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'AR Marketing' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'WebAR, AR Try-On, Campaigns' },
  ];
  const overview = `Augmented Reality (AR) marketing is the practice of blending digital content with the user's real-world environment, in real time, through a screen or headset. In 2026, three converging forces — 5G proliferation, mature WebAR technology, and a generation expecting interactive experiences — make AR the pivotal year for immersive brand engagement.`;
  const challenge = `• AR must be frictionless — WebAR removes the app-download barrier for 95% of smartphone users.\n• Once a customer visualizes a product in their space, they feel psychological ownership.\n• Brands seeing the strongest ROI share deep integration, effortless WebAR, and rigorous KPI measurement.`;
  const results = [
    { stat: '$198B', label: 'Global Market Size', desc: 'The projected global AR market size by 2026.' },
    { stat: '70%', label: 'Purchase Intent Increase', desc: 'AR experiences significantly lift purchase intent.' },
    { stat: '4X', label: 'Engagement vs Ads', desc: 'AR drives four times the engagement of standard ads.' },
  ];
  const process = [
    { step: '01', phase: 'Strategy', title: 'Strategy', desc: 'Defining business objectives and audience context.' },
    { step: '02', phase: '3D Assets', title: '3D Assets', desc: 'Photorealistic modeling with PBR workflows.' },
    { step: '03', phase: 'AR Dev', title: 'AR Dev', desc: 'Engineering with WebXR, Three.js, and 8th Wall.' },
    { step: '04', phase: 'Launch', title: 'Launch', desc: 'Integration with CRM and real-time analytics.' },
  ];
  const gallery = [arHeroImage, techImage, typesImage, furnitureImg];
    return (
    <>
      
      <AhmedFoodLayout title="What Is Immersive AR Marketing?" meta={meta} heroImage={arHeroImage} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default ARMarketingArticle;
