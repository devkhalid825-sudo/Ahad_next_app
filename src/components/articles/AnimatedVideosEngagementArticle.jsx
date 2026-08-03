'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _animationMainImg from '../../assets/ElipseImages/projects/Animation.webp';
import _elephantImg from '../../assets/ElipseImages/projects/Animation4.webp';
import _motionGraphicsImg from '../../assets/ElipseImages/projects/motion-graphics.webp';
import _anamorphicImg from '../../assets/ElipseImages/projects/Anamorphic-animation.webp';
import { getImgSrc } from "../../utils/api";
const animationMainImg = getImgSrc(_animationMainImg);
const elephantImg = getImgSrc(_elephantImg);
const motionGraphicsImg = getImgSrc(_motionGraphicsImg);
const anamorphicImg = getImgSrc(_anamorphicImg);

const AnimatedVideosEngagementArticle = () => {
  const meta = [
    { label: 'Client', value: 'Elipse Studio' },
    { label: 'Service', value: 'Animated Video Production' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'Motion Graphics, 3D Animation' },
  ];
  const overview = `In 2026, digital marketing feels like a crowded highway. Every brand is fighting for attention, and consumers scroll faster than ever before. Animated videos solve this problem because they combine movement, sound, storytelling, and design into one powerful communication tool that captures attention and improves retention.`;
  const challenge = `• Human brains process visuals far faster than text, making motion a signal of importance.\n• Animation makes complex concepts instantly understandable across every industry.\n• Algorithms prioritize video content, making animated videos highly shareable on social media.`;
  const results = [
    { stat: '91%', label: 'Businesses Using Video', desc: 'The majority of businesses now rely on video as a core communication asset.' },
    { stat: '95%', label: 'Message Retention', desc: 'Viewers retain far more information from animated content than from text.' },
    { stat: '3X', label: 'Social Engagement', desc: 'Animated videos drive triple the engagement of static formats.' },
  ];
  const process = [
    { step: '01', phase: 'Strategy', title: 'Engagement Strategy', desc: 'Defining the message, audience, and emotional hook before a single frame is drawn.' },
    { step: '02', phase: 'Scripting', title: 'Script & Storyboard', desc: 'Translating the brief into a visual narrative that guides attention.' },
    { step: '03', phase: 'Production', title: 'Design & Animation', desc: 'High-fidelity motion graphics and character animation built frame by frame.' },
    { step: '04', phase: 'Launch', title: 'Distribution & SEO', desc: 'Optimizing video for search, social, and conversion performance.' },
  ];
  const gallery = [animationMainImg, elephantImg, motionGraphicsImg, anamorphicImg];
    return (
    <>
      
      <AhmedFoodLayout title="Why Animated Videos Drive Brand Engagement" meta={meta} heroImage={animationMainImg} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default AnimatedVideosEngagementArticle;
