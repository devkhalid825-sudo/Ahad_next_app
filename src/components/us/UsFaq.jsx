'use client';

import { useState } from 'react';

const UsFaq = ({ items = [] }) => {
  const [open, setOpen] = useState(-1);
  return (
    <div className="us-faq-list">
      {items.map((f, i) => (
        <div key={i} className={`us-faq-item${open === i ? ' us-open' : ''}`}>
          <button type="button" className="us-faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
            {f.q}
            <span className="us-plus">+</span>
          </button>
          <div className="us-faq-a">{f.a}</div>
        </div>
      ))}
    </div>
  );
};

export default UsFaq;
