'use client';

import { useState, useRef, useEffect } from 'react';
import { FiCode, FiEye, FiMaximize2 } from 'react-icons/fi';

const HtmlEditor = ({ value, onChange, label, minHeight = 300 }) => {
  const [mode, setMode] = useState('split');
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!iframeRef.current || !value) return;
    if (mode === 'preview' || mode === 'split') {
      iframeRef.current.srcdoc = value;
    }
  }, [value, mode]);

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
      <div className="flex items-center gap-1 px-3 py-2 border-b border-[#333] bg-[#1A1A1A]">
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
