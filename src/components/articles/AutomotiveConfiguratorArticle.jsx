'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _volvoImage from '../../assets/ElipseImages/hero/volve-configrator.webp';
import _autoImage from '../../assets/ElipseImages/blogs/Auto.webp';
import _configuratorHero from '../../assets/ElipseImages/blogs/jetour.webp';
import _workflowImage from '../../assets/ElipseImages/blogs/workflow.webp';
import { getImgSrc } from "../../utils/api";
const volvoImage = getImgSrc(_volvoImage);
const autoImage = getImgSrc(_autoImage);
const configuratorHero = getImgSrc(_configuratorHero);
const workflowImage = getImgSrc(_workflowImage);

const AutomotiveConfiguratorArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Automotive Configurator' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'Real-Time 3D, VR/AR Showroom' },
  ];
  const overview = `Modern automotive configurators are immersive, interactive showrooms that live inside a browser or a headset. Powered by real-time 3D rendering, physically based materials, and cinematic lighting, they let customers build their dream vehicle in photorealistic detail — without ever setting foot in a dealership.`;
  const challenge = `• The moment of friction between imagination and reality is the problem configurators solve.\n• Real-time rendering with PBR materials makes the digital product match physical reality exactly.\n• VR showrooms and AR visualization let customers experience a vehicle at full scale in their own space.`;
  const results = [
    { stat: '40%', label: 'AOV Increase', desc: 'Configurators lift average order value through visible upgrades.' },
    { stat: '3X', label: 'Engagement', desc: 'Interactive showrooms multiply time spent with the product.' },
    { stat: '25%', label: 'Regret Reduction', desc: 'Accurate materials eliminate the expectation gap at delivery.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Discovery', desc: 'Defining brand objectives and the configuration scope.' },
    { step: '02', phase: '3D Assets', title: '3D Asset Production', desc: 'High-fidelity modeling and physically based materials.' },
    { step: '03', phase: 'Engineering', title: 'Real-Time Engine', desc: 'WebGPU streaming and ray-traced rendering for any device.' },
    { step: '04', phase: 'Launch', title: 'VR/AR Launch', desc: 'Immersive showroom and WebAR vehicle visualization.' },
  ];
  const gallery = [volvoImage, autoImage, configuratorHero, workflowImage];
    return (
    <>
      
      <AhmedFoodLayout title="Redefining the Car Buying Experience" meta={meta} heroImage={volvoImage} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default AutomotiveConfiguratorArticle;
