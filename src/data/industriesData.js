import _realestateImg from '../assets/industies-hero-image/realstate.webp';
import _architectureImg from '../assets/industies-hero-image/kumar.webp';
import _interiorImg from '../assets/industies-hero-image/interior-design.webp';
import _manufacturingImg from '../assets/industies-hero-image/Manufacturing.webp';
import _ecommerceImg from '../assets/industies-hero-image/ecommerce.webp';
import _automotiveImg from '../assets/industies-hero-image/configartor.webp';
import _furnitureImg from '../assets/industies-hero-image/furnsiher.webp';
import _healthcareImg from '../assets/industies-hero-image/health.webp';
import _educationImg from '../assets/industies-hero-image/education_result.webp';
import _constructionImg from '../assets/industies-hero-image/construction.webp';
import _hospitalityImg from '../assets/industies-hero-image/hospital-magement system.webp';
import { getImgSrc } from "../utils/api";
const realestateImg = getImgSrc(_realestateImg);
const architectureImg = getImgSrc(_architectureImg);
const interiorImg = getImgSrc(_interiorImg);
const manufacturingImg = getImgSrc(_manufacturingImg);
const ecommerceImg = getImgSrc(_ecommerceImg);
const automotiveImg = getImgSrc(_automotiveImg);
const furnitureImg = getImgSrc(_furnitureImg);
const healthcareImg = getImgSrc(_healthcareImg);
const educationImg = getImgSrc(_educationImg);
const constructionImg = getImgSrc(_constructionImg);
const hospitalityImg = getImgSrc(_hospitalityImg);


export const industriesData = [
  {
    slug: "real-estate",
    title: "Real Estate",
    shortDesc: "Off-plan visualization & sales centre installations.",
    category: "Real Estate",
    icon: "HiOutlineBuildingOffice2",
    meta: {
      seoTitle: "Real Estate Visualization & Virtual Property Tours | Elipse Studio",
      metaDescription: "Elipse Studio delivers photoreal real estate visualization, virtual property tours, off-plan sales solutions & interactive sales centers for developers in Dubai and worldwide.",
      keywords: "real estate visualization, off-plan property sales, virtual property tours, real estate 3D rendering, interactive sales centers, property configurators, digital twin real estate, luxury property showcase",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Real Estate Solutions by Elipse Studio",
    },
    hero: {
      headline: "Sell Off-Plan Properties Before Construction with Photoreal Real Estate Visualization",
      subheadline: "Elipse Studio delivers photorealistic renderings, immersive virtual property tours, interactive sales centers, and property configurators that help developers close international buyers and lift off-plan sales.",
      ctaText: "Get Your Real Estate Visualization Quote",
      ctaLink: "/contact",
      image: realestateImg
    },
    tlDr: "Elipse Studio is a leading architectural visualization studio delivering photorealistic real estate visualization and virtual property tour solutions to developers in Dubai, the UAE, Saudi Arabia, the United States, the United Kingdom, and worldwide. Our real estate services include off-plan property sales solutions, interactive sales centers, virtual property tours, digital twin experiences, property configurators, investor presentation tools, and luxury property showcases.",
    intro: [
      "Real estate marketing has fundamentally shifted. Property buyers no longer wait for construction to complete before making purchase decisions — they commit to off-plan units based on the quality and realism of the visualizations they experience online. Developers who deliver photorealistic real estate visualization, immersive virtual property tours, and interactive sales center experiences consistently outperform competitors relying on flat 2D floor plans and static renderings alone.",
      "Elipse Studio specializes in the complete visualization toolkit that modern real estate developers need. Founded in 2014 and trusted by premium developers including Burj Binghatti, our team delivers photorealistic real estate visualization across every touchpoint — from initial concept through investor presentations, off-plan sales, interactive sales centers, and post-launch marketing campaigns. We serve developers in Dubai, across the UAE, Saudi Arabia, and internationally in the United States, United Kingdom, and beyond."
    ],
    solutions: [
      "Off-Plan Property Sales Solutions — Photorealistic renderings, virtual tours, and immersive experiences that let buyers commit to units before construction begins.",
      "Interactive Sales Centers — Touch-screen kiosks, projection walls, and immersive VR/AR sales center experiences that transform how developers close deals.",
      "Virtual Property Tours — 360° virtual walkthroughs and immersive VR tours accessible from any device, enabling international buyers to experience properties remotely.",
      "Property Marketing Campaigns — Full-motion architectural animations, cinematic marketing videos, and social media assets for property launches.",
      "Digital Twin Experiences — Photorealistic 1:1 digital replicas of developments that support sales, operations, and long-term facility management.",
      "Investor Presentation Solutions — Boardroom-grade immersive presentations for institutional investors, sovereign wealth funds, and private equity partners.",
      "Real Estate Lead Generation Experiences — Interactive online experiences designed specifically to capture qualified buyer leads.",
      "Interactive Community Maps — Explorable 3D masterplan visualizations for large-scale developments and mixed-use projects.",
      "Property Configurators — Real-time customization tools that let buyers configure finishes, layouts, and options before purchase.",
      "Luxury Property Showcases — Cinematic-quality visualization experiences designed specifically for ultra-premium property positioning."
    ],
    whyUs: [
      "Property developers in Dubai, Riyadh, London, New York, and other global markets select Elipse Studio as their real estate visualization partner for specific commercial reasons. Our team combines photorealistic craft with commercial understanding — we build visualizations that actually sell property, not just impressive imagery. Our work has supported premium developers including Burj Binghatti in their sales and marketing initiatives.",
      "The strategic advantage of working with Elipse Studio for real estate visualization is integrated capability across every format. Instead of hiring separate agencies for renderings, animation, VR, AR, and configurators, developers work with one experienced team that produces all visualization deliverables from a single 3D asset pipeline — dramatically improving quality consistency, cost efficiency, and project timelines."
    ],
    midCta: {
      headline: "See What Photoreal Real Estate Visualization Can Do for Your Development",
      text: "Elipse Studio has delivered off-plan visualization for premium developers including Burj Binghatti. See our real estate portfolio and understand what's possible for your next project.",
      buttonText: "View Real Estate Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Elipse Studio's real estate solutions address specific commercial scenarios that property developers face daily. Off-plan sales campaigns require photorealistic renderings of exteriors, interiors, and amenity spaces well before construction begins. International buyer outreach requires virtual property tours accessible via smartphone and VR headset. Sales centers need touch-screen configurators and immersive presentation systems to close high-value units. Investor pitches require cinematic-quality architectural animations that communicate the full development vision. Our team supports developers across residential (villas, apartments, townhouses), commercial (offices, retail, mixed-use), hospitality (hotels, resorts, branded residences), and specialty developments (waterfront, master-planned communities, off-plan phases). Every project draws on our combined real estate visualization, animation, VR/AR, and configurator capabilities as needed.",
    technology: "Elipse Studio's real estate visualization pipeline combines industry-leading tools with proprietary craft techniques. We work in Unreal Engine 5 and V-Ray for photorealistic rendering, Unity and Unreal Engine 5 for interactive real-time experiences, WebGL through Three.js and Babylon.js for browser-based configurators and virtual tours, and specialized VR/AR development stacks for immersive sales center experiences. Our approach starts with understanding each development's specific commercial goals — off-plan sales targets, international buyer segments, price positioning, and competitive context. Only after this strategic clarity is established do we deploy the right visualization mix. Elipse Studio's platform-neutral capability means our recommendations always serve the developer's actual sales goals rather than fitting the project into a single technology preference.",
    faqs: [
      { q: "What is real estate visualization and how does it help off-plan sales?", a: "Real estate visualization is the creation of photorealistic 3D representations of properties that let buyers see, explore, and understand a development before construction is complete. It transforms off-plan sales by giving buyers the confidence to commit early — dramatically reducing the sales cycle and enabling international buyer participation. Elipse Studio has delivered off-plan visualization for premium Dubai developments including work with Burj Binghatti." },
      { q: "Can Elipse Studio serve real estate developers outside the UAE?", a: "Yes. Elipse Studio serves real estate developers in Dubai, across the UAE and GCC, Saudi Arabia (including Vision 2030 megaprojects), the United States, the United Kingdom, and internationally. Our fully remote-capable production pipeline delivers photorealistic real estate visualization to developers anywhere in the world with the same quality standards we apply to local Dubai work." },
      { q: "How long does a real estate visualization project typically take?", a: "Timelines depend on scope. A focused set of exterior and interior renderings for a single unit typically takes 3-5 weeks. Complete sales center packages (renderings, animation, virtual tour, configurator) typically span 12-16 weeks. Full digital twin experiences and interactive sales center installations extend to 20+ weeks. Elipse Studio provides realistic timelines with every proposal based on the specific scope." },
      { q: "Do you deliver both renderings and virtual reality tours?", a: "Yes. Elipse Studio delivers photorealistic renderings, cinematic architectural animation, browser-based virtual tours, immersive VR walkthroughs for VR headsets, and AR mobile experiences — all from an integrated 3D asset pipeline. This combined capability is a key reason developers choose Elipse Studio over agencies specializing in just one format." },
      { q: "How does a property configurator increase real estate sales?", a: "Property configurators let buyers customize finishes, layouts, and options in real time while seeing photorealistic preview updates. This dramatically increases buyer engagement, lifts average unit values through premium upgrade adoption, reduces post-sale change requests, and provides sales teams with detailed data about buyer preferences. Elipse Studio's real estate configurators integrate with CRM systems for complete sales workflow support." },
      { q: "How do I start a real estate visualization project with Elipse Studio?", a: "Contact Elipse Studio through our website with a brief description of your development — property type, target buyer audience, timeline, and desired visualization scope. A senior team member will respond within one business day, typically with a structured discovery call to scope the project properly before any formal proposal." }
    ],
    finalCta: {
      headline: "Ready to Transform Your Off-Plan Sales?",
      text: "Tell Elipse Studio about your real estate development. Our senior team will respond within one business day with a scoped approach for your off-plan campaign, virtual tour, sales center, or complete visualization package.",
      buttonText: "Discuss Your Real Estate Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "architecture",
    title: "Architecture",
    shortDesc: "Render production for design firms & competitions.",
    category: "Architecture",
    icon: "LuRuler",
    meta: {
      seoTitle: "Architectural Visualization Services for Architects | Elipse Studio",
      metaDescription: "Elipse Studio provides architectural visualization, VR walkthroughs, design presentation solutions & stakeholder approval experiences for architects worldwide.",
      keywords: "architectural visualization, VR architectural walkthroughs, design presentation, architectural competition visualization, concept visualization, material selection experiences, interactive design reviews",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Architecture Solutions by Elipse Studio",
    },
    hero: {
      headline: "Architectural Visualization That Wins Competitions and Approvals",
      subheadline: "Elipse Studio partners with architects and design firms worldwide to deliver photorealistic renderings, VR walkthroughs, competition-quality visualization, and stakeholder approval experiences.",
      ctaText: "Discuss Your Architecture Project",
      ctaLink: "/contact",
      image: architectureImg
    },
    tlDr: "Elipse Studio delivers professional architectural visualization services designed specifically for architects, design firms, and architectural studios worldwide. Our architecture solutions include design presentation tools, VR architectural walkthroughs, architectural competition visualizations, stakeholder approval experiences, interactive design reviews, concept visualization, and material selection experiences — helping architects communicate design intent, win competitions, secure approvals, and align stakeholders.",
    intro: [
      "Modern architecture requires modern visualization. The days when hand-drawn sketches and 2D drawings alone could communicate design intent to clients, stakeholders, and competition juries are over. Today's architects need architectural visualization that captures spatial experience, material quality, lighting behavior, and design atmosphere with photorealistic precision — often before a single foundation stone is laid.",
      "Elipse Studio partners with architects, design firms, and architectural studios worldwide to deliver visualization that genuinely serves the design process. Founded in 2014 and headquartered in Karachi with clients across Dubai, the UAE, the United States, the United Kingdom, and internationally, our team combines deep architectural visualization craft with genuine understanding of how architects work."
    ],
    solutions: [
      "Design Presentation Solutions — Photorealistic renderings, boards, and interactive presentations for client pitches and design reviews.",
      "Architectural Competition Visualizations — Award-quality visualization packages designed specifically to win competitions with cinematic imagery.",
      "Stakeholder Approval Experiences — Immersive VR experiences that align diverse stakeholder groups around design decisions.",
      "Interactive Design Reviews — Real-time 3D reviews that let clients navigate designs, compare options, and provide focused feedback.",
      "Design Communication Tools — Visualization deliverables designed specifically to communicate design intent to non-architects.",
      "Concept Visualization Solutions — Early-stage rapid visualization that supports design exploration and iteration.",
      "Material Selection Experiences — Interactive tools that let clients experience material choices in photorealistic context.",
      "VR Architectural Walkthroughs — Fully immersive VR experiences that put clients inside the design at true scale."
    ],
    whyUs: [
      "Architects and design firms select Elipse Studio as their architectural visualization partner because our team understands the difference between generic 3D rendering and architectural visualization that genuinely serves design. We speak the language of architecture — massing, materiality, tectonics, spatial hierarchy, program adjacencies. Our visualizations reflect what architects actually care about, not just impressive-looking imagery.",
      "Elipse Studio's integrated capability across renderings, animation, VR/AR, and interactive design tools means one visualization partner delivers everything the modern architectural practice needs. This dramatically simplifies vendor management, ensures visual consistency across a project's lifecycle, and reduces the coordination overhead of managing multiple visualization suppliers."
    ],
    midCta: {
      headline: "See How Elipse Studio Elevates Architectural Presentation",
      text: "Explore our architectural visualization portfolio featuring competition submissions, client presentations, and VR walkthroughs delivered for design firms worldwide.",
      buttonText: "View Architecture Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Architectural visualization serves specific moments in the design process. Concept phase requires rapid visualization that supports design exploration without over-committing to any single direction. Competition submissions require cinematic-quality imagery that stands out among hundreds of entries. Client presentations require photorealistic renderings that build client confidence in design decisions. Stakeholder approvals often require VR experiences that let diverse groups experience space collectively. Elipse Studio's team supports architects across residential, commercial, institutional, hospitality, healthcare, educational, and specialty typologies. Every visualization project is scoped to the actual design phase and communication objective — never over-delivered, never under-delivered.",
    technology: "Elipse Studio's architectural visualization pipeline uses industry-standard tools trusted by leading global visualization studios — Unreal Engine 5 and V-Ray for photorealistic rendering, Rhino and Revit integration for architectural workflow compatibility, Unity and Unreal Engine 5 for interactive real-time architectural experiences, and specialized VR platforms including Meta Quest and Varjo for immersive design reviews. Our workflow integrates naturally with architectural practice — we work from architect-provided CAD, BIM, and Rhino files rather than requiring architects to translate their design intent into unfamiliar formats. This deep workflow compatibility is one reason design firms return to Elipse Studio project after project.",
    faqs: [
      { q: "What is architectural visualization and how does it help architects?", a: "Architectural visualization is the creation of photorealistic representations of designed buildings and spaces before they are built. It helps architects communicate design intent, win competitions, secure stakeholder approvals, guide construction decisions, and market completed projects. Elipse Studio has delivered architectural visualization for architects, design firms, and developments across Dubai, the UAE, and internationally." },
      { q: "Can Elipse Studio work directly from Revit, Rhino, or SketchUp files?", a: "Yes. Elipse Studio's architectural visualization pipeline works with all major architectural design formats including Rhino, Revit, SketchUp, AutoCAD, and ArchiCAD. Our team handles file translation and geometry cleanup so architects deliver source files in their native workflow without additional export overhead." },
      { q: "Do you deliver architectural competition visualization packages?", a: "Yes. Elipse Studio has substantial experience delivering competition-quality architectural visualization — cinematic-quality renderings, atmospheric imagery, contextual site views, and presentation panels designed specifically to win competitions. We understand what juries respond to and craft visualization packages accordingly." },
      { q: "Can you deliver VR architectural walkthroughs from our design files?", a: "Yes. Elipse Studio delivers immersive VR architectural walkthroughs that let clients experience your design at true scale through VR headsets. Our VR walkthrough platform supports Meta Quest 3, HTC Vive, and premium Varjo XR-4 hardware. VR walkthroughs are particularly powerful for large or complex designs where 2D imagery cannot convey spatial experience." },
      { q: "How long does an architectural visualization project take?", a: "Concept renderings typically deliver in 2-3 weeks. Full presentation packages (renderings + animation + walkthrough) span 6-10 weeks. Competition packages typically require 4-8 weeks depending on complexity. VR experiences require 8-12 weeks. Elipse Studio provides specific timelines with every proposal." },
      { q: "How do I start an architectural visualization project?", a: "Contact Elipse Studio through our website with a brief project description — design phase, deliverable requirements, timeline, and any specific presentation objectives. A senior team member will respond within one business day with a scoped approach for your architectural visualization needs." }
    ],
    finalCta: {
      headline: "Elevate Your Design Communication with Photoreal Architectural Visualization",
      text: "Tell Elipse Studio about your architectural project. Our senior team will respond within one business day with a scoped approach for competition visualization, client presentations, VR walkthroughs, or complete design communication packages.",
      buttonText: "Discuss Your Architecture Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "interior-design",
    title: "Interior Design",
    shortDesc: "Photoreal interior visualization for hospitality.",
    category: "Interior Design",
    icon: "LuSofa",
    meta: {
      seoTitle: "Interior Design Visualization & Virtual Showroom | Elipse Studio",
      metaDescription: "Elipse Studio provides interior design visualization, virtual showroom experiences, furniture visualization, and material selection tools for interior designers worldwide.",
      keywords: "interior design visualization, virtual showroom, interior rendering, furniture visualization, material selection tools, kitchen configurator, wardrobe configurator, space planning visualization",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Interior Design Solutions by Elipse Studio",
    },
    hero: {
      headline: "Win Interior Design Clients Faster with Photoreal Visualization",
      subheadline: "Elipse Studio delivers photorealistic interior renderings, interactive material selection tools, virtual showroom experiences, and custom kitchen/wardrobe configurators for interior designers worldwide.",
      ctaText: "Discuss Your Interior Design Project",
      ctaLink: "/contact",
      image: interiorImg
    },
    tlDr: "Elipse Studio delivers photorealistic interior design visualization and virtual showroom experiences for interior designers, hospitality design studios, and residential designers in Dubai, the UAE, and worldwide. Our interior design solutions include client approval presentations, interactive material selection tools, furniture visualization, virtual showroom experiences, space planning visualization, and kitchen and wardrobe configuration tools that dramatically reduce revisions and win more clients.",
    intro: [
      "Interior design is fundamentally visual — but traditional presentation methods (mood boards, sample tiles, fabric swatches, sketch overlays) struggle to convey how spaces actually feel when everything comes together. Clients hesitate to commit to expensive design decisions when they cannot see the complete result. Interior designers waste hours in revision cycles because clients cannot visualize what has been proposed.",
      "Elipse Studio solves this fundamental challenge with photorealistic interior design visualization that shows clients exactly what their finished space will look like — before any furniture is ordered, tile is installed, or wall is painted. Founded in 2014 and serving interior designers worldwide, our team combines photorealistic craft with practical understanding of how designers work with clients."
    ],
    solutions: [
      "Client Approval Presentations — Photorealistic renderings that get client sign-off faster and reduce revision cycles.",
      "Interactive Material Selection — Real-time tools that let clients see material choices applied to their actual space instantly.",
      "Furniture Visualization — Photoreal furniture placement in designed spaces before any purchases are committed.",
      "Interior Design Reviews — Interactive 3D design reviews that let clients explore and provide focused feedback.",
      "Virtual Showroom Experiences — Immersive virtual showroom platforms for luxury interior brands and designer collections.",
      "Space Planning Visualization — Photorealistic space planning that helps clients understand spatial flow, sight lines, and functional layout.",
      "Kitchen & Wardrobe Configuration Tools — Interactive configurators for custom kitchen and wardrobe design with real-time material and finish selection."
    ],
    whyUs: [
      "Interior designers worldwide select Elipse Studio for interior design visualization because our craft focus matches the discipline's demands. Interior design succeeds or fails on material accuracy, lighting quality, and spatial atmosphere — exactly the areas where amateur 3D visualization fails hardest. Our photorealistic material library, physically-accurate lighting workflows, and interior-specific craft ensure visualizations that read as genuinely designed spaces rather than obviously digital renderings.",
      "Elipse Studio's combined capability across renderings, virtual showroom platforms, configurators, and VR experiences means one partner delivers every visualization need across a designer's complete client engagement — from initial concept through final approval through post-installation marketing."
    ],
    midCta: {
      headline: "See Photoreal Interior Design Visualization in Action",
      text: "Explore our interior visualization portfolio featuring residential, hospitality, and commercial interior projects delivered for designers worldwide.",
      buttonText: "View Interior Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Interior design visualization supports specific moments in the designer-client relationship. Initial concept presentations require photorealistic renderings that build client excitement. Material selection sessions benefit from interactive tools that let clients experience choices before committing. Furniture placement decisions benefit from photoreal previews that prevent expensive mistakes. Kitchen and wardrobe custom design require configurators that show clients exactly what they are commissioning. Elipse Studio supports interior designers across residential (villas, apartments, luxury homes), hospitality (hotels, resorts, restaurants), commercial (offices, retail, corporate spaces), and specialty (yachts, aviation interiors, luxury retail) contexts.",
    technology: "Elipse Studio's interior design visualization pipeline uses industry-leading tools for photorealistic interior work — V-Ray and Corona for photorealistic rendering, Unreal Engine 5 for interactive real-time interior experiences, and specialized configurator engines for real-time material selection tools. Our scanned material library includes thousands of real-world textures, finishes, fabrics, and surfaces that render with genuine physical accuracy. Our approach starts with understanding each designer's presentation workflow, client type, and specific project goals. We work from CAD, Revit, SketchUp, and even hand-drawn concept sketches — meeting designers in their existing workflow rather than forcing new processes.",
    faqs: [
      { q: "What is interior design visualization and how does it help designers win clients?", a: "Interior design visualization is the photorealistic 3D representation of designed interior spaces before they are built or renovated. It helps designers win clients by showing exactly what the finished space will look like, dramatically reducing client hesitation and revision cycles. Elipse Studio has delivered interior visualization for premium designers and hospitality projects worldwide." },
      { q: "Do you provide interactive material selection tools?", a: "Yes. Elipse Studio builds interactive material selection tools that let clients see finishes, fabrics, tiles, wood tones, and paint colors applied to their actual designed space in real time. This dramatically improves selection confidence and reduces expensive material change requests during construction." },
      { q: "Can you build custom kitchen or wardrobe configurators?", a: "Yes. Elipse Studio specializes in custom kitchen and wardrobe configuration tools for interior designers, luxury home builders, and hospitality specifiers. Our configurators show real-time updates as clients select cabinet materials, hardware, layout options, and finish combinations." },
      { q: "How do virtual showroom experiences work for interior brands?", a: "Virtual showroom experiences let luxury interior brands present collections to clients globally without requiring physical showroom visits. Elipse Studio builds immersive virtual showrooms accessible via web browser or VR headset, allowing brands to reach international clients and buyers who cannot visit flagship locations." },
      { q: "How long does an interior design visualization project take?", a: "A single room photoreal rendering typically delivers in 2-3 weeks. Full residential visualization (multiple rooms) spans 4-8 weeks. Interactive configurators require 12-16 weeks. Virtual showroom experiences typically require 16-20 weeks. Elipse Studio provides realistic timelines with every proposal." },
      { q: "How do I start an interior design visualization project?", a: "Contact Elipse Studio with a brief description of your project — design type, deliverable requirements, timeline, and any specific presentation objectives. A senior team member will respond within one business day with a scoped approach for your interior design visualization needs." }
    ],
    finalCta: {
      headline: "Win More Interior Design Clients with Photoreal Visualization",
      text: "Tell Elipse Studio about your interior design project. Our team will respond within one business day with a scoped approach for client presentations, material selection tools, or virtual showroom experiences.",
      buttonText: "Discuss Your Interior Design Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "manufacturing",
    title: "Manufacturing",
    shortDesc: "Hero shots, exploded views, assembly animations.",
    category: "Industrial",
    icon: "LuFactory",
    meta: {
      seoTitle: "Manufacturing Visualization, Digital Twins & Product Demos | Elipse Studio",
      metaDescription: "Elipse Studio delivers manufacturing visualization, factory digital twins, product demonstration solutions & technical sales tools for manufacturers worldwide.",
      keywords: "manufacturing visualization, factory digital twin, product demonstration, technical sales tools, product customization platform, equipment visualization, employee training systems, dealer sales support",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Manufacturing Solutions by Elipse Studio",
    },
    hero: {
      headline: "Manufacturing Visualization, Digital Twins & Product Demos That Close Bigger Deals",
      subheadline: "Elipse Studio delivers interactive product demonstrations, factory digital twins, VR employee training, and technical sales tools for manufacturers, OEMs, and B2B product companies worldwide.",
      ctaText: "Get Your Manufacturing Visualization Quote",
      ctaLink: "/contact",
      image: manufacturingImg
    },
    tlDr: "Elipse Studio delivers advanced manufacturing visualization, factory digital twins, and product demonstration solutions for industrial manufacturers, OEMs, and B2B product companies worldwide. Our manufacturing solutions include product demonstration tools, technical sales enablement, product customization platforms, factory digital twins, employee training systems, equipment visualization, product launch experiences, maintenance training, assembly instruction visualization, and dealer sales support tools.",
    intro: [
      "Modern manufacturing sales cycles are complex. Buyers evaluate technical products with sophisticated specifications, custom configurations, and demanding operational contexts. Sales teams cannot always bring physical products to customer sites. Training new operators on complex equipment traditionally required expensive on-site sessions. Product launches struggle to convey technical differentiation through flat brochures alone.",
      "Elipse Studio solves these manufacturing communication challenges through advanced manufacturing visualization and immersive experience platforms. Our team serves industrial manufacturers, OEMs, and B2B product companies in Dubai, the UAE, the United States, the United Kingdom, and internationally — helping manufacturers close larger deals, train operators safely, and launch products more effectively."
    ],
    solutions: [
      "Product Demonstration Solutions — Interactive 3D product demos that sales teams present anywhere without shipping physical units.",
      "Technical Sales Tools — Configurator-based sales tools that guide technical buyers through complex product specifications.",
      "Product Customization Platforms — Real-time 3D configurators for made-to-order manufactured products.",
      "Factory Digital Twins — Photorealistic 1:1 digital replicas of manufacturing facilities for operations and training.",
      "Employee Training Systems — VR-based training platforms for equipment operation, safety, and procedural training.",
      "Equipment Visualization — Detailed 3D equipment visualization for marketing, sales, and technical documentation.",
      "Product Launch Experiences — Cinematic launch campaigns for new manufactured products.",
      "Maintenance Training Solutions — Step-by-step maintenance training through immersive 3D and AR experiences.",
      "Assembly Instruction Visualization — Interactive 3D assembly guides replacing static instruction manuals.",
      "Dealer Sales Support Tools — Configurator and demonstration platforms for dealer networks and channel partners."
    ],
    whyUs: [
      "Industrial manufacturers select Elipse Studio for manufacturing visualization because our team combines photorealistic craft with genuine understanding of technical products. Manufacturing visualization must accurately represent product specifications, mechanical function, material properties, and operational context — details that generic 3D studios routinely miss. Our engineering-aware approach ensures visualizations that manufacturers can confidently use with technical buyers.",
      "Elipse Studio's integrated capability across renderings, animations, VR training platforms, AR maintenance guides, and web-based configurators means one visualization partner supports the entire manufacturing customer journey — from initial marketing awareness through technical evaluation through purchase through training and long-term maintenance."
    ],
    midCta: {
      headline: "See Manufacturing Visualization in Action",
      text: "Explore our manufacturing portfolio featuring product demonstrations, factory digital twins, technical configurators, and VR training platforms delivered worldwide.",
      buttonText: "View Manufacturing Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Manufacturing visualization serves specific commercial scenarios that manufacturers face daily. Sales teams need portable interactive product demonstrations for customer meetings. Technical buyers require detailed configuration tools that navigate complex specifications. Marketing teams need cinematic product launch content. Training departments need scalable operator training that does not require physical equipment access. Service teams need AR-based maintenance guides that reduce equipment downtime. Elipse Studio supports manufacturers across heavy machinery, industrial equipment, medical devices, aerospace components, automotive parts, consumer durables, and specialty manufacturing verticals.",
    technology: "Elipse Studio's manufacturing visualization pipeline handles complex technical geometry, mechanical animation, and precise material representation. We work with STEP, IGES, SolidWorks, Inventor, and Creo files directly — no geometry re-modeling required from CAD source data. Our Unreal Engine 5 real-time platform delivers factory digital twins with photorealistic quality suitable for both training and executive presentations. Our approach starts with understanding each manufacturer's specific commercial goals — the sales cycle we support, the training population, the technical differentiation, and the customer segments. Only after this strategic clarity do we deploy the right visualization mix.",
    faqs: [
      { q: "What is manufacturing visualization and how does it help manufacturers?", a: "Manufacturing visualization is the creation of photorealistic 3D representations of products, equipment, and facilities for sales, marketing, training, and operations. It helps manufacturers close larger deals through interactive product demonstrations, train operators safely without equipment access, launch products more effectively, and support dealers with sales enablement tools. Elipse Studio serves manufacturers worldwide." },
      { q: "Can you work directly from our CAD files?", a: "Yes. Elipse Studio's manufacturing visualization pipeline works directly with STEP, IGES, SolidWorks, Inventor, Creo, and other engineering formats. Our team handles CAD-to-visualization conversion without requiring you to re-model or export in unfamiliar formats." },
      { q: "What is a factory digital twin and how is it different from a rendering?", a: "A factory digital twin is a photorealistic real-time 3D replica of a manufacturing facility that supports interactive exploration, operational training, and executive presentation. Unlike static renderings, digital twins let users navigate the facility, interact with equipment, and experience operational scenarios in real time. Elipse Studio builds factory digital twins for both training and marketing purposes." },
      { q: "Can VR training replace physical equipment training?", a: "VR training augments rather than replaces physical training in most manufacturing contexts. However, VR delivers powerful capabilities for high-consequence scenarios (safety, emergency response), scale training across multiple sites, and reduce physical equipment usage for training purposes. Elipse Studio's VR training platforms integrate with existing training curricula." },
      { q: "How do product configurators help technical sales?", a: "Product configurators let buyers explore product options in real time — different components, specifications, materials, and configurations — while seeing photorealistic previews. This dramatically accelerates technical sales cycles, reduces specification errors, and lifts average deal values through better upgrade adoption. Elipse Studio builds configurators integrated with your CRM and quoting systems." },
      { q: "How do I start a manufacturing visualization project?", a: "Contact Elipse Studio with a brief project description — product type, target audience, deliverable requirements, and commercial objectives. A senior team member will respond within one business day with a scoped approach for your manufacturing visualization needs." }
    ],
    finalCta: {
      headline: "Transform Manufacturing Sales, Training, and Operations",
      text: "Tell Elipse Studio about your manufacturing visualization needs. Our team will respond within one business day with a scoped approach for product demonstrations, technical sales tools, digital twins, or training platforms.",
      buttonText: "Discuss Your Manufacturing Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "ecommerce",
    title: "E-Commerce",
    shortDesc: "3D configurators, AR shopping & virtual showrooms.",
    category: "Advertising",
    icon: "HiOutlineShoppingCart",
    meta: {
      seoTitle: "E-Commerce 3D Configurators & AR Shopping Experiences | Elipse Studio",
      metaDescription: "Elipse Studio delivers 3D product configurators, AR shopping experiences, and virtual product showrooms for e-commerce brands worldwide.",
      keywords: "ecommerce 3d configurator, AR shopping, online product customization, product personalization, virtual product showroom, conversion optimization, interactive shopping experience",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "E-Commerce Solutions by Elipse Studio",
    },
    hero: {
      headline: "E-Commerce 3D Configurators & AR Shopping That Actually Convert",
      subheadline: "Elipse Studio builds custom 3D product configurators, AR try-on and placement experiences, and virtual product showrooms for online brands worldwide — driving higher conversion, larger orders, and lower return rates.",
      ctaText: "Discuss Your E-Commerce Project",
      ctaLink: "/contact",
      image: ecommerceImg
    },
    tlDr: "Elipse Studio builds custom ecommerce 3D configurators, AR shopping experiences, and virtual product showrooms for online brands worldwide. Our e-commerce solutions include online product customization tools, interactive shopping experiences, product personalization systems, conversion optimization experiences, 3D product visualization, AR try-on and placement, virtual product showrooms, customer engagement platforms, and product comparison tools — driving higher conversion rates, larger average order values, and dramatically reduced return rates.",
    intro: [
      "E-commerce competitive dynamics have shifted decisively. Static product photography and dropdown variant selectors — the standard e-commerce product page for two decades — no longer convert the way they used to. Modern shoppers expect to actively design, customize, and visualize products in real time before committing to purchase. Brands still relying on flat photography lose measurable conversions daily to competitors offering interactive experiences.",
      "Elipse Studio builds the interactive commerce experiences that modern e-commerce brands need to compete. Our team delivers custom ecommerce 3D configurators, AR shopping experiences, virtual showrooms, and product personalization platforms for online brands across the United States, United Kingdom, Dubai, and internationally. From Shopify integrations to enterprise commerce platforms, we build experiences that convert."
    ],
    solutions: [
      "Online Product Customization — Real-time 3D configurators letting customers design custom products with photoreal previews.",
      "Interactive Shopping Experiences — Immersive product experiences that engage shoppers dramatically beyond static photography.",
      "Product Personalization Systems — Personalization platforms enabling monogramming, engraving, and custom color options.",
      "Conversion Optimization Experiences — Interactive experiences designed specifically to lift ecommerce conversion rates.",
      "Product Visualization Tools — Photorealistic 3D product visualization for premium ecommerce product pages.",
      "AR Shopping Experiences — Camera-based augmented reality for product try-on and placement in customer environments.",
      "Virtual Product Showrooms — Immersive branded showroom experiences accessible via web browser.",
      "Customer Engagement Platforms — Interactive experiences that keep shoppers engaged and reduce cart abandonment.",
      "Product Comparison Experiences — Side-by-side interactive comparison tools for complex product decisions."
    ],
    whyUs: [
      "Online brands select Elipse Studio for e-commerce interactive experiences because our platforms deliver measurable commercial results, not just impressive technology. Every ecommerce 3D configurator we build is engineered specifically for conversion — mobile-optimized, integration-ready with Shopify, WooCommerce, and Magento, and designed for actual e-commerce workflows including inventory, pricing, and order management.",
      "Elipse Studio's combined 3D expertise across configurators, AR, VR, and traditional visualization means brands work with one partner across their complete interactive commerce journey — from product page interactive experiences through immersive campaigns through social media assets."
    ],
    midCta: {
      headline: "See E-Commerce 3D Configurators & AR Shopping That Convert",
      text: "Explore our e-commerce portfolio featuring configurators, AR shopping experiences, and virtual showrooms delivered for online brands worldwide.",
      buttonText: "View E-Commerce Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Ecommerce 3D configurator and AR shopping deployments serve specific commercial scenarios. Custom-order brands (furniture, jewelry, watches, apparel) need configurators that convert customization interest into committed orders. Home goods brands need AR placement experiences that let shoppers visualize products in their actual rooms. Fashion brands need AR try-on for eyewear, cosmetics, and accessories. Luxury brands need immersive virtual showroom experiences for premium positioning. Elipse Studio has delivered interactive commerce experiences for brands across furniture, fashion, footwear, watches, jewelry, home goods, automotive accessories, and specialty categories.",
    technology: "Elipse Studio's ecommerce 3D configurator platform uses WebGL through Three.js and Babylon.js for maximum browser reach, or Unreal Engine 5 for premium photoreal fidelity. AR shopping experiences run through native ARKit and ARCore for premium mobile experiences, or WebXR for frictionless no-app-required deployment. Every solution integrates with commerce platforms including Shopify (including Shopify Plus), WooCommerce, Magento, BigCommerce, and custom commerce backends. Our approach starts with your specific e-commerce objectives — conversion rate targets, average order value goals, return rate reduction, or international expansion. Only after these commercial priorities are clear do we recommend the right technology mix.",
    faqs: [
      { q: "What is an ecommerce 3D configurator and how does it increase sales?", a: "An ecommerce 3D configurator is an interactive online tool that lets customers customize products in real time using photorealistic 3D — choosing colors, materials, dimensions, and personalization options. It increases sales through higher conversion rates, lifted average order values from premium upgrade adoption, and dramatically reduced return rates. Elipse Studio builds custom configurators for e-commerce brands worldwide." },
      { q: "Can you integrate with Shopify, WooCommerce, or Magento?", a: "Yes. Elipse Studio's ecommerce 3D configurator and AR shopping platforms integrate cleanly with Shopify (including Shopify Plus), WooCommerce, Magento, BigCommerce, and custom commerce backends. Configured orders flow directly into standard checkout, payment, fulfillment, and customer service workflows." },
      { q: "How does AR shopping work — do customers need to download an app?", a: "Elipse Studio delivers both native app AR experiences (highest quality) and WebAR experiences (no app required, works in any modern mobile browser). WebAR is particularly powerful for marketing campaigns and reducing friction on product pages. We recommend the right approach based on your commercial goals." },
      { q: "Which product categories benefit most from 3D configurators?", a: "Custom-order products benefit most — furniture, jewelry, watches, footwear, apparel, automotive accessories, home goods, and specialty products. Any product category with meaningful customization or where 3D visualization improves purchase confidence sees strong commercial returns from ecommerce 3D configurator deployment." },
      { q: "How long does 3D configurator development take?", a: "A focused configurator for a single product line typically deploys in 8-14 weeks. Premium configurators with Unreal Engine 5 rendering and multiple product variants extend to 14-20 weeks. Multi-product configurator platforms span 6+ months. Elipse Studio provides specific timelines with every proposal." },
      { q: "How do I start an e-commerce interactive project?", a: "Contact Elipse Studio with a brief description of your brand, product category, target audience, current commerce platform, and commercial objectives. A senior team member will respond within one business day with a scoped approach for your e-commerce interactive experiences." }
    ],
    finalCta: {
      headline: "Drive E-Commerce Growth with Interactive 3D Experiences",
      text: "Tell Elipse Studio about your e-commerce brand. Our team will respond within one business day with a scoped approach for 3D configurators, AR shopping experiences, or virtual product showrooms.",
      buttonText: "Discuss Your E-Commerce Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "automotive",
    title: "Automotive",
    shortDesc: "Vehicle configurators, digital showrooms & VR test drives.",
    category: "Advertising",
    icon: "HiOutlineTruck",
    meta: {
      seoTitle: "Automotive 3D Configurators & Digital Showroom Experiences | Elipse Studio",
      metaDescription: "Elipse Studio delivers automotive 3D configurators, digital showroom experiences, dealer sales enablement, and virtual test drive solutions worldwide.",
      keywords: "automotive 3d configurator, vehicle configurator, digital showroom automotive, dealer sales enablement, virtual test drive, EV product education, automotive training platform",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Automotive Solutions by Elipse Studio",
    },
    hero: {
      headline: "Automotive 3D Configurators, Digital Showrooms & Dealer Enablement Solutions",
      subheadline: "Elipse Studio builds photoreal vehicle configurators, immersive digital showrooms, virtual test drive experiences, and dealer sales enablement tools for automotive OEMs and dealer networks worldwide.",
      ctaText: "Discuss Your Automotive Project",
      ctaLink: "/contact",
      image: automotiveImg
    },
    tlDr: "Elipse Studio delivers advanced automotive 3D configurators, digital showroom experiences, and dealer sales enablement platforms for automotive OEMs, dealer networks, and mobility brands worldwide. Our automotive solutions include vehicle configuration platforms, digital showroom experiences, dealer sales enablement tools, vehicle personalization systems, EV product education experiences, vehicle launch campaigns, interactive brochures, virtual test drive experiences, and automotive training platforms.",
    intro: [
      "Automotive retail is being reshaped by digital-first buyer behavior. Modern car buyers research, configure, and even reserve vehicles online before ever visiting a dealership. Automotive OEMs and dealers who deliver photorealistic automotive 3D configurators and immersive digital showroom experiences consistently outperform competitors relying on traditional retail alone. The shift accelerates as electric vehicles introduce entirely new product education requirements.",
      "Elipse Studio partners with automotive OEMs and dealer networks worldwide to build the digital experiences modern automotive retail requires. Our team combines photorealistic automotive 3D configurator craft with genuine understanding of automotive sales dynamics, delivering solutions that actually sell vehicles rather than just look impressive."
    ],
    solutions: [
      "Vehicle Configuration Platforms — Photorealistic real-time configurators for exterior colors, interior trims, wheels, packages, and options.",
      "Digital Showroom Experiences — Immersive digital showrooms for online browsing and dealer installation.",
      "Dealer Sales Enablement Tools — Configurator and demonstration platforms for dealer sales staff.",
      "Vehicle Personalization Systems — Advanced personalization for premium and luxury vehicle segments.",
      "EV Product Education Experiences — Interactive experiences that explain EV technology, charging, and range confidence.",
      "Vehicle Launch Campaigns — Cinematic launch content for new model introductions.",
      "Interactive Brochures — Digital-first product literature replacing static printed brochures.",
      "Virtual Test Drive Experiences — Immersive VR test drive experiences for new model introductions.",
      "Automotive Training Platforms — Technical training platforms for dealer staff and service technicians."
    ],
    whyUs: [
      "Automotive OEMs and dealer networks select Elipse Studio for automotive 3D configurator and digital showroom projects because our team combines automotive-grade photorealistic craft with practical commercial understanding. Automotive visualization must accurately represent paint finishes, interior materials, mechanical detail, and lighting behavior across day and night contexts. Our specialized automotive material library and physically-based rendering workflows deliver quality that meets premium automotive brand standards.",
      "Elipse Studio's integrated capability across configurators, VR test drives, AR marketing experiences, cinematic launch content, and dealer enablement tools means one visualization partner supports the complete automotive customer journey."
    ],
    midCta: {
      headline: "See Automotive 3D Configurators and VR Test Drives",
      text: "Explore our automotive portfolio featuring vehicle configurators, digital showrooms, VR test drives, and dealer enablement tools delivered for OEMs worldwide.",
      buttonText: "View Automotive Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Automotive 3D configurator deployment serves specific automotive commercial scenarios. New model launches need cinematic content, configurator tools, and virtual test drive experiences deployed simultaneously. Dealer networks need consistent digital sales tools deployed across all locations. EV brands need product education experiences that build charging and range confidence. Premium and luxury brands need personalization platforms supporting made-to-order commissioning. Elipse Studio supports automotive OEMs across passenger vehicles, luxury automotive, electric vehicles, commercial vehicles, motorcycles, and specialty automotive segments.",
    technology: "Elipse Studio's automotive 3D configurator pipeline uses Unreal Engine 5 for premium photorealistic real-time rendering, WebGL platforms for maximum web reach, and specialized automotive material libraries covering hundreds of paint finishes, interior surfaces, and wheel designs. VR test drive experiences run on Meta Quest 3, HTC Vive, and PICO 4 Enterprise platforms. Our approach starts with the specific automotive commercial objective — new model launch, EV market entry, dealer network standardization, or premium personalization. Only after strategic clarity do we deploy the right technology mix.",
    faqs: [
      { q: "What is an automotive 3D configurator and how does it work?", a: "An automotive 3D configurator is an interactive online tool that lets buyers customize a vehicle in real time — selecting exterior color, wheels, interior trim, packages, and options — while seeing photorealistic previews of every choice. Elipse Studio builds custom automotive configurators for OEMs and dealer networks worldwide." },
      { q: "Can you build configurators from our CAD data?", a: "Yes. Elipse Studio works directly with automotive CAD data — Catia, Alias, and other automotive engineering formats. Our team handles the conversion from engineering-grade CAD to real-time optimized visualization geometry without requiring separate modeling." },
      { q: "How do virtual test drive experiences work?", a: "Virtual test drive experiences use VR headsets to place potential buyers in realistic driving scenarios — city, highway, off-road contexts depending on the vehicle segment. Elipse Studio builds VR test drive experiences for launch events, dealer showrooms, and mobile activation programs." },
      { q: "How do configurators support EV product education?", a: "EV configurators can integrate product education layers — explaining charging times at different power levels, range under different driving conditions, and comparative operating benefits. Elipse Studio builds EV configurators specifically designed to build buyer confidence in electric vehicle transitions." },
      { q: "Can dealer networks use the same configurator across all locations?", a: "Yes. Elipse Studio's automotive 3D configurator platforms are designed for consistent multi-location deployment across dealer networks — supporting touch-screen kiosks, iPads for sales staff, and consumer-facing web deployment. Central content management ensures every dealer shows the same vehicles." },
      { q: "How do I start an automotive project?", a: "Contact Elipse Studio with a brief description of your automotive project — brand, vehicle segment, deliverable requirements, and commercial objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Transform Automotive Retail with Digital-First Experiences",
      text: "Tell Elipse Studio about your automotive brand. Our team will respond within one business day with a scoped approach for configurators, digital showrooms, VR test drives, or dealer enablement.",
      buttonText: "Discuss Your Automotive Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "furniture",
    title: "Furniture",
    shortDesc: "Configurators, AR placement & virtual showrooms.",
    category: "Advertising",
    icon: "HiOutlineHomeModern",
    meta: {
      seoTitle: "Furniture 3D Configurators & AR Placement Experiences | Elipse Studio",
      metaDescription: "Elipse Studio delivers furniture configurators, AR placement experiences, virtual showrooms, and custom furniture ordering systems for furniture brands worldwide.",
      keywords: "furniture configurator, AR furniture placement, virtual furniture showroom, custom furniture ordering, furniture visualization, material selection, retail sales tools",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Furniture Solutions by Elipse Studio",
    },
    hero: {
      headline: "Furniture Configurators & AR Placement That Cut Returns and Lift Conversion",
      subheadline: "Elipse Studio builds custom furniture 3D configurators, AR room placement experiences, and virtual showroom platforms for furniture manufacturers and retailers worldwide.",
      ctaText: "Discuss Your Furniture Project",
      ctaLink: "/contact",
      image: furnitureImg
    },
    tlDr: "Elipse Studio delivers custom furniture configurators, AR placement experiences, virtual furniture showrooms, and custom furniture ordering systems for furniture manufacturers, retailers, and custom furniture brands worldwide. Our furniture solutions include configuration platforms, material selection experiences, online furniture visualization, AR placement in customer environments, virtual showrooms, retail sales tools, and custom ordering systems that dramatically reduce return rates.",
    intro: [
      "Furniture is one of e-commerce's toughest categories. Buyers commit to expensive furniture without seeing it in their actual room. Return rates for furniture regularly exceed 25% — devastating for margins. Custom furniture brands struggle to convey exactly what customers are commissioning, leading to expensive change orders and buyer dissatisfaction. Traditional furniture photography cannot capture material texture, upholstery drape, or how a piece looks in real interior contexts.",
      "Elipse Studio solves these furniture-specific commerce challenges through custom furniture configurators, AR placement experiences, and virtual showroom platforms. Our team serves furniture manufacturers, retailers, and custom furniture brands in the United States, United Kingdom, Dubai, and internationally — helping brands lift conversion rates, reduce returns, and expand geographic reach beyond physical showroom limitations."
    ],
    solutions: [
      "Furniture Configuration Platforms — Real-time configurators for custom furniture with instant material and finish preview.",
      "Material Selection Experiences — Interactive tools letting customers experience fabric, leather, wood, and finish options in context.",
      "Online Furniture Visualization — Photorealistic 3D product visualization for e-commerce product pages.",
      "AR Placement Experiences — Camera-based AR that shows furniture in the customer's actual room via smartphone.",
      "Virtual Furniture Showrooms — Immersive branded showroom experiences accessible from any device.",
      "Retail Sales Tools — In-store configurator tools for showroom sales staff supporting made-to-order commissioning.",
      "Custom Furniture Ordering Systems — End-to-end custom order platforms integrating configurator, quoting, and production workflow."
    ],
    whyUs: [
      "Furniture brands select Elipse Studio for interactive commerce experiences because furniture visualization is uniquely demanding. Fabric drape, leather grain, wood tone accuracy, upholstery softness, and how pieces interact with room lighting all require specialized craft that generic 3D studios miss. Our furniture-specific material library and specialized rendering workflows deliver visualizations that match physical products with genuine precision.",
      "Elipse Studio's combined capability across configurators, AR placement, virtual showrooms, and traditional product photography replacement means one visualization partner serves the complete furniture commerce journey — from product page interaction through purchase through post-purchase satisfaction."
    ],
    midCta: {
      headline: "See Furniture Configurators and AR Placement Experiences",
      text: "Explore our furniture portfolio featuring configurators, AR placement, and virtual showrooms delivered for furniture brands worldwide.",
      buttonText: "View Furniture Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Furniture configurator and AR placement deployment serves specific furniture commerce scenarios. Made-to-order furniture brands need configurators that let buyers customize sofas, tables, and casegoods before purchase. Mass-market furniture retailers need AR placement that lets shoppers visualize pieces in their actual rooms before ordering. Luxury furniture brands need immersive virtual showroom experiences that reach international collectors and interior designers globally. Elipse Studio supports furniture brands across seating (sofas, chairs, dining), casegoods (tables, cabinets, storage), bedroom (beds, wardrobes), outdoor, and specialty (kids, office, hospitality) segments.",
    technology: "Elipse Studio's furniture configurator platforms use Unreal Engine 5 for premium photoreal rendering or WebGL for maximum browser reach. AR placement runs through native ARKit and ARCore for premium mobile quality, or WebAR for frictionless no-app deployment. Every solution integrates with Shopify, WooCommerce, Magento, and custom furniture commerce platforms. Our approach starts with your specific furniture commercial goals — reducing return rates, lifting average order values, expanding international sales, or launching custom-order product lines. Only after strategic clarity do we recommend the right technology mix.",
    faqs: [
      { q: "How does a furniture configurator reduce return rates?", a: "Furniture return rates traditionally exceed 25% because customers cannot accurately visualize how pieces will look at home. A photorealistic furniture configurator shows exactly what customers are committing to — material, color, dimensions, and configuration. AR placement additionally shows the piece in the customer's actual room before purchase. Elipse Studio configurators dramatically reduce this expectation gap." },
      { q: "Does AR furniture placement require customers to download an app?", a: "Not necessarily. Elipse Studio delivers both native app AR experiences (highest quality) and WebAR experiences (no app required, works in any modern mobile browser). WebAR is particularly powerful for reducing friction on product pages and marketing campaigns." },
      { q: "Can you build configurators for custom-order furniture?", a: "Yes. Elipse Studio specializes in furniture configurator platforms for custom-order manufacturers — sofas with fabric selection, tables with wood and finish options, wardrobes with layout customization, and specialty pieces. Our configurators integrate with production workflows so orders flow directly into manufacturing systems." },
      { q: "Which furniture categories benefit most from configurators?", a: "Custom upholstery (sofas, chairs, ottomans) sees the strongest configurator returns. Casegoods with material and finish options benefit substantially. Modular systems (sectionals, storage systems) require configurators to communicate customization possibilities. Any furniture with meaningful customization or where 3D visualization improves buyer confidence benefits." },
      { q: "How long does furniture configurator development take?", a: "A focused configurator for a single furniture line typically deploys in 8-14 weeks. Multi-collection configurator platforms extend to 14-20 weeks. Enterprise custom furniture ordering systems span 6+ months. Elipse Studio provides specific timelines with every proposal." },
      { q: "How do I start a furniture visualization project?", a: "Contact Elipse Studio with a brief description of your furniture brand, product category, and commercial objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Cut Furniture Returns and Lift Conversion with 3D + AR",
      text: "Tell Elipse Studio about your furniture brand. Our team will respond within one business day with a scoped approach for configurators, AR placement, or virtual showroom experiences.",
      buttonText: "Discuss Your Furniture Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "healthcare",
    title: "Healthcare",
    shortDesc: "Medical device viz, surgical sim & patient education.",
    category: "Healthcare",
    icon: "HiOutlineHeart",
    meta: {
      seoTitle: "Medical Device Visualization & Surgical Training Simulations | Elipse Studio",
      metaDescription: "Elipse Studio delivers medical device visualization, surgical training simulations, medical education platforms, and patient education experiences worldwide.",
      keywords: "medical device visualization, surgical training simulation, medical education platform, patient education, interactive anatomy learning, healthcare marketing visualization",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Healthcare Solutions by Elipse Studio",
    },
    hero: {
      headline: "Medical Device Visualization & Surgical Training Simulation Solutions",
      subheadline: "Elipse Studio delivers photoreal medical device visualization, VR surgical training simulations, medical education platforms, and patient education experiences for healthcare organizations worldwide.",
      ctaText: "Discuss Your Healthcare Project",
      ctaLink: "/contact",
      image: healthcareImg
    },
    tlDr: "Elipse Studio delivers specialized medical device visualization, surgical training simulations, and medical education platforms for medical device manufacturers, hospitals, and medical education institutions worldwide. Our healthcare solutions include medical device demonstrations, surgical training simulations, medical education platforms, healthcare marketing visualizations, patient education experiences, interactive anatomy learning, and medical product launch solutions.",
    intro: [
      "Healthcare communication demands exceptional precision. Medical device manufacturers must accurately convey complex technology to clinical buyers. Surgeons need safe training environments before operating on real patients. Medical students need three-dimensional anatomy education that flat textbook illustrations cannot deliver. Patients need clear explanations of procedures and technology that clinical language often obscures.",
      "Elipse Studio serves healthcare organizations worldwide with specialized medical device visualization, surgical training simulations, and medical education platforms. Our team combines photorealistic 3D craft with genuine attention to medical accuracy, delivering solutions that meet clinical, educational, and regulatory standards."
    ],
    solutions: [
      "Medical Device Demonstrations — Interactive 3D demonstrations of medical devices for sales, marketing, and clinical evaluation.",
      "Surgical Training Simulations — VR-based surgical simulation platforms for residency training and continuing medical education.",
      "Medical Education Platforms — Interactive learning platforms for medical schools, nursing programs, and allied health training.",
      "Healthcare Marketing Visualizations — Photorealistic visualization for medical device marketing and healthcare brand campaigns.",
      "Patient Education Experiences — Interactive experiences that help patients understand procedures, treatments, and medical technology.",
      "Interactive Anatomy Learning — 3D anatomy platforms replacing textbook illustration with explorable interactive experiences.",
      "Medical Product Launch Solutions — Comprehensive launch content for new medical device introductions."
    ],
    whyUs: [
      "Medical device manufacturers, hospitals, and medical education institutions select Elipse Studio for medical device visualization because our team understands that medical work demands exceptional accuracy. Anatomical detail must be correct. Device mechanics must reflect actual function. Clinical scenarios must be procedurally accurate. Our medical visualization work is developed in collaboration with clinical subject matter experts to ensure the accuracy that healthcare organizations require.",
      "Elipse Studio's integrated capability across device visualization, surgical simulation, medical education, and patient communication means one specialized visualization partner serves the complete healthcare communication journey."
    ],
    midCta: {
      headline: "See Medical Device Visualization and Surgical Training Simulations",
      text: "Explore our healthcare portfolio featuring medical device visualization, surgical simulations, medical education platforms, and patient communication tools.",
      buttonText: "View Healthcare Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Healthcare visualization serves specific medical scenarios. Medical device sales teams need interactive demonstrations for clinical buyers. Surgical training programs need scalable simulation platforms that develop competence before real patient exposure. Medical schools need interactive anatomy platforms as cadaver availability declines. Hospitals need patient education tools that improve informed consent. Medical device launches need comprehensive content for the clinical, purchasing, and regulatory audiences involved. Elipse Studio supports healthcare organizations across medical devices, pharmaceuticals, medical education, hospital systems, and specialty clinical areas.",
    technology: "Elipse Studio's healthcare visualization pipeline uses Unreal Engine 5 for photorealistic clinical accuracy, Unity for interactive medical education platforms, and specialized VR platforms including Meta Quest 3 and Varjo XR-4 for surgical training simulation. Every project integrates clinical subject matter expert review to ensure medical accuracy. Our approach starts with the specific healthcare communication objective — device sales enablement, surgical training, medical education, or patient communication. Only after strategic clarity do we recommend the right technology mix.",
    faqs: [
      { q: "Do you have clinical expertise for medical accuracy?", a: "Elipse Studio works with clinical subject matter experts throughout medical device visualization projects to ensure anatomical, procedural, and mechanical accuracy. Our team acknowledges the specialized nature of medical work and builds appropriate clinical validation into every project workflow." },
      { q: "Can VR surgical training replace cadaver training?", a: "VR surgical training augments rather than replaces traditional training. Surgical residents still need cadaver experience and supervised operations. However, VR delivers powerful capabilities for developing procedural competence, practicing rare scenarios, and providing objective performance measurement that traditional training cannot match. Elipse Studio's surgical simulation platforms integrate with existing training curricula." },
      { q: "What VR platforms do you use for surgical simulation?", a: "Elipse Studio's surgical simulation platforms support Meta Quest 3 and Quest Pro for cost-effective deployment, HTC Vive Focus for enterprise medical training programs, and Varjo XR-4 for premium simulation requiring photorealistic anatomical detail." },
      { q: "Do you work with medical device manufacturers on product launches?", a: "Yes. Elipse Studio delivers comprehensive medical device launch content — including medical device visualization, interactive demonstrations, clinical education materials, and patient communication assets. We understand the clinical, regulatory, and commercial complexities of medical device introductions." },
      { q: "Can patient education experiences improve informed consent?", a: "Yes. Interactive patient education experiences dramatically improve informed consent by helping patients genuinely understand procedures, treatments, and medical technology. Elipse Studio builds patient education platforms that work in clinical settings and via patient portals." },
      { q: "How do I start a healthcare project?", a: "Contact Elipse Studio with a brief description of your healthcare organization, project type, and clinical/commercial objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Elevate Medical Communication with Specialized Visualization",
      text: "Tell Elipse Studio about your healthcare project. Our team will respond within one business day with a scoped approach for device visualization, surgical training, medical education, or patient communication.",
      buttonText: "Discuss Your Healthcare Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "education-training",
    title: "Education & Training",
    shortDesc: "Immersive learning, VR training & virtual classrooms.",
    category: "Education & Training",
    icon: "HiOutlineBookOpen",
    meta: {
      seoTitle: "Immersive Learning Platforms & VR Training Systems | Elipse Studio",
      metaDescription: "Elipse Studio delivers immersive learning platforms, VR training systems, safety training solutions, and virtual classrooms for education institutions worldwide.",
      keywords: "immersive learning platform, VR training system, safety training simulation, virtual classroom, skills development platform, equipment training, interactive learning",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Education & Training Solutions by Elipse Studio",
    },
    hero: {
      headline: "Immersive Learning Platforms & VR Training Systems for Modern Education",
      subheadline: "Elipse Studio builds VR training simulations, immersive learning platforms, equipment training, safety training, and virtual classroom experiences for education institutions and training providers worldwide.",
      ctaText: "Discuss Your Education Project",
      ctaLink: "/contact",
      image: educationImg
    },
    tlDr: "Elipse Studio builds custom immersive learning platforms, VR training systems, equipment training simulations, and safety training solutions for universities, corporate training providers, and vocational education programs worldwide. Our education and training solutions include immersive learning platforms, VR training systems, equipment training simulations, safety training solutions, interactive learning experiences, virtual classrooms, and skills development platforms.",
    intro: [
      "Education and training have entered a new era. Traditional classroom instruction and printed materials cannot deliver the hands-on, experiential learning that modern skill acquisition demands. VR training simulations let learners practice complex procedures safely. Immersive learning platforms deliver spatial understanding impossible through 2D content. Virtual classrooms connect distributed learners globally with genuine presence.",
      "Elipse Studio partners with universities, corporate training providers, and vocational programs worldwide to build the immersive learning experiences modern education requires. Our team combines photorealistic craft with genuine understanding of learning design, delivering platforms that produce measurable competence outcomes."
    ],
    solutions: [
      "Immersive Learning Platforms — Complete VR-based learning platforms for institutions and enterprises.",
      "VR Training Systems — Scalable VR training deployment across training programs and multi-site organizations.",
      "Equipment Training Simulations — Safe virtual practice for expensive, dangerous, or geographically-scattered equipment.",
      "Safety Training Solutions — Immersive safety training for construction, manufacturing, and industrial contexts.",
      "Interactive Learning Experiences — Web-based interactive learning for scalable education deployment.",
      "Virtual Classrooms — Immersive virtual classroom environments for distributed education and remote training.",
      "Skills Development Platforms — Custom skills training platforms for specialty vocational and professional development."
    ],
    whyUs: [
      "Universities, corporate training providers, and vocational programs select Elipse Studio for immersive learning platform development because our team combines learning design understanding with technical craft. Effective educational VR requires more than impressive graphics — it demands pedagogical structure, competence assessment integration, LMS connectivity, and scalable deployment. Our platforms deliver measurable learning outcomes, not just impressive demonstrations.",
      "Elipse Studio's combined capability across VR training, interactive learning, virtual classrooms, and traditional educational content means one partner supports the complete educational transformation."
    ],
    midCta: {
      headline: "See Immersive Learning Platforms in Action",
      text: "Explore our education portfolio featuring VR training simulations, immersive learning platforms, and virtual classroom experiences delivered worldwide.",
      buttonText: "View Education Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Educational immersive experiences serve specific learning scenarios. Universities need scalable VR training that reduces cadaver dependencies and equipment scheduling constraints. Corporate training providers need consistent training deployment across multi-site organizations. Vocational programs need equipment simulations for expensive or dangerous training scenarios. Continuing education providers need remote-accessible immersive learning that replaces travel-required in-person training. Elipse Studio supports education across universities, medical schools, engineering programs, corporate training, vocational education, safety training, and specialty skills development contexts.",
    technology: "Elipse Studio's immersive learning platform pipeline uses Unity and Unreal Engine 5 for VR training development, standardized VR hardware (Meta Quest 3, PICO 4 Enterprise, HTC Vive Focus) for scalable deployment, and integration with major learning management systems (Blackboard, Canvas, Moodle, Cornerstone OnDemand, SAP SuccessFactors) via SCORM and xAPI standards. Our approach starts with learning objectives and competence outcomes rather than technology preferences. We design immersive experiences backward from measurable learning outcomes — ensuring the resulting platform delivers genuine educational value.",
    faqs: [
      { q: "How do VR training simulations improve learning outcomes?", a: "VR training simulations improve learning through experiential practice that traditional instruction cannot match — dangerous scenarios can be practiced safely, expensive equipment can be practiced without cost, and rare situations can be practiced repeatedly. Elipse Studio designs VR training around measurable competence outcomes for genuine educational impact." },
      { q: "Can immersive learning integrate with our LMS?", a: "Yes. Elipse Studio's immersive learning platform deployments integrate with major LMS platforms — Blackboard, Canvas, Moodle, Cornerstone OnDemand, SAP SuccessFactors — via SCORM 1.2, SCORM 2004, and xAPI standards. Learner performance data flows directly into your existing learning infrastructure." },
      { q: "What VR hardware do you recommend for training programs?", a: "Meta Quest 3 and Quest Pro for cost-effective standalone deployment across most training applications. HTC Vive Focus and PICO 4 Enterprise for premium enterprise programs with better institutional management. Varjo XR-4 for highest visual fidelity requirements. Elipse Studio recommends specific hardware based on your training application." },
      { q: "How does virtual classroom differ from video conferencing?", a: "Virtual classrooms use spatial VR presence — learners share three-dimensional space, interact with 3D content, and experience genuine social presence that video conferencing cannot deliver. Effective for immersive learning, spatial content, and collaborative skill development." },
      { q: "Can VR safety training reduce workplace incidents?", a: "Yes. Organizations implementing serious VR safety training consistently report measurable workplace incident reductions. Workers who experience simulated hazards develop stronger recognition, faster response, and better procedural muscle memory than workers trained through traditional methods alone." },
      { q: "How do I start an education or training project?", a: "Contact Elipse Studio with a brief description of your education or training program, learning objectives, and target audience. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Transform Learning Outcomes with Immersive Education",
      text: "Tell Elipse Studio about your education or training program. Our team will respond within one business day with a scoped approach for VR training, immersive learning platforms, or virtual classrooms.",
      buttonText: "Discuss Your Education Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "construction",
    title: "Construction",
    shortDesc: "BIM visualization, site safety training & progress viz.",
    category: "Industrial",
    icon: "HiOutlineWrenchScrewdriver",
    meta: {
      seoTitle: "Construction Visualization, BIM & Site Safety Training | Elipse Studio",
      metaDescription: "Elipse Studio delivers construction progress visualization, site safety training, BIM visualization, and construction planning experiences for contractors worldwide.",
      keywords: "construction visualization, BIM visualization, construction site safety training, construction planning, stakeholder communication, project presentation, construction marketing",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Construction Solutions by Elipse Studio",
    },
    hero: {
      headline: "Construction Visualization, BIM & Site Safety Training Solutions",
      subheadline: "Elipse Studio delivers photoreal construction visualization, immersive BIM reviews, VR site safety training, and stakeholder communication tools for construction firms worldwide.",
      ctaText: "Discuss Your Construction Project",
      ctaLink: "/contact",
      image: constructionImg
    },
    tlDr: "Elipse Studio delivers construction visualization, BIM visualization, site safety training, and construction planning experiences for general contractors, construction managers, and construction technology teams worldwide. Our construction solutions include construction progress visualization, site safety training, construction planning experiences, BIM visualization, stakeholder communication tools, construction marketing assets, and project presentation solutions.",
    intro: [
      "Modern construction operates in complex environments — multi-stakeholder projects with owners, architects, engineers, subcontractors, regulators, and community stakeholders all requiring different types of communication. Traditional construction communication tools (2D drawings, printed reports, static presentations) struggle to convey progress, safety scenarios, and project vision to non-technical stakeholders. Site safety training remains one of construction's most critical challenges.",
      "Elipse Studio serves general contractors, construction managers, and construction technology teams worldwide with specialized construction visualization, immersive safety training, and BIM visualization platforms. Our team combines photorealistic craft with genuine construction understanding, delivering solutions that improve communication, enhance safety, and support project success."
    ],
    solutions: [
      "Construction Progress Visualization — Time-lapse and progress visualization for stakeholder reporting and marketing.",
      "Site Safety Training — Immersive VR safety training for hazard recognition and emergency response.",
      "Construction Planning Experiences — Interactive planning experiences supporting logistics, sequencing, and coordination.",
      "BIM Visualization — Photorealistic BIM visualization for stakeholder communication and coordination.",
      "Stakeholder Communication Tools — Interactive tools for community meetings, investor updates, and regulatory reviews.",
      "Construction Marketing Assets — Visualization content for construction firm marketing and business development.",
      "Project Presentation Solutions — Presentation-grade visualization for major project proposals and pitches."
    ],
    whyUs: [
      "General contractors and construction managers select Elipse Studio for construction visualization because our team combines photorealistic craft with genuine construction understanding. Our team works fluently with BIM (Revit, Navisworks), construction management platforms, and construction workflow requirements — delivering visualization that integrates naturally with existing construction technology stacks.",
      "Elipse Studio's combined capability across BIM visualization, VR safety training, progress visualization, and stakeholder communication means one partner supports complete construction communication."
    ],
    midCta: {
      headline: "See Construction Visualization and VR Safety Training",
      text: "Explore our construction portfolio featuring BIM visualization, progress reporting, VR safety training, and stakeholder communication tools.",
      buttonText: "View Construction Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Construction visualization serves specific project scenarios. Complex projects need BIM visualization for coordination reviews and clash detection. Long-duration projects need progress visualization for owner and investor updates. Safety-critical sites need immersive VR training for hazard recognition and emergency response. Public projects need stakeholder communication tools for community engagement and regulatory approval. Construction firms need marketing visualization for business development. Elipse Studio supports construction across commercial, residential, infrastructure, industrial, mixed-use, and specialty construction segments.",
    technology: "Elipse Studio's construction visualization pipeline integrates directly with BIM workflows — Revit, Navisworks, and standard construction file formats. Our VR safety training platforms use Meta Quest 3 and PICO 4 Enterprise hardware for scalable jobsite deployment. Progress visualization combines photogrammetry, drone footage, and 3D modeling for accurate as-built documentation. Our approach starts with your specific construction communication objective — safety training scale-up, BIM coordination improvement, stakeholder communication for a specific project, or marketing content for business development.",
    faqs: [
      { q: "Can you work directly with our BIM files?", a: "Yes. Elipse Studio's construction visualization pipeline works directly with Revit, Navisworks, IFC, and other BIM formats. Our team handles BIM-to-visualization conversion while preserving model metadata and component information." },
      { q: "How does VR safety training improve construction safety outcomes?", a: "VR safety training lets workers experience hazards safely — falls, electrical shock, confined space emergencies, equipment accidents — developing recognition and response skills without any real risk. Workers who complete VR safety training arrive at sites with baseline hazard awareness that traditional training cannot deliver at scale. Elipse Studio builds custom construction VR training." },
      { q: "Can you deliver time-lapse and progress visualization?", a: "Yes. Elipse Studio combines photogrammetry, drone footage, and 3D modeling to deliver comprehensive progress visualization for construction projects. Owner and investor updates become dramatically more engaging with immersive progress content." },
      { q: "How do stakeholder communication tools help public projects?", a: "Public construction projects require extensive community engagement, regulatory review, and stakeholder alignment. Immersive stakeholder communication tools let non-technical audiences understand complex projects in ways drawings and models alone cannot achieve. Elipse Studio builds custom stakeholder tools for major public projects." },
      { q: "Do you support OSHA-compliant safety training?", a: "Yes. Elipse Studio's construction safety training platforms are designed for OSHA compliance documentation with proper training records, competence certification, and audit trails flowing into learning management systems." },
      { q: "How do I start a construction project?", a: "Contact Elipse Studio with a brief description of your construction firm, project type, and communication objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Improve Construction Communication, Safety, and Coordination",
      text: "Tell Elipse Studio about your construction project. Our team will respond within one business day with a scoped approach for BIM visualization, safety training, or stakeholder communication.",
      buttonText: "Discuss Your Construction Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "energy-utilities",
    title: "Energy & Utilities",
    shortDesc: "Plant viz, digital twins & energy safety training.",
    category: "Industrial",
    icon: "HiOutlineBolt",
    meta: {
      seoTitle: "Plant Visualization, Digital Twins & Energy Safety Training | Elipse Studio",
      metaDescription: "Elipse Studio delivers plant visualization, safety training simulations, facility digital twins, and renewable energy marketing solutions for energy companies.",
      keywords: "plant visualization, facility digital twin, energy safety training, infrastructure visualization, operational training, renewable energy marketing, equipment demonstration",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Energy & Utilities Solutions by Elipse Studio",
    },
    hero: {
      headline: "Plant Visualization, Digital Twins & Energy Safety Training Solutions",
      subheadline: "Elipse Studio delivers photoreal plant visualization, immersive VR safety training, facility digital twins, and renewable energy marketing for oil & gas, power generation, and utility companies worldwide.",
      ctaText: "Discuss Your Energy Project",
      ctaLink: "/contact",
      image: ""
    },
    tlDr: "Elipse Studio delivers advanced plant visualization, facility digital twins, safety training simulations, and infrastructure visualization for energy and utilities companies worldwide. Our energy solutions include plant visualization, safety training simulations, equipment demonstration tools, facility digital twins, operational training platforms, infrastructure visualization, and renewable energy marketing solutions — serving oil and gas, power generation, renewables, and utility companies.",
    intro: [
      "Energy and utilities operations demand exceptional visualization capabilities. Facilities are dangerous, remote, or classified. Safety training is critical but expensive when conducted physically. Digital twin capabilities are transforming how energy operators manage complex infrastructure. Renewable energy companies need marketing visualization that communicates technology to non-technical stakeholders and investors.",
      "Elipse Studio serves energy and utilities companies worldwide with specialized plant visualization, immersive safety training, and infrastructure visualization platforms. Our team combines photorealistic craft with genuine understanding of energy operations, delivering solutions that improve safety, operational efficiency, and stakeholder communication."
    ],
    solutions: [
      "Plant Visualization — Photorealistic visualization of power plants, refineries, processing facilities, and utility infrastructure.",
      "Safety Training Simulations — Immersive VR safety training for high-consequence energy environments.",
      "Equipment Demonstration Tools — Interactive demonstrations of complex energy equipment for sales and training.",
      "Facility Digital Twins — Photorealistic 1:1 digital replicas of energy facilities for operations and training.",
      "Operational Training Platforms — Comprehensive operational training for control room and field operations.",
      "Infrastructure Visualization — Large-scale infrastructure visualization for utility projects and grid modernization.",
      "Renewable Energy Marketing Solutions — Marketing visualization for solar, wind, hydro, and specialty renewable projects."
    ],
    whyUs: [
      "Energy and utilities companies select Elipse Studio for plant visualization and infrastructure work because our team combines photorealistic craft with genuine understanding of energy operations. Energy visualization must accurately represent complex process equipment, safety systems, and operational context — details that generic 3D studios routinely miss. Our engineering-aware approach ensures visualizations energy operators can confidently use for safety, operations, and executive communication.",
      "Elipse Studio's combined capability across plant visualization, VR safety training, digital twins, and marketing visualization means one partner supports complete energy communication and operational needs."
    ],
    midCta: {
      headline: "See Plant Visualization and Digital Twins in Action",
      text: "Explore our energy portfolio featuring plant visualization, digital twins, VR safety training, and renewable energy marketing delivered worldwide.",
      buttonText: "View Energy Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Energy visualization serves specific operational scenarios. Safety departments need immersive training that prepares workers for hazards traditional training cannot safely simulate. Operations teams need digital twins for control room training and remote facility management. Executive teams need visualization for board presentations and investor communication. Renewable energy developers need marketing visualization for community engagement and financing. Elipse Studio supports energy across oil and gas, power generation, renewable energy (solar, wind, hydro), transmission and distribution, water utilities, and specialty energy contexts.",
    technology: "Elipse Studio's plant visualization pipeline handles complex engineering geometry from CAD systems, integrates with plant information management systems where appropriate, and delivers photorealistic quality suitable for both training and executive presentations. VR safety training platforms use Meta Quest 3, PICO 4 Enterprise, and HTC Vive Focus for scalable industrial deployment. Our approach starts with the specific energy objective — safety training scale-up, digital twin deployment, executive communication, or renewable energy marketing. Only after strategic clarity do we recommend the right technology mix.",
    faqs: [
      { q: "Can you work with our plant CAD and engineering data?", a: "Yes. Elipse Studio's plant visualization pipeline works with standard engineering CAD formats and plant information systems. Our team handles CAD-to-visualization conversion while preserving engineering metadata and equipment specifications." },
      { q: "How does VR safety training work for energy environments?", a: "VR safety training lets workers experience high-consequence energy hazards safely — hydrogen sulfide response, fire emergencies, confined space events, equipment failures. Workers develop response instincts through repeated practice that traditional training cannot deliver at scale. Elipse Studio builds custom energy VR training." },
      { q: "What is a facility digital twin and how is it different from a rendering?", a: "A facility digital twin is a photorealistic real-time 3D replica of an energy facility supporting operational training, remote inspection, and executive communication. Unlike static renderings, digital twins let users navigate facilities, interact with equipment, and experience operational scenarios in real time." },
      { q: "Can visualization support renewable energy financing?", a: "Yes. Renewable energy projects require significant investor and community stakeholder engagement. Photorealistic plant visualization of proposed solar farms, wind installations, and hydroelectric projects dramatically improves financing pitches and community engagement effectiveness." },
      { q: "Do you support control room simulation training?", a: "Yes. Elipse Studio builds control room simulation training that combines immersive VR with realistic operational scenarios. Operators practice normal operations, upset conditions, and emergency response in safe simulation before real facility exposure." },
      { q: "How do I start an energy project?", a: "Contact Elipse Studio with a brief description of your energy company, project type, and operational or communication objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Transform Energy Operations with Photoreal Visualization",
      text: "Tell Elipse Studio about your energy project. Our team will respond within one business day with a scoped approach for plant visualization, digital twins, safety training, or renewable energy marketing.",
      buttonText: "Discuss Your Energy Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "hospitality",
    title: "Hospitality",
    shortDesc: "Hotel marketing, resort virtual tours & venue showcases.",
    category: "Advertising",
    icon: "HiOutlineBuildingOffice",
    meta: {
      seoTitle: "Hotel Marketing Visualization & Resort Virtual Tours | Elipse Studio",
      metaDescription: "Elipse Studio delivers hotel marketing experiences, resort virtual tours, venue showcase platforms, and interactive booking experiences for hospitality brands.",
      keywords: "hotel marketing visualization, resort virtual tours, venue showcase, interactive booking experience, hospitality sales presentation, guest experience visualization",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Hospitality Solutions by Elipse Studio",
    },
    hero: {
      headline: "Hotel Marketing Visualization & Resort Virtual Tour Solutions",
      subheadline: "Elipse Studio delivers cinematic hotel marketing content, immersive resort virtual tours, interactive venue showcase platforms, and hospitality sales presentations for hotels, resorts, and venues worldwide.",
      ctaText: "Discuss Your Hospitality Project",
      ctaLink: "/contact",
      image: hospitalityImg
    },
    tlDr: "Elipse Studio delivers cinematic-quality hotel marketing visualization, resort virtual tours, and venue showcase platforms for hospitality brands worldwide. Our hospitality solutions include hotel marketing experiences, resort virtual tours, venue showcase platforms, interactive booking experiences, hospitality sales presentations, and guest experience visualizations — helping hospitality brands attract international guests, book high-value events, and communicate luxury positioning.",
    intro: [
      "Hospitality marketing has never been more competitive. Luxury travelers research destinations extensively before booking. Corporate event planners evaluate venues from anywhere in the world before site visits. Wedding and event clients want to experience venues before committing to substantial bookings. In this environment, hotel marketing visualization and immersive virtual tours have become essential rather than optional — hospitality brands relying on flat photography alone lose bookings to competitors offering richer experiences.",
      "Elipse Studio serves hotels, resorts, venues, and hospitality brands worldwide with cinematic-quality visualization and immersive experience platforms. Our team combines photorealistic craft with genuine hospitality understanding, delivering visualization that actually books high-value guests, events, and weddings rather than just producing impressive imagery."
    ],
    solutions: [
      "Hotel Marketing Experiences — Cinematic marketing visualization for hotel brands and specific properties.",
      "Resort Virtual Tours — Immersive 360° and VR tours letting international guests explore resorts remotely.",
      "Venue Showcase Platforms — Interactive platforms for event venues, conference facilities, and wedding destinations.",
      "Interactive Booking Experiences — Immersive booking experiences that convert browsers into confirmed guests.",
      "Hospitality Sales Presentations — Boardroom-grade presentations for group sales, corporate events, and wedding bookings.",
      "Guest Experience Visualizations — Photorealistic visualization of guest experiences, amenities, and destination context."
    ],
    whyUs: [
      "Hotels, resorts, and hospitality brands select Elipse Studio for hotel marketing visualization because our team understands luxury hospitality's specific visual language. Hospitality visualization must capture atmosphere, lighting quality, spatial experience, and emotional appeal — not just accurate geometry. Our cinematic-quality craft combines with practical understanding of hospitality sales cycles, delivering visualization that supports actual booking conversion rather than just impressive imagery.",
      "Elipse Studio's combined capability across renderings, cinematic animation, virtual tours, VR experiences, and interactive platforms means one visualization partner supports every hospitality marketing touchpoint — from property websites through booking experiences through sales presentations."
    ],
    midCta: {
      headline: "See Hospitality Visualization and Resort Virtual Tours",
      text: "Explore our hospitality portfolio featuring hotel marketing content, resort virtual tours, venue showcase platforms, and interactive booking experiences.",
      buttonText: "View Hospitality Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Hospitality visualization serves specific commercial scenarios. New hotel openings need cinematic launch content and virtual tour experiences deployed before construction completion. Resort brands need immersive tours that reach international leisure travelers unable to visit physically. Venue sales teams need presentation-grade visualization for corporate event and wedding pitches. Hospitality groups need consistent visualization deployed across property portfolios. Elipse Studio supports hospitality across luxury hotels, resort properties, boutique hotels, hospitality groups, event venues, cruise ships, and specialty hospitality contexts.",
    technology: "Elipse Studio's hotel marketing visualization pipeline uses V-Ray and Unreal Engine 5 for cinematic-quality photorealistic rendering, specialized virtual tour platforms accessible via web browser and VR headset, and integration with hotel booking systems and PMS platforms where appropriate. Our approach starts with your specific hospitality commercial objective — pre-opening marketing for a new property, international guest expansion for established resorts, event sales for venue brands, or brand refresh for hospitality portfolios.",
    faqs: [
      { q: "Can you create hospitality marketing content before construction completes?", a: "Yes. Elipse Studio specializes in pre-opening hotel marketing visualization — creating cinematic-quality marketing content, virtual tours, and booking experiences well before physical construction completes. This lets hospitality brands begin marketing months or years before opening, capturing early bookings and building anticipation." },
      { q: "How do resort virtual tours convert international guests?", a: "Resort virtual tours give international travelers confidence to book high-value stays without physical site visits. Immersive tours let potential guests experience room categories, amenity spaces, and destination context before committing. Elipse Studio builds virtual tours specifically designed for booking conversion." },
      { q: "Do you deliver both photoreal renderings and cinematic animation?", a: "Yes. Elipse Studio delivers both formats simultaneously — photorealistic still renderings for hotel booking pages, cinematic architectural animation for launch marketing, and immersive virtual tours for guest exploration. All formats produced from an integrated 3D asset pipeline for consistent quality." },
      { q: "Can you build venue showcase platforms for event sales?", a: "Yes. Elipse Studio builds interactive venue showcase platforms for hotels, resorts, and event venues supporting corporate event sales, wedding sales, and specialty venue rentals. Platforms include configurable venue layouts, capacity information, and virtual tour access." },
      { q: "How long does hospitality visualization take?", a: "Focused rendering packages typically deliver in 4-6 weeks. Complete pre-opening marketing packages (renderings + animation + virtual tour) span 12-18 weeks. Interactive venue platforms extend to 16-24 weeks. Elipse Studio provides realistic timelines with every proposal." },
      { q: "How do I start a hospitality project?", a: "Contact Elipse Studio with a brief description of your hospitality brand, property type, and commercial objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Book More Guests with Cinematic Hospitality Visualization",
      text: "Tell Elipse Studio about your hospitality brand. Our team will respond within one business day with a scoped approach for hotel marketing, resort virtual tours, venue showcase platforms, or interactive booking experiences.",
      buttonText: "Discuss Your Hospitality Project →",
      buttonLink: "/contact"
    }
  },
  {
    slug: "retail",
    title: "Retail",
    shortDesc: "3D product visualization, virtual showrooms & interactive commerce.",
    category: "Retail",
    icon: "HiOutlineShoppingCart",
    meta: {
      seoTitle: "Retail 3D Visualization & Virtual Showroom Solutions | Elipse Studio",
      metaDescription: "Elipse Studio delivers 3D product visualization, virtual showrooms, interactive configurators, and AR commerce experiences for retail brands worldwide.",
      keywords: "retail 3D visualization, virtual showroom, interactive product display, retail AR experience, ecommerce 3D, product configurator retail, digital retail experience",
      ogImage: "/assets/logo-og.webp",
      ogImageAlt: "Retail Solutions by Elipse Studio",
    },
    hero: {
      headline: "Retail 3D Visualization & Interactive Commerce Solutions",
      subheadline: "Elipse Studio delivers photoreal 3D product visualization, immersive virtual showrooms, interactive product configurators, and AR commerce experiences that help retail brands increase conversions, reduce returns, and modernize the shopping experience.",
      ctaText: "Discuss Your Retail Project",
      ctaLink: "/contact",
      image: ecommerceImg
    },
    tlDr: "Elipse Studio delivers retail 3D visualization, virtual showroom platforms, interactive product configurators, and AR commerce experiences for retail brands worldwide. Our retail solutions include 3D product visualization, virtual showrooms, interactive product displays, AR try-on experiences, ecommerce visualization, and in-store digital experiences that lift conversion rates, reduce return rates, and deliver modern shopping experiences.",
    intro: [
      "Retail is undergoing its most significant transformation since the invention of e-commerce. Physical retailers face declining foot traffic while online retailers struggle with high return rates and low conversion. The brands bridging this gap successfully invest in interactive 3D visualization that lets customers see, configure, and experience products before purchasing.",
      "Elipse Studio serves retail brands, ecommerce platforms, and physical retailers worldwide with photoreal 3D product visualization and immersive commerce experiences. Our team combines visualization craft with retail commercial understanding, building experiences that increase conversion rates and reduce returns."
    ],
    solutions: [
      "3D Product Visualization — Photorealistic 3D renders of retail products for ecommerce, marketing, and catalog use.",
      "Virtual Showroom Platforms — Immersive online showrooms where customers browse and interact with entire product ranges.",
      "Interactive Product Configurators — Real-time customization tools letting customers configure colors, materials, and options before purchase.",
      "AR Commerce Experiences — Mobile AR try-on and placement experiences for fashion, furniture, accessories, and specialty retail.",
      "Ecommerce Visualization Pipelines — Scalable 3D production pipelines delivering product visuals at ecommerce volume.",
      "In-Store Digital Experiences — Interactive displays, digital signage, and immersive in-store visualization installations.",
      "Virtual Try-On Solutions — AR-powered virtual try-on for fashion, eyewear, jewelry, and cosmetics retail.",
      "Product Marketing Campaigns — Cinematic product animation and motion graphics for retail marketing channels."
    ],
    whyUs: [
      "Retail brands select Elipse Studio for 3D product visualization because our team understands retail's specific commercial requirements. Retail visualization must serve multiple channels simultaneously — ecommerce product pages, social media marketing, in-store displays, and advertising campaigns. Our integrated capability delivers consistent 3D assets across every retail touchpoint from a single production pipeline.",
      "Elipse Studio's retail visualization combines photorealistic quality with scalable production processes. We build 3D product libraries that serve ongoing retail needs — new product launches, seasonal campaigns, and expanding product ranges — rather than one-off visualization projects."
    ],
    midCta: {
      headline: "See Retail 3D Visualization in Action",
      text: "Explore our retail portfolio featuring 3D product visualization, virtual showrooms, interactive configurators, and AR commerce experiences for brands worldwide.",
      buttonText: "View Retail Portfolio",
      buttonLink: "/portfolio"
    },
    useCases: "Retail 3D visualization serves specific commercial scenarios across physical and digital channels. Ecommerce brands need photorealistic product renders that replace expensive photography and scale across thousands of SKUs. Furniture retailers need AR placement experiences that let customers visualize products in their spaces. Fashion brands need virtual try-on solutions that reduce return rates. Physical retailers need interactive in-store displays that bridge online and offline experiences.",
    technology: "Elipse Studio's retail visualization pipeline uses Blender and Maya for 3D product modeling, V-Ray and Cycles for photorealistic rendering, Three.js and WebGL for browser-based virtual showrooms and configurators, ARKit and ARCore for mobile AR commerce, and Unreal Engine 5 for high-fidelity interactive experiences.",
    faqs: [
      { q: "How does 3D product visualization reduce retail return rates?", a: "3D product visualization gives customers accurate, detailed views of products from every angle before purchase — including materials, textures, colors, and scale. When customers understand exactly what they are buying, return rates drop significantly." },
      { q: "Can you create virtual showrooms for our entire product range?", a: "Yes. Elipse Studio builds scalable virtual showroom platforms that showcase entire product catalogs with efficient 3D production pipelines that produce consistent product visuals at volume." },
      { q: "Do you build AR try-on experiences for fashion retail?", a: "Yes. Elipse Studio develops AR virtual try-on solutions for fashion, eyewear, jewelry, and cosmetics retail, letting customers see products on themselves through their phone camera." },
      { q: "How long does retail 3D visualization take?", a: "Individual product visualization delivers in 1-2 weeks per product. Scalable product pipelines for entire catalogs typically require 4-8 weeks to establish. Virtual showroom platforms span 8-16 weeks." },
      { q: "How do I start a retail visualization project?", a: "Contact Elipse Studio with a brief description of your retail brand, product range, and commercial objectives. A senior team member will respond within one business day with a scoped approach." }
    ],
    finalCta: {
      headline: "Modernize Your Retail Experience with 3D Visualization",
      text: "Tell Elipse Studio about your retail brand. Our team will respond within one business day with a scoped approach for 3D product visualization, virtual showrooms, AR commerce, or interactive retail experiences.",
      buttonText: "Discuss Your Retail Project →",
      buttonLink: "/contact"
    }
  }
];
