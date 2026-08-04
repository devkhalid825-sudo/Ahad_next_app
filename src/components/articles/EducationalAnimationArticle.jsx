'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _edu1 from '../../assets/images/edu-1.webp';
import _edu2 from '../../assets/images/edu-2.webp';
import _edu3 from '../../assets/images/edu-3.webp';
import _animationHero from '../../assets/ElipseImages/projects/Animation.webp';
import { getImgSrc } from "../../utils/api";
const edu1 = getImgSrc(_edu1);
const edu2 = getImgSrc(_edu2);
const edu3 = getImgSrc(_edu3);
const animationHero = getImgSrc(_animationHero);

const EducationalAnimationArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Educational Animation' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'E-Learning, SCORM, xAPI' },
  ];
  const overview = `At Elipse Studio, educational animation is one of our most purpose-driven services. We design and produce animated learning content for e-learning platforms, universities, corporate L&D teams, healthcare providers, and EdTech startups — bringing together character design, scriptwriting, motion graphics, 3D modelling, and interactive development into a seamless production process.`;
  const challenge = `• Animation is a fundamental shift in how information is processed and retained.\n• Every creative decision serves a specific learning objective, not decoration.\n• Engaged learners finish courses, apply knowledge, and return for more.`;
  const results = [
    { stat: '95%', label: 'Information Retained', desc: 'Learners retain far more from animated video than text.' },
    { stat: '6X', label: 'More Shared Than Text', desc: 'Animated content is shared six times more than text alone.' },
    { stat: '80%', label: 'Learners Prefer Video', desc: 'The majority of learners prefer video-based learning.' },
  ];
  const process = [
    { step: '01', phase: 'Discovery', title: 'Discovery & Learning Design', desc: 'Identifying learners, objectives, and the knowledge baseline.' },
    { step: '02', phase: 'Scripting', title: 'Scriptwriting & Storyboarding', desc: 'Developing educationally structured narratives and visual flows.' },
    { step: '03', phase: 'Production', title: 'Design & Animation', desc: 'Character design, background illustration, and high-fidelity motion.' },
    { step: '04', phase: 'Deployment', title: 'Review & LMS Delivery', desc: 'Iterative feedback and final delivery in SCORM/xAPI packages.' },
  ];
  const gallery = [edu1, edu2, edu3, animationHero];
    return (
    <>
      
      <AhmedFoodLayout title="Educational Animation Services for Platforms" meta={meta} heroImage={edu1} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default EducationalAnimationArticle;
