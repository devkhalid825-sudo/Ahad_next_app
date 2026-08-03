'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import Contact from "../Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../LatestWork";
import ClientReviews from "../ClientReviews";

import _solutionsImg from "../../assets/Ahmed-food/jelly/01.webp";
import _whyUsImg from "../../assets/Ahmed-food/jelly/06.webp";
import _stackImg from "../../assets/Ahmed-food/jelly/11.webp";
import _af1 from "../../assets/Ahmed-food/bombay-biryani/01.webp";
import _af2 from "../../assets/Ahmed-food/bombay-biryani/02.webp";
import _af3 from "../../assets/Ahmed-food/bombay-biryani/03.webp";
import _af4 from "../../assets/Ahmed-food/bombay-biryani/04.webp";
import _af5 from "../../assets/Ahmed-food/bombay-biryani/06.webp";
import _af6 from "../../assets/Ahmed-food/bombay-biryani/07.webp";
import _af7 from "../../assets/Ahmed-food/bombay-biryani/09.webp";
import _af8 from "../../assets/Ahmed-food/bombay-biryani/10.webp";
import _af9 from "../../assets/Ahmed-food/bombay-biryani/11.webp";
import _af10 from "../../assets/Ahmed-food/bombay-biryani/13.webp";
import _af11 from "../../assets/Ahmed-food/jam&spread/02.webp";
import _af12 from "../../assets/Ahmed-food/jam&spread/03.webp";
import _af13 from "../../assets/Ahmed-food/jam&spread/04.webp";
import _af14 from "../../assets/Ahmed-food/jam&spread/06.webp";
import _af15 from "../../assets/Ahmed-food/jam&spread/07.webp";
import _af16 from "../../assets/Ahmed-food/jam&spread/09.webp";
import _af17 from "../../assets/Ahmed-food/jam&spread/10.webp";
import _af18 from "../../assets/Ahmed-food/jam&spread/11.webp";
import _af19 from "../../assets/Ahmed-food/jam&spread/13.webp";
import _af20 from "../../assets/Ahmed-food/jam&spread/15.webp";
import _af21 from "../../assets/Ahmed-food/jelly/01.webp";
import _af22 from "../../assets/Ahmed-food/jelly/02.webp";
import _af23 from "../../assets/Ahmed-food/jelly/03.webp";
import _af24 from "../../assets/Ahmed-food/jelly/04.webp";
import _af25 from "../../assets/Ahmed-food/jelly/06.webp";
import _af26 from "../../assets/Ahmed-food/jelly/07.webp";
import _af27 from "../../assets/Ahmed-food/jelly/09.webp";
import _af28 from "../../assets/Ahmed-food/jelly/10.webp";
import _af29 from "../../assets/Ahmed-food/jelly/11.webp";
import _af30 from "../../assets/Ahmed-food/stills/01.webp";
import _af31 from "../../assets/Ahmed-food/stills/04.webp";
import { getImgSrc } from "../../utils/api";
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);
const af1 = getImgSrc(_af1);
const af2 = getImgSrc(_af2);
const af3 = getImgSrc(_af3);
const af4 = getImgSrc(_af4);
const af5 = getImgSrc(_af5);
const af6 = getImgSrc(_af6);
const af7 = getImgSrc(_af7);
const af8 = getImgSrc(_af8);
const af9 = getImgSrc(_af9);
const af10 = getImgSrc(_af10);
const af11 = getImgSrc(_af11);
const af12 = getImgSrc(_af12);
const af13 = getImgSrc(_af13);
const af14 = getImgSrc(_af14);
const af15 = getImgSrc(_af15);
const af16 = getImgSrc(_af16);
const af17 = getImgSrc(_af17);
const af18 = getImgSrc(_af18);
const af19 = getImgSrc(_af19);
const af20 = getImgSrc(_af20);
const af21 = getImgSrc(_af21);
const af22 = getImgSrc(_af22);
const af23 = getImgSrc(_af23);
const af24 = getImgSrc(_af24);
const af25 = getImgSrc(_af25);
const af26 = getImgSrc(_af26);
const af27 = getImgSrc(_af27);
const af28 = getImgSrc(_af28);
const af29 = getImgSrc(_af29);
const af30 = getImgSrc(_af30);
const af31 = getImgSrc(_af31);

const galleryImages = [af1, af2, af3, af4, af5, af6, af7, af8, af9, af10, af11, af12, af13, af14, af15, af16, af17, af18, af19, af20, af21, af22, af23, af24, af25, af26, af27, af28, af29, af30, af31];

const CTA = ({ label, to = "/contact", className = "" }) => !label ? null : (<Link to={to} className={`inline-flex items-center gap-2 text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 ${className}`}>{label} <span aria-hidden="true">→</span></Link>);
const Eyebrow = ({ children }) => <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">{children}</p>;
const SectionTitle = ({ children, className = "" }) => <h2 className={`text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB] ${className}`}>{children}</h2>;
const ReadText = ({ text }) => <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70 mb-6 last:mb-0">{text}</p>;
const SolutionItem = ({ title, desc }) => (<li className="flex gap-3 md:gap-4 py-3 md:py-5 border-b border-[#1A1A1A] last:border-0"><span className="text-[#4169E1] mt-1 shrink-0">◆</span><p className="text-sm md:text-lg font-light leading-relaxed text-white/70"><span className="text-[#F2F0EB] font-semibold">{title}</span>{desc ? <span className="text-white/60"> — {desc}</span> : null}</p></li>);
const FeatureCard = ({ icon, title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5 hover:border-[#4169E1]/40 transition-colors">{icon && <span className="text-2xl text-[#4169E1] mb-4 block">{icon}</span>}<h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const StatCard = ({ number, label, desc }) => (<div className="bg-[#111] p-5 md:p-[2.5rem] flex flex-col justify-center"><div className="text-2xl md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{number}</div><div className="font-semibold text-[#F2F0EB] mb-[8px] text-sm md:text-base">{label}</div>{desc && <div className="text-xs md:text-lg font-light leading-relaxed text-white/70">{desc}</div>}</div>);
const ProcessCard = ({ step, phase, title, desc }) => (<div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-8 border border-white/5"><div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4"><span className="text-2xl md:text-4xl font-bold text-[#4169E1]">{step}</span>{phase && <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>}</div><h4 className="text-sm md:text-[20px] font-semibold text-[#F2F0EB] mb-2 md:mb-3">{title}</h4>{desc && <p className="text-xs md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-white/70">{desc}</p>}</div>);
const UseCaseCard = ({ title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5"><h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const FaqItem = ({ q, a, isOpen, onToggle }) => (<div className="border-b border-[#1A1A1A]"><button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"><span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span><span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span></button>{isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}</div>);

const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);
};

const AnimationPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">

      {/* Hero Section */}
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.6rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">3D Animation and Motion Graphics Services for Brands and Enterprises<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/BsKw4i6riRw?si=h5LAKoHtg7gM5Liu"
            title="Ahmed Foods Animation Showcase"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="flex-1">
            <Eyebrow>3D Animation & Motion Graphics</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Launching a campaign that needs cinematic animation? See how Elipse Studio's 3D animation services deliver production-quality content for marketing and brand storytelling.", "Animation is one of the most powerful storytelling tools available to modern brands. Whether communicating product features, building brand personality, explaining complex offerings, or marketing premium developments — animation captures attention and delivers information in ways static content cannot match.", "Elipse Studio produces 3D animation services and motion graphics for brands, developers, marketing agencies, and enterprises worldwide. Our animation work combines cinematic craft with practical understanding of how animation serves commercial goals."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Launching a campaign that needs cinematic animation? See how Elipse Studio's 3D animation services deliver production-quality content for marketing and brand storytelling." />
              <ReadText text="Animation is one of the most powerful storytelling tools available to modern brands. Whether communicating product features, building brand personality, explaining complex offerings, or marketing premium developments — animation captures attention and delivers information in ways static content cannot match." />
              <ReadText text="Elipse Studio produces 3D animation services and motion graphics for brands, developers, marketing agencies, and enterprises worldwide. Our animation work combines cinematic craft with practical understanding of how animation serves commercial goals." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">Elipse Studio produces cinematic 3D animation services and motion graphics for brands, developers, and enterprises worldwide. Our animation work spans architectural walkthroughs, product animation, character work, explainer videos, motion graphics, and cinematic marketing content. Powered by Unreal Engine 5, Cinema 4D, After Effects, and V-Ray.</div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* What we do with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our Animation and Motion Graphics Solutions</SectionTitle>
            <ul className="max-w-[680px]">{[{ title: "Architectural Walkthroughs", desc: "Cinematic camera-driven animation traversing designed spaces." },{ title: "Product Animation", desc: "Photreal product motion for launches, marketing, and demonstrations." },{ title: "Character Animation", desc: "3D character work for brand storytelling and marketing content." },{ title: "Motion Graphics", desc: "Typography and iconography animation for social media and corporate content." },{ title: "Explainer Video Animation", desc: "Short-form animation for SaaS, service, and B2B communications." },{ title: "Cinematic Marketing Animation", desc: "Feature-quality brand content for premium campaigns." },{ title: "Real-Time Animation", desc: "Unreal Engine 5 content for interactive and immersive applications." },{ title: "Broadcast and Social Edits", desc: "Multi-format delivery from a single animation production." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our animation solutions showcase" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Cinematic Animation", desc: "Feature-quality brand content for premium campaigns." },{ title: "Product Animation", desc: "Photreal motion for launches and e-commerce." },{ title: "Motion Graphics", desc: "Typography and iconography animation." },{ title: "Explainer Videos", desc: "Short-form animation for SaaS and B2B." },{ title: "Real-Time Content", desc: "Unreal Engine 5 interactive animation." },{ title: "Character Animation", desc: "3D character work for brand storytelling." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "80%", label: "Engagement Lift", desc: "Video content vs static imagery." },{ number: "3x", label: "Share Rate", desc: "Animation content gets shared more." },{ number: "50%", label: "Faster Comprehension", desc: "Complex ideas explained in seconds." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div>
      </section>

      {/* Why Elipse Studio with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Worldwide Choose Elipse Studio for Animation</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="Brands and marketing agencies select Elipse Studio for 3D animation services because our team combines cinematic craft with commercial thinking. Great animation requires more than technical execution — it demands storytelling instinct, brand awareness, and understanding of how animation serves specific business goals." />
              <ReadText text="Our worldwide client base includes real estate developers using architectural animation for property launches, consumer brands using product animation for e-commerce and social marketing, tech companies using explainer animation for SaaS communications, and marketing agencies commissioning premium production." />
              <div className="pt-2 md:pt-4"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>Animation Use Cases</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Property Launches", desc: "Architectural walkthroughs for off-plan sales." },{ title: "Product Marketing", desc: "E-commerce and social media product animation." },{ title: "SaaS Explainers", desc: "Lead generation and product education." },{ title: "Automotive Launches", desc: "Vehicle animation for dealer marketing." },{ title: "B2B Sales", desc: "Product animation for sales enablement." },{ title: "Agency Campaigns", desc: "Premium animation for client campaigns." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div>
      </section>

      {/* Our stack with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Animation Technology Stack</SectionTitle>
            <ReadText text="Elipse Studio's animation pipeline uses Unreal Engine 5 for real-time and cinematic content, Cinema 4D and Autodesk Maya for keyframe animation, Adobe After Effects for motion graphics and compositing, V-Ray and Corona for photrealistic offline rendering, and DaVinci Resolve for color grading and finishing." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our animation technology stack" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Animation Production Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8 justify-center">
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Commercial Scoping" desc="Understanding brand, audience, distribution channels, and business goals." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Concept" title="Concept & Storyboards" desc="Creative concept development and storyboard visualization." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Production" title="3D Asset Creation" desc="Building animation-ready 3D assets." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Animation" title="Scene Animation" desc="Keyframe animation, camera work, and motion." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Post" title="Render & Composite" desc="Final rendering and post-production polish." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Delivery" title="Multi-Format Delivery" desc="Optimized output for every distribution channel." /></div>
        </div>
      </section>

      {/* Selected Work Gallery - Auto Scroll */}
      <section className="bg-[#111] py-10 md:py-[6rem] overflow-hidden">
        <div className="px-5 md:px-8 mb-10 md:mb-20">
          <Eyebrow>Visual output</Eyebrow>
          <SectionTitle>Selected work</SectionTitle>
        </div>
        <div className="relative">
          <div className="flex animate-marquee-gallery gap-3 md:gap-[15px] w-max">
            {[...galleryImages, ...galleryImages].map((src, i) => (
              <div key={i} className="flex-shrink-0 w-[70vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] aspect-[16/9] overflow-hidden">
                <img src={src} alt={`Animation showcase ${(i % galleryImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="max-w-[800px] mx-auto">
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="max-w-[680px]">{[{ q: "What are 3D animation services?", a: "3D animation services encompass the creation of moving imagery in three-dimensional space — for marketing, product launches, brand storytelling, and technical communication." },{ q: "What types of 3D animation does Elipse Studio produce?", a: "We produce architectural walkthroughs, product animation, character animation, motion graphics, explainer videos, cinematic marketing animation, real-time animation, and specialty animation." },{ q: "How long does 3D animation production take?", a: "Motion graphics: 3-5 weeks. Product animation: 4-8 weeks. Character animation and walkthroughs: 8-14 weeks. Cinematic marketing: 12-20+ weeks." },{ q: "Can Elipse Studio work with our marketing agency?", a: "Yes. We frequently partner with marketing agencies as their production execution partner." },{ q: "What software does Elipse Studio use?", a: "Unreal Engine 5, Cinema 4D, Autodesk Maya, Adobe After Effects, V-Ray, Corona, and DaVinci Resolve." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Elevate your brand with cinematic 3D animation</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your animation project. Our team responds within one business day with a scoped approach.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div>
      </section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:'Architectural Visualization',to:'/services/architectural-visualization'},{label:'VFX & Virtual Production',to:'/services/vfx-virtual-production'},{label:'Product Visualization',to:'/services/3d-product-visualization'}]} relatedArticles={[{label:'Industrial 3D Animation: Communicating Complexity Visually',to:'/blog/industrial-animation'},{label:'Why Animated Videos Drive More Engagement',to:'/blog/animated-videos-engagement'},{label:'Educational Animation in 2026',to:'/blog/educational-animation-2026'}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default AnimationPage;

