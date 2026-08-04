'use client';

import React from 'react';
import { useNavigate } from 'react-router-dom';
import AhmedFoodLayout from '../AhmedFoodLayout';
import _heroImg from '../../assets/article-img/A (5) .webp';
import _arch1 from '../../assets/article-img/A (6) .webp';
import _arch2 from '../../assets/ElipseImages/projects/Artictecture2.webp';
import _arch3 from '../../assets/ElipseImages/projects/Artictecture3.webp';
import { getImgSrc } from "../../utils/api";
const heroImg = getImgSrc(_heroImg);
const arch1 = getImgSrc(_arch1);
const arch2 = getImgSrc(_arch2);
const arch3 = getImgSrc(_arch3);

const ArchitecturalVisualization = () => {
  const meta = [
    { label: 'Client', value: 'Property Developers' },
    { label: 'Service', value: 'Arch Viz' },
    { label: 'Duration', value: '8–14 weeks' },
    { label: 'Deliverables', value: 'Renders + Animation' },
  ];

  const overview = `If you are launching a residential tower next year, the building you want to sell does not exist yet. Architectural visualization turns unbuilt geometry into photorealistic images, animations, and interactive experiences that make it sell — using lighting, materials, atmospheric effects, and post-production.`;

  const challenge = `• A 3D model alone is just shapes; visualization is what makes it sell.\n• Completed properties use visualization for furnishing, renovation, and lifestyle marketing.\n• Premium launches now expect digital-twin accuracy showing real surrounding buildings and views.`;

  const results = [
    { stat: '15–30', label: 'Final Renders', desc: 'A serious tower launch typically commissions 15 to 30 high-resolution exterior and interior renders.' },
    { stat: '60–180s', label: 'Walkthrough Films', desc: 'Cinematic animations that move buyers through the property for hero campaigns.' },
    { stat: '14 wk', label: 'With VR/Config', desc: 'Projects with VR or configurator deliverables can extend to fourteen weeks for full scope.' },
  ];

  const process = [
    { step: '01', phase: 'Brief', title: 'Brief & Reference Gathering', desc: 'Architectural plans, elevations, material specs, brand guidelines, and marketing intent.' },
    { step: '02', phase: 'Modelling', title: '3D Modelling', desc: 'The building is constructed inside 3D software from the architect’s CAD drawings with precise geometry.' },
    { step: '03', phase: 'Clay', title: 'Clay Render & Approval', desc: 'A grey, unlit version shared for sign-off before materials and lighting are added.' },
    { step: '04', phase: 'Lighting', title: 'Materials, Lighting & Atmosphere', desc: 'Physically-based rendering with Corona or V-Ray — where a render becomes photoreal.' },
    { step: '05', phase: 'Render', title: 'Rendering & Post-Production', desc: 'Cloud render farms process the final images, then colour grading and polish in post.' },
    { step: '06', phase: 'Delivery', title: 'Delivery & Revisions', desc: 'Files delivered in all required formats, with two rounds of revisions standard.' },
  ];

  const gallery = [heroImg, arch1, arch2, arch3];

    return (
    <>
      
      <AhmedFoodLayout
        title="Architectural Visualization Guide"
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

export default ArchitecturalVisualization;
