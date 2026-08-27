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

import heroImgImport from "../../assets/costom-software/costom-software.webp";
import galleryImgImport from "../../assets/costom-software/large.webp";
import solutionsImgImport from "../../assets/costom-software/xyz.webp";
import whyUsImgImport from "../../assets/costom-software/third.webp";
import stackImgImport from "../../assets/costom-software/image.webp";

const heroImg = getImgSrc(heroImgImport);
const galleryImg = getImgSrc(galleryImgImport);
const solutionsImg = getImgSrc(solutionsImgImport);
const whyUsImg = getImgSrc(whyUsImgImport);
const stackImg = getImgSrc(stackImgImport);

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
const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>); };

const CustomSoftwareDevelopmentPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

    <>
      <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
        <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
          <Header />
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Custom Software Development Services for Enterprises and Startups<span className="text-[#4169E1]">.</span></h1>
          <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
          <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]"><img src={heroImg} alt="Custom Software Development" className="w-full h-full object-cover" loading="lazy" width="1200" height="700"/></div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="p-[2rem]"><Eyebrow>Custom Software Development</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Need custom software built to spec? See how Elipse Studio delivers production-grade custom software development for enterprises and startups.", "Off-the-shelf software rarely fits growing businesses perfectly. Every enterprise reaches a point where custom software becomes necessary — automating unique workflows, integrating disparate systems, delivering competitive advantages competitors cannot copy.", "Elipse Studio delivers custom software development for enterprises, startups, and specialty businesses worldwide. Our engineering team builds web applications, SaaS platforms, enterprise systems, and specialized business software using modern stacks and cloud-native architectures."]} /></div>
            <div className="hidden md:block">
              <ReadText text="Need custom software built to spec? See how Elipse Studio delivers production-grade custom software development for enterprises and startups." />
              <ReadText text="Off-the-shelf software rarely fits growing businesses perfectly. Every enterprise reaches a point where custom software becomes necessary — automating unique workflows, integrating disparate systems, delivering competitive advantages competitors cannot copy." />
              <ReadText text="Elipse Studio delivers custom software development for enterprises, startups, and specialty businesses worldwide. Our engineering team builds web applications, SaaS platforms, enterprise systems, and specialized business software using modern stacks and cloud-native architectures." />
            </div></div>
          <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers custom software development for enterprises, startups, and specialty businesses worldwide. Our team builds web applications, SaaS platforms, enterprise systems, and specialized business software using modern stacks including Node.js, Python, React, Next.js, and cloud-native architectures. Founded 2021.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>What we do</Eyebrow><SectionTitle>Our Custom Software Development Solutions</SectionTitle><ul className="max-w-[680px]">{[{ title: "SaaS Platform Development", desc: "Multi-tenant SaaS applications with modern architecture." }, { title: "Enterprise Web Applications", desc: "Internal business applications and enterprise portals." }, { title: "Custom CRM and ERP", desc: "Tailored business systems for specific workflows." }, { title: "API Development & Integration", desc: "REST and GraphQL APIs plus third-party integrations." }, { title: "Cloud-Native Applications", desc: "AWS, Azure, and GCP native application architecture." }, { title: "Data-Intensive Applications", desc: "Analytics platforms, reporting systems, business intelligence." }, { title: "Legacy System Modernization", desc: "Migration from legacy systems to modern architectures." }, { title: "MVP Development for Startups", desc: "Rapid MVP builds for validation and early customer acquisition." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
              <img src={solutionsImg} alt="Our custom software solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "SaaS Platforms", desc: "Multi-tenant modern architecture." }, { title: "Enterprise Web Apps", desc: "Internal business applications." }, { title: "API Development", desc: "REST, GraphQL, and integrations." }, { title: "Cloud-Native", desc: "AWS, Azure, GCP architecture." }, { title: "Data Analytics", desc: "BI platforms and reporting." }, { title: "MVP Development", desc: "Rapid startup validation builds." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

        <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "50+", label: "Projects Delivered", desc: "Production software for international clients." }, { number: "99.9%", label: "Uptime SLA", desc: "Enterprise-grade reliability." }, { number: "40%", label: "Cost Savings", desc: "Vs off-the-shelf enterprise licensing." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>Why Elipse Studio</Eyebrow><SectionTitle>Why Businesses Worldwide Choose Elipse Studio</SectionTitle><div><ReadText text="Enterprises and startups select Elipse Studio for custom software development because our team combines engineering craft with genuine business understanding. Great software is not just technically excellent — it must solve real business problems, integrate with existing systems, and deliver measurable operational value." /><ReadText text="Our worldwide client base spans early-stage startups requiring MVP development, growing SaaS companies needing platform evolution, enterprises requiring specialized business systems, and specialty businesses solving unique operational challenges." /><ReadText text="See our custom software development portfolio. Explore custom software Elipse Studio has built for SaaS companies, enterprises, and specialty businesses worldwide." /><div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div></div>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
              <img src={whyUsImg} alt="Why enterprises choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>Custom Software Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "SaaS Startups", desc: "MVP development and early platform building." }, { title: "Growing SaaS", desc: "Platform evolution, features, and scaling." }, { title: "Enterprise Internal", desc: "Custom systems automating unique workflows." }, { title: "Specialty Business", desc: "Industry-specific applications competitors can't buy." }, { title: "Legacy Modernization", desc: "Migrating from outdated to modern architectures." }, { title: "Data Platforms", desc: "Analytics and business intelligence systems." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
            <div className="flex-1">
              <Eyebrow>Our stack</Eyebrow><SectionTitle>Our Technology Stack</SectionTitle><div><ReadText text="Elipse Studio's engineering stack includes Node.js, Python (Django, FastAPI), and modern backend architectures; React, Next.js, and Vue.js for frontend development; PostgreSQL, MongoDB, and specialized databases; AWS, Azure, and GCP for cloud infrastructure; Docker and Kubernetes for containerization; and modern DevOps practices for CI/CD and reliable deployment." /></div>
            </div>
            <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
              <img src={stackImg} alt="Our technology stack" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
            </div>
          </div>
        </section>

        <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our Development Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Comprehensive Scoping" desc="Understanding business objectives, user requirements, and technical constraints." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Design" title="Architecture Design" desc="System architecture and technology selection." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Development" title="Iterative Sprints" desc="Regular client demos and transparent progress." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Quality" title="QA & Testing" desc="Comprehensive quality assurance and testing." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Deploy" title="Deployment & Integration" desc="Production deployment and system integration." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Support" title="Ongoing Support" desc="Maintenance, monitoring, and evolution." /></div></div></section>

        <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="Custom Software showcase" className="w-full h-full object-cover" loading="lazy" width="1280" height="720"/></div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What is custom software development?", a: "Custom software development is the design and building of software applications tailored to specific business requirements — rather than adapting off-the-shelf solutions." }, { q: "What technologies does Elipse Studio use?", a: "Node.js, Python (Django, FastAPI), React, Next.js, Vue.js, PostgreSQL, MongoDB, AWS, Azure, GCP, Docker, and Kubernetes." }, { q: "Can Elipse Studio integrate with our existing systems?", a: "Yes. Our development approach prioritizes integration with existing enterprise systems — CRM, ERP, commerce, and custom backends." }, { q: "Do you develop for both enterprises and startups?", a: "Yes. We serve both enterprise clients with formal governance and startups with rapid MVP development." }, { q: "How long does custom software development take?", a: "MVP: 3-6 months. Full applications: 6-12 months. Enterprise platforms: 12-24 months." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

        <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Build software that solves your specific business challenges</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your custom software needs. Our engineering team responds within one business day with a scoped approach.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

        <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
        <ServiceRelatedLinks relatedServices={[{ label: "Website Development", to: "/services/website-development" }, { label: "Mobile App Development", to: "/services/mobile-app-development" }, { label: "Enterprise Solutions", to: "/services/enterprise-solutions" }]} relatedArticles={[{ label: "Top Immersive Tech Trends 2026", to: "/blog/immersive-tech-2026" }, { label: "How Web-Based Configurators Transform Sales", to: "/blog/web-based-configurator" }]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
      </div>

    </>

  );
};
export default CustomSoftwareDevelopmentPage;
