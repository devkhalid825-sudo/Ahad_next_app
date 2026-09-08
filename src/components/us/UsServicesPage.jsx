'use client';

import UsPage from './UsPage';
import UsConfigurator from './UsConfigurator';
import { YACHT_COLORS } from './UsPageData';
import {
  FaCog, FaCogs, FaVrCardboard, FaLandmark, FaCamera, FaFilm, FaMagic, FaStore, FaGlobe, FaMobileAlt, FaBolt as FaMotionBolt,
  FaMapMarkerAlt, FaDollarSign, FaLink, FaRulerCombined, FaBolt, FaGift,
  FaHome, FaCouch, FaCar, FaShoppingCart, FaHospital, FaGraduationCap, FaTshirt, FaHotel, FaHardHat, FaShoppingBag,
  FaPhoneAlt, FaClock, FaArrowRight, FaStar,
} from 'react-icons/fa';

const NAV_LINKS_US = [
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQ', href: '#faq' },
];

const SERVICE_ITEMS = [
  {
    badge: 'MOST POPULAR',
    icon: <FaCog />,
    title: '3D Product Configurators USA',
    desc: 'Real-time WebGL configurators for US retail and ecommerce brands. Buyers select colors, materials, and options — every choice renders in 3D instantly. No app download. Shopify and WooCommerce native. USD pricing.',
    tags: ['WebGL', 'Unreal Engine 5', 'Shopify', 'WooCommerce', 'Real-time PBR'],
    href: '/us/services/3d-product-configurators',
    linkLabel: 'Explore 3D Configurators USA →',
  },
  {
    icon: <FaVrCardboard />,
    title: 'VR Development USA',
    desc: 'Immersive VR experiences for US brands — product demos, property walkthroughs, corporate training simulations, and virtual showrooms. Meta Quest, PC VR, and WebVR deployment from a single Unreal Engine build.',
    tags: ['Unreal Engine 5', 'Meta Quest', 'Unity', 'WebVR', 'Multi-user'],
    href: '/us/services/virtual-reality-development',
    linkLabel: 'Explore VR Development USA →',
  },
  {
    icon: <FaMobileAlt />,
    title: 'AR Development USA',
    desc: 'WebAR and app-based AR for US brands — virtual try-on, furniture placement in-room, and QR-triggered marketing experiences. 8th Wall, ARKit, and ARCore built for iOS and Android.',
    tags: ['8th Wall', 'WebXR', 'ARKit', 'ARCore', 'Virtual try-on'],
    href: '/us/services/ar-development',
    linkLabel: 'Explore AR Development USA →',
  },
  {
    icon: <FaLandmark />,
    title: 'Architectural Visualization USA',
    desc: 'Photoreal renders, walkthroughs, and real-time 3D models for US property developers, architecture firms, and construction companies. Entitlement packs, investor decks, and pre-sale marketing assets.',
    tags: ['Corona Renderer', 'V-Ray', 'Unreal Engine', '3ds Max', 'Cesium'],
    href: '/us/services/architectural-visualization',
    linkLabel: 'Explore Arch Vis USA →',
  },
  {
    icon: <FaCamera />,
    title: '3D Product Visualization USA',
    desc: 'Photoreal 3D product images and 360° views that replace traditional photography. Every SKU, every color, every finish — rendered from a single CAD-accurate 3D model. No reshoots, no studio costs per variant.',
    tags: ['Photoreal PBR', '360° views', 'Unlimited SKUs', 'Print-ready', 'Social formats'],
    href: '/us/services/3d-product-visualization',
    linkLabel: 'Explore 3D Visualization USA →',
  },
  {
    icon: <FaFilm />,
    title: '3D Animation USA',
    desc: 'Cinematic 3D animation, product storytelling, and character animation for US brands. Product launches, explainer films, brand campaigns, and technical demonstrations — produced to broadcast quality.',
    tags: ['Cinema 4D', 'Maya', 'After Effects', 'Product animation', 'Character animation'],
    href: '/us/services/3d-animation-services',
    linkLabel: 'Explore 3D Animation USA →',
  },
  {
    icon: <FaMotionBolt />,
    title: 'Motion Graphics USA',
    desc: '2D/3D motion graphics, kinetic typography, and animated brand explainers for US marketing teams. Social ad creative, animated logo stings, and broadcast/OTT commercial graphics from an After Effects + Cinema 4D pipeline.',
    tags: ['After Effects', 'Cinema 4D', 'Kinetic type', 'Social ad creative', 'Broadcast/OTT'],
    href: '/us/services/motion-graphics-services',
    linkLabel: 'Explore Motion Graphics USA →',
  },
  {
    icon: <FaMagic />,
    title: 'VFX & Virtual Production USA',
    desc: 'Visual effects and virtual production for US brand campaigns, TV commercials, and digital content. CGI integration, environment replacement, product placement, and real-time LED volume production support.',
    tags: ['CGI integration', 'Nuke', 'Unreal Engine', 'LED volume', 'Broadcast-grade'],
    href: '/us/services/vfx-virtual-production',
    linkLabel: 'Explore VFX USA →',
  },
  {
    icon: <FaStore />,
    title: 'Virtual Showrooms & Digital Twins USA',
    desc: 'Interactive 3D showrooms and digital twins for US manufacturers, property developers, and retail brands. Replace physical showrooms with browser-accessible immersive environments that operate 24/7.',
    tags: ['WebGL', 'Unreal Engine', 'Digital twin', 'BIM integration', '24/7 access'],
    href: '/us/services/virtual-showrooms',
    linkLabel: 'Explore Virtual Showrooms USA →',
  },
  {
    icon: <FaGlobe />,
    title: 'Interactive Web Experiences USA',
    desc: 'WebGL-powered interactive experiences, 3D landing pages, and immersive brand microsites for US digital campaigns. GSAP animation, Three.js environments, and Unreal Pixel Streaming for browser-native 3D.',
    tags: ['WebGL', 'Three.js', 'GSAP', 'Pixel Streaming', 'PlayCanvas'],
    href: '/us/services/interactive-web-experiences',
    linkLabel: 'Explore Interactive Web USA →',
  },
];

export const WHY_US_ITEMS = [
  { icon: <FaMapMarkerAlt />, title: 'Illinois Office — CT Account Management', desc: 'Direct US contact, Central Time (CT) business hours, +1 630-297-0428. No timezone lag, no overseas delays. Every project managed in your working day.' },
  { icon: <FaDollarSign />, title: 'Transparent USD Pricing — No VAT, No Hidden Fees', desc: 'All estimates quoted in USD with a clear scope. No VAT, no add-on surprises, and no currency conversion guesswork on your invoice.' },
  { icon: <FaLink />, title: 'One Studio — Every Capability', desc: '3D configurator, AR, VR, animation, website, and app — all from one team. No coordination between agencies. Your 3D assets reused across every deliverable.' },
  { icon: <FaRulerCombined />, title: 'CAD-Accurate Production', desc: 'Every 3D model built from your actual CAD files or technical drawings. What we produce matches exactly what your factory manufactures.' },
  { icon: <FaBolt />, title: 'Unreal Engine 5 + WebGL Production', desc: 'Cinema-grade real-time rendering — not template SaaS tools. The visual quality difference is the commercial outcome difference for US brands.' },
  { icon: <FaGift />, title: 'Free Sample Render — No Commitment', desc: 'We offer a free photoreal sample render for qualifying US projects so you can evaluate quality before any production commitment.' },
];

const INDUSTRY_ITEMS = [
  { icon: <FaHome />, title: 'Real Estate', desc: 'Property visualization, virtual tours' },
  { icon: <FaLandmark />, title: 'Architecture', desc: 'Arch vis, entitlement packs' },
  { icon: <FaCouch />, title: 'Furniture', desc: 'Configurators, product renders' },
  { icon: <FaCar />, title: 'Automotive', desc: '3D configurators, VR demos' },
  { icon: <FaShoppingCart />, title: 'Ecommerce', desc: 'AR try-on, product visualization' },
  { icon: <FaCogs />, title: 'Manufacturing', desc: 'B2B configurators, digital twins' },
  { icon: <FaHospital />, title: 'Healthcare', desc: 'VR training, medical animation' },
  { icon: <FaGraduationCap />, title: 'Education', desc: 'VR simulations, immersive learning' },
  { icon: <FaTshirt />, title: 'Fashion', desc: 'AR try-on, fabric configurators' },
  { icon: <FaHotel />, title: 'Hospitality', desc: 'Virtual tours, room configurators' },
  { icon: <FaBolt />, title: 'Energy', desc: 'Digital twins, training VR' },
  { icon: <FaHardHat />, title: 'Construction', desc: 'BIM visualization, site AR' },
  { icon: <FaShoppingBag />, title: 'Retail', desc: 'Interactive displays, WebAR' },
];

const UsServicesPage = () => {
  const config = {
    navLinks: NAV_LINKS_US,
    navCta: 'Get My Free USA Estimate →',
    navCtaHref: '#contact',
    navPhoneBadge: <><FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> Illinois · +1 630-297-0428</>,
    announcement: (
      <>
        <FaMapMarkerAlt className="inline -mt-0.5 mr-1" /> <strong>Illinois office · Central Time (CT) hours · USD pricing</strong> · <a href="tel:+16302970428">+1 630-297-0428</a> · <a href="#contact"><strong>Free estimate in 24hrs</strong> <FaArrowRight className="inline -mt-0.5" /></a>
      </>
    ),
    hero: {
      title: <>The United States&apos; immersive studio for <em>3D, AR, VR</em> and everything in between.</>,
      lead: 'From real-time 3D configurators to AR product experiences, VR training simulations, and architectural visualization — Elipse Studio delivers every immersive capability your US brand needs, from one Illinois-based team.',
      actions: true,
      primaryLabel: <><FaArrowRight className="inline -mt-0.5 mr-1" /> Get My Free USA Estimate</>,
      primaryHref: '#contact',
      secondaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> See a Live Demo First</>,
      trust: ['Illinois office', 'Central Time (CT) hours', 'USD pricing', 'Free estimate 24hrs', <>4.9<FaStar className="inline -mt-1 mx-0.5" /> from 43 projects</>],
    },
    heroVisual: (
      <UsConfigurator
        src="https://playcanv.as/e/p/B6sx93V1/"
        title="Yacht 3D Configurator"
        label="Hull Finish"
        messageMode="raw"
        colors={YACHT_COLORS}
        badge="Live Configurator"
      />
    ),
    statsBand: [
      { number: '11+', label: 'Immersive service capabilities delivered from one US team' },
      { number: '9+', label: 'Years building 3D, AR/VR, and immersive experiences for global brands' },
      { number: '94%', label: 'Higher conversion for brands using interactive 3D vs static assets' },
      { number: <>4.9<FaStar className="inline -mt-1 mx-0.5" /></>, label: 'Average rating across 43 US and international brand projects' },
    ],
    trustBand: [
      { label: 'Illinois office', desc: '— CT account management' },
      { label: 'USD pricing', desc: 'no VAT, no hidden fees' },
      { label: 'One studio', desc: '— every immersive capability' },
      { label: 'Free estimate', desc: 'within 24 US business hours' },
      { label: 'Unreal Engine 5', desc: '+ WebGL + Unity production' },
    ],
    serviceGrid: {
      head: {
        eyebrow: 'USA Services — All Capabilities',
        title: 'Every immersive capability. One Illinois studio.',
        sub: 'All Elipse Studio services available to US brands — with Illinois-based account management, Central Time (CT) hours, and transparent USD pricing.',
      },
      items: SERVICE_ITEMS,
    },
    midCta: {
      title: 'Not sure which service fits your project?',
      body: "Book a 12-minute call — we'll tell you exactly which capabilities apply to your brief and give you a free ballpark in 24 hours.",
      primaryLabel: <><FaPhoneAlt className="inline -mt-0.5 mr-1" /> Is My Project a Fit? Book a Free Call</>,
      primaryHref: 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting',
      external: true,
      hideSecondary: true,
    },
    whyUs: {
      head: {
        eyebrow: 'Why Elipse Studio USA',
        title: 'Built for US brands. Delivered from Illinois.',
      },
      items: WHY_US_ITEMS,
      outcomesLabel: '// USA PROJECT OUTCOMES',
      outcomes: [
        { number: '94%', label: 'Higher conversion for US brands using interactive 3D vs static product pages' },
        { number: '+40%', label: 'Average order value uplift from visible upgrade selection in 3D configurators' },
        { number: '−35%', label: 'Return rate reduction when buyers configure and visualize before purchase' },
        { number: '9+', label: 'Years producing immersive experiences for brands worldwide including the US' },
      ],
    },
    industries: {
      head: {
        eyebrow: 'USA Industries Served',
        title: 'Every US sector we work in.',
        sub: 'From Illinois retail to American manufacturing — Elipse Studio delivers immersive experiences across every industry vertical in the US market.',
      },
      items: INDUSTRY_ITEMS,
    },
    testimonials: false,
    faq: {
      head: { eyebrow: 'Questions from US Brands', title: 'What US brands ask us before starting.' },
      items: [
        {
          q: 'What services does Elipse Studio offer US brands?',
          a: (
            <>
              Elipse Studio USA delivers every immersive capability from one Illinois-based team: <strong>3D product configurators</strong>, <strong>VR development</strong>, <strong>AR development</strong>, <strong>architectural visualization</strong>, <strong>3D product visualization</strong>, <strong>3D animation</strong>, <strong>motion graphics</strong>, <strong>VFX and virtual production</strong>, <strong>virtual showrooms and digital twins</strong>, and <strong>interactive web experiences</strong>. All services are quoted in transparent USD pricing with CT account management from our Illinois office.
            </>
          ),
        },
        {
          q: 'How is working with a US-based Elipse Studio team different?',
          a: (
            <>
              The difference is operational, not just geographic. Central Time (CT) hours mean your project is never waiting overnight for a decision or revision. Transparent USD pricing means no invoice surprises — no VAT, no hidden fees. A Illinois-based account manager means direct phone access at <a href="tel:+16302970428">+1 630-297-0428</a> during your working day. And because we understand US ecommerce platforms (Shopify, WooCommerce), American manufacturing supply chains, and US buyer behavior specifically, the strategic advice we give is calibrated to your actual market — not a global average.
            </>
          ),
        },
        {
          q: 'Can Elipse Studio handle multiple services for our US brand at once?',
          a: (
            <>
              <strong>Yes — and this is one of our strongest advantages.</strong> Because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your <strong>product configurator</strong> also generates your product renders, powers your <strong>WebAR experience</strong>, and populates your <strong>virtual showroom</strong> — without any additional 3D production cost for each channel. For US brands running multi-channel campaigns, this asset efficiency is a significant commercial advantage over coordinating multiple specialist agencies.
            </>
          ),
        },
        {
          q: 'How do I get a quote for a US project?',
          a: (
            <>
              Fill in the form at the bottom of this page or call our US direct line at <a href="tel:+16302970428"><strong>+1 630-297-0428</strong></a>. We respond within one US business day with a free ballpark estimate. For qualifying projects we also offer a <strong>free sample render</strong> so you can assess visual quality before any commitment. If you&apos;d prefer a call first, book 12 minutes via <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" target="_blank" rel="noopener">Calendly</a> — no obligation, no proposal unless you ask for one.
            </>
          ),
        },
        {
          q: 'Do you work with US startups as well as established brands?',
          a: (
            <>
              Yes. Our US client base spans early-stage DTC brands launching their first product to established American manufacturers replacing physical showrooms. The scope of the project scales to your stage — a startup might begin with a focused <strong>3D product configurator</strong> for Shopify, while an established brand might commission a full suite of configurator, WebAR, virtual showroom, and animation. We give you an honest assessment of what your budget achieves and where to start for maximum commercial return.
            </>
          ),
        },
      ],
    },
    contact: {
      badge: <><FaClock className="inline -mt-0.5 mr-1" /> Free estimate · 1 US business day response</>,
      eyebrow: 'Get Started',
      title: 'Tell us about your US project.',
      sub: 'No commitment required. Free sample render for qualifying projects. One US business day response.',
    },
  };

  return <UsPage config={config} />;
};

export default UsServicesPage;
