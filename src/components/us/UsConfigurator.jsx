'use client';

import { useRef, useState } from 'react';

const UsConfigurator = ({
  src,
  title = '3D Configurator',
  colors = [],
  label = 'Finish',
  messageMode = 'object',
}) => {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const frameRef = useRef(null);

  const sendColor = (colorId) => {
    const frame = frameRef.current;
    if (!frame || !frame.contentWindow) return;
    if (messageMode === 'raw') {
      frame.contentWindow.postMessage(colorId, '*');
    } else {
      frame.contentWindow.postMessage({ type: 'CHANGE_COLOR', color: colorId }, '*');
    }
  };

  return (
    <div className="us-configurator-panel">
      <div className="us-configurator-viewport">
        <div className={`us-configurator-loading${loaded ? ' us-hidden' : ''}`}>
          <div className="us-configurator-spinner" />
        </div>
        <iframe
          ref={frameRef}
          src={src}
          title={title}
          loading="lazy"
          allow="fullscreen"
          onLoad={() => {
            setLoaded(true);
            if (colors[0]) sendColor(colors[0].id);
          }}
        />
      </div>
      {colors.length > 0 && (
        <div className="us-configurator-footer">
          <div className="us-configurator-footer-label">
            {label} — <span className="us-configurator-color-name">{colors[active]?.name}</span>
          </div>
          <div className="us-configurator-swatch-row">
            {colors.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`us-config-swatch${i === active ? ' us-active' : ''}`}
                style={{ background: c.hex }}
                title={c.name}
                aria-label={c.name}
                onClick={() => {
                  setActive(i);
                  sendColor(c.id);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsConfigurator;
