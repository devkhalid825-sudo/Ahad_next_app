'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _furnitureHero from '../../assets/ElipseImages/blogs/alnoor1.webp';
import _furnitureDetail from '../../assets/ElipseImages/blogs/alnoor2.webp';
import _interiorView from '../../assets/ElipseImages/blogs/alnoor3.webp';
import _designProcess from '../../assets/ElipseImages/blogs/alnoor4.webp';
import { getImgSrc } from "../../utils/api";
const furnitureHero = getImgSrc(_furnitureHero);
const furnitureDetail = getImgSrc(_furnitureDetail);
const interiorView = getImgSrc(_interiorView);
const designProcess = getImgSrc(_designProcess);

const FurnitureConfiguratorArticle = () => {
  const meta = [
    { label: 'Client', value: 'Al Noor Furniture' },
    { label: 'Service', value: 'Furniture Configurator' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: '3D Configurator, AR Integration' },
  ];
  const overview = `The Al Noor Furniture project showcases how 3D configurator solutions can transform the buying journey. By allowing customers to customize every detail in real-time, brands can build trust and drive higher conversion rates. We prioritized every click to ensure the journey is as premium as the furniture itself.`;
  const challenge = `• A tight integration of 3D rendering and intuitive UI lets users navigate complex customizations with ease.\n• A mobile-first approach ensures premium customization is accessible from any device.\n• High-fidelity textures and lighting ensure the digital product matches physical reality exactly.`;
  const results = [
    { stat: '45%', label: 'Conversion Lift', desc: 'Real-time customization drove a significant conversion increase.' },
    { stat: '100%', label: 'Visual Accuracy', desc: 'Digital product matches the physical furniture exactly.' },
    { stat: '30%', label: 'Return Reduction', desc: 'Customers know what they get, reducing costly returns.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Brief & Strategy', desc: 'Defining the customization scope and brand experience.' },
    { step: '02', phase: '3D Assets', title: 'Asset Optimization', desc: 'High-fidelity models and PBR material development.' },
    { step: '03', phase: 'Engineering', title: 'Configurator Build', desc: 'Rule-based logic and intuitive UI for real-time changes.' },
    { step: '04', phase: 'Launch', title: 'AR & Commerce', desc: 'AR integration and digital commerce deployment.' },
  ];
  const gallery = [furnitureHero, furnitureDetail, interiorView, designProcess];
    return (
    <>
      
      <AhmedFoodLayout title="Configurator Solutions for Custom Furniture Brands" meta={meta} heroImage={furnitureHero} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default FurnitureConfiguratorArticle;
