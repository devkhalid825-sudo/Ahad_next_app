'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import LatestWork from "../features/LatestWork";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/ElipseImages/projects/3D-rendering.webp";
import _solutionsImg from "../../assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp";
import _whyUsImg from "../../assets/ElipseImages/projects/seat-2-1.webp";
import _stackImg from "../../assets/ElipseImages/projects/clubpro.webp";
import { getImgSrc } from "../../utils/api";
const heroImg = getImgSrc(_heroImg);
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);

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
      {phase && <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>}
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

const ProductVisualizationPage = () => {
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
          3D Product Visualization Services for E-Commerce and Manufacturing Brands<span className="text-[#4169E1]">.</span>
        </h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]">
          <button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button>
        </div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/rn0Lf782Cug?si=foJqku1lK2KW-5lP"
            title="3D Product Visualization Showcase"
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
            <Eyebrow>3D Product Visualization</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Need product imagery that converts customers? Elipse Studio's 3D product visualization delivers photreal quality with unlimited creative flexibility.", "Product photography served e-commerce well for two decades. But traditional photography has become a bottleneck — expensive location shoots, physical prototypes required, limited creative flexibility, and impossible to update when product variations change. 3D product visualization solves every one of these problems while producing imagery that meets or exceeds photography quality.", "Elipse Studio produces 3D product visualization for e-commerce brands, manufacturers, DTC companies, and consumer product businesses worldwide. Our photreal craft, combined with practical understanding of e-commerce and marketing workflows, delivers product imagery that actually drives commercial results — not just impressive isolated renderings."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Need product imagery that converts customers? Elipse Studio's 3D product visualization delivers photreal quality with unlimited creative flexibility." />
              <ReadText text="Product photography served e-commerce well for two decades. But traditional photography has become a bottleneck — expensive location shoots, physical prototypes required, limited creative flexibility, and impossible to update when product variations change. 3D product visualization solves every one of these problems while producing imagery that meets or exceeds photography quality." />
              <ReadText text="Elipse Studio produces 3D product visualization for e-commerce brands, manufacturers, DTC companies, and consumer product businesses worldwide. Our photreal craft, combined with practical understanding of e-commerce and marketing workflows, delivers product imagery that actually drives commercial results — not just impressive isolated renderings." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">
              Elipse Studio delivers photorealistic 3D product visualization for e-commerce brands, manufacturers, and consumer product companies worldwide. Our team creates hero product renderings, 360° views, exploded assemblies, lifestyle shots, and animated product demonstrations that replace expensive photography while offering unlimited flexibility. Founded 2014, powered by V-Ray, Corona, and Unreal Engine 5.
            </div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* What we do */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our 3D Product Visualization Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[
                { title: "Hero Product Renderings", desc: "Cinematic-quality hero shots for product pages, ads, and marketing campaigns." },
                { title: "360-Degree Product Views", desc: "Interactive 360° product spins for e-commerce product pages." },
                { title: "Exploded Assembly Views", desc: "Technical visualization revealing internal components and assembly details." },
                { title: "Lifestyle Product Shots", desc: "Products in contextual environments matching your brand aesthetic." },
                { title: "Color and Variant Rendering", desc: "Unlimited variations from a single 3D asset pipeline." },
                { title: "Product Animation", desc: "Motion visualization for product launches and social media content." },
                { title: "Packaging Visualization", desc: "Photreal packaging renders for e-commerce and marketing." },
                { title: "Detail Close-Ups", desc: "Macro-level renders showcasing material, texture, and craftsmanship." },
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="3D Product Visualization solutions" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Photorealistic Renders", desc: "V-Ray and Corona quality output for e-commerce." },
            { title: "360° Interactive Views", desc: "Spinning product views for product pages." },
            { title: "Product Animation", desc: "Motion visualization for launches and social." },
            { title: "Lifestyle Context", desc: "Products in branded environments." },
            { title: "Variant Rendering", desc: "Unlimited color and material variations." },
            { title: "Technical Visualization", desc: "Exploded views and assembly details." },
          ].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}
        </div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">
          {[
            { number: "70%", label: "Cost Reduction", desc: "Vs traditional photography for product catalogs." },
            { number: "48hr", label: "Variant Turnaround", desc: "New colorways from existing 3D assets." },
            { number: "3x", label: "Faster Time-to-Market", desc: "Renderings before physical prototypes exist." },
          ].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}
        </div>
      </section>

      {/* Why Elipse Studio */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Worldwide Choose Elipse Studio for Product Visualization</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="E-commerce brands and manufacturers select Elipse Studio for 3D product visualization because photreal product work requires specialized craft that generic 3D studios routinely miss. Material accuracy for fabrics, leather, wood, metal, and glass. Physically-based lighting that captures atmospheric qualities. Composition intelligence that makes products look desirable rather than technically accurate." />
              <ReadText text="The commercial advantages of 3D product visualization are dramatic. Faster time-to-market for new products since renderings can begin before physical prototypes exist. Unlimited variations from single asset investments. Consistent quality across product catalogs. Rapid iteration for A/B testing and creative optimization." />
              <div className="pt-2 md:pt-4"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why Elipse Studio for product visualization" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>Product Visualization Use Cases</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "E-Commerce", desc: "Hero renders and 360° views for product pages that convert." },
            { title: "Social Campaigns", desc: "Lifestyle rendering for brand marketing content." },
            { title: "Sales Presentations", desc: "Technical visualization for B2B sales materials." },
            { title: "Showroom Photography", desc: "Furniture collections without physical shoots." },
            { title: "Product Catalogs", desc: "Consistent quality across entire product lines." },
            { title: "A/B Testing", desc: "Rapid variant rendering for creative optimization." },
          ].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}
        </div>
      </section>

      {/* Our stack */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Technology Stack</SectionTitle>
            <ReadText text="Elipse Studio's product visualization pipeline uses V-Ray and Corona for photrealistic offline rendering, Unreal Engine 5 for real-time interactive product experiences, Cinema 4D and Maya for animation and complex modeling, and specialized material libraries covering thousands of physically-accurate surfaces. We work directly with CAD files from SolidWorks, Rhino, STEP, IGES, and other engineering formats — no re-modeling required." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our product visualization technology stack" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Production Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8" style={{ justifyContent: 'center' }}>
          {[
            { step: "01", phase: "Discovery", title: "Commercial Scoping", desc: "Understanding your specific commercial objectives and target usage." },
            { step: "02", phase: "Production", title: "3D Asset Creation", desc: "Building from CAD files or reference materials." },
            { step: "03", phase: "Review", title: "Composition Reviews", desc: "Initial camera angles and lighting with client approval." },
            { step: "04", phase: "Refinement", title: "Material Development", desc: "Physically-accurate material and lighting development." },
            { step: "05", phase: "Iteration", title: "Feedback Rounds", desc: "Iterative refinement based on client review." },
            { step: "06", phase: "Delivery", title: "Final Delivery", desc: "Preferred formats optimized for target usage." },
          ].map((p, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard {...p} /></div>)}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="max-w-[800px] mx-auto">
          <SectionTitle>Frequently Asked Questions</SectionTitle>
          <div className="max-w-[680px]">
            {[
              { q: "What is 3D product visualization?", a: "3D product visualization is the creation of photrealistic digital images of products using 3D modeling and rendering. It replaces or supplements traditional product photography, offering unlimited creative flexibility, faster iteration, and consistent quality across product catalogs." },
              { q: "Is 3D product visualization more affordable than photography?", a: "For product catalogs with many variations, 3D product visualization typically delivers significant cost advantages. Once the 3D asset is built, unlimited color, material, and configuration variations render at minimal additional cost." },
              { q: "Can Elipse Studio work from our CAD files?", a: "Yes. Our pipeline works with SolidWorks, Rhino, STEP, IGES, and standard 3D formats. Our team handles conversion from engineering CAD to visualization-optimized geometry." },
              { q: "How long does 3D product visualization take?", a: "Single product renders typically deliver in 1-3 weeks. Complete product catalogs span 4-10 weeks. Product animation adds 2-4 weeks." },
              { q: "How do I start a product visualization project?", a: "Contact Elipse Studio with your product category, target usage, and timeline. A senior team member responds within one business day with a scoped approach." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center">
          <h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Replace expensive photography with photreal 3D product visualization</h2>
          <p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your product line and marketing goals. Our team will respond within one business day with a scoped approach.</p>
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
      <ServiceRelatedLinks relatedServices={[{label:"3D Product Configurators",to:"/services/3d-product-configurators"},{label:"Architectural Visualization",to:"/services/architectural-visualization"},{label:"3D Animation",to:"/services/3d-animation"}]} relatedArticles={[{label:"Architectural Visualization: The Complete Guide",to:"/blog/architectural-visualization-guide"},{label:"Industrial 3D Animation",to:"/blog/industrial-animation"}]} />
      <LatestWork />
      <ClientReviews />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  

  </>

  );
};

export default ProductVisualizationPage;

