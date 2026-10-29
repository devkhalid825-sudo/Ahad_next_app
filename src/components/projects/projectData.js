// All projects previously hardcoded here have been migrated to the dashboard
// (backend-driven via /projects and /case-studies APIs). These arrays are the
// static fallback that src/app/project/[slug]/page.jsx and
// src/app/projects_sitemap.xml/route.js check when a slug has no matching
// dashboard entry — populate them again only for content that will never live
// in the dashboard.
export const projectList = [
  {
    slug: 'classic-villa',
    title: 'Classic Villa | VR & 3D Visualization',
    meta: [
      { label: 'Category', value: 'Architecture' },
      { label: 'Service', value: '3D Visualization' },
      { label: 'Deliverables', value: 'Neoclassical CGI · Estate Visuals' },
      { label: 'Description', value: 'Intricate neoclassical architectural CGI, exterior colonnades, and opulent European estate rendering for luxury development marketing.' }
    ],
    heroImage: '/assets/About-page/villas.webp',
    nextProject: { path: '/project/villa', name: 'Modern Villa' },
    sections: [
      {
        type: 'overview',
        heading: 'Classical elegance meets photoreal 3D visualization',
        text: 'Intricate classical stone detailing, grand porticos, symmetrical colonnades, and opulent European estate rendering crafted for luxury property marketing.',
        challenge: {
          heading: 'Preserving historical architectural proportion',
          text: 'Capturing the nuanced masonry, friezes, and natural daylighting required high-precision 3D modelling and ray-traced material calibration.'
        }
      },
      {
        type: 'results',
        title: 'Delivering measurable value',
        results: [
          { value: '4K+', title: 'Ultra-High Resolution Stills', desc: 'Photoreal imagery for high-end investor lookbooks and marketing' },
          { value: '100%', title: 'Architectural Fidelity', desc: 'Exact CAD-to-CGI replication of all classical masonry profiles' }
        ]
      },
      {
        type: 'process',
        steps: [
          { step: '01', phase: 'Blueprint', title: 'CAD & Architectural Review', desc: 'Detailed breakdown of elevations, balustrades, and neoclassical proportions.' },
          { step: '02', phase: 'Model', title: 'Parametric 3D Modelling', desc: 'Precision geometry modelling of columns, cornices, and exterior facades.' },
          { step: '03', phase: 'Shading', title: 'Physical Material Calibration', desc: 'Realistic stone, aged limestone, bronze fixtures, and natural vegetation.' },
          { step: '04', phase: 'Render', title: 'Atmospheric Lighting & Composite', desc: 'Golden hour lighting simulation with high-dynamic-range compositing.' }
        ]
      },
      {
        type: 'gallery',
        title: 'Estate Showcase',
        images: ['/assets/About-page/villas.webp']
      }
    ]
  },
  {
    slug: 'gluco-kahani',
    title: 'Gluco Kahani | 3D Character Animation',
    meta: [
      { label: 'Category', value: 'Animation' },
      { label: 'Service', value: 'Character Animation' },
      { label: 'Deliverables', value: '3D Character Rigging · Brand Storytelling' },
      { label: 'Description', value: 'Expressive 3D character animation and cinematic brand storytelling for Gluco Kahani, featuring custom character rigging, facial blendshapes, and stylized emotional narrative.' }
    ],
    heroImage: 'https://elipsestudio.com/media/53',
    heroIframe: 'https://www.youtube.com/embed/WRV32zdSHK8',
    nextProject: { path: '/project/ahmed-foods', name: 'Ahmed Foods' },
    sections: [
      {
        type: 'overview',
        heading: 'Whimsical 3D Character Animation & Emotional Storytelling',
        text: 'Bringing stylized characters to life with intricate facial blendshapes, fluid body mechanics, and vibrant cinematic storytelling for Gluco Kahani.',
        challenge: {
          heading: 'High-Emotion Character Performance',
          text: 'Designing believable emotional range while preserving whimsical brand aesthetics required custom rig controls and detailed secondary animation.'
        }
      },
      {
        type: 'results',
        title: 'Project Highlights',
        results: [
          { value: '4K', title: 'Broadcast-Ready Animation', desc: 'Rendered at pristine 4K resolution with stylized cinematic lighting' },
          { value: '100%', title: 'Custom 3D Rigs', desc: 'Bespoke facial and body mechanics built from ground up' }
        ]
      },
      {
        type: 'process',
        steps: [
          { step: '01', phase: 'Concept', title: 'Character Design & VisDev', desc: 'Translating 2D character sheets into expressive 3D silhouette designs.' },
          { step: '02', phase: 'Rigging', title: 'Facial & Skeletal Rigging', desc: 'Bespoke Maya rigs with blendshapes for hyper-expressive emotions.' },
          { step: '03', phase: 'Animation', title: 'Keyframe Animation & Timing', desc: 'Character performance, dynamic comedic timing, and secondary cloth/hair physics.' },
          { step: '04', phase: 'Lighting', title: 'LookDev & Cinematic Render', desc: 'Stylized PBR shaders, warm volumetric lighting, and final comp.' }
        ]
      },
      {
        type: 'gallery',
        title: 'Visual Showcase',
        images: ['https://elipsestudio.com/media/53']
      }
    ]
  }
];

export const caseStudyEntries = [];
