'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/YPC/V1_15_C0674045.webp";
import _galleryImg from "../../assets/YPC/V1_03_C0701045.webp";
import _solutionsImg from "../../assets/YPC/V1_03_C0626_13.webp";
import _whyUsImg from "../../assets/YPC/V1_01_C0525045.webp";
import _stackImg from "../../assets/YPC/bottlediffuse106.webp";
import { getImgSrc } from "../../utils/api";
const heroImg = getImgSrc(_heroImg);
const galleryImg = getImgSrc(_galleryImg);
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);

const CTA = ({ label, to = "/contact", className = "" }) => !label ? null : (<Link to={to} className={`inline-flex items-center gap-2 text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 ${className}`}>{label} <span aria-hidden="true">→</span></Link>);
const Eyebrow = ({ children }) => <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">{children}</p>;
const SectionTitle = ({ children, className = "" }) => <h2 className={`text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB] ${className}`}>{children}</h2>;
const ReadText = ({ text }) => <p className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70 mb-6 last:mb-0">{text}</p>;
const SolutionItem = ({ title, desc }) => (<li className="flex gap-3 md:gap-4 py-3 md:py-5 border-b border-[#1A1A1A] last:border-0"><span className="text-[#4169E1] mt-1 shrink-0">◆</span><p className="text-sm md:text-lg font-light leading-relaxed text-white/70"><span className="text-[#F2F0EB] font-semibold">{title}</span>{desc ? <span className="text-white/60"> — {desc}</span> : null}</p></li>);
const FeatureCard = ({ icon, title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5 hover:border-[#4169E1]/40 transition-colors">{icon && <span className="text-2xl text-[#4169E1] mb-4 block">{icon}</span>}<h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const StatCard = ({ number, label, desc }) => (<div className="bg-[#111] p-5 md:p-[2.5rem] flex flex-col justify-center"><div className="text-2xl md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{number}</div><div className="text-sm md:text-base font-semibold text-[#F2F0EB] mb-[8px]">{label}</div>{desc && <div className="text-xs md:text-lg font-light leading-relaxed text-white/70">{desc}</div>}</div>);
const ProcessCard = ({ step, phase, title, desc }) => (<div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-8 border border-white/5"><div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4"><span className="text-2xl md:text-4xl font-bold text-[#4169E1]">{step}</span>{phase && <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>}</div><h4 className="text-sm md:text-[20px] font-semibold text-[#F2F0EB] mb-2 md:mb-3">{title}</h4>{desc && <p className="text-xs md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-white/70">{desc}</p>}</div>);
const UseCaseCard = ({ title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5"><h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const FaqItem = ({ q, a, isOpen, onToggle }) => (<div className="border-b border-[#1A1A1A]"><button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"><span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span><span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span></button>{isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}</div>);
const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);};

const VfxVirtualProductionPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">VFX and Virtual Production Services for Film, Commercial, and Brand Content<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/pp966NwsfOg?si=HdC02f_u8HDc2RjU" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
        <div className="p-[2rem]"><Eyebrow>VFX & Virtual Production</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Producing content that needs cinematic VFX? See how Elipse Studio's VFX and virtual production services deliver film-quality visual effects.", "Visual effects and virtual production have merged into one continuous creative pipeline. Traditional VFX still delivers post-production magic — compositing, CG integration, environmental replacement. Virtual production adds real-time content generation, LED wall workflows, and in-camera VFX.", "Elipse Studio delivers VFX and virtual production services for film production companies, commercial producers, marketing agencies, and brand teams worldwide. Our combined capability across traditional CG VFX and modern Unreal Engine 5 real-time workflows lets clients access the full modern visual effects toolkit."]} /></div>
        <div className="hidden md:block">
          <ReadText text="Producing content that needs cinematic VFX? See how Elipse Studio's VFX and virtual production services deliver film-quality visual effects." />
          <ReadText text="Visual effects and virtual production have merged into one continuous creative pipeline. Traditional VFX still delivers post-production magic — compositing, CG integration, environmental replacement. Virtual production adds real-time content generation, LED wall workflows, and in-camera VFX." />
          <ReadText text="Elipse Studio delivers VFX and virtual production services for film production companies, commercial producers, marketing agencies, and brand teams worldwide. Our combined capability across traditional CG VFX and modern Unreal Engine 5 real-time workflows lets clients access the full modern visual effects toolkit." />
        </div></div>
        <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers VFX and virtual production services combining traditional visual effects craft with modern Unreal Engine 5 real-time workflows. Our team produces CG visual effects, compositing, virtual production environments, and LED wall workflow content for film, commercial, and brand production worldwide.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our VFX and Virtual Production Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[{ title: "CG Visual Effects", desc: "Photrealistic 3D elements integrated into live-action footage." },
                { title: "Compositing and Integration", desc: "Seamless integration of CG content with live-action." },
                { title: "Environmental Replacement", desc: "Set extensions and location replacement." },
                { title: "Virtual Production Environments", desc: "Unreal Engine 5 environments for LED wall production." },
                { title: "Real-Time VFX Content", desc: "In-camera visual effects generated in real time." },
                { title: "Motion Graphics VFX", desc: "Broadcast-quality motion graphics and title design." },
                { title: "Simulation VFX", desc: "Water, fire, smoke, and physics-based effects." },
                { title: "Photrealistic Character CG", desc: "Digital humans and creature work for cinematic content." }
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our VFX solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "CG Integration", desc: "Photreal elements composited into live-action." },{ title: "LED Wall Content", desc: "Unreal Engine 5 virtual production." },{ title: "Compositing", desc: "Seamless VFX integration with Nuke." },{ title: "Simulation", desc: "Water, fire, smoke, and physics effects." },{ title: "Character CG", desc: "Digital humans and creature work." },{ title: "Motion Graphics", desc: "Broadcast-quality title and graphic design." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "40%", label: "Production Savings", desc: "Virtual production vs location shoots." },{ number: "50%", label: "Revision Speed", desc: "Real-time feedback vs traditional post." },{ number: "100+", label: "Projects Delivered", desc: "Film, commercial, and brand productions." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Production Teams Choose Elipse Studio for VFX</SectionTitle>
            <div>
              <ReadText text="Production companies, commercial producers, and marketing agencies select Elipse Studio for VFX and virtual production because our team bridges traditional VFX craft with modern real-time workflows." />
              <ReadText text="Our approach emphasizes production efficiency alongside visual quality. Virtual production techniques let creative decisions happen on-set with immediate visual feedback rather than deferring to costly post-production revisions." />
              <ReadText text="See our VFX and virtual production portfolio. Explore film, commercial, and brand production work Elipse Studio has contributed VFX and virtual production capabilities to worldwide." />
              <div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio for VFX" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>VFX and Virtual Production Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Film Production", desc: "CG VFX for scenes impossible to shoot practically." },{ title: "Commercial Content", desc: "Premium brand content with cinematic values." },{ title: "Brand Campaigns", desc: "Standout campaigns requiring impossible imagery." },{ title: "Automotive", desc: "CG car integration and environmental replacement." },{ title: "Real Estate", desc: "Virtual production for pre-construction content." },{ title: "Music Videos", desc: "VFX and virtual production for creative visions." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our VFX Technology Stack</SectionTitle>
            <div>
              <ReadText text="Elipse Studio's VFX pipeline uses Unreal Engine 5 for real-time content and virtual production, Autodesk Maya and Houdini for 3D VFX craft, Nuke and After Effects for compositing and integration, V-Ray and Corona for photrealistic rendering, and DaVinci Resolve for color grading." />
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our VFX technology" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our VFX Production Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Pre-Production" title="Creative Planning" desc="Understanding creative goals, technical requirements, and delivery specs." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Breakdown" title="Shot Breakdown" desc="Detailed shot analysis and asset identification." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Production" title="Asset Creation" desc="Building CG elements and virtual environments." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Integration" title="Compositing & Integration" desc="Seamless CG and live-action integration." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Review" title="Iteration Rounds" desc="Client review and refinement cycles." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Delivery" title="Final Delivery" desc="Required formats and quality standards." /></div></div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="VFX Virtual Production showcase" className="w-full h-full object-cover" loading="lazy" /></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What are VFX and virtual production services?", a: "VFX and virtual production services combine traditional visual effects craft with modern real-time content generation for film, commercial, and brand production." },{ q: "What is the difference between VFX and virtual production?", a: "Traditional VFX happens in post-production. Virtual production generates content in real time during shooting. Modern productions often combine both approaches." },{ q: "Does Elipse Studio work with LED wall stages?", a: "Yes. We produce Unreal Engine 5 virtual production environments compatible with major LED wall stage installations." },{ q: "What VFX software does Elipse Studio use?", a: "Unreal Engine 5, Autodesk Maya, Houdini, Nuke, Adobe After Effects, V-Ray, Corona, and DaVinci Resolve." },{ q: "How do I start a VFX or virtual production project?", a: "Contact Elipse Studio with your production details — project type, VFX scope, requirements, and timeline." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Elevate production with modern VFX and virtual production</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your production. Our team responds within one business day with a scoped approach for VFX or virtual production support.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:"3D Animation",to:"/services/3d-animation"},{label:"VR Development",to:"/services/vr-development"},{label:"Creative Services",to:"/services/creative-services"}]} relatedArticles={[{label:"Industrial 3D Animation",to:"/blog/industrial-animation"},{label:"Why Animated Videos Drive More Engagement",to:"/blog/animated-videos-engagement"}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default VfxVirtualProductionPage;
