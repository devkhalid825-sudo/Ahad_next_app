'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '../layouts/Header';
import Footer from '../layouts/Footer';

const frames = {
  mechanism: '/assets/industrial-animation/in-article-mechanism.webp',
  zoo: '/assets/industrial-animation/in-article-zoo.webp',
  food: '/assets/industrial-animation/in-article-food.webp',
  drone: '/assets/industrial-animation/in-article-drone.webp',
  twoD: '/assets/industrial-animation/in-article-2d.webp',
  malka: '/assets/industrial-animation/in-article-malka.webp',
  extra: '/assets/industrial-animation/in-article-extra.webp',
};

const heroVideo = 'https://www.youtube.com/embed/BsKw4i6riRw';

const marqueeItems = [
  'INDUSTRIAL ANIMATION',
  '✦',
  'MACHINERY',
  '✦',
  'CAD TO 3D',
  '✦',
  'ENGINEERING',
  '✦',
  'MANUFACTURING',
  '✦',
  'UK BRANDS',
  '✦',
];

/* ── Scroll-reveal hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ia-revealed');
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return ref;
}

/* ── Animated wrapper ── */
const Reveal = ({ children, delay = 0, className = '' }) => {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={`ia-reveal ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Frame = ({ src, cap }) => (
  <figure className="relative aspect-video overflow-hidden rounded-md border border-zinc-800 bg-zinc-900">
    <img alt={cap} src={src} loading="lazy" decoding="async" className="w-full h-full object-cover" />
    <figcaption className="absolute left-2.5 bottom-2.5 right-2.5 italic text-[11px] text-white/70 leading-snug">
      {cap}
    </figcaption>
  </figure>
);

/* ── Mobile-expand entry: on mobile shows image + heading first,
   rest slides down on "Read more" tap. On md+ always fully visible ── */
const MobileExpandEntry = ({ entry, imageLeft, hasImage }) => {
  const [open, setOpen] = useState(false);

  const hasExtra = !!(
    entry.content?.length ||
    entry.flow ||
    entry.subBlocks ||
    entry.bullets ||
    entry.footnote
  );

  return (
    <article className="py-10 sm:py-14 border-b border-zinc-800">
      <Reveal delay={0}>
        <div className={`grid gap-8 items-start ${hasImage ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>

          {/* Image — always top on mobile */}
          {hasImage && (
            <div className={`order-1 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
              <Frame src={entry.image} cap={entry.cap} />
            </div>
          )}

          {/* Content block */}
          <div className={`order-2 ${hasImage ? (imageLeft ? 'md:order-2' : 'md:order-1') : 'max-w-2xl mx-auto w-full text-center'}`}>

            {/* Number + Heading — always visible */}
            <div className="font-extrabold text-5xl sm:text-6xl leading-none [color:transparent] [-webkit-text-stroke:1.5px_rgba(255,255,255,0.4)] select-none mb-4">
              {entry.num}
            </div>
            <h3 className={`font-medium text-2xl sm:text-3xl text-zinc-50 max-w-[22ch] leading-tight mb-4 ${!hasImage ? 'mx-auto' : ''}`}>
              {entry.heading}
            </h3>

            {/* Expandable content — collapsed on mobile, always open on md+ */}
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0 md:max-h-[3000px] md:opacity-100'}`}>
              {entry.content?.length > 0 && (
                <div className="space-y-3">
                  {entry.content.map((p, j) => (
                    <p key={j} className="text-zinc-400 leading-relaxed max-w-[66ch]">{p}</p>
                  ))}
                </div>
              )}
              {entry.flow && (
                <div className="mt-4 space-y-1.5">
                  {entry.flow.map((f, j) => (
                    <p key={j} className="text-zinc-300 text-base leading-snug">
                      <span className="text-[#2563EB] font-bold mr-2">→</span>{f}
                    </p>
                  ))}
                </div>
              )}
              {entry.subBlocks && (
                <div className="mt-5 space-y-4">
                  {entry.subBlocks.map((s, j) => (
                    <div key={j}>
                      <h4 className="font-semibold text-lg text-zinc-50 mb-1">{s.title}</h4>
                      <p className="text-zinc-400 leading-relaxed">{s.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {entry.bullets && (
                <ul className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                  {entry.bullets.map((b, j) => (
                    <li key={j} className="text-zinc-400 text-[15px] leading-snug flex items-start gap-2">
                      <span className="text-[#2563EB] mt-0.5 shrink-0">•</span>{b}
                    </li>
                  ))}
                </ul>
              )}
              {entry.footnote && (
                <p className="mt-5 italic text-sm text-zinc-400 border-l-2 border-[#2563EB] pl-3">
                  {entry.footnote}
                </p>
              )}
            </div>

            {/* Read more / less — only shown on mobile */}
            {hasExtra && (
              <button
                onClick={() => setOpen(v => !v)}
                className="mt-4 md:hidden inline-flex items-center gap-2 text-sm text-[#2563EB] font-medium border border-[#2563EB]/40 rounded-full px-4 py-2 hover:bg-[#2563EB]/10 transition-all cursor-pointer"
              >
                {open ? 'Show less ↑' : 'Read more ↓'}
              </button>
            )}
          </div>

        </div>
      </Reveal>
    </article>
  );
};

const entries = [
  {
    num: '01',
    image: frames.mechanism,
    cap: 'Mechanical & engineering animation in production',
    heading: 'What is industrial animation?',
    content: [
      'Industrial animation is the use of 3D computer-generated visuals to explain machinery, engineering systems, manufacturing processes, industrial equipment, and technical concepts.',
      'Instead of relying only on technical drawings, photographs, or lengthy explanations, businesses can use 3D animation to show exactly how a product works. An industrial animation can reveal internal components, demonstrate mechanical movement, visualise manufacturing processes, and show equipment that may be too large, expensive, dangerous, or impractical to film.',
    ],
    bullets: [
      'B2B sales presentations',
      'Product marketing',
      'Engineering communication',
      'Technical training',
      'Manufacturing demonstrations',
      'Trade shows and exhibitions',
      'Product launches',
      'Investor presentations',
      'Installation instructions',
      'Maintenance and service training',
    ],
    footnote: 'Elipse Studio currently uses industrial animation to visualise complex mechanical systems, manufacturing processes, and engineering concepts, including CAD-based workflows.',
  },
  {
    num: '02',
    image: frames.zoo,
    cap: 'Complex builds made clear with 3D animation',
    heading: 'Industrial animation for UK manufacturers',
    content: [
      'UK manufacturing companies operate across highly technical sectors where communicating product value can be challenging. A potential customer may understand the specifications of a machine but still struggle to visualise how it operates. 3D industrial animation bridges that gap.',
      'Instead of simply showing a finished machine, an animation can demonstrate everything from assembly to operation — giving your sales and marketing teams a visual asset that works across every stage of the buying journey.',
    ],
    flow: ['How it is assembled', 'How components move', 'How the system operates', 'How the process works', 'Why the technology matters'],
    bullets: [
      'Advanced manufacturing',
      'Industrial automation',
      'Engineering',
      'Automotive',
      'Aerospace',
      'Energy',
      'Oil & gas',
      'Renewable energy',
      'Pharmaceuticals',
      'Medical equipment',
      'Robotics',
      'Construction equipment',
      'Industrial machinery',
      'Packaging machinery',
      'Electronics manufacturing',
    ],
  },
  {
    num: '03',
    image: frames.food,
    cap: 'Products visualised before they exist',
    heading: 'Why UK businesses invest in industrial 3D animation',
    content: [],
    subBlocks: [
      {
        title: 'Explain machinery that cannot be easily filmed',
        text: 'Some industrial equipment is simply not practical to film. A machine may be enormous, located inside a restricted manufacturing facility, operating in a hazardous environment, or still under development. 3D animation removes those limitations — creating virtual camera angles, cutaway views, exploded sequences, and close-ups of components that would otherwise be impossible to capture.',
      },
      {
        title: 'Show internal mechanisms',
        text: 'The biggest advantage of industrial animation is the ability to show what customers normally cannot see: motors, gears, bearings, pumps, valves, hydraulic and pneumatic systems, internal assemblies, electrical components, and mechanical connections. A transparent or cutaway animation makes complicated engineering concepts immediately easier to understand.',
      },
      {
        title: 'Sell equipment before it is manufactured',
        text: 'Industrial companies do not always have a finished product available for marketing. Using CAD data and engineering specifications, 3D animation can visualise a product before physical manufacturing is complete — letting you prepare launch campaigns, sales presentations, distributor materials, website content, trade-show visuals, and investor presentations ahead of the market.',
      },
    ],
  },
  {
    num: '04',
    image: frames.drone,
    cap: 'CAD data driving accurate visuals',
    heading: 'CAD to industrial animation',
    content: [
      "Your engineering data is the foundation of an accurate industrial animation. Elipse Studio works with available CAD and technical assets to build production-ready 3D visuals.",
      'The process transforms engineering data into a visual asset that can communicate your product to customers who may not have an engineering background.',
    ],
    bullets: [
      'SolidWorks',
      'STEP',
      'IGES',
      'Engineering drawings',
      'Existing 3D models',
      'Product specifications',
      'Reference photography',
      'Technical documentation',
    ],
    footnote: 'The current Elipse Studio industrial animation workflow specifically highlights CAD pipelines for formats including SolidWorks, STEP, and IGES.',
  },
  {
    num: '05',
    image: frames.twoD,
    cap: 'Exploded and mechanical sequences',
    heading: 'Industrial animation services we provide',
    content: [],
    subBlocks: [
      {
        title: 'Mechanical animation',
        text: 'Show how individual mechanical components work together — rotational movement, gears, motors, bearings, shafts, pumps, mechanical assemblies, and automated systems. Ideal for machinery manufacturers and engineering companies.',
      },
      {
        title: 'Exploded view animation',
        text: 'Separate a machine into its individual components, showing each part moving away from the main assembly before returning to position. Perfect for product architecture, assembly, component relationships, replacement parts, and maintenance procedures.',
      },
      {
        title: 'Manufacturing process animation',
        text: 'Show the complete production process from raw material to finished product — raw materials, processing, assembly, quality control, packaging, and distribution — so customers, investors, employees, and partners understand how your operation works.',
      },
      {
        title: 'Factory & production line animation',
        text: 'Move through an entire facility virtually, visualising production lines, robotic systems, conveyors, assembly stations, automated machinery, material movement, warehouse operations, and quality-control processes.',
      },
      {
        title: 'Engineering animation',
        text: 'Transform technical concepts into visual explanations — mechanical principles, fluid movement, pressure systems, energy transfer, structural systems, equipment operation, and technical processes. The objective is not simply to impress; the objective is to make the engineering understandable.',
      },
    ],
  },
  {
    num: '06',
    image: frames.malka,
    cap: 'Sales-enablement visuals for B2B teams',
    heading: 'Industrial animation for B2B sales',
    content: [
      'Selling industrial equipment is different from selling consumer products. B2B buyers often need to understand technical specifications, operational benefits, installation requirements, and system capabilities before making a purchasing decision.',
      'A professional industrial animation becomes a powerful sales-enablement asset. Use it across the whole funnel:',
    ],
    bullets: [
      'Sales presentations — give your sales team a visual explanation of complicated machinery',
      'Website product pages — show visitors how equipment works instead of static images',
      'Trade shows & exhibitions — large-format industrial animation that attracts visitors',
      'LinkedIn marketing — break a longer animation into short technical clips for B2B campaigns',
      'Distributor presentations — give distributors a visual tool that makes your product easier to explain',
      'Investor presentations — visualise new manufacturing technology, facilities, and innovations',
    ],
  },
  {
    num: '07',
    image: frames.extra,
    cap: 'Training-ready technical content',
    heading: 'Industrial animation for training & maintenance',
    content: [
      'Industrial animation is not only a marketing tool — it supports employee training and technical education. A 3D animation can demonstrate a procedure before an employee works with the real equipment.',
      'For UK manufacturers with complex equipment or distributed teams, digital training content becomes a reusable resource for onboarding and technical education.',
    ],
    bullets: [
      'Machine operation',
      'Equipment installation',
      'Assembly procedures',
      'Maintenance',
      'Troubleshooting',
      'Safety procedures',
      'Emergency procedures',
      'Component replacement',
      'Factory workflows',
    ],
  },
];

const comparisonRows = [
  ['Show internal machinery', '✓', 'Difficult'],
  ['Show unreleased equipment', '✓', 'Requires physical prototype'],
  ['Exploded views', '✓', 'Difficult'],
  ['Show dangerous processes', '✓', 'Risky'],
  ['Visualise invisible processes', '✓', 'Limited'],
  ['Change camera perspective', '✓', 'Requires reshooting'],
  ['Create product variants', '✓', 'Requires additional filming'],
  ['Show complete factory workflows', '✓', 'Complex'],
  ['Demonstrate internal mechanisms', '✓', 'Difficult'],
];

const assetFlow = [
  'CAD Data',
  '3D Industrial Model',
  'Industrial Animation',
  'Product Visualization',
  'Interactive 3D',
  'AR Product Experience',
  'VR Training',
  'Digital Sales Tool',
];

const processSteps = [
  { num: '01', title: 'Discovery & Technical Review', text: 'We start by understanding your machine, process, audience, and commercial objective — reviewing CAD files, drawings, product documentation, and visual references.' },
  { num: '02', title: 'Script & Storyboard', text: 'Technical information needs a clear story. We create a storyboard that defines the key scenes, camera movements, component animations, transitions, and visual explanations.' },
  { num: '03', title: 'CAD Preparation & 3D Modelling', text: 'Your engineering data is prepared for animation; complex CAD geometry is optimised while maintaining the accuracy required for the final visual.' },
  { num: '04', title: 'Animation & Simulation', text: 'The machine or process is brought to life — mechanical movement, exploded views, assembly sequences, fluid simulations, particle effects, camera animation, and process simulations.' },
  { num: '05', title: 'Lighting & Rendering', text: 'Realistic materials, lighting, reflections, shadows, and environments produce polished industrial visuals — engineering accuracy combined with commercial-quality presentation.' },
  { num: '06', title: 'Post-Production & Delivery', text: 'The final animation is edited and prepared for your platforms: website videos, product demonstrations, sales presentations, trade-show content, training videos, social clips, and investor decks.' },
];

const deliverables = [
  'CAD-based 3D workflows',
  'Technically focused storytelling',
  'Photorealistic rendering',
  'Mechanical animation',
  'Process visualization',
  'Exploded-view sequences',
  'Product demonstrations',
  'Training-ready visual content',
  'Marketing-ready video assets',
  'Scalable 3D asset development',
];

const IndustrialAnimationArticle = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div data-nav="dark" className="w-full min-h-screen overflow-x-hidden bg-black text-zinc-100 selection:bg-[#2563EB]/30 selection:text-white">



      <Header />

      <main className="overflow-x-hidden">

        {/* ══════ HERO: AHMED FOOD STYLE ══════ */}
        <section className="bg-black px-4 sm:px-8 md:px-12 lg:px-16 pt-[85px] sm:pt-[110px] md:pt-[125px] pb-6 md:pb-10">
          <div className="max-w-[1600px] mx-auto">
            {/* Title row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 pt-2 sm:pt-4">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight">
                Industrial Animation<span className="text-[#2563EB]">.</span>
              </h1>
              <a
                href="/contact"
                className="inline-flex items-center justify-center text-xs sm:text-[13px] font-semibold px-6 py-3 bg-[#2563EB] text-white rounded-full hover:bg-[#1d4ed8] transition-all duration-200 cursor-pointer shrink-0 shadow-lg shadow-[#2563EB]/20 self-start sm:self-auto"
              >
                Start a Project →
              </a>
            </div>
            {/* Video */}
            <div className="w-full relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
              <iframe
                className="w-full h-full"
                src={heroVideo}
                title="Industrial Animation Showreel"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <div className="px-3 sm:px-6 md:px-10 lg:px-14 xl:px-16 pb-16 sm:pb-20">

          {/* ══════ MARQUEE ══════ */}
          <section className="my-12 overflow-hidden border-y border-zinc-800 py-6 bg-black -mx-3 sm:-mx-6 md:-mx-10 lg:-mx-14 xl:-mx-16">
            <div className="flex space-x-12 animate-marquee-custom whitespace-nowrap text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white">
              {[...marqueeItems, ...marqueeItems].map((item, i) => (
                <span key={i} className={item === '✦' ? 'text-[#3B82F6]' : ''}>{item}</span>
              ))}
            </div>
          </section>

          {/* ══════ INTRO ══════ */}
          <section className="py-10 sm:py-16">
            <Reveal>
              <div className="max-w-3xl mx-auto text-center">
                <div className="italic text-[#2563EB] text-base mb-4">
                  Turn complex engineering into clear, high-impact 3D animation
                </div>
                <p className="text-xl sm:text-2xl md:text-[28px] leading-snug text-zinc-300 max-w-[38ch] mx-auto">
                  Elipse Studio creates industrial 3D animation for UK businesses — transforming CAD models, engineering drawings, machinery, and manufacturing processes into accurate and engaging visual experiences.
                </p>
                <a
                  href="#journal"
                  className="mt-7 inline-flex items-center gap-2 italic text-base border-b border-white/60 pb-1 hover:text-[#2563EB] hover:border-[#2563EB] transition-colors"
                >
                  Explore the full breakdown below ↓
                </a>
              </div>
            </Reveal>
          </section>

          {/* ══════ JOURNAL ENTRIES ══════ */}
          <section id="journal" className="py-10 sm:py-16 border-t border-zinc-800">
            <div className="max-w-none space-y-0">
              <Reveal>
                <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-2">
                  <span className="italic text-[#2563EB] text-base">The industrial animation playbook</span>
                  <span className="italic text-xs text-zinc-400 uppercase tracking-widest">Elipse Studio · UK</span>
                </div>
              </Reveal>

              {entries.map((entry, i) => {
                const imageLeft = i % 2 === 0;
                const hasImage = !!entry.image;
                return (
                  <MobileExpandEntry key={entry.num} entry={entry} imageLeft={imageLeft} hasImage={hasImage} />
                );
              })}
            </div>
          </section>

          {/* ══════ COMPARISON TABLE ══════ */}
          <section className="py-12 sm:py-16 border-t border-zinc-800">
            <Reveal>
              <div className="mb-10">
                <p className="text-xs font-semibold tracking-[0.15em] uppercase text-[#2563EB] mb-2">Head to head</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  Industrial Animation <span className="text-zinc-500">vs</span> Traditional Video
                </h2>
              </div>
            </Reveal>

            {/* Column headers */}
            <Reveal delay={80}>
              <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_200px_200px] gap-3 mb-3 px-1">
                <div />
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-full">
                    <span>✦</span> 3D Animation
                  </span>
                </div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1.5 bg-zinc-800/60 border border-zinc-700 text-zinc-400 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full">
                    Traditional Video
                  </span>
                </div>
              </div>
            </Reveal>

            {/* Rows */}
            <div className="space-y-2">
              {comparisonRows.map((row, i) => (
                <Reveal key={i} delay={i * 50}>
                  <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_200px_200px] gap-3 items-center bg-zinc-900/40 border border-zinc-800 rounded-xl px-4 py-3.5 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-200">
                    {/* Requirement */}
                    <span className="text-zinc-100 text-sm sm:text-base font-medium">{row[0]}</span>
                    {/* 3D Animation cell */}
                    <div className="flex justify-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                      </span>
                    </div>
                    {/* Traditional Video cell */}
                    <div className="flex justify-center">
                      <span className="inline-flex items-center bg-zinc-800/80 border border-zinc-700/60 text-zinc-400 text-xs sm:text-sm px-3 py-1.5 rounded-full whitespace-nowrap">
                        {row[2]}
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Footer note */}
            <Reveal delay={200}>
              <div className="mt-8 flex items-start gap-3 bg-[#2563EB]/5 border border-[#2563EB]/20 rounded-xl px-5 py-4">
                <span className="text-[#2563EB] text-lg mt-0.5">💡</span>
                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  For many industrial brands, the best approach is to <span className="text-zinc-200 font-medium">combine 3D animation with live-action video</span> — each format reinforcing the other across different stages of the buyer journey.
                </p>
              </div>
            </Reveal>
          </section>

          {/* ══════ ONE ASSET, MANY EXPERIENCES ══════ */}
          <section className="py-12 sm:py-16 border-t border-zinc-800">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-8">
                <span className="italic text-[#2563EB] text-base">From CAD model to multiple digital experiences</span>
                <span className="italic text-xs text-zinc-400 uppercase tracking-widest">Asset strategy</span>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {assetFlow.map((step, i) => (
                  <div key={step} className="flex items-center gap-2 sm:gap-3">
                    <span className="border border-zinc-700 bg-zinc-900/60 rounded-xl px-4 py-3 font-medium text-sm sm:text-base text-zinc-300 whitespace-nowrap">
                      {step}
                    </span>
                    {i < assetFlow.length - 1 && <span className="text-[#2563EB] font-bold">↓</span>}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-zinc-400 leading-relaxed max-w-[70ch]">
                Your industrial 3D model does not have to be used once and forgotten. Elipse Studio works across 3D animation, interactive experiences, AR, VR, configurators, and 3D visualization — so these assets are planned as part of a broader digital strategy rather than treated as an isolated deliverable.
              </p>
            </Reveal>
          </section>

          {/* ══════ PROCESS ══════ */}
          <section className="py-12 sm:py-16 border-t border-zinc-800">
            <Reveal>
              <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 mb-8">
                <span className="italic text-[#2563EB] text-base">Our industrial animation process</span>
                <span className="italic text-xs text-zinc-400 uppercase tracking-widest">6 steps</span>
              </div>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {processSteps.map((step, i) => (
                <Reveal key={step.num} delay={i * 80}>
                  <div className="border border-zinc-800 rounded-xl p-5 sm:p-6 bg-zinc-900 shadow-md shadow-black/30 h-full">
                    <div className="font-extrabold text-4xl leading-none text-[#2563EB]/40 select-none">
                      {step.num}
                    </div>
                    <h4 className="font-semibold text-lg text-zinc-50 mt-2 mb-2">{step.title}</h4>
                    <p className="text-zinc-400 text-sm leading-relaxed">{step.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          
          <section className="py-12 sm:py-16 border-t border-zinc-800">
            <Reveal>
              <div className="max-w-2xl">
                <div className="italic text-[#2563EB] mb-3">Why choose Elipse Studio for industrial animation?</div>
                <h3 className="font-medium text-2xl sm:text-3xl text-zinc-50 leading-tight mb-4">
                  Clear, accurate, and built for the market
                </h3>
                <p className="text-zinc-400 leading-relaxed">
                  Industrial animation requires more than attractive 3D rendering — the animation must communicate technical information accurately while remaining clear to the intended audience. Our industrial animation workflow includes technical strategy, storyboarding, modelling, texturing, animation, simulation, and rendering, always with future uses in mind: interactive product experiences, virtual environments, AR, and VR.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="mt-8">
                <span className="italic text-sm text-zinc-400 uppercase tracking-widest">What you get</span>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                  {deliverables.map((d) => (
                    <div key={d} className="border border-zinc-800 rounded-xl p-4 bg-zinc-900/60 text-zinc-300 text-sm">
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </section>

          {/* ══════ CLOSING ══════ */}
          <section className="py-12 sm:py-16 my-12 sm:my-16 border-t border-zinc-800">
            <Reveal>
              <div className="max-w-2xl mx-auto text-center">
                <div className="italic text-[#2563EB] mb-3">Industrial animation for UK businesses</div>
                <h3 className="font-medium text-2xl sm:text-3xl text-zinc-50 leading-tight mb-8">
                  Ready to explain more
                </h3>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="max-w-2xl mx-auto space-y-4">
                <p className="text-zinc-400 leading-relaxed">
                  Your customers should not need an engineering degree to understand the value of your technology. Whether you manufacture industrial machinery, develop automation systems, engineer complex equipment, or operate a large manufacturing facility, 3D industrial animation can turn technical complexity into a clear visual story.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  From a single machine to an entire production line, Elipse Studio can transform your engineering data into high-quality visual content designed for sales, marketing, training, and technical communication.
                </p>
                <p className="italic text-lg text-zinc-50 leading-relaxed">
                  Tell us about your machinery, CAD files, manufacturing process, or engineering project. Have CAD files ready? Send us your project details and let&apos;s discuss your animation.
                </p>
              </div>
            </Reveal>
            <Reveal delay={160}>
              <div className="max-w-2xl mx-auto text-center mt-8 space-y-4">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-zinc-900 text-sm font-semibold hover:bg-[#2563EB] hover:text-white transition-all shadow-lg cursor-pointer"
                >
                  Start Your Industrial Animation Project →
                </a>
                <div className="italic text-xl text-[#2563EB] pt-2">
                  Elipse Studio — Industrial Animation for UK Manufacturers, Engineering & Technology Brands
                </div>
              </div>
            </Reveal>
          </section>

        </div>{/* /padded wrapper */}
      </main>

      <Footer />
    </div>
  );
};

export default IndustrialAnimationArticle;