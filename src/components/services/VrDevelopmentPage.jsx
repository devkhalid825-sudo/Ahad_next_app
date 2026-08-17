'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import LatestWork from "../features/LatestWork";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import ClientReviews from "../features/ClientReviews";

import _solutionsImg from "../../assets/tim-barth/Day/01.0000.webp";
import _whyUsImg from "../../assets/tim-barth/Day/06.0000.webp";
import _stackImg from "../../assets/tim-barth/Day/11.0000.webp";
import _day1 from "../../assets/tim-barth/Day/01.0000.webp";
import _day2 from "../../assets/tim-barth/Day/06.0000.webp";
import _day3 from "../../assets/tim-barth/Day/11.0000.webp";
import _night1 from "../../assets/tim-barth/Night/01.0000.webp";
import _night2 from "../../assets/tim-barth/Night/06.0000.webp";
import _night3 from "../../assets/tim-barth/Night/11.0000.webp";
import { getImgSrc } from "../../utils/api";
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);
const day1 = getImgSrc(_day1);
const day2 = getImgSrc(_day2);
const day3 = getImgSrc(_day3);
const night1 = getImgSrc(_night1);
const night2 = getImgSrc(_night2);
const night3 = getImgSrc(_night3);

const dayImages = [day1, day2, day3];
const nightImages = [night1, night2, night3];

const CTA = ({ label, to = "/contact", className = "" }) =>
  !label ? null : (
    <Link to={to} className={`inline-flex items-center gap-2 text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 ${className}`}>
      {label} <span aria-hidden="true">→</span>
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
    <span className="text-[#4169E1] mt-1 shrink-0">◆</span>
    <p className="text-sm md:text-lg font-light leading-relaxed text-white/70">
      <span className="text-[#F2F0EB] font-semibold">{title}</span>
      {desc ? <span className="text-white/60"> — {desc}</span> : null}
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

const VrDevelopmentPage = () => {
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
          Custom VR Development Services for Enterprise Training, Sales, and Marketing<span className="text-[#4169E1]">.</span>
        </h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]">
          <button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button>
        </div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/aXGkn51OToA?si=RtJ4AEq4LVTfDo2B"
            title="VR Development Showcase"
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
            <Eyebrow>VR Development</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Ready to deploy enterprise VR? See how Elipse Studio's VR development services deliver measurable training and commercial results.", "Virtual reality is no longer future technology — it is present-day business infrastructure. Enterprises deploy VR for training that reduces workplace incidents. Real estate developers deploy VR for sales centers that close international buyers. Manufacturers deploy VR for product demonstrations impossible in traditional formats.", "Elipse Studio delivers VR development services for enterprises, real estate developers, manufacturers, healthcare organizations, and specialty brands worldwide. Since 2014, we have built VR experiences that deliver measurable business outcomes — not impressive demos that generate press but produce no commercial results."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Ready to deploy enterprise VR? See how Elipse Studio's VR development services deliver measurable training and commercial results." />
              <ReadText text="Virtual reality is no longer future technology — it is present-day business infrastructure. Enterprises deploy VR for training that reduces workplace incidents. Real estate developers deploy VR for sales centers that close international buyers. Manufacturers deploy VR for product demonstrations impossible in traditional formats." />
              <ReadText text="Elipse Studio delivers VR development services for enterprises, real estate developers, manufacturers, healthcare organizations, and specialty brands worldwide. Since 2014, we have built VR experiences that deliver measurable business outcomes — not impressive demos that generate press but produce no commercial results." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">
              Elipse Studio delivers custom VR development services for enterprise training, sales enablement, immersive marketing, and simulation applications. Our VR development supports Meta Quest 3, HTC Vive Focus, PICO 4 Enterprise, and premium Varjo XR-4 platforms. Powered by Unreal Engine 5 and Unity, we build production-ready VR experiences for clients worldwide since 2014.
            </div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* What we do with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our VR Development Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[
                { title: "Enterprise VR Training Platforms", desc: "Scalable training for manufacturing, energy, healthcare, and specialty industries." },
                { title: "Real Estate VR Sales Centers", desc: "Immersive property experiences for off-plan sales and international buyer outreach." },
                { title: "Product Demonstration VR", desc: "Interactive product experiences for B2B sales and marketing." },
                { title: "VR Architectural Walkthroughs", desc: "Design review platforms for architects and developers." },
                { title: "Safety Training Simulations", desc: "High-consequence scenario training for construction, industrial, and energy." },
                { title: "Medical and Surgical VR", desc: "Anatomical education and procedural training platforms." },
                { title: "VR Marketing Experiences", desc: "Brand experiences for events, showrooms, and campaigns." },
                { title: "Interactive VR Presentations", desc: "Boardroom-grade immersive presentations for high-value pitches." },
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our VR solutions showcase" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Enterprise Training", desc: "Scalable VR training with LMS integration." },
            { title: "Sales Centers", desc: "Immersive VR property and product experiences." },
            { title: "Safety Simulation", desc: "High-consequence scenario training." },
            { title: "Medical VR", desc: "Anatomical and procedural training." },
            { title: "Multi-Platform", desc: "Meta Quest, HTC Vive, PICO, Varjo." },
            { title: "Enterprise Integration", desc: "LMS, CRM, and analytics connectivity." },
          ].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}
        </div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">
          {[
            { number: "60%", label: "Training Cost Reduction", desc: "Vs traditional instructor-led methods." },
            { number: "95%", label: "Knowledge Retention", desc: "VR-trained vs traditionally trained." },
            { number: "3x", label: "Faster Onboarding", desc: "New employee readiness acceleration." },
          ].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}
        </div>
      </section>

      {/* Why Elipse Studio with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Enterprises Worldwide Choose Elipse Studio for VR</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="Enterprise clients select Elipse Studio for VR development services because our team combines VR craft with genuine understanding of enterprise deployment realities. Effective VR requires more than impressive graphics — it demands pedagogical structure for training applications, commercial understanding for sales applications, and integration architecture for enterprise platforms." />
              <ReadText text="Our VR work meets enterprise standards for security, deployment consistency, and long-term maintenance. Multi-site rollout support ensures the same experience deploys reliably across every location. Integration with major LMS platforms via SCORM and xAPI standards means learner performance data flows into existing enterprise infrastructure." />
              <div className="pt-2 md:pt-4"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why enterprises choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>VR Development Use Cases</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Manufacturing Training", desc: "Equipment training that reduces incidents." },
            { title: "Energy & Utilities", desc: "High-consequence scenario training." },
            { title: "Real Estate Sales", desc: "VR sales centers for international buyers." },
            { title: "Healthcare", desc: "Surgical training and medical education." },
            { title: "Automotive Launches", desc: "Vehicle launch experiences and dealer training." },
            { title: "Retail Showrooms", desc: "Immersive brand experiences and events." },
          ].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}
        </div>
      </section>

      {/* Our stack with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our VR Technology Platform</SectionTitle>
            <ReadText text="Elipse Studio's VR pipeline supports Meta Quest 3 and Meta Quest Pro for cost-effective standalone deployment, HTC Vive Focus and PICO 4 Enterprise for enterprise programs with better institutional management, and Varjo XR-4 for premium visual fidelity applications. Our development stack uses Unreal Engine 5 and Unity — choosing per project based on visual quality requirements, deployment scale, and integration needs." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our VR technology platform" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our VR Development Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8" style={{ justifyContent: 'center' }}>
          {[
            { step: "01", phase: "Discovery", title: "Commercial Scoping", desc: "Understanding business objectives, users, deployment scale, and metrics." },
            { step: "02", phase: "Design", title: "Experience Design", desc: "VR interaction design and scenario development." },
            { step: "03", phase: "Production", title: "3D Asset Creation", desc: "Building immersive environments and interactions." },
            { step: "04", phase: "Development", title: "Interaction Development", desc: "VR mechanics, controls, and feedback systems." },
            { step: "05", phase: "Testing", title: "User Testing & Integration", desc: "Enterprise system integration and user validation." },
            { step: "06", phase: "Launch", title: "Deployment & Analytics", desc: "Multi-site deployment with performance tracking." },
          ].map((p, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard {...p} /></div>)}
        </div>
      </section>

      {/* Selected Work Gallery - Dual Marquee Day + Night */}
      <section className="bg-[#111] py-10 md:py-[6rem] overflow-hidden">
        <div className="px-5 md:px-8 mb-10 md:mb-20">
          <Eyebrow>Visual output</Eyebrow>
          <SectionTitle>Selected work</SectionTitle>
        </div>

        {/* Day Row */}
        <div className="mb-10 md:mb-16">
          <div className="px-5 md:px-8 mb-5 md:mb-8">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[6px]">VR Experience</p>
            <h3 className="text-xl md:text-3xl font-medium text-[#F2F0EB]">Day scenes</h3>
          </div>
          <div className="relative">
            <div className="flex animate-marquee-gallery gap-3 md:gap-[15px] w-max">
              {[...dayImages, ...dayImages].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[70vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] aspect-[16/9] overflow-hidden">
                  <img src={src} alt={`VR Day showcase ${(i % dayImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Night Row */}
        <div className="mt-6 md:mt-10">
          <div className="px-5 md:px-8 mb-5 md:mb-8">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[6px]">VR Experience</p>
            <h3 className="text-xl md:text-3xl font-medium text-[#F2F0EB]">Night scenes</h3>
          </div>
          <div className="relative">
            <div className="flex animate-marquee-gallery gap-3 md:gap-[15px] w-max" style={{ animationDirection: 'reverse' }}>
              {[...nightImages, ...nightImages].map((src, i) => (
                <div key={i} className="flex-shrink-0 w-[70vw] sm:w-[55vw] md:w-[45vw] lg:w-[35vw] aspect-[16/9] overflow-hidden">
                  <img src={src} alt={`VR Night showcase ${(i % nightImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="max-w-[800px] mx-auto">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="max-w-[680px]">
            {[
              { q: "What are VR development services?", a: "VR development services encompass the design, development, and deployment of custom virtual reality applications for enterprise training, sales, marketing, and simulation. Elipse Studio delivers VR development for clients worldwide." },
              { q: "Which VR hardware does Elipse Studio support?", a: "We support Meta Quest 3, Meta Quest Pro, HTC Vive Focus, PICO 4 Enterprise, and premium Varjo XR-4. Hardware recommendations depend on your specific use case." },
              { q: "Can VR training integrate with our LMS?", a: "Yes. Our VR training platforms integrate with major LMS systems including Blackboard, Canvas, Moodle, Cornerstone OnDemand, and SAP SuccessFactors via SCORM 1.2, SCORM 2004, and xAPI standards." },
              { q: "How does VR training compare to traditional training?", a: "VR training augments rather than replaces traditional training in most contexts. However, VR delivers capabilities traditional training cannot — safe practice of dangerous scenarios, scalable equipment-free training, and consistent delivery." },
              { q: "How long does VR development take?", a: "Focused VR experiences typically deliver in 12-20 weeks. Enterprise training platforms extend to 20-30 weeks. Complex simulation platforms span 6+ months." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center">
          <h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Deploy production-grade VR with proven partners</h2>
          <p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your VR project — training, sales, or marketing application. Our team responds within one business day with a scoped approach.</p>
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
      <ServiceRelatedLinks relatedServices={[{label:"AR Development",to:"/services/ar-development"},{label:"Virtual Showrooms",to:"/services/virtual-showrooms-digital-twins"},{label:"3D Animation",to:"/services/3d-animation"}]} relatedArticles={[{label:"How VR Is Reshaping the World",to:"/blog/vr-reshaping-world"},{label:"Custom VR Development Services",to:"/blog/vr-custom-development-2026"},{label:"Educational Animation in 2026",to:"/blog/educational-animation-2026"}]} />
      <LatestWork />
      <ClientReviews />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  

  </>

  );
};

export default VrDevelopmentPage;

