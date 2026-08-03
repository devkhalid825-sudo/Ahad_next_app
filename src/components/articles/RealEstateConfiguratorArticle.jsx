'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _realEstateImg from '../../assets/ElipseImages/blogs/Arc-1.webp';
import _vrExperienceImg from '../../assets/ElipseImages/blogs/Arc-2.webp';
import _workflowImage from '../../assets/ElipseImages/blogs/Arc-3.webp';
import _autoImg from '../../assets/ElipseImages/blogs/Auto.webp';
import { getImgSrc } from "../../utils/api";
const realEstateImg = getImgSrc(_realEstateImg);
const vrExperienceImg = getImgSrc(_vrExperienceImg);
const workflowImage = getImgSrc(_workflowImage);
const autoImg = getImgSrc(_autoImg);

const RealEstateConfiguratorArticle = () => {
  const meta = [
    { label: 'Client', value: 'Dubai Developers' },
    { label: 'Service', value: 'Real Estate Configurator' },
    { label: 'Duration', value: '2026' },
    { label: 'Deliverables', value: 'Unreal Engine Digital Twin' },
  ];
  const overview = `How Dubai developers are using Unreal Engine configurators to make unbuilt property feel real and win deposits before construction begins. A 3D real-time configurator lets buyers walk into the unit they are considering, swap finishes, and see lighting shift from morning to golden hour — all on a single screen.`;
  const challenge = `• Off-plan trust deficit: buyers commit based on imagination before the building exists.\n• Compressed differentiation: with dozens of towers launching, configurators stand out.\n• Buyer expectations shifted: Dubai buyers expect Tesla-level configurability.`;
  const results = [
    { stat: '+', label: 'Higher Conversion', desc: 'Sales agents report buyers stay longer and reach price discussions faster.' },
    { stat: '∞', label: 'Reusable Asset', desc: 'The same digital twin feeds stills, reels, and VR across the campaign.' },
    { stat: 'CRM', label: 'Lead Qualification', desc: 'Captured interaction data turns the tool into a sales system.' },
  ];
  const process = [
    { step: '01', phase: 'Brief', title: 'Architecture Brief', desc: 'Brief the configurator alongside architecture, not after launch.' },
    { step: '02', phase: 'Engine', title: 'Real-Time Engine', desc: 'Unreal Engine 5 with Nanite and Lumen for near-offline quality.' },
    { step: '03', phase: 'Geospatial', title: 'Geospatial Layer', desc: 'Cesium places the tower into real Dubai with accurate views.' },
    { step: '04', phase: 'Deploy', title: 'Interaction & CRM', desc: 'UI choices feed the CRM and qualify leads automatically.' },
  ];
  const gallery = [realEstateImg, vrExperienceImg, workflowImage, autoImg];
    return (
    <>
      
      <AhmedFoodLayout title="3D Real-Time Configurators for Dubai Off-Plan Sales" meta={meta} heroImage={realEstateImg} overview={overview} challenge={challenge} results={results} process={process} gallery={gallery} />
    </>
  );
};

export default RealEstateConfiguratorArticle;
