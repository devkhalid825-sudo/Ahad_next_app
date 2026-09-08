'use client';

import UsPage from './UsPage';
import { NAV_LINKS, NAV_CTA, MARQUEE } from './UsPageData';

const AR_GALLERY = {
  head: {
    eyebrow: 'Selected Work',
    title: 'AR experiences from recent projects.',
  },
  items: [
    { src: 'https://elipsestudio.com/media/66', caption: 'Jewelry Try-On', sub: 'WebAR · Virtual try-on' },
    { src: 'https://elipsestudio.com/media/74', caption: 'Roamstead Web AR', sub: 'Browser-based AR' },
    { src: 'https://elipsestudio.com/media/57', caption: 'Cap Configurator', sub: 'AR product preview' },
    { src: 'https://elipsestudio.com/media/58', caption: 'T-Shirt Configurator', sub: 'AR apparel preview' },
  ],
};

const ArImage = ({ src, caption, sub, priority = false }) => (
  <div className="us-gallery-item" style={{ aspectRatio: '16 / 9' }}>
    <img src={src} alt={caption} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} />
    <span>{caption}</span>
    {sub && <small>{sub}</small>}
  </div>
);

const UsArDevelopmentPage = () => {
  const config = {
    navLinks: NAV_LINKS,
    navCta: NAV_CTA,
    marquee: MARQUEE,
    stats: [
      { number: '0', label: 'App downloads required for WebAR experiences' },
      { number: '3×', label: 'Higher add-to-cart rate when shoppers try a product in AR first' },
      { number: '9+', label: 'Years building real-time 3D for AR & VR' },
      { number: 'CT', label: 'Illinois studio, US hours' },
    ],
    gallery: AR_GALLERY,
    hero: {
      eyebrow: 'Home › USA › Services › AR Development USA',
      title: 'AR development for US brands — try-on, in-room preview, and QR experiences that run in a browser.',
      lead: 'WebAR and app-based augmented reality for US brands — virtual try-on, furniture placement in-room, product preview in AR, and QR-triggered marketing experiences. Built on 8th Wall, WebXR, ARKit, and ARCore.',
      actions: true,
      stats: [
        { number: '0', label: 'App downloads for WebAR experiences' },
        { number: '3×', label: 'Higher add-to-cart rate with AR try-on' },
        { number: 'CT', label: 'Illinois studio, US hours' },
      ],
    },
    heroVisual: <ArImage src="https://elipsestudio.com/media/66" caption="Jewelry Try-On" sub="WebAR · Virtual try-on" priority />,
    capabilities: {
      head: {
        eyebrow: 'What We Build',
        title: 'Browser-native and native AR. One 3D asset pipeline.',
        sub: 'The same 3D model that powers your configurator or product visualization becomes your AR experience — no separate 3D build required.',
      },
      items: [
        { title: 'Virtual Try-On USA', desc: 'Apparel, eyewear, and accessory try-on in AR — shoppers see the product on themselves, in real time, straight from their phone camera.' },
        { title: 'In-Room Product Placement', desc: 'Furniture, decor, and large-format products placed at true scale in the customer\'s own room before they buy — reducing returns and hesitation.' },
        { title: '8th Wall & WebXR Development', desc: 'Browser-native AR that opens from a link or QR code — no app download, no App Store friction, works on iOS and Android alike.' },
        { title: 'ARKit & ARCore Native AR', desc: 'For brands with an existing app, we build native AR features using ARKit (iOS) and ARCore (Android) for deeper device integration and performance.' },
        { title: 'QR-Triggered AR Marketing', desc: 'Packaging, print ads, and in-store displays that launch an AR experience when scanned — product demos, unboxing previews, and campaign activations.' },
        { title: 'US Office — CT Delivery', desc: 'Illinois contact, Central Time (CT) hours, +1 630-297-0428. Performance-tested on US mobile networks and devices before launch.' },
      ],
    },
    showcase: [
      {
        eyebrow: 'Why US Brands Choose AR',
        title: 'Let customers try before they buy — without leaving the browser.',
        body: 'WebAR removes the single biggest barrier to AR adoption: the app download. A shopper taps a link or scans a QR code and the try-on or preview experience opens instantly in their existing browser.',
        checklist: [
          'No app download — WebAR opens directly from a link or QR code',
          'Same 3D asset used for your configurator, renders, and AR experience',
          'Built for ecommerce, real estate, furniture, fashion, and eyewear brands',
        ],
        media: <ArImage src="https://elipsestudio.com/media/57" caption="Cap Configurator" sub="AR product preview" />,
      },
    ],
    process: {
      head: { eyebrow: 'Process', title: 'From product model to a shareable AR link.' },
      steps: [
        { title: 'Brief & Use Case', desc: 'We define the try-on, placement, or marketing use case and target platform. Free estimate within 24 US business hours.' },
        { title: '3D Asset & Tracking Setup', desc: 'CAD-accurate 3D model built or reused, then optimized for real-time AR tracking and mobile performance.' },
        { title: 'AR Experience Build', desc: 'Interaction, tracking, and UI wired in 8th Wall/WebXR for browser AR, or ARKit/ARCore for native app AR.' },
        { title: 'Device & Network Testing', desc: 'Tested across iOS and Android devices and US mobile network conditions until tracking is fast and stable.' },
        { title: 'Launch & Support', desc: 'Deployed via link, QR code, or app store submission, with CT support for the length of the campaign.' },
      ],
    },
    testimonials: true,
    faq: {
      head: { eyebrow: 'FAQ', title: 'Questions US brands ask before commissioning AR.' },
      items: [
        { q: 'Does the customer need to download an app?', a: 'Not for WebAR — it opens instantly from a browser link or QR code on iOS and Android. Native AR (ARKit/ARCore) requires your existing app.' },
        { q: 'Can AR reduce our return rate?', a: 'Yes — in-room placement and virtual try-on close the expectation gap between what a customer sees online and what arrives, which is a common driver of returns.' },
        { q: 'How long does an AR build take?', a: 'Typically 6-10 weeks depending on tracking complexity, the number of SKUs, and whether it is WebAR or native.' },
        { q: 'Can you build a QR-triggered AR experience for packaging?', a: 'Yes — we build the AR experience and the QR trigger for packaging, print, or in-store display activations.' },
      ],
    },
    contact: {
      title: 'Not ready for a full proposal?',
      sub: 'Get a free concept scope for your AR project — no commitment required.',
      interests: ['Virtual Try-On', 'In-Room Product Placement', 'WebAR / 8th Wall Experience', 'QR-Triggered AR Campaign', 'Something Else'],
    },
    cta: { title: 'Get a free estimate for your US AR project.', body: 'No commitment. Free concept scope for qualifying projects.' },
  };

  return <UsPage config={config} />;
};

export default UsArDevelopmentPage;
