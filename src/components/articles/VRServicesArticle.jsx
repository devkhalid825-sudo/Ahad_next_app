'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _vrHero from '../../assets/images/1 (1).webp';
import _bespokeWorldImg from '../../assets/images/1 (2).webp';
import _bespokeInteractionImg from '../../assets/images/1 (3).webp';
import _aiAdaptiveImg from '../../assets/images/1 (4).webp';
import { getImgSrc } from "../../utils/api";
const vrHero = getImgSrc(_vrHero);
const bespokeWorldImg = getImgSrc(_bespokeWorldImg);
const bespokeInteractionImg = getImgSrc(_bespokeInteractionImg);
const aiAdaptiveImg = getImgSrc(_aiAdaptiveImg);

const VRServicesArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Custom VR Development' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'Bespoke VR, Multi-User, WebXR' },
  ];
  const overview = `Custom VR development is the end-to-end design and production of bespoke Virtual Reality experiences — from concept and art direction through to world building, interaction design, engine deployment, and platform integration. At Elipse Studio we have built more than 300 immersive projects that move the metrics that matter.`;
  const challenge = `• Bespoke world building expresses your brand with physical-store precision.\n• Bespoke interaction design maps to your users' actual needs and behaviors.\n• AI-driven adaptive logic makes scenarios respond intelligently to user behavior.`;
  const results = [
    { stat: '3.4X', label: 'Higher Engagement', desc: 'Custom VR multiplies engagement versus traditional media.' },
    { stat: '92%', label: 'Completion Rate', desc: 'Training experiences achieve very high completion rates.' },
    { stat: '80%', label: 'Retention', desc: 'Learners retain the majority of immersive training content.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Discovery & VR Strategy', desc: 'Two weeks defining objectives, audience, and strategy document.' },
    { step: '02', phase: 'Design', title: 'Design & Build', desc: 'Iterative asset production with regular headset review milestones.' },
    { step: '03', phase: 'Integration', title: 'Integration & Testing', desc: 'Networking, analytics, and device-specific performance testing.' },
    { step: '04', phase: 'Launch', title: 'Launch & Partnership', desc: 'Structured rollout with post-launch analytics and optimization.' },
  ];
  const gallery = [vrHero, bespokeWorldImg, bespokeInteractionImg, aiAdaptiveImg];
    return (
    <>
      
      <AhmedFoodLayout title="Trusted VR Services Company for Custom Development" meta={meta} heroImage={vrHero} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default VRServicesArticle;
