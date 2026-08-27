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

import heroImgRaw from "../../assets/App-web-image/hero.webp";
import galleryImgRaw from "../../assets/App-web-image/Header-Image.webp";
import solutionsImgRaw from "../../assets/App-web-image/second image.webp";
import whyUsImgRaw from "../../assets/App-web-image/third.webp";
import stackImgRaw from "../../assets/App-web-image/hero.webp";

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
const StatCard = ({ number, label, desc }) => (<div className="bg-[#111] p-5 md:p-[2.5rem] flex flex-col justify-center"><div className="text-2xl md:text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{number}</div><div className="font-semibold text-[#F2F0EB] mb-[8px] text-sm md:text-base">{label}</div>{desc && <div className="text-xs md:text-lg font-light leading-relaxed text-white/70">{desc}</div>}</div>);
const ProcessCard = ({ step, phase, title, desc }) => (<div className="bg-[#1A1A1A] rounded-2xl p-4 md:p-8 border border-white/5"><div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4"><span className="text-2xl md:text-4xl font-bold text-[#4169E1]">{step}</span>{phase && <span className="text-[10px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2 md:px-3 py-1 rounded-full uppercase tracking-[0.08em]">{phase}</span>}</div><h4 className="text-sm md:text-[20px] font-semibold text-[#F2F0EB] mb-2 md:mb-3">{title}</h4>{desc && <p className="text-xs md:text-[15px] font-light leading-[1.6] md:leading-[1.7] text-white/70">{desc}</p>}</div>);
const UseCaseCard = ({ title, desc }) => (<div className="bg-[#111] rounded-lg p-4 md:p-[2rem] border border-white/5"><h3 className="text-base md:text-lg font-semibold text-[#F2F0EB] mb-2">{title}</h3>{desc && <p className="text-white/60 text-xs md:text-sm leading-relaxed">{desc}</p>}</div>);
const FaqItem = ({ q, a, isOpen, onToggle }) => (<div className="border-b border-[#1A1A1A]"><button type="button" onClick={onToggle} className="w-full flex items-center justify-between gap-4 py-5 md:py-6 text-left"><span className="text-base md:text-lg text-[#F2F0EB] font-medium pr-2">{q}</span><span className={`text-[#4169E1] text-2xl transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`}>+</span></button>{isOpen && <p className="text-base md:text-lg font-light leading-relaxed text-white/70 pb-5 md:pb-6">{a}</p>}</div>);
const TextCarousel = ({ texts }) => { const [current, setCurrent] = useState(0); const [touchStart, setTouchStart] = useState(null); const onTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX); const onTouchEnd = (e) => { if (touchStart === null) return; const diff = touchStart - e.changedTouches[0].clientX; if (Math.abs(diff) > 50) { if (diff > 0 && current < texts.length - 1) setCurrent(current + 1); if (diff < 0 && current > 0) setCurrent(current - 1); } setTouchStart(null); }; return (<div><div className="relative min-h-[140px]" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>{texts.map((text, i) => (<div key={i} className={`transition-all duration-500 ${i === current ? "opacity-100 relative" : "opacity-0 absolute inset-0 pointer-events-none"}`}><ReadText text={text} /></div>))}</div><div className="flex gap-2 mt-6">{texts.map((_, i) => (<button key={i} onClick={() => setCurrent(i)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${i === current ? "bg-[#4169E1] w-6" : "bg-[#333] w-2"}`} />))}</div></div>);
}

const MobileAppDevelopmentPage = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const handleStartProject = () => navigate('/contact');
    return (

  <>
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">
      <section className="bg-[#0D0D0D] px-5 md:px-8 pt-[100px] md:pt-[140px] pb-[3rem] relative md:min-h-screen">
        <Header />
        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">Custom Mobile App Development for iOS, Android, and Cross-Platform<span className="text-[#4169E1]">.</span></h1>
        <div className="flex flex-wrap gap-[8px] mt-[3rem]"><button onClick={handleStartProject} className="text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-0 md:ml-auto">Start a Project â†’</button></div>
        <div className="w-full mt-[1.5rem] h-[40vh] sm:h-[55vh] md:h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]"><img src={heroImg} alt="Mobile App Development" className="w-full h-full object-cover" loading="lazy" width="1200" height="700"/></div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-[3rem] items-stretch">
          <div className="flex-1 p-[2rem]"><Eyebrow>Custom Mobile App Development</Eyebrow><SectionTitle>Overview</SectionTitle><div className="md:hidden"><TextCarousel texts={["Launching a mobile app that needs to succeed? See how Elipse Studio's custom app development delivers apps users actually love.", "Mobile applications have become primary business channels for many industries. Yet most mobile app projects fail â€” poor user experience, technical issues, weak App Store performance, or misalignment between what was built and what users actually need.", "Elipse Studio delivers custom app development for startups, enterprises, and specialty businesses worldwide. Our mobile team combines technical excellence across iOS, Android, and cross-platform development with genuine understanding of what makes apps commercially successful."]} /></div><div className="hidden md:block"><ReadText text="Launching a mobile app that needs to succeed? See how Elipse Studio's custom app development delivers apps users actually love." /><ReadText text="Mobile applications have become primary business channels for many industries. Yet most mobile app projects fail â€” poor user experience, technical issues, weak App Store performance, or misalignment between what was built and what users actually need." /><ReadText text="Elipse Studio delivers custom app development for startups, enterprises, and specialty businesses worldwide. Our mobile team combines technical excellence across iOS, Android, and cross-platform development with genuine understanding of what makes apps commercially successful." /></div></div>
        <div className="flex-1 bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB]"><Eyebrow>TL;DR</Eyebrow><SectionTitle className="text-2xl md:text-3xl lg:text-[34px] mb-6 md:mb-10">Quick answer</SectionTitle><div className="text-base md:text-lg font-light leading-relaxed text-white/70">Elipse Studio delivers custom app development for iOS (Swift, SwiftUI), Android (Kotlin), and cross-platform (React Native, Flutter) â€” from concept through App Store deployment. Our team builds mobile applications for startups, enterprises, and specialty businesses worldwide. Founded 2021.</div><div className="mt-6"><CTA label="Get Started" to="/contact" /></div></div>
        </div>
      </section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
    <div className="flex-1">
      <Eyebrow>What we do</Eyebrow><SectionTitle>Our Mobile App Development Solutions</SectionTitle><ul className="max-w-[680px]">{[{ title: "Native iOS Development", desc: "Swift and SwiftUI applications with premium platform integration." },{ title: "Native Android Development", desc: "Kotlin applications following modern Android architecture." },{ title: "React Native Cross-Platform", desc: "Single codebase apps for iOS and Android." },{ title: "Flutter Cross-Platform", desc: "Modern cross-platform development for consistent UI." },{ title: "Enterprise Mobile Applications", desc: "Business apps with enterprise-grade security and integration." },{ title: "Consumer Product Apps", desc: "Direct-to-consumer applications for growing brands." },{ title: "MVP Mobile Development", desc: "Rapid mobile MVP builds for early market validation." },{ title: "App Modernization", desc: "Rebuilding outdated mobile applications on modern architectures." }].map((s, i) => <SolutionItem key={i} title={s.title} desc={s.desc} />)}</ul>
    </div>
    <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[600px] overflow-hidden">
      <img src={solutionsImg} alt="Our mobile app solutions" className="w-full h-full object-cover" style={{ marginTop: '100px' }} loading="lazy" width="800" height="600"/>
    </div>
  </div>
</section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Capabilities</Eyebrow><SectionTitle>What We Deliver</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Native iOS", desc: "Swift and SwiftUI premium quality." },{ title: "Native Android", desc: "Kotlin modern architecture." },{ title: "Cross-Platform", desc: "React Native and Flutter efficiency." },{ title: "Enterprise Grade", desc: "Security, MDM, and compliance." },{ title: "App Store Optimization", desc: "ASO for maximum discovery." },{ title: "Post-Launch Analytics", desc: "Iteration based on user data." }].map((f, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><FeatureCard title={f.title} desc={f.desc} /></div>)}</div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem]"><Eyebrow>Measurable impact</Eyebrow><SectionTitle>Results that moved the business</SectionTitle><div className="flex flex-wrap gap-px border border-white/5 rounded-xl overflow-hidden">{[{ number: "4.5+", label: "Average App Store Rating", desc: "Across published applications." },{ number: "1M+", label: "Downloads Generated", desc: "Across client applications." },{ number: "60%", label: "Faster Launch", desc: "Cross-platform code sharing." }].map((s, i) => <div key={i} className="w-full sm:w-[calc(50%-1px)] lg:w-[calc(33.333%-1px)]"><StatCard number={s.number} label={s.label} desc={s.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
    <div className="flex-1">
      <Eyebrow>Why Elipse Studio</Eyebrow><SectionTitle>Why Businesses Choose Elipse Studio for App Development</SectionTitle><div><ReadText text="Startups and enterprises select Elipse Studio for custom app development because our team combines technical craft with genuine mobile product understanding. Great mobile apps require thoughtful UX, careful App Store optimization, appropriate monetization architecture, and long-term maintenance planning." /><ReadText text="Our development approach emphasizes what actually matters for mobile success. Native performance where it counts. Cross-platform efficiency where it makes sense. Enterprise-grade security architecture. App Store optimization for consumer discovery." /><ReadText text="See our mobile app development portfolio. Explore mobile applications Elipse Studio has built for startups, enterprises, and specialty businesses worldwide." /><div className="mt-8"><CTA label="View Portfolio" to="/portfolio" /></div></div>
    </div>
    <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[550px] overflow-hidden">
      <img src={whyUsImg} alt="Why brands choose Elipse Studio for mobile apps" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
    </div>
  </div>
</section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#111]"><Eyebrow>Applications</Eyebrow><SectionTitle>Mobile App Development Use Cases</SectionTitle><div className="flex flex-wrap gap-3 md:gap-6">{[{ title: "Startup MVPs", desc: "Rapid mobile builds for early validation." },{ title: "Consumer DTC", desc: "Direct-to-consumer brand applications." },{ title: "Enterprise Internal", desc: "Field operations and sales automation." },{ title: "Specialty Industry", desc: "Industry-specific mobile applications." },{ title: "E-Commerce", desc: "Premium mobile shopping experiences." },{ title: "AR Experiences", desc: "Immersive mobile AR applications." }].map((u, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-16px)]"><UseCaseCard title={u.title} desc={u.desc} /></div>)}</div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]">
  <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
    <div className="flex-1">
      <Eyebrow>Our stack</Eyebrow><SectionTitle>Our Mobile Development Technology Stack</SectionTitle><div><ReadText text="Elipse Studio's mobile stack covers Swift and SwiftUI for premium iOS, Kotlin for modern Android, React Native for cross-platform efficiency, Flutter for consistent cross-platform UI. Backend infrastructure uses Node.js, Python, and cloud-native architectures on AWS, Azure, or GCP." /></div>
    </div>
    <div className="flex-1 w-full h-[300px] sm:h-[400px] lg:h-full lg:min-h-[500px] overflow-hidden">
      <img src={stackImg} alt="Our mobile development technology" className="w-full h-full object-cover" loading="lazy" width="800" height="600"/>
    </div>
  </div>
</section>

      <section className="px-5 md:px-8 py-8 md:py-[6rem] bg-[#0D0D0D]"><Eyebrow>How we did it</Eyebrow><SectionTitle>Our App Development Process</SectionTitle><div className="flex flex-wrap gap-3 md:gap-8" style={{ justifyContent: 'center' }}>{[{ step: "01", phase: "Discovery", title: "Strategic Scoping", desc: "Business objectives, users, platform priorities, and monetization." },{ step: "02", phase: "Design", title: "UX Design", desc: "User-centered interface and interaction design." },{ step: "03", phase: "Development", title: "Iterative Sprints", desc: "Regular demos with transparent progress." },{ step: "04", phase: "QA", title: "Device Testing", desc: "Cross-device quality assurance." },{ step: "05", phase: "Launch", title: "App Store Submission", desc: "ASO optimization and store submission." },{ step: "06", phase: "Growth", title: "Analytics & Iteration", desc: "Post-launch optimization based on data." }].map((p, i) => <div key={i} className="w-full sm:w-[calc(50%-6px)] lg:w-[calc(33.333%-21px)]"><ProcessCard {...p} /></div>)}</div></section>

      <section className="bg-[#111] px-5 md:px-8 py-10 md:py-[6rem] overflow-hidden"><Eyebrow>Visual output</Eyebrow><SectionTitle>Selected work</SectionTitle><div className="w-full max-w-[1280px] mx-auto rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]"><img src={galleryImg} alt="Mobile App Development showcase" className="w-full h-full object-cover" loading="lazy" width="1280" height="720"/></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="max-w-[800px] mx-auto"><Eyebrow>FAQ</Eyebrow><SectionTitle>Frequently Asked Questions</SectionTitle><div className="max-w-[680px]">{[{ q: "What is custom app development?", a: "Custom app development is the design and development of mobile applications tailored to specific business requirements â€” versus adapting off-the-shelf solutions." },{ q: "Native iOS/Android or cross-platform?", a: "Native delivers maximum performance. Cross-platform (React Native, Flutter) delivers faster development and code sharing. We recommend based on your specific requirements." },{ q: "Does Elipse Studio handle App Store submission?", a: "Yes. We handle App Store optimization and submission for both Apple App Store and Google Play Store." },{ q: "Can you integrate with enterprise systems?", a: "Yes. We integrate with CRM, ERP, MDM platforms, and custom backends." },{ q: "How long does custom app development take?", a: "MVP: 3-5 months. Full consumer apps: 5-9 months. Enterprise apps: 9-15 months." }].map((f, i) => <FaqItem key={i} q={f.q} a={f.a} isOpen={openFaq === i} onToggle={() => setOpenFaq(openFaq === i ? null : i)} />)}</div></div></section>

      <section className="px-5 md:px-8 py-10 md:py-[6rem] bg-[#0D0D0D]"><div className="rounded-lg border border-[#1A1A1A] bg-[#111] p-6 md:p-14 text-center"><h2 className="text-xl md:text-4xl font-medium tracking-tight text-[#F2F0EB] mb-4 max-w-2xl mx-auto">Build mobile apps users love and businesses monetize</h2><p className="text-sm md:text-lg font-light leading-relaxed text-white/70 mb-8 max-w-2xl mx-auto">Tell Elipse Studio about your mobile app project. Our team responds within one business day with a scoped approach for iOS, Android, or cross-platform development.</p><div className="flex justify-center"><CTA label="Discuss Your Project" to="/contact" /></div></div></section>

      <footer className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]"><div className="flex items-center justify-between flex-wrap gap-[10px] w-full"><div className="flex gap-[10px] flex-wrap"><button className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer" onClick={() => navigate("/")}><span aria-hidden="true">â–¦</span> All work</button><button className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer" onClick={handleStartProject}><span aria-hidden="true">âž¤</span> Start a project</button></div></div></footer>
      <ServiceRelatedLinks relatedServices={[{label:"Custom Software Development",to:"/services/custom-software-development"},{label:"AR Development",to:"/services/ar-development"},{label:"VR Development",to:"/services/vr-development"}]} relatedArticles={[{label:"Top Immersive Tech Trends 2026",to:"/blog/immersive-tech-2026"},{label:"Custom VR Development Services",to:"/blog/vr-custom-development-2026"}]} /><LatestWork /><ClientReviews /><div id="contact"><Contact /></div><Footer />
    </div>
  

  </>

  );
};
export default MobileAppDevelopmentPage;

