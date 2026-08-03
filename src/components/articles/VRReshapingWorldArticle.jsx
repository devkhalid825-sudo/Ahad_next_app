'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _vrHeroImage from '../../assets/ElipseImages/projects/VR1.webp';
import _vrSecondaryImage from '../../assets/ElipseImages/blogs/Ar-two.webp';
import _vrTertiaryImage from '../../assets/ElipseImages/blogs/Ar-one.webp';
import { getImgSrc } from "../../utils/api";
const vrHeroImage = getImgSrc(_vrHeroImage);
const vrSecondaryImage = getImgSrc(_vrSecondaryImage);
const vrTertiaryImage = getImgSrc(_vrTertiaryImage);

const VRReshapingWorldArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Virtual Reality' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'VR Training, Walkthroughs, Showrooms' },
  ];
  const overview = `Virtual reality has been on the cultural horizon for decades, but the corner has finally been turned. Headsets are lighter, visuals are sharper, and the applications span entertainment, healthcare, design, and architecture. At Elipse Studio, virtual reality sits at the heart of what we do — building immersive experiences no other medium can match.`;
  const challenge = `• Presence is a measurable state where the brain accepts the synthetic environment as real.\n• Spatial audio is as important to presence as visual fidelity.\n• The most intuitive VR maps to natural human behavior — reaching, walking, gesturing.`;
  const results = [
    { stat: '60%', label: 'Training Cost Reduction', desc: 'VR cuts the cost of high-stakes training dramatically.' },
    { stat: '40%', label: 'Faster Skills', desc: 'Learners acquire skills faster in immersive environments.' },
    { stat: '85%', label: 'Retention Improvement', desc: 'VR significantly improves knowledge retention.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Use-Case Definition', desc: 'Identifying where VR delivers the strongest return.' },
    { step: '02', phase: 'Design', title: 'World & Interaction Design', desc: 'Environmental storytelling and natural UX paradigms.' },
    { step: '03', phase: 'Engineering', title: 'Engine Build', desc: 'Unreal Engine 5 PBR and spatial audio integration.' },
    { step: '04', phase: 'Deploy', title: 'Deployment', desc: 'Headset, PC VR, and WebXR rollout with analytics.' },
  ];
  const gallery = [vrHeroImage, vrSecondaryImage, vrTertiaryImage];
    return (
    <>
      
      <AhmedFoodLayout title="How Virtual Reality Is Reshaping the Way We Work" meta={meta} heroImage={vrHeroImage} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default VRReshapingWorldArticle;
