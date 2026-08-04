'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import LatestWork from "../features/LatestWork";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/ElipseImages/projects/3601.webp";

import _solutionsImg from "../../assets/ElipseImages/projects/Steering-1.webp";
import _whyUsImg from "../../assets/ElipseImages/projects/2.webp";
import _stackImg from "../../assets/ElipseImages/projects/capabilities-sec.webp";
import { getImgSrc } from "../../utils/api";
const heroImg = getImgSrc(_heroImg);
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);

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
const TextCarousel = ({ texts }) => {const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);};

const InteractiveWebExperiencesPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">

              <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.6rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Interactive Web Experiences and Immersive 3D Website Development<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/QGNO3iS2ojo?si=VkD9T5I3GqhPTBnc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
        <div>
          <Eyebrow>Interactive Web Experiences</Eyebrow>
          <SectionTitle>Overview</SectionTitle>
          <div className="md:hidden"><TextCarousel texts={["Launching a premium digital campaign? Elipse Studio creates immersive interactive web experiences that make brands memorable.", "Static websites lost their competitive edge years ago. Premium brands and forward-thinking marketing agencies now compete for attention through interactive web experiences — immersive digital environments combining 3D content, sophisticated motion design, and meaningful interactivity.", "Elipse Studio designs and builds interactive web experiences for brands, marketing agencies, product launches, and premium digital campaigns worldwide. Our team combines creative direction with technical execution across WebGL, Three.js, Babylon.js, and modern web animation frameworks."]} /></div>
          <div className="hidden md:block">
            <ReadText text="Launching a premium digital campaign? Elipse Studio creates immersive interactive web experiences that make brands memorable." />
            <ReadText text="Static websites lost their competitive edge years ago. Premium brands and forward-thinking marketing agencies now compete for attention through interactive web experiences — immersive digital environments combining 3D content, sophisticated motion design, and meaningful interactivity." />
            <ReadText text="Elipse Studio designs and builds interactive web experiences for brands, marketing agencies, product launches, and premium digital campaigns worldwide. Our team combines creative direction with technical execution across WebGL, Three.js, Babylon.js, and modern web animation frameworks." />
          </div>
        </div>
        <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]">
          <Eyebrow>TL;DR</Eyebrow>
          <SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle>
          <div className="text-base md:text-lg font-light leading-relaxed text-white/70">
            Elipse Studio designs and develops interactive web experiences for brands, marketing agencies, and enterprises worldwide. Our immersive websites combine 3D content, motion, and interactivity using WebGL through Three.js and Babylon.js — delivering award-quality digital experiences that differentiate brands from static competitors. Founded 2014, serving worldwide clients with production-ready output.
          </div>
          <div className="mt-6"><CTA label="Get Started" to="/contact" /></div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our Interactive Web Experience Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[
                { title: "Product Launch Experiences", desc: "Immersive experiences for premium product introductions." },
                { title: "Brand Landing Experiences", desc: "Interactive homepages and campaign pages that differentiate." },
                { title: "Immersive Storytelling Sites", desc: "Scroll-driven narrative experiences combining 3D and motion." },
                { title: "Interactive Portfolio Sites", desc: "Standout portfolios for creative studios and premium brands." },
                { title: "Award Campaign Websites", desc: "Experiences engineered for FWA, Awwwards, and CSS Design Awards." },
                { title: "Interactive Data Visualization", desc: "Explorable data experiences for reports and campaigns." },
                { title: "WebGL Marketing Experiences", desc: "Real-time 3D marketing content playable in any modern browser." },
                { title: "Interactive Event Sites", desc: "Immersive online experiences for launches and virtual events." },
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our interactive web solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "WebGL 3D Rendering", desc: "Three.js and Babylon.js cross-browser 3D." },
            { title: "Motion Design", desc: "GSAP-powered sophisticated animations." },
            { title: "Scroll Narratives", desc: "Scroll-driven storytelling experiences." },
            { title: "Real-Time 3D", desc: "Unreal Engine 5 web experiences." },
            { title: "Performance Optimization", desc: "Cross-device delivery including mobile." },
            { title: "Custom Shaders", desc: "Unique visual effects and materials." },
          ].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}
        </div>
      </section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">
          {[
            { number: "5x", label: "Engagement Lift", desc: "Time-on-site vs static alternatives." },
            { number: "40%", label: "Bounce Reduction", desc: "Through interactive engagement." },
            { number: "3x", label: "Social Sharing", desc: "Memorable experiences get shared." },
          ].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Choose Elipse Studio for Interactive Web Experiences</SectionTitle>
            <div>
              <ReadText text="Marketing agencies, premium brands, and creative studios select Elipse Studio because our team combines creative sensibility with technical craft. Modern interactive web development requires both strong creative direction and deep technical execution — talents that rarely exist together in one team." />
              <ReadText text="Our worldwide client base spans marketing agencies commissioning production for their clients, premium brands seeking direct differentiation, and creative studios needing production partners for ambitious digital campaigns." />
              <ReadText text="See our interactive web experience portfolio. Explore award-quality immersive experiences Elipse Studio has built for brands and marketing agencies worldwide." />
              <div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>Use Cases for Interactive Web Experiences</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Product Launches", desc: "Experiences that generate press and social sharing." },
            { title: "Brand Campaigns", desc: "Interactive experiences for major client campaigns." },
            { title: "Creative Portfolios", desc: "Immersive portfolios for high-value client attraction." },
            { title: "Auto & Fashion", desc: "Interactive campaigns for premium brand perception." },
            { title: "Cultural Institutions", desc: "Interactive storytelling for digital exhibits." },
            { title: "Tech Announcements", desc: "Interactive experiences for platform launches." },
          ].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Technology Approach</SectionTitle>
            <div>
              <ReadText text="Elipse Studio's interactive web experience stack uses WebGL through Three.js for cross-browser 3D rendering, Babylon.js for game-engine-level web capabilities, GSAP for sophisticated motion design, React and Next.js for modern frontend architecture, and specialized shader development for custom visual effects. Every experience is engineered for cross-device performance including mobile optimization." />
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our technology stack" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>
       
      

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Process for Interactive Web Development</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8 justify-center">
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Creative Direction" desc="Understanding brand story, audience, and experience objectives." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Concept" title="Concept Exploration" desc="Developing creative concepts and design directions." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Design" title="Design Mockups" desc="Detailed visual design and interaction specification." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Development" title="WebGL Development" desc="3D asset creation and WebGL implementation." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Motion" title="Motion Integration" desc="GSAP animations and scroll-driven interactions." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Launch" title="Performance & Launch" desc="Cross-device optimization and quality assurance." /></div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="max-w-[800px] mx-auto">
          <Eyebrow>FAQ</Eyebrow>
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="max-w-[680px]">
            {[
              { q: "What are interactive web experiences?", a: "Interactive web experiences are immersive digital experiences combining 3D content, sophisticated motion, and meaningful interactivity — going far beyond static websites. They deliver memorable brand moments through WebGL, animation, and interactive storytelling." },
              { q: "Do interactive web experiences work on mobile devices?", a: "Yes. Elipse Studio engineers every interactive web experience for cross-device performance, including mobile devices. We optimize 3D asset complexity, texture sizes, and rendering approaches." },
              { q: "Which technologies power interactive web experiences?", a: "We use WebGL through Three.js and Babylon.js for 3D rendering, GSAP for motion design, React and Next.js for frontend architecture, and custom shaders for unique visual effects." },
              { q: "How long does an interactive web experience take to build?", a: "Focused interactive experiences typically deliver in 8-14 weeks. Complex award-quality experiences span 14-24 weeks. Enterprise digital installations extend to 6+ months." },
              { q: "Can Elipse Studio work with our creative agency?", a: "Yes. We frequently partner with marketing agencies and creative studios as their production execution partner. Agencies handle client relationships; our team delivers technical execution to award-quality standards." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center">
          <h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Create memorable brand moments with interactive web experiences</h2>
          <p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your brand campaign or client project. Our team responds within one business day with a scoped creative and technical approach.</p>
          <div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div>
        </div>
      </section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]">
        <div className="flex items-center justify-between flex-wrap gap-[10px] w-full">
          <div className="flex gap-[10px] flex-wrap">
            <button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}>
              <span aria-hidden="true">▦</span> All work
            </button>
            <button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}>
              <span aria-hidden="true">➤</span> Start a project
            </button>
          </div>
        </div>
      </footer>
      <ServiceRelatedLinks relatedServices={[{label:"3D Product Configurators",to:"/services/3d-product-configurators"},{label:"Website Development",to:"/services/website-development"},{label:"AR Development",to:"/services/ar-development"}]} relatedArticles={[{label:"How Web-Based Configurators Transform Sales",to:"/blog/web-based-configurator"},{label:"Automotive 3D Configurator",to:"/blog/automotive-configurator"}]} />
      <LatestWork />
      <ClientReviews />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  

  </>

  );
};

export default InteractiveWebExperiencesPage;

