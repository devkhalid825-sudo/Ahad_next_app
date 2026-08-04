'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _animationHero from '../../assets/ElipseImages/projects/Animation.webp';
import _mechanicalImg from '../../assets/ElipseImages/projects/Animation2.webp';
import _processImg from '../../assets/ElipseImages/projects/Animation3.webp';
import _statsImg from '../../assets/ElipseImages/projects/3D-rendering.webp';
import { getImgSrc } from "../../utils/api";
const animationHero = getImgSrc(_animationHero);
const mechanicalImg = getImgSrc(_mechanicalImg);
const processImg = getImgSrc(_processImg);
const statsImg = getImgSrc(_statsImg);

const IndustrialAnimationArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Industrial Animation' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: '3D Mechanical, Process Animation' },
  ];
  const overview = `Professional Industrial Animation is the production of 3D computer-generated animation that visualises complex industrial products, mechanical systems, manufacturing processes, and engineering concepts — making them comprehensible, compelling, and commercially persuasive. At Elipse Studio we build for precision engineering, energy, pharmaceutical, and aerospace clients.`;
  const challenge = `• Industrial animation visualises machinery too large, dangerous, or impossible to film.\n• It translates technical complexity into visual clarity that drives business outcomes.\n• CAD pipelines import directly from SolidWorks, STEP, and IGES for accuracy.`;
  const results = [
    { stat: '85%', label: 'Information Retention', desc: 'Viewers retain the majority of technical content from animation.' },
    { stat: '3X', label: 'Engagement Lift', desc: 'Animated explainers multiply audience engagement.' },
    { stat: '70%', label: 'Watch Before Purchase', desc: 'Most B2B buyers watch video before deciding.' },
  ];
  const process = [
    { step: '01', phase: 'Strategy', title: 'Brief & Creative Direction', desc: 'Defining objectives, target audience, and treatment.' },
    { step: '02', phase: 'Scripting', title: 'Storyboarding & Writing', desc: 'Translating technical accuracy into clear language.' },
    { step: '03', phase: 'Assets', title: 'Modelling & Texturing', desc: 'Building 3D assets with PBR rendering accuracy.' },
    { step: '04', phase: 'Motion', title: 'Animation & Simulation', desc: 'Bringing scenes to life with physics and camera choreography.' },
  ];
  const gallery = [animationHero, mechanicalImg, processImg, statsImg];
    return (
    <>
      
      <AhmedFoodLayout title="Professional Industrial Animation for Your Brand" meta={meta} heroImage={animationHero} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default IndustrialAnimationArticle;
