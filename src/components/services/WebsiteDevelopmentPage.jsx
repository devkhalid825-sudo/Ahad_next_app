'use client';

import React, { useEffect, useState } from "react";
import { getImgSrc } from '../../utils/api';
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import heroImgRaw from "../../assets/ElipseImages/projects/clubpro.webp";
import galleryImgRaw from "../../assets/ElipseImages/projects/clubpro-2.webp";
import solutionsImgRaw from "../../assets/ElipseImages/projects/clubpro-1.webp";
import whyUsImgRaw from "../../assets/ElipseImages/projects/capabilities-hero.webp";
import stackImgRaw from "../../assets/ElipseImages/projects/capabilities-sec.webp";

const heroImg = getImgSrc(heroImgRaw);
const galleryImg = getImgSrc(galleryImgRaw);
const solutionsImg = getImgSrc(solutionsImgRaw);
const whyUsImg = getImgSrc(whyUsImgRaw);
const stackImg = getImgSrc(stackImgRaw);

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
const TextCarousel = ({ texts }) => {
  const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);
}

const WebsiteDevelopmentPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

    <>
      <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
        <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
          <Header />
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Custom Website Development Services for Brands and Businesses Worldwide<span className="text-[#4169E1]">.</span></h1>
          <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
          <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]"><img src={heroImg} alt="Website Development" className="w-full h-full object-cover" loading="lazy" width="1200" height="700"/></div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="p-[2rem]"><Eyebrow>Custom Website Development</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Need a website that ranks, converts, and performs? Elipse Studio's custom website development delivers technical excellence and commercial results.", "Every business needs a website. Few businesses need what most agencies deliver — impressive designs that load slowly, look great on desktop but break on mobile, and generate no organic traffic. Modern websites must combine beautiful design, technical performance, SEO fundamentals, and clean integration with your existing business systems.", "Elipse Studio delivers custom website development engineered for performance, SEO, and conversion. Since 2021, we have built websites for brands, businesses, and specialty organizations worldwide."]} /></div><div className="hidden md:block"><ReadText text="Need a website that ranks, converts, and performs? Elipse Studio's custom website development delivers technical excellence and commercial results." /><ReadText text="Every business needs a website. Few businesses need what most agencies deliver — impressive designs that load slowly, look great on desktop but break on mobile, and generate no organic traffic. Modern websites must combine beautiful design, technical performance, SEO fundamentals, and clean integration with your existing business systems." /><ReadText text="Elipse Studio delivers custom website development engineered for performance, SEO, and conversion. Since 2021, we have built websites for brands, businesses, and specialty organizations worldwide." /></div></div>
          <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers custom website development including WordPress for content-driven sites, Next.js for high-performance applications, and modern JAMstack architectures. Every website includes SEO fundamentals built in, mobile-first responsive design, Core Web Vitals optimization, and integration with existing business systems. Serving brands worldwide since 2021.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>What we do</Eyebrow>
              <SectionTitle>Our Website Development Solutions</SectionTitle>
              <ul className="max-w-[680px]">
                {[{ title: "Custom WordPress Development", desc: "Premium WordPress sites with custom themes and functionality." }, { title: "Next.js Development", desc: "High-performance sites using modern React frameworks." }, { title: "JAMstack Architectures", desc: "Static-first architectures for maximum speed and security." }, { title: "E-Commerce Website Development", desc: "Shopify, WooCommerce, and custom commerce platforms." }, { title: "Corporate Website Development", desc: "Enterprise brand sites with content management." }, { title: "Landing Page Development", desc: "High-conversion landing pages for campaigns." }, { title: "Website Redesigns", desc: "Modernization of legacy websites for performance and SEO." }, { title: "Multi-Language Websites", desc: "International websites with proper hreflang and localization." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}
              </ul>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
              <img src={solutionsImg} alt="Our website development solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "WordPress", desc: "Premium content-driven sites with custom themes." }, { title: "Next.js / React", desc: "High-performance modern web applications." }, { title: "JAMstack", desc: "Static-first speed and security." }, { title: "E-Commerce", desc: "Shopify, WooCommerce, custom platforms." }, { title: "SEO Built-In", desc: "Semantic HTML, structured data, Core Web Vitals." }, { title: "Multi-Language", desc: "International sites with hreflang." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

        <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "95+", label: "PageSpeed Score", desc: "Core Web Vitals optimized." }, { number: "3x", label: "Organic Traffic", desc: "SEO-first development approach." }, { number: "50%", label: "Faster Load", desc: "Performance-first architecture." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>Why Elipse Studio</Eyebrow>
              <SectionTitle>Why Brands Worldwide Choose Elipse Studio</SectionTitle>
              <div>
                <ReadText text="Brands and businesses select Elipse Studio for custom website development because our approach combines design craft with technical excellence. Modern web development requires equal attention to visual design, code quality, performance optimization, SEO foundations, and business integration." />
                <ReadText text="Every website we build includes SEO fundamentals from day one — semantic HTML, structured data markup, Core Web Vitals optimization, mobile-first responsive design, and clean information architecture." />
                <ReadText text="See our website development portfolio. Explore websites Elipse Studio has built for brands and businesses worldwide — from luxury brand sites to high-performance SaaS platforms." />
                <div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div>
              </div>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
              <img src={whyUsImg} alt="Why brands choose Elipse Studio for web development" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>Website Development Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Brand Websites", desc: "Premium brand sites reflecting positioning." }, { title: "E-Commerce", desc: "High-conversion commerce sites." }, { title: "SaaS Marketing", desc: "Websites driving product signups." }, { title: "Corporate Sites", desc: "Enterprise sites modernized for performance." }, { title: "Landing Pages", desc: "Campaign pages for customer acquisition." }, { title: "International Sites", desc: "Multi-language with proper hreflang." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>Our stack</Eyebrow>
              <SectionTitle>Our Website Technology Stack</SectionTitle>
              <div>
                <ReadText text="Elipse Studio's website development stack covers WordPress for content-driven sites; Next.js and React for high-performance modern web applications; Gatsby and Astro for JAMstack architectures; Tailwind CSS for maintainable styling; Shopify and WooCommerce for e-commerce; and modern hosting infrastructure including Vercel, Netlify, and AWS." />
              </div>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
              <img src={stackImg} alt="Our web development technology" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our Website Development Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Strategic Scoping" desc="Understanding brand goals, audience, functionality, and integrations." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Design" title="Design Mockups" desc="Visual design and information architecture." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Development" title="Front-End Development" desc="Pixel-perfect responsive implementation." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Integration" title="Back-End Integrations" desc="CMS, commerce, and business system connections." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="QA" title="Quality Assurance" desc="Cross-device and cross-browser testing." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Launch" title="Launch & Monitor" desc="Deployment with performance monitoring." /></div></div></section>

        <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="Website Development showcase" className="w-full h-full object-cover" loading="lazy" width="1280" height="720"/></div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What is custom website development?", a: "Custom website development is the design and development of websites tailored to specific brand and business requirements — versus template-based solutions." }, { q: "Should I choose WordPress or Next.js?", a: "WordPress excels for content-heavy sites requiring frequent updates. Next.js delivers superior performance for interactive applications where speed matters commercially." }, { q: "Does Elipse Studio provide SEO with website development?", a: "Yes. Every website includes SEO fundamentals — semantic HTML, structured data, Core Web Vitals optimization, mobile-first design, and clean URL architecture." }, { q: "Can you integrate with our existing systems?", a: "Yes. We integrate with CRM platforms, marketing automation, e-commerce backends, analytics, and custom enterprise systems." }, { q: "How long does custom website development take?", a: "Focused websites: 8-12 weeks. Complex websites: 12-20 weeks. Enterprise websites: 20-30 weeks." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Launch a website engineered for performance and conversion</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your website project. Our team responds within one business day with a scoped design and development approach.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

        <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
        <ServiceRelatedLinks relatedServices={[{ label: "Custom Software Development", to: "/services/custom-software-development" }, { label: "Mobile App Development", to: "/services/mobile-app-development" }, { label: "Interactive Web Experiences", to: "/services/interactive-web-experiences" }]} relatedArticles={[{ label: "How Web-Based Configurators Transform Sales", to: "/blog/web-based-configurator" }, { label: "Top Immersive Tech Trends 2026", to: "/blog/immersive-tech-2026" }]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
      </div>

    </>

  );
};
export default WebsiteDevelopmentPage;

