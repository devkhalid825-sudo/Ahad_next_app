'use client';

import UsPage from './UsPage';
import UsConfigurator from './UsConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, YACHT_COLORS } from './UsPageData';

const SHOWROOM_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Browsable 3D spaces from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/83', caption: 'Apartment Tour', sub: '360° virtual showroom' },
    { src: 'https://elipsestudio.com/media/82', caption: 'Office Tour', sub: '360° virtual showroom' },
    { src: 'https://elipsestudio.com/media/77', caption: 'Housing Community', sub: 'Interactive 3D showroom' },
    { src: 'https://elipsestudio.com/media/51', caption: 'Kumar Residence', sub: '360° virtual tour' },
  ],
};

const ShowroomImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsVirtualShowroomsPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '24/7', label: 'Showroom availability for US & global visitors' },
      { number: '9+', label: 'Years building real-time 3D environments' },
      { number: '98%', label: 'Client satisfaction rate' },
      { number: 'CT', label: 'Illinois studio, US hours' },
    ],
    gallery: SHOWROOM_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › Virtual Showrooms USA',
      title: 'Virtual showrooms US manufacturers and developers use to sell 24/7, without the floor space.',
      lead: 'Browser-accessible 3D showrooms and digital twins that replace or extend a physical showroom — always open, always up to date, and shareable with a link.',
      actions: true,
      stats: [
        { number: '24/7', label: 'Showroom availability, no travel required' },
        { number: '0', label: 'Physical floor space needed' },
        { number: 'CT', label: 'Illinois-managed build & support' },
      ],
    },
    heroVisual: (
      <UsConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Virtual 3D Showroom Demo"
        label="Space Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live 3D Space"
      />
    ),
    capabilities: {
      head: {
        eyebrow: 'What We Build',
        title: 'Your full catalog, in one browsable space.',
        sub: 'A fully navigable 3D showroom or digital twin that showcases your product range and updates as your catalog changes.',
      },
      items: [
        { title: 'Interactive 3D Showrooms USA', desc: 'A fully navigable 3D space showcasing your product range, built once and updated as your catalog changes.' },
        { title: 'Digital Twins USA', desc: 'A live-accurate 3D replica of a physical facility, product line, or site — for monitoring, sales, or stakeholder walkthroughs.' },
        { title: 'WebGL & Unreal Engine Builds', desc: 'Deployed as a lightweight browser experience or a full-fidelity Unreal Engine build, depending on your audience.' },
        { title: 'BIM Integration USA', desc: 'Digital twins built directly from BIM data for accuracy against the as-built or as-designed facility.' },
        { title: 'Multi-Product Configuration', desc: 'Visitors switch between product lines, colors, and configurations inside the same showroom session.' },
        { title: 'US Office — CT Support', desc: 'Illinois contact, Central Time (CT) hours, and ongoing content updates as your range changes.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Brands Go Virtual',
        title: 'One showroom, unlimited visitors, no diary clash.',
        body: 'A physical showroom holds one meeting at a time. A virtual showroom holds unlimited visitors, is open outside US business hours, and never needs re-carpeting.',
        checklist: [
          'Accessible via a shared link — no software install for visitors',
          'Updated centrally when your product range changes',
          'Built for manufacturers, property developers, and retail brands',
        ],
        media: <ShowroomImage src="https://elipsestudio.com/media/77" caption="Housing Community" sub="Interactive 3D showroom" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From catalog to browsable showroom.' },
      steps: [
        { title: 'Scope & Catalog Review', desc: 'We review your product range or facility and define the showroom layout. Free estimate within 24 US business hours.' },
        { title: '3D Environment & Assets', desc: 'The showroom space and product models are built or imported from existing CAD/3D assets.' },
        { title: 'Navigation & Interaction', desc: 'Visitor navigation, hotspots, and configuration options are wired for a smooth browsing experience.' },
        { title: 'Performance & Access Setup', desc: 'Optimized for browser delivery and configured for the access model you need — public link, gated, or embedded.' },
        { title: 'Launch & Ongoing Updates', desc: 'Live showroom handed over, with CT support for content updates as your range evolves.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US brands ask before going virtual.' },
      items: [
        { q: 'Do visitors need to install anything?', a: 'No — the showroom runs in a standard web browser, accessible via a shared link.' },
        { q: 'Can the showroom reflect our real facility?', a: 'Yes — for digital twins we build from BIM data or site surveys for an accurate 1:1 replica.' },
        { q: 'How often can the product range be updated?', a: 'Content updates are scoped separately and can be scheduled as your catalog changes.' },
        { q: 'How long does a virtual showroom take to build?', a: 'Typically 8-12 weeks depending on catalog size and environment complexity.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept scope for your virtual showroom — no commitment required.',
      interests: ['Interactive 3D Showroom', 'Digital Twin', 'BIM-Based Digital Twin', 'Multi-Product Configuration', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US virtual showroom.', body: 'No commitment. Free concept scope for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsVirtualShowroomsPage;
