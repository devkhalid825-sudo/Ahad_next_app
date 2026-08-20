'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import LatestWork from "../features/LatestWork";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import ClientReviews from "../features/ClientReviews";

// Aap in 3 placeholders ko apni marzi ke mutabik real paths se replace kar sakte hain:
// Sahi format mein imported images:
import _solutionsImg from "../../assets/emerled/Bathroom.webp";
import _whyUsImg from "../../assets/emerled/Kithcen.webp";
import _stackImg from "../../assets/emerled/Reception.webp";
import _emerledBathroom from "../../assets/emerled/Bathroom.webp";
import _emerledBedroom from "../../assets/emerled/Bedroom.webp";
import _emerledKitchen from "../../assets/emerled/Kithcen.webp";
import _emerledLiving from "../../assets/emerled/Living.webp";
import _emerledReception from "../../assets/emerled/Reception.webp";
import { getImgSrc } from "../../utils/api";
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);
const emerledBathroom = getImgSrc(_emerledBathroom);
const emerledBedroom = getImgSrc(_emerledBedroom);
const emerledKitchen = getImgSrc(_emerledKitchen);
const emerledLiving = getImgSrc(_emerledLiving);
const emerledReception = getImgSrc(_emerledReception);

const galleryImages = [emerledBathroom, emerledBedroom, emerledKitchen, emerledLiving, emerledReception];

const CTA = ({ label, to = "/contact", className = "" }) =>
  !label ? null : (
    <Link to={to} className={`inline-flex items-center gap-2 text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 ${className}`}>
      {label} <span aria-hidden="true">?</span>
    </Link>
  );

const Eyebrow = ({ children }) => (
  <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">{children}</p>
);

const SectionTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB] ${className}`}>{children}</h2>
);

const ReadText = ({ text }) => (
  <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70 mb-6 last:mb-0">{text}</p>
);

const SolutionItem = ({ title, desc }) => (
  <li className="flex gap-3 md:gap-4 py-3 md:py-5 border-b border-[#1A1A1A] last:border-0">
    <span className="text-[#4169E1] mt-1 shrink-0">?</span>
    <p className="text-sm md:text-lg font-light leading-relaxed text-white/70">
      <span className="text-[#F2F0EB] font-semibold">{title}</span>
      {desc ? <span className="text-white/60"> � {desc}</span> : null}
    </p>
  </li>
);

const FeatureCard = ({ icon, title, desc }) => (
  <div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5 hover:border-[#4169E1]/40 transition-colors">
    {icon && <span className="text-2xl text-[#4169E1] mb-4 block">{icon}</span>}
    <h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>
    {desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}
  </div>
);

const StatCard = ({ number, label, desc }) => (
  <div className="bg-[#111] p-5 md:p-[2.5rem] flex flex-col justify-center">
    <div className="text-2xl md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{number}</div>
    <div className="font-semibold text-[#F2F0EB] mb-[8px] text-sm md:text-base">{label}</div>
    {desc && <div className="text-xs md:text-lg font-light leading-relaxed text-white/70">{desc}</div>}
  </div>
);

const ProcessCard = ({ step, phase, title, desc }) => (
  <div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-8 border border-white/5">
    <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
      <span className="text-2xl md:text-4xl font-bold text-[#4169E1]">{step}</span>
      {phase && (
        <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>
      )}
    </div>
    <h4 className="text-sm md:text-[20px] font-semibold text-[#F2F0EB] mb-2 md:mb-3">{title}</h4>
    {desc && <p className="text-xs md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-white/70">{desc}</p>}
  </div>
);

const UseCaseCard = ({ title, desc }) => (
  <div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5">
    <h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>
    {desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}
  </div>
);

const FaqItem = ({ q, a, isOpen, onToggle }) => (
  <div className="border-b border-[#1A1A1A]">
    <button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left">
      <span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span>
      <span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span>
    </button>
    {isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}
  </div>
);

const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);
};

const ArchitecturalVisualizationPage = () => {
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
        <h1 className="text-[clamp(1.6rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">
          Architectural Visualization Services for Developers and Architects Worldwide<span className="text-[#4169E1]">.</span>
        </h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]">
  <button
    onClick={handleStartProject}
    className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto"
  >
    Start a Project ?
  </button>
</div>
        
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/ugd5UTGFQ8U?si=NxfPeaX0KUY-mHH6" 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="flex-1">
            <Eyebrow>Architectural Visualization</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Launching an off-plan development or design competition? See how Elipse Studio's architectural visualization services deliver sales-driving results.", "Architectural visualization has become the deciding factor in whether developments sell before construction, whether architectural competitions get won, and whether stakeholder approvals happen smoothly. Buyers, jury members, and investors no longer make decisions from 2D drawings � they need photorealistic 3D representations that capture spatial experience, material quality, and lighting behavior with genuine accuracy.", "Elipse Studio delivers architectural visualization services that meet the exacting standards premium projects require. Founded in 2014, our team has produced visualization for real estate developers, architects, and design firms worldwide � including landmark developments like Burj Binghatti."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Launching an off-plan development or design competition? See how Elipse Studio's architectural visualization services deliver sales-driving results." />
              <ReadText text="Architectural visualization has become the deciding factor in whether developments sell before construction, whether architectural competitions get won, and whether stakeholder approvals happen smoothly. Buyers, jury members, and investors no longer make decisions from 2D drawings � they need photorealistic 3D representations that capture spatial experience, material quality, and lighting behavior with genuine accuracy." />
              <ReadText text="Elipse Studio delivers architectural visualization services that meet the exacting standards premium projects require. Founded in 2014, our team has produced visualization for real estate developers, architects, and design firms worldwide � including landmark developments like Burj Binghatti." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">
              Elipse Studio delivers photorealistic architectural visualization services to real estate developers, architects, and design firms worldwide. Since 2014, our team has produced 3D renderings, cinematic walkthroughs, VR architectural experiences, and interactive presentation platforms for premium developments including Burj Binghatti.
            </div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* 1. "What we do" section with Solutions Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our Complete Architectural Visualization Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[
                { title: "Exterior Renderings", desc: "Photorealistic exterior visualization for hero marketing shots, brochures, and website assets." },
                { title: "Interior Renderings", desc: "Editorial-quality interior visualization for residential, hospitality, and commercial spaces." },
                { title: "Aerial and Contextual Renderings", desc: "Drone-perspective visualization showing developments within their urban context." },
                { title: "Architectural Walkthroughs", desc: "Cinematic camera-driven animation traversing designed spaces." },
                { title: "VR Architectural Experiences", desc: "Immersive VR walkthroughs for sales centers and design reviews." },
                { title: "Interactive Presentation Platforms", desc: "Real-time architectural experiences for investor pitches and stakeholder engagement." },
                { title: "Master Plan Visualization", desc: "Large-scale visualization for master-planned communities and mixed-use developments." },
                { title: "Day/Night Variations", desc: "Multiple lighting conditions from a single 3D asset pipeline." },
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our architectural solutions showcase" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Photorealistic Renderings", desc: "V-Ray and Corona quality output for print and digital marketing." },
            { title: "Cinematic Animation", desc: "Camera-driven architectural storytelling for launches." },
            { title: "VR Experiences", desc: "Immersive walkthroughs for sales centers and reviews." },
            { title: "Real-Time Platforms", desc: "Unreal Engine 5 interactive presentations." },
            { title: "Interactive Web", desc: "Browser-based 3D experiences for global reach." },
            { title: "AR Mobile", desc: "Augmented reality property visualization." },
          ].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}
        </div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px  border border-white/5 rounded-xl overflow-hidden">
          {[
            { number: "500+", label: "Projects Delivered", desc: "Visualization projects for global clients." },
            { number: "10+", label: "Years Experience", desc: "Since 2014 delivering production output." },
            { number: "98%", label: "Client Retention", desc: "Clients return for additional projects." },
          ].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}
        </div>
      </section>

      {/* 2. "Why Elipse Studio" section with WhyUs Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Developers and Architects Worldwide Choose Elipse Studio</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="Real estate developers and architectural firms select Elipse Studio because our team combines photorealistic craft with genuine commercial understanding. Our visualization is engineered to achieve specific business outcomes: closing off-plan sales, winning architectural competitions, and securing stakeholder approvals." />
              <ReadText text="The strategic advantage of working with our team is integrated capability across every visualization format. Rather than coordinating multiple vendors, you work with one experienced partner that produces every deliverable from a single 3D asset pipeline." />
              <div className="pt-2 md:pt-4"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why developers choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>Use Cases for Architectural Visualization Services</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Off-Plan Sales", desc: "Exterior renderings and interior walkthroughs for international buyer outreach." },
            { title: "Design Competitions", desc: "Competition-quality visualization against global competitors." },
            { title: "Stakeholder Approvals", desc: "Real-time experiences for investor pitches." },
            { title: "Marketing Campaigns", desc: "Cinematic animation for premium launches." },
            { title: "Sales Centers", desc: "VR walkthroughs for immersive property tours." },
            { title: "Master Planning", desc: "Large-scale visualization for mixed-use developments." },
          ].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}
        </div>
      </section>

      {/* 3. "Our stack" section with Stack Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Technology and Production Approach</SectionTitle>
            <ReadText text="Elipse Studio's architectural visualization pipeline uses industry-leading tools: Unreal Engine 5 for photorealistic real-time rendering, V-Ray and Corona for offline cinematic-quality rendering, Rhino and Revit integration for architectural workflow compatibility, and specialized VR platforms including Meta Quest 3 and Varjo XR-4 for immersive experiences." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our technology and production pipeline" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Architectural Visualization Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8" style={{ justifyContent: 'center' }}>
          {[
            { step: "01", phase: "Discovery", title: "Strategic Scoping", desc: "Understanding commercial goals, target audience, and delivery timeline." },
            { step: "02", phase: "Production", title: "3D Asset Preparation", desc: "Building and optimizing 3D geometry from architectural source files." },
            { step: "03", phase: "Review", title: "Camera Composition", desc: "Initial camera angles and compositions with client approval gates." },
            { step: "04", phase: "Refinement", title: "Materials & Lighting", desc: "Developing physically-accurate materials and cinematic lighting." },
            { step: "05", phase: "Iteration", title: "Refinement Rounds", desc: "Iterative feedback and polish based on client review." },
            { step: "06", phase: "Delivery", title: "Final Production", desc: "High-resolution rendering with post-production polish." },
          ].map((p, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard {...p} /></div>)}
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
                <img src={src} alt={`Architectural showcase ${(i % galleryImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" width="640" height="400"/>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="max-w-[800px] mx-auto">
          
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="max-w-[680px]">
            {[
              { q: "What are architectural visualization services and how do they help my project?", a: "Architectural visualization services create photorealistic 3D representations of buildings and spaces before physical construction begins. They help by enabling off-plan property sales, winning architectural competitions, securing stakeholder approvals, and marketing developments to international audiences. Elipse Studio has delivered architectural visualization worldwide since 2014." },
              { q: "Can Elipse Studio work directly from Revit, Rhino, or SketchUp files?", a: "Yes. Elipse Studio's architectural visualization pipeline works with all major architectural design formats including Revit, Rhino, SketchUp, AutoCAD, and ArchiCAD. Our team handles file translation and geometry cleanup so architects deliver source files in their native workflow." },
              { q: "Do you deliver both static renderings and VR walkthroughs?", a: "Yes. Elipse Studio delivers photorealistic renderings, cinematic architectural animation, browser-based virtual tours, immersive VR walkthroughs, and AR mobile experiences � all from an integrated 3D asset pipeline." },
              { q: "How long does a typical architectural visualization project take?", a: "Focused exterior and interior renderings typically deliver in 3-5 weeks. Full presentation packages span 8-14 weeks. VR experiences and interactive presentations require 12-20 weeks." },
              { q: "How do I start an architectural visualization project with Elipse Studio?", a: "Contact Elipse Studio with a brief description of your development � property type, target audience, timeline, and visualization scope needed. A senior team member responds within one business day with a scoped approach." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center">
          <h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Ready to elevate your development with photoreal visualization?</h2>
          <p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your project. Our team will respond within one business day with a scoped approach for your architectural visualization needs.</p>
          <div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div>
        </div>
      </section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]">
        <div className="flex items-center justify-between flex-wrap gap-[10px] w-full">
          <div className="flex gap-[10px] flex-wrap">
            <button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}>
              <span aria-hidden="true">?</span> All work
            </button>
            <button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}>
              <span aria-hidden="true">?</span> Start a project
            </button>
          </div>
        </div>
      </footer>
      <ServiceRelatedLinks relatedServices={[{label:"3D Product Visualization",to:"/services/3d-product-visualization"},{label:"Virtual Showrooms",to:"/services/virtual-showrooms-digital-twins"},{label:"3D Animation",to:"/services/3d-animation"}]} relatedArticles={[{label:"Architectural Visualization: The Complete Guide",to:"/blog/architectural-visualization-guide"},{label:"3D Real-Time Configurators for Real Estate in Dubai",to:"/blog/3d-real-time-configurators-real-estate-dubai"}]} />
      <LatestWork />
      <ClientReviews />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  

  </>

  );
};

export default ArchitecturalVisualizationPage;
