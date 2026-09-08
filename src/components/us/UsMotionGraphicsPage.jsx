'use client';

import UsPage from './UsPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UsPageData';
import { WHY_US_ITEMS } from './UsServicesPage';

const MOTION_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Motion graphics from recent brand campaigns.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/54', caption: 'Tapal Family Mixture', sub: 'Motion graphics · Campaign' },
    { src: 'https://elipsestudio.com/media/137', caption: 'Malka Foods', sub: 'Kinetic type · Product launch' },
    { src: 'https://elipsestudio.com/media/32', caption: 'Ahmed Food', sub: 'Social ad creative' },
    { src: 'https://elipsestudio.com/media/53', caption: 'Gluco Kahani', sub: 'Animated brand explainer' },
  ],
};

const MotionImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsMotionGraphicsPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '3×', label: 'More social shares for motion graphics content vs static creative' },
      { number: '48hrs', label: 'Typical turnaround for a short-form social ad cut' },
      { number: '9+', label: 'Years producing motion design for brands worldwide' },
      { number: 'CT', label: 'Illinois studio, US hours' },
    ],
    gallery: MOTION_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › Motion Graphics Services USA',
      title: 'Motion graphics for US brands — explainers, ad creative, and broadcast graphics that hold attention.',
      lead: '2D/3D motion graphics, kinetic typography, animated brand explainers, and social media ad creative for American brands and agencies — produced on an After Effects and Cinema 4D pipeline, from concept to broadcast-ready delivery.',
      actions: true,
      stats: [
        { number: '3×', label: 'More social shares vs static creative' },
        { number: '48hrs', label: 'Typical short-form ad turnaround' },
        { number: 'CT', label: 'Illinois studio, US hours' },
      ],
    },
    heroVisual: <MotionImage src="https://elipsestudio.com/media/54" caption="Tapal Family Mixture" sub="Motion graphics · Campaign" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Produce',
        title: 'Every motion format your marketing calendar needs.',
        sub: 'One production pipeline covers social ad creative, explainer content, animated branding, and broadcast graphics — all delivered in the formats your US channels require.',
      },
      items: [
        { title: 'Kinetic Typography USA', desc: 'Type-driven motion pieces for quotes, statistics, and message-first content — built to stop the scroll on social feeds.' },
        { title: 'Animated Brand Explainers', desc: 'Concept-to-script-to-screen explainer videos that break down a product, service, or process in 60-90 seconds.' },
        { title: 'Social Media Ad Creative USA', desc: 'Short-form motion ad cuts optimized for Meta, TikTok, and YouTube placements — square, vertical, and widescreen from one production.' },
        { title: 'Animated Logo Stings', desc: 'A signature animated logo treatment for intros, outros, and brand sign-offs across every video you publish.' },
        { title: 'Broadcast & OTT Commercial Graphics', desc: 'Lower-thirds, title cards, and full-motion commercial graphics finished to broadcast and streaming platform delivery specs.' },
        { title: 'After Effects + Cinema 4D Pipeline', desc: 'Every piece is built on an industry-standard motion pipeline, so files, templates, and brand systems stay reusable for future campaigns.' },
      ],
    },
    whyUs: {
      head: { eyebrow: 'Why Elipse Studio USA', title: 'Built for US marketing teams. Delivered from Illinois.' },
      items: WHY_US_ITEMS,
      outcomesLabel: '// USA PROJECT OUTCOMES',
      outcomes: [
        { number: '3×', label: 'More social shares for motion graphics content vs static creative' },
        { number: '48hrs', label: 'Typical turnaround for a short-form social ad cut' },
        { number: '+35%', label: 'Average watch-through uplift for kinetic type vs plain text overlays' },
        { number: '9+', label: 'Years producing motion design for brands worldwide' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Marketing Teams Choose Elipse Studio',
        title: 'One motion system, every channel your campaign runs on.',
        body: 'A single motion graphics package is cut down into every aspect ratio and duration your media plan requires — social, broadcast, OTT, and web — without re-briefing a new agency for each format.',
        checklist: [
          'Delivered in square, vertical, and widescreen from one production',
          'Brand motion templates reusable across future campaigns',
          'Fast-turn social cuts alongside longer broadcast-grade pieces',
        ],
        media: <MotionImage src="https://elipsestudio.com/media/137" caption="Malka Foods" sub="Kinetic type · Product launch" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From script to scroll-stopping motion.' },
      steps: [
        { title: 'Brief & Script', desc: 'We review your messaging, brand guidelines, and channel plan. Free estimate within 24 US business hours.' },
        { title: 'Storyboard & Style Frames', desc: 'Key visual style and motion direction approved before full animation production begins.' },
        { title: 'Animation & Sound Design', desc: 'Full motion production with synced sound design and voiceover integration where required.' },
        { title: 'Format Cutdowns', desc: 'Master edit cut down into every aspect ratio and duration your media plan needs.' },
        { title: 'Delivery & Support', desc: 'All formats delivered ready to publish, with CT support for revisions or future campaign updates.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US brands ask about motion graphics.' },
      items: [
        { q: 'How fast can you turn around a social ad cut?', a: 'Short-form social ad creative typically turns around in 48-72 hours once the brief and assets are confirmed; full campaigns take longer.' },
        { q: 'Do you work with US marketing and creative agencies?', a: 'Yes — we regularly work as the motion design production partner for US agencies who need overflow capacity or specialist 2D/3D skills.' },
        { q: 'Can you match our existing brand guidelines?', a: 'Yes — we build a reusable motion template system from your brand guidelines so future pieces stay consistent without a full rebrief.' },
        { q: 'What formats do you deliver?', a: 'Square (1:1), vertical (9:16), widescreen (16:9), and broadcast/OTT-spec masters from a single production.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept sketch for your motion graphics project — no commitment required.',
      interests: ['Kinetic Typography', 'Animated Brand Explainer', 'Social Media Ad Creative', 'Animated Logo Sting', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US motion graphics project.', body: 'No commitment. Free concept sketch for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsMotionGraphicsPage;
