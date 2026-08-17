'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import LatestWork from "../features/LatestWork";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import ClientReviews from "../features/ClientReviews";

import _solutionsImg from "../../assets/club-pro/01_00040.webp";
import _whyUsImg from "../../assets/club-pro/06_00513.webp";
import _stackImg from "../../assets/club-pro/11_01134.webp";
import _clubPro1 from "../../assets/club-pro/01_00040.webp";
import _clubPro2 from "../../assets/club-pro/06_00513.webp";
import _clubPro3 from "../../assets/club-pro/07.webp";
import _clubPro4 from "../../assets/club-pro/09.webp";
import _clubPro5 from "../../assets/club-pro/10.webp";
import _clubPro6 from "../../assets/club-pro/11_01134.webp";
import { getImgSrc } from "../../utils/api";
const solutionsImg = getImgSrc(_solutionsImg);
const whyUsImg = getImgSrc(_whyUsImg);
const stackImg = getImgSrc(_stackImg);
const clubPro1 = getImgSrc(_clubPro1);
const clubPro2 = getImgSrc(_clubPro2);
const clubPro3 = getImgSrc(_clubPro3);
const clubPro4 = getImgSrc(_clubPro4);
const clubPro5 = getImgSrc(_clubPro5);
const clubPro6 = getImgSrc(_clubPro6);

const galleryImages = [clubPro1, clubPro2, clubPro3, clubPro4, clubPro5, clubPro6];

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

const ProductConfiguratorsPage = () => {
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
          Custom 3D Product Configurator Development for E-Commerce Brands<span className="text-[#4169E1]">.</span>
        </h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]">
          <button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button>
        </div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/4pRnPhp0hH8?si=ZqUmakHyXPpKZujp"
            title="3D Product Configurator Showcase"
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
            <Eyebrow>3D Product Configurators</Eyebrow>
            <SectionTitle>Overview</SectionTitle>
            <div className="md:hidden"><TextCarousel texts={["Launching a customizable product line? See how Elipse Studio builds 3D product configurators that convert browsers into buyers.", "Static product pages with dropdown color pickers no longer convert the way they used to. Modern shoppers expect to actively design, customize, and visualize their purchase in real time before committing. 3D product configurators deliver exactly this — transforming e-commerce product pages from passive browsing into engaged product design experiences.", "Elipse Studio builds custom 3D product configurators for e-commerce brands, manufacturers, and DTC companies worldwide. Every configurator we build is engineered for measurable commercial results — higher conversion rates, lifted average order values, reduced return rates — not just impressive technology in isolation."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Launching a customizable product line? See how Elipse Studio builds 3D product configurators that convert browsers into buyers." />
              <ReadText text="Static product pages with dropdown color pickers no longer convert the way they used to. Modern shoppers expect to actively design, customize, and visualize their purchase in real time before committing. 3D product configurators deliver exactly this — transforming e-commerce product pages from passive browsing into engaged product design experiences." />
              <ReadText text="Elipse Studio builds custom 3D product configurators for e-commerce brands, manufacturers, and DTC companies worldwide. Every configurator we build is engineered for measurable commercial results — higher conversion rates, lifted average order values, reduced return rates — not just impressive technology in isolation." />
            </div>
          </div>
          <div className="flex-1 bg-[#111] rounded-lg p-5 md:p-[2rem] text-[#F2F0EB]">
            <Eyebrow>TL;DR</Eyebrow>
            <SectionTitle className="text-xl md:text-3xl lg:text-[34px] mb-4 md:mb-10">Quick answer</SectionTitle>
            <div className="text-sm md:text-lg font-light leading-relaxed text-white/70">
              Elipse Studio builds custom 3D product configurators for e-commerce brands, manufacturers, and DTC companies worldwide. Our configurators let customers customize products in real time with photrealistic previews — driving higher conversion, larger average orders, and dramatically reduced returns. Integrated with Shopify Plus, WooCommerce, Magento, BigCommerce, and enterprise commerce platforms. Powered by WebGL through Three.js and Babylon.js, or Unreal Engine 5 for premium fidelity.
            </div>
            <div className="mt-4 md:mt-6"><CTA label="Get Started" to="/contact" /></div>
          </div>
        </div>
      </section>

      {/* What we do with Solutions Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow>
            <SectionTitle>Our 3D Product Configurator Solutions</SectionTitle>
            <ul className="max-w-[680px]">
              {[
                { title: "Furniture Configurators", desc: "Sofas, chairs, tables, wardrobes, kitchens with material and dimension customization." },
                { title: "Automotive Configurators", desc: "Vehicle exterior, interior, wheels, packages with photreal previews." },
                { title: "Fashion and Apparel Configurators", desc: "Custom clothing, footwear, accessories with fabric and color options." },
                { title: "Jewelry Configurators", desc: "Custom ring, necklace, and specialty jewelry design with stone selection." },
                { title: "Manufacturing Product Configurators", desc: "Complex technical products with engineering-accurate options." },
                { title: "Real Estate Property Configurators", desc: "Finishes, layouts, and options for property buyers." },
                { title: "Sports and Specialty Equipment", desc: "Bikes, skis, golf clubs with performance customization." },
                { title: "AR-Enabled Configurators", desc: "Configurators that generate AR views for in-context product visualization." },
              ].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
            </ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden" style={{ marginTop: '100px' }}>
            <img src={solutionsImg} alt="Our configurator solutions showcase" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#111]">
        <Eyebrow>Capabilities</Eyebrow>
        <SectionTitle>What We Deliver</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Real-Time Customization", desc: "Customers see changes instantly in photreal 3D." },
            { title: "Commerce Integration", desc: "Shopify, WooCommerce, Magento, BigCommerce." },
            { title: "AR Preview", desc: "See configured products in real environments." },
            { title: "Analytics Dashboard", desc: "Track configuration preferences and conversion." },
            { title: "Multi-Platform", desc: "WebGL browsers plus native mobile apps." },
            { title: "Variant Management", desc: "Unlimited configurations from asset libraries." },
          ].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}
        </div>
      </section>

      {/* Measurable impact */}
      <section className="bg-[#111] px-5 md:px-8 py-8 md:py-[6rem]">
        <Eyebrow>Measurable impact</Eyebrow>
        <SectionTitle>Results that moved the business</SectionTitle>
        <div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">
          {[
            { number: "30-80%", label: "Conversion Lift", desc: "On configurator-touched sessions." },
            { number: "25%", label: "AOV Increase", desc: "Through premium upgrade adoption." },
            { number: "40%", label: "Return Reduction", desc: "Customers see exactly what they buy." },
          ].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}
        </div>
      </section>

      {/* Why Elipse Studio with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow>
            <SectionTitle>Why Brands Worldwide Choose Elipse Studio for Configurators</SectionTitle>
            <div className="space-y-4 md:space-y-6">
              <ReadText text="E-commerce brands select Elipse Studio because our configurators deliver measurable results, not novelty. Every 3D product configurator we build integrates cleanly with existing commerce infrastructure — Shopify Plus, WooCommerce, Magento, BigCommerce, or custom backends." />
              <ReadText text="The commercial benefits of 3D product configurators are substantial. Conversion rates typically lift 30-80% on configurator-touched sessions. Average order values increase through premium upgrade adoption. Return rates drop because customers see exactly what they are buying." />
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
        <SectionTitle>Configurator Use Cases and Industries</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-6">
          {[
            { title: "Furniture Retail", desc: "Made-to-order custom pieces without physical showrooms." },
            { title: "Automotive", desc: "Pre-order vehicle customization with photreal previews." },
            { title: "Fashion & Footwear", desc: "Personalization services with live 3D preview." },
            { title: "Jewelry", desc: "Custom design commissioning with stone selection." },
            { title: "Manufacturing", desc: "B2B sales tools for complex technical products." },
            { title: "Real Estate", desc: "Off-plan buyer engagement with finish selection." },
          ].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}
        </div>
      </section>

      {/* Our stack with Image */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow>
            <SectionTitle>Our Configurator Technology Stack</SectionTitle>
            <ReadText text="Elipse Studio's configurator platform uses WebGL through Three.js and Babylon.js for maximum browser reach, or Unreal Engine 5 for premium photreal fidelity. Backend integration handles Shopify Plus, WooCommerce, Magento, BigCommerce, and custom enterprise commerce platforms. AR-enabled configurators use ARKit and ARCore for native mobile quality, or WebAR for frictionless no-app deployment." />
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our configurator technology stack" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      {/* How we did it */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <Eyebrow>How we did it</Eyebrow>
        <SectionTitle>Our Configurator Development Process</SectionTitle>
        <div className="flex flex-wrap gap-3 md:gap-8 justify-center">
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Commercial Scoping" desc="Understanding conversion targets, customization scope, and integration requirements." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Production" title="3D Asset Libraries" desc="Building configurable product component libraries." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Design" title="Configurator UX & Flows" desc="Designing intuitive configuration interfaces." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Development" title="Integration Architecture" desc="Connecting with commerce platforms and backends." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Testing" title="User Testing & QA" desc="Iterative refinement based on user behavior." /></div>
          <div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Launch" title="Deploy & Optimize" desc="Analytics tracking and post-launch optimization." /></div>
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
                <img src={src} alt={`Product configurator showcase ${(i % galleryImages.length) + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
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
              { q: "What is a 3D product configurator?", a: "A 3D product configurator is an interactive online tool that lets customers customize products in real time with photrealistic 3D previews. Customers can change colors, materials, dimensions, and options while seeing exactly how their configured product will look." },
              { q: "Can 3D product configurators integrate with Shopify?", a: "Yes. Our configurators integrate seamlessly with Shopify Plus, standard Shopify, WooCommerce, Magento, BigCommerce, and custom commerce platforms. Configured product orders flow into standard checkout, payment, and fulfillment workflows automatically." },
              { q: "Which industries benefit most from 3D product configurators?", a: "Custom-order product categories deliver the strongest results: furniture, automotive, fashion, footwear, jewelry, sports equipment, specialty manufacturing, and real estate." },
              { q: "Do you build configurators with AR viewing?", a: "Yes. We build configurators with integrated AR viewing — letting customers configure a product and then see it placed in their actual environment via smartphone." },
              { q: "How long does 3D product configurator development take?", a: "Focused configurators deploy in 8-14 weeks. Multi-product platforms span 14-20 weeks. Enterprise configurators extend to 6+ months." },
            ].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center">
          <h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Convert more customers with 3D product configurators</h2>
          <p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your product line, target audience, and commerce platform. Our team responds within one business day.</p>
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
      <ServiceRelatedLinks relatedServices={[{label:"3D Product Visualization",to:"/services/3d-product-visualization"},{label:"Interactive Web Experiences",to:"/services/interactive-web-experiences"},{label:"AR Development",to:"/services/ar-development"}]} relatedArticles={[{label:"How Web-Based Configurators Transform Sales",to:"/blog/web-based-configurator"},{label:"Automotive 3D Configurator",to:"/blog/automotive-configurator"},{label:"Furniture 3D Configurator",to:"/blog/furniture-configurator-2026"}]} />
      <LatestWork />
      <ClientReviews />
      <div id="contact"><Contact /></div>
      <Footer />
    </div>
  

  </>

  );
};

export default ProductConfiguratorsPage;

