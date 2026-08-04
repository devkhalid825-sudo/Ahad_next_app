'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _questImg from '../../assets/ElipseImages/blogs/quest.3.webp';
import _arImg from '../../assets/ElipseImages/blogs/blogs-Ar.webp';
import { getImgSrc } from "../../utils/api";
const questImg = getImgSrc(_questImg);
const arImg = getImgSrc(_arImg);

const ImmersiveExperienceArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Immersive Experience Design' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'VR, AR, Interactive 3D' },
  ];
  const overview = `Immersive experience design is not a technology strategy — it is a human attention strategy that happens to be powered by extraordinary technology. It commands attention by wrapping people inside an experience that engages their senses, and at Elipse Studio we build virtual reality environments, augmented reality activations, and interactive digital experiences for brands.`;
  const challenge = `• Presence: the degree to which a person feels inside an experience rather than watching it.\n• Emotion: immersive experiences generate awe and delight with depth flat screens cannot match.\n• Interaction: transforming the audience from observer to active participant-partner.`;
  const results = [
    { stat: '+35%', label: 'Conversion Lift (3D)', desc: '3D immersive experiences lift conversion on average.' },
    { stat: '−25%', label: 'Return Rate (AR)', desc: 'AR visualization reduces return rates significantly.' },
    { stat: '+3.4X', label: 'Session Duration', desc: 'Average session duration increases through immersion.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Human Need', desc: 'Starting with the human need and desired emotional outcome.' },
    { step: '02', phase: 'Craft', title: 'Relentless Craft', desc: 'Perfecting every texture, light response, and audio cue.' },
    { step: '03', phase: 'Access', title: 'Accessibility', desc: 'Planning delivery so the experience reaches the audience.' },
    { step: '04', phase: 'Build', title: 'Build & Measure', desc: 'Defining measurable ROI outcomes before production.' },
  ];
  const gallery = [questImg, arImg];
    return (
    <>
      
      <AhmedFoodLayout title="Immersive Experience Design: Brands in 2026" meta={meta} heroImage={questImg} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default ImmersiveExperienceArticle;
