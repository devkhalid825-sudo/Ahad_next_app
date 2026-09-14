'use client';

import { useRef, useState } from 'react';

const AuConfigurator = ({
  src,
  title = '3D Configurator',
  colors = [],
  label = 'Finish',
  messageMode = 'object',
  badge = 'Live 3D Configurator',
}) => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const frameRef = useRef(null);
  const pendingColorRef = useRef(null);

  // No auto-load. The iframe mounts only after the user clicks to launch,
  // and unmounts again when the user clicks to close (toggle).
  const shouldMountIframe = isActivated;

  const sendColor = (colorId) => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    if (messageMode === 'raw') {
      frame.contentWindow.postMessage(colorId, '*');
    } else {
      frame.contentWindow.postMessage({ type: 'CHANGE_COLOR', color: colorId }, '*');
    }
  };

  const close = () => {
    setIsActivated(false);
    setLoaded(false);
    frameRef.current = null;
  };

  return (
    <div className="au-configurator-panel">
      <div className="au-configurator-viewport relative">
        {shouldMountIframe ? (
          <>
            <div className={`au-configurator-loading${loaded ? ' au-hidden' : ''}`}>
              <div className="au-configurator-spinner" />
            </div>
            <iframe
              ref={frameRef}
              src={src}
              title={title}
              loading="lazy"
              allow="fullscreen"
              onLoad={() => {
                setLoaded(true);
                if (colors[pendingColorRef.current]) {
                  sendColor(colors[pendingColorRef.current].id);
                } else if (colors[0]) {
                  sendColor(colors[0].id);
                }
              }}
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close configurator"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-black/70 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:bg-black transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div
            role="button"
            tabIndex={0}
            onClick={() => setIsActivated(true)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setIsActivated(true);
              }
            }}
            className="w-full h-full min-h-[280px] flex flex-col items-center justify-center bg-[#151517] text-white p-6 cursor-pointer group select-none relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-black to-zinc-900 opacity-90" />
            <div className="relative z-10 flex flex-col items-center text-center">
              <span className="text-[11px] font-semibold text-[#4169E1] bg-[#4169E1]/10 border border-[#4169E1]/30 px-3 py-1 rounded-full uppercase tracking-widest mb-4">
                {badge}
              </span>
              <div className="w-13 h-13 rounded-full bg-[#4169E1] text-white flex items-center justify-center shadow-lg shadow-[#4169E1]/40 mb-3 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 3h-3M15 3h6v6M12 12l6-6M14 8l4-4M6 21h10M9 18v3m6-3v3" />
                </svg>
              </div>
              <h4 className="text-base font-medium text-white mb-1">{title}</h4>
              <p className="text-xs text-zinc-400 max-w-xs">Click to launch the real-time 3D model in your browser</p>
              <span className="mt-4 inline-flex items-center gap-2 bg-[#4169E1] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-transform group-hover:scale-105">
                View Live Demo
              </span>
            </div>
          </div>
        )}
      </div>
      {colors.length > 0 && (
        <div className="au-configurator-footer">
          <div className="au-configurator-footer-label">
            {label} — <span className="au-configurator-color-name">{colors[active]?.name}</span>
          </div>
          <div className="au-configurator-swatch-row">
            {colors.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`au-config-swatch${i === active ? ' au-active' : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => {
                  setActive(i);
                  if (shouldMountIframe) {
                    sendColor(c.id);
                  } else {
                    pendingColorRef.current = i;
                    setIsActivated(true);
                  }
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuConfigurator;
