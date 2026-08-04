'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _mainHeroImage from '../../assets/ElipseImages/blogs/Ar.webp';
import _arImage from '../../assets/ElipseImages/blogs/blogs-Ar.webp';
import _vrImage from '../../assets/ElipseImages/blogs/quest.3.webp';
import _mrImage from '../../assets/ElipseImages/blogs/Auto.webp';
import { getImgSrc } from "../../utils/api";
const mainHeroImage = getImgSrc(_mainHeroImage);
const arImage = getImgSrc(_arImage);
const vrImage = getImgSrc(_vrImage);
const mrImage = getImgSrc(_mrImage);

const ImmersiveTech2026Article = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'AR / VR / MR Solutions' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'Immersive Technology Strategy' },
  ];
  const overview = `In 2026, digital marketing has evolved. Audiences today are drawn toward experiences that place them directly inside the story. AR, VR, and MR are no longer experimental technologies — they are becoming powerful tools for modern branding and communication that deliver higher engagement, stronger emotional connection, and improved retention.`;
  const challenge = `• AR adds digital elements to the real world — highly accessible via smartphones.\n• VR replaces the real world entirely with a simulated, emotionally immersive environment.\n• MR combines physical and digital objects that interact in real time — the peak of spatial computing.`;
  const results = [
    { stat: '70%', label: 'Brand Recall Higher', desc: 'Immersive tech improves brand recall versus traditional media.' },
    { stat: '38%', label: 'Willing to Pay More', desc: 'Consumers pay more after immersive brand experiences.' },
    { stat: '3+', label: 'Core Technologies', desc: 'AR, VR, and MR each serve distinct brand objectives.' },
  ];
  const process = [
    { step: '01', phase: 'Strategy', title: 'Technology Fit', desc: 'Choosing AR, VR, or MR based on campaign goals.' },
    { step: '02', phase: 'Design', title: 'Experience Design', desc: 'Intuitive, emotionally compelling creative aligned to goals.' },
    { step: '03', phase: 'Build', title: 'Development', desc: 'WebXR, Unreal, and AR engineering for any device.' },
    { step: '04', phase: 'Launch', title: 'Deployment', desc: 'Launch and measurement of immersive ROI.' },
  ];
  const gallery = [mainHeroImage, arImage, vrImage, mrImage];
    return (
    <>
      
      <AhmedFoodLayout title="AR vs. VR vs. MR: Transforming Your Brand" meta={meta} heroImage={mainHeroImage} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default ImmersiveTech2026Article;
