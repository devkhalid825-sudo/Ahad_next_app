'use client';

import UsPage from './UsPage';
import UsConfigurator from './UsConfigurator';
import { NAV_LINKS, NAV_CTA, MARQUEE, YACHT_COLORS } from './UsPageData';
import { WHY_US_ITEMS } from './UsServicesPage';

const VIZ_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Photoreal product visualization from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/33', caption: 'Volvo Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/57', caption: 'Cap Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/58', caption: 'T-Shirt Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/62', caption: 'Deck Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/87', caption: 'Roof Configurator', sub: 'Photoreal product renders' },
    { src: 'https://elipsestudio.com/media/79', caption: 'Towel Configurator', sub: 'Photoreal product renders' },
  ],
};

const VizImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsProductVisualizationPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: 'Unlimited', label: 'SKU & color variants rendered from one 3D model' },
      { number: '0', label: 'Reshoots needed when a new colorway launches' },
      { number: '1-3 wks', label: 'Typical turnaround for a full render set' },
      { number: '9+', label: 'Years producing 3D visualization for global brands' },
    ],
    gallery: VIZ_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › 3D Product Visualization USA',
      title: 'Photoreal 3D product visualization US brands use instead of a studio photoshoot.',
      lead: 'Every SKU, every colorway, every finish — rendered from a single CAD-accurate 3D model. No reshoots, no per-variant studio cost, no waiting for stock to arrive.',
      actions: true,
      stats: [
        { number: 'Unlimited', label: 'SKU & color variants from one model' },
        { number: '1-3 wks', label: 'Typical render turnaround' },
        { number: '0', label: 'Reshoots needed per variant' },
      ],
    },
    heroVisual: (
      <UsConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Live 3D Product Visualization"
        label="Material / Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live 3D Model"
      />
    ),
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'One 3D model. Every image you need.',
        sub: 'From a single CAD-accurate model we produce hero stills, 360° spins, lifestyle composites, and print-ready assets for US product pages, catalogs, and campaigns.',
      },
      items: [
        { title: 'Hero Product Stills USA', desc: 'Photoreal exterior and detail shots at brochure quality, lit and staged for your US product pages and marketplace listings.' },
        { title: '360° Product Views', desc: 'Full 360-degree spin views for every colorway and finish, dropped straight into your Shopify or WooCommerce product page.' },
        { title: 'Lifestyle & Context Renders', desc: 'Your product composited into real or CG environments — no location shoot, no props budget, no weather risk.' },
        { title: 'Exploded & Technical Views', desc: 'Assembly and exploded-view renders for instruction manuals, spec sheets, and B2B sales materials.' },
        { title: 'Print & Social Formats USA', desc: 'Every render delivered pre-formatted for print (CMYK, high-res) and social (square, story, banner) — one shoot, every channel.' },
        { title: 'US Office — CT Turnaround', desc: 'Illinois contact, Central Time (CT) hours, +1 630-297-0428. Revisions reviewed and returned within the same US working day.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio USA', title: 'Built for US brands. Delivered from Illinois.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// USA PROJECT OUTCOMES',
      outcomes: [
        { number: 'Unlimited', label: 'SKU & color variants rendered from one 3D model' },
        { number: '0', label: 'Reshoots needed when a new colorway launches' },
        { number: '1-3wks', label: 'Typical turnaround for a full render set' },
        { number: '9+', label: 'Years producing 3D visualization for global brands' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Brands Switch From Photography',
        title: 'One 3D model replaces the entire photoshoot.',
        body: 'Build the model once, then render every color, finish, and angle without booking a studio, shipping samples, or reshooting for a new season.',
        checklist: [
          'No reshoots when a new colorway or SKU launches',
          'Consistent lighting and quality across the entire catalog',
          'CAD-accurate to your actual manufacturing specification',
        ],
        media: <VizImage src="https://elipsestudio.com/media/57" caption="Cap Configurator" sub="Photoreal product renders" />,
      },
      {
        eyebrow: 'Beyond Static Stills',
        title: 'The same model powers 360° views and animation too.',
        body: 'Once your product exists as a 3D asset, spinning it into a 360° view, an animated hero video, or a live configurator is an extension of the same build — not a new project.',
        checklist: [
          '360° views generated from the same render pass as your stills',
          'Upgrade path to animation or a live configurator without remodeling',
          'Delivered ready for Shopify, Amazon, and marketplace listings',
        ],
        reverse: true,
        media: <VizImage src="https://elipsestudio.com/media/58" caption="T-Shirt Configurator" sub="Photoreal product renders" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From CAD file to finished catalog.' },
      steps: [
        { title: 'Free Brief & Estimate', desc: 'Share your CAD files or reference product and the shot list you need. Free estimate within 24 US business hours.' },
        { title: 'Model & Materials', desc: 'CAD-accurate 3D model built with PBR materials matched to your physical samples.' },
        { title: 'Look Development', desc: 'Lighting, staging, and camera angles tuned until stills read as photographs.' },
        { title: 'Render & Delivery', desc: 'Hero stills, 360° views, and lifestyle composites delivered in every format your US channels need.' },
        { title: 'Ongoing Variants', desc: 'New colorways or SKUs render from the existing model — no reshoot, fast turnaround.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US brands ask before switching from photography.' },
      items: [
        { q: 'Do you need physical samples to start?', a: 'No — we can work from CAD files, reference products, or spec sheets. Physical samples help match materials exactly but are not required.' },
        { q: 'Is 3D visualization cheaper than photography for a full catalog?', a: "For catalogs with many color or material variants, yes — the 3D model is built once and every variant renders at a fraction of a reshoot's cost." },
        { q: 'Can you match our exact colors and finishes?', a: 'Yes — PBR materials are calibrated against your physical samples or Pantone/RAL references before final renders are produced.' },
        { q: 'Do renders work for both web and print?', a: 'Yes — every render is delivered in web-optimized and print-ready (CMYK, high-resolution) formats from the same render pass.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free sample render for your product catalog — no commitment required.',
      interests: ['Hero Product Stills', '360° Product Views', 'Lifestyle & Context Renders', 'Exploded / Technical Views', 'Something Else'],
    },
    cta: { title: 'Get a free sample render for your US product catalog.', body: 'No commitment. Free sample render for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsProductVisualizationPage;
