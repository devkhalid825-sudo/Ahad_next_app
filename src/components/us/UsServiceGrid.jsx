'use client';

import Link from 'next/link';

const UsServiceGrid = ({ items = [] }) => (
  <div className="us-service-grid">
    {items.map((it, i) => (
      <div key={i} className="us-service-card">
        <div className="us-service-top">
          <span className="us-service-num">{String(i + 1).padStart(2, '0')}</span>
          {it.badge && <span className="us-service-badge">{it.badge}</span>}
        </div>
        {it.icon && <div className="us-service-icon">{it.icon}</div>}
        <h3>{it.title}</h3>
        <p>{it.desc}</p>
        {it.tags?.length > 0 && (
          <div className="us-service-tags">
            {it.tags.map((t, ti) => <span key={ti} className="us-tag">{t}</span>)}
          </div>
        )}
        {it.href && (
          <Link href={it.href} className="us-service-link">
            {it.linkLabel || `Explore ${it.title} →`}
          </Link>
        )}
      </div>
    ))}
  </div>
);

export default UsServiceGrid;
