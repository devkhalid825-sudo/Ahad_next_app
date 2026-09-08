'use client';

import UsPage from './UsPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UsPageData';
import { WHY_US_ITEMS } from './UsServicesPage';

const ARCH_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Architectural visualization from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/59', caption: 'Zenith By Amber', sub: 'Exterior CGI · Residential tower' },
    { src: 'https://elipsestudio.com/media/63', caption: 'The Academy', sub: 'Exterior CGI · Institutional' },
    { src: 'https://elipsestudio.com/media/65', caption: 'Khoj Villas', sub: 'Aerial CGI · Villa development' },
    { src: 'https://elipsestudio.com/media/68', caption: 'Amalie Arena', sub: 'Interior CGI · Arena visualization' },
    { src: 'https://elipsestudio.com/media/78', caption: 'Modern Villas', sub: 'Exterior CGI · Luxury villa' },
    { src: 'https://elipsestudio.com/media/37', caption: 'Tim-Barth Residence', sub: 'Interior CGI · Dining room' },
  ],
};

const ArchImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const ArchVideo = ({ youtubeId, title }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9', padding: 0 }}>
    <iframe
      src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0, zIndex: 1 }}
    />
  </div>
);

const UsArchitecturalVisualizationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '250+', label: 'US & global developments visualized' },
      { number: '9+', label: 'Years producing architectural CGI' },
      { number: '98%', label: 'Entitlement visual approval rate' },
      { number: '3', label: 'Global delivery hubs' },
    ],
    gallery: ARCH_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › Architectural Visualization USA',
      title: 'Architectural visualization US developers use to sell before the first shovel hits the ground.',
      lead: 'Photoreal exterior and interior CGI, cinematic walkthroughs, and entitlement/rezoning visuals for US property developers, architects, and construction firms — produced from your plans or BIM model.',
      actions: true,
      stats: [
        { number: '2-4 wks', label: 'Typical render turnaround' },
        { number: '250+', label: 'Developments visualized' },
        { number: '98%', label: 'Entitlement approval rate' },
      ],
    },
    heroVisual: <ArchImage src="https://elipsestudio.com/media/59" caption="Zenith By Amber" sub="Exterior CGI · Residential tower" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'From site plan to sold-out development.',
        sub: 'One accurate 3D model of your development produces every visual you need — from the planning commission to the sales gallery.',
      },
      items: [
        { title: 'Exterior CGI Renders USA', desc: 'Photoreal exterior stills for entitlement hearings, marketing brochures, and investor decks — lit and staged to match the target season and time of day.' },
        { title: 'Interior Visualization USA', desc: 'Furnished interior renders showing finishes, lighting, and materials exactly as specified — for model units, sales galleries, and fit-out proposals.' },
        { title: 'Cinematic Walkthrough Animation', desc: 'A full flythrough of the development — site context, approach, and interior — for planning boards, sales galleries, and social launch films.' },
        { title: 'Entitlement & Rezoning Visuals USA', desc: 'CGI verified views and photomontages produced to the standard US city planning departments and zoning boards require for approval packages.' },
        { title: 'Real-Time 3D Models', desc: 'The same architectural model rebuilt for real-time exploration — walkthrough on a tablet at a sales event, no render wait.' },
        { title: 'BIM & CAD Integration USA', desc: 'Built directly from Revit, SketchUp, or AutoCAD files, so the visualization matches the approved design exactly, revision for revision.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio USA', title: 'Built for US developers. Delivered from Illinois.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// USA PROJECT OUTCOMES',
      outcomes: [
        { number: '98%', label: 'CGI verified views approved on first submission to US planning departments' },
        { number: '250+', label: 'US & international developments visualized for entitlement and sales' },
        { number: '2-4wks', label: 'Typical turnaround from brief to finished exterior render' },
        { number: '9+', label: 'Years producing architectural CGI for US developers' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Developers Choose Elipse Studio',
        title: 'One model. Every stage of approval and sale.',
        body: 'We build a single accurate 3D model of your development, then produce entitlement visuals, marketing renders, and walkthrough animation from it — so nothing is remodeled between design revisions.',
        checklist: [
          'CGI verified views produced to US city and county entitlement standards',
          'Same 3D asset reused for approvals, marketing, and sales gallery screens',
          'Delivered for residential, commercial, and mixed-use US developments',
        ],
        media: <ArchVideo youtubeId="ugd5UTGFQ8U" title="Architectural Visualization Showcase" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From plans to approval-ready visuals.' },
      steps: [
        { title: 'Brief & Drawings', desc: 'Share your plans, BIM model, or CAD files along with the visual brief. Free estimate within 24 US business hours.' },
        { title: 'Model & Site Context', desc: 'We build the architectural model and surrounding site context, referencing site plans and photography.' },
        { title: 'Look Development', desc: 'Materials, lighting, and landscaping tuned until stills read as photographs, calibrated to the target season and time of day.' },
        { title: 'Render & Animation', desc: 'Final stills, verified views, and walkthrough animation produced to your required resolution and format.' },
        { title: 'Delivery & Revisions', desc: 'Assets delivered for entitlement submission, marketing, or sales use, with revision rounds covered post-delivery.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US developers ask before commissioning CGI.' },
      items: [
        { q: 'Can you work directly from our BIM model?', a: 'Yes — we work from Revit, SketchUp, ArchiCAD, and AutoCAD files, importing the model directly to avoid re-modeling.' },
        { q: 'Do you produce verified views for entitlement or zoning hearings?', a: 'Yes — we produce CGI verified views and photomontages to the standard US city planning departments and zoning boards require for approval packages.' },
        { q: 'How long does an exterior render take?', a: 'A single exterior CGI typically takes 2-4 weeks; full entitlement packages and walkthrough animation take longer depending on scope.' },
        { q: 'Can renders be used before a project has final approval?', a: 'Yes — pre-application visuals are common for community meetings and investor decks.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your development — no commitment required.',
      interests: ['Exterior CGI Renders', 'Interior Visualization', 'Walkthrough Animation', 'Entitlement / Zoning Visuals', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US development visualization.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsArchitecturalVisualizationPage;
