'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/Ar/01 (1).webp";
import _galleryImg from "../../assets/Ar/zayper.webp";
import _solutionsImg from "../../assets/Ar/02.webp";
import _whyUsImg from "../../assets/Ar/03.webp";
import _stackImg from "../../assets/Ar/06.webp";
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
const StatCard = ({ number, label, desc }) => (<div className="bg-[#111] p-5 md:p-[2.5rem] flex flex-col justify-center"><div className="text-2xl md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{number}</div><div className="font-semibold text-[#F2F0EB] mb-[8px] text-sm md:text-base">{label}</div>{desc && <div className="text-xs md:text-lg font-light leading-relaxed text-white/70">{desc}</div>}</div>);
const ProcessCard = ({ step, phase, title, desc }) => (<div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-8 border border-white/5"><div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4"><span className="text-2xl md:text-4xl font-bold text-[#4169E1]">{step}</span>{phase && <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>}</div><h4 className="text-sm md:text-[20px] font-semibold text-[#F2F0EB] mb-2 md:mb-3">{title}</h4>{desc && <p className="text-xs md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-white/70">{desc}</p>}</div>);
const UseCaseCard = ({ title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5"><h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const FaqItem = ({ q, a, isOpen, onToggle }) => (<div className="border-b border-[#1A1A1A]"><button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"><span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span><span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span></button>{isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}</div>);
const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);};
const ArDevelopmentPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Custom AR Development Services for Retail, Real Estate, and Marketing<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]"><img src={heroImg} alt="AR Development" className="w-full h-full object-cover" loading="lazy" width="1200" height="700"/></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
        <div><Eyebrow>AR Development</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Ready to launch AR that drives engagement? See how Elipse Studio's AR development services transform retail, real estate, and product marketing.", "Augmented reality moved from novelty to necessity. Retail customers expect AR try-on for eyewear, cosmetics, and accessories. Furniture shoppers expect to see products placed in their actual rooms. Automotive buyers expect to preview vehicles in their driveways.", "Elipse Studio delivers AR development services for retail brands, real estate developers, furniture manufacturers, and specialty companies worldwide. Our AR work spans native ARKit and ARCore for premium quality, and WebAR for frictionless deployment requiring no app download."]} /></div>
        <div className="hidden md:block">
          <ReadText text="Ready to launch AR that drives engagement? See how Elipse Studio's AR development services transform retail, real estate, and product marketing." />
          <ReadText text="Augmented reality moved from novelty to necessity. Retail customers expect AR try-on for eyewear, cosmetics, and accessories. Furniture shoppers expect to see products placed in their actual rooms. Automotive buyers expect to preview vehicles in their driveways." />
          <ReadText text="Elipse Studio delivers AR development services for retail brands, real estate developers, furniture manufacturers, and specialty companies worldwide. Our AR work spans native ARKit and ARCore for premium quality, and WebAR for frictionless deployment requiring no app download." />
        </div></div>
        <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers custom AR development services combining ARKit, ARCore, and WebAR. Our AR experiences help retail brands enable virtual try-on, real estate developers show properties in context, furniture brands enable AR placement, and manufacturers deliver technical product visualization. WebAR requires no app download. Serving brands worldwide since 2014.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our AR Development Solutions</SectionTitle>
            <ul className="max-w-[680px]">{[{ title: "AR Product Try-On", desc: "Virtual try-on for eyewear, watches, jewelry, cosmetics, and accessories." },{ title: "AR Furniture Placement", desc: "Camera-based placement showing furniture in customer environments." },{ title: "AR Real Estate Visualization", desc: "Property preview and interior visualization via mobile devices." },{ title: "AR Retail Experiences", desc: "In-store AR wayfinding, product info overlays, and immersive shopping." },{ title: "WebAR Marketing Campaigns", desc: "Frictionless AR experiences requiring no app download." },{ title: "AR Product Manuals", desc: "Interactive maintenance and assembly guidance replacing static instructions." },{ title: "AR Training Applications", desc: "Field service and technical training with overlaid guidance." },{ title: "AR Brand Activations", desc: "Event-specific AR experiences for product launches and campaigns." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our AR development solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "AR Try-On", desc: "Virtual try-on for eyewear, cosmetics, and accessories." },{ title: "AR Placement", desc: "Furniture and product placement in real environments." },{ title: "WebAR", desc: "No-app AR experiences via mobile browser." },{ title: "Native ARKit/ARCore", desc: "Premium iOS and Android AR quality." },{ title: "Commerce Integration", desc: "Shopify, WooCommerce, and custom backends." },{ title: "Cross-Platform", desc: "Consistent AR across all devices." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "40%", label: "Return Reduction", desc: "AR try-on reduces product returns." },{ number: "94%", label: "Higher Conversion", desc: "AR-engaged vs non-engaged users." },{ number: "5x", label: "Engagement Time", desc: "AR experiences vs static product pages." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Worldwide Choose Elipse Studio for AR Development</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="Retail brands, real estate developers, and consumer companies select Elipse Studio for AR development services because our team combines AR craft with genuine commercial understanding. Every AR experience we build integrates cleanly with existing commerce and marketing infrastructure." />
              <ReadText text="Our WebAR expertise is particularly valuable. WebAR eliminates the app-download friction that kills AR adoption for most retail applications. Customers scan a QR code or click a link and immediately enter the AR experience through their mobile browser." />
              <ReadText text="See our AR development portfolio. Explore AR experiences Elipse Studio has built for retail brands, furniture companies, real estate developers, and specialty industries." />
              <div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div>
            </div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio for AR" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>AR Development Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Retail Try-On", desc: "Eyewear, cosmetics, jewelry AR try-on experiences." },{ title: "Furniture Placement", desc: "Preview pieces in actual customer spaces." },{ title: "Real Estate", desc: "Remote property visualization for international buyers." },{ title: "Automotive", desc: "Vehicle configuration and pre-delivery preview." },{ title: "Manufacturing", desc: "Technical product visualization and maintenance guides." },{ title: "Retail Chains", desc: "In-store wayfinding and product information AR." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our AR Technology Platform</SectionTitle>
            <ReadText text="Elipse Studio's AR development stack uses ARKit for premium iOS AR experiences, ARCore for Android AR quality, and WebAR through modern WebXR frameworks for frictionless no-app deployment. Every AR experience integrates with commerce platforms including Shopify, WooCommerce, Magento, and custom backends. Cross-platform AR ensures consistent experience quality across devices." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our AR technology platform" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our AR Development Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Commercial Scoping" desc="Understanding engagement lift, conversion improvement, and return reduction goals." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Design" title="AR User Experience" desc="Designing intuitive AR interaction flows." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Production" title="3D Asset Development" desc="Building AR-optimized 3D product assets." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Development" title="AR Functionality" desc="Native ARKit/ARCore or WebAR implementation." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Testing" title="Device Testing" desc="Cross-device QA and performance optimization." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Launch" title="Deploy & Optimize" desc="Analytics tracking and continuous optimization." /></div></div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="AR Development showcase" className="w-full h-full object-cover" loading="lazy" width="1280" height="720"/></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What are AR development services?", a: "AR development services encompass the design and development of augmented reality experiences that overlay digital content onto the real world through smartphones, tablets, or specialized AR hardware." },{ q: "Do customers need to download apps?", a: "Not necessarily. We build both native app AR (highest quality) and WebAR experiences (no app required). WebAR is particularly powerful for marketing campaigns." },{ q: "Can AR integrate with Shopify?", a: "Yes. Our AR experiences integrate seamlessly with Shopify Plus, WooCommerce, Magento, BigCommerce, and custom commerce backends." },{ q: "Which industries benefit most?", a: "Retail brands (eyewear, cosmetics, jewelry), furniture retailers, real estate developers, automotive brands, and manufacturers see the strongest AR returns." },{ q: "How long does AR development take?", a: "Focused AR experiences deliver in 8-14 weeks. Multi-product platforms span 14-20 weeks. Enterprise AR extends to 6+ months." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Transform retail and real estate with proven AR development</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your AR project. Our team responds within one business day with a scoped approach for your specific commercial goals.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:"VR Development",to:"/services/vr-development"},{label:"3D Product Configurators",to:"/services/3d-product-configurators"},{label:"Virtual Showrooms",to:"/services/virtual-showrooms-digital-twins"}]} relatedArticles={[{label:"What Is Immersive AR Marketing?",to:"/blog/immersive-ar-marketing"},{label:"How VR Is Reshaping the World",to:"/blog/vr-reshaping-world"}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default ArDevelopmentPage;

