'use client';

import UsPage from './UsPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UsPageData';

const VR_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'VR experiences from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/38', caption: 'Contact VR Training Simulation', sub: 'VR training · Meta Quest' },
    { src: 'https://elipsestudio.com/media/66', caption: 'Jewelry Shop', sub: 'VR retail experience' },
    { src: 'https://elipsestudio.com/media/73', caption: 'Virtual Reality Experience', sub: 'VR interior · Day/night control' },
    { src: 'https://elipsestudio.com/media/74', caption: 'Roamstead Web VR', sub: 'Browser-based VR' },
  ],
};

const VrImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsVirtualRealityDevelopmentPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '3', label: 'Headset targets from one build: Quest, PC VR, WebVR' },
      { number: '9+', label: 'Years building real-time 3D & VR' },
      { number: '98%', label: 'Client satisfaction rate' },
      { number: 'CT', label: 'Illinois studio, US hours' },
    ],
    gallery: VR_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › Virtual Reality Development USA',
      title: 'VR development for US brands — training, demos, and showrooms that run on Meta Quest.',
      lead: 'Immersive VR experiences for product demonstration, corporate training simulation, property walkthroughs, and virtual showrooms — built once in Unreal Engine, deployed to Meta Quest, PC VR, and WebVR.',
      actions: true,
      stats: [
        { number: '3', label: 'Deployment targets: Quest, PC VR, WebVR' },
        { number: '9+', label: 'Years building real-time 3D & VR' },
        { number: 'CT', label: 'Illinois studio, US hours' },
      ],
    },
    heroVisual: <VrImage src="https://elipsestudio.com/media/38" caption="Contact VR Training Simulation" sub="VR training · Meta Quest" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Build',
        title: 'One Unreal Engine build. Every VR headset.',
        sub: 'A single real-time build, optimized and deployed to standalone Quest, tethered PC VR, and browser-based WebVR.',
      },
      items: [
        { title: 'VR Training Simulations USA', desc: 'Repeatable, measurable training scenarios for onboarding, safety, and equipment operation — without the cost or risk of the real environment.' },
        { title: 'VR Product Demos', desc: 'Let a US buyer walk around, resize, and interact with a product that does not physically exist yet — ideal for pre-launch sales.' },
        { title: 'Property & Site Walkthroughs', desc: 'Full-scale VR walkthroughs of a development or facility, from anywhere, before it is built or while it is off-limits.' },
        { title: 'Virtual Showrooms USA', desc: 'A persistent, browsable VR showroom for your US sales team or clients — accessible on-site or remotely.' },
        { title: 'Multi-User VR USA', desc: 'Multiple US and international participants in the same VR session for collaborative reviews or shared training.' },
        { title: 'Meta Quest, PC VR & WebVR', desc: 'One Unreal Engine 5 build optimized and deployed across standalone Quest, tethered PC VR, and browser-based WebVR.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Enterprises Choose VR',
        title: 'Training and sales scenarios you cannot safely or affordably run in reality.',
        body: 'A VR simulation is repeatable, measurable, and safe — every trainee gets the same scenario, and every buyer gets the same premium demo, wherever they are in the US.',
        checklist: [
          'Deployed to Meta Quest 2/3, PC VR, and WebVR from one build',
          'Analytics on trainee performance and completion built in on request',
          'Delivered for manufacturing, real estate, healthcare, and education clients',
        ],
        media: <VrImage src="https://elipsestudio.com/media/37" caption="Tim-Barth Residence" sub="VR walkthrough · Interior" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From brief to headset-ready build.' },
      steps: [
        { title: 'Scope & Use Case', desc: 'We define the training scenario or demo flow and target headset. Free estimate within 24 US business hours.' },
        { title: '3D Environment Build', desc: 'The environment, product, or facility is modeled to the fidelity the use case requires.' },
        { title: 'Interaction Design', desc: 'VR-native interaction — hand tracking, controllers, or gaze — is designed and wired in Unreal Engine.' },
        { title: 'Device Optimization', desc: 'Performance-tuned for standalone Quest hardware, then validated on PC VR and WebVR targets.' },
        { title: 'Deployment & Support', desc: 'Delivered via Quest App Lab, direct install, or browser link, with CT support post-launch.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US enterprises ask before commissioning VR.' },
      items: [
        { q: 'Which headsets do you support?', a: 'Meta Quest 2 and 3, PC VR (Valve Index, HTC Vive), and browser-based WebVR.' },
        { q: 'Can VR training track completion and performance?', a: 'Yes — we can build in analytics and scoring for compliance or training-record purposes.' },
        { q: 'How long does a VR build take?', a: 'Typically 8-14 weeks depending on environment complexity and interaction depth.' },
        { q: 'Do you support multi-user VR sessions?', a: 'Yes — for collaborative reviews or group training we build networked multi-user sessions.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept scope for your VR project — no commitment required.',
      interests: ['VR Training Simulation', 'VR Product Demo', 'Property / Site Walkthrough', 'Virtual Showroom', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US VR project.', body: 'No commitment. Free concept scope for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsVirtualRealityDevelopmentPage;
