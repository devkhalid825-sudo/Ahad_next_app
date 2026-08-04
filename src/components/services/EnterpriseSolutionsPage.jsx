'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/enterprises/hero.webp";
import _galleryImg from "../../assets/enterprises/fourth.webp";
import _solutionsImg from "../../assets/enterprises/second.webp";
import _whyUsImg from "../../assets/enterprises/third.webp";
import _stackImg from "../../assets/enterprises/hero.webp";
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
const FaqItem = ({ q, a, isOpen, onToggle }) => (<div className="border-b border-[#1A1A1A]"><button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"><span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span><span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span></button>{isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}</div>);
const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);
}

const EnterpriseSolutionsPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
  

  return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Enterprise Solutions<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]"><img src={heroImg} alt="Enterprise Solutions" className="w-full h-full object-cover" loading="lazy" /></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
        <div className="p-[2rem]"><Eyebrow>Enterprise Solutions</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Need enterprise-grade solutions that scale? Elipse Studio delivers robust, secure, and scalable systems for enterprises worldwide.", "We deliver scalable enterprise-grade solutions that streamline operations and drive digital transformation across your organization.", "We partner with enterprises to build robust, secure, and scalable systems that solve complex business challenges and accelerate growth."]} /></div><div className="hidden md:block"><ReadText text="Need enterprise-grade solutions that scale? Elipse Studio delivers robust, secure, and scalable systems for enterprises worldwide." /><ReadText text="We deliver scalable enterprise-grade solutions that streamline operations and drive digital transformation across your organization." /><ReadText text="We partner with enterprises to build robust, secure, and scalable systems that solve complex business challenges and accelerate growth." /></div></div>
        <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers scalable enterprise-grade solutions that streamline operations and drive digital transformation. From cloud infrastructure and ERP systems to custom software and cybersecurity, we partner with enterprises to build robust, secure, and scalable systems.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <div className="max-w-[800px]"><Eyebrow>What we do</Eyebrow><SectionTitle>Our Enterprise Solutions</SectionTitle><ul className="max-w-[680px]">{[{ title: "Cloud Solutions", desc: "Cloud-native architecture on AWS, Azure, and GCP for maximum scalability." },{ title: "ERP Systems", desc: "Custom ERP development and integration for streamlined operations." },{ title: "Custom Software Development", desc: "Tailored business software for specific workflows and requirements." },{ title: "Data Analytics & BI", desc: "Business intelligence platforms and analytics dashboards." },{ title: "Cybersecurity", desc: "Enterprise-grade security solutions and compliance standards." },{ title: "IT Consulting", desc: "Strategic technology consulting and digital transformation advisory." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul></div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our enterprise solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Cloud-Native", desc: "AWS, Azure, GCP architecture." },{ title: "ERP Systems", desc: "Custom development and integration." },{ title: "Data Analytics", desc: "BI platforms and dashboards." },{ title: "Cybersecurity", desc: "Enterprise security and compliance." },{ title: "IT Consulting", desc: "Strategic digital transformation." },{ title: "Custom Software", desc: "Tailored business applications." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our enterprise technology" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "30+", label: "Enterprise Clients", desc: "Across multiple industries." },{ number: "99.9%", label: "System Uptime", desc: "Enterprise-grade reliability." },{ number: "40%", label: "Cost Optimization", desc: "Cloud infrastructure savings." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <div className="max-w-[800px]"><Eyebrow>Why Elipse Studio</Eyebrow><SectionTitle>Why Choose Our Enterprise Solutions?</SectionTitle><div><ReadText text="Our team delivers end-to-end enterprise architecture and implementation using cloud-native solutions on AWS, Azure, and GCP. We maintain enterprise-grade security and compliance standards throughout every engagement." /><ReadText text="We build scalable microservices architecture with dedicated support and 24/7 monitoring. Our solutions are designed for long-term maintainability and operational excellence." /><div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div></div></div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why enterprises choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" />
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our Enterprise Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Business Assessment" desc="Understanding enterprise requirements and constraints." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Architecture" title="Solution Architecture" desc="Cloud-native architecture design and planning." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Development" title="Agile Implementation" desc="Iterative development with regular demos." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Security" title="Security & Compliance" desc="Enterprise-grade security implementation." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Deploy" title="Deployment & Testing" desc="Production deployment with comprehensive testing." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Support" title="Ongoing Operations" desc="24/7 monitoring and dedicated support." /></div></div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="Enterprise Solutions showcase" className="w-full h-full object-cover" loading="lazy" /></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What enterprise solutions does Elipse Studio offer?", a: "We offer cloud solutions, ERP systems, custom software, data analytics, cybersecurity, and IT consulting — all delivered with enterprise-grade standards." },{ q: "Which cloud platforms do you support?", a: "We work with AWS, Azure, and GCP, recommending based on your specific requirements and existing infrastructure." },{ q: "Do you provide ongoing support?", a: "Yes. We offer 24/7 monitoring, dedicated support, and ongoing maintenance for all enterprise solutions." },{ q: "Can you integrate with our existing systems?", a: "Yes. Our enterprise solutions integrate with existing infrastructure, CRM, ERP, and custom platforms." },{ q: "How long do enterprise projects take?", a: "Focused solutions: 3-6 months. Full enterprise platforms: 6-12 months. Complex digital transformations: 12+ months." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Transform your enterprise with scalable solutions</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your enterprise challenges. Our team responds within one business day with a scoped approach.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:"Custom Software Development",to:"/services/custom-software-development"},{label:"Mobile App Development",to:"/services/mobile-app-development"},{label:"Website Development",to:"/services/website-development"}]} relatedArticles={[{label:"Top Immersive Tech Trends 2026",to:"/blog/immersive-tech-2026"},{label:"How Web-Based Configurators Transform Sales",to:"/blog/web-based-configurator"}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default EnterpriseSolutionsPage;

