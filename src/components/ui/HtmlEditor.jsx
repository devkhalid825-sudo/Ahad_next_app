'use client';

import { useState, useRef, useEffect } from 'react';
import { FiCode, FiEye, FiMaximize2 } from '@/components/ui/Icons';

const HtmlEditor = ({ value, onChange, label, minHeight = 300 }) => {
  const [mode, setMode] = useState('split');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current || !value) return;
    if (mode === 'preview' || mode === 'split') {
      const previewHtml = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #0D0D0D; color: #F2F0EB; padding: 20px; line-height: 1.6; font-size: 14px; margin: 0; }
            .project-credits-card { margin: 20px 0; padding: 20px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1); background: #141414; }
            .credits-eyebrow { font-size: 11px; font-weight: bold; letter-spacing: 0.14em; text-transform: uppercase; color: #4169E1; margin-bottom: 6px; }
            .credits-heading { font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #fff; }
            .credits-agency { font-size: 13px; margin-bottom: 12px; color: #bbb; }
            .credits-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; color: #888; margin-bottom: 8px; }
            .tools-badges { display: flex; flex-wrap: wrap; gap: 8px; }
            .tool-badge { display: inline-flex; align-items: center; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 600; background: rgba(65,105,225,0.15); color: #60a5fa; border: 1px solid rgba(65,105,225,0.3); }
            .project-faq-section { margin: 30px 0; }
            .faq-eyebrow { font-size: 11px; font-weight: bold; letter-spacing: 0.14em; text-transform: uppercase; color: #4169E1; margin-bottom: 6px; }
            .faq-heading { font-size: 22px; font-weight: bold; margin-bottom: 16px; color: #fff; }
            .faq-cards-container { display: flex; flex-direction: column; gap: 12px; }
            .faq-card { padding: 16px 20px; border-radius: 14px; border: 1px solid rgba(255,255,255,0.1); background: #141414; }
            .faq-question { display: flex; align-items: flex-start; gap: 10px; font-size: 15px; font-weight: bold; color: #fff; margin-bottom: 8px; }
            .faq-q-badge { display: inline-flex; align-items: center; justify-content: center; width: 22px; height: 22px; border-radius: 9999px; background: rgba(65,105,225,0.2); color: #4169E1; font-size: 11px; font-weight: 800; flex-shrink: 0; }
            .faq-answer { padding-left: 32px; font-size: 13px; font-weight: 300; line-height: 1.7; color: #aaa; border-left: 2px solid rgba(65,105,225,0.3); }
          </style>
        </head>
        <body>${value}</body>
        </html>
      `;
      iframeRef.current.srcdoc = previewHtml;
    }
  }, [value, mode]);

  const insertCreditsTemplate = () => {
    const template = `<!-- Formal Project Credits Template -->
<div class="project-credits-card">
  <p class="credits-eyebrow">PRODUCTION PIPELINE</p>
  <h3 class="credits-heading">Formal Project Credits</h3>
  <p class="credits-agency"><strong>Lead Creative Agency:</strong> Digitz</p>
  <p class="credits-label">Core Tools & Pipeline:</p>
  <div class="tools-badges">
    <span class="tool-badge">Autodesk Maya</span>
    <span class="tool-badge">Redshift</span>
    <span class="tool-badge">Foundry Nuke</span>
    <span class="tool-badge">SpeedTree</span>
    <span class="tool-badge">Blender</span>
    <span class="tool-badge">Adobe After Effects</span>
    <span class="tool-badge">AI 8K Upscaling</span>
  </div>
</div>`;
    onChange(value ? `${value.trim()}\n\n${template}` : template);
  };

  const insertFaqTemplate = () => {
    const template = `<!-- Project FAQ Template -->
<div class="project-faq-section">
  <p class="faq-eyebrow">AEO & SEARCH DISCOVERY</p>
  <h3 class="faq-heading">Frequently Asked Questions</h3>
  <div class="faq-cards-container">
    <div class="faq-card">
      <h4 class="faq-question"><span class="faq-q-badge">Q</span><span>What software and techniques were used to create this project?</span></h4>
      <div class="faq-answer">The production pipeline utilized Autodesk Maya and Redshift for 3D animation and GPU-accelerated ray-traced rendering, Foundry Nuke for multi-layer optical compositing, Blender for procedural rigid-body simulations, SpeedTree, After Effects, and an 8K AI pipeline.</div>
    </div>
  </div>
</div>`;
    onChange(value ? `${value.trim()}\n\n${template}` : template);
  };

  const modes = [
    { key: 'code', icon: <FiCode />, label: 'Code' },
    { key: 'preview', icon: <FiEye />, label: 'Preview' },
    { key: 'split', icon: <FiMaximize2 />, label: 'Split' },
  ];

  return (
    <div className="border border-[#333] rounded-xl overflow-hidden bg-[#111]">
      {label && (
        <div className="px-4 py-2.5 border-b border-[#333] bg-[#1A1A1A]">
          <span className="text-[#888] text-[8px] uppercase tracking-widest font-bold">{label}</span>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-1.5 px-3 py-2 border-b border-[#333] bg-[#1A1A1A]">
        {modes.map(m => (
          <button
            key={m.key}
            type="button"
            onClick={() => setMode(m.key)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
              mode === m.key
                ? 'bg-[#4169E1]/20 text-[#4169E1]'
                : 'text-[#555] hover:text-[#F2F0EB] hover:bg-[#222]'
            }`}
          >
            {m.icon} {m.label}
          </button>
        ))}

        <div className="h-4 w-px bg-[#333] mx-1 hidden sm:block" />

        <button
          type="button"
          onClick={insertCreditsTemplate}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-[#4169E1] bg-[#4169E1]/10 hover:bg-[#4169E1]/20 border border-[#4169E1]/30 transition-all cursor-pointer"
          title="Insert Formal Project Credits Template"
        >
          + Credits Template
        </button>

        <button
          type="button"
          onClick={insertFaqTemplate}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 border border-emerald-400/30 transition-all cursor-pointer"
          title="Insert FAQ Template"
        >
          + FAQ Template
        </button>

        <div className="ml-auto text-[7px] text-[#444] uppercase tracking-widest">HTML</div>
      </div>
      <div className="flex" style={{ minHeight }}>
        {(mode === 'code' || mode === 'split') && (
          <div className={mode === 'split' ? 'w-1/2 border-r border-[#333]' : 'w-full'}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className="w-full h-full bg-[#0D0D0D] text-[#F2F0EB] font-mono text-xs leading-relaxed p-4 outline-none resize-none border-none"
              style={{ minHeight }}
              placeholder="Write HTML here..."
              spellCheck={false}
            />
          </div>
        )}
        {(mode === 'preview' || mode === 'split') && (
          <div className={mode === 'split' ? 'w-1/2' : 'w-full'}>
            {value ? (
              <iframe
                ref={iframeRef}
                title="preview"
                className="w-full h-full bg-[#0D0D0D] border-none"
                style={{ minHeight }}
                sandbox="allow-scripts allow-same-origin"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-[#444] text-[10px] uppercase tracking-widest" style={{ minHeight }}>
                Preview will appear here
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HtmlEditor;
