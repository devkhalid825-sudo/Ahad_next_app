'use client';

import UsPage from './UsPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UsPageData';

const VFX_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'Cinematic CGI from recent productions.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/35', caption: 'Lahore Zoo', sub: 'Cinematic CGI · Wildlife' },
    { src: 'https://elipsestudio.com/media/32', caption: 'Ahmed Food', sub: 'Broadcast-grade product CGI' },
    { src: 'https://elipsestudio.com/media/53', caption: 'Gluco Kahani', sub: 'Cinematic character CGI' },
    { src: 'https://elipsestudio.com/media/137', caption: 'Malka Foods', sub: 'Broadcast-grade product CGI' },
  ],
};

const VfxImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsVfxVirtualProductionPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: 'Broadcast', label: 'Grade delivery for TV & streaming' },
      { number: '9+', label: 'Years producing CGI & real-time environments' },
      { number: 'CT', label: 'Illinois studio, US hours' },
      { number: '3', label: 'Global delivery hubs' },
    ],
    gallery: VFX_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › VFX & Virtual Production USA',
      title: 'VFX and virtual production for US campaigns that need to look bigger than the budget.',
      lead: 'CGI integration, environment replacement, product placement, and real-time LED volume production support — broadcast-grade visual effects for US brand campaigns, commercials, and digital content.',
      actions: true,
      stats: [
        { number: 'Broadcast', label: 'Grade compositing & delivery' },
        { number: 'LED', label: 'Volume production support' },
        { number: 'CT', label: 'Illinois studio, US hours' },
      ],
    },
    heroVisual: <VfxImage src="https://elipsestudio.com/media/35" caption="Lahore Zoo" sub="Cinematic CGI · Wildlife" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Deliver',
        title: 'From live-action plate to broadcast-ready master.',
        sub: 'A production team that builds the 3D assets and real-time environments your VFX and virtual production shoot needs, on a US broadcast timeline.',
      },
      items: [
        { title: 'CGI Integration USA', desc: 'Photoreal 3D elements composited into live-action footage — products, environments, or effects that were never on set.' },
        { title: 'Environment Replacement', desc: 'Full digital environment and set extension work for US commercials and brand films shot on a limited physical set.' },
        { title: 'Product Placement & Integration USA', desc: 'Digitally inserted or replaced product shots for campaigns needing multiple SKU or market variants from one shoot.' },
        { title: 'Real-Time LED Volume Support', desc: 'Real-time Unreal Engine environments for LED wall virtual production shoots, reducing location and travel costs.' },
        { title: 'Compositing & Nuke Finishing', desc: 'Broadcast-grade compositing, clean-up, and color finishing for TV, streaming, and digital delivery.' },
        { title: 'US Office — CT Production Support', desc: 'Illinois-based production liaison on Central Time (CT) hours for the length of your shoot and post schedule.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Production Teams Partner With Us',
        title: 'The 3D team behind the visual effects, not just the render.',
        body: 'We work as an extension of your production or agency team — building the 3D assets and real-time environments that make virtual production and VFX-heavy campaigns possible on a US broadcast timeline.',
        checklist: [
          'Real-time Unreal Engine environments ready for LED volume shoots',
          'CGI integration matched to your plate lighting and lens characteristics',
          'Delivered to broadcast and streaming platform technical specifications',
        ],
        media: <VfxImage src="https://elipsestudio.com/media/32" caption="Ahmed Food" sub="Broadcast-grade product CGI" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From plate to final master.' },
      steps: [
        { title: 'Brief & Shoot Plan', desc: 'We review the script, shot list, and production schedule to scope VFX or virtual production needs. Free estimate within 24 US business hours.' },
        { title: 'Asset & Environment Build', desc: '3D assets and environments are built ahead of the shoot, ready for on-set reference or LED volume playback.' },
        { title: 'On-Set / Real-Time Support', desc: 'Real-time environment support during the shoot for virtual production, or plate capture guidance for VFX integration.' },
        { title: 'Compositing & Finishing', desc: 'CGI integration, clean-up, and color finishing completed in post, reviewed against production notes.' },
        { title: 'Delivery', desc: 'Broadcast or streaming-spec masters delivered on the agreed post-production schedule.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US production teams ask before booking.' },
      items: [
        { q: 'Can you support an LED volume shoot?', a: 'Yes — we build and operate real-time Unreal Engine environments for LED wall virtual production.' },
        { q: 'Do you work with US production companies and agencies?', a: 'Yes — we regularly work as the 3D/VFX execution partner for US production companies and agencies.' },
        { q: 'What formats do you deliver?', a: 'Broadcast and streaming-spec masters, along with social and digital cutdowns as required.' },
        { q: 'How far in advance do you need to be briefed for a shoot?', a: 'Ideally 3-4 weeks ahead for asset and environment prep, though shorter timelines can be discussed.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free scope call for your US production — no commitment required.',
      interests: ['CGI Integration', 'Environment Replacement', 'LED Volume Production', 'Compositing & Finishing', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US VFX or virtual production project.', body: 'No commitment. Free scope call for qualifying productions.' },
  };

  return <UsPage config={config} />;
};

export default UsVfxVirtualProductionPage;
