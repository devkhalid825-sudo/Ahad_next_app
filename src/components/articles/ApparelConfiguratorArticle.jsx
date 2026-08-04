'use client';

import React from 'react';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _heroImg from '../../assets/article-img/A (5) .webp';
import _apparel1 from '../../assets/ElipseImages/blogs/alnoor1.webp';
import _apparel2 from '../../assets/ElipseImages/blogs/alnoor2.webp';
import _apparel3 from '../../assets/ElipseImages/blogs/alnoor3.webp';
import _apparel4 from '../../assets/ElipseImages/blogs/alnoor4.webp';
import { getImgSrc } from "../../utils/api";
const heroImg = getImgSrc(_heroImg);
const apparel1 = getImgSrc(_apparel1);
const apparel2 = getImgSrc(_apparel2);
const apparel3 = getImgSrc(_apparel3);
const apparel4 = getImgSrc(_apparel4);

const ApparelConfiguratorArticle = () => {
  const meta = [
    { label: 'Client', value: 'Fashion Brands' },
    { label: 'Service', value: 'Apparel Configurator' },
    { label: 'Duration', value: '12–16 weeks' },
    { label: 'Deliverables', value: '3D Co-design Tool' },
  ];

  const overview = `An apparel configurator lets the customer modify the item — colour, fabric, fit, prints, embroidery — and see a real-time 3D preview of their customised version before purchase. The configurator turns the buyer into a co-designer, which raises both engagement and average order value.`;

  const challenge = `• Returns on configured items run notably lower than on standard catalogue purchases.\n• Made-to-order commerce eliminates the need to forecast which colours and sizes will sell.\n• The majority of fashion ecommerce traffic in 2026 is mobile — configurators must be mobile-first.`;

  const results = [
    { stat: '+40%', label: 'Price Tolerance', desc: 'Buyers happily pay more for a garment they helped design — often 20 to 40% above standard equivalents.' },
    { stat: '↓', label: 'Lower Returns', desc: 'Configured garments see notably lower return rates than standard catalogue purchases.' },
    { stat: 'Q1', label: 'AOV Lift', desc: 'Brands typically see meaningful average-order-value lift within the first quarter of launch.' },
  ];

  const process = [
    { step: '01', phase: '3D Model', title: 'The 3D Garment Model', desc: 'Every configurable garment starts as a 3D model with separate materials, panels, and components that can be swapped or recoloured.' },
    { step: '02', phase: 'Materials', title: 'The Materials Library', desc: 'Each fabric option is a physically-based material capturing how cotton, linen, wool, or leather responds to light.' },
    { step: '03', phase: 'Engine', title: 'The Real-Time Engine', desc: 'A WebGL engine recalculates lighting and updates the view in milliseconds when fabric changes — mobile-first by design.' },
    { step: '04', phase: 'Logic', title: 'The Configuration Logic', desc: 'A rules engine determines which combinations are valid and handles pricing for each option.' },
    { step: '05', phase: 'Commerce', title: 'The Commerce Integration', desc: 'Connects to Shopify, WooCommerce, Magento, or custom backends, generating a unique SKU per configuration.' },
  ];

  const gallery = [apparel1, apparel2, apparel3, apparel4, heroImg];

    return (
    <>
      
      <AhmedFoodLayout
        title="Apparel Configurator Guide"
        meta={meta}
        heroImage={heroImg}
        overview={overview}
        challenge={challenge}
        results={results}
        process={process}
        gallery={gallery}
      />
    </>
  );
};

export default ApparelConfiguratorArticle;
