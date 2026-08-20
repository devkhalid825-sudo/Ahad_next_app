'use client';

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Contact from "../features/Contact";
import ServiceRelatedLinks from "./ServiceRelatedLinks";
import LatestWork from "../features/LatestWork";
import ClientReviews from "../features/ClientReviews";

import _heroImg from "../../assets/ElipseImages/projects/3602.webp";
import _galleryImg from "../../assets/emerled/Living.webp";
import _solutionsImg from "../../assets/tim-barth/Day/01.0000.webp";
import _whyUsImg from "../../assets/tim-barth/Night/01.0000.webp";
import _stackImg from "../../assets/emerled/Bedroom.webp";
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

const VirtualShowroomsDigitalTwinsPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Virtual Showroom and Digital Twin Development Worldwide<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project →</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] overflow-hidden">
          <iframe className="w-full h-full" src="https://www.youtube.com/embed/fsFrKrfSFHg?si=wop9E6qLzbijDS9-" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen loading="lazy"></iframe>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D] flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
        <div className="p-[2rem]"><Eyebrow>Virtual Showrooms & Digital Twins</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Reach international customers with virtual showrooms? See how Elipse Studio builds virtual showrooms and digital twins that bridge physical and digital.", "Physical showrooms and facilities can only serve people who visit them. Virtual showrooms and digital twins transcend that geographic limitation — letting international customers explore products, letting distributed teams operate facilities remotely, and letting executive stakeholders experience complex environments without travel.", "Elipse Studio builds virtual showroom and digital twin platforms for luxury brands, real estate developers, manufacturers, energy companies, and specialty enterprises worldwide."]} /></div>
        <div className="hidden md:block">
          <ReadText text="Reach international customers with virtual showrooms? See how Elipse Studio builds virtual showrooms and digital twins that bridge physical and digital." />
          <ReadText text="Physical showrooms and facilities can only serve people who visit them. Virtual showrooms and digital twins transcend that geographic limitation — letting international customers explore products, letting distributed teams operate facilities remotely, and letting executive stakeholders experience complex environments without travel." />
          <ReadText text="Elipse Studio builds virtual showroom and digital twin platforms for luxury brands, real estate developers, manufacturers, energy companies, and specialty enterprises worldwide." />
        </div></div>
        <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio builds immersive virtual showrooms and photrealistic digital twins for brands, developers, and enterprises worldwide. Our virtual showrooms let international customers explore products and properties remotely. Our digital twins provide 1:1 digital replicas for operations, training, and executive communication.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>What we do</Eyebrow><SectionTitle>Our Virtual Showroom and Digital Twin Solutions</SectionTitle><ul className="max-w-[680px]">{[{ title: "Luxury Brand Virtual Showrooms", desc: "Immersive branded experiences accessible from any device." },{ title: "Retail Virtual Showrooms", desc: "Interactive product discovery for e-commerce and D2C brands." },{ title: "Real Estate Digital Twins", desc: "Photrealistic property replicas for sales and operations." },{ title: "Manufacturing Facility Digital Twins", desc: "1:1 factory replicas for training and operations." },{ title: "Energy Facility Digital Twins", desc: "Plant and infrastructure digital twins for training and remote ops." },{ title: "Hospitality Virtual Tours", desc: "Immersive hotel and resort experiences for international bookings." },{ title: "Trade Show Virtual Booths", desc: "Digital showroom presence for events and campaigns." },{ title: "VR-Enabled Virtual Showrooms", desc: "Immersive VR access alongside web browser deployment." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
            <img src={solutionsImg} alt="Our virtual showroom solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Virtual Showrooms", desc: "Immersive branded product experiences." },{ title: "Digital Twins", desc: "1:1 facility and property replicas." },{ title: "Web Deployment", desc: "Browser-based access on any device." },{ title: "VR Access", desc: "Meta Quest and Varjo immersive modes." },{ title: "Commerce Integration", desc: "Shopify, WooCommerce connectivity." },{ title: "Operational Data", desc: "Sensor and system integration for twins." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "80%", label: "Geographic Reach", desc: "International customer access." },{ number: "60%", label: "Travel Reduction", desc: "Virtual facility tours." },{ number: "24/7", label: "Always Available", desc: "Continuous virtual access." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Why Elipse Studio</Eyebrow><SectionTitle>Why Brands Worldwide Choose Elipse Studio</SectionTitle><div><ReadText text="Luxury brands, developers, and enterprises select Elipse Studio because our team combines photrealistic craft with genuine operational understanding. Virtual showrooms are not just impressive 3D websites — they must integrate with commerce platforms and product catalogs. Digital twins must connect with plant information systems and sensor data." /><ReadText text="Our worldwide client base ranges from luxury brands seeking international collectors, to real estate developers marketing to global buyers, to manufacturers deploying digital twins for training and remote operations." /><ReadText text="See our virtual showroom and digital twin portfolio. Explore platforms Elipse Studio has built for luxury brands, developers, and industrial clients." /><div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div></div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
            <img src={whyUsImg} alt="Why brands choose Elipse Studio" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>Virtual Showroom and Digital Twin Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Luxury Brands", desc: "International collector reach without global showrooms." },{ title: "Real Estate", desc: "Marketing and facility management digital twins." },{ title: "Manufacturing", desc: "Factory twins for training and remote inspection." },{ title: "Energy", desc: "Facility twins for high-consequence training." },{ title: "Hospitality", desc: "Virtual tours for international guest engagement." },{ title: "Retail Chains", desc: "Consistent brand experience across markets." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          <div className="flex-1">
            <Eyebrow>Our stack</Eyebrow><SectionTitle>Our Technology Platform</SectionTitle><div><ReadText text="Elipse Studio's virtual showroom and digital twin stack uses Unreal Engine 5 for premium photreal fidelity, WebGL through Three.js and Babylon.js for browser-based deployment, and VR platforms including Meta Quest 3 and Varjo XR-4 for immersive access. Integration with commerce platforms supports retail virtual showrooms. Digital twins integrate with plant information systems, sensor networks, and enterprise operational platforms." /></div>
          </div>
          <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
            <img src={stackImg} alt="Our technology platform" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
          </div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our Development Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8 justify-center"><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="01" phase="Discovery" title="Commercial Scoping" desc="Understanding commercial or operational goals." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="02" phase="Capture" title="3D Asset Libraries" desc="Building from CAD, laser scans, or reference materials." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="03" phase="Design" title="UX & Navigation" desc="Designing user experience and spatial navigation." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="04" phase="Development" title="Platform Build" desc="Commerce and operational integrations." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="05" phase="Testing" title="Cross-Device QA" desc="Web, mobile, and VR quality assurance." /></div><div className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard step="06" phase="Launch" title="Deploy & Update" desc="Ongoing content updates and operational support." /></div></div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="Virtual Showroom showcase" className="w-full h-full object-cover" loading="lazy" width="1280" height="720"/></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What are virtual showrooms and digital twins?", a: "Virtual showrooms are immersive branded experiences accessible via web browser or VR. Digital twins are photrealistic 1:1 digital replicas of physical facilities for operations, training, and communication." },{ q: "Do virtual showrooms work on mobile devices?", a: "Yes. We engineer virtual showrooms for cross-device performance including smartphones and tablets." },{ q: "What is the difference between a digital twin and a 3D model?", a: "A 3D model is static geometry. A digital twin is a live, interactive representation that may connect to real-world data like sensors and operations systems." },{ q: "Can virtual showrooms integrate with our e-commerce platform?", a: "Yes. We integrate with Shopify Plus, WooCommerce, Magento, BigCommerce, and custom commerce backends." },{ q: "How long does development take?", a: "Virtual showrooms: 14-24 weeks. Digital twins for facilities: 20-30+ weeks depending on complexity." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Reach global audiences with virtual showrooms and digital twins</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your virtual showroom or digital twin project. Our team responds within one business day.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">▦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">➤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:"Architectural Visualization",to:"/services/architectural-visualization"},{label:"VR Development",to:"/services/vr-development"},{label:"3D Product Configurators",to:"/services/3d-product-configurators"}]} relatedArticles={[{label:"3D Real-Time Configurators for Real Estate in Dubai",to:"/blog/3d-real-time-configurators-real-estate-dubai"},{label:"How VR Is Reshaping the World",to:"/blog/vr-reshaping-world"}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default VirtualShowroomsDigitalTwinsPage;

