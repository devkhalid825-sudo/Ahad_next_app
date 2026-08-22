'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp";
import _solutionsImg from "../../assets/ElipseImages/projects/Animation.webp";
import _whyUsImg from "../../assets/ElipseImages/projects/clubpro.webp";
import _stackImg from "../../assets/ElipseImages/projects/motion-graphics.webp";
import _g1 from "../../assets/ElipseImages/projects/Animation.webp";
import _g2 from "../../assets/ElipseImages/projects/Animation2.webp";
import _g3 from "../../assets/ElipseImages/projects/Animation3.webp";
import _g4 from "../../assets/ElipseImages/projects/Animation4.webp";
import _g5 from "../../assets/ElipseImages/projects/Animation7.webp";
import _g6 from "../../assets/ElipseImages/projects/BOAT-CONFIG-OPT.webp";
import _g7 from "../../assets/ElipseImages/projects/Boat.webp";
import _g8 from "../../assets/ElipseImages/projects/clubpro.webp";
import _g9 from "../../assets/ElipseImages/projects/clubpro-1.webp";
import _g10 from "../../assets/ElipseImages/projects/clubpro-2.webp";
import _g11 from "../../assets/ElipseImages/projects/TOWEL.webp";
import _g12 from "../../assets/ElipseImages/projects/Steering-1.webp";
import _g13 from "../../assets/ElipseImages/projects/motion-graphics.webp";
import _g14 from "../../assets/ElipseImages/projects/3D-rendering.webp";
import { getImgSrc } from "../../utils/api";

const heroImg = getImgSrc(_heroImg);
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);
const galleryImages = [_g1, _g2, _g3, _g4, _g5, _g6, _g7, _g8, _g9, _g10, _g11, _g12, _g13, _g14].map(getImgSrc);

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

const ProductAnimationPage = () => {
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
        <h1 className="text-[clamp(1.6rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">3D Product Animation Services for Launches, E-Commerce, and Marketing<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <img src={heroImg} alt="3D product animation showcase" className="w-full h-full object-cover" loading="eager" width="1200" height="800" />
        </div>
      </section>

      {/* Overview Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="flex-1">
            <Eyebrow>3D Product Animation</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Launching a product and need motion that sells? See how Elipse Studio's 3D product animation services turn CAD and product data into cinematic, conversion-ready video.", "Product animation shows what static photography cannot — mechanisms in motion, materials under real light, features in context. It is one of the fastest ways to build buyer confidence before a physical unit exists.", "Elipse Studio produces 3D product animation for e-commerce brands, manufacturers, and marketing teams worldwide. Every animation is built from accurate product geometry and rendered to a photoreal standard."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Launching a product and need motion that sells? See how Elipse Studio's 3D product animation services turn CAD and product data into cinematic, conversion-ready video." />
              <ReadText text="Product animation shows what static photography cannot — mechanisms in motion, materials under real light, features in context. It is one of the fastest ways to build buyer confidence before a physical unit exists." />
              <ReadText text="Elipse Studio produces 3D product animation for e-commerce brands, manufacturers, and marketing teams worldwide. Every animation is built from accurate product geometry and rendered to a photoreal standard." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">Elipse Studio produces photoreal 3D product animation for launches, e-commerce listings, and marketing campaigns worldwide. Our work spans hero product videos, 360° spins, exploded-view and mechanism animation, and feature-highlight edits. Powered by Cinema 4D, Blender, V-Ray, and After Effects.</div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* What we do with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our Product Animation Solutions</SectionTitle>
            <ul className="max-w-[680px]">{[{ title: "Hero Product Videos", desc: "Cinematic launch films built around your product's key selling points." },{ title: "360° Spin Animation", desc: "Seamless rotating product views for e-commerce and PDP pages." },{ title: "Exploded-View Animation", desc: "Component breakdowns that explain construction and materials." },{ title: "Mechanism & Feature Animation", desc: "Moving parts, hinges, and functions shown in clear detail." },{ title: "Packaging Animation", desc: "Unboxing-style sequences for retail and DTC marketing." },{ title: "Lifestyle & Context Scenes", desc: "Product motion placed in real-world environments." },{ title: "Social & Ad Cutdowns", desc: "Platform-optimized edits for paid and organic campaigns." },{ title: "Real-Time Product Animation", desc: "Unreal Engine 5 content for configurators and interactive demos." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our product animation solutions showcase" className="w-full h-full object-cover" loading="lazy" width="800" height="600" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Hero Launch Films", desc: "Feature-quality video for product launches." },{ title: "360° Spins", desc: "Rotating views for e-commerce listings." },{ title: "Exploded Views", desc: "Component and material breakdowns." },{ title: "Mechanism Animation", desc: "Moving parts and functions in detail." },{ title: "Packaging Animation", desc: "Unboxing and retail-ready sequences." },{ title: "Real-Time Content", desc: "Unreal Engine 5 configurator-ready animation." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "70%", label: "Higher Conversion", desc: "Product video vs. static images alone." },{ number: "2.5x", label: "Time on PDP", desc: "Shoppers engage longer with animated product views." },{ number: "40%", label: "Fewer Returns", desc: "Clearer feature and scale communication reduces mismatched purchases." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div>
      </section>

      {/* Why Elipse Studio with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Worldwide Choose Elipse Studio for Product Animation</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="Brands and manufacturers select Elipse Studio for 3D product animation because our team works directly from CAD and existing product visualization assets — no physical prototype required. That means animation can start before tooling is finished and launch alongside the product itself." />
              <ReadText text="Our worldwide client base includes e-commerce brands animating hero product videos for PDP and marketplace listings, manufacturers explaining mechanisms and assembly through motion, and marketing teams commissioning launch films and social cutdowns for paid campaigns." />
              <div className="pt-2 md:pt-4"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio for product animation" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Applications</Eyebrow>
        <SectionTitle>Product Animation Use Cases</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "E-Commerce Listings", desc: "360° spins and hero video for PDP pages." },{ title: "Product Launches", desc: "Cinematic films timed to release dates." },{ title: "Manufacturer Explainers", desc: "Mechanism and assembly animation." },{ title: "Retail & Packaging", desc: "Unboxing and shelf-ready video content." },{ title: "Paid Social Ads", desc: "Cutdowns optimized for ad platforms." },{ title: "Sales Enablement", desc: "Feature-highlight video for B2B sales teams." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div>
      </section>

      {/* Our stack with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Product Animation Technology Stack</SectionTitle>
            <ReadText text="Elipse Studio's product animation pipeline uses Cinema 4D and Blender for modeling and keyframe animation, V-Ray and Corona for photorealistic rendering, Unreal Engine 5 for real-time and configurator-ready content, Adobe After Effects for compositing and motion graphics, and DaVinci Resolve for color grading and finishing." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our product animation technology stack" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Product Animation Production Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8 justify-center">
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Product & Goal Scoping" desc="Understanding the product, audience, and where the animation will run." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Concept" title="Storyboard & Camera Plan" desc="Shot list and storyboard built around key product moments." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Production" title="3D Asset Preparation" desc="CAD cleanup and animation-ready model build." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Animation" title="Motion & Material Setup" desc="Keyframe animation, materials, and lighting." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Post" title="Render & Composite" desc="Final rendering and post-production polish." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Delivery" title="Multi-Format Delivery" desc="Optimized output for PDP, social, and ad platforms." /></div>
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
                <img src={src} alt={`Product animation showcase ${(i % galleryImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" width="640" height="400"/>
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
          <div className="max-w-[680px]">{[{ q: "What is 3D product animation?", a: "3D product animation uses CAD or 3D-modeled product data to create moving video content — hero videos, 360° spins, exploded views, and mechanism animation — without needing a physical unit on set." },{ q: "Can you animate from our CAD files?", a: "Yes. We work directly from CAD, STEP, or existing 3D product visualization assets, which speeds up production and keeps geometry accurate." },{ q: "How long does product animation take?", a: "360° spins and simple hero videos: 2-4 weeks. Mechanism and exploded-view animation: 4-6 weeks. Full launch films with multiple cutdowns: 6-10 weeks." },{ q: "Do you deliver formats for e-commerce and social platforms?", a: "Yes. We deliver PDP-ready video, vertical and square social cutdowns, and ad-platform-specific formats from a single production." },{ q: "What software does Elipse Studio use for product animation?", a: "Cinema 4D, Blender, V-Ray, Corona, Unreal Engine 5, Adobe After Effects, and DaVinci Resolve." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Sell your product with cinematic 3D animation</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your product launch. Our team responds within one business day with a scoped approach.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div>
      </section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:'3D Animation',to:'/services/3d-animation'},{label:'3D Product Visualization',to:'/services/3d-product-visualization'},{label:'3D Product Configurators',to:'/services/3d-product-configurators'}]} relatedArticles={[{label:'Industrial 3D Animation: Communicating Complexity Visually',to:'/blog/industrial-animation'},{label:'Why Animated Videos Drive More Engagement',to:'/blog/animated-videos-engagement'}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>


  </>

  );
};
export default ProductAnimationPage;
